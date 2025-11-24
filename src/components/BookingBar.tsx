"use client";

import { useState, useRef, useEffect } from "react";
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

  // Single-step form now
  const [step, setStep] = useState<"form" | "verify">("form");

  // Contact info
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Files
  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const [profileFile, setProfileFile] = useState<File | null>(null); // rideshare profile
  const [licenseUrl, setLicenseUrl] = useState<string | null>(null);
  const [profileUrl, setProfileUrl] = useState<string | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; msg: string }>(null);

  // Debug once on mount
  useEffect(() => {
    console.log("🔎 ENV CHECK");
    console.log("NEXT_PUBLIC_EMAILJS_SERVICE_ID:", process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID);
    console.log("NEXT_PUBLIC_EMAILJS_TEMPLATE_ID:", process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID);
    console.log("NEXT_PUBLIC_EMAILJS_PUBLIC_KEY:", process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
    console.log("NEXT_PUBLIC_SUPABASE_URL exists:", !!process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log("NEXT_PUBLIC_SUPABASE_ANON_KEY exists:", !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);

    console.log("🟢 SUBMIT START");

    try {
      const fullName = `${firstName} ${lastName}`.trim();

      // Prepare payload (before uploads for visibility)
      const basePayload = {
        name: fullName,
        first_name: firstName,
        last_name: lastName,
        email, // your template likely uses {{email}} for the "To" field
        phone,
        // keep keys for compatibility with existing EmailJS template
        license_url: "",
        insurance_url: "", // will store rideshare profile URL
      };
      console.log("📦 Base payload:", basePayload);

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
      const profileLink = profileFile ? await uploadFile(profileFile, "profile") : "";

      setLicenseUrl(licenseLink || null);
      setProfileUrl(profileLink || null);

      const payload = {
        ...basePayload,
        license_url: licenseLink,
        // rideshare profile screenshot goes into insurance_url for template compatibility
        insurance_url: profileLink,
      };

      console.log("✉️ Sending EmailJS with payload:", payload);

      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

      const res = await emailjs.send(serviceId, templateId, payload, publicKey);

      console.log("✅ EmailJS response:", res); // { status, text }

      // 🔵 NEW: Fire Meta Conversions API Lead via server route
      try {
        await fetch("/api/apply", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            phone,
          }),
        });
      } catch (metaErr) {
        console.error("⚠️ Meta CAPI call failed (but form still submitted):", metaErr);
      }

      setStatus({ ok: true, msg: "Submitted successfully!" });
      setStep("verify");
    } catch (err) {
      console.error("❌ Submit failed:", err);
      setStatus({ ok: false, msg: "Error submitting. Please try again." });
    } finally {
      setSubmitting(false);
      console.log("🔚 SUBMIT END");
    }
  }

  return (
    <div className="w-full bg-white dark:bg-slate-800 shadow-md border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex flex-col gap-4 text-gray-900 dark:text-gray-100">
      {/* Step 1: Simple Intake Form */}
      {step === "form" && (
        <form ref={formRef} onSubmit={onSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="flex-1 border rounded-md px-3 py-2 text-sm bg-white dark:bg-slate-700 dark:border-gray-600 dark:text-gray-100"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="flex-1 border rounded-md px-3 py-2 text-sm bg-white dark:bg-slate-700 dark:border-gray-600 dark:text-gray-100"
            />
          </div>

          <input
            type="email"
            placeholder="Email"
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

          {/* Upload license */}
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

          {/* Upload rideshare profile */}
          <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-md p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700">
            <span className="text-3xl">📱</span>
            <span className="text-sm font-medium">Upload Rideshare Profile (Uber/Lyft)</span>
            <input
              type="file"
              onChange={(e) => setProfileFile(e.target.files?.[0] || null)}
              accept="image/*,application/pdf"
              className="hidden"
            />
            {profileFile && <span className="mt-1 text-xs">{profileFile.name}</span>}
            {profileUrl && (
              <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline text-xs"
              >
                View Rideshare Profile
              </a>
            )}
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-sm font-medium"
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

      {/* Step 2: Confirmation */}
      {step === "verify" && (
        <div className="text-center text-green-700 dark:text-green-400 font-medium">
          🎉 Thank you! We’ve received your info and will reach out shortly with next steps.
        </div>
      )}
    </div>
  );
}