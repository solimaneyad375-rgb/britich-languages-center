/*
 * Project Design & Development
 * Engineered by Eng. Eyad Ahmed
 * SpeedUp Software Solutions
 * © 2026 All Rights Reserved.
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Mail, Phone, MapPin, Lock, ExternalLink, MessageCircle } from 'lucide-react';

interface FooterProps {
  navigate?: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate: propNavigate }) => {
  const routerNavigate = useNavigate();
  const navigate = propNavigate || routerNavigate;
  const { lang, t } = useLanguage();

  const handleNav = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#061224] text-white pt-16 pb-10 border-t border-[rgba(197,160,75,0.22)] no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10 text-start">
          {/* Column 1: Institutional Identity & Legal Status */}
          <div className="space-y-4">
            <div
              onClick={() => handleNav('/')}
              className="flex items-center gap-2 select-none py-1 cursor-pointer group"
            >
              <img
                src="/assets/official-logo-transparent.png"
                alt="British Center for Languages Official Logo"
                className="h-11 sm:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/official-logo.jpg';
                }}
              />
            </div>

            <p className="text-xs sm:text-sm text-[#B8C5D6] leading-relaxed font-normal">
              {lang === 'ar'
                ? 'مؤسسة تعليمية وتدريبية متخصصة في بناء الكوادر البشرية، والتأهيل والتطوير المؤسسي، ودعم المراكز والمؤسسات التعليمية والتدريبية.'
                : 'An educational and training institution dedicated to human capacity building, institutional qualification, and supporting educational and training organizations.'}
            </p>

            <div className="p-3 bg-[#08182E] border border-[rgba(197,160,75,0.25)] rounded-xs space-y-1">
              <span className="text-[11px] text-[#DFC075] font-semibold block">
                {lang === 'ar'
                  ? 'نحو تعليم مؤسسي، وتأهيل بمعايير احترافية، وآفاق دولية.'
                  : 'Excellence in Education, Building Future Leaders.'}
              </span>
              <p className="text-[10px] text-slate-400 italic">
                {lang === 'ar'
                  ? '🇬🇧 Excellence in Education, Building Future Leaders.'
                  : '🇬🇧 British Academic Standards & Professional Empowerment.'}
              </p>
            </div>

            <div className="pt-2 text-xs text-slate-300 font-mono space-y-1">
              <div className="text-[#DFC075] font-semibold">UK STATUTORY REGISTRATIONS:</div>
              <div>Companies House: <span className="text-white">16605467</span></div>
              <div>UKRLP Provider: <span className="text-white">10099520</span></div>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#DFC075] font-mono pb-2 border-b border-white/10">
              {lang === 'ar' ? 'أقسام المنصة' : 'Platform Navigation'}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-normal">
              <li>
                <button onClick={() => handleNav('/')} className="hover:text-white transition-colors cursor-pointer">
                  {t('navHome')}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/about')} className="hover:text-white transition-colors cursor-pointer">
                  {t('navAbout')}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/services')} className="hover:text-white transition-colors cursor-pointer">
                  {t('navServices')}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/uk-cooperation')} className="hover:text-white transition-colors cursor-pointer">
                  {t('navUkCooperation')}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/certificates')} className="hover:text-white transition-colors cursor-pointer">
                  {t('navCertificates')}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/verify')} className="text-[#DFC075] hover:underline font-semibold flex items-center gap-1.5 cursor-pointer">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C8102E]" />
                  <span>{t('navVerify')}</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/partners')} className="hover:text-white transition-colors cursor-pointer">
                  {t('navPartners')}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/contact')} className="hover:text-white transition-colors cursor-pointer">
                  {t('navContact')}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Institutional Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#DFC075] font-mono pb-2 border-b border-white/10">
              {lang === 'ar' ? 'الخدمات المؤسسية' : 'Key Services'}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-normal">
              <li>
                <button onClick={() => handleNav('/services')} className="text-start hover:text-white transition-colors cursor-pointer">
                  {lang === 'ar' ? 'بناء وتأهيل الكوادر التعليمية والتدريبية' : 'Building & Qualifying Staff'}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/services')} className="text-start hover:text-white transition-colors cursor-pointer">
                  {lang === 'ar' ? 'تطوير أداء المراكز والمؤسسات التعليمية' : 'Institutional Performance Development'}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/services')} className="text-start hover:text-white transition-colors cursor-pointer">
                  {lang === 'ar' ? 'تقديم البرامج والدورات التعليمية والتدريبية' : 'Educational & Training Programs'}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/services')} className="text-start hover:text-white transition-colors cursor-pointer">
                  {lang === 'ar' ? 'دعم منظومة الشهادات والتأهيل المهني' : 'Certification & Vocational System'}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/services')} className="text-start hover:text-white transition-colors cursor-pointer">
                  {lang === 'ar' ? 'التعاون في اعتماد الشهادات وفق الصلاحيات' : 'Accreditation Cooperation Protocols'}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Registrar Office */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#DFC075] font-mono pb-2 border-b border-white/10">
              {lang === 'ar' ? 'التواصل ومكتب التسجيل' : 'Institutional Contact'}
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-slate-300 font-normal">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#DFC075] shrink-0 mt-0.5" />
                <span>27 Old Gloucester Street, London, WC1N 3AX, United Kingdom</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#DFC075] shrink-0" />
                <a href="mailto:info@britishcenter.uk" className="hover:text-white transition-colors">
                  info@britishcenter.uk
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#DFC075] shrink-0" />
                <a href="tel:+201509949401" dir="ltr" className="hover:text-[#DFC075] font-bold text-white transition-colors">
                  +20 15 09949401
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href="https://wa.me/201509949401"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  {lang === 'ar' ? 'واتساب: 09949401 15 20+' : 'WhatsApp: +20 15 09949401'}
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-slate-400 text-xs">
                <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span dir="ltr">London: +44 20 7946 0912</span>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={() => handleNav('/admin')}
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'بوابة الإدارة والتسجيل' : 'Registrar Portal'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar with Speed Up Company Attribution */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono text-center md:text-start">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5">
            <span>© {new Date().getFullYear()} British Center for Languages. All Rights Reserved.</span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span>
              {lang === 'ar' ? 'جميع الحقوق محفوظة وتصميم وتطوير شركة' : 'Designed & Developed by'}{' '}
              <a
                href="https://speed-up.tech/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#DFC075] hover:text-white font-bold underline underline-offset-2 transition-colors inline-flex items-center gap-1"
                title="Speed Up Software & Technology"
              >
                Speed Up
                <ExternalLink className="w-3 h-3 inline" />
              </a>
            </span>
          </div>

          <div className="text-slate-400">
            UKRLP: 10099520 • Companies House: 16605467
          </div>
        </div>
      </div>
    </footer>
  );
};
