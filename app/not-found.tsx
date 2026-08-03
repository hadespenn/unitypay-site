"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const messages: Record<string, { title: string; heading: string; desc: string; back: string }> = {
  en: {
    title: "404 — Page Not Found | UnityPay",
    heading: "Page Not Found",
    desc: "The page you are looking for might have been moved or no longer exists.",
    back: "← Back to Homepage",
  },
  zh: {
    title: "404 — 页面未找到 | UnityPay",
    heading: "页面未找到",
    desc: "您访问的页面可能已被移动或不存在。",
    back: "← 返回首页",
  },
  "zh-TW": {
    title: "404 — 頁面未找到 | UnityPay",
    heading: "頁面未找到",
    desc: "您訪問的頁面可能已被移動或不存在。",
    back: "← 返回首頁",
  },
};

function getLocale(): string {
  if (typeof window === "undefined") return "en";
  const seg = window.location.pathname.split("/")[1];
  return seg && ["zh", "zh-TW"].includes(seg) ? seg : "en";
}

export default function NotFound() {
  const [locale, setLocale] = useState("en");

  useEffect(() => {
    setLocale(getLocale());
  }, []);

  const msg = messages[locale] || messages.en;
  const homeHref = `/${locale}/`;

  return (
    <html lang={locale === "zh" ? "zh-CN" : locale === "zh-TW" ? "zh-Hant" : "en"}>
      <head>
        <title>{msg.title}</title>
        <meta name="description" content={msg.desc} />
        <meta name="robots" content="noindex" />
        <style>{`
          :root{--bg:#0a1d2c;--text:#f0f4ff;--cyan:#5eead4;--muted:#94a3b8;--line:rgba(120,180,210,.16)}
          *{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--text);font-family:system-ui,-apple-system,sans-serif;-webkit-font-smoothing:antialiased;display:flex;align-items:center;justify-content:center;min-height:100vh;text-align:center}
          .wrap{max-width:480px;padding:40px 24px}
          .code{font-size:100px;font-weight:200;color:var(--cyan);line-height:1;margin:0;letter-spacing:-.03em}
          h1{font-size:22px;margin:16px 0 12px;font-weight:600}
          p{font-size:14px;color:var(--muted);line-height:1.7;margin:0 0 32px}
          a{display:inline-flex;align-items:center;gap:8px;padding:12px 24px;background:rgba(94,234,212,.1);border:1px solid var(--line);border-radius:8px;color:var(--cyan);font-size:14px;font-weight:600;text-decoration:none;transition:all .2s}
          a:hover{background:rgba(94,234,212,.18);border-color:var(--cyan)}
        `}</style>
      </head>
      <body>
        <div className="wrap">
          <p className="code">404</p>
          <h1>{msg.heading}</h1>
          <p>{msg.desc}</p>
          <Link href={homeHref}>{msg.back}</Link>
        </div>
      </body>
    </html>
  );
}
