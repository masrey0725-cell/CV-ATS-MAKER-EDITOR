import React, { useState } from 'react';
import { Lock, User, Eye, EyeOff, ShieldCheck, ArrowRight, AlertCircle, FileText } from 'lucide-react';

interface LoginScreenProps {
  onLoginSuccess: (rememberMe: boolean) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      // Validate credentials requested by owner
      const trimmedUser = username.trim();
      const trimmedPass = password.trim();

      if (trimmedUser === 'rey77' && trimmedPass === 'owner777777') {
        onLoginSuccess(rememberMe);
      } else {
        setError('Username atau password salah. Akses ditolak.');
        setLoading(false);
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#0f1115] text-neutral-100 flex flex-col justify-center items-center p-4 selection:bg-white selection:text-black">
      <div className="w-full max-w-md">
        {/* Brand / Title Icon */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-neutral-900 border border-neutral-700/80 mx-auto flex items-center justify-center shadow-xl mb-4">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white font-sans-modern">
            Akses Pemilik CV
          </h1>
          <p className="text-xs text-neutral-400 mt-1.5 font-normal">
            CV Master · Muhammad Ikhsan Raihan Fadilah, S.E.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-950/60 border border-red-800/80 rounded-xl flex items-center gap-2.5 text-xs text-red-200 animate-in fade-in duration-200">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Username Input */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                Username
              </label>
              <div className="relative flex items-center">
                <User className="w-4 h-4 text-neutral-500 absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  required
                  autoFocus
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="Masukkan username"
                  className="w-full pl-9 pr-4 py-2.5 bg-neutral-950 border border-neutral-700/80 rounded-xl text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-white transition-colors"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-neutral-500 absolute left-3 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="Masukkan password"
                  className="w-full pl-9 pr-10 py-2.5 bg-neutral-950 border border-neutral-700/80 rounded-xl text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-white transition-colors font-mono tracking-wider"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-neutral-400 hover:text-white transition-colors p-1"
                  title={showPassword ? 'Sembunyikan password' : 'Lihat password'}
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-xs text-neutral-400 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-3.5 h-3.5 rounded bg-neutral-950 border-neutral-700 text-white accent-white cursor-pointer"
                />
                <span>Ingat saya di perangkat ini</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-white hover:bg-neutral-200 text-neutral-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-50"
            >
              {loading ? (
                <span>Memverifikasi...</span>
              ) : (
                <>
                  <span>Buka Akses CV</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Security notice */}
          <div className="mt-6 pt-4 border-t border-neutral-800 text-center">
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-400">
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
              <span>Akses Terproteksi · Hanya Pemilik yang Memiliki Otorisasi</span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-center text-[11px] text-neutral-400 mt-6 font-mono">
          ATS Modern CV System · Version 2.0
        </p>
      </div>
    </div>
  );
};
