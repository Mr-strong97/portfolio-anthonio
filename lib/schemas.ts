import { z } from "zod";

// Règles du formulaire (FRONTEND.md §12.2). Le serveur revalide toujours : le navigateur peut être contourné.
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Indique ton nom (2 caractères minimum).")
    .max(80, "Nom trop long (80 maximum).")
    .regex(/^[^\r\n]*$/, "Nom invalide."),
  email: z
    .string()
    .trim()
    .max(254, "Adresse trop longue.")
    .pipe(z.email("Adresse e-mail invalide.")),
  message: z
    .string()
    .trim()
    .min(10, "Message trop court (10 caractères minimum).")
    .max(2000, "Message trop long (2000 maximum)."),
});
