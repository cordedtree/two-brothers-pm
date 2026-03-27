'use client';

const STEPS = [
  { number: 1, label: 'Services' },
  { number: 2, label: 'Property' },
  { number: 3, label: 'Estimate' },
];

interface ProgressIndicatorProps {
  currentStep: number;
}

export function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-2 mb-12">
      {STEPS.map((step, i) => (
        <div key={step.number} className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 flex items-center justify-center font-mono text-xs transition-all duration-300 ${
                currentStep >= step.number
                  ? 'bg-copper text-chalk'
                  : 'bg-limestone/30 text-ink/30'
              }`}
            >
              {currentStep > step.number ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                step.number
              )}
            </div>
            <span
              className={`font-mono text-[10px] uppercase tracking-[2px] transition-colors duration-300 ${
                currentStep >= step.number ? 'text-copper' : 'text-ink/30'
              }`}
            >
              {step.label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={`w-12 h-[1px] transition-colors duration-300 ${
                currentStep > step.number ? 'bg-copper' : 'bg-limestone/30'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
