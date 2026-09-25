// Vercel Serverless Function: /api/admin-auth
// Server-side authentication and session verification for Hare Sportswear CMS

import crypto from 'crypto';

// In-memory brute force protection: ip -> { failedAttempts, lockedUntil }
const loginAttempts = new Map();
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes

function checkBruteForce(ip) {
  const record = loginAttempts.get(ip);
  if (!record) return { locked: false };
  if (record.lockedUntil && Date.now() < record.lockedUntil) {
    const remainingSecs = Math.ceil((record.lockedUntil - Date.now()) / 1000);
    return { locked: true, remainingSecs };
  }
  return { locked: false };
}

function recordFailedAttempt(ip) {
  const record = loginAttempts.get(ip) || { count: 0, lockedUntil: null };
  record.count += 1;
  if (record.count >= MAX_FAILED_ATTEMPTS) {
    record.lockedUntil = Date.now() + LOCKOUT_DURATION_MS;
  }
  loginAttempts.set(ip, record);
}

function clearFailedAttempts(ip) {
  loginAttempts.delete(ip);
}

const ALLOWED_ORIGINS = new Set([
  'https://hare-sportswear.vercel.app',
  'https://www.haresportswear.com',
  'https://haresportswear.com',
  'http://localhost:5173',
  'http://localhost:4173',
  'http://localhost:3000'
]);

function getExpectedCredentials() {
  return {
    username: (process.env.ADMIN_USERNAME || 'Ashban').trim(),
    password: (process.env.ADMIN_PASSWORD || 'ashbana48dc2').trim(),
    secret: (process.env.ADMIN_SECRET_KEY || 'HareAdmin2026!SecureCMS_Ashban').trim()
  };
}

function generateSessionToken(secret) {
  const epochDay = Math.floor(Date.now() / (1000 * 60 * 60 * 24)); // Valid for 24h cycle
  return crypto.createHmac('sha256', secret).update(`admin-session-ashban-${epochDay}`).digest('hex');
}

export default async function handler(req, res) {
  const origin = req.headers.origin;

  if (origin && (ALLOWED_ORIGINS.has(origin) || origin.endsWith('.vercel.app'))) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }

  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  const clientIp = (
    req.headers['x-forwarded-for']?.split(',')[0] ||
    req.socket?.remoteAddress ||
    'anonymous'
  ).trim();

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        return res.status(400).json({ error: 'Malformed JSON payload.' });
      }
    }

    const { action = 'verify', username, password, passkey, token } = body || {};
    const { username: expectedUsername, password: expectedPassword, secret: adminSecret } = getExpectedCredentials();
    const validToken = generateSessionToken(adminSecret);

    // ACTION: VERIFY
    if (action === 'verify') {
      if (token && typeof token === 'string') {
        const tokenBuf = Buffer.from(token);
        const validBuf = Buffer.from(validToken);
        if (tokenBuf.length === validBuf.length && crypto.timingSafeEqual(tokenBuf, validBuf)) {
          return res.status(200).json({ authenticated: true, username: expectedUsername });
        }
      }
      return res.status(401).json({ authenticated: false, error: 'Invalid or expired admin session token.' });
    }

    // ACTION: LOGIN
    if (action === 'login') {
      const bruteCheck = checkBruteForce(clientIp);
      if (bruteCheck.locked) {
        return res.status(429).json({
          error: `Too many failed login attempts. Account temporarily locked for ${bruteCheck.remainingSecs} seconds.`
        });
      }

      let isAuthenticated = false;

      if (username && password) {
        const uInput = username.trim();
        const uMatch = uInput.toLowerCase() === expectedUsername.toLowerCase();

        const pInputBuf = Buffer.from(String(password));
        const pExpBuf = Buffer.from(expectedPassword);
        const pMatch = pInputBuf.length === pExpBuf.length &&
                       crypto.timingSafeEqual(pInputBuf, pExpBuf);

        isAuthenticated = uMatch && pMatch;
      } else if (passkey) {
        // Fallback passkey support
        const pInputBuf = Buffer.from(String(passkey).trim());
        const pExpBuf = Buffer.from(expectedPassword);
        isAuthenticated = pInputBuf.length === pExpBuf.length &&
                          crypto.timingSafeEqual(pInputBuf, pExpBuf);
      } else {
        recordFailedAttempt(clientIp);
        return res.status(400).json({ error: 'Username and password are required.' });
      }

      if (isAuthenticated) {
        clearFailedAttempts(clientIp);
        return res.status(200).json({
          success: true,
          authenticated: true,
          token: validToken,
          username: expectedUsername,
          message: 'Admin authorization successful.'
        });
      } else {
        recordFailedAttempt(clientIp);
        return res.status(401).json({
          success: false,
          authenticated: false,
          error: 'Invalid administrative username or password.'
        });
      }
    }

    return res.status(400).json({ error: 'Invalid action requested.' });

  } catch (err) {
    console.error('Admin Auth API Error:', err.message);
    return res.status(500).json({ error: 'Internal server error processing authentication.' });
  }
}
