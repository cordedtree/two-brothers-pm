import { buildMetadata } from "@/lib/metadata";
import { ContactContent } from "./contact-content";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Call or text Two Brother's Property Management for a free estimate. 606-362-4834 or 606-791-7383. Salyersville, KY.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactContent />;
}
