"use client";

import { useInView } from "motion/react";
import * as m from "motion/react-m";
import { useEffect, useRef, useState, type ReactNode } from "react";

// Visible par défaut (HTML du serveur, sans JavaScript). Après l'hydratation, seuls les blocs
// encore sous l'écran sont masqués, puis révélés à leur arrivée (opacity + transform, 500 ms).
export default function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const seen = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  useEffect(() => {
    if ((ref.current?.getBoundingClientRect().top ?? 0) > window.innerHeight) setArmed(true);
  }, []);
  return (
    <m.div
      ref={ref}
      initial={false}
      animate={armed && !seen ? { opacity: 0, y: 16 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}
