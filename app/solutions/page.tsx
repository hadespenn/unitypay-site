"use client";

import { useEffect } from "react";
import type { Locale } from "../lib/locale";
import { useLocale, useLocaleState } from "../lib/locale";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function SolutionsPage() {
  const [locale, setLocale] = useLocaleState();
  const { t } = useLocale(locale);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const map: Record<Locale, string> = {
      zh: "zh-CN", en: "en", "zh-TW": "zh-TW", ru: "ru", de: "de", es: "es", pt: "pt", ja: "ja", ko: "ko",
    };
    document.documentElement.lang = map[locale] ?? "en";
  }, [locale]);

  return (
    <main>
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
              <h4>{step.name}</h4>
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
            <h3>{t.solutionsAdvantageTitle}</h3>
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

      <style jsx global>{`
        .solutions-hero {
          min-height: 520px; padding: 170px max(4vw, 40px) 60px;
          position: relative; overflow: hidden; text-align: center;
          max-width: 1440px; margin: 0 auto;
        }
        .solutions-hero:before {
          content: ""; position: absolute; inset: 78px 0 0;
          background: radial-gradient(ellipse at 50% 30%, rgba(59,130,246,.14), transparent 50%),
                      radial-gradient(ellipse at 50% 60%, rgba(94,234,212,.06), transparent 40%);
          pointer-events: none;
        }
        .solutions-hero .overline { justify-content: center; position: relative; z-index: 2; }
        .solutions-hero h1 {
          font-size: clamp(38px, 3.6vw, 60px); line-height: 1.1;
          letter-spacing: -.04em; font-weight: 460; margin: 0;
          position: relative; z-index: 2;
        }
        .solutions-hero h1 em { font-style: normal; color: var(--blue2); }
        .solutions-desc {
          font-size: 14.5px; line-height: 1.9; color: #9fadc0;
          max-width: 640px; margin: 28px auto 0; position: relative; z-index: 2;
        }
        .solutions-arch { padding: 0 max(4vw, 40px) 80px; max-width: 1440px; margin: 0 auto; }
        .solutions-arch .section-header { text-align: center; }
        .arch-three {
          display: grid;
          grid-template-columns: 1fr 32px 1fr 32px 1fr;
          align-items: stretch;
          gap: 0;
        }
        .arch-three-card {
          padding: 36px 28px 30px;
          background: linear-gradient(160deg, rgba(255,255,255,.04), rgba(255,255,255,.01));
          border: 1px solid var(--line); border-radius: 12px; transition: border-color .25s;
          display: flex; flex-direction: column;
        }
        .arch-three-card:hover { border-color: rgba(94,234,212,.25); }
        .arch-three-num {
          display: inline-flex; align-items: center; justify-content: center;
          width: 36px; height: 36px; border: 1px solid rgba(94,234,212,.3);
          border-radius: 50%; color: var(--cyan); font-size: 12px;
          font-weight: 800; font-family: ui-monospace, monospace; flex-shrink: 0;
        }
        .arch-three-wrap { display: flex; align-items: center; gap: 16px; margin-bottom: 14px; }
        .arch-three-label {
          font-size: 10.5px; letter-spacing: .18em; color: var(--cyan);
          text-transform: uppercase; font-weight: 700;
        }
        .arch-three-card ul { margin: 0; padding: 0 0 0 18px; flex: 1; }
        .arch-three-card li { font-size: 13px; line-height: 1.8; color: #8796aa; margin-bottom: 6px; }
        .arch-three-arrow {
          display: flex; align-items: center; justify-content: center;
          color: #526076; font-size: 24px; align-self: stretch;
        }
        .arch-three-arrow::before { content: "→"; }
        .solutions-flow {
          padding: 0 max(4vw, 18px) 80px; max-width: 1440px; margin: 0 auto;
          background: var(--bg2); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line);
        }
        .solutions-flow .section-header { text-align: center; padding-top: 80px; }
        .flow-four {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 0;
          border: 1px solid var(--line); background: rgba(255,255,255,.01);
        }
        .flow-step {
          position: relative; padding: 32px 24px 28px; border-right: 1px solid var(--line); text-align: center;
        }
        .flow-step:last-child { border-right: 0; }
        .flow-step-num { font-size: 28px; color: var(--cyan); display: block; margin-bottom: 12px; }
        .flow-step h4 { font-size: 15px; margin: 0 0 10px; font-weight: 650; color: #e0e8f0; }
        .flow-step p { font-size: 13px; line-height: 1.7; color: #8796aa; margin: 0; }
        .flow-step-arrow {
          position: absolute; right: -10px; top: 50%; transform: translateY(-50%);
          color: #526076; font-size: 18px; z-index: 1;
        }
        .solutions-scenarios { padding: 80px max(4vw, 18px) 80px; max-width: 1440px; margin: 0 auto; }
        .solutions-scenarios .section-header { text-align: center; }
        .scenario-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 13px; }
        .scenario-card {
          padding: 40px 24px 32px;
          background: linear-gradient(160deg, rgba(255,255,255,.04), rgba(255,255,255,.01));
          border: 1px solid var(--line); border-radius: 12px; text-align: center;
          transition: border-color .25s, background .25s;
        }
        .scenario-card:hover { border-color: rgba(94,234,212,.25); background: rgba(94,234,212,.03); }
        .scenario-icon {
          display: inline-flex; align-items: center; justify-content: center;
          width: 52px; height: 52px; border: 1px solid rgba(94,234,212,.3);
          border-radius: 50%; color: var(--cyan); font-size: 22px; margin-bottom: 18px;
        }
        .scenario-card b { display: block; font-size: 17px; font-weight: 650; color: #e0e8f0; margin-bottom: 6px; }
        .scenario-card p { font-size: 13px; color: #8796aa; margin: 0; }
        .solutions-advantage { padding: 0 max(4vw, 40px) 100px; max-width: 1440px; margin: 0 auto; }
        .advantage-banner {
          display: flex; align-items: center; gap: 20px; padding: 28px 32px;
          background: linear-gradient(160deg, rgba(94,234,212,.06), rgba(94,234,212,.02));
          border: 1px solid rgba(94,234,212,.18); border-radius: 12px; margin-bottom: 20px;
        }
        .advantage-banner i { font-size: 32px; color: var(--cyan); flex-shrink: 0; }
        .advantage-banner h3 { font-size: 18px; margin: 0 0 4px; font-weight: 650; color: #e0e8f0; }
        .advantage-banner p { font-size: 13px; color: #8796aa; margin: 0; }
        .advantage-points { display: flex; flex-direction: column; gap: 10px; }
        .advantage-point {
          display: flex; align-items: flex-start; gap: 14px; padding: 16px 22px;
          background: rgba(255,255,255,.02); border: 1px solid var(--line); border-radius: 8px;
        }
        .advantage-point span {
          width: 24px; height: 24px; border-radius: 50%;
          background: rgba(94,234,212,.12); color: var(--cyan);
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 700; flex-shrink: 0;
        }
        .advantage-point p { font-size: 13px; line-height: 1.6; color: #8796aa; margin: 0; }
        @media (max-width: 1050px) {
          .arch-three {
            grid-template-columns: 1fr;
            gap: 0;
            max-width: 640px;
            margin: 0 auto;
          }
          .arch-three-card { padding: 28px 26px 26px; }
          .arch-three-arrow { padding: 14px 0; }
          .arch-three-arrow::before { content: "↓"; }
          .flow-four { grid-template-columns: repeat(2, 1fr); }
          .flow-step:nth-child(2) { border-right: 0; }
          .flow-step:nth-child(3), .flow-step:nth-child(4) { border-top: 1px solid var(--line); }
        }
        @media (max-width: 760px) {
          .solutions-hero { padding: 120px 18px 48px; min-height: auto; }
          .solutions-hero h1 { font-size: 26px; line-height: normal }
          .solutions-desc { font-size: 13px; margin-top: 20px; }
          .solutions-arch { padding: 0 18px 48px; }
          .solutions-arch .section-header, .solutions-flow .section-header, .solutions-scenarios .section-header { text-align: center; padding-top: 48px; }
          .arch-three-card { padding: 24px 22px 22px; }
          .arch-three-wrap { gap: 12px; margin-bottom: 12px; }
          .arch-three-label { font-size: 9.5px; letter-spacing: .15em; }
          .arch-three-card li { font-size: 12.5px; line-height: 1.7; }
          .flow-four { grid-template-columns: 1fr; }
          .flow-step { border-right: 0; border-bottom: 1px solid var(--line); }
          .flow-step:last-child { border-bottom: 0; }
          .flow-step-arrow { display: none; }
          .scenario-grid { grid-template-columns: repeat(2, 1fr); }
          .solutions-advantage { padding: 0 18px 60px; }
          .advantage-banner { flex-direction: column; text-align: center; }
        }
      `}</style>
    </main>
  );
}
