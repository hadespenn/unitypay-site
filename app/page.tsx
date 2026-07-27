"use client";

import Image from "next/image";
import defaultLocale from "../public/locales/en.json";
import { useEffect, useRef, useState } from "react";

// ---- types ----
type Locale = "zh" | "en" | "zh-TW" | "ru" | "de" | "es" | "pt" | "ja" | "ko";
type Pair = readonly [string, string];

interface StepItem {
  num: string;
  label: string;
  title: string;
  desc: string;
}

interface CapItem {
  icon: string;
  title: string;
  desc: string;
}

interface CompCard {
  icon: string;
  title: string;
  desc: string;
}

interface MpcShard {
  icon: string;
  label: string;
  title: string;
  desc: string;
}

interface RiskItem {
  tag: string;
  title: string;
  desc: string;
  strategy: string;
  strategyText: string;
}

interface LocaleContent {
  langName: string;
  langShort: string;
  nav: string[];
  heroEyebrow: string;
  heroTitle: string;
  heroTitleAccent: string;
  heroText: string;
  heroDemo: string;
  heroApiDocs: string;
  heroStats: Pair[];
  heroFlowLabel: string;
  heroFlowStages: string[];
  trustBarTitle: string;
  trustCards: Pair[];
  archOverline: string;
  archTitle: string;
  archSubtitle: string;
  archSteps: StepItem[];
  fiatFlowLabel: string;
  cryptoFlowLabel: string;
  isolationLabel: string;
  capOverline: string;
  capTitle: string;
  capSubtitle: string;
  caps: CapItem[];
  compOverline: string;
  compTitle: string;
  compStatement: string;
  compCards: CompCard[];
  compDisclaimer: string;
  mpcOverline: string;
  mpcTitle: string;
  mpcText: string;
  mpcShards: MpcShard[];
  mpcCommitment: string;
  riskOverline: string;
  riskTitle: string;
  riskSubtitle: string;
  risks: RiskItem[];
  devOverline: string;
  devTitle: string;
  devText: string;
  devs: Pair[];
  globalOverline: string;
  globalTitle: string;
  globalText: string;
  globalNote: string;
  regions: Pair[];
  ctaOverline: string;
  ctaTitle: string;
  ctaText: string;
  ctaGuide: string;
  ctaScenarios: { icon: string; title: string }[];
  ctaUnified: string;
  contact: string;
  contactEmail: string;
  contactEmailValue: string;
  contactLocation: string;
  contactLocationValue: string;
  contactHours: string;
  contactHoursValue: string;
  footerBrand: string;
  footerDesc: string;
  footerColProduct: string;
  footerLinkPay: string;
  footerLinkCapabilities: string;
  footerLinkStable: string;
  footerLinkApi: string;
  footerColCompliance: string;
  footerLinkCompliance: string;
  footerLinkSecurity: string;
  footerLinkRisk: string;
  footerColCompany: string;
  footerLinkContact: string;
  footerColLegal: string;
  footerLinkTerms: string;
  footerLinkPrivacy: string;
  footerCopyright: string;
  footerDisclaimer: string;
}

const localeInfo: { code: Locale; name: string; short: string }[] = [
  { code: "en", name: "English", short: "EN" },
  { code: "zh", name: "简体中文", short: "中文" },
  { code: "zh-TW", name: "繁體中文", short: "繁中" },
  // { code: "ru", name: "Русский", short: "RU" },
  // { code: "de", name: "Deutsch", short: "DE" },
  // { code: "es", name: "Español", short: "ES" },
  // { code: "pt", name: "Português", short: "PT" },
  // { code: "ja", name: "日本語", short: "JP" },
  // { code: "ko", name: "한국어", short: "KR" },
];

// ---- async locale loader ----
const initialLocale = defaultLocale as unknown as LocaleContent;
const localeCache = new Map<string, LocaleContent>([["en", initialLocale]]);

async function loadLocale(code: string): Promise<LocaleContent> {
  if (localeCache.has(code)) return localeCache.get(code)!;
  try {
    const res = await fetch(`/locales/${code}.json`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as LocaleContent;
    localeCache.set(code, data);
    return data;
  } catch {
    return initialLocale;
  }
}

function useLocale(locale: Locale) {
  const [t, setT] = useState<LocaleContent>(initialLocale);

  useEffect(() => {
    let cancelled = false;
    loadLocale(locale)
      .then((data) => { if (!cancelled) setT(data); })
      .catch(() => {
        if (!cancelled) loadLocale("en").then((data) => { if (!cancelled) setT(data); });
      });
    return () => { cancelled = true; };
  }, [locale]);

  return { t } as const;
}

// ---- helpers ----
const anchorMap = ["#architecture", "#capabilities", "#compliance", "#security", "#developers", "#network"];

function Arrow() {
  return <span className="arrow" aria-hidden="true">↗</span>;
}

function Overline({ children }: { children: React.ReactNode }) {
  return <p className="overline"><i />{children}</p>;
}

// ---- language dropdown ----
function LanguageDropdown({
  current, onChange, open, setOpen,
}: {
  current: Locale; onChange: (c: Locale) => void; open: boolean; setOpen: (v: boolean) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    const onEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onEsc);
    return () => { document.removeEventListener("mousedown", onClick); document.removeEventListener("keydown", onEsc); };
  }, [open, setOpen]);

  const currentName = localeInfo.find((l) => l.code === current)?.name ?? "English";

  return (
    <div className={`lang-dropdown${open ? " open" : ""}`} ref={ref}>
      <button className="lang-trigger" onClick={() => setOpen(!open)} aria-expanded={open} aria-haspopup="listbox">
        <span className="lang-globe" aria-hidden="true">◐</span>
        <span className="lang-current">{currentName}</span>
        <span className="lang-caret" aria-hidden="true">▾</span>
      </button>
      {open && (
        <ul className="lang-menu" role="listbox">
          {localeInfo.map((l) => (
            <li key={l.code} role="option" aria-selected={l.code === current}>
              <button className={`lang-option${l.code === current ? " active" : ""}`} onClick={() => onChange(l.code)}>
                <span className="lang-name">{l.name}</span>
                {l.code === current && <span className="lang-check" aria-hidden="true">✓</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
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
  const [locale, setLocale] = useState<Locale>("en");
  const [menu, setMenu] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
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
      <header>
        <a className="brand" href="#top">
          <Image src="/logo.jpg" alt="UnityPay" width={130} height={48} priority />
        </a>
        <nav className={menu ? "open" : ""}>
          {t.nav.map((x, i) => (
            <a href={anchorMap[i]} key={x} onClick={() => setMenu(false)}>{x}</a>
          ))}
        </nav>
        <div className="header-actions">
          <LanguageDropdown current={locale} onChange={(c) => { setLocale(c); setLangOpen(false); }} open={langOpen} setOpen={setLangOpen} />
          <a className="header-contact" href="#contact">{t.contact}<Arrow /></a>
          <button className="menu-button" aria-expanded={menu} aria-label="Toggle menu" onClick={() => setMenu(!menu)}>
            <i /><i />
          </button>
        </div>
      </header>

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
              <span className="arch-step-num">{step.num}</span>
              <small>{step.label}</small>
              <h4>{step.title}</h4>
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
              <span className="cap-icon">{cap.icon}</span>
              <h4>{cap.title}</h4>
              <p>{cap.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ===== 6. COMPLIANCE FRAMEWORK ===== */}
      <section className="section compliance" id="compliance">
        <div className="section-header">
          <Overline>{t.compOverline}</Overline>
          <h2>{t.compTitle}</h2>
        </div>
        <p className="comp-statement">{t.compStatement}</p>
        <div className="comp-grid">
          {t.compCards.map((card) => (
            <article className="comp-card" key={card.title}>
              <span className="comp-icon">{card.icon}</span>
              <h4>{card.title}</h4>
              <p>{card.desc}</p>
            </article>
          ))}
        </div>
        <p className="comp-disclaimer">{t.compDisclaimer}</p>
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
              <span className="mpc-emoji">{shard.icon}</span>
              <small className="mpc-label">{shard.label}</small>
              <h4>{shard.title}</h4>
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
                <span className="risk-tag risk">{r.tag}</span>
                <h4>{r.title}</h4>
                <p className="risk-desc">{r.desc}</p>
              </div>
              <div className="risk-bottom">
                <span className="risk-tag strategy">{r.strategy}</span>
                <p>{r.strategyText}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ===== 9. DEVELOPERS ===== */}
      <section className="section developers" id="developers">
        <div className="dev-side">
          <Overline>{t.devOverline}</Overline>
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
      <footer>
        <div className="footer-cols">
          <div className="footer-brand">
            <a className="brand" href="#top">
              <Image src="/logo.jpg" alt="UnityPay" width={36} height={36} />
              <span>{t.footerBrand}</span>
            </a>
            <p>{t.footerDesc}</p>
          </div>
          <div className="footer-col">
            <h4>{t.footerColProduct}</h4>
            <nav>
              <a href="#architecture">{t.footerLinkPay}</a>
              <a href="#capabilities">{t.footerLinkCapabilities}</a>
              <a href="#developers">{t.footerLinkApi}</a>
            </nav>
          </div>
          <div className="footer-col">
            <h4>{t.footerColCompliance}</h4>
            <nav>
              <a href="#compliance">{t.footerLinkCompliance}</a>
              <a href="#security">{t.footerLinkSecurity}</a>
              <a href="#risk">{t.footerLinkRisk}</a>
            </nav>
          </div>
          <div className="footer-col">
            <h4>{t.footerColCompany}</h4>
            <nav>
              <a href="#contact">{t.footerLinkContact}</a>
              <a href="#">{t.footerLinkTerms}</a>
              <a href="#">{t.footerLinkPrivacy}</a>
            </nav>
          </div>
        </div>
        <div className="footer-regulatory">
          <p>{t.footerDisclaimer}</p>
        </div>
        <div className="footer-bottom">
          <span>{t.footerCopyright}</span>
          <span className="footer-bottom-dot">·</span>
          <a href="#">{t.footerLinkTerms}</a>
          <span className="footer-bottom-dot">·</span>
          <a href="#">{t.footerLinkPrivacy}</a>
        </div>
      </footer>
    </main>
  );
}
