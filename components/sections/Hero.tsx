import Button from "@/components/ui/Button";
import PhotoFrame from "@/components/ui/PhotoFrame";
import { hero } from "@/data/portfolio";

// Le texte est visible dès le premier rendu : l'animation "rise" ne déplace que la position.
const delay = (n: number) => ({ animationDelay: `${n * 70}ms` });

export default function Hero() {
  return (
    <section
      id="accueil"
      aria-labelledby="accueil-titre"
      className="bg-paper pt-28 pb-[72px] lg:pt-36 lg:pb-[120px]"
    >
      <div className="mx-auto grid max-w-[1200px] gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:items-center lg:px-10">
        <div className="lg:col-span-7">
          {hero.availability && (
            <p className="animate-rise bg-band mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium">
              <span aria-hidden className="bg-blue size-2 rounded-full" />
              {hero.availability}
            </p>
          )}
          <h1 id="accueil-titre" className="text-display">
            {hero.nameLines.map((line, i) => (
              <span key={line} className="animate-rise block" style={delay(i)}>
                {line}
              </span>
            ))}
          </h1>
          <p className="animate-rise mt-6 text-2xl font-semibold" style={delay(3)}>
            {hero.title}
          </p>
          <p className="animate-rise text-ink-muted mt-3 max-w-[52ch] text-xl" style={delay(4)}>
            {hero.tagline}
          </p>
          <div className="animate-rise mt-8 flex flex-wrap gap-3" style={delay(5)}>
            <Button size="lg" href={hero.primaryCta.href}>
              {hero.primaryCta.label}
            </Button>
            <Button size="lg" variant="secondary" href={hero.secondaryCta.href}>
              {hero.secondaryCta.label}
            </Button>
          </div>
          {hero.proofs.length > 0 && (
            <dl className="border-line mt-12 grid grid-cols-3 gap-4 border-t pt-6">
              {hero.proofs.map((p) => (
                <div key={p.label}>
                  <dd className="text-3xl font-bold tracking-tight">{p.value}</dd>
                  <dt className="text-ink-muted text-sm">{p.label}</dt>
                </div>
              ))}
            </dl>
          )}
        </div>
        {/* Contour bleu décalé de 12 px : simple pseudo-élément, aucun JavaScript. */}
        <div
          className="animate-rise before:border-blue relative pr-3 pb-3 before:absolute before:top-3 before:right-0 before:bottom-0 before:left-3 before:rounded-3xl before:border-[1.5px] lg:col-span-5"
          style={delay(2)}
        >
          <PhotoFrame {...hero.portrait} priority sizes="(min-width: 1024px) 480px, 90vw" />
        </div>
      </div>
    </section>
  );
}
