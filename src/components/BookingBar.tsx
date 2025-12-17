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

// ✅ Day difference helper
function daysBetween(startISO: string, endISO: string) {
  const start = new Date(`${startISO}T00:00:00`);
  const end = new Date(`${endISO}T00:00:00`);
  return Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
}

// ✅ Phone helper
function phoneToTel(phone: string) {
  const digits = (phone || "").replace(/\D/g, "");
  if (!digits) return "";
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length >= 11) return `+${digits}`;
  return digits;
}

// ✅ Today helper
function todayISO() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

// ✅ GA4 helper
function gaEvent(eventName: string, params: Record<string, any> = {}) {
  if (typeof window === "undefined") return;
  const gtag = (window as any).gtag;
  if (typeof gtag === "function") {
    gtag("event", eventName, params);
  }
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

  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; msg: string }>(
    null
  );

  useEffect(() => {
    console.log("BookingBar loaded");
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(null);

    if (!pickupDate || !dropoffDate) {
      setStatus({ ok: false, msg: "Please select both dates." });
      return;
    }

    const rentalDays = daysBetween(pickupDate, dropoffDate);
    if (rentalDays < MIN_RENTAL_DAYS) {
      setStatus({
        ok: false,
        msg: "Minimum rental period is 30 days.",
      });
      return;
    }

    if (!licenseFile || !profileFile) {
      setStatus({
        ok: false,
        msg: "Please upload both required documents.",
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
      };

      const supabase = getSupabase();

      async function uploadFile(file: File, prefix: string) {
        if (!supabase) return "";
        const ext = file.name.split(".").pop();
        const path = `${prefix}_${Date.now()}.${ext}`;
        const { error } = await supabase.storage.from(BUCKET).upload(path, file);
        if (error) return "";
        const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
        return data.publicUrl;
      }

      const licenseLink = await uploadFile(licenseFile, "license");
      const profileLink = await uploadFile(profileFile, "profile");

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          ...basePayload,
          license_url: licenseLink,
          insurance_url: profileLink,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      // ✅ Meta Pixel + CAPI
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
        if (json?.eventId) {
          fbq("track", "SubmitApplication", {}, { eventID: json.eventId });
        } else {
          fbq("track", "SubmitApplication");
        }
      } catch {
        fbq("track", "SubmitApplication");
      }

      // ✅ GA4 conversion (IMPORT THIS INTO GOOGLE ADS)
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
    <div className="w-full bg-white dark:bg-slate-800 shadow-md border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex flex-col gap-4">
      {step === "form" && (
        <form ref={formRef} onSubmit={onSubmit} className="flex flex-col gap-4">
          <input
            required
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border rounded px-3 py-2"
          />
          <input
            required
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border rounded px-3 py-2"
          />
          <input
            required
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded px-3 py-2"
          />
          <input
            required
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border rounded px-3 py-2"
          />

          <input
            type="date"
            required
            min={todayISO()}
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            className="border rounded px-3 py-2"
          />
          <input
            type="date"
            required
            min={todayISO()}
            value={dropoffDate}
            onChange={(e) => setDropoffDate(e.target.value)}
            className="border rounded px-3 py-2"
          />

          <input
            type="file"
            required
            accept="image/*,application/pdf"
            onChange={(e) => setLicenseFile(e.target.files?.[0] || null)}
          />
          <input
            type="file"
            required
            accept="image/*,application/pdf"
            onChange={(e) => setProfileFile(e.target.files?.[0] || null)}
          />

          <button
            type="submit"
            disabled={submitting}
            className="bg-green-600 text-white py-2 rounded"
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