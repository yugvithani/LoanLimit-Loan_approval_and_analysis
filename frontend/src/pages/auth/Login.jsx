import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  BarChart2, 
  Banknote, 
  Briefcase 
} from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ 
    username: '', 
    password: '', 
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(async () => {
      try {
        if (formData.username && formData.password) {
          const response = {
            token: 'sample-token-123456',
            user: {
              name: formData.username,
              role: 'manager'
            }
          };
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          navigate('/dashboard', { state: { user: response.user } });
        } else {
          throw new Error('Invalid credentials');
        }
      } catch (err) {
        setError('Invalid username or password');
      } finally {
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex bg-slate-900">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-900 to-slate-800 flex-col justify-center items-center p-12">
        <div className="flex items-center mb-8">
          <BarChart2 size={48} className="text-blue-300 mr-4" />
          <h1 className="text-4xl font-bold text-white">LoanLimit Admin</h1>
        </div>

        <div className="relative w-full max-w-md h-64 mb-8">
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <Banknote size={180} className="text-blue-500 opacity-10" />
          </div>
        </div>

        <div className="bg-slate-800 bg-opacity-50 p-6 rounded-lg border border-blue-400 border-opacity-30 backdrop-filter backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-blue-300 mb-4">Loan Evaluation Dashboard Access</h2>
          <p className="text-slate-200 mb-4">Log in to assess loan eligibility, review ML-based risk profiles, and manage applicant data securely.</p>
          <div className="flex items-center">
            <Briefcase size={18} className="text-blue-300 mr-2" />
            <p className="text-sm text-blue-200">Protected by enterprise-grade security</p>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex justify-center items-center p-6">
        <div className="w-full max-w-md">
          <div className="mb-6 flex justify-center lg:hidden">
            <BarChart2 size={36} className="text-blue-300 mr-3" />
            <h1 className="text-3xl font-bold text-white">LoanLimit Admin</h1>
          </div>

          <form 
            onSubmit={handleSubmit} 
            className="bg-slate-800 shadow-xl rounded-lg px-8 pt-8 pb-10 mb-4 w-full border border-blue-500 border-opacity-20"
          >
            <h2 className="text-2xl mb-8 text-center font-semibold text-blue-300 flex items-center justify-center">
              <User size={24} className="mr-2" />
              Manager Login
            </h2>

            {/* Username */}
            <div className="mb-6">
              <label className="block text-sm font-bold mb-2 text-blue-300" htmlFor="username">
                Username
              </label>
              <div className="relative">
                <div className="absolute left-3 top-3 text-blue-400">
                  <User size={18} />
                </div>
                <input
                  className="shadow appearance-none border rounded w-full py-3 pl-10 pr-3 bg-slate-900 text-blue-200 border-blue-400 border-opacity-50 leading-tight focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-300 transition-all"
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="block text-sm font-bold mb-2 text-blue-300" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-3 top-3 text-blue-400">
                  <Lock size={18} />
                </div>
                <input
                  className="shadow appearance-none border rounded w-full py-3 pl-10 pr-10 bg-slate-900 text-blue-200 border-blue-400 border-opacity-50 leading-tight focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-300 transition-all"
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-blue-400 hover:text-blue-300 focus:outline-none"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-2 bg-red-900 bg-opacity-30 border border-red-400 rounded">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                {/* <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 text-blue-500 border-blue-400 rounded focus:ring-blue-500"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-blue-200">
                  Remember me
                </label> */}
              </div>
              <Link to="/forgot-password" className="text-sm text-blue-300 hover:text-blue-200 hover:underline">
                Forgot password?
              </Link>
            </div>

            <div className="mb-6">
              <button 
                className={`w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-3 px-4 rounded flex items-center justify-center transition-all ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                ) : (
                  <>
                    Access Dashboard
                    <ArrowRight size={18} className="ml-2" />
                  </>
                )}
              </button>
            </div>

            {/* <div className="flex items-center justify-center">
              <span className="block text-sm text-slate-400">
                Need help? <a href="#" className="text-blue-300 hover:text-blue-200 hover:underline">Contact Support</a>
              </span>
            </div> */}
          </form>

          <div className="text-center text-slate-500 text-sm">
            <p>© 2025 LoanLimit • All rights reserved</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
