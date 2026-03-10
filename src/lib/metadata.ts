import type { Metadata } from "next";
import { BUSINESS } from "./constants";

/** Build page metadata with consistent defaults */
export function buildMetadata(options: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const fullTitle = `${options.title} | ${BUSINESS.name}`;
  return {
    title: fullTitle,
    description: options.description,
    openGraph: {
      title: fullTitle,
      description: options.description,
      type: "website",
      locale: "en_US",
    },
  };
}
