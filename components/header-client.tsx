"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/lib/site";

export function HeaderClient({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [open, setOpen] = useState(false);

  const authLinks = isLoggedIn
    ? [{ href: "/account", label: "Account" }]
    : [{ href: "/login", label: "Login" }];

  return (
    <header className="sticky top-0 z-40 border-b border-creme/10 bg-black text-creme">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Home">
          <Image
            src="/images/brand/tlc-bug-creme.png"
            alt=""
            width={40}
            height={40}
            className="h-9 w-9 object-contain"
            priority
          />
          <span className="font-serif text-xl font-semibold text-creme">
            The Living Church
          </span>
        </Link>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-ui text-sm font-semibold text-creme/85 transition hover:text-creme"
            >
              {item.label}
            </Link>
          ))}
          {authLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-ui text-sm font-semibold text-creme/85 transition hover:text-creme"
            >
              {item.label}
            </Link>
          ))}
          {isLoggedIn ? (
            <LogoutButton />
          ) : (
            <HeaderCta href="/join">Become a Member</HeaderCta>
          )}
        </nav>
        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-creme/30 text-creme lg:hidden"
          aria-label="Open navigation"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      {open ? (
        <nav
          className="border-t border-creme/10 bg-black px-4 py-4 lg:hidden"
          aria-label="Mobile primary"
        >
          <div className="mx-auto grid max-w-7xl gap-1">
            {[...siteConfig.nav, ...authLinks].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-2 py-3 font-semibold text-creme"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2">
              {isLoggedIn ? (
                <LogoutButton />
              ) : (
                <HeaderCta href="/join">Become a Member</HeaderCta>
              )}
            </div>
          </div>
        </nav>
      ) : null}
    </header>
  );
}

function HeaderCta({
  href,
  children
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-11 items-center justify-center rounded-md border border-creme/70 bg-transparent px-5 py-3 text-sm font-semibold text-creme transition hover:border-gold hover:bg-gold hover:text-black"
    >
      {children}
    </Link>
  );
}

function LogoutButton() {
  return (
    <form action="/auth/logout" method="post">
      <button
        type="submit"
        className="inline-flex min-h-11 items-center justify-center rounded-md border border-creme/70 bg-transparent px-5 py-3 text-sm font-semibold text-creme transition hover:border-gold hover:bg-gold hover:text-black"
      >
        Log out
      </button>
    </form>
  );
}
