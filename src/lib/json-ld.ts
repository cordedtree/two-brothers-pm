import { BUSINESS, SERVICES, SERVICE_AREA } from "./constants";

const SITE_URL = "https://twobrotherspm.com";

/** LocalBusiness JSON-LD structured data for search engines */
export function getLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#business`,
    name: BUSINESS.name,
    description: `Reliable lawn care and property management in ${BUSINESS.location} and surrounding counties. Mowing, weed control, storm cleanup, and more.`,
    url: SITE_URL,
    telephone: BUSINESS.phone1,
    image: `${SITE_URL}/images/og-image.jpg`,
    logo: `${SITE_URL}/favicon.svg`,
    foundingDate: String(BUSINESS.founded),
    slogan: BUSINESS.tagline,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Salyersville",
      addressRegion: "KY",
      addressCountry: "US",
    },
    areaServed: SERVICE_AREA.map((county) => ({
      "@type": "AdministrativeArea",
      name: `${county}, Kentucky`,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Property Management Services",
      itemListElement: SERVICES.map((service, i) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.shortDescription,
        },
        position: i + 1,
      })),
    },
    priceRange: "$$",
    paymentAccepted: "Cash, Check",
    knowsLanguage: "en",
  };
}
