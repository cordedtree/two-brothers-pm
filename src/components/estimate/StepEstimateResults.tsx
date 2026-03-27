'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { setOptions, importLibrary } from '@googlemaps/js-api-loader';
import {
  calculateLawnEstimate,
  calculateLandscapeEstimate,
  FREQUENCY_LABELS,
  type LawnServiceKey,
  type LandscapeServiceKey,
} from '@/lib/pricing';
import { BUSINESS } from '@/lib/constants';
import { saveLead, updateLead } from '@/lib/leads';

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const isDemoMode = !API_KEY;

let mapsInitialized = false;

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
}

interface StepEstimateResultsProps {
  propertyData: {
    address: string;
    lat: number;
    lng: number;
    lotSqft: number;
    lawnSqft: number;
  };
  selectedLawnServices: Set<string>;
  selectedLandscapeServices: Set<string>;
  onBack: () => void;
}

// Map selection-step IDs to pricing keys
const LAWN_KEY_MAP: Record<string, LawnServiceKey> = {
  mowing: 'mowing_biweekly',
  fertilization: 'fertilization',
  aeration: 'aeration',
  mulching: 'mulching',
  leaf_removal: 'leaf_removal',
  snow_removal: 'snow_removal',
};

const LANDSCAPE_KEY_MAP: Record<string, LandscapeServiceKey> = {
  flowerbed: 'flowerbed_design',
  landscape_design: 'landscape_design',
  tree_trimming: 'tree_trimming',
  sod: 'sod_installation',
  holiday_lighting: 'holiday_lighting',
  debris_removal: 'debris_removal',
};

function formatNumber(n: number): string {
  return n.toLocaleString('en-US');
}

export default function StepEstimateResults({
  propertyData,
  selectedLawnServices,
  selectedLandscapeServices,
  onBack,
}: StepEstimateResultsProps) {
  const leadSavedRef = useRef(false);
  const leadIdRef = useRef<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInitRef = useRef(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  // Initialize satellite map
  const initMiniMap = useCallback(async () => {
    if (isDemoMode || !mapRef.current || mapInitRef.current) return;
    mapInitRef.current = true;
    try {
      await ensureMapsLoaded();
      new google.maps.Map(mapRef.current, {
        center: { lat: propertyData.lat, lng: propertyData.lng },
        zoom: 19,
        mapTypeId: 'satellite',
        disableDefaultUI: true,
        zoomControl: false,
        mapTypeControl: false,
        gestureHandling: 'none',
      });
      setMapLoaded(true);
    } catch (err) {
      console.error('[MiniMap] Init error:', err);
      setMapLoaded(true);
    }
  }, [propertyData.lat, propertyData.lng]);

  useEffect(() => {
    initMiniMap();
  }, [initMiniMap]);

  // Map selection IDs to pricing keys
  const lawnKeys: LawnServiceKey[] = Array.from(selectedLawnServices)
    .map((id) => LAWN_KEY_MAP[id])
    .filter(Boolean);

  const landscapeKeys: LandscapeServiceKey[] = Array.from(selectedLandscapeServices)
    .map((id) => LANDSCAPE_KEY_MAP[id])
    .filter(Boolean);

  // Calculate estimates
  const lawnEstimates = lawnKeys.length > 0
    ? calculateLawnEstimate(lawnKeys, propertyData.lawnSqft)
    : [];

  const landscapeEstimates = landscapeKeys.length > 0
    ? calculateLandscapeEstimate(landscapeKeys)
    : [];

  const lawnSubtotal = lawnEstimates.reduce((sum, item) => sum + item.total, 0);
  const landscapeRangeMin = landscapeEstimates.reduce((sum, item) => sum + item.min, 0);
  const landscapeRangeMax = landscapeEstimates.reduce((sum, item) => sum + item.max, 0);

  // Save lead on mount (once)
  useEffect(() => {
    if (leadSavedRef.current) return;
    leadSavedRef.current = true;

    const allServices = [
      ...Array.from(selectedLawnServices),
      ...Array.from(selectedLandscapeServices),
    ];

    const lead = saveLead({
      address: propertyData.address,
      lat: propertyData.lat,
      lng: propertyData.lng,
      lot_sqft: propertyData.lotSqft,
      lawn_sqft: propertyData.lawnSqft,
      services_selected: allServices,
      estimated_total: lawnSubtotal > 0 ? lawnSubtotal : null,
      estimated_range:
        landscapeRangeMin > 0
          ? { min: landscapeRangeMin, max: landscapeRangeMax }
          : null,
      customer_name: null,
      customer_email: null,
      customer_phone: null,
    });
    leadIdRef.current = lead.id;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="max-w-5xl mx-auto">
      {/* Back Button */}
      <button
        type="button"
        onClick={onBack}
        className="text-copper text-sm font-mono cursor-pointer hover:text-copper-light transition-colors mb-8 inline-block"
      >
        &larr; Back to property
      </button>

      {/* Split Layout */}
      <div className="grid lg:grid-cols-5 gap-8">
        {/* Left Column — Mini Map + Property Info */}
        <div className="lg:col-span-2">
          {/* Mini Map */}
          <div className="aspect-[4/3] bg-deep border border-copper/20 relative overflow-hidden">
            <div ref={mapRef} className="absolute inset-0" />
            {(isDemoMode || !mapLoaded) && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-deep">
                <span className="font-heading text-2xl text-chalk/30">
                  Satellite View
                </span>
                <span className="font-mono text-[10px] text-copper/50 mt-3">
                  {isDemoMode
                    ? 'Demo Mode \u2014 satellite view available with API key'
                    : 'Loading map\u2026'}
                </span>
              </div>
            )}
          </div>

          {/* Property Summary */}
          <div className="mt-4 space-y-3">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[2px] text-ink/40">
                Address
              </div>
              <div className="text-ink text-sm font-body mt-1">
                {propertyData.address}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[2px] text-ink/40">
                  Lot Size
                </div>
                <div className="font-heading text-lg text-ink mt-1">
                  {formatNumber(propertyData.lotSqft)} sq ft
                </div>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[2px] text-ink/40">
                  Lawn Area
                </div>
                <div className="font-heading text-lg text-ink mt-1">
                  {formatNumber(propertyData.lawnSqft)} sq ft
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column — Estimate Breakdown */}
        <div className="lg:col-span-3">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="bg-chalk border border-limestone/50 p-6 lg:p-8"
          >
            {/* Lawn Care Services */}
            {lawnEstimates.length > 0 && (
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[3px] text-copper mb-4">
                  Lawn Care Services
                </div>

                {lawnEstimates.map((item) => (
                  <div
                    key={item.key}
                    className="border-b border-limestone/30 py-4 last:border-0 flex items-start justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <div className="text-ink text-sm font-body font-medium">
                        {item.label}
                      </div>
                      <div className="text-ink/40 text-xs font-mono mt-1">
                        {formatNumber(item.sqft)} sq ft &times; ${item.rate}/sqft
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-heading text-xl text-ink">
                        ${item.total.toFixed(2)}
                      </span>
                      <span className="text-ink/50 text-xs font-mono ml-1">
                        {FREQUENCY_LABELS[item.frequency]}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Lawn Subtotal */}
                <div className="border-t border-copper/30 pt-4 mt-2 flex items-center justify-between">
                  <span className="text-ink text-sm font-body font-medium">
                    Lawn Care Subtotal
                  </span>
                  <span className="font-heading text-xl text-copper">
                    ${lawnSubtotal.toFixed(2)}
                  </span>
                </div>
              </div>
            )}

            {/* Landscaping Services */}
            {landscapeEstimates.length > 0 && (
              <div className={lawnEstimates.length > 0 ? 'mt-8' : ''}>
                <div className="font-mono text-[11px] uppercase tracking-[3px] text-copper mb-4">
                  Landscaping Services
                </div>

                {landscapeEstimates.map((item) => (
                  <div
                    key={item.key}
                    className="border-b border-limestone/30 py-4 last:border-0"
                  >
                    <div className="text-ink text-sm font-body font-medium">
                      {item.label}
                    </div>
                    <div className="font-heading text-lg text-ink mt-1">
                      ${formatNumber(item.min)} &ndash; ${formatNumber(item.max)}
                    </div>
                    <div className="text-ink/40 text-xs font-mono mt-1">
                      Exact pricing requires on-site consultation
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Disclaimer */}
            <div className="mt-6 p-4 bg-paper border border-limestone/30">
              <p className="text-ink/50 text-xs font-body leading-relaxed">
                This estimate is based on property data and typical pricing for
                your area. Final pricing confirmed after on-site assessment. No
                obligation.
              </p>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href="/contact"
              className="btn-copper py-3 text-center text-sm"
            >
              Schedule Free Consultation
            </Link>

            <a
              href={`tel:+1${BUSINESS.phone1Raw}`}
              className="btn-outline py-3 text-center text-sm"
            >
              Call {BUSINESS.phone1}
            </a>

            <a
              href={`sms:+1${BUSINESS.phone1Raw}`}
              className="btn-outline py-3 text-center text-sm"
            >
              Text Us
            </a>

            <button
              type="button"
              onClick={() => setShowEmailModal(true)}
              className="btn-outline py-3 text-center text-sm cursor-pointer"
            >
              {emailSent ? 'Email Saved ✓' : 'Email This Estimate'}
            </button>
          </div>
        </div>
      </div>

      {/* Email Estimate Modal */}
      <AnimatePresence>
        {showEmailModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-deep/60 backdrop-blur-sm p-4"
            onClick={() => setShowEmailModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.2 }}
              className="bg-chalk border border-limestone/50 p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {!emailSent ? (
                <>
                  <h3 className="font-heading text-xl text-ink mb-2">
                    Email This Estimate
                  </h3>
                  <p className="text-ink/50 text-sm font-body mb-6">
                    We&apos;ll save your email so we can follow up with your detailed estimate.
                  </p>
                  <label
                    htmlFor="email-capture"
                    className="block font-mono text-[10px] uppercase tracking-[2px] text-ink/40 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    id="email-capture"
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (emailInput.includes('@')) {
                          if (leadIdRef.current) {
                            updateLead(leadIdRef.current, { customer_email: emailInput });
                          }
                          setEmailSent(true);
                        }
                      }
                    }}
                    placeholder="your@email.com"
                    className="w-full p-3 bg-paper border border-limestone text-ink font-body text-base focus:outline-none focus:border-copper transition-colors"
                    autoFocus
                  />
                  <div className="flex gap-3 mt-6">
                    <button
                      type="button"
                      onClick={() => {
                        if (emailInput.includes('@') && leadIdRef.current) {
                          updateLead(leadIdRef.current, { customer_email: emailInput });
                          setEmailSent(true);
                        }
                      }}
                      disabled={!emailInput.includes('@')}
                      className="flex-1 btn-copper py-3 text-sm text-center disabled:opacity-50"
                    >
                      Send Estimate
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowEmailModal(false)}
                      className="btn-outline py-3 px-6 text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-4">
                  <div className="font-heading text-2xl text-copper mb-2">
                    Estimate Saved
                  </div>
                  <p className="text-ink/50 text-sm font-body mb-6">
                    We&apos;ve saved your estimate to <span className="text-ink font-medium">{emailInput}</span>.
                    A member of our team will follow up shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowEmailModal(false)}
                    className="btn-copper py-3 px-8 text-sm"
                  >
                    Done
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
