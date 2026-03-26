import { buildMetadata } from "@/lib/metadata";
import { AboutContent } from "./about-content";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Two brothers from Salyersville, KY providing reliable lawn care and property management. Locally owned, no-hassle service since 2025.",
  path: "/about",
});

export default function AboutPage() {
  return <AboutContent />;
}
