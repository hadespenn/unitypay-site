"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import type { LocaleContent } from "../../lib/locale";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

interface ComplianceClientProps {
  locale: string;
  t: LocaleContent;
}

export default function CompliancePage({ locale, t }: ComplianceClientProps) {
  const router = useRouter();
  const pathname = usePathname();

  const setLocale = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  };

  useEffect(() => { requestAnimationFrame(() => window.scrollTo(0, 0)); }, []);



  return (
    <main id="main-content">
      <Header locale={locale} setLocale={setLocale} nav={t.nav} contact={t.contact} />

      {/* ===== 1. HERO ===== */}
      <section className="compliance-hero">
        <p className="overline"><i />{t.complianceEyebrow}</p>
        <h1>
          {t.complianceTitle}
          <br />
          <em>{t.complianceTitleAccent}</em>
        </h1>
        <p className="compliance-hero-desc">
          {t.complianceDesc}
        </p>
      </section>

      {/* ===== 2. CORE STATEMENT ===== */}
      <section className="compliance-statement-section">
        <div className="statement-banner">
          <div className="statement-title">
          <i>⚠</i>
           <h2>{t.complianceStatementTitle}</h2>
          </div>

            <p>
              {t.complianceStatementText}
            </p>

        </div>
      </section>

      {/* ===== 3. JURISDICTIONS ===== */}
      <section className="compliance-section compliance-jurisdictions">
        <div className="section-header">
          <p className="overline"><i />{t.complianceJuriEyebrow}</p>
          <h2>{t.complianceJuriTitle}</h2>
        </div>
        <div className="jurisdiction-table">
          <div className="jurisdiction-row header">
            {t.complianceJuriHeader.map((h) => (
              <div key={h}>{h}</div>
            ))}
          </div>
          {t.complianceJurisdictions.map((j) => (
            <div className="jurisdiction-row" key={j.region}>
              <div className="jurisdiction-region">
                <span className="jurisdiction-dot" />
                <b>{j.region}</b>
              </div>
              <div className="jurisdiction-framework">{j.framework}</div>
              <div className="jurisdiction-desc">{j.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== 4. OBLIGATIONS ===== */}
      <section className="compliance-section compliance-obligations">
        <div className="section-header">
          <p className="overline"><i />{t.complianceObliEyebrow}</p>
          <h2>{t.complianceObliTitle}</h2>
        </div>
        <div className="obligation-grid">
          {t.complianceObligations.map((o) => (
            <article className="obligation-card" key={o.type}>
              <span className="obligation-check">✓</span>
              <div>
                <b>{o.type}</b>
                <p>{o.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ===== 5. BOUNDARIES ===== */}
      <section className="compliance-section compliance-boundaries">
        <div className="section-header">
          <p className="overline"><i />{t.complianceBounEyebrow}</p>
          <h2>{t.complianceBounTitle}</h2>
        </div>
        <div className="boundaries-grid">
          {t.complianceBoundaries.map((b) => (
            <article className="boundary-card" key={b.label}>
              <span className="boundary-line" />
              <div>
                <b>{b.label}</b>
                <p>{b.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ===== 6. RISK & MITIGATION ===== */}
      <section className="compliance-section compliance-risks">
        <div className="section-header">
          <p className="overline"><i />{t.complianceRiskEyebrow}</p>
          <h2>{t.complianceRiskTitle}</h2>
        </div>
        <div className="compliance-risk-grid">
          {t.complianceRisks.map((r) => (
            <article className="compliance-risk-card" key={r.title}>
              <div className="compliance-risk-top">
                <div className="compliance-risk-head">
                  <span className="compliance-risk-icon">⚠</span>
                  <h3>{r.title}</h3>
                </div>
                <p className="compliance-risk-desc">{r.desc}</p>
              </div>
              <div className="compliance-risk-divider"><i /></div>
              <div className="compliance-risk-bottom">
                <span className="compliance-risk-strategy-icon">✓</span>
                <p className="compliance-risk-strategy">{r.strategy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ===== 7. DISCLAIMER ===== */}
      <section className="compliance-section compliance-disclaimer">
        <div className="disclaimer-box">
          <i>⌁</i>
          <p>
            {t.complianceDisclaimerText}
          </p>
        </div>
      </section>

      {/* ===== 8. FOOTER ===== */}
      <Footer locale={locale} />
    </main>
  );
}
