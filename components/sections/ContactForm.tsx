"use client";

import { CircleCheck, LoaderCircle, TriangleAlert } from "lucide-react";
import { useActionState, useRef } from "react";
import { sendMessage, type FormState } from "@/app/actions/contact";
import Button from "@/components/ui/Button";
import Field from "@/components/ui/Field";

const initial: FormState = { status: "idle" };

export default function ContactForm() {
  const [state, action, pending] = useActionState(sendMessage, initial);
  const stamp = useRef<HTMLInputElement>(null);
  // Horodatage posé au premier contact avec le formulaire : un robot qui envoie tout de suite est refusé.
  const arm = () => {
    if (stamp.current && !stamp.current.value) stamp.current.value = String(Date.now());
  };

  if (state.status === "success") {
    return (
      <p
        role="status"
        className="border-line bg-surface flex items-center gap-3 rounded-2xl border p-8 text-lg font-semibold"
      >
        <CircleCheck aria-hidden className="text-success size-6 shrink-0" />
        {state.message}
      </p>
    );
  }
  return (
    <form
      action={action}
      onFocus={arm}
      noValidate
      className="border-line bg-surface rounded-2xl border p-6 lg:p-8"
    >
      <input ref={stamp} type="hidden" name="startedAt" />
      {/* Champ piège : invisible pour les humains, rempli par les robots. */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label>
          Site web <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="space-y-2">
        <Field
          label="Nom"
          name="name"
          autoComplete="name"
          defaultValue={state.values?.name}
          error={state.errors?.name}
        />
        <Field
          label="E-mail"
          name="email"
          type="email"
          autoComplete="email"
          defaultValue={state.values?.email}
          error={state.errors?.email}
        />
        <Field
          label="Message"
          name="message"
          multiline
          defaultValue={state.values?.message}
          error={state.errors?.message}
        />
      </div>
      {state.status === "error" && state.message && (
        <p role="alert" className="text-error mt-2 flex items-start gap-2 text-sm font-medium">
          <TriangleAlert aria-hidden className="mt-0.5 size-4 shrink-0" />
          {state.message}
        </p>
      )}
      <Button type="submit" size="lg" disabled={pending} aria-busy={pending} className="mt-6">
        {pending && <LoaderCircle aria-hidden className="size-5 animate-spin" />}
        Envoyer le message
      </Button>
      <p className="text-ink-muted mt-4 text-sm">
        Ton message sert uniquement à te répondre : il n’est ni stocké sur ce site, ni partagé, et
        aucun cookie n’est déposé.
      </p>
    </form>
  );
}
