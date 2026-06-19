export function Section({
  id,
  eyebrow,
  title,
  children,
  tone = "paper"
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  children: React.ReactNode;
  tone?: "paper" | "linen" | "ink";
}) {
  const tones = {
    paper: "bg-paper text-ink",
    linen: "bg-linen text-ink",
    ink: "bg-ink text-paper"
  };

  return (
    <section id={id} className={`py-14 sm:py-20 ${tones[tone]}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {eyebrow ? (
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-gold">
            {eyebrow}
          </p>
        ) : null}
        {title ? (
          <h2 className="max-w-3xl font-serif text-3xl font-semibold leading-tight sm:text-5xl">
            {title}
          </h2>
        ) : null}
        <div className={title ? "mt-8" : ""}>{children}</div>
      </div>
    </section>
  );
}
