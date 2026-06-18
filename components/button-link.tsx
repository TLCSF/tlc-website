import Link from "next/link";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

const styles = {
  primary:
    "bg-gold text-black hover:bg-ink hover:text-creme border-gold",
  secondary:
    "bg-transparent text-ink hover:bg-gold hover:text-black border-gold",
  ghost:
    "bg-transparent text-ink hover:bg-linen border-transparent"
};

export function ButtonLink({
  href,
  children,
  variant = "primary"
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={`font-ui inline-flex min-h-11 items-center justify-center rounded-md border px-5 py-3 text-sm font-semibold transition ${styles[variant]}`}
    >
      {children}
    </Link>
  );
}
