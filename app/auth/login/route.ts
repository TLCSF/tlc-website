import { createServerClient } from "@supabase/ssr";
import { type ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { NextResponse, type NextRequest } from "next/server";

type LoginError = {
  code: string;
  message: string;
};

function safeNextPath(value: string) {
  if (!value.startsWith("/") || value.startsWith("//")) return "/account";
  if (value === "/login" || value.startsWith("/login?")) return "/account";
  if (value === "/register" || value.startsWith("/register?")) return "/account";
  return value;
}

function redirectUrl(request: NextRequest, path: string) {
  return new URL(path, request.nextUrl.origin);
}

function loginErrorPath(error: LoginError) {
  const params = new URLSearchParams({
    error: error.message,
    code: error.code
  });

  return `/login?${params.toString()}`;
}

function mapLoginError(error: unknown): LoginError {
  const message =
    error instanceof Error
      ? error.message
      : typeof error === "string"
        ? error
        : "";
  const normalized = message.toLowerCase();

  if (normalized.includes("invalid login credentials")) {
    return {
      code: "login_invalid_credentials",
      message: "Email or password is incorrect."
    };
  }

  if (normalized.includes("email not confirmed")) {
    return {
      code: "login_email_not_confirmed",
      message: "Please confirm your email before logging in."
    };
  }

  if (normalized.includes("supabase is not configured")) {
    return {
      code: "login_service_unavailable",
      message: "Login is temporarily unavailable. Please contact TLC for help."
    };
  }

  if (
    normalized.includes("fetch failed") ||
    normalized.includes("load failed") ||
    normalized.includes("network")
  ) {
    return {
      code: "login_auth_network",
      message: "Unable to complete login right now. Please try again in a moment."
    };
  }

  if (normalized.includes("rate limit") || normalized.includes("too many")) {
    return {
      code: "login_rate_limited",
      message: "Too many login attempts. Please wait a moment and try again."
    };
  }

  return {
    code: "login_unknown",
    message: "Login failed. Please check your details and try again."
  };
}

function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("Supabase is not configured.");
  }

  return { url, key };
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const next = safeNextPath(String(formData.get("next") || "/account"));

  if (!email || !password) {
    return NextResponse.redirect(
      redirectUrl(
        request,
        loginErrorPath({
          code: "login_missing_fields",
          message: "Email and password are required."
        })
      ),
      { status: 303 }
    );
  }

  const successUrl = redirectUrl(
    request,
    `${next}${next.includes("?") ? "&" : "?"}login=success`
  );
  const response = NextResponse.redirect(successUrl, { status: 303 });

  try {
    const { url, key } = getSupabaseEnv();
    const supabase = createServerClient(url, key, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(
          cookiesToSet: {
            name: string;
            value: string;
            options: Partial<ResponseCookie>;
          }[]
        ) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        }
      }
    });

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return NextResponse.redirect(
        redirectUrl(request, loginErrorPath(mapLoginError(error))),
        { status: 303 }
      );
    }

    return response;
  } catch (error) {
    return NextResponse.redirect(
      redirectUrl(request, loginErrorPath(mapLoginError(error))),
      { status: 303 }
    );
  }
}
