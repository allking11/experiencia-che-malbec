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
import { Calendar, Clock, MapPin, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const SITE_URL = "https://che-malbec.vercel.app"; // Reemplazar por tu dominio final una vez adquirido

export const Route = createFileRoute("/")({
  head: () => {
    const ogImageUrl = `${SITE_URL}${fachada}`;
    return {
      meta: [
        { title: "Che Malbec — Boutique Wine Bar & Degustación de Vinos en Buenos Aires" },
        {
          name: "description",
          content:
            "Disfrutá de catas de vino y degustaciones guiadas por sommeliers en nuestro wine bar boutique. Ubicado en el Palacio Vera, Av. de Mayo 777, Montserrat.",
        },
        {
          property: "og:title",
          content: "Che Malbec — Boutique Wine Bar & Degustación de Vinos en Buenos Aires",
        },
        {
          property: "og:description",
          content:
            "Degustaciones de vinos boutique, etiquetas exclusivas y gastronomía casera en un local histórico en Buenos Aires.",
        },
        { property: "og:image", content: ogImageUrl },
        { name: "twitter:image", content: ogImageUrl },
        { property: "og:type", content: "website" },
        { property: "og:url", content: SITE_URL },
        { property: "og:site_name", content: "Che Malbec" },
        { property: "og:locale", content: "es_AR" },
      ],
    };
  },
  component: Index,
});

const WA_NUMBER = "5491128481233";
const WA_MSG = encodeURIComponent(
  "Hola Che Malbec 👋 Quiero consultar por una degustación / reserva.",
);
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`;
const WA_EVENT_MSG = encodeURIComponent(
  "Hola Che Malbec 👋 Quiero consultar por la fecha de la próxima Feria de Vinos.",
);
const WA_EVENT_URL = `https://wa.me/${WA_NUMBER}?text=${WA_EVENT_MSG}`;
const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Che+Malbec+Av+de+Mayo+777+Buenos+Aires";

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.12 },
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
  const openReserva = () => setReservaOpen(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

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
    "@type": "BarOrPub",
    name: "Che Malbec - Boutique Wine Bar & Degustaciones",
    image: `${SITE_URL}${fachada}`,
    "@id": `${SITE_URL}/#bar`,
    url: SITE_URL,
    telephone: "+5491128481233",
    priceRange: "$$$",
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
      latitude: -34.608552,
      longitude: -58.379768,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Monday",
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
    sameAs: ["https://www.instagram.com/che.malbec"],
    servesCuisine: "Argentine, Wine, Picadas, Empanadas",
    description:
      "Boutique wine bar and wine tasting experience located in the historic Palacio Vera building in Montserrat, Buenos Aires. Featuring guided tastings by professional sommeliers.",
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      {/* NAV */}
      <header
        className={`fixed inset-x-0 top-0 z-40 border-b border-[color:var(--gold)]/20 transition-all duration-500 ${
          scrolled
            ? "py-3 bg-[color:var(--cream)]/85 backdrop-blur-md shadow-md"
            : "py-5 bg-[color:var(--cream)]"
        }`}
      >
        {/* Scroll Progress Bar */}
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-[color:var(--gold)] transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5">
          <a href="#inicio" id="nav-logo-link" className="flex items-center gap-2">
            <img
              src={logo}
              alt="Che Malbec Mercado & Wine Bar - Palacio Vera Monserrat"
              className="h-10 w-auto md:h-12"
            />
          </a>
          <ul className="hidden items-center gap-8 text-sm font-medium text-[color:var(--ink)]/80 md:flex">
            <li>
              <a
                href="#experiencia"
                id="nav-link-experiencia"
                className="nav-link-animated hover:text-[color:var(--wine)] transition-colors"
              >
                Experiencia
              </a>
            </li>
            <li>
              <a
                href="#degustaciones"
                id="nav-link-degustaciones"
                className="nav-link-animated hover:text-[color:var(--wine)] transition-colors"
              >
                Degustaciones
              </a>
            </li>
            <li>
              <a
                href="#carta"
                id="nav-link-carta"
                className="nav-link-animated hover:text-[color:var(--wine)] transition-colors"
              >
                Carta
              </a>
            </li>
            <li>
              <a
                href="#historia"
                id="nav-link-historia"
                className="nav-link-animated hover:text-[color:var(--wine)] transition-colors"
              >
                Historia
              </a>
            </li>
            <li>
              <a
                href="#ubicacion"
                id="nav-link-ubicacion"
                className="nav-link-animated hover:text-[color:var(--wine)] transition-colors"
              >
                Ubicación
              </a>
            </li>
          </ul>
          <button
            id="nav-reserve-btn"
            type="button"
            onClick={openReserva}
            className="btn-tactile hidden items-center gap-2 rounded-full bg-[color:var(--wine)] px-5 py-2.5 text-sm font-semibold tracking-wide text-[color:var(--cream)] shadow-sm md:inline-flex cursor-pointer"
          >
            <WhatsAppIcon className="h-4 w-4" /> Reservar
          </button>

          {/* Mobile hamburger menu */}
          <div className="flex items-center md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <button
                  id="mobile-menu-trigger"
                  type="button"
                  aria-label="Abrir menú"
                  className="rounded-md p-2 text-[color:var(--wine)] hover:bg-[color:var(--wine)]/10 cursor-pointer"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-[color:var(--cream)] border-l border-[color:var(--gold)]/40 text-[color:var(--ink)] flex flex-col justify-between p-6"
              >
                <SheetTitle className="sr-only">Menú de Navegación</SheetTitle>
                <SheetDescription className="sr-only">
                  Enlaces de navegación móvil para Che Malbec
                </SheetDescription>
                <div>
                  <div className="flex items-center justify-between border-b border-[color:var(--gold)]/20 pb-4 mb-6">
                    <img src={logo} alt="Che Malbec Wine Bar Boutique" className="h-10 w-auto" />
                  </div>
                  <ul className="flex flex-col gap-6 text-lg font-medium text-[color:var(--ink)]">
                    <li>
                      <a
                        href="#experiencia"
                        id="mobile-nav-experiencia"
                        onClick={() => setMobileMenuOpen(false)}
                        className="hover:text-[color:var(--wine)] transition-colors block py-2 border-b border-[color:var(--gold)]/10"
                      >
                        Experiencia
                      </a>
                    </li>
                    <li>
                      <a
                        href="#degustaciones"
                        id="mobile-nav-degustaciones"
                        onClick={() => setMobileMenuOpen(false)}
                        className="hover:text-[color:var(--wine)] transition-colors block py-2 border-b border-[color:var(--gold)]/10"
                      >
                        Degustaciones
                      </a>
                    </li>
                    <li>
                      <a
                        href="#carta"
                        id="mobile-nav-carta"
                        onClick={() => setMobileMenuOpen(false)}
                        className="hover:text-[color:var(--wine)] transition-colors block py-2 border-b border-[color:var(--gold)]/10"
                      >
                        Carta
                      </a>
                    </li>
                    <li>
                      <a
                        href="#historia"
                        id="mobile-nav-historia"
                        onClick={() => setMobileMenuOpen(false)}
                        className="hover:text-[color:var(--wine)] transition-colors block py-2 border-b border-[color:var(--gold)]/10"
                      >
                        Historia
                      </a>
                    </li>
                    <li>
                      <a
                        href="#ubicacion"
                        id="mobile-nav-ubicacion"
                        onClick={() => setMobileMenuOpen(false)}
                        className="hover:text-[color:var(--wine)] transition-colors block py-2 border-b border-[color:var(--gold)]/10"
                      >
                        Ubicación
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <button
                    id="mobile-menu-reserve-btn"
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openReserva();
                    }}
                    className="w-full flex items-center justify-center gap-2 rounded-full bg-[color:var(--wine)] py-3 text-base font-semibold text-[color:var(--cream)] shadow-md transition-all hover:bg-[color:var(--ink)] cursor-pointer"
                  >
                    <WhatsAppIcon className="h-5 w-5" /> Reservar Mesa
                  </button>
                  <p className="text-center text-xs text-[color:var(--ink)]/60">
                    Av. de Mayo 777 · Monserrat
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>

      <main>
        {/* HERO */}
        <section id="inicio" className="relative min-h-[100svh] w-full overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={fachada}
              alt="Fachada histórica de Che Malbec en el Palacio Vera, Avenida de Mayo, Buenos Aires"
              className="h-full w-full object-cover ken-burns"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--ink)]/70 via-[color:var(--ink)]/45 to-[color:var(--ink)]/85" />
          </div>
          <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-4xl flex-col items-center justify-center px-6 pt-24 pb-16 text-center text-[color:var(--cream)]">
            <span
              className="gold-divider mb-6 reveal reveal-slide-down in"
              style={{ transitionDelay: "150ms" }}
            >
              Boutique Wine Bar & Tastings in Buenos Aires
            </span>
            <h1
              className="reveal reveal-slide-up in font-serif text-4xl leading-[1.1] sm:text-6xl md:text-7xl"
              style={{ transitionDelay: "300ms" }}
            >
              <span className="sr-only">
                Che Malbec — Wine Bar Boutique & Degustación de Vinos en Palacio Vera
              </span>
              El vino argentino se disfruta mejor{" "}
              <em className="text-[color:var(--gold)] not-italic font-medium">
                cuando se comparte
              </em>
            </h1>
            <p
              className="reveal reveal-fade in mt-6 max-w-2xl text-base leading-relaxed text-[color:var(--cream)]/85 sm:text-lg"
              style={{ transitionDelay: "450ms" }}
            >
              Degustaciones guiadas por sommeliers, vinos de bodegas boutique y gastronomía casera
              en un wine bar íntimo ubicado en el histórico Palacio Vera, en el corazón de Buenos
              Aires.
            </p>
            <div
              className="reveal reveal-slide-up in mt-10 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row"
              style={{ transitionDelay: "600ms" }}
            >
              <button
                id="hero-reserve-btn"
                type="button"
                onClick={openReserva}
                className="btn-tactile inline-flex w-full items-center justify-center gap-2 rounded-full bg-[color:var(--wine)] px-8 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-[color:var(--cream)] shadow-lg sm:w-auto cursor-pointer"
              >
                <WhatsAppIcon className="h-5 w-5" /> Reservar mesa
              </button>
              <a
                href="#experiencia"
                id="hero-view-experience-link"
                className="btn-tactile inline-flex w-full items-center justify-center gap-2 rounded-full border border-[color:var(--gold)]/70 px-8 py-4 text-sm font-medium uppercase tracking-[0.12em] text-[color:var(--cream)] hover:bg-[color:var(--cream)]/10 sm:w-auto"
              >
                Ver la experiencia
              </a>
            </div>
            <div
              className="reveal reveal-fade in mt-12 flex items-center gap-2 text-sm text-[color:var(--cream)]/80"
              style={{ transitionDelay: "750ms" }}
            >
              <span className="text-[color:var(--gold)]">★★★★★</span>
              <span>+1100 reseñas en Google</span>
            </div>
          </div>
          <a
            href="#opiniones"
            id="hero-scroll-down-btn"
            aria-label="Bajar"
            className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[color:var(--cream)]/70 transition-all duration-300 hover:text-[color:var(--gold)] hover:translate-y-1 hover:scale-110"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M12 5v14m0 0l-6-6m6 6l6-6" />
            </svg>
          </a>
        </section>

        {/* OPINIONES / TESTIMONIOS */}
        <section
          id="opiniones"
          className="bg-[color:var(--wine)] py-20 text-[color:var(--cream)] sm:py-28"
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-end">
              <div>
                <p className="gold-divider reveal reveal-slide-down" style={{ color: "var(--gold)" }}>
                  Opiniones
                </p>
                <h2 className="reveal reveal-slide-up mt-5 font-serif text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
                  Reseñas de Che Malbec: 4.8 <span className="text-[color:var(--gold)]">★</span> en
                  Google Maps
                </h2>
              </div>
              <p className="reveal reveal-fade text-base leading-relaxed text-[color:var(--cream)]/80">
                Lo que más destacan: la calidez del espacio, la cercanía de los sommeliers y las
                picadas abundantes.
              </p>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {[
                {
                  q: "Una verdadera joya en medio del centro. Agustín nos guió copa a copa con mucha paciencia, explicando la historia de cada bodega. Las empanadas caseras son espectaculares. Ambiente íntimo ideal para bajar un cambio.",
                  n: "Mariana S.",
                  r: "Cliente local",
                },
                {
                  q: "Me encantó el lugar. Al estar dentro del histórico Palacio Vera, se respira una atmósfera única. Tienen etiquetas boutique muy interesantes y la atención del personal te hace sentir como en casa desde que entrás.",
                  n: "Jean-Pierre L.",
                  r: "Visitante",
                },
                {
                  q: "Los vinos y la comida son excelentes, y la atención del sommelier impecable. El local es chico y acogedor — siempre conviene reservar para asegurar la mesa.",
                  n: "Carlos G.",
                  r: "Reseña verificada",
                },
              ].map((t, i) => (
                <article
                  key={t.n}
                  className="reveal reveal-slide-up card-premium flex flex-col rounded-sm border border-[color:var(--cream)]/10 bg-[color:var(--cream)]/[0.04] p-7 backdrop-blur-sm"
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <div className="text-lg tracking-widest text-[color:var(--gold)]">★ ★ ★ ★ ★</div>
                  <p className="mt-5 flex-1 font-serif text-lg italic leading-relaxed text-[color:var(--cream)]/95">
                    “{t.q}”
                  </p>
                  <div className="mt-6">
                    <p className="font-semibold text-[color:var(--cream)]">{t.n}</p>
                    <p className="text-sm text-[color:var(--cream)]/60">{t.r}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* EXPERIENCIA */}
        <section
          id="experiencia"
          className="relative overflow-hidden bg-[color:var(--card)] py-24 sm:py-32"
        >
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2 md:gap-20">
            <div className="reveal reveal-slide-right hover-zoom-container order-2 md:order-1 rounded-sm shadow-xl">
              <img
                src={copa}
                alt="Copa de vino Malbec servida por un sommelier en el salón boutique de Che Malbec"
                className="hover-zoom-image aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="reveal reveal-slide-left order-1 md:order-2">
              <p className="gold-divider">La Experiencia en Palacio Vera</p>
              <h2 className="mt-5 text-3xl text-[color:var(--wine)] sm:text-4xl md:text-5xl font-serif font-semibold">
                Experiencia de Vinos Boutique y Guía de Sommeliers
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-[color:var(--ink)]/80">
                Un espacio creado para disfrutar excelentes vinos argentinos seleccionados por
                nuestros sommeliers, compartir una buena mesa y aprender sobre cada etiqueta
                boutique en un ambiente relajado.
              </p>
              <p className="mt-4 text-base leading-relaxed text-[color:var(--ink)]/70">
                Entrar a Che Malbec en el histórico Palacio Vera es como descubrir un pequeño
                refugio porteño en Montserrat donde el tiempo se detiene: maderas cálidas,
                iluminación íntima y una carta de picadas caseras pensada para acompañar cada copa.
              </p>
            </div>
          </div>
        </section>

        {/* DEGUSTACIONES */}
        <section id="degustaciones" className="bg-[color:var(--cream)] py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="gold-divider reveal reveal-slide-down">Degustaciones de Vinos</p>
              <h2 className="reveal reveal-slide-up mt-5 text-3xl text-[color:var(--wine)] sm:text-4xl md:text-5xl font-serif font-semibold">
                Degustación de Vinos y Catas Guiadas por Sommeliers
              </h2>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {[
                {
                  t: "Degustaciones Guiadas por Sommeliers",
                  d: "Catas y degustaciones guiadas de vinos argentinos premium, donde aprenderás la historia y notas de cada bodega boutique.",
                },
                {
                  t: "Catas por Pasos de Vinos Boutique",
                  d: "Una experiencia sensorial exclusiva para explorar diversas etiquetas de vinos boutique de regiones vitivinícolas del país.",
                },
                {
                  t: "Maridaje con Picadas Caseras",
                  d: "Combinación ideal de copas seleccionadas con tablas de quesos artesanales, fiambres de calidad y empanadas caseras.",
                },
              ].map((c, i) => (
                <article
                  key={c.t}
                  className="reveal reveal-slide-up tasting-card group relative flex flex-col rounded-sm border border-[color:var(--gold)]/40 bg-[color:var(--card)] p-8"
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <span className="tasting-num font-serif text-sm italic text-[color:var(--gold)] inline-block">
                    0{i + 1}
                  </span>
                  <h3 className="mt-3 text-2xl text-[color:var(--wine)] font-serif font-semibold">{c.t}</h3>
                  <p className="mt-4 flex-1 text-[color:var(--ink)]/75 leading-relaxed">{c.d}</p>
                  <div className="tasting-line mt-6 h-px w-12 bg-[color:var(--gold)]" />
                </article>
              ))}
            </div>

            <div className="reveal reveal-slide-up mt-14 text-center" style={{ transitionDelay: "150ms" }}>
              <button
                id="degustaciones-reserve-btn"
                type="button"
                onClick={openReserva}
                className="btn-tactile inline-flex items-center gap-2 rounded-full bg-[color:var(--wine)] px-8 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-[color:var(--cream)] cursor-pointer"
              >
                <WhatsAppIcon className="h-5 w-5" /> Reservar degustación
              </button>
            </div>
          </div>
        </section>

        {/* CARTA */}
        <section
          id="carta"
          className="relative bg-[color:var(--ink)] py-24 text-[color:var(--cream)] sm:py-32"
        >
          <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 md:grid-cols-[1.1fr_1fr]">
            <div className="reveal reveal-slide-right">
              <p className="gold-divider">La carta</p>
              <h2 className="mt-5 font-serif text-3xl sm:text-4xl md:text-5xl font-semibold">
                Nuestra Carta: Vinos Argentinos y Picadas Caseras
              </h2>
              <p className="mt-6 max-w-md text-[color:var(--cream)]/75 leading-relaxed">
                Una propuesta gastronómica honesta en Monserrat. Ideal para acompañar una copa de
                Malbec, una charla relajada o una cata de vinos por pasos.
              </p>

              <ul className="mt-10 space-y-4">
                {[
                  "Vinos argentinos por copa y botella",
                  "Etiquetas boutique seleccionadas",
                  "Picadas abundantes",
                  "Empanadas caseras",
                  "Tablas de quesos y fiambres",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 border-b border-[color:var(--cream)]/15 pb-4"
                  >
                    <span className="mt-2 h-px w-5 shrink-0 bg-[color:var(--gold)]" />
                    <span className="font-serif text-lg italic text-[color:var(--cream)]/95">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                id="carta-reserve-btn"
                type="button"
                onClick={openReserva}
                className="btn-tactile mt-10 inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)] px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-[color:var(--gold)] cursor-pointer"
              >
                Reservar mesa
              </button>
            </div>

            <div className="reveal reveal-slide-left grid grid-cols-2 gap-4">
              <div className="col-span-2 hover-zoom-container rounded-sm shadow-2xl">
                <img
                  src={copaBotella}
                  alt="Botella de Malbec argentino de bodega boutique y copa servida en el wine bar Che Malbec"
                  className="hover-zoom-image aspect-[4/5] w-full object-cover sm:aspect-[5/4]"
                />
              </div>
              <div className="hover-zoom-container rounded-sm shadow-md">
                <img
                  src={burrata}
                  alt="Plato de burrata fresca con jamón crudo y rúcula, ideal para maridar con vinos tintos boutique en Che Malbec"
                  className="hover-zoom-image aspect-square w-full object-cover"
                />
              </div>
              <div className="hover-zoom-container rounded-sm shadow-md">
                <img
                  src={clientes}
                  alt="Clientes compartiendo una degustación de vinos boutique y picadas caseras en la cava de Che Malbec"
                  className="hover-zoom-image aspect-square w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* NOVEDADES / EVENTOS */}
        <section
          id="novedades"
          className="bg-[color:var(--card)] py-10 md:py-12 border-t border-[color:var(--gold)]/20"
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto max-w-2xl text-center md:mb-6 mb-4">
              <p className="gold-divider reveal reveal-slide-down">Agenda de Eventos</p>
              <h2 className="reveal reveal-slide-up mt-5 text-3xl text-[color:var(--wine)] sm:text-4xl md:text-5xl font-serif font-semibold">
                Eventos de Wine Bar: Feria de Vinos y Más
              </h2>
            </div>

            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              {/* Detalles del Evento */}
              <div className="reveal reveal-slide-right order-2 md:order-1 space-y-6">
                <span className="inline-block rounded-full bg-[color:var(--wine)]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[color:var(--wine)]">
                  Próximo Evento 🍷
                </span>
                <h3 className="font-serif text-3xl text-[color:var(--ink)] sm:text-4xl">
                  Feria de Vinos Boutique en CABA
                </h3>

                <div className="rounded-lg bg-[color:var(--cream)]/40 p-5 border border-[color:var(--gold)]/20 space-y-3 shadow-sm">
                  <p className="flex items-center gap-2.5 text-base font-semibold text-[color:var(--wine)]">
                    <Calendar className="h-5 w-5 text-[color:var(--gold)] shrink-0" /> Próxima
                    edición: ¡Muy pronto!
                  </p>
                  <p className="flex items-center gap-2.5 text-sm text-[color:var(--ink)]/80">
                    <Clock className="h-4 w-4 text-[color:var(--gold)] shrink-0" /> Consultar fechas
                    y horarios
                  </p>
                  <p className="flex items-center gap-2.5 text-sm text-[color:var(--ink)]/80">
                    <MapPin className="h-4 w-4 text-[color:var(--gold)] shrink-0" /> Avenida de Mayo
                    777, Monserrat
                  </p>
                </div>

                <div className="space-y-4">
                  <p className="text-base leading-relaxed text-[color:var(--ink)]/85 font-medium">
                    Te esperamos para disfrutar una noche a pura fiesta y vinitos con una propuesta
                    imperdible:
                  </p>
                  <ul className="grid gap-3 text-sm text-[color:var(--ink)]/85">
                    <li className="flex items-start gap-2">
                      <span className="text-[color:var(--gold)] mt-0.5">✔</span>
                      <span>
                        <strong>Más de 15 etiquetas de bodegas boutique</strong> y vinos de autor
                        para degustar libremente.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[color:var(--gold)] mt-0.5">✔</span>
                      <span>
                        <strong>Banda de rock de los 80's</strong> en vivo.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[color:var(--gold)] mt-0.5">✔</span>
                      <span>
                        <strong>Canilla libre por tres horas</strong> (con reserva previa).
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[color:var(--gold)] mt-0.5">✔</span>
                      <span>
                        La copa del evento va de <strong>regalo</strong>.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[color:var(--gold)] mt-0.5">✔</span>
                      <span>
                        <strong>Valor:</strong> Consultar valor vigente.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4">
                  <a
                    id="event-reserve-link"
                    href={WA_EVENT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-tactile inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full bg-[color:var(--wine)] px-8 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-[color:var(--cream)] shadow-lg"
                  >
                    <WhatsAppIcon className="h-5 w-5" /> Consultar próximas fechas
                  </a>
                </div>
              </div>

              {/* Video Promocional */}
              <div className="reveal reveal-slide-left order-1 md:order-2 flex justify-center">
                <div className="relative w-full max-w-[280px] sm:max-w-[300px] md:max-w-[340px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border border-[color:var(--gold)]/30 bg-[color:var(--ink)] transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_20px_40px_rgba(199,162,91,0.15)] hover:border-[color:var(--gold)]">
                  <video
                    src={feriaVinosVideo}
                    className="w-full h-full object-cover"
                    controls
                    playsInline
                    loop
                    muted
                    preload="auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HISTORIA */}
        <section id="historia" className="bg-[color:var(--cream)] py-24 sm:py-32">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <p className="gold-divider reveal reveal-slide-down">Nuestra historia</p>
            <h2 className="reveal reveal-slide-up mt-5 text-3xl text-[color:var(--wine)] sm:text-4xl md:text-5xl font-serif font-semibold">
              Nuestra Historia: Pasión por el Vino Boutique y las Catas
            </h2>
            <p
              className="reveal reveal-fade mt-8 font-serif text-xl italic leading-relaxed text-[color:var(--ink)]/85 sm:text-2xl"
              style={{ transitionDelay: "150ms" }}
            >
              “Che Malbec nació de la curiosidad por descubrir el mundo del vino y compartir esa
              pasión con otros.”
            </p>
            <div
              className="reveal reveal-slide-up mx-auto mt-8 max-w-2xl space-y-5 text-[color:var(--ink)]/75 leading-relaxed"
              style={{ transitionDelay: "300ms" }}
            >
              <p>
                Empezó como un hobby —vender vinos para descubrir nuevas etiquetas boutique— y
                creció tras un viaje a Italia, donde una enoteca de barrio nos hizo comprender la
                calidez y cercanía que queríamos replicar en Buenos Aires.
              </p>
              <p>
                Hoy es un espacio íntimo en el histórico Palacio Vera (Montserrat) diseñado para
                disfrutar excelentes vinos argentinos, conocer etiquetas exclusivas guiados por
                sommeliers y vivir momentos de risas, desconexión y maridajes gourmet.
              </p>
            </div>
          </div>
        </section>

        {/* UBICACIÓN */}
        <section
          id="ubicacion"
          className="relative overflow-hidden bg-[color:var(--card)] py-24 sm:py-32"
        >
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2 md:gap-16">
            <div className="reveal reveal-slide-right">
              <p className="gold-divider">Cómo Llegar</p>
              <h2 className="mt-5 text-3xl text-[color:var(--wine)] sm:text-4xl md:text-5xl font-serif font-semibold">
                Visitanos en Monserrat: Palacio Vera
              </h2>

              <address className="mt-8 not-italic">
                <p className="font-serif text-2xl text-[color:var(--ink)]">Avenida de Mayo 777</p>
                <p className="text-[color:var(--ink)]/70">
                  Histórico Palacio Vera · Monserrat · CABA, Argentina
                </p>
              </address>

              <div className="mt-8">
                <h3 className="font-serif text-sm uppercase tracking-[0.18em] text-[color:var(--gold)]">
                  Horarios
                </h3>
                <dl className="mt-4 divide-y divide-[color:var(--gold)]/30 text-[color:var(--ink)]/85">
                  <div className="flex justify-between py-3">
                    <dt>Lunes</dt>
                    <dd>11:00 — 19:00</dd>
                  </div>
                  <div className="flex justify-between py-3">
                    <dt>Martes a sábado</dt>
                    <dd>11:00 — 23:00</dd>
                  </div>
                  <div className="flex justify-between py-3">
                    <dt>Domingo</dt>
                    <dd className="text-[color:var(--ink)]/50">Cerrado</dd>
                  </div>
                </dl>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  id="ubicacion-reserve-btn"
                  type="button"
                  onClick={openReserva}
                  className="btn-tactile inline-flex items-center gap-2 rounded-full border border-[color:var(--wine)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-[color:var(--wine)] hover:bg-[color:var(--wine)] hover:text-[color:var(--cream)] cursor-pointer"
                >
                  <WhatsAppIcon className="h-4 w-4" /> Reservar
                </button>
              </div>
            </div>

            <div className="reveal reveal-slide-left">
              <div className="overflow-hidden rounded-sm border border-[color:var(--gold)]/40 shadow-xl transition-all duration-500 hover:shadow-2xl hover:border-[color:var(--gold)]">
                <iframe
                  title="Mapa de Che Malbec"
                  src="https://www.google.com/maps?q=Avenida+de+Mayo+777,+Buenos+Aires&output=embed"
                  className="h-[420px] w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="relative overflow-hidden bg-[color:var(--wine)] py-24 text-[color:var(--cream)] sm:py-32">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <p className="gold-divider reveal reveal-slide-down" style={{ color: "var(--gold)" }}>
              Reservá tu mesa
            </p>
            <h2 className="reveal reveal-slide-up mt-5 font-serif text-3xl leading-tight sm:text-5xl md:text-6xl">
              ¿Listo para disfrutar{" "}
              <em className="not-italic text-[color:var(--gold)]">una cata de vinos única?</em>
            </h2>
            <p className="reveal reveal-fade mt-6 text-lg text-[color:var(--cream)]/85">
              Escribinos y reservá tu lugar. Te esperamos en Av. de Mayo 777.
            </p>
            <button
              id="cta-reserve-btn"
              type="button"
              onClick={openReserva}
              className="btn-tactile reveal reveal-scale mt-10 inline-flex items-center gap-3 rounded-full bg-[color:var(--gold)] px-10 py-5 text-sm font-semibold uppercase tracking-[0.14em] text-[color:var(--ink)] shadow-2xl cursor-pointer"
            >
              <WhatsAppIcon className="h-5 w-5" /> Reservar tu mesa
            </button>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-[color:var(--ink)] py-14 text-[color:var(--cream)]/80">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-3">
          <div>
            <img src={logo} alt="Che Malbec" className="h-14 w-auto" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[color:var(--cream)]/65">
              Wine bar boutique en Buenos Aires. Vinos argentinos, degustaciones guiadas y picadas
              para compartir.
            </p>
          </div>
          <div>
            <h4 className="font-serif text-sm uppercase tracking-[0.18em] text-[color:var(--gold)]">
              Visitanos
            </h4>
            <p className="mt-4 text-sm">
              Av. de Mayo 777
              <br />
              Monserrat · CABA
            </p>
            <p className="mt-3 text-sm text-[color:var(--cream)]/65">
              Lun 11–19h · Mar–Sáb 11–23h
              <br />
              Dom cerrado
            </p>
          </div>
          <div>
            <h4 className="font-serif text-sm uppercase tracking-[0.18em] text-[color:var(--gold)]">
              Contacto
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  id="footer-whatsapp-link"
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[color:var(--gold)]"
                >
                  WhatsApp: +54 9 11 2848-1233
                </a>
              </li>
              <li>
                <a
                  id="footer-instagram-link"
                  href="https://instagram.com/che.malbec"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[color:var(--gold)]"
                >
                  Instagram: @che.malbec
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-6xl border-t border-[color:var(--cream)]/15 px-6 pt-6 text-center text-xs text-[color:var(--cream)]/50">
          © {new Date().getFullYear()} Che Malbec Mercado & Wine Bar · Todos los derechos reservados
        </div>
      </footer>

      <ReservationDialog open={reservaOpen} onOpenChange={setReservaOpen} />
    </div>
  );
}
