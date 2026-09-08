# Vercel Deployment Guide - ApexSpider Innovation

## Current Configuration

- **Node Version**: 22.20.0 (specified in `.nvmrc` and `package.json`)
- **Framework**: Vite 8.x
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## Required Environment Variables on Vercel

Before deployment, ensure these environment variables are set in **Vercel Dashboard → Settings → Environment Variables**:

### Required (Client-Side - with VITE_ prefix):
```
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

### Required (Server-Side - NO VITE_ prefix):
```
INDEXNOW_API_KEY=your_indexnow_key_here
INDEXNOW_TRIGGER_SECRET=your_random_secret_here
```

### Optional:
```
VITE_SENTRY_DSN=(leave empty if not using Sentry)
```

## Common Deployment Issues & Solutions

### 1. Build Fails with "Module not found" or "Cannot find module"
**Solution**: 
- Ensure all dependencies are in `package.json` dependencies (not devDependencies)
- Run `npm install` locally to verify
- Clear Vercel cache: Settings → General → Clear Build Cache

### 2. Build Fails with Node Version Error
**Solution**: 
- `.nvmrc` file is now present with version `22.20.0`
- `package.json` has `engines.node` field set to `>=22.0.0`
- Vercel will automatically use Node 22.x

### 3. Environment Variables Not Working
**Solution**: 
- Client-side variables MUST have `VITE_` prefix
- Server-side variables (API routes) must NOT have `VITE_` prefix
- Add all variables in Vercel Dashboard (not just in `.env`)
- Redeploy after adding variables

### 4. Build Succeeds but Site Shows Blank Page
**Solution**: 
- Check browser console for errors
- Verify `dist/index.html` exists in build output
- Check if all assets are loading (Network tab)
- Verify environment variables are set correctly

### 5. API Routes (Serverless Functions) Not Working
**Solution**: 
- API files must be in `/api` folder at project root
- Environment variables for API routes must be set in Vercel Dashboard
- Check Vercel Function Logs for errors

## Pre-Deployment Checklist

Before pushing to main branch:

- [ ] All dependencies installed: `npm install`
- [ ] Local build successful: `npm run build`
- [ ] No TypeScript/ESLint errors: `npm run lint`
- [ ] Environment variables configured in Vercel Dashboard
- [ ] `.env` file NOT committed to git (check `.gitignore`)
- [ ] Test production build locally: `npm run preview`

## Vercel Build Settings

If automatic detection doesn't work, manually configure in **Vercel Dashboard → Settings → Build & Development Settings**:

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Node Version**: 22.x (auto-detected from .nvmrc)

## Deployment Process

### Automatic Deployment (Recommended):
1. Push to `main` branch
2. Vercel automatically detects changes
3. Builds and deploys
4. IndexNow workflow triggers (submits URLs to Bing)

### Manual Deployment:
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy to production
vercel --prod
```

## Monitoring & Debugging

### Check Deployment Status:
- Vercel Dashboard → Deployments
- Click on deployment to see build logs

### Check Runtime Logs:
- Vercel Dashboard → Logs
- Filter by severity (Error, Warning, Info)

### Check Function Logs (API Routes):
- Vercel Dashboard → Functions
- Click on function name
- View real-time logs

## Performance Optimization

Current optimizations in place:
- Code splitting (React, Framer Motion in separate chunks)
- Asset caching (31536000s for static assets)
- HTML must-revalidate for fresh content
- Image optimization (WebP format)
- Prerendering for all routes (SEO)

## Support & Resources

- **Vercel Documentation**: https://vercel.com/docs
- **Vite Documentation**: https://vitejs.dev/guide/
- **React Documentation**: https://react.dev/

## Troubleshooting Commands

```bash
# Local build (matches Vercel build)
npm run build

# Test production build locally
npm run preview

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for outdated dependencies
npm outdated

# Update dependencies (careful!)
npm update
```

## Contact

If deployment issues persist after following this guide:
1. Check Vercel deployment logs
2. Share specific error messages
3. Verify all environment variables are set
4. Try clearing Vercel build cache

---
Last Updated: September 8, 2026
