"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [fleetOpen, setFleetOpen] = useState(false); // for mobile dropdown

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

            {/* Fleet Dropdown */}
            <div className="group relative">
              <button className="flex items-center gap-1 font-medium text-gray-700 hover:text-blue-600">
                Fleet <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md hidden group-hover:block z-50">
                <Link href="/sedans" className="block px-4 py-2 hover:bg-gray-100">
                  Sedans
                </Link>
                <Link href="/suvs" className="block px-4 py-2 hover:bg-gray-100">
                  SUVs
                </Link>
                <Link href="/3row-suvs" className="block px-4 py-2 hover:bg-gray-100">
                  3-Row SUVs
                </Link>
                <Link href="/fleet" className="block px-4 py-2 hover:bg-gray-100 font-medium">
                  🚗 View All
                </Link>
              </div>
            </div>

            <Link href="/rental-agreement" className="font-medium text-gray-700 hover:text-blue-600">
              Rental Agreement
            </Link>
            <Link href="/contact" className="font-medium text-gray-700 hover:text-blue-600">
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

          {/* Mobile Toggle Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t">
          <div className="flex flex-col space-y-2 p-4">
            <Link
              href="/about"
              className="block text-gray-700 hover:text-blue-600"
              onClick={() => setMenuOpen(false)}
            >
              About Us
            </Link>

            {/* Fleet Dropdown Mobile */}
            <button
              className="flex items-center justify-between text-gray-700 hover:text-blue-600"
              onClick={() => setFleetOpen(!fleetOpen)}
            >
              <span>Fleet</span>
              {fleetOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
            {fleetOpen && (
              <div className="ml-4 flex flex-col space-y-2">
                <Link href="/sedans" className="block text-gray-600 hover:text-blue-600" onClick={() => setMenuOpen(false)}>
                  Sedans
                </Link>
                <Link href="/suvs" className="block text-gray-600 hover:text-blue-600" onClick={() => setMenuOpen(false)}>
                  SUVs
                </Link>
                <Link href="/3row-suvs" className="block text-gray-600 hover:text-blue-600" onClick={() => setMenuOpen(false)}>
                  3-Row SUVs
                </Link>
                <Link href="/fleet" className="block text-gray-600 font-medium hover:text-blue-600" onClick={() => setMenuOpen(false)}>
                  🚗 View All
                </Link>
              </div>
            )}

            <Link
              href="/rental-agreement"
              className="block text-gray-700 hover:text-blue-600"
              onClick={() => setMenuOpen(false)}
            >
              Rental Agreement
            </Link>
            <Link
              href="/contact"
              className="block text-gray-700 hover:text-blue-600"
              onClick={() => setMenuOpen(false)}
            >
              Contact Us
            </Link>
            <a
              href="tel:6237772376"
              className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 text-center"
            >
              📞 Call Us
            </a>
          </div>
        </div>
      )}
    </header>
  );
}