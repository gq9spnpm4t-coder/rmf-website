# Ridenour Media Firm — Website

Phase 1 public marketing site for [ridenourmediafirm.com](https://ridenourmediafirm.com).
Astro + Tailwind CSS, deployed on Cloudflare Pages. Copy source of truth:
`../RMF Website Copy — Draft 2.md` (use verbatim, no em dashes).

## Develop

```sh
npm install
npm run dev        # site at localhost:4321 (API routes return fallback data)
npx wrangler pages dev -- npm run dev   # site + Pages Functions locally
```

## Structure

- `src/components/` — one component per page section, in page order.
- `src/data/` — editable content: services list, portfolio pieces (`work.ts`),
  client logos (`clients.ts`), business facts (`site.ts`). Adding the highlight
  reel or client logos is a data edit, no component changes needed.
- `functions/api/` — Cloudflare Pages Functions: `inquiry.ts` (emails leads via
  Resend), `reviews.ts` (Google Places reviews, cached 24h).
- Phases 2 (client delivery) and 3 (payments/login) will add routes under
  `src/pages/` and functions under `functions/` without touching Phase 1.

## Environment variables (Cloudflare Pages dashboard)

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend key for lead emails |
| `LEAD_TO_EMAIL` | Lead inbox (defaults to junuhridenour0@gmail.com) |
| `LEAD_FROM` | Sender address once domain is verified in Resend |
| `GOOGLE_PLACES_API_KEY` | Google Places API key for reviews |
| `GOOGLE_PLACE_ID` | Place ID of the RMF Google Business Profile |
| `TWILIO_ACCOUNT_SID` / `TWILIO_AUTH_TOKEN` | Twilio credentials for SMS lead alerts |
| `TWILIO_FROM` / `TWILIO_TO` | Twilio number and Junuh's cell |

For local Functions testing, put these in `website/.dev.vars` (gitignored).

Reviews and the form render with graceful fallbacks until these exist.

## Deploy

Cloudflare Pages, connected to the GitHub repo. Build command `npm run build`,
output directory `dist`. `main` auto-deploys to production. Domain migration
steps (Wix → Cloudflare) live in `../RMF Claude Code Handoff Brief.md`, section 8.

## Before launch checklist

- [x] Confirm lead email spelling (junuhridenour0@gmail.com)
- [ ] Add Cloudflare Turnstile to the inquiry form (site key + secret)
- [x] Client logos: 6 single-tone masks in `public/clients/` (Monarchs pending a cleaner source)
- [x] Highlight reel wired in `src/data/work.ts` (web version `public/work/reel.mp4`, ~20MB)
- [x] Google Places env vars set (`.dev.vars` locally; add to Cloudflare at deploy)
- [x] Personal site URL (junuh.site) in `src/data/site.ts`

## Media notes

- The reel is compressed to ~20MB (two-pass H.264, faststart) to stay under
  Cloudflare Pages' 25MB per-file limit. Source master (110MB) lives in the
  parent folder as `RMF REEL.mp4`. To re-encode, see the ffmpeg two-pass command
  in the project history, or move to Cloudflare R2/Stream for higher bitrate.
- Client logos are single-tone masks (white shape on transparent) rendered from
  each client's logo; the strip paints them ink and shifts to terracotta on
  hover. Regenerate from `../Client Logos/` if sources change.
