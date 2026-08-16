import { useState } from "react";
import { z } from "zod";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Building2, Send } from "lucide-react";
import { toast } from "sonner";

const WA_NUMBER = "5491128481233";

const schema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, "Ingresá tu nombre y apellido (mínimo 2 caracteres)")
    .max(80, "Máximo 80 caracteres"),
  telefono: z
    .string()
    .trim()
    .min(8, "Ingresá un teléfono válido (mínimo 8 dígitos)")
    .regex(/^[0-9+\s()-]+$/, "El formato del teléfono no es válido"),
  zona: z.string().min(1, "Seleccioná la ciudad o zona de interés"),
  modelo: z.string().min(1, "Seleccioná el modelo de interés"),
  inversion: z.string().min(1, "Seleccioná el rango de inversión disponible"),
  experiencia: z.string().min(1, "Indicá si tenés experiencia previa"),
  experienciaDetalle: z.string().trim().max(200, "Máximo 200 caracteres").optional(),
  operacion: z.string().min(1, "Seleccioná tu disponibilidad para operar"),
  socios: z.string().min(1, "Indicá si tenés socios o inversores adicionales"),
  sociosCantidad: z.string().trim().max(50, "Máximo 50 caracteres").optional(),
  plazo: z.string().min(1, "Seleccioná el plazo estimado para iniciar"),
});

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

export function FranchiseDialog({ open, onOpenChange }: Props) {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [zona, setZona] = useState("");
  const [modelo, setModelo] = useState("Formato completo ~300m²");
  const [inversion, setInversion] = useState("");
  const [experiencia, setExperiencia] = useState("no");
  const [experienciaDetalle, setExperienciaDetalle] = useState("");
  const [operacion, setOperacion] = useState("Opero yo mismo");
  const [socios, setSocios] = useState("no");
  const [sociosCantidad, setSociosCantidad] = useState("");
  const [plazo, setPlazo] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);

  const resetForm = () => {
    setNombre("");
    setTelefono("");
    setZona("");
    setModelo("Formato completo ~300m²");
    setInversion("");
    setExperiencia("no");
    setExperienciaDetalle("");
    setOperacion("Opero yo mismo");
    setSocios("no");
    setSociosCantidad("");
    setPlazo("");
    setErrors({});
    setIsSubmitted(false);
    setWhatsappUrl(null);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setTimeout(resetForm, 250);
    }
    onOpenChange(nextOpen);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const formData = {
      nombre,
      telefono,
      zona,
      modelo,
      inversion,
      experiencia,
      experienciaDetalle: experiencia === "si" ? experienciaDetalle : undefined,
      operacion,
      socios,
      sociosCantidad: socios === "si" ? sociosCantidad : undefined,
      plazo,
    };

    const res = schema.safeParse(formData);
    if (!res.success) {
      const errMap: Record<string, string> = {};
      res.error.errors.forEach((err) => {
        if (err.path[0]) {
          errMap[err.path[0] as string] = err.message;
        }
      });
      setErrors(errMap);
      toast.error("Por favor revisá los campos obligatorios del formulario.");
      return;
    }

    // Build structured WhatsApp message with exact requested tag
    const msg = [
      "📌 *[NUEVA CONSULTA DE FRANQUICIAS]*",
      "",
      `👤 *Nombre y Apellido:* ${nombre.trim()}`,
      `📞 *Teléfono:* ${telefono.trim()}`,
      `📍 *Ciudad / Zona de interés:* ${zona}`,
      `🏬 *Modelo de interés:* ${modelo}`,
      `💰 *Rango de inversión:* ${inversion}`,
      `💼 *Experiencia en gastronomía/comercio:* ${experiencia === "si" ? `Sí (${experienciaDetalle || "Con experiencia"})` : "No"}`,
      `⚙️ *Disponibilidad para operar:* ${operacion}`,
      `👥 *Socios o inversores:* ${socios === "si" ? `Sí (${sociosCantidad || "Con socios"})` : "No"}`,
      `⏱️ *Plazo estimado de inicio:* ${plazo}`,
      "",
      "_Enviado desde el formulario de franquicias de la web de Che Malbec._",
    ].join("\n");

    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
    setWhatsappUrl(url);
    setIsSubmitted(true);
    toast.success("¡Datos completados! Hacé clic en enviar para abrir WhatsApp.");
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-xl bg-[color:var(--card)] border border-[color:var(--gold)]/30 text-[color:var(--ink)] shadow-2xl p-5 sm:p-7">
        {!isSubmitted ? (
          <>
            <DialogHeader className="space-y-1.5 text-left">
              <div className="flex items-center gap-2 text-[color:var(--gold)]">
                <Building2 className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-[11px] uppercase tracking-widest font-semibold">Franquicias Che Malbec</span>
              </div>
              <DialogTitle className="font-serif text-2xl sm:text-3xl text-[color:var(--wine)] font-semibold">
                Sumate a Nuestra Red de Wine Bars
              </DialogTitle>
              <DialogDescription className="text-xs sm:text-sm text-[color:var(--ink)]/75 leading-relaxed">
                Completá este breve formulario para coordinar una reunión de negocio y recibir información detallada sobre el modelo de franquicia.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="mt-3 space-y-4">
              {/* 1. Nombre */}
              <div className="space-y-1.5">
                <Label htmlFor="fran-nombre" className="text-xs font-semibold uppercase tracking-wider text-[color:var(--wine)]">
                  Nombre y Apellido *
                </Label>
                <Input
                  id="fran-nombre"
                  type="text"
                  inputMode="text"
                  autoComplete="name"
                  placeholder="Ej: Juan Pérez"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="min-h-[44px] text-xs sm:text-sm border-[color:var(--gold)]/40 bg-[color:var(--cream)]/30 focus-visible:ring-[color:var(--wine)]"
                />
                {errors.nombre && <p className="text-xs text-red-600 font-medium">{errors.nombre}</p>}
              </div>

              {/* 2. Teléfono */}
              <div className="space-y-1.5">
                <Label htmlFor="fran-telefono" className="text-xs font-semibold uppercase tracking-wider text-[color:var(--wine)]">
                  Teléfono / WhatsApp *
                </Label>
                <Input
                  id="fran-telefono"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="Ej: +54 9 11 1234-5678"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  className="min-h-[44px] text-xs sm:text-sm border-[color:var(--gold)]/40 bg-[color:var(--cream)]/30 focus-visible:ring-[color:var(--wine)]"
                />
                {errors.telefono && <p className="text-xs text-red-600 font-medium">{errors.telefono}</p>}
              </div>

              {/* 3. Ciudad / Zona */}
              <div className="space-y-1.5">
                <Label htmlFor="fran-zona-trigger" className="text-xs font-semibold uppercase tracking-wider text-[color:var(--wine)]">
                  Ciudad o Zona de Interés *
                </Label>
                <Select value={zona} onValueChange={setZona}>
                  <SelectTrigger id="fran-zona-trigger" className="min-h-[44px] text-xs sm:text-sm border-[color:var(--gold)]/40 bg-[color:var(--cream)]/30 focus:ring-[color:var(--wine)]">
                    <SelectValue placeholder="Seleccioná una zona" />
                  </SelectTrigger>
                  <SelectContent className="bg-[color:var(--card)] border-[color:var(--gold)]/30">
                    <SelectItem value="AMBA (CABA y Gran Buenos Aires)">AMBA (CABA y Gran Buenos Aires)</SelectItem>
                    <SelectItem value="Interior de Buenos Aires">Interior de Buenos Aires</SelectItem>
                    <SelectItem value="Otras provincias de Argentina">Otras provincias de Argentina</SelectItem>
                    <SelectItem value="Exterior / Internacional">Exterior / Internacional</SelectItem>
                  </SelectContent>
                </Select>
                {errors.zona && <p className="text-xs text-red-600 font-medium">{errors.zona}</p>}
              </div>

              {/* 4. Modelo de Interés */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold uppercase tracking-wider text-[color:var(--wine)]">
                  Modelo de Interés *
                </Label>
                <RadioGroup value={modelo} onValueChange={setModelo} className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div
                    onClick={() => setModelo("Formato completo ~300m²")}
                    className={`flex items-center space-x-2.5 rounded-lg border p-3 cursor-pointer transition-all min-h-[44px] ${
                      modelo === "Formato completo ~300m²"
                        ? "border-[color:var(--wine)] bg-[color:var(--cream)]/60 shadow-xs"
                        : "border-[color:var(--gold)]/30 bg-transparent hover:bg-[color:var(--cream)]/30"
                    }`}
                  >
                    <RadioGroupItem value="Formato completo ~300m²" id="mod-completo" />
                    <Label htmlFor="mod-completo" className="cursor-pointer text-xs font-medium leading-tight">
                      <span className="font-semibold block text-[color:var(--wine)]">Formato Completo (~300m²)</span>
                      Salón boutique, cava & gastronomía
                    </Label>
                  </div>
                  <div
                    onClick={() => setModelo("Formato Express / Wine Bar")}
                    className={`flex items-center space-x-2.5 rounded-lg border p-3 cursor-pointer transition-all min-h-[44px] ${
                      modelo === "Formato Express / Wine Bar"
                        ? "border-[color:var(--wine)] bg-[color:var(--cream)]/60 shadow-xs"
                        : "border-[color:var(--gold)]/30 bg-transparent hover:bg-[color:var(--cream)]/30"
                    }`}
                  >
                    <RadioGroupItem value="Formato Express / Wine Bar" id="mod-express" />
                    <Label htmlFor="mod-express" className="cursor-pointer text-xs font-medium leading-tight">
                      <span className="font-semibold block text-[color:var(--wine)]">Formato Express</span>
                      Wine Bar ágil & copas al paso
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* 5. Rango de Inversión */}
              <div className="space-y-1.5">
                <Label htmlFor="fran-inversion-trigger" className="text-xs font-semibold uppercase tracking-wider text-[color:var(--wine)]">
                  Rango de Inversión Disponible *
                </Label>
                <Select value={inversion} onValueChange={setInversion}>
                  <SelectTrigger id="fran-inversion-trigger" className="min-h-[44px] text-xs sm:text-sm border-[color:var(--gold)]/40 bg-[color:var(--cream)]/30 focus:ring-[color:var(--wine)]">
                    <SelectValue placeholder="Seleccioná un rango estimado" />
                  </SelectTrigger>
                  <SelectContent className="bg-[color:var(--card)] border-[color:var(--gold)]/30">
                    <SelectItem value="USD 30.000 a USD 50.000">USD 30.000 a USD 50.000</SelectItem>
                    <SelectItem value="USD 50.000 a USD 80.000">USD 50.000 a USD 80.000</SelectItem>
                    <SelectItem value="Más de USD 80.000">Más de USD 80.000</SelectItem>
                    <SelectItem value="A consultar en reunión de franquicia">A consultar en reunión de franquicia</SelectItem>
                  </SelectContent>
                </Select>
                {errors.inversion && <p className="text-xs text-red-600 font-medium">{errors.inversion}</p>}
              </div>

              {/* 6. Experiencia */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold uppercase tracking-wider text-[color:var(--wine)]">
                  ¿Tenés experiencia en gastronomía o comercio? *
                </Label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setExperiencia("si")}
                    className={`min-h-[44px] flex items-center justify-center gap-2 rounded-lg border p-2.5 text-xs font-semibold cursor-pointer transition-all ${
                      experiencia === "si"
                        ? "border-[color:var(--wine)] bg-[color:var(--wine)] text-[color:var(--cream)] shadow-xs"
                        : "border-[color:var(--gold)]/40 bg-[color:var(--cream)]/30 text-[color:var(--ink)] hover:bg-[color:var(--cream)]/60"
                    }`}
                  >
                    Sí
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setExperiencia("no");
                      setExperienciaDetalle("");
                    }}
                    className={`min-h-[44px] flex items-center justify-center gap-2 rounded-lg border p-2.5 text-xs font-semibold cursor-pointer transition-all ${
                      experiencia === "no"
                        ? "border-[color:var(--wine)] bg-[color:var(--wine)] text-[color:var(--cream)] shadow-xs"
                        : "border-[color:var(--gold)]/40 bg-[color:var(--cream)]/30 text-[color:var(--ink)] hover:bg-[color:var(--cream)]/60"
                    }`}
                  >
                    No
                  </button>
                </div>
                {experiencia === "si" && (
                  <Input
                    type="text"
                    inputMode="text"
                    placeholder="Contanos brevemente tu experiencia previa"
                    value={experienciaDetalle}
                    onChange={(e) => setExperienciaDetalle(e.target.value)}
                    className="mt-1.5 min-h-[44px] border-[color:var(--gold)]/40 bg-[color:var(--cream)]/30 text-xs sm:text-sm"
                  />
                )}
              </div>

              {/* 7. Disponibilidad para operar */}
              <div className="space-y-1.5">
                <Label htmlFor="fran-operacion-trigger" className="text-xs font-semibold uppercase tracking-wider text-[color:var(--wine)]">
                  Disponibilidad para Operar *
                </Label>
                <Select value={operacion} onValueChange={setOperacion}>
                  <SelectTrigger id="fran-operacion-trigger" className="min-h-[44px] text-xs sm:text-sm border-[color:var(--gold)]/40 bg-[color:var(--cream)]/30 focus:ring-[color:var(--wine)]">
                    <SelectValue placeholder="Seleccioná una opción" />
                  </SelectTrigger>
                  <SelectContent className="bg-[color:var(--card)] border-[color:var(--gold)]/30">
                    <SelectItem value="Opero yo mismo">Opero yo mismo (Gestión activa)</SelectItem>
                    <SelectItem value="Contrato encargado y superviso">Contrato encargado y superviso</SelectItem>
                    <SelectItem value="Inversión pasiva / Socios">Inversión pasiva / Con socios gestores</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 8. Socios */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold uppercase tracking-wider text-[color:var(--wine)]">
                  ¿Iniciás con socios o inversores adicionales? *
                </Label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setSocios("si")}
                    className={`min-h-[44px] flex items-center justify-center gap-2 rounded-lg border p-2.5 text-xs font-semibold cursor-pointer transition-all ${
                      socios === "si"
                        ? "border-[color:var(--wine)] bg-[color:var(--wine)] text-[color:var(--cream)] shadow-xs"
                        : "border-[color:var(--gold)]/40 bg-[color:var(--cream)]/30 text-[color:var(--ink)] hover:bg-[color:var(--cream)]/60"
                    }`}
                  >
                    Sí
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSocios("no");
                      setSociosCantidad("");
                    }}
                    className={`min-h-[44px] flex items-center justify-center gap-2 rounded-lg border p-2.5 text-xs font-semibold cursor-pointer transition-all ${
                      socios === "no"
                        ? "border-[color:var(--wine)] bg-[color:var(--wine)] text-[color:var(--cream)] shadow-xs"
                        : "border-[color:var(--gold)]/40 bg-[color:var(--cream)]/30 text-[color:var(--ink)] hover:bg-[color:var(--cream)]/60"
                    }`}
                  >
                    No (Individual)
                  </button>
                </div>
                {socios === "si" && (
                  <Input
                    type="text"
                    inputMode="text"
                    placeholder="Cantidad de socios o detalle (opcional)"
                    value={sociosCantidad}
                    onChange={(e) => setSociosCantidad(e.target.value)}
                    className="mt-1.5 min-h-[44px] border-[color:var(--gold)]/40 bg-[color:var(--cream)]/30 text-xs sm:text-sm"
                  />
                )}
              </div>

              {/* 9. Plazo */}
              <div className="space-y-1.5">
                <Label htmlFor="fran-plazo-trigger" className="text-xs font-semibold uppercase tracking-wider text-[color:var(--wine)]">
                  Plazo Estimado para Arrancar *
                </Label>
                <Select value={plazo} onValueChange={setPlazo}>
                  <SelectTrigger id="fran-plazo-trigger" className="min-h-[44px] text-xs sm:text-sm border-[color:var(--gold)]/40 bg-[color:var(--cream)]/30 focus:ring-[color:var(--wine)]">
                    <SelectValue placeholder="Seleccioná el plazo estimado" />
                  </SelectTrigger>
                  <SelectContent className="bg-[color:var(--card)] border-[color:var(--gold)]/30">
                    <SelectItem value="Inmediato (0 a 3 meses)">Inmediato (0 a 3 meses)</SelectItem>
                    <SelectItem value="Corto plazo (3 a 6 meses)">Corto plazo (3 a 6 meses)</SelectItem>
                    <SelectItem value="Explorando oportunidades (6+ meses)">Explorando oportunidades (6+ meses)</SelectItem>
                  </SelectContent>
                </Select>
                {errors.plazo && <p className="text-xs text-red-600 font-medium">{errors.plazo}</p>}
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  className="btn-tactile w-full min-h-[48px] bg-[color:var(--wine)] text-[color:var(--cream)] hover:bg-[color:var(--wine)]/90 font-semibold py-3.5 rounded-full uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm"
                >
                  <Send className="h-4 w-4" /> Continuar y Enviar Solicitud
                </Button>
              </div>
            </form>
          </>
        ) : (
          <div className="py-4 text-center space-y-5">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[color:var(--wine)]/10 text-[color:var(--wine)] border border-[color:var(--gold)]">
              <CheckCircle2 className="h-9 w-9 text-[#25D366]" />
            </div>

            <div className="space-y-1.5">
              <h3 className="font-serif text-2xl text-[color:var(--wine)] font-semibold">
                ¡Solicitud Lista para Enviar!
              </h3>
              <p className="text-xs sm:text-sm text-[color:var(--ink)]/80 max-w-md mx-auto leading-relaxed">
                Tus datos fueron procesados. Hacé clic abajo para abrir WhatsApp con el mensaje estructurado de franquicia y coordinar una llamada con nuestro equipo comercial.
              </p>
            </div>

            <div className="rounded-lg border border-[color:var(--gold)]/30 bg-[color:var(--cream)]/40 p-3.5 sm:p-4 text-left text-xs space-y-1.5 text-[color:var(--ink)]/80">
              <p><strong>Postulante:</strong> {nombre}</p>
              <p><strong>Teléfono:</strong> {telefono}</p>
              <p><strong>Zona:</strong> {zona}</p>
              <p><strong>Modelo:</strong> {modelo}</p>
              <p><strong>Inversión estimada:</strong> {inversion}</p>
              <p><strong>Plazo:</strong> {plazo}</p>
            </div>

            <div className="space-y-2.5 pt-1">
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    toast.success("Abriendo WhatsApp de Franquicias Che Malbec");
                    setTimeout(() => handleOpenChange(false), 1500);
                  }}
                  className="btn-tactile inline-flex w-full min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#25D366] py-3.5 text-xs sm:text-sm font-semibold text-white shadow-xl hover:bg-[#20bd5a] transition-all cursor-pointer uppercase tracking-wider"
                >
                  <WhatsAppIcon className="h-5 w-5" /> Enviar por WhatsApp
                </a>
              )}
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsSubmitted(false)}
                className="text-xs text-[color:var(--wine)] hover:underline cursor-pointer min-h-[36px]"
              >
                Modificar datos
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
