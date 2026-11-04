"use server";

import { contactSchema } from "@/lib/schemas";

export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"name" | "email" | "message", string>>;
  values?: { name: string; email: string; message: string };
};

// Server Action : s'exécute sur le serveur, donc la clé Resend n'atteint jamais le navigateur.
export async function sendMessage(_prev: FormState, formData: FormData): Promise<FormState> {
  const get = (k: string) => String(formData.get(k) ?? "");
  const values = { name: get("name"), email: get("email"), message: get("message") };

  if (get("website")) return { status: "success", message: "Merci !" }; // champ piège rempli : robot, on ne dit rien
  const started = Number(get("startedAt"));
  if (!started || Date.now() - started < 3000) {
    return { status: "error", values, message: "Envoi trop rapide : réessaie dans un instant." };
  }

  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) {
    const errors: NonNullable<FormState["errors"]> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof typeof errors;
      if (!errors[key]) errors[key] = issue.message;
    }
    return { status: "error", values, errors, message: "Vérifie les champs signalés." };
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!key || !to)
    return {
      status: "error",
      values,
      message: "Le formulaire n'est pas encore configuré : écris-moi directement par e-mail.",
    };

  const { name, email, message } = parsed.data;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev",
      to,
      reply_to: email,
      subject: `Portfolio : message de ${name}`,
      text: `${message}\n\n— ${name} <${email}>`,
    }),
  });
  if (!res.ok)
    return {
      status: "error",
      values,
      message: "L'envoi a échoué : réessaie ou écris-moi directement.",
    };
  return { status: "success", message: "Merci, ton message est bien parti." };
}
