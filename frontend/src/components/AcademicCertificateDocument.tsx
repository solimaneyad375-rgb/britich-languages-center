/*
 * Project Design & Development
 * Engineered by Eng. Eyad Ahmed
 * SpeedUp Software Solutions
 * © 2026 All Rights Reserved.
 */
import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import QRCode from 'qrcode';
import { PublicVerificationResponse } from '../types';

interface AcademicCertificateDocumentProps {
  certificate: PublicVerificationResponse;
  qrDataUrl?: string;
  className?: string;
  responsive?: boolean;
  isSample?: boolean;
}

export const AcademicCertificateDocument = forwardRef<HTMLDivElement, AcademicCertificateDocumentProps>(
  ({ certificate, qrDataUrl: propQrDataUrl, className = '', responsive = true, isSample = false }, forwardedRef) => {
    const internalCertRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [qrCodeUrl, setQrCodeUrl] = useState<string>(propQrDataUrl || '');
    const [scale, setScale] = useState<number>(1);

    // Forward ref to the actual certificate root element
    useImperativeHandle(forwardedRef, () => internalCertRef.current as HTMLDivElement);

    // Generate Dynamic QR Code Data URL
    useEffect(() => {
      if (propQrDataUrl) {
        setQrCodeUrl(propQrDataUrl);
        return;
      }
      const certRef = isSample ? 'BCL-SAMPLE-SPECIMEN' : (certificate.certificateNumber || 'BCL-VERIFIED');
      const origin = typeof window !== 'undefined' && window.location ? window.location.origin : 'https://britishcenter.org';
      const verifyUrl = isSample
        ? `${origin}/certificates`
        : `${origin}/verify?certificate=${encodeURIComponent(certRef)}`;
      QRCode.toDataURL(
        verifyUrl,
        {
          width: 140,
          margin: 1,
          color: {
            dark: '#08182E',
            light: '#FFFFFF',
          },
        },
        (err, url) => {
          if (!err && url) {
            setQrCodeUrl(url);
          }
        }
      );
    }, [certificate.certificateNumber, propQrDataUrl, isSample]);

    // Responsive Scale calculation based on parent container width
    useEffect(() => {
      if (!responsive) {
        setScale(1);
        return;
      }

      const updateScale = () => {
        if (containerRef.current) {
          const containerWidth = containerRef.current.clientWidth;
          if (containerWidth > 0) {
            const calculatedScale = Math.min(containerWidth / 1120, 1);
            setScale(calculatedScale);
          }
        }
      };

      updateScale();

      const observer = new ResizeObserver(() => {
        updateScale();
      });

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      window.addEventListener('resize', updateScale);
      return () => {
        observer.disconnect();
        window.removeEventListener('resize', updateScale);
      };
    }, [responsive]);

    const formattedDate = certificate.issueDate
      ? new Date(certificate.issueDate).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      : '15 June 2026';

    const CERT_WIDTH = 1120;
    const CERT_HEIGHT = 792; // 1120 * (210 / 297) = 791.91 (Exact A4 Landscape)

    return (
      <div
        ref={containerRef}
        className={`w-full flex justify-center items-start ${className}`}
        style={{
          height: responsive ? `${CERT_HEIGHT * scale}px` : undefined,
          transition: 'height 0.15s ease-out',
        }}
      >
        {/* Certificate Master Canvas (1120px x 792px Exact A4 Landscape Proportions) */}
        <div
          ref={internalCertRef}
          id="academic-certificate-print-area"
          data-certificate-node="true"
          className="relative bg-[#FAF8F2] text-[#08182E] shadow-2xl select-none"
          style={{
            width: `${CERT_WIDTH}px`,
            height: `${CERT_HEIGHT}px`,
            minWidth: `${CERT_WIDTH}px`,
            minHeight: `${CERT_HEIGHT}px`,
            maxWidth: `${CERT_WIDTH}px`,
            maxHeight: `${CERT_HEIGHT}px`,
            transform: responsive ? `scale(${scale})` : undefined,
            transformOrigin: 'top center',
            boxSizing: 'border-box',
            fontFamily: "'Playfair Display', Georgia, serif",
            backgroundColor: '#FAF8F2',
            backgroundImage:
              'radial-gradient(circle at 50% 50%, #FFFFFF 0%, #FAF8F2 60%, #F4ECE0 100%)',
          }}
        >
          {/* Subtle Watermark Guilloche Rosette (Centered at 3.5% Opacity) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.035] z-0">
            <svg className="w-[460px] h-[460px]" viewBox="0 0 200 200" fill="none" stroke="#C5A04B" strokeWidth="0.5">
              <circle cx="100" cy="100" r="95" strokeWidth="1" />
              <circle cx="100" cy="100" r="85" strokeDasharray="2,2" />
              <circle cx="100" cy="100" r="70" />
              <circle cx="100" cy="100" r="50" strokeDasharray="3,3" />
              <circle cx="100" cy="100" r="30" />
              {Array.from({ length: 24 }).map((_, i) => (
                <line
                  key={i}
                  x1="100"
                  y1="100"
                  x2={100 + 95 * Math.cos((i * Math.PI) / 12)}
                  y2={100 + 95 * Math.sin((i * Math.PI) / 12)}
                  strokeWidth="0.3"
                />
              ))}
            </svg>
          </div>

          {/* 1. Deep British Navy & Gold Geometric Decorative Corners */}
          {/* Top Left Corner */}
          <div className="absolute top-0 left-0 w-24 h-24 pointer-events-none z-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
              <polygon points="0,0 100,0 0,100" fill="#08182E" />
              <polygon points="0,0 60,0 0,60" fill="#102F5C" />
              <line x1="0" y1="100" x2="100" y2="0" stroke="#C5A04B" strokeWidth="3" />
              <line x1="0" y1="108" x2="108" y2="0" stroke="#D8B76A" strokeWidth="1" />
              <line x1="0" y1="88" x2="88" y2="0" stroke="#DFC075" strokeWidth="0.75" />
            </svg>
          </div>

          {/* Top Right Corner */}
          <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none z-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
              <polygon points="0,0 100,0 100,100" fill="#08182E" />
              <polygon points="40,0 100,0 100,60" fill="#102F5C" />
              <line x1="0" y1="0" x2="100" y2="100" stroke="#C5A04B" strokeWidth="3" />
              <line x1="-8" y1="0" x2="100" y2="108" stroke="#D8B76A" strokeWidth="1" />
              <line x1="12" y1="0" x2="100" y2="88" stroke="#DFC075" strokeWidth="0.75" />
            </svg>
          </div>

          {/* Bottom Left Corner */}
          <div className="absolute bottom-0 left-0 w-24 h-24 pointer-events-none z-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
              <polygon points="0,0 0,100 100,100" fill="#08182E" />
              <polygon points="0,40 0,100 60,100" fill="#102F5C" />
              <line x1="0" y1="0" x2="100" y2="100" stroke="#C5A04B" strokeWidth="3" />
              <line x1="0" y1="-8" x2="108" y2="100" stroke="#D8B76A" strokeWidth="1" />
              <line x1="0" y1="12" x2="88" y2="100" stroke="#DFC075" strokeWidth="0.75" />
            </svg>
          </div>

          {/* Bottom Right Corner */}
          <div className="absolute bottom-0 right-0 w-24 h-24 pointer-events-none z-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
              <polygon points="100,0 100,100 0,100" fill="#08182E" />
              <polygon points="100,40 100,100 40,100" fill="#102F5C" />
              <line x1="0" y1="100" x2="100" y2="0" stroke="#C5A04B" strokeWidth="3" />
              <line x1="-8" y1="100" x2="100" y2="-8" stroke="#D8B76A" strokeWidth="1" />
              <line x1="12" y1="100" x2="100" y2="12" stroke="#DFC075" strokeWidth="0.75" />
            </svg>
          </div>

          {/* 2. Concentric Gold & Navy Perimeter Borders */}
          <div className="absolute inset-3 border-2 border-[#08182E] pointer-events-none" />
          <div className="absolute inset-4 border border-[#C5A04B] pointer-events-none" />
          <div className="absolute inset-5 border border-[#C5A04B]/35 pointer-events-none" />
          {/* Corner diamond markers */}
          <div className="absolute top-[22px] left-[22px] w-2 h-2 bg-[#C5A04B] rotate-45 pointer-events-none" />
          <div className="absolute top-[22px] right-[22px] w-2 h-2 bg-[#C5A04B] rotate-45 pointer-events-none" />
          <div className="absolute bottom-[22px] left-[22px] w-2 h-2 bg-[#C5A04B] rotate-45 pointer-events-none" />
          <div className="absolute bottom-[22px] right-[22px] w-2 h-2 bg-[#C5A04B] rotate-45 pointer-events-none" />

          {/* 3. Reconstructed Content Grid (Strictly Contained, No Overflows) */}
          <div
            className="relative z-10 w-full h-full box-border flex flex-col justify-between"
            style={{
              padding: '34px 56px 28px 56px',
            }}
          >
            {/* SECTION A: HEADER */}
            <div className="flex flex-col items-center text-center space-y-1">
              {/* Official Logo */}
              <div className="px-2.5 py-0.5 bg-white/95 rounded-xs border border-[#C9A347]/40 shadow-2xs">
                <img
                  src="/assets/official-logo.jpg"
                  alt="British Center Official Crest"
                  className="h-10 w-auto object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/logo-trimmed.png';
                  }}
                />
              </div>

              {/* Institutional Name */}
              <div>
                <h1
                  style={{ fontFamily: "'Cormorant Garamond', 'Cinzel', serif" }}
                  className="text-lg font-bold tracking-[0.22em] text-[#07182D] uppercase leading-tight"
                >
                  BRITISH CENTER FOR LANGUAGES
                </h1>
                <p
                  style={{ fontFamily: "'Alexandria', sans-serif" }}
                  className="text-xs font-semibold text-[#C9A347] tracking-wide mt-0.5"
                >
                  المركز البريطاني لتعليم اللغات
                </p>
              </div>

              {/* Subtle Gold Ornamental Divider */}
              <div className="flex items-center justify-center gap-2 w-72 mx-auto pt-0.5">
                <span className="flex-1 h-px bg-gradient-to-r from-transparent via-[#C9A347] to-[#C9A347]" />
                <div className="w-1.5 h-1.5 bg-[#C9A347] rotate-45 shrink-0" />
                <div className="w-1 h-1 bg-[#DFC075] rounded-full shrink-0" />
                <div className="w-1.5 h-1.5 bg-[#C9A347] rotate-45 shrink-0" />
                <span className="flex-1 h-px bg-gradient-to-l from-transparent via-[#C9A347] to-[#C9A347]" />
              </div>
            </div>

            {/* SECTION B: CERTIFICATE TITLE */}
            <div className="text-center space-y-0.5">
              <span
                style={{ fontFamily: "'Inter', sans-serif" }}
                className="text-[9px] tracking-[0.32em] font-bold text-[#C9A347] uppercase block"
              >
                OFFICIAL CREDENTIAL
              </span>
              <h2
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                className="text-3xl font-extrabold tracking-[0.08em] text-[#07182D] uppercase leading-tight"
              >
                CERTIFICATE OF ACHIEVEMENT
              </h2>
              <p
                style={{ fontFamily: "'Alexandria', sans-serif" }}
                className="text-xs font-bold text-[#142B49]"
              >
                شهادة إتمام وتأهيل معتمدة
              </p>
            </div>

            {/* SECTION C: RECIPIENT INFORMATION */}
            <div className="text-center space-y-1">
              <div>
                <span className="text-[9px] font-mono tracking-[0.25em] text-slate-500 uppercase block">
                  THIS IS PROUDLY PRESENTED TO
                </span>
                <span
                  style={{ fontFamily: "'Alexandria', sans-serif" }}
                  className="text-[10px] text-[#C9A347] font-medium block"
                >
                  تُمنح هذه الشهادة تقديراً واستحقاقاً إلى:
                </span>
              </div>

              {isSample ? (
                /* Anonymous Blank Recipient Line (Master Reference Specimen) */
                <div className="py-2 flex flex-col items-center justify-center">
                  <div className="w-80 sm:w-96 h-10 border-b-2 border-dashed border-[#C9A347]/70 flex items-center justify-center">
                    <span className="text-xs font-mono tracking-[0.25em] text-[#C9A347] font-bold uppercase opacity-90">
                      [ RECIPIENT NAME / اسم المتدرب ]
                    </span>
                  </div>
                  <span className="text-[8.5px] font-mono tracking-widest text-slate-400 uppercase mt-1">
                    ANONYMOUS SPECIMEN / نموذج توضيحي معتمد
                  </span>
                </div>
              ) : (
                <>
                  {/* Recipient English Name (Calligraphic Script) */}
                  <div
                    style={{ fontFamily: "'Alex Brush', 'Playfair Display', cursive, serif" }}
                    className="text-4xl text-[#07182D] font-normal tracking-wide leading-none px-4"
                  >
                    {certificate.studentNameEn || 'Alexander James Sterling'}
                  </div>

                  {/* Recipient Arabic Name */}
                  <div
                    style={{ fontFamily: "'Alexandria', serif" }}
                    className="text-sm font-bold text-[#C9A347]"
                  >
                    {certificate.studentNameAr || 'ألكسندر جيمس ستيرلنج'}
                  </div>
                </>
              )}

              {/* Decorative Hairline Underline */}
              <div className="w-52 h-0.5 bg-gradient-to-r from-transparent via-[#C9A347] to-transparent mx-auto" />
            </div>

            {/* SECTION D: QUALIFICATION / COURSE */}
            <div className="text-center">
              <div className="inline-block bg-white/95 border border-[#C9A347]/50 px-6 py-1.5 rounded-xs shadow-2xs max-w-xl">
                <span className="text-[8px] font-mono tracking-widest text-[#C9A347] uppercase block">
                  QUALIFICATION & PROGRAM TRACK / مسار الاعتماد الأكاديمي
                </span>
                <div
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  className="text-base font-bold text-[#07182D] leading-snug"
                >
                  {certificate.courseNameEn || 'Professional Business English & International Translation'}
                </div>
                <div
                  style={{ fontFamily: "'Alexandria', sans-serif" }}
                  className="text-xs font-semibold text-[#142B49]"
                >
                  {certificate.courseNameAr || 'اللغة الإنجليزية للأعمال والترجمة الدولية المعتمدة'}
                </div>
              </div>
            </div>

            {/* SECTION E: ACADEMIC DESCRIPTION (Dedicated, Concise 2-Line Containers) */}
            <div className="max-w-2xl mx-auto text-center space-y-1">
              <p className="text-[9.5px] text-slate-700 leading-normal font-sans font-normal">
                This certificate is awarded in recognition of the successful completion of the specified educational and training program, acknowledging the recipient's demonstrated learning outcomes and academic competence.
              </p>
              <p
                style={{ fontFamily: "'Alexandria', sans-serif" }}
                className="text-[9.5px] text-slate-700 leading-normal font-normal"
                dir="rtl"
              >
                تُمنح هذه الشهادة تقديراً لاستكمال متطلبات البرنامج التعليمي والتدريبي المحدد بنجاح، وإثباتاً لاكتساب المعارف والمهارات المعتمدة وفقاً للضوابط والمعايير الأكاديمية المنظمة.
              </p>
            </div>

            {/* SECTION F: RECONSTRUCTED BALANCED THREE-COLUMN FOOTER */}
            <div
              className="border-t border-[#C9A347]/35 pt-2 grid grid-cols-3 items-center gap-4"
              style={{ minHeight: '80px' }}
            >
              {/* LEFT COLUMN: QR Code & Verification Label */}
              <div className="flex items-center gap-3 text-start">
                <div className="p-1 bg-white border border-[#C9A347] rounded-xs shadow-2xs shrink-0">
                  {qrCodeUrl ? (
                    <img src={qrCodeUrl} alt="Verification QR Code" className="w-14 h-14 object-contain block" />
                  ) : (
                    <div className="w-14 h-14 bg-slate-100 flex items-center justify-center text-[7px] font-mono text-slate-400">
                      QR CODE
                    </div>
                  )}
                </div>
                <div className="space-y-0.5">
                  <span className="text-[8px] font-mono font-bold text-[#C9A347] uppercase tracking-wider block">
                    {isSample ? 'SAMPLE QR CODE' : 'SCAN TO VERIFY'}
                  </span>
                  <span
                    style={{ fontFamily: "'Alexandria', sans-serif" }}
                    className="text-[9px] font-semibold text-[#07182D] block"
                  >
                    {isSample ? 'رمز تحقق توضيحي' : 'التحقق الرقمي المباشر'}
                  </span>
                  <span className="text-[7.5px] font-mono text-slate-500 block">
                    {isSample ? 'SPECIMEN DEMO ONLY' : 'CENTRAL REGISTRY QUERY'}
                  </span>
                </div>
              </div>

              {/* CENTER COLUMN: Authorized Signature & Institutional Seal */}
              <div className="flex items-center justify-center gap-4">
                {/* Signature Group */}
                <div className="flex flex-col items-center text-center space-y-0.5">
                  <div className="w-28 h-7 flex items-center justify-center">
                    <svg viewBox="0 0 160 50" className="w-full h-full text-[#07182D]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M 10 32 C 25 15, 30 42, 45 22 C 55 8, 62 38, 75 25 C 85 15, 95 32, 108 20 C 120 10, 130 35, 150 18" />
                      <path d="M 35 38 C 65 34, 105 32, 145 35" strokeWidth="1" strokeDasharray="1,1" />
                    </svg>
                  </div>
                  <div className="w-28 h-px bg-[#07182D]/40" />
                  <div className="text-[8.5px] font-bold text-[#07182D] uppercase tracking-wider leading-tight">
                    Academic Director
                  </div>
                  <div style={{ fontFamily: "'Alexandria', sans-serif" }} className="text-[7.5px] text-[#C9A347] font-semibold">
                    إدارة الشؤون الأكاديمية والاعتماد
                  </div>
                </div>

                {/* Gold Embossed Institutional SVG Seal */}
                <div className="relative w-16 h-16 shrink-0">
                  <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-xs">
                    <defs>
                      <linearGradient id="goldGradientRecon" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#DFBA5A" />
                        <stop offset="25%" stopColor="#FAF1D0" />
                        <stop offset="50%" stopColor="#C9A347" />
                        <stop offset="75%" stopColor="#E6C875" />
                        <stop offset="100%" stopColor="#9C7726" />
                      </linearGradient>
                      <linearGradient id="goldInnerRecon" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#A6802C" />
                        <stop offset="50%" stopColor="#DFBA5A" />
                        <stop offset="100%" stopColor="#87651C" />
                      </linearGradient>
                    </defs>

                    {/* Ribbon tails beneath seal */}
                    <polygon points="42,85 34,110 50,104 60,110 52,85" fill="#07182D" />
                    <polygon points="78,85 86,110 70,104 60,110 68,85" fill="#07182D" />
                    <polygon points="42,85 36,108 50,103" fill="#C9A347" opacity="0.6" />
                    <polygon points="78,85 84,108 70,103" fill="#C9A347" opacity="0.6" />

                    {/* 24-point Scalloped Starburst Medallion */}
                    <g fill="url(#goldGradientRecon)" stroke="#87651C" strokeWidth="0.5">
                      {Array.from({ length: 24 }).map((_, i) => (
                        <circle
                          key={i}
                          cx={60 + 42 * Math.cos((i * 2 * Math.PI) / 24)}
                          cy={58 + 42 * Math.sin((i * 2 * Math.PI) / 24)}
                          r="6"
                        />
                      ))}
                      <circle cx="60" cy="58" r="42" />
                    </g>

                    {/* Concentric Embossed Rings */}
                    <circle cx="60" cy="58" r="38" fill="url(#goldInnerRecon)" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="1.5,1.5" />
                    <circle cx="60" cy="58" r="34" fill="url(#goldGradientRecon)" stroke="#87651C" strokeWidth="0.8" />
                    <circle cx="60" cy="58" r="31" fill="#07182D" />

                    {/* Center Emblem: Laurel & Crown */}
                    <g fill="#DFBA5A">
                      <polygon points="60,39 62,44 67,44 63,47 65,52 60,49 55,52 57,47 53,44 58,44" />
                      <circle cx="51" cy="45" r="1.2" />
                      <circle cx="69" cy="45" r="1.2" />
                      <path d="M 45 66 C 42 58, 44 51, 48 47 C 47 52, 49 56, 52 58 C 48 62, 46 64, 45 66 Z" />
                      <path d="M 75 66 C 78 58, 76 51, 72 47 C 73 52, 71 56, 68 58 C 72 62, 74 64, 75 66 Z" />
                      <text x="60" y="64" textAnchor="middle" fontSize="5.5" fontWeight="bold" fontFamily="'Cormorant Garamond', serif" fill="#FFFFFF" letterSpacing="0.5">
                        OFFICIAL
                      </text>
                      <text x="60" y="70.5" textAnchor="middle" fontSize="4.5" fontWeight="bold" fontFamily="'Cormorant Garamond', serif" fill="#DFBA5A" letterSpacing="0.5">
                        SEAL
                      </text>
                      <text x="60" y="77" textAnchor="middle" fontSize="3.8" fontFamily="'Cormorant Garamond', serif" fill="#FAF1D0">
                        ★ 2026 ★
                      </text>
                    </g>
                  </svg>
                </div>
              </div>

              {/* RIGHT COLUMN: Issue Date & Certificate Reference */}
              <div className="flex flex-col items-end text-end space-y-0.5 text-[8.5px] font-mono text-slate-600">
                <span className="text-[#C9A347] font-bold block uppercase tracking-wider text-[8px]">
                  {isSample ? 'SAMPLE ISSUANCE' : 'OFFICIAL ISSUANCE'}
                </span>
                <div>
                  <span className="text-slate-400">DATE: </span>
                  <span className="font-bold text-[#07182D]">
                    {isSample ? '2026 ISSUE / SPECIMEN' : formattedDate}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400">CERT ID: </span>
                  <span className="font-bold text-[#07182D]">
                    {isSample ? 'BCL-2026-SPECIMEN' : (certificate.certificateNumber || 'BCL-2026-00125')}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400">STU ID: </span>
                  <span className="font-bold text-[#07182D]">
                    {isSample ? 'BCL-STU-SAMPLE' : (certificate.studentIdNumber || 'BCL-STU-2026-001')}
                  </span>
                </div>
                <div className="text-[7.5px] text-slate-400 pt-0.5">
                  UKRLP: 10099520 • Co. House: 16605467
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

AcademicCertificateDocument.displayName = 'AcademicCertificateDocument';