# Adeel's Blog

Hi, I am a software developer with experience working in systems programming
languages like C++, Rust and Go. My aim with this blog is to document what I
am working on and what I am building.

## Features

- Posts written in plain **Markdown**.
- Light / dark mode that remembers your choice.
- **Listen**: any post can be read aloud by your browser — no audio files, no
  accounts, fully offline. Pick from the available voices.
- Search and tag filtering.
- **RSS** feed for feed readers.
- Beautified **code blocks** with syntax highlighting, a language label and a
  copy button.
- Images and gifs supported (drop them in `public/` and link with `/images/...`).

## Writing a post

Create a file in `src/content/posts/`, e.g. `my-post.md`:

```markdown
---
title: "My post"
description: "One-line summary used on cards and RSS."
pubDate: 2026-07-09
tags: ["notes"]
draft: false
audio: true
---

Write your post in **Markdown** here.
```

Or scaffold one with a title:

```bash
npm run new -- "My post title"
```

Preview locally:

```bash
npm run dev      # http://localhost:4321
```

When you're happy, commit and push — the new post goes live.
