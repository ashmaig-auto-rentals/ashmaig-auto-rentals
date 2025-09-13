"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [fleetOpen, setFleetOpen] = useState(false);
  const [sedansOpen, setSedansOpen] = useState(false);
  const [suvsOpen, setSuvsOpen] = useState(false);
  const [threeRowOpen, setThreeRowOpen] = useState(false);

  // timer refs
  const fleetTimer = useRef<NodeJS.Timeout | null>(null);

  const handleFleetEnter = () => {
    if (fleetTimer.current) clearTimeout(fleetTimer.current);
    setFleetOpen(true);
  };

  const handleFleetLeave = () => {
    fleetTimer.current = setTimeout(() => {
      setFleetOpen(false);
      setSedansOpen(false);
      setSuvsOpen(false);
      setThreeRowOpen(false);
    }, 250);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-gray-900">
            Ashmaig Auto Rentals
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 relative">
            <Link href="/about" className="font-medium text-gray-700 hover:text-blue-600">
              About Us
            </Link>

            {/* Fleet Dropdown with delay */}
            <div
              className="relative"
              onMouseEnter={handleFleetEnter}
              onMouseLeave={handleFleetLeave}
            >
              <button className="flex items-center font-medium text-gray-700 hover:text-blue-600">
                Fleet <ChevronDown className="ml-1 h-4 w-4" />
              </button>

              {fleetOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-white border rounded-md shadow-lg z-50 pb-2">
                  {/* Sedans */}
                  <div
                    className="relative"
                    onMouseEnter={() => {
                      setSedansOpen(true);
                      setSuvsOpen(false);
                      setThreeRowOpen(false);
                    }}
                    onMouseLeave={() => setSedansOpen(false)}
                  >
                    <Link
                      href="/sedans"
                      className="flex justify-between items-center px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Sedans <ChevronRight className="h-4 w-4" />
                    </Link>
                    {sedansOpen && (
                      <div className="absolute left-full top-0 w-56 bg-white border rounded-md shadow-lg">
                        <Link href="/vehicles/camry-2020" className="block px-4 py-2 hover:bg-gray-100">
                          2020 Toyota Camry
                        </Link>
                        <Link href="/vehicles/hyundai-sonata-2017" className="block px-4 py-2 hover:bg-gray-100">
                          2017 Hyundai Sonata
                        </Link>
                        <Link href="/vehicles/ford-fusion-2014" className="block px-4 py-2 hover:bg-gray-100">
                          2014 Ford Fusion
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* SUVs */}
                  <div
                    className="relative"
                    onMouseEnter={() => {
                      setSuvsOpen(true);
                      setSedansOpen(false);
                      setThreeRowOpen(false);
                    }}
                    onMouseLeave={() => setSuvsOpen(false)}
                  >
                    <Link
                      href="/suvs"
                      className="flex justify-between items-center px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      SUVs <ChevronRight className="h-4 w-4" />
                    </Link>
                    {suvsOpen && (
                      <div className="absolute left-full top-0 w-56 bg-white border rounded-md shadow-lg">
                        <Link href="/vehicles/toyota-rav4-2017" className="block px-4 py-2 hover:bg-gray-100">
                          2017 Toyota RAV4
                        </Link>
                        <Link href="/vehicles/honda-crv-2017" className="block px-4 py-2 hover:bg-gray-100">
                          2017 Honda CR-V
                        </Link>
                        <Link href="/vehicles/hyundai-santa-fe-2019" className="block px-4 py-2 hover:bg-gray-100">
                          2019 Hyundai Santa Fe
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* 3-Row SUVs */}
                  <div
                    className="relative"
                    onMouseEnter={() => {
                      setThreeRowOpen(true);
                      setSedansOpen(false);
                      setSuvsOpen(false);
                    }}
                    onMouseLeave={() => setThreeRowOpen(false)}
                  >
                    <Link
                      href="/3row-suvs"
                      className="flex justify-between items-center px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      3-Row SUVs <ChevronRight className="h-4 w-4" />
                    </Link>
                    {threeRowOpen && (
                      <div className="absolute left-full top-0 w-56 bg-white border rounded-md shadow-lg">
                        <Link href="/vehicles/chevy-suburban-2019" className="block px-4 py-2 hover:bg-gray-100">
                          2019 Chevy Suburban
                        </Link>
                        <Link href="/vehicles/toyota-sienna-2020" className="block px-4 py-2 hover:bg-gray-100">
                          2020 Toyota Sienna
                        </Link>
                        <Link href="/vehicles/chrysler-pacifica-2022" className="block px-4 py-2 hover:bg-gray-100">
                          2022 Chrysler Pacifica
                        </Link>
                      </div>
                    )}
                  </div>

                  <Link href="/fleet" className="block px-4 py-2 text-sm hover:bg-gray-100 mt-2">
                    Entire Fleet
                  </Link>
                </div>
              )}
            </div>

            <Link href="/rental-agreement" className="font-medium text-gray-700 hover:text-blue-600">
              Rental Agreement
            </Link>
            <Link href="/contact" className="font-medium text-gray-700 hover:text-blue-600">
              Contact Us
            </Link>
          </nav>

          <a
            href="tel:6237772376"
            className="hidden md:inline-block bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700"
          >
            📞 Call Us
          </a>

          <button
            className="md:hidden text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
    </header>
  );
}