import Section, { cardTone, type Tone } from "@/components/ui/Section";
import { testimonials } from "@/data/portfolio";

export default function Testimonials({ tone }: { tone: Tone }) {
  return (
    <Section id="temoignages" title="Témoignages" tone={tone}>
      <ul className="grid gap-6 md:grid-cols-2">
        {testimonials.map((t) => (
          <li
            key={t.name}
            className={`border-line rounded-2xl border p-6 lg:p-8 ${cardTone(tone)}`}
          >
            <blockquote className="text-lg">« {t.quote} »</blockquote>
            <p className="mt-5 font-semibold">{t.name}</p>
            <p className="text-ink-muted text-sm">
              {t.role}, {t.organization}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
