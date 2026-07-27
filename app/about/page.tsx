"use client";

import { useEffect, useState } from "react";
import type { Locale } from "../lib/locale";
import { useLocale } from "../lib/locale";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AboutPage() {
  const [locale, setLocale] = useState<Locale>("zh");
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
        <p className="overline"><i />关于 UnityPay</p>
        <h1>
          做出海企业信得过的
          <br />
          <em>跨境支付伙伴</em>
        </h1>
        <p className="about-desc">
          UnityPay 是面向出海企业的全球支付结算技术与软件服务平台，提供产品界面、流程编排、路由指令、状态展示及对账支持。
          我们以解耦式架构连接收单、合规筛查与持牌机构执行，让每一笔资金流转都有迹可循；
          支付、汇款、兑换及虚拟资产相关的受监管服务，由具备相应资质的合作伙伴独立提供。
          团队长期深耕跨境支付、贸易合规与金融科技，致力于用透明、可验证的方式连接商户、收单网络与持牌金融机构。
        </p>
      </section>

      {/* ===== MISSION · VALUES · COMMITMENT ===== */}
      <section className="about-cards">
        <div className="about-cards-grid">
          <article className="about-card">
            <span className="about-card-icon">◈</span>
            <h3>使命</h3>
            <b>让价值无国界</b>
            <p>消除跨境支付的摩擦与障碍，帮助出海企业自由流动资金。</p>
          </article>
          <article className="about-card">
            <span className="about-card-icon">⬡</span>
            <h3>价值观</h3>
            <b>合规优先</b>
            <p>合规是产品设计的一部分，而非事后补充。</p>
          </article>
          <article className="about-card">
            <span className="about-card-icon">⌁</span>
            <h3>承诺</h3>
            <b>技术中立，不持客户资产</b>
            <p>平台仅提供支付路由与软件技术服务。</p>
          </article>
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
          max-width: 680px;
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
