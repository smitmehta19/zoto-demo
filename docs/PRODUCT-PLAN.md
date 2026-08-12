# ZOTO — Site Structure & Product Plan

Working document for the ZOTO rebuild. Covers information architecture, page inventory,
feature improvements over the current zoto.ie, and long-run architecture notes.

---

## 1. What ZOTO is (content model)

Community platform for South Asian ("Desi") expats in Ireland. Tagline: **"Your best friend abroad"**.

**Live services:** Flight Buddy · Housing · Job Referrals · Events · Community
**Coming soon:** Partner Perks · Schengen Visas · Part-Time Jobs

The natural organizing principle is the **user's journey**, not a flat tile grid:

| Stage | Services |
|---|---|
| Before you fly | Flight Buddy, Schengen Visas |
| When you land | Housing, Part-Time Jobs |
| As you settle | Job Referrals, Events, Community, Partner Perks |

---

## 2. Site structure (proposed IA)

```
/                       Homepage (marketing + logged-out entry)
/flight-buddy           Search flights → see matched members → request connect
/housing                Listings feed with filters (area, budget, room type)
/housing/[id]           Listing detail + contact poster
/referrals              Companies list → request referral flow
/events                 Upcoming events grid + calendar view
/events/[id]            Event detail + RSVP
/community              Groups directory (by county / interest)
/perks                  Partner Perks (coming soon → waitlist)
/visas                  Schengen Visas (coming soon → waitlist)
/part-time              Part-Time Jobs (coming soon → waitlist)
/about                  Story, team, mission
/auth/*                 Sign up / sign in (email + Google OAuth)
/profile                My profile, my listings, my RSVPs, my matches
/admin                  Moderation: approve listings, verify members, manage events
```

**Global elements:** sticky header (services nav + auth state), footer (links, socials,
legal), mobile bottom-tab bar for logged-in users (Home / Housing / Events / Chats / Profile).

---

## 3. Feature improvements over current site

### Quick wins (high impact, low effort)
1. **Real landing page.** The current site is a wall of emoji tiles with zero explanation.
   Each service needs one sentence of "what" and "why" before asking people to click.
2. **Proper SEO/meta.** Title, description, OG images, sitemap — "indian community dublin",
   "flight buddy india ireland" are winnable search terms with no strong competition.
3. **Coming-soon = waitlist capture.** "SOON" badges currently do nothing. Collect emails
   per upcoming service; this both builds a launch list and votes on priority.
4. **Social proof.** Member count, buddies matched, events photos. Trust is the entire
   product for a community platform.

### Core product features (the real differentiators)
5. **Flight Buddy matching engine.** Enter flight number + date → see members on the same
   flight (or same day, same route). Add: shared-taxi coordination, "first-time flyer"
   flag so experienced travellers can offer help, parents-visiting mode (elderly parents
   flying alone matched with a young professional on the same flight).
6. **Verified members.** Lightweight verification (college ID / work email / LinkedIn)
   with a badge. Kills the #1 problem of expat Facebook groups: scammers. Especially
   critical for Housing (deposit fraud is rampant in Dublin).
7. **Housing with structure.** Filters (county, budget, veg/non-veg household, gender
   preference), photos, poster's verified badge, "posted X days ago", report button.
   Member-only visibility for the first 48h as the membership incentive.
8. **Referral marketplace.** Searchable list of companies where members work; request flow
   sends CV + note to the referrer; status tracking (requested → viewed → referred).
   Gamify with a "referrals given" badge — status is the currency here.
9. **Events with RSVP + ICS.** RSVP, add-to-calendar, capacity, photo gallery afterwards.
   Recurring formats (monthly new-arrival mixer) build habit.
10. **In-app group chat or deep WhatsApp integration.** Today it's WhatsApp links.
    Keep WhatsApp (that's where the audience lives) but gate the invite links behind
    a verified profile to keep out spam.

### Growth / retention ideas
11. **"New to Ireland" checklist.** PPS number, GNIB/IRP, bank account, SIM, Leap card,
    GP registration — interactive checklist with community-written guides per item.
    Massive SEO surface + genuine utility on day one.
12. **Pay-it-forward loop.** After you're settled (e.g., 6 months in), prompt to become a
    flight buddy / referrer / host. The supply side of every service is alumni demand.
13. **City expansion model.** Structure content by city from day one (Dublin now; Cork,
    Galway, Limerick later) — the domain is zoto.ie but the model scales to any city.
14. **Partner Perks as revenue.** Desi restaurants, grocery stores, remittance services,
    telecoms — discounts for members, referral fees / listing fees as the business model.
15. **WhatsApp bot / notifications.** Digest of new listings + events in the channels
    people already check daily.

### Trust & safety (non-negotiable for this audience)
- Report/block on every profile, listing, and message.
- Moderation queue for housing listings before publish.
- Clear privacy stance: flight details visible only to matched members.
- Women-only options: flight buddy preference, housing filter, events.

---

## 4. Architecture notes (for when we build)

Suggested stack (discuss before committing):
- **Next.js (App Router) + TypeScript + Tailwind** — SSR for SEO pages, app-like
  interactivity for logged-in surfaces, one deployment.
- **Postgres + Prisma** (Supabase fits well: auth, storage for listing photos, row-level
  security, realtime for chat later).
- **Auth:** email OTP + Google. Phone verification later for trust.
- **Hosting:** Vercel (or Fly.io) + Supabase. Cheap at this scale.
- **Design tokens** extracted from the chosen option into a single `theme.css` /
  Tailwind config, so the prototype's look ports 1:1 into components.

Build order once a design is chosen:
1. Marketing shell (home, about, service explainer pages) + waitlists — ship in week 1.
2. Auth + profiles + verification.
3. One killer service end-to-end (Flight Buddy is the most differentiated) →
   then Housing → Referrals → Events.
4. Admin/moderation tooling grows alongside each service.

---

## 5. Current prototype (in `site/`) — Option A chosen

Multi-page static prototype in the chosen "Journey" theme. Shared tokens/components
live in `site/assets/zoto.css` + `zoto.js` (mobile nav, chip filters, tabs).
Pages: `index`, `flight-buddy`, `housing`, `referrals`, `events`, `community`, `login`.
Positioning updated to multi-community (Desi · Latin · East Asian) per the live app.
Run locally: the `zoto-site` launch config serves `site/` at http://localhost:4173.

Decisions embedded in the prototype (revisit when building for real):
- Auth is passwordless (email one-time code) + Google — no passwords to store.
- Housing listings expire after 7 days; members see them 48h before public.
- One group chat per flight; women-only groups; "parents flying alone" flag.
- Referral statuses: requested → viewed → referred; auto-close after 14 days.
- Payments (Stripe) will gate event tickets and an optional supporter membership —
  core help (housing, referrals, flight buddy) stays free.

---

## 6. Design options built (in `design-options/`)

| Option | File | Direction |
|---|---|---|
| A — The Journey | `option-a-journey.html` | Warm editorial. Fraunces serif + saffron/teal. Signature: services organised as a journey timeline (before you fly → when you land → as you settle) + boarding-pass hero card. |
| B — Atlas | `option-b-atlas.html` | Clean product-grade light UI (Stripe/Linear energy). Bricolage Grotesque + emerald on white. Signature: bento grid where every service card contains a mini product UI vignette. |
| C — Night Flight | `option-c-nightflight.html` | Dark premium. Sora + amber→coral→violet gradient on deep navy. Signature: animated BOM→DUB flight arc in the hero with a moving plane dot. |

All three: fully responsive (desktop → mobile with hamburger nav), reduced-motion
respected, visible keyboard focus, no emoji iconography (inline SVG glyphs), system
of CSS custom properties ready to extract as design tokens.
