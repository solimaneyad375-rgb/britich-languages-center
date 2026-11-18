/*
 * Project Design & Development
 * Engineered by Eng. Eyad Ahmed
 * SpeedUp Software Solutions
 * © 2026 All Rights Reserved.
 */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

export const authController = {
  async login(req, res) {
    try {
      const { username, password } = req.body || {};

      if (!username || !password) {
        return res.status(400).json({
          success: false,
          error: 'Username and password are required.',
          errorAr: 'يرجى إدخال اسم المستخدم وكلمة المرور.',
        });
      }

      const admin = config.getAdminUser();

      // Case-insensitive username match
      const usernameMatch = username.trim().toLowerCase() === admin.username.toLowerCase();

      // Password comparison using bcrypt
      let passwordMatch = false;
      if (usernameMatch && admin.passwordHash) {
        passwordMatch = await bcrypt.compare(password, admin.passwordHash);
      }

      // If credentials do not match, return generic error (prevents username enumeration)
      if (!usernameMatch || !passwordMatch) {
        return res.status(401).json({
          success: false,
          error: 'Invalid administrator credentials.',
          errorAr: 'اسم المستخدم أو كلمة المرور غير صحيحة.',
        });
      }

      // Generate signed JWT token
      const tokenPayload = {
        id: 1,
        username: admin.username,
        role: 'SuperAdmin',
      };

      const token = jwt.sign(tokenPayload, config.JWT_SECRET, {
        expiresIn: config.JWT_EXPIRES_IN,
      });

      // Set secure HttpOnly cookie
      res.cookie('bcl_auth_session', token, {
        httpOnly: true,
        secure: config.COOKIE_SECURE,
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      });

      // Return user profile (WITHOUT sensitive secrets or password hashes)
      return res.json({
        success: true,
        token,
        user: {
          id: 1,
          username: admin.username,
          fullName: 'Chief Academic Administrator',
          role: 'SuperAdmin',
          email: 'admin@britishcenter.uk',
          lastLoginAt: new Date().toISOString(),
        },
      });
    } catch (err) {
      console.error('Login error', err);
      return res.status(500).json({
        success: false,
        error: 'An unexpected internal server error occurred during authentication.',
        errorAr: 'حدث خطأ غير متوقع أثناء معالجة تسجيل الدخول.',
      });
    }
  },

  me(req, res) {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Unauthenticated session.',
        errorAr: 'جلسة عمل غير مصرح بها.',
      });
    }

    const admin = config.getAdminUser();
    return res.json({
      success: true,
      user: {
        id: 1,
        username: admin.username,
        fullName: 'Chief Academic Administrator',
        role: 'SuperAdmin',
        email: 'admin@britishcenter.uk',
      },
    });
  },

  logout(req, res) {
    res.clearCookie('bcl_auth_session', {
      httpOnly: true,
      secure: config.COOKIE_SECURE,
      sameSite: 'lax',
    });
    return res.json({
      success: true,
      message: 'Successfully logged out.',
      messageAr: 'تم تسجيل الخروج بنجاح.',
    });
  },
};
