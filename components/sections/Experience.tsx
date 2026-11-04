import Timeline from "@/components/sections/Timeline";
import Section, { type Tone } from "@/components/ui/Section";
import { education, experience, type TimelineEntry } from "@/data/portfolio";

function Column({ title, entries }: { title: string; entries: TimelineEntry[] }) {
  if (entries.length === 0) return null;
  return (
    <div>
      <h3 className="mb-6 text-xl font-semibold">{title}</h3>
      <Timeline>
        {entries.map((e) => (
          <li key={e.title + e.start} className="relative">
            <span
              aria-hidden
              className="border-blue bg-paper absolute top-2 -left-[37px] size-3 rounded-full border-2"
            />
            <p className="text-ink-muted text-sm tabular-nums">
              {e.start}
              {e.end ? ` – ${e.end}` : ""}
            </p>
            <p className="mt-1 text-lg font-semibold">{e.title}</p>
            <p className="text-ink-muted">{e.place}</p>
            {e.points.length > 0 && (
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {e.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </Timeline>
    </div>
  );
}

export default function Experience({ tone }: { tone: Tone }) {
  return (
    <Section id="parcours" title="Parcours" tone={tone}>
      <div className="grid gap-14 md:grid-cols-2">
        <Column title="Expériences" entries={experience} />
        <Column title="Formation" entries={education} />
      </div>
    </Section>
  );
}
