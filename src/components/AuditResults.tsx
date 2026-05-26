import { useState, useEffect, useRef } from 'react';
import { FullReport } from '../lib/types';
import { Zap, Download, CheckCircle } from 'lucide-react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import toast from 'react-hot-toast';

import HeroSavings from './HeroSavings';
import AuditBreakdown from './AuditBreakdown';
import LeadCaptureForm from './LeadCaptureForm';

export default function AuditResults({ report, onReset }: { report: FullReport, onReset: () => void }) {
  const [aiSummary, setAiSummary] = useState<string>('Analyzing stack...');
  const [isExporting, setIsExporting] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);
  
  const isOptimized = report.totalMonthlySavings === 0;

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await fetch('/api/summary', { 
          method: 'POST', 
          headers: {'Content-Type': 'application/json'}, 
          body: JSON.stringify({ report }) 
        });
        const data = await res.json();
        setAiSummary(data.summary);
      } catch (err) {
        setAiSummary(isOptimized ? "Perfectly optimized stack. No redundant licenses detected." : `Identified $${report.totalMonthlySavings} in potential savings.`);
      }
    };
    fetchSummary();
  }, [report, isOptimized]);

  const handleDownloadPDF = async () => {
    if (!reportRef.current) return;
    setIsExporting(true);
    const loadingToast = toast.loading("Generating PDF...");
    try {
      const canvas = await html2canvas(reportRef.current, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 210, (canvas.height * 210) / canvas.width);
      pdf.save('AI-Audit-Report.pdf');
      toast.dismiss(loadingToast);
      toast.success("Download started!");
    } catch (e) {
      toast.dismiss(loadingToast);
      toast.error("Export failed.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-end">
        <button onClick={handleDownloadPDF} disabled={isExporting} className="flex items-center text-sm font-bold bg-white border px-4 py-2 rounded-lg shadow-sm hover:shadow-md disabled:opacity-50">
          <Download className="w-4 h-4 mr-2" />
          {isExporting ? 'Exporting...' : 'Download PDF Report'}
        </button>
      </div>

      <div ref={reportRef} className="space-y-8 bg-white p-4 rounded-xl">
        {isOptimized ? (
          <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-2xl p-8 text-center text-white shadow-xl">
            <CheckCircle className="w-16 h-16 mx-auto mb-4 opacity-90" />
            <h2 className="text-3xl font-black mb-2">Fully Optimized!</h2>
            <p className="text-green-100">Your AI stack is lean and efficient.</p>
          </div>
        ) : (
          <HeroSavings annualSavings={report.totalAnnualSavings} monthlySavings={report.totalMonthlySavings} />
        )}
        
        <AuditBreakdown results={report.results} />
        
        <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
          <h3 className="text-sm font-bold text-indigo-900 uppercase tracking-widest mb-2 flex items-center">
            <Zap className="w-4 h-4 mr-2" /> AI Summary
          </h3>
          <p className="text-indigo-800 text-sm leading-relaxed">{aiSummary}</p>
        </div>
      </div> 

      <LeadCaptureForm monthlySavings={report.totalMonthlySavings} />
      <button onClick={onReset} className="w-full text-center text-gray-500 hover:text-gray-900 font-medium py-4">← Start New Audit</button>
    </div>
  );
}