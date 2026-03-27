import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: "Brand Guidelines | Two Brother's Property Management",
  description: "Official brand guidelines for Two Brother's Property Management. Colors, typography, voice, logo usage, and design standards.",
  robots: { index: false, follow: false },
};

const COLORS = [
  { name: 'Void', variable: '--void', hex: '#080C0A', usage: 'Primary dark background, nav overlays, deep sections', textLight: true },
  { name: 'Deep', variable: '--deep', hex: '#0F1714', usage: 'Secondary dark background, service cards, section breaks', textLight: true },
  { name: 'Moss', variable: '--moss', hex: '#2C4A3E', usage: 'Accent sections, borders, mobile CTA bar, subtle backgrounds', textLight: true },
  { name: 'Sage', variable: '--sage', hex: '#5B7B6A', usage: 'Lighter green accents, secondary borders, hover states', textLight: true },
  { name: 'Copper', variable: '--copper', hex: '#C17F4E', usage: 'Primary accent — CTAs, buttons, labels, eyebrows, highlights', textLight: false },
  { name: 'Copper Light', variable: '--copper-light', hex: '#D4955F', usage: 'Hover states for copper elements, secondary accent', textLight: false },
  { name: 'Limestone', variable: '--limestone', hex: '#DAD0C2', usage: 'Secondary text on dark backgrounds, muted content', textLight: false },
  { name: 'Paper', variable: '--paper', hex: '#F0EBE3', usage: 'Light section backgrounds, about section, contrast areas', textLight: false },
  { name: 'Chalk', variable: '--chalk', hex: '#F8F5F0', usage: 'Main page background, primary text on dark, button text', textLight: false },
  { name: 'Ink', variable: '--ink', hex: '#1A1A1A', usage: 'Body text on light backgrounds, headings on paper/chalk', textLight: true },
];

const FONTS = [
  {
    name: 'Cormorant Garamond',
    variable: '--font-heading',
    role: 'Headings',
    weights: ['300 Light', '400 Regular', '500 Medium', '600 Semibold', '700 Bold'],
    usage: 'All headings (h1-h6), hero text, section titles, display text. Elegant serif that conveys craftsmanship and trust.',
    sample: 'Your Yard. Our Word.',
  },
  {
    name: 'Syne',
    variable: '--font-body',
    role: 'Body',
    weights: ['400 Regular', '500 Medium', '600 Semibold', '700 Bold'],
    usage: 'Body copy, paragraphs, buttons, navigation labels, descriptions. Modern geometric sans-serif. Default weight: 500.',
    sample: 'Two brothers from Salyersville, KY. Honest work, reliable service.',
  },
  {
    name: 'Space Mono',
    variable: '--font-mono',
    role: 'Labels & Accents',
    weights: ['400 Regular', '700 Bold'],
    usage: 'Eyebrow labels, section numbers, captions, metadata, phone numbers. Monospace for technical precision and contrast.',
    sample: '01 — SERVICES / FREE ESTIMATES / 606-362-4834',
  },
];

const VOICE_GOOD = [
  "We take care of your property so you don't have to worry about it. Call or text for a free estimate — we'll get back to you fast.",
  "From weekly mowing to storm cleanup, we handle the work that keeps your property looking right.",
  "Locally owned. Salyersville born and raised. We're not going anywhere.",
];

const VOICE_BAD = [
  "We provide premium, best-in-class property management solutions for discerning homeowners.",
  "Our team of dedicated professionals is passionate about delivering exceptional outdoor experiences!",
  "Transform your outdoor living space into the oasis you've always dreamed of!",
];

export default function BrandPage() {
  return (
    <div className="bg-chalk min-h-screen pt-24">
      {/* ── Header ── */}
      <section className="bg-void py-[100px] lg:py-[140px]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="font-mono text-[11px] uppercase tracking-[3px] text-copper mb-6">
            Brand Guidelines
          </p>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-chalk font-light tracking-tight">
            Two Brother&apos;s<br />
            <span className="text-copper">Property Management</span>
          </h1>
          <p className="text-limestone/60 text-lg max-w-2xl mt-6 font-body">
            This document defines the visual identity, voice, and design standards
            for Two Brother&apos;s Property Management. It exists to maintain consistency
            across all materials — digital, print, and otherwise.
          </p>
          <div className="mt-8 inline-block border border-copper/30 px-4 py-2">
            <p className="font-mono text-[11px] uppercase tracking-[2px] text-limestone/40">
              Confidential &mdash; Internal Use Only
            </p>
          </div>
        </div>
      </section>

      {/* ── Table of Contents ── */}
      <section className="bg-deep py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['01 — Identity', '02 — Color', '03 — Typography', '04 — Voice',
              '05 — Logo Usage', '06 — Photography', '07 — Components', '08 — Don\u2019ts'].map((item) => (
              <div key={item} className="border border-moss/30 p-4">
                <p className="font-mono text-xs text-copper">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 01: Identity ── */}
      <section className="bg-paper py-[100px] lg:py-[120px]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="font-mono text-[11px] uppercase tracking-[3px] text-copper mb-8">
            01 &mdash; Identity
          </p>
          <h2 className="font-heading text-4xl md:text-5xl text-ink font-light tracking-tight">
            Who we are.
          </h2>

          <div className="grid lg:grid-cols-2 gap-16 mt-12">
            <div className="space-y-6">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[2px] text-ink/40 mb-1">Business Name</p>
                <p className="text-ink text-lg font-body">Two Brother&apos;s Property Management</p>
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[2px] text-ink/40 mb-1">Short Name</p>
                <p className="text-ink text-lg font-body">Two Brother&apos;s</p>
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[2px] text-ink/40 mb-1">Tagline</p>
                <p className="font-heading text-3xl text-ink font-light italic">&ldquo;Your Yard. Our Word.&rdquo;</p>
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[2px] text-ink/40 mb-1">Founded</p>
                <p className="text-ink text-lg font-body">2025</p>
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[2px] text-ink/40 mb-1">Location</p>
                <p className="text-ink text-lg font-body">Salyersville, KY (Magoffin County)</p>
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[2px] text-ink/40 mb-1">Service Area</p>
                <p className="text-ink text-lg font-body">Magoffin, Floyd, Johnson, Morgan, Breathitt Counties</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[2px] text-ink/40 mb-1">Contact</p>
                <p className="text-ink font-body">606-362-4834 / 606-791-7383</p>
                <p className="text-ink/50 text-sm font-body mt-1">Phone and text only. No email.</p>
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[2px] text-ink/40 mb-1">Brand Position</p>
                <p className="text-ink/70 font-body leading-relaxed">
                  Two brothers from Eastern Kentucky who do honest work. Not a franchise.
                  Not a corporation. Two guys who show up, do the job right, and answer
                  their own phones. The brand should always feel like you&apos;re dealing
                  with real people who live in your community.
                </p>
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[2px] text-ink/40 mb-1">Social</p>
                <p className="text-ink font-body">
                  <a href="https://www.facebook.com/profile.php?id=61583038508698" className="text-copper hover:text-copper-light transition-colors">
                    Facebook
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02: Color Palette ── */}
      <section className="bg-void py-[100px] lg:py-[120px]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="font-mono text-[11px] uppercase tracking-[3px] text-copper mb-8">
            02 &mdash; Color
          </p>
          <h2 className="font-heading text-4xl md:text-5xl text-chalk font-light tracking-tight">
            Color palette.
          </h2>
          <p className="text-limestone/50 text-lg max-w-2xl mt-4 mb-16 font-body">
            Drawn from the natural landscape of Eastern Kentucky — deep forest
            greens, warm earth tones, and the copper of honest work. Nothing neon.
            Nothing corporate.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {COLORS.map((color) => (
              <div key={color.name} className="group">
                <div
                  className="aspect-square rounded-sm border border-white/10 flex items-end p-4"
                  style={{ backgroundColor: color.hex }}
                >
                  <span className={`font-mono text-[10px] uppercase tracking-[2px] ${color.textLight ? 'text-white/60' : 'text-black/50'}`}>
                    {color.hex}
                  </span>
                </div>
                <div className="mt-3">
                  <p className="text-chalk text-sm font-body font-medium">{color.name}</p>
                  <p className="font-mono text-[10px] text-limestone/40 mt-0.5">{color.variable}</p>
                  <p className="text-limestone/40 text-xs font-body mt-1 leading-relaxed">{color.usage}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Color Rules */}
          <div className="mt-20 border-t border-moss/30 pt-12">
            <h3 className="font-heading text-2xl text-chalk font-light mb-8">Usage Rules</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="border-l-2 border-copper/40 pl-6">
                <p className="text-chalk/90 font-body font-medium">Copper leads, everything else supports.</p>
                <p className="text-limestone/50 text-sm font-body mt-2">
                  Copper is the primary accent — use it for CTAs, labels, highlights, and interactive elements.
                  It should be the most vivid color on any given screen.
                </p>
              </div>
              <div className="border-l-2 border-copper/40 pl-6">
                <p className="text-chalk/90 font-body font-medium">Dark backgrounds dominate.</p>
                <p className="text-limestone/50 text-sm font-body mt-2">
                  The site primarily uses void/deep backgrounds. Paper and chalk are reserved for
                  contrast sections (about, testimonials). Never use light backgrounds as the default.
                </p>
              </div>
              <div className="border-l-2 border-copper/40 pl-6">
                <p className="text-chalk/90 font-body font-medium">Text hierarchy through opacity.</p>
                <p className="text-limestone/50 text-sm font-body mt-2">
                  On dark: chalk (primary), limestone (secondary), limestone/50 (tertiary).
                  On light: ink (primary), ink/70 (secondary), ink/40 (tertiary).
                </p>
              </div>
              <div className="border-l-2 border-copper/40 pl-6">
                <p className="text-chalk/90 font-body font-medium">Film grain is always present.</p>
                <p className="text-limestone/50 text-sm font-body mt-2">
                  A subtle SVG noise texture overlay sits on top of everything at 3.5% opacity.
                  This adds tactile warmth and prevents the flat digital look.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 03: Typography ── */}
      <section className="bg-deep py-[100px] lg:py-[120px]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="font-mono text-[11px] uppercase tracking-[3px] text-copper mb-8">
            03 &mdash; Typography
          </p>
          <h2 className="font-heading text-4xl md:text-5xl text-chalk font-light tracking-tight">
            Type system.
          </h2>
          <p className="text-limestone/50 text-lg max-w-2xl mt-4 mb-16 font-body">
            Three fonts, each with a clear purpose. The contrast between elegant
            serif headings, geometric body text, and monospace labels creates a
            layered, professional feel.
          </p>

          <div className="space-y-16">
            {FONTS.map((font) => (
              <div key={font.name} className="border-t border-moss/30 pt-8">
                <div className="grid lg:grid-cols-3 gap-8">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[2px] text-copper mb-2">{font.role}</p>
                    <p className="text-chalk text-xl font-body font-medium">{font.name}</p>
                    <p className="font-mono text-[10px] text-limestone/40 mt-1">{font.variable}</p>
                    <div className="mt-4 space-y-1">
                      {font.weights.map((w) => (
                        <p key={w} className="text-limestone/50 text-xs font-body">{w}</p>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-limestone/50 text-sm font-body leading-relaxed">
                      {font.usage}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <p
                      className="text-chalk/80 text-2xl leading-relaxed"
                      style={{
                        fontFamily: font.role === 'Headings'
                          ? 'var(--font-heading), serif'
                          : font.role === 'Body'
                          ? 'var(--font-body), sans-serif'
                          : 'var(--font-mono), monospace',
                        fontWeight: font.role === 'Headings' ? 300 : 400,
                        fontSize: font.role === 'Labels & Accents' ? '14px' : undefined,
                        letterSpacing: font.role === 'Labels & Accents' ? '2px' : undefined,
                        textTransform: font.role === 'Labels & Accents' ? 'uppercase' : undefined,
                      }}
                    >
                      {font.sample}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Type Scale */}
          <div className="mt-20 border-t border-moss/30 pt-12">
            <h3 className="font-heading text-2xl text-chalk font-light mb-8">Type Scale</h3>
            <div className="space-y-6">
              {[
                { label: 'H1 / Hero', size: 'text-6xl lg:text-7xl', font: 'font-heading', weight: 'font-light', sample: 'Your Yard. Our Word.' },
                { label: 'H2 / Section', size: 'text-4xl md:text-5xl', font: 'font-heading', weight: 'font-light', sample: 'The work we take on.' },
                { label: 'H3 / Subsection', size: 'text-2xl md:text-3xl', font: 'font-heading', weight: 'font-light', sample: 'Two brothers. Honest work.' },
                { label: 'Body', size: 'text-base lg:text-lg', font: 'font-body', weight: '', sample: 'We show up on time, do the job right, and leave your property better than we found it.' },
                { label: 'Eyebrow', size: 'text-xs', font: 'font-mono', weight: '', sample: 'WHO WE ARE' },
              ].map((item) => (
                <div key={item.label} className="flex items-baseline gap-6 border-b border-moss/20 pb-4">
                  <span className="font-mono text-[10px] text-copper uppercase tracking-[2px] w-32 shrink-0">
                    {item.label}
                  </span>
                  <span className={`${item.size} ${item.font} ${item.weight} text-chalk tracking-tight`}>
                    {item.sample}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 04: Voice & Tone ── */}
      <section className="bg-paper py-[100px] lg:py-[120px]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="font-mono text-[11px] uppercase tracking-[3px] text-copper mb-8">
            04 &mdash; Voice
          </p>
          <h2 className="font-heading text-4xl md:text-5xl text-ink font-light tracking-tight">
            How we sound.
          </h2>

          <div className="grid lg:grid-cols-2 gap-16 mt-12">
            <div>
              <h3 className="font-heading text-2xl text-ink font-light mb-6">Principles</h3>
              <div className="space-y-6">
                {[
                  { trait: 'Straightforward', desc: "Say what you mean. No marketing fluff, no \"leveraging synergies.\" If you mow lawns, say you mow lawns." },
                  { trait: 'Warm but not cheesy', desc: 'Friendly like a neighbor, not like a used car salesman. No forced folksy charm.' },
                  { trait: 'Confident', desc: "They know what they're doing. The copy should reflect quiet competence, not desperation for business." },
                  { trait: 'Local', desc: "This isn't a national brand. Lean into the fact that they're from here, they live here, they care about these properties." },
                ].map((item) => (
                  <div key={item.trait} className="border-l-2 border-copper/40 pl-6">
                    <p className="text-ink font-body font-medium">{item.trait}</p>
                    <p className="text-ink/60 text-sm font-body mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-heading text-2xl text-ink font-light mb-6">Words to use</h3>
              <div className="flex flex-wrap gap-2 mb-8">
                {['Reliable', 'Honest', 'Local', 'Hands-on', 'Thorough', 'No-hassle', 'Straightforward'].map((word) => (
                  <span key={word} className="border border-moss/40 px-3 py-1.5 text-sm font-body text-ink/70">{word}</span>
                ))}
              </div>

              <h3 className="font-heading text-2xl text-ink font-light mb-6">Words to avoid</h3>
              <div className="flex flex-wrap gap-2">
                {['Synergy', 'Solutions', 'Leverage', 'Optimize', 'Cutting-edge', 'World-class', 'Premium', 'Ecosystem', 'Holistic'].map((word) => (
                  <span key={word} className="border border-red-300/40 px-3 py-1.5 text-sm font-body text-ink/40 line-through">{word}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Examples */}
          <div className="mt-16 grid lg:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-3 h-3 rounded-full bg-moss" />
                <p className="font-mono text-[11px] uppercase tracking-[2px] text-ink/40">On-brand</p>
              </div>
              <div className="space-y-3">
                {VOICE_GOOD.map((text) => (
                  <blockquote key={text} className="border-l-2 border-moss pl-4 text-ink/70 text-sm font-body italic leading-relaxed">
                    &ldquo;{text}&rdquo;
                  </blockquote>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <p className="font-mono text-[11px] uppercase tracking-[2px] text-ink/40">Off-brand</p>
              </div>
              <div className="space-y-3">
                {VOICE_BAD.map((text) => (
                  <blockquote key={text} className="border-l-2 border-red-300/40 pl-4 text-ink/30 text-sm font-body italic leading-relaxed line-through">
                    &ldquo;{text}&rdquo;
                  </blockquote>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 05: Logo Usage ── */}
      <section className="bg-void py-[100px] lg:py-[120px]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="font-mono text-[11px] uppercase tracking-[3px] text-copper mb-8">
            05 &mdash; Logo
          </p>
          <h2 className="font-heading text-4xl md:text-5xl text-chalk font-light tracking-tight">
            Logo usage.
          </h2>
          <p className="text-limestone/50 text-lg max-w-2xl mt-4 mb-16 font-body">
            The logo consists of a mark and a wordmark. They can be used together
            or separately depending on context.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Full Logo */}
            <div className="border border-moss/30 p-8 flex flex-col items-center justify-center min-h-[240px] bg-deep/50">
              <Image src="/logo.png" alt="Full logo" width={400} height={218} className="max-w-[300px] h-auto" />
              <p className="font-mono text-[10px] text-limestone/40 uppercase tracking-[2px] mt-6">Full Logo</p>
            </div>

            {/* Logo Mark */}
            <div className="border border-moss/30 p-8 flex flex-col items-center justify-center min-h-[240px] bg-deep/50">
              <Image src="/logo-mark.png" alt="Logo mark" width={120} height={120} className="w-24 h-24" />
              <p className="font-mono text-[10px] text-limestone/40 uppercase tracking-[2px] mt-6">Logo Mark</p>
            </div>

            {/* Text Logo on Dark */}
            <div className="border border-moss/30 p-8 flex flex-col items-center justify-center min-h-[200px] bg-void">
              <div className="text-center">
                <span className="font-heading text-3xl font-semibold text-chalk tracking-tight">Two Brother&apos;s</span>
                <span className="block font-mono text-[10px] uppercase tracking-[3px] text-limestone/50 mt-1">Property Management</span>
              </div>
              <p className="font-mono text-[10px] text-limestone/40 uppercase tracking-[2px] mt-6">Text Mark / Dark</p>
            </div>

            {/* Text Logo on Light */}
            <div className="border border-limestone p-8 flex flex-col items-center justify-center min-h-[200px] bg-paper">
              <div className="text-center">
                <span className="font-heading text-3xl font-semibold text-ink tracking-tight">Two Brother&apos;s</span>
                <span className="block font-mono text-[10px] uppercase tracking-[3px] text-ink/40 mt-1">Property Management</span>
              </div>
              <p className="font-mono text-[10px] text-ink/30 uppercase tracking-[2px] mt-6">Text Mark / Light</p>
            </div>
          </div>

          {/* Logo Rules */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              { rule: 'Minimum clear space around the logo should equal the height of the mark.' },
              { rule: 'Never stretch, rotate, or apply effects to the logo.' },
              { rule: 'On photography, ensure sufficient contrast or use a dark overlay behind the logo.' },
            ].map((item, i) => (
              <div key={i} className="border-l-2 border-copper/40 pl-4">
                <p className="text-limestone/60 text-sm font-body leading-relaxed">{item.rule}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 06: Photography ── */}
      <section className="bg-deep py-[100px] lg:py-[120px]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="font-mono text-[11px] uppercase tracking-[3px] text-copper mb-8">
            06 &mdash; Photography
          </p>
          <h2 className="font-heading text-4xl md:text-5xl text-chalk font-light tracking-tight">
            Photography style.
          </h2>

          <div className="grid lg:grid-cols-2 gap-16 mt-12">
            <div className="space-y-6">
              <div className="border-l-2 border-copper/40 pl-6">
                <p className="text-chalk/90 font-body font-medium">Real, not stock.</p>
                <p className="text-limestone/50 text-sm font-body mt-1">
                  When real photos aren&apos;t available, use natural textures (grass close-ups,
                  wood grain, soil) rather than staged stock photos.
                </p>
              </div>
              <div className="border-l-2 border-copper/40 pl-6">
                <p className="text-chalk/90 font-body font-medium">Natural lighting.</p>
                <p className="text-limestone/50 text-sm font-body mt-1">
                  Nothing overprocessed or HDR-looking. Golden hour preferred.
                </p>
              </div>
              <div className="border-l-2 border-copper/40 pl-6">
                <p className="text-chalk/90 font-body font-medium">Local feeling.</p>
                <p className="text-limestone/50 text-sm font-body mt-1">
                  Rolling hills, modest homes, real yards — not McMansion suburbs.
                  This is Eastern Kentucky, keep it real.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="font-heading text-2xl text-chalk font-light">What to avoid</h3>
              <ul className="space-y-3">
                {[
                  'Stock photos of smiling people in hard hats holding clipboards',
                  'Drone shots of perfectly manicured golf-course lawns',
                  'Any image that screams "I downloaded this from Shutterstock"',
                  'Over-saturated or heavily filtered images',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-red-400/70 mt-0.5">&times;</span>
                    <span className="text-limestone/50 text-sm font-body">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 07: Components ── */}
      <section className="bg-void py-[100px] lg:py-[120px]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="font-mono text-[11px] uppercase tracking-[3px] text-copper mb-8">
            07 &mdash; Components
          </p>
          <h2 className="font-heading text-4xl md:text-5xl text-chalk font-light tracking-tight">
            UI patterns.
          </h2>
          <p className="text-limestone/50 text-lg max-w-2xl mt-4 mb-16 font-body">
            Standardized components that maintain consistency across the site.
          </p>

          {/* Buttons */}
          <div className="border-t border-moss/30 pt-8 mb-16">
            <h3 className="font-heading text-2xl text-chalk font-light mb-8">Buttons</h3>
            <div className="flex flex-wrap gap-4 items-center">
              <span className="btn-copper">Primary Action</span>
              <span className="btn-outline">Secondary Action</span>
            </div>
            <div className="mt-6 grid md:grid-cols-2 gap-4 text-sm">
              <div className="border-l-2 border-copper/40 pl-4">
                <p className="text-chalk/80 font-body">
                  <strong className="text-copper">Primary (.btn-copper)</strong> — Copper background,
                  chalk text. Used for main CTAs: call buttons, primary actions.
                </p>
              </div>
              <div className="border-l-2 border-copper/40 pl-4">
                <p className="text-chalk/80 font-body">
                  <strong className="text-copper">Outline (.btn-outline)</strong> — Copper border,
                  transparent fill. Used for secondary actions. Fills copper on hover.
                </p>
              </div>
            </div>
          </div>

          {/* Labels */}
          <div className="border-t border-moss/30 pt-8 mb-16">
            <h3 className="font-heading text-2xl text-chalk font-light mb-8">Labels & Indicators</h3>
            <div className="flex flex-wrap gap-8 items-end">
              <div>
                <p className="eyebrow">Eyebrow Label</p>
                <p className="font-mono text-[10px] text-limestone/30 mt-2">.eyebrow</p>
              </div>
              <div>
                <p className="section-number">01 &mdash; Section</p>
                <p className="font-mono text-[10px] text-limestone/30 mt-2">.section-number</p>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="border-t border-moss/30 pt-8">
            <h3 className="font-heading text-2xl text-chalk font-light mb-8">Cards</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-moss/20 border border-moss/30 rounded-sm p-6">
                <p className="eyebrow mb-2">Service</p>
                <h4 className="font-heading text-xl text-chalk">Card Title</h4>
                <p className="text-limestone/50 text-sm font-body mt-2">
                  Moss/20 background with moss/30 border. Used for service cards
                  and content blocks on dark backgrounds.
                </p>
              </div>
              <div className="bg-void border border-sage/20 rounded-sm p-6">
                <p className="eyebrow mb-2">Info</p>
                <h4 className="font-heading text-xl text-chalk">Void Card</h4>
                <p className="text-limestone/50 text-sm font-body mt-2">
                  Void background with sage/20 border. Used for secondary content
                  that needs to recede slightly.
                </p>
              </div>
              <div className="bg-copper rounded-sm p-6">
                <p className="font-mono text-[11px] uppercase tracking-[2px] text-void/70 mb-2">Accent</p>
                <h4 className="font-heading text-xl text-void">Copper Card</h4>
                <p className="text-void/70 text-sm font-body mt-2">
                  Full copper background. Used sparingly for promotional content
                  or standout CTAs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 08: Don'ts ── */}
      <section className="bg-paper py-[100px] lg:py-[120px]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="font-mono text-[11px] uppercase tracking-[3px] text-copper mb-8">
            08 &mdash; Don&apos;ts
          </p>
          <h2 className="font-heading text-4xl md:text-5xl text-ink font-light tracking-tight">
            What not to do.
          </h2>
          <p className="text-ink/50 text-lg max-w-2xl mt-4 mb-16 font-body">
            Maintaining brand integrity means knowing what to avoid
            as much as what to use.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'No parallax scrolling or scroll-jacking', desc: 'Smooth, simple scrolling. No tricks.' },
              { title: 'No hero carousels', desc: 'One hero, one message. No rotating slides nobody reads.' },
              { title: 'No chat widgets or popups', desc: 'No cookie banners (no cookies), no chatbots, no interstitials.' },
              { title: 'No fake testimonials', desc: 'If we add reviews, they will be real. No placeholder quotes.' },
              { title: 'No stock photography of perfect suburbs', desc: 'This is Eastern Kentucky. Keep imagery authentic and local.' },
              { title: 'No corporate marketing language', desc: "No \"solutions,\" no \"leverage,\" no \"world-class.\" Say what you mean." },
              { title: 'No unnecessary animations', desc: 'Animations serve a purpose (reveal, hierarchy). Never decorative-only.' },
              { title: 'No light theme as default', desc: 'The dark earth palette is the foundation. Light sections (paper/chalk) are for contrast, not the base.' },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 border border-ink/10 p-5">
                <span className="text-red-400 text-lg mt-0.5 shrink-0">&times;</span>
                <div>
                  <p className="text-ink font-body font-medium">{item.title}</p>
                  <p className="text-ink/50 text-sm font-body mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <section className="bg-void py-16 border-t border-moss/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <p className="font-heading text-2xl text-chalk font-light">
            Two Brother&apos;s Property Management
          </p>
          <p className="font-mono text-[11px] text-limestone/30 uppercase tracking-[3px] mt-2">
            Brand Guidelines &mdash; {new Date().getFullYear()}
          </p>
          <p className="text-limestone/20 text-xs font-body mt-6">
            This document is confidential and intended for internal use only.
            <br />
            Built by{' '}
            <a href="https://originforge.dev" target="_blank" rel="noopener noreferrer" className="text-limestone/40 hover:text-copper transition-colors">
              Origin Forge
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
