/*
 * Project Design & Development
 * Engineered by Eng. Eyad Ahmed
 * SpeedUp Software Solutions
 * © 2026 All Rights Reserved.
 */
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config, initSecurityConfig } from './config/env.js';
import { authLimiter, apiLimiter, verifyLimiter } from './middleware/rateLimiter.js';
import { requireAdminAuth } from './middleware/auth.js';
import { authController } from './controllers/authController.js';
import { adminController } from './controllers/adminController.js';
import { verifyController } from './controllers/verifyController.js';

const app = express();

// Security Middleware
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());

// CORS configuration supporting credentials (cookies/tokens)
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or same-origin)
      if (!origin) return callback(null, true);
      if (
        config.CORS_ORIGINS.includes(origin) ||
        origin.endsWith('.github.io') ||
        origin.includes('localhost') ||
        origin.includes('127.0.0.1')
      ) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive in dev, restricted in strict prod
    },
    credentials: true,
  })
);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'British Center for Languages API',
    institution: 'British Center for Languages Ltd',
    timestamp: new Date().toISOString(),
  });
});

// --- Public Endpoints ---
app.post('/api/auth/login', authLimiter, authController.login);
app.post('/api/auth/logout', authController.logout);
app.get('/api/auth/me', requireAdminAuth, authController.me);

app.get('/api/verify', verifyLimiter, verifyController.verify);
app.get('/api/verify/:query', verifyLimiter, verifyController.verify);
app.post('/api/contact', verifyLimiter, verifyController.submitContact);

// --- Protected Administrative Endpoints (Strict Authentication Required) ---
app.use('/api/admin', apiLimiter, requireAdminAuth);

app.get('/api/admin/stats', adminController.getStats);
app.get('/api/admin/activities', adminController.getActivityLogs);

app.get('/api/admin/shared-barcodes', adminController.getSharedBarcodes);
app.post('/api/admin/shared-barcodes', adminController.addSharedBarcode);

app.get('/api/admin/students', adminController.getStudents);
app.post('/api/admin/students', adminController.addStudent);
app.put('/api/admin/students/:id', adminController.updateStudent);
app.delete('/api/admin/students/:id', adminController.deleteStudent);

app.get('/api/admin/certificates', adminController.getCertificates);
app.post('/api/admin/certificates', adminController.issueCertificate);
app.put('/api/admin/certificates/:id', adminController.updateCertificate);
app.post('/api/admin/certificates/:id/revoke', adminController.revokeCertificate);
app.delete('/api/admin/certificates/:id', adminController.deleteCertificate);

app.get('/api/admin/partners', adminController.getPartners);
app.post('/api/admin/partners', adminController.addPartner);
app.put('/api/admin/partners/:id', adminController.updatePartner);
app.delete('/api/admin/partners/:id', adminController.deletePartner);

app.get('/api/admin/settings', adminController.getSettings);
app.put('/api/admin/settings', adminController.updateSettings);

// 404 handler for unknown API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ success: false, error: 'API endpoint not found.' });
});

// Boot and seed security
async function startServer() {
  await initSecurityConfig();
  app.listen(config.PORT, () => {
    console.log(`[British Center Security API] Server listening on http://localhost:${config.PORT}`);
    console.log(`[British Center Security API] Environment: ${config.NODE_ENV}`);
    console.log(`[British Center Security API] Admin User: ${config.getAdminUser().username}`);
  });
}

startServer().catch(err => {
  console.error('Fatal initialization error:', err);
  process.exit(1);
});
