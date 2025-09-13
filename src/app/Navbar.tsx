"use client";

export default function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/70 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo / Brand */}
        <div className="font-semibold text-lg tracking-wide">Ashmaig Auto Rentals</div>

        {/* Links */}
        <nav className="flex gap-6 text-sm text-gray-700">
          <a href="#fleet" className="hover:text-black">
            Fleet
          </a>
          <a href="#why" className="hover:text-black">
            Why Us
          </a>
          <a href="#reserve" className="hover:text-black">
            Reserve
          </a>
        </nav>
      </div>
    </header>
  );
}