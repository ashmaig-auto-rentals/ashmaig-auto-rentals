import Image from "next/image";

export default function ThreeRowSuvsPage() {
  const threeRow = [
    { name: "2019 Chevy Suburban", price: 70, img: "/chevy-suburban.png", slug: "chevy-suburban-2019" },
    { name: "2020 Dodge Grand Caravan", price: 70, img: "/grand-caravan.png", slug: "grand-caravan-2020" },
    { name: "2022 Chrysler Pacifica", price: 70, img: "/chrysler-pacifica.png", slug: "chrysler-pacifica-2022" },
  ];

  return (
    <main className="section bg-white text-gray-900 dark:bg-slate-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">3-Row SUVs & Vans</h1>
      <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
        Need extra seating and cargo space? Our 3-row SUVs and vans are perfect for family trips, 
        group travel, or anyone who wants maximum room with comfort.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {threeRow.map((car, idx) => (
          <div
            key={idx}
            className="rounded-lg border bg-white dark:bg-slate-800 dark:border-gray-700 shadow-md hover:shadow-lg transition overflow-hidden"
          >
            <div className="relative h-48">
              <Image src={car.img} alt={car.name} fill className="object-cover" />
            </div>
            <div className="p-4 text-center">
              <h3 className="font-medium text-gray-900 dark:text-gray-100">{car.name}</h3>
              <p className="text-gray-600 dark:text-gray-300">${car.price}/day</p>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action Section */}
      <section className="mt-16 bg-blue-600 text-white py-10 rounded-lg text-center">
        <h2 className="text-2xl font-semibold"> Rent a 7-Seater Today</h2>
        <p className="mt-2 text-lg">Same-day pickup · Flexible terms · All maintenance included</p>
        <a
          href="tel:6237772376"
          className="mt-6 inline-block bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100"
        >
          📞 Call 623-777-2376
        </a>
      </section>
    </main>
  );
}