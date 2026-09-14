import { SITE_URL, type Locale } from "./i18n";

const APP_BASE_URL = "https://app.gruntwrk.com";


export type SeoPageKind =
  | "audience"

  | "services-index"
  | "service"
  | "comparison";

export type SeoSection = {
  title: string;
  paragraphs?: string[];
  items?: string[];
};

export type SeoFaq = {
  question: string;
  answer: string;
};

export type SeoCard = {
  title: string;
  description: string;
  href: string;
};

export type SeoStat = { value: string; label: string };
export type SeoBenefitCard = { title: string; desc: string };
export type SeoStep = { num: string; title: string; body: string };
export type SeoProviderCta = {
  badge: string;
  title: string;
  desc: string;
  perks: string[];
  cta?: { label: string; href: string };
};
export type SeoReview = { stars: number; text: string; name: string; role: string };
export type SeoNavItem = { label: string; href: string; active?: boolean };

export type SeoBreadcrumb = {
  label: string;
  href: string;
};

export type ResolvedSeoPage = {
  id: string;
  kind: SeoPageKind;
  locale: Locale;
  slug: string[];
  path: string;
  title: string;
  description: string;
  eyebrow: string;
  heroTitle: string;
  heroDescription: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  sections: SeoSection[];
  faqTitle?: string;
  faqs?: SeoFaq[];
  cardsTitle?: string;
  cards?: SeoCard[];
  note?: string;
  breadcrumbs: SeoBreadcrumb[];
  stats?: SeoStat[];
  benefitCards?: SeoBenefitCard[];
  howSteps?: SeoStep[];
  providerCta?: SeoProviderCta;
  reviews?: SeoReview[];
  serviceSchema?: {
    name: string;
    description: string;
    serviceType: string;
    areaServed: string[];
  };
  alternates: Record<Locale, string>;
};

type LocaleText = Record<Locale, string>;

type ServiceDefinition = {
  id: string;
  appCategory: string;
  slug: LocaleText;
  name: LocaleText;
  summary: LocaleText;
  customerBullets: Record<Locale, string[]>;
  providerBullets: Record<Locale, string[]>;
  commonJobs: Record<Locale, string[]>;
};

const LABELS = {
  home: { en: "Home", pt: "Início",
    de: "Startseite" },
  services: { en: "Services", pt: "Serviços",
    de: "Dienstleistungen" },
  servicesSegment: { en: "services", pt: "servicos",
    de: "dienstleistungen" },
  providers: { en: "Providers", pt: "Prestadores",
    de: "Dienstleister" },
  customers: { en: "Customers", pt: "Clientes",
    de: "Kunden" },
  request: { en: "Request a service", pt: "Pedir um serviço",
    de: "Dienstleistung anfragen" },
  join: { en: "Start as a provider", pt: "Começar como prestador",
    de: "Als Dienstleister starten" },
  faq: { en: "Common questions", pt: "Perguntas frequentes",
    de: "H\u00E4ufige Fragen" },
} as const;

const SERVICES: ServiceDefinition[] = [
  {
    id: "cleaning",
    appCategory: "cleaning",
    slug: { en: "cleaning", pt: "limpezas",
    de: "reinigung" },
    name: { en: "Cleaning services", pt: "Serviços de limpeza",
    de: "Reinigungsdienste" },
    summary: {
      en: "Home cleans, deep cleans, end-of-tenancy. Compare quotes from cleaners who don't pay lead fees.",
      pt: "Limpezas domesticas, profundas e fim de arrendamento. Compare orcamentos de profissionais sem taxas de lead.",
    de: "Haushaltsreinigung, Grundreinigung und Endreinigung bei Auszug. Vergleichen Sie Angebote von Reinigungskr\u00E4ften, die keine Kontaktgeb\u00FChren zahlen.",
    },
    customerBullets: {
      en: [
        "Get quotes from local cleaners who don't inflate prices to cover job fees.",
        "Book one-off deep cleans or set up regular weekly cleaning.",
        "Check ratings, reviews, and completed jobs before you hire.",
      ],
      pt: [
        "Receba orcamentos de profissionais que nao inflacionam precos para cobrir taxas de trabalho.",
        "Reserve limpezas profundas pontuais ou configure limpezas semanais regulares.",
        "Veja avaliacoes, reviews e trabalhos concluidos antes de contratar.",
      ],
    de: [
    "Erhalten Sie Angebote von lokalen Reinigungskr\u00E4ften, die ihre Preise nicht zur Deckung von Auftragsgeb\u00FChren erh\u00F6hen.",
    "Buchen Sie eine einmalige Grundreinigung oder eine regelm\u00E4\u00DFige w\u00F6chentliche Reinigung.",
    "Pr\u00FCfen Sie Bewertungen, Rezensionen und abgeschlossene Auftr\u00E4ge, bevor Sie jemanden beauftragen.",
],
    },
    providerBullets: {
      en: [
        "Ideal for solo cleaners and small teams looking for local work.",
        "Build a repeat client base without paying per lead or per contact.",
        "Receive direct requests from customers in your area.",
      ],
      pt: [
        "Ideal para profissionais de limpeza e equipas pequenas a procurar trabalho local.",
        "Construa uma base de clientes recorrentes sem pagar por lead ou por contacto.",
        "Receba pedidos diretos de clientes na sua zona.",
      ],
    de: [
    "F\u00FCr selbstst\u00E4ndige Reinigungskr\u00E4fte und kleine Teams, die Auftr\u00E4ge in ihrer N\u00E4he suchen.",
    "Bauen Sie einen festen Kundenstamm auf, ohne f\u00FCr jede Anfrage oder jeden Kontakt zu zahlen.",
    "Erhalten Sie direkte Anfragen von Kunden in Ihrer N\u00E4he.",
],
    },
    commonJobs: {
      en: [
        "Deep cleans",
        "Weekly cleaning",
        "End-of-tenancy cleaning",
        "Office cleaning",
      ],
      pt: [
        "Limpezas profundas",
        "Limpezas semanais",
        "Limpeza fim de arrendamento",
        "Limpeza de escritórios",
      ],
    de: [
    "Grundreinigungen",
    "W\u00F6chentliche Reinigung",
    "Endreinigung bei Auszug",
    "B\u00FCroreinigung",
],
    },
  },
  {
    id: "plumbing",
    appCategory: "plumbing",
    slug: { en: "plumber", pt: "canalizador",
    de: "sanitaer" },
    name: { en: "Plumbing services", pt: "Serviços de canalização",
    de: "Sanit\u00E4rarbeiten" },
    summary: {
      en: "Leaks, drains, toilets, taps. Get quotes from plumbers who price the job, not the platform.",
      pt: "Fugas, entupimentos, sanitas. Orcamentos de canalizadores que cobram o trabalho, nao a plataforma.",
    de: "Undichte Leitungen, Abfl\u00FCsse, Toiletten und Armaturen. Erhalten Sie Angebote von Installateuren, deren Preise sich nach der Arbeit richten, nicht nach der Plattform.",
    },
    customerBullets: {
      en: [
        "Get quotes for urgent fixes or planned plumbing work without lead-fee markups.",
        "Compare plumbers on skills and reviews, not who paid the most for visibility.",
        "Manage repairs and ongoing maintenance from one workbench.",
      ],
      pt: [
        "Receba orcamentos para reparacoes urgentes ou trabalho planeado sem margens de taxas de lead.",
        "Compare canalizadores por competencias e reviews, nao por quem pagou mais por visibilidade.",
        "Gira reparacoes e manutencao recorrente numa so bancada de trabalho.",
      ],
    de: [
    "Erhalten Sie Angebote f\u00FCr dringende Reparaturen oder geplante Sanit\u00E4rarbeiten ohne Aufschl\u00E4ge f\u00FCr Kontaktgeb\u00FChren.",
    "Vergleichen Sie Installateure nach F\u00E4higkeiten und Bewertungen, nicht nach bezahlter Sichtbarkeit.",
    "Verwalten Sie Reparaturen und laufende Wartung in einem Arbeitsbereich.",
],
    },
    providerBullets: {
      en: [
        "Ideal for independent plumbers and small teams building local work.",
        "Receive job requests without paying upfront for each enquiry.",
        "Turn one-off emergency calls into repeat maintenance clients.",
      ],
      pt: [
        "Ideal para canalizadores independentes e equipas pequenas a construir trabalho local.",
        "Receba pedidos de trabalho sem pagar a cabeca por cada pedido.",
        "Transforme chamadas de emergencia em clientes de manutencao recorrente.",
      ],
    de: [
    "F\u00FCr selbstst\u00E4ndige Installateure und kleine Teams, die lokale Auftr\u00E4ge gewinnen m\u00F6chten.",
    "Erhalten Sie Auftragsanfragen, ohne jede Anfrage im Voraus bezahlen zu m\u00FCssen.",
    "Gewinnen Sie aus einmaligen Notfalleins\u00E4tzen wiederkehrende Wartungskunden.",
],
    },
    commonJobs: {
      en: ["Leaks", "Blocked drains", "Toilet repairs", "Tap replacements"],
      pt: ["Fugas", "Entupimentos", "Reparação de sanitas", "Substituição de torneiras"],
    de: ["Undichte Leitungen", "Verstopfte Abfl\u00FCsse", "Toilettenreparaturen", "Armaturen austauschen"],
    },
  },
  {
    id: "electrical",
    appCategory: "electrical",
    slug: { en: "electrician", pt: "eletricista",
    de: "elektroarbeiten" },
    name: { en: "Electrical services", pt: "Serviços de eletricidade",
    de: "Elektroarbeiten" },
    summary: {
      en: "Lights, sockets, fault-finding, upgrades. Compare electricians without inflated lead-fee pricing.",
      pt: "Luzes, tomadas, diagnosticos, melhorias. Compare eletricistas sem precos inflacionados por taxas.",
    de: "Lampen, Steckdosen, Fehlersuche und Modernisierung. Vergleichen Sie Elektriker ohne Preisaufschl\u00E4ge f\u00FCr Kontaktgeb\u00FChren.",
    },
    customerBullets: {
      en: [
        "Get quotes for lights, sockets, wiring, and upgrades from local electricians.",
        "Compare on skills, reviews, and price. Not who paid the most for visibility.",
        "Useful for homes, rentals, and office fit-outs.",
      ],
      pt: [
        "Receba orcamentos para luzes, tomadas, cablagem e melhorias de eletricistas locais.",
        "Compare por competencias, reviews e preco. Nao por quem pagou mais por visibilidade.",
        "Util para casas, arrendamentos e obras de escritorio.",
      ],
    de: [
    "Erhalten Sie Angebote von Elektrikern vor Ort f\u00FCr Lampen, Steckdosen, Leitungen und Modernisierungen.",
    "Vergleichen Sie F\u00E4higkeiten, Bewertungen und Preise, nicht bezahlte Sichtbarkeit.",
    "F\u00FCr Eigenheime, Mietobjekte und B\u00FCroausbauten.",
],
    },
    providerBullets: {
      en: [
        "Ideal for electricians and multi-trade businesses looking for local work.",
        "Showcase your specialties on a public profile that customers can find.",
        "Build a repeat client base from one workbench.",
      ],
      pt: [
        "Ideal para eletricistas e negocios multiespecialidade a procurar trabalho local.",
        "Mostre as suas especialidades num perfil publico que os clientes encontram.",
        "Construa uma base de clientes recorrentes a partir de uma so bancada.",
      ],
    de: [
    "F\u00FCr Elektriker und Handwerksbetriebe, die lokale Auftr\u00E4ge suchen.",
    "Pr\u00E4sentieren Sie Ihre Fachgebiete in einem \u00F6ffentlichen Profil, das Kunden finden k\u00F6nnen.",
    "Bauen Sie einen festen Kundenstamm auf und verwalten Sie alles in einem Arbeitsbereich.",
],
    },
    commonJobs: {
      en: ["Lights", "Sockets", "Fault finding", "Minor upgrades"],
      pt: ["Luzes", "Tomadas", "Diagnóstico de falhas", "Pequenas atualizações"],
    de: ["Lampen", "Steckdosen", "Fehlersuche", "Kleinere Modernisierungen"],
    },
  },
  {
    id: "home-repairs",
    appCategory: "home-repairs",
    slug: { en: "home-repairs", pt: "reparacoes-domesticas",
    de: "reparaturen" },
    name: { en: "Home repair services", pt: "Serviços de reparações domésticas",
    de: "Reparaturen im Haushalt" },
    summary: {
      en: "Door fixes, wall patching, shelving, odd jobs. Hire a local handyman at honest rates.",
      pt: "Portas, paredes, prateleiras, pequenos trabalhos. Handyman local a precos honestos.",
    de: "T\u00FCren reparieren, W\u00E4nde ausbessern, Regale anbringen und kleinere Arbeiten erledigen. Finden Sie einen Handwerker vor Ort zu fairen Preisen.",
    },
    customerBullets: {
      en: [
        "Post your repair job and get quotes from local handymen who don't pay lead fees.",
        "Ideal for mounting, patching, carpentry fixes, and general odd jobs.",
        "Find someone reliable and rebook them whenever you need help.",
      ],
      pt: [
        "Publique o seu trabalho e receba orcamentos de handymen locais sem taxas de lead.",
        "Ideal para montagens, remendos, correcoes de carpintaria e pequenos trabalhos.",
        "Encontre alguem de confianca e volte a reservar sempre que precisar.",
      ],
    de: [
    "Beschreiben Sie Ihre Reparatur und erhalten Sie Angebote von lokalen Handwerkern, die keine Kontaktgeb\u00FChren zahlen.",
    "F\u00FCr Montage, Ausbesserungen, kleinere Tischlerarbeiten und andere praktische Aufgaben.",
    "Finden Sie eine zuverl\u00E4ssige Fachkraft und beauftragen Sie sie erneut, wenn Sie Hilfe ben\u00F6tigen.",
],
    },
    providerBullets: {
      en: [
        "Ideal for handymen and multi-skill providers looking for steady local work.",
        "Get found by customers nearby without buying leads or credits.",
        "Build repeat relationships through direct bookings.",
      ],
      pt: [
        "Ideal para handymen e prestadores multicompetencia a procurar trabalho local estavel.",
        "Seja encontrado por clientes proximos sem comprar leads ou creditos.",
        "Construa relacoes recorrentes atraves de reservas diretas.",
      ],
    de: [
    "F\u00FCr Handwerker und vielseitige Dienstleister, die regelm\u00E4\u00DFig lokale Auftr\u00E4ge suchen.",
    "Werden Sie von Kunden in Ihrer N\u00E4he gefunden, ohne Kontakte oder Guthaben kaufen zu m\u00FCssen.",
    "Bauen Sie durch direkte Buchungen dauerhafte Kundenbeziehungen auf.",
],
    },
    commonJobs: {
      en: ["Door repairs", "Wall patching", "Shelving", "Small carpentry fixes"],
      pt: ["Reparação de portas", "Tapar paredes", "Prateleiras", "Pequenas correções de carpintaria"],
    de: ["T\u00FCrreparaturen", "W\u00E4nde ausbessern", "Regale anbringen", "Kleinere Tischlerreparaturen"],
    },
  },
  {
    id: "painting",
    appCategory: "painting-decor",
    slug: { en: "painting", pt: "pintura",
    de: "malerarbeiten" },
    name: { en: "Painting services", pt: "Serviços de pintura",
    de: "Malerarbeiten" },
    summary: {
      en: "Rooms, touch-ups, rental refreshes. Painters who quote the work, not the visibility cost.",
      pt: "Divisoes, retoques, renovacoes. Pintores que orcam o custo do trabalho, nao o da visibilidade.",
    de: "Zimmer streichen, Ausbesserungen und Mietwohnungen auffrischen. Maler kalkulieren die Arbeit, nicht die Kosten ihrer Sichtbarkeit.",
    },
    customerBullets: {
      en: [
        "Get quotes for rooms, touch-ups, and full repaints from painters who don't pay lead fees.",
        "Ideal for apartments, rentals, and office refreshes.",
        "Find a good painter and rebook them for future jobs.",
      ],
      pt: [
        "Receba orcamentos para divisoes, retoques e repinturas de pintores sem taxas de lead.",
        "Ideal para apartamentos, arrendamentos e renovacao de escritorios.",
        "Encontre um bom pintor e volte a reserva-lo para trabalhos futuros.",
      ],
    de: [
    "Erhalten Sie Angebote f\u00FCr einzelne R\u00E4ume, Ausbesserungen oder komplette Neuanstriche von Malern ohne Kontaktgeb\u00FChren.",
    "F\u00FCr Wohnungen, Mietobjekte und die Auffrischung von B\u00FCros.",
    "Finden Sie einen guten Maler und beauftragen Sie ihn auch bei zuk\u00FCnftigen Arbeiten.",
],
    },
    providerBullets: {
      en: [
        "Build repeat work with landlords, property managers, and homeowners.",
        "Quote on jobs without buying credits or paying per lead.",
        "Let your profile, ratings, and reviews bring you direct requests.",
      ],
      pt: [
        "Construa trabalho recorrente com senhorios, gestores de propriedade e proprietarios.",
        "Orce trabalhos sem comprar creditos ou pagar por lead.",
        "Deixe o seu perfil, avaliacoes e reviews trazer-lhe pedidos diretos.",
      ],
    de: [
    "Gewinnen Sie wiederkehrende Auftr\u00E4ge von Vermietern, Hausverwaltungen und Eigent\u00FCmern.",
    "Geben Sie Angebote ab, ohne Guthaben kaufen oder Kontaktgeb\u00FChren zahlen zu m\u00FCssen.",
    "Gewinnen Sie direkte Anfragen durch Ihr Profil, Ihre Bewertungen und Rezensionen.",
],
    },
    commonJobs: {
      en: ["Room painting", "Touch-ups", "Rental refreshes", "Trim and wall repainting"],
      pt: ["Pintura de divisões", "Retoques", "Renovação de arrendamentos", "Repintura de aros e paredes"],
    de: ["Zimmer streichen", "Ausbesserungen", "Mietobjekte auffrischen", "Leisten und W\u00E4nde neu streichen"],
    },
  },
  {
    id: "moving",
    appCategory: "moving-lifting",
    slug: { en: "moving", pt: "mudancas",
    de: "umzug" },
    name: { en: "Moving services", pt: "Serviços de mudanças",
    de: "Umzugsdienste" },
    summary: {
      en: "Apartment moves, packing, loading. Compare movers without middleman markup.",
      pt: "Mudancas de apartamento, embalagem, carga. Compare sem margens de intermediario.",
    de: "Wohnungsumz\u00FCge, Packen und Verladen. Vergleichen Sie Umzugshelfer ohne Vermittleraufschl\u00E4ge.",
    },
    customerBullets: {
      en: [
        "Compare quotes for movers, vans, and packing help in one place.",
        "Prices reflect what the job costs, not what the platform charges providers.",
        "Book assembly, disposal, or cleaning alongside your move.",
      ],
      pt: [
        "Compare orcamentos para mudancas, carrinhas e ajuda a embalar num so lugar.",
        "Os precos refletem o custo do trabalho, nao o que a plataforma cobra aos prestadores.",
        "Reserve montagem, remocao ou limpeza junto com a sua mudanca.",
      ],
    de: [
    "Vergleichen Sie Angebote f\u00FCr Umzugshelfer, Transporter und Packhilfe an einem Ort.",
    "Die Preise richten sich nach dem Aufwand der Arbeit, nicht nach Plattformgeb\u00FChren f\u00FCr Dienstleister.",
    "Buchen Sie M\u00F6belmontage, Entsorgung oder Reinigung passend zu Ihrem Umzug.",
],
    },
    providerBullets: {
      en: [
        "Ideal for moving teams, van owners, and labour-only providers.",
        "Receive moving requests without paying per enquiry or per lead.",
        "Cross-sell related services like assembly, removal, or cleaning.",
      ],
      pt: [
        "Ideal para equipas de mudancas, proprietarios de carrinha e prestadores de mao de obra.",
        "Receba pedidos de mudancas sem pagar por pedido ou por lead.",
        "Venda servicos relacionados como montagem, remocao ou limpeza.",
      ],
    de: [
    "F\u00FCr Umzugsteams, Transporterbesitzer und Helfer, die reine Arbeitsleistung anbieten.",
    "Erhalten Sie Umzugsanfragen ohne Geb\u00FChren pro Anfrage oder Kontakt.",
    "Bieten Sie erg\u00E4nzende Leistungen wie Montage, Abholung oder Reinigung an.",
],
    },
    commonJobs: {
      en: ["Apartment moves", "Packing help", "Loading and unloading", "Furniture pickup"],
      pt: ["Mudanças de apartamento", "Ajuda a embalar", "Carga e descarga", "Recolha de móveis"],
    de: ["Wohnungsumz\u00FCge", "Packhilfe", "Be- und Entladen", "M\u00F6belabholung"],
    },
  },
  {
    id: "furniture-assembly",
    appCategory: "furniture-assembly",
    slug: { en: "furniture-assembly", pt: "montagem-mobiliario",
    de: "moebelmontage" },
    name: { en: "Furniture assembly services", pt: "Serviços de montagem de mobiliário",
    de: "M\u00F6belmontage" },
    summary: {
      en: "Wardrobes, beds, desks, flat-pack. Get quotes from assemblers who price the job, not the platform.",
      pt: "Roupeiros, camas, secretárias, flat-pack. Orçamentos de montadores que cobram o trabalho, não a plataforma.",
    de: "Schr\u00E4nke, Betten, Schreibtische und Baus\u00E4tze. Erhalten Sie Angebote von Monteuren, deren Preise sich nach der Arbeit richten, nicht nach der Plattform.",
    },
    customerBullets: {
      en: [
        "Get quotes from local assemblers who don't inflate prices to cover job fees.",
        "Ideal for flat-pack furniture, wardrobes, beds, desks, and shelving units.",
        "Check ratings and reviews before you hire anyone.",
      ],
      pt: [
        "Receba orçamentos de montadores locais que não inflacionam preços para cobrir taxas de trabalho.",
        "Ideal para móveis flat-pack, roupeiros, camas, secretárias e estantes.",
        "Veja avaliações e reviews antes de contratar.",
      ],
    de: [
    "Erhalten Sie Angebote von lokalen Monteuren, die ihre Preise nicht zur Deckung von Auftragsgeb\u00FChren erh\u00F6hen.",
    "F\u00FCr M\u00F6belbaus\u00E4tze, Schr\u00E4nke, Betten, Schreibtische und Regalsysteme.",
    "Pr\u00FCfen Sie Bewertungen und Rezensionen, bevor Sie jemanden beauftragen.",
],
    },
    providerBullets: {
      en: [
        "Ideal for solo assemblers and handymen looking for steady local work.",
        "Build a repeat client base without paying per lead or per contact.",
        "Receive direct requests from customers in your area.",
      ],
      pt: [
        "Ideal para montadores independentes e profissionais de bricolage a procurar trabalho local estável.",
        "Construa uma base de clientes recorrentes sem pagar por lead ou por contacto.",
        "Receba pedidos diretos de clientes na sua zona.",
      ],
    de: [
    "F\u00FCr selbstst\u00E4ndige Monteure und Handwerker, die regelm\u00E4\u00DFig lokale Auftr\u00E4ge suchen.",
    "Bauen Sie einen festen Kundenstamm auf, ohne f\u00FCr jede Anfrage oder jeden Kontakt zu zahlen.",
    "Erhalten Sie direkte Anfragen von Kunden in Ihrer N\u00E4he.",
],
    },
    commonJobs: {
      en: ["Wardrobe assembly", "Bed assembly", "Desk and office furniture", "Disassembly and reassembly"],
      pt: ["Montagem de roupeiros", "Montagem de camas", "Secretárias e mobiliário de escritório", "Desmontagem e remontagem"],
    de: ["Schrankmontage", "Bettmontage", "Schreibtische und B\u00FCrom\u00F6bel", "Abbau und Wiederaufbau"],
    },
  },
  {
    id: "mounting-installation",
    appCategory: "mounting-installation",
    slug: { en: "mounting-installation", pt: "montagem-instalacao",
    de: "montage-installation" },
    name: { en: "Mounting & installation services", pt: "Serviços de montagem e instalação",
    de: "Montage und Installation" },
    summary: {
      en: "TVs, shelves, curtains, mirrors, appliances. Compare installers without inflated lead-fee pricing.",
      pt: "TVs, prateleiras, cortinas, espelhos, eletrodomésticos. Compare instaladores sem preços inflacionados por taxas.",
    de: "Fernseher, Regale, Vorh\u00E4nge, Spiegel und Haushaltsger\u00E4te. Vergleichen Sie Monteure ohne Preisaufschl\u00E4ge f\u00FCr Kontaktgeb\u00FChren.",
    },
    customerBullets: {
      en: [
        "Get quotes for TV mounting, shelves, curtains, and appliance installation from local professionals.",
        "Compare on skills, reviews, and price. Not who paid the most for visibility.",
        "Find someone reliable and rebook them whenever you need help.",
      ],
      pt: [
        "Receba orçamentos para montagem de TVs, prateleiras, cortinas e instalação de eletrodomésticos de profissionais locais.",
        "Compare por competências, reviews e preço. Não por quem pagou mais por visibilidade.",
        "Encontre alguém de confiança e volte a reservar sempre que precisar.",
      ],
    de: [
    "Erhalten Sie Angebote von Fachkr\u00E4ften vor Ort f\u00FCr die Montage von Fernsehern, Regalen, Vorh\u00E4ngen und Haushaltsger\u00E4ten.",
    "Vergleichen Sie F\u00E4higkeiten, Bewertungen und Preise, nicht bezahlte Sichtbarkeit.",
    "Finden Sie eine zuverl\u00E4ssige Fachkraft und beauftragen Sie sie erneut, wenn Sie Hilfe ben\u00F6tigen.",
],
    },
    providerBullets: {
      en: [
        "Ideal for handymen and installers looking for local mounting and fitting work.",
        "Get found by customers nearby without buying leads or credits.",
        "Build repeat relationships through direct bookings.",
      ],
      pt: [
        "Ideal para profissionais de bricolage e instaladores a procurar trabalho local de montagem.",
        "Seja encontrado por clientes próximos sem comprar leads ou créditos.",
        "Construa relações recorrentes através de reservas diretas.",
      ],
    de: [
    "F\u00FCr Handwerker und Monteure, die Montage- und Installationsauftr\u00E4ge in ihrer N\u00E4he suchen.",
    "Werden Sie von Kunden in Ihrer N\u00E4he gefunden, ohne Kontakte oder Guthaben kaufen zu m\u00FCssen.",
    "Bauen Sie durch direkte Buchungen dauerhafte Kundenbeziehungen auf.",
],
    },
    commonJobs: {
      en: ["TV mounting", "Shelf installation", "Curtain and blind fitting", "Mirror and picture hanging"],
      pt: ["Montagem de TVs", "Instalação de prateleiras", "Instalação de cortinas e estores", "Colocação de espelhos e quadros"],
    de: ["Fernseher befestigen", "Regale montieren", "Vorh\u00E4nge und Jalousien anbringen", "Spiegel und Bilder aufh\u00E4ngen"],
    },
  },
  {
    id: "outdoor",
    appCategory: "outdoor",
    slug: { en: "outdoor-maintenance", pt: "manutencao-exterior",
    de: "gartenpflege" },
    name: { en: "Outdoor maintenance services", pt: "Serviços de manutenção exterior",
    de: "Pflege im Au\u00DFenbereich" },
    summary: {
      en: "Gardening, lawn care, hedge trimming, pressure washing. Compare outdoor professionals at honest rates.",
      pt: "Jardinagem, relvados, sebes, lavagem com pressão. Compare profissionais de exterior a preços honestos.",
    de: "Gartenarbeit, Rasenpflege, Heckenschnitt und Hochdruckreinigung. Vergleichen Sie Fachkr\u00E4fte zu fairen Preisen.",
    },
    customerBullets: {
      en: [
        "Get quotes from local gardeners and outdoor maintenance professionals without lead-fee markups.",
        "Book one-off cleanups or set up regular garden maintenance.",
        "Check ratings, reviews, and completed jobs before you hire.",
      ],
      pt: [
        "Receba orçamentos de jardineiros e profissionais de manutenção exterior sem margens de taxas de lead.",
        "Reserve limpezas pontuais ou configure manutenção regular de jardim.",
        "Veja avaliações, reviews e trabalhos concluídos antes de contratar.",
      ],
    de: [
    "Erhalten Sie Angebote von lokalen G\u00E4rtnern und Fachkr\u00E4ften f\u00FCr Au\u00DFenpflege ohne Aufschl\u00E4ge f\u00FCr Kontaktgeb\u00FChren.",
    "Buchen Sie eine einmalige Aufr\u00E4umaktion oder regelm\u00E4\u00DFige Gartenpflege.",
    "Pr\u00FCfen Sie Bewertungen, Rezensionen und abgeschlossene Auftr\u00E4ge, bevor Sie jemanden beauftragen.",
],
    },
    providerBullets: {
      en: [
        "Ideal for gardeners, landscapers, and outdoor maintenance teams looking for local work.",
        "Build a repeat client base without paying per lead or per contact.",
        "Receive direct requests from homeowners and property managers in your area.",
      ],
      pt: [
        "Ideal para jardineiros, paisagistas e equipas de manutenção exterior a procurar trabalho local.",
        "Construa uma base de clientes recorrentes sem pagar por lead ou por contacto.",
        "Receba pedidos diretos de proprietários e gestores de propriedade na sua zona.",
      ],
    de: [
    "F\u00FCr G\u00E4rtner, Landschaftspfleger und Teams f\u00FCr Au\u00DFenpflege, die lokale Auftr\u00E4ge suchen.",
    "Bauen Sie einen festen Kundenstamm auf, ohne f\u00FCr jede Anfrage oder jeden Kontakt zu zahlen.",
    "Erhalten Sie direkte Anfragen von Eigent\u00FCmern und Hausverwaltungen in Ihrer N\u00E4he.",
],
    },
    commonJobs: {
      en: ["Gardening", "Lawn care", "Hedge trimming", "Pressure washing"],
      pt: ["Jardinagem", "Cuidado de relvados", "Poda de sebes", "Lavagem com pressão"],
    de: ["Gartenarbeit", "Rasenpflege", "Hecken schneiden", "Hochdruckreinigung"],
    },
  },
  {
    id: "removal-disposal",
    appCategory: "removal-disposal",
    slug: { en: "removal-disposal", pt: "remocao-residuos",
    de: "entsorgung" },
    name: { en: "Removal & disposal services", pt: "Serviços de remoção e resíduos",
    de: "Abholung und Entsorgung" },
    summary: {
      en: "Trash removal, furniture disposal, green waste, garage cleanouts. Compare without middleman markup.",
      pt: "Recolha de lixo, remoção de mobiliário, resíduos verdes, limpeza de garagens. Compare sem margens de intermediário.",
    de: "Abf\u00E4lle, alte M\u00F6bel, Gr\u00FCnabf\u00E4lle und Garagenr\u00E4umung. Vergleichen Sie Angebote ohne Vermittleraufschl\u00E4ge.",
    },
    customerBullets: {
      en: [
        "Get quotes for removal and disposal from local professionals without lead-fee markups.",
        "Ideal for furniture disposal, green waste, garage cleanouts, and post-renovation clearance.",
        "Find someone reliable for responsible, efficient removal.",
      ],
      pt: [
        "Receba orçamentos para remoção e eliminação de profissionais locais sem margens de taxas de lead.",
        "Ideal para remoção de mobiliário, resíduos verdes, limpeza de garagens e limpeza pós-obra.",
        "Encontre alguém de confiança para remoção eficiente e responsável.",
      ],
    de: [
    "Erhalten Sie Angebote f\u00FCr Abholung und Entsorgung von Fachkr\u00E4ften vor Ort ohne Aufschl\u00E4ge f\u00FCr Kontaktgeb\u00FChren.",
    "F\u00FCr M\u00F6belentsorgung, Gr\u00FCnabf\u00E4lle, Garagenr\u00E4umung und Aufr\u00E4umarbeiten nach Renovierungen.",
    "Finden Sie einen zuverl\u00E4ssigen Dienstleister f\u00FCr eine verantwortungsvolle und effiziente Entsorgung.",
],
    },
    providerBullets: {
      en: [
        "Ideal for removal teams, van operators, and waste clearance businesses.",
        "Receive removal requests without paying per enquiry or per lead.",
        "Cross-sell related services like moving, cleaning, or outdoor maintenance.",
      ],
      pt: [
        "Ideal para equipas de remoção, operadores de carrinha e empresas de recolha de resíduos.",
        "Receba pedidos de remoção sem pagar por pedido ou por lead.",
        "Venda serviços relacionados como mudanças, limpeza ou manutenção exterior.",
      ],
    de: [
    "F\u00FCr Entsorgungsteams, Transportunternehmen und R\u00E4umungsdienste.",
    "Erhalten Sie Entsorgungsanfragen ohne Geb\u00FChren pro Anfrage oder Kontakt.",
    "Bieten Sie erg\u00E4nzende Leistungen wie Umzug, Reinigung oder Au\u00DFenpflege an.",
],
    },
    commonJobs: {
      en: ["Trash removal", "Furniture disposal", "Green waste removal", "Garage cleanout"],
      pt: ["Recolha de lixo", "Remoção de mobiliário", "Remoção de resíduos verdes", "Limpeza de garagens"],
    de: ["Abfallabholung", "M\u00F6belentsorgung", "Gr\u00FCnabf\u00E4lle abholen", "Garage r\u00E4umen"],
    },
  },
  {
    id: "other-services",
    appCategory: "other-services",
    slug: { en: "other-services", pt: "outros-servicos",
    de: "weitere-dienstleistungen" },
    name: { en: "Other services", pt: "Outros serviços",
    de: "Weitere Dienstleistungen" },
    summary: {
      en: "General help, odd jobs, custom requests. Post any job and get quotes from local providers.",
      pt: "Ajuda geral, biscates, pedidos personalizados. Publique qualquer trabalho e receba orçamentos de profissionais locais.",
    de: "Allgemeine Hilfe, kleinere Arbeiten und individuelle Anfragen. Beschreiben Sie Ihren Auftrag und erhalten Sie Angebote lokaler Dienstleister.",
    },
    customerBullets: {
      en: [
        "Post any job that doesn't fit a single trade category and get quotes from local providers.",
        "Compare on skills, reviews, and price with no category limits.",
        "Find someone reliable for any practical task you need done.",
      ],
      pt: [
        "Publique qualquer trabalho que não se enquadre numa categoria e receba orçamentos de profissionais locais.",
        "Compare por competências, reviews e preço sem limites de categoria.",
        "Encontre alguém de confiança para qualquer tarefa prática que precise.",
      ],
    de: [
    "Beschreiben Sie auch Auftr\u00E4ge, die keiner einzelnen Kategorie entsprechen, und erhalten Sie Angebote lokaler Dienstleister.",
    "Vergleichen Sie F\u00E4higkeiten, Bewertungen und Preise, unabh\u00E4ngig von der Kategorie.",
    "Finden Sie zuverl\u00E4ssige Hilfe f\u00FCr die praktische Aufgabe, die Sie erledigen lassen m\u00F6chten.",
],
    },
    providerBullets: {
      en: [
        "Ideal for multi-skill providers who handle a range of practical jobs.",
        "Get found by customers nearby without buying leads or credits.",
        "A catch-all category for skills that span multiple trades.",
      ],
      pt: [
        "Ideal para prestadores multicompetência que fazem vários tipos de trabalho prático.",
        "Seja encontrado por clientes próximos sem comprar leads ou créditos.",
        "Categoria abrangente para competências que abrangem vários ofícios.",
      ],
    de: [
    "F\u00FCr vielseitige Dienstleister, die unterschiedliche praktische Arbeiten \u00FCbernehmen.",
    "Werden Sie von Kunden in Ihrer N\u00E4he gefunden, ohne Kontakte oder Guthaben kaufen zu m\u00FCssen.",
    "Eine offene Kategorie f\u00FCr F\u00E4higkeiten, die mehrere Handwerksbereiche umfassen.",
],
    },
    commonJobs: {
      en: ["General help", "Odd jobs", "Custom requests", "Miscellaneous tasks"],
      pt: ["Ajuda geral", "Biscates", "Pedidos personalizados", "Tarefas diversas"],
    de: ["Allgemeine Hilfe", "Kleinere Arbeiten", "Individuelle Anfragen", "Sonstige Aufgaben"],
    },
  },
];

function localizedPath(locale: Locale, slug: string[]) {
  return slug.length ? `/${locale}/${slug.join("/")}` : `/${locale}`;
}

function buildCustomerRequestHref(category?: string) {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  return `${APP_BASE_URL}/jobs/new?${params.toString()}`;
}

function buildProviderSearchHref(opts?: { category?: string; town?: string }) {
  const params = new URLSearchParams({ search: "1" });
  if (opts?.category) params.set("category", opts.category);
  if (opts?.town) params.set("town", opts.town);
  return `${APP_BASE_URL}/directory?${params.toString()}`;
}

function buildProviderSignupHref() {
  const params = new URLSearchParams({
    intent: "register",
    section: "provider",
    next: "/provider/profile",
  });
  return `${APP_BASE_URL}/login?${params.toString()}`;
}

function buildServiceCard(locale: Locale, service: ServiceDefinition): SeoCard {
  return {
    title: service.name[locale],
    description: service.summary[locale],
    href: localizedPath(locale, [LABELS.servicesSegment[locale], service.slug[locale]]),
  };
}

function buildAlternates(id: string, pages: ResolvedSeoPage[]) {
  const siblings = pages.filter((page) => page.id === id);
  return Object.fromEntries(
    siblings.map((page) => [page.locale, `${SITE_URL}${page.path}`])
  ) as Record<Locale, string>;
}

function buildProvidersPage(locale: Locale): Omit<ResolvedSeoPage, "id" | "kind" | "locale" | "slug" | "path" | "alternates"> {
  const isPt = locale === "pt";
  return {
    title: locale === "de" ? "Dienstleister | GruntWrk" : (isPt ? "Prestadores | GruntWrk" : "Service providers | GruntWrk"),
    description: locale === "de" ? "Werden Sie Dienstleister auf GruntWrk und erhalten Sie direkte Kundenanfragen." : (isPt
      ? "Junte-se ao GruntWrk como prestador e receba pedidos diretos de clientes."
      : "Join GruntWrk as a provider and receive direct customer requests."),
    eyebrow: locale === "de" ? "F\u00FCr Dienstleister" : (isPt ? "Para prestadores" : "For providers"),
    heroTitle: locale === "de" ? "Lokale Auftr\u00E4ge gewinnen, ohne f\u00FCr Kundenkontakte zu zahlen" : (isPt
      ? "Ganhe trabalho local sem pagar para perseguir leads"
      : "Win local work without paying to chase leads"),
    heroDescription: locale === "de" ? "Erstellen Sie ein \u00F6ffentliches Profil, erhalten Sie direkte Anfragen und zahlen Sie die Auftragsgeb\u00FChr von 10 % erst, wenn der Auftrag zustande kommt." : (isPt
      ? "Crie um perfil público, receba pedidos diretos e pague apenas a taxa de trabalho de 10% quando o trabalho avança."
      : "Create a public profile, receive direct requests, and only pay the 10% provider job fee when the work moves ahead."),
    primaryCta: { label: LABELS.join[locale], href: buildProviderSignupHref() },
    secondaryCta: { label: LABELS.services[locale], href: localizedPath(locale, [LABELS.servicesSegment[locale]]) },
    sections: [
      {
        title: locale === "de" ? "So hilft GruntWrk Dienstleistern" : (isPt ? "Como o GruntWrk ajuda prestadores" : "How GruntWrk helps providers"),
        items: locale === "de" ? [
    "Pr\u00E4sentieren Sie Ihre Arbeit in einem \u00F6ffentlichen Profil, das Kunden schnell einsch\u00E4tzen k\u00F6nnen.",
    "Erhalten Sie direkte Anfragen, ohne Guthaben kaufen oder Kontakte freischalten zu m\u00FCssen.",
    "Gewinnen Sie Stammkunden f\u00FCr Reinigung, Sanit\u00E4r- und Elektroarbeiten, Reparaturen, Malerarbeiten, Umz\u00FCge, Montage, Au\u00DFenpflege, Entsorgung und mehr.",
] : (isPt
          ? [
              "Mostre o seu trabalho num perfil público que os clientes conseguem avaliar rapidamente.",
              "Receba pedidos diretos sem ter de comprar créditos ou desbloquear leads.",
              "Construa clientes recorrentes para limpezas, canalização, eletricidade, reparações, pintura, mudanças, montagem, manutenção exterior, remoção e mais.",
            ]
          : [
              "Show your work on a public profile customers can assess quickly.",
              "Receive direct requests without buying credits or unlocking leads.",
              "Build repeat customers for cleaning, plumbing, electrical, repairs, painting, moving, assembly, outdoor maintenance, removal, and more.",
            ]),
      },
      {
        title: locale === "de" ? "F\u00FCr wen sich GruntWrk eignet" : (isPt ? "Quem encaixa melhor" : "Who GruntWrk fits best"),
        items: locale === "de" ? [
    "Reinigung, Sanit\u00E4r- und Elektroarbeiten, Reparaturen, Malerarbeiten, Umz\u00FCge, M\u00F6belmontage, Installation, Au\u00DFenpflege, Entsorgung und weitere Dienstleistungen.",
    "Selbstst\u00E4ndige Dienstleister und kleine Teams.",
    "Lokale Unternehmen, die mehr direkte Buchungen und wiederkehrende Auftr\u00E4ge m\u00F6chten.",
] : (isPt
          ? [
              "Limpezas, canalização, eletricidade, reparações, pintura, mudanças, montagem de mobiliário, montagem e instalação, manutenção exterior, remoção e outros serviços.",
              "Profissionais independentes e pequenas equipas.",
              "Negócios locais que querem mais pedidos diretos e repetição.",
            ]
          : [
              "Cleaning, plumbing, electrical, repairs, painting, moving, furniture assembly, mounting and installation, outdoor maintenance, removal, and other services.",
              "Independent providers and small teams.",
              "Local businesses that want more direct bookings and repeat work.",
            ]),
      },
    ],
    faqTitle: LABELS.faq[locale],
    faqs: locale === "de" ? [
    {
        question: "Welche Kosten entstehen f\u00FCr Dienstleister?",
        answer: "Auf GruntWrk bezahlen Sie nicht f\u00FCr die Antwort auf eine Anfrage. Die Auftragsgeb\u00FChr betr\u00E4gt 10 %, wenn der Auftrag zustande kommt.",
    },
    {
        question: "Kann ich mein Einsatzgebiet selbst ausw\u00E4hlen?",
        answer: "Ja. Erstellen Sie ein Profil, w\u00E4hlen Sie Ihr Einsatzgebiet und erhalten Sie passende Anfragen aus Ihrer N\u00E4he.",
    },
] : (isPt
      ? [
          {
            question: "Como funciona o preço para prestadores?",
            answer: "No GruntWrk não paga para responder. A taxa de trabalho é 10% quando o trabalho avança.",
          },
          {
            question: "Posso aderir se estiver numa das cidades suportadas?",
            answer: "Sim. O GruntWrk está aberto a prestadores nas categorias principais nas cidades suportadas.",
          },
        ]
      : [
          {
            question: "How does pricing work for providers?",
            answer: "On GruntWrk you do not pay to respond. The provider job fee is 10% when the work moves ahead.",
          },
          {
            question: "Can I choose the area where I work?",
            answer: "Yes. Create a profile, choose your service area, and receive relevant local requests.",
          },
        ]),
    cardsTitle: locale === "de" ? "Dienstleistungen entdecken" : (isPt ? "Explore categorias de serviços" : "Explore service categories"),
    cards: SERVICES.map((service) => buildServiceCard(locale, service)),
    breadcrumbs: [
      { label: LABELS.home[locale], href: localizedPath(locale, []) },
      { label: LABELS.providers[locale], href: localizedPath(locale, [locale === "de" ? "anbieter" : (locale === "pt" ? "prestadores" : "providers")]) },
    ],
  };
}

function buildProviderRegisterPage(locale: Locale): Omit<ResolvedSeoPage, "id" | "kind" | "locale" | "slug" | "path" | "alternates"> {
  const isPt = locale === "pt";
  return {
    title: locale === "de" ? "Als Dienstleister registrieren | GruntWrk" : (isPt
      ? "Registar como prestador | GruntWrk"
      : "Register as a provider | GruntWrk"),
    description: locale === "de" ? "Werden Sie Dienstleister auf GruntWrk. Keine Kontaktgeb\u00FChren, keine Abos. Erhalten Sie direkte Anfragen von Kunden in Ihrer N\u00E4he." : (isPt
      ? "Junte-se ao GruntWrk como prestador de serviços. Sem taxas de leads, sem subscrições. Receba pedidos diretos de clientes locais."
      : "Join GruntWrk as a service provider. No lead fees, no subscriptions. Receive direct requests from local customers."),
    eyebrow: locale === "de" ? "F\u00FCr Dienstleister" : (isPt ? "Para prestadores" : "For providers"),
    heroTitle: locale === "de" ? "Vor Ort gefunden werden und Auftr\u00E4ge ohne laufende Kosten verwalten" : (isPt
      ? "Seja encontrado localmente e gira trabalho sem o custo"
      : "Get found locally and manage work without the cost"),
    heroDescription: locale === "de" ? "Erstellen Sie ein \u00F6ffentliches Profil, teilen Sie Ihre Verf\u00FCgbarkeit, erhalten Sie direkte Anfragen und geben Sie Angebote f\u00FCr passende Auftr\u00E4ge ab. GruntWrk h\u00E4lt Kundenkommunikation, Zahlungsschritte und Auftragsfortschritt in einem Ablauf zusammen." : (isPt
      ? "Crie um perfil público, partilhe a sua disponibilidade, receba pedidos diretos e envie orçamentos para trabalho que encaixa. O GruntWrk ajuda-o a manter a comunicação com clientes, passos de pagamento e progresso do trabalho organizados num só fluxo."
      : "Create a public profile, share your availability, receive direct requests, and send quotes for work that fits. GruntWrk helps you keep customer communication, payment steps, and job progress organized in one workflow."),
    primaryCta: { label: locale === "de" ? "Dienstleistungen anbieten" : (isPt ? "Começar a oferecer serviços" : "Start offering services"), href: buildProviderSignupHref() },
    providerCta: {
      badge: locale === "de" ? "F\u00FCr Dienstleister" : (isPt ? "Para prestadores" : "For providers"),
      title: locale === "de" ? "Vor Ort gefunden werden und Auftr\u00E4ge ohne laufende Kosten verwalten" : (isPt
        ? "Seja encontrado localmente e gira trabalho sem o custo"
        : "Get found locally and manage work without the cost"),
      desc: locale === "de" ? "Erstellen Sie ein \u00F6ffentliches Profil, teilen Sie Ihre Verf\u00FCgbarkeit, erhalten Sie direkte Anfragen und geben Sie Angebote f\u00FCr passende Auftr\u00E4ge ab. GruntWrk h\u00E4lt Kundenkommunikation, Zahlungsschritte und Auftragsfortschritt in einem Ablauf zusammen." : (isPt
        ? "Crie um perfil público, partilhe a sua disponibilidade, receba pedidos diretos e envie orçamentos para trabalho que encaixa. O GruntWrk ajuda-o a manter a comunicação com clientes, passos de pagamento e progresso do trabalho organizados num só fluxo."
        : "Create a public profile, share your availability, receive direct requests, and send quotes for work that fits. GruntWrk helps you keep customer communication, payment steps, and job progress organized in one workflow."),
      perks: locale === "de" ? [
    "Zeigen Sie Ihre Dienstleistungen und Verf\u00FCgbarkeit",
    "Erhalten Sie direkte Anfragen von Kunden in Ihrer N\u00E4he",
    "Geben Sie Angebote ab, ohne Kunden \u00FCber mehrere Apps nachgehen zu m\u00FCssen",
    "Schaffen Sie Vertrauen durch abgeschlossene Auftr\u00E4ge und Bewertungen",
] : (isPt
        ? [
            "Mostre os seus serviços e disponibilidade",
            "Receba pedidos diretos de clientes locais",
            "Envie orçamentos sem perseguir pessoas entre apps",
            "Construa confiança através de trabalho concluído e avaliações",
          ]
        : [
            "Show your services and availability",
            "Receive direct requests from local customers",
            "Send quotes without chasing people across apps",
            "Build trust through completed work and reviews",
          ]),
    },
    sections: [
      {
        title: locale === "de" ? "So hilft GruntWrk Dienstleistern" : (isPt ? "Como o GruntWrk ajuda prestadores" : "How GruntWrk helps providers"),
        items: locale === "de" ? [
    "Pr\u00E4sentieren Sie Ihre Arbeit in einem \u00F6ffentlichen Profil, das Kunden schnell einsch\u00E4tzen k\u00F6nnen.",
    "Erhalten Sie direkte Anfragen, ohne Guthaben kaufen oder Kontakte freischalten zu m\u00FCssen.",
    "Gewinnen Sie Stammkunden f\u00FCr Reinigung, Sanit\u00E4r- und Elektroarbeiten, Reparaturen, Malerarbeiten, Umz\u00FCge, Montage, Au\u00DFenpflege, Entsorgung und mehr.",
] : (isPt
          ? [
              "Mostre o seu trabalho num perfil público que os clientes conseguem avaliar rapidamente.",
              "Receba pedidos diretos sem ter de comprar créditos ou desbloquear leads.",
              "Construa clientes recorrentes para limpezas, canalização, eletricidade, reparações, pintura, mudanças, montagem, manutenção exterior, remoção e mais.",
            ]
          : [
              "Show your work on a public profile customers can assess quickly.",
              "Receive direct requests without buying credits or unlocking leads.",
              "Build repeat customers for cleaning, plumbing, electrical, repairs, painting, moving, assembly, outdoor maintenance, removal, and more.",
            ]),
      },
      {
        title: locale === "de" ? "F\u00FCr wen sich GruntWrk eignet" : (isPt ? "Quem encaixa melhor" : "Who GruntWrk fits best"),
        items: locale === "de" ? [
    "Reinigung, Sanit\u00E4r- und Elektroarbeiten, Reparaturen, Malerarbeiten, Umz\u00FCge, M\u00F6belmontage, Installation, Au\u00DFenpflege, Entsorgung und weitere Dienstleistungen.",
    "Selbstst\u00E4ndige Dienstleister und kleine Teams.",
    "Lokale Unternehmen, die mehr direkte Buchungen und wiederkehrende Auftr\u00E4ge m\u00F6chten.",
] : (isPt
          ? [
              "Limpezas, canalização, eletricidade, reparações, pintura, mudanças, montagem de mobiliário, montagem e instalação, manutenção exterior, remoção e outros serviços.",
              "Profissionais independentes e pequenas equipas.",
              "Negócios locais que querem mais pedidos diretos e repetição.",
            ]
          : [
              "Cleaning, plumbing, electrical, repairs, painting, moving, furniture assembly, mounting and installation, outdoor maintenance, removal, and other services.",
              "Independent providers and small teams.",
              "Local businesses that want more direct bookings and repeat work.",
            ]),
      },
    ],
    faqTitle: LABELS.faq[locale],
    faqs: locale === "de" ? [
    {
        question: "Welche Kosten entstehen f\u00FCr Dienstleister?",
        answer: "Auf GruntWrk bezahlen Sie nicht f\u00FCr die Antwort auf eine Anfrage. Die Auftragsgeb\u00FChr betr\u00E4gt 10 %, wenn der Auftrag zustande kommt.",
    },
    {
        question: "Welche Dienstleistungen kann ich anbieten?",
        answer: "Reinigung, Sanit\u00E4r- und Elektroarbeiten, Reparaturen im Haushalt, Malerarbeiten, Umz\u00FCge, M\u00F6belmontage, Installation, Au\u00DFenpflege, Entsorgung und weitere Dienstleistungen.",
    },
    {
        question: "Kostet die Anmeldung etwas?",
        answer: "Nein. Die Anmeldung ist kostenlos. Es gibt keine Kontaktgeb\u00FChren, Guthabenpakete oder monatlichen Abos.",
    },
] : (isPt
      ? [
          {
            question: "Como funciona o preço para prestadores?",
            answer: "No GruntWrk não paga para responder. A taxa de trabalho é 10% quando o trabalho avança.",
          },
          {
            question: "Que serviços posso oferecer?",
            answer: "Limpezas, canalização, eletricidade, reparações domésticas, pintura, mudanças, montagem de mobiliário, montagem e instalação, manutenção exterior, remoção e outros serviços.",
          },
          {
            question: "Preciso de pagar para aderir?",
            answer: "Não. A adesão é gratuita. Não há taxas de leads, pacotes de créditos ou subscrições mensais.",
          },
        ]
      : [
          {
            question: "How does pricing work for providers?",
            answer: "On GruntWrk you do not pay to respond. The provider job fee is 10% when the work moves ahead.",
          },
          {
            question: "What services can I offer?",
            answer: "Cleaning, plumbing, electrical, home repairs, painting, moving, furniture assembly, mounting and installation, outdoor maintenance, removal, and other services.",
          },
          {
            question: "Do I need to pay to join?",
            answer: "No. Joining is free. There are no lead fees, credit packs, or monthly subscriptions.",
          },
        ]),
    breadcrumbs: [
      { label: LABELS.home[locale], href: localizedPath(locale, []) },
      { label: locale === "de" ? "Registrieren" : (isPt ? "Registar" : "Register"), href: localizedPath(locale, [locale === "de" ? "registrieren" : (isPt ? "registar" : "register")]) },
    ],
  };
}

function buildCustomersPage(locale: Locale): Omit<ResolvedSeoPage, "id" | "kind" | "locale" | "slug" | "path" | "alternates"> {
  const isPt = locale === "pt";
  return {
    title: locale === "de" ? "F\u00FCr Kunden | GruntWrk" : (isPt ? "Clientes | GruntWrk" : "Customers | GruntWrk"),
    description: locale === "de" ? "Fragen Sie lokale Dienstleistungen \u00FCber GruntWrk an." : (isPt
      ? "Peça serviços locais através do GruntWrk."
      : "Request local services through GruntWrk."),
    eyebrow: locale === "de" ? "F\u00FCr Kunden" : (isPt ? "Para clientes" : "For customers"),
    heroTitle: locale === "de" ? "Hilfe vor Ort einfach anfragen" : (isPt
      ? "Peça ajuda local sem a fricção habitual das plataformas"
      : "Request local help without the usual platform friction"),
    heroDescription: locale === "de" ? "Beschreiben Sie, was Sie ben\u00F6tigen, sehen Sie sich die Dienstleister an, die wir f\u00FCr Sie kontaktieren k\u00F6nnen, und buchen Sie bew\u00E4hrte Fachkr\u00E4fte erneut." : (isPt
      ? "Descreva o que precisa, reveja os prestadores que podemos contactar por si e volte a reservar quem faz um bom trabalho."
      : "Describe what you need, review the providers we can contact for you, and rebook the people who do great work."),
    primaryCta: { label: LABELS.request[locale], href: buildCustomerRequestHref() },
    secondaryCta: { label: LABELS.services[locale], href: localizedPath(locale, [LABELS.servicesSegment[locale]]) },
    sections: [
      {
        title: locale === "de" ? "Ihre Vorteile als Kunde" : (isPt ? "O que os clientes ganham" : "What customers get"),
        items: locale === "de" ? [
    "Empfohlene Dienstleister mit nachvollziehbaren Informationen zu Erfahrung und Bewertungen.",
    "Ein einfacher Ablauf f\u00FCr praktische Auftr\u00E4ge vor Ort, der mit Ihrer Anfrage beginnt.",
    "Dienstleister, mit denen Sie gute Erfahrungen gemacht haben, einfach erneut buchen.",
] : (isPt
          ? [
              "Prestadores recomendados com sinais de confiança mais claros.",
              "Um fluxo simples e orientado ao pedido para trabalho prático.",
              "Uma forma fácil de voltar a contratar quem já funcionou bem.",
            ]
          : [
              "Recommended providers with clearer trust signals.",
              "A simple request-first workflow for practical local jobs.",
              "An easier way to rebook providers who already worked out well.",
            ]),
      },
      {
        title: locale === "de" ? "Diese Dienstleistungen k\u00F6nnen Sie anfragen" : (isPt ? "Serviços que pode pedir" : "Services you can request"),
        paragraphs: [
          locale === "de" ? "Nutzen Sie GruntWrk f\u00FCr Reinigung, Sanit\u00E4r- und Elektroarbeiten, Reparaturen, Malerarbeiten, Umz\u00FCge, M\u00F6belmontage, Installation, Au\u00DFenpflege, Entsorgung und weitere Dienstleistungen." : (isPt
            ? "Use o GruntWrk para pedir limpezas, canalização, eletricidade, reparações domésticas, pintura, mudanças, montagem de mobiliário, montagem e instalação, manutenção exterior, remoção e outros serviços."
            : "Use GruntWrk to request cleaning, plumbing, electrical work, home repairs, painting, moving, furniture assembly, mounting and installation, outdoor maintenance, removal, and other services."),
        ],
      },
    ],
    faqTitle: LABELS.faq[locale],
    faqs: locale === "de" ? [
    {
        question: "Ist GruntWrk nur f\u00FCr gro\u00DFe Projekte gedacht?",
        answer: "Nein. Sie k\u00F6nnen GruntWrk auch f\u00FCr kleinere praktische Arbeiten nutzen, von Reinigung und Reparaturen bis hin zu Malerarbeiten und Umzugshilfe.",
    },
    {
        question: "Welche Dienstleistungen kann ich anfragen?",
        answer: "Zu den wichtigsten Kategorien geh\u00F6ren Reinigung, Sanit\u00E4r- und Elektroarbeiten, Reparaturen im Haushalt, Malerarbeiten und Umzugshilfe.",
    },
] : (isPt
      ? [
          {
            question: "O GruntWrk serve apenas para grandes trabalhos?",
            answer: "Não. Pode usar o GruntWrk para trabalhos pequenos e práticos, desde limpezas e reparações até pintura e mudanças.",
          },
          {
            question: "Que tipo de serviços posso pedir?",
            answer: "As categorias principais incluem limpezas, canalização, eletricidade, reparações domésticas, pintura e mudanças.",
          },
        ]
      : [
          {
            question: "Is GruntWrk only for large projects?",
            answer: "No. You can use GruntWrk for smaller practical jobs as well, from cleaning and repairs to painting and moving.",
          },
          {
            question: "What kinds of services can I request?",
            answer: "The main categories include cleaning, plumbing, electrical work, home repairs, painting, and moving help.",
          },
        ]),
    cardsTitle: locale === "de" ? "Beliebte Dienstleistungen" : (isPt ? "Serviços populares" : "Popular services"),
    cards: SERVICES.map((service) => buildServiceCard(locale, service)),
    breadcrumbs: [
      { label: LABELS.home[locale], href: localizedPath(locale, []) },
      { label: LABELS.customers[locale], href: localizedPath(locale, [locale === "de" ? "kunden" : (locale === "pt" ? "clientes" : "customers")]) },
    ],
  };
}

function buildServicesIndexPage(locale: Locale): Omit<ResolvedSeoPage, "id" | "kind" | "locale" | "slug" | "path" | "alternates"> {
  const isPt = locale === "pt";
  return {
    title: locale === "de" ? "Dienstleistungen | GruntWrk" : (isPt ? "Serviços | GruntWrk" : "Services | GruntWrk"),
    description: locale === "de" ? "Entdecken Sie die besonders h\u00E4ufig angefragten Dienstleistungen auf GruntWrk." : (isPt
      ? "Explore os serviços mais procurados no GruntWrk."
      : "Explore the most requested GruntWrk services."),
    eyebrow: locale === "de" ? "Beliebte Dienstleistungen" : (isPt ? "Serviços populares" : "Popular services"),
    heroTitle: locale === "de" ? "Lokale Dienstleistungen anfragen" : (isPt
      ? "Serviços locais que pode pedir"
      : "Local services you can request"),
    heroDescription: locale === "de" ? "Von Reinigung und Sanit\u00E4rarbeiten bis zu Malerarbeiten und Umz\u00FCgen: GruntWrk b\u00FCndelt h\u00E4ufig ben\u00F6tigte praktische Dienstleistungen." : (isPt
      ? "De limpezas e canalização a pintura e mudanças, o GruntWrk junta categorias práticas que clientes pedem com frequência."
      : "From cleaning and plumbing to painting and moving, GruntWrk brings together practical categories customers request often."),
    primaryCta: { label: LABELS.request[locale], href: buildCustomerRequestHref() },
    secondaryCta: { label: LABELS.join[locale], href: buildProviderSignupHref() },
    sections: [
      {
        title: locale === "de" ? "Das finden Sie hier" : (isPt ? "O que encontra aqui" : "What you will find here"),
        items: locale === "de" ? [
    "Dienstleistungen f\u00FCr den Alltag in Eigenheimen, Mietobjekten und kleinen Unternehmen.",
    "Empfohlene Dienstleister, deren Profile Sie vor Ihrer Anfrage pr\u00FCfen k\u00F6nnen.",
    "Kategorien f\u00FCr einmalige Auftr\u00E4ge und langfristige Zusammenarbeit.",
] : (isPt
          ? [
              "Serviços do dia a dia que surgem em casas, arrendamentos e pequenos negócios.",
              "Prestadores recomendados que pode rever antes de pedir ajuda.",
              "Categorias adequadas tanto para trabalhos pontuais como para relações recorrentes.",
            ]
          : [
              "Everyday services that come up in homes, rentals, and small businesses.",
              "Recommended providers you can review before asking for help.",
              "Categories suited to one-off jobs and repeat working relationships.",
            ]),
      },
    ],
    cardsTitle: locale === "de" ? "Kategorien entdecken" : (isPt ? "Explorar categorias" : "Explore categories"),
    cards: SERVICES.map((service) => buildServiceCard(locale, service)),
    breadcrumbs: [
      { label: LABELS.home[locale], href: localizedPath(locale, []) },
      { label: LABELS.services[locale], href: localizedPath(locale, [LABELS.servicesSegment[locale]]) },
    ],
  };
}

function buildServicePage(locale: Locale, service: ServiceDefinition): Omit<ResolvedSeoPage, "id" | "kind" | "locale" | "slug" | "path" | "alternates"> {
  const isPt = locale === "pt";
  return {
    title: locale === "de" ? `Angebote f\u00FCr ${service.name.de} | GruntWrk` : (isPt
      ? `Orcamentos de ${service.name.pt} | GruntWrk`
      : `${service.name.en} Quotes | GruntWrk`),
    description: service.summary[locale],
    eyebrow: locale === "de" ? "Angebote anfordern" : (isPt ? "Pedir orcamentos" : "Request quotes"),
    heroTitle: locale === "de" ? `${service.name.de}` : (isPt
      ? `${service.name.pt}`
      : `${service.name.en}`),
    heroDescription: locale === "de" ? `Beschreiben Sie, was Sie ben\u00F6tigen. GruntWrk zeigt Ihnen Dienstleister f\u00FCr ${service.name.de}, die wir f\u00FCr Sie kontaktieren k\u00F6nnen.` : (isPt
      ? `Descreva o que precisa e o GruntWrk mostrara prestadores de ${service.name.pt.toLowerCase()} que podemos contactar por si.`
      : `Describe what you need and GruntWrk will surface ${service.name.en.toLowerCase()} providers we can contact for you.`),
    primaryCta: { label: locale === "de" ? `${service.name.de}: Anfrage starten` : (isPt ? `Iniciar pedido de ${service.name.pt.toLowerCase()}` : `Start a ${service.name.en.toLowerCase()} request`), href: buildCustomerRequestHref(service.appCategory) },
    secondaryCta: { label: locale === "de" ? `Dienstleister f\u00FCr ${service.name.de} suchen` : (isPt ? `Pesquisar prestadores de ${service.name.pt.toLowerCase()}` : `Search ${service.name.en.toLowerCase()} providers`), href: buildProviderSearchHref({ category: service.appCategory }) },
    sections: [
      {
        title: locale === "de" ? "F\u00FCr Kunden" : (isPt ? "Para clientes" : "For customers"),
        items: service.customerBullets[locale],
      },
      {
        title: locale === "de" ? "H\u00E4ufige Auftr\u00E4ge" : (isPt ? "Trabalho comum" : "Common jobs"),
        items: service.commonJobs[locale],
      },
      {
        title: locale === "de" ? "F\u00FCr Dienstleister" : (isPt ? "Para prestadores" : "For providers"),
        items: service.providerBullets[locale],
      },
    ],
    breadcrumbs: [
      { label: LABELS.home[locale], href: localizedPath(locale, []) },
      { label: LABELS.services[locale], href: localizedPath(locale, [LABELS.servicesSegment[locale]]) },
      { label: service.name[locale], href: localizedPath(locale, [LABELS.servicesSegment[locale], service.slug[locale]]) },
    ],
    serviceSchema: {
      name: locale === "de" ? `${service.name.de}` : (isPt ? `${service.name.pt}` : `${service.name.en}`),
      description: service.summary[locale],
      serviceType: service.name[locale],
      areaServed: ["Europe", "United Kingdom", "United States", "Australia"],
    },
  };
}

function buildComparisonPage(locale: Locale, competitor: "fixando" | "zaask") {
  const isPt = locale === "pt";
  const slug = competitor === "fixando"
    ? { en: "gruntwrk-vs-fixando", pt: "alternativa-fixando",
    de: "gruntwrk-vs-fixando" }
    : { en: "gruntwrk-vs-zaask", pt: "alternativa-zaask",
    de: "gruntwrk-vs-zaask" };
  const label = competitor === "fixando" ? "Fixando" : "Zaask";
  const title = locale === "de" ? `GruntWrk im Vergleich zu ${label}` : (isPt ? `Alternativa ao ${label}` : `GruntWrk vs ${label}`);
  return {
    slug,
    page: {
      title: locale === "de" ? `${title} | GruntWrk` : (isPt ? `${title} | GruntWrk` : `${title} | GruntWrk`),
      description: locale === "de" ? `Vergleichen Sie GruntWrk mit ${label} f\u00FCr lokale Dienstleistungen.` : (isPt
        ? `Compare o GruntWrk com o ${label} para serviços locais.`
        : `Compare GruntWrk with ${label} for local services.`),
      eyebrow: locale === "de" ? "Vergleich" : (isPt ? "Comparação" : "Comparison"),
      heroTitle: title,
      heroDescription: locale === "de" ? `Sie suchen eine Alternative zu ${label}? GruntWrk macht Anfragen, Profile und Buchungen f\u00FCr Kunden und Dienstleister direkter und einfacher.` : (isPt
        ? `Se procura uma alternativa ao ${label}, o GruntWrk foi desenhado para tornar pedidos, perfis e reservas mais diretos para clientes e prestadores.`
        : `If you are looking for an alternative to ${label}, GruntWrk is designed to make requests, profiles, and bookings more direct for customers and providers.`),
      primaryCta: { label: LABELS.join[locale], href: buildProviderSignupHref() },
      secondaryCta: { label: LABELS.request[locale], href: buildCustomerRequestHref() },
      sections: [
        {
          title: locale === "de" ? "Warum manche Nutzer eine Alternative suchen" : (isPt ? "Porque algumas pessoas procuram alternativa" : "Why some people look for an alternative"),
          items: locale === "de" ? [
    "Kontaktkosten, bevor ein Auftrag gewonnen wurde.",
    "Zus\u00E4tzlicher Aufwand durch Guthaben und kostenpflichtige Antworten.",
    "Der Druck, diese Kosten in den Angebotspreis einzurechnen.",
] : (isPt
            ? [
                "Custos por lead antes do trabalho ser ganho.",
                "Fricção em créditos e respostas pagas.",
                "Pressão para inflacionar preços no orçamento.",
              ]
            : [
                "Lead costs before the work is won.",
                "Friction from credits and paid responses.",
                "Pressure to inflate prices inside the quote.",
              ]),
        },
        {
          title: locale === "de" ? "Das bietet GruntWrk" : (isPt ? "O que o GruntWrk oferece" : "What GruntWrk offers instead"),
          items: locale === "de" ? [
    "\u00D6ffentliche Profile, damit Kunden die Eignung vor ihrer Anfrage pr\u00FCfen k\u00F6nnen.",
    "Mehr direkte Anfragen zwischen Kunden und Dienstleistern.",
    "Eine Auftragsgeb\u00FChr von 10 % f\u00FCr Dienstleister, wenn der Auftrag zustande kommt, statt Geb\u00FChren allein f\u00FCr die Antwort auf eine Anfrage.",
] : (isPt
            ? [
                "Perfis públicos para clientes avaliarem melhor antes de pedir trabalho.",
                "Pedidos mais diretos entre clientes e prestadores.",
                "Taxa de trabalho de 10% quando o trabalho avança, em vez de pagar só para responder.",
              ]
            : [
                "Public profiles so customers can judge fit before requesting work.",
                "More direct requests between customers and providers.",
                "A 10% provider job fee when work moves ahead, instead of paying just to respond.",
              ]),
        },
      ],
      note: locale === "de" ? "Vergleichen Sie die Plattformen und w\u00E4hlen Sie den Ablauf, der am besten zu Ihrer Art passt, Auftr\u00E4ge zu vergeben oder auszuf\u00FChren." : (isPt
        ? `Compare as plataformas e escolha a experiência que melhor se adapta à forma como gosta de contratar ou trabalhar.`
        : "Compare the platforms and choose the workflow that best fits how you like to hire or work."),
      breadcrumbs: [
        { label: LABELS.home[locale], href: localizedPath(locale, []) },
        { label: title, href: localizedPath(locale, [slug[locale]]) },
      ],
    },
  };
}

function buildPages() {
  const pages: ResolvedSeoPage[] = [];

  for (const locale of ["en", "pt", "de"] as const) {
    const staticEntries = [
      {
        id: "providers",
        kind: "audience" as const,
        slug: [locale === "de" ? "anbieter" : (locale === "pt" ? "prestadores" : "providers")],
        page: buildProvidersPage(locale),
      },
      {
        id: "customers",
        kind: "audience" as const,
        slug: [locale === "de" ? "kunden" : (locale === "pt" ? "clientes" : "customers")],
        page: buildCustomersPage(locale),
      },
      {
        id: "services",
        kind: "services-index" as const,
        slug: [LABELS.servicesSegment[locale]],
        page: buildServicesIndexPage(locale),
      },
      {
        id: "provider-register",
        kind: "audience" as const,
        slug: [locale === "de" ? "registrieren" : (locale === "pt" ? "registar" : "register")],
        page: buildProviderRegisterPage(locale),
      },
    ];

    for (const entry of staticEntries) {
      pages.push({
        id: entry.id,
        kind: entry.kind,
        locale,
        slug: entry.slug,
        path: localizedPath(locale, entry.slug),
        ...entry.page,
        alternates: {} as Record<Locale, string>,
      });
    }

    for (const service of SERVICES) {
      const serviceSlug = [LABELS.servicesSegment[locale], service.slug[locale]];
      pages.push({
        id: `service-${service.id}`,
        kind: "service",
        locale,
        slug: serviceSlug,
        path: localizedPath(locale, serviceSlug),
        ...buildServicePage(locale, service),
        alternates: {} as Record<Locale, string>,
      });
    }

    for (const competitor of ["fixando", "zaask"] as const) {
      const comparison = buildComparisonPage(locale, competitor);
      const slug = [comparison.slug[locale]];
      pages.push({
        id: `comparison-${competitor}`,
        kind: "comparison",
        locale,
        slug,
        path: localizedPath(locale, slug),
        ...comparison.page,
        alternates: {} as Record<Locale, string>,
      });
    }
  }

  for (const page of pages) {
    page.alternates = buildAlternates(page.id, pages);
  }

  return pages;
}

const PAGES = buildPages();
const PAGES_BY_ROUTE = new Map(PAGES.map((page) => [`${page.locale}:${page.slug.join("/")}`, page]));

export function getSeoPage(locale: Locale, slug: string[]) {
  return PAGES_BY_ROUTE.get(`${locale}:${slug.join("/")}`) ?? null;
}

export function getSeoPages() {
  return PAGES;
}

export function getSeoPageStaticParams() {
  return PAGES.map((page) => ({ locale: page.locale, slug: page.slug }));
}

export function getSeoAlternateLanguages(page: ResolvedSeoPage) {
  return {
    ...page.alternates,
    "x-default": page.alternates.en,
  };
}

export function getSeoNavItems(locale: Locale, currentPath: string): { services: SeoNavItem[] } {
  const services = SERVICES.map((service) => {
    const href = localizedPath(locale, [LABELS.servicesSegment[locale], service.slug[locale]]);
    return { label: service.name[locale], href, active: currentPath === href };
  });
  return { services };
}
