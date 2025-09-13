"use client";

export function Requirements() {
  return (
    <section className="section py-12">
      <h2 className="text-2xl font-semibold mb-4">Requirements</h2>
      <ul className="list-disc pl-6 space-y-2 text-gray-700">
        <li>Driver must be 21+ years old with a valid license</li>
        <li>Proof of insurance required</li>
        <li>Refundable deposit at pickup</li>
        <li>Payment methods: credit card or debit card</li>
      </ul>
    </section>
  );
}

export function LocationHours() {
  return (
    <section className="section py-12">
      <h2 className="text-2xl font-semibold mb-4">Location & Hours</h2>
      <p className="text-gray-700 mb-2">
        Pickup available in Phoenix, AZ metro area.
      </p>
      <p className="text-gray-700 mb-2">Hours: 8 AM – 8 PM, 7 days a week</p>
      <p className="text-gray-700">Contact: info@ashmaig.com | (602) 555-1234</p>
    </section>
  );
}

export function SocialProof() {
  return (
    <section className="section py-12">
      <h2 className="text-2xl font-semibold mb-4">What Renters Say</h2>
      <div className="bg-gray-100 rounded-lg p-6 shadow">
        <p className="text-lg font-bold text-yellow-500 mb-2">★★★★★</p>
        <p className="text-gray-700">
          “Super easy booking process. Car was spotless and pickup was quick.
          Will rent again!” – Sarah K.
        </p>
      </div>
    </section>
  );
}

export function FAQ() {
  return (
    <section className="section py-12">
      <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
      <div className="space-y-4">
        <div>
          <p className="font-medium">Do I need insurance?</p>
          <p className="text-gray-700">
            Yes, proof of insurance is required before pickup.
          </p>
        </div>
        <div>
          <p className="font-medium">What is the deposit?</p>
          <p className="text-gray-700">
            A refundable deposit is held at pickup and released upon safe return
            of the vehicle.
          </p>
        </div>
        <div>
          <p className="font-medium">Can I extend my booking?</p>
          <p className="text-gray-700">
            Yes, subject to availability. Contact us as soon as possible to
            extend.
          </p>
        </div>
      </div>
    </section>
  );
}