import * as Sentry from "@sentry/node";

// Ensure to call this before importing any other modules!
Sentry.init({
  dsn: "https://efc04746528edc007d7cf511d3063f86@o4508186699825152.ingest.us.sentry.io/4508218044186624",
  // Add Tracing by setting tracesSampleRate
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});
