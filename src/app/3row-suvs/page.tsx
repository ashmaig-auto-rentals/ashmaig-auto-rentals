import Image from "next/image";
import Link from "next/link";

export default function ThreeRowSuvsPage() {
  const threeRow = [
    { name: "2019 Chevy Suburban", price: 70, img: "/chevy-suburban.png", slug: "chevy-suburban-2019" },
    { name: "2020 Dodge Grand Caravan", price: 70, img: "/grand-caravan.png", slug: "grand-caravan-2020" },
    { name: "2022 Chrysler Pacifica", price: 70, img: "/chrysler-pacifica.png", slug: "chrysler-pacifica-2022" },
  ];

  return (
    <main className="section">
      <h1 className="text-3xl font-bold mb-6 text-center">3-Row SUVs & Vans</h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
        Need extra seating and cargo space? Our 3-row SUVs and vans are perfect for family trips, 
        group travel, or anyone who wants maximum room with comfort.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {threeRow.map((car, idx) => (
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