import { cookies } from "next/headers";
import { HeaderClient } from "./header-client";

export async function Header() {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore
    .getAll()
    .some((cookie) => cookie.name.startsWith("sb-"));

  return <HeaderClient isLoggedIn={isLoggedIn} />;
}
