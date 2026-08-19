import { useState, useEffect, useMemo } from "react";
import { format, addDays, startOfDay, isBefore, isAfter, isSameDay } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon, Wine, CheckCircle2, Sparkles, MapPin } from "lucide-react";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const WA_NUMBER = "5491128481233";

const MONSERRAT_WEEKDAY_SLOTS = [
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
];

const MONSERRAT_MONDAY_SLOTS = [
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
];

const SANTELMO_SLOTS = [
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
];

const schema = z.object({
  sucursal: z.string().min(1, "Elegí la sucursal"),
  nombre: z
    .string()
    .trim()
    .min(1, "Ingresá tu nombre")
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(60, "El nombre no puede superar los 60 caracteres"),
  comensales: z
    .number({
      invalid_type_error: "Ingresá el número de comensales",
    })
    .int("El número de comensales debe ser un entero")
    .min(1, "Ingresá al menos 1 comensal")
    .max(12, "El máximo de comensales por reserva es 12"),
  fecha: z
    .date({
      required_error: "Elegí una fecha para tu reserva",
      invalid_type_error: "Elegí una fecha para tu reserva",
    })
    .refine((d) => !isBefore(startOfDay(d), startOfDay(new Date())), {
      message: "La fecha no puede ser en el pasado",
    }),
  hora: z.string().min(1, "Elegí un horario para tu reserva"),
  notas: z.string().trim().max(200, "Las notas no pueden superar los 200 caracteres").optional(),
});

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultSucursal?: string;
}

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

export function ReservationDialog({ open, onOpenChange, defaultSucursal }: Props) {
  const [sucursal, setSucursal] = useState(
    defaultSucursal || "Monserrat (Palacio Vera - Av. de Mayo 777)",
  );
  const [nombre, setNombre] = useState("");
  const [comensales, setComensales] = useState<string>("2");
  const [fecha, setFecha] = useState<Date | undefined>();
  const [hora, setHora] = useState("");
  const [notas, setNotas] = useState("");
  const [calendarOpen, setCalendarOpen] = useState(false);

  const isSanTelmo = sucursal.includes("San Telmo");

  // Handle branch change: if date is Monday and branch is San Telmo, reset date
  const handleSucursalChange = (val: string) => {
    setSucursal(val);
    if (val.includes("San Telmo") && fecha && fecha.getDay() === 1) {
      setFecha(undefined);
      setHora("");
      toast.info("San Telmo permanece cerrado los domingos y lunes.");
    }
  };

  // Animated confirmation state
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [pendingUrl, setPendingUrl] = useState<string | null>(null);
  const [reservationSummary, setReservationSummary] = useState<{
    sucursal: string;
    nombre: string;
    comensales: number;
    fechaTxt: string;
    hora: string;
    notas?: string;
  } | null>(null);

  // Reset state on modal close
  useEffect(() => {
    if (!open) {
      setSucursal(defaultSucursal || "Monserrat (Palacio Vera - Av. de Mayo 777)");
      setNombre("");
      setComensales("2");
      setFecha(undefined);
      setHora("");
      setNotas("");
      setCalendarOpen(false);
      setIsSubmitted(false);
      setPendingUrl(null);
      setReservationSummary(null);
    } else if (defaultSucursal) {
      setSucursal(defaultSucursal);
    }
  }, [open, defaultSucursal]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const today = useMemo(() => startOfDay(new Date()), [open]);
  const maxDate = useMemo(() => addDays(today, 7), [today]);

  const isToday = useMemo(() => {
    return fecha ? isSameDay(fecha, new Date()) : false;
  }, [fecha]);

  const rawAvailableSlots = useMemo(() => {
    if (!fecha) return [];
    if (isSanTelmo) {
      return SANTELMO_SLOTS;
    }
    // Monserrat
    if (fecha.getDay() === 1) {
      return MONSERRAT_MONDAY_SLOTS;
    }
    return MONSERRAT_WEEKDAY_SLOTS;
  }, [fecha, isSanTelmo]);

  const filteredTimeSlots = useMemo(() => {
    if (!fecha) return [];
    if (!isToday) return rawAvailableSlots;
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
    const nowInMinutes = currentHours * 60 + currentMinutes;
    return rawAvailableSlots.filter((slot) => {
      const [hoursStr, minutesStr] = slot.split(":");
      const slotHours = parseInt(hoursStr, 10);
      const slotMinutes = parseInt(minutesStr, 10);
      const slotInMinutes = slotHours * 60 + slotMinutes;
      return slotInMinutes > nowInMinutes + 15; // 15-minute buffer
    });
  }, [fecha, isToday, rawAvailableSlots]);

  useEffect(() => {
    if (hora && !filteredTimeSlots.includes(hora)) {
      setHora("");
    }
  }, [filteredTimeSlots, hora]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fecha && isToday && filteredTimeSlots.length === 0) {
      toast.error("No hay turnos disponibles para hoy. Por favor elegí otra fecha.");
      return;
    }
    const parsed = schema.safeParse({
      sucursal,
      nombre,
      comensales: Number(comensales),
      fecha,
      hora,
      notas: notas || undefined,
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Revisá los datos");
      return;
    }
    const d = parsed.data;
    const fechaRaw = format(d.fecha, "EEEE d 'de' MMMM", { locale: es });
    const fechaTxt = fechaRaw.charAt(0).toUpperCase() + fechaRaw.slice(1);
    const comensalesTxt = `${d.comensales} ${d.comensales === 1 ? "persona" : "personas"}`;
    const lines = [
      "Hola Che Malbec 👋 Quiero reservar una mesa:",
      "",
      `📍 *Sucursal:* ${d.sucursal}`,
      `👤 *Nombre:* ${d.nombre}`,
      `👥 *Comensales:* ${comensalesTxt}`,
      `📅 *Fecha:* ${fechaTxt}`,
      `⏰ *Horario:* ${d.hora} hs`,
    ];
    if (d.notas) lines.push(`📝 *Notas:* ${d.notas}`);
    lines.push("", "¡Gracias!");
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;

    setPendingUrl(url);
    setReservationSummary({
      sucursal: d.sucursal,
      nombre: d.nombre,
      comensales: d.comensales,
      fechaTxt,
      hora: d.hora,
      notas: d.notas,
    });
    setIsSubmitted(true);

    // Direct user action: attempt immediate open synchronously while user gesture is active
    try {
      window.open(url, "_blank", "noopener,noreferrer");
    } catch {
      // Fallback is handled by the prominent button on the confirmation screen
    }
    toast.success("¡Reserva preparada! Hacé clic en enviar para abrir WhatsApp 🍷");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90dvh] overflow-y-auto bg-[color:var(--cream)] text-[color:var(--ink)] border-[color:var(--gold)]/40 p-5 sm:p-6">
        {isSubmitted && reservationSummary && pendingUrl ? (
          <div className="py-3 px-1 flex flex-col items-center justify-center text-center animate-in fade-in-0 zoom-in-95 duration-300">
            {/* Animated Wine Glass Container */}
            <div className="relative mb-3 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-[color:var(--wine)]/20 animate-ping opacity-60" />
              <div className="relative flex h-16 w-16 sm:h-18 sm:w-18 items-center justify-center rounded-full bg-gradient-to-br from-[color:var(--wine)] to-[color:var(--ink)] text-[color:var(--cream)] shadow-xl shadow-[color:var(--wine)]/30 border border-[color:var(--gold)]/60 animate-wine-glow">
                <Wine
                  className="h-8 w-8 text-[color:var(--gold)] animate-bounce"
                  style={{ animationDuration: "1.6s" }}
                />
                <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#25D366] text-white shadow-md border-2 border-[color:var(--cream)]">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>

            {/* Header & Subtitle */}
            <p className="gold-divider mb-1 text-xs" style={{ color: "var(--gold)" }}>
              Reserva Preparada
            </p>
            <DialogTitle className="font-serif text-2xl font-bold text-[color:var(--wine)] sm:text-3xl">
              ¡Tu reserva está lista! 🍷
            </DialogTitle>
            <DialogDescription className="mt-1 text-xs sm:text-sm text-[color:var(--ink)]/80 max-w-xs leading-relaxed">
              Hacé clic en el botón verde abajo para abrir WhatsApp con el mensaje estructurado de tu reserva.
            </DialogDescription>

            {/* Reservation Summary Box */}
            <div className="mt-3.5 w-full rounded-lg border border-[color:var(--gold)]/30 bg-[color:var(--card)] p-3.5 sm:p-4 text-left shadow-xs space-y-2">
              <p className="text-[11px] uppercase tracking-wider text-[color:var(--gold)] font-semibold flex items-center gap-1.5 border-b border-[color:var(--gold)]/20 pb-1.5">
                <Sparkles className="h-3.5 w-3.5" /> Detalle de tu mesa
              </p>
              <div className="space-y-1.5 text-xs text-[color:var(--ink)]">
                <div className="pb-1 border-b border-[color:var(--gold)]/10">
                  <span className="text-[color:var(--ink)]/60 block text-[10px] uppercase tracking-wider">
                    Sucursal
                  </span>
                  <span className="font-semibold text-[color:var(--wine)] block text-xs sm:text-sm">
                    {reservationSummary.sucursal}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-0.5">
                  <div>
                    <span className="text-[color:var(--ink)]/60 block text-[10px] uppercase tracking-wider">
                      Nombre
                    </span>
                    <span className="font-semibold truncate block">
                      {reservationSummary.nombre}
                    </span>
                  </div>
                  <div>
                    <span className="text-[color:var(--ink)]/60 block text-[10px] uppercase tracking-wider">
                      Comensales
                    </span>
                    <span className="font-semibold">
                      {reservationSummary.comensales}{" "}
                      {reservationSummary.comensales === 1 ? "persona" : "personas"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[color:var(--ink)]/60 block text-[10px] uppercase tracking-wider">
                      Fecha
                    </span>
                    <span className="font-semibold capitalize">{reservationSummary.fechaTxt}</span>
                  </div>
                  <div>
                    <span className="text-[color:var(--ink)]/60 block text-[10px] uppercase tracking-wider">
                      Horario
                    </span>
                    <span className="font-semibold">{reservationSummary.hora} hs</span>
                  </div>
                </div>
              </div>
              {reservationSummary.notas && (
                <div className="pt-1.5 border-t border-[color:var(--gold)]/15 text-xs text-[color:var(--ink)]">
                  <span className="text-[color:var(--ink)]/60 block text-[10px] uppercase tracking-wider">
                    Notas
                  </span>
                  <span className="italic text-[color:var(--ink)]/90 break-words">
                    {reservationSummary.notas}
                  </span>
                </div>
              )}
            </div>

            {/* Primary WhatsApp Action Button */}
            <div className="mt-4 w-full space-y-2.5">
              <a
                id="reserva-confirmar-wa-btn"
                href={pendingUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  toast.success("Abriendo WhatsApp de Che Malbec 🍷");
                }}
                className="btn-tactile inline-flex w-full min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#25D366] py-3.5 px-4 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white shadow-xl hover:bg-[#20bd5a] transition-all cursor-pointer"
              >
                <WhatsAppIcon className="h-5 w-5" /> Enviar por WhatsApp
              </a>

              <div className="flex items-center justify-between pt-1">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs text-[color:var(--wine)] hover:underline cursor-pointer min-h-[36px] px-2"
                >
                  Modificar datos
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => onOpenChange(false)}
                  className="text-xs text-[color:var(--ink)]/70 hover:text-[color:var(--ink)] cursor-pointer min-h-[36px] px-2"
                >
                  Cerrar
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader className="space-y-1">
              <p className="gold-divider text-xs" style={{ color: "var(--gold)" }}>
                Reservá tu mesa
              </p>
              <DialogTitle className="font-serif text-2xl sm:text-3xl text-[color:var(--wine)]">
                Pedí tu reserva
              </DialogTitle>
              <DialogDescription className="text-xs sm:text-sm text-[color:var(--ink)]/70">
                Completá los datos y confirmamos por WhatsApp. Disponibilidad hasta 7 días.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 pt-1">
              {/* Selector de Sucursal */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="reserva-sucursal-trigger"
                  className="text-xs font-semibold uppercase tracking-wider text-[color:var(--wine)] flex items-center gap-1.5"
                >
                  <MapPin className="h-3.5 w-3.5 text-[color:var(--gold)]" /> Elegí la Sucursal *
                </Label>
                <Select value={sucursal} onValueChange={handleSucursalChange}>
                  <SelectTrigger
                    id="reserva-sucursal-trigger"
                    className="min-h-[44px] border-[color:var(--gold)]/40 bg-[color:var(--card)] focus:ring-[color:var(--wine)] text-xs sm:text-sm"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[color:var(--card)] border-[color:var(--gold)]/30">
                    <SelectItem value="Monserrat (Palacio Vera - Av. de Mayo 777)">
                      Monserrat · Palacio Vera (Av. de Mayo 777)
                    </SelectItem>
                    <SelectItem value="San Telmo (Estados Unidos 407)">
                      San Telmo (Estados Unidos 407)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="reserva-nombre"
                  className="text-xs font-semibold uppercase tracking-wider text-[color:var(--wine)]"
                >
                  Tu nombre *
                </Label>
                <Input
                  id="reserva-nombre"
                  type="text"
                  inputMode="text"
                  autoComplete="name"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej. Mariana López"
                  maxLength={60}
                  className="min-h-[44px] text-xs sm:text-sm border-[color:var(--gold)]/40 bg-[color:var(--card)]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="reserva-comensales-trigger"
                    className="text-xs font-semibold uppercase tracking-wider text-[color:var(--wine)]"
                  >
                    Comensales *
                  </Label>
                  <Select value={comensales} onValueChange={setComensales}>
                    <SelectTrigger
                      id="reserva-comensales-trigger"
                      className="min-h-[44px] text-xs sm:text-sm border-[color:var(--gold)]/40 bg-[color:var(--card)]"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[color:var(--card)] border-[color:var(--gold)]/30">
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                        <SelectItem key={n} value={String(n)}>
                          {n} {n === 1 ? "persona" : "personas"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="reserva-hora-trigger"
                    className="text-xs font-semibold uppercase tracking-wider text-[color:var(--wine)]"
                  >
                    Horario *
                  </Label>
                  <Select
                    value={hora}
                    onValueChange={setHora}
                    disabled={!fecha || filteredTimeSlots.length === 0}
                  >
                    <SelectTrigger
                      id="reserva-hora-trigger"
                      className="min-h-[44px] text-xs sm:text-sm border-[color:var(--gold)]/40 bg-[color:var(--card)]"
                    >
                      <SelectValue
                        placeholder={
                          !fecha
                            ? "Elegí fecha primero"
                            : filteredTimeSlots.length === 0
                              ? "Sin turnos hoy"
                              : "Elegí horario"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-[color:var(--card)] border-[color:var(--gold)]/30">
                      {filteredTimeSlots.map((h) => (
                        <SelectItem key={h} value={h}>
                          {h} hs
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="reserva-fecha-btn"
                  className="text-xs font-semibold uppercase tracking-wider text-[color:var(--wine)]"
                >
                  Fecha *
                </Label>
                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      id="reserva-fecha-btn"
                      type="button"
                      variant="outline"
                      className={cn(
                        "btn-tactile min-h-[44px] w-full justify-start text-left font-normal border-[color:var(--gold)]/40 bg-[color:var(--card)] text-xs sm:text-sm",
                        !fecha && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-[color:var(--gold)]" />
                      {fecha
                        ? format(fecha, "EEEE d 'de' MMMM", { locale: es })
                            .charAt(0)
                            .toUpperCase() +
                          format(fecha, "EEEE d 'de' MMMM", { locale: es }).slice(1)
                        : "Elegí una fecha"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 pointer-events-auto max-w-[calc(100vw-2rem)] bg-[color:var(--card)] border-[color:var(--gold)]/40 shadow-xl"
                    align="center"
                  >
                    <Calendar
                      mode="single"
                      selected={fecha}
                      onSelect={(d) => {
                        setFecha(d);
                        setCalendarOpen(false);
                      }}
                      disabled={(d) => {
                        const dayStart = startOfDay(d);
                        const isSunday = d.getDay() === 0;
                        const isMondayAndSanTelmo = isSanTelmo && d.getDay() === 1;
                        return (
                          isBefore(dayStart, today) ||
                          isAfter(dayStart, maxDate) ||
                          isSunday ||
                          isMondayAndSanTelmo
                        );
                      }}
                      initialFocus
                      locale={es}
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <p className="text-[11px] text-[color:var(--ink)]/65 leading-tight">
                  {isSanTelmo
                    ? "San Telmo: abierto Mar a Sáb 18-00h (Dom y Lun cerrado)"
                    : "Monserrat: abierto Lun 11-19h y Mar a Sáb 11-23h (Dom cerrado)"}
                </p>
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="reserva-notas"
                  className="text-xs font-semibold uppercase tracking-wider text-[color:var(--wine)]"
                >
                  Notas (opcional)
                </Label>
                <Input
                  id="reserva-notas"
                  type="text"
                  inputMode="text"
                  autoComplete="off"
                  value={notas}
                  onChange={(e) => setNotas(e.target.value)}
                  placeholder="Cumpleaños, alergias, etc."
                  maxLength={200}
                  className="min-h-[44px] text-xs sm:text-sm border-[color:var(--gold)]/40 bg-[color:var(--card)]"
                />
              </div>

              <Button
                id="reserva-submit-btn"
                type="submit"
                className="btn-tactile w-full min-h-[48px] rounded-full bg-[color:var(--wine)] py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] text-[color:var(--cream)] cursor-pointer shadow-lg hover:bg-[color:var(--wine)]/90"
              >
                Confirmar por WhatsApp
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
