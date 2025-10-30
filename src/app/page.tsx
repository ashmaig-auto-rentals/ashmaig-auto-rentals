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
              streetAddress: "3400 Sky Harbor Blvd",
              addressLocality: "Phoenix",
              addressRegion: "AZ",
              postalCode: "85034",
              addressCountry: "US",
            },
            openingHours: "Mo-Su 07:00-19:00",
            description:
              "Ashmaig Auto Rentals is Phoenix’s local alternative to Hertz. Debit cards accepted, low deposits, and flexible rental terms on sedans, SUVs, and 3-row vehicles.",
          }),
        }}
      />

      {/* Hero Section */}
      <section className="relative h-[88vh]">
        <Image
          src="/desert-car.jpg"
          alt="Phoenix car rental background"
          fill
          className="object-cover opacity-90"
          priority
        />
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />
        <div className="relative z-10 section h-full flex flex-col items-start pt-16">
          <h1 className="text-4xl md:text-6xl font-semibold text-white max-w-3xl">
            Reliable, Long-Term Car Rentals in Phoenix, AZ
          </h1>
          <p className="mt-4 text-lg text-gray-200 max-w-2xl">
            Pick your dates, choose a car, and drive.
          </p>

          {/* Booking bar (desktop only) */}
          <div className="mt-10 hidden md:block w-full max-w-xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-lg shadow-lg p-4">
            <BookingBar />
          </div>
        </div>
      </section>

      {/* Booking bar (mobile only, below hero image) */}
      <div className="block md:hidden section -mt-8 z-20 relative w-full max-w-lg mx-auto bg-white dark:bg-slate-800 shadow-md rounded-lg p-4">
        <BookingBar />
      </div>

      {/* Requirements Section */}
      <section className="section bg-gray-50 dark:bg-slate-800">
        <h2 className="text-2xl font-semibold text-center mb-6">
          What Do You Need to Rent?
        </h2>
        <div className="max-w-3xl mx-auto grid md:grid-cols-3 gap-6 text-center">
          <div className="p-6 bg-white dark:bg-slate-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
            <p className="text-blue-500 text-3xl mb-3">🪪</p>
            <h3 className="text-lg font-medium mb-2">Valid Driver’s License</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Must be 21+ with a current, valid driver’s license.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-slate-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
            <p className="text-green-500 text-3xl mb-3">🛡️</p>
            <h3 className="text-lg font-medium mb-2">Full Coverage Insurance</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Proof of active full coverage insurance is required.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-slate-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
            <p className="text-yellow-400 text-3xl mb-3">✅</p>
            <h3 className="text-lg font-medium mb-2">That’s It!</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Simple, fast process. No deposits or hidden fees — just book and go.
            </p>
          </div>
        </div>
        <div className="max-w-2xl mx-auto mt-6 text-center text-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-slate-700 border border-gray-200 dark:border-gray-600 shadow-sm p-4 rounded-lg">
          <p>
            Don’t have full coverage? If you only carry liability, you can{" "}
            <span className="font-semibold">upgrade to full coverage directly through us</span>.{" "}
            If not, we can still rent to you securely via Turo.
          </p>
        </div>
      </section>

      {/* Vehicle Categories */}
      <section id="categories" className="section">
        <h2 className="text-2xl font-semibold mb-8">Our Rental Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Sedans",
              img: "/sedan.jpg",
              desc: "Comfortable, fuel-efficient cars for city and highway driving.",
              href: "/sedans",
            },
            {
              title: "SUVs",
              img: "/suv.jpg",
              desc: "Spacious and versatile, perfect for families or road trips.",
              href: "/suvs",
            },
            {
              title: "3-Row SUVs",
              img: "/3row-suv.jpg",
              desc: "Extra seating and storage for larger groups and longer journeys.",
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

        <div className="text-center mt-10">
          <Link
            href="/fleet"
            className="inline-block bg-gray-800 dark:bg-gray-100 dark:text-gray-900 text-white px-8 py-4 rounded-md text-base font-medium hover:bg-gray-900 dark:hover:bg-white"
          >
            🚗 Explore Entire Fleet
          </Link>
        </div>
      </section>

      {/* Process Section */}
      <section className="section bg-gray-50 dark:bg-slate-800 text-center">
        <h2 className="text-2xl font-semibold mb-8">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            {
              icon: "📅",
              title: "1. Pick Your Dates & Car",
              desc: "Select your rental period and vehicle that best fits your trip.",
            },
            {
              icon: "💰",
              title: "2. Get Instant Quote",
              desc: "Our system gives you a transparent price right away.",
            },
            {
              icon: "📲",
              title: "3. Quick Confirmation",
              desc: "After you submit, we’ll reach back out with pickup instructions.",
            },
            {
              icon: "🚗",
              title: "4. Confirm & Drive Away",
              desc: "Complete your payment, and enjoy a stress-free pickup.",
            },
          ].map((step) => (
            <div
              key={step.title}
              className="p-6 bg-white dark:bg-slate-700 rounded-lg shadow-md border border-gray-200 dark:border-gray-600"
            >
              <p className="text-3xl mb-3">{step.icon}</p>
              <h3 className="font-medium">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Fleet Section (moved here) */}
      <section className="section">
        <h2 className="text-2xl font-semibold mb-6 text-center">Featured Vehicles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "2014 Ford Fusion", price: 50, img: "/ford-fusion.png" },
            { name: "2017 Hyundai Sonata", price: 50, img: "/hyundai-sonata.png" },
            { name: "2017 Toyota RAV4", price: 60, img: "/toyota-rav4.png" },
          ].map((car, idx) => (
            <div
              key={idx}
              className="rounded-lg border bg-white dark:bg-slate-800 dark:border-gray-600 shadow-md hover:shadow-lg transition overflow-hidden"
            >
              <div className="relative h-48">
                <Image src={car.img} alt={car.name} fill className="object-cover" />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-medium">{car.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  ${car.price}/day
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="bg-blue-600 text-white py-12 text-center">
        <h2 className="text-3xl font-bold">Ready to Hit the Road?</h2>
        <p className="mt-3 text-lg">
          Book your reliable rental today — no fees, no deposits, no hassle.
        </p>
        <a
          href="tel:6237772376"
          className="mt-6 inline-block bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100"
        >
          📞 Call 623-777-2376
        </a>
      </section>

      {/* Reviews Section */}
      <section className="section">
        <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-600 shadow-md rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold mb-3">Our Reputation</h2>
          <p className="text-yellow-400 text-2xl mb-2">★★★★★</p>
          <p className="text-gray-800 dark:text-gray-200 font-medium mb-6">
            We’re proud to have a <span className="font-bold">5-Star Rating</span> on Google
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            {[
              {
                review:
                  "Ashmaig Auto Rentals made everything simple. The SUV was spotless and pickup was fast!",
                author: "— Sarah K.",
              },
              {
                review:
                  "Best rental experience I’ve had in Phoenix. Transparent pricing and friendly service.",
                author: "— James R.",
              },
              {
                review:
                  "Loved the convenience and the clean car. Definitely booking here again!",
                author: "— Maria L.",
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

      {/* FAQ Section */}
      <section className="section bg-gray-50 dark:bg-slate-800">
        <h2 className="text-2xl font-semibold text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto space-y-6">
          {[
            {
              q: "Do I need a security deposit?",
              a: "No. We don’t require security deposits. Just bring your license and proof of full coverage insurance.",
            },
            {
              q: "Can I rent if I only have liability insurance?",
              a: "Yes. You can upgrade to full coverage through us. If that doesn’t work, we can set you up securely through Turo.",
            },
            {
              q: "What if I need to extend my rental?",
              a: "Extensions are simple. Just contact us, and we’ll adjust your booking with no hidden fees.",
            },
            {
              q: "Do you allow out-of-state travel?",
              a: "Yes, but let us know in advance so we can confirm insurance coverage.",
            },
            {
              q: "What’s your cancellation policy?",
              a: "Free cancellation, because we understand that your plans can change.",
            },
          ].map((f) => (
            <div key={f.q}>
              <h3 className="font-medium">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{f.a}</p>
            </div>
          ))}
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