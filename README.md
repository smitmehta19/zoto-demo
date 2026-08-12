# ZOTO — Your Best Friend Abroad

Demo web app for ZOTO, a community platform for internationals building a life in Ireland:
flight buddies, housing, job referrals, events, community groups and partner perks.

**Live demo:** https://smitmehta19.github.io/zoto-demo/

## Reviewing the demo

1. The home page is public — browse it logged out.
2. Any other page asks you to sign in (any valid email works in this demo).
3. Signed-in users browse everything free; the paid actions (opening full listings,
   posting, referrals, flight groups, perks) open the €10/month membership paywall.
4. Promo code **`THANKSTEJASDEMO`** unlocks full access so you can compare
   before/after the paywall. Sign out resets you to a fresh visitor.

Events and community groups are free for everyone by design.

## Repo layout

| Path | What it is |
|---|---|
| `app/` | The React + Vite web app (this is what's deployed) |
| `site/` | Earlier static HTML prototype of the chosen design |
| `design-options/` | The three original design-direction prototypes |
| `docs/` | Product plan: IA, feature roadmap, architecture notes |

## Run locally

```
cd app
npm install
npm run dev
```

Demo only — auth and subscription state live in localStorage. The production plan
(Supabase + Stripe) is in `docs/PRODUCT-PLAN.md`.
