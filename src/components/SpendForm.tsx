import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react'; 
import { SUPPORTED_TOOLS } from '../lib/constants';

export default function SpendForm({ onAuditSubmit }: { onAuditSubmit: (data: any) => void }) {
  const [teamSize, setTeamSize] = useState(10);
  const [selectedTools, setSelectedTools] = useState([{ toolId: 'openai', planId: 'plus' }]);

  const updateTool = (index: number, field: string, value: string) => {
    const newTools = [...selectedTools];
    (newTools[index] as any)[field] = value;
    if (field === 'toolId') {
      newTools[index].planId = SUPPORTED_TOOLS.find(t => t.id === value)?.plans[0].id || '';
    }
    setSelectedTools(newTools);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 max-w-2xl mx-auto border border-gray-100">
      <div className="mb-8">
        <label className="block text-xs font-black text-gray-400 uppercase mb-2">Team Size</label>
        <input type="number" value={teamSize} onChange={(e) => setTeamSize(Number(e.target.value))} className="w-full bg-gray-50 p-4 rounded-xl text-2xl font-bold border-2 border-transparent focus:border-black outline-none" />
      </div>

      <div className="space-y-3 mb-8">
        <label className="block text-xs font-black text-gray-400 uppercase">Active Subscriptions</label>
        {selectedTools.map((sel, idx) => (
          <div key={idx} className="flex gap-2 animate-in slide-in-from-left-2">
            <select value={sel.toolId} onChange={(e) => updateTool(idx, 'toolId', e.target.value)} className="flex-1 bg-gray-50 p-3 rounded-xl font-bold">
              {SUPPORTED_TOOLS.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
            <select value={sel.planId} onChange={(e) => updateTool(idx, 'planId', e.target.value)} className="flex-1 bg-gray-50 p-3 rounded-xl font-bold">
              {SUPPORTED_TOOLS.find(t => t.id === sel.toolId)?.plans.map(p => <option key={p.id} value={p.id}>{p.name} (${p.price})</option>)}
            </select>
            <button onClick={() => setSelectedTools(selectedTools.filter((_, i) => i !== idx))} className="p-3 text-gray-300 hover:text-red-500">
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      <button onClick={() => setSelectedTools([...selectedTools, { toolId: 'openai', planId: 'plus' }])} className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 font-bold hover:border-black hover:text-black mb-6 transition-all flex items-center justify-center">
        <Plus className="w-5 h-5 mr-2" /> Add Tool
      </button>
      
      <button onClick={() => onAuditSubmit({ teamSize, selectedTools })} className="w-full bg-black text-white py-4 rounded-2xl font-black text-xl flex items-center justify-center hover:scale-[1.02] shadow-lg transition-transform">
        Run AI Audit
      </button>
    </div>
  );
}