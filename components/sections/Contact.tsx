import ContactForm from "@/components/sections/ContactForm";
import Button from "@/components/ui/Button";
import ExtLink from "@/components/ui/ExtLink";
import Section, { type Tone } from "@/components/ui/Section";
import { contact } from "@/data/portfolio";

export default function Contact({ tone }: { tone: Tone }) {
  return (
    <Section id="contact" title="Contact" tone={tone}>
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <p className="text-ink-muted max-w-[52ch] text-xl">{contact.intro}</p>
          <p className="mt-6 text-lg font-semibold">
            {contact.email.includes("@") ? (
              <a href={`mailto:${contact.email}`} className="underline underline-offset-4">
                {contact.email}
              </a>
            ) : (
              contact.email
            )}
          </p>
          <ul className="mt-4 space-y-2">
            {contact.links.map((l) => (
              <li key={l.href}>
                <ExtLink href={l.href}>{l.label}</ExtLink>
              </li>
            ))}
          </ul>
          {contact.cvHref && (
            <Button className="mt-8" variant="secondary" href={contact.cvHref} download>
              Télécharger mon CV
            </Button>
          )}
        </div>
        <ContactForm />
      </div>
    </Section>
  );
}
