import HomeClient from "./[locale]/HomeClient";
import { getMessagesSync, defaultLocale } from "./lib/messages";

/**
 * Root URL always renders the default locale (en) directly.
 * Users who previously chose a different language are redirected by the
 * cookie-aware script injected by `defer-blocking.mjs` into <head> (first child,
 * before any CSS or React hydration) — this avoids any FOUC or partial render.
 */
export default function RootPage() {
  const t = getMessagesSync(defaultLocale);
  return <HomeClient locale={defaultLocale} t={t} />;
}
