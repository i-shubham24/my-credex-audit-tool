import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function LeadCaptureForm({ monthlySavings }: { monthlySavings: number }) {
  const [email, setEmail] = useState('');
  const [honeyPot, setHoneyPot] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleLeadCapture = async () => {
    if (!email || honeyPot) return; 
    
    setStatus('loading');

    const { error } = await supabase
      .from('leads')
      .insert([{ email, total_savings: monthlySavings }]);

    if (error) {
      console.error("Supabase Error:", error);
      setStatus('idle');
      toast.error("Failed to save email. Please try again.");
      return;
    }

    try {
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: email,
          savings: monthlySavings.toLocaleString() 
        })
      });
    } catch (emailError) {
      console.error("Email sending failed silently:", emailError);
    }

    setStatus('success');
    toast.success("Check your inbox!");
  };

  if (status === 'success') {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-8 text-center animate-in fade-in slide-in-from-bottom-2">
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900">Report Sent!</h3>
        <p className="text-gray-600 mt-2">Our team will review your stack and reach out shortly.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-8 text-center">
      <h3 className="text-xl font-bold text-gray-900 mb-2">Capture your full report</h3>
      <p className="text-gray-600 mb-6 text-sm">Enter your email to get a PDF copy of this audit and our step-by-step downgrade guide.</p>
      
      <div className="max-w-md mx-auto relative flex flex-col space-y-3">
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
    </div>
  );
}