"use client";

export default function EnvTest() {
  return (
    <div style={{ padding: "2rem", fontFamily: "monospace" }}>
      <h1>🔍 Env Vars Debug</h1>
      <p>
        <strong>NEXT_PUBLIC_SUPABASE_URL:</strong>{" "}
        {process.env.NEXT_PUBLIC_SUPABASE_URL || "❌ undefined"}
      </p>
      <p>
        <strong>NEXT_PUBLIC_SUPABASE_ANON_KEY:</strong>{" "}
        {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
          ? "✅ exists"
          : "❌ undefined"}
      </p>
      <p>
        <strong>NEXT_PUBLIC_EMAILJS_SERVICE_ID:</strong>{" "}
        {process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "❌ undefined"}
      </p>
      <p>
        <strong>NEXT_PUBLIC_EMAILJS_TEMPLATE_ID:</strong>{" "}
        {process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "❌ undefined"}
      </p>
      <p>
        <strong>NEXT_PUBLIC_EMAILJS_PUBLIC_KEY:</strong>{" "}
        {process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
          ? "✅ exists"
          : "❌ undefined"}
      </p>
    </div>
  );
}