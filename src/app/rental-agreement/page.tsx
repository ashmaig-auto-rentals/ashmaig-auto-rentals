export default function RentalAgreementPage() {
  return (
    <main className="dark:bg-slate-900 dark:text-gray-200">
      {/* Hero Section */}
      <section className="relative bg-blue-600 text-white py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">Rental Agreement</h1>
        <p className="mt-3 text-lg max-w-2xl mx-auto">
          Please review the terms and conditions before booking with Ashmaig Rideshare Rentals.
        </p>
      </section>

      {/* Agreement Content */}
      <section className="section max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 dark:text-white">
          Terms &amp; Conditions
        </h2>
        <div className="space-y-6 text-gray-700 dark:text-gray-300">
          <div>
            <h3 className="font-medium text-lg mb-2 dark:text-white">
              1. Driver Requirements
            </h3>
            <p>
              All renters must be at least{" "}
              <span className="font-semibold">21 years of age</span>{" "}
              and present a valid driver&apos;s license at the time of rental.
              International licenses are accepted if accompanied by a passport.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-2 dark:text-white">2. Insurance</h3>
            <p>
              Proof of active{" "}
              <span className="font-semibold">full coverage insurance</span>{" "}
              is required. If you only carry liability, you may upgrade to full
              coverage through us or book securely via Turo.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-2 dark:text-white">3. Payment</h3>
            <p>
              Full payment is due at the time of booking. We accept all major
              credit and debit cards via our secure checkout system. No security
              deposits are required.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-2 dark:text-white">
              4. Vehicle Condition
            </h3>
            <p>
              Vehicles are provided clean, fueled, and inspected. Renters are
              responsible for returning the vehicle in the same condition.
              Smoking and pets are not permitted inside vehicles.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-2 dark:text-white">
              5. Mileage &amp; Travel
            </h3>
            <p>
              Rentals include a standard mileage allowance. Out-of-state travel
              must be disclosed in advance to confirm insurance coverage.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-2 dark:text-white">
              6. Extensions &amp; Cancellations
            </h3>
            <p>
              Extensions are simple &mdash; just contact us before your return
              date. Cancellations are free of charge, but please notify us as
              early as possible.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-2 dark:text-white">7. Liability</h3>
            <p>
              Ashmaig Auto Rentals is not responsible for lost or stolen items
              left in vehicles. Renters assume full responsibility for traffic
              violations, tolls, and accidents.
            </p>
          </div>
        </div>
      </section>

      {/* Signature/Acceptance Section */}
      <section className="section bg-gray-50 dark:bg-slate-800 text-center">
        <h2 className="text-2xl font-semibold mb-4 dark:text-white">
          Acknowledgement
        </h2>
        <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          By booking a vehicle with Ashmaig Auto Rentals, you agree to abide by
          the above rental agreement. A digital copy of this agreement will be
          provided via email upon booking confirmation.
        </p>
      </section>
    </main>
  );
}