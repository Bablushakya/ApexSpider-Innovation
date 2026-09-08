#!/usr/bin/env node
/**
 * Pre-Deployment Verification Script
 * Checks for common issues before deploying to Vercel
 */

import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

console.log('🔍 Starting pre-deployment verification...\n');

let hasErrors = false;
let hasWarnings = false;

// Check 1: package.json exists and is valid
console.log('✓ Checking package.json...');
try {
  const pkgPath = join(rootDir, 'package.json');
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
  
  if (!pkg.scripts?.build) {
    console.error('  ❌ ERROR: No "build" script found in package.json');
    hasErrors = true;
  } else {
    console.log(`  ✓ Build script: "${pkg.scripts.build}"`);
  }
  
  if (!pkg.engines?.node) {
    console.warn('  ⚠️  WARNING: No Node version specified in "engines" field');
    hasWarnings = true;
  } else {
    console.log(`  ✓ Node version: ${pkg.engines.node}`);
  }
} catch (err) {
  console.error(`  ❌ ERROR: Cannot read package.json: ${err.message}`);
  hasErrors = true;
}

// Check 2: .nvmrc exists
console.log('\n✓ Checking Node version configuration...');
const nvmrcPath = join(rootDir, '.nvmrc');
if (existsSync(nvmrcPath)) {
  const version = readFileSync(nvmrcPath, 'utf8').trim();
  console.log(`  ✓ .nvmrc exists with version: ${version}`);
} else {
  console.warn('  ⚠️  WARNING: .nvmrc file not found. Vercel may use default Node version');
  hasWarnings = true;
}

// Check 3: vercel.json exists and is valid
console.log('\n✓ Checking vercel.json...');
try {
  const vercelPath = join(rootDir, 'vercel.json');
  const vercelConfig = JSON.parse(readFileSync(vercelPath, 'utf8'));
  
  if (vercelConfig.buildCommand) {
    console.log(`  ✓ Build command: "${vercelConfig.buildCommand}"`);
  }
  
  if (vercelConfig.outputDirectory) {
    console.log(`  ✓ Output directory: "${vercelConfig.outputDirectory}"`);
  }
  
  if (vercelConfig.framework) {
    console.log(`  ✓ Framework: ${vercelConfig.framework}`);
  }
} catch (err) {
  console.error(`  ❌ ERROR: Cannot read vercel.json: ${err.message}`);
  hasErrors = true;
}

// Check 4: .env.example exists
console.log('\n✓ Checking environment configuration...');
const envExamplePath = join(rootDir, '.env.example');
if (existsSync(envExamplePath)) {
  console.log('  ✓ .env.example exists');
  
  const envExample = readFileSync(envExamplePath, 'utf8');
  const requiredVars = [
    'VITE_EMAILJS_SERVICE_ID',
    'VITE_EMAILJS_TEMPLATE_ID',
    'VITE_EMAILJS_PUBLIC_KEY',
    'INDEXNOW_API_KEY',
    'INDEXNOW_TRIGGER_SECRET'
  ];
  
  console.log('  Required environment variables:');
  requiredVars.forEach(varName => {
    if (envExample.includes(varName)) {
      console.log(`    ✓ ${varName}`);
    } else {
      console.warn(`    ⚠️  ${varName} not found in .env.example`);
      hasWarnings = true;
    }
  });
} else {
  console.warn('  ⚠️  WARNING: .env.example not found');
  hasWarnings = true;
}

// Check 5: .env is not committed
console.log('\n✓ Checking .gitignore...');
const gitignorePath = join(rootDir, '.gitignore');
if (existsSync(gitignorePath)) {
  const gitignore = readFileSync(gitignorePath, 'utf8');
  if (gitignore.includes('.env')) {
    console.log('  ✓ .env is in .gitignore');
  } else {
    console.error('  ❌ ERROR: .env is NOT in .gitignore - security risk!');
    hasErrors = true;
  }
} else {
  console.warn('  ⚠️  WARNING: .gitignore not found');
  hasWarnings = true;
}

// Check 6: dist folder (output) doesn't exist or is in .gitignore
console.log('\n✓ Checking build output configuration...');
const distPath = join(rootDir, 'dist');
if (existsSync(gitignorePath)) {
  const gitignore = readFileSync(gitignorePath, 'utf8');
  if (gitignore.includes('dist')) {
    console.log('  ✓ dist/ is in .gitignore');
  } else {
    console.warn('  ⚠️  WARNING: dist/ should be in .gitignore');
    hasWarnings = true;
  }
}

// Check 7: Critical files exist
console.log('\n✓ Checking critical files...');
const criticalFiles = [
  'index.html',
  'vite.config.js',
  'src/App.jsx',
  'src/main.jsx'
];

criticalFiles.forEach(file => {
  const filePath = join(rootDir, file);
  if (existsSync(filePath)) {
    console.log(`  ✓ ${file}`);
  } else {
    console.error(`  ❌ ERROR: ${file} not found`);
    hasErrors = true;
  }
});

// Check 8: API folder for serverless functions
console.log('\n✓ Checking API routes...');
const apiPath = join(rootDir, 'api');
if (existsSync(apiPath)) {
  console.log('  ✓ api/ folder exists');
  const indexnowPath = join(apiPath, 'indexnow.js');
  if (existsSync(indexnowPath)) {
    console.log('  ✓ api/indexnow.js exists');
  }
} else {
  console.log('  ℹ️  No api/ folder (no serverless functions)');
}

// Final summary
console.log('\n' + '='.repeat(60));
if (hasErrors) {
  console.log('❌ VERIFICATION FAILED - Please fix errors before deploying');
  process.exit(1);
} else if (hasWarnings) {
  console.log('⚠️  VERIFICATION PASSED WITH WARNINGS');
  console.log('   Review warnings above, but deployment should work');
  process.exit(0);
} else {
  console.log('✅ ALL CHECKS PASSED - Ready for deployment!');
  process.exit(0);
}
