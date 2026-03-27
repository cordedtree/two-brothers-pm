import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { lat, lng } = body;

  if (typeof lat !== 'number' || typeof lng !== 'number') {
    return NextResponse.json(
      { error: 'lat and lng are required as numbers' },
      { status: 400 },
    );
  }

  const apiKey = process.env.RAPIDAPI_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Property boundary service not configured' },
      { status: 503 },
    );
  }

  try {
    const coords = `${lat}, ${lng}`;
    const url = `https://property-lines.p.rapidapi.com/get_single_us_boundary?coords=${encodeURIComponent(coords)}&lat=${encodeURIComponent(lat + ',')}&lon=${lng}`;

    const res = await fetch(url, {
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'property-lines.p.rapidapi.com',
      },
    });

    if (!res.ok) {
      console.error('[PropertyBoundary] RapidAPI error:', res.status, await res.text());
      return NextResponse.json(
        { error: 'Property boundary lookup failed' },
        { status: 502 },
      );
    }

    const data = await res.json();

    // API returns { error: { ... } } when no data for the area
    if (data.error) {
      return NextResponse.json(
        { error: data.error.detail || 'No boundary data available for this location' },
        { status: 404 },
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error('[PropertyBoundary] Fetch error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch property boundary' },
      { status: 500 },
    );
  }
}
