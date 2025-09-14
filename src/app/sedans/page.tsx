import Image from "next/image";
import Link from "next/link";

export default function SedansPage() {
  const sedans = [
    { name: "2020 Toyota Camry", price: 50, img: "/camry.png", slug: "camry-2020" },
    { name: "2017 Hyundai Sonata", price: 50, img: "/hyundai-sonata.png", slug: "hyundai-sonata-2017" },
    { name: "2014 Ford Fusion", price: 50, img: "/ford-fusion.png", slug: "ford-fusion-2014" },
  ];

  return (
    <main className="section">
      <h1 className="text-3xl font-bold text-center mb-10">Sedans</h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
        Our sedan lineup offers comfortable, fuel-efficient cars perfect for both city and highway driving.
        Reliable, clean, and affordable — great for everyday use or longer trips.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sedans.map((car, idx) => (
          <div
            key={idx}
            className="rounded-lg border bg-white shadow-md hover:shadow-lg transition overflow-hidden"
          >
            <div className="relative h-48">
              <Image
                src={car.img}
                alt={car.name}
                fill
                className="object-cover"
              />
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
    </main>
  );
}