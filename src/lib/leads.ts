export interface EstimateLead {
  id: string;
  address: string;
  lat: number;
  lng: number;
  lot_sqft: number | null;
  lawn_sqft: number | null;
  services_selected: string[];
  estimated_total: number | null;
  estimated_range: { min: number; max: number } | null;
  customer_name: string | null;
  customer_email: string | null;
  customer_phone: string | null;
  created_at: string;
  status: 'new' | 'contacted' | 'quoted' | 'won' | 'lost';
}

function generateId(): string {
  return `lead_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

export function saveLead(lead: Omit<EstimateLead, 'id' | 'created_at' | 'status'>): EstimateLead {
  const fullLead: EstimateLead = {
    ...lead,
    id: generateId(),
    created_at: new Date().toISOString(),
    status: 'new',
  };

  // Save to localStorage for MVP
  const existing = getLeads();
  existing.push(fullLead);
  if (typeof window !== 'undefined') {
    localStorage.setItem('twobrothers_leads', JSON.stringify(existing));
  }

  return fullLead;
}

export function updateLead(id: string, updates: Partial<EstimateLead>): EstimateLead | null {
  const leads = getLeads();
  const idx = leads.findIndex((l) => l.id === id);
  if (idx === -1) return null;

  leads[idx] = { ...leads[idx], ...updates };
  if (typeof window !== 'undefined') {
    localStorage.setItem('twobrothers_leads', JSON.stringify(leads));
  }
  return leads[idx];
}

export function getLeads(): EstimateLead[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem('twobrothers_leads');
  return data ? JSON.parse(data) : [];
}

export function exportLeadsCSV(): string {
  const leads = getLeads();
  if (leads.length === 0) return '';

  const headers = [
    'ID', 'Date', 'Address', 'Lat', 'Lng', 'Lot SqFt', 'Lawn SqFt',
    'Services', 'Est. Total', 'Est. Range', 'Name', 'Email', 'Phone', 'Status'
  ];

  const rows = leads.map(l => [
    l.id,
    l.created_at,
    `"${l.address}"`,
    l.lat,
    l.lng,
    l.lot_sqft ?? '',
    l.lawn_sqft ?? '',
    `"${l.services_selected.join(', ')}"`,
    l.estimated_total ?? '',
    l.estimated_range ? `$${l.estimated_range.min}-$${l.estimated_range.max}` : '',
    l.customer_name ?? '',
    l.customer_email ?? '',
    l.customer_phone ?? '',
    l.status,
  ]);

  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
}
