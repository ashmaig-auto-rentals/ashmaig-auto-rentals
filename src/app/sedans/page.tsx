import Image from "next/image";

export default function SedansPage() {
  const sedans = [
    { name: "2020 Toyota Camry", price: 50, img: "/camry.png", slug: "camry-2020" },
    { name: "2017 Hyundai Sonata", price: 50, img: "/hyundai-sonata.png", slug: "hyundai-sonata-2017" },
    { name: "2014 Ford Fusion", price: 50, img: "/ford-fusion.png", slug: "ford-fusion-2014" },
  ];

  return (
    <main className="section bg-white text-gray-900 dark:bg-slate-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold text-center mb-10">Sedans</h1>
      <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
        Our sedan lineup offers comfortable, fuel-efficient cars perfect for both city and highway driving.
        Reliable, clean, and affordable — great for everyday use or longer trips.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sedans.map((car, idx) => (
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
        <h2 className="text-2xl font-semibold"> Rent a Sedan Today</h2>
        <p className="mt-2 text-lg">Fast approval · No hidden fees · Same-day pickup</p>
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