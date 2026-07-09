#!/usr/bin/env node
import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const POSTS_DIR = join(__dirname, '..', 'src', 'content', 'posts');

// Title comes from everything after `npm run new --` (or `node scripts/new-post.mjs`).
const title = process.argv.slice(2).join(' ').trim();
if (!title) {
  console.error('Usage: npm run new -- "My post title"');
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')
  .slice(0, 80);

const date = new Date().toISOString().slice(0, 10);

const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
description: "${title.replace(/"/g, '\\"')}"
pubDate: ${date}
tags: []
draft: false
audio: true
---

Write your post in Markdown here.
`;

if (!existsSync(POSTS_DIR)) mkdirSync(POSTS_DIR, { recursive: true });

const target = join(POSTS_DIR, `${slug}.md`);
if (existsSync(target)) {
  console.error(`Already exists: ${target}`);
  process.exit(1);
}

writeFileSync(target, frontmatter, 'utf8');
console.log(`Created ${target}`);
