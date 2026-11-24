/*
 * Developed & Engineered by Eng. Eyad Ahmed
 * SpeedUp Software Solutions
 * © 2026 All Rights Reserved.
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { AboutSection } from '../components/AboutSection';
import { UkCooperationSection } from '../components/UkCooperationSection';
import { getAssetUrl } from '../utils/assets';

interface AboutPageProps {
  navigate?: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ navigate: propNavigate }) => {
  const routerNavigate = useNavigate();
  const navigate = propNavigate || routerNavigate;
  const { lang, t } = useLanguage();

  return (
    <div className="pt-24 bg-white dark:bg-[#07182D] text-[#102F5C] dark:text-[#F8F9FC] transition-colors duration-200">
      {/* Editorial Page Header */}
      <div className="py-14 sm:py-20 bg-[#F7F8FA] dark:bg-[#07182D] border-b border-gray-200 dark:border-[rgba(201,163,74,0.22)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-start space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-0.5 bg-[#C5A04B]" />
            <span className="text-xs font-bold tracking-widest text-[#C5A04B] dark:text-[#DFC075] uppercase font-mono">
              ABOUT THE INSTITUTION
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#102F5C] dark:text-white tracking-tight">
            {lang === 'ar' ? 'المركز البريطاني لتعليم اللغات' : 'British Center for Languages'}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-[#B8C5D6] max-w-2xl leading-relaxed font-normal">
            {lang === 'ar'
              ? 'مؤسسة تعليمية وتدريبية متخصصة في بناء الكوادر البشرية، والتأهيل والتطوير المؤسسي، ودعم المراكز والمؤسسات التعليمية والتدريبية.'
              : 'An educational and training institution specialized in developing human capabilities, institutional empowerment, and supporting educational and training centers.'}
          </p>
        </div>
      </div>

      {/* 1. Asymmetric Institutional Profile Section (Featuring Official Institution Building) */}
      <section className="py-16 sm:py-24 bg-white dark:bg-[#08182E] border-b border-gray-200 dark:border-[rgba(197,160,75,0.22)] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Visual Column: Architectural Photograph (~55% width) */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative overflow-hidden rounded-xs border border-gray-200 dark:border-[rgba(197,160,75,0.35)] shadow-2xl bg-slate-100 dark:bg-[#152B49] group">
                <img
                  src={getAssetUrl('assets/editorial/institution-building.webp')}
                  alt={lang === 'ar' ? 'المقر التعليمي والبيئة المؤسسية للمركز' : 'British Center Educational Institution Building'}
                  width="720"
                  height="480"
                  loading="lazy"
                  className="w-full h-[360px] sm:h-[420px] lg:h-[480px] object-cover object-center filter saturate-[0.98] contrast-[1.02] transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = getAssetUrl('assets/editorial/institution-building.jpg');
                  }}
                />
              </div>
            </div>

            {/* Editorial Content Column (~45% width) */}
            <div className="lg:col-span-6 space-y-6 text-start order-1 lg:order-2">
              <div className="flex items-center gap-3">
                <span className="w-8 h-0.5 bg-[#C5A04B]" />
                <span className="text-xs font-bold tracking-widest text-[#C5A04B] dark:text-[#DFC075] uppercase font-mono">
                  {lang === 'ar' ? 'الملف التعريفي والريادة' : 'INSTITUTIONAL PROFILE & PILLARS'}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#102F5C] dark:text-white font-serif leading-snug">
                {lang === 'ar'
                  ? 'صرح تعليمي وتأهيلي بمعايير مهنية رصينة وآفاق دولية'
                  : 'A Structured Center for Professional Education & Global Horizons'}
              </h2>

              <p className="text-sm sm:text-base text-slate-600 dark:text-[#B8C5D6] leading-relaxed font-normal">
                {lang === 'ar'
                  ? 'يقوم المركز البريطاني لتعليم اللغات على رؤية استراتيجية واضحة تهدف إلى سد الفجوة بين التعليم النظري ومتطلبات بيئات العمل الاحترافية، من خلال تصميم وتنفيذ دبلومات وبرامج تدريبية متخصصة ترتكز على المعايير الأكاديمية والمهنية المنظمة.'
                  : 'British Center for Languages operates on a clear strategic vision dedicated to bridging the divide between theoretical instruction and professional industry standards, delivering specialized diplomas rooted in established academic rigor.'}
              </p>

              <div className="pt-2 border-t border-gray-200 dark:border-white/10 grid grid-cols-2 gap-4 text-start font-mono text-xs">
                <div className="p-3 bg-[#F7F8FA] dark:bg-[#152B49] border border-gray-200 dark:border-[rgba(197,160,75,0.22)] rounded-xs">
                  <span className="text-[#C5A04B] dark:text-[#DFC075] font-bold block text-sm">UK COOPERATION</span>
                  <span className="text-slate-600 dark:text-slate-300 text-[11px] block mt-1">Companies House: 16605467</span>
                </div>
                <div className="p-3 bg-[#F7F8FA] dark:bg-[#152B49] border border-gray-200 dark:border-[rgba(197,160,75,0.22)] rounded-xs">
                  <span className="text-[#C5A04B] dark:text-[#DFC075] font-bold block text-sm">LEARNING PROVIDER</span>
                  <span className="text-slate-600 dark:text-slate-300 text-[11px] block mt-1">UKRLP Ref: 10099520</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Narrative & Values Section */}
      <AboutSection />

      {/* Structured Institutional Principles on Elevated Surfaces */}
      <section className="py-16 sm:py-24 bg-[#F7F8FA] dark:bg-[#08182E] border-b border-gray-200 dark:border-[rgba(197,160,75,0.22)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-start">
            <div className="p-6 bg-white dark:bg-[#152B49] border border-gray-200 dark:border-[rgba(197,160,75,0.22)] space-y-3 dark-luxury-card rounded-xs shadow-xs dark:shadow-none hover:shadow-md transition-all">
              <span className="text-xs font-mono font-bold text-[#C5A04B] dark:text-[#DFC075]">01 / GOVERNANCE</span>
              <h3 className="text-base font-bold text-[#102F5C] dark:text-white">
                {lang === 'ar' ? 'الحوكمة والأصالة المؤسسية' : 'Institutional Governance'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-[#B8C5D6] leading-relaxed font-normal">
                {lang === 'ar'
                  ? 'تخضع كافة أعمالنا للوائح تنظيمية دقيقة تضمن تطبيق أرقى معايير الجودة والشفافية في التدريب والإدارة.'
                  : 'All educational workflows operate under robust governance protocols that ensure rigorous quality assurance and ethical accountability.'}
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-[#152B49] border border-gray-200 dark:border-[rgba(197,160,75,0.22)] space-y-3 dark-luxury-card rounded-xs shadow-xs dark:shadow-none hover:shadow-md transition-all">
              <span className="text-xs font-mono font-bold text-[#C5A04B] dark:text-[#DFC075]">02 / ALLIANCES</span>
              <h3 className="text-base font-bold text-[#102F5C] dark:text-white">
                {lang === 'ar' ? 'اتفاقيات التعاون الدولي' : 'Strategic Alliances'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-[#B8C5D6] leading-relaxed font-normal">
                {lang === 'ar'
                  ? 'شراكة وثيقة مع UK International Education & Training بالمملكة المتحدة لتطوير المحتوى التعليمي والمهني.'
                  : 'Structured institutional alliance with UK International Education & Training to advance curriculum benchmarks and qualification standards.'}
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-[#152B49] border border-gray-200 dark:border-[rgba(197,160,75,0.22)] space-y-3 dark-luxury-card rounded-xs shadow-xs dark:shadow-none hover:shadow-md transition-all">
              <span className="text-xs font-mono font-bold text-[#C5A04B] dark:text-[#DFC075]">03 / VERIFICATION</span>
              <h3 className="text-base font-bold text-[#102F5C] dark:text-white">
                {lang === 'ar' ? 'الموثوقية والتحقق الرقمي' : 'Verification Integrity'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-[#B8C5D6] leading-relaxed font-normal">
                {lang === 'ar'
                  ? 'قاعدة بيانات مشفرة مركزية تتيح لأصحاب الأعمال والهيئات التحقق اللحظي من الشهادات والاعتمادات الرسمية.'
                  : 'An encrypted central database enabling employers and academic bodies to instantly authenticate certificates and official credentials.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Official UK Statutory Cooperation Section */}
      <UkCooperationSection />
    </div>
  );
};
