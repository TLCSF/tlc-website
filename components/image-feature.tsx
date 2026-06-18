import Image from "next/image";

export function ImageFeature({
  src,
  alt,
  eyebrow,
  title,
  body,
  reverse = false
}: {
  src: string;
  alt: string;
  eyebrow: string;
  title: string;
  body: string;
  reverse?: boolean;
}) {
  return (
    <div
      className={`grid items-center gap-8 lg:grid-cols-2 ${
        reverse ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-linen shadow-soft">
        <Image src={src} alt={alt} fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
      </div>
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
          {eyebrow}
        </p>
        <h2 className="mt-3 max-w-2xl font-serif text-3xl font-semibold leading-tight sm:text-5xl">
          {title}
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/75">{body}</p>
      </div>
    </div>
  );
}
