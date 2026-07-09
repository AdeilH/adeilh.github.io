# another blog

A small, fast and **private** blog built with [Astro](https://astro.build).

- Posts are written in plain **Markdown** and pushed with **git**.
- Static site — no database, no login, no tracking, no third-party scripts.
- **Listen** on every post: reads it aloud using your browser's built-in
  speech (Web Speech API). It auto-picks a high-quality English voice and lets
  you switch voices. No audio files, no API keys, fully offline.
- Light/dark mode, search, tag filtering, RSS feed, sitemap.
- **Beautified code blocks**: syntax highlighting (Shiki), a language label
  and a one-click copy button, with correct colours in both light and dark mode.
- Secure by default: strict Content-Security-Policy, no cookies.

## Requirements

- Node.js 18.17+ (Node 20+ recommended)

## Local development

```bash
npm install
npm run dev      # http://localhost:4321
```

## Writing a post

1. Create a file in `src/content/posts/`, e.g. `my-post.md`.
2. Add the frontmatter at the top:

   ```markdown
   ---
   title: "My post title"
   description: "One-line summary used on cards and RSS."
   pubDate: 2026-07-09
   tags: ["writing", "notes"]   # optional
   draft: false                 # set true to hide it
   audio: true                  # set false to hide the Listen button
   ---

   Write your post in **Markdown** here.
   ```

3. Save. The dev server updates instantly.
4. Commit and push:

   ```bash
   git add src/content/posts/my-post.md
   git commit -m "Add my post"
   git push
   ```

The post URL will be `/my-post/` (the filename without `.md`). The home page
(`/`) is the blog index.

## Building & deploying

```bash
npm run build    # outputs static files to ./dist
npm run preview  # preview the build locally
```

`dist/` is plain static files. Host it anywhere:

- **GitHub Pages / Netlify / Vercel / Cloudflare Pages**: connect the repo and
  set the build command to `npm run build` and the publish directory to `dist`.
- **Any web server**: copy `dist/` to your web root.

> Set your real domain in `astro.config.mjs` (`site:`) so RSS, sitemap and
> canonical URLs are correct. The included `server.headers` CSP applies to
> `npm run preview`; replicate it in your host's config for production
> (e.g. a `public/_headers` file on Netlify, or your server config).

## Security notes

- The site is static: there is no server-side code to attack.
- A Content-Security-Policy is set (scripts/styles are same-origin only,
  no `unsafe-eval`, no third parties). Tighten it further on your host if you
  like.
- No analytics, no cookies, no fingerprinting. The only thing stored in the
  visitor's browser is their theme preference (`localStorage`).
- The "Listen" feature runs entirely in the visitor's browser via the Web
  Speech API; nothing is uploaded.

## Dependency pinning & supply-chain safety

- All direct dependencies are pinned to **exact versions** (no `^`/`~` ranges)
  in `package.json`, and `package-lock.json` locks the entire tree so installs
  are reproducible.
- `.npmrc` enforces `save-exact=true` (future installs stay exact), pins the
  official `registry.npmjs.org`, and fails the install on any high/critical
  advisory.
- Run the security check any time with:

  ```bash
  npm run security:check   # npm audit --audit-level=high
  ```

   Always commit `package-lock.json` so CI/production installs use the locked
  tree. On a clean machine you can verify with `npm ci`.

## Project structure

```
src/
  components/   Header, Footer, ThemeToggle, ListenButton, PostCard, FormattedDate
  content/
    posts/      your Markdown posts live here
  layouts/      BaseLayout, PostLayout
  pages/        index (blog home), [..slug] (post), rss.xml, 404
  styles/       global.css
public/         favicon.svg, _headers
```

> The site is already pinned to a patched Astro 7 with **0 known
> vulnerabilities** (`npm run security:check`).
