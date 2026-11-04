import type { ReactNode } from "react";
import Reveal from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

export type Tone = "paper" | "band";
// Carte = ton opposé à celui de sa section (comme la maquette).
export const cardTone = (tone: Tone) => (tone === "paper" ? "bg-band" : "bg-surface");

// Une section : fond alterné, ancre, titre h2 relié par aria-labelledby.
export default function Section({
  id,
  title,
  tone,
  children,
}: {
  id: string;
  title: string;
  tone: Tone;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-titre`}
      className={cn("py-[72px] lg:py-[120px]", tone === "band" ? "bg-band" : "bg-paper")}
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-10">
        <Reveal>
          <h2 id={`${id}-titre`} className="text-h2 mb-10 lg:mb-14">
            {title}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>{children}</Reveal>
      </div>
    </section>
  );
}
