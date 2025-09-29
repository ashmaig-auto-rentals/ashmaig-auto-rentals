import Image from "next/image";

export default function FleetPage() {
  const vehicles = [
    // Sedans
    { name: "2020 Toyota Camry", price: 50, img: "/camry.png" },
    { name: "2017 Hyundai Sonata", price: 50, img: "/hyundai-sonata.png" },
    { name: "2014 Ford Fusion", price: 50, img: "/ford-fusion.png" },

    // SUVs
    { name: "2017 Toyota RAV4", price: 60, img: "/toyota-rav4.png" },
    { name: "2017 Honda CR-V", price: 60, img: "/honda-crv.png" },
    { name: "2019 Hyundai Santa Fe", price: 60, img: "/hyundai-santa-fe.png" },

    // 3-Row SUVs
    { name: "2019 Chevy Suburban", price: 70, img: "/chevy-suburban.png" },
    { name: "2020 Dodge Grand Caravan", price: 70, img: "/grand-caravan.png" },
    { name: "2022 Chrysler Pacifica", price: 70, img: "/chrysler-pacifica.png" },
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
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}