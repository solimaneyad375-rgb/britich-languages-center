/*
 * Project Design & Development
 * Engineered by Eng. Eyad Ahmed
 * SpeedUp Software Solutions
 * © 2026 All Rights Reserved.
 */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  isRtl: boolean;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  ar: {
    // Brand
    brandName: 'المركز البريطاني لتعليم اللغات',
    brandNameEn: 'British Center for Languages',
    tagline: 'نحو تعليم مؤسسي، وتأهيل بمعايير احترافية، وآفاق دولية.',
    subTagline: 'مؤسسة تعليمية وتدريبية متخصصة في بناء الكوادر البشرية، والتأهيل والتطوير المؤسسي، ودعم المراكز والمؤسسات التعليمية والتدريبية.',
    officialUkPartner: 'UK International Education & Training',
    companiesHouseNum: '16605467',
    ukrlpNum: '10099520',

    // Nav
    navHome: 'الرئيسية',
    navAbout: 'من نحن',
    navServices: 'خدماتنا',
    navUkCooperation: 'التعاون البريطاني',
    navCertificates: 'الشهادات المعتمدة',
    navVerify: 'التحقق من الاعتماد',
    navPartners: 'شركاؤنا',
    navContact: 'اتصل بنا',
    navAdmin: 'لوحة التحكم',
    navLogin: 'دخول الإدارة',
    navLogout: 'تسجيل الخروج',

    // Hero
    heroHeadlinePart1: 'نحو تعليم مؤسسي رائد.',
    heroHeadlinePart2: 'وتأهيل بمعايير احترافية.',
    heroDesc: 'المركز البريطاني لتعليم اللغات مؤسسة تعليمية وتدريبية متخصصة في بناء وتأهيل الكوادر البشرية، والتطوير المؤسسي، ودعم المراكز والمؤسسات التعليمية والتدريبية وفق أرقى الممارسات الدولية.',
    heroCtaServices: 'استكشف خدماتنا',
    heroCtaVerify: 'التحقق من الاعتماد',
    heroBadgeUk: 'تعاون بريطاني موثق',
    heroStatStudents: '+5,000 طالب متدرب',
    heroStatCertificates: '+7,200 شهادة موثقة',
    heroStatPartners: '+45 شريك تعليمي',
    heroStatSuccess: '99.8% نسبة الموثوقية',

    // Quick Verification Snippet
    quickVerifyTitle: 'التحقق الفوري بالباركود الموحد',
    quickVerifyPlaceholder: 'أدخل كود الباركود الموحد (مثال: BC-QT-0047)...',
    quickVerifyBtn: 'فحص الباركود',
    quickVerifyHelp: 'المنظومة المركزية للتحقق من دفعات المتدربين والشهادات الصادرة بالباركود الموحد حتى 30 متدرباً.',

    // About Us
    aboutTitle: 'عن المركز البريطاني',
    aboutSubtitle: 'من نحن وما نقدمه للمجتمع التعليمي',
    aboutWhoWeAreTitle: 'من نحن',
    aboutWhoWeAreText: 'مؤسسة تعليمية وتدريبية متخصصة في بناء وتأهيل الكوادر البشرية، والتطوير المؤسسي، ودعم المراكز والمؤسسات التعليمية والتدريبية، وتقديم خدمات إصدار الشهادات والاعتمادات التعليمية والمهنية بالتعاون مع كبرى الأكاديميات والمراكز التعليمية.',
    aboutVisionTitle: 'رؤيتنا',
    aboutVisionText: 'الارتقاء بالمنظومة التعليمية والتدريبية من خلال تطوير الكوادر البشرية ودعم المؤسسات التعليمية وفق ممارسات مهنية منظمة تواكب متطلبات العصر.',
    aboutMissionTitle: 'رسالتنا',
    aboutMissionText: 'تمكين الأفراد وبناء قدراتهم التنافسية، والارتقاء بالأداء المؤسسي للشركاء، وتقديم خدمات تعليمية وتدريبية متطورة تسهم في بناء جيل من القادة والمهنيين المؤهلين.',
    aboutValuesTitle: 'قيمنا المؤسسية',
    aboutVal1: 'الأصالة والجودة الأكاديمية البريطانية',
    aboutVal2: 'الموثوقية والشفافية في إصدار السجلات',
    aboutVal3: 'التطوير المستمر وبناء الشراكات الاستراتيجية',
    aboutVal4: 'الحوكمة المهنية والالتزام بالمعايير القانونية',

    // Services
    servicesTitle: 'خدماتنا التعليمية والمؤسسية',
    servicesSubtitle: 'حلول متكاملة في التعليم، التدريب، الاعتماد والتطوير المؤسسي',
    serviceLearnMore: 'تفاصيل الخدمة',
    serviceClose: 'إغلاق',

    // UK Cooperation
    ukTitle: 'التعاون البريطاني والبيانات الرسمية',
    ukSubtitle: 'سجلات التسجيل والشراكة مع UK International Education & Training',
    ukPartnerLabel: 'جهة التعاون بالمملكة المتحدة:',
    ukCompaniesHouseLabel: 'رقم تسجيل الشركات (Companies House):',
    ukrlpLabel: 'رقم التسجيل بمزودي التعلم البريطاني (UKRLP):',
    ukLegalNoticeTitle: 'إشعار الشفافية والمسؤولية القانونية:',
    ukLegalNoticeText: 'يوضح المركز البريطاني لتعليم اللغات أن التسجيل لدى Companies House بالمملكة المتحدة والتسجيل في سجل مزودي التعلم البريطاني (UKRLP) لا يمثلان اعتماداً حكومياً تلقائياً من وزارة التعليم البريطانية لكافة الشهادات بشكل مطلق، وتصدر الشهادات وفق اتفاقيات التعاون ونطاق الصلاحيات المحدد لكل برنامج وأكاديمية شريكة.',

    // Verification Page
    verifyPageTitle: 'التحقق من الاعتماد',
    verifyPageSubtitle: 'أدخل رمز التحقق الخاص بك للتأكد من حالة اعتمادك.',
    verifyInputLabel: 'رمز التحقق:',
    verifyInputPlaceholder: 'أدخل رمز التحقق',
    verifyBtnSearch: 'تحقق الآن',
    verifySearching: 'جاري فحص رمز التحقق...',
    verifySuccessMessage:
      'تم التحقق بنجاح. نؤكد أن حامل رمز التحقق قد اجتاز الدورة التدريبية بنجاح، وأن تسجيله واعتماده مثبت لدى British Center for Languages.',
    verifyErrorMessage: 'رمز التحقق غير صحيح أو غير معتمد. يرجى مراجعة الرمز والمحاولة مرة أخرى.',
    verifyResultTitle: 'بيانات الاعتماد المؤسسي للمجموعة المعتمدة',
    verifyStatusValid: 'باركود موحد معتمد — تم التحقق من بيانات الدفعة والمؤسسة المصدرة',
    verifyStatusRevoked: 'الباركود الموحد ملغى بقرار إداري معتمد',
    verifyStatusExpired: 'الباركود الموحد منتهي الصلاحية',
    verifyStatusPending: 'سجل الباركود قيد المراجعة والاعتماد النهائي',
    verifyStatusNotFound: 'لم يتم العثور على أي باركود موحد مطابق لهذا الكود',
    verifyStudentName: 'اسم الطالب:',
    verifyStudentId: 'كود الطالب:',
    verifyCertId: 'كود الباركود الموحد:',
    verifyCourse: 'البرنامج التدريبي المعتمد:',
    verifyIssueDate: 'تاريخ اعتماد الدفعة:',
    verifyExpiryDate: 'تاريخ الانتهاء:',
    verifyIssuingOrg: 'الجهة المصدرة:',
    verifyAccreditation: 'جهة الاعتماد والتعاون الدولي:',
    verifyGrade: 'التقدير الأكاديمي:',
    verifyRevocationReason: 'سبب إلغاء الاعتماد:',
    verifyRevokedAt: 'تاريخ الإلغاء:',
    verifyPrintBtn: 'طباعة إفادة الدفعة الرسمية',
    verifyDownloadQr: 'تحميل باركود المجموعة',
    verifyScanHint: 'امسح الباركود أو الرمز للتحقق الفوري من صحة المجموعة المعتمدة',

    // ID Cards
    idCardTitle: 'بطاقات الهوية التعليمية للطلاب (Student ID Card)',
    idCardSubtitle: 'بطاقة تعريفية ذكية مزودة بباركود ورمز استجابة سريع QR للتحقق الفوري',
    idCardInstitution: 'BRITISH CENTER FOR LANGUAGES',
    idCardInstitutionAr: 'المركز البريطاني لتعليم اللغات',
    idCardPrintBtn: 'طباعة كارنيه الطالب',

    // Partners
    partnersTitle: 'المراكز والأكاديميات الشريكة',
    partnersSubtitle: 'نتعاون مع نخبة من المؤسسات التعليمية ومراكز التدريب المهني',
    partnerCategoryAll: 'الكل',

    // Contact
    contactTitle: 'تواصل مع المركز البريطاني',
    contactSubtitle: 'يسعدنا الرد على استفساراتكم حول البرامج، الاعتمادات، والشراكات المؤسسية',
    contactName: 'الاسم بالكامل',
    contactEmail: 'البريد الإلكتروني',
    contactPhone: 'رقم الهاتف / الواتساب',
    contactSubject: 'موضوع الرسالة',
    contactMessage: 'نص الرسالة أو الاستفسار',
    contactSubmit: 'إرسال الرسالة',
    contactSending: 'جاري الإرسال...',
    contactSuccess: 'تم إرسال رسالتك بنجاح! سيقوم فريق الشؤون الأكاديمية بالتواصل معك.',
    contactAddressTitle: 'المقر بالمملكة المتحدة:',
    contactEmailTitle: 'البريد الرسمي للاستفسارات:',
    contactVerifyDeskTitle: 'مكتب التحقق من الشهادات:',

    // Admin Dashboard
    adminTitle: 'بوابة الإدارة المركزية',
    adminSubtitle: 'نظام إدارة الطلاب، الشهادات، الكارنيهات، والتحقق الرقمي',
    adminNavOverview: 'نظرة عامة',
    adminNavStudents: 'الطلاب',
    adminNavCertificates: 'الباركود الموحد والشهادات',
    adminNavIdCards: 'الكارنيهات',
    adminNavPartners: 'الشركاء',
    adminNavLogs: 'سجلات التحقق',
    adminNavMessages: 'الرسائل الواردة',
    adminNavSettings: 'الإعدادات',
    adminStatTotalStudents: 'إجمالي الطلاب المسجلين',
    adminStatTotalCerts: 'إجمالي الشهادات المصدرة',
    adminStatValidCerts: 'الشهادات السارية المعتمدة',
    adminStatPendingCerts: 'شهادات قيد المراجعة',
    adminStatRevokedCerts: 'شهادات ملغاة',
    adminStatTotalPartners: 'الشركاء والأكاديميات',
    adminAddStudent: 'تسجيل طالب جديد',
    adminIssueCert: 'إصدار شهادة جديدة',
    adminRevokeCert: 'إلغاء شهادة',
    adminSearchPlaceholder: 'بحث بالاسم، الكود، أو الدورة...',
    adminSave: 'حفظ',
    adminCancel: 'إلغاء',
    adminConfirmRevoke: 'تأكيد الإلغاء',

    // Auth
    loginTitle: 'دخول البوابة الإدارية',
    loginSubtitle: 'الوصول مصرح به فقط لمسؤولي المركز البريطاني المعتمدين',
    loginUsername: 'اسم المستخدم',
    loginPassword: 'كلمة المرور',
    loginBtn: 'تسجيل الدخول',
    loginError: 'اسم المستخدم أو كلمة المرور غير صحيحة',
  },
  en: {
    // Brand
    brandName: 'British Center for Languages',
    brandNameAr: 'المركز البريطاني لتعليم اللغات',
    tagline: 'Excellence in Education, Building Future Leaders.',
    subTagline: 'An educational and training institution dedicated to human capacity building, institutional qualification, and supporting educational and training organizations.',
    officialUkPartner: 'UK International Education & Training',
    companiesHouseNum: '16605467',
    ukrlpNum: '10099520',

    // Nav
    navHome: 'Home',
    navAbout: 'About Us',
    navServices: 'Our Services',
    navUkCooperation: 'UK Cooperation',
    navCertificates: 'Academic Certificates',
    navVerify: 'Accreditation Verification',
    navPartners: 'Our Partners',
    navContact: 'Contact Us',
    navAdmin: 'Dashboard',
    navLogin: 'Staff Login',
    navLogout: 'Sign Out',

    // Hero
    heroHeadlinePart1: 'Empowering Education.',
    heroHeadlinePart2: 'Building Future Leaders.',
    heroDesc: 'British Center for Languages is an educational and training institution committed to developing human capabilities, supporting educational organizations, and advancing professional qualifications through strategic educational cooperation.',
    heroCtaServices: 'Explore Our Services',
    heroCtaVerify: 'Accreditation Verification',
    heroBadgeUk: 'Official UK Cooperation',
    heroStatStudents: '5,000+ Enrolled Students',
    heroStatCertificates: '7,200+ Verified Records',
    heroStatPartners: '45+ Partner Academies',
    heroStatSuccess: '99.8% Verification Trust',

    // Quick Verification Snippet
    quickVerifyTitle: 'Shared Barcode Cohort Verification',
    quickVerifyPlaceholder: 'Enter Shared Barcode (e.g. BC-QT-0047)...',
    quickVerifyBtn: 'Verify Barcode',
    quickVerifyHelp: 'Official system for verifying accredited student cohorts of up to 30 candidates per shared barcode.',

    // About Us
    aboutTitle: 'About British Center',
    aboutSubtitle: 'Our heritage, institutional vision, and commitment to educational excellence',
    aboutWhoWeAreTitle: 'Who We Are',
    aboutWhoWeAreText: 'An educational and training institution specialized in developing human capabilities, institutional development, supporting educational and training centers, and issuing accredited educational certificates in cooperation with global academies.',
    aboutVisionTitle: 'Our Vision',
    aboutVisionText: 'To contribute to developing an advanced educational and training ecosystem by empowering individuals and supporting educational institutions according to structured professional practices.',
    aboutMissionTitle: 'Our Mission',
    aboutMissionText: 'Empowering individuals, enhancing institutional performance, and supporting professional development through high-standard educational and training services.',
    aboutValuesTitle: 'Our Institutional Values',
    aboutVal1: 'British Academic Rigor and Educational Quality',
    aboutVal2: 'Transparency and Cryptographic Verification',
    aboutVal3: 'Strategic Educational Cooperation',
    aboutVal4: 'Institutional Integrity and Legal Compliance',

    // Services
    servicesTitle: 'Our Educational & Institutional Services',
    servicesSubtitle: 'Comprehensive solutions in professional training, institutional capacity, and credential validation',
    serviceLearnMore: 'Learn More',
    serviceClose: 'Close Details',

    // UK Cooperation
    ukTitle: 'Our UK Cooperation & Legal Registration',
    ukSubtitle: 'Official UK registration particulars and strategic institutional alliance',
    ukPartnerLabel: 'UK Cooperation Partner:',
    ukCompaniesHouseLabel: 'Companies House Registration Number:',
    ukrlpLabel: 'UK Register of Learning Providers (UKRLP):',
    ukLegalNoticeTitle: 'Institutional Compliance & Transparency Notice:',
    ukLegalNoticeText: 'British Center for Languages explicitly states that UK Companies House registration and UKRLP learning provider registration do not constitute automatic UK government department accreditation of certificates. All credentials are issued under specific institutional cooperation agreements and defined academic scopes.',

    // Verification Page
    verifyPageTitle: 'Accreditation Verification',
    verifyPageSubtitle: 'Enter your verification code to confirm your accreditation status.',
    verifyInputLabel: 'Verification Code:',
    verifyInputPlaceholder: 'Enter verification code',
    verifyBtnSearch: 'Verify Now',
    verifySearching: 'Verifying accreditation code...',
    verifySuccessMessage:
      'Verification successful. We confirm that the bearer of this verification code has successfully passed the training course, and that their registration and accreditation are officially verified with British Center for Languages.',
    verifyErrorMessage: 'The verification code is invalid or unaccredited. Please check the code and try again.',
    verifyResultTitle: 'Official Shared Barcode Cohort Dossier',
    verifyStatusValid: 'Accredited Shared Barcode — Group Dossier Authenticated',
    verifyStatusRevoked: 'Shared Barcode Revoked by Administrative Decision',
    verifyStatusExpired: 'Shared Barcode Validity Period Expired',
    verifyStatusPending: 'Shared Barcode Record Pending Final Approval',
    verifyStatusNotFound: 'Shared Barcode Not Found in Registry',
    verifyStudentName: 'Student Name:',
    verifyStudentId: 'Student ID:',
    verifyCertId: 'Shared Barcode ID:',
    verifyCourse: 'Accredited Program:',
    verifyIssueDate: 'Cohort Issue Date:',
    verifyExpiryDate: 'Expiry Date:',
    verifyIssuingOrg: 'Issuing Organization:',
    verifyAccreditation: 'Accreditation & Strategic Partner:',
    verifyGrade: 'Academic Standing:',
    verifyRevocationReason: 'Revocation Reason:',
    verifyRevokedAt: 'Revocation Date:',
    verifyPrintBtn: 'Print Official Cohort Dossier',
    verifyDownloadQr: 'Download Barcode & QR Record',
    verifyScanHint: 'Scan barcode or QR code for instant cohort authentication',

    // ID Cards
    idCardTitle: 'Official Student Identification Cards',
    idCardSubtitle: 'Smart academic credentials featuring encrypted barcode and unique QR verification',
    idCardInstitution: 'BRITISH CENTER FOR LANGUAGES',
    idCardInstitutionAr: 'المركز البريطاني لتعليم اللغات',
    idCardPrintBtn: 'Print Student ID Card',

    // Partners
    partnersTitle: 'Our Cooperating Partners & Academies',
    partnersSubtitle: 'Strategic educational alliances advancing training quality worldwide',
    partnerCategoryAll: 'All Categories',

    // Contact
    contactTitle: 'Contact British Center',
    contactSubtitle: 'Get in touch with our academic affairs and institutional cooperation desks',
    contactName: 'Full Name',
    contactEmail: 'Email Address',
    contactPhone: 'Phone / WhatsApp',
    contactSubject: 'Subject',
    contactMessage: 'Message or Inquiries',
    contactSubmit: 'Submit Inquiry',
    contactSending: 'Sending message...',
    contactSuccess: 'Thank you. Your message has been received by our academic advisory team.',
    contactAddressTitle: 'UK Head Office:',
    contactEmailTitle: 'General Inquiries:',
    contactVerifyDeskTitle: 'Verification Registry Desk:',

    // Admin Dashboard
    adminTitle: 'Central Administrative Dashboard',
    adminSubtitle: 'Registry management for students, certificates, ID cards, and verification telemetry',
    adminNavOverview: 'Overview',
    adminNavStudents: 'Students',
    adminNavCertificates: 'Shared Barcodes & Certificates',
    adminNavIdCards: 'ID Cards',
    adminNavPartners: 'Partners',
    adminNavLogs: 'Verification Logs',
    adminNavMessages: 'Messages',
    adminNavSettings: 'Settings',
    adminStatTotalStudents: 'Total Registered Students',
    adminStatTotalCerts: 'Total Issued Certificates',
    adminStatValidCerts: 'Valid Certified Records',
    adminStatPendingCerts: 'Pending Registry Review',
    adminStatRevokedCerts: 'Revoked Records',
    adminStatTotalPartners: 'Active Educational Partners',
    adminAddStudent: 'Register Student',
    adminIssueCert: 'Issue Certificate',
    adminRevokeCert: 'Revoke Certificate',
    adminSearchPlaceholder: 'Search by name, ID, or course...',
    adminSave: 'Save Record',
    adminCancel: 'Cancel',
    adminConfirmRevoke: 'Confirm Revocation',

    // Auth
    loginTitle: 'Institutional Administration Login',
    loginSubtitle: 'Authorized access only for accredited British Center personnel',
    loginUsername: 'Username',
    loginPassword: 'Password',
    loginBtn: 'Sign In to Dashboard',
    loginError: 'Invalid administrator credentials provided.',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('bcl_lang') as Language;
    return saved === 'en' ? 'en' : 'ar'; // Default: Arabic
  });

  const isRtl = lang === 'ar';

  useEffect(() => {
    localStorage.setItem('bcl_lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    if (document.body) {
      document.body.dir = isRtl ? 'rtl' : 'ltr';
    }
  }, [lang, isRtl]);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
  };

  const toggleLang = () => {
    setLangState((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const t = (key: string): string => {
    return translations[lang][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, isRtl, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

