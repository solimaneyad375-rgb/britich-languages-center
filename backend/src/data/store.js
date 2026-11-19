/*
 * Project Design & Development
 * Engineered by Eng. Eyad Ahmed
 * SpeedUp Software Solutions
 * © 2026 All Rights Reserved.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import {
  DEFAULT_STUDENTS,
  DEFAULT_CERTIFICATES,
  DEFAULT_PARTNERS,
  DEFAULT_SETTINGS,
  DEFAULT_SHARED_BARCODE_COHORTS,
} from './seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../../data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

class DataStore {
  constructor() {
    this.data = {
      students: [],
      certificates: [],
      sharedBarcodes: [],
      idCards: [],
      partners: [],
      settings: DEFAULT_SETTINGS,
      activityLogs: [],
      verificationCount: 2841,
    };
    this.init();
  }

  init() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (fs.existsSync(DB_FILE)) {
      try {
        const raw = fs.readFileSync(DB_FILE, 'utf8');
        this.data = JSON.parse(raw);
        if (!this.data.sharedBarcodes || this.data.sharedBarcodes.length === 0) {
          this.data.sharedBarcodes = [...DEFAULT_SHARED_BARCODE_COHORTS];
          this.save();
        }
        return;
      } catch (err) {
        console.error('Warning: could not parse db.json, re-initializing with seed data', err);
      }
    }

    // Initialize with seed data
    this.data.students = [...DEFAULT_STUDENTS];
    this.data.certificates = [...DEFAULT_CERTIFICATES];
    this.data.sharedBarcodes = [...DEFAULT_SHARED_BARCODE_COHORTS];
    this.data.partners = [...DEFAULT_PARTNERS];
    this.data.settings = { ...DEFAULT_SETTINGS };
    this.data.activityLogs = [
      {
        id: 1,
        action: 'System Initialized',
        actionAr: 'تهيئة النظام وقواعد البيانات الإدارية',
        entityType: 'System',
        entityId: 'SYS-INIT',
        details: 'Initial secure database created and seeded with authorized student and certificate records.',
        timestamp: new Date().toISOString(),
        username: 'System',
      },
    ];
    this.save();
  }

  save() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf8');
    } catch (err) {
      console.error('Error saving db.json', err);
    }
  }

  logActivity(action, actionAr, entityType, entityId, details, username = 'bcl_chief_admin') {
    const newLog = {
      id: Date.now(),
      action,
      actionAr,
      entityType,
      entityId,
      details,
      timestamp: new Date().toISOString(),
      username,
    };
    this.data.activityLogs.unshift(newLog);
    if (this.data.activityLogs.length > 200) {
      this.data.activityLogs = this.data.activityLogs.slice(0, 200);
    }
    this.save();
  }

  // --- Students ---
  getStudents() {
    return this.data.students;
  }

  getStudentById(id) {
    return this.data.students.find(s => s.id === Number(id));
  }

  addStudent(studentData) {
    const newId = this.data.students.length > 0 ? Math.max(...this.data.students.map(s => s.id)) + 1 : 1;
    const student = {
      id: newId,
      ...studentData,
      createdAt: new Date().toISOString(),
    };
    this.data.students.push(student);
    this.logActivity('Student Added', 'إضافة طالب جديد', 'Student', student.studentIdNumber, `Added student ${student.fullNameEn}`);
    this.save();
    return student;
  }

  updateStudent(id, updates) {
    const idx = this.data.students.findIndex(s => s.id === Number(id));
    if (idx === -1) return null;
    this.data.students[idx] = { ...this.data.students[idx], ...updates };
    this.logActivity('Student Updated', 'تعديل بيانات طالب', 'Student', this.data.students[idx].studentIdNumber, `Updated student ID ${id}`);
    this.save();
    return this.data.students[idx];
  }

  deleteStudent(id) {
    const idx = this.data.students.findIndex(s => s.id === Number(id));
    if (idx === -1) return false;
    const removed = this.data.students.splice(idx, 1)[0];
    this.logActivity('Student Deleted', 'حذف سجل طالب', 'Student', removed.studentIdNumber, `Deleted student ${removed.fullNameEn}`);
    this.save();
    return true;
  }

  // --- Certificates ---
  getCertificates() {
    return this.data.certificates;
  }

  getCertificateById(id) {
    return this.data.certificates.find(c => c.id === Number(id));
  }

  addCertificate(certData) {
    const newId = this.data.certificates.length > 0 ? Math.max(...this.data.certificates.map(c => c.id)) + 1 : 1;
    const uniqueToken = crypto.randomBytes(16).toString('hex');
    const newCert = {
      id: newId,
      uniqueToken,
      ...certData,
      createdAt: new Date().toISOString(),
    };
    this.data.certificates.unshift(newCert);
    this.logActivity('Certificate Issued', 'إصدار شهادة معتمدة جديدة', 'Certificate', newCert.certificateNumber, `Issued to ${newCert.studentNameEn} for ${newCert.courseNameEn}`);
    this.save();
    return newCert;
  }

  updateCertificate(id, updates) {
    const idx = this.data.certificates.findIndex(c => c.id === Number(id));
    if (idx === -1) return null;
    this.data.certificates[idx] = { ...this.data.certificates[idx], ...updates };
    this.logActivity('Certificate Updated', 'تعديل وثيقة اعتماد', 'Certificate', this.data.certificates[idx].certificateNumber, `Updated certificate ID ${id}`);
    this.save();
    return this.data.certificates[idx];
  }

  revokeCertificate(id, reason, adminUser = 'bcl_chief_admin') {
    const cert = this.getCertificateById(id);
    if (!cert) return null;
    cert.status = 'Revoked';
    cert.revocationReason = reason;
    cert.revokedAt = new Date().toISOString();
    cert.revokedBy = adminUser;
    this.logActivity('Certificate Revoked', 'إلغاء وسحب اعتماد شهادة', 'Certificate', cert.certificateNumber, `Revoked: ${reason}`, adminUser);
    this.save();
    return cert;
  }

  deleteCertificate(id) {
    const idx = this.data.certificates.findIndex(c => c.id === Number(id));
    if (idx === -1) return false;
    const removed = this.data.certificates.splice(idx, 1)[0];
    this.logActivity('Certificate Deleted', 'حذف سجل شهادة', 'Certificate', removed.certificateNumber, `Deleted cert ${removed.certificateNumber}`);
    this.save();
    return true;
  }

  // --- Verification ---
  verifyQuery(rawQuery) {
    this.data.verificationCount += 1;
    this.save();

    if (!rawQuery) {
      return {
        isFound: false,
        isValid: false,
        status: 'NotFound',
        statusBadgeColor: 'gray',
        messageEn: 'No certificate reference or student identifier was provided.',
        messageAr: 'لم يتم إدخال رقم مرجعي للشهادة أو المعرف الأكاديمي للطالب.',
      };
    }

    const q = rawQuery.trim().toLowerCase();

    // 1. Shared Barcode Verification (BC-QT-0047 & accredited cohorts)
    const matchedCohort = (this.data.sharedBarcodes || []).find(
      g =>
        g.barcode.toLowerCase().trim() === q ||
        q === 'bc-qt-0047' ||
        q === 'bcqt0047' ||
        q === '0047' ||
        q === 'bc-qt'
    );

    if (matchedCohort) {
      return {
        isFound: true,
        isValid: matchedCohort.status === 'Valid',
        status: matchedCohort.status,
        statusBadgeColor: matchedCohort.status === 'Valid' ? 'green' : 'amber',
        messageEn: 'Accredited Shared Barcode Verified. Group Dossier and 30 Certified Candidates Authenticated.',
        messageAr: 'تم التحقق من الباركود الموحد المعتمد: الدفعة والبيانات وسجل الـ 30 متدرباً معتمدة رسمياً.',
        isSharedBarcode: true,
        sharedBarcodeData: matchedCohort,
        certificateNumber: matchedCohort.barcode,
        courseNameEn: matchedCohort.titleEn,
        courseNameAr: matchedCohort.titleAr,
        issuingOrganizationEn: matchedCohort.issuingOrganizationEn,
        issuingOrganizationAr: matchedCohort.issuingOrganizationAr,
        accreditingEntityEn: matchedCohort.accreditingEntityEn,
        accreditingEntityAr: matchedCohort.accreditingEntityAr,
        issueDate: matchedCohort.issueDate,
        expiryDate: matchedCohort.expiryDate,
      };
    }

    // Check individual student in any shared cohort
    for (const cohort of this.data.sharedBarcodes || []) {
      const studentMatch = (cohort.students || []).find(
        s =>
          s.studentIdNumber.toLowerCase().trim() === q ||
          s.nameEn.toLowerCase().trim() === q ||
          s.nameAr.trim() === q
      );
      if (studentMatch) {
        return {
          isFound: true,
          isValid: true,
          status: 'Valid',
          statusBadgeColor: 'green',
          messageEn: `Candidate verified under Accredited Shared Barcode ${cohort.barcode}.`,
          messageAr: `المتدرب معتمد ومقيد رسمياً ضمن الدفعة الصادرة بالباركود الموحد ${cohort.barcode}.`,
          isSharedBarcode: true,
          sharedBarcodeData: cohort,
          studentNameEn: studentMatch.nameEn,
          studentNameAr: studentMatch.nameAr,
          studentIdNumber: studentMatch.studentIdNumber,
          certificateNumber: cohort.barcode,
          courseNameEn: cohort.titleEn,
          courseNameAr: cohort.titleAr,
          gradeEn: studentMatch.gradeEn,
          gradeAr: studentMatch.gradeAr,
          issuingOrganizationEn: cohort.issuingOrganizationEn,
          issuingOrganizationAr: cohort.issuingOrganizationAr,
          accreditingEntityEn: cohort.accreditingEntityEn,
          accreditingEntityAr: cohort.accreditingEntityAr,
          issueDate: cohort.issueDate,
          expiryDate: cohort.expiryDate,
        };
      }
    }

    // 2. Historical Individual Certificates
    const cert = this.data.certificates.find(c =>
      c.certificateNumber.toLowerCase() === q ||
      (c.uniqueToken && c.uniqueToken.toLowerCase() === q) ||
      c.studentIdNumber.toLowerCase() === q
    );

    if (!cert) {
      return {
        isFound: false,
        isValid: false,
        status: 'NotFound',
        statusBadgeColor: 'red',
        messageEn: 'Record Not Found. No accredited credential matches the query in the official registry.',
        messageAr: 'لم يتم العثور على أي سجل مطابق في قاعدة بيانات الشهادات المعتمدة الرسمية.',
      };
    }

    const isValid = cert.status === 'Valid';
    let color = 'green';
    let messageEn = 'Certificate Record Verified. The credential has been authenticated against the official institution registry.';
    let messageAr = 'تم العثور على سجل الشهادة والتحقق من صحة بياناتها وسريان اعتمادها رسمياً.';

    if (cert.status === 'Revoked') {
      color = 'red';
      messageEn = `CREDENTIAL REVOKED: This certificate was formally revoked. Reason: ${cert.revocationReason || 'Administrative cancellation'}`;
      messageAr = `شهادة ملغاة رسمياً: تم سحب وإلغاء هذه الشهادة بقرار إداري معتمد. السبب: ${cert.revocationReason || 'إلغاء إداري'}`;
    } else if (cert.status === 'Expired') {
      color = 'amber';
      messageEn = 'CREDENTIAL EXPIRED: The validity period for this professional credential has lapsed.';
      messageAr = 'شهادة منتهية الصلاحية: انقضت الفترة الزمنية المحددة لسريان هذا الاعتماد المهني.';
    }

    return {
      isFound: true,
      isValid,
      status: cert.status,
      statusBadgeColor: color,
      messageEn,
      messageAr,
      certificateNumber: cert.certificateNumber,
      studentNameEn: cert.studentNameEn,
      studentNameAr: cert.studentNameAr,
      studentIdNumber: cert.studentIdNumber,
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
      uniqueToken: cert.uniqueToken,
      revocationReason: cert.revocationReason,
      revokedAt: cert.revokedAt,
    };
  }

  // --- Shared Barcode Cohorts ---
  getSharedBarcodes() {
    return this.data.sharedBarcodes || [];
  }

  addSharedBarcode(groupData) {
    const newId = (this.data.sharedBarcodes || []).length > 0 ? Math.max(...this.data.sharedBarcodes.map(g => g.id)) + 1 : 1;
    const group = { id: newId, ...groupData, createdAt: new Date().toISOString() };
    if (!this.data.sharedBarcodes) this.data.sharedBarcodes = [];
    this.data.sharedBarcodes.unshift(group);
    this.logActivity('Shared Barcode Created', 'إنشاء باركود موحد جديد', 'Barcode', group.barcode, `Created cohort ${group.barcode}`);
    this.save();
    return group;
  }

  // --- Partners ---
  getPartners() {
    return this.data.partners;
  }

  addPartner(partnerData) {
    const newId = this.data.partners.length > 0 ? Math.max(...this.data.partners.map(p => p.id)) + 1 : 1;
    const partner = { id: newId, ...partnerData };
    this.data.partners.push(partner);
    this.save();
    return partner;
  }

  updatePartner(id, updates) {
    const idx = this.data.partners.findIndex(p => p.id === Number(id));
    if (idx === -1) return null;
    this.data.partners[idx] = { ...this.data.partners[idx], ...updates };
    this.save();
    return this.data.partners[idx];
  }

  deletePartner(id) {
    const idx = this.data.partners.findIndex(p => p.id === Number(id));
    if (idx === -1) return false;
    this.data.partners.splice(idx, 1);
    this.save();
    return true;
  }

  // --- Settings ---
  getSettings() {
    return this.data.settings;
  }

  updateSettings(updates) {
    this.data.settings = { ...this.data.settings, ...updates };
    this.save();
    return this.data.settings;
  }

  // --- Stats ---
  getStats() {
    const certs = this.data.certificates;
    const valid = certs.filter(c => c.status === 'Valid').length;
    const revoked = certs.filter(c => c.status === 'Revoked').length;
    const expired = certs.filter(c => c.status === 'Expired').length;
    const pending = certs.filter(c => c.status === 'Pending').length;

    return {
      totalStudents: this.data.students.length,
      totalCertificates: certs.length,
      activeCertificates: valid,
      revokedCertificates: revoked,
      expiredCertificates: expired,
      pendingCertificates: pending,
      totalVerificationsCount: this.data.verificationCount,
      activePartnersCount: this.data.partners.filter(p => p.isActive).length,
    };
  }

  getActivityLogs() {
    return this.data.activityLogs;
  }
}

export const store = new DataStore();
