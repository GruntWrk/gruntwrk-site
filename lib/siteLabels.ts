import type { Locale } from "./i18n";

const labels = {
  en: {
    appHome: "Go to app homepage", primaryNav: "Primary navigation", siteNav: "Site navigation",
    bottomNav: "Bottom navigation", breadcrumb: "Breadcrumb", carousel: "Select carousel slide",
    showPoint: "Show point", competitors: "Example competitor marketplaces", stars: "out of 5 stars",
    locations: "Locations", providers: "Service providers", categories: "Categories", contact: "Email GruntWrk",
    steps: ["Describe", "Review", "Compare"], language: "Language",
  },
  pt: {
    appHome: "Ir para a página inicial da aplicação", primaryNav: "Navegação principal", siteNav: "Navegação do site",
    bottomNav: "Navegação inferior", breadcrumb: "Percurso de navegação", carousel: "Selecionar diapositivo",
    showPoint: "Mostrar ponto", competitors: "Exemplos de plataformas concorrentes", stars: "de 5 estrelas",
    locations: "Localidades", providers: "Prestadores de serviços", categories: "Categorias", contact: "Enviar email ao GruntWrk",
    steps: ["Descreva", "Reveja", "Compare"], language: "Idioma",
  },
  de: {
    appHome: "Zur Startseite der App", primaryNav: "Hauptnavigation", siteNav: "Seitennavigation",
    bottomNav: "Untere Navigation", breadcrumb: "Navigationspfad", carousel: "Folie auswählen",
    showPoint: "Punkt anzeigen", competitors: "Beispiele anderer Marktplätze", stars: "von 5 Sternen",
    locations: "Standorte", providers: "Dienstleister", categories: "Kategorien", contact: "E-Mail an GruntWrk",
    steps: ["Beschreiben", "Auswählen", "Vergleichen"], language: "Sprache",
  },
} as const;

export const siteLabels = (locale: Locale) => labels[locale];
