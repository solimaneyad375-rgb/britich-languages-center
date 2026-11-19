/*
 * Project Design & Development
 * Engineered by Eng. Eyad Ahmed
 * SpeedUp Software Solutions
 * © 2026 All Rights Reserved.
 */
import { store } from '../data/store.js';

export const adminController = {
  // --- Dashboard Overview Stats ---
  getStats(req, res) {
    return res.json({ success: true, data: store.getStats() });
  },

  getActivityLogs(req, res) {
    return res.json({ success: true, data: store.getActivityLogs() });
  },

  // --- Students ---
  getStudents(req, res) {
    return res.json({ success: true, data: store.getStudents() });
  },

  addStudent(req, res) {
    const student = store.addStudent(req.body);
    return res.status(201).json({ success: true, data: student });
  },

  updateStudent(req, res) {
    const student = store.updateStudent(req.params.id, req.body);
    if (!student) {
      return res.status(404).json({ success: false, error: 'Student not found.' });
    }
    return res.json({ success: true, data: student });
  },

  deleteStudent(req, res) {
    const ok = store.deleteStudent(req.params.id);
    if (!ok) {
      return res.status(404).json({ success: false, error: 'Student not found.' });
    }
    return res.json({ success: true, message: 'Student record deleted.' });
  },

  // --- Shared Barcodes ---
  getSharedBarcodes(req, res) {
    return res.json({ success: true, data: store.getSharedBarcodes() });
  },

  addSharedBarcode(req, res) {
    const group = store.addSharedBarcode(req.body);
    return res.status(201).json({ success: true, data: group });
  },

  // --- Certificates ---
  getCertificates(req, res) {
    return res.json({ success: true, data: store.getCertificates() });
  },

  issueCertificate(req, res) {
    const cert = store.addCertificate(req.body);
    return res.status(201).json({ success: true, data: cert });
  },

  updateCertificate(req, res) {
    const cert = store.updateCertificate(req.params.id, req.body);
    if (!cert) {
      return res.status(404).json({ success: false, error: 'Certificate not found.' });
    }
    return res.json({ success: true, data: cert });
  },

  revokeCertificate(req, res) {
    const { reason } = req.body || {};
    const cert = store.revokeCertificate(req.params.id, reason || 'Administrative revocation', req.user?.username);
    if (!cert) {
      return res.status(404).json({ success: false, error: 'Certificate not found.' });
    }
    return res.json({ success: true, data: cert });
  },

  deleteCertificate(req, res) {
    const ok = store.deleteCertificate(req.params.id);
    if (!ok) {
      return res.status(404).json({ success: false, error: 'Certificate not found.' });
    }
    return res.json({ success: true, message: 'Certificate record deleted.' });
  },

  // --- Partners ---
  getPartners(req, res) {
    return res.json({ success: true, data: store.getPartners() });
  },

  addPartner(req, res) {
    const partner = store.addPartner(req.body);
    return res.status(201).json({ success: true, data: partner });
  },

  updatePartner(req, res) {
    const partner = store.updatePartner(req.params.id, req.body);
    if (!partner) {
      return res.status(404).json({ success: false, error: 'Partner not found.' });
    }
    return res.json({ success: true, data: partner });
  },

  deletePartner(req, res) {
    const ok = store.deletePartner(req.params.id);
    if (!ok) {
      return res.status(404).json({ success: false, error: 'Partner not found.' });
    }
    return res.json({ success: true, message: 'Partner record deleted.' });
  },

  // --- Settings ---
  getSettings(req, res) {
    return res.json({ success: true, data: store.getSettings() });
  },

  updateSettings(req, res) {
    const updated = store.updateSettings(req.body);
    return res.json({ success: true, data: updated });
  },
};
