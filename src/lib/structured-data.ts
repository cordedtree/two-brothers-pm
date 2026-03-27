import { BUSINESS } from './constants';
import { TESTIMONIALS } from './services-data';

export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://twobrotherspm.com',
    name: BUSINESS.name,
    description: `Professional lawn care and property management in ${BUSINESS.serviceArea}. ${BUSINESS.tagline}.`,
    url: 'https://twobrotherspm.com',
    telephone: BUSINESS.phone1,
    areaServed: BUSINESS.cities.map((city) => ({
      '@type': 'AdministrativeArea',
      name: `${city}, Kentucky`,
    })),
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Salyersville',
      addressRegion: 'KY',
      addressCountry: 'US',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '07:00',
      closes: '20:00',
    },
    sameAs: [
      BUSINESS.social.facebook,
    ],
    priceRange: '$$',
  };
}

export function getServiceSchema(name: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'LocalBusiness',
      name: BUSINESS.name,
      telephone: BUSINESS.phone1,
    },
    areaServed: {
      '@type': 'State',
      name: 'Kentucky',
    },
  };
}

export function getReviewSchemas() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: BUSINESS.name,
    review: TESTIMONIALS.map((t) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: t.name,
      },
      reviewBody: t.text,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
      },
    })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: TESTIMONIALS.length.toString(),
    },
  };
}
