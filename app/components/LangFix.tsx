"use client";

import { useEffect } from "react";

/**
 * Sets <html lang="..."> and dir="rtl" (for Arabic) on the client side after
 * hydration. Necessary because output: 'export' + root layout can't read
 * locale params.
 */
export function LangFix({ lang }: { lang: string }) {
  useEffect(() => {
    document.documentElement.lang = lang;
    // Arabic (and other RTL locales) need dir="rtl" for correct text layout.
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);
  return null;
}
