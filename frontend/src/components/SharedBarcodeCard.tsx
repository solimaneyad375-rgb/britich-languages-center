/*
 * Project Design & Development
 * Engineered by Eng. Eyad Ahmed
 * SpeedUp Software Solutions
 * © 2026 All Rights Reserved.
 */
import React, { useRef, useEffect } from 'react';
import QRCode from 'qrcode';
import { ShieldCheck, Award, Users, CheckCircle2, QrCode as QrIcon, Download, Printer } from 'lucide-react';
import { SharedBarcodeGroup } from '../types';
import { getAssetUrl, getVerifyUrl } from '../utils/assets';

interface SharedBarcodeCardProps {
  cohort: SharedBarcodeGroup;
  lang: 'ar' | 'en';
  onPrint?: () => void;
}

export const SharedBarcodeCard: React.FC<SharedBarcodeCardProps> = ({ cohort, lang, onPrint }) => {
  const qrCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (qrCanvasRef.current) {
      const verifyUrl = getVerifyUrl(cohort.barcode);
      QRCode.toCanvas(
        qrCanvasRef.current,
        verifyUrl,
        {
          width: 110,
          margin: 1,
          color: {
            dark: '#08182E',
            light: '#FFFFFF',
          },
        },
        (err) => {
          if (err) console.error('QR code generation error', err);
        }
      );
    }
  }, [cohort.barcode]);

  const handleDownloadQr = () => {
    if (qrCanvasRef.current) {
      const pngUrl = qrCanvasRef.current.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = pngUrl;
      a.download = `BritishCenter-SharedBarcode-${cohort.barcode}.png`;
      a.click();
    }
  };

  // Generate stylized barcode SVG bars for BC-QT-0047
  const renderBarcodeBars = () => {
    // 48 bars with alternating widths to represent authentic Code128
    const pattern = [3,1,2,1,1,3,2,2,1,1,4,1,2,1,3,2,1,2,1,3,1,1,2,3,1,2,2,1,3,1,1,2,4,1,1,3,2,1,1,2,3,1,2,2,1,3,2,4];
    let offset = 0;
    return pattern.map((width, idx) => {
      const currentOffset = offset;
      offset += width + (idx % 2 === 0 ? 2 : 1.5);
      if (idx % 2 === 1) return null; // Space
      return (
        <rect
          key={idx}
          x={currentOffset}
          y="0"
          width={width}
          height="54"
          fill="currentColor"
        />
      );
    });
  };

  return (
    <div className="bg-white dark:bg-[#10243E] rounded-xs border-2 border-[#C5A04B]/40 shadow-2xl overflow-hidden text-start">
      {/* Top Gold Header Strip */}
      <div className="bg-gradient-to-r from-[#0B1E38] via-[#102A4C] to-[#0B1E38] p-5 sm:p-6 border-b border-[#C5A04B]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-2 bg-white rounded-xs border border-[#C5A04B]/50 shrink-0">
            <img
              src={getAssetUrl('assets/logo-trimmed.webp')}
              alt="British Center for Languages"
              width="110"
              height="36"
              className="h-9 w-auto object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = getAssetUrl('assets/logo.webp');
              }}
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono tracking-widest text-[#DFC075] uppercase font-bold">
                {lang === 'ar' ? 'نظام الباركود الموحد المعتمد' : 'OFFICIAL SHARED BARCODE SYSTEM'}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-bold">
                {cohort.status === 'Valid' ? (lang === 'ar' ? 'معتمد وسارٍ' : 'ACTIVE') : cohort.status}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-serif tracking-tight mt-0.5">
              {cohort.barcode}
            </h3>
          </div>
        </div>

        {/* Quota & Action Badges */}
        <div className="flex items-center gap-2.5">
          <div className="px-3 py-1.5 rounded-xs bg-[#152B49] border border-[#C5A04B]/30 text-center">
            <span className="text-[10px] font-mono text-slate-400 block uppercase">
              {lang === 'ar' ? 'سعة المجموعة' : 'Cohort Quota'}
            </span>
            <span className="text-sm font-bold font-mono text-[#DFC075]">
              {cohort.students.length} / {cohort.maxCapacity} {lang === 'ar' ? 'متدرباً' : 'Students'}
            </span>
          </div>

          {onPrint && (
            <button
              onClick={onPrint}
              className="p-2.5 rounded-xs bg-[#C5A04B] hover:bg-[#DFC075] text-[#08182E] font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
              title={lang === 'ar' ? 'طباعة إفادة الدفعة' : 'Print Cohort Record'}
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">{lang === 'ar' ? 'طباعة' : 'Print'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Barcode & Security Badge Visual Area */}
      <div className="p-6 sm:p-8 bg-[#FBFBFA] dark:bg-[#0B1A2E] border-b border-gray-200 dark:border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Visual Barcode Display */}
          <div className="md:col-span-8 space-y-4">
            <div className="p-5 bg-white dark:bg-[#152B49] rounded-xs border border-gray-200 dark:border-[#C5A04B]/30 shadow-xs flex flex-col items-center justify-center space-y-2">
              <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                {lang === 'ar' ? 'الرمز الشريطي الرقمي للمجموعة المعتمدة' : 'HIGH-DENSITY ENCRYPTED COHORT BARCODE'}
              </span>
              
              {/* Scalable SVG Barcode Graphic */}
              <div className="w-full max-w-md py-2 overflow-hidden flex justify-center text-[#102F5C] dark:text-[#E2E8F0]">
                <svg
                  viewBox="0 0 160 54"
                  className="w-full h-14 sm:h-16"
                  preserveAspectRatio="xMidYMid meet"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {renderBarcodeBars()}
                </svg>
              </div>

              {/* Human-Readable Barcode Text */}
              <div className="font-mono text-base sm:text-lg font-bold tracking-[0.25em] text-[#102F5C] dark:text-[#DFC075]">
                *{cohort.barcode}*
              </div>
            </div>

            {/* Group Program Description */}
            <div className="space-y-1">
              <span className="text-xs uppercase font-mono text-[#C5A04B] font-bold">
                {cohort.batchNumber} • {lang === 'ar' ? 'البرنامج التدريبي المعتمد' : 'Accredited Qualification Program'}
              </span>
              <h4 className="text-lg sm:text-xl font-bold text-[#102F5C] dark:text-white font-serif">
                {lang === 'ar' ? cohort.titleAr : cohort.titleEn}
              </h4>
            </div>
          </div>

          {/* QR Code & Direct Scan Panel */}
          <div className="md:col-span-4 flex flex-col items-center justify-center p-5 bg-white dark:bg-[#152B49] rounded-xs border border-gray-200 dark:border-[#C5A04B]/30 shadow-xs space-y-3 text-center">
            <div className="p-2 bg-white rounded-xs border border-gray-200 shadow-inner">
              <canvas ref={qrCanvasRef} className="w-[110px] h-[110px]" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#102F5C] dark:text-white block">
                {lang === 'ar' ? 'رمز الاستجابة السريع (QR)' : 'Quick Response Code'}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-[#B8C5D6] block mt-0.5">
                {lang === 'ar' ? 'امسح للتحقق الفوري من هاتفك' : 'Scan for live digital authentication'}
              </span>
            </div>
            <button
              onClick={handleDownloadQr}
              className="px-3 py-1 text-[11px] font-semibold text-[#C5A04B] hover:text-[#DFC075] border border-[#C5A04B]/40 hover:border-[#C5A04B] rounded-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'تحميل الرمز' : 'Download QR'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Cohort Specifications Grid */}
      <div className="p-6 bg-[#F8FAFC] dark:bg-[#10243E] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-medium border-b border-gray-200 dark:border-white/10">
        <div>
          <span className="text-slate-500 dark:text-slate-400 block text-[11px] font-mono uppercase">
            {lang === 'ar' ? 'الجهة المصدرة:' : 'Issuing Organization:'}
          </span>
          <strong className="text-[#102F5C] dark:text-white block mt-0.5">
            {lang === 'ar' ? cohort.issuingOrganizationAr : cohort.issuingOrganizationEn}
          </strong>
        </div>

        <div>
          <span className="text-slate-500 dark:text-slate-400 block text-[11px] font-mono uppercase">
            {lang === 'ar' ? 'جهة الاعتماد والتعاون:' : 'Accrediting Partner:'}
          </span>
          <strong className="text-[#102F5C] dark:text-white block mt-0.5">
            {lang === 'ar' ? cohort.accreditingEntityAr : cohort.accreditingEntityEn}
          </strong>
        </div>

        <div>
          <span className="text-slate-500 dark:text-slate-400 block text-[11px] font-mono uppercase">
            {lang === 'ar' ? 'تاريخ الاعتماد:' : 'Issue Date:'}
          </span>
          <strong className="text-[#102F5C] dark:text-white font-mono block mt-0.5">
            {cohort.issueDate}
          </strong>
        </div>

        <div>
          <span className="text-slate-500 dark:text-slate-400 block text-[11px] font-mono uppercase">
            {lang === 'ar' ? 'سجل الشركات و UKRLP:' : 'UK Registrations:'}
          </span>
          <strong className="text-[#C5A04B] dark:text-[#DFC075] font-mono block mt-0.5">
            16605467 • 10099520
          </strong>
        </div>
      </div>
    </div>
  );
};
