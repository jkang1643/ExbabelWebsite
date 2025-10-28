# CI/CD Deployment Quick Start

Quick reference guide for deploying ExBabel to AWS using GitHub Actions.

## 🚀 One-Time Setup (15-20 minutes)

### 1. AWS Infrastructure Setup

```bash
# You'll create these AWS resources:
✓ S3 Bucket (for static files)
✓ CloudFront Distribution (for CDN)
✓ IAM OIDC Identity Provider
✓ IAM Policy (deployment permissions)
✓ IAM Role (for GitHub Actions)
```

**Follow detailed steps in:** `AWS_CICD_SETUP.md` → **AWS Setup** section

### 2. GitHub Secrets Configuration

Add these 4 secrets to your GitHub repository (Settings → Secrets → Actions):

| Secret Name | Get It From | Example |
|------------|-------------|---------|
| `AWS_ROLE_ARN` | IAM Role → Copy ARN | `arn:aws:iam::123456789012:role/GitHubActionsDeploymentRole` |
| `S3_BUCKET_NAME` | S3 → Your bucket name | `exbabel-production` |
| `CLOUDFRONT_DISTRIBUTION_ID` | CloudFront → Distribution ID | `E1ABCDEFGHIJK` |
| `NEXT_PUBLIC_APP_URL` | Your .env.production file | `https://app.exbabel.com` |

### 3. Deploy!

```bash
git add .
git commit -m "Setup CI/CD pipeline"
git push origin main
```

Watch your deployment at: `https://github.com/YOUR_USERNAME/exbabel/actions` 🎉

---

## 📋 AWS Resources Checklist

Copy this checklist to track your AWS setup:

```
Setup Progress:
[ ] S3 bucket created with static hosting enabled
[ ] Bucket policy added for public read access
[ ] CloudFront distribution created
[ ] CloudFront custom error page configured (404)
[ ] CloudFront Distribution ID noted
[ ] OIDC Identity Provider created
[ ] IAM Policy created (GitHubActionsDeploymentPolicy)
[ ] IAM Role created (GitHubActionsDeploymentRole)
[ ] IAM Role Trust Policy updated with repo name
[ ] Role ARN copied
[ ] All 4 GitHub secrets added (AWS_ROLE_ARN, S3_BUCKET_NAME, CLOUDFRONT_DISTRIBUTION_ID, NEXT_PUBLIC_APP_URL)
[ ] First deployment tested
```

---

## 🔧 Common Commands

### GitHub Actions
```bash
# Manual deployment trigger
# Go to: GitHub → Actions → "Deploy to AWS" → Run workflow

# View workflow logs
# Go to: GitHub → Actions → Click on running workflow
```

### Local Testing
```bash
# Build locally to verify
npm run build

# Check build output
ls -la out/

# Deploy manually from local machine (requires AWS CLI)
npm run deploy:local

# Just test the build
npm run deploy:check
```

### AWS CLI Verification
```bash
# List bucket contents
aws s3 ls s3://YOUR-BUCKET-NAME --recursive

# Check CloudFront distribution status
aws cloudfront get-distribution --id YOUR-DISTRIBUTION-ID

# Create manual invalidation
aws cloudfront create-invalidation \
  --distribution-id YOUR-DISTRIBUTION-ID \
  --paths "/*"
```

---

## 🎯 Key Files

| File | Purpose |
|------|---------|
| `.github/workflows/deploy.yml` | GitHub Actions CI/CD pipeline |
| `AWS_CICD_SETUP.md` | Complete setup walkthrough |
| `scripts/deploy-local.sh` | Local deployment script |
| `ENV_DEPLOY_TEMPLATE.txt` | Template for local deployment config |

---

## 🔄 Deployment Flow

```
1. Push to main branch
   ↓
2. GitHub Actions triggered
   ↓
3. Checkout code
   ↓
4. Install dependencies (npm ci)
   ↓
5. Build Next.js app (npm run build)
   ↓
6. Authenticate with AWS via OIDC
   ↓
7. Sync 'out/' folder to S3
   ├─ Static assets with 1-year cache
   └─ HTML files with no cache
   ↓
8. Invalidate CloudFront cache (/*) ← CRITICAL FOR UPDATES
   ↓
9. ✅ Deployment complete!
```

**Time:** ~2-3 minutes per deployment

---

## 🐛 Troubleshooting

### Deployment fails with "Access Denied"

**Quick Fix:**
1. Verify GitHub secrets are correct (especially `AWS_ROLE_ARN`)
2. Check IAM Role Trust Policy has your exact repo name
3. Ensure IAM Policy has correct S3 bucket ARN

### Changes not visible on website

**Quick Fix:**
1. Wait 1-5 minutes for CloudFront invalidation
2. Hard refresh browser: `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac)
3. Check GitHub Actions logs - did invalidation complete?
4. Verify CloudFront Distribution ID is correct in secrets

### Build fails

**Quick Fix:**
1. Test build locally: `npm run build`
2. Check `package.json` dependencies are correct
3. Ensure Node version matches (v20)

---

## 💰 Estimated AWS Costs

**For a typical landing page with moderate traffic:**
- **S3:** ~$0.50/month (storage + requests)
- **CloudFront:** ~$1-5/month (first 1TB transfer free)
- **Total:** ~$2-6/month

**Always free tier:**
- S3: 5GB storage, 20K GET requests
- CloudFront: 1TB data transfer, 10M requests
- First 1,000 CloudFront invalidation paths per month

---

## 🔐 Security Notes

✅ **What's secure:**
- OIDC authentication (no long-lived AWS keys in GitHub)
- Least-privilege IAM permissions
- HTTPS-only CloudFront distribution
- Secrets stored encrypted in GitHub

⚠️ **Remember:**
- Never commit `.env.deploy` (already in `.gitignore`)
- Never commit AWS credentials
- Keep IAM policies minimal (only S3 + CloudFront)
- Review AWS CloudTrail logs periodically

---

## 📞 Need Help?

1. **Full documentation:** `AWS_CICD_SETUP.md`
2. **Troubleshooting section:** `AWS_CICD_SETUP.md` → Troubleshooting
3. **Check GitHub Actions logs:** Actions tab → Click workflow → View logs
4. **Verify AWS setup:** Double-check ARNs and IDs match

---

## 🎉 Success Indicators

Your deployment is working when you see:

- ✅ GitHub Actions workflow completes (green checkmark)
- ✅ All workflow steps pass (especially invalidation)
- ✅ Changes visible on CloudFront URL within 5 minutes
- ✅ No errors in browser console
- ✅ Static assets loading properly

---

**Last Updated:** October 28, 2025  
**Quick Start Version:** 1.0

