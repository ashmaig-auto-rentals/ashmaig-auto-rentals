import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const FB_PIXEL_ID = process.env.FB_PIXEL_ID;
const FB_CONVERSIONS_ACCESS_TOKEN = process.env.FB_CONVERSIONS_ACCESS_TOKEN;

function hash(value?: string | null) {
  if (!value) return undefined;
  const normalized = value.trim().toLowerCase();
  if (!normalized) return undefined;
  return crypto.createHash("sha256").update(normalized).digest("hex");
}

function normalizePhone(phone?: string | null) {
  if (!phone) return undefined;
  const digits = phone.replace(/[^\d]/g, "");
  return digits || undefined;
}

export async function POST(req: NextRequest) {
  try {
    if (!FB_PIXEL_ID || !FB_CONVERSIONS_ACCESS_TOKEN) {
      console.error("Missing FB_PIXEL_ID or FB_CONVERSIONS_ACCESS_TOKEN");
      return NextResponse.json(
        { success: false, error: "Server misconfiguration" },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { firstName, lastName, email, phone } = body || {};

    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const now = Math.floor(Date.now() / 1000);
    const userAgent = req.headers.get("user-agent") || undefined;
    const referer = req.headers.get("referer") || "https://ashmaig.com";

    const event = {
      event_name: "Lead",
      event_time: now,
      action_source: "website",
      event_source_url: referer,
      user_data: {
        em: [hash(email)],
        ph: [hash(normalizePhone(phone))],
        client_user_agent: userAgent,
      },
      custom_data: {
        first_name: firstName,
        last_name: lastName,
        content_name: "Car rental application",
      },
    };

    const url = `https://graph.facebook.com/v19.0/${FB_PIXEL_ID}/events?access_token=${FB_CONVERSIONS_ACCESS_TOKEN}`;

    const fbRes = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: [event] }),
    });

    const fbData = await fbRes.json();

    if (!fbRes.ok || fbData.error) {
      console.error("Meta CAPI error:", fbData);
      return NextResponse.json(
        { success: false, error: "Failed to send event to Meta" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Apply route error:", err);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}