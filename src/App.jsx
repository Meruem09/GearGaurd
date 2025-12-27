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
              <Route path="/" element={<ProtectedRoute><div className="p-8">
                <div className="mb-12">
                  <h1 className="text-4xl font-bold text-gray-900 mb-3">Welcome to GearGuard</h1>
                  <p className="text-xl text-gray-600">Your comprehensive equipment maintenance management solution</p>
                </div>

                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">About GearGuard</h2>
                  <p className="text-gray-700 leading-relaxed max-w-3xl">
                    GearGuard is a powerful maintenance management system designed to help organizations efficiently track, manage, and maintain their equipment assets. Whether you're managing machinery, vehicles, computers, or any other equipment, GearGuard provides the tools you need to ensure optimal performance, reduce downtime, and extend equipment lifecycle.
                  </p>
                </div>

                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                      <div className="text-blue-600 text-3xl mb-3">📦</div>
                      <h3 className="font-semibold text-gray-900 mb-2">Equipment Management</h3>
                      <p className="text-sm text-gray-600">Track all your equipment, serial numbers, locations, and ownership details in one centralized system.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                      <div className="text-green-600 text-3xl mb-3">👥</div>
                      <h3 className="font-semibold text-gray-900 mb-2">Team Management</h3>
                      <p className="text-sm text-gray-600">Organize technicians into teams and assign them to specific equipment for efficient maintenance coordination.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                      <div className="text-orange-600 text-3xl mb-3">⚙️</div>
                      <h3 className="font-semibold text-gray-900 mb-2">Maintenance Requests</h3>
                      <p className="text-sm text-gray-600">Create and track both corrective and preventive maintenance requests with detailed workflows and scheduling.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                      <div className="text-purple-600 text-3xl mb-3">📅</div>
                      <h3 className="font-semibold text-gray-900 mb-2">Calendar & Kanban</h3>
                      <p className="text-sm text-gray-600">Visualize maintenance schedules on a calendar and manage workflow stages on a Kanban board.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-600 p-8 rounded-lg">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">Get Started</h2>
                  <p className="text-gray-700 mb-4">Ready to manage your first maintenance request?</p>
                  <Link to="/requests" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                    Click Here to Send Your First Request →
                  </Link>
                </div>
              </div></ProtectedRoute>} />
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
