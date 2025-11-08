import Image from "next/image";

export default function SuvsPage() {
  const suvs = [
    { name: "2019 Hyundai Santa Fe", price: 60, img: "/hyundai-santa-fe.png", slug: "hyundai-santa-fe-2019" },
    { name: "2017 Honda CR-V", price: 60, img: "/honda-crv.png", slug: "honda-crv-2017" },
    { name: "2017 Toyota RAV4", price: 60, img: "/toyota-rav4.png", slug: "toyota-rav4-2017" },
  ];

  return (
    <main className="section bg-white text-gray-900 dark:bg-slate-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">SUVs</h1>
      <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
        Our SUV lineup combines space, versatility, and comfort — ideal for families, road trips, 
        or anyone needing extra room without sacrificing driving ease.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {suvs.map((car, idx) => (
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
        <h2 className="text-2xl font-semibold"> Rent an SUV Today</h2>
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