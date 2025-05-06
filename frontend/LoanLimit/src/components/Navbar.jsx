import { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHome, FiBarChart2, FiPieChart, FiFileText, FiSettings, FiUser, FiLogOut, FiMenu, FiX } from 'react-icons/fi'
import React from 'react'
import { AuthContext } from './AuthContext'
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { logout } = useContext(AuthContext);
  

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const navItems = [
    { name: 'Home', path: '/', icon: <FiHome /> },
    { name: 'Dashboard', path: '/dashboard', icon: <FiBarChart2 /> },
    { name: 'Analysis', path: '/analysis', icon: <FiPieChart /> },
    { name: 'Documentation', path: '/documentation', icon: <FiFileText /> },
    { name: 'Settings', path: '/settings', icon: <FiSettings /> },
  ]

  const activeClass = "text-primary-300 border-b-2 border-primary-500"
  const inactiveClass = "text-neutral-300 hover:text-white border-b-2 border-transparent hover:border-primary-500/30 transition-all duration-200"
  
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-neutral-900/80 border-b border-neutral-800">
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
              
              <button className="flex items-center space-x-3 p-3 rounded-md hover:bg-neutral-700 text-neutral-300" onClick={()=>logout()}>
                <FiLogOut />
                <span>Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  )
}

export default Navbar