// Developed by Eng. Eyad — SpeedUp Software.
/*
 * Developed & Engineered by Eng. Eyad Ahmed
 * SpeedUp Software Solutions
 * © 2026 All Rights Reserved.
 */

/**
 * Resolves static asset paths accurately across local dev and production hosting (e.g., GitHub Pages subpaths).
 * Automatically converts paths to WebP when available for maximum speed and minimal bandwidth.
 */
export function getAssetUrl(assetPath: string): string {
  if (!assetPath) return '';
  if (assetPath.startsWith('http://') || assetPath.startsWith('https://') || assetPath.startsWith('data:')) {
    return assetPath;
  }
  const cleanPath = assetPath.startsWith('/') ? assetPath.slice(1) : assetPath;
  const baseUrl = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  return `${baseUrl}${cleanPath}`;
}

/**
 * Resolves full public verification URL respecting base URL (e.g. GitHub Pages subpath).
 */
export function getVerifyUrl(certParam: string): string {
  const origin = typeof window !== 'undefined' && window.location ? window.location.origin : '';
  const baseUrl = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  return `${origin}${baseUrl}verify?certificate=${encodeURIComponent(certParam)}`;
}

