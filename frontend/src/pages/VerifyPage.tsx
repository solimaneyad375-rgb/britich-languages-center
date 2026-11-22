/*
 * Project Design & Development
 * Engineered by Eng. Eyad Ahmed
 * SpeedUp Software Solutions
 * © 2026 All Rights Reserved.
 */
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import { getAssetUrl } from '../utils/assets';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

interface VerifyPageProps {
  initialQuery?: string;
  navigate?: (path: string) => void;
}

export const VerifyPage: React.FC<VerifyPageProps> = () => {
  const [searchParams] = useSearchParams();
  const urlParam =
    searchParams.get('code') ||
    searchParams.get('query') ||
    '';

  const { lang } = useLanguage();
  const [code, setCode] = useState(urlParam);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    isValid: boolean;
    messageAr: string;
    messageEn: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = code.trim();
    if (!trimmed) return;

    setLoading(true);
    setResult(null);

    try {
      const data = await api.verify(trimmed);
      if (data && data.isValid) {
        setResult({
          isValid: true,
          messageAr:
            'تم التحقق بنجاح. نؤكد أن حامل رمز التحقق قد اجتاز الدورة التدريبية بنجاح، وأن تسجيله واعتماده مثبت لدى British Center for Languages.',
          messageEn:
            'Verification successful. We confirm that the bearer of this verification code has successfully passed the training course, and that their registration and accreditation are officially verified with British Center for Languages.',
        });
      } else {
        setResult({
          isValid: false,
          messageAr: 'رمز التحقق غير صحيح أو غير معتمد. يرجى مراجعة الرمز والمحاولة مرة أخرى.',
          messageEn: 'The verification code is invalid or unaccredited. Please check the code and try again.',
        });
      }
    } catch (err) {
      console.error('Verification error:', err);
      setResult({
        isValid: false,
        messageAr: 'رمز التحقق غير صحيح أو غير معتمد. يرجى مراجعة الرمز والمحاولة مرة أخرى.',
        messageEn: 'The verification code is invalid or unaccredited. Please check the code and try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-[#07172B] flex items-center justify-center px-4 sm:px-6 relative overflow-hidden transition-colors duration-200">
      {/* Background Subtle Gradient Accents */}
      <div className="absolute inset-0 bg-radial from-[#102B4C]/40 via-[#07172B] to-[#050F1D] pointer-events-none" />

      {/* Main Confidential Verification Card */}
      <div className="w-full max-w-xl mx-auto bg-[#0A1F38]/95 border border-[#C5A04B]/35 rounded-xs p-6 sm:p-10 shadow-2xl relative z-10 text-center backdrop-blur-md">
        {/* 1. British Center for Languages Logo */}
        <div className="mb-6 flex justify-center">
          <img
            src={getAssetUrl('assets/logo-trimmed.webp')}
            alt="British Center for Languages"
            className="h-20 sm:h-24 w-auto object-contain drop-shadow-md"
            onError={(e) => {
              (e.target as HTMLImageElement).src = getAssetUrl('assets/logo-trimmed.png');
            }}
          />
        </div>

        {/* 2. Professional Heading */}
        <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white tracking-wide mb-3">
          {lang === 'ar' ? 'التحقق من الاعتماد' : 'Accreditation Verification'}
        </h1>

        {/* 3. Short Description */}
        <p className="text-sm sm:text-base text-slate-300 max-w-md mx-auto leading-relaxed mb-8 font-sans">
          {lang === 'ar'
            ? 'أدخل رمز التحقق الخاص بك للتأكد من حالة اعتمادك.'
            : 'Enter your verification code to confirm your accreditation status.'}
        </p>

        {/* 4. Form: Single Input Field + One Button */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                if (result) setResult(null);
              }}
              placeholder={lang === 'ar' ? 'أدخل رمز التحقق' : 'Enter verification code'}
              className="w-full px-4 py-3.5 rounded-xs bg-[#071424] border border-[#C5A04B]/40 text-white placeholder-slate-400 text-center text-base sm:text-lg font-medium tracking-wider focus:outline-none focus:border-[#DFC075] focus:ring-1 focus:ring-[#DFC075] transition-all shadow-inner"
              autoComplete="off"
              spellCheck="false"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || !code.trim()}
            className="w-full py-3.5 px-6 rounded-xs bg-[#C5A04B] hover:bg-[#DFC075] text-[#08182E] font-bold text-base transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2 font-serif"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-[#08182E] border-t-transparent rounded-full animate-spin" />
            ) : (
              <span>{lang === 'ar' ? 'تحقق الآن' : 'Verify Now'}</span>
            )}
          </button>
        </form>

        {/* 5. Verification Result (Success or Invalid) */}
        {result && (
          <div className="mt-8 animate-in fade-in duration-300 text-start">
            {result.isValid ? (
              /* Success State: Green Checkmark + Required Confirmation Message */
              <div className="p-4 sm:p-5 rounded-xs bg-emerald-950/60 border border-emerald-500/60 text-emerald-100 flex items-start gap-3.5 shadow-lg">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-sm sm:text-base font-medium leading-relaxed">
                  {lang === 'ar' ? result.messageAr : result.messageEn}
                </p>
              </div>
            ) : (
              /* Invalid State: Neutral / Warning Box + Required Failure Message */
              <div className="p-4 sm:p-5 rounded-xs bg-rose-950/60 border border-rose-500/60 text-rose-100 flex items-start gap-3.5 shadow-lg">
                <XCircle className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
                <p className="text-sm sm:text-base font-medium leading-relaxed">
                  {lang === 'ar' ? result.messageAr : result.messageEn}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
