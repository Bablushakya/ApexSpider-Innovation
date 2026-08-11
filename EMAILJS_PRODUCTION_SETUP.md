# EmailJS Production Deployment Guide

## Problem Identified ✅

The production build was showing demo mode message because:
1. **Leading spaces in .env file** - The environment variable values had spaces before them
2. **No defensive trimming** - The code didn't handle whitespace in environment variables

## Fixes Applied ✅

### 1. Fixed `.env` file (Local Development)
**Before:**
```env
VITE_EMAILJS_SERVICE_ID= service_kfnrs5p
VITE_EMAILJS_TEMPLATE_ID= template_zexba3a
VITE_EMAILJS_PUBLIC_KEY= jHEGft5LM8Pt1Vhmp
```

**After:**
```env
VITE_EMAILJS_SERVICE_ID=service_kfnrs5p
VITE_EMAILJS_TEMPLATE_ID=template_zexba3a
VITE_EMAILJS_PUBLIC_KEY=jHEGft5LM8Pt1Vhmp
```

### 2. Improved `contactService.js`
- Added `.trim()` to all environment variable reads (defensive programming)
- Added detailed console logging for debugging (without exposing credentials)
- Better error messages showing which credentials are missing
- Clear distinction between demo mode and actual errors

---

## Required Environment Variables

Your project needs these **3 environment variables**:

| Variable Name | Description | Example Value |
|--------------|-------------|---------------|
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service identifier | `service_kfnrs5p` |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template identifier | `template_zexba3a` |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key | `jHEGft5LM8Pt1Vhmp` |

⚠️ **IMPORTANT:** All variables MUST have the `VITE_` prefix to be accessible in client-side code.

---

## Production Setup (Vercel)

### Step 1: Add Environment Variables to Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable **one by one**:

#### Variable 1:
- **Name:** `VITE_EMAILJS_SERVICE_ID`
- **Value:** `service_kfnrs5p`
- **Environment:** Check all (Production, Preview, Development)

#### Variable 2:
- **Name:** `VITE_EMAILJS_TEMPLATE_ID`
- **Value:** `template_zexba3a`
- **Environment:** Check all (Production, Preview, Development)

#### Variable 3:
- **Name:** `VITE_EMAILJS_PUBLIC_KEY`
- **Value:** `jHEGft5LM8Pt1Vhmp`
- **Environment:** Check all (Production, Preview, Development)

⚠️ **Make sure there are NO spaces before or after the values!**

### Step 2: Redeploy Your Application

After adding environment variables, you MUST redeploy:

**Option A - Trigger via Dashboard:**
1. Go to **Deployments** tab
2. Click on the three dots (•••) on the latest deployment
3. Select **Redeploy**
4. Choose **Use existing Build Cache** is fine

**Option B - Push a new commit:**
```bash
git add .
git commit -m "Fix EmailJS environment variables"
git push
```

Vercel will automatically rebuild and deploy with the new environment variables.

---

## How Environment Variables Work

### Development (localhost):
- Vite reads from `.env` file in project root
- Variables available via `import.meta.env.VITE_*`
- Hot reload when `.env` changes (restart dev server)

### Production (Vercel):
- Vercel injects environment variables during build time
- Variables available via `import.meta.env.VITE_*`
- **Must redeploy after changing variables**

---

## Testing Checklist

### ✅ Local Testing (Before Push)
1. Verify `.env` file has no leading/trailing spaces
2. Run `npm run dev`
3. Go to http://localhost:5173
4. Open browser DevTools Console
5. Submit contact form
6. Check console for `[ContactService]` logs
7. Verify you receive actual email (not demo mode message)

### ✅ Production Testing (After Deploy)
1. Wait for Vercel deployment to complete
2. Visit your production URL
3. Open browser DevTools Console
4. Submit contact form
5. Check console logs:
   - Should see: `[ContactService] Attempting to send email via EmailJS...`
   - Should NOT see: "Missing credentials" warning
6. Verify success message: "Thank you! Your message has been sent successfully..."
7. Check your email inbox for the actual message

---

## Troubleshooting

### Issue: Still seeing demo mode in production

**Possible causes:**
1. Environment variables not added to Vercel
2. Didn't redeploy after adding variables
3. Typo in variable names (must be exact, case-sensitive)
4. Spaces in variable values

**Solution:**
1. Check Vercel dashboard Settings → Environment Variables
2. Verify all 3 variables exist and have correct names
3. Check for spaces in values
4. Redeploy the application

### Issue: "Something went wrong" error message

**Possible causes:**
1. Invalid EmailJS credentials
2. EmailJS service not configured properly
3. EmailJS template doesn't match expected fields
4. Network/CORS issues

**Solution:**
1. Open browser DevTools Console
2. Look for `[ContactService]` error logs
3. Verify credentials at https://dashboard.emailjs.com
4. Check EmailJS template has these variables:
   - `{{name}}`
   - `{{email}}`
   - `{{projectType}}`
   - `{{message}}`

### Issue: Form works locally but not in production

**Possible causes:**
1. Environment variables not in Vercel
2. Vercel has wrong values
3. Didn't redeploy after adding variables

**Solution:**
1. Double-check Vercel environment variables
2. Trigger a new deployment
3. Clear browser cache and test again

---

## Console Log Reference

### Success Flow:
```
[ContactService] Attempting to send email via EmailJS... {serviceId: "service_...", templateId: "template_...", hasPublicKey: true}
[ContactService] EmailJS response: {status: 200, text: "OK"}
```

### Demo Mode (Missing Credentials):
```
[ContactService] EmailJS credentials are not set. Add VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY to your .env file.
[ContactService] Missing credentials: {hasServiceId: false, hasTemplateId: false, hasPublicKey: false}
```

### Error Flow:
```
[ContactService] Attempting to send email via EmailJS...
[ContactService] EmailJS error: Error: ...
[ContactService] Error details: {name: "Error", message: "...", text: "..."}
```

---

## Security Notes

✅ **Safe to expose (client-side):**
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

These are public keys intended for browser use. EmailJS handles authentication on their servers.

❌ **Never commit:**
- `.env` file (listed in `.gitignore`)
- Any credentials or API keys

✅ **Committed (template only):**
- `.env.example` (shows structure without real values)

---

## Summary

**What Changed:**
1. ✅ Fixed `.env` file - removed leading spaces
2. ✅ Added defensive `.trim()` to environment variable reads
3. ✅ Added detailed console logging for debugging
4. ✅ Improved error handling and messages

**What You Need to Do:**
1. Add the 3 environment variables to Vercel
2. Redeploy your application
3. Test the contact form on production

**Expected Result:**
- localhost: Form → EmailJS → Email sent → Success message ✅
- Production: Form → EmailJS → Email sent → Success message ✅
- No more "Running in demo mode" message when credentials are configured ✅
