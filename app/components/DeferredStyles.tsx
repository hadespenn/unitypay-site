"use client";

import { useEffect } from "react";

/**
 * Load a non-critical stylesheet using the media="print" onload pattern.
 * The stylesheet won't block initial render, then applies after load completes.
 * Fallback <noscript> ensures CSS loads even with JS disabled.
 *
 * Usage: <DeferredStyles href="/styles/chat-widget.css" />
 */
export default function DeferredStyles({ href }: { href: string }) {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.media = "print";
    link.onload = function () {
      (this as HTMLLinkElement).media = "all";
    };
    document.head.appendChild(link);

    // Noscript fallback
    const noscript = document.createElement("noscript");
    noscript.innerHTML = `<link rel="stylesheet" href="${href}">`;
    document.head.appendChild(noscript);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(noscript);
    };
  }, [href]);

  return null;
}
