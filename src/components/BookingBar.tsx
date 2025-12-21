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
const MIN_RENTAL_DAYS = 30;

function daysBetween(startISO: string, endISO: string) {
  const start = new Date(`${startISO}T00:00:00`);
  const end = new Date(`${endISO}T00:00:00`);
  return Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
}

function phoneToTel(phone: string) {
  const digits = (phone || "").replace(/\D/g, "");
  if (!digits) return "";
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length >= 11) return `+${digits}`;
  return digits;
}

function todayISO() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function gaEvent(eventName: string, params: Record<string, any> = {}) {
  if (typeof window === "undefined") return;
  const gtag = (window as any).gtag;
  if (typeof gtag === "function") gtag("event", eventName, params);
}

export default function BookingBar() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [step, setStep] = useState<"form" | "verify">("form");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");

  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [payoutFile, setPayoutFile] = useState<File | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; msg: string }>(null);

  useEffect(() => {
    // console.log("BookingBar loaded");
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(null);

    if (!pickupDate || !dropoffDate) {
      setStatus({ ok: false, msg: "Please select both pickup and dropoff dates." });
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

    if (!licenseFile || !profileFile || !payoutFile) {
      setStatus({
        ok: false,
        msg: "Please upload all required documents (license + rideshare profile + latest payout).",
      });
      return;
    }

    setSubmitting(true);

    try {
      const fullName = `${firstName} ${lastName}`.trim();
      const phoneDigits = phoneToTel(phone);

      const basePayload = {
        name: fullName,
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        phone_digits: phoneDigits,
        pickup_date: pickupDate,
        dropoff_date: dropoffDate,
        license_url: "",
        insurance_url: "",
        payout_url: "",
      };

      const supabase = getSupabase();

      async function uploadFile(file: File, prefix: string) {
        if (!supabase) return "";
        const ext = file.name.split(".").pop() || "file";
        const filePath = `${prefix}_${Date.now()}.${ext}`;
        const { error } = await supabase.storage.from(BUCKET).upload(filePath, file);
        if (error) {
          console.error(`Upload ${prefix} failed:`, error.message);
          return "";
        }
        const { data } = supabase.storage.from(BUCKET).getPublicUrl(filePath);
        return data.publicUrl;
      }

      const licenseLink = await uploadFile(licenseFile, "license");
      const profileLink = await uploadFile(profileFile, "profile");
      const payoutLink = await uploadFile(payoutFile, "payout");

      const payload = {
        ...basePayload,
        license_url: licenseLink,
        insurance_url: profileLink,
        payout_url: payoutLink,
      };

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        payload,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

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
            eventSourceUrl: window.location.href,
          }),
        });

        const json = await capiRes.json().catch(() => null);
        if (json?.eventId) fbq("track", "SubmitApplication", {}, { eventID: json.eventId });
        else fbq("track", "SubmitApplication");
      } catch {
        fbq("track", "SubmitApplication");
      }

      gaEvent("generate_lead", {
        event_category: "Application",
        event_label: "BookingBar Submit",
      });

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
    // ✅ ONLY CHANGE: added mx-auto (centers nicely on mobile)
    <div className="w-full mx-auto bg-white dark:bg-slate-800 shadow-md border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex flex-col gap-4">
      {step === "form" && (
        <form ref={formRef} onSubmit={onSubmit} className="flex flex-col gap-4">
          <input
            required
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm bg-white dark:bg-slate-700 dark:border-gray-600 dark:text-gray-100"
          />
          <input
            required
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm bg-white dark:bg-slate-700 dark:border-gray-600 dark:text-gray-100"
          />
          <input
            required
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm bg-white dark:bg-slate-700 dark:border-gray-600 dark:text-gray-100"
          />
          <input
            required
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm bg-white dark:bg-slate-700 dark:border-gray-600 dark:text-gray-100"
          />

          {/* Pickup / Dropoff Dates */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Start Date
              </label>
              <input
                type="date"
                required
                min={todayISO()}
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="border rounded-md px-3 py-2 text-sm bg-white dark:bg-slate-700 dark:border-gray-600 dark:text-gray-100"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Return Date
              </label>
              <input
                type="date"
                required
                min={todayISO()}
                value={dropoffDate}
                onChange={(e) => setDropoffDate(e.target.value)}
                className="border rounded-md px-3 py-2 text-sm bg-white dark:bg-slate-700 dark:border-gray-600 dark:text-gray-100"
              />

              <p className="mt-2 text-xs text-gray-600 dark:text-gray-300">
                Minimum rental period is <strong>1 month (30 days)</strong>, but you&apos;re
                allowed to <strong>pay weekly</strong>. Please select a return date at least{" "}
                <strong>30 days</strong> after your start date.
              </p>
            </div>
          </div>

          {/* Upload fields */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-800 dark:text-gray-100">
              Upload Driver’s License
            </label>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              Clear photo or PDF of your valid driver’s license.
            </p>
            <input
              type="file"
              required
              accept="image/*,application/pdf"
              onChange={(e) => setLicenseFile(e.target.files?.[0] || null)}
              className="border rounded-md px-3 py-2 text-sm bg-white dark:bg-slate-700 dark:border-gray-600 dark:text-gray-100"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-800 dark:text-gray-100">
              Upload Rideshare Profile (Uber/Lyft)
            </label>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              Screenshot or PDF showing your active rideshare/delivery driver profile.
            </p>
            <input
              type="file"
              required
              accept="image/*,application/pdf"
              onChange={(e) => setProfileFile(e.target.files?.[0] || null)}
              className="border rounded-md px-3 py-2 text-sm bg-white dark:bg-slate-700 dark:border-gray-600 dark:text-gray-100"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-800 dark:text-gray-100">
              Upload Latest Payout
            </label>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              Screenshot or PDF of your most recent Uber/Lyft/Delivery payout statement.
            </p>
            <input
              type="file"
              required
              accept="image/*,application/pdf"
              onChange={(e) => setPayoutFile(e.target.files?.[0] || null)}
              className="border rounded-md px-3 py-2 text-sm bg-white dark:bg-slate-700 dark:border-gray-600 dark:text-gray-100"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="bg-green-600 text-white py-2 rounded-md"
          >
            {submitting ? "Submitting..." : "Submit Info"}
          </button>

          {status && (
            <p className={status.ok ? "text-green-600" : "text-red-600"}>
              {status.msg}
            </p>
          )}
        </form>
      )}

      {step === "verify" && (
        <div className="text-center text-green-600 font-medium">
          🎉 Thank you! We’ll contact you shortly.
        </div>
      )}
    </div>
  );
}