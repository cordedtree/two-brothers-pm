import { NextRequest, NextResponse } from 'next/server';
import { fetchParcelData } from '@/lib/parcel';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const lat = parseFloat(searchParams.get('lat') || '');
  const lng = parseFloat(searchParams.get('lng') || '');

  if (isNaN(lat) || isNaN(lng) || lat < 34 || lat > 38 || lng < -97 || lng > -94) {
    return NextResponse.json(
      { error: 'Invalid coordinates or outside service area' },
      { status: 400 },
    );
  }

  try {
    const parcel = await fetchParcelData(lat, lng);

    if (!parcel) {
      return NextResponse.json(
        { error: 'No parcel found at this location. Property may be outside our service area.' },
        { status: 404 },
      );
    }

    return NextResponse.json(parcel);
  } catch (err) {
    console.error('Parcel API error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch property data. Please try again.' },
      { status: 500 },
    );
  }
}
