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
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-gray-900">
            Ashmaig Auto Rentals
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 relative">
            <Link
              href="/about"
              className="font-medium text-gray-700 hover:text-blue-600"
            >
              About Us
            </Link>

            <Link
              href="/contact"
              className="font-medium text-gray-700 hover:text-blue-600"
            >
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

      {/* Mobile Menu */}
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