import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLock, FiUser } from 'react-icons/fi';
import { useHttpClient } from '../components/HttpHook';
import { AuthContext } from '../components/AuthContext';

function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { isLoading, error, sendRequest } = useHttpClient();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const responseData = await sendRequest(
        import.meta.env.VITE_REST_API_URL+'/auth/admin',
        'POST',
        JSON.stringify({ username, password }),
        {
          'Content-Type': 'application/json',
        }
      );
      login(responseData.user, responseData.token);
      // navigate('/admin', { state: { user: responseData.user } });
    } catch (err) {
      // Error already handled in hook
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
        <div className="bg-neutral-900 border border-neutral-700 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Admin Login</h2>

          {error && (
            <div className="bg-red-900/20 border border-red-400 text-red-300 px-4 py-2 rounded-md mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            {/* Username */}
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
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-md py-2 pl-10 pr-3 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter username"
                  required
                />
              </div>
            </div>

            {/* Password */}
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
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-md py-2 pl-10 pr-3 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className={`w-full py-2 px-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all flex items-center justify-center ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
              ) : (
                'Login'
              )}
            </button>

            {/* Manager Login Link Below Button */}
            <div className="text-center mt-4 text-sm">
              <Link to="/" className="text-blue-400 hover:text-blue-500 transition-colors">
                Login as Manager
              </Link>
            </div>
          </form>
        </div>
        <div className="text-center pt-3 text-slate-500 text-sm">
          <p>© 2025 LoanLimit • All rights reserved • <Link to="/">Manager Login</Link></p>
        </div>
      </motion.div>
    </div>
  );
}

export default AdminLoginPage;
