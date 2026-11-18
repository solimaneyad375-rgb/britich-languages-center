// Developed by Eng. Eyad — SpeedUp Software.
/*
 * Developed & Engineered by Eng. Eyad Ahmed
 * SpeedUp Software Solutions
 * © 2026 All Rights Reserved.
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

interface HeroProps {
  navigate?: (path: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ navigate: propNavigate }) => {
  const routerNavigate = useNavigate();
  const navigate = propNavigate || routerNavigate;
  const { lang, isRtl } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  const heroBgWebp = getAssetUrl('assets/big-ben-hero.webp');

  return (
    <section className="relative w-full min-h-[85vh] lg:min-h-[90vh] flex items-center overflow-hidden bg-[#07182D] text-[#F8F9FC]">
      {/* 1. FULL-WIDTH CINEMATIC BIG BEN HERO BACKGROUND (HIGH CLARITY, WEBP OPTIMIZED) */}
      <div
        className="absolute inset-0 z-0 select-none pointer-events-none bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url('${heroBgWebp}')`,
          backgroundPosition: 'center 45%',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Dynamic Language-Based Balanced Gradient Overlay (Darker behind text, clear over Big Ben) */}
        <div
          className="absolute inset-0 transition-all duration-300"
          style={{
            background: isRtl
              ? 'linear-gradient(to left, rgba(5, 18, 35, 0.82) 0%, rgba(5, 18, 35, 0.58) 45%, rgba(5, 18, 35, 0.22) 100%)'
              : 'linear-gradient(to right, rgba(5, 18, 35, 0.82) 0%, rgba(5, 18, 35, 0.58) 45%, rgba(5, 18, 35, 0.22) 100%)',
          }}
        />

        {/* Top Navbar Soft Tint */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#07182D]/70 via-[#07182D]/30 to-transparent" />

        {/* Bottom Smooth Transition into Services Highlight Strip */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#07182D] via-[#07182D]/40 to-transparent" />
      </div>

      {/* 2. DYNAMIC LANGUAGE-ALIGNED HERO CONTENT CONTAINER (RIGHT IN ARABIC, LEFT IN ENGLISH) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-20 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28 flex justify-start">
        <div className="max-w-2xl lg:max-w-3xl text-start space-y-6 sm:space-y-7 ms-0 me-auto">
          {/* Small Institutional Label */}
          <div className="inline-flex items-center gap-3">
            <span className="text-xs sm:text-[13px] font-bold tracking-[0.22em] text-[#DFC075] uppercase font-mono">
              BRITISH CENTER FOR LANGUAGES
            </span>
            <span className="w-10 sm:w-12 h-[2px] bg-[#C9A347] shrink-0" />
          </div>

          {/* Main Headline (Balanced Two-Line Composition) */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.35rem] font-bold tracking-tight leading-[1.25] sm:leading-[1.3] drop-shadow-md">
            {lang === 'ar' ? (
              <>
                <span className="block text-[#F7F8FA] font-serif">
                  نحو تعليم مؤسسي وتأهيل
                </span>
                <span className="block text-[#C9A347] font-serif mt-1.5 sm:mt-2.5">
                  بمعايير احترافية وآفاق دولية
                </span>
              </>
            ) : (
              <>
                <span className="block text-[#F7F8FA] font-serif">
                  Towards Institutional Education
                </span>
                <span className="block text-[#C9A347] font-serif mt-1.5 sm:mt-2.5">
                  With International Standards
                </span>
              </>
            )}
          </h1>

          {/* Description Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-[#AAB8CB] leading-[1.8] max-w-xl font-normal drop-shadow-xs">
            {lang === 'ar'
              ? 'مؤسسة تعليمية وتدريبية متخصصة في بناء وتأهيل الكوادر البشرية، والتطوير المؤسسي، ودعم المراكز والمؤسسات التعليمية والتدريبية.'
              : 'An educational and training institution specialized in developing human capital, institutional development, and supporting educational and training centers.'}
          </p>

          {/* Two Action Buttons (Aligned to the start: Right in RTL, Left in LTR) */}
          <div className="flex flex-wrap items-center justify-start gap-4 pt-2">
            {/* Primary Gold CTA */}
            <button
              onClick={() => {
                navigate('/services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="h-12 sm:h-13 px-7 sm:px-8 bg-[#C9A347] hover:bg-[#DFC075] text-[#07182D] text-sm sm:text-base font-bold rounded-xs shadow-lg shadow-[#C9A347]/20 hover:shadow-[#C9A347]/35 transition-all duration-200 inline-flex items-center justify-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5"
            >
              <span>{lang === 'ar' ? 'اكتشف خدماتنا' : 'Explore Our Services'}</span>
              <ArrowIcon className="w-4 h-4 text-[#07182D]" />
            </button>

            {/* Secondary Verification Button with Shield */}
            <button
              onClick={() => {
                navigate('/verify');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="h-12 sm:h-13 px-6 sm:px-7 bg-[#07182D]/70 hover:bg-[#102B4C]/80 border border-[#C9A34A]/70 hover:border-[#C9A34A] text-[#F8F9FC] hover:text-[#DFC075] text-sm sm:text-base font-semibold rounded-xs backdrop-blur-xs transition-all duration-200 inline-flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <ShieldCheck className="w-4 h-4 text-[#DFC075]" />
              <span>{lang === 'ar' ? 'التحقق من الشهادات' : 'Verify Certificates'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
