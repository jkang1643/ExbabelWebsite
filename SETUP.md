# Exbabel Marketing Site Setup Guide

This is the marketing website for Exbabel (exbabel.com). All authentication and app functionality lives in the SaaS app at app.exbabel.com.

## Architecture Overview

```
User Journey:
exbabel.com (Marketing Site - this repo)
    ↓ (clicks Sign Up, Try Free, etc.)
app.exbabel.com/signup (SaaS App - separate repo)
    ↓ (Cognito authentication)
app.exbabel.com/dashboard (Authenticated user)
    ↓ (Stripe checkout if needed)
DynamoDB + Cognito (stores user data & subscriptions)
```

## What This Marketing Site Does

✅ **Does:**
- Displays landing page, features, pricing, FAQ
- Redirects all authentication actions to app.exbabel.com
- Redirects demo requests to app.exbabel.com/demo
- Passes pricing plan selections as URL parameters (e.g., `?plan=pro`)

❌ **Does NOT:**
- Handle any authentication (no Cognito here)
- Process payments (no Stripe here)
- Store user data
- Require a backend API

## Required Setup

### 1. Create Environment Variables

You need to manually create these files (they're gitignored):

#### `.env.local` (for development)
```bash
# Development - point to your local or dev app instance
NEXT_PUBLIC_APP_URL=http://localhost:3001

# OR if you have a dev deployment:
# NEXT_PUBLIC_APP_URL=https://dev.app.exbabel.com
```

#### `.env.production` (for production builds)
```bash
# Production - points to your live SaaS app
NEXT_PUBLIC_APP_URL=https://app.exbabel.com

# Optional: Add analytics, monitoring, etc.
# NEXT_PUBLIC_ANALYTICS_ID=GA-XXXXX
# NEXT_PUBLIC_HOTJAR_ID=
```

### 2. Verify Redirects Work

All buttons/links now redirect to your app:

| Component | Button/Link | Redirects To |
|-----------|-------------|--------------|
| Navbar | Sign in | `app.exbabel.com/signin` |
| Navbar | Sign up | `app.exbabel.com/signup` |
| Hero | Try for Free | `app.exbabel.com/signup` |
| Hero | Request a Demo | `app.exbabel.com/demo` |
| GlassmorphicHero | Try Live Demo | `app.exbabel.com/demo` |
| Pricing - Starter | Get started free | `app.exbabel.com/signup?plan=starter` |
| Pricing - Pro | Get started free | `app.exbabel.com/signup?plan=pro` |
| Pricing - Unlimited | Get started free | `app.exbabel.com/signup?plan=unlimited` |
| Pricing - Custom | Contact Us | `app.exbabel.com/contact?type=enterprise` |
| CTA | Get Started Free | `app.exbabel.com/signup` |

### 3. What Your SaaS App Needs to Handle

Your `app.exbabel.com` needs these routes:

```
/signin          - Cognito sign in (Hosted UI or custom)
/signup          - Cognito sign up (Hosted UI or custom)
/demo            - Live demo/trial experience
/dashboard       - Main app dashboard (requires auth)
/contact         - Contact form for enterprise inquiries
```

#### URL Parameters to Handle:

- `?plan=starter|pro|unlimited` - Pre-select pricing plan on signup
- `?type=enterprise` - Mark as enterprise inquiry

## Development Workflow

1. **Start the marketing site:**
   ```bash
   npm run dev
   # Runs on http://localhost:3000
   ```

2. **Start your SaaS app (separate repo):**
   ```bash
   # In your app.exbabel.com repo
   npm run dev
   # Runs on http://localhost:3001 (or configure in .env.local)
   ```

3. **Test the flow:**
   - Visit http://localhost:3000
   - Click "Sign Up" → should redirect to http://localhost:3001/signup
   - Click pricing plans → should redirect with correct `?plan=` parameter

## Deployment Checklist

### Marketing Site (exbabel.com)
- [ ] Set `NEXT_PUBLIC_APP_URL=https://app.exbabel.com` in production environment
- [ ] Deploy to Vercel/your hosting
- [ ] Configure custom domain: exbabel.com
- [ ] Test all redirects point to app.exbabel.com

### SaaS App (app.exbabel.com) - Separate Repo
- [ ] Set up AWS Cognito User Pool
- [ ] Configure Cognito Hosted UI or custom auth pages
- [ ] Set up Stripe checkout integration
- [ ] Create DynamoDB tables for user data
- [ ] Set up Stripe webhooks for subscription events
- [ ] Configure Cognito triggers/webhooks to sync with DynamoDB
- [ ] Deploy app to production
- [ ] Configure custom domain: app.exbabel.com
- [ ] Ensure all routes exist: /signin, /signup, /demo, /dashboard, /contact

## No Backend Needed (for this marketing site)

This marketing site is 100% static/client-side:
- No API routes needed
- No server-side authentication
- No database connections
- Just redirects to the SaaS app

The complexity lives in your `app.exbabel.com` repo, where you'll handle:
- Cognito authentication
- Stripe payments
- DynamoDB storage
- User session management

## Testing Production Build

```bash
# Build the marketing site
npm run build

# Start production server locally
npm run start

# Verify all redirects work correctly
```

## Environment Variable Management

The config is centralized in `lib/config.ts`:

```typescript
import { appRoutes } from "@/lib/config";

// Use in any component:
<a href={appRoutes.signup}>Sign Up</a>
<a href={appRoutes.pricingPro}>Get Pro Plan</a>
```

To change URLs, update your `.env.local` or `.env.production` file, then restart your dev server.

## Questions?

This setup keeps your marketing site simple and focused. All the complex auth/payment logic lives in your SaaS app where it belongs!

