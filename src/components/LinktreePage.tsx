import { useState } from "react";
import logo from "@/assets/logo.png";
import {
  Wine,
  MapPin,
  Clock,
  Phone,
  Share2,
  ExternalLink,
  Check,
  Sparkles,
  ChevronRight,
  Bike,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const WA_NUMBER = "5491128481233";

interface LinkButtonConfig {
  id: string;
  emoji: string;
  title: string;
  subtitle?: string;
  url?: string;
  isExternal?: boolean;
  isPrimary?: boolean;
  badge?: string;
  actionType?: "direct" | "modal-reserva" | "modal-delivery";
}

// Configuración de los 8 botones requeridos por el cliente
const LINK_BUTTONS: LinkButtonConfig[] = [
  {
    id: "reserva",
    emoji: "🍷",
    title: "Reservá tu mesa",
    subtitle: "Monserrat (Palacio Vera) · San Telmo",
    actionType: "modal-reserva",
    isPrimary: true,
    badge: "Recomendado",
  },
  {
    id: "eventos",
    emoji: "🎟️",
    title: "Próximos eventos",
    subtitle: "Ferias de vinos boutique, catas y noches temáticas",
    url: `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
      "Hola Che Malbec 👋 Quiero consultar por los próximos eventos, catas guiadas y ferias de vino.",
    )}`,
    isExternal: true,
    actionType: "direct",
  },
  {
    id: "menu",
    emoji: "📖",
    title: "Mirá nuestro menú",
    subtitle: "Carta de vinos boutique seleccionados, tablas y platos",
    url: "https://chemalbec.com/#menu",
    isExternal: true,
    actionType: "direct",
  },
  {
    id: "delivery",
    emoji: "🛵",
    title: "Pedí por delivery",
    subtitle: "Envíos directos por PedidosYa Monserrat y San Telmo",
    actionType: "modal-delivery",
  },
  {
    id: "regalo",
    emoji: "🎁",
    title: "Regalá una experiencia",
    subtitle: "Vouchers de degustación boutique y maridaje",
    url: `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
      "Hola Che Malbec 👋 Quiero consultar para regalar una experiencia o voucher de degustación.",
    )}`,
    isExternal: true,
    actionType: "direct",
  },
  {
    id: "fiestas",
    emoji: "🥂",
    title: "Che Malbec en tu evento",
    subtitle: "Barra boutique de vinos y sommelier en tu fiesta privada",
    url: `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
      "Hola Che Malbec 👋 Quiero consultar por el servicio de 'Llevá Che Malbec a tu fiesta' para un evento privado.",
    )}`,
    isExternal: true,
    actionType: "direct",
  },
  {
    id: "corporativos",
    emoji: "🏢",
    title: "Eventos corporativos",
    subtitle: "After office empresarial, catas privadas y agasajos",
    url: `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
      "Hola Che Malbec 👋 Quiero solicitar información y presupuesto para un evento corporativo de empresa.",
    )}`,
    isExternal: true,
    actionType: "direct",
  },
  {
    id: "franquicias",
    emoji: "🤝",
    title: "Tené tu Che Malbec – Franquicias",
    subtitle: "Modelo de Wine Bar Boutique · Sumate a nuestra red",
    url: `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
      "📌 *[NUEVA CONSULTA DE FRANQUICIAS]*\nHola Che Malbec 👋 Me gustaría recibir más información y el brochure de franquicias.",
    )}`,
    isExternal: true,
    actionType: "direct",
  },
];

const PEDIDOSYA_MONSERRAT_URL =
  "https://www.pedidosya.com.ar/restaurantes/buenos-aires/che-malbec-8df25b0e-e5ed-4c30-b5d4-0e6fb06b8d84-menu?origin=shop_list";
const PEDIDOSYA_SANTELMO_URL =
  "https://www.pedidosya.com.ar/restaurantes/buenos-aires/che-malbec-san-telmo-853f1925-62e0-4640-9fb9-490a1dd52fb6-menu?origin=shop_list";

export function LinktreePage() {
  const [reservaModalOpen, setReservaModalOpen] = useState(false);
  const [deliveryModalOpen, setDeliveryModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url =
      typeof window !== "undefined" ? window.location.href : "https://links.chemalbec.com";
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "Che Malbec — Enlaces Oficiales",
          text: "Reservas, menú, delivery, eventos y franquicias en Che Malbec.",
          url,
        });
        return;
      } catch {
        // Ignorar si el usuario cancela el diálogo nativo
      }
    }

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("¡Enlace copiado al portapapeles!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleButtonClick = (btn: LinkButtonConfig) => {
    if (btn.actionType === "modal-reserva") {
      setReservaModalOpen(true);
      return;
    }
    if (btn.actionType === "modal-delivery") {
      setDeliveryModalOpen(true);
      return;
    }
    if (btn.url) {
      window.open(btn.url, btn.isExternal ? "_blank" : "_self", "noopener,noreferrer");
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[color:var(--cream)] text-[color:var(--ink)] selection:bg-[color:var(--wine)] selection:text-[color:var(--cream)] flex flex-col items-center justify-start px-4 py-8 sm:py-12 overflow-x-hidden">
      {/* Fondo ambiental sutil con luz dorada, característico de Che Malbec */}
      <div
        className="pointer-events-none fixed inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(199, 162, 91, 0.28) 0%, rgba(254, 233, 204, 0.4) 50%, rgba(254, 233, 204, 1) 100%)",
        }}
      />

      {/* Contenedor centralizado estilo Linktree (sin menú ni footer) */}
      <main className="relative z-10 w-full max-w-[480px] flex flex-col items-center">
        {/* Barra superior mínima: solo botón de compartir */}
        <div className="w-full flex justify-end mb-3">
          <button
            onClick={handleShare}
            aria-label="Compartir perfil"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[color:var(--wine)]/10 hover:bg-[color:var(--wine)] text-[color:var(--wine)] hover:text-[color:var(--cream)] border border-[color:var(--gold)]/40 text-xs font-semibold tracking-wide transition-all duration-200 active:scale-95 shadow-xs cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-700" />
                <span className="text-emerald-700 font-bold">¡Copiado!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-[color:var(--gold)]" />
                <span>Compartir</span>
              </>
            )}
          </button>
        </div>

        {/* Cabecera / Identidad de Marca Che Malbec */}
        <header className="flex flex-col items-center text-center mb-6">
          <div className="relative">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-[#fffdfa] border-2 border-[color:var(--gold)] shadow-[0_8px_20px_-6px_rgba(107,63,46,0.25)] p-2 flex items-center justify-center transition-transform duration-300 hover:scale-105">
              <img
                src={logo}
                alt="Logo Che Malbec"
                className="w-full h-full object-contain filter drop-shadow-xs"
              />
            </div>
          </div>

          <p className="gold-divider mt-4 text-[11px] uppercase tracking-widest text-[color:var(--gold)] font-medium">
            Wine Bar Boutique
          </p>

          <h1 className="mt-1 font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[color:var(--wine)] flex items-center gap-1.5">
            Che Malbec
            <Sparkles className="w-4 h-4 text-[color:var(--gold)] fill-[color:var(--gold)]" />
          </h1>

          <p className="mt-1 text-xs sm:text-sm text-[color:var(--ink)]/80 font-medium max-w-xs leading-snug">
            Catas guiadas por sommeliers, vinos boutique y picadas en Buenos Aires
          </p>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1 rounded-full border border-[color:var(--gold)]/40 bg-[color:var(--wine)]/10 px-3 py-1 font-semibold text-[color:var(--wine)] shadow-2xs">
              <MapPin className="w-3 h-3 text-[color:var(--gold)]" />
              Monserrat (Palacio Vera)
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-[color:var(--gold)]/40 bg-[color:var(--wine)]/10 px-3 py-1 font-semibold text-[color:var(--wine)] shadow-2xs">
              <MapPin className="w-3 h-3 text-[color:var(--gold)]" />
              San Telmo
            </span>
          </div>
        </header>

        {/* Lista de Botones Linktree */}
        <nav aria-label="Enlaces rápidos" className="w-full space-y-3">
          {LINK_BUTTONS.map((btn) => {
            const isPrimary = btn.isPrimary;
            return (
              <button
                key={btn.id}
                onClick={() => handleButtonClick(btn)}
                className={`group relative w-full text-left p-4 rounded-xl transition-all duration-300 flex items-center justify-between cursor-pointer btn-tactile ${
                  isPrimary
                    ? "bg-[color:var(--wine)] text-[color:var(--cream)] border-2 border-[color:var(--gold)] shadow-[0_10px_24px_-8px_rgba(107,63,46,0.35)] hover:shadow-[0_14px_28px_-6px_rgba(107,63,46,0.45)]"
                    : "bg-[#fffdf9] hover:bg-white text-[color:var(--ink)] border border-[color:var(--gold)]/40 hover:border-[color:var(--gold)] shadow-xs hover:shadow-md"
                }`}
              >
                {/* Badge opcional de recomendación */}
                {btn.badge && (
                  <span className="absolute -top-2.5 right-4 bg-[color:var(--gold)] text-[color:var(--ink)] text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
                    {btn.badge}
                  </span>
                )}

                <div className="flex items-center gap-3.5 min-w-0 pr-2">
                  <div
                    className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 text-xl transition-transform duration-300 group-hover:scale-110 shadow-2xs ${
                      isPrimary
                        ? "bg-[color:var(--cream)]/15 border border-[color:var(--gold)]/40 text-[color:var(--gold)]"
                        : "bg-[color:var(--wine)]/10 border border-[color:var(--gold)]/30 text-[color:var(--wine)]"
                    }`}
                  >
                    <span>{btn.emoji}</span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <h2
                      className={`font-semibold text-[15px] sm:text-[16px] leading-tight transition-colors ${
                        isPrimary
                          ? "text-[color:var(--cream)]"
                          : "text-[color:var(--ink)] group-hover:text-[color:var(--wine)]"
                      }`}
                    >
                      {btn.title}
                    </h2>
                    {btn.subtitle && (
                      <p
                        className={`text-xs mt-0.5 line-clamp-1 ${
                          isPrimary ? "text-[color:var(--cream)]/85" : "text-[color:var(--ink)]/65"
                        }`}
                      >
                        {btn.subtitle}
                      </p>
                    )}
                  </div>
                </div>

                <div
                  className={`shrink-0 pl-1 transition-transform duration-300 group-hover:translate-x-1 ${
                    isPrimary
                      ? "text-[color:var(--gold)]"
                      : "text-[color:var(--wine)]/60 group-hover:text-[color:var(--wine)]"
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </div>
              </button>
            );
          })}
        </nav>

        {/* Canales Oficiales / Redes Sociales (sin footer de texto) */}
        <div className="mt-8 mb-4 w-full flex items-center justify-center gap-3">
          <a
            href="https://www.instagram.com/che.malbec/"
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram Monserrat"
            className="w-10 h-10 rounded-full bg-[#fffdf9] border border-[color:var(--gold)]/40 flex items-center justify-center text-[color:var(--wine)] hover:bg-[color:var(--wine)] hover:text-[color:var(--cream)] transition-all duration-200 hover:scale-110 shadow-xs"
          >
            <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>

          <a
            href="https://www.instagram.com/che.malbec.santelmo/"
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram San Telmo"
            className="w-10 h-10 rounded-full bg-[#fffdf9] border border-[color:var(--gold)]/40 flex items-center justify-center text-[color:var(--wine)] hover:bg-[color:var(--wine)] hover:text-[color:var(--cream)] transition-all duration-200 hover:scale-110 shadow-xs"
          >
            <span className="text-[11px] font-bold">ST</span>
          </a>

          <a
            href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
              "Hola Che Malbec 👋 Me contacto desde la página de enlaces oficiales.",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            title="WhatsApp Oficial"
            className="w-10 h-10 rounded-full bg-[#fffdf9] border border-[color:var(--gold)]/40 flex items-center justify-center text-[color:var(--wine)] hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all duration-200 hover:scale-110 shadow-xs"
          >
            <Phone className="w-4.5 h-4.5" />
          </a>

          <a
            href="https://chemalbec.com"
            target="_blank"
            rel="noopener noreferrer"
            title="Sitio Web Oficial"
            className="w-10 h-10 rounded-full bg-[#fffdf9] border border-[color:var(--gold)]/40 flex items-center justify-center text-[color:var(--wine)] hover:bg-[color:var(--wine)] hover:text-[color:var(--cream)] transition-all duration-200 hover:scale-110 shadow-xs"
          >
            <ExternalLink className="w-4.5 h-4.5" />
          </a>
        </div>
      </main>

      {/* Modal / Selector de Sucursal para RESERVAS (Look & Feel Che Malbec) */}
      <Dialog open={reservaModalOpen} onOpenChange={setReservaModalOpen}>
        <DialogContent className="bg-[color:var(--cream)] border-2 border-[color:var(--gold)]/50 text-[color:var(--ink)] max-w-md w-[92vw] sm:w-full rounded-2xl p-6 shadow-2xl">
          <DialogHeader className="text-left space-y-1">
            <p className="gold-divider text-[10px] uppercase tracking-wider text-[color:var(--gold)]">
              Reserva Directa
            </p>
            <DialogTitle className="font-serif text-xl font-bold text-[color:var(--wine)] flex items-center gap-2">
              <Wine className="w-5 h-5 text-[color:var(--gold)]" />
              ¿En qué sucursal querés reservar?
            </DialogTitle>
            <DialogDescription className="text-xs text-[color:var(--ink)]/75">
              Elegí la sede de Che Malbec para comunicarte directamente por WhatsApp con nuestro
              equipo.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-3">
            {/* Opción Monserrat */}
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
                "Hola Che Malbec 👋 Quiero consultar disponibilidad y reservar una mesa en la sede Monserrat (Palacio Vera - Av. de Mayo 777).",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setReservaModalOpen(false)}
              className="group flex items-start gap-3.5 p-4 rounded-xl bg-[#fffdf9] hover:bg-white border border-[color:var(--gold)]/40 hover:border-[color:var(--gold)] transition-all shadow-xs"
            >
              <div className="w-9 h-9 rounded-lg bg-[color:var(--wine)]/10 border border-[color:var(--gold)]/30 flex items-center justify-center shrink-0 text-[color:var(--wine)]">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm text-[color:var(--wine)]">
                    Monserrat · Histórico Palacio Vera
                  </h3>
                  <ChevronRight className="w-4 h-4 text-[color:var(--gold)] group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-xs text-[color:var(--ink)]/70 mt-0.5">
                  Avenida de Mayo 777 · CABA
                </p>
                <div className="mt-1 flex items-center gap-1.5 text-[11px] text-[color:var(--ink)]/80">
                  <Clock className="w-3 h-3 text-[color:var(--gold)]" />
                  <span>Lun: 11—19 hs | Mar a Sáb: 11—23 hs</span>
                </div>
              </div>
            </a>

            {/* Opción San Telmo */}
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
                "Hola Che Malbec 👋 Quiero consultar disponibilidad y reservar una mesa en la sede San Telmo (Estados Unidos 407).",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setReservaModalOpen(false)}
              className="group flex items-start gap-3.5 p-4 rounded-xl bg-[#fffdf9] hover:bg-white border border-[color:var(--gold)]/40 hover:border-[color:var(--gold)] transition-all shadow-xs"
            >
              <div className="w-9 h-9 rounded-lg bg-[color:var(--wine)]/10 border border-[color:var(--gold)]/30 flex items-center justify-center shrink-0 text-[color:var(--wine)]">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm text-[color:var(--wine)]">
                    San Telmo · Casco Histórico
                  </h3>
                  <ChevronRight className="w-4 h-4 text-[color:var(--gold)] group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-xs text-[color:var(--ink)]/70 mt-0.5">
                  Estados Unidos 407 · CABA
                </p>
                <div className="mt-1 flex items-center gap-1.5 text-[11px] text-[color:var(--ink)]/80">
                  <Clock className="w-3 h-3 text-[color:var(--gold)]" />
                  <span>Mar a Sáb: 18—00 hs</span>
                </div>
              </div>
            </a>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal / Selector de Sucursal para DELIVERY (Look & Feel Che Malbec) */}
      <Dialog open={deliveryModalOpen} onOpenChange={setDeliveryModalOpen}>
        <DialogContent className="bg-[color:var(--cream)] border-2 border-[color:var(--gold)]/50 text-[color:var(--ink)] max-w-md w-[92vw] sm:w-full rounded-2xl p-6 shadow-2xl">
          <DialogHeader className="text-left space-y-1">
            <p className="gold-divider text-[10px] uppercase tracking-wider text-[color:var(--gold)]">
              Delivery Oficial
            </p>
            <DialogTitle className="font-serif text-xl font-bold text-[color:var(--wine)] flex items-center gap-2">
              <Bike className="w-5 h-5 text-[color:var(--gold)]" />
              Pedir por Delivery en PedidosYa
            </DialogTitle>
            <DialogDescription className="text-xs text-[color:var(--ink)]/75">
              Elegí la sede más cercana a tu ubicación para pedir platos, picadas y vinos boutique.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-3">
            <a
              href={PEDIDOSYA_MONSERRAT_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setDeliveryModalOpen(false)}
              className="group flex items-center justify-between p-4 rounded-xl bg-[#fffdf9] hover:bg-white border border-[color:var(--gold)]/40 hover:border-[color:var(--gold)] transition-all shadow-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[color:var(--wine)]/10 border border-[color:var(--gold)]/30 flex items-center justify-center text-[color:var(--wine)]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-[color:var(--wine)]">
                    Sede Monserrat · Palacio Vera
                  </h3>
                  <p className="text-xs text-[color:var(--ink)]/70 mt-0.5">
                    Av. de Mayo 777 y alrededores
                  </p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-[color:var(--gold)] group-hover:translate-x-0.5 transition-transform" />
            </a>

            <a
              href={PEDIDOSYA_SANTELMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setDeliveryModalOpen(false)}
              className="group flex items-center justify-between p-4 rounded-xl bg-[#fffdf9] hover:bg-white border border-[color:var(--gold)]/40 hover:border-[color:var(--gold)] transition-all shadow-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[color:var(--wine)]/10 border border-[color:var(--gold)]/30 flex items-center justify-center text-[color:var(--wine)]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-[color:var(--wine)]">
                    Sede San Telmo · Casco Histórico
                  </h3>
                  <p className="text-xs text-[color:var(--ink)]/70 mt-0.5">
                    Estados Unidos 407 y alrededores
                  </p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-[color:var(--gold)] group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
