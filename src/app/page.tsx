import Image from "next/image";
import Link from "next/link";
import BookingBar from "@/components/BookingBar";

export default function HomePage() {
  return (
    <main className="bg-white text-gray-900 dark:bg-slate-900 dark:text-gray-100">
      {/* JSON-LD Structured Data for LocalBusiness */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CarRental",
            name: "Ashmaig Auto Rentals",
            url: "https://ashmaig.com",
            telephone: "+16237772376",
            priceRange: "$$",
            address: {
              "@type": "PostalAddress",
              streetAddress: "3750 E Washington St",
              addressLocality: "Phoenix",
              addressRegion: "AZ",
              postalCode: "85034",
              addressCountry: "US",
            },
            openingHours: "Mo-Su 07:00-19:00",
            description:
              "Ashmaig Auto Rentals offers work-ready rental cars for rideshare and delivery drivers in Phoenix. Weekly and monthly rental options with insurance, maintenance, and unlimited mileage included, with a simple $100 deposit.",
          }),
        }}
      />

      {/* Hero Section with integrated BookingBar */}
      <section className="relative min-h-[90vh]">
        <Image
          src="/desert-car.jpg"
          alt="Phoenix rideshare rental background"
          fill
          className="object-cover opacity-90"
          priority
        />
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />

        <div className="relative z-10 section flex items-center py-16">
          <div className="w-full grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-center">
            {/* Left: Hero Text */}
            <div className="text-white max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
                Phoenix Rideshare Rentals for Uber, Lyft & Delivery Drivers
              </h1>

              {/* Price badge */}
              <div className="mt-4 inline-block bg-green-600 text-white text-lg md:text-xl font-bold px-4 py-1.5 rounded-full shadow-lg">
                $350/week
              </div>

              {/* One-line feature text */}
              <p className="mt-3 text-lg md:text-xl text-gray-200 max-w-xl whitespace-nowrap">
                Insurance & Maintenance Included · Unlimited Miles
              </p>

              {/* One-line feature text */}
              <p className="mt-3 text-lg md:text-xl text-gray-200 max-w-xl whitespace-nowrap">
                Uber & Lyft Ready
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-gray-200/90" />
            </div>

            {/* Right: Booking / Upload Card */}
            <div className="w-full flex justify-center lg:justify-end">
              <div className="w-full max-w-md bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/60 dark:border-slate-700 p-4 sm:p-5">
                <h2 className="text-lg font-semibold mb-1 text-gray-900 dark:text-gray-100">
                  Apply to Get a Car
                </h2>
                <BookingBar />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="bg-blue-600 text-white py-12 text-center">
        <h2 className="text-3xl font-bold">Start Earning with a Reliable Work Car</h2>
        <p className="mt-3 text-lg">
          Rentals from $350/week. Same-day approval and pickup.
        </p>
        <a
          href="tel:6237772376"
          className="mt-6 inline-block bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100"
        >
          📞 Call 623-777-2376
        </a>
      </section>

      {/* What Do You Need to Rent Section */}
      <section className="section bg-gray-50 dark:bg-slate-800">
        <h2 className="text-2xl font-semibold text-center mb-4">
          What Do You Need to Rent?
        </h2>
        <div className="max-w-3xl mx-auto grid md:grid-cols-3 gap-4 text-center">
          {[
            {
              icon: "🪪",
              title: "Valid Driver’s License",
              desc: "Must be 21+ with a current, valid driver’s license.",
            },
            {
              icon: "💳",
              title: "First Week + $100 Deposit",
              desc: "Simple, upfront pricing with no hidden junk fees.",
            },
            {
              icon: "✅",
              title: "That's It",
              desc: "Fast approval. Upload your info and get matched with a car.",
            },
          ].map(({ icon, title, desc }, idx) => (
            <div
              key={idx}
              className="p-6 bg-white dark:bg-slate-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600"
            >
              <p className="text-3xl mb-3">{icon}</p>
              <h3 className="text-lg font-medium mb-2">{title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Drivers Choose Us Section */}
      <section className="section bg-gray-50 dark:bg-slate-800">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Why Drivers Choose Us
        </h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6 text-center">
          {[
            {
              icon: "🚗",
              title: "Pickup Same Day",
              desc: "Get approved and on the road in less than 24 hours. No credit check required.",
            },
            {
              icon: "🛡️",
              title: "Insurance Available",
              desc: "State-required liability coverage available with every rental.",
            },
            {
              icon: "📝",
              title: "Uber-Ready",
              desc: "Uber inspection forms included and ready to upload to your account.",
            },
            {
              icon: "🛠️",
              title: "Maintenance Included",
              desc: "Oil changes, inspections, and tire rotations are covered.",
            },
            {
              icon: "♾️",
              title: "Unlimited Mileage",
              desc: "Drive as much as you need. No per-mile fees.",
            },
            {
              icon: "⚡",
              title: "Built for Gig Drivers",
              desc: "Simple terms designed for Uber, Lyft, and delivery drivers.",
            },
          ].map(({ icon, title, desc }, i) => (
            <div
              key={i}
              className="p-6 bg-white dark:bg-slate-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600"
            >
              <p className="text-4xl mb-3">{icon}</p>
              <h3 className="text-lg font-medium mb-2">{title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Vehicle Lineup Section */}
      <section className="section bg-white dark:bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-2">
            Our Most Popular Vehicle Types
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Reliable, fuel-efficient sedans ideal for Uber, Lyft, and delivery driving in Phoenix.
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Prius */}
            <div className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm flex flex-col">
              <div className="relative w-full h-40 md:h-48 mb-4">
                <Image
                  src="/cars/prius.png"
                  alt="Toyota Prius rideshare rental"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-center">Toyota Prius</h3>
            </div>

            {/* Ford Fusion */}
            <div className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm flex flex-col">
              <div className="relative w-full h-40 md:h-48 mb-4">
                <Image
                  src="/cars/fusion.png"
                  alt="Ford Fusion rideshare rental"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-center">Ford Fusion</h3>
            </div>

            {/* Toyota Camry */}
            <div className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm flex flex-col">
              <div className="relative w-full h-40 md:h-48 mb-4">
                <Image
                  src="/cars/camry.png"
                  alt="Toyota Camry rideshare rental"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-center">Toyota Camry</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Location Map Section */}
      <section className="section">
        <h2 className="text-2xl font-semibold mb-4 text-center">Our Location</h2>
        <div className="w-full h-96">
          <iframe
            src="https://www.google.com/maps?q=3750+E+Washington+St,+Phoenix,+AZ&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </main>
  );
}