"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function redirectWithError(message: string): never {
  redirect(`/register?error=${encodeURIComponent(message)}`);
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "Registration failed. Please check the Supabase Auth settings and try again.";
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
      destination = `/register?error=${encodeURIComponent(error.message)}`;
    }
  } catch (error) {
    destination = `/register?error=${encodeURIComponent(getErrorMessage(error))}`;
  }

  redirect(destination);
}
