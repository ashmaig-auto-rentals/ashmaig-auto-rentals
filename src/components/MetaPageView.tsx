"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    fbq: (...args: any[]) => void;
  }
}

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(
    new RegExp("(^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)")
  );
  return match ? decodeURIComponent(match[2]) : undefined;
}

export default function MetaPageView() {
  useEffect(() => {
    // Unique event_id for deduplication
    const eventId =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `ashmaig-${Date.now()}-${Math.random().toString(36).slice(2)}`;

    const fbp = getCookie("_fbp");
    const fbc = getCookie("_fbc");

    // 1) Browser pixel PageView with eventID
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", "PageView", {}, { eventID: eventId });
    }

    // 2) Matching server-side PageView via Conversions API
    fetch("/api/meta/pageview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_id: eventId,
        fbp,
        fbc,
      }),
    }).catch((err) => {
      console.error("Meta CAPI PageView error:", err);
    });
  }, []);

  return null; // no UI
}