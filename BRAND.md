# Two Brother's Property Management — Brand Guidelines

---

## Identity

**Business Name**: Two Brother's Property Management
**Tagline**: "Your yard. Our word."
**Founded**: 2025
**Location**: Salyersville, KY

The name says it all — two brothers, not a corporation. The brand should always feel like you're dealing with real people who live in your community and take pride in their work.

---

## Logo

No formal logo exists yet. For the MVP website, use a **text-based wordmark**:

- "Two Brother's" in the primary display font (bold weight)
- "Property Management" in a lighter weight or secondary font beneath it
- Optionally pair with a simple icon — a single leaf, a clean lawn line, or a house silhouette. Nothing cartoonish on the site.

The cartoon flyer characters are marketing material — they don't carry into the website brand. The site should feel more grounded.

---

## Color Palette

Drawn from the natural tones of the work itself — grass, earth, clean sky. Nothing neon. Nothing corporate.

### Primary Colors

| Name           | Hex       | Usage                                      |
|----------------|-----------|---------------------------------------------|
| **Field Green** | `#2D6A4F` | Primary brand color. Headers, buttons, accents |
| **Dark Green**  | `#1B4332` | Text on light backgrounds, nav, footer       |
| **Warm White**  | `#FAFAF5` | Page backgrounds, card backgrounds            |

### Secondary Colors

| Name            | Hex       | Usage                                       |
|-----------------|-----------|----------------------------------------------|
| **Earth Brown**  | `#8B6914` | Accent color. Hover states, secondary buttons |
| **Bark**         | `#5C4033` | Subtle accents, borders, muted text           |
| **Sky Blue**     | `#E8F0FE` | Light section backgrounds, alternating sections|

### Neutral Colors

| Name           | Hex       | Usage                          |
|----------------|-----------|--------------------------------|
| **Charcoal**    | `#1A1A1A` | Body text                      |
| **Slate**       | `#4A4A4A` | Secondary text, descriptions   |
| **Light Gray**  | `#E5E5E5` | Borders, dividers              |
| **White**       | `#FFFFFF`  | Cards, overlays                |

### Usage Rules
- Field Green is the hero — use it for primary CTAs, the header, key headings
- Earth Brown is the supporting player — hover states, secondary actions, warm accents
- Never use green and brown at equal weight — green leads, brown accents
- Sky Blue is for breathing room between sections, not for text or buttons
- Body text is always Charcoal on Warm White or White — never green text on white (contrast issues)

---

## Typography

### Font Pairing

**Headings**: Inter (Bold / Semibold)
- Clean, modern, highly readable
- Use semibold for subheadings, bold for main headings

**Body**: Inter (Regular / Medium)
- Same family keeps it simple and fast-loading
- Regular for body, Medium for emphasis or labels

**Alternative option**: If more personality is wanted, swap headings to **DM Sans** (rounded, friendlier) while keeping Inter for body.

### Scale

| Element         | Size (mobile) | Size (desktop) | Weight   |
|-----------------|---------------|----------------|----------|
| H1 (page title) | 2rem          | 3rem           | Bold     |
| H2 (section)    | 1.5rem        | 2rem           | Semibold |
| H3 (subsection) | 1.25rem       | 1.5rem         | Semibold |
| Body             | 1rem          | 1.125rem       | Regular  |
| Small / Caption  | 0.875rem      | 0.875rem       | Regular  |

### Rules
- Never use all-caps for more than a single short label (like "FREE ESTIMATES")
- Line height for body text: 1.6 minimum
- Max paragraph width: ~65 characters (for readability)
- Headings use tighter line height: 1.2

---

## Photography & Imagery

### Style
- **Real, not stock.** When real photos aren't available, use abstract textures (grass close-ups, wood grain, soil) rather than staged stock photos.
- **Natural lighting.** Nothing overprocessed or HDR-looking.
- **Local feeling.** Rolling hills, modest homes, real yards — not McMansion suburbs.

### Placeholder strategy (for MVP)
Since there are no professional photos yet, use:
- Solid color blocks or subtle gradient backgrounds
- CSS-based patterns or textures
- The green/earth color palette to fill visual space
- Icon-based service illustrations using Phosphor Icons

### What to avoid
- Stock photos of smiling people in hard hats holding clipboards
- Drone shots of perfectly manicured golf-course lawns
- Any image that screams "I downloaded this from Shutterstock"

---

## Iconography

Use **Phosphor Icons** (regular weight) throughout:
- Consistent, clean line style
- Works well at small sizes on mobile
- Pairs naturally with Inter typography

### Service icons (suggested)
| Service                | Icon suggestion          |
|------------------------|--------------------------|
| Mowing                 | `Lawn` or `Plant`        |
| Weed Control           | `Leaf` or `Shield`       |
| Storage Clean-outs     | `Warehouse` or `Package` |
| Storm Clean-ups        | `CloudLightning` or `Wind` |
| Spring/Fall Clean-ups  | `TreeEvergreen` or `Rake`|

Keep icons at consistent sizes: 24px inline, 32px in cards, 48px in feature sections.

---

## Component Patterns

### Buttons
- **Primary**: Field Green background, white text, slight rounded corners (8px), no border
- **Primary hover**: Darken to Dark Green
- **Secondary**: White background, Field Green border and text
- **Secondary hover**: Light green tint background
- **Phone CTA**: Styled as primary button with phone icon, always uses `tel:` link

### Cards
- White background on colored sections, Warm White on white sections
- Subtle shadow (`shadow-sm`) — nothing dramatic
- Rounded corners (12px)
- Consistent padding (24px)

### Sections
- Alternate between Warm White and Sky Blue backgrounds to create visual rhythm
- Each section has generous vertical padding (80px desktop, 48px mobile)
- Section headings are always H2, centered or left-aligned (pick one per page and stick with it)

### CTA Banners
- Full-width Field Green background with white text
- Simple: one headline, one line of supporting text, phone number as a button
- Appears at least once on every page (usually before the footer)

---

## Spacing System

Use Tailwind's default spacing scale. Key values:

| Token  | Value | Usage                          |
|--------|-------|--------------------------------|
| `4`    | 16px  | Tight spacing, icon gaps       |
| `6`    | 24px  | Card padding, element spacing  |
| `8`    | 32px  | Section internal gaps          |
| `12`   | 48px  | Section padding (mobile)       |
| `16`   | 64px  | Between major sections         |
| `20`   | 80px  | Section padding (desktop)      |

---

## Tone Examples

### Good (on-brand)
> "We take care of your property so you don't have to worry about it. Call or text for a free estimate — we'll get back to you fast."

> "From weekly mowing to storm cleanup, we handle the work that keeps your property looking right."

> "Locally owned. Salyersville born and raised. We're not going anywhere."

### Bad (off-brand)
> "We provide premium, best-in-class property management solutions for discerning homeowners."

> "Our team of dedicated professionals is passionate about delivering exceptional outdoor experiences!"

> "Transform your outdoor living space into the oasis you've always dreamed of!"

---

## Quick Reference

```
Primary Green:   #2D6A4F
Dark Green:      #1B4332
Earth Brown:     #8B6914
Warm White:      #FAFAF5
Charcoal Text:   #1A1A1A

Font:            Inter (400, 500, 600, 700)
Tagline:         "Your yard. Our word."
Phone 1:         606-362-4834
Phone 2:         606-791-7383
```
