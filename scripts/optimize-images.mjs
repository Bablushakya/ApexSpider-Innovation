/**
 * optimize-images.mjs
 * Converts all PNG assets → WebP using sharp (already installed).
 * Run: node scripts/optimize-images.mjs
 */

import sharp from 'sharp';
import { readdir, stat, rename } from 'fs/promises';
import { join, extname, basename, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = join(__dirname, '../src/assets');

// Quality settings
const LOGO_QUALITY  = 95;   // Logos need crisp edges
const PHOTO_QUALITY = 82;   // Portfolio screenshots — balance quality/size

const LOGO_FILES = [
  'ApexSPiderInnovationLogoBGRemove.png',
  'ApexSpiderLogo.png',
  'apexSpiderInnovationFotterLogo.png',
];

async function convertToWebP(inputPath, outputPath, quality) {
  const inputStats = await stat(inputPath);
  await sharp(inputPath)
    .webp({ quality, effort: 6, smartSubsample: true })
    .toFile(outputPath);
  const outputStats = await stat(outputPath);
  const saved = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);
  console.log(
    `  ✅ ${basename(inputPath)} → ${basename(outputPath)}`
    + `  (${(inputStats.size/1024).toFixed(0)}KB → ${(outputStats.size/1024).toFixed(0)}KB, -${saved}%)`
  );
}

async function optimizeDir(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      await optimizeDir(fullPath);
    } else if (extname(entry.name).toLowerCase() === '.png') {
      const isLogo = LOGO_FILES.includes(entry.name);
      const quality = isLogo ? LOGO_QUALITY : PHOTO_QUALITY;

      // Sanitize filename: remove spaces, fix casing
      const safeName = entry.name
        .replace(/ /g, '-')
        .replace(/\.png$/i, '.webp')
        .toLowerCase();
      const outPath = join(dir, safeName);

      await convertToWebP(fullPath, outPath, quality);
    }
  }
}

console.log('\n🖼️  Apex Spider Innovation — Image Optimizer');
console.log('═'.repeat(55));
console.log(`📁 Assets dir: ${ASSETS_DIR}\n`);

try {
  await optimizeDir(ASSETS_DIR);
  console.log('\n🎉 All images optimized successfully!');
  console.log('💡 Next: Update imports in Header, Footer, Preloader, caseStudies.jsx');
} catch (err) {
  console.error('❌ Error:', err.message);
  process.exit(1);
}
