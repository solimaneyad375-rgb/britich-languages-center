// Developed by Eng. Eyad — SpeedUp Software.
/*
 * Developed & Engineered by Eng. Eyad Ahmed
 * SpeedUp Software Solutions
 * © 2026 All Rights Reserved.
 */
import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import { PublicVerificationResponse } from '../types';
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
  ZoomIn,
  Maximize2,
  Loader2,
  FileCheck,
} from 'lucide-react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import QRCode from 'qrcode';
import { AcademicCertificateDocument } from '../components/AcademicCertificateDocument';
import { AcademicCertificateModal } from '../components/AcademicCertificateModal';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface VerifyPageProps {
  initialQuery?: string;
  navigate?: (path: string) => void;
}

export const VerifyPage: React.FC<VerifyPageProps> = ({ initialQuery = '', navigate: propNavigate }) => {
  const routerNavigate = useNavigate();
  const navigate = propNavigate || routerNavigate;
  const { token } = useParams<{ token?: string }>();
  const [searchParams] = useSearchParams();
  const urlParam = searchParams.get('certificate') || searchParams.get('query') || searchParams.get('cert') || token || '';
  const effectiveInitial = initialQuery || urlParam;

  const { lang, isRtl, t } = useLanguage();
  const [query, setQuery] = useState(effectiveInitial);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PublicVerificationResponse | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const qrCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const inlineCertRef = useRef<HTMLDivElement | null>(null);

  const handleExportPdf = async () => {
    if (!inlineCertRef.current || !result) return;
    setIsExportingPdf(true);
    try {
      const element = inlineCertRef.current;
      const targetNode = element.querySelector<HTMLElement>('[data-certificate-node="true"]') || element;
      const canvas = await html2canvas(targetNode, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#FAF8F2',
        windowWidth: 1120,
        windowHeight: 792,
        onclone: (clonedDoc) => {
          const cert = clonedDoc.querySelector<HTMLElement>('[data-certificate-node="true"]');
          if (cert) {
            cert.style.transform = 'none';
            cert.style.width = '1120px';
            cert.style.height = '792px';
            cert.style.minWidth = '1120px';
            cert.style.minHeight = '792px';
          }
        },
      });
      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });
      pdf.addImage(imgData, 'JPEG', 0, 0, 297, 210, undefined, 'FAST');
      const certRef = result.certificateNumber || 'BCL-CREDENTIAL';
      pdf.save(`British-Center-Certificate-${certRef}.pdf`);
    } catch (err) {
      console.error('PDF export failed:', err);
    } finally {
      setIsExportingPdf(false);
    }
  };

  // If initialQuery exists (e.g. from direct URL param /verify?certificate=...), run immediately
  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      performVerification(initialQuery);
    }
  }, [initialQuery]);

  // When result arrives and is found, render QR code on canvas
  useEffect(() => {
    if (result && result.isFound && qrCanvasRef.current) {
      const targetUrl =
        result.qrVerificationUrl ||
        getVerifyUrl(result.certificateNumber || '');
      QRCode.toCanvas(
        qrCanvasRef.current,
        targetUrl,
        {
          width: 110,
          margin: 1,
          color: {
            dark: '#102F5C',
            light: '#FFFFFF',
          },
        },
        (error) => {
          if (error) console.error('QR rendering error', error);
        }
      );
    }
  }, [result]);

  const performVerification = async (term: string) => {
    if (!term.trim()) return;
    setLoading(true);
    setHasSearched(true);
    try {
      const data = await api.verify(term.trim());
      setResult(data);
    } catch (err) {
      console.error('Verification error', err);
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

  const handleDownloadQr = () => {
    if (qrCanvasRef.current) {
      const pngUrl = qrCanvasRef.current.toDataURL('image/png');
      const downloadAnchor = document.createElement('a');
      downloadAnchor.href = pngUrl;
      downloadAnchor.download = `QR-${result?.certificateNumber || 'verification'}.png`;
      downloadAnchor.click();
    }
  };

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div className="pt-24 pb-20 min-h-screen bg-white dark:bg-[#07182D] text-[#102F5C] dark:text-[#F8F9FC] transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Editorial Section Header */}
        <div className="text-start space-y-4 pt-6 no-print">
          <div className="flex items-center gap-3">
            <span className="w-8 h-0.5 bg-[#C5A04B]" />
            <span className="text-xs font-bold tracking-widest text-[#C5A04B] uppercase font-mono">
              OFFICIAL VERIFICATION PORTAL
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-[#102F5C] dark:text-white tracking-tight font-serif">
            {lang === 'ar' ? 'التحقق من الشهادات والاعتمادات' : 'Certificate Verification Registry'}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-[#B8C5D6] leading-relaxed max-w-2xl font-normal">
            {lang === 'ar'
              ? 'تتيح هذه الخدمة التحقق الفوري من صحة وسريان الشهادات والاعتمادات الصادرة من المركز البريطاني لتعليم اللغات بمطابقتها المباشرة مع السجلات الرسمية المعتمدة.'
              : 'This portal enables direct authentication of certificates and academic credentials issued by the British Center for Languages against the official institutional ledger.'}
          </p>
        </div>

        {/* Verification Form */}
        <div className="bg-[#F7F8FA] dark:bg-[#152B49] border border-gray-200 dark:border-[rgba(197,160,75,0.22)] p-6 sm:p-8 space-y-4 no-print text-start shadow-md dark:shadow-xl rounded-xs transition-colors">
          <form onSubmit={handleSubmit} className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#102F5C] dark:text-[#DFC075] font-mono">
              {lang === 'ar'
                ? 'الرقم المرجعي للشهادة أو الرقم التعريفي للطالب:'
                : 'Certificate Reference Number or Student ID:'}
            </label>

            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute inset-y-0 start-3 my-auto text-slate-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={
                    lang === 'ar'
                      ? 'أدخل الرقم المرجعي (مثال: BCL-2026-00125 أو BCL-STU-2026-001)'
                      : 'Enter reference (e.g., BCL-2026-00125 or BCL-STU-2026-001)'
                  }
                  className="w-full ps-9 pe-4 py-3 bg-white dark:bg-[#08182E] border border-gray-300 dark:border-[rgba(197,160,75,0.3)] rounded-xs text-sm font-semibold text-[#102F5C] dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-[#C5A04B]"
                />
              </div>

              <button
                type="submit"
                disabled={loading || !query.trim()}
                className="px-6 py-3 bg-[#C5A04B] hover:bg-[#DFC075] disabled:opacity-50 text-[#08182E] text-sm font-bold rounded-xs transition-colors cursor-pointer shrink-0 shadow-sm"
              >
                {loading
                  ? (lang === 'ar' ? 'جاري التحقق...' : 'Verifying...')
                  : (lang === 'ar' ? 'التحقق من السجل' : 'Verify Record')}
              </button>
            </div>

            {/* Test Reference Monospace Chips for Convenient Testing */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-500 dark:text-[#B8C5D6] font-mono text-[11px]">
                {lang === 'ar' ? 'أمثلة تجريبية:' : 'Test references:'}
              </span>
              <button
                type="button"
                onClick={() => {
                  setQuery('BCL-2026-00125');
                  performVerification('BCL-2026-00125');
                }}
                className="px-2 py-0.5 bg-white dark:bg-[#08182E] border border-gray-300 dark:border-[rgba(197,160,75,0.25)] text-slate-700 dark:text-slate-300 hover:border-[#C5A04B] hover:text-[#C5A04B] dark:hover:text-[#DFC075] font-mono text-[11px] rounded-xs transition-colors cursor-pointer"
              >
                BCL-2026-00125 (Valid)
              </button>
              <button
                type="button"
                onClick={() => {
                  setQuery('BCL-2026-00841');
                  performVerification('BCL-2026-00841');
                }}
                className="px-2 py-0.5 bg-white dark:bg-[#08182E] border border-gray-300 dark:border-[rgba(197,160,75,0.25)] text-slate-700 dark:text-slate-300 hover:border-[#C5A04B] hover:text-[#C5A04B] dark:hover:text-[#DFC075] font-mono text-[11px] rounded-xs transition-colors cursor-pointer"
              >
                BCL-2026-00841 (Valid)
              </button>
              <button
                type="button"
                onClick={() => {
                  setQuery('BCL-2026-00731');
                  performVerification('BCL-2026-00731');
                }}
                className="px-2 py-0.5 bg-white dark:bg-[#08182E] border border-rose-500/50 text-rose-600 dark:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-950/40 font-mono text-[11px] rounded-xs transition-colors cursor-pointer"
              >
                BCL-2026-00731 (Revoked)
              </button>
              <button
                type="button"
                onClick={() => {
                  setQuery('BCL-2025-00410');
                  performVerification('BCL-2025-00410');
                }}
                className="px-2 py-0.5 bg-white dark:bg-[#08182E] border border-amber-500/50 text-amber-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-950/40 font-mono text-[11px] rounded-xs transition-colors cursor-pointer"
              >
                BCL-2025-00410 (Expired)
              </button>
              <button
                type="button"
                onClick={() => {
                  setQuery('BCL-STU-2026-001');
                  performVerification('BCL-STU-2026-001');
                }}
                className="px-2 py-0.5 bg-white dark:bg-[#08182E] border border-gray-300 dark:border-[rgba(197,160,75,0.25)] text-slate-700 dark:text-slate-300 hover:border-[#C5A04B] hover:text-[#C5A04B] dark:hover:text-[#DFC075] font-mono text-[11px] rounded-xs transition-colors cursor-pointer"
              >
                BCL-STU-2026-001 (Student ID)
              </button>
            </div>
          </form>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="p-8 text-center bg-[#F7F8FA] dark:bg-[#152B49] border border-gray-200 dark:border-[rgba(197,160,75,0.22)] text-slate-600 dark:text-slate-300 space-y-2 no-print rounded-xs">
            <div className="w-6 h-6 border-2 border-[#C5A04B] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-mono text-[#C5A04B] dark:text-[#DFC075]">
              {lang === 'ar' ? 'جاري الاستعلام من السجلات المركزية...' : 'Querying central verification database...'}
            </p>
          </div>
        )}

        {/* Verification Result Area */}
        {!loading && hasSearched && result && (
          <div className="space-y-6 text-start">
            {/* Top Action Bar (Print) */}
            {result.isFound && (
              <div className="flex justify-end gap-2 no-print">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 border border-gray-300 dark:border-[rgba(197,160,75,0.3)] hover:border-[#C5A04B] bg-white dark:bg-[#152B49] text-[#102F5C] dark:text-white text-xs font-semibold rounded-xs inline-flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5 text-[#C5A04B] dark:text-[#DFC075]" />
                  <span>{lang === 'ar' ? 'طباعة بيان التوثيق' : 'Print Official Record'}</span>
                </button>
              </div>
            )}

            {/* Result Document Box */}
            <div
              className={`bg-white dark:bg-[#152B49] border p-6 sm:p-10 text-start relative print-container rounded-xs shadow-xl text-[#102F5C] dark:text-white ${
                result.status === 'Valid'
                  ? 'border-emerald-500/80'
                  : result.status === 'Revoked'
                  ? 'border-rose-500/80'
                  : result.status === 'Expired'
                  ? 'border-amber-500/80'
                  : 'border-gray-300 dark:border-[rgba(197,160,75,0.3)]'
              }`}
            >
              {/* Document Header */}
              <div className="flex items-center justify-between pb-6 border-b border-gray-200 dark:border-[rgba(197,160,75,0.2)] mb-6">
                <div className="flex items-center gap-3.5">
                  <div className="bg-white/95 px-2 py-1 rounded-xs border border-[rgba(197,160,75,0.3)] shadow-xs">
                    <img
                      src={getAssetUrl('assets/logo.webp')}
                      alt="British Center for Languages"
                      width="120"
                      height="44"
                      loading="lazy"
                      className="h-11 w-auto object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = getAssetUrl('assets/logo.png');
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold tracking-wide text-[#102F5C] dark:text-white font-serif">
                      BRITISH CENTER FOR LANGUAGES
                    </h3>
                    <p className="text-xs text-[#C5A04B] dark:text-[#DFC075] font-mono">
                      OFFICIAL ACADEMIC CREDENTIAL VERIFICATION
                    </p>
                  </div>
                </div>

                <div className="text-end text-xs text-slate-500 dark:text-slate-300 font-mono hidden sm:block">
                  <div>UKRLP: 10099520</div>
                  <div>Companies House: 16605467</div>
                </div>
              </div>

              {/* Status Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-200 dark:border-white/10 gap-4">
                <div className="flex items-center gap-3">
                  {result.status === 'Valid' ? (
                    <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-500 dark:text-emerald-400 border border-emerald-500/40 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
                    </div>
                  ) : result.status === 'Revoked' ? (
                    <div className="w-9 h-9 rounded-full bg-rose-500/20 text-rose-500 dark:text-rose-400 border border-rose-500/40 flex items-center justify-center shrink-0">
                      <XCircle className="w-5 h-5 text-rose-500 dark:text-rose-400" />
                    </div>
                  ) : result.status === 'Expired' ? (
                    <div className="w-9 h-9 rounded-full bg-amber-500/20 text-amber-500 dark:text-amber-400 border border-amber-500/40 flex items-center justify-center shrink-0">
                      <AlertTriangle className="w-5 h-5 text-amber-500 dark:text-amber-400" />
                    </div>
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-slate-500/20 text-slate-500 dark:text-slate-400 border border-slate-500/40 flex items-center justify-center shrink-0">
                      <XCircle className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                    </div>
                  )}

                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                      {lang === 'ar' ? 'حالة الاعتماد الرسمية' : 'Official Verification Standing'}
                    </span>
                    <h2
                      className={`text-lg sm:text-xl font-bold ${
                        result.status === 'Valid'
                          ? 'text-emerald-600 dark:text-emerald-300'
                          : result.status === 'Revoked'
                          ? 'text-rose-600 dark:text-rose-300'
                          : result.status === 'Expired'
                          ? 'text-amber-600 dark:text-amber-300'
                          : 'text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {result.status === 'Valid'
                        ? (lang === 'ar' ? 'سجل شهادة معتمد وسارٍ' : 'Certificate Record Verified')
                        : result.status === 'Revoked'
                        ? (lang === 'ar' ? 'شهادة ملغاة إدارياً' : 'Certificate Revoked')
                        : result.status === 'Expired'
                        ? (lang === 'ar' ? 'شهادة منتهية الصلاحية' : 'Certificate Expired')
                        : (lang === 'ar' ? 'السجل غير مدرج' : 'Certificate Not Found')}
                    </h2>
                  </div>
                </div>

                <div>
                  <span
                    className={`inline-block px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider rounded-xs ${
                      result.status === 'Valid'
                        ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/40'
                        : result.status === 'Revoked'
                        ? 'bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-500/40'
                        : result.status === 'Expired'
                        ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/40'
                        : 'bg-slate-500/20 text-slate-700 dark:text-slate-300 border border-slate-500/40'
                    }`}
                  >
                    STATUS: {result.status}
                  </span>
                </div>
              </div>

              {/* If Record is Found: Display Structured Details */}
              {result.isFound ? (
                <div className="py-6 space-y-6">
                  {/* Clean 2-Column Grid of Verified Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                    <div className="p-3.5 bg-slate-50 dark:bg-[#07182D]/80 border border-gray-200 dark:border-[rgba(201,163,71,0.2)] rounded-xs space-y-0.5">
                      <span className="text-[#C9A347] text-[11px] block font-mono">STUDENT NAME</span>
                      <strong className="text-[#07182D] dark:text-[#F7F8FA] font-bold block">{result.studentNameEn}</strong>
                      <span className="text-slate-500 dark:text-[#AAB8CB] block">{result.studentNameAr}</span>
                    </div>

                    <div className="p-3.5 bg-slate-50 dark:bg-[#07182D]/80 border border-gray-200 dark:border-[rgba(201,163,71,0.2)] rounded-xs space-y-0.5">
                      <span className="text-[#C9A347] text-[11px] block font-mono">STUDENT ID</span>
                      <strong className="text-[#07182D] dark:text-[#F7F8FA] font-mono font-bold block">{result.studentIdNumber}</strong>
                    </div>

                    <div className="p-3.5 bg-slate-50 dark:bg-[#07182D]/80 border border-gray-200 dark:border-[rgba(201,163,71,0.2)] rounded-xs space-y-0.5">
                      <span className="text-[#C9A347] text-[11px] block font-mono">CERTIFICATE ID</span>
                      <strong className="text-[#07182D] dark:text-[#F7F8FA] font-mono font-bold block">{result.certificateNumber}</strong>
                    </div>

                    <div className="p-3.5 bg-slate-50 dark:bg-[#07182D]/80 border border-gray-200 dark:border-[rgba(201,163,71,0.2)] rounded-xs space-y-0.5">
                      <span className="text-[#C9A347] text-[11px] block font-mono">COURSE / QUALIFICATION</span>
                      <strong className="text-[#07182D] dark:text-[#F7F8FA] font-bold block">{result.courseNameEn}</strong>
                      <span className="text-slate-500 dark:text-[#AAB8CB] text-xs block">{result.courseNameAr}</span>
                    </div>

                    <div className="p-3.5 bg-slate-50 dark:bg-[#07182D]/80 border border-gray-200 dark:border-[rgba(201,163,71,0.2)] rounded-xs space-y-0.5">
                      <span className="text-[#C9A347] text-[11px] block font-mono">ISSUE DATE</span>
                      <strong className="text-[#07182D] dark:text-[#F7F8FA] font-mono block">
                        {result.issueDate ? new Date(result.issueDate).toLocaleDateString() : 'N/A'}
                      </strong>
                    </div>

                    <div className="p-3.5 bg-slate-50 dark:bg-[#07182D]/80 border border-gray-200 dark:border-[rgba(201,163,71,0.2)] rounded-xs space-y-0.5">
                      <span className="text-[#C9A347] text-[11px] block font-mono">ISSUING ORGANIZATION</span>
                      <strong className="text-[#07182D] dark:text-[#F7F8FA] block">
                        {lang === 'ar' ? result.issuingOrganizationAr : result.issuingOrganizationEn}
                      </strong>
                    </div>
                  </div>

                  {/* If Revoked: Display Clear Revocation Reason */}
                  {result.status === 'Revoked' && (
                    <div className="p-4 bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-500/60 text-rose-800 dark:text-rose-200 text-xs sm:text-sm space-y-1 rounded-xs">
                      <div className="font-bold flex items-center gap-1.5 text-rose-700 dark:text-rose-300">
                        <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                        <span>
                          {lang === 'ar' ? 'سبب الإلغاء الإداري للشهادة:' : 'Official Revocation Notice:'}
                        </span>
                      </div>
                      <p className="text-xs text-rose-800 dark:text-rose-200 leading-relaxed font-medium">
                        {result.revocationReason || 'Cancelled by administrative registry decision.'}
                      </p>
                    </div>
                  )}

                  {/* QR Code Validation Block */}
                  <div className="pt-6 border-t border-gray-200 dark:border-[rgba(197,160,75,0.2)] flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className="p-2 border border-gray-300 dark:border-[rgba(197,160,75,0.3)] bg-white rounded-xs shadow-xs">
                        <canvas ref={qrCanvasRef} className="w-24 h-24" />
                      </div>
                      <div className="space-y-1 text-xs text-slate-600 dark:text-[#B8C5D6]">
                        <span className="font-mono text-[11px] font-bold text-[#102F5C] dark:text-white block">
                          CRYPTOGRAPHIC 2D VALIDATION CODE
                        </span>
                        <p className="text-[11px] text-slate-500 dark:text-slate-300 max-w-xs leading-relaxed">
                          {lang === 'ar'
                            ? 'يمكّن هذا الرمز من التحقق المباشر من هذا السجل عبر أجهزة قراءة QR.'
                            : 'Scanning this QR code directs directly to this official authentication page.'}
                        </p>
                        <button
                          type="button"
                          onClick={handleDownloadQr}
                          className="mt-1 px-3 py-1 bg-[#C5A04B] hover:bg-[#DFC075] text-[#08182E] text-xs font-bold rounded-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer no-print shadow-xs"
                        >
                          <Download className="w-3.5 h-3.5 text-[#08182E]" />
                          <span>{lang === 'ar' ? 'تحميل QR (PNG)' : 'Download QR (PNG)'}</span>
                        </button>
                      </div>
                    </div>

                    <div className="text-end text-xs text-slate-500 dark:text-slate-400 font-mono hidden sm:block">
                      <div className="text-[#C5A04B] dark:text-[#DFC075]">REGISTRY SEAL: VERIFIED</div>
                      <div>LEDGER STATUS: ACTIVE</div>
                    </div>
                  </div>

                  {/* CUSTOM HTML / CSS / SVG ACADEMIC CERTIFICATE PREVIEW */}
                  <div className="pt-8 border-t border-gray-200 dark:border-[rgba(197,160,75,0.25)] space-y-4 no-print">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-base sm:text-lg text-[#102F5C] dark:text-white font-serif">
                            {lang === 'ar' ? 'وثيقة الشهادة الأكاديمية الرسمية' : 'Official Academic Credential Certificate'}
                          </span>
                          <span className="px-2 py-0.5 rounded-xs bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/40 text-[10px] font-mono font-bold uppercase">
                            A4 LANDSCAPE
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-[#B8C5D6]">
                          {lang === 'ar'
                            ? 'تصميم أكاديمي مخصص بمعايير المؤسسات البريطانية العريقة. انقر على الشهادة لمعاينتها بالحجم الكامل، أو طباعتها، أو تحميلها كملف PDF.'
                            : 'Bespoke British institutional academic certificate. Click certificate to zoom, enter fullscreen, print, or download PDF.'}
                        </p>
                      </div>

                      {/* Action Toolbar */}
                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        {/* Interactive Fullscreen Modal */}
                        <button
                          type="button"
                          onClick={() => setPreviewModalOpen(true)}
                          className="px-3.5 py-1.5 bg-[#C5A04B] hover:bg-[#DFC075] text-[#08182E] text-xs font-bold rounded-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs font-mono"
                          title={lang === 'ar' ? 'معاينة تفاعلية وملء الشاشة' : 'Interactive Zoom & Fullscreen'}
                        >
                          <Maximize2 className="w-3.5 h-3.5 text-[#08182E]" />
                          <span>{lang === 'ar' ? 'معاينة وتكبير' : 'Fullscreen / Zoom'}</span>
                        </button>

                        {/* Print Certificate */}
                        <button
                          type="button"
                          onClick={() => window.print()}
                          className="px-3.5 py-1.5 bg-white dark:bg-[#08182E] hover:bg-slate-50 dark:hover:bg-[#102F5C] text-[#102F5C] dark:text-white border border-gray-300 dark:border-[rgba(197,160,75,0.3)] text-xs font-bold rounded-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer font-mono"
                          title={lang === 'ar' ? 'طباعة الشهادة (A4 Landscape)' : 'Print Certificate (A4)'}
                        >
                          <Printer className="w-3.5 h-3.5 text-[#C5A04B]" />
                          <span>{lang === 'ar' ? 'طباعة' : 'Print'}</span>
                        </button>

                        {/* Export High-Res PDF */}
                        <button
                          type="button"
                          onClick={handleExportPdf}
                          disabled={isExportingPdf}
                          className="px-3.5 py-1.5 bg-[#102F5C] hover:bg-[#152B49] text-white border border-[#C5A04B]/50 text-xs font-bold rounded-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs font-mono disabled:opacity-50"
                          title={lang === 'ar' ? 'تصدير وتحميل PDF عالي الجودة' : 'Download High-Resolution PDF'}
                        >
                          {isExportingPdf ? (
                            <Loader2 className="w-3.5 h-3.5 text-[#DFC075] animate-spin" />
                          ) : (
                            <Download className="w-3.5 h-3.5 text-[#DFC075]" />
                          )}
                          <span>{isExportingPdf ? (lang === 'ar' ? 'جاري التصدير...' : 'Exporting...') : 'PDF'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Inline Certificate Display Container */}
                    <div className="bg-[#FAF8F2]/60 dark:bg-[#071324] border-2 border-gray-300 dark:border-[rgba(197,160,75,0.3)] rounded-xs p-2 sm:p-5 shadow-xl">
                      <div
                        onClick={() => setPreviewModalOpen(true)}
                        className="cursor-pointer transition-transform duration-300 hover:scale-[1.006] flex items-center justify-center"
                        title={lang === 'ar' ? 'انقر لفتح نافذة المعاينة التفاعلية والتكبير' : 'Click to open interactive zoom modal'}
                      >
                        <AcademicCertificateDocument
                          ref={inlineCertRef}
                          certificate={result}
                        />
                      </div>

                      {/* Certificate Footer Notice */}
                      <div className="mt-4 pt-3 border-t border-gray-200 dark:border-[rgba(197,160,75,0.2)] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-slate-500 dark:text-[#B8C5D6]">
                        <span className="flex items-center gap-1.5 text-[#08182E] dark:text-[#DFC075] font-semibold">
                          <FileCheck className="w-4 h-4 text-[#C5A04B] shrink-0" />
                          <span>
                            {lang === 'ar'
                              ? 'وثيقة رسمية معتمدة ومربوطة مباشرة بقاعدة البيانات المركزية'
                              : 'Official accredited certificate dynamically queried from central verification registry'}
                          </span>
                        </span>
                        <span className="text-[#C5A04B] font-bold">
                          REF: {result.certificateNumber}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Honest Frontend Notice */}
                  <div className="pt-3 border-t border-gray-200 dark:border-white/10 text-[11px] text-slate-500 dark:text-slate-400 font-mono no-print">
                    * Client-Side Verification Engine (LocalStorage Persistence)
                  </div>
                </div>
              ) : (
                /* When Not Found */
                <div className="py-8 text-center space-y-4">
                  <p className="text-sm text-slate-600 dark:text-[#B8C5D6] max-w-md mx-auto leading-relaxed">
                    {lang === 'ar'
                      ? 'لم يتم العثور على أي سجل معتمد مطابق للرقم المرجعي المدخل. يرجى التأكد من الرقم وإعادة المحاولة أو التواصل مع إدارة شؤون الطلاب.'
                      : 'No official institutional registration record matches the provided reference. Please verify the code or contact student affairs.'}
                  </p>
                  <button
                    onClick={() => navigate('/contact')}
                    className="px-5 py-2.5 bg-[#C5A04B] text-[#08182E] hover:bg-[#DFC075] text-xs font-bold rounded-xs transition-colors cursor-pointer inline-flex items-center gap-2 shadow-xs"
                  >
                    <span>{t('navContact')}</span>
                    <ArrowIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* CUSTOM ACADEMIC CERTIFICATE INTERACTIVE MODAL */}
      {result && result.isFound && (
        <AcademicCertificateModal
          isOpen={previewModalOpen}
          onClose={() => setPreviewModalOpen(false)}
          certificate={result}
        />
      )}
    </div>
  );
};
