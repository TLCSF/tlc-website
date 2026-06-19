"use client";

import { ChevronDown, Menu, X } from "lucide-react";
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
            <NavItem key={item.href} item={item} />
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
          {isLoggedIn ? <LogoutButton /> : null}
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
          className="max-h-[calc(100dvh-65px)] overflow-y-auto overscroll-contain border-t border-creme/10 bg-black px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 [-webkit-overflow-scrolling:touch] lg:hidden"
          aria-label="Mobile primary"
        >
          <div className="mx-auto grid max-w-7xl gap-1">
            {siteConfig.nav.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-md px-2 py-3 font-semibold text-creme"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
                {"children" in item && item.children ? (
                  <div className="grid gap-1 pb-2 pl-4">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="rounded-md px-2 py-2 text-sm font-semibold text-creme/75"
                        onClick={() => setOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
            {authLinks.map((item) => (
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
              {isLoggedIn ? <LogoutButton /> : null}
            </div>
          </div>
        </nav>
      ) : null}
    </header>
  );
}

function NavItem({
  item
}: {
  item: (typeof siteConfig.nav)[number];
}) {
  if ("children" in item && item.children) {
    return (
      <div className="group relative">
        <Link
          href={item.href}
          className="inline-flex items-center gap-1 font-ui text-sm font-semibold text-creme/85 transition hover:text-creme"
        >
          {item.label}
          <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
        <div className="invisible absolute left-0 top-full min-w-56 translate-y-2 rounded-md border border-creme/15 bg-black p-2 opacity-0 shadow-xl transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="block rounded px-3 py-2 font-ui text-sm font-semibold text-creme/80 transition hover:bg-creme/10 hover:text-creme"
            >
              {child.label}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      className="font-ui text-sm font-semibold text-creme/85 transition hover:text-creme"
    >
      {item.label}
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
