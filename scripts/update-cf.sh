#!/bin/bash
set -e
cd /home/jkang1643/projects/exbabel
ETAG=$(aws cloudfront describe-function --name security-headers-injector --query ETag --output text)
echo "Current ETag: $ETAG"
NEW_ETAG=$(aws cloudfront update-function --name security-headers-injector --function-config Comment=Injects-security-headers,Runtime=cloudfront-js-1.0 --function-code fileb://cloudfront-response-function.js --if-match $ETAG --query ETag --output text)
echo "Updated ETag: $NEW_ETAG"
aws cloudfront publish-function --name security-headers-injector --if-match $NEW_ETAG
echo "Published CloudFront Function security-headers-injector successfully!"
