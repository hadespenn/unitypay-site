"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import type { LocaleContent } from "../../lib/locale";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

interface DevelopersClientProps {
  locale: string;
  t: LocaleContent;
}

export default function DevelopersPage({ locale, t }: DevelopersClientProps) {
  const router = useRouter();
  const pathname = usePathname();

  const setLocale = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  };

  useEffect(() => { window.scrollTo(0, 0); }, []);



  return (
    <main id="main-content">
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
                <h3>{f.title}</h3>
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
           <div className="dev-sandbox-head">
          <div className="dev-sandbox-icon">⚙</div>
         
            <div className="dev-sandbox-heading">{t.devPageSandboxCardTitle}</div>
            </div>
            <p>{t.devPageSandboxCardText}</p>
          
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
              <div>
              <span className="dev-step-num">{s.num}</span>
              
                <h3>{s.title}</h3>
                 </div>
                <p>{s.desc}</p>
             
            </article>
          ))}
        </div>
      </section>

      <Footer locale={locale} />
    </main>
  );
}
