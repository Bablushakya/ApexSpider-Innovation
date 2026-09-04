/**
 * scripts/indexnow.mjs
 * IndexNow Manual/CI Submission Script
 *
 * Submits all canonical production URLs to Bing's IndexNow API.
 * Reads INDEXNOW_API_KEY from process.env — never hardcoded.
 *
 * Usage:
 *   npm run indexnow                    (reads from .env or shell env)
 *   INDEXNOW_API_KEY=xxx node scripts/indexnow.mjs
 *
 * Requirements:
 *   - Node.js 18+ (native fetch)
 *   - INDEXNOW_API_KEY set in environment or .env file
 *
 * Note: For local use, load your .env manually or use a tool like
 *       `dotenv-cli`: npx dotenv -e .env -- node scripts/indexnow.mjs
 *       Or just export the variable in your shell before running.
 */

// ── Load .env for local development ────────────────────────────────────────
// Attempt to read .env from the project root using only Node built-ins.
// This is a lightweight .env parser — no extra packages required.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, '..', '.env');

try {
  const envContent = readFileSync(envPath, 'utf8');
  for (const line of envContent.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
    // Only set if not already in environment (shell env takes precedence)
    if (key && !(key in process.env)) {
      process.env[key] = val;
    }
  }
} catch {
  // .env not found or not readable — rely on shell environment (normal in CI)
}

// ── Configuration ───────────────────────────────────────────────────────────

const CANONICAL_HOST = 'www.apexspiderinnovation.com';
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

/**
 * Canonical production URLs to submit.
 * Only https://www.apexspiderinnovation.com URLs.
 * Privacy, terms, security pages intentionally excluded.
 */
const URLS_TO_SUBMIT = [
  'https://www.apexspiderinnovation.com/',
  'https://www.apexspiderinnovation.com/about',
  'https://www.apexspiderinnovation.com/services',
  'https://www.apexspiderinnovation.com/services/web-development',
  'https://www.apexspiderinnovation.com/services/mobile-app-development',
  'https://www.apexspiderinnovation.com/services/ai-solutions',
  'https://www.apexspiderinnovation.com/services/business-applications',
  'https://www.apexspiderinnovation.com/services/data-analytics',
  'https://www.apexspiderinnovation.com/services/automation',
  'https://www.apexspiderinnovation.com/portfolio',
  'https://www.apexspiderinnovation.com/portfolio/india-heritage-travel',
  'https://www.apexspiderinnovation.com/portfolio/elevation-by-kim',
  'https://www.apexspiderinnovation.com/contact',
];

// ── Validation ──────────────────────────────────────────────────────────────

/**
 * Validates that a URL is a canonical https://www.apexspiderinnovation.com URL.
 * @param {string} url
 * @returns {{ valid: boolean, reason?: string }}
 */
function validateCanonicalUrl(url) {
  if (!url || typeof url !== 'string' || url.trim() === '') {
    return { valid: false, reason: 'URL is empty or not a string' };
  }
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return { valid: false, reason: `Malformed URL: "${url}"` };
  }
  if (parsed.protocol !== 'https:') {
    return {
      valid: false,
      reason: `URL must use https: — got "${parsed.protocol}" in "${url}"`,
    };
  }
  if (parsed.hostname !== CANONICAL_HOST) {
    return {
      valid: false,
      reason: `URL hostname must be "${CANONICAL_HOST}" — got "${parsed.hostname}" in "${url}"`,
    };
  }
  return { valid: true };
}

// ── Main Submission ─────────────────────────────────────────────────────────

async function main() {
  // ── 1. Validate API key presence ────────────────────────────────────────
  const apiKey = process.env.INDEXNOW_API_KEY;
  if (!apiKey || apiKey.trim() === '') {
    console.error(
      '❌  INDEXNOW_API_KEY is not set.\n' +
      '    Add it to your .env file or export it in your shell:\n' +
      '    export INDEXNOW_API_KEY=your_key_here\n' +
      '    Then run: npm run indexnow'
    );
    process.exit(1);
  }
  const key = apiKey.trim();
  // Log only the key length — never the key value itself
  console.log(`🔑  API key loaded (${key.length} chars).`);

  // ── 2. Validate all URLs before sending anything ─────────────────────────
  console.log(`\n🔍  Validating ${URLS_TO_SUBMIT.length} URLs…`);
  let hasError = false;
  for (const url of URLS_TO_SUBMIT) {
    const { valid, reason } = validateCanonicalUrl(url);
    if (!valid) {
      console.error(`  ❌  ${reason}`);
      hasError = true;
    } else {
      console.log(`  ✅  ${url}`);
    }
  }
  if (hasError) {
    console.error('\n❌  Validation failed. No URLs submitted.');
    process.exit(1);
  }

  // ── 3. Build payload ─────────────────────────────────────────────────────
  const keyLocation = `https://${CANONICAL_HOST}/${key}.txt`;
  const payload = {
    host: CANONICAL_HOST,
    key,
    keyLocation,
    urlList: URLS_TO_SUBMIT,
  };

  console.log(`\n📤  Submitting ${URLS_TO_SUBMIT.length} URLs to IndexNow (Bing)…`);
  console.log(`    Endpoint:    ${INDEXNOW_ENDPOINT}`);
  console.log(`    Host:        ${CANONICAL_HOST}`);
  console.log(`    keyLocation: ${keyLocation}`);

  // ── 4. Send request ──────────────────────────────────────────────────────
  let response;
  try {
    response = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'User-Agent': 'ApexSpiderInnovation-IndexNow/1.0',
      },
      body: JSON.stringify(payload),
    });
  } catch (networkError) {
    console.error(`\n❌  Network error: ${networkError.message}`);
    console.error('    Check your internet connection and try again.');
    process.exit(1);
  }

  // ── 5. Handle response ───────────────────────────────────────────────────
  // IndexNow success: 200 (accepted) or 202 (queued for processing)
  if (response.status === 200 || response.status === 202) {
    console.log(`\n✅  IndexNow submission accepted! HTTP ${response.status}`);
    console.log(`    ${URLS_TO_SUBMIT.length} URLs queued for Bing crawling.`);
    console.log('    Check Bing Webmaster Tools → URL Submission → IndexNow to verify.');
    return;
  }

  // Non-success response
  let body = '';
  try {
    body = await response.text();
  } catch {
    body = '(could not read response body)';
  }

  console.error(`\n❌  IndexNow API returned HTTP ${response.status}`);

  // Provide human-readable explanations for known error codes
  const errorMessages = {
    400: 'Bad request — check that the payload format is correct.',
    403: 'Forbidden — the API key may not match the keyLocation file, or the key file is not accessible at the public URL.',
    422: 'Unprocessable — URLs may be invalid or belong to a different host.',
    429: 'Too Many Requests — you have exceeded the IndexNow rate limit. Wait before resubmitting.',
    503: 'IndexNow API is temporarily unavailable. Try again later.',
  };
  if (errorMessages[response.status]) {
    console.error(`    Reason: ${errorMessages[response.status]}`);
  }
  if (body) {
    console.error(`    Response body: ${body}`);
  }

  process.exit(1);
}

main().catch((err) => {
  console.error(`\n❌  Unexpected error: ${err.message}`);
  process.exit(1);
});
