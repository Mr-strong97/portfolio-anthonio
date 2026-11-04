# Portfolio — guide de lancement et de déploiement

Site monopage : Next.js 16 · TypeScript · Tailwind CSS 4 · Motion · Lucide. Toute la conception est dans `FRONTEND.md`.

## 1. Prérequis

- Node.js 20.9 ou plus (22 LTS recommandé) : https://nodejs.org
- Un terminal et un éditeur (VS Code).

## 2. Lancer en local

```bash
npm install
cp .env.example .env.local     # Windows : copy .env.example .env.local
npm run dev                    # puis ouvre http://localhost:3000
```

Après chaque modification de `.env.local`, arrête le serveur (Ctrl+C) et relance `npm run dev`.

## 3. Remplir ton contenu

Tout le texte, les liens et les images sont déclarés dans **`data/portfolio.ts`**. Les composants n'ont aucun texte en dur.

- Remplace chaque `[À COMPLÉTER]` (repère-les avec `grep -n "À COMPLÉTER" data/portfolio.ts`, ou la recherche de ton éditeur).
- Un tableau vide `[]` masque la section (ex. `testimonials`). Rien n'est inventé : pas de chiffre, de témoignage ni de projet sans source.
- Nom affiché et nom court du logo : à confirmer dans `site` et `hero.nameLines`.
- Images : dépose des fichiers WebP dans `public/images/` et renseigne `src`, `width`, `height` et `alt`. Captures de projets : format 16:10 (ex. 1280 × 800).
- CV : place `cv.pdf` dans `public/cv/` puis mets `cvHref: "/cv/cv.pdf"`.
- Témoignages : seulement des citations réelles, avec l'accord de la personne.

## 4. Formulaire de contact (Resend)

1. Crée un compte sur https://resend.com puis une clé API.
2. Dans `.env.local` :
   - `RESEND_API_KEY` : ta clé (secrète).
   - `CONTACT_TO_EMAIL` : l'adresse qui reçoit les messages. Sans domaine vérifié, ce doit être l'e-mail de ton compte Resend.
   - `CONTACT_FROM_EMAIL` : `onboarding@resend.dev` tant qu'aucun domaine n'est vérifié.
3. Plan gratuit : 3 000 e-mails par mois, 100 par jour. Pour un autre destinataire, vérifie un domaine dans Resend.
4. Sécurité : `.env.local` ne doit jamais être publié (il est déjà dans `.gitignore`) ; ne mets jamais de secret dans une variable `NEXT_PUBLIC_…`.

Anti-spam (niveau 1, déjà actif) : champ piège, délai minimal de 3 secondes, validation Zod côté serveur. Avant une large diffusion, ajoute le niveau 2 (Cloudflare Turnstile + limitation de débit, voir `FRONTEND.md` §12.3).

## 5. Vérifier avant de publier

```bash
npm run lint        # style et accessibilité du code
npm run typecheck   # types TypeScript
npm run build       # build de production (connexion internet requise : la police est téléchargée)
npm run start       # teste le build sur http://localhost:3000
```

Puis dans Chrome : DevTools, onglet Lighthouse, profil Mobile. Objectif : 90 ou plus dans les 4 catégories. Teste aussi au clavier (Tab, Entrée, Échap dans le menu) et avec le mode sombre.

## 6. Déployer sur Vercel

1. Mets le projet sur GitHub : `git init`, `git add .`, `git commit -m "Portfolio"`, crée un dépôt vide puis `git push`.
2. Sur https://vercel.com : Add New, Project, importe le dépôt (Next.js est détecté automatiquement).
3. Settings, Environment Variables : ajoute les 4 variables de `.env.example` pour Production et Preview. `NEXT_PUBLIC_SITE_URL` = l'adresse finale du site.
4. Deploy. Vérifie ensuite : envoi réel du formulaire, aperçu de partage (LinkedIn, WhatsApp), `/sitemap.xml`, `/robots.txt`.

Attention : l'offre Vercel Hobby est réservée à l'usage personnel non commercial. Si le site sert à décrocher des missions payées, prévois l'offre Pro ou un autre hébergeur (`FRONTEND.md`, décision D6).

Maintenance : Next.js publie des correctifs de sécurité chaque mois. Lance `npm update next` régulièrement.

## 7. Dépannage

| Symptôme | Cause probable | Solution |
|---|---|---|
| `Failed to fetch Instrument Sans` au build | pas d'accès à Google Fonts | vérifie ta connexion puis relance `npm run build` |
| Erreur « Node.js version required » | Node trop ancien | installe Node 22 LTS |
| Le formulaire répond « pas encore configuré » | variables manquantes | renseigne `.env.local` puis relance `npm run dev` |
| Le formulaire répond « envoi trop rapide » | message envoyé en moins de 3 s | attends un instant avant de cliquer |
| Styles absents ou cassés | navigateur trop ancien (Tailwind 4 : Safari 16.4+, Chrome 111+, Firefox 128+) | mets le navigateur à jour |
| Une image ne s'affiche pas | mauvais chemin ou dimensions | le fichier doit être dans `public/` ; `src` commence par `/` |

## 8. Structure

```text
app/            layout, page, styles (globals.css, animations.css), sitemap, robots, action du formulaire
components/     ui/ (atomes) · layout/ (navbar, footer…) · sections/ (Hero, About…) · motion/
data/           portfolio.ts  ← tout le contenu
hooks/ lib/     useActiveSection · cn · schémas Zod
public/         images/ (portraits WebP) · og.png (image de partage)
FRONTEND.md     conception complète (design system, animations, accessibilité, critères d'acceptation)
```

## 9. Volontairement non inclus

Tests automatisés (plan et outils dans `FRONTEND.md` §13), données structurées JSON-LD, anti-spam de niveau 2, version anglaise.
# portfolio-anthonio
