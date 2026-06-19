import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MemberShell } from "@/components/member-shell";
import { type CmsMenuProduct, getMemberMenuProducts } from "@/lib/cms";
import { sampleProducts } from "@/lib/content";
import { isMenuOpenForClientReview } from "@/lib/menu-gate";
import { getCurrentProfile, isActiveMember } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Member Menu Access",
  description: "Learn how active TLC members access the sacrament menu."
};

export default async function MenuPage() {
  const menuOpenForClientReview = isMenuOpenForClientReview();
  const profile = await getCurrentProfile();
  const active = menuOpenForClientReview || isActiveMember(profile);

  if (!active) {
    return <MenuAccessPage />;
  }

  const cmsProducts = await getMemberMenuProducts();
  const products: CmsMenuProduct[] = cmsProducts?.length
    ? cmsProducts
    : sampleProducts;
  const groupedProducts = groupMenuProducts(products);

  const menuContent = <MenuProductSections groupedProducts={groupedProducts} />;

  if (menuOpenForClientReview) {
    return <PublicMenuPreviewShell>{menuContent}</PublicMenuPreviewShell>;
  }

  return (
    <MemberShell title="Member Menu">
      {menuContent}
    </MemberShell>
  );
}

function MenuProductSections({
  groupedProducts
}: {
  groupedProducts: [string, CmsMenuProduct[]][];
}) {
  return (
    <div className="grid gap-12">
      {groupedProducts.map(([category, categoryProducts]) => (
        <section key={category} aria-labelledby={categoryId(category)}>
          <div className="rounded-lg bg-black px-6 py-10 text-center shadow-soft sm:py-12">
            <h2
              id={categoryId(category)}
              className="font-serif text-5xl font-semibold leading-none text-creme sm:text-6xl"
            >
              {category}
            </h2>
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {categoryProducts.map((product) => (
              <MenuProductCard key={productKey(product)} product={product} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function PublicMenuPreviewShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-linen py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
            Member area
          </p>
          <h1 className="mt-2 font-serif text-4xl leading-tight sm:text-5xl">
            Member Menu
          </h1>
        </div>
        {children}
      </div>
    </main>
  );
}

const categoryOrder = [
  "Mushrooms",
  "Exotics",
  "Gummies",
  "Chocolate",
  "Tinctures",
  "Microdose Capsules",
  "Tablets",
  "Miscellaneous"
];

const categoryAliases: Record<string, string> = {
  "Capsules & Microdose": "Microdose Capsules",
  "Gummies & Lozenges": "Gummies",
  "Beverages & Pantry": "Miscellaneous",
  "Prepared Foods": "Miscellaneous",
  Extracts: "Tinctures",
  Sprays: "Tinctures",
  Support: "Miscellaneous",
  Education: "Miscellaneous"
};

function groupMenuProducts(products: CmsMenuProduct[]) {
  const groups = new Map<string, CmsMenuProduct[]>();

  for (const product of products) {
    const category = getProductCategory(product);
    groups.set(category, [...(groups.get(category) || []), product]);
  }

  return Array.from(groups.entries()).sort(([a], [b]) => {
    const aIndex = categoryOrder.indexOf(a);
    const bIndex = categoryOrder.indexOf(b);

    if (aIndex === -1 && bIndex === -1) return a.localeCompare(b);
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });
}

function categoryId(category: string) {
  return `menu-${category
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;
}

function productKey(product: CmsMenuProduct) {
  return `${product.title}-${product.price || ""}-${product.servingDetails || ""}`;
}

function getProductCategory(product: CmsMenuProduct) {
  const category = product.displayCategory || product.category || "Miscellaneous";
  return categoryAliases[category] || category;
}

function MenuProductCard({ product }: { product: CmsMenuProduct }) {
  const productCategory = getProductCategory(product);

  return (
    <article className="overflow-hidden rounded-lg border border-ink/10 bg-paper shadow-sm">
      {product.imageUrl ? (
        <div className="relative aspect-square bg-linen">
          <Image
            src={product.imageUrl}
            alt={product.imageAlt || product.title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      ) : null}
      <div className="p-5 sm:p-6">
        {productCategory ? (
          <p className="mb-3 font-ui text-xs font-semibold uppercase tracking-[0.16em] text-gold">
            {productCategory}
          </p>
        ) : null}
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-ui text-xl font-semibold leading-tight text-ink">
            {product.title}
          </h3>
          {product.price ? (
            <p className="font-ui shrink-0 text-lg font-semibold text-gold">
              {product.price}
            </p>
          ) : null}
        </div>
        {product.servingDetails ? (
          <p className="mt-4 font-ui text-sm font-semibold text-ink/65">
            {product.servingDetails}
          </p>
        ) : null}
        {product.description ? (
          <p className="mt-3 leading-7 text-ink/75">{product.description}</p>
        ) : null}
        {product.variants?.length ? (
          <ul className="mt-4 grid gap-1 text-sm leading-6 text-ink/70">
            {product.variants.map((variant) => (
              <li key={variant}>- {variant}</li>
            ))}
          </ul>
        ) : null}
        <p
          className={`mt-5 inline-flex rounded-full px-3 py-1 font-ui text-xs font-semibold uppercase tracking-[0.14em] ${
            product.available ? "bg-linen text-ink" : "bg-ink/10 text-ink/60"
          }`}
        >
          {product.available ? "Available" : "Unavailable"}
        </p>
      </div>
    </article>
  );
}

function MenuAccessPage() {
  const steps = [
    "Create your free membership",
    "Sign the digital waiver",
    "Activate your account",
    "Access the sacrament menu"
  ];

  return (
    <main className="bg-linen">
      <section className="mx-auto grid min-h-[calc(100dvh-73px)] max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
            Member menu
          </p>
          <h1 className="mt-3 max-w-3xl font-serif text-5xl font-semibold leading-[0.95] text-ink sm:text-6xl lg:text-7xl">
            Membership Required
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/75">
            The sacrament menu is available to active members of The Living
            Church. Membership is free and begins with a simple registration
            and waiver process. If you&apos;re already a member, log in to
            continue.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/login"
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-gold px-6 py-3 font-ui text-sm font-semibold text-black transition hover:bg-gold/85"
            >
              Member Login
            </Link>
            <Link
              href="/membership"
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-gold px-6 py-3 font-ui text-sm font-semibold text-gold transition hover:bg-gold hover:text-black"
            >
              Become a Member
            </Link>
          </div>
        </div>
        <div className="rounded-lg border border-ink/10 bg-paper p-6 shadow-soft sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
            How access works
          </p>
          <ol className="mt-6 grid gap-4">
            {steps.map((step, index) => (
              <li key={step} className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black font-ui text-sm font-semibold text-creme">
                  {index + 1}
                </span>
                <span className="pt-1 font-ui text-base font-semibold text-ink">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
