"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import type { LocaleContent } from "../../lib/locale";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

interface SolutionsClientProps {
  locale: string;
  t: LocaleContent;
}

export default function SolutionsPage({ locale, t }: SolutionsClientProps) {
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

      {/* ===== HERO ===== */}
      <section className="solutions-hero">
        <p className="overline"><i />{t.solutionsEyebrow}</p>
        <h1>{t.solutionsTitle}<br /><em>{t.solutionsTitleAccent}</em></h1>
        <p className="solutions-desc">{t.solutionsDesc}</p>
      </section>

      {/* ===== Architecture ===== */}
      <section className="solutions-arch">
        <div className="section-header">
          <p className="overline"><i />{t.solutionsArchEyebrow}</p>
          <h2>{t.solutionsArchTitle}</h2>
        </div>
        <div className="arch-three">
          {t.solutionsArchSteps.flatMap((step, i) => {
            const nodes: React.ReactNode[] = [
              <article className="arch-three-card" key={`card-${step.num}`}>
                <div className="arch-three-wrap">
                  <span className="arch-three-num">{step.num}</span>
                  <div className="arch-three-label">{step.label}</div>
                </div>
                <ul>
                  {step.items.map((item, j) => (
                    <li key={j}>
                      {(step.num === "03" && j === 0) ? (
                        <><b>{item.split("：")[0]}：</b>{item.split("：").slice(1).join("：")}</>
                      ) : (step.num === "03" && j === 1) ? (
                        <><b>{item.split("：")[0]}：</b>{item.split("：").slice(1).join("：")}</>
                      ) : (
                        item
                      )}
                    </li>
                  ))}
                </ul>
              </article>
            ];
            if (i < t.solutionsArchSteps.length - 1) {
              nodes.push(
                <span className="arch-three-arrow" key={`arrow-${i}`} aria-hidden="true" />
              );
            }
            return nodes;
          })}
        </div>
      </section>

      {/* ===== Flow ===== */}
      <section className="solutions-flow">
        <div className="section-header">
          <p className="overline"><i />{t.solutionsFlowEyebrow}</p>
          <h2>{t.solutionsFlowTitle}</h2>
        </div>
        <div className="flow-four">
          {t.solutionsFlowSteps.map((step, i) => (
            <article className="flow-step" key={step.num}>
              <span className="flow-step-num">{step.num}</span>
              <h3>{step.name}</h3>
              <p>{step.desc}</p>
              {i < t.solutionsFlowSteps.length - 1 && <span className="flow-step-arrow">↓</span>}
            </article>
          ))}
        </div>
      </section>

      {/* ===== Scenarios ===== */}
      <section className="solutions-scenarios">
        <div className="section-header">
          <p className="overline"><i />{t.solutionsScenarioEyebrow}</p>
          <h2>{t.solutionsScenarioTitle}</h2>
        </div>
        <div className="scenario-grid">
          {t.solutionsScenarios.map((s) => (
            <article className="scenario-card" key={s.title}>
              <span className="scenario-icon">{s.icon}</span>
              <b>{s.title}</b>
              <p>{s.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ===== Advantage ===== */}
      <section className="solutions-advantage">
        <div className="advantage-banner">
          <i>⌁</i>
          <div>
            <h2>{t.solutionsAdvantageTitle}</h2>
            <p>{t.solutionsAdvantageSubtitle}</p>
          </div>
        </div>
        <div className="advantage-points">
          {t.solutionsAdvantages.map((text, i) => (
            <article className="advantage-point" key={i}>
              <span>✓</span>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <Footer locale={locale} />
    </main>
  );
}
