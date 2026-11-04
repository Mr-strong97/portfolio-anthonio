"use client";

import { useScroll } from "motion/react";
import * as m from "motion/react-m";

// Barre de 2 px en haut de page : sa largeur suit la progression du défilement (transform seul).
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <m.div
      aria-hidden
      style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
      className="bg-blue fixed inset-x-0 top-0 z-50 h-0.5"
    />
  );
}
