/*
 * Project Design & Development
 * Engineered by Eng. Eyad Ahmed
 * SpeedUp Software Solutions
 * © 2026 All Rights Reserved.
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { UkCooperationSection } from '../components/UkCooperationSection';

interface UkCooperationPageProps {
  navigate?: (path: string) => void;
}

export const UkCooperationPage: React.FC<UkCooperationPageProps> = ({ navigate: propNavigate }) => {
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
            <span className="text-xs font-bold tracking-widest text-[#C5A04B] uppercase font-mono">
              OFFICIAL UK COOPERATION
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#102F5C] dark:text-white tracking-tight font-serif">
            {lang === 'ar' ? 'التعاون الدولي والبيانات القانونية' : 'UK Cooperation & Legal Registrations'}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-[#B8C5D6] max-w-2xl leading-relaxed font-normal">
            {lang === 'ar'
              ? 'البيانات الرسمية المنظمة للتعاون الأكاديمي الدولي بين المركز البريطاني لتعليم اللغات والمؤسسات التعليمية الشريكة بالمملكة المتحدة.'
              : 'Official statutory registries and frameworks governing international academic cooperation between British Center for Languages and UK partners.'}
          </p>
        </div>
      </div>

      {/* Main Dark Luxury Cooperation Section */}
      <UkCooperationSection />
    </div>
  );
};
