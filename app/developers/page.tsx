"use client";

import { useEffect, useState } from "react";
import type { Locale } from "../lib/locale";
import { useLocale } from "../lib/locale";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function DevelopersPage() {
  const [locale, setLocale] = useState<Locale>("en");
  const { t } = useLocale(locale);

  useEffect(() => {
    const map: Record<Locale, string> = {
      zh: "zh-CN", en: "en", "zh-TW": "zh-TW", ru: "ru", de: "de", es: "es", pt: "pt", ja: "ja", ko: "ko",
    };
    document.documentElement.lang = map[locale] ?? "en";
  }, [locale]);

  return (
    <main>
      <Header locale={locale} setLocale={setLocale} nav={t.nav} contact={t.contact} />

      {/* ===== 1. HERO ===== */}
      <section className="dev-page-hero">
        <p className="overline"><i />{t.devPageEyebrow}</p>
        <h1>
          {t.devPageTitle}
          <br />
          <em>{t.devPageTitleAccent}</em>
        </h1>
        <p className="dev-page-desc">
          {t.devPageDesc}
        </p>
      </section>

      {/* ===== 2. FEATURES ===== */}
      <section className="dev-page-section dev-page-features">
        <div className="section-header">
          <p className="overline"><i />{t.devPageFeaturesEyebrow}</p>
          <h2>{t.devPageFeaturesTitle}</h2>
        </div>
        <div className="dev-features-grid">
          {t.devPageFeatures.map((f) => (
            <article className="dev-feature-card" key={f.title}>
              <span className="dev-feature-icon">{f.icon}</span>
              <div>
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ===== 3. API ENDPOINT ===== */}
      <section className="dev-page-section dev-page-api">
        <div className="section-header">
          <p className="overline"><i />{t.devPageApiEyebrow}</p>
          <h2>{t.devPageApiTitle}</h2>
          <p className="section-sub">{t.devPageApiSubtitle}</p>
        </div>
        <div className="dev-api-split">
          <div className="dev-api-request">
            <div className="dev-code-bar"><i /><i /><i /><span>REQUEST</span></div>
            <pre>
              <b>POST</b> /v1/settlement_routes{"\n\n"}
              {'{\n  "source": "USD",\n  "destination": "USDC",\n  "amount": 25000,\n  "merchant_id": "mch_8f2a"\n}'}
            </pre>
          </div>
          <div className="dev-api-response">
            <div className="dev-code-bar success"><i /><i /><i /><span>200 OK</span></div>
            <pre>
              <em>→ 200 OK</em>{"\n\n"}
              {'{\n  "id": "route_xyz123",\n  "status": "created",\n  "estimated_settlement":\n    "2026-07-28T09:00:00Z"\n}'}
            </pre>
          </div>
        </div>
      </section>

      {/* ===== 4. SANDBOX ===== */}
      <section className="dev-page-section dev-page-sandbox">
        <div className="section-header">
          <p className="overline"><i />{t.devPageSandboxEyebrow}</p>
          <h2>{t.devPageSandboxTitle}</h2>
        </div>
        <div className="dev-sandbox-card">
          <div className="dev-sandbox-icon">⚙</div>
          <div>
            <h3>{t.devPageSandboxCardTitle}</h3>
            <p>{t.devPageSandboxCardText}</p>
          </div>
        </div>
      </section>

      {/* ===== 5. INTEGRATION STEPS ===== */}
      <section className="dev-page-section dev-page-steps">
        <div className="section-header">
          <p className="overline"><i />{t.devPageStepsEyebrow}</p>
          <h2>{t.devPageStepsTitle}</h2>
        </div>
        <div className="dev-steps-grid">
          {t.devPageSteps.map((s) => (
            <article className="dev-step-card" key={s.num}>
              <span className="dev-step-num">{s.num}</span>
              <div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Footer locale={locale} />

      <style jsx global>{`
        .dev-page-hero {
          min-height: 520px;
          padding: 170px max(4vw, 40px) 60px;
          position: relative;
          overflow: hidden;
          text-align: center;
          max-width: 1440px;
          margin: 0 auto;
        }
        .dev-page-hero:before {
          content: "";
          position: absolute;
          inset: 78px 0 0;
          background: radial-gradient(ellipse at 50% 30%, rgba(94,234,212,.10), transparent 50%),
                      radial-gradient(ellipse at 50% 60%, rgba(59,130,246,.06), transparent 40%);
          pointer-events: none;
        }
        .dev-page-hero .overline { justify-content: center; position: relative; z-index: 2; }
        .dev-page-hero h1 {
          font-size: clamp(38px, 3.6vw, 60px);
          line-height: 1.1; letter-spacing: -.04em; font-weight: 460; margin: 0;
          position: relative; z-index: 2;
        }
        .dev-page-hero h1 em { font-style: normal; color: var(--cyan); }
        .dev-page-desc {
          font-size: 14.5px; line-height: 1.9; color: #9fadc0;
          max-width: 620px; margin: 28px auto 0; position: relative; z-index: 2;
        }
        .dev-page-section {
          max-width: 1440px; margin: 0 auto; padding: 0 max(4vw, 40px) 80px;
        }
        .dev-page-section .section-header { text-align: center; }
        .dev-page-section .overline { justify-content: center; }
        .dev-features-grid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px;
        }
        .dev-feature-card {
          display: flex; align-items: flex-start; gap: 18px; padding: 26px 28px;
          background: linear-gradient(160deg, rgba(255,255,255,.03), rgba(255,255,255,.01));
          border: 1px solid var(--line); border-radius: 10px; transition: border-color .25s;
        }
        .dev-feature-card:hover { border-color: rgba(94,234,212,.3); }
        .dev-feature-icon {
          width: 42px; height: 42px; border: 1px solid rgba(94,234,212,.3);
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          color: var(--cyan); font-family: ui-monospace, monospace; font-size: 14px; flex-shrink: 0;
        }
        .dev-feature-card h4 { font-size: 15px; margin: 0 0 6px; font-weight: 700; color: #e0e8f0; }
        .dev-feature-card p { font-size: 13px; line-height: 1.7; color: #8796aa; margin: 0; }
        .dev-api-split { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .dev-api-request, .dev-api-response {
          background: #091c2c; border: 1px solid var(--line); border-radius: 10px;
          overflow: hidden; box-shadow: 0 25px 55px rgba(15,30,40,.22);
          display: flex; flex-direction: column; min-height: 280px;
        }
        .dev-code-bar {
          height: 42px; border-bottom: 1px solid var(--line); display: flex;
          align-items: center; gap: 6px; padding: 0 16px; flex-shrink: 0;
          background: rgba(255,255,255,.02);
        }
        .dev-code-bar i { width: 5px; height: 5px; border-radius: 50%; background: #52647a; }
        .dev-code-bar span { margin-left: auto; font-size: 10px; color: #6b7c91; letter-spacing: .08em; font-weight: 600; }
        .dev-code-bar.success span { color: var(--cyan); }
        .dev-api-request pre, .dev-api-response pre {
          flex: 1; padding: 24px 26px; margin: 0;
          font: 12.5px/1.85 ui-monospace, SFMono-Regular, Menlo, monospace;
          overflow: auto; color: #bac8d4;
        }
        .dev-api-request pre b, .dev-api-response pre b { color: #60a5fa; }
        .dev-api-response pre em { font-style: normal; color: var(--teal); }
        .dev-page-sandbox {
          background: var(--bg2); border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line); padding-top: 80px;
        }
        .dev-sandbox-card {
          display: flex; align-items: flex-start; gap: 22px; padding: 36px 36px;
          background: linear-gradient(160deg, rgba(94,234,212,.05), rgba(94,234,212,.01));
          border: 1px solid rgba(94,234,212,.18); border-radius: 12px;
          max-width: 980px; margin: 0 auto;
        }
        .dev-sandbox-icon {
          width: 56px; height: 56px; border: 1px solid rgba(94,234,212,.35);
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          font-size: 24px; color: var(--cyan); flex-shrink: 0;
        }
        .dev-sandbox-card h3 { font-size: 18px; margin: 0 0 8px; font-weight: 700; color: #e0e8f0; }
        .dev-sandbox-card p { font-size: 14px; line-height: 1.8; color: #bac8d4; margin: 0; }
        .dev-steps-grid {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px;
          background: var(--line); border: 1px solid var(--line);
          border-radius: 12px; overflow: hidden;
        }
        .dev-step-card {
          padding: 28px 22px 26px; background: var(--bg); display: flex;
          flex-direction: column; gap: 12px; transition: background .25s;
        }
        .dev-step-card:hover { background: var(--bg2); }
        .dev-step-num {
          font-size: 28px; font-weight: 300; color: var(--cyan);
          font-family: ui-monospace, monospace; line-height: 1;
        }
        .dev-step-card h4 { font-size: 14px; margin: 0; font-weight: 650; color: #e0e8f0; line-height: 1.4; }
        .dev-step-card p { font-size: 12.5px; line-height: 1.7; color: #8796aa; margin: 0; }
        @media (max-width: 1050px) {
          .dev-features-grid { grid-template-columns: 1fr; }
          .dev-api-split { grid-template-columns: 1fr; }
          .dev-steps-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 760px) {
          .dev-page-hero { padding: 120px 18px 48px; min-height: auto; }
          .dev-page-hero h1 { font-size: 26px; }
          .dev-page-desc { font-size: 13px; margin-top: 20px; }
          .dev-page-section { padding: 0 18px 48px; }
          .dev-page-sandbox { padding-top: 48px; padding-bottom: 60px; }
          .dev-feature-card { padding: 22px 20px; gap: 14px; }
          .dev-feature-icon { width: 38px; height: 38px; font-size: 12px; }
          .dev-api-split { grid-template-columns: 1fr; gap: 12px; }
          .dev-api-request, .dev-api-response { min-height: auto; }
          .dev-sandbox-card { flex-direction: column; padding: 26px 22px; gap: 16px; }
          .dev-steps-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  );
}
