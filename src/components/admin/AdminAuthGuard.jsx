import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, Key, ArrowRight, AlertTriangle, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const SESSION_KEY = 'hare_admin_session_token';

export const logoutAdmin = () => {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(SESSION_KEY);
    window.location.href = '/';
  }
};

export default function AdminAuthGuard({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  const [passkey, setPasskey] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const existingToken = sessionStorage.getItem(SESSION_KEY);
    if (!existingToken) {
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
          sessionStorage.removeItem(SESSION_KEY);
          setIsAuthenticated(false);
        }
      })
      .catch(() => {
        // Network or offline: do not grant unverified access
        sessionStorage.removeItem(SESSION_KEY);
        setIsAuthenticated(false);
      })
      .finally(() => {
        setIsVerifying(false);
      });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!passkey.trim()) {
      setErrorMsg('Please enter the administrative access passkey.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/admin-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', passkey: passkey.trim() })
      });

      const data = await res.json();

      if (res.ok && data.authenticated && data.token) {
        sessionStorage.setItem(SESSION_KEY, data.token);
        setIsAuthenticated(true);
      } else {
        setErrorMsg(data.error || 'Invalid administrative credentials.');
      }
    } catch (err) {
      setErrorMsg('Authentication server unreachable. Please verify your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
    return (
      <div className="min-h-screen bg-[#0F0E0D] text-white flex flex-col justify-between p-4 sm:p-8 font-sans selection:bg-[#FF751F] selection:text-white">
        <div className="max-w-md w-full mx-auto my-auto py-12 space-y-8">
          
          {/* Logo & Header */}
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF751F] to-[#E65E08] flex items-center justify-center font-display font-black text-white text-2xl mx-auto shadow-glow-orange">
              H
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#FF751F]/20 text-[#FF751F] font-bold border border-[#FF751F]/30 tracking-wider">
                Restricted Access Area
              </span>
              <h1 className="text-2xl font-display font-extrabold text-white mt-2">
                Hare Sportswear CMS
              </h1>
              <p className="text-xs text-stone-400 mt-1">
                Enter your executive administrative access passkey to manage page blocks, SEO metadata, blogs, and FAQs.
              </p>
            </div>
          </div>

          {/* Login Card */}
          <div className="bg-[#141210] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5">
                  Administrative Passkey
                </label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={passkey}
                    onChange={(e) => setPasskey(e.target.value)}
                    placeholder="Enter admin passkey..."
                    autoFocus
                    className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-[#FF751F] focus:ring-1 focus:ring-[#FF751F] transition"
                  />
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="p-1 text-stone-400 hover:text-white absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#FF751F] to-[#E65E08] hover:from-[#E65E08] hover:to-[#FF751F] text-white font-bold text-xs shadow-glow-orange hover:shadow-xl transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <Key className="w-4 h-4" />
                    <span>Authorize Dashboard Access</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="pt-2 border-t border-white/10 text-center">
              <Link
                to="/"
                className="text-xs text-stone-400 hover:text-[#FF751F] transition inline-flex items-center gap-1"
              >
                <span>← Return to Public Storefront</span>
              </Link>
            </div>
          </div>

          <div className="text-center text-[11px] text-stone-500 space-y-1 font-mono">
            <p>Protected by cryptographic session hashing &amp; brute-force rate limiting.</p>
            <p>Authorized personnel only. All access attempts are monitored.</p>
          </div>

        </div>
      </div>
    );
  }

  return children;
}
