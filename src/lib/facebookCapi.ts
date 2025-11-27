// src/lib/facebookCapi.ts
const FB_API_VERSION = process.env.FACEBOOK_API_VERSION || "v18.0";
const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
const FB_ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;

if (!FB_PIXEL_ID) {
  console.warn("Missing NEXT_PUBLIC_FACEBOOK_PIXEL_ID env var");
}
if (!FB_ACCESS_TOKEN) {
  console.warn("Missing FACEBOOK_ACCESS_TOKEN env var");
}

export type SubmitApplicationPayload = {
  event_id: string;
  event_source_url: string;
  action_source?: "website";
  ip_address: string | null;
  user_agent: string | null;
  fbp?: string | null;
  fbc?: string | null;
  // customer info
  email?: string | null;
  phone?: string | null;
  first_name?: string | null;
  last_name?: string | null;
};

export type ViewContentPayload = {
  event_id: string;
  event_source_url: string;
  action_source?: "website";
  ip_address: string | null;
  user_agent: string | null;
  fbp?: string | null;
  fbc?: string | null;
};

async function sendToFacebook(events: any[]) {
  if (!FB_PIXEL_ID || !FB_ACCESS_TOKEN) return;

  const url = `https://graph.facebook.com/${FB_API_VERSION}/${FB_PIXEL_ID}/events`;

  const body = {
    data: events,
    // optional: test_event_code: "TEST123",
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Facebook CAPI error:", res.status, text);
  }
}

export async function sendSubmitApplicationServerEvent(
  payload: SubmitApplicationPayload
) {
  const {
    event_id,
    event_source_url,
    ip_address,
    user_agent,
    fbp,
    fbc,
    email,
    phone,
    first_name,
    last_name,
  } = payload;

  const now = Math.floor(Date.now() / 1000);

  const event = {
    event_name: "SubmitApplication",
    event_time: now,
    event_id,
    event_source_url,
    action_source: "website",
    user_data: {
      client_ip_address: ip_address || undefined,
      client_user_agent: user_agent || undefined,
      fbp: fbp || undefined,
      fbc: fbc || undefined,
      em: email ? [email] : undefined,
      ph: phone ? [phone] : undefined,
      fn: first_name ? [first_name] : undefined,
      ln: last_name ? [last_name] : undefined,
    },
  };

  await sendToFacebook([event]);
}

export async function sendViewContentServerEvent(
  payload: ViewContentPayload
) {
  const { event_id, event_source_url, ip_address, user_agent, fbp, fbc } =
    payload;

  const now = Math.floor(Date.now() / 1000);

  const event = {
    event_name: "ViewContent",
    event_time: now,
    event_id,
    event_source_url,
    action_source: "website",
    user_data: {
      client_ip_address: ip_address || undefined,
      client_user_agent: user_agent || undefined,
      fbp: fbp || undefined,
      fbc: fbc || undefined,
    },
  };

  await sendToFacebook([event]);
}