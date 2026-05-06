# Build Quiet, Win Loud — Landing Page Design Spec (V2)

**Date:** 2026-05-06
**Owner:** Chris Perales
**Status:** V2 built locally, awaiting Beehiiv creds + Cloudflare Pages deploy
**Stack lock:** Astro 6 + Tailwind 4 + Lenis + GSAP (ScrollTrigger) + Cloudflare Pages

## V1 → V2 changes (iteration discipline output)

V1 shipped against stale BRAND.md (tagline `Burn slow, build long.` was retired same day).
V1 also chose dark cinematic ember aesthetic — brief specifies editorial warm paper.

| Pass | V1 finding | V2 fix |
|---|---|---|
| Verbatim | Wrong tagline (parked phrase) | "AI tools, real builds, no hype." |
| Numbers | "Issue 00" implied newsletter exists | Kept "Issue 00 / Letter from Guadalajara" — frames as a notebook entry, not numbered newsletter |
| Classification | Dark cinematic ember | Editorial warm paper (cream + ink + rust) |
| Audience-fit | Dark moody luxury read | Cream paper builder/operator read |
| Framing-honesty | "EN now · ES soon" mentioned Spanish brand | Stripped per FUTURE_BRANDS rule |
| Continuation-prompt fact decay | Inherited stale tagline + ember metaphor | Re-read all 4 brand files before rebuild |

## Goal

Single-page landing for Build Quiet, Win Loud. Editorial warm-paper aesthetic. Lovable-deprecation test.

## Audience

Builders + hustlers + operators trying to use AI to ship real work. Beginner OR veteran. Bilingual welcome. Self-select on intent, not revenue tier.

## Locked decisions

| Decision | Choice | Reason |
|---|---|---|
| Page scope | Hero + Marquee + Lanes + WhoFor + About + Footer (6 sections) | Wider lane mix matches Chris's "don't paint into corner" course-correction |
| Aesthetic | Editorial warm paper — cream/ink/rust | Brief-locked: Rubin restraint + Bourdain outsider + Mexican design sensibility |
| Type pair | Anton word-mark + Fraunces editorial heads + Inter Tight body + JetBrains Mono labels | Heavy display sans + warm serif = "built quiet, written carefully" duality |
| Animation | Subtle scroll reveals + magnetic CTA + paper grain + scrolling stack-marquee | "Alive but quiet" — present, not theatrical |
| Email capture | Beehiiv direct (Resend backup) | Phase 4 newsletter destination locked |
| Spanish | Skipped on V1 | Per FUTURE_BRANDS — no mention until Phase 2 trigger |
| Persona skill | Skipped V1 | Hand-anchored copy lands tight at landing length; persona has more leverage on long-form |

## Design tokens (in `globals.css`)

| token | hex | role |
|---|---|---|
| `paper` | #f4efe6 | warm cream background |
| `paper-dim` | #ebe5da | section variation |
| `paper-soft` | #fbf8f1 | input fields |
| `ink` | #1a1815 | warm charcoal text + footer bg |
| `ink-dim` | #4d4843 | secondary text |
| `ink-faint` | #8a8278 | tertiary text |
| `rust` | #b5421c | single accent — used 5% of pixel area |
| `rule` | #d9d2c4 | hairlines, dividers |

Type:
- Display: Anton 400 — uppercase only (write source as uppercase, NOT text-transform)
- Editorial: Fraunces variable — opsz 144, SOFT 30, WONK 0
- Body: Inter Tight 300/400/500/600
- Mono: JetBrains Mono 400/500

Easing curves: expo.out for entries, quart.out for hover, expo.inOut for scroll-pin.

Dark mode: respects `prefers-color-scheme: dark` → ink bg + paper text + same rust accent.

## Components built

| File | Role |
|---|---|
| `src/layouts/Base.astro` | HTML shell, fonts, OG meta |
| `src/components/SmoothScroll.astro` | Lenis + GSAP ticker bridge |
| `src/components/Header.astro` | Sticky nav, word-mark, EN badge |
| `src/components/Hero.astro` | Eyebrow + 2-line wordmark + tagline + body + magnetic CTA form |
| `src/components/StackMarquee.astro` | Horizontal infinite tools scroll |
| `src/components/Lanes.astro` | 5 lanes (letter / reviews / guides / 1:1 / community) with status badges |
| `src/components/WhoFor.astro` | "Who this is for" w/ paper-dim bg |
| `src/components/About.astro` | 3-block About + rust quote line |
| `src/components/Footer.astro` | Dark ink footer with social icons + meta |
| `src/pages/index.astro` | Composes the page |
| `functions/api/subscribe.js` | Cloudflare Pages Function: Beehiiv → Resend → log fallback |

## Backend (waitlist)

Pages Function tries providers in order:

1. **Beehiiv** — POST to `/v2/publications/<id>/subscriptions` if `BEEHIIV_API_KEY + BEEHIIV_PUBLICATION_ID` set
2. **Resend backup** — emails Chris on each signup if Beehiiv fails or not configured
3. **Log fallback** — logs to function logs if neither configured

V1 verified: form submits → returns expected response shape in deployed env. Local dev returns 404 (Pages Functions only run via wrangler or in deployed CF env).

## Out of scope (V2)

- Spanish version (FUTURE_BRANDS Phase 2)
- Newsletter archive page (Phase 4 — after first 4 letters shipped)
- Custom OG image (text-only meta for V2)
- Analytics (defer to CF Web Analytics enable at deploy)
- Long-form About page (teased in About section: "There's a longer backstory than fits here")

## Deploy path

Documented in `README.md`. Summary: `npm run build` → push repo → Cloudflare Pages → connect Git → add Beehiiv env vars → add domain → DNS Namecheap to CF.

## Success criteria

1. Hero loads under 2s on clean CF cache (LCP < 2.5s).
2. Hero stagger reveal hits 60fps on Chris's Legion 9 RTX 4090.
3. Form POST to `/api/subscribe` returns 200 in deployed env, signups land in Beehiiv subscriber list.
4. Mobile (390×844) holds layout — verified.
5. Dark mode respects system preference — verified via CSS, not yet tested in browser.
