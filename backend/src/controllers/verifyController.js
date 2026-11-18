/*
 * Project Design & Development
 * Engineered by Eng. Eyad Ahmed
 * SpeedUp Software Solutions
 * © 2026 All Rights Reserved.
 */
import { store } from '../data/store.js';

export const verifyController = {
  verify(req, res) {
    const query = req.query.query || req.query.certificate || req.params.query;
    const result = store.verifyQuery(query);
    return res.json({ success: true, data: result });
  },

  submitContact(req, res) {
    const { fullName, email, message } = req.body || {};
    if (!fullName || !email || !message) {
      return res.status(400).json({ success: false, error: 'Full name, email, and message are required.' });
    }
    // Log inquiry
    store.logActivity('Contact Inquiry', 'استفسار تواصل جديد', 'Contact', email, `From: ${fullName} (${email})`, 'Public Visitor');
    return res.json({
      success: true,
      message: 'Your message has been received by the British Center administration.',
      messageAr: 'تم استلام رسالتكم بنجاح وسيتواصل معكم فريق العلاقات الأكاديمية.',
    });
  },
};
