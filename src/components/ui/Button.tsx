import { Link } from "@/i18n/navigation";
import { type ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "onDark";

const styles: Record<Variant, string> = {
  primary:
    "bg-dark text-on-dark hover:bg-dark/90 border border-transparent shadow-[0_10px_30px_rgba(74,55,40,0.12)]",
  secondary:
    "bg-transparent text-foreground border border-dark/15 hover:border-dark/40 hover:bg-dark/[0.03]",
  ghost: "bg-transparent text-foreground hover:text-accent border border-transparent",
  onDark:
    "bg-accent-on-dark text-dark hover:bg-accent-on-dark-hover border border-transparent shadow-[0_12px_32px_rgba(243,217,160,0.35)]",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  type = "button",
  onClick,
  disabled = false,
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
}) {
  const classes = `inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm tracking-[0.04em] transition-all duration-300 whitespace-nowrap disabled:pointer-events-none disabled:opacity-55 ${styles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
