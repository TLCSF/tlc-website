import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-ink text-paper">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div>
          <p className="font-serif text-2xl">The Living Church</p>
          <p className="mt-4 max-w-md text-sm leading-7 text-paper/75">
            Education, guidance, community, and sacred mushroom traditions.
            Adults 21+ only.
          </p>
        </div>
        <div>
          <p className="font-semibold">Explore</p>
          <nav className="mt-4 grid gap-3 text-sm" aria-label="Footer">
            {siteConfig.nav.map((item) => (
              <Link key={item.href} href={item.href} className="text-paper/75 hover:text-paper">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div>
          <p className="font-semibold">Members</p>
          <nav className="mt-4 grid gap-3 text-sm" aria-label="Member footer">
            {siteConfig.memberNav.map((item) => (
              <Link key={item.href} href={item.href} className="text-paper/75 hover:text-paper">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <div className="border-t border-paper/10 px-4 py-5 text-center text-xs text-paper/60">
        Educational content only. No medical, legal, or clinical claims are made.
      </div>
    </footer>
  );
}
