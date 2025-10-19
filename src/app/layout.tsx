import "./globals.css";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";

// ✅ Dynamically import Header as a client component
const Header = dynamic(() => import("@/components/Header"), { ssr: false });

export const metadata: Metadata = {
  title:
    "Ashmaig Auto Rentals | Phoenix Car Rentals – Local Alternative to Hertz",
  description:
    "Ashmaig Auto Rentals in Phoenix, AZ. Debit card friendly, low deposits, flexible terms. The local alternative to Hertz with sedans, SUVs, and 3-row rentals.",
  keywords: [
    "Phoenix car rental",
    "Phoenix debit card car rental",
    "local alternative to Hertz",
    "SUV rental Phoenix",
    "long-term car rental Phoenix",
    "Ashmaig Auto Rentals",
  ],
  openGraph: {
    title:
      "Ashmaig Auto Rentals | Phoenix Car Rentals – Local Alternative to Hertz",
    description:
      "Rent cars in Phoenix with debit cards accepted, low deposits, and flexible rental terms. Local alternative to Hertz with sedans, SUVs, and 3-row vehicles.",
    url: "https://ashmaig.com",
    siteName: "Ashmaig Auto Rentals",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title:
      "Ashmaig Auto Rentals | Phoenix Car Rentals – Local Alternative to Hertz",
    description:
      "Debit card friendly rentals in Phoenix. Low deposits, transparent pricing, no hidden fees. SUVs, sedans, and 3-row rentals available today.",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        {/* ✅ Client-side interactive Header */}
        <Header />

        {/* Page content */}
        <main className="flex-1">{children}</main>

        {/* Footer always at the bottom */}
        <Footer />

        {/* ✅ JSON-LD Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CarRental",
              name: "Ashmaig Auto Rentals",
              "@id": "https://ashmaig.com",
              url: "https://ashmaig.com",
              telephone: "+16237772376",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Phoenix Sky Harbor Blvd",
                addressLocality: "Phoenix",
                addressRegion: "AZ",
                postalCode: "85034",
                addressCountry: "US",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}