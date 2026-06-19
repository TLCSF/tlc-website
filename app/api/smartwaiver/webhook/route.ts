import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) return null;

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}

function flattenPayload(value: unknown): { key: string; value: string }[] {
  const results: { key: string; value: string }[] = [];

  function walk(current: unknown, path: string) {
    if (typeof current === "string") {
      results.push({ key: path, value: current });
      return;
    }

    if (typeof current === "number" || typeof current === "boolean") {
      results.push({ key: path, value: String(current) });
      return;
    }

    if (!current || typeof current !== "object") return;

    if (Array.isArray(current)) {
      current.forEach((item, index) => walk(item, `${path}.${index}`));
      return;
    }

    Object.entries(current as Record<string, unknown>).forEach(([key, item]) => {
      walk(item, path ? `${path}.${key}` : key);
    });
  }

  walk(value, "");
  return results;
}

function extractEmail(payload: unknown) {
  const fields = flattenPayload(payload);
  const keyedEmail = fields.find(
    (field) =>
      field.key.toLowerCase().includes("email") &&
      emailPattern.test(field.value.trim())
  );

  if (keyedEmail) return keyedEmail.value.trim().toLowerCase();

  const anyEmail = fields.find((field) => emailPattern.test(field.value.trim()));
  return anyEmail?.value.trim().toLowerCase() ?? null;
}

function extractByKey(payload: unknown, keys: string[]) {
  const fields = flattenPayload(payload);
  const normalizedKeys = keys.map((key) => key.toLowerCase());
  const match = fields.find((field) =>
    normalizedKeys.some((key) =>
      field.key.toLowerCase().replace(/[^a-z0-9]/g, "").includes(key)
    )
  );

  return match?.value ?? null;
}

function extractSignedAt(payload: unknown) {
  const raw = extractByKey(payload, [
    "signedat",
    "signeddate",
    "completedat",
    "createdat",
    "timestamp"
  ]);
  if (!raw) return new Date().toISOString();

  const date = new Date(raw);
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

export async function POST(request: Request) {
  const signature = request.headers.get("smartwaiver-signature");
  const hasSecret = Boolean(process.env.SMARTWAIVER_WEBHOOK_SECRET);

  if (hasSecret && !signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 401 });
  }

  const payload = await request.json().catch(() => null);
  const email = extractEmail(payload);
  const admin = createAdminClient();

  if (!admin) {
    return NextResponse.json(
      { received: true, matched: false, reason: "membership_service_unavailable" },
      { status: 202 }
    );
  }

  if (!email) {
    await admin.from("member_events").insert({
      event_type: "smartwaiver_unmatched",
      metadata: { reason: "missing_email", payload }
    });

    return NextResponse.json(
      { received: true, matched: false, reason: "missing_email" },
      { status: 202 }
    );
  }

  const participantId = extractByKey(payload, [
    "participantid",
    "participant",
    "uniqueid",
    "unique",
    "waiverid"
  ]);
  const signedAt = extractSignedAt(payload);

  const { data: profile, error: lookupError } = await admin
    .from("profiles")
    .select("id, email, role")
    .ilike("email", email)
    .maybeSingle();

  if (lookupError) {
    return NextResponse.json(
      { received: true, matched: false, reason: "profile_lookup_failed" },
      { status: 202 }
    );
  }

  if (!profile) {
    await admin.from("member_events").insert({
      event_type: "smartwaiver_unmatched",
      metadata: { reason: "profile_not_found", email, participantId, signedAt }
    });

    return NextResponse.json(
      { received: true, matched: false, reason: "profile_not_found" },
      { status: 202 }
    );
  }

  const { error: updateError } = await admin
    .from("profiles")
    .update({
      role: ["staff", "admin"].includes(profile.role) ? profile.role : "member_active",
      approval: "approved",
      waiver: "completed",
      smartwaiver_participant_id: participantId,
      smartwaiver_signed_at: signedAt,
      updated_at: new Date().toISOString()
    })
    .eq("id", profile.id);

  if (updateError) {
    return NextResponse.json(
      { received: true, matched: true, activated: false },
      { status: 202 }
    );
  }

  await admin.from("member_events").insert({
    profile_id: profile.id,
    event_type: "smartwaiver_completed",
    metadata: { email, participantId, signedAt }
  });

  return NextResponse.json({
    received: true,
    matched: true,
    activated: true
  });
}
