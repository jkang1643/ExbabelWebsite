# Engineering Log

This document serves as a historical record of significant technical changes, bug fixes, and feature implementations for ExBabel.

## 🐛 Bug Fixes

### [PR 0] Fix: Production Routing for Sub-directories (e.g., /guides)
- **Problem**: Next.js static exports on S3/CloudFront would fail to route sub-folders (like `/guides`) correctly, often falling back to `index.html` (the home page).
- **Solution**: Implemented a CloudFront Function `directory-index-rewrite` to automatically append `index.html` to URIs missing an extension or ending in a slash.
- **Artifacts**: 
  - `cloudfront-function.js` (Contains rewrite logic)
  - `AWS_CICD_SETUP.md` (Updated with manual deployment steps in Step 2.5)
- **Date**: 2026-01-19

---

## ✨ Features
*(Blank - awaiting future feature implementations)*

---
