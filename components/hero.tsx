import Image from "next/image";
import { ButtonLink } from "./button-link";

export function Hero({
  eyebrow,
  title,
  body,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  imageSrc = "/images/brand/tlc-logo-blue.png",
  imageAlt = "The Living Church logo mark",
  imageMode = "contain",
  imageSide = "right",
  imageSize = "default",
  imagePosition = "center"
}: {
  eyebrow?: string;
  title: string;
  body: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  imageSrc?: string;
  imageAlt?: string;
  imageMode?: "cover" | "contain";
  imageSide?: "left" | "right";
  imageSize?: "default" | "compact";
  imagePosition?: "top" | "center" | "bottom";
}) {
  const image = (
    <div
      className={`relative overflow-hidden ${
        imageSize === "compact"
          ? "aspect-[4/5] w-full max-w-xs justify-self-center sm:max-w-sm"
          : "aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]"
      } ${
        imageMode === "cover"
          ? "rounded-lg bg-paper shadow-soft"
          : "bg-transparent p-6 sm:p-10"
      }`}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className={
          imageMode === "cover"
            ? `object-cover ${
                imagePosition === "top"
                  ? "object-top"
                  : imagePosition === "bottom"
                    ? "object-bottom"
                    : "object-center"
              }`
            : "object-contain"
        }
        priority
      />
    </div>
  );

  const copy = (
    <div>
      {eyebrow ? (
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-gold">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="max-w-4xl font-serif text-5xl leading-[0.98] text-ink sm:text-7xl">
        {title}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/75">{body}</p>
      {(primaryHref || secondaryHref) ? (
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          {primaryHref && primaryLabel ? (
            <ButtonLink href={primaryHref}>{primaryLabel}</ButtonLink>
          ) : null}
          {secondaryHref && secondaryLabel ? (
            <ButtonLink href={secondaryHref} variant="secondary">
              {secondaryLabel}
            </ButtonLink>
          ) : null}
        </div>
      ) : null}
    </div>
  );

  return (
    <section className="bg-linen">
      <div className="mx-auto grid min-h-[calc(100dvh-72px)] max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.85fr_1fr] lg:px-8">
        {imageSide === "left" ? image : copy}
        {imageSide === "left" ? copy : image}
      </div>
    </section>
  );
}
