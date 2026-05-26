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