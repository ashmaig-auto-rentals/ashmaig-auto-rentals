"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; msg: string }>(
    null
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current) return;

    setSubmitting(true);
    setStatus(null);

    try {
      const res = await emailjs.sendForm(
        "ashmaig_car_rentals", // ✅ Service ID
        "template_x244pjl",   // ✅ Template ID
        formRef.current,
        { publicKey: "MVjsK6K1NunTiBdOW" }
      );

      if (res.status === 200) {
        setStatus({ ok: true, msg: "✅ Message sent! We'll get back to you soon." });
        formRef.current.reset();
      } else {
        setStatus({ ok: false, msg: "⚠️ Failed to send. Please try again." });
      }
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus({ ok: false, msg: "⚠️ Error sending message. Try again." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto section dark:bg-slate-900 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Contact Us</h1>
      <p className="mb-10 text-gray-700 dark:text-gray-300 text-lg">
        We’d love to hear from you. Reach out directly or send us a message using the form below.
      </p>

      {/* Contact Cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {/* Call Us */}
        <div className="p-6 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-lg shadow-md text-center">
          <p className="text-3xl mb-3">📞</p>
          <h3 className="text-xl font-medium mb-2 dark:text-white">Call Us</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">Speak directly with our team.</p>
          <a
            href="tel:6237772376"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium"
          >
            623-777-2376
          </a>
        </div>

        {/* Email Us */}
        <div className="p-6 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-lg shadow-md text-center">
          <p className="text-3xl mb-3">✉️</p>
          <h3 className="text-xl font-medium mb-2 dark:text-white">Email Us</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Send us an email anytime and we’ll respond quickly.
          </p>
          <a
            href="mailto:info@ashmaigautorentals.com"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium"
          >
            info@ashmaig.com
          </a>
        </div>
      </div>

      {/* Contact Form */}
      <div className="p-6 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-lg shadow-md">
        <h3 className="text-xl font-medium mb-4 text-center dark:text-white">
          Or Send Us a Message
        </h3>
        <form ref={formRef} onSubmit={onSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium dark:text-gray-200">Name</label>
            <input
              type="text"
              name="name"
              required
              className="mt-1 w-full border dark:border-slate-700 rounded-md px-3 py-2 text-sm dark:bg-slate-900 dark:text-gray-100"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium dark:text-gray-200">Email</label>
            <input
              type="email"
              name="email"
              required
              className="mt-1 w-full border dark:border-slate-700 rounded-md px-3 py-2 text-sm dark:bg-slate-900 dark:text-gray-100"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium dark:text-gray-200">Message</label>
            <textarea
              name="message"
              rows={4}
              required
              className="mt-1 w-full border dark:border-slate-700 rounded-md px-3 py-2 text-sm dark:bg-slate-900 dark:text-gray-100"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium"
          >
            {submitting ? "Sending..." : "Send Message"}
          </button>

          {/* Status */}
          {status && (
            <p
              className={`mt-2 text-center ${
                status.ok ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              }`}
            >
              {status.msg}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}