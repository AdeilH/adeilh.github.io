import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Change `site` to your real domain. It is used for RSS, sitemap and canonical URLs.
export default defineConfig({
  site: 'https://blogs.adeel.codes',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      wrap: false,
    },
  },
  // Security headers for `astro preview` and local dev.
  // When you deploy (Netlify/Vercel/GitHub Pages) set the same policy there.
  server: {
    headers: {
      'Content-Security-Policy':
        "default-src 'self'; img-src 'self' data:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; style-src-attr 'self' 'unsafe-inline'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'",
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'X-Frame-Options': 'DENY',
      'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
    },
  },
});
