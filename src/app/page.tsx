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

      {/* Hero Section */}
      <section className="relative h-[88vh]">
        <Image
          src="/desert-car.jpg"
          alt="Phoenix rideshare rental background"
          fill
          className="object-cover opacity-90"
          priority
        />
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />
        <div className="relative z-10 section h-full flex flex-col items-start pt-16">
          <h1 className="text-4xl md:text-6xl font-semibold text-white max-w-3xl">
            Phoenix Rideshare Rentals for Uber, Lyft & Delivery Drivers
          </h1>
          <p className="mt-4 text-lg text-gray-200 max-w-2xl">
            $350/week · Insurance Included · Unlimited Miles · Maintenance Included
          </p>

          {/* Booking bar (desktop only) */}
          <div className="mt-10 hidden md:block w-full max-w-xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-lg shadow-lg p-4">
            <BookingBar />
          </div>
        </div>
      </section>

      {/* Booking bar (mobile only) */}
      <div className="block md:hidden section -mt-8 z-20 relative w-full max-w-lg mx-auto bg-white dark:bg-slate-800 shadow-md rounded-lg p-4">
        <BookingBar />
      </div>

      {/* Call to Action Banner */}
      <section className="bg-blue-600 text-white py-12 text-center">
        <h2 className="text-3xl font-bold">Start Earning with a Reliable Work Car</h2>
        <p className="mt-3 text-lg">Rentals from $350/week. Same-day approval and pickup.</p>
        <a
          href="tel:6237772376"
          className="mt-6 inline-block bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100"
        >
          📞 Call 623-777-2376
        </a>
      </section>

      {/* What Do You Need to Rent Section */}
      <section className="section bg-gray-50 dark:bg-slate-800">
        <h2 className="text-2xl font-semibold text-center mb-4">What Do You Need to Rent?</h2>
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
              desc: "Simple and upfront. No hidden fees, no surprises.",
            },
            {
              icon: "✅",
              title: "That's It!",
              desc: "Fast approval. Book today, start earning today.",
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

      {/* Rental Categories Section */}
      <section id="categories" className="section bg-gray-50 dark:bg-slate-800">
        <h2 className="text-2xl font-semibold mb-8 text-center">Rental Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Sedans",
              img: "/sedan.jpg",
              desc: "Affordable and fuel-efficient — perfect for city driving.",
              href: "/sedans",
            },
            {
              title: "SUVs",
              img: "/suv.jpg",
              desc: "More space and comfort for longer trips or delivery driving.",
              href: "/suvs",
            },
            {
              title: "3-Row SUVs",
              img: "/3row-suv.jpg",
              desc: "Extra seating and storage for large loads or more passengers.",
              href: "/3row-suvs",
            },
          ].map((cat) => (
            <div
              key={cat.title}
              className="group rounded-xl overflow-hidden border bg-white dark:bg-slate-800 hover:shadow-lg transition flex flex-col"
            >
              <div className="relative h-40">
                <Image src={cat.img} alt={cat.title} fill className="object-cover" />
              </div>
              <div className="p-4 flex flex-col flex-1 text-center">
                <h3 className="text-lg font-medium">{cat.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 flex-1">
                  {cat.desc}
                </p>
                <Link
                  href={cat.href}
                  className="mt-4 inline-block bg-blue-600 text-white px-5 py-2 rounded-md text-sm hover:bg-blue-700"
                >
                  Explore {cat.title}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Drivers Choose Us Section */}
      <section className="section bg-gray-50 dark:bg-slate-800">
        <h2 className="text-2xl font-semibold text-center mb-6">Why Drivers Choose Us</h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6 text-center">
          {[
            {
              icon: "🚗",
              title: "Pickup Same Day",
              desc: "Get approved and on the road in less than 24 hours. No credit check required.",
            },
            {
              icon: "🛡️",
              title: "Insurance Included",
              desc: "State-required liability coverage included with every rental.",
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
              desc: "Simple terms made for Uber, Lyft, and delivery drivers.",
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

      {/* Reviews Section */}
      <section className="section">
        <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-600 shadow-md rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold mb-3">Customer Reviews</h2>
          <p className="text-yellow-400 text-2xl mb-2">★★★★★</p>
          <p className="text-gray-800 dark:text-gray-200 font-medium mb-6">
            We’re proud to hold a <span className="font-bold">5-Star Rating</span> on Google
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            {[
              {
                review: "Perfect for Uber! Clean car, quick process, and no surprise fees.",
                author: "— Jerome H.",
              },
              {
                review:
                  "Got approved same day and started working that night. Highly recommend!",
                author: "— Alicia M.",
              },
              {
                review:
                  "Unlimited miles was huge for me as a DoorDash driver. Great experience!",
                author: "— Bryan L.",
              },
            ].map((r, idx) => (
              <div
                key={idx}
                className="p-4 bg-gray-50 dark:bg-slate-700 rounded-lg shadow-sm"
              >
                <p className="text-yellow-400">★★★★★</p>
                <p className="mt-2 text-gray-700 dark:text-gray-300">{r.review}</p>
                <p className="mt-2 text-sm font-medium">{r.author}</p>
              </div>
            ))}
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