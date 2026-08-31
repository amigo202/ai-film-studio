import React, { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Film, ArrowRight, ShieldCheck } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('amigosy@gmail.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // If already authenticated, redirect cleanly with Navigate component
  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await login(email, password);
      if (res.error) {
        setError(res.error);
      } else {
        navigate('/admin/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'שגיאה בהתחברות למערכת');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060608] text-[#f4f4f5] flex items-center justify-center p-6 film-grain">
      <div className="w-full max-w-md bg-[#121216] border border-white/10 rounded-2xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
        {/* Subtle Gold Accent Glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Studio Branding */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto mb-4">
            <Film className="w-6 h-6" />
          </div>
          <h1 className="font-syne text-2xl font-bold uppercase tracking-wider text-white">
            STUDIO CMS · PORTAL
          </h1>
          <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mt-1">
            DIRECTOR & PRODUCTION MANAGEMENT
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-hebrew text-right">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5 text-right">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
              אימייל מורשה (Email)
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="amigosy@gmail.com"
              className="w-full bg-[#09090b] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
              סיסמת במאי (Password)
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#09090b] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-syne font-bold uppercase tracking-wider text-sm transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] disabled:opacity-50"
          >
            {loading ? (
              <span>מתחבר...</span>
            ) : (
              <>
                <span>כניסה למערכת הניהול</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-xs text-zinc-500">
          <Link to="/" className="hover:text-zinc-300 transition-colors">
            ← חזרה לאתר הציבורי
          </Link>
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Studio Director Access</span>
          </span>
        </div>
      </div>
    </div>
  );
};
