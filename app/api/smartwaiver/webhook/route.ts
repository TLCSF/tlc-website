import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const signature = request.headers.get("smartwaiver-signature");
  const hasSecret = Boolean(process.env.SMARTWAIVER_WEBHOOK_SECRET);

  if (hasSecret && !signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 401 });
  }

  const payload = await request.json().catch(() => null);

  return NextResponse.json({
    received: true,
    note:
      "Connect this handler to Supabase service-role updates after Smartwaiver account credentials are configured.",
    payload
  });
}
