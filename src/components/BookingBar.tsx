// src/components/BookingBar.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const BUCKET = "Insurance_Licenses";

export default function BookingBar() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  // Step state
  const [step, setStep] = useState<"quote" | "book" | "verify">("quote");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; msg: string }>(null);

  // Quote inputs
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [vehicleClass, setVehicleClass] = useState("");
  const [vehicle, setVehicle] = useState("");

  // File UI (names only for preview)
  const [licenseName, setLicenseName] = useState<string>("");
  const [insuranceName, setInsuranceName] = useState<string>("");

  // Vehicle options (unchanged)
  const vehicleOptions: Record<string, string[]> = {
    Sedan: ["2020 Toyota Camry", "2017 Hyundai Sonata", "2014 Ford Fusion"],
    SUV: ["2017 Toyota RAV4", "2017 Honda CR-V", "2019 Hyundai Santa Fe"],
    "3-Row SUV": ["2019 Chevy Suburban", "2020 Toyota Sienna", "2022 Chrysler Pacifica"],
  };

  // Rates (unchanged)
  const rates = useMemo(
    () =>
      ({
        Sedan: 50,
        SUV: 60,
        "3-Row SUV": 70,
      } as Record<string, number>),
    []
  );

  // Days & Quote (unchanged)
  const days = useMemo(() => {
    if (!pickup || !dropoff) return 0;
    const start = new Date(pickup);
    const end = new Date(dropoff);
    const ms = end.getTime() - start.getTime();
    const diff = Math.ceil(ms / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  }, [pickup, dropoff]);

  const quote = useMemo(() => {
    if (!vehicleClass || !days) return 0;
    return (rates[vehicleClass] ?? 0) * days;
  }, [vehicleClass, days, rates]);

  function canQuote() {
    return Boolean(pickup && dropoff && vehicleClass && vehicle && days > 0);
  }

  function goToBook() {
    if (!canQuote()) return;
    setStep("book");
    setStatus(null);
  }

  // Scroll the card into view when expanding to the booking step
  useEffect(() => {
    if (step !== "quote" && cardRef.current) {
      // Give layout a tick to expand, then scroll
      setTimeout(() => {
        cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  }, [step]);

  // Supabase upload helper (unchanged)
  async function uploadToBucket(file: File, prefix: string) {
    const fileName = `${prefix}-${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from(BUCKET).upload(fileName, file);
    if (error) throw error;

    const {
      data: { publicUrl },
    } = supabase.storage.from(BUCKET).getPublicUrl(fileName);

    return publicUrl;
  }

  // Submit (unchanged, except minor polish)
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current) return;

    setSubmitting(true);
    setStatus(null);

    try {
      const licenseFile = (formRef.current.querySelector('input[name="license"]') as HTMLInputElement)?.files?.[0];
      const insuranceFile = (formRef.current.querySelector('input[name="insurance"]') as HTMLInputElement)?.files?.[0];

      let license_url = "";
      let insurance_url = "";

      if (licenseFile) license_url = await uploadToBucket(licenseFile, "license");
      if (insuranceFile) insurance_url = await uploadToBucket(insuranceFile, "insurance");

      const params = {
        name: (formRef.current.querySelector('input[name="name"]') as HTMLInputElement)?.value || "",
        email: (formRef.current.querySelector('input[name="email"]') as HTMLInputElement)?.value || "",
        phone: (formRef.current.querySelector('input[name="phone"]') as HTMLInputElement)?.value || "",
        car: `${vehicleClass}${vehicle ? ` — ${vehicle}` : ""}`,
        pickup_date: pickup,
        dropoff_date: dropoff,
        quote: String(quote),
        days: String(days),
        license_url,
        insurance_url,
      };

      const res = await emailjs.send(
        "ashmaig_car_rentals",    // your EmailJS service ID
        "template_xiabahn",       // your booking template ID
        params,
        { publicKey: "MVjsK6K1NunTiBdOW" } // your EmailJS public key
      );

      if (res.status === 200) {
        setStatus({ ok: true, msg: "Thanks! We received your request and will reach out shortly." });
        setStep("verify");
        setLicenseName("");
        setInsuranceName("");
      } else {
        setStatus({ ok: false, msg: "Failed to send. Please try again." });
      }
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus({ ok: false, msg: "Error sending booking. Try again." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      ref={cardRef}
      className="w-full max-w-3xl md:max-w-5xl bg-white/95 backdrop-blur border rounded-xl shadow-lg p-4 md:p-6"
    >
      {/* STEP 1: QUOTE (mobile-first layout, very clear inputs) */}
      {step === "quote" && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 md:gap-4 items-end">
          {/* Pick-up */}
          <div className="md:col-span-1">
            <label className="text-sm font-medium flex items-center gap-1">
              <span className="text-lg">📅</span> Pick-up
            </label>
            <div className="relative">
              <input
                type="date"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="YYYY-MM-DD"
              />
            </div>
          </div>

          {/* Drop-off */}
          <div className="md:col-span-1">
            <label className="text-sm font-medium flex items-center gap-1">
              <span className="text-lg">📅</span> Drop-off
            </label>
            <div className="relative">
              <input
                type="date"
                value={dropoff}
                onChange={(e) => setDropoff(e.target.value)}
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="YYYY-MM-DD"
              />
            </div>
          </div>

          {/* Vehicle Class */}
          <div className="md:col-span-1">
            <label className="text-sm font-medium">Vehicle Class</label>
            <select
              value={vehicleClass}
              onChange={(e) => {
                setVehicleClass(e.target.value);
                setVehicle("");
              }}
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="">Select</option>
              {Object.keys(vehicleOptions).map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>

          {/* Vehicle */}
          <div className="md:col-span-2">
            <label className="text-sm font-medium">Vehicle</label>
            <select
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              disabled={!vehicleClass}
            >
              <option value="">{vehicleClass ? "Select Vehicle" : "Select Class First"}</option>
              {vehicleClass &&
                vehicleOptions[vehicleClass]?.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
            </select>
          </div>

          {/* Get Quote Button (full width on mobile) */}
          <div className="md:col-span-5">
            <button
              onClick={goToBook}
              disabled={!canQuote()}
              className="w-full md:w-auto bg-blue-600 disabled:opacity-50 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-sm font-medium"
            >
              Get Instant Quote
            </button>
          </div>

          {/* Subtle helper text */}
          <div className="md:col-span-5 text-xs text-gray-500">
            Choose pick-up & drop-off dates first — then vehicle class and specific vehicle.
          </div>
        </div>
      )}

      {/* STEP 2: BOOK (auto-scrolls into view) */}
      {step === "book" && (
        <form ref={formRef} onSubmit={onSubmit} className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="text-base md:text-lg font-semibold text-green-700">
              Quote: ${quote} ({days} {days === 1 ? "day" : "days"})
            </div>
            <button
              type="button"
              onClick={() => setStep("quote")}
              className="text-sm px-3 py-1 rounded-md border hover:bg-gray-50"
              disabled={submitting}
            >
              Change Details
            </button>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                name="name"
                type="text"
                className="mt-1 border rounded-md px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                name="email"
                type="email"
                className="mt-1 border rounded-md px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
                placeholder="name@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Phone</label>
              <input
                name="phone"
                type="tel"
                className="mt-1 border rounded-md px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
                placeholder="(###) ###-####"
              />
            </div>
          </div>

          {/* Uploads */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* License */}
            <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-md p-5 cursor-pointer hover:bg-gray-50">
              <span className="text-3xl">🪪</span>
              <span className="text-sm font-medium">Upload Driver’s License</span>
              <span className="text-xs text-gray-500">PNG, JPG, or PDF (max ~10MB)</span>
              <input
                name="license"
                type="file"
                accept="image/*,.pdf"
                className="hidden"
                required
                onChange={(e) => setLicenseName(e.target.files?.[0]?.name ?? "")}
              />
              {licenseName && <span className="mt-1 text-xs text-gray-600">Selected: {licenseName}</span>}
            </label>

            {/* Insurance */}
            <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-md p-5 cursor-pointer hover:bg-gray-50">
              <span className="text-3xl">🛡️</span>
              <span className="text-sm font-medium">Upload Proof of Insurance</span>
              <span className="text-xs text-gray-500">PNG, JPG, or PDF (max ~10MB)</span>
              <input
                name="insurance"
                type="file"
                accept="image/*,.pdf"
                className="hidden"
                required
                onChange={(e) => setInsuranceName(e.target.files?.[0]?.name ?? "")}
              />
              {insuranceName && <span className="mt-1 text-xs text-gray-600">Selected: {insuranceName}</span>}
            </label>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg text-sm font-medium"
            >
              {submitting ? "Sending..." : "Confirm Booking"}
            </button>
            {status && (
              <p className={status.ok ? "text-green-700" : "text-red-700"}>{status.msg}</p>
            )}
          </div>
        </form>
      )}

      {/* STEP 3: VERIFY */}
      {step === "verify" && (
        <div className="text-center">
          <h3 className="text-xl font-semibold text-green-700 mb-2">Thank you! 🎉</h3>
          <p className="text-gray-700 mb-4">
            We’ve received your request. We’ll reach out shortly with payment and pickup instructions.
          </p>
          <button
            onClick={() => setStep("quote")}
            className="mt-1 bg-blue-600 text-white px-6 py-2 rounded-lg text-sm hover:bg-blue-700"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}