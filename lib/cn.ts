// Assemble des noms de classes en ignorant les valeurs vides : cn("a", cond && "b") → "a b".
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
