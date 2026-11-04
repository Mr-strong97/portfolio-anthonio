import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg" | "icon";

type OwnProps = { variant?: Variant; size?: Size; className?: string; children: ReactNode };
// Avec "href" on obtient un lien <a>, sans "href" un vrai <button>.
type LinkProps = OwnProps & { href: string } & Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    keyof OwnProps | "href"
  >;
type ButtonProps = OwnProps & { href?: undefined } & Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    keyof OwnProps
  >;

// Au survol, la couleur ne change pas directement : un calque (::before) apparaît en fondu.
// On n'anime ainsi que opacity et transform (règle du cahier des charges, FRONTEND.md §7).
const base = [
  "relative isolate inline-flex shrink-0 items-center justify-center gap-2 overflow-hidden rounded-lg font-semibold",
  "transition-transform duration-150 ease-out hover:-translate-y-px active:scale-[0.98]",
  "before:absolute before:inset-0 before:-z-10 before:opacity-0 before:transition-opacity before:duration-150 hover:before:opacity-100",
  "disabled:pointer-events-none disabled:opacity-50",
].join(" ");

const variants: Record<Variant, string> = {
  primary: "bg-blue-button text-white before:bg-blue-strong",
  secondary: "bg-band text-ink before:bg-ink/10",
  ghost: "text-ink before:bg-ink/10",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[0.9375rem]", // 44 px de haut : cible tactile confortable
  lg: "h-12 px-6 text-base",
  icon: "h-11 w-11",
};

export default function Button(props: LinkProps | ButtonProps) {
  const { variant = "primary", size = "md", className, children, ...rest } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if (rest.href !== undefined) {
    return (
      <a className={classes} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
