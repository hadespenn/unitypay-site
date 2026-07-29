"use client";

import { useEffect } from "react";

interface DeferredScriptProps {
  /** Script URL */
  src: string;
  /** Use async (default) for independent scripts, defer for order-dependent */
  strategy?: "async" | "defer";
  /** Optional ID for duplicate prevention (e.g. "ga-script") */
  id?: string;
}

/**
 * Inject a non-critical script with async or defer attribute.
 *
 * async : script loads in parallel, executes immediately when ready (best for GA, chat)
 * defer : script loads in parallel, executes after HTML parsing (best for frameworks)
 *
 * Usage:
 *   <DeferredScripts src="https://www.googletagmanager.com/gtag/js?id=..." id="ga" strategy="async" />
 *   <DeferredScripts src="https://widget.example.com/chat.js" strategy="defer" />
 */
export default function DeferredScripts({ src, strategy = "async", id }: DeferredScriptProps) {
  useEffect(() => {
    if (id && document.getElementById(id)) return;

    const script = document.createElement("script");
    script.src = src;
    if (id) script.id = id;
    if (strategy === "async") script.async = true;
    else script.defer = true;

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [src, strategy, id]);

  return null;
}
