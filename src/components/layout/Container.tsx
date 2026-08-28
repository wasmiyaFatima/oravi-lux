import { type ReactNode } from "react";

export function Container({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={`mx-auto w-full max-w-[1400px] px-5 md:px-8 lg:px-12 ${className}`}
    >
      {children}
    </div>
  );
}
