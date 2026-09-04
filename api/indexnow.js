/**
 * api/indexnow.js
 * Vercel Serverless Function — IndexNow Submission Endpoint
 *
 * Accepts POST requests to trigger IndexNow URL submission to Bing.
 * The INDEXNOW_API_KEY is read server-side from process.env and is
 * NEVER exposed to the React client bundle or any browser context.
 *
 * Security:
 *  - Protected by INDEXNOW_TRIGGER_SECRET (optional but strongly recommended).
 *  - Only accepts POST.
 *  - Only submits canonical https://www.apexspiderinnovation.com URLs.
 *  - Never logs the API key value.
 *
 * Usage (after Vercel deployment):
 *   curl -X POST https://www.apexspiderinnovation.com/api/indexnow \
 *        -H "Authorization: Bearer <INDEXNOW_TRIGGER_SECRET>"
 */

const CANONICAL_HOST = 'www.apexspiderinnovation.com';
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

/**
 * The production URLs to submit to IndexNow.
 * Only canonical https://www.<domain> URLs.
 * Privacy, terms, and security pages intentionally omitted.
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

/**
 * Validates that a URL is a canonical https://www.apexspiderinnovation.com URL.
 * Rejects: http://, non-www, empty, malformed.
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
    return { valid: false, reason: `Malformed URL: ${url}` };
  }
  if (parsed.protocol !== 'https:') {
    return { valid: false, reason: `URL must use https: protocol — got "${parsed.protocol}"` };
  }
  if (parsed.hostname !== CANONICAL_HOST) {
    return {
      valid: false,
      reason: `URL hostname must be "${CANONICAL_HOST}" — got "${parsed.hostname}"`,
    };
  }
  return { valid: true };
}

/**
 * Submits URLs to the IndexNow API.
 * @param {string} apiKey
 * @returns {Promise<{ success: boolean, status?: number, body?: string, error?: string }>}
 */
async function submitToIndexNow(apiKey) {
  const keyLocation = `https://${CANONICAL_HOST}/${apiKey}.txt`;

  const payload = {
    host: CANONICAL_HOST,
    key: apiKey,
    keyLocation,
    urlList: URLS_TO_SUBMIT,
  };

  // Validate all URLs before submitting
  for (const url of URLS_TO_SUBMIT) {
    const { valid, reason } = validateCanonicalUrl(url);
    if (!valid) {
      return { success: false, error: `Invalid URL in submission list: ${reason}` };
    }
  }

  let response;
  try {
    response = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });
  } catch (networkError) {
    return {
      success: false,
      error: `Network failure contacting IndexNow API: ${networkError.message}`,
    };
  }

  // IndexNow returns 200 or 202 on success
  if (response.status === 200 || response.status === 202) {
    return { success: true, status: response.status };
  }

  // Non-2xx — capture body for diagnostics (does not contain the key)
  let body = '';
  try {
    body = await response.text();
  } catch {
    body = '(could not read response body)';
  }

  return {
    success: false,
    status: response.status,
    body,
    error: `IndexNow API returned non-success status ${response.status}`,
  };
}

/**
 * Vercel serverless function handler.
 * @param {import('@vercel/node').VercelRequest} req
 * @param {import('@vercel/node').VercelResponse} res
 */
export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  // ── Authorization ─────────────────────────────────────────────────────────
  // If INDEXNOW_TRIGGER_SECRET is configured, require it as a Bearer token.
  // This prevents unauthorized actors from triggering repeated submissions.
  const triggerSecret = process.env.INDEXNOW_TRIGGER_SECRET;
  if (triggerSecret) {
    const authHeader = req.headers['authorization'] || '';
    const providedToken = authHeader.startsWith('Bearer ')
      ? authHeader.slice(7).trim()
      : '';
    if (providedToken !== triggerSecret) {
      return res.status(401).json({ error: 'Unauthorized. Invalid or missing trigger secret.' });
    }
  }

  // ── API Key ───────────────────────────────────────────────────────────────
  const apiKey = process.env.INDEXNOW_API_KEY;
  if (!apiKey || apiKey.trim() === '') {
    // Log the problem but NOT the key value (it's absent anyway)
    console.error('[IndexNow] INDEXNOW_API_KEY environment variable is not set.');
    return res.status(500).json({
      error: 'Server configuration error: INDEXNOW_API_KEY is not configured.',
    });
  }

  // ── Submit ────────────────────────────────────────────────────────────────
  console.log(`[IndexNow] Submitting ${URLS_TO_SUBMIT.length} URLs to Bing IndexNow…`);

  const result = await submitToIndexNow(apiKey.trim());

  if (result.success) {
    console.log(`[IndexNow] Submission succeeded. HTTP ${result.status}`);
    return res.status(200).json({
      success: true,
      message: `Successfully submitted ${URLS_TO_SUBMIT.length} URLs to IndexNow.`,
      indexnowStatus: result.status,
      urlCount: URLS_TO_SUBMIT.length,
    });
  }

  console.error(`[IndexNow] Submission failed: ${result.error}`);
  if (result.status) {
    console.error(`[IndexNow] IndexNow HTTP status: ${result.status}`);
  }

  return res.status(502).json({
    success: false,
    error: result.error,
    indexnowStatus: result.status ?? null,
  });
}
