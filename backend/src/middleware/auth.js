/*
 * Project Design & Development
 * Engineered by Eng. Eyad Ahmed
 * SpeedUp Software Solutions
 * © 2026 All Rights Reserved.
 */
import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

export function requireAdminAuth(req, res, next) {
  try {
    let token = null;

    // 1. Extract from HttpOnly Cookie
    if (req.cookies && req.cookies.bcl_auth_session) {
      token = req.cookies.bcl_auth_session;
    }

    // 2. Extract from Authorization header (Bearer <token>)
    if (!token && req.headers.authorization) {
      const parts = req.headers.authorization.split(' ');
      if (parts.length === 2 && parts[0] === 'Bearer') {
        token = parts[1];
      }
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized access. Administrative credentials required.',
        errorAr: 'غير مصرح بالدخول. يتطلب الوصول بيانات اعتماد إدارية مصرح بها.',
      });
    }

    // Verify cryptographic signature and expiration
    const decoded = jwt.verify(token, config.JWT_SECRET);
    if (!decoded || decoded.role !== 'SuperAdmin') {
      return res.status(403).json({
        success: false,
        error: 'Forbidden. Insufficient administrative privileges.',
        errorAr: 'تم رفض الوصول. الصلاحيات الإدارية غير كافية.',
      });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: 'Invalid or expired administrative session. Please sign in again.',
      errorAr: 'جلسة العمل الإدارية منتهية أو غير صالحة. يرجى إعادة تسجيل الدخول.',
    });
  }
}
