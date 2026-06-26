# Gary's Pipelining & Drain Cleaning, website

Next.js 16 (App Router) + Tailwind v4 rebuild of garyspipelining.com.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000 (or http://127.0.0.1:3000 if another local
server is already bound to port 3000 on the IPv6 loopback).

## Before the contact form can deliver real emails

The estimate/contact form posts to [Web3Forms](https://web3forms.com).
Sign up free with `office@garyspipelining.com`, grab the access key, then:

```bash
cp .env.local.example .env.local
# paste the key into NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
```

Without a key, the form still validates and submits client-side but
Web3Forms will reject the request, the UI shows a friendly fallback
message asking the visitor to call instead.

## Structure

- `src/lib/site-config.ts`, single source of truth for phone, email,
  address, license number.
- `src/lib/content/services.ts` / `locations.ts`, all copy for the 9
  service pages and 6 location pages. Edit here, not in the templates.
- `src/components/sections/service-page-template.tsx` /
  `location-page-template.tsx`, the shared page shells driven by that
  content.
- `public/brand`, `public/photos/real`, the real logo and real job-site
  photos pulled from the old WordPress site. `public/photos/stock` is
  curated supplementary photography used where no real photo exists yet.

## Deploy

Any Next.js host works (Vercel, etc.), `npm run build` then `npm start`,
or follow the platform's Next.js adapter docs.
