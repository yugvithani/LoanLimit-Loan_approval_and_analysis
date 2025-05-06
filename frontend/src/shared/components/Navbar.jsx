import { useState, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  BookmarkIcon,
  UserIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { AuthContext } from '../context/AuthContext';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar({ toggleModal, isModalOpen }) {
  const auth = useContext(AuthContext);
  const { query, setQuery } = useContext(AuthContext);
  const [navigation, setNavigation] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (auth?.isAuthenticated === false) {
      setNavigation([
        { name: 'Home', href: '/', icon: <HomeIcon className="w-5 h-5" /> },
        { name: 'About Us', href: '/about', icon: <UserIcon className="w-5 h-5" /> },
      ]);
    } else {
      setNavigation([
        { name: 'Home', href: '/', icon: <HomeIcon className="w-5 h-5" /> },
        { name: 'About Us', href: '/about', icon: <UserIcon className="w-5 h-5" /> },
        { name: 'Create', href: '/create', icon: <BookmarkIcon className="w-5 h-5" /> },
      ]);
    }
  }, [auth]);

  return (
    <nav className="bg-slate-900 shadow-md sticky top-0 z-50 border-b border-slate-800">
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between h-14">
        {/* Logo */}
        <NavLink
          to="/"
          className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text"
        >
          LoanLimit
        </NavLink>

        {/* Search (hidden on mobile) */}
        <div className="relative flex-1 hidden sm:flex justify-center">
          <div className="w-56">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search..."
              className="block w-full pl-3 pr-3 py-1.5 text-sm rounded-md bg-slate-800 text-white focus:ring-2 focus:ring-blue-400 transition-shadow"
            />
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center space-x-5">
          {navigation?.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                classNames(
                  isActive
                    ? 'text-blue-400 border-b-2 border-blue-400'
                    : 'text-gray-300 hover:text-white',
                  'px-2 py-1 text-sm font-medium transition flex items-center space-x-2'
                )
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}

          {/* Auth Button */}
          {auth.isAuthenticated && (
            <button
              onClick={auth.logout}
              className="flex items-center space-x-2 text-red-500 hover:text-red-600 bg-slate-800 px-3 py-1.5 rounded-md transition"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
              <span>Logout</span>
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="sm:hidden text-white"
        >
          {mobileMenuOpen ? (
            <XMarkIcon className="w-7 h-7" />
          ) : (
            <Bars3Icon className="w-7 h-7" />
          )}
        </button>
      </div>

      {/* Mobile Menu Content */}
      {mobileMenuOpen && (
        <div className="sm:hidden absolute top-full left-0 w-full bg-slate-900 border-t border-slate-800 p-4 flex flex-col space-y-3 z-40">
          {navigation?.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className="flex items-center space-x-3 text-gray-300 hover:text-white py-2 px-4 rounded-md transition block w-full"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}

          {auth.isAuthenticated && (
            <button
              onClick={() => {
                auth.logout();
                setMobileMenuOpen(false);
              }}
              className="flex items-center space-x-3 text-red-500 hover:text-red-600 py-2 px-4 w-full rounded-md transition"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
              <span>Logout</span>
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
