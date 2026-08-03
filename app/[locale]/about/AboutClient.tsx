"use client";

import { useEffect } from "react";
import type { LocaleContent, Locale } from "../../lib/locale";
import { useLocaleState } from "../../lib/locale";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

interface AboutClientProps {
  locale: string;
  t: LocaleContent;
}

export default function AboutClient({ locale: _locale, t }: AboutClientProps) {
  const [locale, setLocale] = useLocaleState();

  // 页面滚动置顶
  useEffect(() => { requestAnimationFrame(() => window.scrollTo(0, 0)); }, []);

  return (
    <main id="main-content">
      <Header
        locale={locale}
        setLocale={setLocale}
        nav={t.nav}
        contact={t.contact}
      />

      <section className="about-hero">
        <p className="overline"><i />{t.aboutEyebrow}</p>
        <h1>
          {t.aboutTitle}
          <br />
          <em>{t.aboutTitleAccent}</em>
        </h1>
        <p className="about-desc">{t.aboutDesc}</p>
      </section>

      <section className="about-cards">
        <div className="about-cards-grid">
          {t.aboutMissionCards.map((card: any, i: number) => (
            <article className="about-card" key={i}>
              <span className="about-card-icon">{["◈", "⬡", "⌁"][i]}</span>
              <h2>{card.title}</h2>
              <b>{card.subtitle}</b>
              <p>{card.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <Footer locale={locale} />
    </main>
  );
}