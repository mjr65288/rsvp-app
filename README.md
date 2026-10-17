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

## Next slice

Add validated, event-scoped RSVP storage with Supabase, opaque private edit links, and an authenticated organizer dashboard. Deployment and live credentials are not configured. Nothing here is ready to collect real guest data yet.
