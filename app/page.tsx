import HomeClient from "./[locale]/HomeClient";
import { getMessagesSync, defaultLocale } from "./lib/messages";

/**
 * Root URL renders the default locale directly — avoids the 301 redirect
 * penalty in Lighthouse / PageSpeed audits.
 *
 * This generates `out/index.html` with the same content as `out/en/index.html`.
 * Users visiting https://example.com/ see the English homepage immediately,
 * with no redirect overhead.
 *
 * If a non-default locale cookie is set (user previously switched languages),
 * an inline script redirects them to /<locale>/ so they see their preferred
 * language without having to click the language picker again.
 */
export default function RootPage() {
  const t = getMessagesSync(defaultLocale);
  return (
    <>
      {/* Cookie-aware redirect: only fires if user previously chose a different language.
          No FOUC because the page renders in default locale first, then jumps. */}
      <script dangerouslySetInnerHTML={{ __html: `
        (function(){
          try {
            var m = document.cookie.match(/(?:^|;\\s*)unitypay-locale=([^;]*)/);
            var loc = m && m[1];
            if (loc && loc !== 'en' && (loc === 'zh' || loc === 'zh-TW')) {
              window.location.replace('/' + loc + '/');
            }
          } catch(e) {}
        })();
      ` }} />
      <HomeClient locale={defaultLocale} t={t} />
    </>
  );
}
