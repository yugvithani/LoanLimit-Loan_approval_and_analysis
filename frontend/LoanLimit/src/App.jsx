import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import AnalysisPage from './pages/AnalysisPage'
import DocumentationPage from './pages/DocumentationPage'
import SettingsPage from './pages/SettingsPage'
import AdminLoginPage from './pages/AdminLoginPage'
import ManagersPage from './pages/ManagersPage'
import ManagerLoginPage from './pages/ManagerLoginPage'
import { useState } from 'react'
import { useCallback } from 'react'
import { AuthContext } from './components/AuthContext'

function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = useCallback((userData, token) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("token", token);
  }, []);
  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, setUser }}
    >
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="analysis" element={<AnalysisPage />} />
              <Route path="documentation" element={<DocumentationPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path="/admin/managers" element={<ManagersPage />} />
          </>
        ) : (
          <>
            <Route path="/" element={<ManagerLoginPage />} />
            <Route path="/admin" element={<AdminLoginPage />} />
          </>
        )}
      </Routes>
    </AuthContext.Provider>
  )
}

export default App