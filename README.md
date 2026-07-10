# Marquee

An events platform built to fix the three things people complain about most
with Eventbrite: hidden fees, weak discovery, and thin organizer tools.

- **Transparent pricing** — the all-in price (ticket + service fee) is shown
  on every event card and never changes at checkout. Organizers always keep
  100% of the ticket price; the fee is added on top for the buyer.
- **Better discovery** — live search, category filters, and sort by
  trending / soonest / price / "almost gone."
- **Organizer tools** — a dashboard with sales, revenue, and payout stats,
  plus a create-event flow with a live fee preview.

Stack: **React + Vite + Tailwind CSS v4**, wired for **Supabase** (Postgres +
Auth). It runs out of the box on mock data — no backend required to try it —
and switches to Supabase automatically once you add credentials.

## Run it locally

```bash
npm install
npm run dev
```

Open the printed `localhost` URL. This works immediately in **demo mode**:
event data, checkout, sign-up, and event creation all run on mock data with
no backend connected.

## Connect Supabase (to make it real)

1. Create a project at [supabase.com](https://supabase.com).
2. In the Supabase dashboard, go to **SQL Editor → New query**, paste the
   contents of [`supabase/schema.sql`](./supabase/schema.sql), and run it.
   This creates the `profiles`, `events`, and `orders` tables with row-level
   security policies already configured.
3. Go to **Project Settings → API** and copy your **Project URL** and
   **anon public key**.
4. Copy `.env.example` to `.env` and fill in those two values:

   ```bash
   cp .env.example .env
   ```

   ```
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key
   ```

5. Restart `npm run dev`. Sign-up/login and "Publish event" will now write to
   your Supabase project instead of running in demo mode.

## Push to GitHub

If you're starting fresh:

```bash
git init
git add .
git commit -m "Initial commit: Marquee events platform"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

Or, if you already created an empty repo on GitHub, you can drag-and-drop
this folder's contents into the repo via the GitHub web UI ("Add file →
Upload files") — just make sure `.env` is **not** included (it's already in
`.gitignore`, but the web upload UI doesn't respect that, so remove it from
the upload manually if you use that route).

## Project structure

```
src/
  components/     EventCard, NavBar, SearchFilterBar, FeeBreakdown, etc.
  pages/          Discover, EventDetail, CreateEvent, Dashboard, Login
  lib/
    supabase.js   Supabase client (auto-detects demo vs. live mode)
    fees.js       The transparent fee calculator
    mockData.js   Demo events, used until Supabase is connected
supabase/
  schema.sql      Full Postgres schema + RLS policies
```

## Where to go next

- Swap mock data reads in `Discover.jsx` / `EventDetail.jsx` for real
  Supabase queries once you're ready (the mock data shape matches the
  `events` table columns to make this a near drop-in swap).
- Add Stripe (or another processor) for real payments — right now checkout
  is a UI-only demo.
- Add image upload via Supabase Storage for event cover photos.
