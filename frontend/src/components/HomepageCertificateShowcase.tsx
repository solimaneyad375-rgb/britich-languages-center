// Developed by Eng. Eyad — SpeedUp Software.
/*
 * Developed & Engineered by Eng. Eyad Ahmed
 * SpeedUp Software Solutions
 * © 2026 All Rights Reserved.
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { AcademicCertificateDocument } from './AcademicCertificateDocument';
import { AcademicCertificateModal } from './AcademicCertificateModal';
import { PublicVerificationResponse } from '../types';
import {
  Award,
  Maximize2,
  ShieldCheck,
  QrCode,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  FileCheck2,
  ExternalLink
} from 'lucide-react';

const sampleSpecimenCertificate: PublicVerificationResponse = {
  isFound: true,
  isValid: true,
  status: 'Valid',
  statusBadgeColor: 'green',
  messageEn: 'Accredited Specimen Credential Record',
  messageAr: 'نموذج وثيقة اعتماد معتمدة ومطابقة',
  certificateNumber: 'BCL-2026-SPECIMEN',
  studentIdNumber: 'BCL-STU-SAMPLE',
  studentNameEn: '',
  studentNameAr: '',
  courseNameEn: 'Professional Business English & International Translation',
  courseNameAr: 'اللغة الإنجليزية للأعمال والترجمة الدولية المعتمدة',
  issueDate: '2026-06-15T00:00:00.000Z',
};

export const HomepageCertificateShowcase: React.FC = () => {
  const navigate = useNavigate();
  const { lang, isRtl } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section className="relative py-20 sm:py-24 bg-[#08182E] text-white overflow-hidden border-t border-b border-[rgba(197,160,75,0.22)]">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          {/* Official Specimen Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-xs bg-[#102F5C]/80 border border-[#C5A04B]/40">
            <Award className="w-4 h-4 text-[#DFC075]" />
            <span className="text-xs font-semibold tracking-wider text-[#DFC075] uppercase">
              {lang === 'ar' ? 'وثيقة اعتماد رسمية — نموذج توضيحي' : 'Official Credential Specimen'}
            </span>
          </div>

          {/* Section Main Titles */}
          <div className="space-y-2">
            <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#C5A04B] uppercase block">
              ACADEMIC CERTIFICATES & CREDENTIALS
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-serif text-white tracking-tight leading-tight">
              {lang === 'ar' ? 'نماذج من الشهادات والاعتمادات' : 'Academic Certificates & Credentials'}
            </h2>
          </div>

          {/* Editorial Introduction */}
          <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            {lang === 'ar'
              ? 'تصدر جميع شهادات ودبلومات المركز البريطاني لتعليم اللغات وفق معايير الجودة والتوثيق الأكاديمي المعتمدة، مع تزويد كل وثيقة بختم مؤسسي بارز ورمز استجابة سريع (QR Code) مشفر للتحقق الفوري المباشر.'
              : 'All credentials and diplomas awarded by the British Center for Languages adhere to rigorous UK academic standards, featuring an embossed institutional gold seal and cryptographic QR verification for real-time validation.'}
          </p>
        </div>

        {/* 2. PROMINENT CERTIFICATE SHOWCASE CONTAINER */}
        <div className="max-w-5xl mx-auto">
          {/* Frame Container with Gold Border and Clean Hover Interaction */}
          <div
            onClick={() => setIsModalOpen(true)}
            className="group relative rounded-xs p-3 sm:p-5 bg-[#0B1F3A] border border-[#C5A04B]/35 hover:border-[#C5A04B]/80 shadow-2xl transition-all duration-300 cursor-pointer"
          >
            {/* Top Toolbar / Status Indicators */}
            <div className="flex items-center justify-between pb-3 px-1 border-b border-[#C5A04B]/20 mb-4 text-xs font-mono">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C5A04B]" />
                <span className="text-[#DFC075] font-semibold text-xs tracking-wider uppercase">
                  {lang === 'ar' ? 'نموذج وثيقة التخرج الرسمية (A4 Landscape)' : 'Official Graduate Credential Specimen (A4 Landscape)'}
                </span>
              </div>

              {/* Click to Preview / Zoom Indicator */}
              <div className="flex items-center gap-1.5 text-slate-300 group-hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1 rounded-xs border border-white/10">
                <Maximize2 className="w-3.5 h-3.5 text-[#DFC075]" />
                <span className="text-[11px] hidden sm:inline font-sans">
                  {lang === 'ar' ? 'تكبير وعرض كامل' : 'Expand / High-Res'}
                </span>
              </div>
            </div>

            {/* Certificate Render Wrapper */}
            <div className="relative overflow-hidden rounded-sm shadow-xl flex justify-center items-center bg-[#FAF8F2]">
              <AcademicCertificateDocument
                certificate={sampleSpecimenCertificate}
                isSample={true}
                responsive={true}
                className="w-full"
              />

              {/* Subtle Floating Hover Overlay Badge */}
              <div className="absolute inset-0 bg-[#08182E]/0 group-hover:bg-[#08182E]/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
                <div className="px-4 py-2 rounded-xs bg-[#08182E]/90 border border-[#C5A04B] text-[#DFC075] shadow-lg flex items-center gap-2 backdrop-blur-xs transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <Maximize2 className="w-4 h-4 text-[#DFC075]" />
                  <span className="text-xs font-serif font-bold text-white">
                    {lang === 'ar' ? 'اضغط للمعاينة بحجم الشاشة الكاملة وتكبير التفاصيل' : 'Click to preview full screen and inspect details'}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Caption Bar */}
            <div className="pt-3 px-1 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-[#C5A04B]" />
                <span>UK Register of Learning Providers (UKRLP: 10099520)</span>
              </div>
              <div className="text-slate-400">
                Companies House Registration No. 16605467
              </div>
            </div>
          </div>
        </div>

        {/* 3. KEY CREDENTIAL HIGHLIGHTS (3-COLUMN GRID) */}
        <div className="mt-12 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          {/* Feature 1 */}
          <div className="p-4 rounded-xs bg-[#0B1F3A]/70 border border-[#C5A04B]/20 space-y-1.5">
            <div className="w-8 h-8 rounded-full bg-[#C5A04B]/15 border border-[#C5A04B]/40 flex items-center justify-center mx-auto text-[#DFC075]">
              <Award className="w-4 h-4 text-[#DFC075]" />
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-white font-serif">
              {lang === 'ar' ? 'الختم المؤسسي الذهبي' : 'Embossed Gold Seal'}
            </h4>
            <p className="text-[11px] text-slate-300 leading-normal">
              {lang === 'ar'
                ? 'علامة توثيقية حصرية مدمجة في صلب الوثيقة لمنع التزوير أو التلاعب.'
                : 'Exclusive institutional security mark embedded in the official credential.'}
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-4 rounded-xs bg-[#0B1F3A]/70 border border-[#C5A04B]/20 space-y-1.5">
            <div className="w-8 h-8 rounded-full bg-[#C5A04B]/15 border border-[#C5A04B]/40 flex items-center justify-center mx-auto text-[#DFC075]">
              <QrCode className="w-4 h-4 text-[#DFC075]" />
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-white font-serif">
              {lang === 'ar' ? 'الباركود الموحد المشفر' : 'Unified Shared Barcode (BC-QT-0047)'}
            </h4>
            <p className="text-[11px] text-slate-300 leading-normal">
              {lang === 'ar'
                ? 'فحص رقمي موحد للدفعات والمجموعات حتى 30 متدرباً مع اعتماد السجلات مركزياً.'
                : 'Direct digital verification for cohorts of up to 30 students with centrally accredited records.'}
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-4 rounded-xs bg-[#0B1F3A]/70 border border-[#C5A04B]/20 space-y-1.5">
            <div className="w-8 h-8 rounded-full bg-[#C5A04B]/15 border border-[#C5A04B]/40 flex items-center justify-center mx-auto text-[#DFC075]">
              <ShieldCheck className="w-4 h-4 text-[#DFC075]" />
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-white font-serif">
              {lang === 'ar' ? 'اعتماد بريطاني رسمي' : 'Statutory UK Compliance'}
            </h4>
            <p className="text-[11px] text-slate-300 leading-normal">
              {lang === 'ar'
                ? 'مسجل رسمياً بالمملكة المتحدة وفق معايير التدريب والتأهيل الدولية.'
                : 'Fully registered in the United Kingdom under statutory educational bodies.'}
            </p>
          </div>
        </div>

        {/* 4. PRIMARY CALL TO ACTION BUTTONS */}
        <div className="mt-12 text-center flex flex-wrap items-center justify-center gap-4">
          {/* Main CTA: Navigate to /certificates */}
          <button
            type="button"
            onClick={() => {
              navigate('/certificates');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-8 py-3.5 rounded-xs bg-[#C9A347] hover:bg-[#DFC075] text-[#07182D] text-sm font-bold transition-all duration-200 inline-flex items-center gap-2.5 shadow-lg shadow-[#C9A347]/15 hover:shadow-[#C9A347]/30 cursor-pointer"
          >
            <FileCheck2 className="w-4 h-4 text-[#07182D]" />
            <span>{lang === 'ar' ? 'استكشف نماذج الشهادات المعتمدة' : 'Explore Accredited Certificates'}</span>
            <ArrowIcon className="w-4 h-4 text-[#07182D]" />
          </button>

          {/* Secondary CTA: Go to Shared Barcode Verification Portal */}
          <button
            type="button"
            onClick={() => {
              navigate('/verify');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-6 py-3.5 rounded-xs bg-[#142B49] hover:bg-[#1A375E] text-[#F7F8FA] border border-[#C9A347]/40 text-sm font-semibold transition-colors duration-200 inline-flex items-center gap-2 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-[#DFC075]" />
            <span>{lang === 'ar' ? 'التحقق بالباركود الموحد (BC-QT-0047)' : 'Verify Shared Barcode (BC-QT-0047)'}</span>
          </button>
        </div>
      </div>

      {/* 5. INTERACTIVE CERTIFICATE FULL VIEW MODAL */}
      <AcademicCertificateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        certificate={sampleSpecimenCertificate}
        isSample={true}
      />
    </section>
  );
};
