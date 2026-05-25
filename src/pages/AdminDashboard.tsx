import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Lock, Users, ArrowRight, ShieldAlert } from 'lucide-react';
import toast from 'react-hot-toast';

interface Lead {
  id: number;
  email: string;
  total_savings: number;
  created_at: string;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === '2026') {
      setIsAuthenticated(true);
      fetchLeads();
      toast.success('Access Granted');
    } else {
      toast.error('Invalid Passcode');
      setPasscode('');
    }
  };

  const fetchLeads = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to load database records.');
    } else {
      setLeads(data || []);
    }
    setIsLoading(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-center animate-in zoom-in-95">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="w-8 h-8 text-gray-900" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Admin Access</h2>
        <form onSubmit={handleLogin} className="space-y-4 mt-8">
          <input
            type="password"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            placeholder="••••"
            className="w-full px-4 py-3 text-center tracking-[0.5em] text-2xl border border-gray-300 rounded-xl focus:ring-2 focus:ring-black outline-none"
            autoFocus
          />
          <button type="submit" className="w-full bg-black text-white py-3 rounded-xl font-bold hover:bg-gray-800">
            Unlock Dashboard
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-8 animate-in fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black flex items-center">
            <Users className="w-8 h-8 mr-3 text-blue-600" />
            Lead Command Center
          </h1>
        </div>
        <div className="bg-green-50 text-green-700 px-4 py-2 rounded-full font-bold border border-green-200">
          {leads.length} Total Leads
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-gray-500">Loading...</div>
        ) : leads.length === 0 ? (
          <div className="p-12 text-center">
            <ShieldAlert className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No leads captured yet.</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-sm uppercase">
                <th className="p-4">Email</th>
                <th className="p-4">Savings</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="p-4 font-medium">{lead.email}</td>
                  <td className="p-4 font-bold text-green-600">${lead.total_savings}/mo</td>
                  <td className="p-4 text-gray-500 text-sm">{new Date(lead.created_at).toLocaleDateString()}</td>
                  <td className="p-4 text-right">
                    <button className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center justify-end w-full">
                      Contact <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}