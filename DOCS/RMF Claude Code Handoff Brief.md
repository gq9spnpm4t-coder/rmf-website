# Ridenour Media Firm — Website Build: Claude Code Handoff Brief

**Purpose:** Everything Claude Code needs to build the new ridenourmediafirm.com from scratch, in code. Read this top to bottom before starting. Final website copy lives in `RMF Website Copy — Draft 2.md` in this same folder; use that as the source of truth for all text.

---

## 1. What we're building

A custom-coded, portfolio-first marketing website for Ridenour Media Firm (RMF), a Tulsa-based video and photo production business run solo by Junuh Ridenour. Replacing an old Wix/Carrd single-page site. The build is phased so a polished public site ships first, with client delivery and payments layered in later.

**Guiding principles:**
- Portfolio-first. The work leads.
- Warm and personal voice. Credibility is shown (client logos, reviews, the work), never claimed.
- Low ongoing cost and low maintenance are top priorities. Prefer free/at-cost managed services over anything that needs babysitting.
- No em dashes anywhere in body copy (client preference).

---

## 2. Recommended tech stack

- **Framework:** Astro (content/marketing focused, ships almost no JS by default, ideal for a fast portfolio site). Use React islands only where interactivity is needed (form, review carousel, video player).
- **Styling:** Tailwind CSS.
- **Hosting:** Cloudflare Pages (free tier, unlimited bandwidth). Deploy from a GitHub repo with automatic builds.
- **Forms / serverless:** Cloudflare Pages Functions for the inquiry form handler and the Google reviews fetch (keeps API keys server-side, stays in-stack, free).
- **Transactional email:** Resend (free tier) or MailChannels via Pages Functions to email new leads to Junuh. Formspree free tier is an acceptable simpler fallback.
- **Repo:** single GitHub repo, `main` auto-deploys to production on Cloudflare Pages.

This stack keeps recurring cost at essentially $0 plus the domain.

---

## 3. Site structure (single-page with anchored sections)

Follow `RMF Website Copy — Draft 2.md` exactly for text. Section order:

1. **Hero** — headline, subhead, two buttons ("See the work" scrolls to portfolio, "Start a project" scrolls to inquiry).
2. **Recent work** — portfolio grid/feature. A highlight reel anchors it (see Phase 1 note on hosting the reel). Build the layout to gracefully handle 1 to N pieces.
3. **What I can help with** — the 11 services as clean cards/list.
4. **About me** — the personal story, with an optional "More about me" link out to Junuh's personal site (URL TBD).
5. **Proud clients** — logo strip / gentle auto-scroll. **Placeholder for now**, build the component but leave room to add names/logos later.
6. **What people say** — live Google reviews (see section 5 below).
7. **How it works** — three steps.
8. **Let's work together** — the inquiry form (see section 6 below).
9. **Footer** — business name, Tulsa OK, YouTube @JunuhRidenour, Instagram @ridenour_media_firm, email.

---

## 4. Design direction

- **Foundation:** black and white, taken straight from the logo (bold, condensed, modern wordmark with a camera-aperture "OR" mark).
- **Warm accent:** introduce one warm accent color (e.g. a warm amber/terracotta) for buttons, links, and small highlights, so the monochrome base reads personal and inviting rather than cold. Confirm exact hex with Junuh.
- **Type:** bold condensed uppercase for display headings to echo the logo; a clean, warm humanist sans for body (e.g. Inter, General Sans, or similar). Keep body highly readable.
- **Layout:** generous whitespace, large media, let the work dominate. Mobile-first and fully responsive.
- **Motion:** subtle and tasteful only (soft fades/reveals). No heavy or gimmicky animation.
- **Logo assets:** in `Logo : Media/` in this folder (`Ridenour Media Firm.png`, `RMF Business Card.png`, plus others). Use the main wordmark in the header/footer.

---

## 5. Google reviews integration

Replace the old cramped widget with a native section.
- Pull reviews via the **Google Places API (Place Details)** for the "Ridenour Media Firm" Google Business Profile.
- Fetch server-side in a Cloudflare Pages Function so the API key is never exposed; cache results (e.g. daily) to stay within free quota.
- Render as clean cards/carousel matching the site design. Respect Google's attribution/display requirements.
- **Needed:** Google Places API key (Junuh to create in Google Cloud Console) and the Place ID for the profile.

---

## 6. Inquiry form ("Let's work together")

Fields:
- Your name
- What are you planning? (short text)
- What do you need? (multi-select: promo video, sports, product photography, product documentation, real estate, event coverage, highlight reel, senior photos, headshots, website photo & video, video editing, other)
- When is it / timeline?
- Best way to reach you (dropdown: email, text, call, WhatsApp, other) — Junuh follows up on their chosen channel. **No two-way messaging at launch;** that is a later phase.
- Anything else? (details)

Behavior:
- Submit posts to a Cloudflare Pages Function that emails the submission to **junuhridenour0@gmail.com** *(confirm exact spelling before launch)*.
- Optional: also fire an SMS notification to Junuh on new leads (e.g. via Twilio). Confirm if wanted.
- Spam protection: honeypot field + Cloudflare Turnstile (free).
- Elevated feel: clean multi-step or single well-designed form, not a default-looking box.

---

## 7. Phasing

**Phase 1 — Public site (launch):** Everything in sections 3–6 above. Portfolio, services, about, proud-clients placeholder, live Google reviews, how-it-works, inquiry form, deploy to Cloudflare Pages, connect domain.
- For the portfolio highlight reel at launch, simplest options: host the 1080p MP4 on Cloudflare R2/Pages, or embed from Junuh's YouTube (@JunuhRidenour). No compressed-preview/download flow needed here; it's a normal portfolio video.

**Phase 2 — Client file & video delivery:** Per-client delivery pages where clients watch a compressed, smooth-playback preview in-browser (labeled as compressed for playback) and download full-resolution files.
- **Storage:** Cloudflare R2 for full-res files (10GB free tier; Junuh expects ≤10GB at any given time, so effectively free). Zero egress fees.
- **Preview streaming:** Cloudflare Stream or Bunny Stream to auto-transcode a compressed preview. Pick whichever is cheaper for the volume; both are pennies-scale here.
- Access control: unguessable/signed links per client to start; can add logins in Phase 3.

**Phase 3 — Payments + client login portal:**
- **Payments:** Stripe (no monthly fee, 2.9% + 30¢ per charge). Use Stripe Payment Links / hosted invoices so Apple Pay works out of the box and government/organization clients (e.g. Tulsa County) can receive proper invoices and still pay by check. Flexible per-project pricing, no hourly, no forced structure.
- **Client login portal:** authenticated area where each client sees their projects, deliverables, and invoices in one place.

---

## 8. Domain migration (Wix → Cloudflare)

Current state: ridenourmediafirm.com is registered at **Wix.com**, DNS on Wix nameservers, auto-renew OFF, **expires Aug 14, 2026**. Keep the name; move it to Cloudflare Registrar ($10.44/yr, at cost) so domain, DNS, and hosting are all in one place.

Steps (start well before Aug 14 so nothing lapses):
1. Create a free Cloudflare account; add `ridenourmediafirm.com` as a site.
2. Cloudflare scans DNS records; verify they carried over.
3. At Wix, change the domain's nameservers to the two Cloudflare nameservers Cloudflare provides.
4. Wait for nameserver propagation (Cloudflare confirms "active").
5. At Wix, **unlock the domain** and request the **EPP/auth transfer code** (Wix currently has clientTransferProhibited set; unlock removes it).
6. In Cloudflare, start the registrar transfer using that auth code, and pay the $10.44 (adds one year to the registration).
7. Once transfer completes, point the Cloudflare Pages project at the domain (custom domain in Pages) and confirm HTTPS.

Note: registrar transfers can take a few days; doing this in July leaves comfortable margin before the August renewal date.

---

## 9. Open items to confirm before/during build

1. Confirm email spelling: **junuhridenour0@gmail.com**. Text notification on new leads wanted? (yes/no)
2. Warm accent color hex.
3. Personal site URL for the "More about me" link.
4. Google Places API key + Place ID for reviews.
5. Portfolio pieces (the anchor highlight reel + any others) and where files live.
6. Client names/logos for "Proud to have worked with" (Phase 1 placeholder is fine).

---

## 10. Assets & references in this folder

- `RMF Website Copy — Draft 2.md` — final approved copy (source of truth for all text).
- `Logo : Media/` — logo files.
- Current live site for reference: https://ridenourmediafirm.com
