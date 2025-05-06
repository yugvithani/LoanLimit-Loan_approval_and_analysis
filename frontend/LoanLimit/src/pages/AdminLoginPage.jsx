import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLock, FiUser } from 'react-icons/fi';

function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple admin validation - in real app, use proper authentication
    if (username === 'admin' && password === 'admin123') {
      navigate('/admin/managers');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950">
      <motion.div 
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Admin Login</h2>
          
          {error && (
            <div className="bg-error-500/20 border border-error-500/30 text-error-500 px-4 py-2 rounded-md mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-neutral-300 mb-1">
                Username
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-3 text-neutral-500" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-md py-2 pl-10 pr-3 text-white focus:outline-none focus:ring-1 focus:ring-primary-500"
                  placeholder="Enter username"
                  required
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-300 mb-1">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-3 text-neutral-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-md py-2 pl-10 pr-3 text-white focus:outline-none focus:ring-1 focus:ring-primary-500"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full btn btn-primary"
            >
              Login
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default AdminLoginPage;