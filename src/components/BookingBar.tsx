"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

// ---- Supabase (graceful: uploads disabled if envs missing) ----
let _supabase: SupabaseClient | null = null;
function getSupabase(): SupabaseClient | null {
  if (_supabase) return _supabase;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    console.warn("⚠️ Supabase env vars missing; uploads will be skipped.");
    return null;
  }
  _supabase = createClient(url, key);
  return _supabase;
}

const BUCKET = "Insurance_Licenses";

export default function BookingBar() {
  const formRef = useRef<HTMLFormElement | null>(null);

  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [vehicleClass, setVehicleClass] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [step, setStep] = useState<"quote" | "book" | "verify">("quote");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const [insuranceFile, setInsuranceFile] = useState<File | null>(null);
  const [licenseUrl, setLicenseUrl] = useState<string | null>(null);
  const [insuranceUrl, setInsuranceUrl] = useState<string | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; msg: string }>(null);

  const vehicleOptions: Record<string, string[]> = {
    Sedan: ["2020 Toyota Camry", "2017 Hyundai Sonata", "2014 Ford Fusion"],
    SUV: ["2017 Toyota RAV4", "2017 Honda CR-V", "2019 Hyundai Santa Fe"],
    "3-Row SUV": ["2019 Chevy Suburban", "2020 Toyota Sienna", "2022 Chrysler Pacifica"],
  };

  const rates: Record<string, number> = { Sedan: 50, SUV: 60, "3-Row SUV": 70 };

  // Debug once on mount
  useEffect(() => {
    console.log("🔎 ENV CHECK");
    console.log("NEXT_PUBLIC_EMAILJS_SERVICE_ID:", process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID);
    console.log("NEXT_PUBLIC_EMAILJS_TEMPLATE_ID:", process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID);
    console.log("NEXT_PUBLIC_EMAILJS_PUBLIC_KEY:", process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
    console.log("NEXT_PUBLIC_SUPABASE_URL exists:", !!process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log("NEXT_PUBLIC_SUPABASE_ANON_KEY exists:", !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  }, []);

  const days = useMemo(() => {
    if (!pickup || !dropoff) return 0;
    const diff = Math.ceil(
      (new Date(dropoff).getTime() - new Date(pickup).getTime()) / (1000 * 60 * 60 * 24)
    );
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

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);

    console.log("🟢 SUBMIT START");

    try {
      // Prepare payload (before uploads for visibility)
      const basePayload = {
        name,
        email, // <- your template uses {{email}} for the "To" field
        phone,
        vehicle: vehicle || vehicleClass,
        pickup_date: pickup,
        dropoff_date: dropoff,
        days: String(days),
        quote: String(quote),
        license_url: "",   // will fill if uploaded
        insurance_url: "", // will fill if uploaded
      };
      console.log("📦 Base payload:", basePayload);

      // Uploads (optional)
      const supabase = getSupabase();
      async function uploadFile(file: File, prefix: string) {
        if (!supabase) {
          console.warn(`⏭️ Skipping ${prefix} upload (no Supabase).`);
          return "";
        }
        const ext = file.name.split(".").pop();
        const path = `${prefix}_${Date.now()}.${ext}`;
        console.log(`📤 Uploading ${prefix} → ${path}`);
        const { error } = await supabase.storage.from(BUCKET).upload(path, file);
        if (error) {
          console.error(`❌ Upload ${prefix} failed:`, error.message);
          return ""; // don’t throw; continue sending the email without links
        }
        const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
        console.log(`✅ Uploaded ${prefix}:`, data.publicUrl);
        return data.publicUrl;
      }

      const licenseLink = licenseFile ? await uploadFile(licenseFile, "license") : "";
      const insuranceLink = insuranceFile ? await uploadFile(insuranceFile, "insurance") : "";

      setLicenseUrl(licenseLink || null);
      setInsuranceUrl(insuranceLink || null);

      const payload = {
        ...basePayload,
        license_url: licenseLink,
        insurance_url: insuranceLink,
      };

      console.log("✉️ Sending EmailJS with payload:", payload);

      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

      const res = await emailjs.send(serviceId, templateId, payload, publicKey);

      console.log("✅ EmailJS response:", res); // { status, text }

      setStatus({ ok: true, msg: "Booking submitted successfully!" });
      setStep("verify");
    } catch (err) {
      console.error("❌ Booking failed:", err);
      setStatus({ ok: false, msg: "Error submitting booking." });
    } finally {
      setSubmitting(false);
      console.log("🔚 SUBMIT END");
    }
  }

  return (
    <div className="w-full bg-white dark:bg-slate-800 shadow-md border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex flex-col gap-4 text-gray-900 dark:text-gray-100">
      {/* Step 1: Quote */}
      {step === "quote" && (
        <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:items-stretch">
          <div className="flex flex-col flex-1 min-w-[180px]">
            <label className="text-sm font-medium">Pick-up Date</label>
            <input
              type="date"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="border rounded-md px-3 py-2 text-sm w-full h-10 bg-white dark:bg-slate-700 dark:border-gray-600 dark:text-gray-100"
            />
          </div>
          <div className="flex flex-col flex-1 min-w-[180px]">
            <label className="text-sm font-medium">Drop-off Date</label>
            <input
              type="date"
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
              className="border rounded-md px-3 py-2 text-sm w-full h-10 bg-white dark:bg-slate-700 dark:border-gray-600 dark:text-gray-100"
            />
          </div>
          <div className="flex flex-col flex-1 min-w-[180px]">
            <label className="text-sm font-medium">Vehicle Class</label>
            <select
              value={vehicleClass}
              onChange={(e) => {
                setVehicleClass(e.target.value);
                setVehicle("");
              }}
              className="border rounded-md px-3 py-2 text-sm w-full h-10 bg-white dark:bg-slate-700 dark:border-gray-600 dark:text-gray-100"
            >
              <option value="">Choose Class</option>
              {Object.keys(vehicleOptions).map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col flex-1 min-w-[180px]">
            <label className="text-sm font-medium">Vehicle</label>
            <select
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
              disabled={!vehicleClass}
              className="border rounded-md px-3 py-2 text-sm w-full h-10 bg-white dark:bg-slate-700 dark:border-gray-600 dark:text-gray-100"
            >
              <option value="">Choose Vehicle</option>
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
            className="bg-blue-600 disabled:opacity-50 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium mt-2 md:mt-0 h-10"
          >
            Get Instant Quote
          </button>
        </div>
      )}

      {/* Step 2: Booking Form */}
      {step === "book" && (
        <form ref={formRef} onSubmit={onSubmit} className="flex flex-col gap-4">
          <p className="text-xl font-bold text-green-700 dark:text-green-400">
            ✅ Quote: ${quote} for {days} days
          </p>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border rounded-md px-3 py-2 text-sm bg-white dark:bg-slate-700 dark:border-gray-600 dark:text-gray-100"
          />

          <input
            type="email"
            placeholder="Email (you’ll receive confirmation)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border rounded-md px-3 py-2 text-sm bg-white dark:bg-slate-700 dark:border-gray-600 dark:text-gray-100"
          />

          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="border rounded-md px-3 py-2 text-sm bg-white dark:bg-slate-700 dark:border-gray-600 dark:text-gray-100"
          />

          {/* Upload license (optional) */}
          <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-md p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700">
            <span className="text-3xl">🪪</span>
            <span className="text-sm font-medium">Upload Driver’s License</span>
            <input
              type="file"
              onChange={(e) => setLicenseFile(e.target.files?.[0] || null)}
              accept="image/*,application/pdf"
              className="hidden"
            />
            {licenseFile && <span className="mt-1 text-xs">{licenseFile.name}</span>}
            {licenseUrl && (
              <a
                href={licenseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline text-xs"
              >
                View License
              </a>
            )}
          </label>

          {/* Upload insurance (optional) */}
          <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-md p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700">
            <span className="text-3xl">🛡️</span>
            <span className="text-sm font-medium">Upload Proof of Insurance</span>
            <input
              type="file"
              onChange={(e) => setInsuranceFile(e.target.files?.[0] || null)}
              accept="image/*,application/pdf"
              className="hidden"
            />
            {insuranceFile && <span className="mt-1 text-xs">{insuranceFile.name}</span>}
            {insuranceUrl && (
              <a
                href={insuranceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline text-xs"
              >
                View Insurance
              </a>
            )}
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-sm font-medium"
          >
            {submitting ? "Submitting..." : "Confirm Booking"}
          </button>

          {status && (
            <p
              className={
                status.ok
                  ? "text-green-600 dark:text-green-400 text-sm"
                  : "text-red-600 dark:text-red-400 text-sm"
              }
            >
              {status.msg}
            </p>
          )}
        </form>
      )}

      {/* Step 3: Confirmation */}
      {step === "verify" && (
        <div className="text-center text-green-700 dark:text-green-400 font-medium">
          🎉 Thank you! We’ve received your request and will reach out shortly with pickup details.
        </div>
      )}
    </div>
  );
}