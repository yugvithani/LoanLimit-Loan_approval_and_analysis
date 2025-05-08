import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useHttpClient } from '../components/HttpHook';
import { Lock, KeyRound, ShieldCheck } from 'lucide-react';
import { FiUser } from 'react-icons/fi';

const VerifyManagerPage = () => {
  const { username } = useParams(); // Get username from URL
  const [formData, setFormData] = useState({
    tempPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [validationError, setValidationError] = useState('');
  const { isLoading, error, sendRequest } = useHttpClient();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setValidationError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      setValidationError("New password and confirm password must match.");
      return;
    }

    try {
        console.log(formData)
      await sendRequest(
        import.meta.env.VITE_REST_API_URL+'/auth/manager-verify/'+username,
        'POST',
        JSON.stringify({
          oldPassword: formData.tempPassword,
          newPassword: formData.newPassword,
        }),
        {
          'Content-Type': 'application/json',
        }
      );
      navigate('/');
    } catch (err) {
      // handled by hook
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="w-full max-w-md bg-slate-800 p-8 rounded-lg border border-blue-400 border-opacity-20 shadow-lg">
        <h2 className="text-2xl font-semibold text-blue-300 mb-1 text-center flex items-center justify-center">
          <ShieldCheck size={24} className="mr-2" />
          Verify Manager Account
        </h2>
        <p className="text-sm font-semibold text-blue-200 mb-6 mt-2 text-center flex items-center justify-center"><FiUser size={20} className="mr-2" />{username}</p>

        {validationError && (
          <div className="mb-4 p-2 bg-red-900 bg-opacity-30 border border-red-400 rounded">
            <p className="text-red-300 text-sm">{validationError}</p>
          </div>
        )}

        {error && (
          <div className="mb-4 p-2 bg-red-900 bg-opacity-30 border border-red-400 rounded">
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Temp Password */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-blue-300" htmlFor="tempPassword">
              Temporary Password
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-3 text-blue-400" size={18} />
              <input
                type="password"
                id="tempPassword"
                name="tempPassword"
                value={formData.tempPassword}
                onChange={handleChange}
                className="w-full py-3 pl-10 pr-3 rounded bg-slate-900 text-blue-200 border border-blue-400 border-opacity-50 focus:outline-none focus:ring-1 focus:ring-blue-300"
                placeholder="Enter temporary password"
                required
              />
            </div>
          </div>

          {/* New Password */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-blue-300" htmlFor="newPassword">
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-blue-400" size={18} />
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full py-3 pl-10 pr-3 rounded bg-slate-900 text-blue-200 border border-blue-400 border-opacity-50 focus:outline-none focus:ring-1 focus:ring-blue-300"
                placeholder="Enter new password"
                required
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2 text-blue-300" htmlFor="confirmPassword">
              Confirm New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-blue-400" size={18} />
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full py-3 pl-10 pr-3 rounded bg-slate-900 text-blue-200 border border-blue-400 border-opacity-50 focus:outline-none focus:ring-1 focus:ring-blue-300"
                placeholder="Confirm new password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className={`w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-3 px-4 rounded flex items-center justify-center transition-all ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
            ) : (
              'Verify & Set Password'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyManagerPage;
