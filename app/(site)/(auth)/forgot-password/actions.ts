"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function requestPasswordReset(formData: FormData) {
  const email = String(formData.get("email") || "").trim();

  if (!email) {
    redirect("/forgot-password?error=Please%20enter%20your%20email%20address.");
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3002";
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${siteUrl}/auth/callback?next=/update-password`
  });

  if (error) {
    redirect(
      "/forgot-password?error=We%20could%20not%20send%20the%20password%20email.%20Please%20try%20again."
    );
  }

  redirect("/forgot-password?sent=1");
}
