// src/app/blog/why-unlimited-miles-matter-holiday-phoenix/page.tsx

import Link from "next/link";
import BookingBar from "@/components/BookingBar";

export const metadata = {
  title:
    "Why Unlimited-Miles Rentals Matter Most During the Holiday Season in Phoenix | Ashmaig Auto Rentals",
  description:
    "During the holiday rush in Phoenix, unlimited-miles rentals give Uber, Lyft, and delivery drivers the freedom and predictability to maximize earnings without worrying about mileage caps.",
  alternates: {
    canonical:
      "https://ashmaig.com/blog/why-unlimited-miles-matter-holiday-phoenix",
  },
  openGraph: {
    title:
      "Why Unlimited-Miles Rentals Matter Most During the Holiday Season in Phoenix | Ashmaig Auto Rentals",
    description:
      "Unlimited-miles rental cars with predictable weekly rates — perfect for Phoenix rideshare and delivery drivers during the holiday rush.",
    type: "article",
    url: "https://ashmaig.com/blog/why-unlimited-miles-matter-holiday-phoenix",
    siteName: "Ashmaig Auto Rentals",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Why Unlimited-Miles Rentals Matter Most During the Holiday Season in Phoenix | Ashmaig Auto Rentals",
    description:
      "No mileage caps, no surprise overage fees — why unlimited-miles rentals are ideal for Phoenix gig drivers during the holiday season.",
  },
};

export default function UnlimitedMilesHolidayPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "Why Unlimited-Miles Rentals Matter Most During the Holiday Season in Phoenix",
    description:
      "Why unlimited-miles rental cars help Phoenix rideshare and delivery drivers keep more profit and avoid surprise fees during the holiday rush.",
    author: {
      "@type": "Organization",
      name: "Ashmaig Auto Rentals",
      url: "https://ashmaig.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Ashmaig Auto Rentals",
      url: "https://ashmaig.com",
      logo: {
        "@type": "ImageObject",
        url: "https://ashmaig.com/android-chrome-512x512.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id":
        "https://ashmaig.com/blog/why-unlimited-miles-matter-holiday-phoenix",
    },
    inLanguage: "en-US",
    articleSection: "Rideshare & Delivery Tips",
  };

  const businessName = "Ashmaig Auto Rentals";
  const phone = "(623) 777-2376";

  return (
    <main className="bg-white text-gray-900 dark:bg-slate-900 dark:text-gray-100">
      {/* SEO: Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Breadcrumbs */}
        <nav className="mb-6 text-sm text-gray-500 dark:text-gray-400">
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
            </li>
            <li className="mx-1">/</li>
            <li>
              <Link href="/blog" className="hover:text-blue-600">
                Blog
              </Link>
            </li>
            <li className="mx-1">/</li>
            <li className="font-medium text-gray-700 dark:text-gray-200">
              Why Unlimited-Miles Rentals Matter This Holiday Season
            </li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <p className="text-xs uppercase tracking-wide text-blue-600 font-semibold mb-2">
            Rideshare &amp; Delivery Tips · Phoenix, AZ
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
            Why Unlimited-Miles Rentals Matter Most During the Holiday Season in
            Phoenix
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
            <span>By {businessName}</span>
            <span>•</span>
            <span>Updated for 2025 Holiday Season</span>
          </div>
        </header>

        {/* Intro */}
        <div className="mb-10 rounded-2xl border border-gray-200/70 dark:border-slate-700/70 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 p-5 sm:p-7">
          <p className="text-base sm:text-lg leading-relaxed">
            The holiday season in Phoenix means long hours, heavy traffic, and
            more miles than usual — especially if you drive for Uber, Lyft, or
            the major delivery apps. When demand spikes across the Valley, the
            last thing you want to worry about is hitting a mileage cap on your
            rental.
          </p>
          <p className="mt-4 text-base sm:text-lg leading-relaxed">
            That&apos;s why{" "}
            <span className="font-semibold">
              unlimited-miles rentals from {businessName}
            </span>{" "}
            are such a big deal during the holiday rush. Instead of counting
            miles, you can focus on one thing: making as much as possible while
            the season is hot.
          </p>
        </div>

        <article className="prose prose-gray dark:prose-invert max-w-none">
          {/* 1. No caps on your busiest weeks */}
          <h2 className="text-2xl font-semibold mt-10 mb-4">
            1. No Mileage Caps During Your Busiest Weeks
          </h2>
          <p>
            Holidays are when many drivers push the hardest — stacking long
            shifts, driving across town for better bonuses, and taking every
            profitable trip that comes in. A rental with a daily or weekly
            mileage limit can turn that hustle into stress:
          </p>
          <ul>
            <li>Worrying about &quot;saving miles&quot; for later in the week.</li>
            <li>Turning down good long-distance trips to avoid overage fees.</li>
            <li>Constantly checking the odometer instead of focusing on rides.</li>
          </ul>
          <p>
            With an unlimited-miles rental, you&apos;re free to do what actually
            makes money: stay online during peak hours, accept profitable trips,
            and move where demand is strongest.
          </p>

          {/* 2. Predictable weekly costs */}
          <h2 className="text-2xl font-semibold mt-10 mb-4">
            2. Predictable Weekly Costs — No Overage Surprises
          </h2>
          <p>
            Limited-mileage rentals often look cheap up front, but once you go
            over the cap, those extra miles can add up fast. When you&apos;re
            working holiday-level hours, overages can eat into an entire day of
            profit.
          </p>
          <p>
            With a flat-rate, unlimited-miles setup, your rental cost stays the
            same whether you drive 500 miles or 1,500 miles that week. That
            makes it much easier to:
          </p>
          <ul>
            <li>Plan your schedule around profit, not mileage.</li>
            <li>Estimate your true hourly earnings after expenses.</li>
            <li>Stack bonuses and incentives without fear of hidden rental fees.</li>
          </ul>

          {/* 3. Freedom to chase demand across the Valley */}
          <h2 className="text-2xl font-semibold mt-10 mb-4">
            3. Freedom to Chase Holiday Demand Across the Phoenix Metro
          </h2>
          <p>
            Holiday demand doesn&apos;t stay in one neighborhood. One day, most
            of your orders might be in Scottsdale and Tempe. Another day, the
            money might be at Westgate, Downtown Phoenix, or around the airport.
          </p>
          <p>
            Unlimited miles give you the flexibility to reposition wherever
            demand is strongest:
          </p>
          <ul>
            <li>
              Head to <span className="font-semibold">PHX Sky Harbor</span> when
              flights are arriving.
            </li>
            <li>
              Shift toward <span className="font-semibold">Scottsdale</span> or{" "}
              <span className="font-semibold">Tempe</span> for nightlife and
              dinner rush.
            </li>
            <li>
              Move to <span className="font-semibold">Glendale / Westgate</span>{" "}
              on game or event nights.
            </li>
          </ul>
          <p>
            You don&apos;t have to think, &quot;Is this drive across town worth the
            extra miles?&quot; You just go where the money is.
          </p>

          {/* 4. Better for mixed rideshare + delivery work */}
          <h2 className="text-2xl font-semibold mt-10 mb-4">
            4. Perfect for Mixing Rideshare and Delivery Apps
          </h2>
          <p>
            Many Phoenix drivers run{" "}
            <span className="font-semibold">
              multiple apps at once — Uber, Lyft, DoorDash, Instacart, Uber
              Eats, Grubhub
            </span>{" "}
            and more. That usually means more miles, more re-positioning, and
            more trips per day.
          </p>
          <p>
            Unlimited-miles rentals pair perfectly with this multi-app strategy:
          </p>
          <ul>
            <li>
              Take long Instacart or Costco runs without worrying about extra
              distance.
            </li>
            <li>
              Jump between food delivery hotspots and airport or bar zones as
              demand shifts.
            </li>
            <li>Let your apps dictate your moves — not your mileage cap.</li>
          </ul>

          {/* 5. Protect your personal vehicle */}
          <h2 className="text-2xl font-semibold mt-10 mb-4">
            5. Protect Your Personal Car From Holiday Wear and Tear
          </h2>
          <p>
            The holiday season is exactly when many people don&apos;t want to put
            thousands of extra miles on their personal vehicle — but still want
            to cash in on the demand.
          </p>
          <p>
            Using a dedicated rental for gig work means:
          </p>
          <ul>
            <li>
              Your personal car isn&apos;t absorbing holiday traffic damage, door
              dings, and potholes.
            </li>
            <li>
              High-mileage weeks don&apos;t affect the long-term value of your own
              vehicle.
            </li>
            <li>
              Maintenance, wear and tear, and uptime are baked into the rental
              plan instead of your personal budget.
            </li>
          </ul>

          {/* Final thoughts */}
          <h2 className="text-2xl font-semibold mt-10 mb-4">
            Final Thoughts: Unlimited Miles = Less Stress, More Earnings
          </h2>
          <p>
            During the holiday season, your focus should be on{" "}
            <span className="font-semibold">
              driving smart hours in the best zones
            </span>
            , not calculating your remaining mileage allowance. Unlimited-miles
            rentals give Phoenix drivers the ability to push hard when demand is
            highest, without surprise fees or extra calculations.
          </p>
          <p>
            If you&apos;re planning to work the holiday rush this year and want a
            setup built for Uber, Lyft, and delivery apps, an unlimited-miles
            rental from {businessName} can be a huge advantage.
          </p>
        </article>

        {/* CTA — Call Us + Booking Form */}
        <section className="mt-12 sm:mt-16">
          <div className="rounded-2xl border border-blue-100 dark:border-blue-900 bg-blue-50/80 dark:bg-slate-800/80 p-6 sm:p-8">
            <h3 className="text-2xl font-semibold mb-4">
              Ready to drive without limits this holiday?
            </h3>

            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-200 mb-6">
              Apply for an unlimited-miles, rideshare-ready rental and make the
              most of Phoenix&apos;s holiday demand. Call or text us — or send
              your application through the form below.
            </p>

            {/* CALL US BUTTON */}
            <a
              href={`tel:${phone.replace(/[^\d]/g, "")}`}
              className="mb-6 inline-flex items-center justify-center w-full sm:w-auto rounded-xl px-6 py-3 text-base font-semibold bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              📞 Call Us: {phone}
            </a>

            {/* BOOKING / APPLICATION FORM */}
            <div className="mt-6 bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
              <h4 className="text-lg font-semibold mb-3">
                Apply to get a car now
              </h4>
              <BookingBar />
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}