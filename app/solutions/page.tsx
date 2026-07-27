"use client";

import { useEffect, useState } from "react";
import type { Locale } from "../lib/locale";
import { useLocale } from "../lib/locale";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function SolutionsPage() {
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

      {/* ===== HERO ===== */}
      <section className="solutions-hero">
        <p className="overline"><i />解决方案</p>
        <h1>
          解耦式收单与
          <br />
          <em>合规出金架构</em>
        </h1>
        <p className="solutions-desc">
          基于真实贸易服务场景，以物理隔离架构连接法币收单与合规出金，确保每一笔资金流转都有清晰的牌照边界与审计轨迹。
        </p>
      </section>

      {/* ===== 架构三段式 ===== */}
      <section className="solutions-arch">
        <div className="section-header">
          <p className="overline"><i />架构总览</p>
          <h2>三段式解耦流程</h2>
        </div>
        <div className="arch-three">
          <article className="arch-three-card">
            <span className="arch-three-num">01</span>
            <div className="arch-three-label">前端收单</div>
            <h3>Acquiring</h3>
            <ul>
              <li>依托加拿大 MSB 与香港 MSO 牌照资质</li>
              <li>基于真实贸易服务场景，进行信用卡或法币收单</li>
              <li>使用正常商业 MCC 代码（如 5999），确保收单通道合规</li>
            </ul>
          </article>
          <span className="arch-three-arrow">→</span>
          <article className="arch-three-card">
            <span className="arch-three-num">02</span>
            <div className="arch-three-label">资金停靠</div>
            <h3>VA Parking</h3>
            <ul>
              <li>法币资金清算至专属虚拟账户 (VA)</li>
              <li>资金性质界定为&ldquo;商户/客户已合法拥有的法币收入&rdquo;</li>
              <li>实现法币流与加密流的物理隔离与时间缓冲</li>
            </ul>
          </article>
          <span className="arch-three-arrow">→</span>
          <article className="arch-three-card">
            <span className="arch-three-num">03</span>
            <div className="arch-three-label">用户决策与分流</div>
            <h3>Routing</h3>
            <ul>
              <li><b>法币路径：</b>客户选择法币，MSO 执行常规法币汇款</li>
              <li><b>加密路径：</b>客户选择稳定币，跳转至持牌 OTC（OSL / MetaComp）</li>
              <li>MSO 仅按指令将 VA 资金汇至 OTC 信托账户，OTC 负责兑换</li>
            </ul>
          </article>
        </div>
      </section>

      {/* ===== 四段流程 ===== */}
      <section className="solutions-flow">
        <div className="section-header">
          <p className="overline"><i />流程详解</p>
          <h2>四段清晰流程</h2>
        </div>
        <div className="flow-four">
          {[
            { num: "①", name: "业务核验", desc: "KYB 企业尽调、实际控制人识别、贸易凭证交叉验证" },
            { num: "②", name: "法币收单", desc: "银行卡、银行转账、本地支付，订单匹配清分对账" },
            { num: "③", name: "合规路由", desc: "制裁筛查、交易监控、24 小时聚合，路由至合资格伙伴" },
            { num: "④", name: "结算执行", desc: "持牌 OTC 独立执行兑换，返回可审计结算状态" },
          ].map((step, i) => (
            <article className="flow-step" key={step.num}>
              <span className="flow-step-num">{step.num}</span>
              <h4>{step.name}</h4>
              <p>{step.desc}</p>
              {i < 3 && <span className="flow-step-arrow">↓</span>}
            </article>
          ))}
        </div>
      </section>

      {/* ===== 适用场景 ===== */}
      <section className="solutions-scenarios">
        <div className="section-header">
          <p className="overline"><i />适用场景</p>
          <h2>为谁而建</h2>
        </div>
        <div className="scenario-grid">
          {[
            { icon: "▣", title: "跨境电商", desc: "多币种收单" },
            { icon: "◈", title: "游戏出海", desc: "全球玩家收款" },
            { icon: "⬢", title: "贸易服务商", desc: "合规跨境结算" },
            { icon: "⌬", title: "Web3 项目方", desc: "链上支付接入" },
          ].map((s) => (
            <article className="scenario-card" key={s.title}>
              <span className="scenario-icon">{s.icon}</span>
              <b>{s.title}</b>
              <p>{s.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ===== 架构优势 ===== */}
      <section className="solutions-advantage">
        <div className="advantage-banner">
          <i>⌁</i>
          <div>
            <h3>法币流与加密流物理隔离</h3>
            <p>确保收单通道与牌照边界清晰合规</p>
          </div>
        </div>
        <div className="advantage-points">
          <article className="advantage-point">
            <span>✓</span>
            <p>MSO 全程仅处理法币流转，不触碰虚拟资产</p>
          </article>
          <article className="advantage-point">
            <span>✓</span>
            <p>合规责任由持牌机构执行，平台仅提供技术路由</p>
          </article>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <Footer locale={locale} />

      <style jsx global>{`
        .solutions-hero {
          min-height: 520px;
          padding: 170px max(4vw, 40px) 60px;
          position: relative;
          overflow: hidden;
          text-align: center;
          max-width: 1440px;
          margin: 0 auto;
        }
        .solutions-hero:before {
          content: "";
          position: absolute;
          inset: 78px 0 0;
          background: radial-gradient(ellipse at 50% 30%, rgba(59, 130, 246, .14), transparent 50%),
                      radial-gradient(ellipse at 50% 60%, rgba(94, 234, 212, .06), transparent 40%);
          pointer-events: none;
        }
        .solutions-hero .overline { justify-content: center; position: relative; z-index: 2; }
        .solutions-hero h1 {
          font-size: clamp(38px, 3.6vw, 60px);
          line-height: 1.1;
          letter-spacing: -.04em;
          font-weight: 460;
          margin: 0;
          position: relative;
          z-index: 2;
        }
        .solutions-hero h1 em { font-style: normal; color: var(--blue2); }
        .solutions-desc {
          font-size: 14.5px;
          line-height: 1.9;
          color: #9fadc0;
          max-width: 640px;
          margin: 28px auto 0;
          position: relative;
          z-index: 2;
        }

        /* Architecture Three */
        .solutions-arch {
          padding: 0 max(4vw, 40px) 80px;
          max-width: 1440px;
          margin: 0 auto;
        }
        .solutions-arch .section-header { text-align: center; }
        .arch-three {
          display: grid;
          grid-template-columns: 1fr auto 1fr auto 1fr;
          align-items: start;
          gap: 0;
        }
        .arch-three-card {
          padding: 36px 28px 30px;
          background: linear-gradient(160deg, rgba(255,255,255,.04), rgba(255,255,255,.01));
          border: 1px solid var(--line);
          border-radius: 12px;
          transition: border-color .25s;
        }
        .arch-three-card:hover { border-color: rgba(94,234,212,.25); }
        .arch-three-num {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border: 1px solid rgba(94,234,212,.3);
          border-radius: 50%;
          color: var(--cyan);
          font-size: 12px;
          font-weight: 800;
          font-family: ui-monospace, monospace;
          margin-bottom: 14px;
        }
        .arch-three-label {
          font-size: 10.5px;
          letter-spacing: .18em;
          color: var(--cyan);
          text-transform: uppercase;
          margin-bottom: 6px;
          font-weight: 700;
        }
        .arch-three-card h3 { font-size: 20px; font-weight: 650; margin: 0 0 14px; color: #e0e8f0; }
        .arch-three-card ul { margin: 0; padding: 0 0 0 18px; }
        .arch-three-card li {
          font-size: 13px;
          line-height: 1.8;
          color: #8796aa;
          margin-bottom: 6px;
        }
        .arch-three-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #526076;
          font-size: 24px;
          padding: 0 14px;
          align-self: center;
          min-height: 100%;
        }

        /* Flow Four */
        .solutions-flow {
          padding: 0 max(4vw, 40px) 80px;
          max-width: 1440px;
          margin: 0 auto;
          background: var(--bg2);
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
        }
        .solutions-flow .section-header { text-align: center; padding-top: 80px; }
        .flow-four {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          border: 1px solid var(--line);
          background: rgba(255,255,255,.01);
        }
        .flow-step {
          position: relative;
          padding: 32px 24px 28px;
          border-right: 1px solid var(--line);
          text-align: center;
        }
        .flow-step:last-child { border-right: 0; }
        .flow-step-num {
          font-size: 28px;
          color: var(--cyan);
          display: block;
          margin-bottom: 12px;
        }
        .flow-step h4 { font-size: 15px; margin: 0 0 10px; font-weight: 650; color: #e0e8f0; }
        .flow-step p { font-size: 13px; line-height: 1.7; color: #8796aa; margin: 0; }
        .flow-step-arrow {
          position: absolute;
          right: -10px;
          top: 50%;
          transform: translateY(-50%);
          color: #526076;
          font-size: 18px;
          z-index: 1;
        }

        /* Scenarios */
        .solutions-scenarios {
          padding: 80px max(4vw, 40px) 80px;
          max-width: 1440px;
          margin: 0 auto;
        }
        .solutions-scenarios .section-header { text-align: center; }
        .scenario-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 13px;
        }
        .scenario-card {
          padding: 40px 24px 32px;
          background: linear-gradient(160deg, rgba(255,255,255,.04), rgba(255,255,255,.01));
          border: 1px solid var(--line);
          border-radius: 12px;
          text-align: center;
          transition: border-color .25s, background .25s;
        }
        .scenario-card:hover { border-color: rgba(94,234,212,.25); background: rgba(94,234,212,.03); }
        .scenario-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 52px;
          height: 52px;
          border: 1px solid rgba(94,234,212,.3);
          border-radius: 50%;
          color: var(--cyan);
          font-size: 22px;
          margin-bottom: 18px;
        }
        .scenario-card b { display: block; font-size: 17px; font-weight: 650; color: #e0e8f0; margin-bottom: 6px; }
        .scenario-card p { font-size: 13px; color: #8796aa; margin: 0; }

        /* Advantage */
        .solutions-advantage {
          padding: 0 max(4vw, 40px) 100px;
          max-width: 1440px;
          margin: 0 auto;
        }
        .advantage-banner {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 28px 32px;
          background: linear-gradient(160deg, rgba(94,234,212,.06), rgba(94,234,212,.02));
          border: 1px solid rgba(94,234,212,.18);
          border-radius: 12px;
          margin-bottom: 20px;
        }
        .advantage-banner i { font-size: 32px; color: var(--cyan); flex-shrink: 0; }
        .advantage-banner h3 { font-size: 18px; margin: 0 0 4px; font-weight: 650; color: #e0e8f0; }
        .advantage-banner p { font-size: 13px; color: #8796aa; margin: 0; }
        .advantage-points { display: flex; flex-direction: column; gap: 10px; }
        .advantage-point {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 16px 22px;
          background: rgba(255,255,255,.02);
          border: 1px solid var(--line);
          border-radius: 8px;
        }
        .advantage-point span {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: rgba(94,234,212,.12);
          color: var(--cyan);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
          flex-shrink: 0;
        }
        .advantage-point p { font-size: 13px; line-height: 1.6; color: #8796aa; margin: 0; }

        @media (max-width: 1050px) {
          .arch-three { grid-template-columns: 1fr; gap: 0; }
          .arch-three-arrow { transform: rotate(90deg); padding: 8px 0; }
          .flow-four { grid-template-columns: repeat(2, 1fr); }
          .flow-step:nth-child(2) { border-right: 0; }
          .flow-step:nth-child(3), .flow-step:nth-child(4) { border-top: 1px solid var(--line); }
          .flow-step-arrow:nth-child(2) .flow-step-arrow { display: none; }
        }
        @media (max-width: 760px) {
          .solutions-hero { padding: 120px 18px 48px; min-height: auto; }
          .solutions-hero h1 { font-size: 26px; }
          .solutions-desc { font-size: 13px; margin-top: 20px; }
          .solutions-arch { padding: 0 18px 48px; }
          .solutions-arch .section-header, .solutions-flow .section-header, .solutions-scenarios .section-header { text-align: center; padding-top: 48px; }
          .arch-three-arrow { display: none; }
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
