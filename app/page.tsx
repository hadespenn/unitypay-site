"use client";

import Image from "next/image";
import { useEffect } from "react";
import type { Locale, Pair } from "./lib/locale";
import { useLocale, useLocaleState } from "./lib/locale";
import Header from "./components/Header";
import Footer from "./components/Footer";

// ---- helpers ----
function Arrow() {
  return <span className="arrow" aria-hidden="true">↗</span>;
}

function Overline({ children }: { children: React.ReactNode }) {
  return <p className="overline"><i />{children}</p>;
}


// ---- world map ----
function WorldMap({ regions }: { regions: readonly Pair[] }) {
  const nodes = [
    { x: 18, y: 27, i: 0 }, { x: 24, y: 42, i: 1 }, { x: 48, y: 30, i: 2 },
    { x: 73, y: 51, i: 3 }, { x: 70, y: 67, i: 4 }, { x: 30, y: 58, i: 5 },
  ];
  return (
    <div className="world-map" role="img" aria-label={regions.map((x) => x[0]).join("、")}>
      <svg viewBox="0 0 1000 500" aria-hidden="true">
        <g className="map-grid">
          <path d="M0 100H1000M0 200H1000M0 300H1000M0 400H1000M125 0V500M250 0V500M375 0V500M500 0V500M625 0V500M750 0V500M875 0V500" />
        </g>
        <g className="land">
          <path d="M58 88 118 47l102 8 65 38 16 52-43 36-13 62-52 33-37-49-64-13-48-61Z" />
          <path d="m236 281 53 14 33 63-17 104-39-22-21-81-38-45Z" />
          <path d="m423 96 64-27 43 20 34-10 34 34 92-25 125 40 103 78-35 37-92-16-28 41-61-11-32-69-59-14-37 55-54 1-15-56-65-20Z" />
          <path d="m505 237 89 5 59 76-29 122-64 17-39-67-34-88Z" />
          <path d="m813 347 63-22 72 48-24 53-89-10Z" />
        </g>
        <g className="routes">
          <path d="M180 140Q480 12 790 255M220 210Q510 340 760 335M460 150Q620 105 790 255M290 290Q400 195 460 150" />
        </g>
      </svg>
      {nodes.map((n) => (
        <span className="map-node" style={{ left: `${n.x}%`, top: `${n.y}%` }} key={n.i}>
          <i /><b>{regions[n.i][0]}</b>
        </span>
      ))}
    </div>
  );
}

// ---- hero flow visualization ----
function HeroFlow({ stages }: { stages: string[] }) {
  const positions = [
    { pos: "top-left",    accent: true },
    { pos: "top-right",   accent: false },
    { pos: "bottom-left", accent: false },
    { pos: "bottom-right",accent: true },
  ];
  return (
    <div className="hero-flow" aria-hidden="true">
      <svg className="hero-flow-bg" viewBox="0 0 600 460" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="fg1" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#3b82f6" /><stop offset="100%" stopColor="#60a5fa" /></linearGradient>
          <linearGradient id="fg2" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#5eead4" /><stop offset="100%" stopColor="#4ad8d8" /></linearGradient>
        </defs>
        <circle cx="120" cy="90" r="48" fill="none" stroke="rgba(59,130,246,.25)" strokeWidth="1" />
        <circle cx="430" cy="130" r="72" fill="none" stroke="rgba(94,234,212,.18)" strokeWidth="1" />
        <circle cx="160" cy="300" r="64" fill="none" stroke="rgba(59,130,246,.2)" strokeWidth="1" />
        <circle cx="380" cy="320" r="52" fill="none" stroke="rgba(94,234,212,.25)" strokeWidth="2" />
        <path d="M158 110 Q280 80 380 155" fill="none" stroke="url(#fg1)" strokeWidth="1.5" strokeDasharray="6 6" />
        <path d="M400 190 Q240 240 210 280" fill="none" stroke="url(#fg2)" strokeWidth="1.5" strokeDasharray="6 6" />
        <path d="M220 340 Q300 310 350 335" fill="none" stroke="url(#fg1)" strokeWidth="1.5" strokeDasharray="6 6" />
      </svg>
      {positions.map((position, i) => (
        <span key={i} className={`hero-flow-dot ${position.pos}${position.accent ? " accent" : ""}`}>
          <i className={position.accent ? "accent" : ""} />
          <b className={position.accent ? "accent" : ""}>{stages[i]}</b>
        </span>
      ))}
    </div>
  );
}

function HeroFlowLabel({ children }: { children: React.ReactNode }) {
  return <p className="hero-flow-label">{children}</p>;
}

// ---- main page ----
export default function Home() {
  const [locale, setLocale] = useLocaleState();
  const { t } = useLocale(locale);

  useEffect(() => {
    const map: Record<Locale, string> = {
      zh: "zh-CN", en: "en", "zh-TW": "zh-TW", ru: "ru", de: "de", es: "es", pt: "pt", ja: "ja", ko: "ko",
    };
    document.documentElement.lang = map[locale] ?? "en";
  }, [locale]);

  return (
    <main>
      {/* ===== 1. NAVIGATION ===== */}
      <Header locale={locale} setLocale={setLocale} nav={t.nav} contact={t.contact} />

      {/* ===== 2. HERO ===== */}
      <section className="hero-section" id="top">
        <div className="hero-copy">
          <Overline>{t.heroEyebrow}</Overline>
          <h1>{t.heroTitle}<br /><em>{t.heroTitleAccent}</em></h1>
          <p className="hero-desc">{t.heroText}</p>
          <div className="hero-actions">
            <a className="button primary" href="#contact">{t.heroDemo}<Arrow /></a>
            <a className="button outline" href="#developers">{t.heroApiDocs}<span>↓</span></a>
          </div>
        </div>
        <HeroFlow stages={t.heroFlowStages} />
        <HeroFlowLabel>{t.heroFlowLabel}</HeroFlowLabel>
        <div className="hero-stats-bar">
          {t.heroStats.map(([num, label]) => (
            <div key={label}><b>{num}</b><small>{label}</small></div>
          ))}
        </div>
      </section>

      {/* ===== 3. TRUST BAR ===== */}
      <section className="trust-bar">
        <h3 className="trust-bar-title">{t.trustBarTitle}</h3>
        <div className="trust-bar-grid">
          {t.trustCards.map(([name, desc]) => (
            <div className="trust-bar-card" key={name}>
              <b>{name}</b>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== 4. DECOUPLED ARCHITECTURE ===== */}
      <section className="section architecture" id="architecture">
        <div className="section-header">
          <Overline>{t.archOverline}</Overline>
          <h2>{t.archTitle}</h2>
          <p className="section-sub">{t.archSubtitle}</p>
        </div>
        <div className="arch-flow">
          {t.archSteps.map((step, i) => (
            <div className="arch-step" key={step.num}>
              <div className="card-head">
                <span className="arch-step-num">{step.num}</span>
                <div>
                  <small>{step.label}</small>
                  <h4>{step.title}</h4>
                </div>
              </div>
              <p>{step.desc}</p>
              {i < 3 && <span className="arch-arrow">→</span>}
            </div>
          ))}
        </div>
        <div className="arch-isolation">
          <div className="isolation-bar fiat">
            <span className="isolation-dot fiat" />
            <span>{t.fiatFlowLabel}</span>
          </div>
          <span className="isolation-divider">{t.isolationLabel}</span>
          <div className="isolation-bar crypto">
            <span className="isolation-dot crypto" />
            <span>{t.cryptoFlowLabel}</span>
          </div>
        </div>
      </section>

      {/* ===== 5. CORE CAPABILITIES ===== */}
      <section className="section capabilities" id="capabilities">
        <div className="section-header">
          <Overline>{t.capOverline}</Overline>
          <h2>{t.capTitle}</h2>
          <p className="section-sub">{t.capSubtitle}</p>
        </div>
        <div className="cap-grid">
          {t.caps.map((cap) => (
            <article className="cap-card" key={cap.title}>
              <div className="card-head">
                <span className="cap-icon">{cap.icon}</span>
                <h4>{cap.title}</h4>
              </div>
              <p>{cap.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ===== 6. COMPLIANCE FRAMEWORK ===== */}
      <section className="section compliance" id="compliance">
        <div className="section-header">
          <Overline>{t.compOverline}</Overline>
          <h2>{t.compTitle}<br/></h2>
          <p className="section-sub">{t.compSubtitle}</p>
        </div>
       
        <div className="comp-grid">
          {t.compCards.map((card) => (
            <article className="comp-card" key={card.title}>
              <span className="comp-card-accent" aria-hidden="true" />
              <div className="card-head">
                <span className="comp-icon">{card.icon}</span>
                <h4>{card.title}</h4>
              </div>
              <p>{card.desc}</p>
            </article>
          ))}
        </div>
        {/* <div className="comp-disclaimer">
          <span className="comp-disclaimer-icon" aria-hidden="true">⌁</span>
          <p>{t.compDisclaimer}</p>
        </div> */}
         <div className="comp-disclaimer comp-statement">
          <span className="comp-statement-icon" aria-hidden="true">⚠</span>
          <div>
            <h5 className="comp-statement-label">{t.compStatementLabel}</h5>
            <p>{t.compStatement}{t.compDisclaimer}</p>
          </div>
        </div>
      </section>

      {/* ===== 7. MPC SECURITY ===== */}
      <section className="section mpc-security" id="security">
        <div className="section-header">
          <Overline>{t.mpcOverline}</Overline>
          <h2>{t.mpcTitle}</h2>
          <p className="section-sub">{t.mpcText}</p>
        </div>
        <div className="mpc-grid">
          {t.mpcShards.map((shard) => (
            <article className="mpc-card" key={shard.title}>
              <div className="card-head">
                <span className="mpc-emoji">{shard.icon}</span>
                <div>
                  <small className="mpc-label">{shard.label}</small>
                  <h4>{shard.title}</h4>
                </div>
              </div>
              <p>{shard.desc}</p>
            </article>
          ))}
        </div>
        <div className="mpc-commitment">
          <i>⌁</i>
          <p>{t.mpcCommitment}</p>
        </div>
      </section>

      {/* ===== 8. RISK & MITIGATION ===== */}
      <section className="section risk" id="risk">
        <div className="section-header">
          <Overline>{t.riskOverline}</Overline>
          <h2>{t.riskTitle}</h2>
          <p className="section-sub">{t.riskSubtitle}</p>
        </div>
        <div className="risk-grid">
          {t.risks.map((r) => (
            <article className="risk-card" key={r.title}>
              <div className="risk-top">
                <div className="risk-head">
                <div className="risk-label">
                  <span className="risk-icon risk">⚠</span>
                  <small>{r.tag}</small>
                </div>
                <h4>{r.title}</h4>
                </div>
                <p className="risk-desc">{r.desc}</p>
              </div>
              <div className="risk-divider"><i /></div>
              <div className="risk-bottom">
                <div className="risk-label">
                  <span className="risk-icon strategy">✓</span>
                  <small>{r.strategy}</small>
                </div>
                <p className="risk-strategy-text">{r.strategyText}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ===== 9. DEVELOPERS ===== */}
      <section className="section developers" id="developers">
        <div className="dev-side">
          <Overline>{t.footerLinkApi}</Overline>
          <h2>{t.devTitle}</h2>
          <p className="dev-desc">{t.devText}</p>
          <div className="dev-list">
            {t.devs.map(([title, text], i) => (
              <article key={title}>
                <span>{["{ }", "↻", "⌁", "◎", "◷"][i]}</span>
                <div><h4>{title}</h4><p>{text}</p></div>
              </article>
            ))}
          </div>
          <div className="dev-actions">
            <a className="button primary" href="/developers">{t.footerLinkDevelopers}<span>↗</span></a>
          </div>
        </div>
        <div className="code-window">
          <div className="code-bar"><i /><i /><i /><span>API REQUEST</span></div>
          <pre>
            <b>POST</b> /v1/settlement_routes{"\n\n"}
            {'{\n  "source": "USD",\n  "destination": "USDC",\n  "amount": 25000,\n  "webhook_url": "https://...",\n  "idempotency_key": "req_..."\n}'}
            {"\n\n"}
            <em>→ 200 OK  settlement route created</em>
          </pre>
        </div>
      </section>

      {/* ===== 10. GLOBAL NETWORK ===== */}
      <section className="section global" id="network">
        <div className="section-header">
          <Overline>{t.globalOverline}</Overline>
          <h2>{t.globalTitle}</h2>
          <p className="section-sub">{t.globalText}</p>
        </div>
        <WorldMap regions={t.regions} />
        <div className="region-grid">
          {t.regions.map(([name, text]) => (
            <article key={name}>
              <h4>{name}</h4>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <p className="global-note">{t.globalNote}</p>
      </section>

      {/* ===== 11. CTA ===== */}
      <section className="section cta-section" id="contact">
        <div className="cta-scenarios">
          {t.ctaScenarios.map((s) => (
            <div className="cta-scenario-card" key={s.title}>
              <span className="cta-scenario-icon">{s.icon}</span>
              <b>{s.title}</b>
            </div>
          ))}
        </div>
        <p className="cta-unified">{t.ctaUnified}</p>
        <Overline>{t.ctaOverline}</Overline>
        <h2>{t.ctaTitle}</h2>
        <p className="cta-text">{t.ctaText}</p>
        <div className="cta-buttons">
          <a className="button primary" href="mailto:hello@unitypay.com">{t.contact}<Arrow /></a>
          
        </div>
        <div className="cta-info-row">
          <a className="cta-info" href="mailto:hello@unitypay.com">
            <i aria-hidden="true">✉</i>
            <div><small>{t.contactEmail}</small><b>{t.contactEmailValue}</b></div>
          </a>
          <div className="cta-info">
            <i aria-hidden="true">⌖</i>
            <div><small>{t.contactLocation}</small><b>{t.contactLocationValue}</b></div>
          </div>
          <div className="cta-info">
            <i aria-hidden="true">⏱</i>
            <div><small>{t.contactHours}</small><b>{t.contactHoursValue}</b></div>
          </div>
        </div>
      </section>

      {/* ===== 12. FOOTER ===== */}
      <Footer locale={locale} />
    </main>
  );
}
