import { ArrowUp } from "lucide-react";
import type { NavItem } from "@/components/layout/Navbar";
import ExtLink from "@/components/ui/ExtLink";
import { contact, site } from "@/data/portfolio";

export default function Footer({ items }: { items: NavItem[] }) {
  return (
    <footer className="border-line bg-paper border-t py-12">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-5 sm:px-8 md:grid-cols-3 lg:px-10">
        <p className="text-lg font-bold tracking-tight">
          {site.shortName}
          <span aria-hidden className="text-blue">
            •
          </span>
        </p>
        <nav aria-label="Pied de page">
          <ul className="space-y-2">
            {items.map((i) => (
              <li key={i.id}>
                <a href={`#${i.id}`} className="hover:underline">
                  {i.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <ul className="space-y-2">
          {contact.links.map((l) => (
            <li key={l.href}>
              <ExtLink href={l.href}>{l.label}</ExtLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="text-ink-muted mx-auto mt-10 flex max-w-[1200px] items-center justify-between px-5 text-sm sm:px-8 lg:px-10">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <a href="#accueil" className="inline-flex items-center gap-1 font-medium hover:underline">
          <ArrowUp aria-hidden className="size-4" /> Retour en haut
        </a>
      </div>
    </footer>
  );
}
