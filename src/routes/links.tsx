import { createFileRoute } from "@tanstack/react-router";
import { LinktreePage } from "@/components/LinktreePage";
import fachada from "@/assets/fachada.jpg";

const SITE_URL = "https://links.chemalbec.com";

export const Route = createFileRoute("/links")({
  head: () => {
    const ogImageUrl = `https://chemalbec.com${fachada}`;
    return {
      links: [{ rel: "canonical", href: `${SITE_URL}/` }],
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
          property: "og:title",
          content: "Che Malbec — Enlaces Oficiales & Reservas",
        },
        {
          property: "og:description",
          content:
            "Reservá tu mesa, mirá la carta de vinos, pedí delivery y enterate de los próximos eventos en Che Malbec.",
        },
        {
          property: "og:image",
          content: ogImageUrl,
        },
        {
          property: "og:url",
          content: `${SITE_URL}/`,
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          name: "twitter:title",
          content: "Che Malbec — Enlaces Oficiales",
        },
        {
          name: "twitter:description",
          content: "Enlaces rápidos a reservas, carta gastronómica, delivery y eventos.",
        },
        {
          name: "twitter:image",
          content: ogImageUrl,
        },
      ],
    };
  },
  component: LinktreePage,
});
