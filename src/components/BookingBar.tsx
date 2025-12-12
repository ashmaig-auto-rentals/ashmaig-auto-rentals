"use client";

import { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { fbq } from "@/lib/fbpixel";

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

// ✅ Minimum rental requirement
const MIN_RENTAL_DAYS = 30;

// ✅ Day difference helper for YYYY-MM-DD inputs
function daysBetween(startISO: string, endISO: string) {
  const start = new Date(`${startISO}T00:00:00`);
  const end = new Date(`${endISO}T00:00:00`);
  return Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
}

// ✅ Phone helper: converts "(623) 777-2376" -> "+16237772376"
function phoneToTel(phone: string) {
  const digits = (phone || "").replace(/\D/g, "");
  if (!digits) return "";
  // US 10-digit -> +1
  if (digits.length === 10) return `+1${digits}`;
  // 11+ digits -> assume includes country code
  if (digits.length >= 11) return `+${digits}`;
  return digits;
}

// ✅ Today in YYYY-MM-DD (for input min=)
function todayISO() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export default function BookingBar() {
  const formRef = useRef<HTMLFormElement | null>(null);

  const [step, setStep] = useState<"form" | "verify">("form");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Pickup / Dropoff dates
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");

  // REQUIRED files
  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const [profileFile, setProfileFile] = useState<File | null>(null);

  const [licenseUrl, setLicenseUrl] = useState<string | null>(null);
  const [profileUrl, setProfileUrl] = useState<string | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; msg: string }>(
    null
  );

  useEffect(() => {
    console.log("Env variables loaded.");
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(null);

    // ✅ Date checks (and minimum 1 month)
    if (!pickupDate || !dropoffDate) {
      setStatus({
        ok: false,
        msg: "Please select both a pickup date and a dropoff date.",
      });
      return;
    }

    const rentalDays = daysBetween(pickupDate, dropoffDate);
    if (rentalDays < MIN_RENTAL_DAYS) {
      setStatus({
        ok: false,
        msg: "Minimum rental period is 1 month (30 days). Weekly payments are allowed—please select a later dropoff date.",
      });
      return;
    }

    // ❌ If files missing → block
    if (!licenseFile || !profileFile) {
      setStatus({
        ok: false,
        msg: "Please upload BOTH your Driver’s License and Rideshare Profile.",
      });
      return;
    }

    setSubmitting(true);

    try {
      const fullName = `${firstName} ${lastName}`.trim();

      // ✅ This is what your email template should use in: href="tel:{{phone_digits}}"
      const phoneDigits = phoneToTel(phone);

      const basePayload = {
        name: fullName,
        first_name: firstName,
        last_name: lastName,
        email,
        phone, // formatted for display
        phone_digits: phoneDigits, // ✅ digits-only + country code for tel: link
        pickup_date: pickupDate,
        dropoff_date: dropoffDate,
        license_url: "",
        insurance_url: "",
      };

      const supabase = getSupabase();

      async function uploadFile(file: File, prefix: string) {
        if (!supabase) return "";
        const ext = file.name.split(".").pop();
        const path = `${prefix}_${Date.now()}.${ext}`;
        const { error } = await supabase.storage.from(BUCKET).upload(path, file);
        if (error) {
          console.error(`Upload ${prefix} failed:`, error.message);
          return "";
        }
        const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
        return data.publicUrl;
      }

      const licenseLink = await uploadFile(licenseFile, "license");
      const profileLink = await uploadFile(profileFile, "profile");

      setLicenseUrl(licenseLink || null);
      setProfileUrl(profileLink || null);

      const payload = {
        ...basePayload,
        license_url: licenseLink,
        insurance_url: profileLink,
      };

      // Send EmailJS
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        payload,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      // Meta Pixel + CAPI
      try {
        const capiRes = await fetch("/api/submit-application", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            phone,
            pickupDate,
            dropoffDate,
            eventSourceUrl:
              typeof window !== "undefined" ? window.location.href : undefined,
          }),
        });

        const json = await capiRes.json().catch(() => null);
        if (json?.eventId) {
          fbq("track", "SubmitApplication", {}, { eventID: json.eventId });
        } else {
          fbq("track", "SubmitApplication");
        }
      } catch {
        fbq("track", "SubmitApplication");
      }

      setStatus({ ok: true, msg: "Submitted successfully!" });
      setStep("verify");
    } catch (err) {
      console.error(err);
      setStatus({ ok: false, msg: "Submission failed. Try again." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="w-full bg-white dark:bg-slate-800 shadow-md border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex flex-col gap-4 text-gray-900 dark:text-gray-100">
      {step === "form" && (
        <form ref={formRef} onSubmit={onSubmit} className="flex flex-col gap-4">
          {/* Name */}
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              placeholder="First Name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="flex-1 border rounded-md px-3 py-2 text-sm bg-white dark:bg-slate-700 dark:border-gray-600 dark:text-gray-100"
            />
            <input
              type="text"
              placeholder="Last Name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="flex-1 border rounded-md px-3 py-2 text-sm bg-white dark:bg-slate-700 dark:border-gray-600 dark:text-gray-100"
            />
          </div>

          {/* Contact */}
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm bg-white dark:bg-slate-700 dark:border-gray-600 dark:text-gray-100"
          />

          <input
            type="tel"
            required
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm bg-white dark:bg-slate-700 dark:border-gray-600 dark:text-gray-100"
          />

          {/* Pickup / Dropoff Dates */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Pickup Date
              </label>
              <input
                type="date"
                required
                min={todayISO()} // ✅ prevent past dates
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="border rounded-md px-3 py-2 text-sm bg-white dark:bg-slate-700 dark:border-gray-600 dark:text-gray-100"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Dropoff Date
              </label>
              <input
                type="date"
                required
                min={todayISO()} // ✅ prevent past dates
                value={dropoffDate}
                onChange={(e) => setDropoffDate(e.target.value)}
                className="border rounded-md px-3 py-2 text-sm bg-white dark:bg-slate-700 dark:border-gray-600 dark:text-gray-100"
              />

              {/* ✅ Visible policy text */}
              <p className="mt-2 text-xs text-gray-600 dark:text-gray-300">
                Minimum rental period is <strong>1 month (30 days)</strong>.
                Weekly payments are allowed. Please select a dropoff date at
                least 30 days after pickup.
              </p>
            </div>
          </div>

          {/* REQUIRED — Driver’s License */}
          <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-md p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700">
            <span className="text-3xl">🪪</span>
            <span className="text-sm font-medium text-red-600">
              Upload Driver’s License (Required)
            </span>
            <input
              type="file"
              required
              onChange={(e) => setLicenseFile(e.target.files?.[0] || null)}
              accept="image/*,application/pdf"
              className="hidden"
            />
            {licenseFile && (
              <span className="mt-1 text-xs">{licenseFile.name}</span>
            )}
          </label>

          {/* REQUIRED — Rideshare Profile */}
          <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-md p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700">
            <span className="text-3xl">📱</span>
            <span className="text-sm font-medium text-red-600">
              Upload Rideshare Profile (Required)
            </span>
            <input
              type="file"
              required
              onChange={(e) => setProfileFile(e.target.files?.[0] || null)}
              accept="image/*,application/pdf"
              className="hidden"
            />
            {profileFile && (
              <span className="mt-1 text-xs">{profileFile.name}</span>
            )}
          </label>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting || !licenseFile || !profileFile}
            className={`px-6 py-2 rounded-lg text-sm font-medium text-white ${
              submitting || !licenseFile || !profileFile
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {submitting ? "Submitting..." : "Submit Info"}
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

      {step === "verify" && (
        <div className="text-center text-green-700 dark:text-green-400 font-medium">
          🎉 Thank you! We’ve received your info and will contact you shortly.
        </div>
      )}
    </div>
  );
}