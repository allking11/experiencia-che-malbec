import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportAppError } from "../lib/error-reporting";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Página no encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          La página que buscás no existe o fue movida.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportAppError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">Algo salió mal</h1>
        <p className="mt-2 text-sm text-muted-foreground">Probá refrescar la página.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Reintentar
          </button>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Che Malbec | Boutique Wine Bar & Degustación de Vinos en Buenos Aires" },
      {
        name: "description",
        content:
          "Descubrí Che Malbec Wine Bar Boutique en Buenos Aires (Palacio Vera en Monserrat y San Telmo). Degustaciones guiadas por sommeliers, catas de vino boutique y picadas caseras.",
      },
      {
        name: "keywords",
        content:
          "che malbec, wine bar buenos aires, degustacion de vinos buenos aires, cata de vinos palacio vera, wine bar san telmo, vinos boutique buenos aires, maridaje buenos aires, bodegas boutique argentina, picadas buenos aires, eventos privados vino",
      },
      { name: "author", content: "Che Malbec" },
      { name: "publisher", content: "Che Malbec Mercado & Wine Bar" },
      {
        name: "robots",
        content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      { name: "geo.region", content: "AR-C" },
      { name: "geo.placename", content: "Buenos Aires" },
      { name: "geo.position", content: "-34.6087;-58.3776" },
      { name: "ICBM", content: "-34.6087, -58.3776" },
      { name: "theme-color", content: "#581c25" },
      { property: "og:title", content: "Che Malbec | Boutique Wine Bar & Degustación de Vinos" },
      {
        property: "og:description",
        content:
          "Disfrutá una degustación de vinos guiada por sommeliers en nuestras sedes de Monserrat y San Telmo, Buenos Aires. Vinos boutique y picadas caseras.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://chemalbec.com/" },
      { property: "og:site_name", content: "Che Malbec Mercado & Wine Bar" },
      { property: "og:locale", content: "es_AR" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Che Malbec | Boutique Wine Bar & Degustación de Vinos en Buenos Aires",
      },
      {
        name: "twitter:description",
        content:
          "Degustaciones de vinos guiadas por sommeliers, etiquetas de bodegas boutique y picadas caseras en Buenos Aires.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://chemalbec.com/" },
      { rel: "alternate", hrefLang: "es", href: "https://chemalbec.com/" },
      { rel: "alternate", hrefLang: "x-default", href: "https://chemalbec.com/" },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "icon", type: "image/png", href: "/favicon-32x32.png", sizes: "32x32" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
        <noscript>
          <style>{`
            .reveal {
              opacity: 1 !important;
              transform: none !important;
            }
          `}</style>
        </noscript>
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster richColors position="top-center" />
    </QueryClientProvider>
  );
}
