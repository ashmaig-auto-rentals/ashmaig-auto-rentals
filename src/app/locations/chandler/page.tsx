import Image from "next/image";
import Link from "next/link";
import BookingBar from "@/components/BookingBar";

export default function ChandlerPage() {
  return (
    <main className="bg-white text-gray-900 dark:bg-slate-900 dark:text-gray-100">
      {/* JSON-LD Structured Data (Chandler) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CarRental",
            name: "Ashmaig Auto Rentals - Chandler",
            url: "https://ashmaig.com/locations/chandler",
            telephone: "+16237772376",
            priceRange: "$$",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Chandler",
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
          alt="Chandler AZ cheap car rentals and rideshare rental background"
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
                Chandler Uber & Lyft Car Rentals – Cheap Weekly Rideshare Cars Near You
              </h1>

              {/* PRICE + CALL BUTTON (MOBILE ONLY) */}
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

              {/* DESKTOP PRICE BADGE */}
              <div className="hidden md:inline-block mt-4 bg-green-600 text-white text-lg md:text-xl font-bold px-4 py-1.5 rounded-full shadow-lg">
                Cheap weekly car rentals near Chandler from $300/week
              </div>

              <p className="mt-3 text-lg md:text-xl text-gray-200 max-w-xl">
                Insurance & Maintenance Included – no hidden fees or surprise add-ons.
              </p>
              <p className="mt-3 text-lg md:text-xl text-gray-200 max-w-xl">
                Unlimited Mileage – perfect for Uber, Lyft, DoorDash & Instacart.
              </p>
              <p className="mt-3 text-lg md:text-xl text-gray-200 max-w-xl">
                Debit-card friendly alternative to big brands that require a credit card.
              </p>
              <p className="mt-3 text-lg md:text-xl text-gray-200 max-w-xl">
                Fast approval for local drivers searching for{" "}
                <strong>“cheap car rentals near me”</strong> in Chandler.
              </p>
            </div>

            {/* RIGHT: BOOKING CARD */}
            <div className="w-full flex justify-center lg:justify-end">
              <div className="w-full max-w-md bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/60 dark:border-slate-700 p-4 sm:p-5">
                <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100 text-center sm:text-left">
                  Apply to Get a Car in Chandler
                </h2>
                <BookingBar />
                <p className="mt-3 text-xs text-gray-500">
                  Ideal for drivers searching “car rentals near me”, “cheap rental cars
                  near me”, or “rideshare car rental Chandler AZ”.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="bg-blue-600 text-white py-12 text-center">
        <h2 className="text-3xl font-bold">
          Cheap Car Rentals Near Chandler – Start Earning This Week
        </h2>
        <p className="mt-3 text-lg">
          Same-day approval and pickup for rideshare and delivery drivers. Search
          “car rental near me open now” and choose a local Chandler / East Valley option.
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
          What Do You Need to Rent in Chandler?
        </h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-4 text-center">
          {[
            {
              icon: "🪪",
              title: "Valid Driver’s License",
              desc: "Must be 21+ with a current, valid license for Arizona car rentals.",
            },
            {
              icon: "💳",
              title: "First Week’s Rent",
              desc: "Affordable weekly rates for cheap car rentals Arizona drivers can rely on.",
            },
            {
              icon: "✅",
              title: "Simple Approval",
              desc: "Fast process for local drivers who search “rental car no credit card” or “car rentals no credit card needed”.",
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

      {/* WHY CHOOSE US / KEYWORD SECTION */}
      <section className="section bg-gray-50 dark:bg-slate-800">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Why Chandler Drivers Choose Our Cheap Car Rentals
        </h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 text-center">
          {[
            {
              icon: "🚗",
              title: "Built for Rideshare",
              desc: "Optimized for Uber, Lyft, and other rideshare car rental needs.",
            },
            {
              icon: "🕒",
              title: "Fast, Local Pickup",
              desc: "A practical answer when you search “car rental near me open now” around Chandler or the East Valley.",
            },
            {
              icon: "💰",
              title: "Cheap Weekly Rentals",
              desc: "Competitive weekly prices for drivers who want the cheapest car rentals near them.",
            },
            {
              icon: "🛡️",
              title: "Insurance & Maintenance",
              desc: "State-required insurance and maintenance included so you’re not dealing with surprise costs.",
            },
            {
              icon: "💳",
              title: "Debit-Card Friendly",
              desc: "Many big brands require a major credit card. Our process is designed for drivers searching “car rentals no credit card needed” solutions.",
            },
            {
              icon: "📍",
              title: "Local Arizona Support",
              desc: "Serving Chandler, Gilbert, Mesa, Tempe, and the greater East Valley for local car rentals near you.",
            },
          ].map(({ icon, title, desc }, i) => (
            <div
              key={i}
              className="p-6 bg-white dark:bg-slate-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600"
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
            Cars Available for Chandler Rideshare & Delivery Drivers
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Reliable, fuel-efficient sedans ideal for Uber, Lyft, and delivery drivers
            searching for cheap rental cars near Chandler and the East Valley.
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

      {/* FAQ / EXTRA SEO CONTENT */}
      <section className="section bg-gray-50 dark:bg-slate-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Chandler “Near Me” Car Rental FAQs
          </h2>
          <div className="space-y-6 text-sm md:text-base text-gray-700 dark:text-gray-200">
            <div>
              <h3 className="font-semibold">
                Do you offer cheap car rentals near me in Chandler?
              </h3>
              <p className="mt-1">
                Yes. Our goal is to be the local answer when drivers search phrases
                like “cheap car rentals near me”, “cheap rental cars near me”, or
                “cheap car rentals Arizona”. Weekly pricing is designed so rideshare
                and delivery drivers can stay profitable.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">
                Can I rent a car for rideshare and delivery apps?
              </h3>
              <p className="mt-1">
                Absolutely. Most of our customers are using our cars for rideshare car
                rental on Uber and Lyft, or delivery apps like DoorDash, Uber Eats,
                and Instacart. Vehicles are set up to meet typical platform
                requirements.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">
                What if I don’t have a traditional credit card?
              </h3>
              <p className="mt-1">
                Many drivers search “rental car no credit card” or “car rentals no
                credit card needed” because big chains make it difficult to rent with
                a debit card. Our process is built to be debit-card-friendly while
                still protecting both you and the vehicle. Reach out and we’ll walk
                you through the exact steps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA — Call Us + Booking Form */}
      <section className="section bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl border border-blue-100 dark:border-blue-900 bg-blue-50/80 dark:bg-slate-800/80 p-6 sm:p-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Ready to get a car near Chandler?
            </h3>

            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-200 mb-6">
              Apply for a rideshare-ready rental with unlimited miles and start earning
              in Chandler and the East Valley. Call or text us — or send your
              application through the form below.
            </p>

            {/* CALL US BUTTON */}
            <a
              href="tel:6237772376"
              className="mb-6 inline-flex items-center justify-center w-full sm:w-auto rounded-xl px-6 py-3 text-base font-semibold bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              📞 Call Us: (623) 777-2376
            </a>

            {/* BOOKING / APPLICATION FORM */}
            <div className="mt-6 bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
              <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Apply to get a car now
              </h4>
              <BookingBar />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}