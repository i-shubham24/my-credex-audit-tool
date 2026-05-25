// import { Toaster } from 'react-hot-toast';
// import { useState } from 'react';
// import SpendForm from './components/SpendForm';
// import AuditResults from './components/AuditResults'; // <-- ADD THIS IMPORT
// import { runAudit } from './lib/auditEngine';
// import { AuditProfile, FullReport } from './lib/types';
// import './index.css';

// function App() {
//   const [report, setReport] = useState<FullReport | null>(null);

//   const handleAuditSubmit = (profile: AuditProfile) => {
//     const results = runAudit(profile);
//     setReport(results);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <Toaster position="top-center" reverseOrder={false} />
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-3xl mx-auto">
        
//         <div className="text-center mb-10">
//           <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
//             AI Spend Auditor
//           </h1>
//           <p className="mt-3 text-lg text-gray-600">
//             Most startups overpay for AI tools. Find out if you're one of them.
//           </p>
//         </div>
        
//         {/* Toggle between Form and Results */}
//         {!report ? (
//           <SpendForm onAuditSubmit={handleAuditSubmit} />
//         ) : (
//           <AuditResults report={report} onReset={() => setReport(null)} /> // <-- USE NEW COMPONENT HERE
//         )}

//       </div>
//     </div>
//     </div>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AuditPage from './pages/AuditPage';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Toaster position="top-center" reverseOrder={false} />
        
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<AuditPage />} />
          
          {/* Private Route */}
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;