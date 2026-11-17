/*
 * Project Design & Development
 * Engineered by Eng. Eyad Ahmed
 * SpeedUp Software Solutions
 * © 2026 All Rights Reserved.
 */
import {
  Certificate,
  ContactMessage,
  DashboardStats,
  Partner,
  PublicVerificationResponse,
  ServiceItem,
  Student,
  StudentIdCard,
  User,
  WebsiteSettings,
} from '../types';
import { storage } from './storage';

// Default static services descriptions (the 6 core institutional services)
const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: 1,
    serviceNumber: '01',
    titleEn: 'Accredited Educational & Professional Certificates',
    titleAr: 'إصدار الشهادات التعليمية والمهنية المعتمدة',
    descriptionEn:
      'Issuing accredited educational and professional certificates in cooperation with accredited academies and training institutions according to official partnership agreements and authorized accreditation scope.',
    descriptionAr:
      'إصدار الشهادات التعليمية والمهنية المعتمدة بالتعاون مع كبرى الأكاديميات والمراكز والمؤسسات التعليمية، وفق اتفاقيات التعاون ونطاق الاعتماد والصلاحيات الممنوحة لكل جهة.',
    iconName: 'Award',
    orderIndex: 1,
    isActive: true,
  },
  {
    id: 2,
    serviceNumber: '02',
    titleEn: 'Educational & Training Development',
    titleAr: 'بناء وتأهيل الكوادر التعليمية والتدريبية',
    descriptionEn:
      'Building, training, and qualifying modern educational cadres, trainers, and academic instructors according to high-level UK and international pedagogical benchmarks.',
    descriptionAr:
      'بناء وتأهيل الكوادر التعليمية والتدريبية، ورفع كفاءة المعلمين والمدربين وفق أحدث المعايير المهنية والتطبيقات التربوية الدولية.',
    iconName: 'GraduationCap',
    orderIndex: 2,
    isActive: true,
  },
  {
    id: 3,
    serviceNumber: '03',
    titleEn: 'Institutional Development',
    titleAr: 'تطوير أداء المراكز والمؤسسات التعليمية',
    descriptionEn:
      'Comprehensive institutional advancement, performance optimization, and organizational governance for training centers and academic institutions.',
    descriptionAr:
      'تطوير أداء المراكز والمؤسسات التعليمية والتدريبية ورفع جاهزيتها الإدارية والتنظيمية لتحقيق التميز المؤسسي المستدام.',
    iconName: 'Building',
    orderIndex: 3,
    isActive: true,
  },
  {
    id: 4,
    serviceNumber: '04',
    titleEn: 'Educational Programs & Courses',
    titleAr: 'تقديم البرامج والدورات التعليمية والتدريبية',
    descriptionEn:
      'Delivering premier language courses, executive linguistics, professional translation diplomas, and structured corporate training programs.',
    descriptionAr:
      'تقديم البرامج والدورات التعليمية والتدريبية المتخصصة في اللغات والترجمة والتواصل المهني المصممة لتلبية متطلبات سوق العمل العالمي.',
    iconName: 'BookOpen',
    orderIndex: 4,
    isActive: true,
  },
  {
    id: 5,
    serviceNumber: '05',
    titleEn: 'Professional Qualification',
    titleAr: 'دعم منظومة الشهادات والتأهيل المهني',
    descriptionEn:
      'Supporting credential evaluation, professional career advancement pathways, and international qualification frameworks for specialists.',
    descriptionAr:
      'دعم منظومة الشهادات والتأهيل المهني المتقدم، وتوفير مسارات الاعتماد الأكاديمي والمهني للكوادر المتخصصة في مختلف المجالات.',
    iconName: 'FileCheck',
    orderIndex: 5,
    isActive: true,
  },
  {
    id: 6,
    serviceNumber: '06',
    titleEn: 'Certification Cooperation',
    titleAr: 'التعاون في مجال اعتماد الشهادات التعليمية والتدريبية',
    descriptionEn:
      'Strategic multilateral cooperation for educational certificate accreditation within authorized institutional bounds and verified governance policies.',
    descriptionAr:
      'التعاون في مجال اعتماد وتوثيق الشهادات التعليمية والتدريبية وفق نطاق الصلاحيات الممنوحة والضوابط المؤسسية المعتمدة.',
    iconName: 'ShieldCheck',
    orderIndex: 6,
    isActive: true,
  },
];

export const api = {
  // --- Public Verification ---
  async verify(query: string): Promise<PublicVerificationResponse> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return storage.verifyCertificate(query);
  },

  async verifyCertificate(query: string): Promise<PublicVerificationResponse> {
    return this.verify(query);
  },

  // --- Students CRUD ---
  async getStudents(): Promise<Student[]> {
    return storage.getStudents();
  },

  async createStudent(studentData: any): Promise<Student> {
    return storage.addStudent({
      studentIdNumber: studentData.studentIdNumber || `BCL-STU-2026-00${storage.getStudents().length + 1}`,
      fullNameEn: studentData.fullNameEn || studentData.fullName || '',
      fullNameAr: studentData.fullNameAr || studentData.fullName || '',
      email: studentData.email,
      phone: studentData.phone,
      nationalId: studentData.nationalId,
      programEn: studentData.programEn || studentData.course || 'Advanced English',
      programAr: studentData.programAr || studentData.course || 'اللغة الإنجليزية المتقدمة',
      academyEn: studentData.academyEn || 'British Center for Languages',
      academyAr: studentData.academyAr || 'المركز البريطاني لتعليم اللغات',
      status: studentData.status || 'Active',
      photoUrl:
        studentData.photoUrl ||
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      registrationDate: studentData.registrationDate || new Date().toISOString().split('T')[0],
    });
  },

  async addStudent(studentData: Omit<Student, 'id' | 'createdAt'>): Promise<Student> {
    return storage.addStudent(studentData);
  },

  async updateStudent(id: number, updates: Partial<Student>): Promise<Student | null> {
    return storage.updateStudent(id, updates);
  },

  async deleteStudent(id: number): Promise<boolean> {
    return storage.deleteStudent(id);
  },

  // --- Certificates CRUD ---
  async getCertificates(): Promise<Certificate[]> {
    return storage.getCertificates();
  },

  async issueCertificate(certData: any): Promise<Certificate> {
    // Look up student details if available
    const students = storage.getStudents();
    const student = students.find(
      (s) => s.id === certData.studentId || s.studentIdNumber === certData.studentIdNumber
    );

    return storage.addCertificate({
      certificateNumber: certData.certificateNumber || storage.generateCertificateId(),
      studentId: student?.id || certData.studentId || 1,
      studentIdNumber: student?.studentIdNumber || certData.studentIdNumber || 'BCL-STU-2026-001',
      studentNameEn: student?.fullNameEn || certData.studentNameEn || 'Student Name',
      studentNameAr: student?.fullNameAr || certData.studentNameAr || 'اسم الطالب',
      courseNameEn: certData.courseNameEn || certData.courseName || 'Advanced English Studies',
      courseNameAr: certData.courseNameAr || certData.courseName || 'دراسات اللغة الإنجليزية المتقدمة',
      issueDate: certData.issueDate || new Date().toISOString().split('T')[0],
      expiryDate: certData.expiryDate,
      issuingOrganizationEn: certData.issuingOrganizationEn || 'British Center for Languages',
      issuingOrganizationAr: certData.issuingOrganizationAr || 'المركز البريطاني لتعليم اللغات',
      accreditingEntityEn: certData.accreditingEntityEn || 'UK International Education & Training',
      accreditingEntityAr: certData.accreditingEntityAr || 'التعليم والتدريب الدولي البريطاني',
      status: certData.status || 'Valid',
      gradeEn: certData.gradeEn || 'Distinction',
      gradeAr: certData.gradeAr || 'امتياز',
    });
  },

  async addCertificate(certData: Omit<Certificate, 'id' | 'createdAt' | 'uniqueToken'>): Promise<Certificate> {
    return storage.addCertificate(certData);
  },

  async updateCertificate(id: number, updates: Partial<Certificate>): Promise<Certificate | null> {
    return storage.updateCertificate(id, updates);
  },

  async revokeCertificate(id: number, reason: string): Promise<Certificate | null> {
    return storage.changeCertificateStatus(id, 'Revoked', reason);
  },

  async changeCertificateStatus(
    id: number,
    status: 'Valid' | 'Revoked' | 'Expired',
    reason?: string
  ): Promise<Certificate | null> {
    return storage.changeCertificateStatus(id, status, reason);
  },

  async deleteCertificate(id: number): Promise<boolean> {
    return storage.deleteCertificate(id);
  },

  generateCertificateId(): string {
    return storage.generateCertificateId();
  },

  // --- Partners CRUD ---
  async getPartners(): Promise<Partner[]> {
    return storage.getPartners();
  },

  async createPartner(partnerData: any): Promise<Partner> {
    return storage.addPartner({
      nameEn: partnerData.nameEn || partnerData.name || '',
      nameAr: partnerData.nameAr || partnerData.name || '',
      descriptionEn: partnerData.descriptionEn || partnerData.description || '',
      descriptionAr: partnerData.descriptionAr || partnerData.description || '',
      logoUrl: partnerData.logoUrl || '',
      websiteUrl: partnerData.websiteUrl || '',
      category: partnerData.category || 'Strategic Partner',
      orderIndex: partnerData.orderIndex || 1,
      isActive: true,
    });
  },

  async addPartner(partnerData: Omit<Partner, 'id'>): Promise<Partner> {
    return storage.addPartner(partnerData);
  },

  async updatePartner(id: number, updates: Partial<Partner>): Promise<Partner | null> {
    return storage.updatePartner(id, updates);
  },

  async deletePartner(id: number): Promise<boolean> {
    return storage.deletePartner(id);
  },

  // --- Services ---
  async getServices(): Promise<ServiceItem[]> {
    return DEFAULT_SERVICES;
  },

  // --- Student ID Cards ---
  async getIdCards(): Promise<StudentIdCard[]> {
    return storage.getStudentIdCards();
  },

  // --- Website Content Settings ---
  async getWebsiteSettings(): Promise<WebsiteSettings> {
    return storage.getWebsiteSettings();
  },

  async updateWebsiteSettings(updates: Partial<WebsiteSettings>): Promise<WebsiteSettings> {
    return storage.updateWebsiteSettings(updates);
  },

  // --- Dashboard Statistics ---
  async getDashboardStats(): Promise<DashboardStats> {
    return storage.getDashboardStats();
  },

  // --- Activity Logs ---
  async getActivityLogs() {
    return storage.getActivityLogs();
  },

  // --- Reset Demo Data ---
  async resetDemoData(): Promise<boolean> {
    storage.resetDemoData();
    return true;
  },

  // --- Contact Messages ---
  async submitContact(formData: any) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { success: true, message: 'Message sent successfully' };
  },

  async sendContactMessage(msg: { fullName: string; email: string; phone?: string; subject: string; message: string }) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { success: true, message: 'Your message has been received successfully.' };
  },

  // --- Demo Login ---
  async login(username: string, password: string): Promise<{ token: string; user: User } | null> {
    await new Promise((resolve) => setTimeout(resolve, 200));

    const validUser = username.trim().toLowerCase() === 'admin';
    const validPass =
      password === 'admin' ||
      password === 'admin123' ||
      password === 'AdminPassword2024!';

    if (validUser && validPass) {
      return {
        token: 'bcl_demo_token_' + Date.now(),
        user: {
          id: 1,
          username: 'admin',
          email: 'admin@britishcenter.uk',
          fullName: 'Chief Academic Administrator',
          role: 'SuperAdmin',
          createdAt: '2026-01-01T00:00:00Z',
          lastLoginAt: new Date().toISOString(),
        },
      };
    }
    return null;
  },
};

export const apiClient = api;
