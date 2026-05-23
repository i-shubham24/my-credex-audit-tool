import { AuditResult } from '../lib/types';
import { AlertCircle, TrendingDown, CheckCircle, ArrowRight } from 'lucide-react';

export default function AuditBreakdown({ results }: { results: AuditResult[] }) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-900 flex items-center">
        <AlertCircle className="w-5 h-5 mr-2 text-blue-600" />
        Audit Breakdown
      </h3>
      
      {results.map((result, index) => (
        <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
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
  );
}