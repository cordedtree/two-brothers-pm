export interface SubService {
  id: string;
  name: string;
  description: string;
}

export interface ServiceCategory {
  slug: string;
  title: string;
  headline: string;
  description: string;
  longDescription: string;
  subServices: SubService[];
  faq: { question: string; answer: string }[];
}

export const LAWN_CARE_SERVICES: SubService[] = [
  { id: 'mowing', name: 'Weekly & Bi-Weekly Mowing', description: "Consistent, reliable mowing that keeps your yard looking sharp all season. We show up on time, every time — weekly or bi-weekly, whatever works for you. Trimming and edging included." },
  { id: 'weed-control', name: 'Weed Control', description: "We handle the weeds so your lawn stays clean and healthy. Targeted treatments that get results without overdoing it — we know what grows around here and how to deal with it." },
  { id: 'storage-cleanouts', name: 'Storage Clean-outs', description: "Got a shed, garage, or storage unit that's gotten out of hand? We'll clear it out, haul off what needs to go, and leave it usable again. No judgment — we've seen it all." },
  { id: 'storm-cleanup', name: 'Storm & Property Clean-ups', description: "When a storm rolls through, we're the ones you call. Fallen branches, scattered debris, damaged fencing — we'll get your property back in order fast. We live here too, so we know how it goes." },
  { id: 'seasonal-cleanup', name: 'Spring & Fall Clean-ups', description: "Spring means clearing out winter's mess. Fall means getting ready for what's next. Leaf removal, bed cleaning, gutter clearing, general tidying — we get your property ready for the season ahead." },
];

export const LANDSCAPING_SERVICES: SubService[] = [];

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    slug: 'lawn-maintenance',
    title: 'Lawn Care & Property Management',
    headline: 'Honest work that keeps your property looking right.',
    description: 'Reliable lawn care and property management for Eastern Kentucky. No contracts, no fine print.',
    longDescription: "We're two brothers from Salyersville, KY. We grew up working outside — helping family, helping neighbors, doing whatever needed doing. We saw people around here who needed reliable help with their yards and properties but kept running into the same problems — no-shows, vague pricing, sloppy work. We figured we could do better.",
    subServices: LAWN_CARE_SERVICES,
    faq: [
      { question: 'How do I get an estimate?', answer: "Just call or text either number. We'll ask a few questions, set up a time to come look at your property, and give you a straight price. Every estimate is free — no pressure, no obligation." },
      { question: 'Do you require contracts?', answer: "No. We don't do contracts and we don't do hidden fees. If you're not happy with the work, tell us and we'll make it right." },
      { question: 'What areas do you serve?', answer: 'We serve Magoffin County and the surrounding area — Floyd, Johnson, Morgan, and Breathitt counties. Not listed? Call us anyway. If we can get to you, we will.' },
      { question: 'How often should I have my lawn mowed?', answer: 'During the growing season, we recommend bi-weekly mowing for most properties. Weekly mowing is ideal during peak growth in spring and early summer. Whatever works for you — we\'re flexible.' },
    ],
  },
];

export const CITIES = [
  { slug: 'magoffin-county', name: 'Magoffin County', importance: 'primary' as const, neighborhoods: ['Salyersville', 'Royalton', 'Gunlock'] },
  { slug: 'floyd-county', name: 'Floyd County', importance: 'secondary' as const, neighborhoods: ['Prestonsburg', 'Martin', 'Allen'] },
  { slug: 'johnson-county', name: 'Johnson County', importance: 'secondary' as const, neighborhoods: ['Paintsville', 'Staffordsville'] },
  { slug: 'morgan-county', name: 'Morgan County', importance: 'tertiary' as const, neighborhoods: ['West Liberty', 'Cannel City'] },
  { slug: 'breathitt-county', name: 'Breathitt County', importance: 'tertiary' as const, neighborhoods: ['Jackson', 'Quicksand'] },
];

export const TESTIMONIALS: { name: string; text: string; featured: boolean }[] = [
  // To be filled with real reviews when available
];
