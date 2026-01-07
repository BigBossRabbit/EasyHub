import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITE_URL = 'https://bitcoin.okinent.org';

const routes = [
  '/',
  '/about',
  '/connect',
  '/easydevs',
  '/easyjobs',
  '/easytours',
  '/easytours/ultimate-namibia',
  '/timeforce',
  '/tpok',
  '/contact',
  '/terms',
  '/privacy'
];

const generateSitemap = () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes
    .map((route) => {
      return `
  <url>
    <loc>${SITE_URL}${route === '/' ? '' : route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route === '/' ? 'daily' : 'weekly'}</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`;
    })
    .join('')}
</urlset>`;

  fs.writeFileSync(path.join(__dirname, 'public', 'sitemap.xml'), sitemap);
  console.log('✅ Sitemap generated successfully!');
};

generateSitemap();
