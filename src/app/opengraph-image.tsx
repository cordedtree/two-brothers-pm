import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#080C0A',
        }}
      >
        <div
          style={{
            fontSize: 56,
            fontFamily: 'serif',
            color: '#F8F5F0',
            letterSpacing: '-1px',
            marginBottom: 16,
          }}
        >
          Two Brother&apos;s Property Management
        </div>
        <div
          style={{
            fontSize: 24,
            fontFamily: 'sans-serif',
            color: '#DAD0C2',
            letterSpacing: '4px',
            textTransform: 'uppercase',
          }}
        >
          Eastern Kentucky
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
