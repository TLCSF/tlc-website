import { timingSafeEqual } from "node:crypto";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const waiverIdPattern = /^[a-zA-Z0-9_-]{8,128}$/;

type WebhookPayload = Record<string, unknown>;

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
    "createdon",
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

async function parseWebhookPayload(request: Request): Promise<WebhookPayload | null> {
  const rawBody = await request.text();
  if (!rawBody) return null;

  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    try {
      const parsed = JSON.parse(rawBody);
      return parsed && typeof parsed === "object" && !Array.isArray(parsed)
        ? (parsed as WebhookPayload)
        : null;
    } catch {
      return null;
    }
  }

  const entries = Array.from(new URLSearchParams(rawBody).entries());
  return entries.length ? Object.fromEntries(entries) : null;
}

function hasValidWebhookSecret(request: Request) {
  const configuredSecret = process.env.SMARTWAIVER_WEBHOOK_SECRET;
  const receivedSecret = new URL(request.url).searchParams.get("key");

  if (!configuredSecret || !receivedSecret) return false;

  const configured = Buffer.from(configuredSecret);
  const received = Buffer.from(receivedSecret);
  return configured.length === received.length && timingSafeEqual(configured, received);
}

async function retrieveWaiver(waiverId: string) {
  const apiKey = process.env.SMARTWAIVER_API_KEY;
  if (!apiKey) throw new Error("SMARTWAIVER_API_KEY is not configured");

  const response = await fetch(
    `https://api.smartwaiver.com/v4/waivers/${encodeURIComponent(waiverId)}`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json"
      },
      cache: "no-store",
      signal: AbortSignal.timeout(4000)
    }
  );

  if (!response.ok) {
    throw new Error(`Smartwaiver API returned ${response.status}`);
  }

  return response.json() as Promise<unknown>;
}

async function logEvent(
  admin: SupabaseClient,
  eventType: string,
  metadata: Record<string, unknown>,
  profileId?: string
) {
  await admin.from("member_events").insert({
    ...(profileId ? { profile_id: profileId } : {}),
    event_type: eventType,
    metadata
  });
}

export async function POST(request: Request) {
  if (!hasValidWebhookSecret(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await parseWebhookPayload(request);
  const waiverId = extractByKey(payload, ["uniqueid", "waiverid"]);
  const webhookEvent = extractByKey(payload, ["event"]);
  const admin = createAdminClient();

  if (!admin) {
    return NextResponse.json(
      { received: true, matched: false, reason: "membership_service_unavailable" },
      { status: 503 }
    );
  }

  if (!waiverId || !waiverIdPattern.test(waiverId)) {
    await logEvent(admin, "smartwaiver_rejected", {
      reason: "invalid_waiver_id",
      webhookEvent
    });
    return NextResponse.json({ error: "Invalid waiver ID" }, { status: 400 });
  }

  if (webhookEvent === "check-in") {
    return NextResponse.json({ received: true, ignored: true, reason: "check_in" });
  }

  let waiver: unknown;
  try {
    waiver = await retrieveWaiver(waiverId);
  } catch (error) {
    await logEvent(admin, "smartwaiver_api_failed", {
      waiverId,
      webhookEvent,
      reason: error instanceof Error ? error.message : "unknown_error"
    });
    return NextResponse.json(
      { received: true, matched: false, reason: "waiver_retrieval_failed" },
      { status: 503 }
    );
  }

  const verified = extractByKey(waiver, ["verified"]);
  const kiosk = extractByKey(waiver, ["kiosk"]);
  if (verified !== "true" && kiosk !== "true") {
    await logEvent(admin, "smartwaiver_unmatched", {
      reason: "email_not_verified",
      waiverId,
      webhookEvent
    });
    return NextResponse.json({ received: true, matched: false, reason: "email_not_verified" });
  }

  const email = extractEmail(waiver);
  const signedAt = extractSignedAt(waiver);

  if (!email) {
    await logEvent(admin, "smartwaiver_unmatched", {
      reason: "missing_email",
      waiverId,
      webhookEvent
    });
    return NextResponse.json({ received: true, matched: false, reason: "missing_email" });
  }

  const { data: existingEvent } = await admin
    .from("member_events")
    .select("id")
    .eq("event_type", "smartwaiver_completed")
    .contains("metadata", { waiverId })
    .maybeSingle();

  if (existingEvent) {
    return NextResponse.json({ received: true, matched: true, activated: true, duplicate: true });
  }

  const { data: profile, error: lookupError } = await admin
    .from("profiles")
    .select("id, email, role")
    .ilike("email", email)
    .maybeSingle();

  if (lookupError) {
    return NextResponse.json(
      { received: true, matched: false, reason: "profile_lookup_failed" },
      { status: 503 }
    );
  }

  if (!profile) {
    await logEvent(admin, "smartwaiver_unmatched", {
      reason: "profile_not_found",
      email,
      waiverId,
      signedAt,
      webhookEvent
    });
    return NextResponse.json({ received: true, matched: false, reason: "profile_not_found" });
  }

  const { error: updateError } = await admin
    .from("profiles")
    .update({
      role: ["staff", "admin"].includes(profile.role) ? profile.role : "member_active",
      approval: "approved",
      waiver: "completed",
      smartwaiver_participant_id: waiverId,
      smartwaiver_signed_at: signedAt,
      updated_at: new Date().toISOString()
    })
    .eq("id", profile.id);

  if (updateError) {
    await logEvent(admin, "smartwaiver_activation_failed", {
      email,
      waiverId,
      signedAt,
      webhookEvent
    }, profile.id);
    return NextResponse.json(
      { received: true, matched: true, activated: false },
      { status: 503 }
    );
  }

  await logEvent(
    admin,
    "smartwaiver_completed",
    { email, waiverId, signedAt, webhookEvent },
    profile.id
  );

  return NextResponse.json({ received: true, matched: true, activated: true });
}
