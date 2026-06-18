import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FeatureCard({
  title,
  body,
  href
}: {
  title: string;
  body: string;
  href?: string;
}) {
  const inner = (
    <div className="h-full rounded-lg border border-ink/10 bg-paper p-6 shadow-sm transition hover:border-moss/40">
      <h3 className="font-ui text-2xl font-semibold leading-tight text-ink">
        {title}
      </h3>
      <p className="mt-4 leading-7 text-ink/70">{body}</p>
      {href ? (
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-river">
          Learn more <ArrowRight size={16} aria-hidden="true" />
        </span>
      ) : null}
    </div>
  );

  return href ? <Link href={href}>{inner}</Link> : inner;
}

export function StepCard({
  step,
  title,
  body
}: {
  step: string;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-lg border border-ink/10 bg-paper p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">
        {step}
      </p>
      <h3 className="mt-3 text-xl font-semibold text-ink">{title}</h3>
      <p className="mt-3 leading-7 text-ink/70">{body}</p>
    </div>
  );
}
