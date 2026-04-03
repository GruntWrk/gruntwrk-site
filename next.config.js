/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    // Redirect old city-service pages to canonical service pages.
    // Covers all 6 original services × 2 cities × 2 locales = 24 redirects.
    return [
      // EN — Lisbon
      { source: "/en/lisbon/cleaning", destination: "/en/services/cleaning", permanent: true },
      { source: "/en/lisbon/plumber", destination: "/en/services/plumber", permanent: true },
      { source: "/en/lisbon/electrician", destination: "/en/services/electrician", permanent: true },
      { source: "/en/lisbon/home-repairs", destination: "/en/services/home-repairs", permanent: true },
      { source: "/en/lisbon/painting", destination: "/en/services/painting", permanent: true },
      { source: "/en/lisbon/moving", destination: "/en/services/moving", permanent: true },
      // EN — Porto
      { source: "/en/porto/cleaning", destination: "/en/services/cleaning", permanent: true },
      { source: "/en/porto/plumber", destination: "/en/services/plumber", permanent: true },
      { source: "/en/porto/electrician", destination: "/en/services/electrician", permanent: true },
      { source: "/en/porto/home-repairs", destination: "/en/services/home-repairs", permanent: true },
      { source: "/en/porto/painting", destination: "/en/services/painting", permanent: true },
      { source: "/en/porto/moving", destination: "/en/services/moving", permanent: true },
      // PT — Lisboa
      { source: "/pt/lisboa/limpezas", destination: "/pt/servicos/limpezas", permanent: true },
      { source: "/pt/lisboa/canalizador", destination: "/pt/servicos/canalizador", permanent: true },
      { source: "/pt/lisboa/eletricista", destination: "/pt/servicos/eletricista", permanent: true },
      { source: "/pt/lisboa/reparacoes-domesticas", destination: "/pt/servicos/reparacoes-domesticas", permanent: true },
      { source: "/pt/lisboa/pintura", destination: "/pt/servicos/pintura", permanent: true },
      { source: "/pt/lisboa/mudancas", destination: "/pt/servicos/mudancas", permanent: true },
      // PT — Porto
      { source: "/pt/porto/limpezas", destination: "/pt/servicos/limpezas", permanent: true },
      { source: "/pt/porto/canalizador", destination: "/pt/servicos/canalizador", permanent: true },
      { source: "/pt/porto/eletricista", destination: "/pt/servicos/eletricista", permanent: true },
      { source: "/pt/porto/reparacoes-domesticas", destination: "/pt/servicos/reparacoes-domesticas", permanent: true },
      { source: "/pt/porto/pintura", destination: "/pt/servicos/pintura", permanent: true },
      { source: "/pt/porto/mudancas", destination: "/pt/servicos/mudancas", permanent: true },
    ];
  },
};

module.exports = nextConfig;
