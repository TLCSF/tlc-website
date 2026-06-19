"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function redirectWithError(message: string): never {
  redirect(`/register?error=${encodeURIComponent(message)}`);
}

function getErrorMessage(error: unknown) {
  const message =
    error instanceof Error
      ? error.message
      : typeof error === "string"
        ? error
        : "";
  const normalized = message.toLowerCase();

  if (
    normalized.includes("fetch failed") ||
    normalized.includes("load failed") ||
    normalized.includes("network")
  ) {
    return "Unable to complete registration right now. Please try again in a moment.";
  }

  if (normalized.includes("already registered") || normalized.includes("already exists")) {
    return "An account may already exist for this email. Try logging in or contact TLC for help.";
  }

  return "Registration failed. Please check your details and try again.";
}

export async function register(formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const firstName = String(formData.get("firstName") || "").trim();
  const lastName = String(formData.get("lastName") || "").trim();

  if (!email) redirectWithError("Email is required.");
  if (password.length < 8) {
    redirectWithError("Password must be at least 8 characters.");
  }

  let destination = "/account";

  try {
    const supabase = await createSupabaseServerClient();
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3002";

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${siteUrl}/account`,
        data: { first_name: firstName, last_name: lastName }
      }
    });

    if (error) {
      destination = `/register?error=${encodeURIComponent(getErrorMessage(error))}`;
    }
  } catch (error) {
    destination = `/register?error=${encodeURIComponent(getErrorMessage(error))}`;
  }

  redirect(destination);
}
