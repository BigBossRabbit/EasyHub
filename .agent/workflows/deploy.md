---
description: Deploy the EasyHub site to GitHub Pages (bitcoin.okinent.org)
---

# Deploy Workflow

## Prerequisites
- All changes should be committed to `main` branch before deploying
- Run `/git-workflow` first if you have uncommitted changes

## Deployment Steps

1. Run the deployment command:
// turbo
```bash
npm run deploy
```

2. Wait for build and gh-pages push to complete (usually takes 30-60 seconds)

3. Verify deployment at one of these URLs:
   - GitHub Pages: https://bigbossrabbit.github.io/EasyHub/
   - Custom Domain: https://bitcoin.okinent.org

## What This Does
The `npm run deploy` command runs these scripts in sequence:
- `predeploy` → `npm run build` (builds production bundle)
- `build` → `vite build` (compiles the app)
- `postbuild` → copies `index.html` to `404.html` (SPA routing fix)
- `deploy` → `gh-pages -d dist` (pushes to gh-pages branch)

## Troubleshooting
- If deployment fails, ensure you have push access to the repository
- If the site shows old content, wait 2-3 minutes for GitHub Pages CDN to update
- Clear browser cache if changes aren't visible
