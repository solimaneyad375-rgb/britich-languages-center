/*
 * Project Design & Development
 * Engineered by Eng. Eyad Ahmed
 * SpeedUp Software Solutions
 * © 2026 All Rights Reserved.
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Lock, User, ShieldCheck, ArrowRight, ArrowLeft, Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

interface LoginPageProps {
  navigate?: (path: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ navigate: propNavigate }) => {
  const routerNavigate = useNavigate();
  const navigate = propNavigate || routerNavigate;
  const { lang, isRtl, t } = useLanguage();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedUser = username.trim();
    if (!trimmedUser || !password) {
      setError(lang === 'ar' ? 'يرجى إدخال اسم المستخدم وكلمة المرور' : 'Please enter both username and password.');
      return;
    }

    setLoading(true);

    try {
      const res = await api.login(trimmedUser, password);
      if (res && res.user) {
        login(res.token, res.user);
        navigate('/admin');
      } else {
        setError(t('loginError'));
      }
    } catch (err: any) {
      console.error('Authentication failure');
      setError(t('loginError'));
    } finally {
      setLoading(false);
    }
  };

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div className="pt-24 min-h-screen bg-white dark:bg-[#08182E] flex items-center justify-center px-4 pb-20 text-[#102F5C] dark:text-white transition-colors duration-200">
      <div className="max-w-md w-full bg-[#F7F8FA] dark:bg-[#152B49] rounded-xs shadow-xl dark:shadow-2xl border border-gray-200 dark:border-[rgba(197,160,75,0.35)] p-7 sm:p-9 text-start space-y-6 transition-colors">
        {/* Header with Institutional Crest */}
        <div className="text-center space-y-3">
          <div className="relative inline-flex items-center justify-center p-[1px] rounded-xs bg-gradient-to-b from-[#C5A04B]/60 via-[rgba(197,160,75,0.3)] to-[#C5A04B]/60 shadow-xs mx-auto">
            <div className="bg-[#FAF8F5] px-3.5 py-2 rounded-[2px] flex items-center justify-center">
              <img
                src={getAssetUrl('assets/logo-trimmed.webp')}
                alt="British Center for Languages"
                width="140"
                height="48"
                loading="eager"
                className="h-12 w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = getAssetUrl('assets/logo.webp');
                }}
              />
            </div>
          </div>
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-[#102F5C] dark:text-white font-serif">
              {lang === 'ar' ? 'دخول البوابة الإدارية' : 'Institutional Administration Login'}
            </h2>
            <p className="text-xs text-slate-600 dark:text-[#B8C5D6] leading-relaxed">
              {lang === 'ar'
                ? 'الوصول مصرح به فقط لمسؤولي المركز البريطاني المعتمدين'
                : 'Authorized access strictly restricted to certified British Center personnel'}
            </p>
          </div>
        </div>

        {/* Generic Error Alert */}
        {error && (
          <div className="p-3.5 rounded-xs bg-rose-50 dark:bg-rose-950/70 text-rose-700 dark:text-rose-200 text-xs sm:text-sm font-semibold border border-rose-300 dark:border-rose-500/60 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
          <div>
            <label className="block text-xs font-bold text-[#102F5C] dark:text-[#DFC075] mb-1.5">
              {t('loginUsername')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4 text-[#C5A04B]" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={lang === 'ar' ? 'اسم المستخدم المعتمد' : 'Enter authorized username'}
                autoComplete="off"
                className="w-full ps-10 pe-3 py-2.5 rounded-xs bg-white dark:bg-[#08182E] border border-gray-300 dark:border-[rgba(197,160,75,0.3)] text-[#102F5C] dark:text-white text-xs sm:text-sm font-medium focus:border-[#C5A04B] focus:outline-none transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#102F5C] dark:text-[#DFC075] mb-1.5">
              {t('loginPassword')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4 text-[#C5A04B]" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                autoComplete="new-password"
                className="w-full ps-10 pe-10 py-2.5 rounded-xs bg-white dark:bg-[#08182E] border border-gray-300 dark:border-[rgba(197,160,75,0.3)] text-[#102F5C] dark:text-white text-xs sm:text-sm font-medium focus:border-[#C5A04B] focus:outline-none transition-colors"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                className="absolute inset-y-0 end-0 pe-3.5 flex items-center text-slate-400 hover:text-[#C5A04B] transition-colors cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xs bg-[#C5A04B] hover:bg-[#DFC075] text-[#08182E] font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-[#08182E] border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 text-[#08182E]" />
                <span>{t('loginBtn')}</span>
                <ArrowIcon className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
