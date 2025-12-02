import Image from "next/image";
import Link from "next/link";
import BookingBar from "@/components/BookingBar";

export default function GoodyearPage() {
  return (
    <main className="bg-white text-gray-900 dark:bg-slate-900 dark:text-gray-100">
      {/* JSON-LD Structured Data (Goodyear) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CarRental",
            name: "Ashmaig Auto Rentals - Goodyear",
            url: "https://ashmaig.com/locations/goodyear",
            telephone: "+16237772376",
            priceRange: "$$",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Goodyear",
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
          alt="Goodyear AZ cheap car rentals and rideshare rental background"
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
                Goodyear Uber & Lyft Car Rentals – Cheap Weekly Rideshare Cars Near You
              </h1>

              {/* MOBILE PRICE + CALL */}
              <div className="mt-4 flex items-center gap-3 md:hidden">
                <div className="bg-green-600 text-white text-lg font-bold px-4 py-1.5 rounded-full shadow-lg">
                  From $300/week
                </div>
                <a
                  href="tel:6237772376"
                  className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md hover:bg-blue-700 transition"
                >
                  Call Us
                </a>
              </div>

              {/* DESKTOP PRICE */}
              <div className="hidden md:inline-block mt-4 bg-green-600 text-white text-lg md:text-xl font-bold px-4 py-1.5 rounded-full shadow-lg">
                Cheap weekly car rentals near Goodyear from $300/week
              </div>

              <p className="mt-3 text-lg md:text-xl text-gray-200 max-w-xl">
                Insurance & Maintenance Included — no hidden fees or surprise add-ons.
              </p>
              <p className="mt-3 text-lg md:text-xl text-gray-200 max-w-xl">
                Unlimited Mileage — perfect for Uber, Lyft, DoorDash & Instacart.
              </p>
              <p className="mt-3 text-lg md:text-xl text-gray-200 max-w-xl">
                Debit-card friendly alternative to big chains requiring credit cards.
              </p>
              <p className="mt-3 text-lg md:text-xl text-gray-200 max-w-xl">
                Fast approval for drivers searching{" "}
                <strong>“cheap car rentals near me”</strong> in Goodyear.
              </p>
            </div>

            {/* RIGHT: BOOKING CARD */}
            <div className="w-full flex justify-center lg:justify-end">
              <div className="w-full max-w-md bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/60 dark:border-slate-700 p-4 sm:p-5">
                <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100 text-center sm:text-left">
                  Apply to Get a Car in Goodyear
                </h2>
                <BookingBar />
                <p className="mt-3 text-xs text-gray-500">
                  Ideal for searches like “car rentals near me”, “Uber car rental
                  Goodyear”, and “rideshare rental West Valley”.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 text-white py-12 text-center">
        <h2 className="text-3xl font-bold">
          Cheap Car Rentals Near Goodyear – Start Earning This Week
        </h2>
        <p className="mt-3 text-lg">
          Same-day approval and pickup for rideshare and delivery drivers across
          Goodyear & the West Valley.
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
          What Do You Need to Rent in Goodyear?
        </h2>

        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-4 text-center">
          {[
            {
              icon: "🪪",
              title: "Valid Driver’s License",
              desc: "Must be 21+ with a current, valid license.",
            },
            {
              icon: "💳",
              title: "First Week’s Rent",
              desc: "Affordable rates for cheap weekly rentals that fit driver budgets.",
            },
            {
              icon: "✅",
              title: "Simple Approval",
              desc: "Built for drivers searching “car rentals no credit card needed”.",
            },
          ].map(({ icon, title, desc }, i) => (
            <div
              key={i}
              className="p-6 bg-white dark:bg-slate-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600"
            >
              <p className="text-3xl mb-3">{icon}</p>
              <h3 className="text-lg font-medium mb-2">{title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section bg-gray-50 dark:bg-slate-800">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Why Goodyear Drivers Choose Our Cheap Car Rentals
        </h2>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 text-center">
          {[
            {
              icon: "🚗",
              title: "Built for Rideshare",
              desc: "Optimized for Uber, Lyft, and gig-work rentals.",
            },
            {
              icon: "🕒",
              title: "Fast, Local Pickup",
              desc: "A top result for drivers searching “car rental near me open now”.",
            },
            {
              icon: "💰",
              title: "Cheap Weekly Rentals",
              desc: "Competitive rates to maximize gig-driver profits.",
            },
            {
              icon: "🛡️",
              title: "Insurance & Maintenance",
              desc: "Everything included — no surprise fees.",
            },
            {
              icon: "💳",
              title: "Debit-Card Friendly",
              desc: "We accept debit cards; big chains often don’t.",
            },
            {
              icon: "📍",
              title: "Local West Valley Coverage",
              desc: "Serving Goodyear, Avondale, Buckeye, Glendale, and the greater West Valley.",
            },
          ].map(({ icon, title, desc }, i) => (
            <div
              key={i}
              className="p-6 bg-white dark:bg-slate-700 rounded-lg shadow-sm border border-gray-200 dark:border-slate-600"
            >
              <p className="text-4xl mb-3">{icon}</p>
              <h3 className="text-lg font-medium mb-2">{title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* VEHICLE LINEUP */}
      <section className="section bg-white dark:bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-2">
            Cars Available for Goodyear Rideshare & Delivery Drivers
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Fuel-efficient, Uber-ready sedans perfect for drivers in Goodyear and
            the West Valley.
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

      {/* FAQ */}
      <section className="section bg-gray-50 dark:bg-slate-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Goodyear “Near Me” Car Rental FAQs
          </h2>

          <div className="space-y-6 text-sm md:text-base text-gray-700 dark:text-gray-200">
            <div>
              <h3 className="font-semibold">
                Do you offer cheap car rentals near me in Goodyear?
              </h3>
              <p className="mt-1">
                Yes — we serve Goodyear and the wider West Valley with affordable
                weekly rentals for rideshare and delivery drivers.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">
                Can I rent a car for Uber or Lyft?
              </h3>
              <p className="mt-1">
                Absolutely. Most of our customers use our cars for Uber, Lyft,
                DoorDash, or Instacart. Vehicles meet common platform requirements.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Do you accept debit cards?</h3>
              <p className="mt-1">
                Yes — unlike many big chains, we work with debit-card renters
                while still protecting both you and the vehicle.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}