/*
 * Project Design & Development
 * Engineered by Eng. Eyad Ahmed
 * SpeedUp Software Solutions
 * © 2026 All Rights Reserved.
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { AcademicCertificateDocument } from '../components/AcademicCertificateDocument';
import { AcademicCertificateModal } from '../components/AcademicCertificateModal';
import { PublicVerificationResponse } from '../types';
import {
  Award,
  ShieldCheck,
  QrCode,
  Lock,
  ArrowRight,
  ArrowLeft,
  ZoomIn,
  FileCheck,
  Building2,
  AlertCircle
} from 'lucide-react';

const masterSampleCertificate: PublicVerificationResponse = {
  isFound: true,
  isValid: true,
  status: 'Valid',
  statusBadgeColor: 'green',
  messageEn: 'Official Master Certificate Specimen Record',
  messageAr: 'نموذج وثيقة الاعتماد الرسمية المعتمدة',
  certificateNumber: 'BCL-2026-SPECIMEN',
  studentIdNumber: 'BCL-STU-SAMPLE',
  studentNameEn: '',
  studentNameAr: '',
  courseNameEn: 'Professional Business English & International Translation',
  courseNameAr: 'اللغة الإنجليزية للأعمال والترجمة الدولية المعتمدة',
  issueDate: '2026-06-15T00:00:00.000Z',
};

interface CertificatesPageProps {
  navigate?: (path: string) => void;
}

export const CertificatesPage: React.FC<CertificatesPageProps> = ({ navigate: propNavigate }) => {
  const routerNavigate = useNavigate();
  const navigate = propNavigate || routerNavigate;
  const { lang, isRtl } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  const securityFeatures = [
    {
      titleEn: 'Unique Cryptographic QR Code',
      titleAr: 'رمز استجابة سريع (QR) مشفر',
      descEn: 'Each issued certificate carries a unique 2D verification token linking directly to its authenticated central registry record.',
      descAr: 'تمنح كل وثيقة اعتماد رمز تحقق رقمي مباشر يربط مباشرة بسجل الاعتماد في قاعدة البيانات المركزية.',
      icon: QrCode,
    },
    {
      titleEn: 'Real-Time Ledger Querying',
      titleAr: 'التحقق اللحظي المباشر',
      descEn: 'Employers and academic bodies can independently authenticate credential standing (Valid, Revoked, or Expired) in real time.',
      descAr: 'يستطيع مسؤولو التوظيف والجهات الأكاديمية الاستعلام اللحظي للتأكد من سريان الشهادة أو إلغائها أو انتهاء صلاحيتها.',
      icon: ShieldCheck,
    },
    {
      titleEn: 'Bilingual Academic Transcript',
      titleAr: 'توثيق أكاديمي معتمد ثنائي اللغة',
      descEn: 'Official dual-language Arabic and English credential records with serialized reference metadata conforming to UK institutional standards.',
      descAr: 'سجلات اعتماد رسمية موثقة باللغتين العربية والإنجليزية مع أرقام مرجعية تسلسلية مطابقة للمواصفات المؤسسية.',
      icon: Award,
    },
    {
      titleEn: 'Transparent Scope of Authorization',
      titleAr: 'تحديد دقيق لنطاق الصلاحيات',
      descEn: 'Every certificate clearly identifies the issuing institution, program level, and cooperating accreditation body.',
      descAr: 'توضح كل شهادة بوضوح تام الجهة المصدرة الفعلية وجهة الاعتماد ونطاق الصلاحيات الممنوحة للبرنامج التدريبي.',
      icon: Lock,
    },
  ];

  return (
    <div className="pt-24 bg-white dark:bg-[#07182D] text-[#102F5C] dark:text-[#F8F9FC] transition-colors duration-200">
      {/* Editorial Page Header */}
      <div className="py-14 sm:py-20 bg-[#F7F8FA] dark:bg-[#07182D] border-b border-gray-200 dark:border-[rgba(201,163,74,0.22)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-start space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-0.5 bg-[#C5A04B]" />
            <span className="text-xs font-bold tracking-widest text-[#C5A04B] uppercase font-mono">
              ACADEMIC CERTIFICATES & CREDENTIALS
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#102F5C] dark:text-white tracking-tight font-serif">
            {lang === 'ar' ? 'معرض نماذج الشهادات الأكاديمية المعتمدة' : 'Official Academic Certificates Gallery'}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-[#B8C5D6] max-w-3xl leading-relaxed font-normal">
            {lang === 'ar'
              ? 'معرض نماذج التصميم الرسمية المعتمدة للشهادات والاعتمادات الأكاديمية والمهنية الصادرة عن المركز البريطاني لتعليم اللغات بالتعاون مع المؤسسات التعليمية الدولية.'
              : 'Official gallery showcasing the approved reference designs for academic and professional credentials issued in international educational cooperation.'}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                navigate('/verify');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-2.5 bg-[#C5A04B] hover:bg-[#DFC075] text-[#08182E] text-xs font-bold rounded-xs inline-flex items-center gap-2 transition-colors cursor-pointer shadow-sm font-mono"
            >
              <ShieldCheck className="w-4 h-4 text-[#08182E]" />
              <span>{lang === 'ar' ? 'التحقق من صحة شهادة صادرة' : 'Verify an Issued Certificate'}</span>
              <ArrowIcon className="w-3.5 h-3.5 text-[#08182E]" />
            </button>
            <div className="text-[11px] font-mono text-slate-500 dark:text-[#B8C5D6] flex items-center gap-1.5 px-3 py-2 bg-white dark:bg-[#102F5C] border border-gray-200 dark:border-[rgba(197,160,75,0.22)] rounded-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
              <span>{lang === 'ar' ? 'سجل التوثيق المركزي متاح 24/7' : 'Central Registry Online 24/7'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 1. Official Certificate Showcase Section — Using EXACT ORIGINAL IMAGE */}
      <section className="py-16 sm:py-24 bg-white dark:bg-[#08182E] border-b border-gray-200 dark:border-[rgba(197,160,75,0.22)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 text-start">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-[#C9A347]/20 text-[#C9A347] dark:text-[#DFC075] border border-[#C9A347]/40 text-[11px] font-mono font-bold uppercase rounded-xs">
                  MASTER SPECIMEN
                </span>
                <span className="text-xs font-mono text-slate-500 dark:text-[#AAB8CB]">
                  OFFICIAL ACCREDITED DESIGN
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#102F5C] dark:text-[#F7F8FA] font-serif">
                {lang === 'ar' ? 'نموذج تصميم الشهادة الأكاديمية المعتمدة' : 'Official Academic Certificate Design Preview'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-[#AAB8CB] leading-relaxed">
                {lang === 'ar'
                  ? 'الهوية البصرية الرسمية لشهادات المركز البريطاني لتعليم اللغات، متضمنة الختم المؤسسي البارز والزوايا الكلاسيكية ورمز التحقق الرقمي المشفر. اضغط على الشهادة لفتح المعاينة التفاعلية والتكبير الكامل.'
                  : 'Official visual identity of the British Center for Languages certificate, featuring the embossed institutional seal, classic corner elements, and cryptographic QR verification. Click to inspect or export.'}
              </p>
            </div>

            {/* Quick Actions Bar */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setIsCertModalOpen(true)}
                className="px-4 py-2 bg-[#C9A347] hover:bg-[#DFC075] text-[#07182D] text-xs font-bold rounded-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm font-mono"
              >
                <ZoomIn className="w-4 h-4 text-[#07182D]" />
                <span>{lang === 'ar' ? 'تكبير ومعاينة تفاعلية' : 'Interactive Preview'}</span>
              </button>
            </div>
          </div>

          {/* Master Certificate Display Canvas */}
          <div className="bg-[#FAF8F5] dark:bg-[#102B4C]/40 border-2 border-gray-300 dark:border-[rgba(201,163,71,0.35)] rounded-xs p-3 sm:p-6 shadow-xl">
            {/* The Master Certificate Container */}
            <div
              onClick={() => setIsCertModalOpen(true)}
              className="cursor-pointer transition-transform duration-300 hover:scale-[1.005] flex items-center justify-center bg-[#FAF8F2] rounded-xs shadow-md overflow-hidden"
              title={lang === 'ar' ? 'اضغط للمعاينة والتكبير التفاعلي وتصدير PDF' : 'Click to open interactive zoom preview and PDF export'}
            >
              <AcademicCertificateDocument
                certificate={masterSampleCertificate}
                isSample={true}
                responsive={true}
                className="w-full"
              />
            </div>

            {/* Clear Status Notice */}
            <div className="mt-4 pt-3 border-t border-gray-200 dark:border-[rgba(201,163,71,0.2)] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-slate-500 dark:text-[#AAB8CB]">
              <div className="flex items-center gap-2 text-start">
                <span className="w-2 h-2 rounded-full bg-[#C9A347] shrink-0" />
                <span>
                  {lang === 'ar'
                    ? 'نموذج توضيحي للاسترشاد بهيكل التصميم والاعتماد الرسمي • خالٍ من البيانات الشخصية'
                    : 'MASTER SPECIMEN: Official accredited document layout, sanitized without personal student data'}
                </span>
              </div>
              <div className="text-[11px] text-[#C9A347] font-bold">
                REF: BCL-2026-SPECIMEN
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Master Certificate Modal */}
        <AcademicCertificateModal
          isOpen={isCertModalOpen}
          onClose={() => setIsCertModalOpen(false)}
          certificate={masterSampleCertificate}
          isSample={true}
        />
      </section>

      {/* 2. Security Standards & Direct Link to Verification */}
      <section className="py-16 sm:py-24 bg-white dark:bg-[#08182E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-start max-w-3xl mb-12 space-y-3">
            <span className="text-xs font-mono font-bold text-[#C5A04B] uppercase">SECURITY STANDARDS</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#102F5C] dark:text-white font-serif">
              {lang === 'ar' ? 'معايير الأمان والموثوقية الرقمية للشهادات' : 'Digital Verification & Security Standards'}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-[#B8C5D6] leading-relaxed font-normal">
              {lang === 'ar'
                ? 'تلتزم منظومة إصدار الشهادات بأعلى بروتوكولات الحماية ضد التزوير، بما يضمن للمؤسسات وأرباب الأعمال التحقق الموثوق من السجلات الرسمية.'
                : 'The credential issuance infrastructure adheres to international anti-fraud protocols, empowering academic institutions and employers worldwide.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-start">
            {securityFeatures.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="p-6 border border-gray-200 dark:border-[rgba(197,160,75,0.22)] bg-[#F7F8FA] dark:bg-[#152B49] space-y-3 dark-luxury-card rounded-xs hover:border-[#C5A04B] transition-all shadow-xs dark:shadow-none hover:shadow-md"
                >
                  <div className="w-10 h-10 rounded-xs bg-white dark:bg-[#08182E] border border-gray-300 dark:border-[rgba(197,160,75,0.25)] flex items-center justify-center text-[#C5A04B] dark:text-[#DFC075]">
                    <Icon className="w-5 h-5 text-[#C5A04B] dark:text-[#DFC075]" />
                  </div>
                  <h3 className="text-base font-bold text-[#102F5C] dark:text-white font-serif">
                    {lang === 'ar' ? feat.titleAr : feat.titleEn}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-[#B8C5D6] leading-relaxed font-normal">
                    {lang === 'ar' ? feat.descAr : feat.descEn}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Verification Callout Bar */}
          <div className="mt-14 p-8 bg-[#102F5C] border-2 border-[#C5A04B] rounded-xs shadow-xl text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-start max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#DFC075]">
                <ShieldCheck className="w-4 h-4 text-[#DFC075]" />
                <span>OFFICIAL VERIFICATION ENGINE</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-serif">
                {lang === 'ar'
                  ? 'هل تريد التحقق من صحة وسريان شهادة فعلية صادرة؟'
                  : 'Looking to verify an actual issued certificate record?'}
              </h3>
              <p className="text-xs sm:text-sm text-[#B8C5D6] leading-relaxed">
                {lang === 'ar'
                  ? 'توفر بوابتنا الإلكترونية التحقق الفوري المباشر من صحة وسريان الشهادات باستخدام رقم الشهادة أو الرقم التعريفي للطالب.'
                  : 'Query authentic registration records and certificate standing directly using the certificate number or student reference.'}
              </p>
            </div>
            <div className="shrink-0">
              <button
                onClick={() => {
                  navigate('/verify');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-[#C5A04B] hover:bg-[#DFC075] text-[#08182E] text-xs font-bold rounded-xs inline-flex items-center gap-2 transition-all cursor-pointer shadow-lg font-mono uppercase tracking-wider"
              >
                <span>{lang === 'ar' ? 'الانتقال إلى بوابة التحقق' : 'Go to Verification Portal'}</span>
                <ArrowIcon className="w-4 h-4 text-[#08182E]" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};