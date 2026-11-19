/*
 * Project Design & Development
 * Engineered by Eng. Eyad Ahmed
 * SpeedUp Software Solutions
 * © 2026 All Rights Reserved.
 */
export type Language = 'ar' | 'en';

export interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  role: 'SuperAdmin' | 'Admin' | 'Staff';
  createdAt: string;
  lastLoginAt?: string;
}

export interface Student {
  id: number;
  studentIdNumber: string;
  fullNameEn: string;
  fullNameAr: string;
  email?: string;
  phone?: string;
  nationalId?: string;
  programEn: string;
  programAr: string;
  academyEn: string;
  academyAr: string;
  status: 'Active' | 'Inactive' | 'Graduated' | 'Suspended';
  photoUrl?: string;
  registrationDate: string;
  certificateCount?: number;
  createdAt: string;
}

export interface Certificate {
  id: number;
  certificateNumber: string;
  uniqueToken: string;
  studentId: number;
  studentNameEn: string;
  studentNameAr: string;
  studentIdNumber: string;
  courseNameEn: string;
  courseNameAr: string;
  issueDate: string;
  expiryDate?: string;
  issuingOrganizationEn: string;
  issuingOrganizationAr: string;
  accreditingEntityEn: string;
  accreditingEntityAr: string;
  status: 'Valid' | 'Revoked' | 'Expired' | 'Pending';
  revocationReason?: string;
  revokedAt?: string;
  revokedBy?: string;
  gradeEn?: string;
  gradeAr?: string;
  pdfUrl?: string;
  qrCodeImageUrl?: string;
  createdAt: string;
}

export interface SharedBarcodeStudent {
  id: number;
  studentIdNumber: string;
  nameEn: string;
  nameAr: string;
  email?: string;
  nationalIdMasked?: string;
  gradeEn?: string;
  gradeAr?: string;
  status: 'Verified' | 'Pending' | 'Completed';
}

export interface SharedBarcodeGroup {
  id: number;
  barcode: string; // e.g. 'BC-QT-0047'
  batchNumber: string;
  titleEn: string;
  titleAr: string;
  maxCapacity: number; // Up to 30 students
  enrolledCount: number;
  issuingOrganizationEn: string;
  issuingOrganizationAr: string;
  accreditingEntityEn: string;
  accreditingEntityAr: string;
  issueDate: string;
  expiryDate?: string;
  status: 'Valid' | 'Revoked' | 'Expired' | 'Pending';
  students: SharedBarcodeStudent[];
  notes?: string;
  createdAt: string;
}

export interface PublicVerificationResponse {
  isFound: boolean;
  isValid: boolean;
  status: 'Valid' | 'Revoked' | 'Expired' | 'Pending' | 'NotFound';
  statusBadgeColor: string;
  messageEn: string;
  messageAr: string;
  isSharedBarcode?: boolean;
  sharedBarcodeData?: SharedBarcodeGroup;
  studentNameEn?: string;
  studentNameAr?: string;
  studentIdNumber?: string;
  certificateNumber?: string;
  uniqueToken?: string;
  courseNameEn?: string;
  courseNameAr?: string;
  issueDate?: string;
  expiryDate?: string;
  issuingOrganizationEn?: string;
  issuingOrganizationAr?: string;
  accreditingEntityEn?: string;
  accreditingEntityAr?: string;
  gradeEn?: string;
  gradeAr?: string;
  revocationReason?: string;
  revokedAt?: string;
  qrVerificationUrl?: string;
}

export interface StudentIdCard {
  id: number;
  studentId: number;
  studentIdNumber: string;
  studentNameEn: string;
  studentNameAr: string;
  programEn: string;
  programAr: string;
  photoUrl?: string;
  cardNumber: string;
  issueDate: string;
  expiryDate: string;
  status: string;
  barcode?: string;
  qrCodeUrl?: string;
}

export interface Partner {
  id: number;
  nameEn: string;
  nameAr: string;
  descriptionEn?: string;
  descriptionAr?: string;
  logoUrl?: string;
  websiteUrl?: string;
  category: string;
  orderIndex: number;
  isActive: boolean;
}

export interface ServiceItem {
  id: number;
  serviceNumber: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  iconName: string;
  detailedContentEn?: string;
  detailedContentAr?: string;
  orderIndex: number;
  isActive: boolean;
}

export interface ContactMessage {
  id: number;
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  isRead: boolean;
  repliedAt?: string;
  notes?: string;
  createdAt: string;
}

export interface DashboardStats {
  totalStudents: number;
  totalCertificates: number;
  validCertificates: number;
  pendingCertificates: number;
  revokedCertificates: number;
  expiredCertificates: number;
  totalPartners: number;
  totalVerifications: number;
  unreadMessages: number;
  monthlyCertificates: { month: string; count: number }[];
  statusDistribution: { name: string; value: number; color: string }[];
  recentVerifications: {
    id: number;
    queryTerm: string;
    searchType: string;
    resultStatus: string;
    ipAddress?: string;
    verifiedAt: string;
  }[];
}

export interface WebsiteSettings {
  homepageHeadlineEn: string;
  homepageHeadlineAr: string;
  homepageDescEn: string;
  homepageDescAr: string;
  aboutWhoWeAreEn: string;
  aboutWhoWeAreAr: string;
  sloganEn: string;
  sloganAr: string;
  contactPhone: string;
  contactEmail: string;
  contactAddressEn: string;
  contactAddressAr: string;
  companiesHouse: string;
  ukrlp: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  actionAr: string;
  details: string;
  timestamp: string;
  type: 'student' | 'certificate' | 'partner' | 'setting' | 'verification';
}

