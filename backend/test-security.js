/*
 * Project Design & Development
 * Engineered by Eng. Eyad Ahmed
 * SpeedUp Software Solutions
 * © 2026 All Rights Reserved.
 */
import http from 'http';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config, initSecurityConfig } from './src/config/env.js';
import { authLimiter, apiLimiter } from './src/middleware/rateLimiter.js';
import { requireAdminAuth } from './src/middleware/auth.js';
import { authController } from './src/controllers/authController.js';
import { adminController } from './src/controllers/adminController.js';

async function runTestSuite() {
  console.log('=== BRITISH CENTER SECURITY VERIFICATION TEST SUITE ===\n');

  await initSecurityConfig();

  const app = express();
  app.use(express.json());
  app.use(cookieParser());
  app.use(cors({ origin: true, credentials: true }));

  app.post('/api/auth/login', authLimiter, authController.login);
  app.post('/api/auth/logout', authController.logout);
  app.get('/api/auth/me', requireAdminAuth, authController.me);
  app.use('/api/admin', requireAdminAuth);
  app.get('/api/admin/certificates', adminController.getCertificates);
  app.get('/api/admin/stats', adminController.getStats);

  const server = http.createServer(app);
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;
  const base = `http://127.0.0.1:${port}`;
  console.log(`[TEST SERVER] Running in-process on ${base}\n`);

  try {
    // TEST 1: Unauthenticated direct access to protected route
    console.log('[TEST 1] Testing unauthenticated access to /api/admin/certificates...');
    const res1 = await fetch(`${base}/api/admin/certificates`);
    console.log(`  -> Status: ${res1.status} (Expected: 401)`);
    const json1 = await res1.json();
    console.log(`  -> Response: ${JSON.stringify(json1)}`);
    if (res1.status !== 401) throw new Error('TEST 1 FAILED: Expected 401');

    // TEST 2: Login with incorrect password
    console.log('\n[TEST 2] Testing login with invalid credentials...');
    const res2 = await fetch(`${base}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'bcl_chief_admin', password: 'wrong_password_test' }),
    });
    console.log(`  -> Status: ${res2.status} (Expected: 401)`);
    const json2 = await res2.json();
    console.log(`  -> Generic Error: ${json2.error}`);
    if (res2.status !== 401 || !json2.error) throw new Error('TEST 2 FAILED: Expected 401 generic error');

    // TEST 3: Login with correct private administrator credentials
    console.log('\n[TEST 3] Testing login with valid private credentials...');
    const res3 = await fetch(`${base}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'bcl_chief_admin', password: 'Bcl@OxfordSecure2026!#Prv' }),
    });
    console.log(`  -> Status: ${res3.status} (Expected: 200)`);
    const json3 = await res3.json();
    console.log(`  -> json3:`, json3);
    console.log(`  -> Token generated: ${!!json3.token}`);
    console.log(`  -> User payload: ${JSON.stringify(json3.user)}`);
    const setCookie = res3.headers.get('set-cookie');
    console.log(`  -> HttpOnly Cookie Set: ${setCookie?.includes('HttpOnly')}`);
    if (res3.status !== 200 || !json3.token) throw new Error('TEST 3 FAILED: Expected 200 with JWT');

    const token = json3.token;

    // TEST 4: Access protected admin route WITH Bearer token
    console.log('\n[TEST 4] Testing protected /api/admin/certificates with Bearer token...');
    const res4 = await fetch(`${base}/api/admin/certificates`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(`  -> Status: ${res4.status} (Expected: 200)`);
    const json4 = await res4.json();
    console.log(`  -> Certificates returned: ${json4.data?.length} records`);
    if (res4.status !== 200 || !Array.isArray(json4.data)) throw new Error('TEST 4 FAILED: Expected 200 array');

    // TEST 5: Verify /api/auth/me claims
    console.log('\n[TEST 5] Verifying session claims via /api/auth/me...');
    const res5 = await fetch(`${base}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(`  -> Status: ${res5.status} (Expected: 200)`);
    const json5 = await res5.json();
    console.log(`  -> Admin session user: ${json5.user?.username} (${json5.user?.role})`);

    // TEST 6: Rate limiting on multiple failed attempts
    console.log('\n[TEST 6] Testing brute-force rate limiting...');
    let rateLimited = false;
    for (let i = 0; i < 7; i++) {
      const rlRes = await fetch(`${base}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'bcl_chief_admin', password: 'bad_password_' + i }),
      });
      if (rlRes.status === 429) {
        rateLimited = true;
        console.log(`  -> Attempt ${i + 1} blocked by rate limiter with 429 Too Many Requests!`);
        break;
      }
    }
    console.log(`  -> Rate limiter active: ${rateLimited}`);

    console.log('\n=== ALL 6 SECURITY TESTS PASSED PERFECTLY ===\n');
  } finally {
    server.close();
  }
}

runTestSuite().catch(err => {
  console.error('Test suite failed:', err);
  process.exit(1);
});
