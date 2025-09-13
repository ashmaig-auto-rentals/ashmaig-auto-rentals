import Image from "next/image";
import Link from "next/link";
import BookingBar from "@/components/BookingBar";

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[88vh]">
        <Image
          src="/desert-car.jpg"
          alt="Phoenix car rental background"
          fill
          className="object-cover opacity-90"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 section h-full flex flex-col items-start pt-16">
          <h1 className="text-4xl md:text-6xl font-semibold text-white max-w-3xl">
            Reliable, Long-Term Car Rentals in Phoenix, AZ
          </h1>
          <p className="mt-4 text-lg text-gray-200 max-w-2xl">
            Pick your dates, choose a car, and drive.
          </p>

          {/* Booking bar (desktop only) */}
          <div className="mt-10 hidden md:block w-full max-w-xl bg-white/80 backdrop-blur-md rounded-lg shadow-lg p-4">
            <BookingBar />
          </div>
        </div>
      </section>

      {/* Booking bar (mobile only, below hero image) */}
      <div className="block md:hidden section -mt-8 z-20 relative w-full max-w-lg mx-auto bg-white shadow-md rounded-lg p-4">
        <BookingBar />
      </div>

      {/* Requirements Section */}
      <section className="section bg-gray-50">
        <h2 className="text-2xl font-semibold text-center mb-6">
          What Do You Need to Rent?
        </h2>
        <div className="max-w-3xl mx-auto grid md:grid-cols-3 gap-6 text-center">
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <p className="text-blue-600 text-3xl mb-3">🪪</p>
            <h3 className="text-lg font-medium mb-2">Valid Driver’s License</h3>
            <p className="text-gray-600 text-sm">
              Must be 21+ with a current, valid driver’s license.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <p className="text-green-600 text-3xl mb-3">🛡️</p>
            <h3 className="text-lg font-medium mb-2">Full Coverage Insurance</h3>
            <p className="text-gray-600 text-sm">
              Proof of active full coverage insurance is required.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <p className="text-yellow-500 text-3xl mb-3">✅</p>
            <h3 className="text-lg font-medium mb-2">That’s It!</h3>
            <p className="text-gray-600 text-sm">
              Simple, fast process. No deposits or hidden fees — just book and go.
            </p>
          </div>
        </div>
        <div className="max-w-2xl mx-auto mt-6 text-center text-sm text-gray-700 bg-white shadow-sm p-4 rounded-lg">
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
          <div className="group rounded-xl overflow-hidden border bg-white hover:shadow-lg transition flex flex-col">
            <div className="relative h-40">
              <Image src="/sedan.jpg" alt="Sedans" fill className="object-cover" />
            </div>
            <div className="p-4 flex flex-col flex-1 text-center">
              <h3 className="text-lg font-medium">Sedans</h3>
              <p className="text-sm text-gray-600 flex-1">
                Comfortable, fuel-efficient cars for city and highway driving.
              </p>
              <Link
                href="/sedans"
                className="mt-4 inline-block bg-blue-600 text-white px-5 py-2 rounded-md text-sm hover:bg-blue-700"
              >
                Explore Sedans
              </Link>
            </div>
          </div>

          <div className="group rounded-xl overflow-hidden border bg-white hover:shadow-lg transition flex flex-col">
            <div className="relative h-40">
              <Image src="/suv.jpg" alt="SUVs" fill className="object-cover" />
            </div>
            <div className="p-4 flex flex-col flex-1 text-center">
              <h3 className="text-lg font-medium">SUVs</h3>
              <p className="text-sm text-gray-600 flex-1">
                Spacious and versatile, perfect for families or road trips.
              </p>
              <Link
                href="/suvs"
                className="mt-4 inline-block bg-blue-600 text-white px-5 py-2 rounded-md text-sm hover:bg-blue-700"
              >
                Explore SUVs
              </Link>
            </div>
          </div>

          <div className="group rounded-xl overflow-hidden border bg-white hover:shadow-lg transition flex flex-col">
            <div className="relative h-40">
              <Image src="/3row-suv.jpg" alt="3-Row SUVs" fill className="object-cover" />
            </div>
            <div className="p-4 flex flex-col flex-1 text-center">
              <h3 className="text-lg font-medium">3-Row SUVs</h3>
              <p className="text-sm text-gray-600 flex-1">
                Extra seating and storage for larger groups and longer journeys.
              </p>
              <Link
                href="/3row-suvs"
                className="mt-4 inline-block bg-blue-600 text-white px-5 py-2 rounded-md text-sm hover:bg-blue-700"
              >
                Explore 3-Row SUVs
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <Link
            href="/fleet"
            className="inline-block bg-gray-800 text-white px-8 py-4 rounded-md text-base font-medium hover:bg-gray-900"
          >
            🚗 Explore Entire Fleet
          </Link>
        </div>
      </section>

      {/* Featured Fleet Section */}
      <section className="section">
        <h2 className="text-2xl font-semibold mb-6 text-center">Featured Vehicles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "2014 Ford Fusion", price: 40, img: "/ford-fusion.png", slug: "ford-fusion" },
            { name: "2017 Hyundai Sonata", price: 45, img: "/hyundai-sonata.png", slug: "hyundai-sonata" },
            { name: "2017 Toyota RAV4", price: 55, img: "/toyota-rav4.png", slug: "toyota-rav4" },
          ].map((car, idx) => (
            <div key={idx} className="rounded-lg border bg-white shadow-md hover:shadow-lg transition overflow-hidden">
              <div className="relative h-48">
                <Image src={car.img} alt={car.name} fill className="object-cover" />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-medium">{car.name}</h3>
                <p className="text-gray-600">${car.price}/day</p>
                <Link
                  href={`/vehicles/${car.slug}`}
                  className="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
                >
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="section bg-gray-50 text-center">
        <h2 className="text-2xl font-semibold mb-8">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <p className="text-blue-600 text-3xl mb-3">📅</p>
            <h3 className="font-medium">1. Pick Your Dates & Car</h3>
            <p className="text-gray-600 text-sm mt-2">
              Select your rental period and vehicle that best fits your trip.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <p className="text-green-600 text-3xl mb-3">💰</p>
            <h3 className="font-medium">2. Get Instant Quote</h3>
            <p className="text-gray-600 text-sm mt-2">
              Our system gives you a transparent price right away.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <p className="text-indigo-600 text-3xl mb-3">📲</p>
            <h3 className="font-medium">3. Quick Confirmation</h3>
            <p className="text-gray-600 text-sm mt-2">
              After you submit, we’ll reach back out with pickup instructions.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <p className="text-yellow-500 text-3xl mb-3">🚗</p>
            <h3 className="font-medium">4. Confirm & Drive Away</h3>
            <p className="text-gray-600 text-sm mt-2">
              Complete your payment, and enjoy a stress-free pickup.
            </p>
          </div>
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
        <div className="max-w-3xl mx-auto bg-white shadow-md border rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold mb-3">Our Reputation</h2>
          <p className="text-yellow-500 text-2xl mb-2">★★★★★</p>
          <p className="text-gray-800 font-medium mb-6">
            We’re proud to have a <span className="font-bold">5-Star Rating</span> on Google
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
              <p className="text-yellow-500">★★★★★</p>
              <p className="mt-2 text-gray-700">
                &quot;Ashmaig Auto Rentals made everything simple. The SUV was spotless and pickup was fast!&quot;
              </p>
              <p className="mt-2 text-sm font-medium">— Sarah K.</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
              <p className="text-yellow-500">★★★★★</p>
              <p className="mt-2 text-gray-700">
                &quot;Best rental experience I’ve had in Phoenix. Transparent pricing and friendly service.&quot;
              </p>
              <p className="mt-2 text-sm font-medium">— James R.</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
              <p className="text-yellow-500">★★★★★</p>
              <p className="mt-2 text-gray-700">
                &quot;Loved the convenience and the clean car. Definitely booking here again!&quot;
              </p>
              <p className="mt-2 text-sm font-medium">— Maria L.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section bg-gray-50">
        <h2 className="text-2xl font-semibold text-center mb-8">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          <div>
            <h3 className="font-medium">Do I need a security deposit?</h3>
            <p className="text-gray-600 text-sm">
              No. We don’t require security deposits. Just bring your license and proof of full coverage insurance.
            </p>
          </div>
          <div>
            <h3 className="font-medium">Can I rent if I only have liability insurance?</h3>
            <p className="text-gray-600 text-sm">
              Yes. You can upgrade to full coverage through us. If that doesn’t work, we can set you up securely through Turo.
            </p>
          </div>
          <div>
            <h3 className="font-medium">What if I need to extend my rental?</h3>
            <p className="text-gray-600 text-sm">
              Extensions are simple. Just contact us, and we’ll adjust your booking with no hidden fees.
            </p>
          </div>
          <div>
            <h3 className="font-medium">Do you allow out-of-state travel?</h3>
            <p className="text-gray-600 text-sm">
              Yes, but let us know in advance so we can confirm insurance coverage.
            </p>
          </div>
          <div>
            <h3 className="font-medium">What’s your cancellation policy?</h3>
            <p className="text-gray-600 text-sm">
              Free cancellation, because we understand that your plans can change.
            </p>
          </div>
        </div>
      </section>

      {/* Location Map Section */}
      <section className="section">
        <h2 className="text-2xl font-semibold mb-4 text-center">Our Location</h2>
        <div className="w-full h-96">
          <iframe
            src="https://www.google.com/maps?q=3400+Sky+Harbor+Blvd,+Phoenix,+AZ&output=embed"
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