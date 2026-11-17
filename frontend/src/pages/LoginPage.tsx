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
import { Lock, User, ShieldCheck, ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';

interface LoginPageProps {
  navigate?: (path: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ navigate: propNavigate }) => {
  const routerNavigate = useNavigate();
  const navigate = propNavigate || routerNavigate;
  const { lang, isRtl, t } = useLanguage();
  const { login } = useAuth();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await api.login(username, password);
      if (res) {
        login(res.token, res.user);
        navigate('/admin');
      } else {
        setError(t('loginError'));
      }
    } catch (err) {
      setError(t('loginError'));
    } finally {
      setLoading(false);
    }
  };

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div className="pt-24 min-h-screen bg-white dark:bg-[#08182E] flex items-center justify-center px-4 pb-20 text-[#102F5C] dark:text-white transition-colors duration-200">
      <div className="max-w-md w-full bg-[#F7F8FA] dark:bg-[#152B49] rounded-xs shadow-xl dark:shadow-2xl border border-gray-200 dark:border-[rgba(197,160,75,0.35)] p-7 sm:p-9 text-start space-y-6 transition-colors">
        {/* Header with Crest */}
        <div className="text-center space-y-3">
          <div className="relative inline-flex items-center justify-center p-[1px] rounded-xs bg-gradient-to-b from-[#C5A04B]/60 via-[rgba(197,160,75,0.3)] to-[#C5A04B]/60 shadow-xs mx-auto">
            <div className="bg-[#FAF8F5] px-3 py-1.5 rounded-[2px] flex items-center justify-center">
              <img
                src="/assets/logo-trimmed.png"
                alt="British Center for Languages"
                className="h-12 w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/logo.png';
                }}
              />
            </div>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#102F5C] dark:text-white font-serif">
              {t('loginTitle')}
            </h2>
            <p className="text-xs text-slate-600 dark:text-[#B8C5D6] mt-1">
              {t('loginSubtitle')}
            </p>
          </div>
        </div>

        {/* Demo Authentication Security Disclosure */}
        <div className="p-3.5 rounded-xs bg-amber-50 dark:bg-[#08182E]/90 border border-amber-300 dark:border-[rgba(197,160,75,0.4)] text-[11px] text-amber-900 dark:text-[#DFC075] space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-xs text-amber-800 dark:text-[#DFC075]">
            <AlertCircle className="w-4 h-4 text-[#C5A04B] shrink-0" />
            <span>
              {lang === 'ar' ? 'إشعار أمني (Frontend Demo Authentication):' : 'Security Notice (Demo Prototype):'}
            </span>
          </div>
          <p className="text-[10.5px] text-slate-600 dark:text-[#B8C5D6] leading-relaxed">
            {lang === 'ar'
              ? 'تنبيه: هذا نموذج تجريبي لواجهة المستخدم (Frontend-only Authentication) مخصص للمعاينة الإدارية وتجربة إدارة الشهادات. لا يمثل نظام حماية إنتاجي مشفر.'
              : 'Notice: This is a frontend-only demonstration authentication system intended for evaluation and prototype testing. It does not provide production-grade cryptographic security.'}
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xs bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-200 text-xs font-bold border border-rose-300 dark:border-rose-500/60">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#102F5C] dark:text-[#DFC075] mb-1">
              {t('loginUsername')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4 text-[#C5A04B]" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full ps-9 pe-3 py-2.5 rounded-xs bg-white dark:bg-[#08182E] border border-gray-300 dark:border-[rgba(197,160,75,0.3)] text-[#102F5C] dark:text-white text-xs font-semibold focus:border-[#C5A04B] focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#102F5C] dark:text-[#DFC075] mb-1">
              {t('loginPassword')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4 text-[#C5A04B]" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full ps-9 pe-3 py-2.5 rounded-xs bg-white dark:bg-[#08182E] border border-gray-300 dark:border-[rgba(197,160,75,0.3)] text-[#102F5C] dark:text-white text-xs font-semibold focus:border-[#C5A04B] focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Quick Default Credentials Note */}
          <div className="p-3 rounded-xs bg-white dark:bg-[#08182E] border border-gray-200 dark:border-[rgba(197,160,75,0.25)] text-[11px] text-slate-600 dark:text-[#B8C5D6] space-y-1">
            <span className="font-bold flex items-center gap-1.5 text-[#102F5C] dark:text-[#DFC075]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A04B]" />
              {lang === 'ar' ? 'بيانات الدخول الافتراضية للتجربة:' : 'Demo Access Credentials:'}
            </span>
            <div className="flex justify-between font-mono bg-[#F7F8FA] dark:bg-[#152B49] p-2 rounded-xs border border-gray-200 dark:border-[rgba(197,160,75,0.2)] text-xs text-[#102F5C] dark:text-white">
              <span>Username: <strong className="text-[#C5A04B] dark:text-[#DFC075]">admin</strong></span>
              <span>Password: <strong className="text-[#C5A04B] dark:text-[#DFC075]">admin</strong></span>
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

