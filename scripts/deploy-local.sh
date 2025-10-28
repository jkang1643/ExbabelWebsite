#!/bin/bash

# Local deployment script for testing AWS deployment manually
# Usage: ./scripts/deploy-local.sh

set -e

echo "🚀 Starting local deployment to AWS..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo -e "${RED}❌ AWS CLI is not installed${NC}"
    echo "Install it from: https://aws.amazon.com/cli/"
    exit 1
fi

# Check if .env file exists
if [ ! -f ".env.deploy" ]; then
    echo -e "${YELLOW}⚠️  .env.deploy file not found${NC}"
    echo "Creating template..."
    cat > .env.deploy << EOF
# AWS Deployment Configuration
AWS_REGION=us-east-1
S3_BUCKET_NAME=your-bucket-name
CLOUDFRONT_DISTRIBUTION_ID=your-distribution-id
AWS_PROFILE=default
EOF
    echo -e "${YELLOW}Please edit .env.deploy with your AWS configuration${NC}"
    exit 1
fi

# Load environment variables
source .env.deploy

# Validate required variables
if [ -z "$S3_BUCKET_NAME" ] || [ "$S3_BUCKET_NAME" = "your-bucket-name" ]; then
    echo -e "${RED}❌ S3_BUCKET_NAME not configured in .env.deploy${NC}"
    exit 1
fi

if [ -z "$CLOUDFRONT_DISTRIBUTION_ID" ] || [ "$CLOUDFRONT_DISTRIBUTION_ID" = "your-distribution-id" ]; then
    echo -e "${RED}❌ CLOUDFRONT_DISTRIBUTION_ID not configured in .env.deploy${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Configuration loaded${NC}"
echo "  Region: $AWS_REGION"
echo "  Bucket: $S3_BUCKET_NAME"
echo "  Distribution: $CLOUDFRONT_DISTRIBUTION_ID"
echo ""

# Build the application
echo "📦 Building Next.js application..."
npm run build

if [ ! -d "out" ]; then
    echo -e "${RED}❌ Build failed - 'out' directory not found${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Build completed${NC}"
echo ""

# Sync to S3
echo "☁️  Syncing to S3..."

# Upload non-HTML files with long cache
aws s3 sync out/ s3://$S3_BUCKET_NAME \
    --region $AWS_REGION \
    --profile ${AWS_PROFILE:-default} \
    --delete \
    --cache-control "public, max-age=31536000, immutable" \
    --exclude "*.html" \
    --exclude "*.txt"

# Upload HTML files with short cache
aws s3 sync out/ s3://$S3_BUCKET_NAME \
    --region $AWS_REGION \
    --profile ${AWS_PROFILE:-default} \
    --delete \
    --cache-control "public, max-age=0, must-revalidate" \
    --exclude "*" \
    --include "*.html" \
    --include "*.txt" \
    --content-type "text/html"

echo -e "${GREEN}✓ S3 sync completed${NC}"
echo ""

# Invalidate CloudFront cache
echo "🔄 Invalidating CloudFront cache..."

INVALIDATION_OUTPUT=$(aws cloudfront create-invalidation \
    --distribution-id $CLOUDFRONT_DISTRIBUTION_ID \
    --paths "/*" \
    --region $AWS_REGION \
    --profile ${AWS_PROFILE:-default} \
    --output json)

INVALIDATION_ID=$(echo $INVALIDATION_OUTPUT | grep -o '"Id": "[^"]*' | cut -d'"' -f4)

echo -e "${GREEN}✓ Invalidation created: $INVALIDATION_ID${NC}"
echo ""

# Get CloudFront domain
CLOUDFRONT_DOMAIN=$(aws cloudfront get-distribution \
    --id $CLOUDFRONT_DISTRIBUTION_ID \
    --region $AWS_REGION \
    --profile ${AWS_PROFILE:-default} \
    --query 'Distribution.DomainName' \
    --output text)

echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
echo ""
echo "🌐 Your site is available at:"
echo "   https://$CLOUDFRONT_DOMAIN"
echo ""
echo "⏱️  CloudFront invalidation may take 1-5 minutes to complete"
echo "   Check status with:"
echo "   aws cloudfront get-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION_ID --id $INVALIDATION_ID"

