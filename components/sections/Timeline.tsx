"use client";

import { useScroll } from "motion/react";
import * as m from "motion/react-m";
import { useRef, type ReactNode } from "react";

// Frise : la ligne bleue se remplit au fil du défilement (transform scaleY, aucun recalcul de mise en page).
export default function Timeline({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  return (
    <div ref={ref} className="relative pl-8">
      <span aria-hidden className="bg-line absolute top-1 bottom-1 left-0 w-0.5" />
      <m.span
        aria-hidden
        style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
        className="bg-blue absolute top-1 bottom-1 left-0 w-0.5"
      />
      <ol className="space-y-10">{children}</ol>
    </div>
  );
}
