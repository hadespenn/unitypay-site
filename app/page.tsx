import HomeClient from "./[locale]/HomeClient";
import { getMessagesSync, defaultLocale } from "./lib/messages";

/**
 * Root URL renders the default locale directly — avoids the 301 redirect
 * penalty in Lighthouse / PageSpeed audits.
 *
 * This generates `out/index.html` with the same content as `out/en/index.html`.
 * Users visiting https://example.com/ see the English homepage immediately,
 * with no redirect overhead.
 */
export default function RootPage() {
  const t = getMessagesSync(defaultLocale);
  return <HomeClient locale={defaultLocale} t={t} />;
}
