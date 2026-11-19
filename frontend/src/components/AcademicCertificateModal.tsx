/*
 * Project Design & Development
 * Engineered by Eng. Eyad Ahmed
 * SpeedUp Software Solutions
 * © 2026 All Rights Reserved.
 */
import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { useLanguage } from '../context/LanguageContext';
import { AcademicCertificateDocument } from './AcademicCertificateDocument';
import { PublicVerificationResponse } from '../types';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  Download,
  Printer,
  X,
  FileCheck,
  Loader2
} from 'lucide-react';

interface AcademicCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificate: PublicVerificationResponse;
  isSample?: boolean;
}

export const AcademicCertificateModal: React.FC<AcademicCertificateModalProps> = ({
  isOpen,
  onClose,
  certificate,
  isSample = false,
}) => {
  const { lang } = useLanguage();
  const [zoom, setZoom] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const modalContainerRef = useRef<HTMLDivElement | null>(null);
  const certificateRef = useRef<HTMLDivElement | null>(null);

  // Manage body scroll and reset zoom on open
  useEffect(() => {
    if (isOpen) {
      setZoom(1);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(() => {});
        } else {
          onClose();
        }
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Track fullscreen state
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  if (!isOpen) return null;

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(Number((prev + 0.2).toFixed(2)), 2.5));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(Number((prev - 0.2).toFixed(2)), 0.6));
  };

  const handleResetZoom = () => {
    setZoom(1);
  };

  const toggleFullscreen = () => {
    if (!modalContainerRef.current) return;
    if (!document.fullscreenElement) {
      modalContainerRef.current.requestFullscreen().catch((err) => {
        console.error('Fullscreen request failed:', err);
      });
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    setIsExporting(true);
    try {
      // 1. Try to directly draw the high-resolution certificate image onto a canvas for pristine 300 DPI output
      const certImg = certificateRef.current?.querySelector<HTMLImageElement>('img');
      let imgData = '';
      if (certImg && certImg.complete && certImg.naturalWidth > 0) {
        try {
          const directCanvas = document.createElement('canvas');
          directCanvas.width = 3508;
          directCanvas.height = 2480;
          const ctx = directCanvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(certImg, 0, 0, 3508, 2480);
            imgData = directCanvas.toDataURL('image/jpeg', 0.95);
          }
        } catch (canvasErr) {
          console.warn('Direct canvas render had cross-origin restrictions, falling back to html2canvas', canvasErr);
        }
      }

      if (!imgData && certificateRef.current) {
        const element = certificateRef.current;
        const targetNode = element.querySelector<HTMLElement>('[data-certificate-node="true"]') || element;
        const canvas = await html2canvas(targetNode, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#FFFFFF',
        });
        imgData = canvas.toDataURL('image/jpeg', 0.95);
      }

      if (imgData) {
        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'mm',
          format: 'a4',
          compress: true,
        });

        pdf.addImage(imgData, 'JPEG', 0, 0, 297, 210, undefined, 'FAST');
        const certRef = isSample ? 'SPECIMEN-SAMPLE' : (certificate.certificateNumber || 'BCL-CREDENTIAL');
        pdf.save(`British-Center-Certificate-${certRef}.pdf`);
      }
    } catch (err) {
      console.error('PDF export failed:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div
      ref={modalContainerRef}
      className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-md animate-fadeIn select-none no-print"
      onClick={onClose}
    >
      {/* Top Header Controls Bar */}
      <div
        className="shrink-0 px-4 sm:px-8 py-3 bg-[#08182E] border-b border-[#C5A04B]/30 flex flex-wrap items-center justify-between gap-3 text-white z-20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Certificate Credential Title */}
        <div className="flex items-center gap-3 text-start">
          <div className="w-2.5 h-2.5 rounded-full bg-[#C5A04B] animate-pulse shrink-0" />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold font-serif text-white">
                {isSample
                  ? (lang === 'ar' ? 'نموذج الشهادة المعتمدة' : 'Official Academic Certificate Specimen')
                  : `${certificate.studentNameEn} — ${certificate.certificateNumber}`}
              </h3>
              <span className={`px-2 py-0.5 rounded-xs text-[10px] font-mono font-bold uppercase tracking-wider ${
                isSample
                  ? 'bg-[#C5A04B]/20 text-[#DFC075] border border-[#C5A04B]/40'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              }`}>
                {isSample ? 'SAMPLE SPECIMEN' : (certificate.status || 'VERIFIED')}
              </span>
            </div>
            <p className="text-[11px] font-mono text-[#B8C5D6]">
              {isSample
                ? (lang === 'ar'
                    ? 'نموذج تصميم توضيحي معتمد مطابق لمعايير الأكاديمية البريطانية (A4 Landscape)'
                    : 'Accredited Institutional Specimen • Official UK Standard (A4 Landscape)')
                : (lang === 'ar'
                    ? 'شهادة أكاديمية مخصصة ومطابقة للسجل المعتمد (A4 Landscape)'
                    : 'Custom Academic Certificate • Verified Central Record (A4 Landscape)')}
            </p>
          </div>
        </div>

        {/* Action Controls Toolbar */}
        <div className="flex items-center gap-2">
          {/* Zoom Out */}
          <button
            type="button"
            onClick={handleZoomOut}
            className="p-2 bg-[#102F5C] hover:bg-[#152B49] text-white border border-[#C5A04B]/30 rounded-xs transition-colors cursor-pointer"
            title={lang === 'ar' ? 'تصغير (-)' : 'Zoom Out (-)'}
          >
            <ZoomOut className="w-4 h-4 text-[#DFC075]" />
          </button>

          {/* Zoom Percentage */}
          <span className="text-xs font-mono font-bold text-white px-2.5 py-1.5 bg-[#08182E] border border-gray-700 rounded-xs min-w-[58px] text-center">
            {Math.round(zoom * 100)}%
          </span>

          {/* Zoom In */}
          <button
            type="button"
            onClick={handleZoomIn}
            className="p-2 bg-[#102F5C] hover:bg-[#152B49] text-white border border-[#C5A04B]/30 rounded-xs transition-colors cursor-pointer"
            title={lang === 'ar' ? 'تكبير (+)' : 'Zoom In (+)'}
          >
            <ZoomIn className="w-4 h-4 text-[#DFC075]" />
          </button>

          {/* Reset Zoom */}
          <button
            type="button"
            onClick={handleResetZoom}
            className="p-2 bg-[#102F5C] hover:bg-[#152B49] text-white border border-[#C5A04B]/30 rounded-xs transition-colors cursor-pointer"
            title={lang === 'ar' ? 'إعادة ضبط (100%)' : 'Reset Zoom'}
          >
            <RotateCcw className="w-4 h-4 text-[#DFC075]" />
          </button>

          <div className="w-px h-6 bg-gray-700 mx-1 hidden sm:block" />

          {/* Print Certificate */}
          <button
            type="button"
            onClick={handlePrint}
            className="px-3 py-1.5 bg-[#102F5C] hover:bg-[#152B49] text-white border border-[#C5A04B]/40 text-xs font-bold rounded-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer font-mono"
            title={lang === 'ar' ? 'طباعة الشهادة (A4)' : 'Print Certificate (A4)'}
          >
            <Printer className="w-3.5 h-3.5 text-[#DFC075]" />
            <span className="hidden md:inline">{lang === 'ar' ? 'طباعة' : 'Print'}</span>
          </button>

          {/* Download PDF */}
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isExporting}
            className="px-3.5 py-1.5 bg-[#C5A04B] hover:bg-[#DFC075] text-[#08182E] text-xs font-bold rounded-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm font-mono disabled:opacity-50"
            title={lang === 'ar' ? 'تحميل كملف PDF عالي الجودة' : 'Download High-Resolution PDF'}
          >
            {isExporting ? (
              <Loader2 className="w-3.5 h-3.5 text-[#08182E] animate-spin" />
            ) : (
              <Download className="w-3.5 h-3.5 text-[#08182E]" />
            )}
            <span>{isExporting ? (lang === 'ar' ? 'جاري التصدير...' : 'Exporting...') : 'PDF'}</span>
          </button>

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-2 bg-[#102F5C] hover:bg-[#152B49] text-white border border-[#C5A04B]/30 rounded-xs transition-colors cursor-pointer hidden sm:inline-flex"
            title={isFullscreen ? (lang === 'ar' ? 'إنهاء ملء الشاشة' : 'Exit Fullscreen') : (lang === 'ar' ? 'ملء الشاشة' : 'Fullscreen')}
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4 text-[#DFC075]" />
            ) : (
              <Maximize2 className="w-4 h-4 text-[#DFC075]" />
            )}
          </button>

          <div className="w-px h-6 bg-gray-700 mx-1" />

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="p-2 bg-rose-900/70 hover:bg-rose-800 text-white border border-rose-600/50 rounded-xs transition-colors cursor-pointer"
            title={lang === 'ar' ? 'إغلاق (ESC)' : 'Close (ESC)'}
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Main Viewport: Scaled A4 Landscape Certificate */}
      <div
        className="flex-1 overflow-auto flex items-center justify-center p-3 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="transition-transform duration-150 ease-out flex items-center justify-center max-w-full"
          style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
        >
          <div className="w-[94vw] max-w-[1080px] drop-shadow-2xl">
            <AcademicCertificateDocument
              ref={certificateRef}
              certificate={certificate}
              isSample={isSample}
            />
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div
        className="shrink-0 py-2.5 px-4 sm:px-8 bg-[#08182E] border-t border-[#C5A04B]/30 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#B8C5D6] z-20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2">
          <FileCheck className="w-4 h-4 text-[#DFC075]" />
          <span>
            {lang === 'ar'
              ? 'وثيقة الشهادة المعتمدة الأصلية الصادرة للطالب • مطابقة كاملة لمعايير الطباعة A4 Landscape'
              : 'Official Accredited Certificate Document • Standard A4 Landscape Format (297mm × 210mm)'}
          </span>
        </div>

        <div className="text-slate-400 text-[11px]">
          {lang === 'ar'
            ? 'اضغط ESC أو زر الإغلاق للعودة • يمكنك التكبير والتصغير وتصدير PDF'
            : 'Press ESC or Close to return • Use controls to zoom, print, or download PDF'}
        </div>
      </div>
    </div>
  );
};
