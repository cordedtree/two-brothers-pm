// Lawn care pricing (per sq ft per service visit)
export const LAWN_PRICING = {
  mowing_weekly: { label: 'Routine Mowing (weekly)', rate: 0.005, unit: 'sqft' as const, frequency: 'weekly' as const, min: 40 },
  mowing_biweekly: { label: 'Routine Mowing (bi-weekly)', rate: 0.006, unit: 'sqft' as const, frequency: 'biweekly' as const, min: 45 },
  mowing_monthly: { label: 'Routine Mowing (monthly)', rate: 0.007, unit: 'sqft' as const, frequency: 'monthly' as const, min: 50 },
  fertilization: { label: 'Fertilization & Weed Control', rate: 0.008, unit: 'sqft' as const, frequency: 'quarterly' as const, min: 75 },
  aeration: { label: 'Aeration & Overseeding', rate: 0.010, unit: 'sqft' as const, frequency: 'annual' as const, min: 100 },
  mulching: { label: 'Mulching', rate: 0.012, unit: 'sqft' as const, frequency: 'annual' as const, min: 80 },
  leaf_removal: { label: 'Leaf Removal', rate: 0.004, unit: 'sqft' as const, frequency: 'seasonal' as const, min: 60 },
  snow_removal: { label: 'Snow Removal', rate: 0.005, unit: 'sqft' as const, frequency: 'per_event' as const, min: 50 },
} as const;

// Non-lawn services (flat ranges by project scope)
export const SERVICE_RANGES = {
  flowerbed_design: { label: 'Flowerbed Design & Installation', min: 500, max: 3000 },
  landscape_design: { label: 'Landscape Design', min: 1500, max: 8000 },
  tree_trimming: { label: 'Tree Trimming', min: 200, max: 1500 },
  sod_installation: { label: 'Sod Installation', min: 800, max: 4000 },
  holiday_lighting: { label: 'Holiday Lighting', min: 300, max: 2000 },
  debris_removal: { label: 'Debris Removal', min: 150, max: 800 },
} as const;

export type LawnServiceKey = keyof typeof LAWN_PRICING;
export type LandscapeServiceKey = keyof typeof SERVICE_RANGES;

export interface LawnEstimateItem {
  key: LawnServiceKey;
  label: string;
  sqft: number;
  rate: number;
  total: number;
  frequency: string;
}

export interface LandscapeEstimateItem {
  key: LandscapeServiceKey;
  label: string;
  min: number;
  max: number;
}

export function calculateLawnEstimate(
  selectedServices: LawnServiceKey[],
  lawnSqft: number
): LawnEstimateItem[] {
  return selectedServices.map((key) => {
    const service = LAWN_PRICING[key];
    const total = Math.max(lawnSqft * service.rate, service.min);
    return {
      key,
      label: service.label,
      sqft: lawnSqft,
      rate: service.rate,
      total: Math.round(total * 100) / 100,
      frequency: service.frequency,
    };
  });
}

export function calculateLandscapeEstimate(
  selectedServices: LandscapeServiceKey[]
): LandscapeEstimateItem[] {
  return selectedServices.map((key) => {
    const service = SERVICE_RANGES[key];
    return {
      key,
      label: service.label,
      min: service.min,
      max: service.max,
    };
  });
}

export const FREQUENCY_LABELS: Record<string, string> = {
  weekly: '/week',
  biweekly: '/visit (bi-weekly)',
  monthly: '/visit (monthly)',
  quarterly: '/quarter',
  annual: '/year',
  seasonal: '/season',
  per_event: '/event',
};
