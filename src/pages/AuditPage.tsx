import { useState } from 'react';
import SpendForm from '../components/SpendForm';
import AuditResults from '../components/AuditResults';
import { FullReport, AuditProfile } from '../lib/types';
import { Bot } from 'lucide-react';

export default function AuditPage() {
  const [report, setReport] = useState<FullReport | null>(null);

  // The Bridge: Connects the Form to the Results
  const handleAuditSubmit = (data: AuditProfile) => {
    const calculatedReport: FullReport = {
      totalMonthlySavings: 1500,
      totalAnnualSavings: 18000,
      credexEligible: true,
      results: [
        {
          toolId: "example-1", // <-- ADDED: A placeholder ID
          toolName: "Example Tool",
          currentSpend: data.teamSize * 30,
          monthlySavings: data.teamSize * 15,
          annualSavings: (data.teamSize * 15) * 12, // <-- ADDED: The missing math
          recommendedAction: "Downgrade to Pro",
          reason: "Not fully utilizing Enterprise features."
        }
      ]
    };
    setReport(calculatedReport);
  };
  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12 animate-in fade-in slide-in-from-top-4 duration-500">
        <div className="flex justify-center mb-4">
          <div className="bg-black p-3 rounded-2xl shadow-lg">
            <Bot className="w-10 h-10 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-black text-gray-900 tracking-tight sm:text-5xl mb-4">
          AI Stack <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-900">Auditor</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
          Identify wasted spend, duplicate licenses, and API optimization opportunities in your startup's AI stack.
        </p>
      </div>

      {!report ? (
        <SpendForm onAuditSubmit={handleAuditSubmit} />
      ) : (
        <AuditResults report={report} onReset={() => setReport(null)} />
      )}
    </div>
  );
}