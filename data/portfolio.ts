// TOUT le contenu du site vit ici. Remplace chaque "[À COMPLÉTER]" par tes vraies informations.
// Un tableau vide ([]) masque la section correspondante. Rien n'est inventé.
const TODO = "[À COMPLÉTER]";

export const site = {
  name: "Kalenga wa Kamanda Anthonio", // à confirmer
  shortName: "Anthonio", // à confirmer : sert de logo dans la barre
  title: TODO,
  description: TODO,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};

type Img = { src: string; width: number; height: number; alt: string };

export const hero = {
  nameLines: ["Kalenga wa", "Kamanda", "Anthonio"], // une entrée = une ligne
  title: "IT polyvalent : Réseaux, Systèmes, IA & BD",
  tagline: "nformaticien polyvalent : je conçois, sécurise et optimise vos réseaux, systèmes, bases de données et solutions d’IA pour un SI fiable et performant.", // 160 caractères maximum
  primaryCta: { label: "Voir mes projets", href: "#projets" },
  secondaryCta: { label: "Me contacter", href: "#contact" },
  availability: "", // statut réel, facultatif ("" = masqué)
  proofs: [] as { value: string; label: string }[], // 0 à 3 chiffres RÉELS
  portrait: {
    src: "/images/portrait-hero.webp",
    width: 1101,
    height: 1428,
    alt: "Portrait de Kalenga wa Kamanda Anthonio, en costume bleu marine et cravate noire, sur fond blanc.",
  } as Img,
};

export const about = {
  paragraphs: ["Diplômé en Mathématiques-Informatique, mention Informatique, je suis un informaticien polyvalent animé par la résolution de problèmes concrets et l’amélioration du quotidien des utilisateurs. Mon parcours m’a permis de développer une solide base technique ainsi qu’une approche rigoureuse, analytique et méthodique dans le traitement des incidents et des besoins informatiques. Je m’intéresse particulièrement au support technique, à la maintenance informatique, aux réseaux et aux systèmes, ainsi qu’au développement de solutions numériques. J’aime comprendre un environnement, diagnostiquer les causes d’un dysfonctionnement et proposer des solutions fiables, adaptées et durables. Mon objectif est de mettre ma polyvalence au service d’une équipe, d’un projet ou d’une organisation, en contribuant aussi bien à l’exploitation et à la sécurisation des infrastructures qu’à la création d’outils numériques utiles et efficaces."], // 1 à 3 paragraphes
  principles: [] as { title: string; text: string }[], // 0 à 3
  photo: {
    src: "/images/portrait-about.webp",
    width: 896,
    height: 1172,
    alt: "Kalenga wa Kamanda Anthonio, souriant, en costume croisé bleu marine, les mains jointes.",
  } as Img,
};

export type IconKey = "frontend" | "backend" | "data" | "tools";
export const skills = [
  {
    icon: "frontend" as IconKey,
    name: "Développement web front-end",
    summary: "Intégration d’interfaces web simples et responsives avec HTML et CSS.",
    items: ["HTML/CSS"]
  },
  {
    icon: "backend" as IconKey,
    name: "Développement back-end",
    summary: "Programmation et logique applicative avec Python et Java.",
    items: ["Python", "Java"]
  },
  {
    icon: "data" as IconKey,
    name: "Bases de données",
    summary: "Conception, requêtes et gestion de données relationnelles et NoSQL.",
    items: ["MySQL", "MongoDB", "SQLite"]
  },
  {
    icon: "tools" as IconKey,
    name: "Support, systèmes, réseaux & outils",
    summary: "Maintenance informatique, support utilisateur, surveillance réseau, environnements Windows/Linux et outils techniques.",
    items: [
      "Maintenance de micro-ordinateurs",
      "Support informatique",
      "Surveillance des équipements réseaux",
      "Windows 10/11",
      "Linux/Ubuntu",
      "VS Code",
      "Cisco Packet Tracer",
      "Terminal Linux",
      "Microsoft Office"
    ]
  }
]
;

export type Project = {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string; // 220 caractères maximum
  tech: string[];
  image?: Img;
  demo?: string;
  code?: string;
  featured?: boolean;
  result?: { value: string; label: string };
};

export const projects: Project[] = [
  {
    id: "prediction-cancer-sein",
    title: "Prédiction du cancer du sein",
    category: "Machine Learning",
    year: "2024",
    description:
      "Projet expérimental de classification de tumeurs bénignes ou malignes en Python (Jupyter Notebook) à partir du Breast Cancer Wisconsin Dataset. Précision du modèle : 98 %.",
    tech: ["Python", "Jupyter Notebook", "Scikit-learn", "Pandas"],
    image: {
      src: "https://picsum.photos/seed/breast-cancer-ml/800/500",
      width: 800,
      height: 500,
      alt: "Prédiction du cancer du sein",
    },
    featured: true,
    result: { value: "98 %", label: "précision du modèle" },
  },
  {
    id: "gestion-clients-python-mysql",
    title: "Application de gestion des clients",
    category: "Application métier",
    year: "2024",
    description:
      "Application desktop de gestion des clients développée en Python avec une base de données MySQL pour stocker, organiser et consulter les informations clients de manière centralisée.",
    tech: ["Python", "MySQL"],
    image: {
      src: "https://picsum.photos/seed/crm-python-mysql/800/500",
      width: 800,
      height: 500,
      alt: "Application de gestion des clients",
    },
    featured: false,
  },
  {
    id: "modelisation-clients-produits-mongodb",
    title: "Modélisation clients & produits (MongoDB)",
    category: "Base de données NoSQL",
    year: "2024",
    description:
      "Projet de modélisation et de gestion de données clients et produits avec MongoDB : conception des collections et opérations CRUD sur un jeu de données réaliste.",
    tech: ["MongoDB"],
    image: {
      src: "https://picsum.photos/seed/mongodb-clients-produits/800/500",
      width: 800,
      height: 500,
      alt: "Modélisation des clients et produits avec MongoDB",
    },
    featured: false,
  },
  {
    id: "calculatrice-python",
    title: "Calculatrice en Python",
    category: "Projet personnel",
    year: "2023",
    description:
      "Réalisation d'une calculatrice simple en Python permettant d'effectuer les opérations arithmétiques de base avec une interface claire et une gestion des erreurs.",
    tech: ["Python"],
    image: {
      src: "https://picsum.photos/seed/calculatrice-python/800/500",
      width: 800,
      height: 500,
      alt: "Calculatrice en Python",
    },
    featured: false,
  },
];

export type TimelineEntry = {
  title: string;
  place: string;
  start: string;
  end?: string;
  points: string[];
};
export const experience: TimelineEntry[] = [
  {
    title: "Stage — Support technique & assistance informatique",
    place: "Régie des Voies Aériennes (RVA / RSI)",
    start: "2026",
    points: [
      "Participation aux activités de support technique et d'assistance aux utilisateurs.",
      "Diagnostic et résolution d'incidents informatiques de premier niveau.",
      "Contribution à la surveillance et au bon fonctionnement des équipements.",
    ],
  },
  {
    title: "Stage — Maintenance informatique",
    place: "Régie des Voies Aériennes (RVA / RSI)",
    start: "2025",
    points: [
      "Assistance aux opérations de maintenance informatique (postes, périphériques, logiciels).",
      "Préparation, installation et configuration de postes de travail.",
      "Suivi des interventions et consignation des actions réalisées.",
    ],
  },
];
export const education: TimelineEntry[] = [
  {
    title: "Formation complémentaire — Bases de données",
    place: "Université de Kinshasa (UNIKIN)",
    start: "2025",
    points: [
      "Conception et gestion de bases de données relationnelles.",
      "Modélisation des données et écriture de requêtes SQL.",
    ],
  },
  {
    title: "Licence en Mathématiques-Informatique, mention Informatique",
    place: "Université de Kinshasa (UNIKIN)",
    start: "2023 – 2024",
    points: [
      "Formation en mathématiques et informatique fondamentale.",
      "Algorithmique, programmation, systèmes, réseaux et bases de données.",
    ],
  },
  {
    title: "Certificat — Maintenance de micro-ordinateurs",
    place: "Institut National de Préparation Professionnelle (INPP)",
    start: "2018",
    points: [
      "Montage, diagnostic et réparation de micro-ordinateurs.",
      "Installation de systèmes et de logiciels.",
    ],
  },
  {
    title: "Diplôme d'État — Électronique",
    place: "Institut Technique et Professionnel (ITPP)",
    start: "2015 – 2016",
    points: [
      "Bases de l'électronique et des circuits.",
      "Travaux pratiques en électronique et maintenance.",
    ],
  },
  {
    title: "Formation e-learning — Outils bureautiques",
    place: "Microsoft Publisher & PowerPoint",
    start: "—",
    points: [
      "Création de documents et supports de présentation professionnels.",
    ],
  },
];

// Uniquement des témoignages réels, avec accord de la personne. [] = section masquée.
export const testimonials: { quote: string; name: string; role: string; organization: string }[] =
  [];

export const contact = {
  intro: "Vous souhaitez échanger sur une opportunité, un projet ou une collaboration ? Retrouvez-moi sur LinkedIn.",
  email: "kalengaantonio2@gmail.com",
  links: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/anthonio-kalenga-28791940a/",
    },
  ],
  cvHref: "/cv/cv-anthonio-kalenga.pdf",
};
