# buildquietwinloud-site

The source code behind **[buildquietwinloud.com](https://buildquietwinloud.com)** — a personal-brand
landing + weekly letter for builders, hustlers, and operators using AI to ship real work.

Built end-to-end in about 4 hours of focused work over a weekend, mostly with
[Claude Code](https://www.anthropic.com/claude-code) doing the typing. Full story in the guide:
**[How I Built buildquietwinloud.com in 4 Hours](https://buildquietwinloud.com/guides/built-this-site/)**.

Open-sourced as a receipt — and as a starter template if you want to build something similar.

---

## Stack

| Layer | Tool | Why |
|---|---|---|
| Framework | [Astro 6](https://astro.build) | Static-first, ships zero JS by default, dirt fast |
| Styling | [Tailwind 4](https://tailwindcss.com) | Design tokens in CSS, no plugin config |
| Smooth scroll | [Lenis](https://lenis.darkroom.engineering) | Physics-weighted scrolling |
| Animation | [GSAP](https://gsap.com) | ScrollTrigger reveals + magnetic CTA |
| Hosting | [Cloudflare Pages](https://pages.cloudflare.com) | Free tier, edge-deployed, custom domain free |
| Backend | Cloudflare Pages Functions | Serverless waitlist endpoint, no separate server |
| Newsletter | [Beehiiv](https://www.beehiiv.com) | Form POST → subscriber list, free up to 2.5K subs |
| Domain | [Namecheap](https://www.namecheap.com) → Cloudflare DNS | Cheap registration, fast resolution |

**Cost: ~$1.10 / month amortized.** Just the domain renewal.

---

## Local dev

Requires Node 18+.

```bash
npm install
npm run dev
```

Opens on `http://localhost:4321`.

---

## Build + preview

```bash
npm run build      # static site → dist/
npm run preview    # serves dist/ locally
```

For full Pages Function simulation (form POST → Beehiiv path), use Wrangler:

```bash
npx wrangler pages dev dist
```

---

## Deploy (Cloudflare Pages)

1. Fork this repo
2. `npm run build` → outputs to `dist/`
3. Cloudflare Pages → **Create project** → **Connect to Git** → pick the fork
4. Build command: `npm run build` · Output: `dist`
5. **Environment variables** — copy from `.env.example`. At minimum, you want:
   - `BEEHIIV_API_KEY` + `BEEHIIV_PUBLICATION_ID` for live waitlist
   - Optional fallback: `RESEND_API_KEY` + `RESEND_NOTIFY_TO` + `RESEND_NOTIFY_FROM`
   - If neither is set, signups log to function logs (no data lost, but no follow-up)
6. Add custom domain → Cloudflare auto-issues SSL
7. Point your registrar's nameservers at Cloudflare (recommended) or add CNAME records

---

## Structure

```
src/
  components/
    Header.astro          ← sticky nav
    Hero.astro            ← signature: massive Anton type + magnetic CTA + reveal
    Refrain.astro         ← cyan-banner repeating wordmark ribbon
    StackMarquee.astro    ← horizontal infinite tools scroll
    Lanes.astro           ← 5 lanes table (live + soon + coming)
    WhoFor.astro          ← editorial statement on paper-dim bg
    About.astro           ← 3 backstory blocks + scroll-into-view stat ticker
    Footer.astro          ← dark wordmark + social icons + meta
    SmoothScroll.astro    ← Lenis + GSAP ticker bridge
  layouts/
    Base.astro            ← html shell, fonts, OG meta, JSON-LD
    Guide.astro           ← shell for /guides/* posts with prose styles
  pages/
    index.astro           ← homepage composition
    now.astro             ← /now (Derek-Sivers-style what-I'm-building page)
    404.astro             ← on-brand error page
    guides/
      index.astro         ← guide ladder index
      start-here.astro    ← Guide 01 — AI Without the Bullshit
      built-this-site.astro  ← Guide 02 — How I Built buildquietwinloud.com
  styles/globals.css      ← Tailwind 4 import + design tokens

functions/
  api/subscribe.js        ← Pages Function: POST → Beehiiv → Resend fallback → log

public/
  og-image.png            ← 1200×630 social preview card
  robots.txt
  sitemap.xml
  favicon.svg
```

---

## Design tokens (set in `src/styles/globals.css`)

| token | hex | role |
|---|---|---|
| `--color-paper` | `#0a0a0a` | warm near-black background |
| `--color-paper-dim` | `#141414` | section variation |
| `--color-paper-soft` | `#1a1a1a` | input fields |
| `--color-ink` | `#f5f2ea` | primary text (cream) |
| `--color-ink-dim` | `#b8b5ad` | secondary text |
| `--color-ink-faint` | `#6e6c66` | tertiary text + labels |
| `--color-rust` | `#00d4ff` | signature accent — electric cyan |
| `--color-rule` | `#2a2a2a` | borders, dividers |

Display: [Anton](https://fonts.google.com/specimen/Anton) (uppercase only).
Editorial: [Fraunces](https://fonts.google.com/specimen/Fraunces).
Body: [Inter Tight](https://fonts.google.com/specimen/Inter+Tight).
Mono: [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono).

All Google Fonts. Free. The token name `--color-rust` is legacy from an earlier palette experiment and
hasn't been renamed yet — it currently holds the cyan value.

---

## Forking this for your own brand

1. Fork the repo
2. Update `BRAND.md` and copy in `src/components/Hero.astro`, `Footer.astro`, `Lanes.astro`,
   `WhoFor.astro`, `About.astro` to match your brand
3. Replace tokens in `src/styles/globals.css` with your own palette
4. Replace fonts in `src/layouts/Base.astro` font preconnect link
5. Generate your own `public/og-image.png` (1200×630)
6. Update meta + JSON-LD in `src/layouts/Base.astro`
7. Wire your own Beehiiv (or Resend, or both) in `functions/api/subscribe.js` config
8. Deploy

The structure is reusable. The voice and brand are mine — please don't copy those wholesale.

---

## License

[MIT](./LICENSE) — anyone can copy, modify, and use this commercially. Keep the copyright notice. That's
the only ask.

---

## About

Built and maintained by [Chris Perales](https://buildquietwinloud.com). Letter:
[buildquietwinloud.com](https://buildquietwinloud.com). X:
[@buildquiet](https://x.com/buildquiet). LinkedIn:
[/chris-perales](https://www.linkedin.com/in/chris-perales).

If you fork this and ship something, send me a link. I'd love to see it.
