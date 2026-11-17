/*
 * Project Design & Development
 * Engineered by Eng. Eyad Ahmed
 * SpeedUp Software Solutions
 * © 2026 All Rights Reserved.
 */
import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  Download,
  X,
  AlertCircle,
  FileCheck
} from 'lucide-react';

interface CertificatePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  titleEn: string;
  titleAr: string;
  isSample?: boolean;
  downloadFileName?: string;
}

export const CertificatePreviewModal: React.FC<CertificatePreviewModalProps> = ({
  isOpen,
  onClose,
  imageSrc,
  titleEn,
  titleAr,
  isSample = true,
  downloadFileName = 'british-center-certificate-original.jpg',
}) => {
  const { lang } = useLanguage();
  const [zoom, setZoom] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const modalContainerRef = useRef<HTMLDivElement | null>(null);

  // Reset zoom on open
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

  // Track fullscreen change
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
    setZoom((prev) => Math.min(Number((prev + 0.25).toFixed(2)), 3.0));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(Number((prev - 0.25).toFixed(2)), 0.5));
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

  return (
    <div
      ref={modalContainerRef}
      className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-sm animate-fadeIn select-none"
      onClick={onClose}
    >
      {/* Top Header & Controls Bar (Completely OUTSIDE the image area) */}
      <div
        className="shrink-0 px-4 sm:px-8 py-3 bg-[#08182E] border-b border-[#C5A04B]/30 flex flex-wrap items-center justify-between gap-3 text-white z-20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title & Sample Design Label */}
        <div className="flex items-center gap-3 text-start">
          <div className="w-2.5 h-2.5 rounded-full bg-[#C5A04B] animate-pulse shrink-0" />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold font-serif text-white">
                {lang === 'ar' ? titleAr : titleEn}
              </h3>
              {isSample && (
                <span className="px-2 py-0.5 rounded-xs bg-[#C5A04B]/20 text-[#DFC075] border border-[#C5A04B]/40 text-[10px] font-mono font-bold uppercase tracking-wider">
                  SAMPLE DESIGN
                </span>
              )}
            </div>
            <p className="text-[11px] font-mono text-[#B8C5D6]">
              {isSample
                ? (lang === 'ar'
                    ? 'نموذج التصميم الأصلي المعتمد (Original Reference Image)'
                    : 'Original Approved Reference Image • Unmodified')
                : (lang === 'ar'
                    ? 'وثيقة الشهادة الرسمية الصادرة'
                    : 'Official Issued Certificate Document')}
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

          {/* Zoom Percentage Display */}
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
            title={lang === 'ar' ? 'إعادة ضبط (100%)' : 'Reset Zoom (100%)'}
          >
            <RotateCcw className="w-4 h-4 text-[#DFC075]" />
          </button>

          <div className="w-px h-6 bg-gray-700 mx-1 hidden sm:block" />

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

          {/* Download Original File */}
          <a
            href={imageSrc}
            download={downloadFileName}
            className="px-3 py-1.5 bg-[#C5A04B] hover:bg-[#DFC075] text-[#08182E] text-xs font-bold rounded-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm font-mono"
            title={lang === 'ar' ? 'تحميل الصورة الأصلية' : 'Download Original Image'}
          >
            <Download className="w-3.5 h-3.5 text-[#08182E]" />
            <span className="hidden md:inline">{lang === 'ar' ? 'تحميل الأصل' : 'Download'}</span>
          </a>

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

      {/* Main Viewport: Uncropped, Unfiltered, Unmodified Original Image */}
      <div
        className="flex-1 overflow-auto flex items-center justify-center p-2 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="transition-transform duration-150 ease-out flex items-center justify-center max-w-full max-h-full"
          style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
        >
          {/* Exact Original Image — strictly object-fit: contain, no filters, no overlays */}
          <img
            src={imageSrc}
            alt={lang === 'ar' ? titleAr : titleEn}
            className="max-w-[92vw] max-h-[82vh] object-contain shadow-2xl block mx-auto"
            style={{
              filter: 'none',
              transform: 'none',
              imageRendering: 'auto',
            }}
          />
        </div>
      </div>

      {/* Bottom Information Footer (Completely OUTSIDE the image area) */}
      <div
        className="shrink-0 py-2.5 px-4 sm:px-8 bg-[#08182E] border-t border-[#C5A04B]/30 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#B8C5D6] z-20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2">
          {isSample ? (
            <span className="flex items-center gap-1.5 text-[#DFC075]">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>
                {lang === 'ar'
                  ? 'نموذج توضيحي للاسترشاد بهيكل التصميم والاعتماد • مطابق للصورة المرجعية الأصلية'
                  : 'SAMPLE DESIGN: Exact original reference image displayed without modification'}
              </span>
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-emerald-400">
              <FileCheck className="w-3.5 h-3.5" />
              <span>
                {lang === 'ar'
                  ? 'وثيقة الشهادة الأصلية المرتبطة بهذا السجل'
                  : 'Official certificate document associated with this record'}
              </span>
            </span>
          )}
        </div>

        <div className="text-slate-400 text-[11px]">
          {lang === 'ar'
            ? 'اضغط ESC أو زر الإغلاق للعودة • استخدم أزرار التكبير لفحص التفاصيل الدقيقة'
            : 'Press ESC or Close to return • Use zoom controls to inspect fine details'}
        </div>
      </div>
    </div>
  );
};
