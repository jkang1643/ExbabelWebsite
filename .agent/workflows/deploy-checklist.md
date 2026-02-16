---
description: Repeatable Deployment Checklist for Exbabel
---

# Repeatable Deployment Checklist

Follow these steps exactly to ensure your production site matches your local development environment.

## 1. Clean Build
Clear out old artifacts to prevent interference.
// turbo
```bash
npm run clean
```

## 2. Rebuild
Generate fresh static files.
// turbo
```bash
npm run build
```

## 3. Verify Build Output
Don't skip this! Check that the files actually exist in `out/`.
- [ ] **Check index.html**: Does it contain the new sections?
  ```bash
  grep "What sets Exbabel apart" out/index.html
  ```
- [ ] **Check Videos**: Do they exist in the output?
  ```bash
  ls out/videos
  ```

## 4. Sync to S3 with Delete
Sync the `out` folder to the bucket and remove any files on S3 that are no longer in your local `out` folder.
// turbo
```bash
bash scripts/deploy-local.sh
```
*(Ensure your `deploy-local.sh` is updated to include the `--delete` flag in all sync commands)*

## 5. Invalidate CloudFront
Force CloudFront to fetch the newest version from S3.
*(This is usually handled automatically by `deploy-local.sh`)*

## 6. Check the Exact URL
Verify on the live domain:
- `https://exbabel.com` (or your specific CloudFront URL)
- Force a hard refresh in your browser: `Ctrl + F5` or `Cmd + Shift + R`
