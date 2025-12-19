import Image from "next/image";
import Link from "next/link";
import BookingBar from "@/components/BookingBar";

export const metadata = {
  title: "Scottsdale Uber & Lyft Car Rentals | Ashmaig Auto Rentals",
  description:
    "Scottsdale rideshare car rentals for Uber, Lyft, and delivery drivers. $400/week, insurance & maintenance included, unlimited miles, no deposit, same-day approval.",
  alternates: {
    canonical: "https://ashmaig.com/locations/scottsdale",
  },
  openGraph: {
    title: "Scottsdale Uber & Lyft Car Rentals | Ashmaig Auto Rentals",
    description:
      "Rent a reliable rideshare car in Scottsdale for Uber, Lyft, and delivery. $400/week, unlimited miles, insurance & maintenance included.",
    url: "https://ashmaig.com/locations/scottsdale",
    type: "website",
    locale: "en_US",
  },
};

export default function ScottsdalePage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Can I use your cars for Uber and Lyft in Scottsdale, AZ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Our vehicles are specifically set up for Uber and Lyft rideshare use in Scottsdale and nearby areas like Paradise Valley and North Phoenix. We provide the documentation you need so you can get on the road quickly.",
        },
      },
      {
        "@type": "Question",
        name: "How much does a rideshare rental cost in Scottsdale?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most Scottsdale rideshare rentals start at $400 per week. This includes insurance, basic maintenance, and unlimited mileage for Uber, Lyft, and delivery driving.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need good credit or a large deposit to rent?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. We do not require a traditional credit check or large deposit. In most cases, you just need your first week’s rent and a valid driver’s license to start driving for Uber, Lyft, or other gig apps.",
        },
      },
      {
        "@type": "Question",
        name: "How fast can I get a car for Uber or Lyft in Scottsdale?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Many Scottsdale drivers are approved and on the road with a rideshare rental the same day, depending on availability and completion of required insurance paperwork.",
        },
      },
    ],
  };

  const businessJsonLd = {
    "@context": "https://schema.org",
    "@type": "CarRental",
    name: "Ashmaig Auto Rentals - Scottsdale Uber & Lyft Car Rental",
    url: "https://ashmaig.com/locations/scottsdale",
    telephone: "+16237772376",
    priceRange: "$$",
    description:
      "Scottsdale Uber & Lyft car rentals with unlimited miles, insurance included, and no deposit. Perfect for rideshare and delivery drivers in Scottsdale, Paradise Valley, and North Phoenix.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Scottsdale",
      addressRegion: "AZ",
      addressCountry: "US",
    },
    openingHours: "Mo-Su 07:00-19:00",
    areaServed: [
      {
        "@type": "City",
        name: "Scottsdale",
      },
      {
        "@type": "City",
        name: "Phoenix",
      },
      {
        "@type": "City",
        name: "Paradise Valley",
      },
      {
        "@type": "City",
        name: "Tempe",
      },
    ],
    serviceType: "Uber, Lyft, and rideshare car rental",
    sameAs: [
      "https://ashmaig.com",
      // add social profiles later if you want
    ],
  };

  return (
    <main className="bg-white text-gray-900 dark:bg-slate-900 dark:text-gray-100">
      {/* JSON-LD Structured Data (Scottsdale CarRental + FAQ) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(businessJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />

      {/* HERO SECTION */}
      <section
        className="relative min-h-[90vh]"
        id="scottsdale-uber-lyft-rentals"
      >
        <Image
          src="/desert-car.jpg"
          alt="Scottsdale Uber and Lyft rideshare rental car background"
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
                Scottsdale Uber & Lyft Car Rentals for Rideshare & Delivery
              </h1>

              {/* MOBILE PRICE + CALL */}
              <div className="mt-4 flex items-center gap-3 md:hidden">
                <div className="bg-green-600 text-white text-lg font-bold px-4 py-1.5 rounded-full shadow-lg">
                  From $400/week
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
                $400/week • Unlimited Miles • Insurance Included
              </div>

              <p className="mt-3 text-lg md:text-xl text-gray-200 max-w-xl">
                Scottsdale rideshare rentals built for Uber, Lyft, and delivery
                drivers. Drive a clean, reliable car across Old Town Scottsdale,
                North Scottsdale, and the greater Phoenix area.
              </p>
              <p className="mt-3 text-base md:text-lg text-gray-200 max-w-xl">
                Same-day approval and pickup for qualified drivers • No deposit
                required • Maintenance included so you can focus on earning.
              </p>

              <div className="mt-4 flex flex-wrap gap-3 text-sm md:text-base text-gray-200">
                <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1">
                  ✅ Uber & Lyft ready
                </span>
                <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1">
                  ✅ Great for Uber Eats, DoorDash, Instacart
                </span>
                <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1">
                  ✅ Perfect for Scottsdale & North Phoenix commuters
                </span>
              </div>
            </div>

            {/* RIGHT: BOOKING CARD */}
            <div className="w-full flex justify-center lg:justify-end">
              <div className="w-full max-w-md bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/60 dark:border-slate-700 p-4 sm:p-5">
                <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100 text-center sm:text-left">
                  Apply for a Scottsdale Rideshare Rental
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                  Fill this out to get started with an Uber / Lyft-ready car
                  rental in Scottsdale, AZ.
                </p>
                <BookingBar />
                <p className="mt-3 text-xs text-gray-500">
                  Ideal for searches like “Uber car rental Scottsdale”, “Lyft
                  car rental near me”, and “Scottsdale rideshare rentals”.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="bg-blue-600 text-white py-12 text-center">
        <h2 className="text-3xl font-bold">
          Start Earning with a Reliable Uber & Lyft Car in Scottsdale
        </h2>
        <p className="mt-3 text-lg">
          Rideshare rentals from $400/week. Same-day approval and pickup,
          unlimited miles, and insurance included.
        </p>
        <a
          href="tel:6237772376"
          className="mt-6 inline-block bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100"
        >
          📞 Call 623-777-2376 to Get Started
        </a>
        <p className="mt-3 text-sm text-blue-100 max-w-2xl mx-auto">
          Serving Scottsdale, Paradise Valley, North Phoenix, and Tempe for
          Uber, Lyft, Uber Eats, DoorDash, Instacart and more.
        </p>
      </section>

      {/* REQUIREMENTS */}
      <section className="section bg-gray-50 dark:bg-slate-800">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Requirements to Rent a Rideshare Car in Scottsdale
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6 text-sm md:text-base">
          We make it easy for Scottsdale drivers to get on the road with Uber
          and Lyft. Here’s what you need to start earning quickly.
        </p>
        <div className="max-w-3xl mx-auto grid md:grid-cols-3 gap-4 text-center">
          {[
            {
              icon: "🪪",
              title: "Valid Driver’s License",
              desc: "Must be 21+ with a current, valid license and clean driving record.",
            },
            {
              icon: "💳",
              title: "First Week's Rent ($400)",
              desc: "Simple, upfront pricing. No hidden fees or surprise charges.",
            },
            {
              icon: "✅",
              title: "Rideshare Approved",
              desc: "We help you get set up for Uber, Lyft, and delivery apps.",
            },
          ].map(({ icon, title, desc }, idx) => (
            <div
              key={idx}
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
          Why Scottsdale Uber & Lyft Drivers Choose Ashmaig Auto Rentals
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 text-sm md:text-base">
          We understand what rideshare and delivery drivers in Scottsdale need:
          reliable cars, simple pricing, and fast approval. Our fleet is chosen
          with Uber, Lyft, Uber Eats, DoorDash, and Instacart in mind so you
          can maximize your hours in Old Town, North Scottsdale, and all around
          the Valley.
        </p>
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6 text-center">
          {[
            {
              icon: "🚗",
              title: "Pickup Same Day",
              desc: "Many Scottsdale drivers are approved and driving within 24 hours.",
            },
            {
              icon: "🛡️",
              title: "Insurance Included",
              desc: "State-required liability provided to keep you covered.",
            },
            {
              icon: "📝",
              title: "Uber & Lyft Ready",
              desc: "We help with the paperwork and inspection forms you need.",
            },
            {
              icon: "🛠️",
              title: "Maintenance Included",
              desc: "Oil changes and routine inspections are covered.",
            },
            {
              icon: "♾️",
              title: "Unlimited Mileage",
              desc: "Drive as much as you need across Scottsdale & Phoenix.",
            },
            {
              icon: "💳",
              title: "Debit-Card Friendly",
              desc: "A flexible option if big chains require a credit card.",
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
            Cars Available for Scottsdale Rideshare & Delivery Drivers
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Fuel-efficient sedans ideal for Uber, Lyft, Uber Eats, DoorDash, and
            more in Scottsdale, Paradise Valley, and North Phoenix.
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                img: "/cars/prius.png",
                name: "Toyota Prius",
                desc: "Perfect for fuel savings on long Uber & Lyft shifts.",
              },
              {
                img: "/cars/fusion.png",
                name: "Ford Fusion",
                desc: "Comfortable midsize sedan for riders and deliveries.",
              },
              {
                img: "/cars/camry.png",
                name: "Toyota Camry",
                desc: "Reliable workhorse for full-time rideshare drivers.",
              },
            ].map(({ img, name, desc }, i) => (
              <div
                key={i}
                className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm flex flex-col"
              >
                <div className="relative w-full h-40 md:h-48 mb-4">
                  <Image
                    src={img}
                    alt={`${name} rideshare rental car in Scottsdale for Uber and Lyft`}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-lg font-semibold text-center">{name}</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 text-center">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCAL SEO CONTENT + FAQ */}
      <section className="section bg-gray-50 dark:bg-slate-800">
        <div className="max-w-5xl mx-auto grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Scottsdale Uber & Lyft Car Rental Near Old Town & North
              Scottsdale
            </h2>
            <p className="text-gray-700 dark:text-gray-200 text-sm md:text-base mb-3">
              Whether you&apos;re driving full-time for Uber or Lyft, or just
              running deliveries with Uber Eats, DoorDash, or Instacart, a
              reliable rideshare car is essential. Our Scottsdale car rentals
              are set up to meet Uber and Lyft requirements in Arizona, making
              it easy to start earning quickly.
            </p>
            <p className="text-gray-700 dark:text-gray-200 text-sm md:text-base mb-3">
              Many of our drivers live near Old Town Scottsdale, Kierland,
              Paradise Valley, and North Phoenix, or commute into downtown
              Phoenix and Tempe for busy hours. Unlimited miles and included
              maintenance mean you can focus on maximizing your earnings instead
              of worrying about wear and tear.
            </p>
            <p className="text-gray-700 dark:text-gray-200 text-sm md:text-base">
              Looking for other locations? Check out our{" "}
              <Link
                href="/"
                className="text-blue-600 dark:text-blue-400 underline"
              >
                main Ashmaig Auto Rentals page
              </Link>{" "}
              or our{" "}
              <Link
                href="/locations/tempe"
                className="text-blue-600 dark:text-blue-400 underline"
              >
                Tempe Uber & Lyft rentals
              </Link>{" "}
              and{" "}
              <Link
                href="/locations/phoenix"
                className="text-blue-600 dark:text-blue-400 underline"
              >
                Phoenix rideshare rentals
              </Link>{" "}
              for more options.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">
              Scottsdale Rideshare Rental FAQ
            </h2>
            <div className="space-y-3 text-sm text-gray-700 dark:text-gray-200">
              <details className="bg-white dark:bg-slate-700 border border-gray-200 dark:border-gray-600 rounded-lg p-3">
                <summary className="font-medium cursor-pointer">
                  Can I use your cars for Uber and Lyft in Scottsdale?
                </summary>
                <p className="mt-2">
                  Yes. Our vehicles are set up for Uber and Lyft use in
                  Scottsdale, Paradise Valley, and North Phoenix. We&apos;ll
                  help you with the basic documentation you need.
                </p>
              </details>
              <details className="bg-white dark:bg-slate-700 border border-gray-200 dark:border-gray-600 rounded-lg p-3">
                <summary className="font-medium cursor-pointer">
                  What&apos;s included in the $400/week rate?
                </summary>
                <p className="mt-2">
                  The weekly rate typically includes insurance, basic
                  maintenance, and unlimited mileage. You&apos;re responsible
                  for gas and any tickets or tolls while driving.
                </p>
              </details>
              <details className="bg-white dark:bg-slate-700 border border-gray-200 dark:border-gray-600 rounded-lg p-3">
                <summary className="font-medium cursor-pointer">
                  How soon can I start driving for Uber or Lyft?
                </summary>
                <p className="mt-2">
                  Once approved, many drivers pick up their car and start
                  driving the same day, depending on fleet availability and
                  insurance paperwork.
                </p>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA — Call Us + Booking Form */}
      <section className="section bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl border border-blue-100 dark:border-blue-900 bg-blue-50/80 dark:bg-slate-800/80 p-6 sm:p-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Ready to get a rideshare car in Scottsdale?
            </h3>

            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-200 mb-6">
              Apply for a Scottsdale rideshare rental with unlimited miles and
              insurance included, and start earning with Uber, Lyft, and delivery
              apps across Scottsdale, Paradise Valley, North Phoenix, and the
              greater Valley. Call or text us — or send your application through
              the form below.
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