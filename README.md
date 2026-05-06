# buildquietwinloud-site

Landing page for Build Quiet, Win Loud. Astro + Tailwind 4 + Motion + Lenis + GSAP. Deploys to Cloudflare Pages.

## Local dev

```
npm install
npm run dev
```

Opens on `http://localhost:4321`.

## Build + preview

```
npm run build
npm run preview
```

## Deploy (Cloudflare Pages)

1. `npm run build` — outputs to `dist/`
2. Push repo to GitHub
3. Cloudflare Pages → Connect to Git → pick repo → build command `npm run build`, output `dist`
4. Add env vars (see `.env.example`):
   - **For waitlist live:** add `BEEHIIV_API_KEY` + `BEEHIIV_PUBLICATION_ID`
   - **OR backup:** add `RESEND_API_KEY` + `RESEND_NOTIFY_TO` + `RESEND_NOTIFY_FROM`
   - If neither set, signups log to function logs (no data lost, but no follow-up triggered)
5. Add custom domain `buildquietwinloud.com` → CF auto-issues SSL
6. Update Namecheap DNS → point to CF nameservers (or CNAME if keeping NC DNS)

## Structure

```
src/
  components/
    Hero.astro            ← signature moment: ember letter-stagger reveal
    Manifesto.astro       ← scroll-triggered text reveals + 3 brief cards
    Waitlist.astro        ← form → /api/subscribe
    EmberParticles.astro  ← canvas, ~60 embers drifting up at 60fps
    SmoothScroll.astro    ← Lenis + GSAP ticker bridge
  layouts/Base.astro      ← html shell, fonts, meta
  pages/index.astro       ← composes the page
  styles/globals.css      ← Tailwind 4 import + design tokens

functions/
  api/subscribe.js        ← Cloudflare Pages Function: Beehiiv → Resend → log fallback
```

## Design system tokens (set in `globals.css`)

| token | hex | role |
|---|---|---|
| `--color-bg` | `#0a0807` | warm near-black background |
| `--color-cream` | `#f5ede0` | primary text |
| `--color-ember` | `#ff6a1a` | signature accent (use sparingly) |
| `--color-smoke` | `#8a8278` | secondary text |
| `--color-ash` | `#3a3530` | borders, dividers |

Display: Instrument Serif (italic). Body: Space Grotesk. Mono: JetBrains Mono. All Google Fonts.
