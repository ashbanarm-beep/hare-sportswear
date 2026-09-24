// Vercel Serverless Function: /api/generate-mockup
// Secure proxy for sportswear mockup generation using Google Gemini API
// Implements server-side key protection, origin-restricted CORS, IP rate limiting, and prompt sanitization.

// In-memory rate limiting map: ip -> [timestamp, timestamp, ...]
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10;
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

// Clean up stale rate limit entries every 5 minutes
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

// Allowed Origins for CORS
const ALLOWED_ORIGINS = new Set([
  'https://hare-sportswear.vercel.app',
  'https://www.haresportswear.com',
  'https://haresportswear.com',
  'http://localhost:5173',
  'http://localhost:4173',
  'http://localhost:3000'
]);

export default async function handler(req, res) {
  const origin = req.headers.origin;

  // Enforce secure CORS
  if (origin && (ALLOWED_ORIGINS.has(origin) || origin.endsWith('.vercel.app'))) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  } else if (!origin) {
    // Same-origin or non-browser request
    res.setHeader('Access-Control-Allow-Origin', '*');
  }

  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, X-Requested-With'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  // Rate Limiting by IP
  const clientIp = (
    req.headers['x-forwarded-for']?.split(',')[0] ||
    req.socket?.remoteAddress ||
    'anonymous'
  ).trim();

  if (isRateLimited(clientIp)) {
    res.setHeader('Retry-After', '60');
    return res.status(429).json({
      error: 'Rate limit exceeded. Please wait a moment before generating another mockup.',
      success: false
    });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        return res.status(400).json({ error: 'Malformed JSON payload.' });
      }
    }

    const {
      action,
      prompt: rawPrompt = 'Dynamic athletic speed chevrons with high-contrast accents',
      apparelType: rawApparelType = 'Sublimated Soccer Jersey',
      apparelCategory: rawApparelCategory = 'Teamwear & Custom Kits',
      colors = {},
      teamName: rawTeamName = 'HARE ATHLETICS'
    } = body || {};

    const apiKey = (process.env.GEMINI_API_KEY || '').trim();

    if (!apiKey) {
      console.error('Server Configuration Error: GEMINI_API_KEY is not defined.');
      return res.status(503).json({
        error: 'AI Mockup Engine is not configured on the server. Please contact system administrator.',
        success: false
      });
    }

    // Health check ping action from admin dashboard
    if (action === 'ping' || action === 'status') {
      try {
        const pingUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`;
        const start = Date.now();
        const pingResp = await fetch(pingUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: 'ping' }] }]
          })
        });
        const duration = Date.now() - start;
        if (pingResp.ok) {
          return res.status(200).json({
            success: true,
            status: 'healthy',
            latencyMs: duration,
            message: `Connected to Google Gemini API (${duration}ms latency).`
          });
        }
        return res.status(502).json({
          success: false,
          status: 'unavailable',
          message: 'Gemini API responded with an error during ping.'
        });
      } catch (pingErr) {
        return res.status(502).json({
          success: false,
          status: 'error',
          message: 'Failed to connect to Gemini API service.'
        });
      }
    }

    // Sanitize user inputs to prevent prompt injection and buffer abuse
    const prompt = String(rawPrompt)
      .slice(0, 300)
      .replace(/[\u0000-\u001F\u007F-\u009F]/g, '')
      .trim();

    const teamName = String(rawTeamName)
      .slice(0, 60)
      .replace(/[\u0000-\u001F\u007F-\u009F]/g, '')
      .trim();

    const apparelType = String(rawApparelType).slice(0, 100).trim();
    const apparelCategory = String(rawApparelCategory).slice(0, 100).trim();

    // Sanitize hex colors
    const sanitizeHex = (hex, fallback) => {
      return (typeof hex === 'string' && /^#[0-9A-Fa-f]{6}$/.test(hex)) ? hex : fallback;
    };

    const primaryColor = sanitizeHex(colors?.primary, '#111215');
    const secondaryColor = sanitizeHex(colors?.secondary, '#FF751F');
    const accentColor = sanitizeHex(colors?.accent, '#FFFFFF');
    const trimColor = sanitizeHex(colors?.trim, '#D4AF37');

    const systemPrompt = `You are a world-class senior athletic apparel designer and textile engineer for Hare Sportswear & Goods based in Sialkot, Pakistan.
Analyze the user's sportswear design prompt and generate an ultra-realistic manufacturing tech pack and visual design directives in JSON format.

User Garment Selection: ${apparelType} (${apparelCategory})
User Design Concept / Theme: "${prompt}"
Current Color Palette Hint: Primary ${primaryColor}, Secondary ${secondaryColor}, Accent ${accentColor}, Trim ${trimColor}
Team / Club Name: "${teamName}"

You MUST respond strictly with a valid JSON object matching this schema without any markdown wrapping or backticks:
{
  "concept": "A 2 to 3 sentence evocative, professional description of the aesthetic kit concept, detailing visual lines and athletic presence.",
  "recommendedPattern": "geometric" | "stripes" | "hex" | "cyber" | "camo" | "minimal",
  "recommendedCollar": "v-neck" | "crew" | "mandarin",
  "pantoneCodes": [
    { "role": "Primary", "name": "Color Name", "pantone": "19-XXXX TCX", "hex": "#HEXHEX" },
    { "role": "Secondary", "name": "Color Name", "pantone": "16-XXXX TCX", "hex": "#HEXHEX" },
    { "role": "Accent", "name": "Color Name", "pantone": "11-XXXX TCX", "hex": "#HEXHEX" },
    { "role": "Trim", "name": "Color Name", "pantone": "14-XXXX TCX", "hex": "#HEXHEX" }
  ],
  "fabricSpecs": {
    "name": "Engineered Performance Fabric Name",
    "gsm": "140 to 380",
    "composition": "e.g. 100% Recycled Poly Interlock or 88% Poly / 12% Spandex"
  },
  "productionDetails": [
    "Specific Sialkot factory stitching instruction",
    "Sublimation ink formulation & temperature requirement",
    "Embellishment application method (e.g. 3D silicone, TPU heat seal, flatlock seam)",
    "Laser-cut ventilation or reinforcement callout"
  ]
}`;

    const modelsToTry = ['gemini-flash-lite-latest', 'gemini-3.1-flash-lite', 'gemini-3.5-flash', 'gemini-3.6-flash'];
    let geminiResponse = null;
    let successfulModel = '';

    for (const modelName of modelsToTry) {
      try {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
        const resp = await fetch(geminiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: systemPrompt }] }],
            generationConfig: {
              responseMimeType: 'application/json',
              temperature: 0.7
            }
          })
        });

        if (resp.ok) {
          geminiResponse = resp;
          successfulModel = modelName;
          break;
        } else {
          console.warn(`Model ${modelName} returned status ${resp.status}`);
        }
      } catch (mErr) {
        console.warn(`Model ${modelName} fetch error:`, mErr.message);
      }
    }

    if (!geminiResponse || !geminiResponse.ok) {
      return res.status(503).json({
        error: 'AI generation engine is currently busy. Please retry in a few moments.',
        success: false
      });
    }

    const data = await geminiResponse.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      return res.status(502).json({ error: 'Empty response returned by AI model.', success: false });
    }

    const cleanedJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleanedJson);

    return res.status(200).json({
      success: true,
      data: parsed,
      source: successfulModel || 'gemini-flash-backend',
      model: successfulModel
    });

  } catch (error) {
    console.error('API Error in /api/generate-mockup:', error.message);
    return res.status(500).json({
      error: 'An internal error occurred while processing the mockup.',
      success: false
    });
  }
}
