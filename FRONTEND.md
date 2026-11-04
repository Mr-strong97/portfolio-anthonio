# FRONTEND.md — Portfolio de [Nom affiché]

> **Version 0.1 · Phase 2 (conception) · 2 novembre 2026 · À VALIDER**
> Aucun code applicatif n'est écrit avant la validation de ce document.
> `[À COMPLÉTER]` marque toute information absente du dossier fourni. Rien n'est inventé : ni chiffre, ni diplôme, ni témoignage, ni projet.

**Sommaire** : 1 Décisions · 2 Objectifs · 3 Contenu · 4 Sections et wireframes · 5 Architecture · 6 Design system · 7 Animations · 8 Photos · 9 Accessibilité · 10 Performance · 11 SEO · 12 Formulaire de contact · 13 Qualité et tests · 14 Déploiement · 15 Critères d'acceptation · 16 Risques · Annexes

---

## 1. Décisions à valider

| #   | Sujet             | Recommandation                                                                                                                                                       | Alternative                                                                      |
| --- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| D1  | Typographie       | **Instrument Sans**, une seule famille variable (graisse 400–700, largeur 75–100). Titres en largeur réduite, texte en largeur normale                               | Plus Jakarta Sans : dans l'esprit géométrique de la maquette, mais plus courante |
| D2  | Palette           | Couleurs **exactes de la maquette** (bleu `#0047FF`, gris `#F3F3F4`, encre `#1A1C1C`, panneau `#2F3131`) + thème sombre dérivé                                       | –                                                                                |
| D3  | Hero              | **Nom en très grand** + portrait cadré. Chiffres uniquement s'ils sont réels. Panneau « production metrics » supprimé (métriques fictives)                           | Panneau sombre « ma stack » à la place                                           |
| D4  | Contact           | Server Action + Zod + **Resend**. Anti-spam niveau 1 (piège + délai) au lancement, Cloudflare Turnstile ensuite                                                      | Service de formulaire tiers (Formspree) : moins de contrôle                      |
| D5  | Icônes de réseaux | Lucide 1.x n'a **plus d'icônes de marques** (GitHub, LinkedIn…). Icônes génériques Lucide + libellé texte                                                            | SVG locaux (Simple Icons) pour ces seuls logos                                   |
| D6  | Hébergement       | Vercel, mais **l'offre Hobby est réservée à l'usage personnel non commercial**. Si le site sert à décrocher des missions payées : Pro (20 $/mois) ou autre hébergeur | Autre hébergeur à comparer                                                       |

**Précision apportée au cadrage (US1)** : à 360 px de large, nom, titre et bouton principal sont visibles sans défiler ; le portrait vient juste en dessous (un portrait 4:5 et le texte ne tiennent pas ensemble dans ≈ 560 px de haut). À 1440 px, tout le Hero tient sans défiler.

**Blocage pour la Phase 3** : le fichier d'informations reçu ne contient qu'un lien WhatsApp (`content://com.whatsapp.w4b…`), pas ton texte. Sans le vrai fichier (.html, .txt, .md ou .pdf), chaque section sortira en `[À COMPLÉTER]`.

---

## 2. Objectifs, visiteurs, parcours

Rappel du cadrage validé en Phase 1.

- **Objectif** : en 30 secondes, un visiteur comprend qui tu es et ce que tu sais faire, voit une preuve (un projet avec démo ou code) et peut te contacter en deux clics.
- **Visiteurs** : recruteur ou responsable technique (priorité) · client ou PME · pair, enseignant, jury.
- **Parcours** : arrivée (CV, LinkedIn, lien partagé) → Hero (qui, quoi) → Projets (preuve) → Parcours et Compétences (crédibilité) → Contact.
- **MVP** : toutes les sections qui ont des données réelles, formulaire sécurisé, responsive, accessibilité, SEO de base, mode clair/sombre, animations sobres, déploiement, zip.
- **Après le MVP** : version anglaise, blog ou CMS, analytics, pages détaillées par projet.

---

## 3. Contenu : contrat de données

Tout le texte, tous les liens et toutes les images viennent d'un seul fichier typé, `data/portfolio.ts`. Les composants ne contiennent aucun texte en dur. **Un bloc vide n'est pas rendu** : la section disparaît de la page et du menu.

| Bloc           | Champs                                                                                                                                                                                                                     | Obligatoire          | État                                    |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | --------------------------------------- |
| `site`         | nom affiché, nom court (logo), titre / métier, description SEO, URL du site, langue                                                                                                                                        | oui                  | `[À COMPLÉTER]`                         |
| `hero`         | lignes du nom (liste, pour contrôler les retours à la ligne), titre, accroche (≤ 160 car.), bouton principal, bouton secondaire, preuves (0 à 3 : valeur + libellé), disponibilité (optionnelle), portrait (fichier + alt) | nom, titre, accroche | portrait fourni ; reste `[À COMPLÉTER]` |
| `about`        | titre, 1 à 3 paragraphes (≤ 600 car.), principes (0 à 3 : titre + phrase), photo (fichier + alt)                                                                                                                           | paragraphes          | photo fournie ; reste `[À COMPLÉTER]`   |
| `skills`       | catégories : nom, icône Lucide, une phrase, liste de compétences                                                                                                                                                           | 1 catégorie          | `[À COMPLÉTER]`                         |
| `projects`     | id, titre, catégorie, année, description (≤ 220 car.), technologies, capture (fichier + alt), lien démo, lien code, « à la une », résultat réel (valeur + libellé)                                                         | 1 projet             | `[À COMPLÉTER]`                         |
| `experience`   | poste, organisation, lieu, début, fin, missions, technologies (stage compris)                                                                                                                                              | non                  | `[À COMPLÉTER]`                         |
| `education`    | diplôme, établissement, début, fin                                                                                                                                                                                         | non                  | `[À COMPLÉTER]`                         |
| `testimonials` | citation, nom, rôle, organisation, accord de publication                                                                                                                                                                   | non                  | uniquement réels                        |
| `contact`      | e-mail public, liens (LinkedIn, GitHub, WhatsApp, autre), phrase d'invitation, CV (PDF)                                                                                                                                    | e-mail               | `[À COMPLÉTER]`                         |

Règles de contenu :

- Reformulation autorisée (orthographe, clarté) ; ajout de faits interdit.
- Dates en `AAAA` ou `mois AAAA`, par ordre antéchronologique.
- Un chiffre (preuve, résultat) n'apparaît que s'il est vérifiable et accompagné de son libellé.
- Un témoignage n'apparaît qu'avec le nom de la personne et son accord.

---

## 4. Sections et wireframes

**Légende** : `┌┐` bloc clair · `╔╗` panneau sombre · `[ ]` bouton, champ ou donnée · `…` répété selon les données · `↗` = icône Lucide `ArrowUpRight` (lien qui sort du site). Les wireframes sont des schémas, pas des maquettes au pixel près.

### 4.0 Gabarit global

- Conteneur 1200 px maximum, 12 colonnes, gouttière 24 px (32 px dès 1024 px), marges latérales 20 / 32 / 40 px.
- Navbar fixe de 64 px (56 px en mobile). Chaque ancre a un `scroll-margin-top` égal à la hauteur de la barre + 16 px.
- Les fonds alternent `paper` / `band` selon le rang des sections **présentes**, comme dans la maquette.

| Rang | Section     | Ancre          | Condition                      |
| ---- | ----------- | -------------- | ------------------------------ |
| 1    | Hero        | `#accueil`     | toujours                       |
| 2    | À propos    | `#a-propos`    | si `about`                     |
| 3    | Compétences | `#competences` | si `skills`                    |
| 4    | Projets     | `#projets`     | si `projects`                  |
| 5    | Parcours    | `#parcours`    | si `experience` ou `education` |
| 6    | Témoignages | `#temoignages` | si témoignages réels           |
| 7    | Contact     | `#contact`     | toujours                       |
| –    | Footer      | –              | toujours                       |

### 4.1 Navbar

```text
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  barre de progression (2 px)
┌────────────────────────────────────────────────────┐
│ Nom•  Accueil À propos … Contact  ◐ [Me contacter] │
└────────────────────────────────────────────────────┘
```

Mobile (360 px), menu fermé puis ouvert :

```text
┌────────────────────────┐    ┌────────────────────────┐
│ Nom•          ◐  ☰     │    │ Nom•          ◐  ✕     │
└────────────────────────┘    ├────────────────────────┤
                              │ Accueil                │
                              │ À propos               │
                              │ Compétences            │
                              │ Projets                │
                              │ Parcours               │
                              │ Contact                │
                              │                        │
                              │ [ Me contacter ]       │
                              └────────────────────────┘
```

- Les liens correspondent aux sections présentes (une section sans données disparaît du menu).
- Lien actif : trait de 2 px sous le lien + `aria-current="location"`. La section active est calculée par `useActiveSection` (IntersectionObserver).
- Barre transparente en haut de page ; après 8 px de défilement, fond `paper` à 85 % avec flou.
- Menu mobile : panneau sous la barre, focus piégé, `Échap` ferme, défilement du fond bloqué, liens de 44 px de haut.
- Bouton thème : icônes Lucide `Sun` / `Moon`, `aria-label` qui annonce l'action (« Passer en mode sombre »).
- Logo : nom court + point bleu, comme dans la maquette.

### 4.2 Hero

```text
┌────────────────────────────────────────────────────┐
│ ● Disponible pour …      ┌───────────────────────┐ │
│                          │                       │ │
│ Kalenga wa               │   PORTRAIT 4:5        │ │
│ Kamanda                  │   contour bleu décalé │ │
│ Anthonio                 │                       │ │
│                          │                       │ │
│ [Titre / métier]         │                       │ │
│ [Accroche, 160 car.]     └───────────────────────┘ │
│                                                    │
│ [Voir mes projets]  [Me contacter]                 │
├────────────────────────────────────────────────────┤
│ [preuve 1]   [preuve 2]   [preuve 3]               │
└────────────────────────────────────────────────────┘
```

Mobile (360 px) :

```text
┌──────────────────────────────┐
│ ● Disponible pour …          │
│                              │
│ Kalenga wa                   │
│ Kamanda                      │
│ Anthonio                     │
│                              │
│ [Titre / métier]             │
│ [Accroche, 3 lignes]         │
│                              │
│ [ Voir mes projets ]         │
│ [ Me contacter ]             │
│ · · · pli de l'écran · · ·   │
│ ┌──────────────────────────┐ │
│ │                          │ │
│ │ PORTRAIT 4:5             │ │
│ │                          │ │
│ └──────────────────────────┘ │
│ [preuve 1]  [preuve 2]       │
└──────────────────────────────┘
```

- **H1 = le nom**, en très grand, en lignes contrôlées par les données. Sous le nom : titre (une ligne) puis accroche (≤ 160 caractères).
- Bouton principal bleu : « Voir mes projets » (hypothèse : cible recruteurs). Bouton secondaire gris : « Me contacter ». Pas de flèche dans les boutons.
- Pastille de disponibilité : seulement si tu fournis un statut réel.
- Bande de preuves : 0 à 3 éléments « valeur + libellé » réels ; s'il n'y en a aucun, la bande n'existe pas.
- Portrait : cadre 4:5, rayon 24 px, contour bleu de 1,5 px décalé de 12 px (pseudo-élément), chargement prioritaire.
- Mobile : l'ordre est pastille → nom → titre → accroche → boutons → portrait → preuves.

### 4.3 À propos

```text
┌────────────────────────────────────────────────────┐
│ ┌────────────────────┐  À propos                   │
│ │                    │  [Phrase d'ouverture]       │
│ │                    │                             │
│ │ PHOTO 2            │  [Paragraphe 1]             │
│ │ (sourire)          │  [Paragraphe 2]             │
│ │                    │  ────────────────────────── │
│ │                    │  [Principe] [Principe]      │
│ └────────────────────┘                             │
└────────────────────────────────────────────────────┘
```

- Texte issu de ton fichier d'informations ; seconde photo à gauche (desktop), au-dessus du texte (mobile).
- Principes (0 à 3) : titre + phrase, séparés par des filets. Pas de numérotation 01/02/03 (ce ne sont pas des étapes).

### 4.4 Compétences

```text
┌────────────────────────────────────────────────────┐
│ Compétences                                        │
│ [Titre de section]                                 │
│                                                    │
│ ┌──────────────────────┐  ┌──────────────────────┐ │
│ │ [icône Lucide]       │  │ [icône Lucide]       │ │
│ │ [Catégorie]          │  │ [Catégorie]          │ │
│ │ [1 phrase]           │  │ [1 phrase]           │ │
│ │ [tag] [tag] [tag]    │  │ [tag] [tag] [tag]    │ │
│ └──────────────────────┘  └──────────────────────┘ │
│ ┌──────────────────────┐  ┌──────────────────────┐ │
│ │ [icône Lucide]       │  │ [icône Lucide]       │ │
│ │ [Catégorie]          │  │ [Catégorie]          │ │
│ │ [1 phrase]           │  │ [1 phrase]           │ │
│ │ [tag] [tag] [tag]    │  │ [tag] [tag] [tag]    │ │
│ └──────────────────────┘  └──────────────────────┘ │
└────────────────────────────────────────────────────┘
```

- 2 à 4 catégories en grille 2 colonnes (1 colonne en mobile). Chaque carte : icône Lucide, nom, une phrase, puces de technologies.
- Une carte prend le ton opposé à sa section (grise sur fond blanc, blanche sur fond gris), comme dans la maquette.
- Pas d'effet au survol : ces cartes ne sont pas cliquables.

### 4.5 Projets

```text
┌────────────────────────────────────────────────────┐
│ Projets                                            │
│ [Titre de section]                                 │
│ (Tous) (Django) (Next.js) …  n projets             │
│                                                    │
│ ╔════════════════════════════════════════════════╗ │
│ ║ ┌───────────────────┐  [Catégorie · année]     ║ │
│ ║ │                   │  [Titre]                 ║ │
│ ║ │ capture           │  [Description]           ║ │
│ ║ │ 16:10             │  [tag] [tag]             ║ │
│ ║ │                   │  [Démo ↗] [Code ↗]       ║ │
│ ║ └───────────────────┘                          ║ │
│ ╚════════════════════════════════════════════════╝ │
│                                                    │
│ ┌──────────────────────┐  ┌──────────────────────┐ │
│ │ [capture 16:10]      │  │ [capture 16:10]      │ │
│ │ [Titre]              │  │ [Titre]              │ │
│ │ [Description]        │  │ [Description]        │ │
│ │ [tag] [tag]          │  │ [tag] [tag]          │ │
│ │ [Démo ↗] [Code ↗]    │  │ [Démo ↗] [Code ↗]    │ │
│ └──────────────────────┘  └──────────────────────┘ │
└────────────────────────────────────────────────────┘
```

- Filtre : « Tous » + les technologies utilisées par au moins un projet (6 puces maximum, triées par fréquence). `aria-pressed` sur chaque puce ; le nombre de résultats est annoncé (`aria-live="polite"`).
- Carte projet : capture 16:10, titre, description (≤ 220 car.), technologies, liens « Démo » et « Code » (icône `ArrowUpRight`, nouvel onglet). **Un lien absent = un bouton absent** (jamais de lien mort).
- Projet « à la une » : panneau sombre pleine largeur (une seule fois), texte à gauche et capture à droite, comme dans la maquette. S'il n'y en a pas, tous les projets sont des cartes standard.
- Résultat chiffré : affiché seulement s'il est fourni et vérifiable.
- Capture manquante : bloc neutre portant le nom du projet (aucune fausse capture).
- Mobile : une colonne ; le projet à la une devient une carte sombre.

### 4.6 Parcours

```text
┌────────────────────────────────────────────────────┐
│ Parcours                                           │
│ [Titre de section]                                 │
│                                                    │
│ Expériences               Formation                │
│ ●─ [année]                ●─ [année]               │
│ │  [Poste — Org.]         │  [Diplôme]             │
│ │  [mission]              │  [Établissement]       │
│ ●─ [année]                ○                        │
│ │  [Stage — Org.]                                  │
│ ○                                                  │
└────────────────────────────────────────────────────┘
```

- Frise verticale (expériences, stage compris, et formation). Deux colonnes dès 768 px, empilées en dessous.
- Les années servent de repères : c'est le seul endroit où une numérotation a un sens.
- La ligne se remplit pendant le défilement et chaque point se « valide » quand il est atteint (voir §7).

### 4.7 Témoignages

```text
┌────────────────────────────────────────────────────┐
│ Témoignages (si réels)                             │
│                                                    │
│ ┌──────────────────────┐  ┌──────────────────────┐ │
│ │ « [citation] »       │  │ « [citation] »       │ │
│ │                      │  │                      │ │
│ │ [Nom] — [Rôle]       │  │ [Nom] — [Rôle]       │ │
│ │ [Organisation]       │  │ [Organisation]       │ │
│ └──────────────────────┘  └──────────────────────┘ │
└────────────────────────────────────────────────────┘
```

- Section affichée seulement avec des témoignages réels (citation, nom, rôle, organisation, accord).
- Pas d'étoiles : une note chiffrée serait une donnée inventée.

### 4.8 Contact

```text
┌────────────────────────────────────────────────────┐
│ Contact                 ┌────────────────────────┐ │
│ [Phrase d'invitation]   │ Nom                    │ │
│                         │ [__________________]   │ │
│ @ [adresse e-mail]      │ E-mail                 │ │
│ [LinkedIn] [GitHub]     │ [__________________]   │ │
│ [WhatsApp]              │ Message                │ │
│ [Télécharger mon CV]    │ [__________________]   │ │
│                         │ [__________________]   │ │
│                         │ [ Envoyer le message ] │ │
│                         │ (succès / erreur)      │ │
│                         │ (note confidentialité) │ │
│                         └────────────────────────┘ │
└────────────────────────────────────────────────────┘
```

- Gauche : phrase d'invitation, e-mail, liens (LinkedIn, GitHub, WhatsApp si fourni), bouton « Télécharger mon CV » si un PDF est fourni.
- Droite : formulaire à 3 champs (nom, e-mail, message) pour maximiser les envois. Détails au §12.
- Mobile : le formulaire passe sous les liens.

### 4.9 Footer

```text
┌────────────────────────────────────────────────────┐
│ Nom•            Navigation      Liens              │
│ [1 phrase]      Accueil …       [LinkedIn]         │
│                 Contact         [GitHub]           │
├────────────────────────────────────────────────────┤
│ © 2026 [Nom]            [Retour en haut]           │
└────────────────────────────────────────────────────┘
```

- Nom court + une phrase, liens de navigation, liens externes (avec `ArrowUpRight`), bouton « Retour en haut » (Lucide `ArrowUp`).
- Pas de faux statut « système opérationnel ».

---

## 5. Architecture Next.js

### 5.1 Stack (versions vérifiées le 2 novembre 2026)

| Brique     | Choix                                               | Version                                                   | Pourquoi                                                |
| ---------- | --------------------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------- |
| Framework  | Next.js, App Router                                 | 16.x (16.4 du 7 oct. 2026 d'après les sources consultées) | page statique + îlots interactifs                       |
| UI         | React, TypeScript strict                            | React 19 (fourni avec Next 16)                            | typage = moins d'erreurs                                |
| Style      | Tailwind CSS                                        | 4.x (4.3 d'après les sources consultées)                  | configuration dans le CSS, tokens en variables          |
| Animation  | Motion (`motion/react`)                             | 12.x                                                      | `LazyMotion` pour alléger le JS                         |
| Icônes     | lucide-react                                        | 1.x                                                       | pas d'icônes de marques (voir D5)                       |
| Validation | Zod                                                 | 4.x                                                       | un schéma, validé côté serveur                          |
| E-mail     | Resend (SDK Node)                                   | dernière stable                                           | clé uniquement côté serveur                             |
| Polices    | `next/font` (Instrument Sans)                       | –                                                         | auto-hébergée, aucune requête vers Google côté visiteur |
| Qualité    | ESLint (flat config) + Prettier (+ plugin Tailwind) | –                                                         | style unique                                            |
| Tests      | Vitest + Testing Library · Playwright + axe-core    | –                                                         | unitaires, intégration, e2e, accessibilité              |
| Runtime    | Node.js LTS ≥ 20.9 (22 ou 24 recommandés)           | –                                                         | exigé par Next 16                                       |

Versions exactes figées à l'installation (`package-lock.json`). Next.js publie des correctifs de sécurité chaque mois : prévoir une mise à jour mensuelle.

### 5.2 Arborescence

```text
portfolio/
├─ app/
│  ├─ layout.tsx          polices, thème, métadonnées, MotionProvider, SkipLink
│  ├─ page.tsx            assemble les sections (Server Component)
│  ├─ globals.css         Tailwind + tokens (couleurs, espaces, durées)
│  ├─ animations.css      @keyframes partagés : rise, fade, spin
│  ├─ actions/contact.ts  Server Action : validation Zod + envoi Resend
│  ├─ sitemap.ts · robots.ts · opengraph-image.tsx · icon.png
│  └─ not-found.tsx
├─ components/
│  ├─ ui/        ATOMES     Button, Tag, Chip, Container, Section, SectionHeading,
│  │                        Field, PhotoFrame, IconLink, VisuallyHidden
│  ├─ blocks/    MOLÉCULES  ProjectCard, FeaturedProject, SkillCard, TimelineItem,
│  │                        TestimonialCard, ProofItem, FormStatus
│  ├─ sections/  ORGANISMES Hero, About, Skills, Projects, Experience,
│  │                        Testimonials, Contact
│  ├─ layout/               Navbar, MobileMenu, Footer, ScrollProgress,
│  │                        ThemeToggle, SkipLink
│  └─ motion/               MotionProvider, Reveal
├─ hooks/        useActiveSection, useBodyScrollLock, useTheme
├─ lib/          schemas.ts (Zod), cn.ts, site.ts
├─ data/         portfolio.ts   ← TOUT le contenu
├─ public/       images/ (portraits, captures) · cv/cv.pdf (si fourni)
├─ tests/        unit/ · integration/ · e2e/
└─ .env.example · eslint.config.mjs · prettier.config.mjs · next.config.ts
   postcss.config.mjs · tsconfig.json · FRONTEND.md · README.md
```

### 5.3 Diagramme de composants

```text
RootLayout (Server)
├─ <html lang="fr" data-theme>  ← script de thème inline, avant le premier rendu
├─ SkipLink
├─ MotionProvider (Client) : LazyMotion + MotionConfig reducedMotion="user"
│  ├─ ScrollProgress (Client)
│  ├─ Navbar (Client) ── NavLink ×n · ThemeToggle · Button · MobileMenu
│  └─ <main> page.tsx (Server)
│     ├─ Hero ───────── Container · Button ×2 · PhotoFrame · ProofItem ×0‑3
│     ├─ About ──────── SectionHeading · PhotoFrame · principes
│     ├─ Skills ─────── SectionHeading · SkillCard ×n ── Tag ×n
│     ├─ Projects ───── SectionHeading · ProjectFilter (Client) ─ Chip ×n
│     │                 └ ProjectGrid (Client) ── FeaturedProject · ProjectCard ×n
│     ├─ Experience ─── SectionHeading · TimelineProgress (Client) · TimelineItem ×n
│     ├─ Testimonials ─ SectionHeading · TestimonialCard ×n          (optionnelle)
│     └─ Contact ────── SectionHeading · liens · ContactForm (Client)
│                       └ Field ×3 · Button · FormStatus
└─ Footer (Server) ── IconLink ×n · bouton « Retour en haut »
```

Règle de dépendance : un composant n'importe que vers le bas (`sections` → `blocks` → `ui`). Jamais l'inverse.

### 5.4 Serveur ou client ?

| Composant                                                                           | Type   | Raison                                                                   |
| ----------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------ |
| `layout`, `page`, `Hero`, `About`, `Skills`, `Experience`, `Testimonials`, `Footer` | Server | contenu statique, aucun JavaScript envoyé                                |
| `MotionProvider`, `Reveal`                                                          | Client | utilisent Motion                                                         |
| `Navbar`, `MobileMenu`, `ThemeToggle`, `ScrollProgress`                             | Client | état et défilement                                                       |
| `ProjectFilter`, `ProjectGrid`                                                      | Client | état du filtre + animations de layout                                    |
| `TimelineProgress`                                                                  | Client | ligne liée au scroll (seulement la ligne ; les éléments restent serveur) |
| `ContactForm`                                                                       | Client | états d'envoi (`useActionState`)                                         |

La page est générée statiquement ; seule la Server Action du formulaire s'exécute à la demande.

### 5.5 Conventions

- **DRY** : texte et liens uniquement dans `data/portfolio.ts` ; style répété = composant `ui/` ; aucune copie de code.
- **Nommage** : composants et fichiers de composants en PascalCase (`ProjectCard`), hooks en `useXxx`, données en camelCase, dossiers en minuscules.
- **Imbrication** : 3 niveaux de JSX maximum par composant ; au-delà, on extrait un sous-composant.
- **Commentaires** : en français, ils expliquent le _pourquoi_, avec un en-tête de 2–3 lignes par fichier pour qu'un débutant s'y retrouve.
- **Tailwind** : classes assemblées avec `cn()` ; tokens sémantiques (`bg-paper`, `text-ink`) plutôt que couleurs brutes ; une valeur arbitraire répétée devient un token.
- **CSS** : uniquement `globals.css` (tokens) et `animations.css` (keyframes). Pas de CSS par composant.
- **TypeScript** : mode strict, pas de `any`.
- **Hooks** : `useActiveSection(ids)` (IntersectionObserver) · `useBodyScrollLock(verrou)` · `useTheme()` (lit et écrit `data-theme`, `localStorage` protégé par `try/catch`).

### 5.6 Thème clair / sombre

- Attribut `data-theme` sur `<html>`. Sans choix mémorisé, on suit `prefers-color-scheme`.
- Un petit script inline, placé avant le premier rendu, applique le choix mémorisé pour éviter le flash.
- Fallback sans JavaScript : les tokens sombres s'activent aussi par `@media (prefers-color-scheme: dark)`.
- Les composants n'utilisent jamais de variante `dark:` : ils lisent des tokens qui changent de valeur.

---

## 6. Design system

### 6.1 Principes

1. Une seule voix visuelle : blanc et gris, bleu électrique, un panneau sombre.
2. Un seul geste fort : le nom en très grand dans le Hero. Le reste reste calme.
3. La hiérarchie vient de la taille et de la graisse, pas de la décoration.
4. Séparation par aplats (alternance `paper` / `band`) et filets. Aucune ombre décorative.
5. La forme suit la fonction : grille (compétences), cartes (projets), frise (parcours), face-à-face (contact).
6. Le contenu réel d'abord : un bloc sans donnée disparaît.

### 6.2 Couleurs

Couleurs mesurées sur la maquette (`#FFFFFF`, `#F3F3F4`, `#1A1C1C`, `#2F3131`, `#0047FF`, `#0035C5`, `#E2E2E2`). Rapports de contraste calculés avec la formule WCAG.

**Thème clair**

| Token            | Valeur    | Rôle                                          | Contraste                                  |
| ---------------- | --------- | --------------------------------------------- | ------------------------------------------ |
| `paper`          | `#FFFFFF` | fond des sections de rang impair              | –                                          |
| `band`           | `#F3F3F4` | fond des sections de rang pair, puces, champs | –                                          |
| `surface`        | `#FFFFFF` | cartes sur fond `band`                        | –                                          |
| `ink`            | `#1A1C1C` | texte principal                               | 17,12 sur `paper` · 15,44 sur `band`       |
| `ink-muted`      | `#4E5353` | texte secondaire                              | 7,82 · 7,05                                |
| `line`           | `#E2E2E2` | filets décoratifs uniquement                  | décoratif                                  |
| `field-border`   | `#767B7B` | bordure des champs                            | 4,29 sur `paper` · 3,87 sur `band` (≥ 3:1) |
| `blue`           | `#0047FF` | boutons, liens, focus, trait actif            | 6,28 sur `paper` · 5,66 sur `band`         |
| `blue-strong`    | `#0035C5` | calque de survol des boutons                  | 9,07 avec texte blanc                      |
| `panel`          | `#2F3131` | panneau sombre (projet à la une)              | blanc dessus : 13,09                       |
| `on-panel-muted` | `#C4C8C8` | texte secondaire sur panneau                  | 7,75                                       |
| `blue-on-dark`   | `#8FA8FF` | liens et accents sur panneau                  | 5,74                                       |

**Thème sombre**

| Token                          | Valeur                      | Contraste                                               |
| ------------------------------ | --------------------------- | ------------------------------------------------------- |
| `paper`                        | `#121414`                   | –                                                       |
| `band`                         | `#181B1B`                   | –                                                       |
| `surface`                      | `#1F2222`                   | –                                                       |
| `panel`                        | `#262929` + filet `#3F4343` | blanc dessus : 14,67                                    |
| `ink`                          | `#F3F3F4`                   | 16,67 sur `paper` · 14,45 sur `surface`                 |
| `ink-muted`                    | `#A9AEAE`                   | 8,23 sur `paper` · 7,72 sur `band` · 7,14 sur `surface` |
| `line`                         | `#343838`                   | décoratif                                               |
| `field-border`                 | `#6F7575`                   | 3,94 sur `paper` · 3,42 sur `surface`                   |
| `blue` (texte, liens, focus)   | `#86A2FF`                   | 7,59 sur `paper` · 7,12 sur `band` · 6,03 sur `panel`   |
| `blue-button` (fond de bouton) | `#1A55FF`, texte blanc      | 5,54 avec le texte · 3,33 contre la page                |

**États** (jamais signalés par la couleur seule : toujours une icône Lucide et un texte)

| État          | Clair            | Sombre            |
| ------------- | ---------------- | ----------------- |
| Succès        | `#0F7B45` (5,33) | `#5FD39A` (9,92)  |
| Avertissement | `#8A5300` (6,33) | `#FFB454` (10,48) |
| Erreur        | `#B42318` (6,57) | `#FF8A80` (8,10)  |
| Information   | = `blue`         | = `blue`          |

Mise en correspondance avec la nomenclature habituelle : _primaire_ = `blue` · _secondaire_ = `ink` et `panel` · _accent sur fond sombre_ = `blue-on-dark` · _fonds_ = `paper`, `band`, `surface` · _texte_ = `ink`, `ink-muted` · _bordures_ = `line`, `field-border`.

### 6.3 Typographie

**Instrument Sans**, une seule famille variable, chargée par `next/font` (sous-ensemble latin, axes graisse et largeur). La personnalité vient de la largeur réduite sur les titres et de l'échelle, pas d'une seconde police.

| Rôle                  | Taille (fluide)                        | Graisse | Interligne | Interlettrage | Largeur |
| --------------------- | -------------------------------------- | ------- | ---------- | ------------- | ------- |
| Display (nom du Hero) | `clamp(2.75rem, 1.6rem + 5.2vw, 6rem)` | 700     | 0,98       | −0,035 em     | 88      |
| H2                    | `clamp(2rem, 1.4rem + 2.4vw, 3.5rem)`  | 700     | 1,05       | −0,025 em     | 90      |
| H3                    | 1,5 rem                                | 600     | 1,25       | −0,015 em     | 100     |
| Accroche              | 1,25 rem                               | 400     | 1,55       | 0             | 100     |
| Corps                 | 1,0625 rem (17 px)                     | 400     | 1,65       | 0             | 100     |
| Petit texte           | 0,875 rem                              | 500     | 1,5        | 0             | 100     |
| Boutons, puces        | 0,9375 rem                             | 600     | 1          | 0,005 em      | 100     |

- Longueur de ligne ≤ 65 caractères pour les paragraphes.
- Étiquettes en casse normale (pas de capitales espacées).
- Chiffres tabulaires pour les dates.
- Repli de police : celui que `next/font` ajuste automatiquement pour éviter le décalage de mise en page.

### 6.4 Espacements, formes, grille

| Élément                        | Valeur                                                                                   |
| ------------------------------ | ---------------------------------------------------------------------------------------- |
| Échelle d'espacement (px)      | 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128                                           |
| Conteneur                      | 1200 px max ; marges 20 / 32 / 40 px                                                     |
| Padding vertical d'une section | 72 px (mobile) → 120 px (≥ 1024 px)                                                      |
| Rayons                         | 8 px (boutons, champs) · 16 px (cartes) · 24 px (cadres photo, panneau) · 999 px (puces) |
| Bordures                       | 1 px `line` ; champs 1 px `field-border`                                                 |
| Ombres                         | aucune                                                                                   |
| Points de rupture              | 360 (base) · 640 · 768 · 1024 · 1280 · 1536                                              |
| Cibles tactiles                | ≥ 44 × 44 px                                                                             |

### 6.5 Icônes

Lucide uniquement (taille 16 / 20 / 24, trait 1,75). Aucun emoji en guise d'icône. Réseaux : voir D5. Dans Lucide 1.x les icônes sont masquées aux lecteurs d'écran par défaut ; un bouton qui ne contient qu'une icône porte un `aria-label`.

### 6.6 Composants atomiques (`components/ui`)

| Composant              | Variantes                                                                                             | États                                                               | Notes                                               |
| ---------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | --------------------------------------------------- |
| `Button`               | primaire (bleu), secondaire (`band`), discret (texte) · tailles md, lg · rendu en `<button>` ou `<a>` | repos, survol (calque), actif, focus visible, désactivé, chargement | source unique pour tous les boutons                 |
| `Tag`                  | neutre, sur panneau                                                                                   | –                                                                   | casse normale                                       |
| `Chip`                 | filtre                                                                                                | non pressé, pressé (`aria-pressed`)                                 | zone tactile ≥ 44 px                                |
| `Field`                | champ, zone de texte                                                                                  | repos, focus, erreur, désactivé                                     | label visible, message relié par `aria-describedby` |
| `PhotoFrame`           | ratio 4:5, rayon 24 px, contour optionnel                                                             | –                                                                   | enveloppe `next/image`                              |
| `Container`, `Section` | ton `paper` / `band`                                                                                  | –                                                                   | gèrent marges, ancre, `aria-labelledby`             |
| `SectionHeading`       | titre + introduction optionnelle                                                                      | –                                                                   | niveau de titre imposé (h2)                         |
| `IconLink`             | interne, externe                                                                                      | survol, focus                                                       | texte masqué « (s'ouvre dans un nouvel onglet) »    |
| `VisuallyHidden`       | –                                                                                                     | –                                                                   | texte pour lecteurs d'écran                         |

---

## 7. Plan d'animations

**Règles communes**

- Micro-interactions : 150 à 250 ms. Apparitions : 400 à 600 ms (500 ms par défaut). Menu : 240 ms.
- Courbe d'entrée `cubic-bezier(0.22, 1, 0.36, 1)` ; sorties en `ease-out`. **Aucun dépassement ni rebond** (si ressort : `bounce: 0`).
- Seules `opacity` et `transform` sont animées. Un changement de couleur au survol passe par un calque (pseudo-élément) dont on anime l'opacité ; les anneaux de focus apparaissent instantanément.
- **Le contenu est visible par défaut dans le HTML.** Aucune animation ne masque le contenu principal avant l'hydratation ; sans JavaScript, ou si le code d'animation ne se charge pas, tout reste visible.
- `prefers-reduced-motion` : `MotionConfig reducedMotion="user"` (Motion retire alors transforms et animations de layout, garde l'opacité) + `@media (prefers-reduced-motion: reduce)` pour les `@keyframes` et le défilement fluide.
- Pas de parallaxe, pas d'animation infinie (hors loader de bouton), pas d'effet de survol sur ce qui n'est pas cliquable.
- Un seul moment orchestré : l'entrée du Hero. Un seul effet décoratif lié au défilement : la frise du Parcours.
- `@keyframes` partagés dans `app/animations.css` : `rise` (translation 12–16 px → 0), `fade`, `spin`.

| Composant                       | Type et objectif UX                                    | Entrée / sortie                                                                                                                                              | Survol / focus                                                                                                    | États (chargement, retour)                                                           |
| ------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Hero (au chargement)            | CSS `rise` : donner du rythme sans retarder le contenu | texte visible dès le premier rendu ; lignes du nom, titre, boutons : translation 12 px → 0, 560 ms, décalage 70 ms ; portrait et contour : 16 px → 0, 600 ms | –                                                                                                                 | –                                                                                    |
| `Reveal` (sections sous le pli) | Motion `whileInView` : montrer la progression          | opacité 0 → 1 + translation 16 px → 0, 500 ms, une seule fois, décalage 70 ms entre frères ; **titres de section et blocs principaux seulement**             | –                                                                                                                 | contenu visible sans JS                                                              |
| `ScrollProgress`                | Motion `useScroll` → `scaleX` : situer sa position     | –                                                                                                                                                            | –                                                                                                                 | –                                                                                    |
| Navbar                          | CSS : lisibilité de la barre                           | fond translucide + flou après 8 px (opacité d'un calque, 180 ms)                                                                                             | trait sous le lien : `scaleX` 0 → 1, 180 ms ; lien actif : trait permanent                                        | –                                                                                    |
| `MobileMenu`                    | Motion `AnimatePresence`                               | entrée : opacité + translation −8 px → 0, 240 ms, liens décalés de 40 ms ; sortie : 160 ms                                                                   | –                                                                                                                 | focus piégé, `Échap` ferme                                                           |
| `Button`                        | CSS : retour immédiat à l'action                       | –                                                                                                                                                            | calque de couleur (opacité) 150 ms + translation −1 px ; actif : `scale(.98)` 100 ms ; anneau de focus instantané | chargement : Lucide `LoaderCircle` + `spin` 700 ms, bouton désactivé                 |
| `ProjectCard`                   | CSS                                                    | –                                                                                                                                                            | image `scale(1.03)` 300 ms dans un cadre `overflow-hidden` ; calque de bordure bleue (opacité 180 ms)             | –                                                                                    |
| `ProjectGrid` (filtre)          | Motion `layout` + `AnimatePresence`                    | cartes : opacité + `scale(.98)` → 1, 250 ms ; réarrangement en `layout` (transform)                                                                          | puces : calque 150 ms                                                                                             | « n projets affichés » annoncé                                                       |
| `TimelineProgress`              | Motion `useScroll` + `scaleY`                          | la ligne se remplit au défilement ; un point passe de `scale(.6)` à 1 + opacité quand il est atteint (200 ms)                                                | –                                                                                                                 | –                                                                                    |
| `Field`                         | CSS                                                    | –                                                                                                                                                            | anneau de focus instantané ; label fixe (pas de label flottant)                                                   | erreur : message en fondu (180 ms) dans une zone à hauteur réservée → aucun décalage |
| `ContactForm` (envoi)           | CSS + Motion                                           | succès : le panneau de confirmation remplace le formulaire (opacité 250 ms), icône `CircleCheck`                                                             | –                                                                                                                 | envoi : loader dans le bouton ; erreur : bandeau `role="alert"`                      |
| `ThemeToggle`                   | CSS                                                    | bascule des tokens instantanée ; icônes en fondu croisé 200 ms                                                                                               | calque 150 ms                                                                                                     | –                                                                                    |

---

## 8. Photos

|                                | Hero                                                                                    | À propos                                                                       |
| ------------------------------ | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Fichier source                 | `Portrait_professionnel_en_costume_bleu_marine.png`                                     | `Gemini_Generated_Image_vka85fvka85fvka8.jpeg`                                 |
| Dimensions, poids              | 1101 × 1428 px, PNG 1,79 Mo                                                             | 896 × 1172 px, JPEG 422 Ko                                                     |
| À convertir en                 | WebP (qualité ≈ 80), cible < 150 Ko                                                     | WebP, cible < 100 Ko                                                           |
| Cadre                          | 4:5, rayon 24 px, `object-position: 50% 15%`                                            | 4:5, rayon 24 px, `object-position: 50% 20%`                                   |
| Chargement                     | `priority` + `fetchPriority="high"` : **seule** image prioritaire                       | `loading="lazy"`                                                               |
| Dimensions réservées           | `width` / `height` réels + `aspect-ratio` sur le cadre (CLS ≈ 0)                        | idem                                                                           |
| `sizes`                        | `(min-width: 1024px) 480px, 90vw`                                                       | `(min-width: 1024px) 420px, 90vw`                                              |
| Texte alternatif (proposition) | « Portrait de [Nom affiché], en costume bleu marine et cravate noire, sur fond blanc. » | « [Nom affiché], souriant, en costume croisé bleu marine, les mains jointes. » |

- Fichiers renommés à l'import : `portrait-hero.webp`, `portrait-about.webp`. Les originaux restent hors dépôt.
- Les deux photos ont un fond clair. En thème sombre, le cadre `surface` + une bordure assument le fond blanc comme un tirage. En thème clair, on testera `mix-blend-mode: multiply` pour fondre le fond blanc du Hero dans un cadre `band` ; repli : cadre neutre.
- Le nom `Gemini_Generated…` indique une image produite ou retouchée par IA. Garde la version qui te ressemble le plus fidèlement : un recruteur te verra en visio ou en entretien.
- Captures de projets : WebP 16:10, alt décrivant ce que montre l'écran, chargement différé.

---

## 9. Accessibilité (WCAG 2.2 AA)

| Critère                                      | Mise en œuvre                                                                                                                                                                       |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Structure (1.3.1)                            | `header`, `nav`, `main`, `section` (avec `aria-labelledby`), `footer` ; un seul `h1` ; titres sans saut de niveau                                                                   |
| Clavier (2.1.1, 2.4.3)                       | ordre logique, aucun piège ; lien d'évitement « Aller au contenu » en premier ; menu mobile : focus piégé + `Échap`                                                                 |
| Focus visible (2.4.7) et non masqué (2.4.11) | anneau 2 px `blue` (blanc sur panneau), décalé de 2 px ; `scroll-padding-top` et `scroll-margin-top` ≥ hauteur de la navbar, donc un élément focalisé ne passe jamais sous la barre |
| Taille des cibles (2.5.8)                    | ≥ 44 × 44 px en tactile (minimum WCAG : 24 px)                                                                                                                                      |
| Contrastes (1.4.3, 1.4.11)                   | valeurs du §6.2 ; champs ≥ 3:1 ; états jamais signalés par la couleur seule                                                                                                         |
| Reflow et zoom (1.4.10, 1.4.4)               | aucun défilement horizontal dès 320 px ; texte agrandi à 200 % sans perte                                                                                                           |
| Mouvement (2.2.2)                            | `prefers-reduced-motion` respecté ; aucune animation continue hors loader ; rien ne clignote                                                                                        |
| Formulaire (3.3.1, 3.3.2, 3.3.7)             | labels visibles ; erreurs en texte, reliées par `aria-describedby`, `aria-invalid` ; `autocomplete` (`name`, `email`) ; saisies conservées après une erreur                         |
| Statuts (4.1.3)                              | succès `role="status"`, erreur `role="alert"`, compteur de projets `aria-live="polite"`                                                                                             |
| Liens et icônes                              | icônes décoratives masquées ; bouton icône = `aria-label` ; lien externe : « (s'ouvre dans un nouvel onglet) » en texte masqué                                                      |
| Images (1.1.1)                               | alt descriptifs fournis dans les données ; images purement décoratives en `alt=""`                                                                                                  |
| Langue (3.1.1)                               | `<html lang="fr">`                                                                                                                                                                  |
| Thèmes                                       | clair et sombre respectent les mêmes seuils de contraste                                                                                                                            |

---

## 10. Performance

| Cible              | Seuil                                                             | Moyen                                                                                                                   |
| ------------------ | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| LCP                | < 2,5 s (mobile, 4G simulée)                                      | HTML statique, portrait optimisé et prioritaire, une seule police                                                       |
| CLS                | < 0,05                                                            | dimensions réservées, police de repli ajustée par `next/font`                                                           |
| INP                | < 200 ms                                                          | peu d'îlots client, aucun calcul lourd au défilement                                                                    |
| Lighthouse         | ≥ 90 dans les 4 catégories                                        | mesuré sur le build de production, profil mobile                                                                        |
| JavaScript initial | ≤ 170 Ko gzip (budget à confirmer en Phase 3)                     | sections en Server Components, `LazyMotion` avec `domAnimation`, `domMax` chargé à la demande pour la grille de projets |
| Images             | WebP / AVIF, `sizes` corrects, différées sauf le portrait du Hero | `next/image`                                                                                                            |
| Polices            | une famille variable, sous-ensemble latin                         | `next/font`                                                                                                             |
| Scripts tiers      | aucun au MVP (analytics, chat…)                                   | –                                                                                                                       |

Le contenu reste lisible sans JavaScript (rendu serveur), utile sur connexions lentes.

---

## 11. SEO

- `metadata` : titre avec gabarit (« [Nom] — [Titre] »), description ≤ 160 caractères, `metadataBase` (`NEXT_PUBLIC_SITE_URL`), canonical `/`.
- Open Graph (type `website`, locale `fr_FR`, image 1200 × 630) et Twitter `summary_large_image`.
- `app/sitemap.ts` et `app/robots.ts` (tout autorisé + URL du sitemap).
- Image de partage générée par `opengraph-image.tsx` (nom, titre, portrait), en runtime Node : le runtime edge est déprécié depuis Next 16.3 (d'après les notes de version consultées).
- Données structurées JSON-LD `Person` (nom, titre, URL, `sameAs` = tes liens réels), seulement avec des données réelles.
- Titres hiérarchisés, liens explicites, textes alternatifs, performance (voir §10).
- Après déploiement : Search Console, soumission du sitemap, test d'aperçu de partage (LinkedIn, WhatsApp).

---

## 12. Formulaire de contact

### 12.1 Solution d'envoi

**Server Action Next.js + Zod + Resend**, qui t'envoie un e-mail.

- La clé API reste sur le serveur : jamais dans le navigateur.
- Next vérifie l'origine des requêtes de Server Action (protection CSRF de base).
- Le formulaire se rend côté serveur et se valide côté serveur (Zod) ; la validation côté client n'est qu'un confort.
- Plan gratuit Resend : 3 000 e-mails par mois, 100 par jour. Sans domaine vérifié, l'expéditeur de test est `onboarding@resend.dev` et l'envoi n'est possible que vers l'adresse e-mail du compte Resend. Cela convient, puisque c'est toi le destinataire.

| Option                                       | Avantage                                          | Limite                                         |
| -------------------------------------------- | ------------------------------------------------- | ---------------------------------------------- |
| **Resend + Server Action** (recommandé)      | contrôle total, clé protégée, gratuit à ce volume | un compte Resend à créer                       |
| Service de formulaire (Formspree, Web3Forms) | rapide à brancher                                 | moins de contrôle, quota et marque du service  |
| EmailJS                                      | aucun serveur                                     | clés publiques exposées côté navigateur        |
| Nodemailer + SMTP                            | pas de service tiers                              | secrets SMTP à protéger, délivrabilité à gérer |

### 12.2 Champs et règles

| Champ             | Règle                                                                 |
| ----------------- | --------------------------------------------------------------------- |
| `name`            | 2 à 80 caractères, espaces superflus retirés                          |
| `email`           | format valide, ≤ 254 caractères                                       |
| `message`         | 10 à 2000 caractères, texte brut (aucun HTML interprété)              |
| `website` (piège) | champ caché ; doit rester vide                                        |
| `startedAt`       | horodatage du chargement ; refus si l'envoi a lieu moins de 3 s après |

### 12.3 Anti-spam

- **Niveau 1 (MVP)** : champ piège, délai minimal, validation stricte, longueur maximale.
- **Niveau 2 (avant une large diffusion)** : Cloudflare Turnstile + limitation de débit par IP (par exemple Upstash Redis, offre gratuite). À décider avec toi (D4).

### 12.4 Variables d'environnement

| Nom                                                      | Portée           | Rôle                                                                                            |
| -------------------------------------------------------- | ---------------- | ----------------------------------------------------------------------------------------------- |
| `RESEND_API_KEY`                                         | serveur          | clé d'envoi                                                                                     |
| `CONTACT_TO_EMAIL`                                       | serveur          | adresse qui reçoit les messages (= e-mail du compte Resend tant qu'aucun domaine n'est vérifié) |
| `CONTACT_FROM_EMAIL`                                     | serveur          | expéditeur (`onboarding@resend.dev` en phase de test)                                           |
| `NEXT_PUBLIC_SITE_URL`                                   | public           | URL du site (SEO, sitemap)                                                                      |
| `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | serveur / public | niveau 2                                                                                        |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`     | serveur          | niveau 2                                                                                        |

Les valeurs ne sont jamais dans le dépôt : `.env.local` est ignoré par Git, `.env.example` ne contient que les noms. Un préfixe `NEXT_PUBLIC_` ne s'utilise jamais pour un secret.

### 12.5 États de l'interface

| État                             | Comportement                                                                |
| -------------------------------- | --------------------------------------------------------------------------- |
| Repos                            | champs vides, bouton actif                                                  |
| Erreur de champ                  | message sous le champ, `aria-invalid`, focus sur le premier champ en erreur |
| Envoi                            | bouton désactivé + loader, `aria-busy`                                      |
| Succès                           | le formulaire est remplacé par un message de confirmation (`role="status"`) |
| Échec serveur ou limite atteinte | bandeau `role="alert"` + lien de secours vers ton adresse e-mail            |

Sous le bouton : une phrase de confidentialité (finalité, pas de partage, durée de conservation). Aucun cookie n'est déposé par le formulaire.

---

## 13. Qualité et tests

Scripts prévus : `dev`, `build`, `start`, `lint`, `format`, `typecheck`, `test`, `test:e2e`.

| Niveau        | Outil                            | Cibles                                                  | Cas clés                                                                                                                    |
| ------------- | -------------------------------- | ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Unitaire      | Vitest                           | schéma Zod, `cn`, `useActiveSection`                    | données valides / invalides, piège rempli, délai trop court, section active qui change                                      |
| Intégration   | Vitest + Testing Library         | `ProjectFilter`, `ContactForm`, `Navbar`, `ThemeToggle` | filtrer et annoncer le nombre de résultats ; états du formulaire ; menu mobile (ouverture, `Échap`, focus) ; thème mémorisé |
| E2E           | Playwright                       | parcours complet                                        | navigation par ancres, menu à 360 px, thème, envoi (action simulée), `prefers-reduced-motion`                               |
| Accessibilité | axe-core dans Playwright         | toute la page, deux thèmes                              | 0 violation critique ou sérieuse                                                                                            |
| Performance   | Lighthouse (build de production) | profil mobile                                           | ≥ 90 dans les 4 catégories                                                                                                  |
| Sécurité      | script de contrôle               | bundle client                                           | aucune clé (`re_…`) dans `.next/static`                                                                                     |

Les exemples de tests de composants sont livrés avec le code en Phase 3.

---

## 14. Déploiement

1. Dépôt Git (GitHub) avec le projet.
2. Import dans Vercel : le framework Next.js est détecté automatiquement.
3. Variables d'environnement (§12.4) pour _Production_ et _Preview_.
4. Premier déploiement, puis domaine personnalisé (optionnel) et mise à jour de `NEXT_PUBLIC_SITE_URL`.
5. Vérifications : Lighthouse, envoi réel du formulaire, aperçu de partage, sitemap.

**Rappel D6** : l'offre Hobby de Vercel est réservée à l'usage personnel non commercial ; tout usage commercial exige Pro ou Enterprise. À trancher avant la mise en ligne.

Guide pas à pas (installation locale, déploiement, dépannage) : `README.md`, livré en Phase 4.

---

## 15. Critères d'acceptation

**Contenu**

- [ ] Aucune information inventée ; chaque `[À COMPLÉTER]` est résolu ou la section est retirée.
- [ ] Une section sans donnée n'apparaît ni dans la page ni dans le menu.

**Hero et navigation**

- [ ] À 360 × 640 px : nom, titre et bouton principal visibles sans défiler ; portrait juste en dessous.
- [ ] À 1440 × 900 px : nom, titre, accroche, 2 boutons et portrait visibles sans défiler.
- [ ] Navbar fixe, section active signalée, menu mobile utilisable au clavier.

**Responsive**

- [ ] Rendu correct à 320, 360, 768, 1024 et 1440 px, sans défilement horizontal.

**Accessibilité**

- [ ] WCAG 2.2 AA : 0 violation critique ou sérieuse (axe), contrastes du §6.2, focus visible, `prefers-reduced-motion` respecté.

**Performance**

- [ ] Lighthouse mobile ≥ 90 (Performance, Accessibilité, Bonnes pratiques, SEO) sur le build de production ; LCP < 2,5 s ; CLS < 0,05.

**Animations**

- [ ] Micro-interactions 150–250 ms, apparitions 400–600 ms, seulement `opacity` et `transform`, aucun rebond, contenu principal jamais retardé.

**Formulaire et sécurité**

- [ ] Validation côté serveur (Zod), piège et délai actifs, états annoncés aux lecteurs d'écran.
- [ ] Aucune clé dans le bundle client ; `.env.local` hors dépôt.

**SEO**

- [ ] Metadata, Open Graph (aperçu vérifié), sitemap, robots, JSON-LD (si données réelles).

**Code**

- [ ] TypeScript strict ; ESLint et Prettier sans erreur ; composants réutilisables (DRY) ; tests du §13 au vert.

**Livraison**

- [ ] `npm install` puis `npm run dev` fonctionnent sur une machine propre.
- [ ] Guide de lancement et de déploiement fourni.
- [ ] **Dossier zip** : projet complet (sans `node_modules` ni `.env`), `FRONTEND.md` et `README.md`.

---

## 16. Risques et points ouverts

**À fournir (bloquant pour la Phase 3)**

- Le fichier d'informations en vrai fichier (.html, .txt, .md ou .pdf), ou le texte collé.
- Le nom à afficher : « Kalenga wa Kamanda Anthonio » (d'après tes fichiers) ou « Antonny » (nom du fichier de maquette).
- Titre / métier, accroche, textes À propos, compétences, projets (descriptions, liens démo et code, captures), parcours (stage compris), témoignages réels avec accord, e-mail et liens, CV en PDF si tu en as un.

| Risque                                                                             | Impact                                                             | Parade                                                                                              |
| ---------------------------------------------------------------------------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| Tailwind 4 exige des navigateurs récents (Safari 16.4+, Chrome 111+, Firefox 128+) | styles dégradés sur un vieil Android                               | tester sur un appareil réel ; repli possible vers Tailwind 3.4 (hors consigne « dernière version ») |
| Hébergement Hobby non commercial                                                   | suspension possible du site                                        | D6                                                                                                  |
| Resend gratuit sans domaine vérifié                                                | messages non reçus si le destinataire n'est pas l'e-mail du compte | `CONTACT_TO_EMAIL` = e-mail du compte ; domaine vérifié plus tard                                   |
| Lucide 1.x sans icônes de marques                                                  | logos GitHub / LinkedIn absents                                    | D5                                                                                                  |
| Captures de projets clients, témoignages                                           | droits, confidentialité, confiance                                 | accord écrit ; sinon captures floutées ou maquettes                                                 |
| Photos : fonds clairs en thème sombre ; image possiblement retouchée par IA        | rendu hors-sujet ou perte de crédibilité                           | cadre `surface` (§8) ; garder la version la plus fidèle                                             |
| Mode sombre absent de la maquette                                                  | écart visuel                                                       | dessiné dans ce document (§6.2), à valider sur rendu en Phase 3                                     |
| Données personnelles collectées par le formulaire                                  | règles de protection des données selon l'origine des visiteurs     | finalité affichée, aucun cookie, aucun stockage côté site (e-mail seulement)                        |
| Chiffres, tarifs et métriques de la maquette                                       | perte de confiance s'ils sont pris pour les tiens                  | aucun chiffre sans source de ta part                                                                |

---

## Annexe A. Revue du plan face aux clichés de design générés par IA

| Élément de la maquette                           | Décision                        | Raison                                                               |
| ------------------------------------------------ | ------------------------------- | -------------------------------------------------------------------- |
| Palette blanc / gris / bleu / anthracite         | Gardée                          | identité de la maquette, contrastes validés                          |
| Étiquette en capitales au-dessus de chaque titre | Retirée                         | répète le titre ; seule la pastille de disponibilité réelle subsiste |
| Numérotation 01 / 02 / 03                        | Réservée à la frise du Parcours | n'a de sens que pour une suite                                       |
| Trois gros chiffres de statistiques              | Conditionnels                   | uniquement des chiffres réels                                        |
| Panneau « production metrics »                   | Retiré                          | métriques fictives                                                   |
| Cartes identiques partout                        | Une seule grille (Compétences)  | projets, parcours et contact ont chacun leur forme                   |
| Ombres douces                                    | Retirées                        | séparation par aplats et filets                                      |
| Étoiles 5/5 des témoignages                      | Retirées                        | notes inventées                                                      |
| Flèche dans les boutons                          | Absente                         | la flèche est réservée aux liens qui sortent du site                 |
| Grille de tarifs                                 | Retirée                         | aucun tarif fourni                                                   |

---

## Annexe B. Lexique

| Terme                   | Définition                                                                           |
| ----------------------- | ------------------------------------------------------------------------------------ |
| Server Component        | composant rendu sur le serveur ; n'envoie aucun JavaScript au navigateur             |
| Client Component (îlot) | composant exécuté dans le navigateur (`"use client"`) ; réservé à l'interactif       |
| Hydratation             | moment où React « active » le HTML déjà reçu                                         |
| Tokens de design        | variables nommées (couleurs, espaces, durées) définies une fois et utilisées partout |
| LCP, CLS, INP           | vitesse d'affichage du contenu principal, stabilité visuelle, réactivité aux actions |
| Server Action           | fonction exécutée côté serveur, appelée par un formulaire ; les secrets y restent    |
| Champ piège (honeypot)  | champ caché que seuls les robots remplissent                                         |
| WCAG 2.2 AA             | niveau d'accessibilité visé pour le site                                             |
