import { buildMetadata } from "@/lib/metadata";
import { ServiceAreaContent } from "./service-area-content";

export const metadata = buildMetadata({
  title: "Service Area",
  description:
    "Serving Magoffin, Floyd, Johnson, Morgan, and Breathitt counties in Eastern Kentucky. Based in Salyersville, KY. Call for a free estimate.",
  path: "/service-area",
});

export default function ServiceAreaPage() {
  return <ServiceAreaContent />;
}
