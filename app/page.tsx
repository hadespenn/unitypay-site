"use client";

import Image from "next/image";
import { type Dispatch, type SetStateAction, useCallback, useEffect, useRef, useState } from "react";

// ---- types ----
type Locale = "zh" | "en" | "zh-TW" | "ru" | "de" | "es" | "pt" | "ja" | "ko";
type Pair = readonly [string, string];

interface LocaleContent {
  nav: string[];
  eyebrow: string;
  hero: string;
  heroAccent: string;
  heroText: string;
  consult: string;
  learn: string;
  stats: Pair[];
  statusLabel: string;
  statusValue: string;
  poolLabel: string;
  poolValue: string;
  mapOverline: string;
  mapTitle: string;
  mapText: string;
  mapNote: string;
  regions: Pair[];
  trustOverline: string;
  trustTitle: string;
  trustText: string;
  trusts: Pair[];
  flowOverline: string;
  flowTitle: string;
  flowAccent: string;
  steps: Pair[];
  stepLabels: string[];
  stepValues: string[];
  fiatFlowLabel: string;
  cryptoFlowLabel: string;
  isolationLabel: string;
  complianceOverline: string;
  complianceTitle: string;
  complianceText: string;
  boundaries: Pair[];
  disclaimer: string;
  devOverline: string;
  devTitle: string;
  devText: string;
  devs: Pair[];
  positioningOverline: string;
  positioningTitle: string;
  positioningText: string;
  ctaOverline: string;
  ctaTitle: string;
  ctaGuide: string;
  ctaText: string;
  contact: string;
  contactEmail: string;
  contactEmailValue: string;
  contactLocation: string;
  contactLocationValue: string;
  contactHours: string;
  contactHoursValue: string;
  footerBrand: string;
  footerDesc: string;
  footerColTech: string;
  footerColCompany: string;
  footerLinkPay: string;
  footerLinkStable: string;
  footerLinkApi: string;
  footerLinkContact: string;
  footerCopyright: string;
}

const localeInfo: { code: Locale; name: string; short: string }[] = [
  { code: "en", name: "English", short: "EN" },
  { code: "zh", name: "简体中文", short: "中文" },
  { code: "zh-TW", name: "繁體中文", short: "繁中" },
  { code: "ru", name: "Русский", short: "RU" },
  { code: "de", name: "Deutsch", short: "DE" },
  { code: "es", name: "Español", short: "ES" },
  { code: "pt", name: "Português", short: "PT" },
  { code: "ja", name: "日本語", short: "JP" },
  { code: "ko", name: "한국어", short: "KR" },
];

// ---- async locale loader with in-memory cache ----
const localeCache = new Map<string, LocaleContent>();

async function loadLocale(code: string): Promise<LocaleContent> {
  if (localeCache.has(code)) return localeCache.get(code)!;
  try {
    const res = await fetch(`/locales/${code}.json`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as LocaleContent;
    localeCache.set(code, data);
    return data;
  } catch {
    // fallback to English for any locale-loading failure
    if (code !== "en") return loadLocale("en");
    throw new Error("Failed to load English locale — critical error");
  }
}

function useLocale(locale: Locale) {
  const [t, setT] = useState<LocaleContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    loadLocale(locale)
      .then((data) => {
        if (!cancelled) {
          setT(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          // ultimate fallback — try en one more time
          loadLocale("en").then((data) => {
            if (!cancelled) {
              setT(data);
              setLoading(false);
            }
          });
        }
      });
    return () => {
      cancelled = true;
    };
  }, [locale]);

  return { t, loading } as const;
}

// ---- helpers ----
const anchors = ["#network", "#capabilities", "#flow", "#compliance", "#developers"];

function Arrow() {
  return (
    <span className="arrow" aria-hidden="true">
      ↗
    </span>
  );
}

function Overline({ children }: { children: React.ReactNode }) {
  return (
    <p className="overline">
      <i />
      {children}
    </p>
  );
}

// ---- world map ----
function WorldMap({ regions, compact = false }: { regions: readonly Pair[]; compact?: boolean }) {
  const nodes = [
    { x: 18, y: 27, i: 0 },
    { x: 22, y: 42, i: 1 },
    { x: 46, y: 30, i: 2 },
    { x: 79, y: 51, i: 3 },
    { x: 76, y: 67, i: 4 },
    { x: 29, y: 58, i: 5 },
  ];
  return (
    <div
      className={`world-map${compact ? " compact" : ""}`}
      role="img"
      aria-label={regions.map((x) => x[0]).join("、")}
    >
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
          <i />
          <b>{regions[n.i][0]}</b>
        </span>
      ))}
    </div>
  );
}

// ---- hero orbit decoration ----
function HeroOrbit({
  statusLabel,
  statusValue,
  poolLabel,
  poolValue,
}: {
  statusLabel: string;
  statusValue: string;
  poolLabel: string;
  poolValue: string;
}) {
  return (
    <div className="hero-orbit" aria-hidden="true">
      <div className="orbit-ring" />
      <div className="orbit-ring orbit-ring-2" />
      <div className="orbit-ring orbit-ring-3" />
      <div className="orbit-center">
        <span className="orbit-mark">
          U<span>P</span>
        </span>
      </div>
      <span className="orbit-coin coin-1">USDC</span>
      <span className="orbit-coin coin-2">USDC</span>
      <span className="orbit-coin coin-3">USDT</span>
      <div className="orbit-card status-card">
        <small>{statusLabel}</small>
        <b>
          <i className="dot" />
          {statusValue}
        </b>
      </div>
      <div className="orbit-card pool-card">
        <small>{poolLabel}</small>
        <div className="pool-value">{poolValue}</div>
        <div className="pool-chart">
          <i style={{ height: "38%" }} />
          <i style={{ height: "55%" }} />
          <i style={{ height: "48%" }} />
          <i style={{ height: "72%" }} />
          <i style={{ height: "65%" }} />
          <i style={{ height: "90%" }} />
          <i style={{ height: "100%" }} />
        </div>
      </div>
    </div>
  );
}

// ---- language dropdown ----
function LanguageDropdown({
  current,
  onChange,
  open,
  setOpen,
}: {
  current: Locale;
  onChange: (c: Locale) => void;
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open, setOpen]);

  const currentName = localeInfo.find((l) => l.code === current)?.name ?? "English";

  return (
    <div className={`lang-dropdown${open ? " open" : ""}`} ref={ref}>
      <button
        className="lang-trigger"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className="lang-globe" aria-hidden="true">
          ◐
        </span>
        <span className="lang-current">{currentName}</span>
        <span className="lang-caret" aria-hidden="true">
          ▾
        </span>
      </button>
      {open && (
        <ul className="lang-menu" role="listbox">
          {localeInfo.map((l) => (
            <li key={l.code} role="option" aria-selected={l.code === current}>
              <button
                className={`lang-option${l.code === current ? " active" : ""}`}
                onClick={() => onChange(l.code)}
              >
                <span className="lang-name">{l.name}</span>
                {l.code === current && (
                  <span className="lang-check" aria-hidden="true">
                    ✓
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ---- main page ----
export default function Home() {
  const [locale, setLocale] = useState<Locale>("en");
  const [menu, setMenu] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { t, loading } = useLocale(locale);

  useEffect(() => {
    const map: Record<Locale, string> = {
      zh: "zh-CN",
      en: "en",
      "zh-TW": "zh-TW",
      ru: "ru",
      de: "de",
      es: "es",
      pt: "pt",
      ja: "ja",
      ko: "ko",
    };
    document.documentElement.lang = map[locale] ?? "en";
  }, [locale]);

  if (loading || !t) {
    return (
      <main>
        <header>
          <a className="brand" href="#top">
            <Image src="/logo.jpg" alt="UnityPay" width={130} height={48} priority />
          </a>
        </header>
        <section className="hero" id="top" style={{ minHeight: 500 }}>
          <div className="hero-copy">
            <p style={{ color: "#94a3b8" }}>Loading…</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      {/* ---------- header ---------- */}
      <header>
        <a className="brand" href="#top">
          <Image src="/logo.jpg" alt="UnityPay" width={130} height={48} priority />
        </a>
        <nav className={menu ? "open" : ""}>
          {t.nav.map((x, i) => (
            <a href={anchors[i]} key={x} onClick={() => setMenu(false)}>
              {x}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <LanguageDropdown
            current={locale}
            onChange={(c) => {
              setLocale(c);
              setLangOpen(false);
            }}
            open={langOpen}
            setOpen={setLangOpen}
          />
          <a className="header-contact" href="#contact">
            {t.contact}
            <Arrow />
          </a>
          <button
            className="menu-button"
            aria-expanded={menu}
            aria-label="Toggle menu"
            onClick={() => setMenu(!menu)}
          >
            <i />
            <i />
          </button>
        </div>
      </header>

      {/* ---------- hero ---------- */}
      <section className="hero" id="top">
        <div className="hero-copy">
          <Overline>{t.eyebrow}</Overline>
          <h1>
            {t.hero}
            <br />
            <em>{t.heroAccent}</em>
          </h1>
          <p>{t.heroText}</p>
          <div className="hero-actions">
            <a className="button light" href="#contact">
              {t.consult}
              <Arrow />
            </a>
            <a className="text-link" href="#flow">
              {t.learn}
              <span>↓</span>
            </a>
          </div>
        </div>
        <HeroOrbit
          statusLabel={t.statusLabel}
          statusValue={t.statusValue}
          poolLabel={t.poolLabel}
          poolValue={t.poolValue}
        />
        <div className="hero-stats">
          {t.stats.map(([num, label]) => (
            <div key={label}>
              <b>{num}</b>
              <small>{label}</small>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- global network ---------- */}
      <section className="section network" id="network">
        <div className="section-heading">
          <div>
            <Overline>{t.mapOverline}</Overline>
            <h2>{t.mapTitle}</h2>
          </div>
          <p>{t.mapText}</p>
        </div>
        <WorldMap regions={t.regions} />
        <div className="region-grid">
          {t.regions.map(([name, text]) => (
            <article key={name}>
              <div>
                <h3>{name}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="map-note">{t.mapNote}</p>
      </section>

      {/* ---------- trust ---------- */}
      <section className="section trust" id="capabilities">
        <div className="section-heading">
          <div>
            <Overline>{t.trustOverline}</Overline>
            <h2>{t.trustTitle}</h2>
          </div>
          <p>{t.trustText}</p>
        </div>
        <div className="trust-grid">
          {t.trusts.map(([title, text], i) => (
            <article key={title}>
              <div className="trust-icon">{["◇", "⇄", "⌁"][i]}</div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- flow / swimlane ---------- */}
      <section className="section flow" id="flow">
        <div className="flow-heading">
          <Overline>{t.flowOverline}</Overline>
          <h2>
            {t.flowTitle}
            <br />
            <em>{t.flowAccent}</em>
          </h2>
        </div>
        <div className="flow-diagram">
          <div className="flow-step-row">
            {t.steps.map(([title, text], i) => (
              <div className="flow-step-item" key={title}>
                <div className="step-icon">{i + 1}</div>
                <small>{t.stepLabels[i]}</small>
                <h3>{title}</h3>
                <p>
                  {text}
                  <span className="step-value"> {t.stepValues[i]}</span>
                </p>
                {i < 3 && <span className="flow-arrow">→</span>}
              </div>
            ))}
          </div>
          <div className="flow-swimlane">
            <div className="swimlane-labels">
              <span className="lane-label fiat-label">{t.fiatFlowLabel}</span>
              <span className="lane-label crypto-label">{t.cryptoFlowLabel}</span>
            </div>
            <div className="swimlane-track">
              <div className="lane-bar fiat-bar" />
              <div className="lane-bar crypto-bar" />
              <span className="lane-divider">{t.isolationLabel}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- compliance ---------- */}
      <section className="section compliance" id="compliance">
        <div className="compliance-heading">
          <Overline>{t.complianceOverline}</Overline>
          <h2>{t.complianceTitle}</h2>
          <p>{t.complianceText}</p>
        </div>
        <div className="boundary-grid">
          {t.boundaries.map(([title, text]) => (
            <article key={title}>
              <div className="check">✓</div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <p className="disclaimer">{t.disclaimer}</p>
      </section>

      {/* ---------- developers ---------- */}
      <section className="section developers" id="developers">
        <div className="dev-copy">
          <Overline>{t.devOverline}</Overline>
          <h2>{t.devTitle}</h2>
          <p>{t.devText}</p>
          <div className="dev-list">
            {t.devs.map(([title, text], i) => (
              <article key={title}>
                <span>{["{ }", "↻", "⌁"][i]}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="code-window">
          <div>
            <i />
            <i />
            <i />
            <span>API REQUEST</span>
          </div>
          <pre>
            <b>POST</b> /v1/settlement_routes{"\n\n"}
            {'{\n  "source": "USD",\n  "destination": "USDC",\n  "amount": 25000\n}'}
            {"\n\n"}
            <em>→ 200 OK settlement route created</em>
          </pre>
        </div>
      </section>

      {/* ---------- cta ---------- */}
      <section className="section cta-section" id="contact">
        <p className="cta-guide">{t.ctaGuide}</p>
        <Overline>{t.ctaOverline}</Overline>
        <h2>{t.ctaTitle}</h2>
        <p>{t.ctaText}</p>
        <a className="button light" href="mailto:hello@unitypay.com">
          {t.contact}
          <Arrow />
        </a>
        <div className="cta-info-row">
          <a className="cta-info" href="mailto:hello@unitypay.com">
            <i aria-hidden="true">✉</i>
            <div>
              <small>{t.contactEmail}</small>
              <b>{t.contactEmailValue}</b>
            </div>
          </a>
          <div className="cta-info">
            <i aria-hidden="true">⌖</i>
            <div>
              <small>{t.contactLocation}</small>
              <b>{t.contactLocationValue}</b>
            </div>
          </div>
          <div className="cta-info">
            <i aria-hidden="true">⏱</i>
            <div>
              <small>{t.contactHours}</small>
              <b>{t.contactHoursValue}</b>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- footer ---------- */}
      <footer>
        <div className="footer-cols">
          <div className="footer-brand">
            <a className="brand" href="#top">
              <Image src="/logo.jpg" alt="UnityPay" width={130} height={48} />
              <span>{t.footerBrand}</span>
            </a>
            <p>{t.footerDesc}</p>
          </div>
          <div className="footer-col">
            <h4>{t.footerColTech}</h4>
            <nav>
              <a href="#network">{t.footerLinkPay}</a>
              <a href="#flow">{t.footerLinkStable}</a>
              <a href="#developers">{t.footerLinkApi}</a>
            </nav>
          </div>
          <div className="footer-col">
            <h4>{t.footerColCompany}</h4>
            <nav>
              <a href="#contact">{t.footerLinkContact}</a>
            </nav>
          </div>
        </div>
        <div className="footer-bottom">
          <span>{t.footerCopyright}</span>
        </div>
      </footer>
    </main>
  );
}
