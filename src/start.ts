import { createStart, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";

const subdomainMiddleware = createMiddleware().server(async ({ next, request }) => {
  try {
    const url = new URL(request.url);
    const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0].trim();
    const host = (forwardedHost || request.headers.get("host") || url.host || "").toLowerCase();
    const isLinksSubdomain = host.startsWith("links.");

    if (isLinksSubdomain && (url.pathname === "" || url.pathname === "/")) {
      const proto =
        request.headers.get("x-forwarded-proto") || url.protocol.replace(":", "") || "https";
      const cleanHost = host.split(":")[0];
      const destination = `${proto}://${cleanHost}/links${url.search}`;

      return Response.redirect(destination, 302);
    }
  } catch (e) {
    console.error("Error in subdomainMiddleware", e);
  }

  return await next();
});

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

export const startInstance = createStart(() => ({
  requestMiddleware: [subdomainMiddleware, errorMiddleware],
}));
