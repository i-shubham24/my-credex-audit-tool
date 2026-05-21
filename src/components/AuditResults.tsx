import { FullReport, AuditResult } from '../lib/types';
import { TrendingDown, CheckCircle, ArrowRight, DollarSign, AlertCircle, Sparkles } from 'lucide-react';

interface AuditResultsProps {
  report: FullReport;
  onReset: () => void;
}

export default function AuditResults({ report, onReset }: AuditResultsProps) {
  const isHighlyOptimized = report.totalMonthlySavings < 100;
  const isHighSavings = report.totalMonthlySavings > 500;

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

      {/* Dynamic CTA Section based on savings amount */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {isHighlyOptimized ? (
          <div className="p-8 text-center bg-gray-50">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">You're spending well.</h3>
            <p className="text-gray-600 mb-6">Your AI stack is highly optimized for your current usage. We won't try to manufacture savings that aren't there.</p>
            <div className="max-w-md mx-auto relative">
              <input type="email" placeholder="Enter email for optimization alerts" className="w-full pl-4 pr-32 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none" />
              <button className="absolute right-1 top-1 bottom-1 bg-black text-white px-4 rounded-md font-medium text-sm hover:bg-gray-800">
                Notify Me
              </button>
            </div>
          </div>
        ) : isHighSavings ? (
          <div className="p-8 text-center bg-blue-50 border-t-4 border-blue-600">
            <Sparkles className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Unlock wholesale pricing.</h3>
            <p className="text-blue-800 mb-6 font-medium">You have significant savings potential. Credex can route your volume through wholesale API credits to capture this.</p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 flex items-center mx-auto transition-transform hover:-translate-y-0.5">
              Book Credex Consultation <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        ) : (
          <div className="p-8 text-center">
            <DollarSign className="w-12 h-12 text-gray-900 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Save this report</h3>
            <p className="text-gray-600 mb-6">Enter your email to get a PDF copy of this audit and a step-by-step guide to downgrading these plans.</p>
            <div className="max-w-md mx-auto relative">
              <input type="email" placeholder="founder@startup.com" className="w-full pl-4 pr-32 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none" />
              <button className="absolute right-1 top-1 bottom-1 bg-black text-white px-4 rounded-md font-medium text-sm hover:bg-gray-800 transition-colors">
                Send Report
              </button>
            </div>
          </div>
        )}
      </div>

      <button 
        onClick={onReset}
        className="w-full text-center text-gray-500 hover:text-gray-900 font-medium py-4 transition-colors"
      >
        ← Run another audit
      </button>

    </div>
  );
}
