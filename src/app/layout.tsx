import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Ashmaig Auto Rentals",
  description: "Reliable, Long-Term Car Rentals in Phoenix, AZ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        {/* Header always at the top */}
        <Header />

        {/* Page content */}
        <main className="flex-1">{children}</main>

        {/* Footer always at the bottom */}
        <Footer />
      </body>
    </html>
  );
}