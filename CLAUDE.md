# Two Brother's Property Management — Website

## Project Overview

Local property management and lawn care business based in **Salyersville, KY** (Magoffin County), serving the surrounding Eastern Kentucky area including Floyd, Johnson, Morgan, and Breathitt counties. Two brothers, just getting started in 2025. No existing web presence — this is their first site.

---

## Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS 4
- **Animation**: Framer Motion (subtle — this is a lawn care site, not a SaaS landing page)
- **Icons**: Phosphor Icons (regular weight)
- **Fonts**: DM Sans (body) + DM Serif Display (headings)
- **Deployment**: Vercel
- **Forms**: None — all CTAs go to phone/text

---

## Architecture

```
src/
  app/
    layout.tsx              ← Root layout (Header, Footer, JSON-LD, skip-to-content)
    page.tsx                ← Server component (renders HomeContent)
    home-content.tsx        ← Client component (interactive home page)
    not-found.tsx           ← Custom 404
    error.tsx               ← Error boundary
    robots.ts               ← Programmatic robots.txt
    sitemap.ts              ← Programmatic sitemap
    globals.css             ← Tailwind + theme + grain texture + a11y
    [route]/
      page.tsx              ← Server component (exports metadata, renders *Content)
      *-content.tsx         ← Client component (interactive page content)
  components/
    header.tsx              ← Sticky header with top phone strip
    footer.tsx              ← Footer with nav + contact
    logo.tsx                ← Inline SVG logo
    cta-banner.tsx          ← CtaBlock (inline) + CtaSection (full-width)
    video-hero.tsx          ← Hero with video background
    before-after.tsx        ← Before/after image comparison slider
    service-icon.tsx        ← Phosphor icon mapper for services
    motion.tsx              ← Reusable Framer Motion primitives (reduced-motion aware)
    lazy-video.tsx          ← IntersectionObserver-based lazy video loader
  lib/
    constants.ts            ← Business info, services, nav links (single source of truth)
    metadata.ts             ← SEO metadata builder with canonical URLs
    json-ld.ts              ← LocalBusiness schema.org structured data
```

### Page Pattern

Pages use a server/client split:
- `page.tsx` is a **server component** that exports metadata and renders a client content component
- `*-content.tsx` is a **"use client" component** with all interactive/animated content

This ensures proper SEO metadata while supporting Framer Motion animations.

---

## Business Information

- **Name**: Two Brother's Property Management
- **Tagline**: "Your yard. Our word."
- **Phone 1**: 606-362-4834
- **Phone 2**: 606-791-7383
- **Contact method**: Call or text only (no contact form)
- **Location**: Salyersville, KY (Magoffin County)
- **Service area**: Magoffin, Floyd, Johnson, Morgan, Breathitt counties
- **Founded**: 2025
- **Free estimates**: Yes

All business data lives in `src/lib/constants.ts` — never hardcode in components.

---

## Brand Voice & Tone

### Voice principles
- **Straightforward** — No marketing fluff. If you mow lawns, say you mow lawns.
- **Warm but not cheesy** — Friendly like a neighbor, not like a used car salesman.
- **Confident** — Quiet competence, not desperation for business.
- **Local** — They're from here, they live here, they care about these properties.

### Words to AVOID
- Synergy, solutions, leverage, optimize, cutting-edge, world-class, premium
- Anything that sounds like it came from a template or a marketing agency

---

## Quality Standards

- Do NOT over-engineer. Only make changes directly requested.
- Do NOT add features beyond what was asked.
- Do NOT add docstrings or comments to code you didn't change.
- Do NOT add error handling for impossible scenarios.
- Do NOT create abstractions for one-time operations.
- Do NOT design for hypothetical future requirements.
- The right amount of complexity is the minimum for the current task.
- Three similar lines of code is better than a premature abstraction.

---

## Design Rules

- **Photography over illustrations** — use real textures, not stock
- **White space matters** — don't cram, let content breathe
- **Mobile-first** — most customers on phones
- **Fast** — rural connections need fast loads. Lazy-load videos.
- **Accessible** — WCAG AA minimum. Focus-visible indicators, reduced-motion support.
- **Grain texture** — use `.grain` class on dark hero/CTA sections for depth
- Avoid AI aesthetic: no generic gradients, no cookie-cutter layouts

### What NOT to do
- No stock photos of perfect suburban lawns
- No parallax scrolling or scroll-jacking
- No hero carousels
- No chat widgets, popups, or cookie banners
- No fake testimonials

---

## Technical Standards

### SEO
- Every page exports unique metadata via `buildMetadata()` helper
- JSON-LD LocalBusiness structured data on every page (in layout)
- Programmatic `robots.ts` and `sitemap.ts`
- Canonical URLs on all pages
- Semantic HTML with proper heading hierarchy

### Performance
- Target Lighthouse 90+ across all categories
- Lazy-load videos below the fold via `LazyVideo` component
- Use `next/image` for all images with proper `sizes`
- Hero video loads immediately (above fold), others lazy-load
- Only 2 font families (DM Sans + DM Serif Display)

### Accessibility
- Skip-to-content link in layout
- `prefers-reduced-motion` support in all motion components
- Focus-visible outlines (field-green, 2px)
- Semantic landmarks: header, main (id="main"), footer, nav
- ARIA labels on interactive elements (slider, mobile nav, logo)

### Security
- Security headers via `next.config.ts`: HSTS, X-Frame-Options, nosniff, referrer-policy, permissions-policy

### Code Quality
- No `any` types
- Components are small and focused
- Constants centralized in `src/lib/constants.ts`
- Motion components respect `useReducedMotion()`
- Server/client component boundary is explicit

---

## Development

```bash
npm run dev     # Local development
npm run build   # Production build
npm run lint    # ESLint
```

---

## Future Considerations (NOT current scope)

- Contact form with email notifications
- Photo gallery of completed work
- Customer testimonials (real ones)
- Online scheduling / booking
- Google Business Profile integration
- Blog for SEO (seasonal lawn care tips)
- Service area interactive map
- Analytics (GA4)
