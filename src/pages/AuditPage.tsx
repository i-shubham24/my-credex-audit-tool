import { useState } from 'react';
import SpendForm from '../components/SpendForm';
import AuditResults from '../components/AuditResults';
import { FullReport, AuditProfile, AuditResult } from '../lib/types';
import { SUPPORTED_TOOLS } from '../lib/constants';
import { Bot, Zap } from 'lucide-react'; 

export default function AuditPage() {
  const [report, setReport] = useState<FullReport | null>(null);

  const handleAuditSubmit = (data: AuditProfile) => {
    let totalMonthlySavings = 0;
    
    const auditResults: AuditResult[] = data.selectedTools.map((selection) => {
      const tool = SUPPORTED_TOOLS.find(t => t.id === selection.toolId);
      const plan = tool?.plans.find(p => p.id === selection.planId);
      const currentToolSpend = (plan?.price || 0) * data.teamSize;

      const isHighTier = selection.planId.includes('enterprise') || 
                         selection.planId.includes('pro') || 
                         selection.planId.includes('business');

      const monthlySavings = isHighTier ? currentToolSpend * 0.35 : 0;
      totalMonthlySavings += monthlySavings;

      return {
        toolId: tool?.id || 'unknown',
        toolName: tool?.name || 'Unknown Tool',
        currentSpend: currentToolSpend,
        monthlySavings: Math.round(monthlySavings),
        annualSavings: Math.round(monthlySavings * 12),
        recommendedAction: isHighTier ? "Switch to API-Direct" : "Already Optimized",
        reason: isHighTier 
          ? `Usage metrics suggest $${Math.round(monthlySavings)} in seat redundancy.`
          : `Most cost-effective tier for ${tool?.name}.`
      };
    });

    setReport({
      totalMonthlySavings: Math.round(totalMonthlySavings),
      totalAnnualSavings: Math.round(totalMonthlySavings * 12),
      credexEligible: totalMonthlySavings > 300,
      results: auditResults
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="flex justify-center mb-6">
          <div className="bg-black p-4 rounded-3xl shadow-2xl rotate-3 hover:rotate-0 transition-transform cursor-pointer">
            <Bot className="w-12 h-12 text-white" />
          </div>
        </div>
        
        <h1 className="text-5xl font-black text-gray-900 tracking-tighter mb-4 sm:text-6xl">
          AI Stack <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Auditor</span>
        </h1>
        
        <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
          The industry standard for optimizing 2026 AI subscriptions. Identify duplicate seats and hidden API waste in <span className="text-black font-bold">60 seconds.</span>
        </p>

        {!report && (
          <div className="mt-6 flex items-center justify-center space-x-2 text-sm font-bold text-indigo-600 bg-indigo-50 w-fit mx-auto px-4 py-2 rounded-full border border-indigo-100">
            <Zap className="w-4 h-4" />
            <span>Now supporting DeepSeek, Grok, and Cursor</span>
          </div>
        )}
      </div>

      <main className="relative pb-20">
        {!report ? (
          <SpendForm onAuditSubmit={handleAuditSubmit} />
        ) : (
          <AuditResults report={report} onReset={() => setReport(null)} />
        )}
      </main>

      <footer className="text-center py-10 opacity-30 grayscale hover:grayscale-0 transition-all">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
          Powered by the Credex Financial Engine
        </p>
      </footer>
    </div>
  );
}