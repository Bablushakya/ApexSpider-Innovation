/**
 * create-favicon-ico.js
 * 
 * This script creates favicon.ico from the 32x32 PNG file.
 * Run with: node create-favicon-ico.js
 * 
 * Requirements: npm install --save-dev to-ico
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_FILE = path.join(__dirname, 'public', 'favicon-32x32.png');
const OUTPUT_FILE = path.join(__dirname, 'public', 'favicon.ico');

async function createFaviconIco() {
  console.log('🎨 Creating favicon.ico...\n');

  try {
    // Check if to-ico is available
    let toIco;
    try {
      toIco = (await import('to-ico')).default;
    } catch (error) {
      console.log('⚠️  Package "to-ico" not found.');
      console.log('   Installing it now...\n');
      
      const { exec } = await import('child_process');
      const { promisify } = await import('util');
      const execPromise = promisify(exec);
      
      await execPromise('npm install --save-dev to-ico');
      
      toIco = (await import('to-ico')).default;
    }

    // Read the PNG file
    const buffer = fs.readFileSync(INPUT_FILE);
    
    // Convert to ICO
    const icoBuffer = await toIco([buffer], {
      sizes: [32],
      resize: true
    });
    
    // Write the ICO file
    fs.writeFileSync(OUTPUT_FILE, icoBuffer);
    
    console.log('✅ Created: favicon.ico');
    console.log('📁 Location:', OUTPUT_FILE);
    console.log('\n✨ Done! favicon.ico has been created.\n');
  } catch (error) {
    console.error('\n❌ Error creating favicon.ico:', error.message);
    console.log('\n💡 Alternative: Use an online converter:');
    console.log('   1. Visit https://convertio.co/png-ico/');
    console.log('   2. Upload public/favicon-32x32.png');
    console.log('   3. Download and save as public/favicon.ico\n');
    process.exit(1);
  }
}

createFaviconIco();
