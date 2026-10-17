# Family RSVP

A reusable family-event invitation, starting with Aylin's fifth birthday. This first slice is an invitation preview: RSVP storage, editing, and organizer authentication are not implemented yet.

## Run locally

Use Node.js 22.22 or newer within version 22.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Run `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build` before opening a PR.

## Design decisions

- **Next.js + TypeScript:** one application for the public invitation and future protected server features.
- **Event data is separate:** edit `lib/event.ts` for event details; never invent an unknown date or location. The configured timezone is provisional and must be confirmed before setting the date.
- **Plain CSS:** original concert-inspired styling without a component framework or external character artwork. Google Fonts is optional; system fallback fonts work offline.
- **No pretend confirmations:** registration stays visibly unavailable until durable storage is wired in.
- **Privacy:** never commit guest records, real venue addresses, or credentials to this public repository. Real private event configuration will move to the database before launch. Search-engine noindex is not access control.

## RSVP setup

The RSVP form is ready for a Supabase project but will show a safe configuration message until credentials are configured. Apply `supabase/migrations/0001_create_rsvps.sql` in the Supabase SQL editor, then provide `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` through the deployment environment. Never commit these values.

## Next slice

Add opaque private edit links and an authenticated organizer dashboard. Deployment and live credentials are not configured.

## Organizer dashboard setup

Set ADMIN_EMAIL to the organizer's email and NEXT_PUBLIC_SITE_URL to the deployed app URL. Apply supabase/migrations/0002_private_rsvp_reads.sql, then register the organizer in Supabase SQL Editor with insert into public.organizers (email) values (lower('you@example.com')) on conflict do nothing;. Replace the example email before running it. In Supabase Auth, enable Email provider and add the callback URL <site-url>/auth/callback to the redirect allow list.
