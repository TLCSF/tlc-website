"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function updatePassword(formData: FormData) {
  const password = String(formData.get("password") || "");
  const confirmation = String(formData.get("confirmation") || "");

  if (password.length < 8) {
    redirect("/update-password?error=Password%20must%20be%20at%20least%208%20characters.");
  }

  if (password !== confirmation) {
    redirect("/update-password?error=The%20passwords%20do%20not%20match.");
  }

  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/forgot-password?error=That%20password%20setup%20link%20has%20expired.%20Please%20request%20a%20new%20one.");
  }

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    redirect("/update-password?error=We%20could%20not%20save%20your%20password.%20Please%20try%20again.");
  }

  redirect("/account");
}
