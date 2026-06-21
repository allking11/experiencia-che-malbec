import { useState } from "react";
import { format, addDays, startOfDay } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
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
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "18:00", "18:30", "19:00", "19:30", "20:00", "20:30",
  "21:00", "21:30", "22:00",
];

const schema = z.object({
  nombre: z.string().trim().min(2, "Ingresá tu nombre").max(60),
  comensales: z.number().int().min(1).max(12),
  fecha: z.date(),
  hora: z.string().min(1, "Elegí un horario"),
  notas: z.string().trim().max(200).optional(),
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

  const today = startOfDay(new Date());
  const maxDate = addDays(today, 7);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
    const fechaTxt = format(d.fecha, "EEEE d 'de' MMMM", { locale: es });
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
    window.open(url, "_blank", "noopener,noreferrer");
    toast.success("Te llevamos a WhatsApp para confirmar 🍷");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-[color:var(--cream)] text-[color:var(--ink)] border-[color:var(--gold)]/40">
        <DialogHeader>
          <p className="gold-divider" style={{ color: "var(--gold)" }}>Reservá tu mesa</p>
          <DialogTitle className="font-serif text-3xl text-[color:var(--wine)]">
            Pedí tu reserva
          </DialogTitle>
          <DialogDescription className="text-[color:var(--ink)]/70">
            Completá los datos y confirmamos por WhatsApp. Disponibilidad hasta 7 días.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">Tu nombre</Label>
            <Input
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej. Mariana López"
              maxLength={60}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Comensales</Label>
              <Select value={comensales} onValueChange={setComensales}>
                <SelectTrigger>
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
              <Label>Horario</Label>
              <Select value={hora} onValueChange={setHora}>
                <SelectTrigger>
                  <SelectValue placeholder="Elegí" />
                </SelectTrigger>
                <SelectContent>
                  {TIME_SLOTS.map((h) => (
                    <SelectItem key={h} value={h}>{h} hs</SelectItem>
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
                  type="button"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !fecha && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {fecha
                    ? format(fecha, "EEEE d 'de' MMMM", { locale: es })
                    : "Elegí una fecha"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                <Calendar
                  mode="single"
                  selected={fecha}
                  onSelect={(d) => {
                    setFecha(d);
                    setCalendarOpen(false);
                  }}
                  disabled={(d) => d < today || d > maxDate || d.getDay() === 0}
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
            <Label htmlFor="notas">Notas (opcional)</Label>
            <Input
              id="notas"
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
              placeholder="Cumpleaños, alergias, etc."
              maxLength={200}
            />
          </div>

          <Button
            type="submit"
            className="w-full rounded-full bg-[color:var(--wine)] py-6 text-sm font-semibold uppercase tracking-[0.14em] text-[color:var(--cream)] hover:bg-[color:var(--ink)]"
          >
            Confirmar por WhatsApp
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
