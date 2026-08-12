import { useState, useEffect, useMemo } from "react";
import { format, addDays, startOfDay, isBefore, isAfter, isSameDay } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon, Wine, CheckCircle2, Sparkles } from "lucide-react";
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

const TIME_SLOTS = [
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

const schema = z.object({
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
    .refine((d) => d.getDay() !== 0, {
      message: "Los domingos el local permanece cerrado",
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
}

export function ReservationDialog({ open, onOpenChange }: Props) {
  const [nombre, setNombre] = useState("");
  const [comensales, setComensales] = useState<string>("2");
  const [fecha, setFecha] = useState<Date | undefined>();
  const [hora, setHora] = useState("");
  const [notas, setNotas] = useState("");
  const [calendarOpen, setCalendarOpen] = useState(false);

  // Animated confirmation state
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [pendingUrl, setPendingUrl] = useState<string | null>(null);
  const [reservationSummary, setReservationSummary] = useState<{
    nombre: string;
    comensales: number;
    fechaTxt: string;
    hora: string;
    notas?: string;
  } | null>(null);

  // Reset state on modal close
  useEffect(() => {
    if (!open) {
      setNombre("");
      setComensales("2");
      setFecha(undefined);
      setHora("");
      setNotas("");
      setCalendarOpen(false);
      setIsSubmitted(false);
      setPendingUrl(null);
      setReservationSummary(null);
    }
  }, [open]);

  // Handle confirmation timer and redirect
  useEffect(() => {
    if (!isSubmitted || !pendingUrl) return;

    const timer = setTimeout(() => {
      window.open(pendingUrl, "_blank", "noopener,noreferrer");
      toast.success("Te llevamos a WhatsApp para confirmar 🍷");
      setIsSubmitted(false);
      setPendingUrl(null);
      setReservationSummary(null);
      setNombre("");
      setComensales("2");
      setFecha(undefined);
      setHora("");
      setNotas("");
      onOpenChange(false);
    }, 2700);

    return () => clearTimeout(timer);
  }, [isSubmitted, pendingUrl, onOpenChange]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const today = useMemo(() => startOfDay(new Date()), [open]);
  const maxDate = useMemo(() => addDays(today, 7), [today]);

  const isToday = useMemo(() => {
    return fecha ? isSameDay(fecha, new Date()) : false;
  }, [fecha]);

  const filteredTimeSlots = useMemo(() => {
    if (!fecha) return [];
    if (!isToday) return TIME_SLOTS;
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
    const nowInMinutes = currentHours * 60 + currentMinutes;
    return TIME_SLOTS.filter((slot) => {
      const [hoursStr, minutesStr] = slot.split(":");
      const slotHours = parseInt(hoursStr, 10);
      const slotMinutes = parseInt(minutesStr, 10);
      const slotInMinutes = slotHours * 60 + slotMinutes;
      return slotInMinutes > nowInMinutes + 15; // 15-minute buffer
    });
  }, [fecha, isToday]);

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
    const lines = [
      "Hola Che Malbec 👋 Quiero reservar una mesa:",
      "",
      `• Nombre: ${d.nombre}`,
      `• Comensales: ${d.comensales}`,
      `• Fecha: ${fechaTxt}`,
      `• Horario: ${d.hora} hs`,
    ];
    if (d.notas) lines.push(`• Notas: ${d.notas}`);
    lines.push("", "¡Gracias!");
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;

    setPendingUrl(url);
    setReservationSummary({
      nombre: d.nombre,
      comensales: d.comensales,
      fechaTxt,
      hora: d.hora,
      notas: d.notas,
    });
    setIsSubmitted(true);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-[color:var(--cream)] text-[color:var(--ink)] border-[color:var(--gold)]/40 overflow-hidden">
        {isSubmitted && reservationSummary ? (
          <div className="py-4 px-1 flex flex-col items-center justify-center text-center animate-in fade-in-0 zoom-in-95 duration-300">
            {/* Animated Wine Glass Container */}
            <div className="relative mb-5 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-[color:var(--wine)]/20 animate-ping opacity-60" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[color:var(--wine)] to-[color:var(--ink)] text-[color:var(--cream)] shadow-xl shadow-[color:var(--wine)]/30 border border-[color:var(--gold)]/60 animate-wine-glow">
                <Wine
                  className="h-9 w-9 text-[color:var(--gold)] animate-bounce"
                  style={{ animationDuration: "1.6s" }}
                />
                <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-white shadow-md border-2 border-[color:var(--cream)]">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
              </div>
            </div>

            {/* Header & Subtitle */}
            <p className="gold-divider mb-1.5" style={{ color: "var(--gold)" }}>
              Reserva Confirmada
            </p>
            <DialogTitle className="font-serif text-2xl font-bold text-[color:var(--wine)] sm:text-3xl">
              ¡Reserva lista! 🍷
            </DialogTitle>
            <DialogDescription className="mt-1.5 text-sm text-[color:var(--ink)]/80 max-w-xs leading-relaxed">
              Redirigiendo a WhatsApp para enviar los detalles de tu mesa...
            </DialogDescription>

            {/* Reservation Summary Box */}
            <div className="mt-5 w-full rounded-lg border border-[color:var(--gold)]/30 bg-[color:var(--card)] p-4 text-left shadow-xs space-y-2">
              <p className="text-[11px] uppercase tracking-wider text-[color:var(--gold)] font-semibold flex items-center gap-1.5 border-b border-[color:var(--gold)]/20 pb-1.5">
                <Sparkles className="h-3.5 w-3.5" /> Detalle de tu mesa
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs text-[color:var(--ink)]">
                <div>
                  <span className="text-[color:var(--ink)]/60 block text-[10px] uppercase tracking-wider">
                    Nombre
                  </span>
                  <span className="font-semibold truncate block">{reservationSummary.nombre}</span>
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
              {reservationSummary.notas && (
                <div className="pt-1.5 border-t border-[color:var(--gold)]/15 text-xs text-[color:var(--ink)]">
                  <span className="text-[color:var(--ink)]/60 block text-[10px] uppercase tracking-wider">
                    Notas
                  </span>
                  <span className="italic text-[color:var(--ink)]/90">
                    {reservationSummary.notas}
                  </span>
                </div>
              )}
            </div>

            {/* Wine Animated Progress Bar */}
            <div className="mt-5 w-full space-y-1.5">
              <div className="h-2 w-full overflow-hidden rounded-full bg-[color:var(--wine)]/15 p-0.5">
                <div className="h-full rounded-full bg-gradient-to-r from-[color:var(--wine)] via-[color:var(--gold)] to-[color:var(--wine)] animate-wine-progress" />
              </div>
              <p className="text-[11px] text-[color:var(--ink)]/60 italic">
                Abrí la ventana de WhatsApp que se iniciará en unos segundos...
              </p>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader>
              <p className="gold-divider" style={{ color: "var(--gold)" }}>
                Reservá tu mesa
              </p>
              <DialogTitle className="font-serif text-3xl text-[color:var(--wine)]">
                Pedí tu reserva
              </DialogTitle>
              <DialogDescription className="text-[color:var(--ink)]/70">
                Completá los datos y confirmamos por WhatsApp. Disponibilidad hasta 7 días.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reserva-nombre">Tu nombre</Label>
                <Input
                  id="reserva-nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej. Mariana López"
                  maxLength={60}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="reserva-comensales-trigger">Comensales</Label>
                  <Select value={comensales} onValueChange={setComensales}>
                    <SelectTrigger id="reserva-comensales-trigger">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                        <SelectItem key={n} value={String(n)}>
                          {n} {n === 1 ? "persona" : "personas"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reserva-hora-trigger">Horario</Label>
                  <Select
                    value={hora}
                    onValueChange={setHora}
                    disabled={!fecha || filteredTimeSlots.length === 0}
                  >
                    <SelectTrigger id="reserva-hora-trigger">
                      <SelectValue
                        placeholder={
                          !fecha
                            ? "Elegí fecha primero"
                            : filteredTimeSlots.length === 0
                              ? "Sin turnos hoy"
                              : "Elegí"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredTimeSlots.map((h) => (
                        <SelectItem key={h} value={h}>
                          {h} hs
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Fecha</Label>
                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      id="reserva-fecha-btn"
                      type="button"
                      variant="outline"
                      className={cn(
                        "btn-tactile w-full justify-start text-left font-normal",
                        !fecha && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {fecha
                        ? format(fecha, "EEEE d 'de' MMMM", { locale: es })
                            .charAt(0)
                            .toUpperCase() +
                          format(fecha, "EEEE d 'de' MMMM", { locale: es }).slice(1)
                        : "Elegí una fecha"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 pointer-events-auto max-w-[calc(100vw-3rem)]"
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
                        return (
                          isBefore(dayStart, today) ||
                          isAfter(dayStart, maxDate) ||
                          d.getDay() === 0
                        );
                      }}
                      initialFocus
                      locale={es}
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <p className="text-xs text-[color:var(--ink)]/60">
                  Reservas hasta 7 días de anticipación · domingos cerrado
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reserva-notas">Notas (opcional)</Label>
                <Input
                  id="reserva-notas"
                  value={notas}
                  onChange={(e) => setNotas(e.target.value)}
                  placeholder="Cumpleaños, alergias, etc."
                  maxLength={200}
                />
              </div>

              <Button
                id="reserva-submit-btn"
                type="submit"
                className="btn-tactile w-full rounded-full bg-[color:var(--wine)] py-6 text-sm font-semibold uppercase tracking-[0.14em] text-[color:var(--cream)] cursor-pointer"
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
