"use client"; // utilise le navigateur (document, localStorage) : composant client

import { Moon, Sun } from "lucide-react";
import Button from "@/components/ui/Button";

export default function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next; // les tokens CSS changent de valeur : tout le site suit
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Navigation privée : le choix vaut pour cette visite seulement.
    }
  }

  // Les deux icônes sont rendues ; le CSS montre la bonne selon data-theme.
  // Pas d'état React : pas d'écart entre le HTML du serveur et celui du navigateur.
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label="Changer de thème (clair ou sombre)"
    >
      <Moon aria-hidden className="size-5 [[data-theme=dark]_&]:hidden" />
      <Sun aria-hidden className="hidden size-5 [[data-theme=dark]_&]:block" />
    </Button>
  );
}
