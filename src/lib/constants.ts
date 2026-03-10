export const BUSINESS = {
  name: "Two Brother's Property Management",
  tagline: "Your yard. Our word.",
  phone1: "606-362-4834",
  phone2: "606-791-7383",
  phone1Tel: "tel:+16063624834",
  phone2Tel: "tel:+16067917383",
  location: "Salyersville, KY",
  county: "Magoffin County",
  founded: 2025,
} as const;

export const SERVICE_AREA = [
  "Magoffin County",
  "Floyd County",
  "Johnson County",
  "Morgan County",
  "Breathitt County",
  "Knott County",
] as const;

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: "plant" | "shield" | "warehouse" | "cloud-lightning" | "leaf";
}

export const SERVICES: Service[] = [
  {
    id: "mowing",
    title: "Weekly & Bi-Weekly Mowing",
    shortDescription: "Regular lawn maintenance on your schedule.",
    description:
      "Consistent, reliable mowing that keeps your yard looking sharp all season. We show up on time, every time — weekly or bi-weekly, whatever works for you. Trimming and edging included.",
    icon: "plant",
  },
  {
    id: "weed-control",
    title: "Weed Control",
    shortDescription: "Targeted treatment and prevention.",
    description:
      "We handle the weeds so your lawn stays clean and healthy. Targeted treatments that get results without overdoing it — we know what grows around here and how to deal with it.",
    icon: "shield",
  },
  {
    id: "storage-cleanouts",
    title: "Storage Clean-outs",
    shortDescription: "Sheds, garages, and storage units cleared out.",
    description:
      "Got a shed, garage, or storage unit that's gotten out of hand? We'll clear it out, haul off what needs to go, and leave it usable again. No judgment — we've seen it all.",
    icon: "warehouse",
  },
  {
    id: "storm-cleanup",
    title: "Storm & Property Clean-ups",
    shortDescription: "Post-storm debris removal and damage cleanup.",
    description:
      "When a storm rolls through, we're the ones you call. Fallen branches, scattered debris, damaged fencing — we'll get your property back in order fast. We live here too, so we know how it goes.",
    icon: "cloud-lightning",
  },
  {
    id: "seasonal-cleanup",
    title: "Spring & Fall Clean-ups",
    shortDescription: "Seasonal property prep to start fresh.",
    description:
      "Spring means clearing out winter's mess. Fall means getting ready for what's next. Leaf removal, bed cleaning, gutter clearing, general tidying — we get your property ready for the season ahead.",
    icon: "leaf",
  },
];

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/service-area", label: "Service Area" },
  { href: "/contact", label: "Contact" },
] as const;
