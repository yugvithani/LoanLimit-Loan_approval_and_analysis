import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import AnalysisPage from './pages/AnalysisPage'
import DocumentationPage from './pages/DocumentationPage'
import AdminLoginPage from './pages/AdminLoginPage'
import ManagersPage from './pages/ManagersPage'
import ManagerLoginPage from './pages/ManagerLoginPage'
import { useState } from 'react'
import { useCallback } from 'react'
import { AuthContext } from './components/AuthContext'
import VerifyManagerPage from './pages/VerifyManagerPage'
import { useHttpClient } from './components/HttpHook'
import { Loader2 } from 'lucide-react'

function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const login = useCallback((userData, token) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("token", token);
    console.log(userData)
  }, []);
  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  }, []);

  // Auto-login for manager using stored token and sendRequest
  useEffect(() => {
    const autoLogin = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }

      try {
        const response = await sendRequest(
          'http://localhost:8000/manager/get-manager',
          'GET',
          null,
          {
            Authorization: `Bearer ${token}`,
          }
        );
        console.log(response);
        if (response.manager) {
          login(response.manager, token);
        }
      } catch (err) {
        console.warn('Manager auto-login failed:', err.message);
        localStorage.removeItem('token');
      } finally {
      }
    };

    autoLogin();
  }, [sendRequest, login]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin text-white w-8 h-8" />
      </div>
    );
  }

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
              {/* <Route path="settings" element={<SettingsPage/>} /> */}
            </Route>
            <Route path="/admin" element={<ManagersPage />} />
            <Route path="*" element={<Navigate to="/" replace />} /> {/* Fallback route */}
          </>
        ) : (
          <>
            <Route path="/" element={<ManagerLoginPage />} />
            <Route path="/verify/:username" element={<VerifyManagerPage />} />
            <Route path="/admin" element={<AdminLoginPage />} />
            <Route path="*" element={<Navigate to="/" replace />} /> {/* Fallback route */}
          </>
        )}
      </Routes>
    </AuthContext.Provider>
  )
}

export default App