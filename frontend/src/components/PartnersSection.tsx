/*
 * Project Design & Development
 * Engineered by Eng. Eyad Ahmed
 * SpeedUp Software Solutions
 * © 2026 All Rights Reserved.
 */
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import { Partner } from '../types';
import { Building2, Info } from 'lucide-react';

export const PartnersSection: React.FC = () => {
  const { lang, t } = useLanguage();
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const data = await api.getPartners();
        setPartners(data || []);
      } catch (err) {
        console.error('Failed to load partners', err);
        setPartners([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPartners();
    window.addEventListener('bcl_storage_updated', fetchPartners);
    return () => window.removeEventListener('bcl_storage_updated', fetchPartners);
  }, []);

  return (
    <section className="py-20 sm:py-24 bg-white dark:bg-[#08182E] text-[#102F5C] dark:text-white border-t border-gray-200 dark:border-[rgba(197,160,75,0.22)] transition-colors duration-200" id="partners">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-start max-w-3xl mb-12 space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-0.5 bg-[#C5A04B]" />
            <span className="text-xs font-bold tracking-widest text-[#C5A04B] uppercase font-mono">
              {lang === 'ar' ? 'التعاون والشراكات' : 'Institutional Cooperation'}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#102F5C] dark:text-white tracking-tight font-serif">
            {lang === 'ar' ? 'المؤسسات والمراكز الشريكة' : 'Cooperating Partners & Centers'}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-[#B8C5D6] leading-relaxed font-normal">
            {lang === 'ar'
              ? 'نعمل بالتعاون مع المؤسسات التعليمية ومراكز التدريب وفق اتفاقيات ومذكرات تعاون مؤسسي منظمة.'
              : 'Operating in strategic alignment with educational academies and training centers under bilateral institutional agreements.'}
          </p>
        </div>

        {/* Partners Representation */}
        {partners.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="bg-[#F7F8FA] dark:bg-[#152B49] border border-gray-200 dark:border-[rgba(197,160,75,0.22)] p-6 flex flex-col items-center justify-center text-center space-y-3 hover:border-[#C5A04B] transition-all rounded-xs dark-luxury-card shadow-xs dark:shadow-none hover:shadow-md"
              >
                {partner.logoUrl ? (
                  <img
                    src={partner.logoUrl}
                    alt={partner.nameEn}
                    className="max-h-12 w-auto object-contain filter brightness-90 hover:brightness-100 transition-all opacity-85 hover:opacity-100"
                  />
                ) : (
                  <div className="w-12 h-12 bg-white dark:bg-[#08182E] border border-gray-300 dark:border-[rgba(197,160,75,0.25)] rounded-xs flex items-center justify-center text-[#C5A04B] dark:text-[#DFC075]">
                    <Building2 className="w-6 h-6 text-[#C5A04B] dark:text-[#DFC075]" />
                  </div>
                )}
                <div className="space-y-0.5">
                  <h4 className="text-xs sm:text-sm font-bold text-[#102F5C] dark:text-white">
                    {lang === 'ar' ? partner.nameAr : partner.nameEn}
                  </h4>
                  <span className="text-[11px] text-[#C5A04B] block font-mono">
                    {partner.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* When No Real Partners are entered: Clean Dignified Dark Luxury Notice */
          <div className="bg-slate-50 dark:bg-[#152B49] border border-gray-200 dark:border-[rgba(197,160,75,0.25)] p-8 sm:p-10 max-w-2xl mx-auto text-center space-y-3 shadow-md dark:shadow-xl rounded-xs">
            <div className="w-10 h-10 mx-auto rounded-full bg-white dark:bg-[#08182E] border border-[#C5A04B]/40 text-[#C5A04B] dark:text-[#DFC075] flex items-center justify-center">
              <Info className="w-5 h-5 text-[#C5A04B] dark:text-[#DFC075]" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-[#102F5C] dark:text-white">
              {lang === 'ar'
                ? 'إعلان نشر بيانات الشركاء والاتفاقيات'
                : 'Publication of Institutional Partnerships'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-[#B8C5D6] leading-relaxed font-normal">
              {lang === 'ar'
                ? 'سيتم نشر بيانات المراكز والمؤسسات التعليمية الشريكة ومذكرات التفاهم فور استكمال الإجراءات والاعتمادات المؤسسية الرسمية لكل جهة.'
                : 'Partner educational academies and bilateral institutional memorandums of understanding will be published upon conclusion of formal approval procedures.'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
