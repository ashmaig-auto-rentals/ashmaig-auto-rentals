import Image from "next/image";
import Link from "next/link";

export default function SuvsPage() {
  const suvs = [
    { name: "2017 Toyota RAV4", price: 55, img: "/toyota-rav4.png", slug: "toyota-rav4-2017" },
    { name: "2017 Honda CR-V", price: 55, img: "/honda-crv.png", slug: "honda-crv-2017" },
    { name: "2019 Hyundai Santa Fe", price: 60, img: "/hyundai-santafe.png", slug: "hyundai-santafe-2019" },
  ];

  return (
    <main className="section">
      <h1 className="text-3xl font-bold mb-6">SUVs</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {suvs.map((car, idx) => (
          <div
            key={idx}
            className="rounded-lg border bg-white shadow-md hover:shadow-lg transition overflow-hidden"
          >
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
    </main>
  );
}