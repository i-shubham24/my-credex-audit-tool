import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { FullReport, AuditResult } from '../lib/types';
import { TrendingDown, CheckCircle, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';

interface AuditResultsProps {
  report: FullReport;
  onReset: () => void;
}

export default function AuditResults({ report, onReset }: AuditResultsProps) {
  const [email, setEmail] = useState('');
  const [honeyPot, setHoneyPot] = useState(''); // Abuse protection: bots fill this, humans don't see it
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [aiSummary, setAiSummary] = useState<string>('Analyzing your stack...');

  // Fetch the AI summary from your secure Vercel endpoint
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await fetch('/api/summary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ report })
        });
        
        if (!res.ok) throw new Error('Network response was not ok');
        
        const data = await res.json();
        setAiSummary(data.summary);
      } catch (err) {
        // Graceful fallback if the API fails or you aren't running 'npx vercel dev'
        setAiSummary(`Based on your audit, you are currently spending $${report.totalMonthlySavings} unnecessarily each month. By optimizing your team's licenses and shifting heavy workloads to direct APIs, you can reclaim significant capital while maintaining the exact same AI capabilities.`);
      }
    };
    
    if (report) {
      fetchSummary();
    }
  }, [report]);

  // Handle saving the lead to Supabase AND triggering the confirmation email
  const handleLeadCapture = async () => {
    if (!email || honeyPot) return; // If honeypot has text, it's a bot. Stop execution silently.
    
    setStatus('loading');

    // 1. Save to Supabase Database
    const { error } = await supabase
      .from('leads')
      .insert([{ email, total_savings: report.totalMonthlySavings }]);

    if (error) {
      console.error("Supabase Error:", error);
      setStatus('idle');
      alert("Something went wrong saving your email. Please try again.");
      return;
    }

    // 2. Trigger the automated email via Vercel Serverless Function
    try {
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: email,
          savings: report.totalMonthlySavings.toLocaleString() 
        })
      });
    } catch (emailError) {
      console.error("Email sending failed silently:", emailError);
      // We don't alert the user here because their data was still saved to the database successfully
    }

    setStatus('success');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Hero Section: Total Savings */}
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 text-center shadow-xl border border-gray-800 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-green-500 rounded-full blur-3xl opacity-20"></div>
        <h2 className="text-gray-400 font-medium tracking-wide uppercase text-sm mb-4">Your Potential Savings</h2>
        <div className="flex justify-center items-baseline space-x-2">
          <span className="text-6xl font-black tracking-tighter text-green-400">
            ${report.totalAnnualSavings.toLocaleString()}
          </span>
          <span className="text-xl text-gray-500 font-medium">/year</span>
        </div>
        <p className="mt-4 text-gray-400 text-lg">
          That's <span className="text-white font-semibold">${report.totalMonthlySavings.toLocaleString()}/month</span> in reclaimed capital.
        </p>
      </div>

      {/* Per-Tool Breakdown */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900 flex items-center">
          <AlertCircle className="w-5 h-5 mr-2 text-blue-600" />
          Audit Breakdown
        </h3>
        
        {report.results.map((result: AuditResult, index: number) => (
          <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm transition-all hover:shadow-md">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-lg font-bold text-gray-900">{result.toolName}</h4>
                <p className="text-sm text-gray-500 font-medium">Current Spend: ${result.currentSpend}/mo</p>
              </div>
              {result.monthlySavings > 0 ? (
                <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-bold flex items-center border border-green-100">
                  <TrendingDown className="w-4 h-4 mr-1" />
                  Save ${result.monthlySavings}/mo
                </div>
              ) : (
                <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-bold flex items-center border border-gray-200">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Optimized
                </div>
              )}
            </div>

            <div className="bg-gray-50 rounded-lg p-4 flex items-start">
              <ArrowRight className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">{result.recommendedAction}</p>
                <p className="text-gray-600 text-sm mt-1">{result.reason}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Summary Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 shadow-sm">
        <h3 className="text-sm font-bold text-blue-900 uppercase tracking-wider mb-2 flex items-center">
          <Sparkles className="w-4 h-4 mr-2" /> AI Auditor Note
        </h3>
        <p className="text-blue-800 text-sm leading-relaxed">{aiSummary}</p>
      </div>

      {/* Lead Capture Section */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-8 text-center">
        {status === 'success' ? (
          <div className="animate-in fade-in slide-in-from-bottom-2">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900">Report Sent!</h3>
            <p className="text-gray-600 mt-2">Check your inbox. Our team will review your stack and reach out shortly.</p>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Capture your full report</h3>
            <p className="text-gray-600 mb-6 text-sm">Enter your email to get a PDF copy of this audit and our step-by-step downgrade guide.</p>
            
            <div className="max-w-md mx-auto relative flex flex-col space-y-3">
              {/* HONEYPOT: Hidden from humans, bots will fill this in */}
              <input 
                type="text" 
                name="user_company_website" 
                value={honeyPot}
                onChange={(e) => setHoneyPot(e.target.value)}
                style={{ display: 'none' }} 
                tabIndex={-1} 
                autoComplete="off" 
              />
              
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="founder@startup.com" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all" 
                disabled={status === 'loading'}
              />
              <button 
                onClick={handleLeadCapture}
                disabled={status === 'loading'}
                className="w-full bg-black text-white px-4 py-3 rounded-md font-bold hover:bg-gray-800 transition-colors disabled:bg-gray-400 flex items-center justify-center"
              >
                {status === 'loading' ? 'Saving...' : 'Send Report'}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Reset Audit Button */}
      <button 
        onClick={onReset}
        className="w-full text-center text-gray-500 hover:text-gray-900 font-medium py-4 transition-colors"
      >
        ← Run another audit
      </button>

    </div>
  );
}