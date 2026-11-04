import PhotoFrame from "@/components/ui/PhotoFrame";
import Section, { type Tone } from "@/components/ui/Section";
import { about } from "@/data/portfolio";

export default function About({ tone }: { tone: Tone }) {
  return (
    <Section id="a-propos" title="À propos" tone={tone}>
      <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
        <div className="max-w-[420px] lg:col-span-5">
          <PhotoFrame {...about.photo} sizes="(min-width: 1024px) 420px, 90vw" />
        </div>
        <div className="lg:col-span-7">
          <div className="max-w-[65ch] space-y-5 text-lg">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          {about.principles.length > 0 && (
            <ul className="border-line mt-10 grid gap-6 border-t pt-8 sm:grid-cols-3">
              {about.principles.map((p) => (
                <li key={p.title}>
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="text-ink-muted mt-1">{p.text}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Section>
  );
}
