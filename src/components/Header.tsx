"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-gray-900">
            Ashmaig Auto Rentals
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 relative">
            <Link
              href="/about"
              className="font-medium text-gray-700 hover:text-blue-600"
            >
              About Us
            </Link>

            {/* Fleet Dropdown */}
            <div className="relative group">
              <button className="font-medium text-gray-700 hover:text-blue-600">
                Fleet
              </button>
              <div className="absolute top-full left-0 hidden group-hover:block bg-white shadow-lg border rounded-md w-56">
                <Link
                  href="/sedans"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Sedans
                </Link>
                <Link
                  href="/suvs"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  SUVs
                </Link>
                <Link
                  href="/3row-suvs"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  3-Row SUVs & Vans
                </Link>
              </div>
            </div>

            <Link
              href="/rental-agreement"
              className="font-medium text-gray-700 hover:text-blue-600"
            >
              Rental Agreement
            </Link>
            <Link
              href="/contact"
              className="font-medium text-gray-700 hover:text-blue-600"
            >
              Contact Us
            </Link>
          </nav>

          {/* Call Us Button */}
          <a
            href="tel:6237772376"
            className="hidden md:inline-block bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700"
          >
            📞 Call Us
          </a>

          {/* Mobile Toggle */}
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