'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { LAWN_CARE_SERVICES, LANDSCAPING_SERVICES } from '@/lib/services-data';

interface StepServiceSelectionProps {
  selectedCategories: Set<string>;
  onToggleCategory: (category: string) => void;
  selectedLawnServices: Set<string>;
  onToggleLawnService: (id: string) => void;
  selectedLandscapeServices: Set<string>;
  onToggleLandscapeService: (id: string) => void;
  onContinue: () => void;
}

export default function StepServiceSelection({
  selectedCategories,
  onToggleCategory,
  selectedLawnServices,
  onToggleLawnService,
  selectedLandscapeServices,
  onToggleLandscapeService,
  onContinue,
}: StepServiceSelectionProps) {
  const hasAnyServiceSelected =
    selectedLawnServices.size > 0 || selectedLandscapeServices.size > 0;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Headline */}
      <h2 className="font-heading text-3xl md:text-4xl text-ink font-light tracking-tight mb-2">
        What does your property need?
      </h2>
      <p className="text-ink/50 text-sm font-body mb-10">
        Select one or both service categories, then choose specific services.
      </p>

      {/* Category Buttons */}
      <div className="flex gap-4 mb-8">
        <button
          type="button"
          onClick={() => onToggleCategory('lawn')}
          className={`flex-1 py-6 px-6 text-center border-2 transition-all duration-300 cursor-pointer ${
            selectedCategories.has('lawn')
              ? 'border-copper bg-copper/5 text-copper'
              : 'border-limestone bg-chalk text-ink/60'
          }`}
        >
          <div className="font-mono text-[10px] uppercase tracking-[3px] mb-1">
            Category
          </div>
          <div className="font-heading text-2xl font-light">Lawn Care</div>
        </button>

        <button
          type="button"
          onClick={() => onToggleCategory('landscaping')}
          className={`flex-1 py-6 px-6 text-center border-2 transition-all duration-300 cursor-pointer ${
            selectedCategories.has('landscaping')
              ? 'border-copper bg-copper/5 text-copper'
              : 'border-limestone bg-chalk text-ink/60'
          }`}
        >
          <div className="font-mono text-[10px] uppercase tracking-[3px] mb-1">
            Category
          </div>
          <div className="font-heading text-2xl font-light">Landscaping</div>
        </button>
      </div>

      {/* Sub-service Checklists */}
      <AnimatePresence>
        {selectedCategories.has('lawn') && (
          <motion.div
            key="lawn-services"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mb-8"
          >
            <div className="font-mono text-[11px] uppercase tracking-[3px] text-copper mb-4">
              Lawn Care Services
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {LAWN_CARE_SERVICES.map((service) => {
                const isChecked = selectedLawnServices.has(service.id);
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => onToggleLawnService(service.id)}
                    className={`flex items-center gap-3 p-4 border cursor-pointer transition-all text-left ${
                      isChecked
                        ? 'border-copper/50 bg-copper/5 hover:border-copper/30'
                        : 'border-limestone/50 bg-chalk hover:border-copper/30'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 border-2 flex items-center justify-center shrink-0 transition-colors ${
                        isChecked
                          ? 'border-copper bg-copper'
                          : 'border-limestone'
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-3 h-3 text-white"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2 6L5 9L10 3"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                    <span className="text-sm text-ink/80 font-body">
                      {service.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedCategories.has('landscaping') && (
          <motion.div
            key="landscaping-services"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mb-8"
          >
            <div className="font-mono text-[11px] uppercase tracking-[3px] text-copper mb-4">
              Landscaping Services
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {LANDSCAPING_SERVICES.map((service) => {
                const isChecked = selectedLandscapeServices.has(service.id);
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => onToggleLandscapeService(service.id)}
                    className={`flex items-center gap-3 p-4 border cursor-pointer transition-all text-left ${
                      isChecked
                        ? 'border-copper/50 bg-copper/5 hover:border-copper/30'
                        : 'border-limestone/50 bg-chalk hover:border-copper/30'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 border-2 flex items-center justify-center shrink-0 transition-colors ${
                        isChecked
                          ? 'border-copper bg-copper'
                          : 'border-limestone'
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-3 h-3 text-white"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2 6L5 9L10 3"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                    <span className="text-sm text-ink/80 font-body">
                      {service.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Continue Button */}
      <div className="mt-10">
        <button
          type="button"
          onClick={onContinue}
          disabled={!hasAnyServiceSelected}
          className={`w-full btn-copper py-4 text-center text-base ${
            !hasAnyServiceSelected ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Continue &mdash; View Your Property
        </button>
      </div>
    </div>
  );
}
