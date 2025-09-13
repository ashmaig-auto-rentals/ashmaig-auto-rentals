// src/components/BookingBar.tsx
"use client";

import { useRef, useState, useMemo } from "react";
import emailjs from "@emailjs/browser";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Lazy supabase init
let _supabase: SupabaseClient | null = null;
function getSupabase(): SupabaseClient {
  if (_supabase) return _supabase;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Supabase env vars missing");
  _supabase = createClient(url, key);
  return _supabase;
}

const BUCKET = "Insurance_Licenses";

export default function BookingBar() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [step, setStep] = useState<"quote" | "book" | "verify">("quote");

  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [vehicleClass, setVehicleClass] = useState("");
  const [vehicle, setVehicle] = useState("");

  const [licenseName, setLicenseName] = useState("");
  const [insuranceName, setInsuranceName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; msg: string }>(null);

  const vehicleOptions: Record<string, string[]> = {
    Sedan: ["2020 Toyota Camry", "2017 Hyundai Sonata", "2014 Ford Fusion"],
    SUV: ["2017 Toyota RAV4", "2017 Honda CR-V", "2019 Hyundai Santa Fe"],
    "3-Row SUV": ["2019 Chevy Suburban", "2020 Toyota Sienna", "2022 Chrysler Pacifica"],
  };

  const rates: Record<string, number> = {
    Sedan: 50,
    SUV: 60,
    "3-Row SUV": 70,
  };

  const days = useMemo(() => {
    if (!pickup || !dropoff) return 0;
    const diff = Math.ceil(
      (new Date(dropoff).getTime() - new Date(pickup).getTime()) /
        (1000 * 60 * 60 * 24)
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
    // ... your emailjs + supabase upload code unchanged ...
  }

  return (
    <div className="w-full bg-white shadow-md border rounded-lg p-6 flex flex-col gap-6">
      {/* Step 1: Quote */}
      {step === "quote" && (
        <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:items-end">
          {/* Pick-up */}
          <div className="flex flex-col flex-1 min-w-[150px]">
            <label className="text-sm font-medium">Pick-up Date</label>
            <input
              type="date"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              placeholder="Choose Pick-up Date"
              className="border rounded-md px-3 py-2 text-sm w-full"
            />
          </div>

          {/* Drop-off */}
          <div className="flex flex-col flex-1 min-w-[150px]">
            <label className="text-sm font-medium">Drop-off Date</label>
            <input
              type="date"
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
              placeholder="Choose Drop-off Date"
              className="border rounded-md px-3 py-2 text-sm w-full"
            />
          </div>

          {/* Vehicle Class */}
          <div className="flex flex-col flex-1 min-w-[150px]">
            <label className="text-sm font-medium">Vehicle Class</label>
            <select
              value={vehicleClass}
              onChange={(e) => {
                setVehicleClass(e.target.value);
                setVehicle("");
              }}
              className="border rounded-md px-3 py-2 text-sm w-full"
            >
              <option value="">Choose Class</option>
              {Object.keys(vehicleOptions).map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>

          {/* Vehicle */}
          <div className="flex flex-col flex-1 min-w-[150px]">
            <label className="text-sm font-medium">Vehicle</label>
            <select
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
              disabled={!vehicleClass}
              className="border rounded-md px-3 py-2 text-sm w-full"
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
            className="bg-blue-600 disabled:opacity-50 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium mt-2 md:mt-0"
          >
            Get Instant Quote
          </button>
        </div>
      )}

      {/* Step 2 + Step 3 stay unchanged */}
    </div>
  );
}