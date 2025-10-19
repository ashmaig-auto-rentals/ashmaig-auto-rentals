"use client";

import dynamic from "next/dynamic";

// ✅ Dynamically import Header client-side only
const Header = dynamic(() => import("./Header"), { ssr: false });

export default function HeaderClientWrapper() {
  return <Header />;
}