"use client";

import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import Image from "next/image";
import { useState } from "react";
import ExtLink from "@/components/ui/ExtLink";
import { cardTone, type Tone } from "@/components/ui/Section";
import type { Project } from "@/data/portfolio";
import { cn } from "@/lib/cn";

function Shot({ p, dark }: { p: Project; dark?: boolean }) {
  if (p.image)
    return (
      <Image
        {...p.image}
        alt={p.image.alt}
        sizes="(min-width: 1024px) 560px, 90vw"
        className="aspect-[16/10] w-full rounded-2xl object-cover"
      />
    );
  // Pas de fausse capture : un bloc neutre portant le nom du projet.
  return (
    <div
      className={cn(
        "grid aspect-[16/10] place-items-center rounded-2xl p-4 text-center font-semibold",
        dark ? "bg-white/10" : "bg-band",
      )}
    >
      {p.title}
    </div>
  );
}

function Links({ p, className }: { p: Project; className?: string }) {
  if (!p.demo && !p.code) return null; // un lien absent = un bouton absent
  return (
    <div className={cn("flex gap-5", className)}>
      {p.demo && <ExtLink href={p.demo}>Démo</ExtLink>}
      {p.code && <ExtLink href={p.code}>Code</ExtLink>}
    </div>
  );
}

export default function ProjectsExplorer({ projects, tone }: { projects: Project[]; tone: Tone }) {
  const [tag, setTag] = useState<string | null>(null);
  const counts = new Map<string, number>();
  projects.forEach((p) => p.tech.forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1)));
  const tags = [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([t]) => t);
  const shown = tag ? projects.filter((p) => p.tech.includes(tag)) : projects;
  const featured = shown.find((p) => p.featured);
  const rest = shown.filter((p) => p !== featured);

  return (
    <>
      <div
        role="group"
        aria-label="Filtrer par technologie"
        className="mb-8 flex flex-wrap items-center gap-2"
      >
        {[null, ...tags].map((t) => (
          <button
            key={t ?? "tous"}
            type="button"
            aria-pressed={tag === t}
            onClick={() => setTag(t)}
            className={cn(
              "border-line h-11 rounded-full border px-4 text-sm font-medium",
              tag === t ? "bg-ink text-paper" : "bg-surface",
            )}
          >
            {t ?? "Tous"}
          </button>
        ))}
        <p aria-live="polite" className="text-ink-muted ml-auto text-sm">
          {shown.length} projet{shown.length > 1 ? "s" : ""} affiché{shown.length > 1 ? "s" : ""}
        </p>
      </div>

      {featured && (
        <article className="bg-panel mb-6 grid gap-8 rounded-3xl p-6 text-white lg:grid-cols-2 lg:items-center lg:p-10">
          <div>
            <p className="text-on-panel-muted text-sm">
              {featured.category} · {featured.year}
            </p>
            <h3 className="mt-2 text-3xl font-bold tracking-tight">{featured.title}</h3>
            <p className="text-on-panel-muted mt-3">{featured.description}</p>
            {featured.result && (
              <p className="mt-5">
                <span className="text-2xl font-bold">{featured.result.value}</span>{" "}
                <span className="text-on-panel-muted">{featured.result.label}</span>
              </p>
            )}
            <ul className="mt-5 flex flex-wrap gap-2">
              {featured.tech.map((t) => (
                <li key={t} className="rounded-full bg-white/10 px-3 py-1 text-sm">
                  {t}
                </li>
              ))}
            </ul>
            <Links p={featured} className="text-blue-on-dark mt-6" />
          </div>
          <Shot p={featured} dark />
        </article>
      )}

      <m.ul layout className="grid gap-6 sm:grid-cols-2">
        <AnimatePresence initial={false} mode="popLayout">
          {rest.map((p) => (
            <m.li
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
            >
              <article className={cn("border-line h-full rounded-2xl border p-5", cardTone(tone))}>
                <Shot p={p} />
                <p className="text-ink-muted mt-5 text-sm">
                  {p.category} · {p.year}
                </p>
                <h3 className="mt-1 text-xl font-semibold">{p.title}</h3>
                <p className="text-ink-muted mt-2">{p.description}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <li
                      key={t}
                      className="border-line bg-paper rounded-full border px-3 py-1 text-sm"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
                <Links p={p} className="mt-5" />
              </article>
            </m.li>
          ))}
        </AnimatePresence>
      </m.ul>
    </>
  );
}
