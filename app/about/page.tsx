"use client";

import { useEffect, useState } from "react";
import type { Locale } from "../lib/locale";
import { useLocale } from "../lib/locale";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AboutPage() {
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
      <Header
        locale={locale}
        setLocale={setLocale}
        nav={t.nav}
        contact={t.contact}
      />

      {/* ===== ABOUT HERO ===== */}
      <section className="about-hero">
        <p className="overline"><i />{t.aboutEyebrow}</p>
        <h1>
          {t.aboutTitle}
          <br />
          <em>{t.aboutTitleAccent}</em>
        </h1>
        <p className="about-desc">
          {t.aboutDesc}
        </p>
      </section>

      {/* ===== MISSION · VALUES · COMMITMENT ===== */}
      <section className="about-cards">
        <div className="about-cards-grid">
          {t.aboutMissionCards.map((card, i) => (
            <article className="about-card" key={i}>
              <span className="about-card-icon">{["◈", "⬡", "⌁"][i]}</span>
              <h3>{card.title}</h3>
              <b>{card.subtitle}</b>
              <p>{card.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <Footer locale={locale} />

      <style jsx global>{`
        .about-hero {
          min-height: 520px;
          padding: 170px max(4vw, 40px) 60px;
          position: relative;
          overflow: hidden;
          text-align: center;
          max-width: 1440px;
          margin: 0 auto;
        }
        .about-hero:before {
          content: "";
          position: absolute;
          inset: 78px 0 0;
          background: radial-gradient(ellipse at 50% 30%, rgba(59, 130, 246, .14), transparent 50%),
                      radial-gradient(ellipse at 50% 60%, rgba(94, 234, 212, .06), transparent 40%);
          pointer-events: none;
        }
        .about-hero .overline {
          justify-content: center;
          position: relative;
          z-index: 2;
        }
        .about-hero h1 {
          font-size: clamp(38px, 3.6vw, 60px);
          line-height: 1.1;
          letter-spacing: -.04em;
          font-weight: 460;
          margin: 0;
          position: relative;
          z-index: 2;
        }
        .about-hero h1 em {
          font-style: normal;
          color: var(--blue2);
        }
        .about-desc {
          font-size: 14.5px;
          line-height: 1.9;
          color: #9fadc0;
          max-width: 850px;
          margin: 28px auto 0;
          position: relative;
          z-index: 2;
        }

        .about-cards {
          padding: 0 max(4vw, 40px) 100px;
          max-width: 1440px;
          margin: 0 auto;
        }
        .about-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 13px;
        }
        .about-card {
          padding: 42px 32px 36px;
          background: linear-gradient(160deg, rgba(255, 255, 255, .04), rgba(255, 255, 255, .01));
          border: 1px solid var(--line);
          border-radius: 12px;
          text-align: center;
          transition: border-color .25s, background .25s;
        }
        .about-card:hover {
          border-color: rgba(94, 234, 212, .25);
          background: rgba(94, 234, 212, .03);
        }
        .about-card-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 52px;
          height: 52px;
          border: 1px solid rgba(94, 234, 212, .3);
          border-radius: 50%;
          color: var(--cyan);
          font-size: 22px;
          margin-bottom: 20px;
        }
        .about-card h3 {
          font-size: 10.5px;
          letter-spacing: .18em;
          color: var(--cyan);
          text-transform: uppercase;
          margin: 0 0 14px;
          font-weight: 700;
        }
        .about-card b {
          display: block;
          font-size: 18px;
          font-weight: 650;
          color: #e0e8f0;
          margin-bottom: 10px;
          line-height: 1.35;
        }
        .about-card p {
          font-size: 13px;
          line-height: 1.75;
          color: #8796aa;
          margin: 0;
        }

        @media (max-width: 760px) {
          .about-hero {
            padding: 120px 18px 48px;
            min-height: auto;
          }
          .about-hero h1 {
            font-size: 26px;
          }
          .about-desc {
            font-size: 13px;
            margin-top: 20px;
          }
          .about-cards {
            padding: 0 18px 60px;
          }
          .about-cards-grid {
            grid-template-columns: 1fr;
          }
          .about-card {
            padding: 32px 24px 28px;
          }
        }
      `}</style>
    </main>
  );
}
