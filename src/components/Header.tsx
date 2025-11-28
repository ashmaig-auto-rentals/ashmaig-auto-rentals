"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { blogPosts } from "../lib/blogPosts";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // show top 3 latest posts in navbar
  const featuredPosts = blogPosts.slice(0, 3);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-gray-900">
            Ashmaig Auto Rentals
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 relative">
            <Link
              href="/"
              className="font-medium text-gray-700 hover:text-blue-600"
            >
              Home
            </Link>

            <Link
              href="/about"
              className="font-medium text-gray-700 hover:text-blue-600"
            >
              About Us
            </Link>

            {/* Blogs Dropdown */}
            <div className="group relative">
              <button className="font-medium text-gray-700 hover:text-blue-600 flex items-center">
                Blogs
                <svg
                  className="ml-1 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Items */}
              <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-150 pointer-events-none group-hover:pointer-events-auto z-50">
                <Link
                  href="/blog"
                  className="block px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
                >
                  Blog Home
                </Link>

                <div className="border-t border-gray-200 my-1" />

                {/* Featured latest blog posts */}
                {featuredPosts.length > 0 && (
                  <>
                    <p className="px-4 py-1 text-xs uppercase tracking-wide text-gray-400">
                      Latest Posts
                    </p>
                    {featuredPosts.map((post) => (
                      <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {post.title}
                      </Link>
                    ))}
                  </>
                )}
              </div>
            </div>

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

      {/* Mobile Sidebar Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t">
          <div className="flex flex-col space-y-2 p-4">
            <Link
              href="/"
              className="block text-gray-700 hover:text-blue-600"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>

            <Link
              href="/about"
              className="block text-gray-700 hover:text-blue-600"
              onClick={() => setMenuOpen(false)}
            >
              About Us
            </Link>

            {/* Blogs – Mobile */}
            <div className="mt-4 border-t border-gray-200 pt-3">
              <p className="text-xs font-semibold text-gray-500 mb-2">
                Blogs
              </p>

              <Link
                href="/blog"
                className="block text-gray-700 hover:text-blue-600"
                onClick={() => setMenuOpen(false)}
              >
                Blog Home
              </Link>

              {featuredPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block text-gray-700 hover:text-blue-600 text-sm"
                  onClick={() => setMenuOpen(false)}
                >
                  {post.title}
                </Link>
              ))}
            </div>

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