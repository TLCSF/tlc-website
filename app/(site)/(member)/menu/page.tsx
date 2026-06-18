import type { Metadata } from "next";
import Image from "next/image";
import { MemberShell } from "@/components/member-shell";
import { type CmsMenuProduct, getMemberMenuProducts } from "@/lib/cms";
import { sampleProducts } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Member Menu",
  description:
    "Member-only sacrament and resource menu for active TLC members."
};

export default async function MenuPage() {
  const cmsProducts = await getMemberMenuProducts();
  const products: CmsMenuProduct[] = cmsProducts?.length
    ? cmsProducts
    : sampleProducts;

  return (
    <MemberShell title="Member Menu" inactiveRedirect="/membership">
      <div className="grid gap-4 md:grid-cols-2">
        {products.map((product) => (
          <article key={product.title} className="overflow-hidden rounded-lg bg-paper">
            {product.imageUrl ? (
              <div className="relative aspect-[4/3] bg-linen">
                <Image
                  src={product.imageUrl}
                  alt={product.imageAlt || product.title}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            ) : null}
            <div className="p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cedar">
                {product.category}
              </p>
              <h2 className="mt-3 font-serif text-2xl">{product.title}</h2>
              <p className="mt-3 leading-7 text-ink/70">{product.description}</p>
              <p className="mt-4 text-sm font-semibold">
                {product.available ? "Available" : "Unavailable"}
              </p>
            </div>
          </article>
        ))}
      </div>
    </MemberShell>
  );
}
