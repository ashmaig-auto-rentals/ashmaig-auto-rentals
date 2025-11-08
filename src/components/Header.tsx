"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [fleetOpen, setFleetOpen] = useState(false); // mobile dropdown toggle

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-gray-900">
            Ashmaig Rideshare Rentals
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 relative">
            <Link href="/about" className="font-medium text-gray-700 hover:text-blue-600">
              About Us
            </Link>

            {/* Fleet Dropdown (desktop) */}
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

          {/* Call Button (desktop) */}
          <a
            href="tel:6237772376"
            className="hidden md:inline-block bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700"
          >
            📞 Call Us
          </a>

          {/* Mobile Toggle Button */}
          <button
            className="md:hidden text-gray-700 z-[70]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* ✅ Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-white shadow-lg border-t overflow-y-auto md:hidden animate-slide-down">
          <div className="flex flex-col space-y-4 p-6">
            <Link
              href="/about"
              className="text-gray-700 text-lg font-medium hover:text-blue-600"
              onClick={() => setMenuOpen(false)}
            >
              About Us
            </Link>

            {/* Fleet dropdown (mobile) */}
            <button
              className="flex items-center justify-between text-gray-700 text-lg font-medium hover:text-blue-600"
              onClick={() => setFleetOpen(!fleetOpen)}
            >
              <span>Fleet</span>
              {fleetOpen ? (
                <ChevronDown className="h-5 w-5" />
              ) : (
                <ChevronRight className="h-5 w-5" />
              )}
            </button>

            {fleetOpen && (
              <div className="ml-4 flex flex-col space-y-3">
                <Link href="/sedans" onClick={() => setMenuOpen(false)} className="text-gray-600 hover:text-blue-600">
                  Sedans
                </Link>
                <Link href="/suvs" onClick={() => setMenuOpen(false)} className="text-gray-600 hover:text-blue-600">
                  SUVs
                </Link>
                <Link href="/3row-suvs" onClick={() => setMenuOpen(false)} className="text-gray-600 hover:text-blue-600">
                  3-Row SUVs
                </Link>
                <Link href="/fleet" onClick={() => setMenuOpen(false)} className="text-gray-600 font-medium hover:text-blue-600">
                  🚗 View All
                </Link>
              </div>
            )}

            <Link
              href="/rental-agreement"
              className="text-gray-700 text-lg font-medium hover:text-blue-600"
              onClick={() => setMenuOpen(false)}
            >
              Rental Agreement
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 text-lg font-medium hover:text-blue-600"
              onClick={() => setMenuOpen(false)}
            >
              Contact Us
            </Link>

            <a
              href="tel:6237772376"
              className="mt-6 inline-block bg-blue-600 text-white px-5 py-3 rounded-lg font-medium hover:bg-blue-700 text-center"
              onClick={() => setMenuOpen(false)}
            >
              📞 Call Us
            </a>
          </div>
        </div>
      )}
    </header>
  );
}