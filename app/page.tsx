import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Experience from "@/components/sections/Experience";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Testimonials from "@/components/sections/Testimonials";
import {
  about,
  education,
  experience,
  projects,
  site,
  skills,
  testimonials,
} from "@/data/portfolio";

// Une section sans donnée n'apparaît ni dans la page ni dans le menu (FRONTEND.md §3).
const sections = [
  { id: "a-propos", label: "À propos", show: about.paragraphs.length > 0, Comp: About },
  { id: "competences", label: "Compétences", show: skills.length > 0, Comp: Skills },
  { id: "projets", label: "Projets", show: projects.length > 0, Comp: Projects },
  {
    id: "parcours",
    label: "Parcours",
    show: experience.length + education.length > 0,
    Comp: Experience,
  },
  { id: "temoignages", label: "Témoignages", show: testimonials.length > 0, Comp: Testimonials },
  { id: "contact", label: "Contact", show: true, Comp: Contact },
].filter((s) => s.show);

const navItems = [
  { id: "accueil", label: "Accueil" },
  ...sections.map(({ id, label }) => ({ id, label })),
];

export default function Page() {
  return (
    <>
      <Navbar items={navItems} brand={site.shortName} />
      <main id="contenu">
        <Hero />
        {/* Le fond alterne papier / bande selon le rang des sections présentes. */}
        {sections.map(({ id, Comp }, i) => (
          <Comp key={id} tone={i % 2 === 0 ? "band" : "paper"} />
        ))}
      </main>
      <Footer items={navItems} />
    </>
  );
}
