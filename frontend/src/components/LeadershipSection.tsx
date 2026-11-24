/*
 * Project Design & Development
 * Engineered by Eng. Eyad Ahmed
 * SpeedUp Software Solutions
 * © 2026 All Rights Reserved.
 */
import React from 'react';
import { getAssetUrl } from '../utils/assets';
import { ShieldCheck, Award, Building2 } from 'lucide-react';

export const LeadershipSection: React.FC = () => {
  return (
    <section
      id="leadership"
      dir="ltr"
      className="py-16 sm:py-24 bg-[#F8FAFC] dark:bg-[#07182D] text-[#102F5C] dark:text-[#F8F9FC] border-b border-gray-200 dark:border-[rgba(197,160,75,0.22)] transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Institutional Section Header (English Only) */}
          <div className="text-center sm:text-left space-y-3">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-xs bg-[#102F5C]/10 dark:bg-[#152B49] border border-[#C5A04B]/35 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#C5A04B]" />
              <span className="text-xs font-mono font-bold tracking-widest text-[#C5A04B] dark:text-[#DFC075] uppercase">
                Institutional Leadership
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-[#102F5C] dark:text-white tracking-tight">
              Executive Management &amp; Center Direction
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-[#B8C5D6] max-w-2xl font-normal leading-relaxed">
              Official executive administration and leadership overseeing educational quality, institutional governance, and accredited operations.
            </p>
          </div>

          {/* Official Management Profile Card */}
          <div className="bg-white dark:bg-[#0A1F38] border-2 border-[#C5A04B]/40 dark:border-[#C5A04B]/50 rounded-xs p-6 sm:p-10 shadow-xl relative overflow-hidden text-left">
            {/* Elegant Corner Framing Accents */}
            <div className="absolute top-0 right-0 w-20 h-20 pointer-events-none opacity-30 sm:opacity-40">
              <div className="w-full h-full border-t-2 border-r-2 border-[#C5A04B]" />
            </div>
            <div className="absolute bottom-0 left-0 w-20 h-20 pointer-events-none opacity-30 sm:opacity-40">
              <div className="w-full h-full border-b-2 border-l-2 border-[#C5A04B]" />
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-10 relative z-10">
              {/* Institutional Crest Plaque (Official Seal — No fake photograph) */}
              <div className="shrink-0 flex flex-col items-center">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xs bg-[#08182E] border-2 border-[#C5A04B] flex items-center justify-center p-3 shadow-lg">
                  <img
                    src={getAssetUrl('assets/logo-trimmed.webp')}
                    alt="British Center for Languages Crest"
                    className="w-full h-full object-contain filter drop-shadow-sm"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = getAssetUrl('assets/logo-trimmed.png');
                    }}
                  />
                </div>
                <div className="mt-2.5 inline-flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-wider text-[#C5A04B] dark:text-[#DFC075] uppercase">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Official Seal</span>
                </div>
              </div>

              {/* Management Profile Typography */}
              <div className="flex-1 text-center sm:text-left space-y-4">
                <div className="space-y-1.5">
                  <span className="text-xs font-mono font-bold tracking-widest text-[#C5A04B] dark:text-[#DFC075] uppercase block">
                    Office of the Director
                  </span>
                  {/* Exact Full Name */}
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-[#102F5C] dark:text-white tracking-wide">
                    Mohamed Ahmed Mostafa
                  </h3>
                </div>

                {/* Exact Official Position Title */}
                <div className="inline-block py-1.5 px-3.5 bg-[#102F5C]/5 dark:bg-[#152B49] border border-[#C5A04B]/35 rounded-xs">
                  <p className="text-sm sm:text-base lg:text-lg font-bold text-[#C5A04B] dark:text-[#DFC075] font-serif">
                    Manager &amp; Director – British Center for Languages
                  </p>
                </div>

                {/* Institutional Verification Details (English Only) */}
                <div className="pt-4 border-t border-gray-200 dark:border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-slate-600 dark:text-[#AAB8CB]">
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <Building2 className="w-3.5 h-3.5 text-[#C5A04B] shrink-0" />
                    <span>Companies House: 16605467</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <Award className="w-3.5 h-3.5 text-[#C5A04B] shrink-0" />
                    <span>UKRLP Reference: 10099520</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
