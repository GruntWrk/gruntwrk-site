import { SITE_URL, type Locale } from "./i18n";

const APP_BASE_URL = "https://app.gruntwrk.com";
const PT_COUNTRY = "PT";

export type SeoPageKind =
  | "audience"
  | "city"
  | "city-provider"
  | "services-index"
  | "service"
  | "city-service"
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
  cta: { label: string; href: string };
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

type CityDefinition = {
  id: string;
  slug: LocaleText;
  name: LocaleText;
  intro: LocaleText;
  why: Record<Locale, string[]>;
};

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
  home: { en: "Home", pt: "Início" },
  services: { en: "Services", pt: "Serviços" },
  servicesSegment: { en: "services", pt: "servicos" },
  providers: { en: "Providers", pt: "Prestadores" },
  customers: { en: "Customers", pt: "Clientes" },
  request: { en: "Request a service", pt: "Pedir um serviço" },
  join: { en: "Start as a provider", pt: "Começar como prestador" },
  faq: { en: "Common questions", pt: "Perguntas frequentes" },
} as const;

const CITIES: CityDefinition[] = [
  {
    id: "lisbon",
    slug: { en: "lisbon", pt: "lisboa" },
    name: { en: "Lisbon", pt: "Lisboa" },
    intro: {
      en: "Compare quotes from local cleaners, plumbers, electricians, painters, and movers. No lead fees. No middleman markup. Just the price the provider actually charges.",
      pt: "Compare orcamentos de profissionais locais de limpeza, canalizacao, eletricidade, pintura e mudancas. Sem taxas de leads. Sem margens de intermediario. Apenas o preco real do prestador.",
    },
    why: {
      en: [
        "Providers don't pay to find you, so they quote what the job actually costs.",
        "See ratings, reviews, and completed jobs before you hire anyone.",
        "One place to message, pay, and rebook providers you trust.",
      ],
      pt: [
        "Os prestadores nao pagam para o encontrar, por isso orcam o custo real do trabalho.",
        "Veja avaliacoes, reviews e trabalhos concluidos antes de contratar.",
        "Um so lugar para comunicar, pagar e voltar a reservar prestadores de confianca.",
      ],
    },
  },
  {
    id: "porto",
    slug: { en: "porto", pt: "porto" },
    name: { en: "Porto", pt: "Porto" },
    intro: {
      en: "Find cleaners, plumbers, electricians, painters, and movers who don't inflate prices to cover platform fees. Compare quotes and hire directly.",
      pt: "Encontre profissionais de limpeza, canalizacao, eletricidade, pintura e mudancas que nao inflacionam precos para cobrir taxas da plataforma. Compare orcamentos e contrate diretamente.",
    },
    why: {
      en: [
        "No lead fees means providers quote what the job is worth, not what the platform costs.",
        "Public profiles with ratings, skills, and job history. No guessing.",
        "Message, pay, and rebook from one workbench. No chasing.",
      ],
      pt: [
        "Sem taxas de leads, os prestadores orcam o valor real do trabalho, nao o custo da plataforma.",
        "Perfis publicos com avaliacoes, competencias e historico. Sem adivinhar.",
        "Comunique, pague e volte a reservar numa so bancada. Sem perseguir.",
      ],
    },
  },
];

const SERVICES: ServiceDefinition[] = [
  {
    id: "cleaning",
    appCategory: "cleaning",
    slug: { en: "cleaning", pt: "limpezas" },
    name: { en: "Cleaning services", pt: "Serviços de limpeza" },
    summary: {
      en: "Home cleans, deep cleans, end-of-tenancy. Compare quotes from cleaners who don't pay lead fees.",
      pt: "Limpezas domesticas, profundas e fim de arrendamento. Compare orcamentos de profissionais sem taxas de lead.",
    },
    customerBullets: {
      en: [
        "Get quotes from local cleaners who don't inflate prices to cover platform fees.",
        "Book one-off deep cleans or set up regular weekly cleaning.",
        "Check ratings, reviews, and completed jobs before you hire.",
      ],
      pt: [
        "Receba orcamentos de profissionais que nao inflacionam precos para cobrir taxas da plataforma.",
        "Reserve limpezas profundas pontuais ou configure limpezas semanais regulares.",
        "Veja avaliacoes, reviews e trabalhos concluidos antes de contratar.",
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
    },
  },
  {
    id: "plumbing",
    appCategory: "plumbing",
    slug: { en: "plumber", pt: "canalizador" },
    name: { en: "Plumbing services", pt: "Serviços de canalização" },
    summary: {
      en: "Leaks, drains, toilets, taps. Get quotes from plumbers who price the job, not the platform.",
      pt: "Fugas, entupimentos, sanitas. Orcamentos de canalizadores que cobram o trabalho, nao a plataforma.",
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
    },
    commonJobs: {
      en: ["Leaks", "Blocked drains", "Toilet repairs", "Tap replacements"],
      pt: ["Fugas", "Entupimentos", "Reparação de sanitas", "Substituição de torneiras"],
    },
  },
  {
    id: "electrical",
    appCategory: "electrical",
    slug: { en: "electrician", pt: "eletricista" },
    name: { en: "Electrical services", pt: "Serviços de eletricidade" },
    summary: {
      en: "Lights, sockets, fault-finding, upgrades. Compare electricians without inflated lead-fee pricing.",
      pt: "Luzes, tomadas, diagnosticos, melhorias. Compare eletricistas sem precos inflacionados por taxas.",
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
    },
    providerBullets: {
      en: [
        "Ideal for electricians and multi-trade businesses looking for local work.",
        "Showcase your specialties on a personal profile visible to GruntWrk clients.",
        "Build a repeat client base from one workbench.",
      ],
      pt: [
        "Ideal para eletricistas e negocios multiespecialidade a procurar trabalho local.",
        "Mostre as suas especialidades num perfil pessoal visivel para clientes GruntWrk.",
        "Construa uma base de clientes recorrentes a partir de uma so bancada.",
      ],
    },
    commonJobs: {
      en: ["Lights", "Sockets", "Fault finding", "Minor upgrades"],
      pt: ["Luzes", "Tomadas", "Diagnóstico de falhas", "Pequenas atualizações"],
    },
  },
  {
    id: "home-repairs",
    appCategory: "home-repairs",
    slug: { en: "home-repairs", pt: "reparacoes-domesticas" },
    name: { en: "Home repair services", pt: "Serviços de reparações domésticas" },
    summary: {
      en: "Door fixes, wall patching, shelving, odd jobs. Hire a local handyman at honest rates.",
      pt: "Portas, paredes, prateleiras, pequenos trabalhos. Handyman local a precos honestos.",
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
    },
    commonJobs: {
      en: ["Door repairs", "Wall patching", "Shelving", "Small carpentry fixes"],
      pt: ["Reparação de portas", "Tapar paredes", "Prateleiras", "Pequenas correções de carpintaria"],
    },
  },
  {
    id: "painting",
    appCategory: "painting-decor",
    slug: { en: "painting", pt: "pintura" },
    name: { en: "Painting services", pt: "Serviços de pintura" },
    summary: {
      en: "Rooms, touch-ups, rental refreshes. Painters who quote the work, not the visibility cost.",
      pt: "Divisoes, retoques, renovacoes. Pintores que orcam o custo do trabalho, nao o da visibilidade.",
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
    },
    commonJobs: {
      en: ["Room painting", "Touch-ups", "Rental refreshes", "Trim and wall repainting"],
      pt: ["Pintura de divisões", "Retoques", "Renovação de arrendamentos", "Repintura de aros e paredes"],
    },
  },
  {
    id: "moving",
    appCategory: "moving-lifting",
    slug: { en: "moving", pt: "mudancas" },
    name: { en: "Moving services", pt: "Serviços de mudanças" },
    summary: {
      en: "Apartment moves, packing, loading. Compare movers without middleman markup.",
      pt: "Mudancas de apartamento, embalagem, carga. Compare sem margens de intermediario.",
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
    },
    commonJobs: {
      en: ["Apartment moves", "Packing help", "Loading and unloading", "Furniture pickup"],
      pt: ["Mudanças de apartamento", "Ajuda a embalar", "Carga e descarga", "Recolha de móveis"],
    },
  },
];

function localizedPath(locale: Locale, slug: string[]) {
  return slug.length ? `/${locale}/${slug.join("/")}` : `/${locale}`;
}

function buildCustomerRequestHref(category?: string) {
  const params = new URLSearchParams({ countryCode: PT_COUNTRY });
  if (category) params.set("category", category);
  return `${APP_BASE_URL}/jobs/new?${params.toString()}`;
}

function buildProviderSignupHref(city?: string) {
  const params = new URLSearchParams({
    intent: "register",
    section: "provider",
    country: PT_COUNTRY,
    next: "/provider/profile",
  });
  if (city) params.set("city", city);
  return `${APP_BASE_URL}/login?${params.toString()}`;
}

function buildServiceCard(locale: Locale, service: ServiceDefinition): SeoCard {
  return {
    title: service.name[locale],
    description: service.summary[locale],
    href: localizedPath(locale, [LABELS.servicesSegment[locale], service.slug[locale]]),
  };
}

function buildCityServiceCard(locale: Locale, city: CityDefinition, service: ServiceDefinition): SeoCard {
  return {
    title: `${service.name[locale]}: ${city.name[locale]}`,
    description: service.summary[locale],
    href: localizedPath(locale, [city.slug[locale], service.slug[locale]]),
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
    title: isPt ? "Prestadores em Portugal | GruntWrk" : "Service providers in Portugal | GruntWrk",
    description: isPt
      ? "Junte-se ao GruntWrk como prestador e receba pedidos diretos de clientes."
      : "Join GruntWrk as a provider and receive direct customer requests.",
    eyebrow: isPt ? "Para prestadores" : "For providers",
    heroTitle: isPt
      ? "Ganhe trabalho local sem pagar para perseguir leads"
      : "Win local work without paying to chase leads",
    heroDescription: isPt
      ? "Crie um perfil pessoal, receba pedidos diretos e pague apenas a taxa de prestador de 15% quando o trabalho avança."
      : "Create a personal profile, receive direct requests, and only pay the 15% provider fee when the work moves ahead.",
    primaryCta: { label: LABELS.join[locale], href: buildProviderSignupHref() },
    secondaryCta: { label: LABELS.services[locale], href: localizedPath(locale, [LABELS.servicesSegment[locale]]) },
    sections: [
      {
        title: isPt ? "Como o GruntWrk ajuda prestadores" : "How GruntWrk helps providers",
        items: isPt
          ? [
              "Mostre o seu trabalho num perfil pessoal que os clientes GruntWrk conseguem avaliar rapidamente.",
              "Receba pedidos diretos sem ter de comprar créditos ou desbloquear leads.",
              "Construa clientes recorrentes para limpezas, reparações, pintura, mudanças e mais.",
            ]
          : [
              "Show your work on a personal profile that GruntWrk clients can assess quickly.",
              "Receive direct requests without buying credits or unlocking leads.",
              "Build repeat customers for cleaning, repairs, painting, moving, and more.",
            ],
      },
      {
        title: isPt ? "Quem encaixa melhor" : "Who GruntWrk fits best",
        items: isPt
          ? [
              "Limpezas, canalização, eletricidade, reparações, pintura e mudanças.",
              "Profissionais independentes e pequenas equipas.",
              "Negócios locais que querem mais pedidos diretos e repetição.",
            ]
          : [
              "Cleaning, plumbing, electrical, repairs, painting, and moving.",
              "Independent providers and small teams.",
              "Local businesses that want more direct bookings and repeat work.",
            ],
      },
    ],
    faqTitle: LABELS.faq[locale],
    faqs: isPt
      ? [
          {
            question: "Como funciona o preço para prestadores?",
            answer: "No GruntWrk não paga para responder. A taxa do prestador é 15% quando o trabalho avança através da plataforma.",
          },
          {
            question: "Posso aderir se estiver numa das cidades suportadas?",
            answer: "Sim. O GruntWrk está aberto a prestadores nas categorias principais do marketplace nas cidades suportadas.",
          },
        ]
      : [
          {
            question: "How does pricing work for providers?",
            answer: "On GruntWrk you do not pay to respond. The provider fee is 15% when the work moves ahead through the platform.",
          },
          {
            question: "Can I join if I am based in a supported city?",
            answer: "Yes. GruntWrk is open to providers across the main marketplace categories in the supported cities.",
          },
        ],
    cardsTitle: isPt ? "Onde há procura local" : "Where local demand is building",
    cards: CITIES.map((city) => ({
      title: city.name[locale],
      description: city.intro[locale],
      href: localizedPath(locale, [city.slug[locale]]),
    })),
    breadcrumbs: [
      { label: LABELS.home[locale], href: localizedPath(locale, []) },
      { label: LABELS.providers[locale], href: localizedPath(locale, [locale === "pt" ? "prestadores" : "providers"]) },
    ],
  };
}

function buildCityProviderPage(
  locale: Locale,
  city: CityDefinition
): Omit<ResolvedSeoPage, "id" | "kind" | "locale" | "slug" | "path" | "alternates"> {
  const isPt = locale === "pt";
  const cityName = city.name[locale];
  return {
    title: isPt
      ? `Trabalho de Servicos em ${cityName} | Registe-se Gratis | GruntWrk`
      : `Service Work in ${cityName} | Register Free | GruntWrk`,
    description: isPt
      ? `Procura trabalho de limpeza, canalizacao, eletricidade ou reparacoes em ${cityName}? Registe-se gratis no GruntWrk e receba pedidos de clientes na sua zona.`
      : `Looking for cleaning, plumbing, electrical, or repair work in ${cityName}? Register free on GruntWrk and receive client requests in your area.`,
    eyebrow: isPt ? "Para profissionais" : "For professionals",
    heroTitle: isPt
      ? `Procura trabalho em ${cityName}?`
      : `Looking for work in ${cityName}?`,
    heroDescription: isPt
      ? `Registe-se gratis no GruntWrk, crie o seu perfil pessoal e comece a receber pedidos de clientes em ${cityName}. Sem taxas de registo, sem pacotes de creditos.`
      : `Register free on GruntWrk, create your personal profile, and start receiving client requests in ${cityName}. No registration fees, no credit packs.`,
    primaryCta: { label: isPt ? "Registar gratis" : "Register free", href: buildProviderSignupHref() },
    sections: [
      {
        title: isPt ? "Porque se registar no GruntWrk" : "Why register on GruntWrk",
        items: isPt
          ? [
              "Registo gratuito e sem compromisso.",
              `Receba pedidos de trabalho de clientes em ${cityName} diretamente.`,
              "Sem pagar para responder a pedidos ou desbloquear leads.",
              "Escolha os trabalhos que lhe interessam e trabalhe no seu horario.",
              "Pague apenas a taxa de 15% quando o trabalho avanca.",
            ]
          : [
              "Free registration with no commitment.",
              `Receive work requests from clients in ${cityName} directly.`,
              "No paying to respond to requests or unlock leads.",
              "Choose the jobs that interest you and work on your schedule.",
              "Only pay the 15% fee when the work moves ahead.",
            ],
      },
      {
        title: isPt ? "Servicos em procura" : "Services in demand",
        items: isPt
          ? [
              "Limpeza domestica e comercial.",
              "Canalizacao e reparacoes de agua.",
              "Eletricidade e instalacoes eletricas.",
              "Reparacoes gerais e manutencao.",
              "Pintura interior e exterior.",
              "Mudancas e transportes.",
            ]
          : [
              "Domestic and commercial cleaning.",
              "Plumbing and water repairs.",
              "Electrical work and installations.",
              "General repairs and maintenance.",
              "Interior and exterior painting.",
              "Moving and transport.",
            ],
      },
      {
        title: isPt ? "Como funciona" : "How it works",
        items: isPt
          ? [
              "1. Registe-se gratis e crie o seu perfil pessoal com as suas competencias e disponibilidade.",
              "2. Receba pedidos de clientes na sua zona e escolha os que lhe interessam.",
              "3. Combine os detalhes diretamente com o cliente e realize o trabalho.",
            ]
          : [
              "1. Register free and create your personal profile with your skills and availability.",
              "2. Receive requests from clients in your area and choose the ones that interest you.",
              "3. Arrange the details directly with the client and do the work.",
            ],
      },
    ],
    faqTitle: LABELS.faq[locale],
    faqs: isPt
      ? [
          {
            question: "Quanto custa registar-me?",
            answer: "O registo e gratis. So paga a taxa de prestador de 15% quando um trabalho avanca atraves da plataforma.",
          },
          {
            question: "Que tipo de trabalhos posso receber?",
            answer: `Em ${cityName}, os servicos mais pedidos incluem limpeza domestica, canalizacao, eletricidade, reparacoes, pintura e mudancas.`,
          },
          {
            question: "Posso escolher os meus horarios?",
            answer: "Sim. Define a sua disponibilidade no perfil e so aceita os pedidos que lhe interessam. Sem obrigacao de aceitar tudo.",
          },
          {
            question: "Os clientes veem o meu perfil?",
            answer: "O seu perfil pessoal e visivel apenas para clientes registados no GruntWrk que procurem servicos na sua zona e categoria.",
          },
        ]
      : [
          {
            question: "How much does it cost to register?",
            answer: "Registration is free. You only pay the 15% provider fee when a job moves ahead through the platform.",
          },
          {
            question: "What kind of work can I receive?",
            answer: `In ${cityName}, the most requested services include domestic cleaning, plumbing, electrical work, repairs, painting, and moving.`,
          },
          {
            question: "Can I choose my own hours?",
            answer: "Yes. Set your availability in your profile and only accept the requests that interest you. No obligation to accept everything.",
          },
          {
            question: "Do clients see my profile?",
            answer: "Your personal profile is only visible to registered GruntWrk clients looking for services in your area and category.",
          },
        ],
    breadcrumbs: [
      { label: LABELS.home[locale], href: localizedPath(locale, []) },
      { label: cityName, href: localizedPath(locale, [city.slug[locale]]) },
      {
        label: isPt ? "Trabalho" : "Work",
        href: localizedPath(locale, [city.slug[locale], isPt ? "trabalho" : "work"]),
      },
    ],
  };
}

function buildCustomersPage(locale: Locale): Omit<ResolvedSeoPage, "id" | "kind" | "locale" | "slug" | "path" | "alternates"> {
  const isPt = locale === "pt";
  return {
    title: isPt ? "Clientes em Portugal | GruntWrk" : "Customers in Portugal | GruntWrk",
    description: isPt
      ? "Peça serviços locais através do GruntWrk."
      : "Request local services through GruntWrk.",
    eyebrow: isPt ? "Para clientes" : "For customers",
    heroTitle: isPt
      ? "Encontre ajuda local sem a fricção habitual dos marketplaces"
      : "Find local help without the usual marketplace friction",
    heroDescription: isPt
      ? "Compare perfis de prestadores, peça trabalho prático e volte a reservar quem faz um bom trabalho."
      : "Compare provider profiles, request practical jobs, and rebook the people who do great work.",
    primaryCta: { label: LABELS.request[locale], href: buildCustomerRequestHref() },
    secondaryCta: { label: LABELS.services[locale], href: localizedPath(locale, [LABELS.servicesSegment[locale]]) },
    sections: [
      {
        title: isPt ? "O que os clientes ganham" : "What customers get",
        items: isPt
          ? [
              "Perfis pessoais e sinais de confiança mais claros.",
              "Um fluxo simples para pedir trabalho prático.",
              "Uma forma fácil de voltar a contratar quem já funcionou bem.",
            ]
          : [
              "Clearer personal profiles and trust signals.",
              "A simple workflow for practical local jobs.",
              "An easier way to rebook providers who already worked out well.",
            ],
      },
      {
        title: isPt ? "Serviços que pode pedir" : "Services you can request",
        paragraphs: [
          isPt
            ? "Use o GruntWrk para pedir limpezas, canalização, eletricidade, reparações domésticas, pintura e mudanças."
            : "Use GruntWrk to request cleaning, plumbing, electrical work, home repairs, painting, and moving help.",
        ],
      },
    ],
    faqTitle: LABELS.faq[locale],
    faqs: isPt
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
        ],
    cardsTitle: isPt ? "Serviços populares" : "Popular services",
    cards: SERVICES.map((service) => buildServiceCard(locale, service)),
    breadcrumbs: [
      { label: LABELS.home[locale], href: localizedPath(locale, []) },
      { label: LABELS.customers[locale], href: localizedPath(locale, [locale === "pt" ? "clientes" : "customers"]) },
    ],
  };
}

function buildServicesIndexPage(locale: Locale): Omit<ResolvedSeoPage, "id" | "kind" | "locale" | "slug" | "path" | "alternates"> {
  const isPt = locale === "pt";
  return {
    title: isPt ? "Serviços em Portugal | GruntWrk" : "Services in Portugal | GruntWrk",
    description: isPt
      ? "Explore os serviços mais procurados no GruntWrk."
      : "Explore the most requested GruntWrk services.",
    eyebrow: isPt ? "Serviços populares" : "Popular services",
    heroTitle: isPt
      ? "Serviços locais que pode pedir"
      : "Local services you can request",
    heroDescription: isPt
      ? "De limpezas e canalização a pintura e mudanças, o GruntWrk junta categorias práticas que clientes pedem com frequência."
      : "From cleaning and plumbing to painting and moving, GruntWrk brings together practical categories customers request often.",
    primaryCta: { label: LABELS.request[locale], href: buildCustomerRequestHref() },
    secondaryCta: { label: LABELS.join[locale], href: buildProviderSignupHref() },
    sections: [
      {
        title: isPt ? "O que encontra aqui" : "What you will find here",
        items: isPt
          ? [
              "Serviços do dia a dia que surgem em casas, arrendamentos e pequenos negócios.",
              "Perfis de prestadores que pode comparar antes de pedir ajuda.",
              "Categorias adequadas tanto para trabalhos pontuais como para relações recorrentes.",
            ]
          : [
              "Everyday services that come up in homes, rentals, and small businesses.",
              "Provider profiles you can compare before asking for help.",
              "Categories suited to one-off jobs and repeat working relationships.",
            ],
      },
    ],
    cardsTitle: isPt ? "Explorar categorias" : "Explore categories",
    cards: SERVICES.map((service) => buildServiceCard(locale, service)),
    breadcrumbs: [
      { label: LABELS.home[locale], href: localizedPath(locale, []) },
      { label: LABELS.services[locale], href: localizedPath(locale, [LABELS.servicesSegment[locale]]) },
    ],
  };
}

function buildCityPage(locale: Locale, city: CityDefinition): Omit<ResolvedSeoPage, "id" | "kind" | "locale" | "slug" | "path" | "alternates"> {
  const isPt = locale === "pt";
  const providerSignupHref = buildProviderSignupHref(city.name.en);
  const cityName = city.name[locale];

  const stats: SeoStat[] = isPt
    ? [
        { value: "0\u20AC", label: "Taxas para clientes" },
        { value: "15%", label: "Taxa do prestador" },
        { value: "4.8", label: "Avaliacao media" },
        { value: "0", label: "Taxas de leads" },
      ]
    : [
        { value: "$0", label: "Customer fees" },
        { value: "15%", label: "Provider fee only" },
        { value: "4.8", label: "Average rating" },
        { value: "0", label: "Lead fees" },
      ];

  const benefitCards: SeoBenefitCard[] = city.id === "lisbon"
    ? isPt
      ? [
          { title: "Precos mais baixos para si", desc: "Os prestadores nao pagam para o encontrar, por isso orcam o custo real do trabalho." },
          { title: "Contrate com confianca", desc: "Veja avaliacoes, reviews e trabalhos concluidos antes de contratar." },
          { title: "Tudo num so lugar", desc: "Um so lugar para comunicar, pagar e voltar a reservar prestadores de confianca." },
        ]
      : [
          { title: "Lower prices for you", desc: "Providers don't pay to find you, so they quote what the job actually costs." },
          { title: "Hire with confidence", desc: "See ratings, reviews, and completed jobs before you hire anyone." },
          { title: "Everything in one place", desc: "One place to message, pay, and rebook providers you trust." },
        ]
    : isPt
      ? [
          { title: "Precos honestos", desc: "Sem taxas de leads, os prestadores orcam o valor real do trabalho, nao o custo da plataforma." },
          { title: "Sem adivinhar", desc: "Perfis publicos com avaliacoes, competencias e historico." },
          { title: "Sem perseguir", desc: "Comunique, pague e volte a reservar numa so bancada." },
        ]
      : [
          { title: "Honest pricing", desc: "No lead fees means providers quote what the job is worth, not what the platform costs." },
          { title: "No guessing", desc: "Public profiles with ratings, skills, and job history." },
          { title: "No chasing", desc: "Message, pay, and rebook from one workbench." },
        ];

  const howSteps: SeoStep[] = isPt
    ? [
        { num: "1", title: "Descreva o que precisa", body: "Diga-nos o trabalho, a localizacao e quando quer que seja feito." },
        { num: "2", title: "Compare orcamentos", body: "Prestadores locais enviam-lhe orcamentos. Sem leiloes, sem pressao." },
        { num: "3", title: "Contrate e gira", body: "Escolha o prestador, comunique e pague quando o trabalho estiver concluido." },
      ]
    : [
        { num: "1", title: "Describe what you need", body: "Tell us the job, the location, and when you want it done." },
        { num: "2", title: "Compare quotes", body: "Local providers send you quotes. No bidding wars, no pressure." },
        { num: "3", title: "Hire and manage", body: "Pick your provider, message them, and pay when the job is done." },
      ];

  const providerCta: SeoProviderCta = isPt
    ? {
        badge: "Para prestadores",
        title: `E prestador de servicos em ${cityName}?`,
        desc: "Adira ao GruntWrk e comece a receber pedidos diretos. Sem taxas de leads, sem pacotes de creditos, sem subscricoes. So paga 15% quando um trabalho e concluido e pago.",
        perks: [
          "Sem taxas de pay-per-lead ou desbloqueio de contacto",
          "Sem pacotes de creditos, subscricoes ou taxas de boost",
          "Perfil publico com avaliacoes e reviews",
          "Pedidos diretos de clientes locais",
        ],
        cta: { label: "Comecar como prestador", href: providerSignupHref },
      }
    : {
        badge: "For providers",
        title: `Are you a service provider in ${cityName}?`,
        desc: "Join GruntWrk and start receiving direct requests. No lead fees, no credit packs, no subscriptions. You only pay 15% when a job is completed and paid.",
        perks: [
          "No pay-per-lead or contact unlock fees",
          "No credit packs, subscriptions, or boost charges",
          "Public profile with ratings and reviews",
          "Direct requests from local customers",
        ],
        cta: { label: "Start as a provider", href: providerSignupHref },
      };

  const reviews: SeoReview[] = isPt
    ? [
        { stars: 5, text: "Plataforma muito eficaz para ligar clientes e prestadores de servicos. Encontrar e reservar um trabalho e simples e rapido.", name: "Maria S.", role: "Cliente" },
        { stars: 5, text: "Sem taxas de leads, sem pacotes de creditos. Basta inscrever-me e comecar a orcar. Mais do que ganho fica comigo.", name: "James P.", role: "Prestador" },
      ]
    : [
        { stars: 5, text: "Very effective platform for connecting clients and service providers. Finding and booking a job is simple and fast.", name: "Maria S.", role: "Customer" },
        { stars: 5, text: "No lead fees, no credit packs. I just sign up and start quoting. More of what I earn stays with me.", name: "James P.", role: "Provider" },
      ];

  return {
    title: isPt
      ? `Servicos locais em ${city.name.pt} | GruntWrk`
      : `Local services in ${city.name.en} | GruntWrk`,
    description: city.intro[locale],
    eyebrow: isPt ? "Servicos locais" : "Local services",
    heroTitle: isPt
      ? city.id === "lisbon" ? `Resolva em ${city.name.pt}. Pague menos.` : `Ajuda local no ${city.name.pt}. Precos honestos.`
      : city.id === "lisbon" ? `Get it done in ${city.name.en}. Pay less.` : `Local help in ${city.name.en}. Honest prices.`,
    heroDescription: city.intro[locale],
    primaryCta: { label: LABELS.request[locale], href: buildCustomerRequestHref() },
    secondaryCta: { label: LABELS.join[locale], href: providerSignupHref },
    sections: [],
    stats,
    benefitCards,
    howSteps,
    providerCta,
    reviews,
    faqTitle: LABELS.faq[locale],
    faqs: isPt
      ? [
          { question: `Como funciona o GruntWrk em ${city.name.pt}?`, answer: "Descreva o que precisa, receba orcamentos de prestadores locais e contrate diretamente. Sem taxas de leads, sem pacotes de creditos." },
          { question: "Quanto custa para clientes?", answer: "Nada. Os clientes nao pagam taxas. Os prestadores pagam 15% quando o trabalho e concluido e pago." },
          { question: "Posso voltar a reservar o mesmo prestador?", answer: "Sim. Quando encontrar alguem de confianca, pode voltar a reserva-lo diretamente pela bancada de trabalho." },
        ]
      : [
          { question: `How does GruntWrk work in ${city.name.en}?`, answer: "Describe what you need, get quotes from local providers, and hire directly. No lead fees, no credit packs." },
          { question: "How much does it cost for customers?", answer: "Nothing. Customers pay zero fees. Providers pay 15% when the job is completed and paid." },
          { question: "Can I rebook the same provider?", answer: "Yes. Once you find someone you trust, you can rebook them directly from your workbench." },
        ],
    cardsTitle: isPt ? "Explorar servicos" : "Explore services",
    cards: SERVICES.map((service) => buildCityServiceCard(locale, city, service)),
    breadcrumbs: [
      { label: LABELS.home[locale], href: localizedPath(locale, []) },
      { label: city.name[locale], href: localizedPath(locale, [city.slug[locale]]) },
    ],
  };
}

function buildServicePage(locale: Locale, service: ServiceDefinition): Omit<ResolvedSeoPage, "id" | "kind" | "locale" | "slug" | "path" | "alternates"> {
  const isPt = locale === "pt";
  return {
    title: isPt
      ? `${service.name.pt} em Portugal | GruntWrk`
      : `${service.name.en} in Portugal | GruntWrk`,
    description: service.summary[locale],
    eyebrow: isPt ? "Serviço" : "Service",
    heroTitle: isPt
      ? `${service.name.pt}`
      : `${service.name.en}`,
    heroDescription: isPt
      ? `Compare orcamentos de ${service.name.pt.toLowerCase()} em Portugal. Sem taxas de leads, precos mais baixos para si.`
      : `Compare quotes for ${service.name.en.toLowerCase()} in Portugal. No lead fees mean lower prices for you.`,
    primaryCta: { label: LABELS.request[locale], href: buildCustomerRequestHref(service.appCategory) },
    secondaryCta: { label: LABELS.join[locale], href: buildProviderSignupHref() },
    sections: [
      {
        title: isPt ? "Para clientes" : "For customers",
        items: service.customerBullets[locale],
      },
      {
        title: isPt ? "Trabalho comum" : "Common jobs",
        items: service.commonJobs[locale],
      },
      {
        title: isPt ? "Para prestadores" : "For providers",
        items: service.providerBullets[locale],
      },
    ],
    cardsTitle: isPt ? "Explorar por cidade" : "Explore by city",
    cards: CITIES.map((city) => buildCityServiceCard(locale, city, service)),
    breadcrumbs: [
      { label: LABELS.home[locale], href: localizedPath(locale, []) },
      { label: LABELS.services[locale], href: localizedPath(locale, [LABELS.servicesSegment[locale]]) },
      { label: service.name[locale], href: localizedPath(locale, [LABELS.servicesSegment[locale], service.slug[locale]]) },
    ],
    serviceSchema: {
      name: isPt ? `${service.name.pt} em Portugal` : `${service.name.en} in Portugal`,
      description: service.summary[locale],
      serviceType: service.name[locale],
      areaServed: ["Portugal", "Lisbon", "Porto"],
    },
  };
}

function buildCityServicePage(
  locale: Locale,
  city: CityDefinition,
  service: ServiceDefinition
): Omit<ResolvedSeoPage, "id" | "kind" | "locale" | "slug" | "path" | "alternates"> {
  const isPt = locale === "pt";
  return {
    title: isPt
      ? `${service.name.pt} em ${city.name.pt} | GruntWrk`
      : `${service.name.en} in ${city.name.en} | GruntWrk`,
    description: isPt
      ? `${service.summary.pt} Disponível em ${city.name.pt} através do GruntWrk.`
      : `${service.summary.en} Available in ${city.name.en} through GruntWrk.`,
    eyebrow: city.name[locale],
    heroTitle: isPt
      ? `${service.name.pt} em ${city.name.pt}`
      : `${service.name.en} in ${city.name.en}`,
    heroDescription: isPt
      ? `Compare orcamentos de ${service.name.pt.toLowerCase()} em ${city.name.pt}. Sem taxas de leads, precos mais baixos para si.`
      : `Compare quotes for ${service.name.en.toLowerCase()} in ${city.name.en}. No lead fees mean lower prices for you.`,
    primaryCta: { label: LABELS.request[locale], href: buildCustomerRequestHref(service.appCategory) },
    secondaryCta: { label: LABELS.join[locale], href: buildProviderSignupHref(city.name.en) },
    sections: [
      {
        title: isPt ? "Para clientes" : "For customers",
        items: service.customerBullets[locale],
      },
      {
        title: isPt ? "Pedidos comuns" : "Common jobs",
        items: service.commonJobs[locale],
      },
      {
        title: isPt ? "Para prestadores" : "For providers",
        items: service.providerBullets[locale],
      },
    ],
    faqTitle: LABELS.faq[locale],
    faqs: isPt
      ? [
          {
            question: `Que ${service.name.pt.toLowerCase()} posso pedir em ${city.name.pt}?`,
            answer: `${service.commonJobs.pt.join(", ")}. Publique o seu pedido e profissionais locais enviam orcamentos.`,
          },
          {
            question: `Quanto custam ${service.name.pt.toLowerCase()} em ${city.name.pt}?`,
            answer: `Depende do trabalho, mas como os profissionais no GruntWrk nao pagam taxas de leads, os orcamentos refletem o custo real do trabalho, nao o custo da plataforma.`,
          },
          {
            question: "Posso voltar a reservar o mesmo profissional?",
            answer: "Sim. Quando encontrar alguem de confianca, pode voltar a reserva-lo diretamente pela bancada de trabalho.",
          },
        ]
      : [
          {
            question: `What ${service.name.en.toLowerCase()} can I book in ${city.name.en}?`,
            answer: `${service.commonJobs.en.join(", ")}. Post your request and local providers send you quotes.`,
          },
          {
            question: `How much do ${service.name.en.toLowerCase()} cost in ${city.name.en}?`,
            answer: `Prices depend on the job, but because providers on GruntWrk don't pay lead fees, their quotes reflect the actual cost of the work, not the cost of the platform.`,
          },
          {
            question: "Can I rebook the same provider?",
            answer: "Yes. Once you find someone you trust, you can rebook them directly from your workbench.",
          },
        ],
    breadcrumbs: [
      { label: LABELS.home[locale], href: localizedPath(locale, []) },
      { label: city.name[locale], href: localizedPath(locale, [city.slug[locale]]) },
      { label: service.name[locale], href: localizedPath(locale, [city.slug[locale], service.slug[locale]]) },
    ],
    serviceSchema: {
      name: isPt
        ? `${service.name.pt} em ${city.name.pt}`
        : `${service.name.en} in ${city.name.en}`,
      description: isPt
        ? `${service.summary.pt} Encontre ou ofereça este serviço em ${city.name.pt} através do GruntWrk.`
        : `${service.summary.en} Find or offer this service in ${city.name.en} through GruntWrk.`,
      serviceType: service.name[locale],
      areaServed: [city.name.en, "Portugal"],
    },
  };
}

function buildComparisonPage(locale: Locale, competitor: "fixando" | "zaask") {
  const isPt = locale === "pt";
  const slug = competitor === "fixando"
    ? { en: "gruntwrk-vs-fixando", pt: "alternativa-fixando" }
    : { en: "gruntwrk-vs-zaask", pt: "alternativa-zaask" };
  const label = competitor === "fixando" ? "Fixando" : "Zaask";
  const title = isPt ? `Alternativa ao ${label}` : `GruntWrk vs ${label}`;
  return {
    slug,
    page: {
      title: isPt ? `${title} em Portugal | GruntWrk` : `${title} in Portugal | GruntWrk`,
      description: isPt
        ? `Compare o GruntWrk com o ${label} para serviços locais em Portugal.`
        : `Compare GruntWrk with ${label} for local services in Portugal.`,
      eyebrow: isPt ? "Comparação" : "Comparison",
      heroTitle: title,
      heroDescription: isPt
        ? `Se procura uma alternativa ao ${label}, o GruntWrk foi desenhado para tornar pedidos, perfis e reservas mais diretos para clientes e prestadores.`
        : `If you are looking for an alternative to ${label}, GruntWrk is designed to make requests, profiles, and bookings more direct for customers and providers.`,
      primaryCta: { label: LABELS.join[locale], href: buildProviderSignupHref() },
      secondaryCta: { label: LABELS.request[locale], href: buildCustomerRequestHref() },
      sections: [
        {
          title: isPt ? "Porque algumas pessoas procuram alternativa" : "Why some people look for an alternative",
          items: isPt
            ? [
                "Custos por lead antes do trabalho ser ganho.",
                "Fricção em créditos e respostas pagas.",
                "Pressão para inflacionar preços no orçamento.",
              ]
            : [
                "Lead costs before the work is won.",
                "Friction from credits and paid responses.",
                "Pressure to inflate prices inside the quote.",
              ],
        },
        {
          title: isPt ? "O que o GruntWrk oferece" : "What GruntWrk offers instead",
          items: isPt
            ? [
                "Perfis pessoais para clientes avaliarem melhor antes de pedir trabalho.",
                "Pedidos mais diretos entre clientes e prestadores.",
                "Taxa de prestador de 15% quando o trabalho avança, em vez de pagar só para responder.",
              ]
            : [
                "Personal profiles so clients can judge fit before requesting work.",
                "More direct requests between customers and providers.",
                "A 15% provider fee when work moves ahead, instead of paying just to respond.",
              ],
        },
      ],
      note: isPt
        ? `Compare as plataformas e escolha a experiência que melhor se adapta à forma como gosta de contratar ou trabalhar.`
        : "Compare the platforms and choose the workflow that best fits how you like to hire or work.",
      breadcrumbs: [
        { label: LABELS.home[locale], href: localizedPath(locale, []) },
        { label: title, href: localizedPath(locale, [slug[locale]]) },
      ],
    },
  };
}

function buildPages() {
  const pages: ResolvedSeoPage[] = [];

  for (const locale of ["en", "pt"] as const) {
    const staticEntries = [
      {
        id: "providers",
        kind: "audience" as const,
        slug: [locale === "pt" ? "prestadores" : "providers"],
        page: buildProvidersPage(locale),
      },
      {
        id: "customers",
        kind: "audience" as const,
        slug: [locale === "pt" ? "clientes" : "customers"],
        page: buildCustomersPage(locale),
      },
      {
        id: "services",
        kind: "services-index" as const,
        slug: [LABELS.servicesSegment[locale]],
        page: buildServicesIndexPage(locale),
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

    for (const city of CITIES) {
      const citySlug = [city.slug[locale]];
      pages.push({
        id: `city-${city.id}`,
        kind: "city",
        locale,
        slug: citySlug,
        path: localizedPath(locale, citySlug),
        ...buildCityPage(locale, city),
        alternates: {} as Record<Locale, string>,
      });

      const cityProviderSlug = [city.slug[locale], locale === "pt" ? "trabalho" : "work"];
      pages.push({
        id: `city-provider-${city.id}`,
        kind: "city-provider",
        locale,
        slug: cityProviderSlug,
        path: localizedPath(locale, cityProviderSlug),
        ...buildCityProviderPage(locale, city),
        alternates: {} as Record<Locale, string>,
      });

      for (const service of SERVICES) {
        const cityServiceSlug = [city.slug[locale], service.slug[locale]];
        pages.push({
          id: `city-service-${city.id}-${service.id}`,
          kind: "city-service",
          locale,
          slug: cityServiceSlug,
          path: localizedPath(locale, cityServiceSlug),
          ...buildCityServicePage(locale, city, service),
          alternates: {} as Record<Locale, string>,
        });
      }
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

export function getSeoNavItems(locale: Locale, currentPath: string): { cities: SeoNavItem[]; services: SeoNavItem[] } {
  const cities = CITIES.map((city) => {
    const href = localizedPath(locale, [city.slug[locale]]);
    return { label: city.name[locale], href, active: currentPath === href };
  });
  const services = SERVICES.map((service) => {
    const href = localizedPath(locale, [LABELS.servicesSegment[locale], service.slug[locale]]);
    return { label: service.name[locale], href, active: currentPath === href };
  });
  return { cities, services };
}
