import { NextRequest, NextResponse } from "next/server";
import { sendSubmitApplicationServerEvent } from "@/lib/facebookCapi";

// Simple event_id helper
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
      eventId?: string;
      // add any extra fields you pass from the form if you want
    };

    const { firstName, lastName, email, phone, eventId } = body;

    // Full URL of the request
    const url = req.nextUrl.href;

    // IP address from proxy headers (NextRequest doesn't have req.ip)
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null;

    const ua = req.headers.get("user-agent") || null;

    // fbp/fbc from cookies (set by pixel on client)
    const cookieHeader = req.headers.get("cookie") || "";
    const fbp =
      cookieHeader
        .split(";")
        .find((c) => c.trim().startsWith("_fbp="))
        ?.split("=")[1] || null;
    const fbc =
      cookieHeader
        .split(";")
        .find((c) => c.trim().startsWith("_fbc="))
        ?.split("=")[1] || null;

    const finalEventId = eventId || generateEventId();

    // send server-side event to Meta
    await sendSubmitApplicationServerEvent({
      event_id: finalEventId,
      event_source_url: url,
      ip_address: ip,
      user_agent: ua,
      fbp,
      fbc,
      email: email || null,
      phone: phone || null,
      first_name: firstName || null,
      last_name: lastName || null,
    });

    // respond to front-end so it can also fire browser event with same event_id
    return NextResponse.json({ success: true, eventId: finalEventId });
  } catch (err) {
    console.error("submit-application error:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}