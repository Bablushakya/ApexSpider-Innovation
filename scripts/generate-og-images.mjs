/**
 * scripts/generate-og-images.mjs
 * 
 * ⚠️  ONE-TIME UTILITY SCRIPT — Not part of the build pipeline.
 * 
 * Generates custom 1200x630 OpenGraph preview cards for case studies
 * using sharp and SVG composition.
 * 
 * Only run manually when adding new case studies or updating OG images.
 * 
 * Requirements: npm install sharp
 */
import sharp from 'sharp';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, '..', 'public');
const assetsDir = path.resolve(__dirname, '..', 'src', 'assets', 'Our work');

async function createCaseStudyOG({
  sourceImage,
  title,
  subtitle,
  category,
  client,
  outFileName,
}) {
  const width = 1200;
  const height = 630;

  // Resize client screenshot for the right half preview
  // Preview mockup area: 540w x 420h with rounded corners
  const previewWidth = 520;
  const previewHeight = 360;

  const resizedScreenshot = await sharp(sourceImage)
    .resize(previewWidth, previewHeight, {
      fit: 'cover',
      position: 'top',
    })
    .png()
    .toBuffer();

  // SVG overlay for background, branding, typography, badges, and glassmorphic card
  const svgOverlay = Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#080c14" />
          <stop offset="50%" stop-color="#0e1726" />
          <stop offset="100%" stop-color="#070a10" />
        </linearGradient>

        <radialGradient id="teal-glow" cx="20%" cy="25%" r="50%">
          <stop offset="0%" stop-color="#00e5ff" stop-opacity="0.18" />
          <stop offset="100%" stop-color="#00e5ff" stop-opacity="0" />
        </radialGradient>

        <radialGradient id="violet-glow" cx="80%" cy="75%" r="50%">
          <stop offset="0%" stop-color="#7928ca" stop-opacity="0.22" />
          <stop offset="100%" stop-color="#7928ca" stop-opacity="0" />
        </radialGradient>

        <linearGradient id="border-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#00e5ff" stop-opacity="0.5" />
          <stop offset="50%" stop-color="#7928ca" stop-opacity="0.3" />
          <stop offset="100%" stop-color="#00e5ff" stop-opacity="0.1" />
        </linearGradient>
      </defs>

      <!-- Background -->
      <rect width="${width}" height="${height}" fill="url(#bg-gradient)" />
      <rect width="${width}" height="${height}" fill="url(#teal-glow)" />
      <rect width="${width}" height="${height}" fill="url(#violet-glow)" />

      <!-- Outer border -->
      <rect x="2" y="2" width="${width - 4}" height="${height - 4}" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="2" rx="0" />

      <!-- Left Branding / Details -->
      <!-- Brand Pill -->
      <g transform="translate(70, 70)">
        <rect width="210" height="34" rx="17" fill="rgba(0, 229, 255, 0.12)" stroke="rgba(0, 229, 255, 0.4)" stroke-width="1" />
        <text x="14" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="#00e5ff" letter-spacing="1.5">CASE STUDY</text>
        <circle cx="185" cy="17" r="4" fill="#00e5ff" />
      </g>

      <!-- Client / Tag -->
      <text x="70" y="150" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="500" fill="#94a3b8" letter-spacing="1">
        ${escapeXml(category.toUpperCase())}
      </text>

      <!-- Title -->
      <text x="70" y="210" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="38" font-weight="700" fill="#ffffff">
        ${escapeXml(title)}
      </text>

      <!-- Subtitle -->
      <text x="70" y="260" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="400" fill="#94a3b8">
        ${escapeXml(subtitle)}
      </text>

      <!-- Tech details box -->
      <g transform="translate(70, 380)">
        <rect width="470" height="120" rx="12" fill="rgba(255, 255, 255, 0.03)" stroke="rgba(255, 255, 255, 0.08)" stroke-width="1" />
        
        <text x="24" y="38" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="#64748b" letter-spacing="1">CLIENT</text>
        <text x="24" y="65" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="600" fill="#f1f5f9">${escapeXml(client)}</text>
        
        <text x="240" y="38" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="#64748b" letter-spacing="1">DELIVERED BY</text>
        <text x="240" y="65" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="600" fill="#00e5ff">Apex Spider Innovation</text>

        <text x="24" y="100" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="500" fill="#38bdf8">🌐 apexspiderinnovation.com/portfolio</text>
      </g>

      <!-- Right Mockup Card Frame -->
      <g transform="translate(610, 110)">
        <!-- Card drop shadow & glow -->
        <rect x="-8" y="-8" width="${previewWidth + 16}" height="${previewHeight + 56}" rx="18" fill="rgba(0,0,0,0.5)" filter="drop-shadow(0 20px 30px rgba(0,0,0,0.7))" />
        <!-- Card container -->
        <rect width="${previewWidth}" height="${previewHeight + 40}" rx="14" fill="#0f172a" stroke="url(#border-grad)" stroke-width="2" />
        
        <!-- Browser Bar -->
        <circle cx="20" cy="18" r="5" fill="#ef4444" />
        <circle cx="36" cy="18" r="5" fill="#f59e0b" />
        <circle cx="52" cy="18" r="5" fill="#10b981" />
        <rect x="74" y="9" width="300" height="18" rx="5" fill="rgba(255,255,255,0.06)" />
        <text x="84" y="22" font-family="monospace" font-size="10" fill="#64748b">https://${client.toLowerCase().replace(/[^a-z]/g, '')}.com</text>
      </g>
    </svg>
  `);

  // Composite SVG and screenshot
  const outPath = path.join(publicDir, outFileName);

  await sharp(svgOverlay)
    .composite([
      {
        input: resizedScreenshot,
        top: 145,
        left: 610,
      },
    ])
    .png()
    .toFile(outPath);

  console.log(`✅ Generated OG Image: public/${outFileName} (1200x630)`);
}

function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

async function run() {
  await createCaseStudyOG({
    sourceImage: path.join(assetsDir, 'india heritage travel.png'),
    title: 'India Heritage Travel',
    subtitle: 'Complete Digital Transformation & SEO Foundation',
    category: 'Travel & Digital Experience',
    client: 'India Heritage Travel',
    outFileName: 'og-india-heritage-travel.png',
  });

  await createCaseStudyOG({
    sourceImage: path.join(assetsDir, 'Kin webiste.png'),
    title: 'Elevation by Kim',
    subtitle: 'Sourcing Trip Landing Page & Lead Generation',
    category: 'E-Commerce & Lead Generation',
    client: 'Elevation by Kim',
    outFileName: 'og-elevation-by-kim.png',
  });
}

run().catch((err) => {
  console.error('Error generating OG images:', err);
  process.exit(1);
});
