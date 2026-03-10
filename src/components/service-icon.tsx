"use client";

import {
  Plant,
  ShieldCheck,
  Warehouse,
  CloudLightning,
  Leaf,
} from "@phosphor-icons/react";
import type { Service } from "@/lib/constants";

const iconMap = {
  plant: Plant,
  shield: ShieldCheck,
  warehouse: Warehouse,
  "cloud-lightning": CloudLightning,
  leaf: Leaf,
} as const;

interface ServiceIconProps {
  icon: Service["icon"];
  size?: number;
  className?: string;
}

export function ServiceIcon({ icon, size = 32, className }: ServiceIconProps) {
  const Icon = iconMap[icon];
  return <Icon size={size} className={className} weight="regular" />;
}
