type AppErrorOptions = {
  mechanism?: "manual" | "onerror" | "unhandledrejection" | "react_error_boundary";
  handled?: boolean;
  severity?: "error" | "warning" | "info";
};

export function reportAppError(error: unknown, context: Record<string, unknown> = {}, options?: AppErrorOptions) {
  console.error("App Error Boundary Exception:", error, {
    route: typeof window !== "undefined" ? window.location.pathname : undefined,
    ...context,
    ...options,
  });
}
