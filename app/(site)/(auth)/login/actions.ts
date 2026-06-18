"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

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

function loginErrorUrl(error: LoginError) {
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
      code: "login_supabase_config",
      message: "Login is not configured yet. Check the Supabase environment variables."
    };
  }

  if (
    normalized.includes("fetch failed") ||
    normalized.includes("load failed") ||
    normalized.includes("network")
  ) {
    return {
      code: "login_auth_network",
      message: "Unable to reach Supabase Auth. Please try again in a moment."
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

export async function login(formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const next = safeNextPath(String(formData.get("next") || "/account"));

  if (!email || !password) {
    redirect(
      loginErrorUrl({
        code: "login_missing_fields",
        message: "Email and password are required."
      })
    );
  }

  let destination = `${next}${next.includes("?") ? "&" : "?"}login=success`;

  try {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      destination = loginErrorUrl(mapLoginError(error));
    }
  } catch (error) {
    destination = loginErrorUrl(mapLoginError(error));
  }

  redirect(destination);
}

export async function logout() {
  try {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
  } catch {
    // Treat logout as complete even if the auth service is temporarily unavailable.
  }

  redirect("/");
}
