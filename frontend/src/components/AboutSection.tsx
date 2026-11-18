// Developed by Eng. Eyad — SpeedUp Software.
/*
 * Developed & Engineered by Eng. Eyad Ahmed
 * SpeedUp Software Solutions
 * © 2026 All Rights Reserved.
 */
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Award, ShieldCheck, Handshake, Users } from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

export const AboutSection: React.FC = () => {
  const { lang, t } = useLanguage();

  const institutionalValues = [
    {
      number: '01',
      titleEn: 'Academic Excellence',
      titleAr: 'التميز الأكاديمي',
      descEn: 'Adherence to structured, high-caliber educational standards benchmarked against British academic traditions.',
      descAr: 'الالتزام بأرقى المعايير التعليمية والمهنية المنظمة المستمدة من التقاليد الأكاديمية البريطانية.',
      icon: Award,
    },
    {
      number: '02',
      titleEn: 'Institutional Integrity',
      titleAr: 'النزاهة والموثوقية',
      descEn: 'Full transparency in credential verification, factual declarations, and ethical operational governance.',
      descAr: 'الشفافية الكاملة في التحقق من الشهادات والبيانات الرسمية والالتزام بأعلى معايير الحوكمة والنزاهة.',
      icon: ShieldCheck,
    },
    {
      number: '03',
      titleEn: 'Strategic Partnership',
      titleAr: 'الشراكة والتكامل المؤسسي',
      descEn: 'Establishing productive alliances with international educational academies and training bodies.',
      descAr: 'بناء شراكات استراتيجية متينة مع كبرى المراكز والأكاديميات التعليمية لتبادل الخبرات وتطوير المناهج.',
      icon: Handshake,
    },
    {
      number: '04',
      titleEn: 'Human Empowerment',
      titleAr: 'تمكين الكوادر البشرية',
      descEn: 'Cultivating leadership, professional competence, and modern linguistic proficiency for global career pathways.',
      descAr: 'تأهيل القيادات والكوادر المهنية وتمكينهم لغوياً وإدارياً للمنافسة بكفاءة في بيئات العمل الدولية.',
      icon: Users,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#F7F8FA] dark:bg-[#08182E] text-[#102F5C] dark:text-white border-b border-gray-200/80 dark:border-[rgba(197,160,75,0.22)] transition-colors duration-250" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Editorial Section Heading */}
        <div className="text-start max-w-3xl space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-0.5 bg-[#C5A04B]" />
            <span className="text-xs font-bold tracking-widest text-[#C5A04B] dark:text-[#DFC075] uppercase font-mono">
              {lang === 'ar' ? 'عن المؤسسة' : 'About British Center'}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#102F5C] dark:text-white leading-snug tracking-tight font-serif">
            {lang === 'ar'
              ? 'بناء وتأهيل الكوادر البشرية والارتقاء بالمؤسسات التعليمية'
              : 'Advancing Human Capital & Institutional Excellence'}
          </h2>

          {/* Who We Are (من نحن) */}
          <p className="text-sm sm:text-base text-slate-600 dark:text-[#B8C5D6] leading-relaxed font-normal">
            {lang === 'ar'
              ? 'المركز البريطاني لتعليم اللغات (British Center for Languages) مؤسسة تعليمية وتدريبية متخصصة في بناء الكوادر البشرية، والتأهيل والتطوير المؤسسي، ودعم المراكز والمؤسسات التعليمية والتدريبية.'
              : 'British Center for Languages is an educational and training institution dedicated to human capacity building, institutional qualification, and supporting educational and training centers.'}
          </p>
        </div>

        {/* Institutional Philosophy Banner */}
        <div className="p-6 sm:p-7 bg-white dark:bg-[#152B49] border border-gray-200 dark:border-[rgba(197,160,75,0.3)] rounded-xs border-s-4 border-s-[#C5A04B] text-start shadow-xs dark:shadow-none space-y-2">
          <span className="text-xs font-mono font-bold text-[#C5A04B] dark:text-[#DFC075] uppercase tracking-wider block">
            {lang === 'ar' ? 'فلسفتنا المؤسسية' : 'Our Institutional Philosophy'}
          </span>
          <blockquote className="text-base sm:text-lg font-bold text-[#102F5C] dark:text-white font-serif leading-relaxed">
            {lang === 'ar'
              ? '« نؤمن بأن بناء المؤسسات يبدأ ببناء الكوادر، وأن جودة التعليم هي أساس صناعة المستقبل. »'
              : '"We believe that building institutions begins with building people, and that educational quality is the foundation of the future."'}
          </blockquote>
          <p className="text-xs text-[#C5A04B] dark:text-[#DFC075] font-semibold">
            {lang === 'ar'
              ? 'British Center for Languages — نحو تعليم مؤسسي، وتأهيل بمعايير احترافية، وآفاق دولية.'
              : 'British Center for Languages — Excellence in Education, Building Future Leaders.'}
          </p>
        </div>

        {/* Supporting Educational Photograph + Vision & Mission + 5 Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Supporting Educational Photograph (5 cols) */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative overflow-hidden aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] border border-gray-200 dark:border-[rgba(197,160,75,0.3)] shadow-xl bg-slate-100 dark:bg-[#152B49] rounded-xs group">
              <img
                src={getAssetUrl('assets/editorial/auditorium-lecture.webp')}
                alt={lang === 'ar' ? 'قاعة المحاضرات الأكاديمية والتدريب' : 'British Center Academic Lecture Auditorium'}
                width="640"
                height="480"
                loading="lazy"
                className="w-full h-full object-cover object-center filter saturate-[0.98] contrast-[1.02] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = getAssetUrl('assets/editorial/auditorium-lecture.jpg');
                }}
              />
            </div>
          </div>

          {/* Institutional Narrative, Vision & Mission (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-start order-1 lg:order-2">
            <div className="space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-[#102F5C] dark:text-white">
                {lang === 'ar' ? 'نعمل على الارتقاء بالمنظومة التعليمية من خلال:' : 'Advancing Education Through:'}
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-[#B8C5D6] font-medium">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A04B] mt-2 shrink-0" />
                  <span>{lang === 'ar' ? 'بناء وتأهيل الكوادر التعليمية والتدريبية.' : 'Building and qualifying educational and training human capital.'}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A04B] mt-2 shrink-0" />
                  <span>{lang === 'ar' ? 'تطوير أداء المراكز والمؤسسات التعليمية.' : 'Developing the performance of educational and training centers.'}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A04B] mt-2 shrink-0" />
                  <span>{lang === 'ar' ? 'تقديم البرامج والدورات التعليمية والتدريبية.' : 'Delivering structured educational and vocational training programs.'}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A04B] mt-2 shrink-0" />
                  <span>{lang === 'ar' ? 'دعم منظومة الشهادات والتأهيل المهني.' : 'Supporting credentials and vocational empowerment.'}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A04B] mt-2 shrink-0" />
                  <span>{lang === 'ar' ? 'التعاون في مجال اعتماد الشهادات التعليمية والتدريبية وفق نطاق الصلاحيات الممنوحة.' : 'Cooperation in validating credentials strictly adhering to authorized scopes.'}</span>
                </li>
              </ul>
            </div>

            {/* Vision and Mission Editorial Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              {/* Vision (رؤيتنا) */}
              <div className="p-6 bg-white dark:bg-[#152B49] border border-gray-200 dark:border-[rgba(197,160,75,0.22)] border-s-4 border-s-[#C5A04B] space-y-2 rounded-xs shadow-xs dark:shadow-none">
                <span className="text-xs font-mono font-bold text-[#C5A04B] dark:text-[#DFC075] uppercase tracking-wider block">
                  {lang === 'ar' ? 'رؤيتنا' : 'Our Vision'}
                </span>
                <h3 className="text-sm font-bold text-[#102F5C] dark:text-white">
                  {lang === 'ar' ? 'المرجعية الأكاديمية والمهنية' : 'Academic & Professional Benchmark'}
                </h3>
                <p className="text-sm text-slate-600 dark:text-[#B8C5D6] leading-relaxed font-normal">
                  {lang === 'ar'
                    ? 'أن نكون المرجع الأكاديمي والمهني الرائد في التطوير المؤسسي وتأهيل الكفاءات لغوياً وإدارياً بمعايير موثوقة.'
                    : 'To be the foremost academic benchmark in professional empowerment, linguistic development, and institutional quality.'}
                </p>
              </div>

              {/* Mission (رسالتنا) */}
              <div className="p-6 bg-white dark:bg-[#152B49] border border-gray-200 dark:border-[rgba(197,160,75,0.22)] border-s-4 border-s-[#102F5C] dark:border-s-[#DFC075] space-y-2 rounded-xs shadow-xs dark:shadow-none">
                <span className="text-xs font-mono font-bold text-[#C5A04B] dark:text-[#DFC075] uppercase tracking-wider block">
                  {lang === 'ar' ? 'رسالتنا' : 'Our Mission'}
                </span>
                <h3 className="text-base font-bold text-[#102F5C] dark:text-white">
                  {lang === 'ar' ? 'بيئة تعليمية متكاملة' : 'Integrated Learning Environment'}
                </h3>
                <p className="text-sm text-slate-600 dark:text-[#B8C5D6] leading-relaxed font-normal">
                  {lang === 'ar'
                    ? 'تقديم بيئة تعليمية متكاملة تسهم في تمكين الأفراد والمؤسسات، وترسيخ ثقافة الجودة والاعتماد الأكاديمي المنضبط.'
                    : 'Delivering structured academic pathways that empower leaders, foster institutional rigor, and enforce transparent accreditation.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Values (قيمنا المؤسسية) - 4-Column Balanced Editorial Grid */}
        <div className="pt-8 border-t border-gray-200 dark:border-[rgba(197,160,75,0.22)] space-y-6 text-start">
          <div className="flex items-center gap-3">
            <span className="w-6 h-0.5 bg-[#C5A04B]" />
            <h3 className="text-lg sm:text-xl font-bold text-[#102F5C] dark:text-white font-serif">
              {lang === 'ar' ? 'قيمنا المؤسسية' : 'Our Core Institutional Values'}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {institutionalValues.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.number}
                  className="bg-white dark:bg-[#152B49] border border-gray-200 dark:border-[rgba(197,160,75,0.22)] p-5 space-y-3 text-start rounded-xs dark-luxury-card"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-white/10">
                    <div className="w-8 h-8 rounded-xs bg-[#F7F8FA] dark:bg-[#08182E] border border-gray-200 dark:border-[rgba(197,160,75,0.3)] flex items-center justify-center text-[#102F5C] dark:text-[#DFC075]">
                      <Icon className="w-4 h-4 text-[#C5A04B] dark:text-[#DFC075]" />
                    </div>
                    <span className="font-mono text-xs font-bold text-[#C5A04B] dark:text-[#DFC075]">
                      {val.number}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-[#102F5C] dark:text-white">
                    {lang === 'ar' ? val.titleAr : val.titleEn}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-[#B8C5D6] leading-relaxed font-normal">
                    {lang === 'ar' ? val.descAr : val.descEn}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
