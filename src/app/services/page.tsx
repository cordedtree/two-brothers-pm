import { buildMetadata } from "@/lib/metadata";
import { ServicesContent } from "./services-content";

export const metadata = buildMetadata({
  title: "Services",
  description:
    "Lawn mowing, weed control, storm cleanup, storage clean-outs, and seasonal property care in Salyersville, KY and surrounding counties. No contracts, free estimates.",
  path: "/services",
});

export default function ServicesPage() {
  return <ServicesContent />;
}
