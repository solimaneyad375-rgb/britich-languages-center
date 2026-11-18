/*
 * Project Design & Development
 * Engineered by Eng. Eyad Ahmed
 * SpeedUp Software Solutions
 * © 2026 All Rights Reserved.
 */
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from backend root
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const PORT = parseInt(process.env.PORT || '5000', 10);
const NODE_ENV = process.env.NODE_ENV || 'development';
const JWT_SECRET = process.env.JWT_SECRET || 'bcl_default_secure_cryptographic_secret_key_prod_2026_oxford';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';
const COOKIE_SECURE = process.env.COOKIE_SECURE === 'true' || NODE_ENV === 'production';

// Admin Account Configuration
const ADMIN_USERNAME = (process.env.ADMIN_USERNAME || 'bcl_chief_admin').trim();

// Provisioning: If precomputed hash is given, use it; otherwise compute bcrypt hash for initial password
let ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || '';
const ADMIN_INITIAL_PASSWORD = process.env.ADMIN_INITIAL_PASSWORD || 'Bcl@OxfordSecure2026!#Prv';

export async function initSecurityConfig() {
  if (!ADMIN_PASSWORD_HASH) {
    // Generate bcrypt hash with cost factor 12
    ADMIN_PASSWORD_HASH = await bcrypt.hash(ADMIN_INITIAL_PASSWORD, 12);
  }
}

export const config = {
  PORT,
  NODE_ENV,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  COOKIE_SECURE,
  CORS_ORIGINS: (process.env.CORS_ORIGIN || 'http://localhost:5173,http://127.0.0.1:5173,https://solimaneyad375-rgb.github.io')
    .split(',')
    .map(s => s.trim()),
  getAdminUser: () => ({
    username: ADMIN_USERNAME,
    passwordHash: ADMIN_PASSWORD_HASH,
  }),
};
