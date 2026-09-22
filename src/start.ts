import { createStart, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";

const subdomainMiddleware = createMiddleware().server(async ({ next, request }) => {
  try {
    const url = new URL(request.url);
    const host =
      request.headers.get("x-forwarded-host") ||
      request.headers.get("host") ||
      url.host ||
      "";

    if (
      host.toLowerCase().startsWith("links.") &&
      (url.pathname === "/" || url.pathname === "")
    ) {
      return Response.redirect(new URL("/links", request.url).toString(), 302);
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
