export default function Footer() {
    return (
      <footer className="bg-gray-900 text-gray-100 py-10 mt-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-8">
          {/* Left side: brand + tagline */}
          <div>
            <h2 className="text-2xl font-bold">Ashmaig Auto Rentals</h2>
            <p className="mt-2 text-sm text-gray-400">
              Affordable & reliable long-term car rentals in Phoenix.
            </p>
          </div>
  
          {/* Middle: contact info */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Contact</h3>
            <p>📍 Phoenix, AZ</p>
            <p>📞 (623) 777-2376</p>
            <p>
              📧{" "}
              <a href="mailto:info@ashmaig.com" className="underline">
                info@ashmaig.com
              </a>
            </p>
          </div>
  
          {/* Right: hours */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Hours</h3>
            <p>Mon – Sun</p>
            <p>8:00 AM – 6:00 PM</p>
          </div>
        </div>
  
        {/* Bottom bar */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Ashmaig Auto Rentals. All rights reserved.
        </div>
      </footer>
    );
  }