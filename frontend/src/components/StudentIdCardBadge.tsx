// Developed by Eng. Eyad — SpeedUp Software.
/*
 * Developed & Engineered by Eng. Eyad Ahmed
 * SpeedUp Software Solutions
 * © 2026 All Rights Reserved.
 */
import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { StudentIdCard } from '../types';
import { ShieldCheck, Printer, Award, UserCheck, Calendar } from 'lucide-react';
import QRCode from 'qrcode';
import { getAssetUrl, getVerifyUrl } from '../utils/assets';

interface StudentIdCardBadgeProps {
  card: StudentIdCard;
}

export const StudentIdCardBadge: React.FC<StudentIdCardBadgeProps> = ({ card }) => {
  const { lang, t } = useLanguage();
  const qrCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (qrCanvasRef.current) {
      const verifyUrl = getVerifyUrl(card.studentIdNumber);
      QRCode.toCanvas(
        qrCanvasRef.current,
        verifyUrl,
        {
          width: 80,
          margin: 1,
          color: {
            dark: '#102F5C',
            light: '#FFFFFF',
          },
        },
        (error) => {
          if (error) console.error(error);
        }
      );
    }
  }, [card]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Print Trigger Button */}
      <div className="flex justify-end no-print">
        <button
          onClick={handlePrint}
          className="px-4 py-2 rounded-lg bg-[#102F5C] hover:bg-[#1A3E74] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md transition-colors"
        >
          <Printer className="w-4 h-4 text-[#DFC075]" />
          <span>{t('idCardPrintBtn')}</span>
        </button>
      </div>

      {/* Realistic ID Card Pair (Front & Back) */}
      <div className="flex flex-wrap items-center justify-center gap-8 print-container">
        {/* CARD FRONT */}
        <div className="w-[340px] sm:w-[380px] h-[230px] rounded-2xl bg-gradient-to-br from-[#102F5C] via-[#0A1C36] to-[#102F5C] text-white p-5 shadow-2xl border-2 border-[#C5A04B] relative overflow-hidden flex flex-col justify-between shrink-0">
          {/* Subtle gold ribbon top right */}
          <div className="absolute top-0 right-0 w-28 h-28 bg-[#C5A04B]/10 rounded-full filter blur-xl pointer-events-none" />

          {/* Header */}
          <div className="flex items-center justify-between pb-2.5 border-b border-[#C5A04B]/40">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-lg bg-white border border-[#C5A04B] p-0.5 flex items-center justify-center shadow-sm">
                <img
                  src={getAssetUrl('assets/logo.webp')}
                  alt="British Center for Languages"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = getAssetUrl('assets/logo.png');
                  }}
                />
              </div>
              <div>
                <h4 className="font-extrabold text-xs tracking-wider text-white">BRITISH CENTER</h4>
                <p className="text-[10px] text-[#DFC075] font-semibold">{t('idCardInstitutionAr')}</p>
              </div>
            </div>

            <div className="text-end">
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-400/30">
                {card.status || 'Active'}
              </span>
              <span className="block text-[9px] text-gray-300 mt-0.5">STUDENT ID</span>
            </div>
          </div>

          {/* Body: Photo & Credentials */}
          <div className="flex items-center gap-4 py-2">
            {/* Student Photo with gold frame */}
            <div className="w-18 h-22 rounded-xl bg-gray-100 border-2 border-[#C5A04B] overflow-hidden shrink-0 shadow-inner flex items-center justify-center">
              {card.photoUrl ? (
                <img src={card.photoUrl} alt={card.studentNameEn} className="w-full h-full object-cover" />
              ) : (
                <UserCheck className="w-10 h-10 text-[#102F5C]/40" />
              )}
            </div>

            {/* Student Info */}
            <div className="space-y-1 text-start overflow-hidden">
              <div className="font-bold text-sm text-white truncate">
                {card.studentNameEn}
              </div>
              <div className="text-xs text-[#DFC075] truncate font-medium">
                {card.studentNameAr}
              </div>
              <div className="text-[11px] text-gray-300 truncate">
                <span className="text-gray-400">{lang === 'ar' ? 'البرنامج:' : 'Prog:'} </span>
                {lang === 'ar' ? card.programAr : card.programEn}
              </div>
              <div className="text-[11px] font-mono text-[#DFC075] font-bold">
                ID: {card.studentIdNumber}
              </div>
            </div>
          </div>

          {/* Footer Bar */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[9px] text-gray-300 font-mono">
            <div>CARD: {card.cardNumber}</div>
            <div>EXP: {new Date(card.expiryDate).toLocaleDateString()}</div>
          </div>
        </div>

        {/* CARD BACK */}
        <div className="w-[340px] sm:w-[380px] h-[230px] rounded-2xl bg-[#0A1C36] text-white p-5 shadow-2xl border-2 border-[#C5A04B] relative overflow-hidden flex flex-col justify-between shrink-0">
          {/* Black Magnetic Stripe */}
          <div className="-mx-5 -mt-1 h-9 bg-black/90 shadow-inner flex items-center px-4">
            <span className="font-mono text-[9px] text-gray-500 tracking-widest">
              OFFICIAL SECURE ACADEMIC IDENTIFICATION TOKEN
            </span>
          </div>

          {/* Mid Section: QR Code & Verification Notice */}
          <div className="flex items-center gap-4 py-2">
            {/* Scannable QR Code */}
            <div className="bg-white p-1 rounded-xl shadow-md shrink-0">
              <canvas ref={qrCanvasRef} className="w-18 h-18" />
            </div>

            <div className="text-[10px] text-gray-300 leading-relaxed text-start space-y-1">
              <p className="font-bold text-[#DFC075]">
                {lang === 'ar' ? 'التحقق الأكاديمي الرقمي:' : 'Digital Academic Verification:'}
              </p>
              <p>
                {lang === 'ar'
                  ? 'امسح رمز QR للتحقق المباشر من صحة وسريان بطاقة الطالب من قاعدة البيانات المركزية.'
                  : 'Scan QR code to immediately authenticate student standing against the central institutional registry.'}
              </p>
              <p className="text-[9px] text-gray-400">
                UK Partner: UK International Education & Training
              </p>
            </div>
          </div>

          {/* Bottom Barcode & Registration Notice */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[9px] text-gray-400 font-mono">
            <div>COMPANIES HOUSE: 16605467</div>
            <div>UKRLP: 10099520</div>
          </div>
        </div>
      </div>
    </div>
  );
};

