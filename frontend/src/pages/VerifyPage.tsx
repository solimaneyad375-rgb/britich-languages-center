/*
 * Project Design & Development
 * Engineered by Eng. Eyad Ahmed
 * SpeedUp Software Solutions
 * © 2026 All Rights Reserved.
 */
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import { PublicVerificationResponse, SharedBarcodeGroup } from '../types';
import { getAssetUrl, getVerifyUrl } from '../utils/assets';
import {
  ShieldCheck,
  Search,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Printer,
  Download,
  Award,
  Calendar,
  Building,
  User,
  GraduationCap,
  ArrowRight,
  ArrowLeft,
  Users,
  QrCode as QrIcon,
  Filter,
  Check,
  FileCheck2,
} from 'lucide-react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { SharedBarcodeCard } from '../components/SharedBarcodeCard';

interface VerifyPageProps {
  initialQuery?: string;
  navigate?: (path: string) => void;
}

export const VerifyPage: React.FC<VerifyPageProps> = ({ initialQuery = '', navigate: propNavigate }) => {
  const routerNavigate = useNavigate();
  const navigate = propNavigate || routerNavigate;
  const { token } = useParams<{ token?: string }>();
  const [searchParams] = useSearchParams();

  // Extract query from URL or default to the official initial shared barcode: BC-QT-0047
  const urlParam =
    searchParams.get('code') ||
    searchParams.get('barcode') ||
    searchParams.get('certificate') ||
    searchParams.get('query') ||
    token ||
    '';

  const defaultCode = urlParam || initialQuery || 'BC-QT-0047';

  const { lang, isRtl, t } = useLanguage();
  const [query, setQuery] = useState(defaultCode);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PublicVerificationResponse | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // In-table search filter for the 30 students
  const [studentSearch, setStudentSearch] = useState('');

  // Automatically verify initial code upon mounting
  useEffect(() => {
    performVerification(defaultCode);
  }, []);

  const performVerification = async (term: string) => {
    if (!term.trim()) return;
    setLoading(true);
    setHasSearched(true);

    try {
      const data = await api.verify(term.trim());
      setResult(data);
    } catch (err) {
      console.error('Verification query error', err);
      setResult({
        isFound: false,
        isValid: false,
        status: 'NotFound',
        statusBadgeColor: 'gray',
        messageEn: 'Unable to reach the central verification registry. Please check network connectivity.',
        messageAr: 'تعذر الاتصال بقاعدة البيانات المركزية. يرجى التأكد من الاتصال بالإنترنت.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performVerification(query);
  };

  const handlePrint = () => {
    window.print();
  };

  // Filter students inside the shared barcode cohort
  const filteredStudents = useMemo(() => {
    if (!result?.sharedBarcodeData?.students) return [];
    const q = studentSearch.trim().toLowerCase();
    if (!q) return result.sharedBarcodeData.students;
    return result.sharedBarcodeData.students.filter(
      (s) =>
        s.studentIdNumber.toLowerCase().includes(q) ||
        s.nameEn.toLowerCase().includes(q) ||
        s.nameAr.includes(q) ||
        (s.gradeEn && s.gradeEn.toLowerCase().includes(q))
    );
  }, [result?.sharedBarcodeData?.students, studentSearch]);

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div className="pt-24 min-h-screen bg-slate-50 dark:bg-[#07172B] text-[#102F5C] dark:text-[#F8F9FC] transition-colors duration-200">
      {/* 1. HERO SECTION */}
      <section className="bg-gradient-to-b from-[#091D37] via-[#08182E] to-[#07172B] text-white py-14 sm:py-20 border-b border-[#C5A04B]/30 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          {/* Institutional Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-xs bg-[#102F5C]/80 border border-[#C5A04B]/40 shadow-xs mx-auto">
            <ShieldCheck className="w-4 h-4 text-[#DFC075]" />
            <span className="text-xs font-semibold tracking-wider text-[#DFC075] uppercase">
              {lang === 'ar' ? 'نظام التحقق الموحد بالباركود • SHARED BARCODE VERIFICATION' : 'OFFICIAL SHARED BARCODE VERIFICATION'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-serif">
            {t('verifyPageTitle')}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {t('verifyPageSubtitle')}
          </p>

          {/* Quick Code Pill */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-slate-400">
              {lang === 'ar' ? 'الكود المعتمد الافتراضي:' : 'Accredited Group Barcode:'}
            </span>
            <button
              onClick={() => {
                setQuery('BC-QT-0047');
                performVerification('BC-QT-0047');
              }}
              className="px-2.5 py-1 rounded-xs bg-[#152B49] hover:bg-[#1D3A63] border border-[#C5A04B]/40 text-[#DFC075] font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              <span>BC-QT-0047</span>
              <span className="text-[10px] text-slate-400">
                ({lang === 'ar' ? 'مجموعة 30 متدرباً' : 'Cohort of 30'})
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. SEARCH BAR FORM */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 -mt-7 relative z-20">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-[#152B49] p-3 sm:p-4 rounded-xs shadow-xl border-2 border-[#C5A04B]/40 flex flex-col sm:flex-row gap-3 transition-colors"
        >
          <div className="relative flex-1">
            <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-5 h-5 text-[#C5A04B]" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('verifyInputPlaceholder')}
              className="w-full ps-11 pe-4 py-3 rounded-xs bg-slate-50 dark:bg-[#0B1E38] border border-gray-300 dark:border-white/10 text-xs sm:text-sm text-[#102F5C] dark:text-white font-medium focus:border-[#C5A04B] focus:outline-none transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-xs bg-[#C5A04B] hover:bg-[#DFC075] text-[#08182E] font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 shrink-0"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-[#08182E] border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>{t('verifyBtnSearch')}</span>
                <ArrowIcon className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </section>

      {/* 3. VERIFICATION RESULTS AREA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {loading && (
          <div className="py-20 text-center space-y-4 bg-white dark:bg-[#10243E] rounded-xs border border-gray-200 dark:border-white/10 p-8">
            <div className="w-10 h-10 border-3 border-[#C5A04B] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm font-semibold text-[#102F5C] dark:text-[#DFC075]">
              {t('verifySearching')}
            </p>
          </div>
        )}

        {!loading && hasSearched && result && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Status Feedback Banner */}
            <div
              className={`p-4 sm:p-5 rounded-xs border text-start flex items-center gap-3.5 shadow-sm ${
                result.isValid
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-600/50 text-emerald-900 dark:text-emerald-200'
                  : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-600/50 text-rose-900 dark:text-rose-200'
              }`}
            >
              {result.isValid ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
              ) : (
                <XCircle className="w-6 h-6 text-rose-600 dark:text-rose-400 shrink-0" />
              )}
              <div>
                <h3 className="font-bold text-sm sm:text-base">
                  {lang === 'ar' ? result.messageAr : result.messageEn}
                </h3>
                <span className="text-xs opacity-90 block mt-0.5">
                  {result.isValid
                    ? lang === 'ar'
                      ? 'تمت مطابقة السجل الرسمي مع قاعدة البيانات المركزية للمركز البريطاني لتعليم اللغات بالمملكة المتحدة.'
                      : 'Cryptographic authentication confirmed against the official UK registry.'
                    : lang === 'ar'
                    ? 'يرجى مراجعة إدارة الاعتمادات وشؤون الطلاب بالمركز البريطاني.'
                    : 'Please contact the British Center academic verification desk.'}
                </span>
              </div>
            </div>

            {/* A. If Shared Barcode was verified */}
            {result.sharedBarcodeData ? (
              <div className="space-y-6">
                {/* 1. Barcode Graphic & Official Accreditation Card */}
                <SharedBarcodeCard
                  cohort={result.sharedBarcodeData}
                  lang={lang}
                  onPrint={handlePrint}
                />
              </div>
            ) : null}

            {/* B. Fallback: If Not Found */}
            {!result.isFound && (
              <div className="bg-white dark:bg-[#10243E] p-8 sm:p-12 rounded-xs border border-gray-200 dark:border-white/10 text-center space-y-4">
                <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto" />
                <h4 className="text-lg font-bold text-[#102F5C] dark:text-white">
                  {lang === 'ar' ? 'لم يتم العثور على الباركود الموحد' : 'Shared Barcode Record Not Found'}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-[#B8C5D6] max-w-md mx-auto">
                  {lang === 'ar'
                    ? 'تأكد من كتابة كود الباركود الموحد بالشكل الصحيح مثل BC-QT-0047 أو التواصل مع إدارة شؤون المتدربين.'
                    : 'Please verify the shared barcode identifier (e.g. BC-QT-0047) or contact candidate registry.'}
                </p>
                <button
                  onClick={() => {
                    setQuery('BC-QT-0047');
                    performVerification('BC-QT-0047');
                  }}
                  className="px-4 py-2 rounded-xs bg-[#C5A04B] hover:bg-[#DFC075] text-[#08182E] font-bold text-xs transition-colors cursor-pointer"
                >
                  {lang === 'ar' ? 'فحص الكود المعتمد: BC-QT-0047' : 'Verify Default Code: BC-QT-0047'}
                </button>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};
