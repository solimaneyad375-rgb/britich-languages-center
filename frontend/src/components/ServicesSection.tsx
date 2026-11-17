/*
 * Developed & Engineered by Eng. Eyad Ahmed
 * SpeedUp Software Solutions
 * © 2026 All Rights Reserved.
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Award, Users, Building, BookOpen, ShieldCheck, Handshake, ArrowRight, ArrowLeft, X, Check, Maximize2 } from 'lucide-react';
import { AcademicCertificateDocument } from './AcademicCertificateDocument';
import { PublicVerificationResponse } from '../types';
import { getAssetUrl } from '../utils/assets';

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

interface ServiceDetail {
  number: string;
  titleEn: string;
  titleAr: string;
  shortDescEn: string;
  shortDescAr: string;
  fullDescEn: string;
  fullDescAr: string;
  featuresEn: string[];
  featuresAr: string[];
  icon: React.ComponentType<{ className?: string }>;
}

export const ServicesSection: React.FC = () => {
  const navigate = useNavigate();
  const { lang, isRtl, t } = useLanguage();
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const services: ServiceDetail[] = [
    {
      number: '01',
      titleEn: 'Accredited Educational & Professional Certificates',
      titleAr: 'إصدار الشهادات التعليمية والمهنية المعتمدة',
      shortDescEn: 'Issuance of accredited educational and professional certificates in cooperation with educational academies according to institutional cooperation agreements.',
      shortDescAr: 'إصدار الشهادات التعليمية والمهنية المعتمدة بالتعاون مع كبرى الأكاديميات والمراكز والمؤسسات التعليمية، وفق اتفاقيات التعاون ونطاق الصلاحيات الممنوحة لكل جهة.',
      fullDescEn: 'Our credentialing framework incorporates physical security standards, unique cryptographic QR code verification tokens, and dual-language issuance aligned with international benchmarks.',
      fullDescAr: 'تتضمن منظومة الشهادات لدينا أعلى مواصفات الأمان، والتحقق الرقمي المشفر عبر الرموز الذكية QR، والربط المباشر مع سجل التوثيق المركزي.',
      featuresEn: [
        'Secure certificate issuance with verifiable digital QR codes',
        'Direct connection to central database verification registry',
        'Dual-language English and Arabic credential formatting',
        'Issuance strictly adhering to institutional cooperation protocols',
      ],
      featuresAr: [
        'شهادات مؤمنة مع رمز تحقق رقمي مشفر',
        'ربط مباشر مع قاعدة بيانات السجلات الرسمية',
        'توثيق رسمي باللغتين العربية والإنجليزية',
        'إصدار منضبط وفق نطاق الصلاحيات الممنوحة لكل جهة',
      ],
      icon: Award,
    },
    {
      number: '02',
      titleEn: 'Building and Qualifying Educational Staff',
      titleAr: 'بناء وتأهيل الكوادر التعليمية والتدريبية',
      shortDescEn: 'Building, empowering, and qualifying educational and training human capital according to modern instructional methodologies.',
      shortDescAr: 'بناء وتأهيل الكوادر التعليمية والتدريبية وتنمية قدرات المعلمين والمحاضرين وفق أرقى الممارسات التربوية والتدريبية المعاصرة.',
      fullDescEn: 'Comprehensive professional development initiatives aimed at educators, instructors, and training coordinators to enhance teaching delivery, pedagogical innovation, and modern classroom leadership.',
      fullDescAr: 'برامج احترافية شاملة لتأهيل المعلمين والمدربين، وتنمية الكفايات التدريسية، وإعداد المحاضرين وفق أحدث الاستراتيجيات التعليمية المعتمدة عالمياً.',
      featuresEn: [
        'Train-the-Trainer (TOT) specialized master programs',
        'Pedagogical excellence and assessment methodologies',
        'Interactive classroom leadership & modern instructional tools',
        'Continuous professional development tracking',
      ],
      featuresAr: [
        'برامج تأهيل وإعداد المدرب المحترف (TOT)',
        'تطوير أساليب التدريس ومهارات التقييم المعاصر',
        'توظيف تقنيات التعليم التفاعلي والقيادة الصفية',
        'متابعة التطوير المهني المستمر للكوادر',
      ],
      icon: Users,
    },
    {
      number: '03',
      titleEn: 'Institutional Development',
      titleAr: 'التطوير المؤسسي للمراكز التعليمية',
      shortDescEn: 'Advancing organizational, academic, and administrative performance for educational institutions to enhance overall operational efficiency.',
      shortDescAr: 'تطوير أداء المراكز والمؤسسات التعليمية والارتقاء بكفاءتها التنظيمية والأكاديمية لضمان استدامة التميز المؤسسي.',
      fullDescEn: 'Tailored institutional consultancy providing governance structures, quality assurance manuals, student registry workflows, and strategic alignment for educational centers.',
      fullDescAr: 'استشارات مؤسسية متخصصة لدعم حوكمة المراكز التعليمية، إعداد لوائح الجودة الأكاديمية، وتنظيم دورات العمل الإدارية لضمان الامتثال للمعايير الأكاديمية.',
      featuresEn: [
        'Institutional quality assurance frameworks',
        'Organizational restructuring and workflow optimization',
        'Student administration system implementation',
        'Staff qualification & KPI governance',
      ],
      featuresAr: [
        'أطر ضمان الجودة المؤسسية وتطوير اللوائح',
        'إعادة الهيكلة التنظيمية وتحسين تدفق العمل',
        'أتمتة وإدارة شؤون الطلاب والسجلات الأكاديمية',
        'حوكمة مؤشرات الأداء ورفع كفاءة الفرق الإدارية',
      ],
      icon: Building,
    },
    {
      number: '04',
      titleEn: 'Educational and Training Programs',
      titleAr: 'تقديم البرامج والدورات التعليمية والتدريبية',
      shortDescEn: 'Delivering structured educational curricula, modern language programs, and specialized training courses for students and working professionals.',
      shortDescAr: 'تقديم البرامج والدورات التعليمية والتدريبية في اللغات والمهارات التطبيقية المتخصصة بمستويات متدرجة تلبي احتياجات سوق العمل.',
      fullDescEn: 'Progressive language acquisition courses, executive business communication, academic English for higher studies, and specialized translation diplomas created by seasoned academic linguists.',
      fullDescAr: 'باقات متكاملة من دورات اللغة الإنجليزية العامة، الإنجليزية للأعمال والمصارف، ودبلومات الترجمة التحريرية والفورية، بالإضافة إلى برامج الإعداد للاختبارات الدولية.',
      featuresEn: [
        'General English (CEFR A1 through C2 levels)',
        'Executive Business & Corporate Communication',
        'IELTS, TOEFL, and International Exam Preparation',
        'Specialized Legal and Commercial Translation Diplomas',
      ],
      featuresAr: [
        'مستويات اللغة الإنجليزية العامة وفق الإطار الأوروبي CEFR',
        'الإنجليزية المهنية لقطاعات الأعمال والمؤسسات',
        'الإعداد المكثف لاختبارات IELTS و TOEFL الدولية',
        'دبلومات الترجمة القانونية والتجارية المتخصصة',
      ],
      icon: BookOpen,
    },
    {
      number: '05',
      titleEn: 'Professional Qualification',
      titleAr: 'التأهيل والتمكين المهني المتخصص',
      shortDescEn: 'Specialized vocational qualification and competence enhancement programs bridging the gap between academic learning and industry demands.',
      shortDescAr: 'برامج التأهيل المهني المتخصص وصقل الكفاءات التطبيقية لربط المخرجات التعليمية بمتطلبات بيئات الأعمال الحديثة.',
      fullDescEn: 'Rigorous professional diplomas and vocational empowerment tracks designed to equip specialists with practical management, communication, and executive qualifications.',
      fullDescAr: 'مسارات دبلومات مهنية تطبيقية تركز على إكساب المتدربين المهارات التنفيذية المباشرة في مجالات الإدارة، التواصل المؤسسي، والتأهيل القيادي.',
      featuresEn: [
        'Executive Leadership and Management Diplomas',
        'Applied vocational competence frameworks',
        'Professional communication & career readiness',
        'Specialized workforce certification tracks',
      ],
      featuresAr: [
        'دبلومات الإدارة التنفيذية والقيادة المؤسسية',
        'أطر الكفاءات المهنية والتطبيق العملي',
        'مهارات التواصل المؤسسي والجاهزية الوظيفية',
        'مسارات تأهيل متخصصة للكوادر العاملة',
      ],
      icon: ShieldCheck,
    },
    {
      number: '06',
      titleEn: 'Cooperation in Certificate Accreditation',
      titleAr: 'التعاون في اعتماد وتوثيق الشهادات',
      shortDescEn: 'Strategic cooperation frameworks with educational academies for validating, documenting, and certifying credentials within authorized institutional mandates.',
      shortDescAr: 'أطر التعاون المؤسسي مع المراكز والأكاديميات التعليمية لاعتماد وتوثيق الشهادات الأكاديمية والمهنية وفق الضوابط المنظمة.',
      fullDescEn: 'Formal cooperation protocols establishing standardized examination monitoring, credential issuance oversight, and tamper-resistant digital verification for partner academy qualifications.',
      fullDescAr: 'بروتوكولات تعاون رسمية تنظم التحقق المشترك من الاختبارات، ومراجعة مخرجات التدريب، وإصدار وتوثيق الشهادات المعتمدة مع ربطها بالسجل الرقمي المركزي.',
      featuresEn: [
        'Structured institutional cooperation agreements',
        'Tamper-proof physical and digital authentication',
        'Standardized assessment verification protocols',
        'Immediate verification via centralized registry',
      ],
      featuresAr: [
        'اتفاقيات ومذكرات تعاون مؤسسي منظمة',
        'توثيق ورقي ورقمي مؤمن ومحمي من التزوير',
        'مراجعة وتدقيق معايير التقييم والاختبارات',
        'ربط فوري بالسجل الرقمي للتحقق المعتمد',
      ],
      icon: Handshake,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-[#07182D] text-[#102F5C] dark:text-[#F8F9FC] border-b border-gray-200 dark:border-[rgba(201,163,74,0.22)] transition-colors duration-200" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Certificate Preview Side Card (Matching Reference Design) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-14">
          {/* Header Text (7 cols) */}
          <div className="lg:col-span-7 text-start space-y-3.5">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-bold tracking-widest text-[#DFC075] uppercase font-mono">
                {lang === 'ar' ? 'خدماتنا' : 'OUR SERVICES'}
              </span>
              <span className="w-8 h-[2px] bg-[#C9A34A] shrink-0" />
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#102F5C] dark:text-[#F8F9FC] tracking-tight font-serif">
              {lang === 'ar'
                ? 'مجالات العمل والخدمات التعليمية المتخصصة'
                : 'Areas of Educational & Institutional Specialization'}
            </h2>

            <p className="text-sm sm:text-base text-slate-600 dark:text-[#A9BBD1] leading-relaxed font-normal max-w-2xl">
              {lang === 'ar'
                ? 'نقدم منظومة متكاملة من الخدمات الأكاديمية والمهنية الموجهة للأفراد والمؤسسات ودعم التميز المؤسسي وبناء الكفاءات البشرية.'
                : 'A comprehensive portfolio of academic and professional services designed for individuals and institutions, advancing excellence and capacity building.'}
            </p>
          </div>

          {/* Mini Certificate Preview Card (5 cols) - Exactly matching visual reference */}
          <div className="lg:col-span-5 hidden lg:block">
            <div
              onClick={() => {
                navigate('/certificates');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group relative rounded-sm p-3.5 bg-[#102B4C]/50 border border-[#C9A34A]/40 hover:border-[#C9A34A] shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* Certificate Inner Preview Frame */}
              <div className="relative bg-[#FAF8F2] p-4 text-[#07182D] rounded-xs border border-[#C9A34A]/30 space-y-2 select-none shadow-sm">
                {/* Micro Header */}
                <div className="flex flex-col items-center text-center">
                  <img src={getAssetUrl('assets/logo-trimmed.webp')} alt="Crest" className="h-6 w-auto object-contain mb-1" />
                  <span className="text-[9px] font-bold tracking-[0.2em] font-serif uppercase text-[#07182D]">BRITISH CENTER FOR LANGUAGES</span>
                  <span className="text-[8px] font-semibold text-[#C9A34A]">المركز البريطاني لتعليم اللغات</span>
                </div>
                {/* Micro Title */}
                <div className="text-center border-t border-b border-[#C9A34A]/30 py-1.5">
                  <span className="text-[7.5px] font-mono tracking-widest text-[#C9A34A] block uppercase font-bold">OFFICIAL CREDENTIAL</span>
                  <h4 className="text-xs font-serif font-bold text-[#07182D] uppercase">CERTIFICATE OF ACHIEVEMENT</h4>
                </div>
                {/* Micro Blank Recipient */}
                <div className="text-center py-1">
                  <span className="text-[7px] font-mono text-slate-400 block uppercase">[ RECIPIENT NAME / اسم المتدرب ]</span>
                  <div className="w-32 h-[1px] bg-[#C9A34A]/50 mx-auto mt-0.5" />
                </div>
              </div>
              <div className="pt-2.5 flex items-center justify-between text-[11px] font-mono text-[#DFC075]">
                <span>SAMPLE PREVIEW — نموذج توضيحي معتمد</span>
                <span className="group-hover:underline flex items-center gap-1 font-sans">
                  {lang === 'ar' ? 'استعراض الشهادات ←' : 'View Certificates →'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Editorial Services Layout: Rich Mix of Large Photographs, Asymmetric Features & Deep Text Blocks */}
        <div className="space-y-16 lg:space-y-24">
          {/* SERVICE 01: Accredited Educational Certificates */}
          <div className="bg-[#F7F8FA] dark:bg-[#152B49] border border-gray-200 dark:border-[rgba(197,160,75,0.25)] rounded-xs p-6 sm:p-10 lg:p-12 shadow-sm dark-luxury-card">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7 space-y-5 text-start">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-xs bg-[#C5A04B]/20 text-[#C5A04B] dark:text-[#DFC075] border border-[#C5A04B]/40">
                    SERVICE 01
                  </span>
                  <span className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400">CREDENTIALING SYSTEM</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-[#102F5C] dark:text-white font-serif leading-snug">
                  {lang === 'ar' ? 'إصدار الشهادات والاعتمادات الأكاديمية' : 'Accredited Educational Certificates'}
                </h3>

                <p className="text-sm sm:text-base text-slate-600 dark:text-[#B8C5D6] leading-relaxed font-normal">
                  {lang === 'ar'
                    ? 'إصدار الشهادات التعليمية والمهنية المعتمدة بالتعاون مع كبرى الأكاديميات والمراكز والمؤسسات التعليمية، وفق اتفاقيات التعاون ونطاق الصلاحيات الممنوحة لكل جهة.'
                    : 'Issuance of accredited educational and professional certificates in cooperation with educational academies according to institutional cooperation agreements.'}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-700 dark:text-slate-200 font-medium">
                  <div className="flex items-center gap-2 p-2.5 rounded-xs bg-white dark:bg-[#08182E] border border-gray-200 dark:border-[rgba(197,160,75,0.2)]">
                    <Award className="w-4 h-4 text-[#C5A04B] shrink-0" />
                    <span>{lang === 'ar' ? 'شهادات مؤمنة برمز تحقق رقمي مشفر' : 'Verifiable Digital QR Tokens'}</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xs bg-white dark:bg-[#08182E] border border-gray-200 dark:border-[rgba(197,160,75,0.2)]">
                    <ShieldCheck className="w-4 h-4 text-[#C5A04B] shrink-0" />
                    <span>{lang === 'ar' ? 'ربط مباشر بقاعدة البيانات المركزية' : 'Direct Central Database Query'}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSelectedService(services[0]);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xs bg-[#C5A04B] hover:bg-[#DFC075] text-[#08182E] text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    <span>{lang === 'ar' ? 'تفاصيل الخدمة والمواصفات' : 'View Credentialing Specifications'}</span>
                    <ArrowIcon className="w-3.5 h-3.5 text-[#08182E]" />
                  </button>
                </div>
              </div>

              {/* Visual Preview: Master British Center Certificate Specimen (Recreated, Crisp, No Personal Data) */}
              <div className="lg:col-span-5 space-y-2">
                <div className="bg-[#FAF8F5] dark:bg-[#102B4C]/40 border-2 border-gray-300 dark:border-[rgba(201,163,71,0.35)] rounded-xs p-2 sm:p-3 shadow-xl">
                  <div
                    onClick={() => {
                      navigate('/certificates');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="cursor-pointer transition-transform duration-300 hover:scale-[1.01] flex items-center justify-center overflow-hidden rounded-xs bg-[#FAF8F2]"
                    title={lang === 'ar' ? 'اضغط للانتقال لمعرض الشهادات والمعاينة التفاعلية' : 'Click to view in Certificate Gallery'}
                  >
                    <AcademicCertificateDocument
                      certificate={sampleSpecimenCertificate}
                      isSample={true}
                      responsive={true}
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-[#AAB8CB] px-1">
                  <span className="text-[#C9A347] font-bold">SAMPLE DESIGN — نموذج معتمد</span>
                  <span className="flex items-center gap-1 cursor-pointer hover:underline" onClick={() => navigate('/certificates')}>
                    <Maximize2 className="w-3 h-3 text-[#C9A347]" />
                    <span>{lang === 'ar' ? 'اضغط للمعاينة الكاملة والتكبير' : 'Click to inspect full high-res sample'}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* SERVICE 02: Staff Training and Qualification (Featuring professional training workshop image) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center text-start">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative overflow-hidden rounded-xs border border-gray-200 dark:border-[rgba(197,160,75,0.35)] shadow-xl bg-slate-100 dark:bg-[#152B49] group aspect-[16/11]">
                <img
                  src={getAssetUrl('assets/editorial/training-workshop.webp')}
                  alt={lang === 'ar' ? 'ورشة عمل وتدريب وتأهيل الكوادر التعليمية' : 'Professional Training Workshop - Educational Staff Qualification'}
                  width="640"
                  height="440"
                  loading="lazy"
                  className="w-full h-full object-cover object-center filter saturate-[0.98] contrast-[1.02] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = getAssetUrl('assets/editorial/training-workshop.jpg');
                  }}
                />
                <div className="absolute bottom-0 inset-x-0 bg-white/95 dark:bg-[#08182E]/95 backdrop-blur-xs px-4 py-2 border-t border-gray-200 dark:border-[rgba(197,160,75,0.22)] flex items-center justify-between text-[11px] text-slate-600 dark:text-[#B8C5D6] font-mono">
                  <span className="tracking-wider">{lang === 'ar' ? 'تأهيل وتطوير المدربين' : 'STAFF TRAINING WORKSHOP'}</span>
                  <span className="text-[#C5A04B] dark:text-[#DFC075] font-semibold">TOT MASTERCLASS</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-5 order-1 lg:order-2">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-xs bg-[#C5A04B]/20 text-[#C5A04B] dark:text-[#DFC075] border border-[#C5A04B]/40">
                  SERVICE 02
                </span>
                <span className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400">PEDAGOGICAL EXCELLENCE</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-[#102F5C] dark:text-white font-serif leading-snug">
                {lang === 'ar' ? 'بناء وتأهيل الكوادر التعليمية والتدريبية' : 'Building and Qualifying Educational Staff'}
              </h3>

              <p className="text-sm sm:text-base text-slate-600 dark:text-[#B8C5D6] leading-relaxed font-normal">
                {lang === 'ar'
                  ? 'برامج احترافية شاملة لتأهيل المعلمين والمدربين، وتنمية الكفايات التدريسية، وإعداد المحاضرين وفق أحدث الاستراتيجيات التعليمية المعتمدة عالمياً.'
                  : 'Comprehensive professional development initiatives aimed at educators, instructors, and training coordinators to enhance teaching delivery and modern classroom leadership.'}
              </p>

              <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-[#B8C5D6] font-medium">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A04B]" />
                  <span>{lang === 'ar' ? 'برامج تأهيل وإعداد المدرب المحترف (TOT)' : 'Train-the-Trainer (TOT) specialized master programs'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A04B]" />
                  <span>{lang === 'ar' ? 'تطوير أساليب التدريس ومهارات التقييم المعاصر' : 'Pedagogical excellence and assessment methodologies'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A04B]" />
                  <span>{lang === 'ar' ? 'توظيف تقنيات التعليم التفاعلي والقيادة الصفية' : 'Interactive classroom leadership and instructional tools'}</span>
                </li>
              </ul>

              <div className="pt-2">
                <button
                  onClick={() => setSelectedService(services[1])}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#102F5C] dark:text-[#DFC075] hover:text-[#C5A04B] transition-colors cursor-pointer"
                >
                  <span>{lang === 'ar' ? 'استعراض المسارات التدريبية' : 'Explore Training Framework'}</span>
                  <ArrowIcon className="w-3.5 h-3.5 text-[#C5A04B] dark:text-[#DFC075]" />
                </button>
              </div>
            </div>
          </div>

          {/* SERVICE 03: Institutional Development (Featuring modern lecture hall image) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center text-start">
            <div className="lg:col-span-6 space-y-5">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-xs bg-[#C5A04B]/20 text-[#C5A04B] dark:text-[#DFC075] border border-[#C5A04B]/40">
                  SERVICE 03
                </span>
                <span className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400">ORGANIZATIONAL RESTRUCTURING</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-[#102F5C] dark:text-white font-serif leading-snug">
                {lang === 'ar' ? 'التطوير المؤسسي للمراكز والمؤسسات التعليمية' : 'Institutional Development & Governance'}
              </h3>

              <p className="text-sm sm:text-base text-slate-600 dark:text-[#B8C5D6] leading-relaxed font-normal">
                {lang === 'ar'
                  ? 'استشارات مؤسسية متخصصة لدعم حوكمة المراكز التعليمية، إعداد لوائح الجودة الأكاديمية، وتنظيم دورات العمل الإدارية لضمان الامتثال للمعايير الدولية المستدامة.'
                  : 'Tailored institutional consultancy providing governance structures, quality assurance manuals, student registry workflows, and strategic alignment for educational centers.'}
              </p>

              <div className="p-4 rounded-xs bg-[#F7F8FA] dark:bg-[#152B49] border border-gray-200 dark:border-[rgba(197,160,75,0.22)] space-y-2">
                <span className="text-xs font-mono text-[#C5A04B] dark:text-[#DFC075] font-bold block">GOVERNANCE & AUDIT</span>
                <p className="text-xs text-slate-600 dark:text-[#B8C5D6] leading-relaxed">
                  {lang === 'ar'
                    ? 'إعادة الهيكلة التنظيمية وتصميم لوائح التدريب وإدارة شؤون المتدربين وفق المعايير المؤسسية البريطانية.'
                    : 'Restructuring institutional workflows, syllabus design, and trainee records under British institutional quality frameworks.'}
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setSelectedService(services[2])}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#102F5C] dark:text-[#DFC075] hover:text-[#C5A04B] transition-colors cursor-pointer"
                >
                  <span>{lang === 'ar' ? 'تفاصيل التطوير المؤسسي' : 'View Development Protocols'}</span>
                  <ArrowIcon className="w-3.5 h-3.5 text-[#C5A04B] dark:text-[#DFC075]" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-xs border border-gray-200 dark:border-[rgba(197,160,75,0.35)] shadow-xl bg-slate-100 dark:bg-[#152B49] group aspect-[16/11]">
                <img
                  src={getAssetUrl('assets/editorial/modern-lecture-hall.webp')}
                  alt={lang === 'ar' ? 'مدرج وقاعة محاضرات أكاديمية حديثة' : 'Modern Academic Lecture Hall - Institutional Infrastructure'}
                  width="640"
                  height="440"
                  loading="lazy"
                  className="w-full h-full object-cover object-center filter saturate-[0.98] contrast-[1.02] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = getAssetUrl('assets/editorial/modern-lecture-hall.jpg');
                  }}
                />
              </div>
            </div>
          </div>

          {/* SERVICE 04: Educational and Training Programs (Featuring academic classroom image) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center text-start">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative overflow-hidden rounded-xs border border-gray-200 dark:border-[rgba(197,160,75,0.35)] shadow-xl bg-slate-100 dark:bg-[#152B49] group aspect-[16/11]">
                <img
                  src={getAssetUrl('assets/editorial/academic-classroom.webp')}
                  alt={lang === 'ar' ? 'محاضرة تفاعلية في بيئة تدريس متطورة' : 'Interactive Academic Classroom - Educational and Training Programs'}
                  width="640"
                  height="440"
                  loading="lazy"
                  className="w-full h-full object-cover object-center filter saturate-[0.98] contrast-[1.02] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = getAssetUrl('assets/editorial/academic-classroom.jpg');
                  }}
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-5 order-1 lg:order-2">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-xs bg-[#C5A04B]/20 text-[#C5A04B] dark:text-[#DFC075] border border-[#C5A04B]/40">
                  SERVICE 04
                </span>
                <span className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400">CURRICULAR RIGOR</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-[#102F5C] dark:text-white font-serif leading-snug">
                {lang === 'ar' ? 'تقديم البرامج والدورات التعليمية والتدريبية' : 'Educational and Training Programs'}
              </h3>

              <p className="text-sm sm:text-base text-slate-600 dark:text-[#B8C5D6] leading-relaxed font-normal">
                {lang === 'ar'
                  ? 'باقات متكاملة من دورات اللغة الإنجليزية العامة، الإنجليزية للأعمال والمصارف، ودبلومات الترجمة التحريرية والفورية، بالإضافة إلى برامج الإعداد للاختبارات الدولية.'
                  : 'Progressive language acquisition courses, executive business communication, academic English for higher studies, and specialized translation diplomas created by seasoned academic linguists.'}
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs text-slate-700 dark:text-slate-200 font-medium">
                <div className="p-3 bg-[#F7F8FA] dark:bg-[#152B49] border border-gray-200 dark:border-[rgba(197,160,75,0.2)] rounded-xs">
                  <span className="text-[#C5A04B] dark:text-[#DFC075] font-bold block mb-1">CEFR Levels</span>
                  <span className="text-[11px] text-slate-500 dark:text-[#B8C5D6]">From A1 up to C2 Proficiency</span>
                </div>
                <div className="p-3 bg-[#F7F8FA] dark:bg-[#152B49] border border-gray-200 dark:border-[rgba(197,160,75,0.2)] rounded-xs">
                  <span className="text-[#C5A04B] dark:text-[#DFC075] font-bold block mb-1">Exam Prep</span>
                  <span className="text-[11px] text-slate-500 dark:text-[#B8C5D6]">IELTS, TOEFL & Specialized Tests</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setSelectedService(services[3])}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#102F5C] dark:text-[#DFC075] hover:text-[#C5A04B] transition-colors cursor-pointer"
                >
                  <span>{lang === 'ar' ? 'استعراض مستويات البرامج' : 'Explore Program Levels'}</span>
                  <ArrowIcon className="w-3.5 h-3.5 text-[#C5A04B] dark:text-[#DFC075]" />
                </button>
              </div>
            </div>
          </div>

          {/* TWO-COLUMN CLIMAX: Services 05 & 06 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-start pt-4">
            {/* SERVICE 05: Professional Qualification */}
            <div className="p-7 sm:p-8 bg-[#F7F8FA] dark:bg-[#152B49] border border-gray-200 dark:border-[rgba(197,160,75,0.25)] rounded-xs dark-luxury-card space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-white/10">
                <span className="font-mono text-xs font-bold text-[#C5A04B] dark:text-[#DFC075]">05 / VOCATIONAL TRACK</span>
                <ShieldCheck className="w-5 h-5 text-[#C5A04B] dark:text-[#DFC075]" />
              </div>
              <h4 className="text-xl font-bold text-[#102F5C] dark:text-white font-serif">
                {lang === 'ar' ? 'التأهيل والتمكين المهني المتخصص' : 'Professional Qualification'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-[#B8C5D6] leading-relaxed font-normal">
                {lang === 'ar'
                  ? 'مسارات دبلومات مهنية تطبيقية تركز على إكساب المتدربين المهارات التنفيذية المباشرة في مجالات الإدارة، التواصل المؤسسي، والتأهيل القيادي.'
                  : 'Rigorous professional diplomas and vocational empowerment tracks designed to equip specialists with practical management, communication, and executive qualifications.'}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setSelectedService(services[4])}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#C5A04B] dark:text-[#DFC075] hover:underline cursor-pointer"
                >
                  <span>{lang === 'ar' ? 'تفاصيل التأهيل المهني' : 'View Vocational Details'}</span>
                  <ArrowIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* SERVICE 06: Cooperation in Certificate Accreditation */}
            <div className="p-7 sm:p-8 bg-[#F7F8FA] dark:bg-[#152B49] border border-gray-200 dark:border-[rgba(197,160,75,0.25)] rounded-xs dark-luxury-card space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-white/10">
                <span className="font-mono text-xs font-bold text-[#C5A04B] dark:text-[#DFC075]">06 / ACCREDITATION ACCORD</span>
                <Handshake className="w-5 h-5 text-[#C5A04B] dark:text-[#DFC075]" />
              </div>
              <h4 className="text-xl font-bold text-[#102F5C] dark:text-white font-serif">
                {lang === 'ar' ? 'التعاون في اعتماد وتوثيق الشهادات' : 'Cooperation in Certificate Accreditation'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-[#B8C5D6] leading-relaxed font-normal">
                {lang === 'ar'
                  ? 'بروتوكولات تعاون رسمية تنظم التحقق المشترك من الاختبارات، ومراجعة مخرجات التدريب، وإصدار وتوثيق الشهادات المعتمدة وفق نطاق الصلاحيات.'
                  : 'Formal cooperation protocols establishing standardized examination monitoring, credential issuance oversight, and tamper-resistant digital verification.'}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setSelectedService(services[5])}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#C5A04B] dark:text-[#DFC075] hover:underline cursor-pointer"
                >
                  <span>{lang === 'ar' ? 'بروتوكول الاعتماد والتوثيق' : 'View Accreditation Accord'}</span>
                  <ArrowIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Clean Dark Luxury Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/75 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#152B49] max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-gray-300 dark:border-[rgba(197,160,75,0.4)] text-start relative animate-in fade-in duration-150 text-[#102F5C] dark:text-white rounded-xs">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-gray-200 dark:border-white/10">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-[#C5A04B] dark:text-[#DFC075]">
                  {selectedService.number} / {lang === 'ar' ? 'الخدمة المؤسسية' : 'SERVICE DETAIL'}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-[#102F5C] dark:text-white">
                  {lang === 'ar' ? selectedService.titleAr : selectedService.titleEn}
                </h3>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-600 dark:text-[#B8C5D6] leading-relaxed font-normal">
              {lang === 'ar' ? selectedService.fullDescAr : selectedService.fullDescEn}
            </p>

            {/* Features List */}
            <div className="space-y-2.5 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C5A04B] dark:text-[#DFC075] block">
                {lang === 'ar' ? 'نطاق التطبيق والبنود التنفيذية:' : 'Key Operational Scope:'}
              </span>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-normal">
                {(lang === 'ar' ? selectedService.featuresAr : selectedService.featuresEn).map((f, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#C5A04B] dark:text-[#DFC075] shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-gray-200 dark:border-white/10 flex justify-end">
              <button
                onClick={() => setSelectedService(null)}
                className="px-5 py-2 text-xs font-semibold bg-gray-100 dark:bg-[#08182E] text-slate-700 dark:text-slate-200 hover:bg-gray-200 dark:hover:bg-black/40 border border-gray-300 dark:border-white/10 transition-colors rounded-xs cursor-pointer"
              >
                {lang === 'ar' ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
