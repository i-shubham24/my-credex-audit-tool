import { useState, useEffect, useRef } from 'react';
import { FullReport } from '../lib/types';
import { Sparkles, Download } from 'lucide-react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import toast from 'react-hot-toast';

// Import our new clean components
import HeroSavings from './HeroSavings';
import AuditBreakdown from './AuditBreakdown';
import LeadCaptureForm from './LeadCaptureForm';

interface AuditResultsProps {
  report: FullReport;
  onReset: () => void;
}

export default function AuditResults({ report, onReset }: AuditResultsProps) {
  const [aiSummary, setAiSummary] = useState<string>('Analyzing your stack...');
  const [isExporting, setIsExporting] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await fetch('/api/summary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ report })
        });
        if (!res.ok) throw new Error('Network error');
        const data = await res.json();
        setAiSummary(data.summary);
      } catch (err) {
        console.error("AI Fetch Failed:", err);
        setAiSummary(`Based on your audit, you are currently spending $${report.totalMonthlySavings} unnecessarily each month.`);
      }
    };
    if (report) fetchSummary();
  }, [report]);

  const handleDownloadPDF = async () => {
    if (!reportRef.current) return;
    setIsExporting(true);
    const loadingToast = toast.loading("Generating your PDF...");
    
    try {
      const canvas = await html2canvas(reportRef.current, { 
        scale: 2, useCORS: true, logging: false, backgroundColor: '#ffffff'
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('Credex-AI-Spend-Audit.pdf');
      
      toast.dismiss(loadingToast);
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error('PDF Failed:', error);
      toast.dismiss(loadingToast);
      toast.error('Failed to generate PDF.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex justify-end">
        <button 
          onClick={handleDownloadPDF} disabled={isExporting}
          className="flex items-center text-sm font-bold text-gray-700 hover:text-black transition-colors bg-white border border-gray-200 px-4 py-2 rounded-lg shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="w-4 h-4 mr-2" />
          {isExporting ? 'Rendering PDF...' : 'Download PDF Report'}
        </button>
      </div>

      {/* PDF Target Area */}
      <div ref={reportRef} className="space-y-8 bg-white p-4 rounded-xl">
        <HeroSavings 
          annualSavings={report.totalAnnualSavings} 
          monthlySavings={report.totalMonthlySavings} 
        />
        
        <AuditBreakdown results={report.results} />

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 shadow-sm">
          <h3 className="text-sm font-bold text-blue-900 uppercase tracking-wider mb-2 flex items-center">
            <Sparkles className="w-4 h-4 mr-2" /> AI Auditor Note
          </h3>
          <p className="text-blue-800 text-sm leading-relaxed">{aiSummary}</p>
        </div>
      </div> 

      {/* External Form */}
      <LeadCaptureForm monthlySavings={report.totalMonthlySavings} />

      <button onClick={onReset} className="w-full text-center text-gray-500 hover:text-gray-900 font-medium py-4 transition-colors">
        ← Run another audit
      </button>

    </div>
  );
}