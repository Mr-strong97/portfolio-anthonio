import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

// Lien qui sort du site : nouvel onglet + annonce aux lecteurs d'écran.
export default function ExtLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-1 font-semibold underline-offset-4 hover:underline",
        className,
      )}
    >
      {children}
      <ArrowUpRight aria-hidden className="size-4" />
      <span className="sr-only"> (s’ouvre dans un nouvel onglet)</span>
    </a>
  );
}
