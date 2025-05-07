import { useContext, useState, useRef, useEffect } from 'react';
import { FiUser, FiMail, FiMapPin, FiCreditCard, FiHome, FiX, FiBarChart2, FiPieChart, FiFileText, FiLogOut, FiMenu } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from './AuthContext';
import React from 'react'
import { Link, NavLink } from 'react-router-dom';


// This component will be imported and used in your Navbar.jsx
const ProfilePopup = ({ isOpen, onClose }) => {
  const { user } = useContext(AuthContext); // Assuming AuthContext provides user info
  const popupRef = useRef(null);

  // Sample user data - replace with actual data from your AuthContext
  const managerInfo = {
    name: user?.managerName || 'John Doe',
    email: user?.managerMail || 'john.doe@banklimit.com',
    branch: user?.branchName || 'Main Branch',
    city: user?.city || 'New York',
    username: user?.userName || 'johndoe123'
  };

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <motion.div
        ref={popupRef}
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="bg-neutral-800 border border-neutral-700 rounded-lg shadow-xl w-80 max-w-full overflow-hidden z-50"
      >
            {/* Header with close button */}
            <div className="flex items-center justify-between p-4 border-b border-neutral-700">
              <h3 className="text-lg font-medium text-white">Manager Profile</h3>
              <button 
                onClick={onClose}
                className="text-neutral-400 hover:text-white transition rounded-full p-1 hover:bg-neutral-700"
              >
                <FiX size={20} />
              </button>
            </div>
            
            {/* Profile Image */}
            <div className="flex justify-center pt-6 pb-2">
              <div className="relative">
                <div className="w-24 h-24 bg-primary-500/20 rounded-full flex items-center justify-center text-primary-300">
                  <FiUser size={40} />
                </div>
                <div className="absolute bottom-0 right-0 bg-green-500 w-5 h-5 rounded-full border-2 border-neutral-800"></div>
              </div>
            </div>

            {/* Name */}
            <div className="text-center mb-4">
              <h4 className="text-xl font-bold text-white">{managerInfo.name}</h4>
              <p className="text-sm text-primary-300">Bank Manager</p>
            </div>

            {/* Info Cards */}
            <div className="px-4 pb-6 space-y-3">
              <div className="flex items-center p-3 bg-neutral-700/30 rounded-lg hover:bg-neutral-700/50 transition">
                <div className="p-2 bg-primary-500/20 rounded-md text-primary-300 mr-3">
                  <FiMail size={18} />
                </div>
                <div>
                  <p className="text-xs text-neutral-400">Email</p>
                  <p className="text-sm text-white truncate">{managerInfo.email}</p>
                </div>
              </div>

              <div className="flex items-center p-3 bg-neutral-700/30 rounded-lg hover:bg-neutral-700/50 transition">
                <div className="p-2 bg-primary-500/20 rounded-md text-primary-300 mr-3">
                  <FiHome size={18} />
                </div>
                <div>
                  <p className="text-xs text-neutral-400">Branch</p>
                  <p className="text-sm text-white">{managerInfo.branch}</p>
                </div>
              </div>

              <div className="flex items-center p-3 bg-neutral-700/30 rounded-lg hover:bg-neutral-700/50 transition">
                <div className="p-2 bg-primary-500/20 rounded-md text-primary-300 mr-3">
                  <FiMapPin size={18} />
                </div>
                <div>
                  <p className="text-xs text-neutral-400">City</p>
                  <p className="text-sm text-white">{managerInfo.city}</p>
                </div>
              </div>

              <div className="flex items-center p-3 bg-neutral-700/30 rounded-lg hover:bg-neutral-700/50 transition">
                <div className="p-2 bg-primary-500/20 rounded-md text-primary-300 mr-3">
                  <FiCreditCard size={18} />
                </div>
                <div>
                  <p className="text-xs text-neutral-400">Username</p>
                  <p className="text-sm text-white">{managerInfo.username}</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-neutral-900 p-4 border-t border-neutral-700">
              <button 
                onClick={onClose}
                className="w-full py-2 rounded-md bg-primary-500 hover:bg-primary-600 text-white font-medium transition focus:outline-none focus:ring-2 focus:ring-primary-500/50"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// Updated Navbar component with profile popup functionality
// Includes only the changes needed for the profile popup
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { logout } = useContext(AuthContext);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  const navItems = [
    { name: 'Home', path: '/', icon: <FiHome /> },
    { name: 'Dashboard', path: '/dashboard', icon: <FiBarChart2 /> },
    { name: 'Risk Analysis', path: '/analysis', icon: <FiPieChart /> },
    { name: 'Documentation', path: '/documentation', icon: <FiFileText /> },
    // { name: 'Settings', path: '/settings', icon: <FiSettings /> },
  ];

  const activeClass = "text-primary-300 border-b-2 border-primary-500";
  const inactiveClass = "text-neutral-300 hover:text-white border-b-2 border-transparent hover:border-primary-500/30 transition-all duration-200";
  
  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur-md bg-neutral-900/80 border-b border-neutral-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <motion.div 
                className="text-primary-500 text-2xl font-bold"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                LoanLimit
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navItems.map(item => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) => 
                    `flex items-center space-x-1 py-2 ${isActive ? activeClass : inactiveClass}`
                  }
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </nav>

            {/* User Options */}
            <div className="hidden md:flex items-center space-x-4">
              <button 
                className="flex items-center space-x-1 text-neutral-300 hover:text-white transition"
                onClick={toggleProfile}
              >
                <FiUser />
                <span>Profile</span>
              </button>
              <button className="flex items-center space-x-1 text-neutral-300 hover:text-white transition" onClick={()=>logout()}>
                <FiLogOut />
                <span>Logout</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={toggleMenu} className="p-2 text-neutral-300 hover:text-white">
                {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <motion.div 
              className="md:hidden bg-neutral-800 rounded-lg mt-2 mb-4 overflow-hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col p-2">
                {navItems.map(item => (
                  <NavLink 
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) => 
                      `flex items-center space-x-3 p-3 rounded-md ${isActive ? 'bg-primary-500/20 text-primary-300' : 'hover:bg-neutral-700 text-neutral-300'}`
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </NavLink>
                ))}
                <div className="border-t border-neutral-700 my-2"></div>
                <button 
                  className="flex items-center space-x-3 p-3 rounded-md hover:bg-neutral-700 text-neutral-300"
                  onClick={() => {
                    setIsMenuOpen(false);
                    toggleProfile();
                  }}
                >
                  <FiUser />
                  <span>Profile</span>
                </button>
                <button className="flex items-center space-x-3 p-3 rounded-md hover:bg-neutral-700 text-neutral-300" onClick={()=>logout()}>
                  <FiLogOut />
                  <span>Logout</span>
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </header>

      {/* Profile Popup */}
      <ProfilePopup isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </>
  );
}

export default Navbar;
