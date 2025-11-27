import crypto from "crypto";

const FB_PIXEL_ID = process.env.FACEBOOK_PIXEL_ID;
const FB_ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;
const FB_API_VERSION = process.env.FACEBOOK_API_VERSION || "v18.0";
const FB_TEST_EVENT_CODE = process.env.FACEBOOK_TEST_EVENT_CODE;

// Safely hash values per Meta spec (SHA-256, lowercase, trimmed)
function hash(value?: string | null): string | undefined {
  if (!value) return undefined;
  const normalized = value.trim().toLowerCase();
  if (!normalized) return undefined;
  return crypto.createHash("sha256").update(normalized).digest("hex");
}

function normalizePhone(phone?: string | null): string | undefined {
  if (!phone) return undefined;
  // Keep digits only; ideally include country code (e.g. 1 for US)
  const digits = phone.replace(/\D/g, "");
  if (!digits) return undefined;
  return digits;
}

function formatDobToYYYYMMDD(dob?: string | null): string | undefined {
  if (!dob) return undefined;
  // Expect "YYYY-MM-DD" from the frontend for simplicity
  const parts = dob.trim().split("-");
  if (parts.length !== 3) return undefined;
  const [year, month, day] = parts;
  if (!year || !month || !day) return undefined;
  return `${year}${month}${day}`;
}

export type SubmitApplicationCapiPayload = {
  event_id: string;
  event_source_url: string;
  user_agent: string | null;
  // customer info (raw)
  email?: string | null;
  phone?: string | null;
  gender?: "m" | "f" | string | null;
  date_of_birth?: string | null; // "YYYY-MM-DD"
  first_name?: string | null;
  last_name?: string | null;
  city?: string | null;
  state?: string | null; // e.g. "AZ"
};

export async function sendSubmitApplicationServerEvent(
  payload: SubmitApplicationCapiPayload
): Promise<void> {
  if (!FB_PIXEL_ID || !FB_ACCESS_TOKEN) {
    console.warn("Missing FACEBOOK_PIXEL_ID or FACEBOOK_ACCESS_TOKEN");
    return;
  }

  const {
    event_id,
    event_source_url,
    user_agent,
    email,
    phone,
    gender,
    date_of_birth,
    first_name,
    last_name,
    city,
    state,
  } = payload;

  const event_time = Math.floor(Date.now() / 1000); // seconds

  const hashedEmail = hash(email);
  const normalizedPhone = normalizePhone(phone);
  const hashedPhone = normalizedPhone ? hash(normalizedPhone) : undefined;
  const hashedFirstName = hash(first_name);
  const hashedLastName = hash(last_name);
  const dobYYYYMMDD = formatDobToYYYYMMDD(date_of_birth);
  const hashedDob = dobYYYYMMDD ? hash(dobYYYYMMDD) : undefined;
  const hashedCity = hash(city);
  const hashedState = hash(state);
  const genderNormalized =
    gender && gender.trim()
      ? gender.trim().toLowerCase().startsWith("m")
        ? "m"
        : gender.trim().toLowerCase().startsWith("f")
        ? "f"
        : undefined
      : undefined;

  const user_data: Record<string, any> = {
    client_user_agent: user_agent || undefined, // do NOT hash
    em: hashedEmail ? [hashedEmail] : undefined,
    ph: hashedPhone ? [hashedPhone] : undefined,
    fn: hashedFirstName ? [hashedFirstName] : undefined,
    ln: hashedLastName ? [hashedLastName] : undefined,
    ge: genderNormalized || undefined,
    db: hashedDob || undefined,
    ct: hashedCity || undefined,
    st: hashedState || undefined,
  };

  const event = {
    event_name: "SubmitApplication",
    event_time,
    event_id,
    event_source_url,
    action_source: "website",
    user_data,
  };

  const body: any = {
    data: [event],
  };

  if (FB_TEST_EVENT_CODE) {
    body.test_event_code = FB_TEST_EVENT_CODE;
  }

  const url = `https://graph.facebook.com/${FB_API_VERSION}/${FB_PIXEL_ID}/events?access_token=${FB_ACCESS_TOKEN}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Facebook CAPI error:", res.status, text);
  } else {
    // Optional: log for debugging
    // const json = await res.json();
    // console.log("Facebook CAPI success:", json);
  }
}