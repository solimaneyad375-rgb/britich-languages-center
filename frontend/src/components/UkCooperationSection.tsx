/*
 * Project Design & Development
 * Engineered by Eng. Eyad Ahmed
 * SpeedUp Software Solutions
 * © 2026 All Rights Reserved.
 */
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Building2, ShieldCheck, Award } from 'lucide-react';

export const UkCooperationSection: React.FC = () => {
  const { lang, t } = useLanguage();

  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-[#08182E] text-[#102F5C] dark:text-white relative border-b border-gray-200 dark:border-[rgba(197,160,75,0.22)] transition-colors duration-200" id="uk-cooperation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-start max-w-3xl mb-14 space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-0.5 bg-[#C5A04B]" />
            <span className="text-xs font-bold tracking-widest text-[#C5A04B] dark:text-[#DFC075] uppercase font-mono">
              UNITED KINGDOM INSTITUTIONAL FRAMEWORK
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#102F5C] dark:text-white tracking-tight">
            {lang === 'ar' ? 'التعاون والارتباط بالمملكة المتحدة' : 'UK Institutional Cooperation & Registrations'}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-[#B8C5D6] leading-relaxed font-normal">
            {lang === 'ar'
              ? 'تلتزم مؤسستنا بأعلى درجات الوضوح والشفافية المؤسسية في كافة برامجها، وتعمل وفق أطر التعاون الأكاديمي والمهني المسجلة بالمملكة المتحدة مع الجهات التعليمية المتخصصة.'
              : 'Our institution maintains complete institutional clarity and transparency across all programs, operating under formal UK academic cooperation frameworks.'}
          </p>
        </div>

        {/* 3-Column Structured Dark Luxury Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Card 1: Cooperating UK Partner */}
          <div className="bg-[#F7F8FA] dark:bg-[#152B49] border border-gray-200 dark:border-[rgba(197,160,75,0.22)] p-7 space-y-4 text-start dark-luxury-card rounded-xs shadow-xs dark:shadow-none hover:shadow-md transition-all">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-white/10">
              <span className="text-xs font-mono font-bold text-[#C5A04B] dark:text-[#DFC075]">01 / PARTNERSHIP</span>
              <Building2 className="w-4 h-4 text-[#C5A04B] dark:text-[#DFC075]" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-300 block mb-1 font-semibold">
                {lang === 'ar' ? 'جهة التعاون بالمملكة المتحدة' : 'UK Educational Partner'}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-[#102F5C] dark:text-white leading-snug">
                UK International Education & Training
              </h3>
            </div>

            <p className="text-sm text-slate-600 dark:text-[#B8C5D6] leading-relaxed font-normal">
              {lang === 'ar'
                ? 'جهة التعاون الأكاديمي والتدريبي بالمملكة المتحدة، وتعمل وفق إطار اتفاقيات التعاون المؤسسي وتبادل الخبرات وتطوير المناهج التعليمية.'
                : 'Strategic partner for international educational cooperation, operating under formal institutional agreements to advance curriculum standards and training exchange.'}
            </p>

            <div className="pt-3 border-t border-gray-200 dark:border-white/10 text-xs text-[#C5A04B] dark:text-[#DFC075] font-semibold">
              <span>{lang === 'ar' ? 'إطار اتفاقية مؤسسية رسمية' : 'Official Institutional Partnership Framework'}</span>
            </div>
          </div>

          {/* Card 2: Companies House */}
          <div className="bg-[#F7F8FA] dark:bg-[#152B49] border border-gray-200 dark:border-[rgba(197,160,75,0.22)] p-7 space-y-4 text-start dark-luxury-card rounded-xs shadow-xs dark:shadow-none hover:shadow-md transition-all">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-white/10">
              <span className="text-xs font-mono font-bold text-[#C5A04B] dark:text-[#DFC075]">02 / REGISTRY</span>
              <ShieldCheck className="w-4 h-4 text-[#C5A04B] dark:text-[#DFC075]" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-300 block mb-1 font-semibold">
                {lang === 'ar' ? 'السجل التجاري للشركات (إنجلترا وويلز)' : 'Companies House Registration Number'}
              </span>
              <h3 className="text-2xl font-bold font-mono text-[#C5A04B] dark:text-[#DFC075] tracking-wider">
                16605467
              </h3>
            </div>

            <p className="text-sm text-slate-600 dark:text-[#B8C5D6] leading-relaxed font-normal">
              {lang === 'ar'
                ? 'مسجل رسمياً في السجل التجاري بالمملكة المتحدة (Companies House) ككيان قانوني موثق ومسجل في إنجلترا وويلز.'
                : 'Officially incorporated and registered with Companies House (Registrar of Companies for England and Wales) as an incorporated legal entity.'}
            </p>

            <div className="pt-3 border-t border-gray-200 dark:border-white/10 text-xs text-slate-500 dark:text-slate-400 font-mono">
              <span>COMPANIES HOUSE • REG. 16605467</span>
            </div>
          </div>

          {/* Card 3: UKRLP Register */}
          <div className="bg-[#F7F8FA] dark:bg-[#152B49] border border-gray-200 dark:border-[rgba(197,160,75,0.22)] p-7 space-y-4 text-start dark-luxury-card rounded-xs shadow-xs dark:shadow-none hover:shadow-md transition-all">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-white/10">
              <span className="text-xs font-mono font-bold text-[#C5A04B] dark:text-[#DFC075]">03 / PROVIDER</span>
              <Award className="w-4 h-4 text-[#C5A04B] dark:text-[#DFC075]" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-300 block mb-1 font-semibold">
                {lang === 'ar' ? 'سجل مزودي التعلم بالمملكة المتحدة (UKRLP)' : 'UK Register of Learning Providers (UKRLP)'}
              </span>
              <h3 className="text-2xl font-bold font-mono text-[#C5A04B] dark:text-[#DFC075] tracking-wider">
                10099520
              </h3>
            </div>

            <p className="text-sm text-slate-600 dark:text-[#B8C5D6] leading-relaxed font-normal">
              {lang === 'ar'
                ? 'مقيد في سجل مزودي التعلم بالمملكة المتحدة (UKRLP) بالرقم المرجعي الرسمي لمزودي التعليم والتدريب (UKPRN: 10099520).'
                : 'Listed in the UK Register of Learning Providers (UKRLP) with official UK Provider Reference Number (UKPRN: 10099520).'}
            </p>

            <div className="pt-3 border-t border-gray-200 dark:border-white/10 text-xs text-slate-500 dark:text-slate-400 font-mono">
              <span>UKPRN: 10099520 • www.ukrlp.co.uk</span>
            </div>
          </div>
        </div>

        {/* Factual Institutional Clarification Notice */}
        <div className="mt-10 p-5 bg-slate-50 dark:bg-[#152B49] border border-gray-200 dark:border-[rgba(197,160,75,0.22)] text-slate-700 dark:text-slate-200 text-xs sm:text-sm leading-relaxed text-start max-w-4xl space-y-2 rounded-xs">
          <strong className="text-[#C5A04B] dark:text-[#DFC075] block font-semibold text-sm">
            {lang === 'ar' ? 'بيان الشفافية القانونية والتنظيمية:' : 'Regulatory & Transparency Notice:'}
          </strong>
          <p className="text-slate-600 dark:text-[#B8C5D6]">
            {lang === 'ar'
              ? 'توضح المؤسسة بدقة أن أرقام التسجيل لدى Companies House وقيد مزودي التعلم (UKRLP) تعبر عن الوجود القانوني والمهني المنظم بالمملكة المتحدة، ولا تمثل بأي شكل اعتماداً وزارياً حكومياً تلقائياً، كما لا تعني الاعتراف العالمي الشامل بالشهادات بمجرد التسجيل، حيث تخضع معادلة وتوثيق المؤهلات للوائح الجهات المستفيدة ونطاق الاتفاقيات المعقودة.'
              : 'The institution explicitly notes that statutory registration with Companies House and listing on the UK Register of Learning Providers (UKRLP) verify legal incorporation and recognized provider listing status in the UK. They do not constitute automatic government ministerial accreditation or universal recognition of credentials beyond the specific authorized scopes.'}
          </p>
        </div>
      </div>
    </section>
  );
};
