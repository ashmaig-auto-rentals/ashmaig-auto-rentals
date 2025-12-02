// src/components/HeaderClientWrapper.tsx
import fs from "fs";
import path from "path";
import Header from "./Header";

// NOTE: This is a SERVER component (no "use client" here)
export default function HeaderClientWrapper() {
  // Path to src/app/locations
  const locationsDir = path.join(process.cwd(), "src", "app", "locations");

  let cities: string[] = [];

  try {
    if (fs.existsSync(locationsDir)) {
      cities = fs
        .readdirSync(locationsDir)
        .filter((name) => {
          const fullPath = path.join(locationsDir, name);
          return fs.statSync(fullPath).isDirectory();
        })
        .sort((a, b) => a.localeCompare(b)); // alphabetical
    } else {
      console.error("❌ locationsDir not found:", locationsDir);
    }
  } catch (err) {
    console.error("❌ Error reading locations folder:", err);
  }

  console.log("✅ Locations passed to Header:", cities);

  return <Header cities={cities} />;
}