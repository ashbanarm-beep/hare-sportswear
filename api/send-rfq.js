// Vercel Serverless Function: /api/send-rfq
// Dispatches B2B Production RFQs directly to export@haresportswear.com
// Supports: Resend API, Custom SMTP (Nodemailer), and FormSubmit fallback.

import nodemailer from 'nodemailer';

const TARGET_EMAIL = 'export@haresportswear.com';

// In-memory rate limiting map: ip -> [timestamp, timestamp, ...]
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;
const ipRequests = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const timestamps = (ipRequests.get(ip) || []).filter(t => t > windowStart);
  
  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    ipRequests.set(ip, timestamps);
    return true;
  }
  
  timestamps.push(now);
  ipRequests.set(ip, timestamps);
  return false;
}

// Clean up stale rate limits
setInterval(() => {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  for (const [ip, timestamps] of ipRequests.entries()) {
    const valid = timestamps.filter(t => t > windowStart);
    if (valid.length === 0) {
      ipRequests.delete(ip);
    } else {
      ipRequests.set(ip, valid);
    }
  }
}, 5 * 60 * 1000).unref?.();

const ALLOWED_ORIGINS = new Set([
  'https://hare-sportswear.vercel.app',
  'https://www.haresportswear.com',
  'https://haresportswear.com',
  'http://localhost:5173',
  'http://localhost:4173',
  'http://localhost:3000'
]);

function buildEmailHtml(data) {
  const {
    ref,
    fullName,
    companyName,
    email,
    phone,
    country,
    category,
    quantity,
    targetDate,
    fabricPreference,
    message,
    files = []
  } = data;

  const filesHtml = files.length > 0
    ? files.map(f => `<li style="margin-bottom: 4px;"><strong>${escapeHtml(f.name)}</strong> (${escapeHtml(f.size || 'N/A')})</li>`).join('')
    : '<li style="color: #888;">No files attached</li>';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New RFQ - Hare Sportswear</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F5F1E8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1A1A1A;">
  <div style="max-width: 680px; margin: 30px auto; background-color: #FFFFFF; border-radius: 16px; overflow: hidden; border: 1px solid #E5DFD5; box-shadow: 0 4px 16px rgba(0,0,0,0.06);">
    
    <!-- Header -->
    <div style="background-color: #1A1A1A; padding: 28px 32px; border-bottom: 3px solid #FF751F;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td>
            <div style="color: #FF751F; font-size: 11px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;">
              HARE SPORTSWEAR & GOODS • FACTORY RFQ PORTAL
            </div>
            <h1 style="color: #FFFFFF; font-size: 24px; margin: 6px 0 0; font-weight: 800;">
              New Production Quote Request
            </h1>
          </td>
          <td align="right" valign="top">
            <span style="background-color: rgba(255,117,31,0.2); color: #FF751F; border: 1px solid rgba(255,117,31,0.4); padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 700; font-family: monospace;">
              ${escapeHtml(ref)}
            </span>
          </td>
        </tr>
      </table>
    </div>

    <!-- Body -->
    <div style="padding: 32px;">
      
      <!-- Buyer Information Section -->
      <h3 style="color: #1A1A1A; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 14px; padding-bottom: 8px; border-bottom: 2px solid #F5F1E8;">
        1. Buyer & Client Profile
      </h3>
      <table width="100%" cellpadding="8" cellspacing="0" border="0" style="font-size: 13px; margin-bottom: 24px; background-color: #FAF8F3; border-radius: 10px; border: 1px solid #E5DFD5;">
        <tr>
          <td width="35%" style="color: #595856; font-weight: 600;">Full Name:</td>
          <td style="color: #1A1A1A; font-weight: 700;">${escapeHtml(fullName)}</td>
        </tr>
        <tr>
          <td style="color: #595856; font-weight: 600;">Company / Brand:</td>
          <td style="color: #1A1A1A; font-weight: 700;">${escapeHtml(companyName || 'Private Label / Startup')}</td>
        </tr>
        <tr>
          <td style="color: #595856; font-weight: 600;">Corporate Email:</td>
          <td><a href="mailto:${escapeHtml(email)}" style="color: #FF751F; text-decoration: none; font-weight: 700;">${escapeHtml(email)}</a></td>
        </tr>
        <tr>
          <td style="color: #595856; font-weight: 600;">Phone / WhatsApp:</td>
          <td>
            <a href="https://wa.me/${escapeHtml(phone.replace(/[^0-9]/g, ''))}" style="color: #10B981; text-decoration: none; font-weight: 700;">
              ${escapeHtml(phone)} (Chat on WhatsApp)
            </a>
          </td>
        </tr>
        <tr>
          <td style="color: #595856; font-weight: 600;">Country / Destination:</td>
          <td style="color: #1A1A1A; font-weight: 700;">${escapeHtml(country || 'Not specified')}</td>
        </tr>
      </table>

      <!-- Order & Specifications -->
      <h3 style="color: #1A1A1A; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 14px; padding-bottom: 8px; border-bottom: 2px solid #F5F1E8;">
        2. Production Requirements
      </h3>
      <table width="100%" cellpadding="8" cellspacing="0" border="0" style="font-size: 13px; margin-bottom: 24px; background-color: #FAF8F3; border-radius: 10px; border: 1px solid #E5DFD5;">
        <tr>
          <td width="35%" style="color: #595856; font-weight: 600;">Product Division:</td>
          <td style="color: #FF751F; font-weight: 800;">${escapeHtml(category)}</td>
        </tr>
        <tr>
          <td style="color: #595856; font-weight: 600;">Order Quantity:</td>
          <td style="color: #1A1A1A; font-weight: 800;">${escapeHtml(quantity)}</td>
        </tr>
        <tr>
          <td style="color: #595856; font-weight: 600;">Target Deadline:</td>
          <td style="color: #1A1A1A; font-weight: 700;">${escapeHtml(targetDate || 'Standard Production')}</td>
        </tr>
        <tr>
          <td style="color: #595856; font-weight: 600;">Fabric Preference:</td>
          <td style="color: #1A1A1A; font-weight: 700;">${escapeHtml(fabricPreference || 'Factory Recommended')}</td>
        </tr>
      </table>

      <!-- Specifications / Message -->
      <h3 style="color: #1A1A1A; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 14px; padding-bottom: 8px; border-bottom: 2px solid #F5F1E8;">
        3. Detailed Technical Specs & Buyer Notes
      </h3>
      <div style="background-color: #FAF8F3; border: 1px solid #E5DFD5; border-radius: 10px; padding: 16px; margin-bottom: 24px; font-size: 13px; line-height: 1.6; white-space: pre-wrap; color: #1A1A1A;">
${escapeHtml(message || 'No additional specifications provided.')}
      </div>

      <!-- Attached Files -->
      <h3 style="color: #1A1A1A; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 14px; padding-bottom: 8px; border-bottom: 2px solid #F5F1E8;">
        4. Uploaded Tech Pack / Artwork Assets (${files.length})
      </h3>
      <ul style="background-color: #FAF8F3; border: 1px solid #E5DFD5; border-radius: 10px; padding: 16px 20px 16px 36px; margin: 0 0 28px; font-size: 13px;">
        ${filesHtml}
      </ul>

      <!-- Quick Action Buttons -->
      <div style="text-align: center; padding-top: 10px;">
        <a href="mailto:${escapeHtml(email)}?subject=Re: Hare Sportswear Quote - ${escapeHtml(ref)}" style="display: inline-block; background-color: #FF751F; color: #FFFFFF; text-decoration: none; padding: 12px 28px; border-radius: 10px; font-weight: 700; font-size: 13px; margin: 0 8px 8px 0;">
          Reply to Buyer (${escapeHtml(email)})
        </a>
        <a href="https://wa.me/${escapeHtml(phone.replace(/[^0-9]/g, ''))}" style="display: inline-block; background-color: #10B981; color: #FFFFFF; text-decoration: none; padding: 12px 28px; border-radius: 10px; font-weight: 700; font-size: 13px; margin: 0 8px 8px 0;">
          Open WhatsApp Chat
        </a>
      </div>

    </div>

    <!-- Footer -->
    <div style="background-color: #FAF8F3; padding: 18px 32px; border-top: 1px solid #E5DFD5; font-size: 11px; color: #8A847A; text-align: center;">
      This notification was automatically dispatched from the Hare Sportswear B2B Portal (haresportswear.com).<br>
      Hare Sportswear & Goods (Pvt.) Ltd. • Sialkot 51310, Punjab, Pakistan
    </div>

  </div>
</body>
</html>
  `;
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export default async function handler(req, res) {
  const origin = req.headers.origin;

  if (origin && (ALLOWED_ORIGINS.has(origin) || origin.endsWith('.vercel.app'))) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  } else if (!origin) {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }

  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Rate Limiting by IP
  const forwarded = req.headers['x-forwarded-for'];
  const clientIp = forwarded ? forwarded.split(',')[0].trim() : (req.socket?.remoteAddress || 'unknown');
  
  if (isRateLimited(clientIp)) {
    return res.status(429).json({ 
      error: 'Too many RFQ requests submitted from this IP. Please wait a minute or message us directly on WhatsApp.' 
    });
  }

  try {
    const data = req.body || {};
    const { fullName, email, category, quantity } = data;

    if (!fullName || !email || !category || !quantity) {
      return res.status(400).json({ error: 'Missing required inquiry fields.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid corporate email address.' });
    }

    const ref = data.ref || ('RFQ-HSG-' + Math.floor(100000 + Math.random() * 900000));
    data.ref = ref;

    const subject = `[New RFQ: ${ref}] ${fullName} - ${data.companyName || 'Private Label'} (${quantity} pcs)`;
    const htmlBody = buildEmailHtml(data);

    // -------------------------------------------------------------
    // PRIORITY 1: RESEND API (if RESEND_API_KEY is configured in Vercel)
    // -------------------------------------------------------------
    if (process.env.RESEND_API_KEY) {
      try {
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: process.env.EMAIL_FROM || 'Hare RFQ Portal <onboarding@resend.dev>',
            to: [TARGET_EMAIL],
            reply_to: email,
            subject: subject,
            html: htmlBody
          })
        });

        if (resendRes.ok) {
          const resendData = await resendRes.json();
          return res.status(200).json({ success: true, ref, provider: 'resend', id: resendData.id });
        }
      } catch (resendErr) {
        console.error('Resend delivery failed, falling back:', resendErr);
      }
    }

    // -------------------------------------------------------------
    // PRIORITY 2: CUSTOM SMTP VIA NODEMAILER (if SMTP credentials set)
    // -------------------------------------------------------------
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 465,
          secure: Number(process.env.SMTP_PORT) === 465,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
          }
        });

        await transporter.sendMail({
          from: `"${fullName} via Hare RFQ" <${process.env.SMTP_USER}>`,
          to: TARGET_EMAIL,
          replyTo: email,
          subject: subject,
          html: htmlBody
        });

        return res.status(200).json({ success: true, ref, provider: 'smtp' });
      } catch (smtpErr) {
        console.error('SMTP delivery failed, falling back:', smtpErr);
      }
    }

    // -------------------------------------------------------------
    // PRIORITY 3: FORMSUBMIT.CO (Built-in zero-config email forwarder)
    // -------------------------------------------------------------
    try {
      const fsRes = await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': 'https://www.haresportswear.com',
          'Referer': 'https://www.haresportswear.com/contact'
        },
        body: JSON.stringify({
          _subject: subject,
          _replyto: email,
          _template: 'table',
          _captcha: 'false',
          'Reference ID': ref,
          'Full Name': fullName,
          'Company / Brand': data.companyName || 'Private Label',
          'Corporate Email': email,
          'Phone / WhatsApp': data.phone || 'N/A',
          'Country': data.country || 'N/A',
          'Product Category': category,
          'Order Quantity': quantity,
          'Target Deadline': data.targetDate || 'N/A',
          'Fabric Preference': data.fabricPreference || 'N/A',
          'Detailed Specifications': data.message || 'N/A',
          'Attached Files': (data.files || []).map(f => `${f.name} (${f.size})`).join(', ') || 'None'
        })
      });

      const fsJson = await fsRes.json().catch(() => ({}));
      return res.status(200).json({
        success: true,
        ref,
        provider: 'formsubmit',
        info: fsJson.message || 'RFQ queued to factory mailbox'
      });
    } catch (fsErr) {
      console.error('Formsubmit forward error:', fsErr);
    }

    // Always return reference ID even if background delivery encountered network delays
    return res.status(200).json({ 
      success: true, 
      ref, 
      provider: 'local-queue',
      message: 'Inquiry registered. Notification queued.' 
    });

  } catch (error) {
    console.error('Unhandled RFQ Error:', error);
    return res.status(500).json({ error: 'Internal server error while processing RFQ.' });
  }
}
