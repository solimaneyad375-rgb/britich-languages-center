/*
 * Project Design & Development
 * Engineered by Eng. Eyad Ahmed
 * SpeedUp Software Solutions
 * © 2026 All Rights Reserved.
 */
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Menu, X, ShieldCheck, Globe, Lock, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  currentPath?: string;
  navigate?: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath: propPath, navigate: propNavigate }) => {
  const routerNavigate = useNavigate();
  const location = useLocation();
  const navigate = propNavigate || routerNavigate;
  const currentPath = propPath || location.pathname;

  const { lang, toggleLang, isRtl, t } = useLanguage();
  const { theme, toggleTheme, isDark } = useTheme();
  const { isAuthenticated } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = currentPath === '/';

  const navLinks = [
    { path: '/', label: lang === 'ar' ? 'الرئيسية' : 'Home' },
    { path: '/about', label: lang === 'ar' ? 'من نحن' : 'About Us' },
    { path: '/services', label: lang === 'ar' ? 'خدماتنا' : 'Our Services' },
    { path: '/uk-cooperation', label: lang === 'ar' ? 'التعاون البريطاني' : 'UK Cooperation' },
    { path: '/certificates', label: lang === 'ar' ? 'الشهادات المعتمدة' : 'Academic Certificates' },
    { path: '/verify', label: lang === 'ar' ? 'التحقق من الشهادات' : 'Verify Credentials', isVerify: true },
    { path: '/partners', label: lang === 'ar' ? 'شركاؤنا' : 'Partners' },
    { path: '/contact', label: lang === 'ar' ? 'تواصل معنا' : 'Contact Us' },
  ];

  const handleLinkClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isHome
          ? 'py-2 bg-[#07182D]/95 backdrop-blur-md border-b border-[rgba(201,163,74,0.22)] shadow-xl'
          : 'py-3 sm:py-4 bg-[#07182D]/75 backdrop-blur-sm border-b border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-[58px] sm:min-h-[64px]">
          {/* 1. OFFICIAL INSTITUTIONAL LOGO (SEAMLESS DIRECT TRANSPARENT PRESENTATION) */}
          <div
            onClick={() => handleLinkClick('/')}
            className="flex items-center gap-2.5 cursor-pointer select-none shrink-0 group py-1"
            title={lang === 'ar' ? 'المركز البريطاني لتعليم اللغات' : 'British Center for Languages'}
          >
            <img
              src="/assets/official-logo-transparent.png"
              alt="British Center for Languages Official Crest & Brand Logo"
              className={`w-auto object-contain transition-all duration-300 group-hover:scale-[1.02] ${
                isScrolled ? 'h-9 sm:h-10' : 'h-10 sm:h-12'
              }`}
              style={{
                maxHeight: isScrolled ? '40px' : '48px',
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/assets/official-logo.jpg';
              }}
            />
          </div>

          {/* 2. DESKTOP NAVIGATION LINKS */}
          <nav className="hidden xl:flex items-center gap-1.5 xl:gap-2.5 2xl:gap-3.5 shrink-0">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;

              if (link.isVerify) {
                return (
                  <button
                    key={link.path}
                    onClick={() => handleLinkClick(link.path)}
                    className={`nav-link inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs text-xs font-semibold tracking-wide whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#C9A347] text-[#07182D] border border-[#C9A347] shadow-sm'
                        : 'border border-[#C9A347]/80 bg-[#142B49]/40 text-[#DFC075] hover:bg-[#C9A347] hover:text-[#07182D] hover:border-[#C9A347]'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{link.label}</span>
                  </button>
                );
              }

              return (
                <button
                  key={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  className={`nav-link relative px-2.5 py-1.5 text-xs xl:text-[13px] 2xl:text-[13.5px] font-medium whitespace-nowrap shrink-0 tracking-normal transition-all cursor-pointer ${
                    isActive
                      ? 'text-[#DFC075] font-semibold'
                      : 'text-[#F7F8FA] hover:text-[#DFC075]'
                  }`}
                >
                  {link.label}
                  {/* Elegant Active Gold Underline Bar */}
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-2 h-[2px] bg-[#C9A347] rounded-full shadow-[0_0_6px_#C9A347]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* 3. UTILITY CONTROLS (Theme Toggle, Language Switcher, Admin Login) */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-2.5 text-xs">
            {/* Theme Toggle (Light / Dark) */}
            <button
              onClick={toggleTheme}
              className="inline-flex items-center justify-center gap-1.5 h-8 px-2.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer border bg-[#102B4C]/80 text-[#DFC075] border-[rgba(201,163,74,0.4)] hover:border-[#C9A34A] hover:bg-[#173A63]"
              title={
                lang === 'ar'
                  ? (isDark ? 'التبديل إلى الوضع الفاتح' : 'التبديل إلى الوضع الداكن')
                  : (isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode')
              }
              aria-label="Toggle theme"
            >
              {isDark ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-[#DFC075]" />
                  <span>{lang === 'ar' ? 'فاتح' : 'Light'}</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-[#DFC075]" />
                  <span>{lang === 'ar' ? 'داكن' : 'Dark'}</span>
                </>
              )}
            </button>

            {/* Language Switcher */}
            <button
              onClick={toggleLang}
              className="inline-flex items-center justify-center gap-1.5 h-8 px-2.5 rounded-xs text-[#F8F9FC] hover:text-[#DFC075] hover:bg-white/5 transition-colors font-medium border border-[rgba(201,163,74,0.3)] cursor-pointer"
              title={lang === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}
            >
              <Globe className="w-3.5 h-3.5 text-[#DFC075]" />
              <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
            </button>

            {/* Admin Portal Link */}
            <button
              onClick={() => handleLinkClick(isAuthenticated ? '/admin' : '/admin/login')}
              className="inline-flex items-center justify-center gap-1 h-8 text-[#A9BBD1] hover:text-[#DFC075] transition-colors px-2 cursor-pointer"
              title={lang === 'ar' ? 'بوابة الإدارة والتسجيل' : 'Admin Portal'}
            >
              <Lock className="w-3 h-3 text-[#C9A34A]" />
              <span className="text-[11px] font-medium">
                {isAuthenticated ? (lang === 'ar' ? 'الإدارة' : 'Admin') : (lang === 'ar' ? 'دخول' : 'Portal')}
              </span>
            </button>
          </div>

          {/* 4. MOBILE MENU TRIGGER */}
          <div className="flex items-center gap-2 xl:hidden">
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-full border bg-[#102B4C] text-[#DFC075] border-[rgba(201,163,74,0.4)]"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Mobile Language Toggle */}
            <button
              onClick={toggleLang}
              className="px-2 py-1 rounded text-xs text-[#F8F9FC] border border-[rgba(201,163,74,0.3)] font-medium"
            >
              {lang === 'ar' ? 'EN' : 'عربي'}
            </button>

            {/* Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#F8F9FC] hover:bg-white/10 rounded-md transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#DFC075]" /> : <Menu className="w-6 h-6 text-[#DFC075]" />}
            </button>
          </div>
        </div>
      </div>

      {/* 5. RESPONSIVE MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#07182D] border-b border-[rgba(201,163,74,0.25)] px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  className={`text-start px-3 py-2.5 rounded-md text-sm font-medium transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-[#102B4C] text-[#DFC075] font-bold border-r-2 rtl:border-r-0 rtl:border-l-2 border-[#C9A34A]'
                      : 'text-[#F8F9FC] hover:bg-white/5 hover:text-[#DFC075]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {link.isVerify && <ShieldCheck className="w-4 h-4 text-[#DFC075]" />}
                    {link.label}
                  </span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#C9A34A]" />}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#A9BBD1] px-3">
            <button
              onClick={() => handleLinkClick(isAuthenticated ? '/admin' : '/admin/login')}
              className="inline-flex items-center gap-1.5 text-[#DFC075] hover:underline"
            >
              <Lock className="w-3.5 h-3.5 text-[#C9A34A]" />
              <span>{lang === 'ar' ? 'بوابة الإدارة والتسجيل' : 'Institutional Admin Portal'}</span>
            </button>
            <span className="font-mono text-[10px] text-slate-400">UKRLP: 10099520</span>
          </div>
        </div>
      )}
    </header>
  );
};
