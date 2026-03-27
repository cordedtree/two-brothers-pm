'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { setOptions, importLibrary } from '@googlemaps/js-api-loader';
import type { ParcelBoundary } from '@/lib/parcel';

interface PropertyData {
  address: string;
  lat: number;
  lng: number;
  lotSqft: number;
  lawnSqft: number;
}

interface ParcelResponse {
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

interface StepPropertyViewProps {
  onContinue: (data: PropertyData) => void;
  onBack: () => void;
}

const DEMO_ADDRESS = '349 Maple St, Salyersville, KY 41465';
const DEMO_LAT = 37.7527;
const DEMO_LNG = -83.0688;
const DEMO_LOT_SQFT = 12500;
const DEMO_LAWN_SQFT = 9800;

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const isDemoMode = !API_KEY;

let mapsInitialized = false;

function formatNumber(n: number): string {
  return n.toLocaleString('en-US');
}

async function ensureMapsLoaded() {
  if (isDemoMode || !API_KEY) return;
  if (!mapsInitialized) {
    setOptions({
      key: API_KEY,
      v: 'weekly',
      libraries: ['places', 'geometry', 'drawing'],
    });
    mapsInitialized = true;
  }
  await importLibrary('maps');
  await importLibrary('places');
  await importLibrary('geometry');
  await importLibrary('drawing');
}

export default function StepPropertyView({ onContinue, onBack }: StepPropertyViewProps) {
  const [inputValue, setInputValue] = useState(isDemoMode ? DEMO_ADDRESS : '');
  const [address, setAddress] = useState(isDemoMode ? DEMO_ADDRESS : '');
  const [lat, setLat] = useState(isDemoMode ? DEMO_LAT : 0);
  const [lng, setLng] = useState(isDemoMode ? DEMO_LNG : 0);
  const [lotSqft, setLotSqft] = useState(isDemoMode ? DEMO_LOT_SQFT : 0);
  const [lawnSqft, setLawnSqft] = useState(isDemoMode ? DEMO_LAWN_SQFT : 0);
  const [buildingSqft, setBuildingSqft] = useState(0);
  const [mapLoaded, setMapLoaded] = useState(isDemoMode);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [propertyType, setPropertyType] = useState('Residential');
  const [drawMode, setDrawMode] = useState(false);

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const polygonRef = useRef<google.maps.Polygon | null>(null);
  const drawingManagerRef = useRef<google.maps.drawing.DrawingManager | null>(null);
  const drawnPolygonRef = useRef<google.maps.Polygon | null>(null);
  const pendingCoordsRef = useRef<{ lat: number; lng: number } | null>(null);
  const pendingBoundaryRef = useRef<ParcelBoundary | null>(null);
  const pendingDrawModeRef = useRef(false);

  const hasData = address.length > 0 && (isDemoMode || (lat !== 0 && lng !== 0));

  /** Enable polygon drawing tool on the map */
  const enableDrawing = useCallback((map: google.maps.Map) => {
    // Clean up any previous drawing manager
    if (drawingManagerRef.current) {
      drawingManagerRef.current.setMap(null);
    }
    if (drawnPolygonRef.current) {
      drawnPolygonRef.current.setMap(null);
      drawnPolygonRef.current = null;
    }

    const drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
      drawingControl: false, // We show our own UI
      polygonOptions: {
        strokeColor: '#C17F4E',
        strokeOpacity: 0.9,
        strokeWeight: 2.5,
        fillColor: '#C17F4E',
        fillOpacity: 0.15,
        editable: true,
      },
    });

    drawingManager.setMap(map);
    drawingManagerRef.current = drawingManager;

    google.maps.event.addListener(drawingManager, 'polygoncomplete', (polygon: google.maps.Polygon) => {
      // Stop drawing mode after first polygon
      drawingManager.setDrawingMode(null);

      // Remove previous drawn polygon if any
      if (drawnPolygonRef.current) {
        drawnPolygonRef.current.setMap(null);
      }
      drawnPolygonRef.current = polygon;

      // Calculate area
      const areaSqMeters = google.maps.geometry.spherical.computeArea(polygon.getPath());
      const areaSqFt = Math.round(areaSqMeters * 10.7639);

      setLotSqft(areaSqFt);
      setLawnSqft(Math.round(areaSqFt * 0.7));

      // Listen for edits to recalculate
      const recalc = () => {
        const newArea = google.maps.geometry.spherical.computeArea(polygon.getPath());
        const newSqFt = Math.round(newArea * 10.7639);
        setLotSqft(newSqFt);
        setLawnSqft(Math.round(newSqFt * 0.7));
      };
      google.maps.event.addListener(polygon.getPath(), 'set_at', recalc);
      google.maps.event.addListener(polygon.getPath(), 'insert_at', recalc);
    });
  }, []);

  /** Clear drawn polygon and restart drawing */
  const handleClearDrawing = useCallback(() => {
    if (drawnPolygonRef.current) {
      drawnPolygonRef.current.setMap(null);
      drawnPolygonRef.current = null;
    }
    setLotSqft(0);
    setLawnSqft(0);

    if (drawingManagerRef.current) {
      drawingManagerRef.current.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
    }
  }, []);

  /** Initialize satellite map and draw parcel boundary */
  const initMap = useCallback(async (
    latitude: number,
    longitude: number,
    boundary?: ParcelBoundary | null,
    enableDrawMode?: boolean,
  ) => {
    if (isDemoMode) return;
    if (!mapRef.current) {
      pendingCoordsRef.current = { lat: latitude, lng: longitude };
      pendingBoundaryRef.current = boundary || null;
      pendingDrawModeRef.current = enableDrawMode || false;
      return;
    }

    try {
      await ensureMapsLoaded();

      const map = new google.maps.Map(mapRef.current, {
        center: { lat: latitude, lng: longitude },
        zoom: 19,
        mapTypeId: 'satellite',
        disableDefaultUI: true,
        zoomControl: true,
        mapTypeControl: true,
      });

      mapInstanceRef.current = map;

      if (boundary) {
        const rings = boundary.type === 'MultiPolygon'
          ? boundary.coordinates[0]
          : boundary.coordinates;

        // GeoJSON coordinates are [lng, lat], Google Maps needs {lat, lng}
        const paths = rings[0].map(([bLng, bLat]: number[]) => ({
          lat: bLat,
          lng: bLng,
        }));

        // Remove old polygon
        if (polygonRef.current) {
          polygonRef.current.setMap(null);
        }

        const polygon = new google.maps.Polygon({
          paths,
          strokeColor: '#C17F4E',
          strokeOpacity: 0.9,
          strokeWeight: 2.5,
          fillColor: '#C17F4E',
          fillOpacity: 0.15,
          map,
        });
        polygonRef.current = polygon;

        // Fit map to boundary
        const bounds = new google.maps.LatLngBounds();
        paths.forEach((p: { lat: number; lng: number }) => bounds.extend(p));
        map.fitBounds(bounds, 40);
      } else if (enableDrawMode) {
        enableDrawing(map);
      }

      setMapLoaded(true);
    } catch (err) {
      console.error('[Map] Init error:', err);
      setMapLoaded(true);
    }
  }, [enableDrawing]);

  // When map div mounts (hasData becomes true), init with pending coords
  useEffect(() => {
    if (hasData && mapRef.current && pendingCoordsRef.current && !mapInstanceRef.current) {
      const { lat: pLat, lng: pLng } = pendingCoordsRef.current;
      const boundary = pendingBoundaryRef.current;
      const shouldDraw = pendingDrawModeRef.current;
      pendingCoordsRef.current = null;
      pendingBoundaryRef.current = null;
      pendingDrawModeRef.current = false;
      initMap(pLat, pLng, boundary, shouldDraw);
    }
  }, [hasData, initMap]);

  /** Search address → geocode → fetch parcel data → display */
  const handleSearch = useCallback(async () => {
    if (isDemoMode || !inputValue.trim()) return;

    setSearching(true);
    setSearchError('');

    try {
      await ensureMapsLoaded();

      // Step 1: Geocode address with Places API
      const PlaceClass = (google.maps.places as Record<string, unknown>).Place as
        Record<string, unknown> & {
          searchByText: (req: {
            textQuery: string;
            fields: string[];
            maxResultCount: number;
          }) => Promise<{ places: Array<Record<string, unknown>> }>;
        };

      const { places } = await PlaceClass.searchByText({
        textQuery: inputValue,
        fields: ['formattedAddress', 'location'],
        maxResultCount: 1,
      });

      if (!places || places.length === 0) {
        setSearchError('No results found. Try a more specific address.');
        return;
      }

      const place = places[0];
      const location = place.location as google.maps.LatLng;
      const formattedAddress = place.formattedAddress as string;

      if (!location || !formattedAddress) {
        setSearchError('Could not find that address.');
        return;
      }

      const newLat = location.lat();
      const newLng = location.lng();

      // Step 2: Fetch parcel data from county GIS
      const parcelRes = await fetch(`/api/parcel?lat=${newLat}&lng=${newLng}`);
      const parcelData: ParcelResponse | { error: string } = await parcelRes.json();

      if (!parcelRes.ok || 'error' in parcelData) {
        // County GIS failed — try RapidAPI Property Lines fallback
        let rapidBoundary: ParcelBoundary | null = null;
        try {
          const rapidRes = await fetch('/api/property-boundary', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ lat: newLat, lng: newLng }),
          });
          if (rapidRes.ok) {
            const rapidData = await rapidRes.json();
            // RapidAPI returns GeoJSON features — extract first polygon
            if (rapidData?.features?.[0]?.geometry) {
              rapidBoundary = rapidData.features[0].geometry as ParcelBoundary;
            } else if (rapidData?.type === 'Polygon' || rapidData?.type === 'MultiPolygon') {
              rapidBoundary = rapidData as ParcelBoundary;
            }
          }
        } catch {
          // RapidAPI also failed — fall through to manual mode
        }

        setAddress(formattedAddress);
        setInputValue(formattedAddress);
        setLat(newLat);
        setLng(newLng);
        setLotSqft(0);
        setLawnSqft(0);
        setBuildingSqft(0);
        setMapLoaded(false);
        mapInstanceRef.current = null;

        if (rapidBoundary) {
          setSearchError('County records unavailable. Boundary from secondary source — verify accuracy.');
          initMap(newLat, newLng, rapidBoundary);
        } else {
          setDrawMode(true);
          setSearchError('');
          initMap(newLat, newLng, null, true);
        }
        return;
      }

      // Step 3: Populate all fields
      setAddress(formattedAddress);
      setInputValue(formattedAddress);
      setLat(newLat);
      setLng(newLng);
      setLotSqft(parcelData.lotSqft);
      setLawnSqft(parcelData.lawnSqft);
      setBuildingSqft(parcelData.buildingSqft);
      setPropertyType(parcelData.propertyType);
      setDrawMode(false);
      setMapLoaded(false);
      mapInstanceRef.current = null;

      // Step 4: Init map with parcel boundary
      initMap(newLat, newLng, parcelData.boundary);
    } catch (err) {
      console.error('[Estimate] Search error:', err);
      setSearchError('Something went wrong. Please try again.');
    } finally {
      setSearching(false);
    }
  }, [inputValue, initMap]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleContinue = () => {
    onContinue({ address, lat, lng, lotSqft, lawnSqft });
  };

  return (
    <div className="max-w-5xl mx-auto">
      <button
        type="button"
        onClick={onBack}
        className="text-copper text-sm font-mono cursor-pointer hover:text-copper-light transition-colors mb-8 inline-block"
      >
        &larr; Back to services
      </button>

      <div>
        <label
          htmlFor="address-input"
          className="block font-mono text-[11px] uppercase tracking-[3px] text-ink/50 mb-3"
        >
          Enter your property address
        </label>
        <div className="flex gap-2">
          <input
            id="address-input"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={!isDemoMode ? handleKeyDown : undefined}
            placeholder="Start typing your address..."
            className="flex-1 p-4 bg-chalk border border-limestone text-ink font-body text-base focus:outline-none focus:border-copper transition-colors"
            readOnly={isDemoMode}
          />
          {!isDemoMode && (
            <button
              type="button"
              onClick={handleSearch}
              disabled={searching || !inputValue.trim()}
              className="btn-copper px-6 py-4 text-sm whitespace-nowrap disabled:opacity-50"
            >
              {searching ? 'Searching...' : 'Find Property'}
            </button>
          )}
        </div>
        <p className="text-ink/40 text-xs font-mono mt-2">
          {isDemoMode
            ? 'Demo Mode — Using sample Salyersville property. Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY for live lookup.'
            : 'Enter an address and press Enter or click Find Property.'}
        </p>
        {searchError && (
          <p className="text-red-600 text-xs font-mono mt-2">{searchError}</p>
        )}
      </div>

      {hasData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mt-8 relative"
        >
          <div className="relative">
            {/* Map container — Google Maps owns this div, no React children */}
            <div
              ref={mapRef}
              className="w-full aspect-[16/9] bg-deep border border-copper/20 overflow-hidden"
            />
            {/* Loading overlay — sibling of map div */}
            {(isDemoMode || !mapLoaded) && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-deep border border-copper/20">
                <span className="font-heading text-2xl text-chalk/30">
                  Satellite View
                </span>
                <span className="font-mono text-[10px] text-copper/50 mt-3">
                  {isDemoMode
                    ? 'Demo Mode \u2014 Add your Google Maps API key for live satellite view'
                    : 'Loading map\u2026'}
                </span>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {hasData && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
          className="mt-6 bg-chalk border border-limestone/50 p-6"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="col-span-2 md:col-span-4">
              <div className="font-mono text-[10px] uppercase tracking-[2px] text-ink/40 mb-1">
                Address
              </div>
              <div className="text-ink text-sm font-body">{address || '\u2014'}</div>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[2px] text-ink/40 mb-1">
                Lot Size
              </div>
              <div className="font-heading text-2xl text-ink">
                {lotSqft > 0 ? `${formatNumber(lotSqft)} sq ft` : '\u2014'}
              </div>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[2px] text-ink/40 mb-1">
                Building Footprint
              </div>
              <div className="font-heading text-2xl text-ink">
                {buildingSqft > 0 ? `${formatNumber(buildingSqft)} sq ft` : '\u2014'}
              </div>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[2px] text-ink/40 mb-1">
                Est. Lawn Area
              </div>
              <div className="font-heading text-2xl text-copper">
                {lawnSqft > 0 ? `${formatNumber(lawnSqft)} sq ft` : '\u2014'}
              </div>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[2px] text-ink/40 mb-1">
                Property Type
              </div>
              <div className="font-heading text-2xl text-ink">{propertyType}</div>
            </div>
          </div>
          {lotSqft > 0 && (
            <p className="text-ink/30 text-[10px] font-mono mt-4">
              Data sourced from county public records. Lawn area estimated from lot size minus building footprint and hardscape.
            </p>
          )}
        </motion.div>
      )}

      {/* Draw mode instructions — shown when boundary data unavailable */}
      {hasData && drawMode && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="mt-6 bg-chalk border border-copper/30 p-4 flex items-center justify-between gap-4"
        >
          <div>
            <p className="text-ink text-sm font-body">
              {lotSqft > 0
                ? `Property outlined — ${formatNumber(lotSqft)} sq ft detected.`
                : 'Click on the map to outline your property boundary. Click each corner, then close the shape.'}
            </p>
            <p className="text-ink/40 text-[10px] font-mono mt-1">
              {lotSqft > 0
                ? 'Drag points to adjust. Lawn area estimated at 70% of drawn area.'
                : 'Property boundary data unavailable for this address. Draw it manually on the satellite view above.'}
            </p>
          </div>
          {lotSqft > 0 && (
            <button
              type="button"
              onClick={handleClearDrawing}
              className="btn-outline px-4 py-2 text-xs whitespace-nowrap"
            >
              Clear &amp; Redraw
            </button>
          )}
        </motion.div>
      )}

      {/* Manual lawn area adjustment */}
      {hasData && lawnSqft > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4"
        >
          <label
            htmlFor="lawn-adjust"
            className="font-mono text-[10px] uppercase tracking-[2px] text-ink/40"
          >
            Adjust Estimated Lawn Area (sq ft)
          </label>
          <input
            id="lawn-adjust"
            type="number"
            min="0"
            max={lotSqft > 0 ? lotSqft : undefined}
            value={lawnSqft}
            onChange={(e) => {
              const v = parseInt(e.target.value, 10);
              if (!isNaN(v) && v >= 0) setLawnSqft(v);
            }}
            className="mt-1 w-48 p-2 bg-chalk border border-limestone text-ink font-body text-sm focus:outline-none focus:border-copper transition-colors"
          />
        </motion.div>
      )}

      <div className="mt-8">
        <button
          type="button"
          onClick={handleContinue}
          disabled={!hasData || (drawMode && lotSqft === 0)}
          className={`w-full btn-copper py-4 text-center text-base ${
            !hasData || (drawMode && lotSqft === 0) ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Continue &mdash; See Your Estimate
        </button>
      </div>
    </div>
  );
}
