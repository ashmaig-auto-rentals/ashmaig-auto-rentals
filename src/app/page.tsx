import Image from "next/image";
import Link from "next/link";
import BookingBar from "@/components/BookingBar";
import MetaPageView from "@/components/MetaPageView"; // ⬅️ added

export default function HomePage() {
  return (
    <main className="bg-white text-gray-900 dark:bg-slate-900 dark:text-gray-100">
      {/* 🔹 Fires Pixel + CAPI PageView with dedup keys */}
      <MetaPageView />

      {/* JSON-LD Structured Data */}
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
              addressLocality: "Phoenix",
              addressRegion: "AZ",
              addressCountry: "US",
            },
            openingHours: "Mo-Su 07:00-19:00",
          }),
        }}
      />

      {/* HERO SECTION */}
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
            {/* LEFT: HERO TEXT */}
            <div className="text-white max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
                Phoenix Weekly Rideshare Rentals for Uber, Lyft & Delivery Drivers
              </h1>

              {/* PRICE + CALL BUTTON (MOBILE ONLY) */}
              <div className="mt-4 flex items-center gap-3 md:hidden">
                <div className="bg-green-600 text-white text-lg font-bold px-4 py-1.5 rounded-full shadow-lg">
                  $400/week
                </div>

                <a
                  href="tel:6237772376"
                  className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md hover:bg-blue-700 transition"
                >
                  Call Us
                </a>
              </div>

              {/* DESKTOP PRICE BADGE */}
              <div className="hidden md:inline-block mt-4 bg-green-600 text-white text-lg md:text-xl font-bold px-4 py-1.5 rounded-full shadow-lg">
                $400/week
              </div>

              <p className="mt-3 text-lg md:text-xl text-gray-200 max-w-xl">
                Insurance & Maintenance Included
              </p>
              <p className="mt-3 text-lg md:text-xl text-gray-200 max-w-xl">
                Unlimited Mileage
              </p>
              <p className="mt-3 text-lg md:text-xl text-gray-200 max-w-xl">
                Uber & Lyft Ready
              </p>
              <p className="mt-3 text-lg md:text-xl text-gray-200 max-w-xl">
                No Deposit Required
              </p>
            </div>

            {/* RIGHT: BOOKING CARD */}
            <div className="w-full flex justify-center lg:justify-end">
              <div className="w-full max-w-md bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/60 dark:border-slate-700 p-4 sm:p-5">
                <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100 text-center sm:text-left">
                  Apply to Get a Car
                </h2>
                <BookingBar />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="bg-blue-600 text-white py-12 text-center">
        <h2 className="text-3xl font-bold">Start Earning with a Reliable Work Car</h2>
        <p className="mt-3 text-lg">
          $400/week Rentals (insurance included). Same-day approval and pickup.
        </p>
        <a
          href="tel:6237772376"
          className="mt-6 inline-block bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100"
        >
          📞 Call 623-777-2376
        </a>
      </section>

      {/* REQUIREMENTS */}
      <section className="section bg-gray-50 dark:bg-slate-800">
        <h2 className="text-2xl font-semibold text-center mb-4">
          What Do You Need to Rent?
        </h2>
        <div className="max-w-3xl mx-auto grid md:grid-cols-3 gap-4 text-center">
          {[
            {
              icon: "🪪",
              title: "Valid Driver’s License",
              desc: "Must be 21+ with a current, valid license.",
            },
            {
              icon: "💳",
              title: "First Week's Rent ($400)",
              desc: "Simple, upfront pricing. No hidden fees.",
            },
            {
              icon: "✅",
              title: "That's It",
              desc: "Fast approval and car assignment.",
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

      {/* WHY CHOOSE US */}
      <section className="section bg-gray-50 dark:bg-slate-800">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Why Drivers Choose Us
        </h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6 text-center">
          {[
            {
              icon: "🚗",
              title: "Pickup Same Day",
              desc: "Get approved and driving in under 24 hours.",
            },
            {
              icon: "🛡️",
              title: "Insurance Available",
              desc: "State-required liability provided.",
            },
            {
              icon: "📝",
              title: "Uber-Ready",
              desc: "Uber inspection forms included.",
            },
            {
              icon: "🛠️",
              title: "Maintenance Included",
              desc: "Oil changes & inspections included.",
            },
            {
              icon: "♾️",
              title: "Unlimited Mileage",
              desc: "Drive as much as you need.",
            },
            {
              icon: "⚡",
              title: "Built for Gig Drivers",
              desc: "Perfect for Uber, Lyft & delivery.",
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

      {/* VEHICLE LINEUP */}
      <section className="section bg-white dark:bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-2">
            Our Most Popular Vehicle Types
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Reliable, fuel-efficient sedans ideal for Uber, Lyft, and delivery.
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { img: "/cars/prius.png", name: "Toyota Prius" },
              { img: "/cars/fusion.png", name: "Ford Fusion" },
              { img: "/cars/camry.png", name: "Toyota Camry" },
            ].map(({ img, name }, i) => (
              <div
                key={i}
                className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm flex flex-col"
              >
                <div className="relative w-full h-40 md:h-48 mb-4">
                  <Image src={img} alt={name} fill className="object-contain" />
                </div>
                <h3 className="text-lg font-semibold text-center">{name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}