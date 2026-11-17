/*
 * Project Design & Development
 * Engineered by Eng. Eyad Ahmed
 * SpeedUp Software Solutions
 * © 2026 All Rights Reserved.
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ServicesSection } from '../components/ServicesSection';
import { ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';

interface ServicesPageProps {
  navigate?: (path: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ navigate: propNavigate }) => {
  const routerNavigate = useNavigate();
  const navigate = propNavigate || routerNavigate;
  const { lang, isRtl, t } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div className="pt-24 bg-white dark:bg-[#07182D] text-[#102F5C] dark:text-[#F8F9FC] transition-colors duration-200">
      {/* Editorial Page Header */}
      <div className="py-14 sm:py-20 bg-[#F7F8FA] dark:bg-[#07182D] border-b border-gray-200 dark:border-[rgba(201,163,74,0.22)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-start space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-0.5 bg-[#C5A04B]" />
            <span className="text-xs font-bold tracking-widest text-[#C5A04B] dark:text-[#DFC075] uppercase font-mono">
              INSTITUTIONAL SERVICES
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#102F5C] dark:text-white tracking-tight">
            {lang === 'ar' ? 'خدماتنا وبرامجنا المؤسسية' : 'Our Services & Frameworks'}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-[#B8C5D6] max-w-2xl leading-relaxed font-normal">
            {lang === 'ar'
              ? 'مجموعة متكاملة من الخدمات المتخصصة في التدريب، والتطوير المؤسسي، وإصدار الشهادات والاعتمادات الأكاديمية، ودعم المراكز التعليمية والتدريبية.'
              : 'A comprehensive suite of specialized services in qualification, institutional quality development, academic credentialing, and educational academy support.'}
          </p>
        </div>
      </div>

      {/* Main 6 Core Services Section */}
      <ServicesSection />

      {/* Pre-Footer Action Box */}
      <section className="py-16 bg-[#F7F8FA] dark:bg-[#152B49] border-t border-gray-200 dark:border-[rgba(197,160,75,0.22)]">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#102F5C] dark:text-white">
            {lang === 'ar' ? 'هل ترغب في توثيق شهادة أو الاستعلام عن اعتماد؟' : 'Need to verify an issued credential?'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-[#B8C5D6] max-w-lg mx-auto leading-relaxed font-normal">
            {lang === 'ar'
              ? 'بإمكانك التحقق المباشر من صحة وسريان الشهادات عبر بوابتنا الرسمية للتحقق الرقمي.'
              : 'You can instantly authenticate valid credentials directly through our official verification registry.'}
          </p>
          <button
            onClick={() => {
              navigate('/verify');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-6 py-2.5 bg-[#C5A04B] hover:bg-[#DFC075] text-[#08182E] text-xs font-bold rounded-xs inline-flex items-center gap-2 transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-[#C8102E]" />
            <span>{lang === 'ar' ? 'الانتقال إلى بوابة التحقق' : 'Go to Verification Portal'}</span>
            <ArrowIcon className="w-3.5 h-3.5 text-[#08182E]" />
          </button>
        </div>
      </section>
    </div>
  );
};
