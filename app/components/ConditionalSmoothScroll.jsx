
"use client";

import { usePathname } from "next/navigation";
import SmoothScroll from "./SmoothScroll";

export default function ConditionalSmoothScroll() {
  const pathname = usePathname();

  // No activar Lenis dentro de Keystatic
  if (pathname?.startsWith("/keystatic")) {
    return null;
  }

  return <SmoothScroll />;
}
