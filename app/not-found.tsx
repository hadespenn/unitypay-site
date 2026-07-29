import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="en">
      <head>
        <title>404 — Page Not Found | UnityPay</title>
        <meta name="description" content="The page you are looking for does not exist." />
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
          <h1>Page Not Found</h1>
          <p>The page you are looking for might have been moved or no longer exists.</p>
          <Link href="/en">← Back to Homepage</Link>
        </div>
      </body>
    </html>
  );
}
