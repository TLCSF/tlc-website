import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { isMenuOpenForClientReview } from "@/lib/menu-gate";
import { updateSession } from "@/lib/supabase/middleware";

const protectedRoutes = [
  "/account",
  "/member-resources",
  "/member-community"
];

export async function middleware(request: NextRequest) {
  const response = await updateSession(request);
  const pathname = request.nextUrl.pathname;
  const isProtected =
    protectedRoutes.some((route) => pathname.startsWith(route)) ||
    (!isMenuOpenForClientReview() && pathname.startsWith("/menu"));

  if (!isProtected) return response;

  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return response;
  }

  const hasAuthCookie = request.cookies
    .getAll()
    .some((cookie) => cookie.name.startsWith("sb-"));

  if (!hasAuthCookie) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"]
};
