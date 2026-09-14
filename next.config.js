/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    // Redirect old city-service pages to canonical service pages.
    // Covers all 6 original services × 2 cities × 2 locales = 24 redirects.
    return [
      ...[
  {
    "source": "/en/lisbon",
    "destination": "/en/services",
    "permanent": true
  },
  {
    "source": "/en/lisbon/work",
    "destination": "/en/providers",
    "permanent": true
  },
  {
    "source": "/en/porto",
    "destination": "/en/services",
    "permanent": true
  },
  {
    "source": "/en/porto/work",
    "destination": "/en/providers",
    "permanent": true
  },
  {
    "source": "/en/braga",
    "destination": "/en/services",
    "permanent": true
  },
  {
    "source": "/en/braga/work",
    "destination": "/en/providers",
    "permanent": true
  },
  {
    "source": "/en/aveiro",
    "destination": "/en/services",
    "permanent": true
  },
  {
    "source": "/en/aveiro/work",
    "destination": "/en/providers",
    "permanent": true
  },
  {
    "source": "/en/faro",
    "destination": "/en/services",
    "permanent": true
  },
  {
    "source": "/en/faro/work",
    "destination": "/en/providers",
    "permanent": true
  },
  {
    "source": "/en/leiria",
    "destination": "/en/services",
    "permanent": true
  },
  {
    "source": "/en/leiria/work",
    "destination": "/en/providers",
    "permanent": true
  },
  {
    "source": "/en/setubal",
    "destination": "/en/services",
    "permanent": true
  },
  {
    "source": "/en/setubal/work",
    "destination": "/en/providers",
    "permanent": true
  },
  {
    "source": "/en/coimbra",
    "destination": "/en/services",
    "permanent": true
  },
  {
    "source": "/en/coimbra/work",
    "destination": "/en/providers",
    "permanent": true
  },
  {
    "source": "/en/viseu",
    "destination": "/en/services",
    "permanent": true
  },
  {
    "source": "/en/viseu/work",
    "destination": "/en/providers",
    "permanent": true
  },
  {
    "source": "/en/viana-do-castelo",
    "destination": "/en/services",
    "permanent": true
  },
  {
    "source": "/en/viana-do-castelo/work",
    "destination": "/en/providers",
    "permanent": true
  },
  {
    "source": "/en/vila-real",
    "destination": "/en/services",
    "permanent": true
  },
  {
    "source": "/en/vila-real/work",
    "destination": "/en/providers",
    "permanent": true
  },
  {
    "source": "/en/santarem",
    "destination": "/en/services",
    "permanent": true
  },
  {
    "source": "/en/santarem/work",
    "destination": "/en/providers",
    "permanent": true
  },
  {
    "source": "/en/evora",
    "destination": "/en/services",
    "permanent": true
  },
  {
    "source": "/en/evora/work",
    "destination": "/en/providers",
    "permanent": true
  },
  {
    "source": "/en/castelo-branco",
    "destination": "/en/services",
    "permanent": true
  },
  {
    "source": "/en/castelo-branco/work",
    "destination": "/en/providers",
    "permanent": true
  },
  {
    "source": "/en/guarda",
    "destination": "/en/services",
    "permanent": true
  },
  {
    "source": "/en/guarda/work",
    "destination": "/en/providers",
    "permanent": true
  },
  {
    "source": "/en/braganca",
    "destination": "/en/services",
    "permanent": true
  },
  {
    "source": "/en/braganca/work",
    "destination": "/en/providers",
    "permanent": true
  },
  {
    "source": "/en/portalegre",
    "destination": "/en/services",
    "permanent": true
  },
  {
    "source": "/en/portalegre/work",
    "destination": "/en/providers",
    "permanent": true
  },
  {
    "source": "/en/beja",
    "destination": "/en/services",
    "permanent": true
  },
  {
    "source": "/en/beja/work",
    "destination": "/en/providers",
    "permanent": true
  },
  {
    "source": "/pt/lisboa",
    "destination": "/pt/servicos",
    "permanent": true
  },
  {
    "source": "/pt/lisboa/trabalho",
    "destination": "/pt/prestadores",
    "permanent": true
  },
  {
    "source": "/pt/porto",
    "destination": "/pt/servicos",
    "permanent": true
  },
  {
    "source": "/pt/porto/trabalho",
    "destination": "/pt/prestadores",
    "permanent": true
  },
  {
    "source": "/pt/braga",
    "destination": "/pt/servicos",
    "permanent": true
  },
  {
    "source": "/pt/braga/trabalho",
    "destination": "/pt/prestadores",
    "permanent": true
  },
  {
    "source": "/pt/aveiro",
    "destination": "/pt/servicos",
    "permanent": true
  },
  {
    "source": "/pt/aveiro/trabalho",
    "destination": "/pt/prestadores",
    "permanent": true
  },
  {
    "source": "/pt/faro",
    "destination": "/pt/servicos",
    "permanent": true
  },
  {
    "source": "/pt/faro/trabalho",
    "destination": "/pt/prestadores",
    "permanent": true
  },
  {
    "source": "/pt/leiria",
    "destination": "/pt/servicos",
    "permanent": true
  },
  {
    "source": "/pt/leiria/trabalho",
    "destination": "/pt/prestadores",
    "permanent": true
  },
  {
    "source": "/pt/setubal",
    "destination": "/pt/servicos",
    "permanent": true
  },
  {
    "source": "/pt/setubal/trabalho",
    "destination": "/pt/prestadores",
    "permanent": true
  },
  {
    "source": "/pt/coimbra",
    "destination": "/pt/servicos",
    "permanent": true
  },
  {
    "source": "/pt/coimbra/trabalho",
    "destination": "/pt/prestadores",
    "permanent": true
  },
  {
    "source": "/pt/viseu",
    "destination": "/pt/servicos",
    "permanent": true
  },
  {
    "source": "/pt/viseu/trabalho",
    "destination": "/pt/prestadores",
    "permanent": true
  },
  {
    "source": "/pt/viana-do-castelo",
    "destination": "/pt/servicos",
    "permanent": true
  },
  {
    "source": "/pt/viana-do-castelo/trabalho",
    "destination": "/pt/prestadores",
    "permanent": true
  },
  {
    "source": "/pt/vila-real",
    "destination": "/pt/servicos",
    "permanent": true
  },
  {
    "source": "/pt/vila-real/trabalho",
    "destination": "/pt/prestadores",
    "permanent": true
  },
  {
    "source": "/pt/santarem",
    "destination": "/pt/servicos",
    "permanent": true
  },
  {
    "source": "/pt/santarem/trabalho",
    "destination": "/pt/prestadores",
    "permanent": true
  },
  {
    "source": "/pt/evora",
    "destination": "/pt/servicos",
    "permanent": true
  },
  {
    "source": "/pt/evora/trabalho",
    "destination": "/pt/prestadores",
    "permanent": true
  },
  {
    "source": "/pt/castelo-branco",
    "destination": "/pt/servicos",
    "permanent": true
  },
  {
    "source": "/pt/castelo-branco/trabalho",
    "destination": "/pt/prestadores",
    "permanent": true
  },
  {
    "source": "/pt/guarda",
    "destination": "/pt/servicos",
    "permanent": true
  },
  {
    "source": "/pt/guarda/trabalho",
    "destination": "/pt/prestadores",
    "permanent": true
  },
  {
    "source": "/pt/braganca",
    "destination": "/pt/servicos",
    "permanent": true
  },
  {
    "source": "/pt/braganca/trabalho",
    "destination": "/pt/prestadores",
    "permanent": true
  },
  {
    "source": "/pt/portalegre",
    "destination": "/pt/servicos",
    "permanent": true
  },
  {
    "source": "/pt/portalegre/trabalho",
    "destination": "/pt/prestadores",
    "permanent": true
  },
  {
    "source": "/pt/beja",
    "destination": "/pt/servicos",
    "permanent": true
  },
  {
    "source": "/pt/beja/trabalho",
    "destination": "/pt/prestadores",
    "permanent": true
  }
],
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
