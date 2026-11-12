# JAZZEL Furniture — Cloudflare deployment

This is the Cloudflare build of the site. The whole site is static (fully
client-side: the cart lives in the visitor's browser and checkout sends
the order through WhatsApp), so it runs on Cloudflare's free tier with no
server, no database and no environment variables.

The repo already contains a **prebuilt `out/` folder** and a
**`wrangler.toml`** in Workers static-assets format — so the default
Cloudflare git-integration deploy command (`npx wrangler deploy`) works
out of the box. You can also deploy without installing anything (Option
A), build from source (Option B), or deploy straight from your terminal
with Wrangler (Option C).

---

## Option A — Direct upload (fastest, ~2 minutes)

1. Unzip this package.
2. Go to **https://dash.cloudflare.com** → **Workers & Pages** →
   **Create** → **Pages** → **Upload assets**.
3. Project name: `jazelle` (or anything you like).
4. Drag the contents of the **`out/`** folder (the folder's *contents* —
   `index.html`, `_next/`, `assets/`, `brand/`, `_headers` …) into the
   upload area.
5. Click **Deploy**. Your site is live at
   `https://<project-name>.pages.dev`.

No build step, no Node, no config needed.

## Option B — Deploy from Git (auto-deploys on every push)

1. Push this folder to a GitHub/GitLab repo.
2. In Cloudflare: **Workers & Pages** → **Create** → **Workers** →
   **Connect to Git** → pick the repo.
3. Build settings (the defaults "Deploy command: `npx wrangler deploy`"
   work out of the box with the included `wrangler.toml`):
   - **Build command:** `npm run build`
   - **Deploy command:** `npx wrangler deploy` (default)
   - **Environment variable** (Settings → Environment variables):
     `NODE_VERSION` = `22`
4. **Save and Deploy.** Live at `jazelle-furniture.<your-subdomain>.workers.dev`.

> Prefer a classic **Pages** project (`*.pages.dev`)? Create it as a Pages
> project instead with build output directory `out`, and change the deploy
> command to `npx wrangler pages deploy out` — everything else is identical.

## Option C — Deploy with Wrangler CLI (terminal, no dashboard)

The project ships with a `wrangler.toml` (Workers static-assets config,
`serving out/`) and wrangler is already in `devDependencies`.

```bash
npm install          # or: bun install
npm run deploy       # or: npx wrangler deploy
```

**First time — log in:** run `npx wrangler login` once; it opens a browser
to connect your Cloudflare account (no credentials stored in the repo).
Prefer a CI token? set `CLOUDFLARE_API_TOKEN` (Workers:Edit permission)
and `CLOUDFLARE_ACCOUNT_ID` instead — no browser needed.

- The first `npm run deploy` **creates** the `jazelle-furniture` Worker
  with static assets automatically and deploys `out/`.
- Every later run publishes a new version (roll back from the dashboard →
  Deployments).
- Changed the source? `npm run build` first, then `npm run deploy`.
- Preview locally on Cloudflare's own runtime: `npm run preview`
  (= `wrangler dev`, serves `out/` at http://localhost:8788).

> **Troubleshooting** — if a build log ever shows
> *"WARNING: you have run `wrangler deploy` on a Pages project"* or
> *"Missing entry-point to Worker script or to assets directory"*, the
> old Pages-style config (`pages_build_output_dir`) is being used.
> The `wrangler.toml` in this package already uses the Workers
> `[assets]` format, which works with plain `npx wrangler deploy`.

---

## After deploy: use your own domain

- In the Workers project → **Settings → Domains & Routes** → **Add** →
  **Custom domain** → enter `jazzel.lk` (or your domain) and follow the
  DNS instructions. (Pages project: **Custom domains**.)
- If you deploy under a domain **other than jazzel.lk**, update
  `metadataBase` in `src/app/layout.tsx` (it controls the social-share
  image URL) and rebuild.

## Good to know

| Thing | Where / how |
| --- | --- |
| Products, prices, categories | `src/lib/products.ts` — edit and rebuild |
| Brand info (phone, WhatsApp, socials) | `BRAND` object in `src/lib/products.ts` |
| Checkout | Opens WhatsApp with the order summary — no server involved |
| Caching rules | `public/_headers` (applied automatically by wrangler, 4 rules) |
| Hero / brand images | `public/brand/`, product photos in `public/assets/` |
| Styling & theme | `src/app/globals.css` + Tailwind config |

## Local development

```bash
npm install     # or: bun install
npm run dev     # http://localhost:3000  (Next.js dev server)
npm run build   # regenerates out/
npm run preview # http://localhost:8788 (wrangler dev, serves out/ on Cloudflare's runtime)
npm run deploy  # deploys out/ as a Worker with static assets (wrangler login first)
```
