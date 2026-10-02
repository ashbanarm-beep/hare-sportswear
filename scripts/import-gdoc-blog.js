#!/usr/bin/env node

/**
 * Reusable Google Doc to Blog Publishing Workflow for Hare Sportswear
 * 
 * Usage:
 *   node scripts/import-gdoc-blog.js "<GoogleDocURL>" "<TargetBlogURLOrSlug>"
 * 
 * Example:
 *   node scripts/import-gdoc-blog.js "https://docs.google.com/document/d/1C1GhvFlplTaST_TcqGAvPXsXakrcUfWKlShQuIlSd_s/edit" "https://www.haresportswear.com/blog/questions-to-ask-sportswear-manufacturer"
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to fetch URL with automatic redirect following
function fetchUrl(targetUrl) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(targetUrl);
    const client = parsed.protocol === 'https:' ? https : http;
    
    client.get(targetUrl, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (!redirectUrl.startsWith('http')) {
          redirectUrl = new URL(redirectUrl, targetUrl).toString();
        }
        return fetchUrl(redirectUrl).then(resolve).catch(reject);
      }
      
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to fetch ${targetUrl}, status code: ${res.statusCode}`));
      }
      
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
      res.on('error', reject);
    }).on('error', reject);
  });
}

// Extract Doc ID from various Google Docs URL formats
export function extractDocId(inputUrl) {
  const match = inputUrl.match(/\/document\/d\/([a-zA-Z0-9-_]+)/);
  if (match) return match[1];
  if (/^[a-zA-Z0-9-_]{20,}$/.test(inputUrl.trim())) return inputUrl.trim();
  throw new Error(`Could not parse Google Doc ID from URL: ${inputUrl}`);
}

// Extract slug from URL or bare slug
export function extractSlug(targetUrlOrSlug) {
  const cleaned = targetUrlOrSlug.trim().replace(/\/+$/, '');
  const lastSegment = cleaned.split('/').pop().split('?')[0].split('#')[0];
  return lastSegment.toLowerCase().replace(/[^a-z0-9-_]/g, '-');
}

// Unwrap Google redirect URLs (https://www.google.com/url?q=...)
export function unwrapGoogleUrl(url) {
  if (!url) return '';
  try {
    if (url.includes('google.com/url?q=')) {
      const parsed = new URL(url);
      const realUrl = parsed.searchParams.get('q');
      if (realUrl) {
        return cleanInternalUrl(realUrl);
      }
    }
  } catch (e) {}
  return cleanInternalUrl(url);
}

// Clean internal URLs so they link cleanly inside haresportswear.com
export function cleanInternalUrl(url) {
  if (!url) return '';
  return url
    .replace(/^https?:\/\/(www\.)?haresportswear\.com\/?/i, '/')
    .replace(/^http:\/\/(www\.)?haresportswear\.com\/?/i, '/');
}

// Convert HTML fragment to markdown inline formatted text
export function htmlToMarkdownInline(html, linkCollector) {
  if (!html) return '';
  
  let text = html;
  
  // Replace links <a href="...">...</a>
  text = text.replace(/<a\s+[^>]*href=\"([^\"]+)\"[^>]*>([\s\S]*?)<\/a>/gi, (match, rawHref, linkContent) => {
    const cleanHref = unwrapGoogleUrl(rawHref);
    const innerText = linkContent.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim();
    if (!innerText || innerText === '&nbsp;') {
      if (linkCollector) linkCollector.push({ text: 'Reference', href: cleanHref });
      return ` [${cleanHref}](${cleanHref}) `;
    }
    if (linkCollector) linkCollector.push({ text: innerText, href: cleanHref });
    return `[${innerText}](${cleanHref})`;
  });

  // Replace bold <b>, <strong>, or font-weight:700
  text = text.replace(/<(b|strong)[^>]*>([\s\S]*?)<\/\1>/gi, (match, tag, inner) => {
    const clean = inner.replace(/<[^>]+>/g, '').trim();
    return clean ? `**${clean}**` : '';
  });

  // Replace italics <i>, <em>
  text = text.replace(/<(i|em)[^>]*>([\s\S]*?)<\/\1>/gi, (match, tag, inner) => {
    const clean = inner.replace(/<[^>]+>/g, '').trim();
    return clean ? `*${clean}*` : '';
  });

  // Strip remaining HTML tags
  text = text.replace(/<[^>]+>/g, '');
  // Clean HTML entities
  text = text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');

  return text.replace(/[ \t]+/g, ' ').trim();
}

// Convert an HTML table element to Markdown table
export function convertTableToMarkdown(tableHtml, linkCollector) {
  const rows = [...tableHtml.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)];
  if (rows.length === 0) return '';
  
  const parsedRows = rows.map(r => {
    const cells = [...r[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)];
    return cells.map(c => htmlToMarkdownInline(c[1], linkCollector));
  });

  if (parsedRows.length === 0 || parsedRows[0].length === 0) return '';

  const headerRow = parsedRows[0];
  const numCols = headerRow.length;
  const separator = Array(numCols).fill(':---');

  const lines = [];
  lines.push(`| ${headerRow.join(' | ')} |`);
  lines.push(`| ${separator.join(' | ')} |`);

  for (let i = 1; i < parsedRows.length; i++) {
    const row = parsedRows[i];
    const padded = Array(numCols).fill('');
    for (let c = 0; c < numCols; c++) {
      padded[c] = row[c] || '';
    }
    lines.push(`| ${padded.join(' | ')} |`);
  }

  return lines.join('\n');
}

// Main processing function
export async function processGoogleDocToBlog(googleDocUrl, targetBlogUrlOrSlug) {
  const docId = extractDocId(googleDocUrl);
  const slug = extractSlug(targetBlogUrlOrSlug);
  
  console.log(`\n======================================================`);
  console.log(`🚀 Starting Google Doc to Blog Automation`);
  console.log(`======================================================`);
  console.log(`• Document ID:   ${docId}`);
  console.log(`• Target Slug:   ${slug}`);
  console.log(`• Source Link:   ${googleDocUrl}`);
  console.log(`• Target Route:  /blog/${slug}\n`);

  // 1. Fetch HTML export
  const exportUrl = `https://docs.google.com/document/d/${docId}/export?format=html`;
  console.log(`[1/5] Fetching Google Doc export from Google Docs API...`);
  const rawHtml = await fetchUrl(exportUrl);
  console.log(`✓ Fetched ${rawHtml.length} bytes of document HTML.`);

  // 2. Setup image directory
  const blogImagesDir = path.resolve(__dirname, '../public/images/blog');
  if (!fs.existsSync(blogImagesDir)) {
    fs.mkdirSync(blogImagesDir, { recursive: true });
  }

  // 3. Extract title and body
  const bodyMatch = rawHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (!bodyMatch) throw new Error('No <body> tag found in Google Doc HTML');
  const bodyHtml = bodyMatch[1];

  let docTitle = '10 Questions to Ask Sportswear Manufacturer Before Placing an Order';
  const titleTagMatch = bodyHtml.match(/<p[^>]*class=\"[^\"]*title[^\"]*\"[^>]*>([\s\S]*?)<\/p>/i);
  if (titleTagMatch) {
    docTitle = titleTagMatch[1].replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim();
  }

  // 4. Parse elements into markdown
  console.log(`[2/5] Parsing elements (H2, H3, images, tables, hyperlinks)...`);
  
  const linkCollector = [];
  const imageCollector = [];
  const tableCollector = [];
  const headingCollector = [];

  // Regex to iterate through top-level block elements
  const blockRegex = /<(p|h1|h2|h3|h4|table|ul|ol)[^>]*>([\s\S]*?)<\/\1>/gi;
  let match;
  const markdownBlocks = [];

  let imgIndex = 0;

  while ((match = blockRegex.exec(bodyHtml)) !== null) {
    const tag = match[1].toLowerCase();
    const innerHtml = match[2];

    // Check if this block has images
    const imgMatches = [...innerHtml.matchAll(/<img([^>]+)>/gi)];
    if (imgMatches.length > 0) {
      for (const imgMatch of imgMatches) {
        imgIndex++;
        const attrs = imgMatch[1];
        const altMatch = attrs.match(/alt=\"([^\"]*)\"/i);
        const srcMatch = attrs.match(/src=\"data:image\/([a-zA-Z0-9]+);base64,([^\"]+)\"/i);
        
        const alt = altMatch ? altMatch[1].trim() : '';
        let imageFilename = `${slug}-img-${imgIndex}.png`;
        
        if (alt) {
          const cleanAlt = alt.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
          if (cleanAlt.length > 3) {
            imageFilename = `${cleanAlt}.png`;
          }
        }

        if (srcMatch) {
          const base64Data = srcMatch[2];
          const imgBuffer = Buffer.from(base64Data, 'base64');
          const destPath = path.join(blogImagesDir, imageFilename);
          fs.writeFileSync(destPath, imgBuffer);
          imageCollector.push({ filename: imageFilename, alt, size: imgBuffer.length });
        }

        const mdImg = `![${alt}](/images/blog/${imageFilename})`;
        markdownBlocks.push(mdImg);
      }
      continue;
    }

    // Table handling
    if (tag === 'table') {
      const mdTable = convertTableToMarkdown(match[0], linkCollector);
      if (mdTable) {
        markdownBlocks.push(mdTable);
        tableCollector.push(mdTable);
      }
      continue;
    }

    // List handling
    if (tag === 'ul' || tag === 'ol') {
      const items = [...innerHtml.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)];
      const listMd = items.map((it, idx) => {
        const text = htmlToMarkdownInline(it[1], linkCollector);
        return tag === 'ol' ? `${idx + 1}. ${text}` : `- ${text}`;
      }).join('\n');
      if (listMd) markdownBlocks.push(listMd);
      continue;
    }

    // Headings
    if (tag === 'h2') {
      const hText = htmlToMarkdownInline(innerHtml, linkCollector).replace(/^#+\s*/, '');
      if (hText) {
        markdownBlocks.push(`## ${hText}`);
        headingCollector.push({ level: 2, text: hText });
      }
      continue;
    }

    if (tag === 'h3') {
      const hText = htmlToMarkdownInline(innerHtml, linkCollector).replace(/^#+\s*/, '');
      if (hText.startsWith('How shipping works') || hText.length < 60) {
        markdownBlocks.push(`### ${hText}`);
        headingCollector.push({ level: 3, text: hText });
      } else {
        markdownBlocks.push(hText);
      }
      continue;
    }

    // Paragraph
    const pText = htmlToMarkdownInline(innerHtml, linkCollector);
    if (!pText) continue;

    // Skip the title paragraph if duplicated
    if (pText.toLowerCase() === docTitle.toLowerCase()) continue;

    // Bold lead-in formatting for Question answers:
    let formattedText = pText.replace(/^(Why it matters|What a good answer looks like|How Hare answers|Tip for buyers|Buyer tip|Payment note|Bulk lead times):\s*/i, (m, label) => {
      return `**${label}:** `;
    });

    markdownBlocks.push(formattedText);
  }

  // 5. Build full article content
  const contentMarkdown = markdownBlocks.join('\n\n');
  console.log(`✓ Generated ${markdownBlocks.length} markdown content blocks.`);
  console.log(`  - Headings: ${headingCollector.length} (H2/H3)`);
  console.log(`  - Images:   ${imageCollector.length} extracted and saved`);
  console.log(`  - Tables:   ${tableCollector.length} custom-formatted`);
  console.log(`  - Links:    ${linkCollector.length} hyperlinks parsed`);

  // Extract excerpt from the first 1-2 paragraphs
  const textParas = markdownBlocks.filter(b => !b.startsWith('#') && !b.startsWith('![') && !b.startsWith('|') && !b.startsWith('-'));
  const excerpt = textParas[0] || '10 essential questions every sportswear brand, club, and distributor must ask before placing an OEM or custom manufacturing order in Sialkot, Pakistan.';

  // Determine hero image
  let heroImage = '/images/blog/the-sublimation-printer-at-haresportswear.png';
  if (imageCollector.length > 1) {
    heroImage = `/images/blog/${imageCollector[1].filename}`;
  } else if (imageCollector.length > 0) {
    heroImage = `/images/blog/${imageCollector[0].filename}`;
  }

  // 6. Update src/data/blogData.js
  console.log(`\n[3/5] Updating blog data in src/data/blogData.js...`);
  const blogDataPath = path.resolve(__dirname, '../src/data/blogData.js');
  let blogDataSrc = fs.readFileSync(blogDataPath, 'utf8');

  // Prepare standard FAQs for the article
  const postFaqs = [
    {
      question: "What is Hare Sportswear's minimum order quantity (MOQ)?",
      answer: "Our MOQs are structured by product category: 10 pieces per design for custom sublimated teamwear and jerseys, 50 to 100 pieces for activewear and cut-and-sew hoodies, and 20 to 50 pieces for wrestling gear. Physical prototype samples start at just 1 piece."
    },
    {
      question: "How long does physical sampling take before bulk production?",
      answer: "Sublimated teamwear and jersey strike-off samples take 5 to 8 working days. Cut-and-sew activewear, hoodies, and jackets take 10 to 11 working days. Sample fees are typically credited back against your bulk purchase order."
    },
    {
      question: "What are the standard payment terms for sportswear manufacturing?",
      answer: "Standard international terms in Sialkot are a 30% to 50% deposit upon tech pack and purchase order confirmation to begin fabric sourcing, with the remaining balance due upon pre-shipment quality inspection approval (with high-resolution photos and video proof provided)."
    },
    {
      question: "How are shipments exported from Sialkot, Pakistan?",
      answer: "We ship worldwide via DHL/FedEx Express Air (3 to 5 business days door-to-door with full customs clearance and DDP available) and sea container freight through Karachi Port and Port Qasim for large commercial ocean shipments."
    }
  ];

  const newPostObject = {
    slug,
    title: docTitle,
    excerpt: excerpt.length > 220 ? excerpt.slice(0, 217) + '...' : excerpt,
    category: 'All Articles',
    date: 'Oct 02, 2026',
    readTime: '9 min read',
    featured: true,
    author: {
      name: 'Haris Sheikh',
      role: 'Managing Director & Supply Chain Lead',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    image: heroImage,
    content: contentMarkdown,
    faqs: postFaqs
  };

  const postSnippet = `  {\n    slug: ${JSON.stringify(newPostObject.slug)},\n    title: ${JSON.stringify(newPostObject.title)},\n    excerpt: ${JSON.stringify(newPostObject.excerpt)},\n    category: 'All Articles',\n    date: ${JSON.stringify(newPostObject.date)},\n    readTime: ${JSON.stringify(newPostObject.readTime)},\n    featured: true,\n    author: {\n      name: 'Haris Sheikh',\n      role: 'Managing Director & Supply Chain Lead',\n      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'\n    },\n    image: ${JSON.stringify(newPostObject.image)},\n    content: ${JSON.stringify(newPostObject.content)},\n    faqs: ${JSON.stringify(newPostObject.faqs, null, 6)}\n  }`;

  // Check if article already exists
  const slugRegex = new RegExp(`slug:\\s*['"]${slug}['"]`, 'i');
  if (slugRegex.test(blogDataSrc)) {
    console.log(`ℹ️ Post with slug "${slug}" already exists in blogData.js. Updating content...`);
    const postBlockRegex = new RegExp(`\\{[\\s\\S]*?slug:\\s*['"]${slug}['"][\\s\\S]*?\\n  \\}`, 'i');
    if (postBlockRegex.test(blogDataSrc)) {
      blogDataSrc = blogDataSrc.replace(postBlockRegex, postSnippet);
    } else {
      blogDataSrc = blogDataSrc.replace(/export const blogPosts = \[\s*/, `export const blogPosts = [\n${postSnippet},\n`);
    }
  } else {
    console.log(`✓ Appending new post "${docTitle}" (${slug}) to blogData.js...`);
    // Unset other featured flags
    blogDataSrc = blogDataSrc.replace(/featured:\s*true/g, 'featured: false');
    blogDataSrc = blogDataSrc.replace(/export const blogPosts = \[\s*/, `export const blogPosts = [\n${postSnippet},\n`);
  }

  // Ensure category cleanup: blogCategories = ['All Articles']
  blogDataSrc = blogDataSrc.replace(/export const blogCategories = \[[^\]]*\];/, `export const blogCategories = [\n  'All Articles'\n];`);
  // Ensure all existing posts have category: 'All Articles'
  blogDataSrc = blogDataSrc.replace(/category:\s*['"](Manufacturing Guides|Industry Trends|Fabrics & Sourcing|Factory Updates)['"]/g, `category: 'All Articles'`);

  fs.writeFileSync(blogDataPath, blogDataSrc, 'utf8');
  console.log(`✓ Successfully updated src/data/blogData.js`);

  console.log(`\n======================================================`);
  console.log(`🎉 Google Doc Import Completed Successfully!`);
  console.log(`======================================================`);
  console.log(`• Article URL:   https://www.haresportswear.com/blog/${slug}`);
  console.log(`• Local URL:     http://localhost:5173/blog/${slug}`);
  console.log(`• Total Images:  ${imageCollector.length} saved in public/images/blog/`);
  console.log(`• Total Tables:  ${tableCollector.length} rendered as Markdown`);
  console.log(`• Categories:    Consolidated to single unified feed ('All Articles')\n`);

  return newPostObject;
}

// CLI Execution entrypoint
const isMain = process.argv[1] && (
  process.argv[1] === fileURLToPath(import.meta.url) || 
  process.argv[1].endsWith('import-gdoc-blog.js')
);

if (isMain) {
  const args = process.argv.slice(2);
  const docUrl = args[0] || 'https://docs.google.com/document/d/1C1GhvFlplTaST_TcqGAvPXsXakrcUfWKlShQuIlSd_s/edit?tab=t.0#heading=h.25w3ikr5ns2a';
  const targetUrl = args[1] || 'https://www.haresportswear.com/blog/questions-to-ask-sportswear-manufacturer';

  processGoogleDocToBlog(docUrl, targetUrl)
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('\n❌ Import Error:', err);
      process.exit(1);
    });
}
