# Claude Code Kickoff Prompt — RMF Website

Paste the block below into Claude Code, running inside the `RIDENOUR MEDIA FIRM` folder (or a new `website/` subfolder inside it). Attach the logo file and the business card image when you send it.

---

I'm building a new website for my business, Ridenour Media Firm (RMF), a Tulsa-based video and photo production studio. I run it solo. We're building this from scratch in code.

Before writing anything, read these two files in this folder and treat them as the source of truth:
- `RMF Claude Code Handoff Brief.md` — the full spec: goals, tech stack, site structure, design direction, phasing, and domain migration.
- `RMF Website Copy — Draft 2.md` — the final approved copy for every section. Use this text exactly. Do not rewrite it, and do not add em dashes anywhere.

I'm also attaching two images:
- My logo (bold black-and-white wordmark with a camera-aperture "OR" mark).
- My business card, which uses the exact font I want to keep using for the brand. Please identify that font (or the closest high-quality match available as a web font) and use it for the site's display/heading type so everything stays consistent with my existing brand.

Scope for right now: build Phase 1 only, the public marketing site (hero, recent work, services, about, proud-clients placeholder, live Google reviews section, how-it-works, inquiry form, footer). Leave Phase 2 (client file/video delivery) and Phase 3 (payments and client login) out for now, but structure the project so they can be added cleanly later.

Stack (from the brief, use your judgment if you have a strong reason to deviate, but check with me first): Astro + Tailwind CSS, deployed to Cloudflare Pages, with Cloudflare Pages Functions for the inquiry form handler and the Google reviews fetch. Keep recurring cost at essentially zero.

Design direction: portfolio-first, warm and personal. Black-and-white foundation from the logo, bold condensed headings in my brand font, one warm accent color for buttons and links (propose a hex and show me before committing). Generous whitespace, large media, mobile-first, subtle tasteful motion only.

How I'd like you to work:
- Start by confirming your plan and the project structure with me before building.
- Ask me clarifying questions before any major architectural or design decision rather than guessing. I like being asked questions.
- Build incrementally and show me previews as you go so we can refine together.
- There are a few open items in the brief (my email spelling, accent color, personal-site link, Google Places API key + Place ID, portfolio pieces, client logos). Flag these when you reach them; some can be placeholders for now.

Once Phase 1 looks right locally, help me set up the GitHub repo and Cloudflare Pages deploy, and then walk me through connecting the domain (it's moving from Wix to Cloudflare; steps are in the brief).

Start by reading the two files and the attached images, then tell me your plan.
