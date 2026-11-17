/*
 * Developed & Engineered by Eng. Eyad Ahmed
 * SpeedUp Software Solutions
 * © 2026 All Rights Reserved.
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { PartnersSection } from '../components/PartnersSection';
import { getAssetUrl } from '../utils/assets';
import {
  Building2,
  Handshake,
  CheckCircle2,
  FileCheck,
  ShieldCheck,
  Globe2,
  ArrowRight,
  ArrowLeft,
  PhoneCall,
  MessageCircle,
  Award
} from 'lucide-react';

interface PartnersPageProps {
  navigate?: (path: string) => void;
}

export const PartnersPage: React.FC<PartnersPageProps> = ({ navigate: propNavigate }) => {
  const routerNavigate = useNavigate();
  const navigate = propNavigate || routerNavigate;
  const { lang, isRtl, t } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const cooperationPillars = [
    {
      titleEn: 'Academic & Training Standards',
      titleAr: 'معايير الجودة والتأهيل المؤسسي',
      descEn: 'Collaborating on curriculum standardization, learning outcomes assessment, and instructional governance.',
      descAr: 'تطوير وتوحيد المناهج، وتحديد مخرجات التعلم، وتطبيق معايير الجودة في المراكز التعليمية الشريكة.',
      icon: Award,
    },
    {
      titleEn: 'Faculty & Trainer Qualification',
      titleAr: 'بناء وتأهيل الكوادر والمدربين',
      descEn: 'Empowering local trainers through certified Training of Trainers (TOT) masterclasses and global pedagogies.',
      descAr: 'تأهيل المعلمين والمدربين عبر برامج إعداد المدربين (TOT) المتوافقة مع أحدث الاتجاهات التربوية الدولية.',
      icon: CheckCircle2,
    },
    {
      titleEn: 'Credential Issuance & Authentication',
      titleAr: 'منظومة إصدار واعتماد الشهادات',
      descEn: 'Issuing verifiable certificates and student ID cards with dual-language cryptographic QR records.',
      descAr: 'دعم إصدار الشهادات وبطاقات الطلاب الذكية المزودة برموز التحقق اللحظي وفق نطاق الصلاحيات الممنوحة.',
      icon: ShieldCheck,
    },
    {
      titleEn: 'Institutional Development & Advisory',
      titleAr: 'التطوير الإداري والاستشارات المؤسسية',
      descEn: 'Assisting educational centers in organizational structuring, accreditation roadmaps, and administrative excellence.',
      descAr: 'تقديم الحلول الاستشارية لإعادة الهيكلة الإدارية، وتطوير الأنظمة التشغيلية، ورفع الكفاءة التنافسية للمؤسسات.',
      icon: Globe2,
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
              STRATEGIC ALLIANCES & PARTNERSHIPS
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#102F5C] dark:text-white tracking-tight font-serif">
            {lang === 'ar' ? 'شبكة الشركاء والمراكز التعليمية' : 'Cooperating Partners & Academies'}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-[#B8C5D6] max-w-3xl leading-relaxed font-normal">
            {lang === 'ar'
              ? 'نبني شراكات مؤسسية استراتيجية مع المراكز التعليمية والأكاديميات التدريبية، لتوحيد معايير التأهيل، وتطوير الأداء المؤسسي، ودعم منظومة الشهادات والاعتمادات الدولية.'
              : 'Forging strategic bilateral alliances with educational academies and training institutions to elevate learning benchmarks, qualify human talent, and administer authenticated credential systems.'}
          </p>
        </div>
      </div>

      {/* Editorial Hero Feature: Academic Partnership Meeting Photography */}
      <section className="py-16 sm:py-24 bg-white dark:bg-[#08182E] border-b border-gray-200 dark:border-[rgba(197,160,75,0.22)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Visual Photography Container (7 cols) */}
            <div className="lg:col-span-7">
              <div className="relative group bg-[#08182E] p-2 rounded-xs border-2 border-[rgba(197,160,75,0.35)] shadow-2xl overflow-hidden">
                <div className="relative overflow-hidden aspect-[16/10] sm:aspect-[16/10] rounded-xs bg-[#08182E]">
                  <img
                    src={getAssetUrl('assets/editorial/academic-partnership-meeting.webp')}
                    alt={lang === 'ar' ? 'اجتماع التعاون الأكاديمي والشراكات المؤسسية' : 'Institutional Academic Partnership & Collaboration Meeting'}
                    width="700"
                    height="440"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = getAssetUrl('assets/editorial/academic-partnership-meeting.jpg');
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Narrative & Institutional Framework (5 cols) */}
            <div className="lg:col-span-5 space-y-6 text-start">
              <div className="space-y-2">
                <span className="px-2.5 py-0.5 bg-[#C5A04B]/20 text-[#C5A04B] dark:text-[#DFC075] border border-[#C5A04B]/40 text-[11px] font-mono font-bold uppercase rounded-xs">
                  {lang === 'ar' ? 'أطر التعاون' : 'FRAMEWORK'}
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#102F5C] dark:text-white font-serif leading-tight">
                  {lang === 'ar' ? 'بروتوكولات الشراكة والتعاون المؤسسي' : 'Institutional Cooperation Protocols'}
                </h2>
                <div className="w-12 h-0.5 bg-[#C5A04B]" />
              </div>

              <p className="text-sm sm:text-base text-slate-600 dark:text-[#B8C5D6] leading-relaxed font-normal">
                {lang === 'ar'
                  ? 'يفتح المركز البريطاني لتعليم اللغات آفاق التعاون الأكاديمي مع المؤسسات والمراكز التي تتشارك معنا الالتزام بأعلى معايير الجودة والأمانة العلمية. نؤمن بأن بناء المؤسسات يبدأ ببناء الكوادر، وأن جودة التعليم هي أساس صناعة المستقبل.'
                  : 'The British Center for Languages welcomes academic and operational cooperation with institutions committed to the highest benchmarks of instructional rigor and academic integrity.'}
              </p>

              <div className="p-4 bg-[#F7F8FA] dark:bg-[#152B49] border-s-4 border-[#C5A04B] border-y border-e border-gray-200 dark:border-y-[rgba(197,160,75,0.22)] dark:border-e-[rgba(197,160,75,0.22)] rounded-xs space-y-1">
                <div className="text-xs font-bold text-[#102F5C] dark:text-white">
                  {lang === 'ar' ? 'نطاق الصلاحيات والشفافية المؤسسية' : 'Governance & Scope of Authorization'}
                </div>
                <p className="text-xs text-slate-600 dark:text-[#B8C5D6] leading-relaxed">
                  {lang === 'ar'
                    ? 'يتم توثيق كل شراكة بموجب اتفاقية تعاون رسمية تحدد البرامج المشتركة، ومعايير القياس، وصلاحيات إصدار الشهادات والبطاقات بدقة تامة.'
                    : 'Each partnership is governed by formal bilateral documentation defining curriculum bounds, testing metrics, and verification authorizations.'}
                </p>
              </div>

              <div className="pt-2">
                <a
                  href="https://wa.me/201509949401"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-[#C5A04B] hover:bg-[#DFC075] text-[#08182E] text-xs font-bold rounded-xs inline-flex items-center gap-2 transition-colors cursor-pointer shadow-md font-mono"
                >
                  <Handshake className="w-4 h-4 text-[#08182E]" />
                  <span>{lang === 'ar' ? 'طلب توقيع بروتوكول تعاون' : 'Inquire for Partnership MoU'}</span>
                  <ArrowIcon className="w-3.5 h-3.5 text-[#08182E]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Pillars of Cooperation Grid */}
      <section className="py-16 sm:py-20 bg-[#F7F8FA] dark:bg-[#0B1E38] border-b border-gray-200 dark:border-[rgba(197,160,75,0.22)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-start max-w-2xl mb-12 space-y-2">
            <span className="text-xs font-mono font-bold text-[#C5A04B] uppercase">COOPERATION PILLARS</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#102F5C] dark:text-white font-serif">
              {lang === 'ar' ? 'محاور التعاون والشراكة الأكاديمية' : 'Core Strategic Partnership Pillars'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-start">
            {cooperationPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-6 border border-gray-200 dark:border-[rgba(197,160,75,0.22)] bg-white dark:bg-[#152B49] space-y-3 dark-luxury-card rounded-xs hover:border-[#C5A04B] transition-all shadow-xs dark:shadow-none hover:shadow-md"
                >
                  <div className="w-10 h-10 rounded-xs bg-[#F7F8FA] dark:bg-[#08182E] border border-gray-300 dark:border-[rgba(197,160,75,0.25)] flex items-center justify-center text-[#C5A04B] dark:text-[#DFC075]">
                    <Icon className="w-5 h-5 text-[#C5A04B] dark:text-[#DFC075]" />
                  </div>
                  <h3 className="text-base font-bold text-[#102F5C] dark:text-white font-serif">
                    {lang === 'ar' ? pillar.titleAr : pillar.titleEn}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-[#B8C5D6] leading-relaxed font-normal">
                    {lang === 'ar' ? pillar.descAr : pillar.descEn}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Partners Display (Renders real partners or dignified notice) */}
      <PartnersSection />

      {/* Institutional Partnership Invitation Banner */}
      <section className="py-16 sm:py-20 bg-white dark:bg-[#08182E]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 bg-[#102F5C] border-2 border-[#C5A04B] rounded-xs shadow-2xl text-white text-center space-y-6">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#08182E] border border-[#C5A04B] flex items-center justify-center text-[#C5A04B]">
              <Building2 className="w-7 h-7 text-[#DFC075]" />
            </div>

            <div className="space-y-2 max-w-2xl mx-auto">
              <span className="text-xs font-mono font-bold text-[#DFC075] uppercase tracking-wider block">
                MEMORANDUM OF UNDERSTANDING
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif">
                {lang === 'ar'
                  ? 'هل تمثل مركزاً تعليمياً أو أكاديمية تدريبية ترغب بالانضمام لشبكتنا؟'
                  : 'Are you an educational academy seeking institutional partnership?'}
              </h2>
              <p className="text-xs sm:text-sm text-[#B8C5D6] leading-relaxed font-normal">
                {lang === 'ar'
                  ? 'نرحب بالمؤسسات والمراكز المتميزة للتعاون في تأهيل الكوادر، واعتماد الشهادات، وتطبيق المعايير المؤسسية البريطانية.'
                  : 'We invite forward-thinking training centers and educational academies to explore bilateral affiliation, credential issuing protocols, and institutional development.'}
              </p>
            </div>

            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <a
                href="https://wa.me/201509949401"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#C5A04B] hover:bg-[#DFC075] text-[#08182E] text-xs font-bold rounded-xs inline-flex items-center gap-2 transition-colors cursor-pointer shadow-md font-mono"
              >
                <MessageCircle className="w-4 h-4 text-[#08182E]" />
                <span>{lang === 'ar' ? 'تواصل عبر واتساب (+20 15 09949401)' : 'WhatsApp Consultation'}</span>
              </a>
              <a
                href="tel:+201509949401"
                className="px-6 py-3 bg-transparent hover:bg-white/10 text-white border border-[#C5A04B]/60 text-xs font-bold rounded-xs inline-flex items-center gap-2 transition-colors cursor-pointer font-mono"
              >
                <PhoneCall className="w-4 h-4 text-[#DFC075]" />
                <span>+20 15 09949401</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};