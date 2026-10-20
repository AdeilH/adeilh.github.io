import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// Change `site` to your real domain. It is used for RSS, sitemap and canonical URLs.
export default defineConfig({
  site: 'https://blogs.adeel.codes',
  integrations: [sitemap()],
  markdown: {
    // Unified Markdown processor (instead of the Sätteri default) so remark/rehype
    // plugins can run: render $...$ / $$...$$ LaTeX to KaTeX HTML at build time.
    // No client JS, so the CSP stays intact. KaTeX CSS is imported in BaseLayout.
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
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
