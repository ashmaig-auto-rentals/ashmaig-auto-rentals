import fs from "fs";
import path from "path";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("./Header"), { ssr: false });

export default function HeaderServerWrapper() {
  // Path to /src/app/locations
  const locationsPath = path.join(process.cwd(), "src/app/locations");

  // Get all folders inside /locations
  let cities: string[] = [];

  try {
    cities = fs
      .readdirSync(locationsPath)
      .filter((name) =>
        fs.statSync(path.join(locationsPath, name)).isDirectory()
      );
  } catch (err) {
    console.error("Error reading locations folder:", err);
  }

  return <Header cities={cities} />;
}