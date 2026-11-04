import { useId } from "react";

type Props = {
  label: string;
  name: string;
  error?: string;
  defaultValue?: string;
  multiline?: boolean;
  type?: string;
  autoComplete?: string;
};

// Champ de formulaire : label visible, erreur reliée au champ (aria-describedby) et zone d'erreur
// à hauteur réservée, donc aucun saut de mise en page.
export default function Field({ label, name, error, multiline, ...rest }: Props) {
  const id = useId();
  const shared = {
    id,
    name,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-erreur` : undefined,
    className:
      "mt-2 block w-full rounded-lg border border-field-border bg-surface px-4 py-3 text-ink",
    ...rest,
  };
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      {multiline ? <textarea rows={5} {...shared} /> : <input {...shared} />}
      <p id={`${id}-erreur`} className="text-error mt-1 min-h-5 text-sm">
        {error}
      </p>
    </div>
  );
}
