import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Equipment from './components/Equipment';
import Teams from './components/Teams';
import Requests from './components/Requests';
import Kanban from './components/Kanban';
import Calendar from './components/Calendar';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('auth');
    setIsAuthenticated(auth === 'true');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth');
    setIsAuthenticated(false);
  };

  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  const AuthRoute = ({ children }) => {
    return !isAuthenticated ? children : <Navigate to="/" />;
  };

  return (
    <Router>
      {isAuthenticated ? (
        <div className="flex h-screen bg-gray-50">
          <nav className="w-64 bg-white shadow-lg border-r border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-blue-600">GearGuard</h2>
            </div>
            <ul className="space-y-1 p-4">
              <li><Link to="/equipment" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md transition duration-200">Equipment</Link></li>
              <li><Link to="/teams" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md transition duration-200">Teams</Link></li>
              <li><Link to="/requests" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md transition duration-200">Requests</Link></li>
              <li><Link to="/kanban" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md transition duration-200">Kanban Board</Link></li>
              <li><Link to="/calendar" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md transition duration-200">Calendar</Link></li>
            </ul>
            <div className="p-4 border-t border-gray-200">
              <button onClick={handleLogout} className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md shadow-sm transition duration-200">Logout</button>
            </div>
          </nav>
          <main className="flex-1 overflow-auto">
            <Routes>
              <Route path="/equipment" element={<ProtectedRoute><Equipment /></ProtectedRoute>} />
              <Route path="/teams" element={<ProtectedRoute><Teams /></ProtectedRoute>} />
              <Route path="/requests" element={<ProtectedRoute><Requests /></ProtectedRoute>} />
              <Route path="/kanban" element={<ProtectedRoute><Kanban /></ProtectedRoute>} />
              <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
              <Route path="/" element={<ProtectedRoute><div className="p-6"><h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to GearGuard</h1><p className="text-gray-600">Manage your maintenance efficiently.</p></div></ProtectedRoute>} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
          <Route path="/signup" element={<AuthRoute><Signup /></AuthRoute>} />
          <Route path="/forgot-password" element={<AuthRoute><ForgotPassword /></AuthRoute>} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
