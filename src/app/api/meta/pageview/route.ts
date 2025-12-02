import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { event_id, fbp, fbc } = body || {};

    // Use your existing env vars
    const pixelId =
      process.env.FACEBOOK_PIXEL_ID ?? process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
    const accessToken =
      process.env.FACEBOOK_ACCESS_TOKEN ?? process.env.FB_CONVERSIONS_ACCESS_TOKEN;

    if (!pixelId || !accessToken) {
      console.error("❌ Missing Meta env vars (FACEBOOK_PIXEL_ID / FACEBOOK_ACCESS_TOKEN)");
      return new Response("Missing Meta config", { status: 500 });
    }

    const url = `https://graph.facebook.com/v19.0/${pixelId}/events`;
    const now = Math.floor(Date.now() / 1000);

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || undefined;
    const ua = req.headers.get("user-agent") || undefined;

    const payload = {
      data: [
        {
          event_name: "PageView",
          event_time: now,
          event_id, // 🔑 same as browser fbq eventID
          action_source: "website",
          event_source_url:
            req.headers.get("referer") || "https://ashmaig.com/",
          user_data: {
            client_ip_address: ip,
            client_user_agent: ua,
            fbp: fbp || undefined,
            fbc: fbc || undefined,
            // if you later have email/phone, hash & add here as em/ph arrays
          },
        },
      ],
    };

    const response = await fetch(`${url}?access_token=${accessToken}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("❌ Meta CAPI error:", text);
      return new Response("Meta CAPI error", { status: 500 });
    }

    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("❌ Error in /api/meta/pageview:", err);
    return new Response("Error", { status: 500 });
  }
}
