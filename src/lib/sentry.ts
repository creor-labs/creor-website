import * as Sentry from "@sentry/react";

// Only initialize in the browser — Next.js evaluates this server-side during
// static export build, where browser APIs and React class components are unavailable.
if (typeof window !== "undefined") {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment: process.env.NEXT_PUBLIC_SENTRY_ENV ?? "development",
    release: process.env.NEXT_PUBLIC_APP_VERSION,
    tracesSampleRate: 0.1,

    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],

    // Capture 10% of sessions for replay, 100% on error
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,

    beforeSend(event) {
      // Drop ResizeObserver noise (browser-level, not actionable)
      if (
        event.exception?.values?.some((v) =>
          v.value?.includes("ResizeObserver loop")
        )
      ) {
        return null;
      }

      // Scrub sensitive fields from extra/contexts
      scrubObject(event.extra);
      if (event.contexts) {
        for (const ctx of Object.values(event.contexts)) {
          scrubObject(ctx as Record<string, unknown>);
        }
      }

      return event;
    },

    beforeBreadcrumb(breadcrumb) {
      // Scrub Authorization header from fetch breadcrumbs
      if (breadcrumb.category === "fetch" || breadcrumb.category === "xhr") {
        if (breadcrumb.data) {
          delete breadcrumb.data.headers;
          // Redact tokens in URLs
          if (typeof breadcrumb.data.url === "string") {
            breadcrumb.data.url = breadcrumb.data.url.replace(
              /token=[^&]+/gi,
              "token=[Filtered]"
            );
          }
        }
      }
      return breadcrumb;
    },
  });
}

const SENSITIVE_KEYS =
  /^(token|password|apiKey|api_key|secret|authorization)$/i;

function scrubObject(obj: Record<string, unknown> | undefined) {
  if (!obj || typeof obj !== "object") return;
  for (const key of Object.keys(obj)) {
    if (SENSITIVE_KEYS.test(key)) {
      obj[key] = "[Filtered]";
    }
  }
}

export function setSentryUser(user: { id: string; email?: string }) {
  Sentry.setUser({ id: user.id, email: user.email });
}

export function clearSentryUser() {
  Sentry.setUser(null);
}

export { Sentry };
