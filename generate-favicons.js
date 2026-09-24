/**
 * generate-favicons.js
 * 
 * ⚠️  ONE-TIME UTILITY SCRIPT — Not part of the build pipeline.
 * 
 * This script generates all required favicon and logo sizes from the source logo.
 * Only run manually when you need to regenerate favicons from a new logo.
 * 
 * Run with: node generate-favicons.js
 * 
 * Requirements: npm install sharp
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_LOGO = path.join(__dirname, 'src', 'assets', 'ApexSpiderLogo.png');
const PUBLIC_DIR = path.join(__dirname, 'public');

// Favicon and logo sizes to generate
const SIZES = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'logo-192.png', size: 192 },
  { name: 'logo-512.png', size: 512 },
  { name: 'og-image.png', size: 1200, height: 630 } // For social sharing
];

async function generateFavicons() {
  console.log('🎨 ApexSpider Innovation - Favicon Generator\n');
  console.log('📁 Source logo:', SOURCE_LOGO);
  console.log('📁 Output directory:', PUBLIC_DIR, '\n');

  // Check if source logo exists
  if (!fs.existsSync(SOURCE_LOGO)) {
    console.error('❌ Error: Source logo not found at', SOURCE_LOGO);
    process.exit(1);
  }

  // Create public directory if it doesn't exist
  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }

  console.log('🔄 Generating favicon and logo files...\n');

  for (const config of SIZES) {
    try {
      const outputPath = path.join(PUBLIC_DIR, config.name);
      
      let pipeline = sharp(SOURCE_LOGO);
      
      if (config.name === 'og-image.png') {
        // Special handling for Open Graph image (1200x630)
        // Center the logo on a dark background
        const logoBuffer = await sharp(SOURCE_LOGO)
          .resize(600, 600, { fit: 'inside', background: { r: 10, g: 15, b: 26, alpha: 1 } })
          .toBuffer();
        
        pipeline = sharp({
          create: {
            width: config.size,
            height: config.height,
            channels: 4,
            background: { r: 10, g: 15, b: 26, alpha: 1 }
          }
        })
        .composite([{
          input: logoBuffer,
          gravity: 'center'
        }]);
      } else {
        // Standard square resize with padding
        pipeline = pipeline.resize(config.size, config.size, {
          fit: 'contain',
          background: { r: 10, g: 15, b: 26, alpha: 0 }
        });
      }
      
      await pipeline.png().toFile(outputPath);
      
      console.log(`✅ Generated: ${config.name} (${config.size}x${config.height || config.size})`);
    } catch (error) {
      console.error(`❌ Failed to generate ${config.name}:`, error.message);
    }
  }

  // Also generate favicon.ico from 32x32 version
  try {
    const favicon32Path = path.join(PUBLIC_DIR, 'favicon-32x32.png');
    const faviconIcoPath = path.join(PUBLIC_DIR, 'favicon.ico');
    
    if (fs.existsSync(favicon32Path)) {
      // Note: Sharp doesn't support ICO format directly
      // For production, you should use a tool like png-to-ico or online converter
      console.log('\n⚠️  Note: favicon.ico should be generated manually from favicon-32x32.png');
      console.log('   You can use https://convertio.co/png-ico/ or similar tool');
    }
  } catch (error) {
    console.error('❌ Note:', error.message);
  }

  console.log('\n✨ Done! All favicon and logo files have been generated.');
  console.log('\n📝 Next steps:');
  console.log('   1. Generate favicon.ico manually from favicon-32x32.png');
  console.log('   2. Verify all files are in the public folder');
  console.log('   3. Test the favicons in different browsers');
  console.log('   4. Deploy to production\n');
}

// Run the generator
generateFavicons().catch(error => {
  console.error('\n❌ Fatal error:', error);
  process.exit(1);
});
