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
- `build` → `vite build` (compiles the app)
- `postbuild` → copies `index.html` to `404.html` (SPA routing fix), regenerates the
  sitemap, and copies `public/connect` into the bundle
- `gh-pages -d dist --dotfiles` → pushes the bundle to the gh-pages branch

All three are chained inside the `deploy` script because this machine sets
`ignore-scripts=true`, so npm's automatic `predeploy`/`postbuild` hooks never fire on
their own. Build and postbuild must finish before `gh-pages` publishes, or the SPA
fallback (`404.html`) is missing and every deep route 404s on GitHub Pages.

## Troubleshooting
- If deployment fails, ensure you have push access to the repository
- If the site shows old content, wait 2-3 minutes for GitHub Pages CDN to update
- Clear browser cache if changes aren't visible
