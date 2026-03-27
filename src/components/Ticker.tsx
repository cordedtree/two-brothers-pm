const TRUST_ITEMS = [
  'Locally Owned',
  'Salyersville, KY',
  '7 Days a Week',
  'Free Estimates',
  'Eastern Kentucky',
  'No Contracts',
  'Your Yard. Our Word.',
];

export function Ticker() {
  const content = TRUST_ITEMS.join(' \u2014 ');
  const doubled = `${content} \u2014 ${content} \u2014 `;

  return (
    <div className="w-full bg-copper py-3 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap">
        <span className="font-mono text-[11px] uppercase tracking-[3px] text-void/80">
          {doubled}
        </span>
      </div>
    </div>
  );
}
