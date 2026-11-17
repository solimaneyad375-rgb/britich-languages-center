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
    navVerify: 'التحقق من الشهادات',
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
    heroCtaVerify: 'تحقق من شهادتك الآن',
    heroBadgeUk: 'تعاون بريطاني موثق',
    heroStatStudents: '+5,000 طالب متدرب',
    heroStatCertificates: '+7,200 شهادة موثقة',
    heroStatPartners: '+45 شريك تعليمي',
    heroStatSuccess: '99.8% نسبة الموثوقية',

    // Quick Verification Snippet
    quickVerifyTitle: 'التحقق السريع من السجلات الرسمية',
    quickVerifyPlaceholder: 'أدخل رقم الشهادة (مثل: BCL-2026-00125) أو كود الطالب...',
    quickVerifyBtn: 'تحقق الآن',
    quickVerifyHelp: 'التحقق فوري ومباشر من قاعدة البيانات المركزية المشفرة.',

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
    verifyPageTitle: 'منظومة التحقق الرقمي من الشهادات',
    verifyPageSubtitle: 'أدخل رقم الشهادة أو كود الطالب للتحقق الفوري من سجل الاعتماد الرسمي',
    verifyInputLabel: 'رقم الشهادة أو كود الطالب:',
    verifyInputPlaceholder: 'مثال: BCL-CERT-2024-8841 أو BCL-STU-2024-001',
    verifyBtnSearch: 'التحقق من السجل',
    verifySearching: 'جاري الاستعلام من قاعدة البيانات المركزية...',
    verifyResultTitle: 'نتيجة التحقق من السجل الأكاديمي',
    verifyStatusValid: 'تم العثور على سجل الشهادة والتحقق من بياناتها',
    verifyStatusRevoked: 'الشهادة ملغاة بقرار إداري',
    verifyStatusExpired: 'شهادة منتهية الصلاحية',
    verifyStatusPending: 'سجل الشهادة قيد المراجعة',
    verifyStatusNotFound: 'لم يتم العثور على سجل بهذه البيانات',
    verifyStudentName: 'اسم الطالب:',
    verifyStudentId: 'كود الطالب:',
    verifyCertId: 'رقم الشهادة:',
    verifyCourse: 'البرنامج / الدورة:',
    verifyIssueDate: 'تاريخ الإصدار:',
    verifyExpiryDate: 'تاريخ الانتهاء:',
    verifyIssuingOrg: 'الجهة المصدرة:',
    verifyAccreditation: 'جهة التعاون والاعتماد:',
    verifyGrade: 'التقدير الأكاديمي:',
    verifyRevocationReason: 'سبب إلغاء الشهادة:',
    verifyRevokedAt: 'تاريخ الإلغاء:',
    verifyPrintBtn: 'طباعة إفادة التحقق الرسمية',
    verifyDownloadQr: 'تحميل رمز التحقق (QR)',
    verifyScanHint: 'امسح رمز QR للتحقق المباشر من هاتفك المحمول',

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
    adminNavCertificates: 'الشهادات',
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
    navVerify: 'Verification',
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
    heroCtaVerify: 'Verify Your Certificate',
    heroBadgeUk: 'Official UK Cooperation',
    heroStatStudents: '5,000+ Enrolled Students',
    heroStatCertificates: '7,200+ Verified Records',
    heroStatPartners: '45+ Partner Academies',
    heroStatSuccess: '99.8% Verification Trust',

    // Quick Verification Snippet
    quickVerifyTitle: 'Quick Official Registry Verification',
    quickVerifyPlaceholder: 'Enter Certificate ID (e.g., BCL-2026-00125) or Student ID...',
    quickVerifyBtn: 'Verify Now',
    quickVerifyHelp: 'Instant cryptographic query connected to our central database.',

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
    verifyPageTitle: 'Official Certificate Verification System',
    verifyPageSubtitle: 'Enter your Certificate ID or Student ID to verify the corresponding authentic registration record',
    verifyInputLabel: 'Certificate Reference or Student ID:',
    verifyInputPlaceholder: 'e.g., BCL-CERT-2024-8841 or BCL-STU-2024-001',
    verifyBtnSearch: 'Authenticate Record',
    verifySearching: 'Querying central encrypted registry database...',
    verifyResultTitle: 'Official Academic Record Authentication',
    verifyStatusValid: 'Certificate Record Verified',
    verifyStatusRevoked: 'Certificate Revoked',
    verifyStatusExpired: 'Certificate Expired',
    verifyStatusPending: 'Certificate Record Pending Review',
    verifyStatusNotFound: 'Certificate Record Not Found',
    verifyStudentName: 'Student Name:',
    verifyStudentId: 'Student Reference ID:',
    verifyCertId: 'Certificate ID:',
    verifyCourse: 'Program / Qualification:',
    verifyIssueDate: 'Issue Date:',
    verifyExpiryDate: 'Expiry Date:',
    verifyIssuingOrg: 'Issuing Organization:',
    verifyAccreditation: 'Cooperation & Accreditation Entity:',
    verifyGrade: 'Academic Standing:',
    verifyRevocationReason: 'Revocation Reason:',
    verifyRevokedAt: 'Revocation Date:',
    verifyPrintBtn: 'Print Official Verification Record',
    verifyDownloadQr: 'Download Verification QR Code',
    verifyScanHint: 'Scan QR code to open direct verification on your mobile device',

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
    adminNavCertificates: 'Certificates',
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

