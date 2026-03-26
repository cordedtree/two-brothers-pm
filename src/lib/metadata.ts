import type { Metadata } from "next";
import { BUSINESS } from "./constants";

const SITE_URL = "https://twobrotherspm.com";

/** Build page metadata with consistent defaults and canonical URLs */
export function buildMetadata(options: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = options.path ? `${SITE_URL}${options.path}` : SITE_URL;
  return {
    title: options.title,
    description: options.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${options.title} | ${BUSINESS.name}`,
      description: options.description,
      type: "website",
      locale: "en_US",
      url,
      images: [
        {
          url: `${SITE_URL}/images/og-image.jpg`,
          width: 1024,
          height: 576,
          alt: `${BUSINESS.name} - ${BUSINESS.tagline}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${options.title} | ${BUSINESS.name}`,
      description: options.description,
      images: [`${SITE_URL}/images/og-image.jpg`],
    },
  };
}
