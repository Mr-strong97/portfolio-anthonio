"use client";

import { LazyMotion, MotionConfig, domMax } from "motion/react";
import type { ReactNode } from "react";

// LazyMotion : n'embarque que les fonctions d'animation utilisées (composants "m.*").
// reducedMotion="user" : Motion respecte le réglage « réduire les animations » du système.
export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
