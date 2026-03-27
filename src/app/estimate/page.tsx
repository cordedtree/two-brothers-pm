'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProgressIndicator } from '@/components/estimate/ProgressIndicator';
import StepServiceSelection from '@/components/estimate/StepServiceSelection';
import StepPropertyView from '@/components/estimate/StepPropertyView';
import StepEstimateResults from '@/components/estimate/StepEstimateResults';

interface PropertyData {
  address: string;
  lat: number;
  lng: number;
  lotSqft: number;
  lawnSqft: number;
}

export default function EstimatePage() {
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1 state
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [selectedLawnServices, setSelectedLawnServices] = useState<Set<string>>(new Set());
  const [selectedLandscapeServices, setSelectedLandscapeServices] = useState<Set<string>>(new Set());

  // Step 2 state
  const [propertyData, setPropertyData] = useState<PropertyData | null>(null);

  const handleToggleCategory = useCallback((category: string) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  }, []);

  const handleToggleLawnService = useCallback((id: string) => {
    setSelectedLawnServices((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const handleToggleLandscapeService = useCallback((id: string) => {
    setSelectedLandscapeServices((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const handleStep1Continue = useCallback(() => {
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleStep2Continue = useCallback((data: PropertyData) => {
    setPropertyData(data);
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBack = useCallback((step: number) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-chalk pt-28 pb-32 md:pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Page Header */}
        <div className="text-center mb-4">
          <span className="eyebrow">Free Instant Estimate</span>
        </div>

        <ProgressIndicator currentStep={currentStep} />

        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <StepServiceSelection
                selectedCategories={selectedCategories}
                onToggleCategory={handleToggleCategory}
                selectedLawnServices={selectedLawnServices}
                onToggleLawnService={handleToggleLawnService}
                selectedLandscapeServices={selectedLandscapeServices}
                onToggleLandscapeService={handleToggleLandscapeService}
                onContinue={handleStep1Continue}
              />
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <StepPropertyView
                onContinue={handleStep2Continue}
                onBack={() => handleBack(1)}
              />
            </motion.div>
          )}

          {currentStep === 3 && propertyData && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <StepEstimateResults
                propertyData={propertyData}
                selectedLawnServices={selectedLawnServices}
                selectedLandscapeServices={selectedLandscapeServices}
                onBack={() => handleBack(2)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
