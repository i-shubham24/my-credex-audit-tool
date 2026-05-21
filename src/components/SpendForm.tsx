import { useState, useEffect } from 'react';
import { AuditProfile, ToolInput, UseCase, ToolName } from '../lib/types';

export default function SpendForm({ onAuditSubmit }: { onAuditSubmit: (data: AuditProfile) => void }) {
  const [profile, setProfile] = useState<AuditProfile>(() => {
    const saved = localStorage.getItem('credex_audit_form');
    if (saved) return JSON.parse(saved);
    return { teamSize: 1, primaryUseCase: 'coding', tools: [] };
  });

  useEffect(() => {
    localStorage.setItem('credex_audit_form', JSON.stringify(profile));
  }, [profile]);

  const addTool = () => {
    const newTool: ToolInput = {
      id: crypto.randomUUID(),
      name: 'ChatGPT',
      plan: 'Plus',
      monthlySpend: 20,
      seats: 1
    };
    setProfile({ ...profile, tools: [...profile.tools, newTool] });
  };

  const updateTool = (id: string, field: keyof ToolInput, value: string | number) => {
    const updatedTools = profile.tools.map(t => t.id === id ? { ...t, [field]: value } : t);
    setProfile({ ...profile, tools: updatedTools });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAuditSubmit(profile);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 space-y-6 bg-white rounded-xl shadow-md border border-gray-200">
      <div className="grid grid-cols-2 gap-4 border-b pb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Team Size</label>
          <input 
            type="number" 
            min="1" 
            value={profile.teamSize} 
            onChange={(e) => setProfile({...profile, teamSize: Number(e.target.value)})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Primary Use Case</label>
          <select 
            value={profile.primaryUseCase} 
            onChange={(e) => setProfile({...profile, primaryUseCase: e.target.value as UseCase})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          >
            <option value="coding">Coding</option>
            <option value="writing">Writing</option>
            <option value="data">Data Analysis</option>
            <option value="research">Research</option>
            <option value="mixed">Mixed</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Your AI Stack</h3>
        {profile.tools.map((tool) => (
          <div key={tool.id} className="grid grid-cols-4 gap-4 bg-gray-50 p-4 rounded-md">
            <select 
              value={tool.name} 
              onChange={(e) => updateTool(tool.id, 'name', e.target.value as ToolName)}
              className="p-2 border rounded-md"
            >
              <option value="Cursor">Cursor</option>
              <option value="ChatGPT">ChatGPT</option>
              <option value="Claude">Claude</option>
              <option value="GitHub Copilot">GitHub Copilot</option>
            </select>
            <input 
              type="text" 
              value={tool.plan} 
              onChange={(e) => updateTool(tool.id, 'plan', e.target.value)} 
              placeholder="Plan (e.g. Pro)"
              className="p-2 border rounded-md"
            />
            <input 
              type="number" 
              value={tool.seats} 
              onChange={(e) => updateTool(tool.id, 'seats', Number(e.target.value))} 
              placeholder="Seats"
              className="p-2 border rounded-md"
            />
            <div className="flex items-center space-x-2">
              <span className="text-gray-500">$</span>
              <input 
                type="number" 
                value={tool.monthlySpend} 
                onChange={(e) => updateTool(tool.id, 'monthlySpend', Number(e.target.value))} 
                className="p-2 border rounded-md w-full"
              />
            </div>
          </div>
        ))}
        
        <button type="button" onClick={addTool} className="mt-2 text-sm text-blue-600 hover:text-blue-500 font-medium">
          + Add Tool
        </button>
      </div>

      <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
        Run Free Audit
      </button>
    </form>
  );
}