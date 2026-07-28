"use client";

import { useEffect, useState } from "react";
import type { Locale } from "../lib/locale";
import { useLocale } from "../lib/locale";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function CompliancePage() {
  const [locale, setLocale] = useState<Locale>("zh");
  const { t } = useLocale(locale);

  useEffect(() => {
    const map: Record<Locale, string> = {
      zh: "zh-CN", en: "en", "zh-TW": "zh-TW", ru: "ru", de: "de", es: "es", pt: "pt", ja: "ja", ko: "ko",
    };
    document.documentElement.lang = map[locale] ?? "en";
  }, [locale]);

  const jurisdictions = [
    { region: "加拿大", framework: "MSB / FINTRAC", desc: "联邦 AML/ATF 框架下登记规定货币服务" },
    { region: "香港", framework: "MSO 牌照", desc: "严格限定法币服务，不涉足虚拟资产" },
    { region: "新加坡", framework: "MAS 框架", desc: "亚洲枢纽，MPC 技术架构" },
    { region: "开曼 / BVI", framework: "独立科技架构", desc: "风险隔离，与金融牌照主体分离" },
  ];

  const obligations = [
    { type: "客户身份核验 (KYC)", desc: "核验个人或实体身份，识别受益所有人" },
    { type: "企业尽职调查 (KYB)", desc: "审查商户实际控制人、业务模式、历史交易" },
    { type: "制裁筛查", desc: "客户、受益所有人、代理、母子公司、收付款人筛查" },
    { type: "交易监控", desc: "持续信号与可配置规则，识别异常活动" },
    { type: "可疑交易报告（STR）", desc: "有合理理由怀疑与洗钱/恐怖融资有关时，无金额门槛报告" },
    { type: "24小时聚合报告", desc: "大额现金、虚拟货币、电子资金转移报告" },
    { type: "FATF Travel Rule", desc: "应报告 EFT 或虚拟货币转移随附发起人与受益人信息" },
    { type: "记录保存", desc: "多数法定记录至少保存 5 年" },
  ];

  const boundaries = [
    { label: "不提供投资建议", desc: "平台内容仅限技术教育与信息披露" },
    { label: "不承诺收益", desc: "不保证任何投资回报或资产增值" },
    { label: "不托管客户资产", desc: "平台不持有客户私钥或资金" },
    { label: "不吸收存款", desc: "不接受客户资金作为平台负债" },
    { label: "不发行证券型代币", desc: "不发行或承销任何形式的证券型代币" },
    { label: "不参与交易撮合", desc: "平台不介入买卖双方的交易匹配" },
  ];

  const risks = [
    {
      title: "贸易背景真实性",
      desc: "虚假贸易可能利用通道洗钱",
      strategy: "强制真实贸易凭证核验 · AI驱动交易监控",
    },
    {
      title: "OTC第三方入金限制",
      desc: "合规OTC严禁第三方入金",
      strategy: "B2B支付网关协议 · API级合规信息同步",
    },
    {
      title: "KYC重复摩擦",
      desc: "跨平台重复认证导致用户流失",
      strategy: "KYC互认协议 · 1-Click授权开户",
    },
    {
      title: "SFC监管红线",
      desc: "投资建议触犯第4类牌照要求",
      strategy: "坚守技术中立 · 明确免责声明",
    },
  ];

  return (
    <main>
      <Header locale={locale} setLocale={setLocale} nav={t.nav} contact={t.contact} />

      {/* ===== 1. HERO ===== */}
      <section className="compliance-hero">
        <p className="overline"><i />合规与信任</p>
        <h1>
          合规融入产品设计
          <br />
          <em>而非事后补充</em>
        </h1>
        <p className="compliance-hero-desc">
          我们以透明公开的合规框架连接持牌金融机构，确保每一笔资金流转都满足多司法辖区的监管要求。
        </p>
      </section>

      {/* ===== 2. CORE STATEMENT ===== */}
      <section className="compliance-statement-section">
        <div className="statement-banner">
          <div className="statement-title">
          <i>⚠</i>
           <h3>重要声明</h3>
          </div>
           
            <p>
              MSB 登记是反洗钱合规的前提，不代表政府背书或综合金融牌照。
              FINTRAC 登记是 AML 合规必要条件，不构成银行、证券或存款业务的经营许可。
            </p>
          
        </div>
      </section>

      {/* ===== 3. JURISDICTIONS ===== */}
      <section className="compliance-section compliance-jurisdictions">
        <div className="section-header">
          <p className="overline"><i />全球布局</p>
          <h2>持牌司法辖区</h2>
        </div>
        <div className="jurisdiction-table">
          <div className="jurisdiction-row header">
            <div>地区</div>
            <div>框架 / 牌照</div>
            <div>说明</div>
          </div>
          {jurisdictions.map((j) => (
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
          <p className="overline"><i />合规义务</p>
          <h2>清单式义务框架</h2>
        </div>
        <div className="obligation-grid">
          {obligations.map((o) => (
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
          <p className="overline"><i />边界声明</p>
          <h2>明确"我们不做的事"</h2>
        </div>
        <div className="boundaries-grid">
          {boundaries.map((b) => (
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
          <p className="overline"><i />风险与应对</p>
          <h2>四大核心风险</h2>
        </div>
        <div className="compliance-risk-grid">
          {risks.map((r) => (
            <article className="compliance-risk-card" key={r.title}>
              <div className="compliance-risk-top">
                <div className="compliance-risk-head">
                  <span className="compliance-risk-icon">⚠</span>
                  <h4>{r.title}</h4>
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
            本平台仅提供支付路由与软件技术服务，不提供投资建议，不保证资产表现。
            所有虚拟资产兑换及相关金融服务均由具备相应资质的持牌机构独立提供，并以正式协议及适用范围为准。
            服务及可用性因司法辖区、客户资格和合作伙伴覆盖而异。
          </p>
        </div>
      </section>

      {/* ===== 8. FOOTER ===== */}
      <Footer locale={locale} />

      <style jsx global>{`
        /* ----- Hero ----- */
        .compliance-hero {
          min-height: 520px;
          padding: 170px max(4vw, 40px) 60px;
          position: relative;
          overflow: hidden;
          text-align: center;
          max-width: 1440px;
          margin: 0 auto;
        }
        .compliance-hero:before {
          content: "";
          position: absolute;
          inset: 78px 0 0;
          background: radial-gradient(ellipse at 50% 30%, rgba(201, 168, 76, .10), transparent 50%),
                      radial-gradient(ellipse at 50% 60%, rgba(94, 234, 212, .06), transparent 40%);
          pointer-events: none;
        }
        .compliance-hero .overline { justify-content: center; position: relative; z-index: 2; color: #c9a84c; }
        .compliance-hero .overline i { background: #c9a84c; }
        .compliance-hero h1 {
          font-size: clamp(38px, 3.6vw, 60px);
          line-height: 1.1;
          letter-spacing: -.04em;
          font-weight: 460;
          margin: 0;
          position: relative;
          z-index: 2;
        }
        .compliance-hero h1 em { font-style: normal; color: var(--gold); }
        .compliance-hero-desc {
          font-size: 14.5px;
          line-height: 1.9;
          color: #9fadc0;
          max-width: 720px;
          margin: 28px auto 0;
          position: relative;
          z-index: 2;
        }

        /* ----- Shared Section ----- */
        .compliance-section {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 max(4vw, 40px) 80px;
        }
        .compliance-section .section-header { text-align: center; margin-top: 24px;}
        .compliance-section .overline i { background: #c9a84c; }
        .compliance-section .overline { color: #c9a84c; justify-content: center; }

        /* ----- Statement ----- */
        .compliance-statement-section {
          padding: 0 max(4vw, 40px) 60px;
          max-width: 1440px;
          margin: 0 auto;
        }
        .statement-banner {
          display: flex;
          align-items: flex-start;
          gap: 18px;
          padding: 28px 32px;
          background: linear-gradient(160deg, rgba(201, 168, 76, .08), rgba(201, 168, 76, .02));
          border: 1px solid rgba(201, 168, 76, .25);
          border-radius: 12px;
        }
        .statement-title {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .statement-banner i { font-size: 28px; color: var(--gold); flex-shrink: 0; margin-top: 2px; }
        .statement-banner h3 { font-size: 16px; margin: 0 0 6px; font-weight: 700; color: var(--gold); }
        .statement-banner p { font-size: 14px; line-height: 1.75; color: #c0c8d4; margin: 0; }

        /* ----- Jurisdictions ----- */
        .jurisdiction-table {
          border: 1px solid var(--line);
          border-radius: 10px;
          overflow: hidden;
        }
        .jurisdiction-row {
          display: grid;
          grid-template-columns: 200px 220px 1fr;
          border-bottom: 1px solid var(--line);
        }
        .jurisdiction-row:last-child { border-bottom: 0; }
        .jurisdiction-row.header {
          background: rgba(120, 180, 210, .06);
          font-size: 11px;
          letter-spacing: .12em;
          color: var(--cyan);
          font-weight: 700;
          text-transform: uppercase;
        }
        .jurisdiction-row.header div { padding: 14px 24px; }
        .jurisdiction-row:not(.header) div {
          padding: 20px 24px;
          font-size: 13.5px;
          color: #c0c8d4;
          display: flex;
          align-items: center;
        }
        .jurisdiction-region { gap: 10px; }
        .jurisdiction-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: var(--gold);
          box-shadow: 0 0 8px rgba(201, 168, 76, .4);
          flex-shrink: 0;
        }
        .jurisdiction-region b { font-weight: 650; color: #e0e8f0; }
        .jurisdiction-framework { color: #8796aa !important; font-family: ui-monospace, monospace; font-size: 12.5px !important; }
        .jurisdiction-desc { color: #8796aa !important; }

        /* ----- Obligations ----- */
        .compliance-obligations {
          background: var(--bg2);
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          padding-top: 80px;
        }
        .obligation-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        .obligation-card {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 22px 24px;
          background: rgba(255, 255, 255, .02);
          border: 1px solid var(--line);
          border-radius: 10px;
          transition: border-color .25s;
        }
        .obligation-card:hover { border-color: rgba(201, 168, 76, .25); }
        .obligation-check {
          width: 28px; height: 28px;
          border-radius: 50%;
          background: rgba(201, 168, 76, .12);
          color: var(--gold);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 700;
          flex-shrink: 0;
        }
        .obligation-card b { display: block; font-size: 14px; font-weight: 650; color: #e0e8f0; margin-bottom: 4px; }
        .obligation-card p { font-size: 12.5px; line-height: 1.65; color: #8796aa; margin: 0; }

        /* ----- Boundaries ----- */
        .compliance-boundaries {
          background: var(--bg3);
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          padding-top: 80px;
        }
        .boundaries-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 13px;
        }
        .boundary-card {
          padding: 32px 28px 28px;
          background: linear-gradient(160deg, rgba(255, 255, 255, .03), rgba(255, 255, 255, .01));
          border: 1px solid var(--line);
          border-radius: 10px;
          position: relative;
          transition: border-color .25s;
        }
        .boundary-card:hover { border-color: rgba(248, 113, 113, .3); }
        .boundary-line {
          position: absolute;
          left: 0; top: 20px; bottom: 20px;
          width: 3px;
          background: linear-gradient(180deg, rgba(248, 113, 113, .5), rgba(248, 113, 113, .1));
          border-radius: 0 3px 3px 0;
        }
        .boundary-card b { display: block; font-size: 15px; font-weight: 650; color: #e0e8f0; margin-bottom: 8px; }
        .boundary-card p { font-size: 13px; line-height: 1.7; color: #8796aa; margin: 0; }

        /* ----- Risks ----- */
        .compliance-risks { padding-bottom: 80px; }
        .compliance-risk-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
        }
        .compliance-risk-card {
          padding: 30px 30px 28px;
          background: linear-gradient(160deg, rgba(255, 255, 255, .03), rgba(255, 255, 255, .01));
          border: 1px solid var(--line);
          border-radius: 12px;
          position: relative;
          overflow: hidden;
        }
        .compliance-risk-card:before {
          content: "";
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: linear-gradient(180deg, rgba(248, 113, 113, .5), rgba(248, 113, 113, .1));
        }
        .compliance-risk-top { padding-bottom: 20px; }
        .compliance-risk-head { display: flex; align-items: center; gap: 16px; }
        .compliance-risk-bottom { padding-top: 20px; display: flex; align-items: center; gap: 20px;}
        .compliance-risk-icon {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 14px;
          padding: 4px 10px 4px 8px;
          border-radius: 20px;
          background: rgba(248, 113, 113, .08);
          border: 1px solid rgba(248, 113, 113, .15);
          font-size: 12px;
          color: #f87171;
        }
        .compliance-risk-card h4 {
          font-size: 17px;
          margin: 0 0 10px;
          font-weight: 600;
          line-height: 1.3;
          color: #f0f4ff;
        }
        .compliance-risk-desc {
          font-size: 13px;
          line-height: 1.7;
          color: #a0aec0;
          margin: 0 48px;
        }
        .compliance-risk-divider {
          position: relative;
          height: 1px;
          margin: 0 -30px;
          background: linear-gradient(to right, transparent, rgba(120, 180, 210, .18) 30%, rgba(120, 180, 210, .18) 70%, transparent);
        }
        .compliance-risk-divider i {
          position: absolute;
          left: 50%; top: 50%;
          transform: translate(-50%, -50%);
          width: 8px; height: 8px;
          border-radius: 50%;
          background: var(--cyan);
          box-shadow: 0 0 0 4px rgba(94, 234, 212, .15);
        }
        .compliance-risk-strategy-icon {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 4px 10px 4px 8px;
          border-radius: 20px;
          background: rgba(94, 234, 212, .08);
          border: 1px solid rgba(94, 234, 212, .18);
          font-size: 12px;
          color: var(--cyan);
        }
        .compliance-risk-strategy {
          font-size: 13px;
          line-height: 1.7;
          color: #a0aec0;
          margin: 0;
        }

        /* ----- Disclaimer ----- */
        .compliance-disclaimer { padding-bottom: 100px; }
        .disclaimer-box {
          display: flex;
          align-items: flex-start;
          gap: 18px;
          padding: 28px 32px;
          background: linear-gradient(160deg, rgba(94, 234, 212, .05), rgba(94, 234, 212, .01));
          border: 1px solid rgba(94, 234, 212, .18);
          border-radius: 12px;
          max-width: 880px;
          margin: 0 auto;
        }
        .disclaimer-box i { font-size: 24px; color: var(--cyan); flex-shrink: 0; margin-top: 2px; }
        .disclaimer-box p { font-size: 14px; line-height: 1.85; color: #bac8d4; margin: 0; }

        /* ----- Responsive (tablet) ----- */
        @media (max-width: 1050px) {
          .obligation-grid { grid-template-columns: 1fr; }
          .boundaries-grid { grid-template-columns: repeat(2, 1fr); }
          .compliance-risk-grid { grid-template-columns: 1fr; gap: 16px; }
          .compliance-risk-card { padding: 24px 24px 22px; }
          .compliance-risk-divider { margin: 0 -24px; }
        }

        /* ----- Responsive (mobile) ----- */
        @media (max-width: 760px) {
          .compliance-hero { padding: 120px 18px 48px; min-height: auto; }
          .compliance-hero h1 { font-size: 26px; line-height: normal}
          .compliance-hero-desc { font-size: 13px; margin-top: 20px; }
          .compliance-statement-section { padding: 0 18px 40px; }
          .statement-banner { flex-direction: column; padding: 22px 20px; }
          .compliance-section { padding: 0 18px 48px; }
          .compliance-obligations { padding-top: 48px; padding-bottom: 60px; }
          .compliance-boundaries { padding-top: 48px; padding-bottom: 60px; }
          .compliance-risks { padding-bottom: 48px; }
          .compliance-disclaimer { padding-bottom: 60px; }
          .jurisdiction-row { grid-template-columns: 1fr; }
          .jurisdiction-row.header { display: none; }
          .jurisdiction-row:not(.header) div { padding: 14px 18px; }
          .jurisdiction-row:not(.header) div:first-child { padding-bottom: 0; }
          .jurisdiction-row:not(.header) div:last-child { padding-top: 0; }
          .obligation-grid { grid-template-columns: 1fr; }
          .boundaries-grid { grid-template-columns: 1fr; }
          .compliance-risk-grid { grid-template-columns: 1fr; }
          .disclaimer-box { flex-direction: column; padding: 22px 22px; }
        }
      `}</style>
    </main>
  );
}
