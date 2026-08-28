import Image from "next/image";
import { Link } from "@/i18n/navigation";

type LogoProps = {
  className?: string;
  size?: "nav" | "footer";
  /** kept for call sites; crest is already light-on-transparent */
  tone?: "light" | "dark";
};

const sizes = {
  nav: {
    width: 148,
    height: 120,
    className: "h-[3.4rem] w-auto md:h-[4.25rem]",
  },
  footer: {
    width: 220,
    height: 178,
    className: "h-[5.75rem] w-auto md:h-[6.75rem]",
  },
} as const;

export function Logo({ className = "", size = "nav" }: LogoProps) {
  const dim = sizes[size];

  return (
    <Link
      href="/"
      className={`inline-flex shrink-0 items-center ${className}`}
      aria-label="Oravi Lux"
    >
      <Image
        src="/oravi-crest.png"
        alt="Oravi Lux"
        width={dim.width}
        height={dim.height}
        className={`${dim.className} object-contain object-left`}
        priority={size === "nav"}
      />
    </Link>
  );
}
