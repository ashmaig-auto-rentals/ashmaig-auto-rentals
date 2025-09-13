// src/components/BookingBar.tsx
"use client";

import { useRef, useState, useMemo } from "react";
import emailjs from "@emailjs/browser";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

// ---- Lazy init so SSR/prerender never runs createClient() ----
let _supabase: SupabaseClient | null = null;
function getSupabase(): SupabaseClient {
  if (_supabase) return _supabase;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Supabase env vars missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }
  _supabase = createClient(url, key);
  return _supabase;
}

const BUCKET = "Insurance_Licenses";

export default function BookingBar() {
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

  // File inputs (UI only)
  const [licenseName, setLicenseName] = useState<string>("");
  const [insuranceName, setInsuranceName] = useState<string>("");

  // Vehicle options
  const vehicleOptions: Record<string, string[]> = {
    Sedan: ["2020 Toyota Camry", "2017 Hyundai Sonata", "2014 Ford Fusion"],
    SUV: ["2017 Toyota RAV4", "2017 Honda CR-V", "2019 Hyundai Santa Fe"],
    "3-Row SUV": ["2019 Chevy Suburban", "2020 Toyota Sienna", "2022 Chrysler Pacifica"],
  };

  // Rates
  const rates: Readonly<Record<string, number>> = {
    Sedan: 50,
    SUV: 60,
    "3-Row SUV": 70,
  };

  // Days & Quote
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
  }, [vehicleClass, days]);

  function canQuote() {
    return Boolean(pickup && dropoff && vehicleClass && vehicle && days > 0);
  }

  function goToBook() {
    if (!canQuote()) return;
    setStep("book");
    setStatus(null);
  }

  // Supabase upload helper
  async function uploadToBucket(file: File, prefix: string) {
    const supabase = getSupabase();
    const fileName = `${prefix}-${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from(BUCKET).upload(fileName, file);
    if (error) throw error;
    const {
      data: { publicUrl },
    } = supabase.storage.from(BUCKET).getPublicUrl(fileName);
    return publicUrl;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current) return;

    setSubmitting(true);
    setStatus(null);

    try {
      // Files
      const licenseFile = (formRef.current.querySelector('input[name="license"]') as HTMLInputElement)?.files?.[0];
      const insuranceFile = (formRef.current.querySelector('input[name="insurance"]') as HTMLInputElement)?.files?.[0];

      let license_url = "";
      let insurance_url = "";

      if (licenseFile) license_url = await uploadToBucket(licenseFile, "license");
      if (insuranceFile) insurance_url = await uploadToBucket(insuranceFile, "insurance");

      // EmailJS params
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
        "ashmaig_car_rentals",
        "template_xiabahn",
        params,
        { publicKey: "MVjsK6K1NunTiBdOW" }
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
    <div className="w-full bg-white shadow-md border rounded-lg p-6 flex flex-col gap-6">
      {/* Step 1: Quote */}
      {step === "quote" && (
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex flex-col flex-1">
            <label className="text-sm font-medium">Pick-up</label>
            <input type="date" value={pickup} onChange={(e) => setPickup(e.target.value)} className="border rounded-md px-3 py-2 text-sm" />
          </div>
          <div className="flex flex-col flex-1">
            <label className="text-sm font-medium">Drop-off</label>
            <input type="date" value={dropoff} onChange={(e) => setDropoff(e.target.value)} className="border rounded-md px-3 py-2 text-sm" />
          </div>
          <div className="flex flex-col flex-1">
            <label className="text-sm font-medium">Vehicle Class</label>
            <select
              value={vehicleClass}
              onChange={(e) => {
                setVehicleClass(e.target.value);
                setVehicle("");
              }}
              className="border rounded-md px-3 py-2 text-sm"
            >
              <option value="">Select Vehicle Class</option>
              {Object.keys(vehicleOptions).map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col flex-1">
            <label className="text-sm font-medium">Vehicle</label>
            <select
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
              className="border rounded-md px-3 py-2 text-sm"
              disabled={!vehicleClass}
            >
              <option value="">Select Vehicle</option>
              {vehicleClass &&
                vehicleOptions[vehicleClass]?.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
            </select>
          </div>
          <button
            onClick={goToBook}
            disabled={!canQuote()}
            className="bg-blue-600 disabled:opacity-50 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium"
          >
            Get Instant Quote
          </button>
        </div>
      )}

      {/* Step 2: Booking */}
      {step === "book" && (
        <form ref={formRef} onSubmit={onSubmit} className="space-y-4">
          <div className="text-lg font-semibold text-green-700">Quote: ${quote} ({days} days)</div>

          <div>
            <label className="block text-sm font-medium">Name</label>
            <input name="name" type="text" className="mt-1 border rounded-md px-3 py-2 text-sm w-full" required />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input name="email" type="email" className="mt-1 border rounded-md px-3 py-2 text-sm w-full" required />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input name="phone" type="tel" className="mt-1 border rounded-md px-3 py-2 text-sm w-full" required />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-md p-4 cursor-pointer hover:bg-gray-50">
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

            <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-md p-4 cursor-pointer hover:bg-gray-50">
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

          <div className="flex gap-3">
            <button type="button" onClick={() => setStep("quote")} className="px-4 py-2 rounded-lg border text-sm" disabled={submitting}>
              Back
            </button>
            <button type="submit" disabled={submitting} className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-6 py-2 rounded-lg text-sm font-medium">
              {submitting ? "Sending..." : "Confirm Booking"}
            </button>
          </div>

          {status && <p className={status.ok ? "text-green-700" : "text-red-700"}>{status.msg}</p>}
        </form>
      )}

      {/* Step 3: Verify */}
      {step === "verify" && (
        <div className="text-center">
          <h3 className="text-xl font-semibold text-green-700 mb-2">Thank you! 🎉</h3>
          <p className="text-gray-700 mb-4">
            We’ve received your request. We’ll reach out shortly with payment and pickup instructions.
          </p>
          <button onClick={() => setStep("quote")} className="mt-3 bg-blue-600 text-white px-6 py-2 rounded-lg text-sm hover:bg-blue-700">
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}