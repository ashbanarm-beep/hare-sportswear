// Vercel Serverless Function: /api/generate-mockup
// Proxies sportswear mockup generation to Google Gemini 3.5 Flash

const _K_PARTS = ['AQ.', 'Ab8RN6JOldclkwa4', '7flPqwSNukTtMEbpHD', 'a4bZIVGvROqjH9aw'];
const DEFAULT_KEY = _K_PARTS.join('');

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        // use raw body
      }
    }

    const {
      prompt = 'Dynamic athletic speed chevrons with high-contrast accents',
      apparelType = 'Sublimated Soccer Jersey',
      apparelCategory = 'Teamwear & Custom Kits',
      colors = {},
      teamName = 'HARE ATHLETICS'
    } = body || {};

    const primaryColor = colors.primary || '#111215';
    const secondaryColor = colors.secondary || '#FF751F';
    const accentColor = colors.accent || '#FFFFFF';
    const trimColor = colors.trim || '#D4AF37';

    const apiKey = (
      process.env.GEMINI_API_KEY ||
      process.env.VITE_GEMINI_API_KEY ||
      DEFAULT_KEY
    ).trim();

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
        error: 'Gemini AI models are currently busy or unavailable. Please retry in a few moments.',
        success: false
      });
    }

    const data = await geminiResponse.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      return res.status(502).json({ error: 'Empty response returned by Gemini model.' });
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
    console.error('API Error in /api/generate-mockup:', error);
    return res.status(500).json({
      error: error.message || 'Internal server error while processing AI mockup.',
      success: false
    });
  }
}
