import "server-only";
import { type ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { unstable_noStore as noStore } from "next/cache";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Supabase is not configured. Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local."
    );
  }

  return { url, key };
}

function createSupabaseAdminClient() {
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

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();
  const { url, key } = getSupabaseEnv();

  return createServerClient(
    url,
    key,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(
          cookiesToSet: {
            name: string;
            value: string;
            options: Partial<ResponseCookie>;
          }[]
        ) {
          cookiesToSet.forEach(({ name, value, options }) => {
            try {
              cookieStore.set(name, value, options);
            } catch {
              // Server Components cannot always write refreshed auth cookies.
            }
          });
        }
      }
    }
  );
}

export async function getCurrentProfile() {
  noStore();

  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return null;
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (data) return data;

  const admin = createSupabaseAdminClient();
  if (admin) {
    const { data: adminProfile } = await admin
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    if (adminProfile) return adminProfile;
  }

  return {
    id: user.id,
    email: user.email || "",
    first_name: null,
    last_name: null,
    phone: null,
    role: "member_pending",
    approval: "pending",
    waiver: "not_started",
    smartwaiver_participant_id: null,
    smartwaiver_signed_at: null,
    notes: null,
    created_at: null,
    updated_at: null
  };
}

export function isActiveMember(profile: {
  role?: string | null;
  approval?: string | null;
  waiver?: string | null;
} | null) {
  if (!profile) return false;
  const hasRole = ["member_active", "staff", "admin"].includes(
    profile.role || ""
  );
  return hasRole && profile.approval === "approved" && profile.waiver === "completed";
}

export function isStaff(profile: { role?: string | null } | null) {
  return ["staff", "admin"].includes(profile?.role || "");
}
