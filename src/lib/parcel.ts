/** County parcel data from public ArcGIS REST services (free, no API key) */
// TODO: Replace with Eastern Kentucky county GIS endpoints when available
// Current configs are placeholders — parcel lookup will fall back to manual draw mode

export type ParcelBoundary =
  | { type: 'Polygon'; coordinates: number[][][] }
  | { type: 'MultiPolygon'; coordinates: number[][][][] };

export interface ParcelData {
  address: string;
  owner: string;
  lotSqft: number;
  lotAcres: number;
  buildingSqft: number;
  garageSqft: number;
  lawnSqft: number;
  yearBuilt: number | null;
  stories: number | null;
  propertyType: string;
  boundary: ParcelBoundary;
}

interface CountyConfig {
  name: string;
  url: string;
  /** Map county-specific field names to our standard fields */
  fieldMap: {
    address: string;
    owner: string;
    lotSqft: string;
    lotAcres: string;
    buildingSqft: string;
    garageSqft: string;
    yearBuilt: string;
    stories: string;
    propertyType: string;
  };
}

// Bounding boxes for county detection [minLng, minLat, maxLng, maxLat]
interface CountyBounds {
  county: string;
  bounds: [number, number, number, number];
}

// Eastern Kentucky county bounds (approximate)
const COUNTY_BOUNDS: CountyBounds[] = [
  { county: 'MagoffinCo', bounds: [-83.30, 37.60, -82.95, 37.85] },
  { county: 'FloydCo', bounds: [-82.95, 37.40, -82.55, 37.75] },
  { county: 'JohnsonCo', bounds: [-83.00, 37.75, -82.55, 38.05] },
  { county: 'MorganCo', bounds: [-83.55, 37.75, -83.15, 38.05] },
  { county: 'BreathittCo', bounds: [-83.55, 37.40, -83.15, 37.75] },
];

// TODO: Replace with actual Kentucky county GIS endpoints when available
// These are placeholders — the estimate tool will fall back to manual draw mode
const COUNTY_CONFIGS: Record<string, CountyConfig> = {
  MagoffinCo: {
    name: 'Magoffin County',
    url: '', // No public ArcGIS endpoint available yet
    fieldMap: {
      address: '',
      owner: '',
      lotSqft: '',
      lotAcres: '',
      buildingSqft: '',
      garageSqft: '',
      yearBuilt: '',
      stories: '',
      propertyType: '',
    },
  },
  FloydCo: {
    name: 'Floyd County',
    url: '',
    fieldMap: {
      address: '',
      owner: '',
      lotSqft: '',
      lotAcres: '',
      buildingSqft: '',
      garageSqft: '',
      yearBuilt: '',
      stories: '',
      propertyType: '',
    },
  },
  JohnsonCo: {
    name: 'Johnson County',
    url: '',
    fieldMap: {
      address: '',
      owner: '',
      lotSqft: '',
      lotAcres: '',
      buildingSqft: '',
      garageSqft: '',
      yearBuilt: '',
      stories: '',
      propertyType: '',
    },
  },
  MorganCo: {
    name: 'Morgan County',
    url: '',
    fieldMap: {
      address: '',
      owner: '',
      lotSqft: '',
      lotAcres: '',
      buildingSqft: '',
      garageSqft: '',
      yearBuilt: '',
      stories: '',
      propertyType: '',
    },
  },
  BreathittCo: {
    name: 'Breathitt County',
    url: '',
    fieldMap: {
      address: '',
      owner: '',
      lotSqft: '',
      lotAcres: '',
      buildingSqft: '',
      garageSqft: '',
      yearBuilt: '',
      stories: '',
      propertyType: '',
    },
  },
};

/** Determine which county config to use based on coordinates */
function getCountyConfig(lat: number, lng: number): CountyConfig | null {
  for (const { county, bounds } of COUNTY_BOUNDS) {
    const [minLng, minLat, maxLng, maxLat] = bounds;
    if (lng >= minLng && lng <= maxLng && lat >= minLat && lat <= maxLat) {
      return COUNTY_CONFIGS[county];
    }
  }

  return null;
}

/** Fetch parcel data from county ArcGIS endpoint */
export async function fetchParcelData(lat: number, lng: number): Promise<ParcelData | null> {
  const config = getCountyConfig(lat, lng);
  if (!config || !config.url) return null;

  const params = new URLSearchParams({
    geometry: `${lng},${lat}`,
    geometryType: 'esriGeometryPoint',
    inSR: '4326',
    outSR: '4326',
    spatialRel: 'esriSpatialRelIntersects',
    outFields: '*',
    returnGeometry: 'true',
    f: 'geojson',
  });

  const response = await fetch(`${config.url}?${params.toString()}`);
  if (!response.ok) throw new Error(`County GIS error: ${response.status}`);

  const data = await response.json();
  const feature = data.features?.[0];
  if (!feature) return null;

  const props = feature.properties || {};
  const fm = config.fieldMap;

  // Extract lot square footage
  // Priority: explicit sqft field > acres field > computed from polygon geometry
  let lotSqft = fm.lotSqft ? toNum(props[fm.lotSqft]) : 0;
  const lotAcres = fm.lotAcres ? toNum(props[fm.lotAcres]) : 0;

  if (lotSqft === 0 && lotAcres > 0) {
    lotSqft = Math.round(lotAcres * 43560);
  }

  // Fall back to computing area from the polygon geometry (most reliable universal method)
  if (lotSqft === 0 && feature.geometry) {
    const geom = feature.geometry as ParcelBoundary;
    const ring = geom.type === 'MultiPolygon'
      ? geom.coordinates[0][0]
      : geom.coordinates[0];
    lotSqft = computePolygonAreaSqft(ring);
  }

  const buildingSqft = fm.buildingSqft ? toNum(props[fm.buildingSqft]) : 0;
  const garageSqft = fm.garageSqft ? toNum(props[fm.garageSqft]) : 0;

  // Estimate lawn area: lot - building footprint - garage - ~10% for hardscape
  const structuresSqft = buildingSqft + garageSqft;
  let lawnSqft: number;
  if (structuresSqft > 0) {
    // Known building size: lot - structures - 10% of lot for driveway/paths
    const hardscape = Math.round(lotSqft * 0.10);
    lawnSqft = Math.max(0, lotSqft - structuresSqft - hardscape);
  } else {
    // No building data: estimate 70% of lot is lawn
    lawnSqft = Math.round(lotSqft * 0.70);
  }

  return {
    address: fm.address ? String(props[fm.address] || '').trim() : '',
    owner: fm.owner ? String(props[fm.owner] || '').trim() : '',
    lotSqft,
    lotAcres: lotAcres > 0 ? lotAcres : lotSqft > 0 ? Math.round((lotSqft / 43560) * 1000) / 1000 : 0,
    buildingSqft,
    garageSqft,
    lawnSqft,
    yearBuilt: fm.yearBuilt ? toNum(props[fm.yearBuilt]) || null : null,
    stories: fm.stories ? toNum(props[fm.stories]) || null : null,
    propertyType: normalizePropertyType(fm.propertyType ? String(props[fm.propertyType] || '').trim() : ''),
    boundary: feature.geometry,
  };
}

/** Normalize raw property type codes to human-readable labels */
function normalizePropertyType(raw: string): string {
  const upper = raw.toUpperCase();
  const map: Record<string, string> = {
    'RESIDENTIAL': 'Residential',
    'COMMERCIAL': 'Commercial',
    'UR': 'Residential',
    'UI': 'Industrial',
    'UC': 'Commercial',
    'UA': 'Agricultural',
    'CI': 'Commercial',
    'RI': 'Residential',
    'AG': 'Agricultural',
  };
  if (map[upper]) return map[upper];
  if (upper.includes('RESID') || upper.includes('SINGLE')) return 'Residential';
  if (upper.includes('COMMER')) return 'Commercial';
  return raw || 'Residential';
}

function toNum(val: unknown): number {
  if (typeof val === 'number') return val;
  if (typeof val === 'string') return parseFloat(val) || 0;
  return 0;
}

/** Compute geodetic area of a WGS84 polygon in square feet */
function computePolygonAreaSqft(ring: number[][]): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const EARTH_RADIUS = 6371000; // meters
  const SQ_M_TO_SQ_FT = 10.7639;

  let area = 0;
  const n = ring.length;

  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    const [lng1, lat1] = ring[i];
    const [lng2, lat2] = ring[j];
    area += toRad(lng2 - lng1) * (2 + Math.sin(toRad(lat1)) + Math.sin(toRad(lat2)));
  }

  area = Math.abs((area * EARTH_RADIUS * EARTH_RADIUS) / 2);
  return Math.round(area * SQ_M_TO_SQ_FT);
}
