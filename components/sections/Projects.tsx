import ProjectsExplorer from "@/components/sections/ProjectsExplorer";
import Section, { type Tone } from "@/components/ui/Section";
import { projects } from "@/data/portfolio";

export default function Projects({ tone }: { tone: Tone }) {
  return (
    <Section id="projets" title="Projets" tone={tone}>
      <ProjectsExplorer projects={projects} tone={tone} />
    </Section>
  );
}
