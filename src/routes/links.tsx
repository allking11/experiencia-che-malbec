import { createFileRoute } from "@tanstack/react-router";
import { LinktreePage } from "@/components/LinktreePage";

const SITE_URL = "https://links.chemalbec.com";
const OG_IMAGE_URL = "https://chemalbec.com/icon-512.png";

export const Route = createFileRoute("/links")({
  head: () => ({
    links: [
      {
        rel: "canonical",
        href: `${SITE_URL}/links`,
        key: "canonical",
      },
    ],
    meta: [
      {
        title: "Che Malbec | Enlaces Oficiales, Reservas y Menú",
      },
      {
        name: "description",
        content:
          "Accedé a reservas directas, carta online, delivery por PedidosYa, próximos eventos de vinos boutique y franquicias de Che Malbec en Buenos Aires.",
      },
      {
        name: "robots",
        content: "index, follow",
      },
      {
        property: "og:site_name",
        content: "Che Malbec Mercado & Wine Bar",
      },
      {
        property: "og:locale",
        content: "es_AR",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:url",
        content: `${SITE_URL}/links`,
      },
      {
        property: "og:title",
        content: "Che Malbec — Enlaces Oficiales & Reservas",
      },
      {
        property: "og:description",
        content:
          "Reservá tu mesa en Monserrat o San Telmo, mirá la carta de vinos, pedí por delivery y enterate de los próximos eventos.",
      },
      {
        property: "og:image",
        content: OG_IMAGE_URL,
      },
      {
        property: "og:image:secure_url",
        content: OG_IMAGE_URL,
      },
      {
        property: "og:image:type",
        content: "image/png",
      },
      {
        property: "og:image:width",
        content: "512",
      },
      {
        property: "og:image:height",
        content: "512",
      },
      {
        property: "og:image:alt",
        content: "Che Malbec Mercado & Wine Bar Buenos Aires",
      },
      {
        name: "twitter:card",
        content: "summary",
      },
      {
        name: "twitter:title",
        content: "Che Malbec — Enlaces Oficiales & Reservas",
      },
      {
        name: "twitter:description",
        content:
          "Acceso directo a reservas de degustaciones, carta de vinos boutique, delivery y franquicias.",
      },
      {
        name: "twitter:image",
        content: OG_IMAGE_URL,
      },
    ],
  }),
  component: LinktreePage,
});
