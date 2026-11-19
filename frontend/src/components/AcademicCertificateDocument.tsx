/*
 * Project Design & Development
 * Engineered by Eng. Eyad Ahmed
 * SpeedUp Software Solutions
 * © 2026 All Rights Reserved.
 */
import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { PublicVerificationResponse } from '../types';
import { getAssetUrl } from '../utils/assets';

interface AcademicCertificateDocumentProps {
  certificate?: PublicVerificationResponse;
  qrDataUrl?: string;
  className?: string;
  responsive?: boolean;
  isSample?: boolean;
}

export const AcademicCertificateDocument = forwardRef<HTMLDivElement, AcademicCertificateDocumentProps>(
  ({ className = '', responsive = true }, forwardedRef) => {
    const internalCertRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [scale, setScale] = useState<number>(1);

    // Forward ref to the actual certificate root element
    useImperativeHandle(forwardedRef, () => internalCertRef.current as HTMLDivElement);

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
          className="relative bg-white shadow-2xl select-none overflow-hidden rounded-xs border border-[#C5A04B]/20"
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
          }}
        >
          <img
            src={getAssetUrl('assets/editorial/official-custom-certificate.webp')}
            alt="British Center for Languages - Official Accredited Certificate"
            className="w-full h-full object-contain pointer-events-none select-none block"
            loading="eager"
            crossOrigin="anonymous"
            onError={(e) => {
              (e.target as HTMLImageElement).src = getAssetUrl('assets/editorial/certificate-sample.webp');
            }}
          />
        </div>
      </div>
    );
  }
);

AcademicCertificateDocument.displayName = 'AcademicCertificateDocument';
