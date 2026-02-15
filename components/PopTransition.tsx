"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PopTransition() {
  const router = useRouter();

  useEffect(() => {
    const handler = (e: PopStateEvent) => {
      if (!document.startViewTransition) return;

      e.stopImmediatePropagation();

      document.startViewTransition(() => {
        router.replace(window.location.href);
      });
    };

    window.addEventListener("popstate", handler, { capture: true });
    return () => window.removeEventListener("popstate", handler, { capture: true });
  }, [router]);

  return null;
}
