import { NextRequest, NextResponse } from "next/server";
import { sendSubmitApplicationServerEvent } from "@/lib/facebookCapi";

// Simple event_id generator for dedupe with browser pixel
function generateEventId() {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      firstName?: string;
      lastName?: string;
      email?: string;
      phone?: string;
      gender?: string; // "m" / "f" / "male" / "female"
      dateOfBirth?: string; // "YYYY-MM-DD"
      city?: string;
      state?: string;
      eventSourceUrl?: string;
      eventId?: string;
    };

    const {
      firstName,
      lastName,
      email,
      phone,
      gender,
      dateOfBirth,
      city,
      state,
      eventSourceUrl,
      eventId,
    } = body;

    const event_id = eventId || generateEventId();
    const event_source_url = eventSourceUrl || req.nextUrl.href;

    const user_agent = req.headers.get("user-agent");

    await sendSubmitApplicationServerEvent({
      event_id,
      event_source_url,
      user_agent,
      email: email || null,
      phone: phone || null,
      gender: gender || null,
      date_of_birth: dateOfBirth || null,
      first_name: firstName || null,
      last_name: lastName || null,
      city: city || null,
      state: state || null,
    });

    // Send eventId back so browser pixel can use same ID for dedupe
    return NextResponse.json({ success: true, eventId: event_id });
  } catch (err) {
    console.error("submit-application CAPI error:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}