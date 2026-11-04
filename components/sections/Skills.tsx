import { Database, Monitor, Server, Wrench } from "lucide-react";
import Section, { cardTone, type Tone } from "@/components/ui/Section";
import { skills, type IconKey } from "@/data/portfolio";

const icons = {
  frontend: Monitor,
  backend: Server,
  data: Database,
  tools: Wrench,
} satisfies Record<IconKey, unknown>;

export default function Skills({ tone }: { tone: Tone }) {
  return (
    <Section id="competences" title="Compétences" tone={tone}>
      <ul className="grid gap-6 md:grid-cols-2">
        {skills.map((s) => {
          const Icon = icons[s.icon];
          return (
            <li
              key={s.name}
              className={`border-line rounded-2xl border p-6 lg:p-8 ${cardTone(tone)}`}
            >
              <Icon aria-hidden className="text-blue size-6" />
              <h3 className="mt-4 text-xl font-semibold">{s.name}</h3>
              <p className="text-ink-muted mt-2">{s.summary}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {s.items.map((t) => (
                  <li
                    key={t}
                    className="border-line bg-paper rounded-full border px-3 py-1 text-sm font-medium"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
