# joshangell.co.uk: rules for Claude

Josh Angell's personal writing site. Just writing: a homepage listing and post
pages, nothing more. Keep it that way unless Josh asks for more.

## Stack

- Nuxt 4 + Nuxt Content 3. Posts are Markdown in `content/writing/`.
- `pnpm` only, never npm or yarn.
- Fully static (`pnpm build` → `.output/public`), served by the Cloudflare
  Worker `joshangell` as static assets. No server, no database, no CMS.
- Plain CSS with tokens on `:root` in `app/assets/css/main.css`. No Tailwind,
  no UI library.

## Deploying

**Every push to `master` deploys to production** (Cloudflare Workers Builds).
There's no staging. Before pushing:

1. `pnpm build`: must prerender with no errors.
2. `WORKERS_CI=1 pnpm build` then `npx wrangler deploy --dry-run`: this is how
   Cloudflare's builder sees it. The preset must say `static`.
3. Look at it: serve `.output/public` (e.g. `python3 -m http.server`) and
   check both themes at desktop and phone width.

Don't break these:

- `nitro.preset: 'static'` in `nuxt.config.ts`. Without it Nitro detects
  Cloudflare, builds a Worker server (and moves Content to D1), and the deploy
  fails looking for `index.mjs`.
- `"name": "joshangell"` in `wrangler.jsonc` must match the Worker in
  Cloudflare, or Workers Builds won't deploy.
- `autoSubfolderIndex: false` gives `writing/<slug>.html`, so
  `/writing/<slug>` is served without a slash redirect.
- `.node-version` stays at or above Nuxt's supported minimum (22.21).

## Domains

- **`https://www.joshangell.co.uk` is the primary address. Always www, never
  the bare domain.** `SITE_URL` in `shared/utils/site.ts` is the single source
  for canonical tags, `og:url`, `og:image` and the RSS feed. Never hard-code
  the origin anywhere else.
- The bare domain 301s to www via a Cloudflare Redirect Rule (not in this repo).
- **Leave angell.io alone.** It's a separate Vercel site with Google Workspace
  email on it. Don't redirect it, change its DNS or suggest doing so.

## Posts

- One file per post: `content/writing/<slug>.md`. The filename is the URL.
- Frontmatter: `title`, `date` (YYYY-MM-DD), `description` (one line, used in
  the listing, RSS and social cards). Nothing else is needed. The listing, post
  page and feed pick it up automatically.
- **These are Josh's words. Copy them verbatim.** Don't fix typos, grammar or
  tone, don't add headings, and don't "improve" anything unless he asks. If you
  spot a typo, mention it and leave it.
- No "originally published on Substack" line or similar. Josh removed it on
  purpose.
- Importing from Substack: fetch
  `https://angelljosh.substack.com/api/v1/posts/<slug>` and convert
  `body_html`. Don't use a summarising fetch tool: it paraphrases. Escape
  literal asterisks (`\*`), and use a non-breaking space before a trailing
  footnote marker so it can't wrap onto its own line.

## Design

Retro tech-nerd, simple. Two themes: a CRT dark theme (scanlines, glow) and a
greenbar-paper light theme, following `prefers-color-scheme`, with a
`[crt]` / `[paper]` toggle.

- **Accent is `#FB48C4` (Josh's brand pink) in both themes.** In light mode it
  falls below WCAG contrast for small text. Josh knows and chose it anyway, so
  don't "fix" it.
- Type: IBM Plex Mono throughout, VT323 for display headings.
- The Scafell photo (`public/scafell.jpg`) on the homepage is one Josh loves.
  Keep it.
- Footer line is exactly "Built with ❤️ by robots." Don't reword it.
- Terminal touches are part of the voice (`josh@angell:~$`, `ls -lt
  ~/writing`, `cd ..`, `[EOF]`, the DOS 404). Add more sparingly, if at all.
- Mobile works at 390px with a 16px gutter and no horizontal scroll.

## Images

Put them in `public/`, resized to about 1200px wide (`sips -Z 1200`). Write
real alt text describing the image. No Cloudinary or image CDN: the site is
too small to need one.

## Facts about Josh

Don't invent biography (job titles, places, dates) for the homepage or
anywhere else. Use only what Josh has said or what's already on the site, and
ask if it's unclear.
