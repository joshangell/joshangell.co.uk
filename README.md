# joshangell.co.uk

Josh Angell’s personal site: writing, and not much else. Nuxt 4 + Nuxt Content,
generated to static HTML and hosted on Cloudflare Pages.

## Writing a post

Add a Markdown file to `content/writing/`. The filename is the URL slug.

```md
---
title: The title
date: 2026-10-07
description: One line for the listing, RSS and social cards.
---

The post.
```

Posts are listed newest first. The homepage, the post page and `/feed.xml` all
pick it up; there is nothing else to register.

## Local

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # static site in .output/public
```

Node 22.13+ (Nuxt Content uses the built-in `node:sqlite`, so there's no native
module to compile).

## Hosting (Cloudflare Workers, free plan)

A Worker with static assets only, no Worker script; `wrangler.jsonc` points it
at `.output/public`. Connected to this repo with Workers Builds:

- Build command: `pnpm build`
- Deploy command: `npx wrangler deploy`
- Production branch: `master`; `.node-version` pins Node

Custom domains (Worker → Settings → Domains & Routes): `joshangell.co.uk` and
`www.joshangell.co.uk`.

### angell.io → joshangell.co.uk

angell.io doesn't serve the site. It 301s everything here, so links to it keep
working. In the angell.io zone: **Rules → Redirect Rules → Create**:

- When: all incoming requests
- Then: dynamic redirect, expression
  `concat("https://joshangell.co.uk", http.request.uri.path)`, status 301,
  preserve query string

The zone needs a proxied (orange-cloud) DNS record for the rule to fire, e.g.
`A @ 192.0.2.1` and `CNAME www @`.
