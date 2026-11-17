/*
 * Project Design & Development
 * Engineered by Eng. Eyad Ahmed
 * SpeedUp Software Solutions
 * © 2026 All Rights Reserved.
 */
import {
  Student,
  Certificate,
  Partner,
  ServiceItem,
  ContactMessage,
  DashboardStats,
  PublicVerificationResponse,
  WebsiteSettings,
  ActivityLog,
  StudentIdCard,
} from '../types';

const STORAGE_KEYS = {
  STUDENTS: 'bcl_students_data',
  CERTIFICATES: 'bcl_certificates_data',
  PARTNERS: 'bcl_partners_data',
  SETTINGS: 'bcl_website_settings_data',
  ACTIVITY_LOGS: 'bcl_activity_logs_data',
  MESSAGES: 'bcl_contact_messages_data',
  VERIFICATION_COUNT: 'bcl_verification_count_data',
};

// Default Website Content
const DEFAULT_SETTINGS: WebsiteSettings = {
  homepageHeadlineEn: 'Excellence in Education, Building Future Leaders.',
  homepageHeadlineAr: 'نحو تعليم مؤسسي... وتأهيل بمعايير احترافية... وآفاق دولية.',
  homepageDescEn:
    'British Center for Languages is an educational and training institution committed to developing human capabilities, institutional empowerment, and supporting educational and training centers.',
  homepageDescAr:
    'مؤسسة تعليمية وتدريبية متخصصة في بناء الكوادر البشرية، والتأهيل والتطوير المؤسسي، ودعم المراكز والمؤسسات التعليمية والتدريبية.',
  aboutWhoWeAreEn:
    'An educational and training institution dedicated to human capacity building, institutional qualification, and supporting educational and training organizations through rigorous British benchmarks.',
  aboutWhoWeAreAr:
    'مؤسسة تعليمية وتدريبية متخصصة في بناء الكوادر البشرية، والتأهيل والتطوير المؤسسي، ودعم المراكز والمؤسسات التعليمية والتدريبية.',
  sloganEn: 'Excellence in Education, Building Future Leaders.',
  sloganAr: 'نحو تعليم مؤسسي... وتأهيل بمعايير احترافية... وآفاق دولية.',
  contactPhone: '+20 15 09949401',
  contactEmail: 'info@britishcenter.uk',
  contactAddressEn: '27 Old Gloucester Street, London, WC1N 3AX, United Kingdom',
  contactAddressAr: '27 شارع أولد جلوستر، لندن، WC1N 3AX، المملكة المتحدة',
  companiesHouse: '16605467',
  ukrlp: '10099520',
};

// Initial Seed Data for Students
const DEFAULT_STUDENTS: Student[] = [
  {
    id: 1,
    studentIdNumber: 'BCL-STU-2026-001',
    fullNameEn: 'Alexander James Sterling',
    fullNameAr: 'ألكسندر جيمس ستيرلنج',
    email: 'alexander.sterling@example.co.uk',
    phone: '+44 7700 900123',
    programEn: 'Executive Diploma in Advanced English & Institutional Leadership',
    programAr: 'الدبلوم التنفيذي في اللغة الإنجليزية المتقدمة والقيادة المؤسسية',
    academyEn: 'UK International Education & Training',
    academyAr: 'التعليم والتدريب الدولي البريطاني',
    status: 'Active',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    registrationDate: '2026-01-10',
    createdAt: '2026-01-10T09:00:00Z',
  },
  {
    id: 2,
    studentIdNumber: 'BCL-STU-2026-002',
    fullNameEn: 'Fatima Al-Zahra Mansour',
    fullNameAr: 'فاطمة الزهراء منصور',
    email: 'fatima.mansour@example.com',
    phone: '+971 50 123 4567',
    programEn: 'Professional Business English & International Translation',
    programAr: 'اللغة الإنجليزية للأعمال والترجمة الدولية المعتمدة',
    academyEn: 'British Center for Languages',
    academyAr: 'المركز البريطاني لتعليم اللغات',
    status: 'Active',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    registrationDate: '2026-02-14',
    createdAt: '2026-02-14T10:30:00Z',
  },
  {
    id: 3,
    studentIdNumber: 'BCL-STU-2026-003',
    fullNameEn: 'Tarek Mahmoud El-Sayed',
    fullNameAr: 'طارق محمود السيد',
    email: 'tarek.elsayed@example.com',
    phone: '+20 100 123 4567',
    programEn: 'Educational Quality & Institutional Assessment',
    programAr: 'الجودة التعليمية والتقييم المؤسسي',
    academyEn: 'Academic Alliances UK',
    academyAr: 'التحالفات الأكاديمية البريطانية',
    status: 'Suspended',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    registrationDate: '2026-01-20',
    createdAt: '2026-01-20T11:15:00Z',
  },
  {
    id: 4,
    studentIdNumber: 'BCL-STU-2026-004',
    fullNameEn: 'Sarah Elizabeth Jenkins',
    fullNameAr: 'سارة إليزابيث جنكينز',
    email: 'sarah.jenkins@example.co.uk',
    phone: '+44 7700 900456',
    programEn: 'Foundations of Academic English & Phonetics',
    programAr: 'أسس اللغة الإنجليزية الأكاديمية وعلم الصوتيات',
    academyEn: 'UK International Education & Training',
    academyAr: 'التعليم والتدريب الدولي البريطاني',
    status: 'Graduated',
    photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    registrationDate: '2025-03-01',
    createdAt: '2025-03-01T08:45:00Z',
  },
  {
    id: 5,
    studentIdNumber: 'BCL-STU-2026-005',
    fullNameEn: 'Omar Khaled Al-Nuaimi',
    fullNameAr: 'عمر خالد النعيمي',
    email: 'omar.nuaimi@example.com',
    phone: '+966 55 987 6543',
    programEn: 'Modern Institutional Curriculum Design',
    programAr: 'تصميم المناهج التعليمية والمؤسسية الحديثة',
    academyEn: 'British Center for Languages',
    academyAr: 'المركز البريطاني لتعليم اللغات',
    status: 'Active',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    registrationDate: '2026-03-01',
    createdAt: '2026-03-01T12:00:00Z',
  },
];

// Initial Seed Data for Certificates
const DEFAULT_CERTIFICATES: Certificate[] = [
  {
    id: 1,
    certificateNumber: 'BCL-2026-00125',
    uniqueToken: 'd9a7c3b2e1f44567890abcdef1234567',
    studentId: 1,
    studentNameEn: 'Alexander James Sterling',
    studentNameAr: 'ألكسندر جيمس ستيرلنج',
    studentIdNumber: 'BCL-STU-2026-001',
    courseNameEn: 'Executive Diploma in Advanced English & Institutional Leadership',
    courseNameAr: 'الدبلوم التنفيذي في اللغة الإنجليزية المتقدمة والقيادة المؤسسية',
    issueDate: '2026-06-15',
    issuingOrganizationEn: 'British Center for Languages',
    issuingOrganizationAr: 'المركز البريطاني لتعليم اللغات',
    accreditingEntityEn: 'UK International Education & Training',
    accreditingEntityAr: 'التعليم والتدريب الدولي البريطاني',
    status: 'Valid',
    gradeEn: 'Distinction',
    gradeAr: 'امتياز مع مرتبة الشرف',
    createdAt: '2026-06-15T10:00:00Z',
  },
  {
    id: 2,
    certificateNumber: 'BCL-2026-00841',
    uniqueToken: 'e8b6d5c4a3f210987654321fedcba098',
    studentId: 2,
    studentNameEn: 'Fatima Al-Zahra Mansour',
    studentNameAr: 'فاطمة الزهراء منصور',
    studentIdNumber: 'BCL-STU-2026-002',
    courseNameEn: 'Professional Business English & International Translation',
    courseNameAr: 'اللغة الإنجليزية للأعمال والترجمة الدولية المعتمدة',
    issueDate: '2026-07-10',
    issuingOrganizationEn: 'British Center for Languages',
    issuingOrganizationAr: 'المركز البريطاني لتعليم اللغات',
    accreditingEntityEn: 'UK International Education & Training',
    accreditingEntityAr: 'التعليم والتدريب الدولي البريطاني',
    status: 'Valid',
    gradeEn: 'Excellent',
    gradeAr: 'ممتاز',
    createdAt: '2026-07-10T11:00:00Z',
  },
  {
    id: 3,
    certificateNumber: 'BCL-2026-00731',
    uniqueToken: 'f7c5e4d3b2a10987654321fedcba112',
    studentId: 3,
    studentNameEn: 'Tarek Mahmoud El-Sayed',
    studentNameAr: 'طارق محمود السيد',
    studentIdNumber: 'BCL-STU-2026-003',
    courseNameEn: 'Educational Quality & Institutional Assessment',
    courseNameAr: 'الجودة التعليمية والتقييم المؤسسي',
    issueDate: '2026-04-01',
    issuingOrganizationEn: 'British Center for Languages',
    issuingOrganizationAr: 'المركز البريطاني لتعليم اللغات',
    accreditingEntityEn: 'UK International Education & Training',
    accreditingEntityAr: 'التعليم والتدريب الدولي البريطاني',
    status: 'Revoked',
    revocationReason:
      'Administrative decision: candidate breached examination compliance rules / قرار إداري: مخالفة ضوابط الامتحانات المعتمدة',
    revokedAt: '2026-05-12T14:30:00Z',
    createdAt: '2026-04-01T09:00:00Z',
  },
  {
    id: 4,
    certificateNumber: 'BCL-2025-00410',
    uniqueToken: 'a1b2c3d4e5f67890abcdef1234567890',
    studentId: 4,
    studentNameEn: 'Sarah Elizabeth Jenkins',
    studentNameAr: 'سارة إليزابيث جنكينز',
    studentIdNumber: 'BCL-STU-2026-004',
    courseNameEn: 'Foundations of Academic English & Phonetics',
    courseNameAr: 'أسس اللغة الإنجليزية الأكاديمية وعلم الصوتيات',
    issueDate: '2025-03-10',
    expiryDate: '2026-03-10',
    issuingOrganizationEn: 'British Center for Languages',
    issuingOrganizationAr: 'المركز البريطاني لتعليم اللغات',
    accreditingEntityEn: 'UK International Education & Training',
    accreditingEntityAr: 'التعليم والتدريب الدولي البريطاني',
    status: 'Expired',
    gradeEn: 'Good',
    gradeAr: 'جيد',
    createdAt: '2025-03-10T14:00:00Z',
  },
];

// Initial Seed Data for Partners
const DEFAULT_PARTNERS: Partner[] = [
  {
    id: 1,
    nameEn: 'UK International Education & Training',
    nameAr: 'التعليم والتدريب الدولي البريطاني',
    descriptionEn: 'Strategic UK educational collaboration partner. Companies House: 16605467, UKRLP: 10099520.',
    descriptionAr: 'شريك التعاون التعليمي البريطاني الاستراتيجي. السجل التجاري: 16605467، سجل مزودي التعليم: 10099520.',
    category: 'International Strategic Partner',
    orderIndex: 1,
    isActive: true,
  },
  {
    id: 2,
    nameEn: 'Cambridge Global Academic Alliances',
    nameAr: 'التحالف الأكاديمي الدولي كامبريدج',
    descriptionEn: 'Joint professional development and curriculum evaluation partner.',
    descriptionAr: 'شراكة التطوير المهني المشترك وتقييم المناهج والمخرجات الأكاديمية.',
    category: 'Academic Alliances',
    orderIndex: 2,
    isActive: true,
  },
  {
    id: 3,
    nameEn: 'Oxford Professional Development Council',
    nameAr: 'مجلس أكسفورد للتطوير المهني',
    descriptionEn: 'Leadership qualification and institutional capacity support.',
    descriptionAr: 'برامج التأهيل القيادي ودعم القدرات المؤسسية للمراكز التعليمية.',
    category: 'Professional Qualification',
    orderIndex: 3,
    isActive: true,
  },
  {
    id: 4,
    nameEn: 'London Academy of Educational Excellence',
    nameAr: 'أكاديمية لندن للتميز التعليمي',
    descriptionEn: 'Pedagogical training and educational certificate standardization.',
    descriptionAr: 'التدريب التربوي وتوحيد معايير إصدار الشهادات والاعتمادات التعليمية.',
    category: 'Educational Development',
    orderIndex: 4,
    isActive: true,
  },
];

// Initial Activity Logs
const DEFAULT_ACTIVITIES: ActivityLog[] = [
  {
    id: 'act-1',
    action: 'Certificate Verified',
    actionAr: 'تم التحقق من شهادة',
    details: 'Certificate BCL-2026-00125 verified successfully via public portal',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    type: 'verification',
  },
  {
    id: 'act-2',
    action: 'Student Registered',
    actionAr: 'تسجيل طالب جديد',
    details: 'Enrolled Omar Khaled Al-Nuaimi into Modern Institutional Curriculum Design',
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    type: 'student',
  },
  {
    id: 'act-3',
    action: 'Certificate Issued',
    actionAr: 'إصدار شهادة معتمدة',
    details: 'Issued BCL-2026-00841 for Fatima Al-Zahra Mansour',
    timestamp: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
    type: 'certificate',
  },
  {
    id: 'act-4',
    action: 'Partner Affiliated',
    actionAr: 'إضافة جهة شريكة',
    details: 'Affiliated London Academy of Educational Excellence',
    timestamp: new Date(Date.now() - 1000 * 60 * 1440).toISOString(),
    type: 'partner',
  },
];

// Safe LocalStorage Helper
class StorageService {
  private notifyChange() {
    window.dispatchEvent(new Event('bcl_storage_updated'));
  }

  // Initialize storage with defaults if not already present
  public initStorage(): void {
    if (!localStorage.getItem(STORAGE_KEYS.STUDENTS)) {
      localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(DEFAULT_STUDENTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CERTIFICATES)) {
      localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(DEFAULT_CERTIFICATES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.PARTNERS)) {
      localStorage.setItem(STORAGE_KEYS.PARTNERS, JSON.stringify(DEFAULT_PARTNERS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ACTIVITY_LOGS)) {
      localStorage.setItem(STORAGE_KEYS.ACTIVITY_LOGS, JSON.stringify(DEFAULT_ACTIVITIES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.VERIFICATION_COUNT)) {
      localStorage.setItem(STORAGE_KEYS.VERIFICATION_COUNT, '184');
    }
  }

  // Reset to default demo data
  public resetDemoData(): void {
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(DEFAULT_STUDENTS));
    localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(DEFAULT_CERTIFICATES));
    localStorage.setItem(STORAGE_KEYS.PARTNERS, JSON.stringify(DEFAULT_PARTNERS));
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
    localStorage.setItem(STORAGE_KEYS.ACTIVITY_LOGS, JSON.stringify(DEFAULT_ACTIVITIES));
    localStorage.setItem(STORAGE_KEYS.VERIFICATION_COUNT, '184');
    this.notifyChange();
  }

  // --- Students CRUD ---
  public getStudents(): Student[] {
    this.initStorage();
    try {
      const data = localStorage.getItem(STORAGE_KEYS.STUDENTS);
      return data ? JSON.parse(data) : DEFAULT_STUDENTS;
    } catch {
      return DEFAULT_STUDENTS;
    }
  }

  public getStudentById(id: number): Student | undefined {
    return this.getStudents().find((s) => s.id === id);
  }

  public getStudentByIdNumber(studentIdNumber: string): Student | undefined {
    return this.getStudents().find(
      (s) => s.studentIdNumber.toLowerCase().trim() === studentIdNumber.toLowerCase().trim()
    );
  }

  public addStudent(studentData: Omit<Student, 'id' | 'createdAt'>): Student {
    const students = this.getStudents();
    const newId = students.length > 0 ? Math.max(...students.map((s) => s.id)) + 1 : 1;
    const newStudent: Student = {
      ...studentData,
      id: newId,
      createdAt: new Date().toISOString(),
    };
    students.unshift(newStudent);
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));

    this.logActivity(
      'Student Added',
      'إضافة طالب جديد',
      `Registered student ${newStudent.fullNameEn} (${newStudent.studentIdNumber})`,
      'student'
    );

    this.notifyChange();
    return newStudent;
  }

  public updateStudent(id: number, updates: Partial<Student>): Student | null {
    const students = this.getStudents();
    const index = students.findIndex((s) => s.id === id);
    if (index === -1) return null;

    const updated = { ...students[index], ...updates };
    students[index] = updated;
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));

    this.logActivity(
      'Student Updated',
      'تحديث بيانات طالب',
      `Updated profile of ${updated.fullNameEn} (${updated.studentIdNumber})`,
      'student'
    );

    this.notifyChange();
    return updated;
  }

  public deleteStudent(id: number): boolean {
    const students = this.getStudents();
    const target = students.find((s) => s.id === id);
    if (!target) return false;

    const filtered = students.filter((s) => s.id !== id);
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(filtered));

    this.logActivity(
      'Student Removed',
      'حذف سجل طالب',
      `Removed student ${target.fullNameEn} (${target.studentIdNumber})`,
      'student'
    );

    this.notifyChange();
    return true;
  }

  // --- Certificates CRUD ---
  public getCertificates(): Certificate[] {
    this.initStorage();
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CERTIFICATES);
      return data ? JSON.parse(data) : DEFAULT_CERTIFICATES;
    } catch {
      return DEFAULT_CERTIFICATES;
    }
  }

  public generateCertificateId(): string {
    const random = Math.floor(10000 + Math.random() * 90000);
    return `BCL-2026-${random}`;
  }

  public addCertificate(certData: Omit<Certificate, 'id' | 'createdAt' | 'uniqueToken'>): Certificate {
    const certs = this.getCertificates();
    const newId = certs.length > 0 ? Math.max(...certs.map((c) => c.id)) + 1 : 1;
    const uniqueToken = Array.from({ length: 32 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join('');

    const newCert: Certificate = {
      ...certData,
      id: newId,
      uniqueToken,
      createdAt: new Date().toISOString(),
    };

    certs.unshift(newCert);
    localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(certs));

    this.logActivity(
      'Certificate Issued',
      'إصدار شهادة معتمدة',
      `Issued credential ${newCert.certificateNumber} for ${newCert.studentNameEn}`,
      'certificate'
    );

    this.notifyChange();
    return newCert;
  }

  public updateCertificate(id: number, updates: Partial<Certificate>): Certificate | null {
    const certs = this.getCertificates();
    const index = certs.findIndex((c) => c.id === id);
    if (index === -1) return null;

    const updated = { ...certs[index], ...updates };
    certs[index] = updated;
    localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(certs));

    this.logActivity(
      'Certificate Updated',
      'تحديث بيانات شهادة',
      `Updated credential ${updated.certificateNumber}`,
      'certificate'
    );

    this.notifyChange();
    return updated;
  }

  public changeCertificateStatus(
    id: number,
    status: 'Valid' | 'Revoked' | 'Expired',
    reason?: string
  ): Certificate | null {
    const certs = this.getCertificates();
    const index = certs.findIndex((c) => c.id === id);
    if (index === -1) return null;

    const cert = certs[index];
    cert.status = status;
    if (status === 'Revoked') {
      cert.revocationReason = reason || 'Revoked by institutional administration / قرار إداري';
      cert.revokedAt = new Date().toISOString();
    } else {
      cert.revocationReason = undefined;
      cert.revokedAt = undefined;
    }

    certs[index] = cert;
    localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(certs));

    this.logActivity(
      `Certificate ${status}`,
      `تغيير حالة شهادة إلى ${status}`,
      `Status of ${cert.certificateNumber} changed to ${status}${reason ? ` (${reason})` : ''}`,
      'certificate'
    );

    this.notifyChange();
    return cert;
  }

  public deleteCertificate(id: number): boolean {
    const certs = this.getCertificates();
    const target = certs.find((c) => c.id === id);
    if (!target) return false;

    const filtered = certs.filter((c) => c.id !== id);
    localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(filtered));

    this.logActivity(
      'Certificate Deleted',
      'حذف سجل شهادة',
      `Deleted credential record ${target.certificateNumber}`,
      'certificate'
    );

    this.notifyChange();
    return true;
  }

  // --- Public Certificate Verification ---
  public verifyCertificate(queryTerm: string): PublicVerificationResponse {
    this.initStorage();
    const normalized = queryTerm.toLowerCase().trim();

    // Increment verification counter
    const currentCount = parseInt(localStorage.getItem(STORAGE_KEYS.VERIFICATION_COUNT) || '184', 10);
    localStorage.setItem(STORAGE_KEYS.VERIFICATION_COUNT, (currentCount + 1).toString());

    if (!normalized) {
      return {
        isFound: false,
        isValid: false,
        status: 'NotFound',
        statusBadgeColor: 'gray',
        messageEn: 'Please enter a valid Certificate Reference Number or Student ID.',
        messageAr: 'يرجى إدخال رقم مرجعي صحيح للشهادة أو الرقم التعريفي للطالب.',
      };
    }

    const certs = this.getCertificates();
    const students = this.getStudents();

    // Match by Certificate Number, Unique Token, or Student ID Number
    const cert = certs.find(
      (c) =>
        c.certificateNumber.toLowerCase().trim() === normalized ||
        c.uniqueToken.toLowerCase().trim() === normalized ||
        c.studentIdNumber.toLowerCase().trim() === normalized ||
        // Support legacy/alias queries
        (normalized === 'bcl-cert-2024-8841' && c.certificateNumber === 'BCL-2026-00125') ||
        (normalized === 'bcl-cert-2024-9124' && c.certificateNumber === 'BCL-2026-00841') ||
        (normalized === 'bcl-cert-2024-7731' && c.certificateNumber === 'BCL-2026-00731') ||
        (normalized === 'bcl-cert-2023-4102' && c.certificateNumber === 'BCL-2025-00410') ||
        (normalized === 'bcl-stu-2024-001' && c.studentIdNumber === 'BCL-STU-2026-001') ||
        (normalized === 'bcl-stu-2024-002' && c.studentIdNumber === 'BCL-STU-2026-002') ||
        (normalized === 'bcl-stu-2024-003' && c.studentIdNumber === 'BCL-STU-2026-003')
    );

    if (!cert) {
      this.logActivity(
        'Verification Query',
        'استعلام تحقق',
        `Searched for "${queryTerm}" — Record Not Found`,
        'verification'
      );

      return {
        isFound: false,
        isValid: false,
        status: 'NotFound',
        statusBadgeColor: 'gray',
        messageEn:
          'Certificate Not Found. No matching official institutional registration record exists for this reference.',
        messageAr:
          'لم يتم العثور على سجل الشهادة. لا يوجد سجل رسمي مطابق لهذا الرقم في قاعدة بيانات المركز البريطاني.',
      };
    }

    const student = students.find((s) => s.id === cert.studentId);
    const qrUrl = `${window.location.origin}/verify?certificate=${encodeURIComponent(cert.certificateNumber)}`;

    if (cert.status === 'Revoked') {
      this.logActivity(
        'Revoked Certificate Viewed',
        'معاينة شهادة ملغاة',
        `Credential ${cert.certificateNumber} queried — Status: Revoked`,
        'verification'
      );

      return {
        isFound: true,
        isValid: false,
        status: 'Revoked',
        statusBadgeColor: 'red',
        messageEn: 'Certificate Revoked. This certificate has been officially cancelled by administrative decision.',
        messageAr: 'تم إلغاء الشهادة رسمياً بقرار إداري معتمد وأصبحت لاغية وغير صالحة للاستخدام.',
        studentNameEn: cert.studentNameEn,
        studentNameAr: cert.studentNameAr,
        studentIdNumber: cert.studentIdNumber,
        certificateNumber: cert.certificateNumber,
        uniqueToken: cert.uniqueToken,
        courseNameEn: cert.courseNameEn,
        courseNameAr: cert.courseNameAr,
        issueDate: cert.issueDate,
        issuingOrganizationEn: cert.issuingOrganizationEn,
        issuingOrganizationAr: cert.issuingOrganizationAr,
        accreditingEntityEn: cert.accreditingEntityEn,
        accreditingEntityAr: cert.accreditingEntityAr,
        revocationReason: cert.revocationReason,
        revokedAt: cert.revokedAt,
        qrVerificationUrl: qrUrl,
      };
    }

    if (cert.status === 'Expired') {
      return {
        isFound: true,
        isValid: false,
        status: 'Expired',
        statusBadgeColor: 'amber',
        messageEn: 'Certificate Expired. The authorized validity duration of this credential has elapsed.',
        messageAr: 'انتهت صلاحية الشهادة. لقد انقضت المدة الزمنية المحددة لسريان هذا الاعتماد.',
        studentNameEn: cert.studentNameEn,
        studentNameAr: cert.studentNameAr,
        studentIdNumber: cert.studentIdNumber,
        certificateNumber: cert.certificateNumber,
        uniqueToken: cert.uniqueToken,
        courseNameEn: cert.courseNameEn,
        courseNameAr: cert.courseNameAr,
        issueDate: cert.issueDate,
        expiryDate: cert.expiryDate,
        issuingOrganizationEn: cert.issuingOrganizationEn,
        issuingOrganizationAr: cert.issuingOrganizationAr,
        accreditingEntityEn: cert.accreditingEntityEn,
        accreditingEntityAr: cert.accreditingEntityAr,
        gradeEn: cert.gradeEn,
        gradeAr: cert.gradeAr,
        qrVerificationUrl: qrUrl,
      };
    }

    // Valid Certificate
    this.logActivity(
      'Certificate Verified',
      'توثيق شهادة معتمدة',
      `Credential ${cert.certificateNumber} verified successfully for ${cert.studentNameEn}`,
      'verification'
    );

    return {
      isFound: true,
      isValid: true,
      status: 'Valid',
      statusBadgeColor: 'emerald',
      messageEn:
        'Certificate Record Verified. The credential has been authenticated against the official institution registry.',
      messageAr: 'تم العثور على سجل الشهادة والتحقق من صحة بياناتها وسريان اعتمادها رسمياً.',
      studentNameEn: cert.studentNameEn,
      studentNameAr: cert.studentNameAr,
      studentIdNumber: cert.studentIdNumber,
      certificateNumber: cert.certificateNumber,
      uniqueToken: cert.uniqueToken,
      courseNameEn: cert.courseNameEn,
      courseNameAr: cert.courseNameAr,
      issueDate: cert.issueDate,
      expiryDate: cert.expiryDate,
      issuingOrganizationEn: cert.issuingOrganizationEn,
      issuingOrganizationAr: cert.issuingOrganizationAr,
      accreditingEntityEn: cert.accreditingEntityEn,
      accreditingEntityAr: cert.accreditingEntityAr,
      gradeEn: cert.gradeEn,
      gradeAr: cert.gradeAr,
      qrVerificationUrl: qrUrl,
    };
  }

  // --- Partners CRUD ---
  public getPartners(): Partner[] {
    this.initStorage();
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PARTNERS);
      return data ? JSON.parse(data) : DEFAULT_PARTNERS;
    } catch {
      return DEFAULT_PARTNERS;
    }
  }

  public addPartner(partnerData: Omit<Partner, 'id'>): Partner {
    const partners = this.getPartners();
    const newId = partners.length > 0 ? Math.max(...partners.map((p) => p.id)) + 1 : 1;
    const newPartner: Partner = {
      ...partnerData,
      id: newId,
    };
    partners.push(newPartner);
    localStorage.setItem(STORAGE_KEYS.PARTNERS, JSON.stringify(partners));

    this.logActivity(
      'Partner Added',
      'إضافة شريك جديد',
      `Affiliated partner organization: ${newPartner.nameEn}`,
      'partner'
    );

    this.notifyChange();
    return newPartner;
  }

  public updatePartner(id: number, updates: Partial<Partner>): Partner | null {
    const partners = this.getPartners();
    const index = partners.findIndex((p) => p.id === id);
    if (index === -1) return null;

    const updated = { ...partners[index], ...updates };
    partners[index] = updated;
    localStorage.setItem(STORAGE_KEYS.PARTNERS, JSON.stringify(partners));

    this.logActivity('Partner Updated', 'تحديث بيانات شريك', `Updated partner ${updated.nameEn}`, 'partner');

    this.notifyChange();
    return updated;
  }

  public deletePartner(id: number): boolean {
    const partners = this.getPartners();
    const target = partners.find((p) => p.id === id);
    if (!target) return false;

    const filtered = partners.filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PARTNERS, JSON.stringify(filtered));

    this.logActivity('Partner Removed', 'حذف شريك', `Removed partner ${target.nameEn}`, 'partner');

    this.notifyChange();
    return true;
  }

  // --- Website Content Settings ---
  public getWebsiteSettings(): WebsiteSettings {
    this.initStorage();
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? { ...DEFAULT_SETTINGS, ...JSON.parse(data) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  }

  public updateWebsiteSettings(updates: Partial<WebsiteSettings>): WebsiteSettings {
    const current = this.getWebsiteSettings();
    const updated = { ...current, ...updates };
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));

    this.logActivity(
      'Website Settings Updated',
      'تحديث إعدادات الموقع',
      'Updated homepage and contact information content',
      'setting'
    );

    this.notifyChange();
    return updated;
  }

  // --- Activity Logs ---
  public getActivityLogs(): ActivityLog[] {
    this.initStorage();
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ACTIVITY_LOGS);
      return data ? JSON.parse(data) : DEFAULT_ACTIVITIES;
    } catch {
      return DEFAULT_ACTIVITIES;
    }
  }

  private logActivity(
    action: string,
    actionAr: string,
    details: string,
    type: 'student' | 'certificate' | 'partner' | 'setting' | 'verification'
  ): void {
    const logs = this.getActivityLogs();
    const newLog: ActivityLog = {
      id: `act-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      action,
      actionAr,
      details,
      timestamp: new Date().toISOString(),
      type,
    };
    logs.unshift(newLog);
    if (logs.length > 50) logs.pop();
    localStorage.setItem(STORAGE_KEYS.ACTIVITY_LOGS, JSON.stringify(logs));
  }

  // --- Dashboard Stats ---
  public getDashboardStats(): DashboardStats {
    const students = this.getStudents();
    const certs = this.getCertificates();
    const partners = this.getPartners();
    const verifCount = parseInt(localStorage.getItem(STORAGE_KEYS.VERIFICATION_COUNT) || '184', 10);

    const validCount = certs.filter((c) => c.status === 'Valid').length;
    const revokedCount = certs.filter((c) => c.status === 'Revoked').length;
    const expiredCount = certs.filter((c) => c.status === 'Expired').length;
    const pendingCount = certs.filter((c) => c.status === 'Pending').length;

    return {
      totalStudents: students.length,
      totalCertificates: certs.length,
      validCertificates: validCount,
      pendingCertificates: pendingCount,
      revokedCertificates: revokedCount,
      expiredCertificates: expiredCount,
      totalPartners: partners.length,
      totalVerifications: verifCount,
      unreadMessages: 2,
      monthlyCertificates: [
        { month: 'Jan', count: 18 },
        { month: 'Feb', count: 24 },
        { month: 'Mar', count: 32 },
        { month: 'Apr', count: 28 },
        { month: 'May', count: 41 },
        { month: 'Jun', count: certs.length },
      ],
      statusDistribution: [
        { name: 'Valid', value: validCount, color: '#10B981' },
        { name: 'Revoked', value: revokedCount, color: '#EF4444' },
        { name: 'Expired', value: expiredCount, color: '#F59E0B' },
      ],
      recentVerifications: [
        {
          id: 1,
          queryTerm: 'BCL-2026-00125',
          searchType: 'Certificate ID',
          resultStatus: 'Valid',
          ipAddress: '192.168.1.42',
          verifiedAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
        },
        {
          id: 2,
          queryTerm: 'BCL-STU-2026-002',
          searchType: 'Student ID',
          resultStatus: 'Valid',
          ipAddress: '10.0.4.15',
          verifiedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
        },
        {
          id: 3,
          queryTerm: 'BCL-2026-00731',
          searchType: 'Certificate ID',
          resultStatus: 'Revoked',
          ipAddress: '172.16.0.8',
          verifiedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
        },
      ],
    };
  }

  // --- Student ID Cards Generation from Students ---
  public getStudentIdCards(): StudentIdCard[] {
    const students = this.getStudents();
    return students.map((s) => ({
      id: s.id,
      studentId: s.id,
      studentIdNumber: s.studentIdNumber,
      studentNameEn: s.fullNameEn,
      studentNameAr: s.fullNameAr,
      programEn: s.programEn,
      programAr: s.programAr,
      photoUrl: s.photoUrl,
      cardNumber: `BCL-CARD-${s.studentIdNumber.replace('BCL-STU-', '')}`,
      issueDate: s.registrationDate,
      expiryDate: new Date(new Date(s.registrationDate).setFullYear(new Date(s.registrationDate).getFullYear() + 2))
        .toISOString()
        .split('T')[0],
      status: s.status === 'Active' ? 'Active' : s.status,
      barcode: `*${s.studentIdNumber}*`,
      qrCodeUrl: `${window.location.origin}/verify?certificate=${encodeURIComponent(s.studentIdNumber)}`,
    }));
  }
}

export const storage = new StorageService();
// Initialize storage immediately
storage.initStorage();

