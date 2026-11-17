/*
 * Project Design & Development
 * Engineered by Eng. Eyad Ahmed
 * SpeedUp Software Solutions
 * © 2026 All Rights Reserved.
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Award, Layers, Users, Building2, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';

interface StripItem {
  id: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  icon: React.ComponentType<{ className?: string }>;
  link: string;
}

export const ServicesHighlightStrip: React.FC = () => {
  const navigate = useNavigate();
  const { lang, isRtl } = useLanguage();

  const items: StripItem[] = [
    {
      id: 'certificates',
      titleAr: 'شهادات معتمدة',
      titleEn: 'Accredited Certificates',
      descAr: 'توثيق رسمي برموز QR مشفرة',
      descEn: 'Official digital QR verification',
      icon: Award,
      link: '/certificates',
    },
    {
      id: 'programs',
      titleAr: 'برامج تدريبية متخصصة',
      titleEn: 'Specialized Training',
      descAr: 'مسارات لغوية ومهنية متقدمة',
      descEn: 'Advanced linguistic tracks',
      icon: Layers,
      link: '/services',
    },
    {
      id: 'partners',
      titleAr: 'شركاء دوليون',
      titleEn: 'International Partners',
      descAr: 'تعاون وثيق مع كبرى الأكاديميات',
      descEn: 'Collaborations with top academies',
      icon: Users,
      link: '/partners',
    },
    {
      id: 'support',
      titleAr: 'دعم مؤسسي متكامل',
      titleEn: 'Institutional Support',
      descAr: 'تطوير الأداء وحوكمة المعايير',
      descEn: 'Operational governance & quality',
      icon: Building2,
      link: '/uk-cooperation',
    },
  ];

  return (
    <section className="relative z-20 bg-[#07182D] border-t border-b border-[rgba(201,163,74,0.25)] shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x sm:divide-x-reverse divide-[rgba(201,163,74,0.18)]">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => {
                  navigate(item.link);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group relative py-5 sm:py-6 px-4 sm:px-6 flex items-center gap-3.5 sm:gap-4 transition-all duration-300 hover:bg-[#102B4C]/50 cursor-pointer select-none"
              >
                {/* Gold Outline Icon Container */}
                <div className="shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xs bg-[#173A63]/40 border border-[#C9A34A]/40 flex items-center justify-center text-[#DFC075] transition-all duration-300 group-hover:scale-105 group-hover:border-[#C9A34A] group-hover:bg-[#C9A34A]/15 group-hover:shadow-[0_0_15px_rgba(201,163,74,0.25)]">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#DFC075] group-hover:text-[#F8F9FC] transition-colors" />
                </div>

                {/* Text Content */}
                <div className="space-y-0.5 text-start">
                  <h3 className="text-sm sm:text-base font-bold text-[#F8F9FC] font-serif group-hover:text-[#DFC075] transition-colors leading-snug">
                    {lang === 'ar' ? item.titleAr : item.titleEn}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#A9BBD1] font-normal leading-tight hidden xs:block">
                    {lang === 'ar' ? item.descAr : item.descEn}
                  </p>
                </div>

                {/* Subtle bottom accent line on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A34A] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

