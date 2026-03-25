---
name: "review"
description: "Review Two Brothers PM site for accessibility, SEO, performance, and brand"
allowed-tools:
  - Read
  - Grep
  - Glob
  - Agent
---

# Code Review

Review $ARGUMENTS.

## Checklist

1. **Accessibility (WCAG AA)**
   - Semantic HTML (headings hierarchy, landmarks)
   - Alt text on all images
   - Color contrast meets AA ratio
   - Keyboard navigable (focus states, tab order)
   - Touch targets 44px+ on mobile

2. **SEO**
   - Meta title + description on every page
   - OpenGraph + Twitter card tags
   - Structured data (JSON-LD for LocalBusiness)
   - Heading hierarchy (single H1 per page)
   - Image alt attributes

3. **Performance**
   - Next.js Image component (not raw img)
   - Lazy loading on below-fold images
   - No heavy animations on mobile
   - Lighthouse target: 90+

4. **Brand Consistency (see BRAND.md)**
   - Using approved colors from globals.css theme
   - DM Sans body + DM Serif Display headings
   - Tone: straightforward, warm, local, no corporate fluff
   - Phosphor icons (not mixing icon libraries)

5. **Responsive Design**
   - Mobile-first breakpoints
   - No horizontal scroll on 375px
   - Touch-friendly CTAs (tel: links work)

## Output
Severity (Critical/Warning/Info) | file:line | Issue | Fix
Summary at end.
