"use client";

import { useEffect } from "react";

/**
 * Sets <html lang="..."> on the client side after hydration.
 * Necessary because output: 'export' + root layout can't read locale params.
 */
export function LangFix({ lang }: { lang: string }) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}
