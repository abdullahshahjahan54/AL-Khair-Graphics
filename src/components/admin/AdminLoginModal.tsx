import React, { useState } from 'react';
import { Lock, Mail, KeyRound, AlertCircle, X, Sparkles, Check } from 'lucide-react';
import { api } from '../../api';
import { AdminUser } from '../../types';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: AdminUser) => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [email, setEmail] = useState('admin@alkhairgraphics.com');
  const [password, setPassword] = useState('admin12345');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { user } = await api.login(email, password);
      onLoginSuccess(user);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Login failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = () => {
    setEmail('admin@alkhairgraphics.com');
    setPassword('admin12345');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/85 backdrop-blur-md"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-md p-8 rounded-3xl bg-neutral-900 border border-neutral-700 shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-amber-400 text-neutral-950 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/20">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold font-display text-white">
            Admin Authentication
          </h2>
          <p className="text-neutral-400 text-xs">
            AL Khair Graphics Administrative Control Center
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin Email</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-400"
              placeholder="admin@alkhairgraphics.com"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-amber-400" />
              <span>Password</span>
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-amber-400"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 text-neutral-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 text-sm active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
            ) : (
              <span>Sign In to Dashboard</span>
            )}
          </button>
        </form>

        {/* Quick Demo Helper */}
        <div className="pt-2 border-t border-neutral-800 text-center">
          <p className="text-[11px] text-neutral-400 mb-2">
            Default credentials: <code className="text-amber-400">admin@alkhairgraphics.com</code> / <code className="text-amber-400">admin12345</code>
          </p>
          <button
            type="button"
            onClick={fillDemo}
            className="text-xs text-amber-400 hover:text-amber-300 font-semibold underline"
          >
            Auto-fill credentials
          </button>
        </div>

      </div>
    </div>
  );
};
