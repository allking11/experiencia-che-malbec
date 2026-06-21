import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png.asset.json";
import fachada from "@/assets/fachada.jpg.asset.json";
import copa from "@/assets/copa.jpg.asset.json";
import copaBotella from "@/assets/copa-botella.jpg.asset.json";
import burrata from "@/assets/burrata.jpg.asset.json";
import clientes from "@/assets/clientes.jpg.asset.json";
import { ReservationDialog } from "@/components/ReservationDialog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Che Malbec — Wine Bar boutique en Buenos Aires" },
      { name: "description", content: "Degustaciones guiadas, vinos argentinos boutique y picadas caseras en Av. de Mayo 777. Reservá por WhatsApp." },
      { property: "og:title", content: "Che Malbec — Wine Bar boutique en Buenos Aires" },
      { property: "og:description", content: "Vinos argentinos, degustaciones y momentos para compartir en pleno Buenos Aires." },
      { property: "og:image", content: fachada.url },
      { name: "twitter:image", content: fachada.url },
    ],
  }),
  component: Index,
});

const WA_NUMBER = "5491128481233";
const WA_MSG = encodeURIComponent("Hola Che Malbec 👋 Quiero consultar por una degustación / reserva.");
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`;
const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Che+Malbec+Av+de+Mayo+777+Buenos+Aires";

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
    </svg>
  );
}

function Index() {
  useReveal();
  const [reservaOpen, setReservaOpen] = useState(false);
  const openReserva = () => setReservaOpen(true);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className={`fixed inset-x-0 top-0 z-40 bg-[color:var(--cream)] border-b border-[color:var(--gold)]/30 transition-all duration-500 ${scrolled ? "py-3 shadow-sm" : "py-5"}`}>
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5">
          <a href="#inicio" className="flex items-center gap-2">
            <img src={logo.url} alt="Che Malbec Mercado & Wine Bar" className="h-10 w-auto md:h-12" />
          </a>
          <ul className="hidden items-center gap-8 text-sm font-medium text-[color:var(--ink)]/80 md:flex">
            <li><a href="#experiencia" className="hover:text-[color:var(--wine)] transition-colors">Experiencia</a></li>
            <li><a href="#degustaciones" className="hover:text-[color:var(--wine)] transition-colors">Degustaciones</a></li>
            <li><a href="#carta" className="hover:text-[color:var(--wine)] transition-colors">Carta</a></li>
            <li><a href="#historia" className="hover:text-[color:var(--wine)] transition-colors">Historia</a></li>
            <li><a href="#ubicacion" className="hover:text-[color:var(--wine)] transition-colors">Ubicación</a></li>
          </ul>
          <button type="button" onClick={openReserva} className="hidden items-center gap-2 rounded-full bg-[color:var(--wine)] px-5 py-2.5 text-sm font-semibold tracking-wide text-[color:var(--cream)] shadow-sm transition-all hover:bg-[color:var(--ink)] md:inline-flex">
            <WhatsAppIcon className="h-4 w-4" /> Reservar
          </button>
        </nav>
      </header>

      {/* HERO */}
      <section id="inicio" className="relative min-h-[100svh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img src={fachada.url} alt="Fachada de Che Malbec en Av. de Mayo, Buenos Aires" className="h-full w-full object-cover ken-burns" />
          <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--ink)]/70 via-[color:var(--ink)]/45 to-[color:var(--ink)]/85" />
        </div>
        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-4xl flex-col items-center justify-center px-6 pt-24 pb-16 text-center text-[color:var(--cream)]">
          <span className="gold-divider mb-6 reveal in">Mercado & Wine Bar · Buenos Aires</span>
          <h1 className="reveal in font-serif text-4xl leading-[1.1] sm:text-6xl md:text-7xl">
            El vino argentino se disfruta mejor <em className="text-[color:var(--gold)] not-italic font-medium">cuando se comparte</em>
          </h1>
          <p className="reveal in mt-6 max-w-2xl text-base leading-relaxed text-[color:var(--cream)]/85 sm:text-lg">
            Degustaciones guiadas, vinos boutique y gastronomía casera en un wine bar íntimo en el corazón de Buenos Aires.
          </p>
          <div className="reveal in mt-10 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
            <button type="button" onClick={openReserva} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[color:var(--wine)] px-8 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-[color:var(--cream)] shadow-lg transition-all hover:scale-[1.02] hover:bg-[color:var(--ink)] sm:w-auto">
              <WhatsAppIcon className="h-5 w-5" /> Reservar mesa
            </button>
            <a href="#experiencia" className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[color:var(--gold)]/70 px-8 py-4 text-sm font-medium uppercase tracking-[0.12em] text-[color:var(--cream)] transition-colors hover:bg-[color:var(--cream)]/10 sm:w-auto">
              Ver la experiencia
            </a>
          </div>
          <div className="reveal in mt-12 flex items-center gap-2 text-sm text-[color:var(--cream)]/80">
            <span className="text-[color:var(--gold)]">★★★★★</span>
            <span>+1100 reseñas en Google</span>
          </div>
        </div>
        <a href="#prueba" aria-label="Bajar" className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[color:var(--cream)]/70 hover:text-[color:var(--gold)]">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 5v14m0 0l-6-6m6 6l6-6"/></svg>
        </a>
      </section>

      {/* OPINIONES / TESTIMONIOS */}
      <section id="prueba" className="bg-[color:var(--wine)] py-20 text-[color:var(--cream)] sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-end">
            <div>
              <p className="gold-divider reveal" style={{ color: "var(--gold)" }}>Opiniones</p>
              <h2 className="reveal mt-5 font-serif text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
                4.8 <span className="text-[color:var(--gold)]">★</span> en Google Maps
              </h2>
            </div>
            <p className="reveal text-base leading-relaxed text-[color:var(--cream)]/80">
              Lo que más destacan: la calidez del espacio, la cercanía de los sommeliers y las picadas abundantes.
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
                className="reveal flex flex-col rounded-sm border border-[color:var(--cream)]/10 bg-[color:var(--cream)]/[0.04] p-7 backdrop-blur-sm"
                style={{ transitionDelay: `${i * 80}ms` }}
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
      <section id="experiencia" className="relative overflow-hidden bg-[color:var(--card)] py-24 sm:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2 md:gap-20">
          <div className="reveal order-2 md:order-1">
            <img src={copa.url} alt="Copa de vino servida en Che Malbec" className="aspect-[4/5] w-full rounded-sm object-cover shadow-xl" />
          </div>
          <div className="reveal order-1 md:order-2">
            <p className="gold-divider">La experiencia</p>
            <h2 className="mt-5 text-3xl text-[color:var(--wine)] sm:text-4xl md:text-5xl">
              Mucho más que tomar una copa de vino
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[color:var(--ink)]/80">
              Un espacio creado para disfrutar vinos argentinos, compartir una buena mesa y aprender sobre cada etiqueta en un ambiente relajado.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[color:var(--ink)]/70">
              Entrar a Che Malbec es como descubrir un pequeño rincón porteño donde el tiempo se detiene: maderas cálidas, luz baja y una carta pensada para acompañar cada copa.
            </p>
          </div>
        </div>
      </section>

      {/* DEGUSTACIONES */}
      <section id="degustaciones" className="bg-[color:var(--cream)] py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="gold-divider reveal">Nuestras propuestas</p>
            <h2 className="reveal mt-5 text-3xl text-[color:var(--wine)] sm:text-4xl md:text-5xl">
              Degustaciones para descubrir vinos argentinos
            </h2>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              { t: "Degustaciones guiadas", d: "Vinos seleccionados para descubrir nuevos sabores junto a quien sabe contarlos." },
              { t: "Catas por pasos", d: "Una experiencia pensada para explorar distintas etiquetas, copa por copa." },
              { t: "Maridajes", d: "Combinaciones con picadas, quesos, fiambres y gastronomía casera." },
            ].map((c, i) => (
              <article key={c.t} className="reveal group relative flex flex-col rounded-sm border border-[color:var(--gold)]/40 bg-[color:var(--card)] p-8 transition-all hover:-translate-y-1 hover:border-[color:var(--gold)] hover:shadow-xl" style={{ transitionDelay: `${i * 80}ms` }}>
                <span className="font-serif text-sm italic text-[color:var(--gold)]">0{i + 1}</span>
                <h3 className="mt-3 text-2xl text-[color:var(--wine)]">{c.t}</h3>
                <p className="mt-4 flex-1 text-[color:var(--ink)]/75 leading-relaxed">{c.d}</p>
                <div className="mt-6 h-px w-12 bg-[color:var(--gold)] transition-all group-hover:w-20" />
              </article>
            ))}
          </div>

          <div className="reveal mt-14 text-center">
            <button type="button" onClick={openReserva} className="inline-flex items-center gap-2 rounded-full bg-[color:var(--wine)] px-8 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-[color:var(--cream)] transition-all hover:bg-[color:var(--ink)]">
              <WhatsAppIcon className="h-5 w-5" /> Reservar degustación
            </button>
          </div>
        </div>
      </section>

      {/* CARTA */}
      <section id="carta" className="relative bg-[color:var(--ink)] py-24 text-[color:var(--cream)] sm:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 md:grid-cols-[1.1fr_1fr]">
          <div className="reveal">
            <p className="gold-divider">La carta</p>
            <h2 className="mt-5 font-serif text-3xl sm:text-4xl md:text-5xl">
              Vinos y sabores para compartir
            </h2>
            <p className="mt-6 max-w-md text-[color:var(--cream)]/75 leading-relaxed">
              Una propuesta breve, cuidada y honesta. Ideal para acompañar una copa, una charla larga o una cata por pasos.
            </p>

            <ul className="mt-10 space-y-4">
              {[
                "Vinos argentinos por copa y botella",
                "Etiquetas boutique seleccionadas",
                "Picadas abundantes",
                "Empanadas caseras",
                "Tablas de quesos y fiambres",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 border-b border-[color:var(--cream)]/15 pb-4">
                  <span className="mt-2 h-px w-5 shrink-0 bg-[color:var(--gold)]" />
                  <span className="font-serif text-lg italic text-[color:var(--cream)]/95">{item}</span>
                </li>
              ))}
            </ul>

            <button type="button" onClick={openReserva} className="mt-10 inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)] px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-[color:var(--gold)] transition-colors hover:bg-[color:var(--gold)] hover:text-[color:var(--ink)]">
              Reservar mesa
            </button>
          </div>

          <div className="reveal grid grid-cols-2 gap-4">
            <img src={copaBotella.url} alt="Botella de Malbec argentino con copa Che Malbec" className="col-span-2 aspect-[4/5] w-full rounded-sm object-cover shadow-2xl sm:aspect-[5/4]" />
            <img src={burrata.url} alt="Plato de burrata con jamón crudo y rúcula" className="aspect-square w-full rounded-sm object-cover" />
            <img src={clientes.url} alt="Clientes disfrutando en el salón de Che Malbec" className="aspect-square w-full rounded-sm object-cover" />
          </div>
        </div>
      </section>

      {/* HISTORIA */}
      <section id="historia" className="bg-[color:var(--cream)] py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="gold-divider reveal">Nuestra historia</p>
          <h2 className="reveal mt-5 text-3xl text-[color:var(--wine)] sm:text-4xl md:text-5xl">
            Una pasión convertida en experiencia
          </h2>
          <p className="reveal mt-8 font-serif text-xl italic leading-relaxed text-[color:var(--ink)]/85 sm:text-2xl">
            “Che Malbec nació de la curiosidad por descubrir el mundo del vino y compartir esa pasión con otros.”
          </p>
          <div className="reveal mx-auto mt-8 max-w-2xl space-y-5 text-[color:var(--ink)]/75 leading-relaxed">
            <p>
              Empezó como un hobby — vender vinos para poder probarlos — y creció con un viaje a Italia, donde un pequeño local de barrio nos hizo entender lo que queríamos crear acá.
            </p>
            <p>
              Hoy es un espacio íntimo en pleno Monserrat para disfrutar vinos argentinos, conocer nuevas etiquetas y vivir esos momentos de risas, desconexión y buena mesa.
            </p>
          </div>
        </div>
      </section>

      {/* UBICACIÓN */}
      <section id="ubicacion" className="relative overflow-hidden bg-[color:var(--card)] py-24 sm:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2 md:gap-16">
          <div className="reveal">
            <p className="gold-divider">Visitanos</p>
            <h2 className="mt-5 text-3xl text-[color:var(--wine)] sm:text-4xl md:text-5xl">
              En el corazón de Buenos Aires
            </h2>

            <address className="mt-8 not-italic">
              <p className="font-serif text-2xl text-[color:var(--ink)]">Avenida de Mayo 777</p>
              <p className="text-[color:var(--ink)]/70">Monserrat · CABA, Argentina</p>
            </address>

            <div className="mt-8">
              <h3 className="font-serif text-sm uppercase tracking-[0.18em] text-[color:var(--gold)]">Horarios</h3>
              <dl className="mt-4 divide-y divide-[color:var(--gold)]/30 text-[color:var(--ink)]/85">
                <div className="flex justify-between py-3"><dt>Lunes</dt><dd>11:00 — 19:00</dd></div>
                <div className="flex justify-between py-3"><dt>Martes a sábado</dt><dd>11:00 — 23:00</dd></div>
                <div className="flex justify-between py-3"><dt>Domingo</dt><dd className="text-[color:var(--ink)]/50">Cerrado</dd></div>
              </dl>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href={MAPS_URL} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-[color:var(--wine)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-[color:var(--cream)] hover:bg-[color:var(--ink)]">
                Cómo llegar
              </a>
              <button type="button" onClick={openReserva} className="inline-flex items-center gap-2 rounded-full border border-[color:var(--wine)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-[color:var(--wine)] hover:bg-[color:var(--wine)] hover:text-[color:var(--cream)]">
                <WhatsAppIcon className="h-4 w-4" /> Reservar
              </button>
            </div>
          </div>

          <div className="reveal">
            <div className="overflow-hidden rounded-sm border border-[color:var(--gold)]/40 shadow-xl">
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
          <p className="gold-divider reveal" style={{ color: "var(--gold)" }}>Reservá tu mesa</p>
          <h2 className="reveal mt-5 font-serif text-3xl leading-tight sm:text-5xl md:text-6xl">
            ¿Listo para disfrutar <em className="not-italic text-[color:var(--gold)]">una nueva copa?</em>
          </h2>
          <p className="reveal mt-6 text-lg text-[color:var(--cream)]/85">
            Escribinos y reservá tu lugar. Te esperamos en Av. de Mayo 777.
          </p>
          <button type="button" onClick={openReserva} className="reveal mt-10 inline-flex items-center gap-3 rounded-full bg-[color:var(--gold)] px-10 py-5 text-sm font-semibold uppercase tracking-[0.14em] text-[color:var(--ink)] shadow-2xl transition-all hover:scale-[1.03] hover:bg-[color:var(--cream)]">
            <WhatsAppIcon className="h-5 w-5" /> Reservar tu mesa
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[color:var(--ink)] py-14 text-[color:var(--cream)]/80">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-3">
          <div>
            <img src={logo.url} alt="Che Malbec" className="h-14 w-auto" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[color:var(--cream)]/65">
              Wine bar boutique en Buenos Aires. Vinos argentinos, degustaciones guiadas y picadas para compartir.
            </p>
          </div>
          <div>
            <h4 className="font-serif text-sm uppercase tracking-[0.18em] text-[color:var(--gold)]">Visitanos</h4>
            <p className="mt-4 text-sm">Av. de Mayo 777<br/>Monserrat · CABA</p>
            <p className="mt-3 text-sm text-[color:var(--cream)]/65">Lun 11–19h · Mar–Sáb 11–23h<br/>Dom cerrado</p>
          </div>
          <div>
            <h4 className="font-serif text-sm uppercase tracking-[0.18em] text-[color:var(--gold)]">Contacto</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href={WA_URL} target="_blank" rel="noopener" className="hover:text-[color:var(--gold)]">WhatsApp: +54 9 11 2848-1233</a></li>
              <li><a href="https://instagram.com/che.malbec" target="_blank" rel="noopener" className="hover:text-[color:var(--gold)]">Instagram: @che.malbec</a></li>
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
