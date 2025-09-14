import Image from "next/image";
import Link from "next/link";

export default function FleetPage() {
  const vehicles = [
    // Sedans
    { name: "2020 Toyota Camry", price: 50, img: "/toyota-camry-2020.png", slug: "camry-2020" },
    { name: "2017 Hyundai Sonata", price: 50, img: "/hyundai-sonata-2017.png", slug: "hyundai-sonata-2017" },
    { name: "2014 Ford Fusion", price: 50, img: "/ford-fusion-2014.png", slug: "ford-fusion-2014" },

    // SUVs
    { name: "2017 Toyota RAV4", price: 60, img: "/toyota-rav4-2017.png", slug: "toyota-rav4-2017" },
    { name: "2017 Honda CR-V", price: 60, img: "/honda-crv-2017.png", slug: "honda-crv-2017" },
    { name: "2019 Hyundai Santa Fe", price: 60, img: "/hyundai-santa-fe-2019.png", slug: "hyundai-santa-fe-2019" },

    // 3-Row SUVs
    { name: "2019 Chevy Suburban", price: 70, img: "/chevy-suburban-2019.png", slug: "chevy-suburban-2019" },
    { name: "2020 Toyota Sienna", price: 70, img: "/toyota-sienna-2020.png", slug: "toyota-sienna-2020" },
    { name: "2022 Chrysler Pacifica", price: 70, img: "/chrysler-pacifica-2022.png", slug: "chrysler-pacifica-2022" },
  ];

  return (
    <main className="section">
      <h1 className="text-3xl font-bold text-center mb-10 dark:text-white">
        Our Entire Fleet
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {vehicles.map((car, idx) => (
          <div
            key={idx}
            className="rounded-lg border bg-white dark:bg-slate-800 dark:border-gray-700 shadow-md hover:shadow-lg transition overflow-hidden"
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
              <h3 className="font-medium dark:text-white">{car.name}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                ${car.price}/day
              </p>
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