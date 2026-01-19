# GitHub Actions CI/CD Pipeline to AWS (OIDC)

Complete walkthrough for setting up a secure CI/CD pipeline from GitHub Actions to AWS using OpenID Connect (OIDC) for your Next.js static site.

## Table of Contents
1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [AWS Setup](#aws-setup)
4. [GitHub Setup](#github-setup)
5. [Testing the Pipeline](#testing-the-pipeline)
6. [Troubleshooting](#troubleshooting)

---

## Overview

This setup will:
- ✅ Build your Next.js static site automatically on push to `main`
- ✅ Deploy to S3 bucket
- ✅ Invalidate CloudFront cache for instant updates
- ✅ Use OIDC for secure authentication (no long-lived AWS credentials)
- ✅ Apply proper cache headers for optimal performance

**Architecture:**
```
GitHub Actions → AWS OIDC → IAM Role → S3 Bucket + CloudFront
```

---

## Prerequisites

- AWS Account with admin access
- GitHub repository for this project
- Domain name (optional, for custom domain)
- AWS CLI installed locally (for testing)

---

## AWS Setup

### Step 1: Create S3 Bucket for Static Hosting

1. **Open AWS Console** → Navigate to **S3**

2. **Create bucket:**
   ```
   Bucket name: exbabel-production (or your choice)
   Region: us-east-1 (or your preferred region)
   
   ⚠️ Uncheck "Block all public access"
   ✅ Check "I acknowledge that the current settings might result in this bucket and objects becoming public"
   ```

3. **Enable Static Website Hosting:**
   - Go to bucket → **Properties** tab
   - Scroll to **Static website hosting**
   - Click **Edit**
   - Enable: **Static website hosting**
   - Index document: `index.html`
   - Error document: `404.html`
   - Save changes

4. **Add Bucket Policy** (Properties → Permissions → Bucket Policy):
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::exbabel-production/*"
       }
     ]
   }
   ```
   ⚠️ Replace `exbabel-production` with your bucket name

---

### Step 2: Create CloudFront Distribution

1. **Open AWS Console** → Navigate to **CloudFront**

2. **Create distribution:**
   ```
   Origin domain: Select your S3 bucket from dropdown
   Origin path: (leave empty)
   Name: exbabel-s3-origin
   
   Origin access: Public
   ```

3. **Default cache behavior:**
   ```
   Viewer protocol policy: Redirect HTTP to HTTPS
   Allowed HTTP methods: GET, HEAD, OPTIONS
   Cache policy: CachingOptimized
   ```

4. **Settings:**
   ```
   Price class: Use all edge locations (or choose based on budget)
   Alternate domain name (CNAME): yourdomain.com (optional)
   Custom SSL certificate: Request/Import certificate (if using custom domain)
   Default root object: index.html
   ```

5. **Create distribution** and wait for deployment (5-10 minutes)

6. **Note the Distribution ID** (e.g., `E1ABCDEFGHIJK`) - you'll need this!

7. **Configure Error Pages** (after distribution is created):
   - Go to distribution → **Error pages** tab
   - Create custom error response:
     ```
     HTTP error code: 404
     Customize error response: Yes
     Response page path: /404.html
     HTTP response code: 404
     ```

---

### Step 2.5: Add CloudFront Function (Essential for Routing)

This prevents sub-routes (like `/guides`) from showing the home page.

1.  **Open CloudFront Console** → **Functions**
2.  **Create function**:
    - Name: `directory-index-rewrite`
    - Runtime: `cloudfront-js-1.0` (or 2.0)
3.  **Paste code**:
    - Copy code from `cloudfront-function.js` in this repo.
4.  **Publish** the function.
5.  **Associate with Distribution**:
    - Go to your **Distribution** → **Behaviors**
    - Select the default behavior (`*`) → **Edit**
    - Scroll to **Function associations**
    - Viewer request: `Function` -> `directory-index-rewrite`
    - **Save changes**

---

### Step 3: Set Up OIDC Identity Provider

1. **Open AWS Console** → Navigate to **IAM**

2. **Create Identity Provider:**
   - Click **Identity providers** → **Add provider**
   - Provider type: **OpenID Connect**
   - Provider URL: `https://token.actions.githubusercontent.com`
   - Click **Get thumbprint**
   - Audience: `sts.amazonaws.com`
   - Click **Add provider**

---

### Step 4: Create IAM Policy for Deployment

1. **In IAM Console** → Click **Policies** → **Create policy**

2. **Use JSON editor** and paste:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "S3Deployment",
         "Effect": "Allow",
         "Action": [
           "s3:PutObject",
           "s3:PutObjectAcl",
           "s3:GetObject",
           "s3:ListBucket",
           "s3:DeleteObject"
         ],
         "Resource": [
           "arn:aws:s3:::exbabel-production",
           "arn:aws:s3:::exbabel-production/*"
         ]
       },
       {
         "Sid": "CloudFrontInvalidation",
         "Effect": "Allow",
         "Action": [
           "cloudfront:CreateInvalidation",
           "cloudfront:GetInvalidation",
           "cloudfront:ListInvalidations"
         ],
         "Resource": "arn:aws:cloudfront::YOUR_ACCOUNT_ID:distribution/YOUR_DISTRIBUTION_ID"
       }
     ]
   }
   ```

3. **Replace placeholders:**
   - `exbabel-production` → your bucket name
   - `YOUR_ACCOUNT_ID` → your AWS account ID (12 digits)
   - `YOUR_DISTRIBUTION_ID` → your CloudFront distribution ID

4. **Name the policy:** `GitHubActionsDeploymentPolicy`

5. **Create policy**

---

### Step 5: Create IAM Role for GitHub Actions

1. **In IAM Console** → Click **Roles** → **Create role**

2. **Select trusted entity:**
   - Trusted entity type: **Web identity**
   - Identity provider: Select the OIDC provider you created
   - Audience: `sts.amazonaws.com`

3. **Add permissions:**
   - Search and select `GitHubActionsDeploymentPolicy` (created in Step 4)

4. **Name the role:** `GitHubActionsDeploymentRole`

5. **Create role**

6. **Edit Trust Policy** (Important!):
   - Go to the role → **Trust relationships** tab
   - Click **Edit trust policy**
   - Replace with:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Principal": {
           "Federated": "arn:aws:iam::YOUR_ACCOUNT_ID:oidc-provider/token.actions.githubusercontent.com"
         },
         "Action": "sts:AssumeRoleWithWebIdentity",
         "Condition": {
           "StringEquals": {
             "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
           },
           "StringLike": {
             "token.actions.githubusercontent.com:sub": "repo:YOUR_GITHUB_USERNAME/exbabel:ref:refs/heads/main"
           }
         }
       }
     ]
   }
   ```

7. **Replace placeholders:**
   - `YOUR_ACCOUNT_ID` → your AWS account ID
   - `YOUR_GITHUB_USERNAME` → your GitHub username or organization
   - `exbabel` → your repository name (if different)

8. **Save changes**

9. **Copy the Role ARN** (e.g., `arn:aws:iam::123456789012:role/GitHubActionsDeploymentRole`)

---

## GitHub Setup

### Step 6: Add Secrets to GitHub Repository

1. **Go to your GitHub repository**

2. **Navigate to:** Settings → Secrets and variables → Actions

3. **Add the following Repository secrets:**

   | Secret Name | Value | Example |
   |------------|-------|---------|
   | `AWS_ROLE_ARN` | IAM Role ARN from Step 5 | `arn:aws:iam::123456789012:role/GitHubActionsDeploymentRole` |
   | `S3_BUCKET_NAME` | Your S3 bucket name | `exbabel-production` |
   | `CLOUDFRONT_DISTRIBUTION_ID` | CloudFront Distribution ID from Step 2 | `E1ABCDEFGHIJK` |
   | `NEXT_PUBLIC_APP_URL` | Your SaaS app URL | `https://app.exbabel.com` |

4. **Click "New repository secret"** for each one

   > **📝 Note:** The `NEXT_PUBLIC_APP_URL` secret replaces your local `.env.production` file. Any environment variables prefixed with `NEXT_PUBLIC_` that you use locally should be added as GitHub secrets.

---

### Step 7: Customize the Workflow (Optional)

The workflow file `.github/workflows/deploy.yml` is already configured, but you can customize:

1. **Change AWS Region:**
   ```yaml
   env:
     AWS_REGION: 'us-west-2'  # Change to your region
   ```

2. **Deploy on different branches:**
   ```yaml
   on:
     push:
       branches:
         - main
         - production  # Add more branches
   ```

3. **Add environment-specific deployments:**
   ```yaml
   - name: Set environment
     run: |
       if [ "${{ github.ref }}" == "refs/heads/main" ]; then
         echo "ENVIRONMENT=production" >> $GITHUB_ENV
       else
         echo "ENVIRONMENT=staging" >> $GITHUB_ENV
       fi
   ```

---

## Testing the Pipeline

### Step 8: Trigger Your First Deployment

1. **Make a small change** to your codebase (e.g., edit `app/page.tsx`)

2. **Commit and push to main:**
   ```bash
   git add .
   git commit -m "Test CI/CD pipeline"
   git push origin main
   ```

3. **Watch the deployment:**
   - Go to GitHub → **Actions** tab
   - Click on the running workflow
   - Monitor each step in real-time

4. **Verify deployment:**
   - Wait for CloudFront invalidation to complete (1-5 minutes)
   - Visit your CloudFront URL or custom domain
   - Verify your changes are live

---

### Step 9: Manual Deployment (Optional)

You can trigger deployments manually:

1. **Go to GitHub** → Actions tab
2. **Select "Deploy to AWS" workflow**
3. **Click "Run workflow"**
4. **Choose branch** and click "Run workflow"

---

## Troubleshooting

### Issue: "User is not authorized to perform: sts:AssumeRoleWithWebIdentity"

**Solution:**
- Verify the Trust Policy in your IAM Role matches your GitHub repo exactly
- Check that `YOUR_GITHUB_USERNAME/exbabel` matches your actual repo path
- Ensure the OIDC provider is created correctly

### Issue: "Access Denied" when syncing to S3

**Solution:**
- Verify the IAM policy has the correct S3 bucket ARN
- Check that the bucket name in secrets matches exactly
- Ensure the policy is attached to the role

### Issue: "Distribution not found" during CloudFront invalidation

**Solution:**
- Verify `CLOUDFRONT_DISTRIBUTION_ID` secret is correct
- Check the CloudFront ARN in the IAM policy matches
- Ensure CloudFront distribution is fully deployed

### Issue: Changes not appearing on the site

**Solution:**
- Wait 1-5 minutes for CloudFront invalidation to complete
- Check CloudFront → Invalidations tab for status
- Try hard refresh in browser (Ctrl+F5 or Cmd+Shift+R)
- Verify the workflow completed successfully

### Issue: "npm ci" fails with permission errors

**Solution:**
- Delete `package-lock.json` and regenerate it
- Ensure Node version in workflow matches your local version
- Check for platform-specific dependencies

---

## Security Best Practices

✅ **Implemented:**
- OIDC authentication (no long-lived credentials)
- Least privilege IAM policy
- Branch-specific deployment restrictions
- HTTPS-only CloudFront distribution

📝 **Additional recommendations:**
- Enable CloudFront logging for security auditing
- Set up AWS CloudTrail for API call monitoring
- Use separate AWS accounts for staging/production
- Implement branch protection rules in GitHub
- Add required approvals for production deployments

---

## Cost Optimization

**Estimated Monthly Costs:**
- S3 storage: ~$0.023 per GB
- CloudFront data transfer: First 1TB free, then ~$0.085 per GB
- CloudFront requests: First 10M free, then $0.0075 per 10,000
- CloudFront invalidations: First 1,000 paths free per month

**Tips to reduce costs:**
- Use CloudFront Price Class to limit edge locations
- Optimize cache headers to reduce origin requests
- Compress assets before deployment
- Consider invalidating specific paths instead of `/*`

---

## Next Steps

🚀 **Enhancements to consider:**

1. **Add staging environment:**
   - Create separate S3 bucket and CloudFront distribution
   - Deploy `develop` branch to staging

2. **Implement health checks:**
   - Add smoke tests after deployment
   - Verify critical pages load correctly

3. **Add notifications:**
   - Configure Slack/Discord webhooks
   - Send deployment status notifications

4. **Performance monitoring:**
   - Integrate AWS CloudWatch
   - Set up alerts for errors

5. **Custom domain:**
   - Set up Route 53 DNS
   - Configure SSL certificate in ACM
   - Add CNAME records for CloudFront

---

## Quick Reference Commands

### AWS CLI Commands for Testing

```bash
# Test S3 sync locally
aws s3 sync out/ s3://exbabel-production --dryrun

# Create CloudFront invalidation
aws cloudfront create-invalidation \
  --distribution-id E1ABCDEFGHIJK \
  --paths "/*"

# Check invalidation status
aws cloudfront get-invalidation \
  --distribution-id E1ABCDEFGHIJK \
  --id INVALIDATION_ID

# List bucket contents
aws s3 ls s3://exbabel-production --recursive
```

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npx serve out
```

---

## Support

If you encounter issues:
1. Check GitHub Actions logs for detailed error messages
2. Review AWS CloudWatch logs
3. Verify all ARNs and IDs in secrets match AWS resources
4. Ensure IAM policies have correct permissions

---

**Last Updated:** October 28, 2025
**Pipeline Version:** 1.0.0

