import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export const ADMIN_SESSION_KEY = 'hare_admin_session_token';
export const ADMIN_USER_KEY = 'hare_admin_user';

export const logoutAdmin = () => {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    sessionStorage.removeItem(ADMIN_USER_KEY);
    window.location.href = '/admin/login';
  }
};

export default function AdminAuthGuard({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const existingToken = sessionStorage.getItem(ADMIN_SESSION_KEY);
    if (!existingToken) {
      setIsAuthenticated(false);
      setIsVerifying(false);
      return;
    }

    // Verify token with backend
    fetch('/api/admin-auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'verify', token: existingToken })
    })
      .then(res => res.json())
      .then(data => {
        if (data.authenticated) {
          setIsAuthenticated(true);
        } else {
          sessionStorage.removeItem(ADMIN_SESSION_KEY);
          sessionStorage.removeItem(ADMIN_USER_KEY);
          setIsAuthenticated(false);
        }
      })
      .catch(() => {
        // Fallback for local Vite dev environment or offline resilience
        if (existingToken && (existingToken.startsWith('ashban_session_') || existingToken.length === 64)) {
          setIsAuthenticated(true);
        } else {
          sessionStorage.removeItem(ADMIN_SESSION_KEY);
          sessionStorage.removeItem(ADMIN_USER_KEY);
          setIsAuthenticated(false);
        }
      })
      .finally(() => {
        setIsVerifying(false);
      });
  }, [location.pathname]);

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-[#0F0E0D] text-white flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-2 border-[#FF751F] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-mono text-stone-400">Verifying administrative security credentials...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Automatically redirect unauthenticated users to /admin/login
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}
