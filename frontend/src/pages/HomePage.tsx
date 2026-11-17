/*
 * Project Design & Development
 * Engineered by Eng. Eyad Ahmed
 * SpeedUp Software Solutions
 * © 2026 All Rights Reserved.
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { ServicesHighlightStrip } from '../components/ServicesHighlightStrip';
import { AboutSection } from '../components/AboutSection';
import { ServicesSection } from '../components/ServicesSection';
import { HomepageCertificateShowcase } from '../components/HomepageCertificateShowcase';
import { UkCooperationSection } from '../components/UkCooperationSection';
import { PartnersSection } from '../components/PartnersSection';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';

interface HomePageProps {
  navigate?: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate: propNavigate }) => {
  const routerNavigate = useNavigate();
  const navigate = propNavigate || routerNavigate;
  const { lang, isRtl, t } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div className="bg-white dark:bg-[#07182D] text-[#102F5C] dark:text-[#F8F9FC] transition-colors duration-200">
      {/* 1. Full-Width Big Ben Hero Section */}
      <Hero navigate={navigate} />

      {/* 2. Services Highlight Strip (Docked Immediately Below Hero) */}
      <ServicesHighlightStrip />

      {/* 3. Editorial About Section */}
      <AboutSection />

      {/* 4. Structured Services (6 Core Mandated Areas) */}
      <ServicesSection />

      {/* 5. Premium Academic Certificate Showcase (Anonymous Sample Specimen) */}
      <HomepageCertificateShowcase />

      {/* 6. Official UK Cooperation & Statutory Registration */}
      <UkCooperationSection />

      {/* 7. Cooperating Partners & Academies */}
      <PartnersSection />

      {/* 8. Clean Institutional Pre-Footer Verification Banner */}
      <section className="py-14 sm:py-18 bg-[#F7F8FA] dark:bg-[#07182D] border-t border-gray-200 dark:border-[rgba(201,163,74,0.22)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="w-12 h-12 mx-auto rounded-full bg-white dark:bg-[#152B49] border border-gray-300 dark:border-[rgba(197,160,75,0.3)] text-[#DFC075] flex items-center justify-center shadow-xs">
            <ShieldCheck className="w-6 h-6 text-[#C8102E]" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-[#C5A04B] uppercase tracking-wider block">
              ACADEMIC VERIFICATION LEDGER
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#102F5C] dark:text-white tracking-tight font-serif">
              {lang === 'ar'
                ? 'التحقق الرقمي المباشر من صحة وسريان الشهادات'
                : 'Direct Digital Verification of Academic Credentials'}
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-600 dark:text-[#B8C5D6] max-w-xl mx-auto leading-relaxed font-normal">
            {lang === 'ar'
              ? 'تتيح بوابتنا الرسمية لأصحاب الأعمال والمؤسسات الاستعلام الفوري عن السجلات المعتمدة برقم الشهادة أو الرقم التعريفي للطالب.'
              : 'Our official verification portal allows employers and academic bodies to instantly validate credential records using the certificate reference or student ID.'}
          </p>

          <div className="pt-2">
            <button
              onClick={() => {
                navigate('/verify');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-7 py-3 rounded-xs bg-[#C5A04B] hover:bg-[#DFC075] text-[#08182E] text-sm font-bold transition-colors duration-200 inline-flex items-center gap-2 cursor-pointer shadow-md"
            >
              <ShieldCheck className="w-4 h-4 text-[#08182E]" />
              <span>{lang === 'ar' ? 'الانتقال إلى بوابة التحقق' : 'Go to Verification Portal'}</span>
              <ArrowIcon className="w-4 h-4 text-[#08182E]" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
