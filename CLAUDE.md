# Two Brother's Property Management — Website

## Project Overview

Local property management and lawn care business based in **Salyersville, KY** (Magoffin County), serving the surrounding Eastern Kentucky area including Floyd, Johnson, Morgan, Breathitt, and Knott counties. Two brothers, just getting started in 2025. No existing web presence — this is their first site.

This is an **MVP website** meant to look polished and professional enough to hand to a potential customer. It's a surprise for the business owners, so keep it tight and functional — no scope creep.

---

## Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion (subtle — this is a lawn care site, not a SaaS landing page)
- **Icons**: Phosphor Icons
- **Deployment**: Vercel (target)
- **Forms**: None for MVP — all CTAs go to phone/text

---

## Site Structure

```
/ (Home)           — Hero, services overview, CTA, trust signals
/services          — Detailed service descriptions
/about             — The story, why two brothers, local roots
/service-area      — Counties served with a simple map or list
/contact           — Phone numbers, hours, service area reminder
```

All pages share a consistent header (logo + nav) and footer (phone numbers, tagline, basic links).

---

## Business Information

- **Name**: Two Brother's Property Management
- **Tagline**: "Your yard. Our word."
- **Phone 1**: 606-362-4834
- **Phone 2**: 606-791-7383
- **Contact method**: Call or text only (no contact form for MVP)
- **Location**: Salyersville, KY (Magoffin County)
- **Service area**: Magoffin, Floyd, Johnson, Morgan, Breathitt, Knott counties (approximate — confirm with owner)
- **Founded**: 2025
- **Offers free estimates**: Yes

### Services

1. **Weekly / Bi-Weekly Mowing** — Regular lawn maintenance on a schedule
2. **Weed Control** — Targeted treatment and prevention
3. **Storage Clean-outs** — Clearing out sheds, garages, storage units
4. **Storm & Property Clean-ups** — Post-storm debris removal, fallen branches, damage cleanup
5. **Spring / Fall Clean-ups** — Seasonal property prep (leaf removal, bed cleaning, winterizing)

---

## Brand Voice & Tone

### Who they are
Two brothers from Eastern Kentucky who do honest work. Not a franchise. Not a corporation. Two guys who show up, do the job right, and answer their own phones.

### Voice principles
- **Straightforward** — Say what you mean. No marketing fluff, no "leveraging synergies." If you mow lawns, say you mow lawns.
- **Warm but not cheesy** — Friendly like a neighbor, not like a used car salesman. No forced folksy charm.
- **Confident** — They know what they're doing. The copy should reflect quiet competence, not desperation for business.
- **Local** — This isn't a national brand. Lean into the fact that they're from here, they live here, they care about these properties because they're in the same community.

### Words to USE
- Reliable, honest, local, hands-on, thorough, no-hassle, straightforward
- "We show up." "We get it done." "Your neighbors already know us."

### Words to AVOID
- Synergy, solutions, leverage, optimize, cutting-edge, world-class, premium
- Anything that sounds like it came from a template or a marketing agency
- Emojis in body copy (fine in meta/social if added later)

---

## Design Principles

### Overall feel
Somewhere between the playful energy of their cartoon flyer and a clean professional service site. It should feel **approachable and trustworthy** — like the kind of business you'd hire because your neighbor recommended them.

### Specifics
- **Photography over illustrations** for the site itself — use real textures (grass, wood, earth tones) where possible
- **White space matters** — don't cram. Let the content breathe.
- **Mobile-first** — most customers will find this on their phone
- **Fast** — no heavy animations, no video backgrounds, no bloat. People on rural connections need this to load.
- **Accessible** — WCAG AA minimum. Good contrast, readable fonts, proper heading hierarchy.

### What NOT to do
- No stock photos of perfect suburban lawns with sprinkler systems — this is Eastern Kentucky, keep it real
- No parallax scrolling or scroll-jacking
- No "hero carousel" with 5 rotating slides nobody reads
- No chat widgets, popups, or cookie banners (no cookies to warn about)
- No testimonial carousels with fake quotes — if we add testimonials later, they'll be real

---

## Technical Guidelines

### Performance
- Target Lighthouse score: 90+ across all categories
- Optimize all images (WebP, proper sizing)
- Minimize client-side JavaScript — most pages should be static
- Use `next/image` for all images

### SEO
- Every page gets a unique `<title>` and `meta description`
- Use semantic HTML (proper heading hierarchy, landmarks)
- Add local business structured data (JSON-LD)
- Target keywords: "lawn care Salyersville KY", "property management Magoffin County", "mowing service Eastern Kentucky"

### Code Quality
- No `any` types
- Components are small and focused
- Shared UI lives in `src/components/ui/`
- Page-specific components live alongside their page
- Constants (phone numbers, service area, etc.) live in `src/lib/constants.ts` — never hardcoded in components

---

## File Structure

```
src/
  app/
    layout.tsx          — Root layout with header/footer
    page.tsx            — Home
    services/page.tsx
    about/page.tsx
    service-area/page.tsx
    contact/page.tsx
  components/
    ui/                 — Reusable primitives (Button, Section, etc.)
    header.tsx
    footer.tsx
    service-card.tsx
    cta-banner.tsx
  lib/
    constants.ts        — Business info, phone numbers, service list
    metadata.ts         — SEO helpers
  styles/
    globals.css         — Tailwind base + custom properties
public/
  images/              — Optimized site images
  favicon.ico
```

---

## Development Notes

- Run `npm run dev` for local development
- This is an MVP — resist the urge to add features. If it's not in the site structure above, it waits.
- Every CTA should make it dead simple to call or text. Phone numbers should be `tel:` links on mobile.
- The flyer image is reference material, not a site asset. Don't use the cartoon style on the website.

---

## Future Considerations (NOT for MVP)

- Contact form with email notifications
- Photo gallery of completed work
- Customer testimonials (real ones)
- Online scheduling / booking
- Google Business Profile integration
- Social media links (Facebook, etc.)
- Blog for SEO (seasonal lawn care tips)
- Service area interactive map
