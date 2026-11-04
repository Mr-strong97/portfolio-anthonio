"use client";

import { Menu, X } from "lucide-react";
import { AnimatePresence, useMotionValueEvent, useScroll } from "motion/react";
import * as m from "motion/react-m";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "@/components/layout/ThemeToggle";
import Button from "@/components/ui/Button";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/cn";

export type NavItem = { id: string; label: string };

export default function Navbar({ items, brand }: { items: NavItem[]; brand: string }) {
  const active = useActiveSection(items.map((i) => i.id));
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const header = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 8));

  // Menu ouvert : Échap le ferme, Tab reste dans l'en-tête, le fond ne défile plus.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key !== "Tab" || !header.current) return;
      const f = header.current.querySelectorAll<HTMLElement>("a[href],button");
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header ref={header} className="fixed inset-x-0 top-0 z-40 h-14 lg:h-16">
      {/* Fond translucide : on n'anime que son opacité. */}
      <div
        aria-hidden
        className={cn(
          "border-line bg-paper/85 absolute inset-0 -z-10 border-b backdrop-blur-md transition-opacity duration-200",
          scrolled || open ? "opacity-100" : "opacity-0",
        )}
      />
      <nav
        aria-label="Navigation principale"
        className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-5 sm:px-8 lg:px-10"
      >
        <a href="#accueil" className="text-lg font-bold tracking-tight">
          {brand}
          <span aria-hidden className="text-blue">
            •
          </span>
        </a>
        <ul className="hidden items-center gap-1 lg:flex">
          {items.map((i) => (
            <li key={i.id}>
              <a
                href={`#${i.id}`}
                aria-current={active === i.id ? "location" : undefined}
                className="after:bg-blue relative inline-block px-3 py-2 text-[0.9375rem] font-medium after:absolute after:inset-x-3 after:bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:transition-transform after:duration-200 hover:after:scale-x-100 aria-[current=location]:after:scale-x-100"
              >
                {i.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button href="#contact" className="hidden lg:inline-flex">
            Me contacter
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen(!open)}
          >
            {open ? <X aria-hidden className="size-6" /> : <Menu aria-hidden className="size-6" />}
          </Button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <m.div
            id="menu-mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.16 } }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="bg-paper fixed inset-x-0 top-14 bottom-0 overflow-y-auto px-5 py-8 lg:hidden"
          >
            <ul className="space-y-1">
              {items.map((i) => (
                <li key={i.id}>
                  <a
                    href={`#${i.id}`}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-3xl font-bold tracking-tight"
                  >
                    {i.label}
                  </a>
                </li>
              ))}
            </ul>
            <Button href="#contact" size="lg" className="mt-8" onClick={() => setOpen(false)}>
              Me contacter
            </Button>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
