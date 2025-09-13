// src/app/about/page.tsx
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <Image
          src="/desert-car.jpg"
          alt="About Ashmaig Auto Rentals"
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold">About Us</h1>
          <p className="mt-3 text-lg max-w-2xl mx-auto">
            Local, reliable, and customer-focused car rentals in Phoenix, AZ.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="section max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
        <p className="text-gray-700 leading-relaxed">
          Ashmaig Auto Rentals was founded with a simple mission: to make car
          rentals in Phoenix stress-free, transparent, and affordable. Tired of
          hidden fees, deposits, and long wait times, we set out to provide a
          service where every customer feels confident and cared for.
        </p>
      </section>

      {/* What Makes Us Different */}
      <section className="section bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-8">What Makes Us Unique</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <p className="text-blue-600 text-3xl mb-3">💸</p>
              <h3 className="font-medium">No Hidden Fees</h3>
              <p className="text-gray-600 text-sm mt-2">
                Transparent, all-in pricing. What you see is what you pay.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <p className="text-green-600 text-3xl mb-3">🚗</p>
              <h3 className="font-medium">Clean, Reliable Cars</h3>
              <p className="text-gray-600 text-sm mt-2">
                Well-maintained vehicles ready for your journey.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <p className="text-yellow-500 text-3xl mb-3">🤝</p>
              <h3 className="font-medium">Great Customer Service</h3>
              <p className="text-gray-600 text-sm mt-2">
                We pride ourselves on quick responses and personal care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="section max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-gray-700 leading-relaxed">
          To provide Phoenix drivers with affordable, convenient rentals that
          feel effortless — whether you need a car for a day, a week, or longer.
          We believe renting a car should be simple, transparent, and stress-free.
        </p>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-12 text-center">
        <h2 className="text-3xl font-bold">Ready to Rent With Us?</h2>
        <p className="mt-3 text-lg">
          Explore our fleet and find the perfect car for your needs.
        </p>
        <Link
          href="/fleet"
          className="mt-6 inline-block bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100"
        >
          🚗 View Fleet
        </Link>
      </section>

    </main>
  );
}