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

const langMap: Record<string, string> = { en: "en", zh: "zh-CN", "zh-TW": "zh-Hant" };

/**
 * 404 page rendered as a server component (no "use client") so that
 * <title> and <meta> tags are present in the SSR'd HTML and detectable
 * by SEO crawlers / Lighthouse.
 *
 * Locale is read from the request path via a small client script that
 * runs after hydration to switch the visible message; the SSR'd default
 * is English, which is a safe fallback.
 */
export default function NotFound() {
  // Server-rendered default is the English version (visible to crawlers).
  const msg = messages.en;
  const htmlLang = "en";

  return (
    <html lang={htmlLang}>
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
        {/* Client script: swap text + lang attribute based on URL after hydration.
            Visible content stays consistent; this only updates lang + heading for users. */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            var msgs = ${JSON.stringify(messages)};
            var langMap = ${JSON.stringify(langMap)};
            var seg = (location.pathname.split('/')[1] || '').toLowerCase();
            var loc = (msgs[seg] ? seg : 'en');
            var m = msgs[loc];
            document.documentElement.lang = langMap[loc] || 'en';
            var h1 = document.querySelector('h1'); if (h1) h1.textContent = m.heading;
            var p = document.querySelector('p.desc'); if (p) p.textContent = m.desc;
            var a = document.querySelector('a.back'); if (a) { a.textContent = m.back; a.href = '/' + loc + '/'; }
          })();
        ` }} />
      </head>
      <body>
        <div className="wrap">
          <p className="code">404</p>
          <h1>{msg.heading}</h1>
          <p className="desc">{msg.desc}</p>
          <Link className="back" href="/en/">{msg.back}</Link>
        </div>
      </body>
    </html>
  );
}