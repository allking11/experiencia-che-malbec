import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";
import fachada from "@/assets/fachada.jpg";
import copa from "@/assets/copa.jpg";
import copaBotella from "@/assets/copa-botella.jpg";
import burrata from "@/assets/burrata.jpg";
import clientes from "@/assets/clientes.jpg";
import feriaVinosVideo from "@/assets/feria-vinos.mp4";
import { ReservationDialog } from "@/components/ReservationDialog";
import { FranchiseDialog } from "@/components/FranchiseDialog";
import {
  Calendar,
  Clock,
  MapPin,
  Menu,
  Wine,
  Sparkles,
  Phone,
  ShoppingBag,
  PartyPopper,
  ExternalLink,
  Check,
  ChevronRight,
  Download,
  Building2,
  Star,
  Flame,
  Utensils,
  GlassWater,
  Layers,
  Heart,
  Award,
  Compass,
  BookOpen,
  HelpCircle,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SITE_URL = "https://chemalbec.com";

export const Route = createFileRoute("/")({
  head: () => {
    const ogImageUrl = `${SITE_URL}${fachada}`;
    return {
      links: [{ rel: "canonical", href: `${SITE_URL}/` }],
      meta: [
        {
          title: "Che Malbec — Boutique Wine Bar & Degustación de Vinos en Buenos Aires",
        },
        {
          name: "description",
          content:
            "Disfrutá de catas de vino, picadas caseras y degustaciones guiadas en nuestras dos sedes: Monserrat (Palacio Vera) y San Telmo. Delivery por PedidosYa y franquicias disponibles.",
        },
        {
          name: "keywords",
          content:
            "che malbec, wine bar buenos aires, degustacion de vinos buenos aires, cata de vinos palacio vera, wine bar san telmo, vinos boutique buenos aires, maridaje buenos aires, bodegas boutique argentina, picadas buenos aires, eventos privados vino",
        },
        {
          property: "og:title",
          content: "Che Malbec — Wine Bar Boutique en Monserrat y San Telmo",
        },
        {
          property: "og:description",
          content:
            "Degustaciones de vinos boutique, 4 pasos guiados, tablas de quesos y empanadas artesanales en Buenos Aires.",
        },
        { property: "og:image", content: ogImageUrl },
        {
          property: "og:image:alt",
          content: "Fachada y Cava Boutique de Che Malbec en Buenos Aires",
        },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: ogImageUrl },
        {
          name: "twitter:image:alt",
          content: "Che Malbec Mercado & Wine Bar Buenos Aires",
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `${SITE_URL}/` },
        { property: "og:site_name", content: "Che Malbec Mercado & Wine Bar" },
        { property: "og:locale", content: "es_AR" },
      ],
    };
  },
  component: Index,
});

const WA_NUMBER = "5491128481233";
const WA_GENERAL_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
  "Hola Che Malbec 👋 Quiero consultar por una reserva o degustación.",
)}`;
const WA_DELIVERY_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
  "Hola Che Malbec 👋 Quiero hacer un pedido por delivery.",
)}`;
const WA_FIESTAS_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
  "Hola Che Malbec 👋 Quiero consultar por el servicio de 'Llevá Che Malbec a tu fiesta' para un evento privado.",
)}`;
const WA_FRANQUICIAS_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
  "📌 *[NUEVA CONSULTA DE FRANQUICIAS]*\nHola Che Malbec 👋 Me gustaría recibir más información y el brochure de franquicias.",
)}`;

const PEDIDOSYA_MONSERRAT_URL =
  "https://www.pedidosya.com.ar/restaurantes/buenos-aires/che-malbec-8df25b0e-e5ed-4c30-b5d4-0e6fb06b8d84-menu?origin=shop_list";
const PEDIDOSYA_SANTELMO_URL =
  "https://www.pedidosya.com.ar/restaurantes/buenos-aires/che-malbec-san-telmo-853f1925-62e0-4640-9fb9-490a1dd52fb6-menu?origin=shop_list";
const PEDIDOSYA_URL = PEDIDOSYA_MONSERRAT_URL;

const SUCURSAL_MONSERRAT = {
  nombre: "Monserrat · Histórico Palacio Vera",
  direccion: "Avenida de Mayo 777",
  detalle: "Histórico Palacio Vera · Monserrat · CABA",
  horarios: [
    { dia: "Lunes", hora: "11:00 — 19:00" },
    { dia: "Martes a sábado", hora: "11:00 — 23:00" },
    { dia: "Domingo", hora: "Cerrado" },
  ],
  mapsUrl: "https://share.google/IbQUx1agvvLy1xC0I",
  mapsEmbed: "https://www.google.com/maps?q=Avenida+de+Mayo+777,+Buenos+Aires&output=embed",
  instagram: "https://www.instagram.com/che.malbec/",
  instagramTag: "@che.malbec",
  pedidosYaUrl: PEDIDOSYA_MONSERRAT_URL,
};

const SUCURSAL_SANTELMO = {
  nombre: "San Telmo · Casco Histórico",
  direccion: "Estados Unidos 407",
  detalle: "San Telmo · CABA",
  horarios: [
    { dia: "Martes a sábado", hora: "18:00 — 00:00" },
    { dia: "Domingo y lunes", hora: "Cerrado" },
  ],
  mapsUrl: "https://share.google/zNkhEINs1aQGM3ulQ",
  mapsEmbed: "https://www.google.com/maps?q=Estados+Unidos+407,+Buenos+Aires&output=embed",
  instagram: "https://www.instagram.com/che.malbec.santelmo/",
  instagramTag: "@che.malbec.santelmo",
  pedidosYaUrl: PEDIDOSYA_SANTELMO_URL,
};

const EVENTOS_AGOSTO = [
  {
    fechaBadge: "14 de Agosto",
    titulo: "Lentos en Che Malbec",
    descripcion:
      "Una noche nostálgica y distendida con clásicos románticos, copas de vino boutique y tablas especiales para viajar en el tiempo.",
    tag: "Noche Temática 🎶",
    ctaWa: `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
      "Hola Che Malbec 👋 Quiero consultar cupos para el evento 'Lentos en Che Malbec' (14/8).",
    )}`,
  },
  {
    fechaBadge: "20 de Agosto",
    titulo: "Degustación Maridada Bodega A16",
    descripcion:
      "Experiencia sensorial exclusiva guiada por sommelier. Maridaje de etiquetas premiadas de Bodega A16 con gastronomía en 4 pasos.",
    tag: "Cata Guiada & Bodega 🍷",
    ctaWa: `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
      "Hola Che Malbec 👋 Quiero reservar para la Degustación Maridada Bodega A16 (20/8).",
    )}`,
  },
  {
    fechaBadge: "21 de Agosto",
    titulo: "Viernes Che de Solos y Solas",
    descripcion:
      "El punto de encuentro para amantes del buen vino, charlas amenas, picadas de autor y música en un ambiente íntimo y seguro.",
    tag: "Encuentro & Vinos ✨",
    ctaWa: `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
      "Hola Che Malbec 👋 Quiero consultar por el 'Viernes Che de Solos y Solas' (21/8).",
    )}`,
  },
  {
    fechaBadge: "29 de Agosto",
    titulo: "Sábado Che con Canilla Libre",
    descripcion:
      "Más de 15 etiquetas boutique con canilla libre por 3 horas, banda de rock de los 80's en vivo y la copa del evento de regalo.",
    tag: "Feria & Rock en Vivo 🎸",
    ctaWa: `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
      "Hola Che Malbec 👋 Quiero reservar para el 'Sábado Che con Canilla Libre' (29/8).",
    )}`,
  },
];

const FAQ_ITEMS = [
  {
    pregunta: "¿Cómo reservar una degustación de vinos o mesa en Che Malbec?",
    respuesta:
      "Podés reservar tu degustación guiada por sommelier o tu mesa para tapeo directamente por WhatsApp al +54 9 11 2848-1233 o a través del formulario de reserva de esta web. Recomendamos reservar con anticipación debido a la exclusividad de nuestras salas.",
  },
  {
    pregunta: "¿Dónde quedan las sucursales de Che Malbec y qué horarios manejan?",
    respuesta:
      "Tenemos dos sedes en la Ciudad de Buenos Aires: Sede Monserrat en el histórico Palacio Vera (Avenida de Mayo 777), abierta lunes de 11:00 a 19:00 y martes a sábados de 11:00 a 23:00; y Sede San Telmo (Estados Unidos 407), abierta de martes a sábados de 18:00 a 00:00.",
  },
  {
    pregunta: "¿Qué incluye la Degustación de Vinos Guiada en 4 Pasos?",
    respuesta:
      "Es una experiencia sensorial completa de 4 pasos guiada por un sommelier profesional. Se degustan copas de etiquetas boutique seleccionadas (blanco/rosado, tintos jóvenes y Malbecs de alta gama) acompañadas de maridaje con tablas de quesos, fiambres artesanales o empanadas caseras.",
  },
  {
    pregunta: "¿Se pueden comprar vinos boutique para llevar?",
    respuesta:
      "Sí, Che Malbec funciona como Mercado & Wine Bar. Podés adquirir botellas exclusivas de pequeños productores y bodegas boutique de distintas regiones vitivinícolas argentinas a precio directo de vinoteca.",
  },
  {
    pregunta: "¿Ofrecen catering y wine bar para eventos privados?",
    respuesta:
      "Sí, con nuestro servicio 'Llevá Che Malbec a tu fiesta' organizamos barras móviles de vino boutique, servicio de sommelier en vivo, catas privadas y picadas gourmet para casamientos, cumpleaños y eventos corporativos.",
  },
  {
    pregunta: "¿Hacen delivery de vinos y comida?",
    respuesta:
      "Sí, realizamos envíos a domicilio tanto de vinos seleccionados como de empanadas, pizzas y tablas de quesos a través de PedidosYa o haciendo tu pedido directo por nuestro WhatsApp.",
  },
  {
    pregunta: "¿Cómo abrir una franquicia de Che Malbec?",
    respuesta:
      "Disponemos de modelos de franquicia formato Wine Bar Boutique y formato Cava / Mercado Express para CABA, Gran Buenos Aires e interior del país. Podés consultar y solicitar el dossier comercial desde el módulo de franquicias de nuestra web.",
  },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in");
        }),
      { threshold: 0.05, rootMargin: "0px 0px -30px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

function Index() {
  useReveal();
  const [reservaOpen, setReservaOpen] = useState(false);
  const [reservaSucursal, setReservaSucursal] = useState<string | undefined>();
  const [franquiciaOpen, setFranquiciaOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const openReservaWith = (sucursal?: string) => {
    setReservaSucursal(sucursal);
    setReservaOpen(true);
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const schemaJson = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: "Che Malbec",
        description: "Boutique Wine Bar y Degustación de Vinos en Buenos Aires",
        inLanguage: "es-AR",
      },
      {
        "@type": ["Winery", "BarOrPub", "Restaurant"],
        "@id": `${SITE_URL}/#organization`,
        name: "Che Malbec Mercado & Wine Bar",
        alternateName: "Che Malbec",
        url: `${SITE_URL}/`,
        logo: `${SITE_URL}/icon-512.png`,
        image: [
          `${SITE_URL}${fachada}`,
          `${SITE_URL}${copa}`,
          `${SITE_URL}${copaBotella}`,
          `${SITE_URL}${burrata}`,
          `${SITE_URL}${clientes}`,
        ],
        telephone: "+5491128481233",
        priceRange: "$$",
        currenciesAccepted: "ARS, USD, EUR, BRL",
        paymentAccepted:
          "Efectivo, Tarjeta de Crédito, Tarjeta de Débito, Mercado Pago, Transferencia",
        servesCuisine: [
          "Vinos de Bodegas Boutique",
          "Degustaciones Guiadas por Sommeliers",
          "Picadas de Autor y Tablas de Quesos",
          "Empanadas Artesanales",
          "Sándwiches Gourmet",
          "Pizzas Caseras",
        ],
        acceptsReservations: "True",
        hasMenu: `${SITE_URL}/#carta`,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          bestRating: "5",
          ratingCount: "180",
        },
        department: [
          {
            "@type": ["Winery", "BarOrPub", "Restaurant"],
            "@id": `${SITE_URL}/#sede-monserrat`,
            name: "Che Malbec Monserrat (Palacio Vera)",
            image: `${SITE_URL}${fachada}`,
            telephone: "+5491128481233",
            url: `${SITE_URL}/#sucursales`,
            hasMap: SUCURSAL_MONSERRAT.mapsUrl,
            address: {
              "@type": "PostalAddress",
              streetAddress: "Avenida de Mayo 777 (Palacio Vera)",
              addressLocality: "Buenos Aires",
              addressRegion: "CABA",
              postalCode: "C1084",
              addressCountry: "AR",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: -34.6087,
              longitude: -58.3776,
            },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday"],
                opens: "11:00",
                closes: "19:00",
              },
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                opens: "11:00",
                closes: "23:00",
              },
            ],
          },
          {
            "@type": ["Winery", "BarOrPub", "Restaurant"],
            "@id": `${SITE_URL}/#sede-santelmo`,
            name: "Che Malbec San Telmo",
            image: `${SITE_URL}${fachada}`,
            telephone: "+5491128481233",
            url: `${SITE_URL}/#sucursales`,
            hasMap: SUCURSAL_SANTELMO.mapsUrl,
            address: {
              "@type": "PostalAddress",
              streetAddress: "Estados Unidos 407 (San Telmo)",
              addressLocality: "Buenos Aires",
              addressRegion: "CABA",
              postalCode: "C1101",
              addressCountry: "AR",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: -34.6186,
              longitude: -58.3713,
            },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                opens: "18:00",
                closes: "00:00",
              },
            ],
          },
        ],
        sameAs: [
          "https://www.instagram.com/che.malbec",
          "https://www.instagram.com/che.malbec.santelmo",
          SUCURSAL_MONSERRAT.mapsUrl,
          SUCURSAL_SANTELMO.mapsUrl,
          PEDIDOSYA_MONSERRAT_URL,
          PEDIDOSYA_SANTELMO_URL,
        ],
        description:
          "Wine Bar Boutique y degustación de vinos guiada en Buenos Aires con dos sedes: Monserrat (Palacio Vera) y San Telmo. Catas de vinos boutique por sommeliers, picadas caseras y delivery por PedidosYa.",
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: FAQ_ITEMS.map((faq) => ({
          "@type": "Question",
          name: faq.pregunta,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.respuesta,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/#breadcrumbs`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Inicio",
            item: `${SITE_URL}/#inicio`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Experiencia",
            item: `${SITE_URL}/#experiencia`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Sucursales",
            item: `${SITE_URL}/#sucursales`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "Degustaciones",
            item: `${SITE_URL}/#degustaciones`,
          },
          {
            "@type": "ListItem",
            position: 5,
            name: "Carta y Precios",
            item: `${SITE_URL}/#carta`,
          },
          {
            "@type": "ListItem",
            position: 6,
            name: "Eventos",
            item: `${SITE_URL}/#novedades`,
          },
          {
            "@type": "ListItem",
            position: 7,
            name: "Franquicias",
            item: `${SITE_URL}/#franquicias`,
          },
          {
            "@type": "ListItem",
            position: 8,
            name: "Preguntas Frecuentes",
            item: `${SITE_URL}/#faq`,
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-[color:var(--wine)] selection:text-[color:var(--cream)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />

      {/* HEADER / NAVIGATION */}
      <header
        className={`fixed inset-x-0 top-0 z-40 border-b border-[color:var(--gold)]/25 transition-all duration-500 ${
          scrolled
            ? "py-2 bg-[color:var(--cream)]/92 backdrop-blur-md shadow-md"
            : "py-3.5 bg-[color:var(--cream)]"
        }`}
      >
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[color:var(--gold)]/40 via-[color:var(--gold)] to-[color:var(--gold)]/40 transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
          <a
            href="#inicio"
            id="nav-logo-link"
            className="flex items-center gap-2 shrink-0 transition-opacity hover:opacity-90"
          >
            <img
              src={logo}
              alt="Che Malbec Mercado & Wine Bar"
              className="h-[32px] w-auto md:h-[40px]"
            />
          </a>

          <ul className="hidden items-center gap-3.5 lg:gap-6 text-xs lg:text-sm font-medium text-[color:var(--ink)]/85 xl:flex">
            <li>
              <a href="#experiencia" className="nav-link-animated hover:text-[color:var(--wine)]">
                Experiencia
              </a>
            </li>
            <li>
              <a href="#opiniones" className="nav-link-animated hover:text-[color:var(--wine)]">
                Opiniones (4.8★)
              </a>
            </li>
            <li>
              <a href="#sucursales" className="nav-link-animated hover:text-[color:var(--wine)]">
                Sucursales
              </a>
            </li>
            <li>
              <a href="#degustaciones" className="nav-link-animated hover:text-[color:var(--wine)]">
                Degustaciones
              </a>
            </li>
            <li>
              <a href="#carta" className="nav-link-animated hover:text-[color:var(--wine)]">
                Carta
              </a>
            </li>
            <li>
              <a href="#novedades" className="nav-link-animated hover:text-[color:var(--wine)]">
                Eventos
              </a>
            </li>
            <li>
              <a
                href="#delivery"
                className="nav-link-animated hover:text-[color:var(--wine)] flex items-center gap-1.5"
              >
                <ShoppingBag className="h-3.5 w-3.5 text-red-600" /> Delivery
              </a>
            </li>
            <li>
              <a
                href="#fiestas"
                className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--wine)]/20 bg-[color:var(--wine)]/10 px-3.5 py-1 text-xs font-semibold text-[color:var(--wine)] hover:bg-[color:var(--wine)] hover:text-[color:var(--cream)] transition-all"
              >
                <PartyPopper className="h-3.5 w-3.5 text-[color:var(--gold)]" /> Llevá Che a tu
                fiesta
              </a>
            </li>
            <li>
              <a href="#franquicias" className="nav-link-animated hover:text-[color:var(--wine)]">
                Franquicias
              </a>
            </li>
            <li>
              <a href="#faq" className="nav-link-animated hover:text-[color:var(--wine)]">
                Preguntas
              </a>
            </li>
          </ul>

          <div className="hidden items-center gap-2.5 md:flex">
            <button
              id="nav-reserve-btn"
              type="button"
              onClick={() => openReservaWith()}
              className="btn-tactile inline-flex items-center gap-2 rounded-full bg-[color:var(--wine)] px-4.5 py-2 text-xs lg:text-sm font-semibold tracking-wide text-[color:var(--cream)] shadow-sm cursor-pointer hover:bg-[color:var(--wine)]/90"
            >
              <WhatsAppIcon className="h-4 w-4 text-[color:var(--gold)]" /> Reservar
            </button>
          </div>

          {/* Mobile navigation trigger */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              type="button"
              onClick={() => openReservaWith()}
              className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--wine)] px-3 py-1.5 text-xs font-semibold text-[color:var(--cream)] cursor-pointer"
            >
              <WhatsAppIcon className="h-3.5 w-3.5 text-[color:var(--gold)]" /> Reservar
            </button>
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  aria-label="Abrir menú"
                  className="rounded-full p-2 text-[color:var(--ink)] hover:bg-[color:var(--wine)]/10"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[85vw] max-w-sm bg-[color:var(--cream)] border-l border-[color:var(--gold)]/30 text-[color:var(--ink)] p-6"
              >
                <SheetTitle className="font-serif text-2xl text-[color:var(--wine)]">
                  Che Malbec
                </SheetTitle>
                <SheetDescription className="text-xs text-[color:var(--ink)]/70">
                  Wine Bar Boutique & Mercado en Buenos Aires
                </SheetDescription>
                <div className="mt-8 flex flex-col space-y-4 text-base font-medium">
                  <a
                    href="#fiestas"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 rounded-lg bg-[color:var(--wine)]/10 p-3 text-[color:var(--wine)] font-semibold border border-[color:var(--gold)]/20"
                  >
                    <PartyPopper className="h-5 w-5 text-[color:var(--gold)]" /> Llevá Che a tu
                    fiesta
                  </a>
                  <a
                    href="#experiencia"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-1 hover:text-[color:var(--wine)]"
                  >
                    La Experiencia
                  </a>
                  <a
                    href="#opiniones"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-1 hover:text-[color:var(--wine)]"
                  >
                    Opiniones Google (4.8★)
                  </a>
                  <a
                    href="#sucursales"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-1 hover:text-[color:var(--wine)]"
                  >
                    Nuestras 2 Sucursales
                  </a>
                  <a
                    href="#degustaciones"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-1 hover:text-[color:var(--wine)]"
                  >
                    Degustaciones & Catas
                  </a>
                  <a
                    href="#carta"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-1 hover:text-[color:var(--wine)]"
                  >
                    Carta Completa & Precios
                  </a>
                  <a
                    href="#novedades"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-1 hover:text-[color:var(--wine)]"
                  >
                    Agenda de Eventos
                  </a>
                  <a
                    href="#delivery"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-1 hover:text-[color:var(--wine)] flex items-center gap-2"
                  >
                    <ShoppingBag className="h-4 w-4 text-red-600" /> Pedir por Delivery
                  </a>
                  <a
                    href="#franquicias"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-1 hover:text-[color:var(--wine)]"
                  >
                    Franquicias
                  </a>
                  <a
                    href="#faq"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-1 hover:text-[color:var(--wine)] flex items-center gap-2"
                  >
                    <HelpCircle className="h-4 w-4 text-[color:var(--gold)]" /> Preguntas Frecuentes
                  </a>
                  <div className="pt-4 border-t border-[color:var(--gold)]/20 space-y-2">
                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        openReservaWith();
                      }}
                      className="w-full rounded-full bg-[color:var(--wine)] py-3 text-center text-sm font-semibold uppercase tracking-wider text-[color:var(--cream)] shadow-md"
                    >
                      Reservar Mesa
                    </button>
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={PEDIDOSYA_MONSERRAT_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1 rounded-full border border-red-600 bg-red-600/10 py-2.5 px-2 text-center text-xs font-semibold text-red-700 hover:bg-red-600/20"
                      >
                        <ShoppingBag className="h-3.5 w-3.5 shrink-0" /> Monserrat
                      </a>
                      <a
                        href={PEDIDOSYA_SANTELMO_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1 rounded-full border border-red-600 bg-red-600/10 py-2.5 px-2 text-center text-xs font-semibold text-red-700 hover:bg-red-600/20"
                      >
                        <ShoppingBag className="h-3.5 w-3.5 shrink-0" /> San Telmo
                      </a>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>

      <main className="pt-[62px]">
        {/* HERO SECTION */}
        <section
          id="inicio"
          className="relative min-h-[92svh] w-full overflow-hidden flex items-center"
        >
          <div className="absolute inset-0 z-0">
            <img
              src={fachada}
              alt="Fachada histórica y cava boutique de Che Malbec"
              className="h-full w-full object-cover brightness-[0.42] scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--ink)] via-[color:var(--ink)]/50 to-[color:var(--ink)]/30" />
          </div>

          <div className="relative z-10 mx-auto max-w-5xl px-6 py-20 text-center text-[color:var(--cream)]">
            <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/40 bg-[color:var(--wine)]/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[color:var(--gold)] backdrop-blur-md shadow-lg">
              <Wine className="h-3.5 w-3.5 text-[color:var(--gold)]" /> Wine Bar Boutique ·
              Monserrat & San Telmo
            </div>

            <h1 className="mt-6 font-serif text-4xl sm:text-6xl md:text-7xl font-bold leading-[1.08] tracking-tight">
              El Arte del Buen Vino Argentino y{" "}
              <span className="italic text-[color:var(--gold)]">Momentos Inolvidables</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-[color:var(--cream)]/90 leading-relaxed font-light">
              Descubrí etiquetas de bodegas boutique, degustaciones guiadas por sommeliers, tapeo
              casero y la calidez de nuestras dos cavas en el centro histórico de Buenos Aires.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => openReservaWith()}
                className="btn-tactile inline-flex items-center gap-2.5 rounded-full bg-[color:var(--gold)] px-8 py-4 text-sm font-semibold uppercase tracking-wider text-[color:var(--ink)] shadow-xl hover:scale-105 transition-all cursor-pointer"
              >
                <WhatsAppIcon className="h-5 w-5" /> Reservar Degustación / Mesa
              </button>

              <a
                href="#carta"
                className="btn-tactile inline-flex items-center gap-2 rounded-full border border-[color:var(--cream)]/40 bg-white/10 px-7 py-4 text-sm font-semibold uppercase tracking-wider text-[color:var(--cream)] backdrop-blur-sm hover:bg-white/20 transition-all"
              >
                <Utensils className="h-4 w-4" /> Ver Carta & Precios
              </a>

              <a
                href="#fiestas"
                className="btn-tactile inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)] bg-[color:var(--wine)]/80 px-7 py-4 text-sm font-semibold uppercase tracking-wider text-[color:var(--gold)] backdrop-blur-sm hover:bg-[color:var(--wine)] transition-all"
              >
                <PartyPopper className="h-4 w-4" /> Llevá Che a tu fiesta
              </a>
            </div>

            {/* Micro badges */}
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-[color:var(--cream)]/85">
              <div className="rounded-xl bg-black/40 p-3.5 backdrop-blur-md border border-[color:var(--gold)]/30 shadow-lg">
                <span className="font-semibold text-[color:var(--gold)] block text-sm">
                  2 Sedes en CABA
                </span>
                Av. de Mayo & San Telmo
              </div>
              <div className="rounded-xl bg-black/40 p-3.5 backdrop-blur-md border border-[color:var(--gold)]/30 shadow-lg">
                <span className="font-semibold text-[color:var(--gold)] block text-sm">
                  4.8 ★ Google Maps
                </span>
                Cientos de reseñas reales
              </div>
              <div className="rounded-xl bg-black/40 p-3.5 backdrop-blur-md border border-[color:var(--gold)]/30 shadow-lg">
                <span className="font-semibold text-[color:var(--gold)] block text-sm">
                  Catas en 4 Pasos
                </span>
                Guiadas por sommeliers
              </div>
              <div className="rounded-xl bg-black/40 p-3.5 backdrop-blur-md border border-[color:var(--gold)]/30 shadow-lg">
                <span className="font-semibold text-[color:var(--gold)] block text-sm">
                  Delivery Activo
                </span>
                PedidosYa & WhatsApp
              </div>
            </div>
          </div>
        </section>

        {/* DEDICATED SECTION: LA EXPERIENCIA CHE MALBEC */}
        <section
          id="experiencia"
          className="bg-[color:var(--card)] py-20 sm:py-28 border-b border-[color:var(--gold)]/25"
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="gold-divider reveal reveal-slide-down">Nuestra Esencia</p>
              <h2 className="reveal reveal-slide-up mt-4 font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[color:var(--wine)]">
                La Experiencia Che Malbec
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[color:var(--ink)]/80 leading-relaxed">
                Más que un wine bar, un punto de encuentro donde el vino argentino se descubre copa
                a copa, sin solemnidades y con la calidez de un hogar porteño.
              </p>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div
                className="card-boutique reveal reveal-slide-up p-6 flex flex-col justify-between"
                style={{ transitionDelay: "0ms" }}
              >
                <div className="space-y-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[color:var(--wine)]/10 text-[color:var(--wine)]">
                    <Building2 className="h-6 w-6 text-[color:var(--gold)]" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[color:var(--wine)]">
                    Cavas con Historia
                  </h3>
                  <p className="text-xs text-[color:var(--ink)]/75 leading-relaxed">
                    Ubicados en el emblemático Palacio Vera (1910) y en el corazón de San Telmo,
                    combinando arquitectura clásica con intimidad contemporánea.
                  </p>
                </div>
                <div className="pt-4 border-t border-[color:var(--gold)]/20 mt-4 text-[11px] font-semibold text-[color:var(--gold)] uppercase tracking-wider">
                  Monserrat & San Telmo
                </div>
              </div>

              <div
                className="card-boutique reveal reveal-slide-up p-6 flex flex-col justify-between"
                style={{ transitionDelay: "100ms" }}
              >
                <div className="space-y-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[color:var(--wine)]/10 text-[color:var(--wine)]">
                    <Sparkles className="h-6 w-6 text-[color:var(--gold)]" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[color:var(--wine)]">
                    Sommeliers Cercanos
                  </h3>
                  <p className="text-xs text-[color:var(--ink)]/75 leading-relaxed">
                    Catas didácticas y distendidas donde aprendés de cepas, notas aromáticas y
                    regiones vitivinícolas sin necesidad de ser un experto.
                  </p>
                </div>
                <div className="pt-4 border-t border-[color:var(--gold)]/20 mt-4 text-[11px] font-semibold text-[color:var(--gold)] uppercase tracking-wider">
                  Guía Personalizada
                </div>
              </div>

              <div
                className="card-boutique reveal reveal-slide-up p-6 flex flex-col justify-between"
                style={{ transitionDelay: "200ms" }}
              >
                <div className="space-y-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[color:var(--wine)]/10 text-[color:var(--wine)]">
                    <Wine className="h-6 w-6 text-[color:var(--gold)]" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[color:var(--wine)]">
                    Bodegas Boutique
                  </h3>
                  <p className="text-xs text-[color:var(--ink)]/75 leading-relaxed">
                    Curaduría federal de pequeños productores de Salta, Mendoza, Patagonia y La
                    Rioja con partidas limitadas y cosechas seleccionadas.
                  </p>
                </div>
                <div className="pt-4 border-t border-[color:var(--gold)]/20 mt-4 text-[11px] font-semibold text-[color:var(--gold)] uppercase tracking-wider">
                  +100 Etiquetas Únicas
                </div>
              </div>

              <div
                className="card-boutique reveal reveal-slide-up p-6 flex flex-col justify-between"
                style={{ transitionDelay: "300ms" }}
              >
                <div className="space-y-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[color:var(--wine)]/10 text-[color:var(--wine)]">
                    <Utensils className="h-6 w-6 text-[color:var(--gold)]" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[color:var(--wine)]">
                    Gastronomía Autóctona
                  </h3>
                  <p className="text-xs text-[color:var(--ink)]/75 leading-relaxed">
                    Picadas abundantes de quesos y fiambres seleccionados, empanadas caseras de
                    osobuco al Malbec y sándwiches gourmet recién horneados.
                  </p>
                </div>
                <div className="pt-4 border-t border-[color:var(--gold)]/20 mt-4 text-[11px] font-semibold text-[color:var(--gold)] uppercase tracking-wider">
                  Maridajes Perfectos
                </div>
              </div>
            </div>

            {/* Sommelier quote callout */}
            <div className="mt-12 rounded-xl border border-[color:var(--gold)]/35 bg-[color:var(--cream)]/60 p-6 sm:p-8 text-center max-w-3xl mx-auto shadow-sm">
              <p className="font-serif text-base sm:text-lg italic text-[color:var(--wine)] leading-relaxed">
                “En Che Malbec desmitificamos el vino: te invitamos a explorar, maridar y disfrutar
                de etiquetas excepcionales en un ambiente íntimo y sin apuros.”
              </p>
              <span className="mt-3 block text-xs font-semibold uppercase tracking-widest text-[color:var(--gold)]">
                — Equipo de Sommeliers Che Malbec
              </span>
            </div>
          </div>
        </section>

        {/* OPINIONES */}
        <section
          id="opiniones"
          className="bg-wine-velvet text-[color:var(--cream)] py-20 sm:py-28 shadow-inner"
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-end">
              <div>
                <p className="gold-divider">Opiniones Reales</p>
                <h2 className="mt-4 font-serif text-4xl sm:text-5xl md:text-6xl leading-tight">
                  Calificación 4.8 <span className="text-[color:var(--gold)]">★</span> en Google
                  Maps
                </h2>
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-[color:var(--cream)]/80">
                La calidez del espacio, la cercanía de nuestros sommeliers y la abundancia de las
                picadas caseras nos convirtieron en un clásico indiscutido.
              </p>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {[
                {
                  q: "Una verdadera joya en medio del centro. Agustín nos guió copa a copa con mucha paciencia, explicando la historia de cada bodega. Las empanadas caseras son espectaculares. Ambiente íntimo ideal para bajar un cambio.",
                  n: "Mariana S.",
                  r: "Cliente local · Google Maps",
                },
                {
                  q: "Me encantó el lugar. Al estar dentro del histórico Palacio Vera, se respira una atmósfera única. Tienen etiquetas boutique muy interesantes y la atención te hace sentir como en casa.",
                  n: "Jean-Pierre L.",
                  r: "Visitante · Google Maps",
                },
                {
                  q: "Los vinos y la comida son excelentes, y la atención del sommelier impecable. El local es chico y acogedor — siempre conviene reservar para asegurar la mesa.",
                  n: "Carlos G.",
                  r: "Reseña verificada · Google Maps",
                },
              ].map((t, i) => (
                <article
                  key={t.n}
                  className="reveal reveal-slide-up flex flex-col rounded-xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm shadow-lg hover:border-[color:var(--gold)]/40 transition-all"
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <div className="text-sm tracking-widest text-[color:var(--gold)]">★ ★ ★ ★ ★</div>
                  <p className="mt-4 flex-1 font-serif text-base italic leading-relaxed text-[color:var(--cream)]/95">
                    “{t.q}”
                  </p>
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <p className="font-semibold text-[color:var(--cream)] text-sm">{t.n}</p>
                    <p className="text-xs text-[color:var(--cream)]/60">{t.r}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-12 text-center">
              <a
                href={SUCURSAL_MONSERRAT.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[color:var(--gold)] hover:underline"
              >
                Ver todas las reseñas en Google Maps <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </section>

        {/* MULTI-SUCURSALES */}
        <section id="sucursales" className="bg-[color:var(--cream)] py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="gold-divider reveal reveal-slide-down">Nuestras Casas</p>
              <h2 className="reveal reveal-slide-up mt-4 font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[color:var(--wine)]">
                Dos Sedes en Buenos Aires
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[color:var(--ink)]/80">
                Vení a vivir la experiencia Che Malbec en el emblemático Palacio Vera de Monserrat o
                en nuestra sede de San Telmo.
              </p>
            </div>

            <div className="mt-14 grid gap-8 md:grid-cols-2">
              {/* Sucursal 1: Monserrat */}
              <article className="reveal reveal-slide-right flex flex-col rounded-xl border border-[color:var(--gold)]/40 bg-[color:var(--card)] p-6 sm:p-8 shadow-xl">
                <div className="flex items-center justify-between pb-4 border-b border-[color:var(--gold)]/20">
                  <div>
                    <span className="text-xs uppercase tracking-widest font-semibold text-[color:var(--gold)]">
                      Sede Central
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-[color:var(--wine)]">
                      {SUCURSAL_MONSERRAT.nombre}
                    </h3>
                  </div>
                  <MapPin className="h-6 w-6 text-[color:var(--gold)]" />
                </div>

                <p className="mt-4 text-sm text-[color:var(--ink)]/85 font-medium">
                  📍 {SUCURSAL_MONSERRAT.direccion} ({SUCURSAL_MONSERRAT.detalle})
                </p>

                <div className="mt-4 rounded-lg bg-[color:var(--cream)]/50 p-4 text-xs space-y-1.5 text-[color:var(--ink)]/85 border border-[color:var(--gold)]/20">
                  <p className="font-semibold text-[color:var(--wine)] flex items-center gap-1.5 pb-1 border-b border-[color:var(--gold)]/20">
                    <Clock className="h-3.5 w-3.5 text-[color:var(--gold)]" /> Horarios de atención:
                  </p>
                  {SUCURSAL_MONSERRAT.horarios.map((h) => (
                    <div key={h.dia} className="flex justify-between">
                      <span>{h.dia}:</span>
                      <span className="font-medium">{h.hora}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 overflow-hidden rounded-lg border border-[color:var(--gold)]/35 aspect-[16/9] shadow-sm">
                  <iframe
                    title="Mapa Monserrat"
                    src={SUCURSAL_MONSERRAT.mapsEmbed}
                    className="h-full w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                <div className="mt-6 flex flex-wrap gap-2.5 pt-2 mt-auto">
                  <button
                    type="button"
                    onClick={() => openReservaWith("Monserrat (Palacio Vera - Av. de Mayo 777)")}
                    className="btn-tactile flex-1 min-w-[140px] rounded-full bg-[color:var(--wine)] px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[color:var(--cream)] text-center cursor-pointer hover:bg-[color:var(--wine)]/90"
                  >
                    Reservar en Monserrat
                  </button>
                  <a
                    href={SUCURSAL_MONSERRAT.pedidosYaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-red-500/40 bg-red-500/10 px-3.5 py-2 text-xs font-semibold text-red-700 hover:bg-red-500/20 transition-all"
                  >
                    <ShoppingBag className="h-3.5 w-3.5 text-red-600" /> PedidosYa
                  </a>
                  <a
                    href={SUCURSAL_MONSERRAT.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-full border border-[color:var(--gold)] px-3 py-2 text-xs font-medium text-[color:var(--ink)] hover:bg-[color:var(--gold)]/20 transition-all"
                  >
                    <ExternalLink className="h-3 w-3" /> Maps
                  </a>
                  <a
                    href={SUCURSAL_MONSERRAT.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-full border border-[color:var(--gold)] px-3 py-2 text-xs font-medium text-[color:var(--ink)] hover:bg-[color:var(--gold)]/20 transition-all"
                  >
                    {SUCURSAL_MONSERRAT.instagramTag}
                  </a>
                </div>
              </article>

              {/* Sucursal 2: San Telmo */}
              <article className="reveal reveal-slide-left flex flex-col rounded-xl border border-[color:var(--gold)]/40 bg-[color:var(--card)] p-6 sm:p-8 shadow-xl">
                <div className="flex items-center justify-between pb-4 border-b border-[color:var(--gold)]/20">
                  <div>
                    <span className="text-xs uppercase tracking-widest font-semibold text-[color:var(--gold)]">
                      Sede San Telmo
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-[color:var(--wine)]">
                      {SUCURSAL_SANTELMO.nombre}
                    </h3>
                  </div>
                  <MapPin className="h-6 w-6 text-[color:var(--gold)]" />
                </div>

                <p className="mt-4 text-sm text-[color:var(--ink)]/85 font-medium">
                  📍 {SUCURSAL_SANTELMO.direccion} ({SUCURSAL_SANTELMO.detalle})
                </p>

                <div className="mt-4 rounded-lg bg-[color:var(--cream)]/50 p-4 text-xs space-y-1.5 text-[color:var(--ink)]/85 border border-[color:var(--gold)]/20">
                  <p className="font-semibold text-[color:var(--wine)] flex items-center gap-1.5 pb-1 border-b border-[color:var(--gold)]/20">
                    <Clock className="h-3.5 w-3.5 text-[color:var(--gold)]" /> Horarios de atención:
                  </p>
                  {SUCURSAL_SANTELMO.horarios.map((h) => (
                    <div key={h.dia} className="flex justify-between">
                      <span>{h.dia}:</span>
                      <span className="font-medium">{h.hora}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 overflow-hidden rounded-lg border border-[color:var(--gold)]/35 aspect-[16/9] shadow-sm">
                  <iframe
                    title="Mapa San Telmo"
                    src={SUCURSAL_SANTELMO.mapsEmbed}
                    className="h-full w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                <div className="mt-6 flex flex-wrap gap-2.5 pt-2 mt-auto">
                  <button
                    type="button"
                    onClick={() => openReservaWith("San Telmo (Estados Unidos 407)")}
                    className="btn-tactile flex-1 min-w-[140px] rounded-full bg-[color:var(--wine)] px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[color:var(--cream)] text-center cursor-pointer hover:bg-[color:var(--wine)]/90"
                  >
                    Reservar en San Telmo
                  </button>
                  <a
                    href={SUCURSAL_SANTELMO.pedidosYaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-red-500/40 bg-red-500/10 px-3.5 py-2 text-xs font-semibold text-red-700 hover:bg-red-500/20 transition-all"
                  >
                    <ShoppingBag className="h-3.5 w-3.5 text-red-600" /> PedidosYa
                  </a>
                  <a
                    href={SUCURSAL_SANTELMO.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-full border border-[color:var(--gold)] px-3 py-2 text-xs font-medium text-[color:var(--ink)] hover:bg-[color:var(--gold)]/20 transition-all"
                  >
                    <ExternalLink className="h-3 w-3" /> Maps
                  </a>
                  <a
                    href={SUCURSAL_SANTELMO.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-full border border-[color:var(--gold)] px-3 py-2 text-xs font-medium text-[color:var(--ink)] hover:bg-[color:var(--gold)]/20 transition-all"
                  >
                    {SUCURSAL_SANTELMO.instagramTag}
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* BARRA / BANNER DE DELIVERY */}
        <section
          id="delivery"
          className="bg-wine-velvet text-[color:var(--cream)] py-8 border-y border-[color:var(--gold)]/30 shadow-inner"
        >
          <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-left">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[color:var(--gold)] text-[color:var(--ink)] shadow-md">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold">
                  ¿Querés Che Malbec en tu casa?
                </h3>
                <p className="text-xs sm:text-sm text-[color:var(--cream)]/85">
                  Pedí nuestras empanadas de autor, picadas abundantes y vinos boutique directo a tu
                  domicilio.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <a
                href={PEDIDOSYA_MONSERRAT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-tactile inline-flex items-center gap-2 rounded-full bg-[#EA044E] px-4.5 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white shadow-lg hover:bg-[#c90342] transition-all cursor-pointer"
              >
                <ShoppingBag className="h-4 w-4" /> PedidosYa Monserrat
              </a>
              <a
                href={PEDIDOSYA_SANTELMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-tactile inline-flex items-center gap-2 rounded-full bg-[#EA044E] px-4.5 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white shadow-lg hover:bg-[#c90342] transition-all cursor-pointer"
              >
                <ShoppingBag className="h-4 w-4" /> PedidosYa San Telmo
              </a>
              <a
                href={WA_DELIVERY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-tactile inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4.5 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white shadow-lg hover:bg-[#20bd5a] transition-all cursor-pointer"
              >
                <WhatsAppIcon className="h-4 w-4" /> WhatsApp Delivery
              </a>
            </div>
          </div>
        </section>

        {/* DEGUSTACIONES Y FLIGHTS DE CATA */}
        <section
          id="degustaciones"
          className="bg-[color:var(--card)] py-20 sm:py-28 border-y border-[color:var(--gold)]/30"
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="gold-divider reveal reveal-slide-down">Experiencias Sensoriales</p>
              <h2 className="reveal reveal-slide-up mt-4 font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[color:var(--wine)]">
                Menús Degustación y Catas de 4 Copas
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[color:var(--ink)]/80">
                Experiencias guiadas por sommelier para viajar copa a copa por las mejores regiones
                vitivinícolas de Argentina.
              </p>
            </div>

            <Tabs defaultValue="pasos" className="mt-12">
              <TabsList className="mx-auto flex max-w-md justify-center bg-[color:var(--cream)] border border-[color:var(--gold)]/40 p-1 rounded-full shadow-xs">
                <TabsTrigger
                  value="pasos"
                  className="rounded-full data-[state=active]:bg-[color:var(--wine)] data-[state=active]:text-[color:var(--cream)] text-xs font-semibold py-2 px-6 cursor-pointer transition-all"
                >
                  Menú Degustación 4 Pasos
                </TabsTrigger>
                <TabsTrigger
                  value="flights"
                  className="rounded-full data-[state=active]:bg-[color:var(--wine)] data-[state=active]:text-[color:var(--cream)] text-xs font-semibold py-2 px-6 cursor-pointer transition-all"
                >
                  Degustación 4 Copas
                </TabsTrigger>
              </TabsList>

              {/* CONTENIDO 4 PASOS */}
              <TabsContent value="pasos" className="mt-10 space-y-10">
                {/* Los 4 Pasos de Comida */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="rounded-xl border border-[color:var(--gold)]/35 bg-[color:var(--cream)]/45 p-4 text-center shadow-xs">
                    <span className="inline-block rounded-full bg-[color:var(--gold)]/20 px-2.5 py-0.5 text-[11px] font-serif italic text-[color:var(--wine)] font-bold">
                      1er Paso
                    </span>
                    <h4 className="font-serif font-bold text-sm text-[color:var(--wine)] mt-2">
                      Variedad de Quesos
                    </h4>
                    <p className="text-[11px] text-[color:var(--ink)]/70 mt-1">
                      Selección artesanal
                    </p>
                  </div>
                  <div className="rounded-xl border border-[color:var(--gold)]/35 bg-[color:var(--cream)]/45 p-4 text-center shadow-xs">
                    <span className="inline-block rounded-full bg-[color:var(--gold)]/20 px-2.5 py-0.5 text-[11px] font-serif italic text-[color:var(--wine)] font-bold">
                      2do Paso
                    </span>
                    <h4 className="font-serif font-bold text-sm text-[color:var(--wine)] mt-2">
                      Brusqueta Serrana
                    </h4>
                    <p className="text-[11px] text-[color:var(--ink)]/70 mt-1">
                      Jamón crudo, tomate deshidratado y rúcula
                    </p>
                  </div>
                  <div className="rounded-xl border border-[color:var(--gold)]/35 bg-[color:var(--cream)]/45 p-4 text-center shadow-xs">
                    <span className="inline-block rounded-full bg-[color:var(--gold)]/20 px-2.5 py-0.5 text-[11px] font-serif italic text-[color:var(--wine)] font-bold">
                      3er Paso
                    </span>
                    <h4 className="font-serif font-bold text-sm text-[color:var(--wine)] mt-2">
                      Empanada Tradicional
                    </h4>
                    <p className="text-[11px] text-[color:var(--ink)]/70 mt-1">
                      Carne cortada a cuchillo
                    </p>
                  </div>
                  <div className="rounded-xl border border-[color:var(--gold)]/35 bg-[color:var(--cream)]/45 p-4 text-center shadow-xs">
                    <span className="inline-block rounded-full bg-[color:var(--gold)]/20 px-2.5 py-0.5 text-[11px] font-serif italic text-[color:var(--wine)] font-bold">
                      4to Paso
                    </span>
                    <h4 className="font-serif font-bold text-sm text-[color:var(--wine)] mt-2">
                      Choripán Gourmet
                    </h4>
                    <p className="text-[11px] text-[color:var(--ink)]/70 mt-1">
                      Receta tradicional argentina
                    </p>
                  </div>
                </div>

                {/* Opciones de Maridaje */}
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl text-[color:var(--wine)] font-bold text-center mb-6">
                    Elegí tu Opción de Maridaje
                  </h3>
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="card-boutique p-6 flex flex-col justify-between shadow-md">
                      <div>
                        <div className="flex justify-between items-baseline border-b border-[color:var(--gold)]/30 pb-3">
                          <h4 className="font-serif text-xl font-bold text-[color:var(--wine)]">
                            FEDERAL
                          </h4>
                          <span className="font-bold text-lg text-[color:var(--ink)]">$55.000</span>
                        </div>
                        <ul className="mt-4 space-y-2 text-xs text-[color:var(--ink)]/85">
                          <li className="flex items-center gap-2">
                            <Check className="h-3.5 w-3.5 text-[color:var(--gold)] shrink-0" />{" "}
                            Coquena Torrontés (Salta)
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-3.5 w-3.5 text-[color:var(--gold)] shrink-0" />{" "}
                            Saurus Estate Pinot Noir (Patagonia)
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-3.5 w-3.5 text-[color:var(--gold)] shrink-0" />{" "}
                            Chañarmuyo Malbec (La Rioja)
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-3.5 w-3.5 text-[color:var(--gold)] shrink-0" />{" "}
                            Lagarde Cabernet Sauvignon (Mendoza)
                          </li>
                        </ul>
                      </div>
                      <button
                        type="button"
                        onClick={() => openReservaWith()}
                        className="btn-tactile mt-6 w-full rounded-full bg-[color:var(--wine)] py-2.5 text-xs font-semibold uppercase tracking-wider text-[color:var(--cream)] text-center cursor-pointer hover:bg-[color:var(--wine)]/90"
                      >
                        Reservar Maridaje Federal
                      </button>
                    </div>

                    <div className="relative rounded-xl border-2 border-[color:var(--gold)] bg-[color:var(--cream)]/65 p-6 flex flex-col justify-between shadow-xl scale-[1.02]">
                      <span className="absolute -top-3 right-4 rounded-full bg-[color:var(--gold)] px-3.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[color:var(--ink)] shadow-sm">
                        ⭐ Más Elegido
                      </span>
                      <div>
                        <div className="flex justify-between items-baseline border-b border-[color:var(--gold)]/30 pb-3">
                          <h4 className="font-serif text-xl font-bold text-[color:var(--wine)]">
                            SELECCIÓN CHE MALBEC
                          </h4>
                          <span className="font-bold text-lg text-[color:var(--ink)]">$60.000</span>
                        </div>
                        <ul className="mt-4 space-y-2 text-xs text-[color:var(--ink)]/85">
                          <li className="flex items-center gap-2">
                            <Check className="h-3.5 w-3.5 text-[color:var(--gold)] shrink-0" />{" "}
                            Colomé Torrontés (Bodega Colomé)
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-3.5 w-3.5 text-[color:var(--gold)] shrink-0" />{" "}
                            Domaine Bousquet Reserva Cabernet Franc
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-3.5 w-3.5 text-[color:var(--gold)] shrink-0" />{" "}
                            Sottano Malbec (Bodega Sottano)
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-3.5 w-3.5 text-[color:var(--gold)] shrink-0" />{" "}
                            Lagarde Cabernet Sauvignon (Lagarde)
                          </li>
                        </ul>
                      </div>
                      <button
                        type="button"
                        onClick={() => openReservaWith()}
                        className="btn-tactile mt-6 w-full rounded-full bg-[color:var(--wine)] py-2.5 text-xs font-semibold uppercase tracking-wider text-[color:var(--cream)] text-center cursor-pointer hover:bg-[color:var(--wine)]/90 shadow-md"
                      >
                        Reservar Selección Che
                      </button>
                    </div>

                    <div className="card-boutique p-6 flex flex-col justify-between shadow-md">
                      <div>
                        <div className="flex justify-between items-baseline border-b border-[color:var(--gold)]/30 pb-3">
                          <h4 className="font-serif text-xl font-bold text-[color:var(--wine)]">
                            CATENA ZAPATA
                          </h4>
                          <span className="font-bold text-lg text-[color:var(--ink)]">$73.500</span>
                        </div>
                        <ul className="mt-4 space-y-2 text-xs text-[color:var(--ink)]/85">
                          <li className="flex items-center gap-2">
                            <Check className="h-3.5 w-3.5 text-[color:var(--gold)] shrink-0" />{" "}
                            Saint Felicien Chardonnay
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-3.5 w-3.5 text-[color:var(--gold)] shrink-0" />{" "}
                            Nicasia Cabernet Franc
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-3.5 w-3.5 text-[color:var(--gold)] shrink-0" /> DV
                            Catena Cabernet Malbec
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-3.5 w-3.5 text-[color:var(--gold)] shrink-0" /> DV
                            Catena Syrah Syrah
                          </li>
                        </ul>
                      </div>
                      <button
                        type="button"
                        onClick={() => openReservaWith()}
                        className="btn-tactile mt-6 w-full rounded-full bg-[color:var(--wine)] py-2.5 text-xs font-semibold uppercase tracking-wider text-[color:var(--cream)] text-center cursor-pointer hover:bg-[color:var(--wine)]/90"
                      >
                        Reservar Catena Zapata
                      </button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* CONTENIDO FLIGHTS 4 COPAS */}
              <TabsContent value="flights" className="mt-10">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="card-boutique p-5 flex flex-col justify-between shadow-md">
                    <div>
                      <div className="border-b border-[color:var(--gold)]/30 pb-2.5">
                        <h4 className="font-serif text-base font-bold text-[color:var(--wine)]">
                          No Somos Solo Malbec
                        </h4>
                        <p className="text-base font-bold text-[color:var(--gold)] mt-0.5">
                          $34.500
                        </p>
                      </div>
                      <ul className="mt-3 space-y-1.5 text-xs text-[color:var(--ink)]/80">
                        <li>• Saurus Pinot Noir</li>
                        <li>• Domaine Bousquet Cabernet Franc</li>
                        <li>• Crux Tempranillo</li>
                        <li>• Chakana Estate Red Blend</li>
                      </ul>
                    </div>
                    <button
                      type="button"
                      onClick={() => openReservaWith()}
                      className="btn-tactile mt-4 w-full rounded-full border border-[color:var(--wine)] py-2 text-[11px] font-semibold uppercase tracking-wider text-[color:var(--wine)] hover:bg-[color:var(--wine)] hover:text-[color:var(--cream)] transition-all cursor-pointer"
                    >
                      Pedir Flight
                    </button>
                  </div>

                  <div className="card-boutique p-5 flex flex-col justify-between shadow-md">
                    <div>
                      <div className="border-b border-[color:var(--gold)]/30 pb-2.5">
                        <h4 className="font-serif text-base font-bold text-[color:var(--wine)]">
                          Fly Salta
                        </h4>
                        <p className="text-base font-bold text-[color:var(--gold)] mt-0.5">
                          $39.000
                        </p>
                      </div>
                      <ul className="mt-3 space-y-1.5 text-xs text-[color:var(--ink)]/80">
                        <li>• Don David Torrontés</li>
                        <li>• Amalaya Malbec</li>
                        <li>• Anko Malbec</li>
                        <li>• Coquena Cabernet Sauvignon</li>
                      </ul>
                    </div>
                    <button
                      type="button"
                      onClick={() => openReservaWith()}
                      className="btn-tactile mt-4 w-full rounded-full border border-[color:var(--wine)] py-2 text-[11px] font-semibold uppercase tracking-wider text-[color:var(--wine)] hover:bg-[color:var(--wine)] hover:text-[color:var(--cream)] transition-all cursor-pointer"
                    >
                      Pedir Flight
                    </button>
                  </div>

                  <div className="card-boutique p-5 flex flex-col justify-between shadow-md">
                    <div>
                      <div className="border-b border-[color:var(--gold)]/30 pb-2.5">
                        <h4 className="font-serif text-base font-bold text-[color:var(--wine)]">
                          Fly Malbec Federal
                        </h4>
                        <p className="text-base font-bold text-[color:var(--gold)] mt-0.5">
                          $42.500
                        </p>
                      </div>
                      <ul className="mt-3 space-y-1.5 text-xs text-[color:var(--ink)]/80">
                        <li>• Saurus Selec Malbec (Patagonia)</li>
                        <li>• Sottano Malbec (Mendoza)</li>
                        <li>• Chañarmuyo Malbec (La Rioja)</li>
                        <li>• Coquena Malbec (Salta)</li>
                      </ul>
                    </div>
                    <button
                      type="button"
                      onClick={() => openReservaWith()}
                      className="btn-tactile mt-4 w-full rounded-full border border-[color:var(--wine)] py-2 text-[11px] font-semibold uppercase tracking-wider text-[color:var(--wine)] hover:bg-[color:var(--wine)] hover:text-[color:var(--cream)] transition-all cursor-pointer"
                    >
                      Pedir Flight
                    </button>
                  </div>

                  <div className="card-boutique p-5 flex flex-col justify-between shadow-md">
                    <div>
                      <div className="border-b border-[color:var(--gold)]/30 pb-2.5">
                        <h4 className="font-serif text-base font-bold text-[color:var(--wine)]">
                          Fly Catena Zapata
                        </h4>
                        <p className="text-base font-bold text-[color:var(--gold)] mt-0.5">
                          $49.000
                        </p>
                      </div>
                      <ul className="mt-3 space-y-1.5 text-xs text-[color:var(--ink)]/80">
                        <li>• Saint Felicien Chardonnay</li>
                        <li>• Nicasia Cabernet Franc</li>
                        <li>• DV Catena Cabernet Malbec</li>
                        <li>• DV Catena Syrah Syrah</li>
                      </ul>
                    </div>
                    <button
                      type="button"
                      onClick={() => openReservaWith()}
                      className="btn-tactile mt-4 w-full rounded-full border border-[color:var(--wine)] py-2 text-[11px] font-semibold uppercase tracking-wider text-[color:var(--wine)] hover:bg-[color:var(--wine)] hover:text-[color:var(--cream)] transition-all cursor-pointer"
                    >
                      Pedir Flight
                    </button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CARTA COMPLETA */}
        <section id="carta" className="bg-ink-atmosphere text-[color:var(--cream)] py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="gold-divider">Propuesta Gastronómica & Vinos</p>
              <h2 className="mt-4 font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[color:var(--cream)]">
                Nuestra Carta
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[color:var(--cream)]/75">
                Platos caseros, picadas de autor, empanadas premium y vinos por copa con precios
                actualizados.
              </p>
            </div>

            <Tabs defaultValue="picadas" className="mt-12">
              <div className="overflow-x-auto pb-2">
                <TabsList className="mx-auto flex w-max justify-center bg-white/5 border border-[color:var(--gold)]/35 p-1 rounded-full backdrop-blur-md">
                  <TabsTrigger
                    value="picadas"
                    className="rounded-full data-[state=active]:bg-[color:var(--gold)] data-[state=active]:text-[color:var(--ink)] text-xs font-semibold py-2 px-4.5 cursor-pointer transition-all"
                  >
                    Picadas de Autor
                  </TabsTrigger>
                  <TabsTrigger
                    value="empanadas"
                    className="rounded-full data-[state=active]:bg-[color:var(--gold)] data-[state=active]:text-[color:var(--ink)] text-xs font-semibold py-2 px-4.5 cursor-pointer transition-all"
                  >
                    Empanadas ($4.400)
                  </TabsTrigger>
                  <TabsTrigger
                    value="sandwiches"
                    className="rounded-full data-[state=active]:bg-[color:var(--gold)] data-[state=active]:text-[color:var(--ink)] text-xs font-semibold py-2 px-4.5 cursor-pointer transition-all"
                  >
                    Sándwiches & Tapeo
                  </TabsTrigger>
                  <TabsTrigger
                    value="pizzas"
                    className="rounded-full data-[state=active]:bg-[color:var(--gold)] data-[state=active]:text-[color:var(--ink)] text-xs font-semibold py-2 px-4.5 cursor-pointer transition-all"
                  >
                    Pizzas & Postres
                  </TabsTrigger>
                  <TabsTrigger
                    value="vinos"
                    className="rounded-full data-[state=active]:bg-[color:var(--gold)] data-[state=active]:text-[color:var(--ink)] text-xs font-semibold py-2 px-4.5 cursor-pointer transition-all"
                  >
                    Vinos por Copa
                  </TabsTrigger>
                  <TabsTrigger
                    value="tragos"
                    className="rounded-full data-[state=active]:bg-[color:var(--gold)] data-[state=active]:text-[color:var(--ink)] text-xs font-semibold py-2 px-4.5 cursor-pointer transition-all"
                  >
                    Tragos & Cervezas
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* 1. PICADAS */}
              <TabsContent value="picadas" className="mt-8 space-y-6">
                <div className="grid gap-3 sm:grid-cols-3 text-center bg-white/5 p-4 rounded-xl border border-[color:var(--gold)]/30 backdrop-blur-sm">
                  <div>
                    <span className="text-xs text-[color:var(--gold)] uppercase font-semibold tracking-wider">
                      Chica (2/3 personas)
                    </span>
                    <p className="font-serif text-2xl font-bold mt-0.5">$35.000</p>
                  </div>
                  <div>
                    <span className="text-xs text-[color:var(--gold)] uppercase font-semibold tracking-wider">
                      Mediana (4/5 personas)
                    </span>
                    <p className="font-serif text-2xl font-bold mt-0.5">$48.000</p>
                  </div>
                  <div>
                    <span className="text-xs text-[color:var(--gold)] uppercase font-semibold tracking-wider">
                      Grande (6/7 personas)
                    </span>
                    <p className="font-serif text-2xl font-bold mt-0.5">$64.000</p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="card-boutique-dark p-5">
                    <h4 className="font-serif text-lg font-bold text-[color:var(--gold)]">
                      PICARONA
                    </h4>
                    <p className="mt-2 text-xs text-[color:var(--cream)]/80 leading-relaxed">
                      Jamón cocido, salame criollo, mortadela, queso fynbo, parmesano, queso azul,
                      olivas verdes, pepinos, leber y brusquetas.
                    </p>
                  </div>
                  <div className="card-boutique-dark p-5">
                    <h4 className="font-serif text-lg font-bold text-[color:var(--gold)]">
                      MALEVO
                    </h4>
                    <p className="mt-2 text-xs text-[color:var(--cream)]/80 leading-relaxed">
                      Jamón crudo, salame criollo, salchichón, fontina, sardo, brie, olivas negras,
                      ajíes en vinagre, berenjenas en escabeche y brusquetas.
                    </p>
                  </div>
                  <div className="card-boutique-dark p-5">
                    <h4 className="font-serif text-lg font-bold text-[color:var(--gold)]">
                      AVENIDA
                    </h4>
                    <p className="mt-2 text-xs text-[color:var(--cream)]/80 leading-relaxed">
                      Bondiola, longaniza, salchichón, gruyere, provolone, queso azul, olivas
                      negras, ajíes en vinagre, berenjenas en escabeche y brusqueta.
                    </p>
                  </div>
                  <div className="card-boutique-dark p-5">
                    <h4 className="font-serif text-lg font-bold text-[color:var(--gold)]">
                      TOSCANA
                    </h4>
                    <p className="mt-2 text-xs text-[color:var(--cream)]/80 leading-relaxed">
                      Lomo horneado, spianatta, mortadela, fynbo, canestrato, gouda saborizado,
                      olivas verdes, pepinos, leber y brusquetas.
                    </p>
                  </div>
                  <div className="card-boutique-dark p-5 sm:col-span-2 lg:col-span-2">
                    <h4 className="font-serif text-lg font-bold text-[color:var(--gold)]">
                      QUESO QUESO
                    </h4>
                    <p className="mt-2 text-xs text-[color:var(--cream)]/80 leading-relaxed">
                      Fynbo, parmesano, cheddar, gouda saborizado, gruyere, queso azul, canestrato,
                      brie, olivas verdes, olivas negras y brusquetas.
                    </p>
                  </div>
                </div>
              </TabsContent>

              {/* 2. EMPANADAS */}
              <TabsContent value="empanadas" className="mt-8">
                <div className="rounded-xl border border-[color:var(--gold)]/35 bg-white/5 p-6 backdrop-blur-sm">
                  <div className="flex justify-between items-center pb-4 border-b border-white/10">
                    <div>
                      <span className="text-[11px] font-semibold text-[color:var(--gold)] uppercase tracking-wider">
                        Receta Casera
                      </span>
                      <h3 className="font-serif text-xl font-bold text-[color:var(--cream)]">
                        Empanadas Artesanales Che Malbec
                      </h3>
                    </div>
                    <span className="rounded-full bg-[color:var(--gold)] px-3.5 py-1 text-xs font-bold text-[color:var(--ink)] shadow-md">
                      $4.400 c/u
                    </span>
                  </div>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-xs">
                    <div className="p-3.5 rounded-lg bg-white/5 border border-white/5 hover:border-[color:var(--gold)]/30 transition-all">
                      <span className="font-bold text-[color:var(--gold)] block text-sm">
                        Osobuco al Malbec (O)
                      </span>
                      <span className="text-[color:var(--cream)]/80">
                        Osobuco braseado, cebolla, zanahoria, romero, condimentos y Malbec
                        argentino.
                      </span>
                    </div>
                    <div className="p-3.5 rounded-lg bg-white/5 border border-white/5 hover:border-[color:var(--gold)]/30 transition-all">
                      <span className="font-bold text-[color:var(--gold)] block text-sm">
                        Bondiola a la Cerveza Negra (B)
                      </span>
                      <span className="text-[color:var(--cream)]/80">
                        Bondiola, cebolla colorada, verdeo, ají verde, condimentos y cerveza stout.
                      </span>
                    </div>
                    <div className="p-3.5 rounded-lg bg-white/5 border border-white/5 hover:border-[color:var(--gold)]/30 transition-all">
                      <span className="font-bold text-[color:var(--gold)] block text-sm">
                        Salteña (S)
                      </span>
                      <span className="text-[color:var(--cream)]/80">
                        Carne cortada a cuchillo, cebolla, ají, verdeo, papa y huevo.
                      </span>
                    </div>
                    <div className="p-3.5 rounded-lg bg-white/5 border border-white/5 hover:border-[color:var(--gold)]/30 transition-all">
                      <span className="font-bold text-[color:var(--gold)] block text-sm">
                        Tucumana (T)
                      </span>
                      <span className="text-[color:var(--cream)]/80">
                        Carne cortada a cuchillo (matambre), cebolla, ají, verdeo y huevo.
                      </span>
                    </div>
                    <div className="p-3.5 rounded-lg bg-white/5 border border-white/5 hover:border-[color:var(--gold)]/30 transition-all">
                      <span className="font-bold text-[color:var(--gold)] block text-sm">
                        Carne Tradicional (CT)
                      </span>
                      <span className="text-[color:var(--cream)]/80">
                        Carne molida, cebolla, ají, condimentos y aceitunas verdes.
                      </span>
                    </div>
                    <div className="p-3.5 rounded-lg bg-white/5 border border-white/5 hover:border-[color:var(--gold)]/30 transition-all">
                      <span className="font-bold text-[color:var(--gold)] block text-sm">
                        Carne Dulce (CTD)
                      </span>
                      <span className="text-[color:var(--cream)]/80">
                        Carne molida, cebolla, ají, aceitunas, huevo, pasas de uva y azúcar.
                      </span>
                    </div>
                    <div className="p-3.5 rounded-lg bg-white/5 border border-white/5 hover:border-[color:var(--gold)]/30 transition-all">
                      <span className="font-bold text-[color:var(--gold)] block text-sm">
                        Pollo al Disco (P)
                      </span>
                      <span className="text-[color:var(--cream)]/80">
                        Pollo tierno, cebolla, ají, condimentos y huevo duro.
                      </span>
                    </div>
                    <div className="p-3.5 rounded-lg bg-white/5 border border-white/5 hover:border-[color:var(--gold)]/30 transition-all">
                      <span className="font-bold text-[color:var(--gold)] block text-sm">
                        Caprese (CSE)
                      </span>
                      <span className="text-[color:var(--cream)]/80">
                        Muzzarella seleccionada, tomate fresco y albahaca aromática.
                      </span>
                    </div>
                    <div className="p-3.5 rounded-lg bg-white/5 border border-white/5 hover:border-[color:var(--gold)]/30 transition-all">
                      <span className="font-bold text-[color:var(--gold)] block text-sm">
                        Jamón & Queso / Verdura
                      </span>
                      <span className="text-[color:var(--cream)]/80">
                        Jamón cocido y muzzarella / Espinaca, cebolla y queso sardo.
                      </span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* 3. SANDWICHES & TAPEO */}
              <TabsContent value="sandwiches" className="mt-8 space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="card-boutique-dark p-6 space-y-4">
                    <h3 className="font-serif text-lg font-bold text-[color:var(--gold)] border-b border-white/10 pb-2">
                      Sándwiches Boutique
                    </h3>
                    <ul className="space-y-3 text-xs divide-y divide-white/10">
                      <li className="flex justify-between items-start pt-2">
                        <div>
                          <span className="font-bold text-[color:var(--cream)] block text-sm">
                            Burrata
                          </span>
                          <span className="text-[color:var(--cream)]/70">
                            Mortadela con pistacho, burrata y pesto
                          </span>
                        </div>
                        <span className="font-bold text-[color:var(--gold)] text-sm">$15.000</span>
                      </li>
                      <li className="flex justify-between items-start pt-2">
                        <div>
                          <span className="font-bold text-[color:var(--cream)] block text-sm">
                            Palacio Vera
                          </span>
                          <span className="text-[color:var(--cream)]/70">
                            Lomo horneado, queso azul, pera y rúcula
                          </span>
                        </div>
                        <span className="font-bold text-[color:var(--gold)] text-sm">$12.000</span>
                      </li>
                      <li className="flex justify-between items-start pt-2">
                        <div>
                          <span className="font-bold text-[color:var(--cream)] block text-sm">
                            Gringo
                          </span>
                          <span className="text-[color:var(--cream)]/70">
                            Jamón crudo, queso fynbo, tomate, rúcula y salsa serrana
                          </span>
                        </div>
                        <span className="font-bold text-[color:var(--gold)] text-sm">$13.000</span>
                      </li>
                      <li className="flex justify-between items-start pt-2">
                        <div>
                          <span className="font-bold text-[color:var(--cream)] block text-sm">
                            Mafia
                          </span>
                          <span className="text-[color:var(--cream)]/70">
                            Bondiola, queso sardo, ajíes en vinagre y mostaneza
                          </span>
                        </div>
                        <span className="font-bold text-[color:var(--gold)] text-sm">$13.000</span>
                      </li>
                      <li className="flex justify-between items-start pt-2">
                        <div>
                          <span className="font-bold text-[color:var(--cream)] block text-sm">
                            Presidente / Pelusa
                          </span>
                          <span className="text-[color:var(--cream)]/70">
                            Lomo o Mortadela con quesos especiales y aderezos
                          </span>
                        </div>
                        <span className="font-bold text-[color:var(--gold)] text-sm">$12.000</span>
                      </li>
                      <li className="flex justify-between items-start pt-2">
                        <div>
                          <span className="font-bold text-[color:var(--cream)] block text-sm">
                            Porteño / Tango / Latino
                          </span>
                          <span className="text-[color:var(--cream)]/70">
                            Clásicos con jamón, salame milán o verduras frescas
                          </span>
                        </div>
                        <span className="font-bold text-[color:var(--gold)] text-sm">$10.000</span>
                      </li>
                    </ul>
                  </div>

                  <div className="card-boutique-dark p-6 space-y-4">
                    <h3 className="font-serif text-lg font-bold text-[color:var(--gold)] border-b border-white/10 pb-2">
                      Para Acompañar el Vino
                    </h3>
                    <ul className="space-y-3 text-xs divide-y divide-white/10">
                      <li className="flex justify-between items-start pt-2">
                        <div>
                          <span className="font-bold text-[color:var(--cream)] block text-sm">
                            Burrata (Sin TACC)
                          </span>
                          <span className="text-[color:var(--cream)]/70">
                            Jamón crudo, burrata fresca, rúcula, tomates y oliva
                          </span>
                        </div>
                        <span className="font-bold text-[color:var(--gold)] text-sm">$28.500</span>
                      </li>
                      <li className="flex justify-between items-start pt-2">
                        <div>
                          <span className="font-bold text-[color:var(--cream)] block text-sm">
                            Bocconcino (Sin TACC)
                          </span>
                          <span className="text-[color:var(--cream)]/70">
                            Bocconcino, cherry, albahaca, olivas negras y oliva
                          </span>
                        </div>
                        <span className="font-bold text-[color:var(--gold)] text-sm">$17.000</span>
                      </li>
                      <li className="flex justify-between items-start pt-2">
                        <div>
                          <span className="font-bold text-[color:var(--cream)] block text-sm">
                            Tortilla de Papas Entera (Sin TACC)
                          </span>
                          <span className="text-[color:var(--cream)]/70">
                            Receta tradicional bien jugosa
                          </span>
                        </div>
                        <span className="font-bold text-[color:var(--gold)] text-sm">$16.000</span>
                      </li>
                      <li className="flex justify-between items-start pt-2">
                        <div>
                          <span className="font-bold text-[color:var(--cream)] block text-sm">
                            Pan con Tomate y Jamón Crudo
                          </span>
                          <span className="text-[color:var(--cream)]/70">
                            Pan de campo con emulsión de tomate y jamón crudo
                          </span>
                        </div>
                        <span className="font-bold text-[color:var(--gold)] text-sm">$13.000</span>
                      </li>
                      <li className="flex justify-between items-start pt-2">
                        <div>
                          <span className="font-bold text-[color:var(--cream)] block text-sm">
                            Pan de Campo Artesanal
                          </span>
                          <span className="text-[color:var(--cream)]/70">
                            Porción recién horneada
                          </span>
                        </div>
                        <span className="font-bold text-[color:var(--gold)] text-sm">$3.000</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>

              {/* 4. PIZZAS & POSTRES */}
              <TabsContent value="pizzas" className="mt-8 space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="card-boutique-dark p-6 space-y-3 text-xs">
                    <h3 className="font-serif text-lg font-bold text-[color:var(--gold)] border-b border-white/10 pb-2">
                      Pizzas Artesanales
                    </h3>
                    <div className="flex justify-between pt-1">
                      <span>Pizza de Burrata (Muzzarella, rúcula, burrata, tomates disecados)</span>
                      <span className="font-bold text-[color:var(--gold)]">$48.000</span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span>Pizza de Stracciatella y Mortadela con Pistacho</span>
                      <span className="font-bold text-[color:var(--gold)]">$48.000</span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span>Bocconcino (Muzzarella, bocconcino, cherry, albahaca)</span>
                      <span className="font-bold text-[color:var(--gold)]">$38.000</span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span>Crudo y Rúcula / 4 Quesos</span>
                      <span className="font-bold text-[color:var(--gold)]">$35.000</span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span>Napolitana / Calabresa</span>
                      <span className="font-bold text-[color:var(--gold)]">$33.000</span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span>Muzzarella / Anchoas</span>
                      <span className="font-bold text-[color:var(--gold)]">$30.000</span>
                    </div>
                  </div>

                  <div className="card-boutique-dark p-6 space-y-4">
                    <h3 className="font-serif text-lg font-bold text-[color:var(--gold)] border-b border-white/10 pb-2">
                      Postres & Dulces
                    </h3>
                    <div className="p-4 rounded-lg bg-white/5 border border-[color:var(--gold)]/20">
                      <div className="flex justify-between items-center">
                        <h4 className="font-serif text-base font-bold text-[color:var(--gold)]">
                          Trío Queso y Dulce
                        </h4>
                        <span className="font-bold text-[color:var(--gold)] text-base">$7.500</span>
                      </div>
                      <p className="mt-2 text-xs text-[color:var(--cream)]/75">
                        Degustación clásica argentina de tres combinaciones tradicionales:
                      </p>
                      <ul className="mt-2 space-y-1 text-xs text-[color:var(--cream)]/85">
                        <li>• Membrillo con Queso Azul</li>
                        <li>• Batata con Sardo</li>
                        <li>• Cayote con Queso de Cabra</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* 5. VINOS POR COPA */}
              <TabsContent value="vinos" className="mt-8 space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="card-boutique-dark p-6 space-y-3 text-xs">
                    <h3 className="font-serif text-base font-bold text-[color:var(--gold)] border-b border-white/10 pb-2">
                      Tintos por Copa
                    </h3>
                    <div className="flex justify-between">
                      <span>Alto Las Hormigas Terroir Luján de Cuyo</span>
                      <span className="font-bold text-[color:var(--gold)]">$10.000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sarapura Blend / Alpataco Merlot</span>
                      <span className="font-bold text-[color:var(--gold)]">$9.000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Trivento Gold Cabernet Franc</span>
                      <span className="font-bold text-[color:var(--gold)]">$9.000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Alta Vista Los Escasos Syrah</span>
                      <span className="font-bold text-[color:var(--gold)]">$8.500</span>
                    </div>
                    <div className="flex justify-between">
                      <span>El Turco / Padrillos Pinot / Crux Tempranillo</span>
                      <span className="font-bold text-[color:var(--gold)]">$8.000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Trivento Red Blend / Saurus Pinot / Ábside</span>
                      <span className="font-bold text-[color:var(--gold)]">$7.500</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Trapiche Reserva Cabernet Sauvignon</span>
                      <span className="font-bold text-[color:var(--gold)]">$7.000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Domiciano Estelar Malbec / Manos Negras Criolla</span>
                      <span className="font-bold text-[color:var(--gold)]">$6.500</span>
                    </div>
                  </div>

                  <div className="card-boutique-dark p-6 space-y-3 text-xs">
                    <h3 className="font-serif text-base font-bold text-[color:var(--gold)] border-b border-white/10 pb-2">
                      Blancos y Rosados por Copa
                    </h3>
                    <div className="flex justify-between">
                      <span>Las Perdices Riesling</span>
                      <span className="font-bold text-[color:var(--gold)]">$9.000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Correntoso Pinot Noir Rosé / Trivento Rosé</span>
                      <span className="font-bold text-[color:var(--gold)]">$9.000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>La Linda Sweet Viognier</span>
                      <span className="font-bold text-[color:var(--gold)]">$8.000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Alta Vista Chardonnay / Crux Sauvignon Blanc</span>
                      <span className="font-bold text-[color:var(--gold)]">$7.500</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fond de Cave Chardonnay / Palo Santo Sauvignon</span>
                      <span className="font-bold text-[color:var(--gold)]">$7.000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Coquena Torrontés (Salta)</span>
                      <span className="font-bold text-[color:var(--gold)]">$6.500</span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* 6. TRAGOS & CERVEZAS */}
              <TabsContent value="tragos" className="mt-8 space-y-6">
                <div className="grid gap-6 sm:grid-cols-3 text-xs">
                  <div className="card-boutique-dark p-5 space-y-2">
                    <h4 className="font-serif text-sm font-bold text-[color:var(--gold)] border-b border-white/10 pb-2">
                      Tragos / Aperitivos
                    </h4>
                    <div className="flex justify-between">
                      <span>Aperol Spritz / Gin Tonic / Negroni</span>
                      <span className="font-bold text-[color:var(--gold)]">$12.000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fernet Cola / Campari Tonic</span>
                      <span className="font-bold text-[color:var(--gold)]">$10.000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Vermut</span>
                      <span className="font-bold text-[color:var(--gold)]">$8.000</span>
                    </div>
                  </div>
                  <div className="card-boutique-dark p-5 space-y-2">
                    <h4 className="font-serif text-sm font-bold text-[color:var(--gold)] border-b border-white/10 pb-2">
                      Cervezas
                    </h4>
                    <div className="flex justify-between">
                      <span>Rabieta / Blue Moon</span>
                      <span className="font-bold text-[color:var(--gold)]">$9.000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Antares (IPA, Kölsch, Scotch, Honey)</span>
                      <span className="font-bold text-[color:var(--gold)]">$8.000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Heineken / Warsteiner / Grolsch / Imperial</span>
                      <span className="font-bold text-[color:var(--gold)]">$7.000</span>
                    </div>
                  </div>
                  <div className="card-boutique-dark p-5 space-y-2">
                    <h4 className="font-serif text-sm font-bold text-[color:var(--gold)] border-b border-white/10 pb-2">
                      Sin Alcohol
                    </h4>
                    <div className="flex justify-between">
                      <span>Agua / Saborizada / Gaseosas</span>
                      <span className="font-bold text-[color:var(--gold)]">$4.000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Soda</span>
                      <span className="font-bold text-[color:var(--gold)]">$3.600</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-12 text-center">
              <button
                type="button"
                onClick={() => openReservaWith()}
                className="btn-tactile inline-flex items-center gap-2 rounded-full bg-[color:var(--gold)] px-8 py-4 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[color:var(--ink)] shadow-xl cursor-pointer hover:scale-105 transition-all"
              >
                <WhatsAppIcon className="h-4 w-4" /> Reservar mesa para comer
              </button>
            </div>
          </div>
        </section>

        {/* SECCIÓN: LLEVÁ CHE MALBEC A TU FIESTA */}
        <section
          id="fiestas"
          className="bg-[color:var(--card)] py-20 sm:py-28 border-b border-[color:var(--gold)]/20"
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-12 md:grid-cols-2 items-center">
              <div className="reveal reveal-slide-right space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-[color:var(--wine)]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[color:var(--wine)]">
                  <PartyPopper className="h-4 w-4 text-[color:var(--gold)]" /> Catering de Vinos &
                  Eventos Privados
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[color:var(--wine)] leading-tight">
                  Llevá Che Malbec a tu Fiesta o Celebración
                </h2>
                <p className="text-base sm:text-lg text-[color:var(--ink)]/80 leading-relaxed">
                  Transformá tu cumpleaños, casamiento, reunión corporativa o fiesta privada con el
                  sello de Che Malbec. Llevamos nuestra cava móvil, copas de cristal, sommeliers
                  expertos y gastronomía casera a donde vos quieras.
                </p>

                <div className="space-y-3.5 pt-2">
                  <div className="flex items-start gap-3 rounded-lg bg-[color:var(--cream)]/40 p-3.5 border border-[color:var(--gold)]/20">
                    <Wine className="h-5 w-5 text-[color:var(--wine)] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm text-[color:var(--wine)]">
                        Barras Móviles de Vinos Boutique
                      </h4>
                      <p className="text-xs text-[color:var(--ink)]/75">
                        Etiquetas seleccionadas de pequeñas bodegas argentinas servidas por
                        profesionales.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-lg bg-[color:var(--cream)]/40 p-3.5 border border-[color:var(--gold)]/20">
                    <Sparkles className="h-5 w-5 text-[color:var(--wine)] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm text-[color:var(--wine)]">
                        Catas Guiadas Privadas
                      </h4>
                      <p className="text-xs text-[color:var(--ink)]/75">
                        Dinámicas de degustación por pasos exclusivas para agasajar a tus invitados.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-lg bg-[color:var(--cream)]/40 p-3.5 border border-[color:var(--gold)]/20">
                    <Utensils className="h-5 w-5 text-[color:var(--wine)] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm text-[color:var(--wine)]">
                        Tapeo y Picadas Gourmet
                      </h4>
                      <p className="text-xs text-[color:var(--ink)]/75">
                        Tablas de quesos y fiambres seleccionados, empanadas de osobuco y
                        brusquetas.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <a
                    href={WA_FIESTAS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-tactile inline-flex items-center gap-2.5 rounded-full bg-[color:var(--wine)] px-8 py-4 text-sm font-semibold uppercase tracking-wider text-[color:var(--cream)] shadow-xl hover:bg-[color:var(--wine)]/90 cursor-pointer"
                  >
                    <WhatsAppIcon className="h-5 w-5" /> Consultar presupuesto para mi fiesta
                  </a>
                </div>
              </div>

              <div className="reveal reveal-slide-left grid grid-cols-2 gap-4">
                <div className="hover-zoom-container rounded-lg shadow-xl col-span-2 aspect-[4/3] sm:aspect-[16/10] overflow-hidden border border-[color:var(--gold)]/25">
                  <img
                    src={clientes}
                    alt="Eventos y catas privadas con Che Malbec"
                    className="hover-zoom-image h-full w-full object-cover object-[center_12%]"
                  />
                </div>
                <div className="hover-zoom-container rounded-lg shadow-md aspect-square overflow-hidden border border-[color:var(--gold)]/25">
                  <img
                    src={copa}
                    alt="Servicio de copas y vino para eventos"
                    className="hover-zoom-image h-full w-full object-cover"
                  />
                </div>
                <div className="hover-zoom-container rounded-lg shadow-md aspect-square overflow-hidden border border-[color:var(--gold)]/25">
                  <img
                    src={burrata}
                    alt="Catering gastronómico de picadas y tapeo"
                    className="hover-zoom-image h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AGENDA DE EVENTOS */}
        <section
          id="novedades"
          className="bg-[color:var(--card)] py-20 sm:py-28 border-t border-[color:var(--gold)]/20"
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="gold-divider reveal reveal-slide-down">Cartelera del Mes</p>
              <h2 className="reveal reveal-slide-up mt-4 font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[color:var(--wine)]">
                Próximos Eventos en Che Malbec
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[color:var(--ink)]/80">
                Noches especiales, catas maridadas y canilla libre con música en vivo. Cupos
                limitados.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {EVENTOS_AGOSTO.map((ev, idx) => (
                <article
                  key={ev.titulo}
                  className="card-boutique reveal reveal-slide-up flex flex-col justify-between p-6 shadow-md"
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <div className="space-y-3">
                    <span className="inline-block rounded-full bg-[color:var(--wine)]/10 px-3 py-1 text-[11px] font-bold text-[color:var(--wine)] uppercase tracking-wider">
                      {ev.tag}
                    </span>
                    <div className="flex items-center gap-2 text-xs font-semibold text-[color:var(--gold)]">
                      <Calendar className="h-4 w-4" /> {ev.fechaBadge}
                    </div>
                    <h3 className="font-serif text-xl font-bold text-[color:var(--wine)] leading-snug">
                      {ev.titulo}
                    </h3>
                    <p className="text-xs text-[color:var(--ink)]/75 leading-relaxed">
                      {ev.descripcion}
                    </p>
                  </div>

                  <div className="pt-6">
                    <a
                      href={ev.ctaWa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-tactile inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-[color:var(--wine)] py-2.5 text-xs font-semibold uppercase tracking-wider text-[color:var(--cream)] hover:bg-[color:var(--wine)]/90 transition-all cursor-pointer"
                    >
                      <WhatsAppIcon className="h-3.5 w-3.5" /> Consultar Cupo
                    </a>
                  </div>
                </article>
              ))}
            </div>

            {/* Video Promocional */}
            <div className="mt-16 rounded-2xl bg-ink-atmosphere text-[color:var(--cream)] p-8 sm:p-12 grid gap-8 md:grid-cols-2 items-center border border-[color:var(--gold)]/30 shadow-2xl">
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-widest text-[color:var(--gold)] font-semibold">
                  Así se viven nuestras ferias
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                  Feria de Vinos Boutique en CABA
                </h3>
                <p className="text-sm text-[color:var(--cream)]/80 leading-relaxed">
                  Más de 15 etiquetas boutique en degustación libre, banda en vivo, charlas con
                  sommeliers y copa de cristal de regalo. ¡Sumate a las próximas ediciones!
                </p>
                <div className="pt-2">
                  <a
                    href={WA_GENERAL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-tactile inline-flex items-center gap-2 rounded-full bg-[color:var(--gold)] px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[color:var(--ink)] shadow-md hover:scale-105 transition-all"
                  >
                    <WhatsAppIcon className="h-4 w-4" /> Recibir aviso de próximas ferias
                  </a>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="w-full max-w-[260px] aspect-[9/16] rounded-xl overflow-hidden shadow-2xl border border-[color:var(--gold)]/40 bg-black">
                  <video
                    src={feriaVinosVideo}
                    poster={clientes}
                    className="h-full w-full object-cover"
                    controls
                    playsInline
                    loop
                    muted
                    preload="metadata"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FRANQUICIAS */}
        <section id="franquicias" className="bg-[color:var(--cream)] py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="rounded-2xl border border-[color:var(--gold)]/40 bg-[color:var(--card)] p-8 sm:p-14 shadow-2xl">
              <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] items-center">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 rounded-full bg-[color:var(--wine)]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[color:var(--wine)]">
                    <Building2 className="h-4 w-4 text-[color:var(--gold)]" /> Modelo de Negocio &
                    Expansión
                  </div>
                  <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[color:var(--wine)] leading-tight">
                    Franquicias Che Malbec
                  </h2>
                  <p className="text-base text-[color:var(--ink)]/80 leading-relaxed">
                    Sumate a una marca consolidada con alto ticket promedio, excelente reputación
                    (4.8★ en Google) y un concepto probado que une wine bar boutique, mercado de
                    vinos y gastronomía de autor.
                  </p>

                  <div className="grid gap-4 sm:grid-cols-2 text-xs text-[color:var(--ink)]/85 pt-2">
                    <div className="flex items-start gap-2.5">
                      <Check className="h-4 w-4 text-[color:var(--gold)] shrink-0 mt-0.5" />
                      <span>
                        <strong>2 Formatos Disponibles:</strong> Completo (~300m²) o Express Wine
                        Bar.
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Check className="h-4 w-4 text-[color:var(--gold)] shrink-0 mt-0.5" />
                      <span>
                        <strong>Acuerdos Directos con Bodegas:</strong> Márgenes preferenciales en
                        etiquetas boutique.
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Check className="h-4 w-4 text-[color:var(--gold)] shrink-0 mt-0.5" />
                      <span>
                        <strong>Capacitación Integral:</strong> Formación en servicio, sommellerie y
                        gestión.
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Check className="h-4 w-4 text-[color:var(--gold)] shrink-0 mt-0.5" />
                      <span>
                        <strong>Soporte Continuo:</strong> Marketing, carta centralizada y
                        acompañamiento comercial.
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setFranquiciaOpen(true)}
                      className="btn-tactile inline-flex items-center gap-2 rounded-full bg-[color:var(--wine)] px-8 py-4 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[color:var(--cream)] shadow-xl hover:bg-[color:var(--wine)]/90 cursor-pointer"
                    >
                      <Building2 className="h-4 w-4 text-[color:var(--gold)]" /> Postular mi
                      Franquicia
                    </button>
                    <a
                      href={WA_FRANQUICIAS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-tactile inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)] px-6 py-4 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[color:var(--ink)] hover:bg-[color:var(--gold)]/20 transition-all cursor-pointer"
                    >
                      <WhatsAppIcon className="h-4 w-4 text-[color:var(--gold)]" /> Consultar por
                      WhatsApp
                    </a>
                  </div>
                </div>

                <div className="rounded-xl border border-[color:var(--gold)]/35 bg-[color:var(--cream)]/65 p-6 sm:p-8 space-y-4 shadow-sm">
                  <h3 className="font-serif text-xl font-bold text-[color:var(--wine)]">
                    ¿Por qué elegir Che Malbec?
                  </h3>
                  <div className="space-y-3 text-xs text-[color:var(--ink)]/80">
                    <p className="border-b border-[color:var(--gold)]/20 pb-2.5">
                      🍷 <strong>Negocio de Experiencias:</strong> El público no busca solo beber un
                      vino, sino aprender, compartir maridajes y disfrutar un ambiente cálido.
                    </p>
                    <p className="border-b border-[color:var(--gold)]/20 pb-2.5">
                      📈 <strong>Múltiples Vías de Ingreso:</strong> Consumo en salón, eventos
                      corporativos, catering de fiestas, delivery y venta de botellas para llevar.
                    </p>
                    <p>
                      ⭐ <strong>Material Abierto:</strong> Ponemos a tu disposición toda la
                      información del modelo para evaluar la inversión de forma transparente.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PREGUNTAS FRECUENTES (SEO & EXPERIENCIA) */}
        <section
          id="faq"
          className="bg-[color:var(--cream)] py-20 sm:py-28 border-t border-[color:var(--gold)]/25"
        >
          <div className="mx-auto max-w-4xl px-6">
            <div className="text-center">
              <p className="gold-divider reveal reveal-slide-down">Dudas Habituales</p>
              <h2 className="reveal reveal-slide-up mt-4 font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[color:var(--wine)]">
                Preguntas Frecuentes
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[color:var(--ink)]/80 max-w-2xl mx-auto leading-relaxed">
                Todo lo que necesitás saber sobre nuestras degustaciones guiadas, reservas, cavas
                históricas en Monserrat y San Telmo, catering y delivery.
              </p>
            </div>

            <div className="mt-12">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {FAQ_ITEMS.map((item, idx) => (
                  <AccordionItem
                    key={idx}
                    value={`faq-${idx}`}
                    className="reveal reveal-slide-up border border-[color:var(--gold)]/30 rounded-2xl bg-white/75 px-6 py-1 backdrop-blur-sm shadow-sm transition-all hover:border-[color:var(--gold)]/70 hover:shadow-md"
                    style={{ transitionDelay: `${idx * 60}ms` }}
                  >
                    <AccordionTrigger className="text-left font-serif text-base sm:text-lg font-semibold text-[color:var(--wine)] py-4 hover:no-underline cursor-pointer">
                      <span className="flex items-center gap-3">
                        <HelpCircle className="h-5 w-5 shrink-0 text-[color:var(--gold)]" />
                        {item.pregunta}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm sm:text-base text-[color:var(--ink)]/85 leading-relaxed pt-1 pb-4 pl-8">
                      {item.respuesta}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <div className="mt-12 text-center">
              <p className="text-xs sm:text-sm text-[color:var(--ink)]/70">
                ¿Tenés otra consulta personalizada?{" "}
                <a
                  href={WA_GENERAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[color:var(--wine)] underline hover:text-[color:var(--gold)] transition-colors inline-flex items-center gap-1"
                >
                  Escribinos por WhatsApp ↗
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="bg-ink-atmosphere text-[color:var(--cream)] py-20 sm:py-28 text-center border-t border-[color:var(--gold)]/20">
          <div className="mx-auto max-w-3xl px-6">
            <p className="gold-divider">Tu Próxima Copa Te Espera</p>
            <h2 className="mt-4 font-serif text-3xl sm:text-5xl md:text-6xl font-semibold">
              Vení a descubrir el mundo de los{" "}
              <span className="italic text-[color:var(--gold)]">vinos boutique</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[color:var(--cream)]/80">
              Escribinos para asegurar tu mesa en Monserrat o San Telmo. Te esperamos con la copa
              servida.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3.5">
              <button
                type="button"
                onClick={() => openReservaWith()}
                className="btn-tactile inline-flex items-center gap-2 rounded-full bg-[color:var(--gold)] px-8 py-4 text-sm font-semibold uppercase tracking-wider text-[color:var(--ink)] shadow-2xl hover:scale-105 transition-all cursor-pointer"
              >
                <WhatsAppIcon className="h-5 w-5" /> Reservar Mesa
              </button>
              <a
                href={PEDIDOSYA_MONSERRAT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-tactile inline-flex items-center gap-2 rounded-full border border-red-500 bg-red-600/20 px-6 py-4 text-xs sm:text-sm font-semibold uppercase tracking-wider text-red-300 hover:bg-red-600/30 transition-all cursor-pointer"
              >
                <ShoppingBag className="h-4 w-4" /> PedidosYa Monserrat
              </a>
              <a
                href={PEDIDOSYA_SANTELMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-tactile inline-flex items-center gap-2 rounded-full border border-red-500 bg-red-600/20 px-6 py-4 text-xs sm:text-sm font-semibold uppercase tracking-wider text-red-300 hover:bg-red-600/30 transition-all cursor-pointer"
              >
                <ShoppingBag className="h-4 w-4" /> PedidosYa San Telmo
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#1b120f] py-14 text-[color:var(--cream)]/80 border-t border-[color:var(--gold)]/20">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 sm:grid-cols-2 md:grid-cols-4 text-xs">
          <div>
            <img src={logo} alt="Che Malbec" className="h-8 w-auto" />
            <p className="mt-4 leading-relaxed text-[color:var(--cream)]/65">
              Wine bar boutique en Buenos Aires. Vinos argentinos de bodegas seleccionadas, catas
              guiadas, picadas abundantes y eventos.
            </p>
            <span className="mt-4 inline-block rounded-full bg-white/10 px-3 py-1 text-[10px] text-[color:var(--gold)] font-medium border border-[color:var(--gold)]/20">
              Club de Vinos (Próximamente)
            </span>
          </div>

          <div>
            <h4 className="font-serif text-sm uppercase tracking-widest text-[color:var(--gold)] font-bold">
              Sede Monserrat
            </h4>
            <p className="mt-3">
              Av. de Mayo 777 (Palacio Vera)
              <br />
              Monserrat · CABA
            </p>
            <p className="mt-2 text-[color:var(--cream)]/65">
              Lun 11–19h · Mar–Sáb 11–23h
              <br />
              Dom cerrado
            </p>
            <div className="mt-2 space-y-1">
              <a
                href={SUCURSAL_MONSERRAT.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[color:var(--gold)] hover:underline"
              >
                Ver en Maps ↗
              </a>
              <a
                href={PEDIDOSYA_MONSERRAT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-red-400 hover:underline"
              >
                PedidosYa Monserrat ↗
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-sm uppercase tracking-widest text-[color:var(--gold)] font-bold">
              Sede San Telmo
            </h4>
            <p className="mt-3">
              Estados Unidos 407
              <br />
              San Telmo · CABA
            </p>
            <p className="mt-2 text-[color:var(--cream)]/65">
              Mar–Sáb 18–00h
              <br />
              Dom y Lun cerrado
            </p>
            <div className="mt-2 space-y-1">
              <a
                href={SUCURSAL_SANTELMO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[color:var(--gold)] hover:underline"
              >
                Ver en Maps ↗
              </a>
              <a
                href={PEDIDOSYA_SANTELMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-red-400 hover:underline"
              >
                PedidosYa San Telmo ↗
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-sm uppercase tracking-widest text-[color:var(--gold)] font-bold">
              Contacto & Redes
            </h4>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href={WA_GENERAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[color:var(--gold)] transition-colors"
                >
                  WhatsApp: +54 9 11 2848-1233
                </a>
              </li>
              <li>
                <a
                  href={SUCURSAL_MONSERRAT.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[color:var(--gold)] transition-colors"
                >
                  IG Monserrat: @che.malbec
                </a>
              </li>
              <li>
                <a
                  href={SUCURSAL_SANTELMO.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[color:var(--gold)] transition-colors"
                >
                  IG San Telmo: @che.malbec.santelmo
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="hover:text-[color:var(--gold)] transition-colors"
                >
                  Preguntas Frecuentes
                </a>
              </li>
              <li>
                <div className="space-y-1 pt-1">
                  <span className="text-[10px] uppercase tracking-wider text-[color:var(--gold)] font-semibold block">Delivery</span>
                  <a
                    href={PEDIDOSYA_MONSERRAT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:text-[color:var(--gold)] transition-colors text-red-400"
                  >
                    PedidosYa Av. de Mayo
                  </a>
                  <a
                    href={PEDIDOSYA_SANTELMO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:text-[color:var(--gold)] transition-colors text-red-400"
                  >
                    PedidosYa San Telmo
                  </a>
                </div>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setFranquiciaOpen(true)}
                  className="text-[color:var(--gold)] hover:underline cursor-pointer text-left"
                >
                  Consultar Franquicias
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-6xl border-t border-white/10 px-6 pt-6 text-center text-[11px] text-[color:var(--cream)]/50">
          © {new Date().getFullYear()} Che Malbec Mercado & Wine Bar · Todos los derechos reservados
          · Buenos Aires, Argentina
        </div>
      </footer>

      {/* Floating WhatsApp Action for Mobile */}
      <a
        id="floating-whatsapp-btn"
        href={WA_GENERAL_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="btn-tactile fixed bottom-5 right-5 z-40 flex h-13 w-13 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl hover:scale-110 active:scale-95 md:hidden cursor-pointer"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>

      <ReservationDialog
        open={reservaOpen}
        onOpenChange={setReservaOpen}
        defaultSucursal={reservaSucursal}
      />
      <FranchiseDialog open={franquiciaOpen} onOpenChange={setFranquiciaOpen} />
    </div>
  );
}
