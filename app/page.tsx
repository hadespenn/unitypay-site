"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Locale = "zh" | "en" | "zh-TW" | "ru" | "de" | "es" | "pt" | "ja" | "ko";

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
type Pair = readonly [string, string];

const content = {
  zh: {
    nav: ["全球网络", "核心能力", "运作方式", "合规边界", "开发者"],
    eyebrow: "全球支付基础设施", hero: "为出海企业打造合规", heroAccent: "跨境支付基础设施",
    heroText: "为跨境企业提供全球法币收单、合规路由与稳定币结算的一体化方案。法币流与加密流物理隔离，确保收单通道与牌照边界清晰合规。",
    consult: "咨询接入方案", learn: "了解运作方式",
    stats: [["120+", "可覆盖市场"], ["40+", "结算币种支持"], ["99.99%", "基础设施可用性"], ["24/7", "交易与风险监控"]] as Pair[],
    statusLabel: "结算状态", statusValue: "已完成", poolLabel: "终端资金池", poolValue: "$ 84,290.00",
    mapOverline: "全球覆盖", mapTitle: "合规网络 · 覆盖主要金融枢纽",
    mapText: "从北美、欧洲到亚洲，以清晰的牌照边界和经审核的合作伙伴网络连接跨境收付。",
    mapNote: "服务及可用性因司法辖区、客户资格和合作伙伴覆盖而异，由当地持牌机构独立执行。",
    regions: [["加拿大", "MSB 登记，FINTRAC 合规框架"], ["美国", "跨境支付通道与 FATF 互认"], ["英国", "制裁筛查与全球合规标准"], ["香港", "MSO 牌照，法币服务边界清晰"], ["新加坡", "亚洲枢纽，MPC 技术架构"], ["开曼 / BVI", "独立科技公司架构，风险隔离"]] as Pair[],
    trustOverline: "为什么选择 UnityPay", trustTitle: "三重信任锚点", trustText: "合规贯穿从牌照申请、架构设计到资产处理的每一个环节，是产品设计的一部分，而非事后补充。",
    trusts: [["牌照合规，边界清晰", "依托加拿大 MSB 与香港 MSO 牌照，严格限定法币服务范围，不触碰虚拟资产托管与投资建议。"], ["解耦架构，风险隔离", "法币收单、资金停靠、兑换路由三段式设计，切断前端收单与后端加密资产的直接法律联系。"], ["法币与加密隔离，不持客户资产", "平台仅提供支付路由与软件技术服务，客户资产由持牌 OTC 机构独立处理。"]] as Pair[],
    flowOverline: "运作方式", flowTitle: "解耦式收单与结算", flowAccent: "四段清晰流程",
    steps: [["法币收单", "基于真实贸易场景，通过合规通道完成信用卡与法币收款，使用正常商业 MCC 代码。"], ["资金停靠（VA 缓冲）", "法币资金清算至专属虚拟账户（VA），实现法币流与加密流物理隔离与时间缓冲。"], ["合规路由", "客户选择法币结算或稳定币兑换，MSO 仅处理法币流转，兑换由持牌 OTC 机构执行。"], ["结算与钱包生态", "稳定币下发至客户自托管钱包，支持链上理财与合规出金。"]] as Pair[],
    stepLabels: ["收单", "资金停靠", "合规路由", "结算"],
    stepValues: ["资金安全入账，合规通道保障", "虚拟账户作为中转站，实现资金与加密资产的时空隔离", "持牌机构执行兑换，合规责任清晰", "稳定币直达自托管钱包，资产由用户自主控制"],
    fiatFlowLabel: "法币流", cryptoFlowLabel: "加密流", isolationLabel: "物理隔离",
    complianceOverline: "合规源于设计", complianceTitle: "合规边界，写进产品设计",
    complianceText: "明确我们能做什么、不能做什么，让每个参与方的职责与风险边界清晰可审计。",
    boundaries: [["MSB 登记 ≠ 综合金融牌照", "FINTRAC 登记是反洗钱合规前提，不代表官方认可、政府背书，也不代表可从事存款类金融业务或银行/证券经营许可。"], ["不触碰红线", "不提供投资建议、不承诺收益、不托管客户资产、不吸收存款、不发行证券型代币、不参与交易撮合。"], ["监管框架全覆盖", "涵盖 FATF Travel Rule、制裁筛查、KYC / KYB、交易监控与 24 小时报告义务。"], ["MPC 非托管架构", "基于 MPC 非托管架构，平台始终无法单方面动用客户资产。"]] as Pair[],
    disclaimer: "本平台仅提供支付路由与软件技术服务，不提供投资建议，不保证资产表现。所有虚拟资产兑换及相关金融服务均由具备相应资质的持牌机构独立提供，并以正式协议及适用范围为准。服务及可用性因司法辖区、客户资格和合作伙伴覆盖而异。",
    devOverline: "开发者优先", devTitle: "开发者优先 · 一个 API，多种轨道", devText: "以清晰、稳定且可审计的接口，连接收单、路由与结算。",
    devs: [["版本化 REST API", "清晰、版本化的 REST API，配套沙箱环境与集成支持。"], ["可靠 Webhook", "支持幂等投递的 Webhook，确保事件可靠送达。"], ["加密数据传输", "加密传输合规必要信息，遵循数据保护要求。"]] as Pair[],
    positioningOverline: "基于 UNITYPAY", positioningTitle: "做出海企业信得过的跨境支付伙伴",
    positioningText: "UnityPay 是支付技术与软件服务平台，提供产品搭建、流程编排、路由指令、状态展示及对接支持；支付、汇款、兑换及数字资产相关受监管服务，由具备相应资质的合作伙伴独立提供。我们由一支长期深耕跨境支付、贸易合规与金融科技的团队组成，致力于用透明、可验证的方式连接商户、收单网络与持牌金融机构。",
    ctaOverline: "拓展全球业务", ctaTitle: "让跨境收付先经过一次合规评估",
    ctaGuide: "无论您是跨境电商、游戏出海、贸易服务商还是 Web3 项目方，我们都能提供匹配的收单与结算方案。",
    ctaText: "与我们的团队沟通您的收单市场、交易场景与结算需求，我们会评估可用通道、合规合作伙伴覆盖及上线路径。",
    contact: "联系团队",
    contactEmail: "邮箱", contactEmailValue: "hello@unitypay.com",
    contactLocation: "地点", contactLocationValue: "香港 · 新加坡 · 上海",
    contactHours: "工作时间", contactHoursValue: "周一至周五 09:00–18:00（香港时间）",
    footerBrand: "UnityPay", footerDesc: "全球支付、结算与合规技术平台。",
    footerColTech: "技术", footerColCompany: "公司",
    footerLinkPay: "支付与收款", footerLinkStable: "稳定币结算", footerLinkApi: "API 与系统集成",
    footerLinkContact: "联系我们",
    footerCopyright: "© 2026 UNITYPAY. ALL RIGHTS RESERVED.",
  },
  en: {
    nav: ["Network", "Capabilities", "How it works", "Compliance", "Developers"],
    eyebrow: "GLOBAL PAYMENT INFRASTRUCTURE", hero: "Compliant cross-border payment", heroAccent: "infrastructure for global businesses",
    heroText: "An integrated solution for fiat acquiring, compliant routing and stablecoin settlement. Physical separation between fiat and crypto flows ensures acquiring channels and licensing boundaries remain clearly compliant.",
    consult: "Discuss integration", learn: "How it works",
    stats: [["120+", "Markets covered"], ["40+", "Settlement currencies"], ["99.99%", "Infrastructure uptime"], ["24/7", "Trading & risk monitoring"]] as Pair[],
    statusLabel: "Settlement", statusValue: "Completed", poolLabel: "Liquidity pool", poolValue: "$ 84,290.00",
    mapOverline: "GLOBAL COVERAGE", mapTitle: "A compliant network across key financial hubs", mapText: "Connecting cross-border flows from North America and Europe to Asia through defined licensing boundaries and vetted partners.", mapNote: "Services and availability vary by jurisdiction, client eligibility and partner coverage, and are independently performed by locally licensed institutions.",
    regions: [["Canada", "MSB registration · FINTRAC framework"], ["United States", "Cross-border rails · FATF alignment"], ["United Kingdom", "Sanctions screening · Global standards"], ["Hong Kong", "MSO licence · Clear fiat scope"], ["Singapore", "Asia hub · MPC architecture"], ["Cayman / BVI", "Independent technology entity · Risk isolation"]] as Pair[],
    trustOverline: "WHY UNITYPAY", trustTitle: "Three anchors of trust", trustText: "Compliance runs through every step—from licence applications and architecture design to asset handling. It is part of the product design, not an afterthought.",
    trusts: [["Licensed scope, clear boundaries", "Built on Canadian MSB and Hong Kong MSO frameworks, strictly scoped to fiat services with no virtual asset custody or investment advice."], ["Decoupled architecture", "Collection, fund parking and conversion routing are separated to isolate frontend acquiring from downstream digital assets."], ["Fiat-crypto isolation, non-custodial", "We provide routing and software only. Client assets are independently handled by licensed OTC institutions."]] as Pair[],
    flowOverline: "HOW IT WORKS", flowTitle: "Decoupled collection & settlement", flowAccent: "Four clear stages",
    steps: [["Fiat collection", "Collect card and fiat payments through compliant channels based on genuine trade and standard commercial MCCs."], ["VA fund buffer", "Fiat clears to a dedicated virtual account, physically separating fiat and crypto flows while creating a timing buffer."], ["Compliant routing", "Clients choose fiat settlement or stablecoin conversion. The MSO handles fiat only; licensed OTC partners execute conversion."], ["Settlement & wallet ecosystem", "Stablecoins are delivered to client self-custody wallets for onward on-chain use and compliant payout."]] as Pair[],
    stepLabels: ["ACQUIRING", "VA BUFFER", "ROUTING", "SETTLEMENT"],
    stepValues: ["Funds securely settled through compliant channels", "Virtual accounts bridge fiat and crypto with temporal and spatial separation", "Licensed institutions execute conversion with clear compliance accountability", "Stablecoins delivered directly to self-custody wallets under user control"],
    fiatFlowLabel: "Fiat flow", cryptoFlowLabel: "Crypto flow", isolationLabel: "Physical isolation",
    complianceOverline: "COMPLIANCE BY DESIGN", complianceTitle: "Boundaries built into the product", complianceText: "A clear, auditable definition of what we do, what we do not do and who is responsible at every stage.",
    boundaries: [["MSB registration ≠ full financial licence", "FINTRAC registration is an AML prerequisite—not official endorsement, government endorsement, nor authorization to engage in deposit-taking business or banking / securities operations."], ["Clear red lines", "No investment advice, yield promises, custody of client assets, deposit-taking, issuance of security tokens, or trade matching."], ["End-to-end framework", "FATF Travel Rule, sanctions screening, KYC / KYB, transaction monitoring and applicable 24-hour reporting."], ["MPC non-custodial architecture", "Built on MPC non-custodial architecture, the platform can never unilaterally move client assets."]] as Pair[], disclaimer: "This platform provides payment routing and software technology services only. It does not provide investment advice or guarantee asset performance. All virtual asset exchange and related financial services are independently provided by appropriately licensed institutions and remain subject to formal agreements and permitted scope. Services and availability vary by jurisdiction, client eligibility and partner coverage.",
    devOverline: "DEVELOPER FIRST", devTitle: "One API, multiple rails", devText: "Clear, reliable and auditable interfaces for collection, routing and settlement.", devs: [["Versioned REST API", "Clear, versioned REST APIs with sandbox access and integration support."], ["Reliable webhooks", "Idempotent webhook delivery ensures critical events arrive reliably."], ["Encrypted data transfer", "Required compliance information is encrypted in line with data protection requirements."]] as Pair[],
    ctaOverline: "GO GLOBAL", ctaTitle: "Let your cross-border flows go through compliance first",
    ctaGuide: "Whether you're an e-commerce merchant, game publisher, trade service provider or Web3 project, we can provide a matching acquiring and settlement solution.",
    ctaText: "Talk to our team about your acquiring markets, transaction scenarios and settlement needs. We will assess available rails, compliant partner coverage and the right onboarding path.",
    contact: "Contact our team",
    contactEmail: "Email", contactEmailValue: "hello@unitypay.com",
    contactLocation: "Locations", contactLocationValue: "Hong Kong · Singapore · Shanghai",
    contactHours: "Hours", contactHoursValue: "Mon–Fri 09:00–18:00 (HKT)",
    footerBrand: "UnityPay", footerDesc: "Global payments, settlement and compliance infrastructure.",
    footerColTech: "Technology", footerColCompany: "Company",
    footerLinkPay: "Payments & acquiring", footerLinkStable: "Stablecoin settlement", footerLinkApi: "API & integrations",
    footerLinkContact: "Contact us",
    footerCopyright: "© 2026 UNITYPAY. ALL RIGHTS RESERVED.",
  },
  "zh-TW": {
    nav: ["全球網路", "核心能力", "運作方式", "合規邊界", "開發者"],
    eyebrow: "全球支付基礎設施", hero: "為出海企業打造合規", heroAccent: "跨境支付基礎設施",
    heroText: "為跨境企業提供全球法幣收單、合規路由與穩定幣結算的一體化方案。法幣流與加密流物理隔離，確保收單通道與牌照邊界清晰合規。",
    consult: "諮詢接入方案", learn: "了解運作方式",
    stats: [["120+", "可覆蓋市場"], ["40+", "結算幣種支持"], ["99.99%", "基礎設施可用性"], ["24/7", "交易與風險監控"]] as Pair[],
    statusLabel: "結算狀態", statusValue: "已完成", poolLabel: "終端資金池", poolValue: "$ 84,290.00",
    mapOverline: "全球覆蓋", mapTitle: "合規網路 · 覆蓋主要金融樞紐",
    mapText: "從北美、歐洲到亞洲，以清晰的牌照邊界和經審核的合作夥伴網路連接跨境收付。",
    mapNote: "服務及可用性因司法轄區、客戶資格和合作夥伴覆蓋而異，由當地持牌機構獨立執行。",
    regions: [["加拿大", "MSB 登記，FINTRAC 合規框架"], ["美國", "跨境支付通道與 FATF 互認"], ["英國", "制裁篩查與全球合規標準"], ["香港", "MSO 牌照，法幣服務邊界清晰"], ["新加坡", "亞洲樞紐，MPC 技術架構"], ["開曼 / BVI", "獨立科技公司架構，風險隔離"]] as Pair[],
    trustOverline: "為什麼選擇 UnityPay", trustTitle: "三重信任錨點", trustText: "合規貫穿從牌照申請、架構設計到資產處理的每一個環節，是產品設計的一部分，而非事後補充。",
    trusts: [["牌照合規，邊界清晰", "依托加拿大 MSB 與香港 MSO 牌照，嚴格限定法幣服務範圍，不觸碰虛擬資產託管與投資建議。"], ["解耦架構，風險隔離", "法幣收單、資金停靠、兌換路由三段式設計，切斷前端收單與後端加密資產的直接法律聯繫。"], ["法幣與加密隔離，不持客戶資產", "平台僅提供支付路由與軟件技術服務，客戶資產由持牌 OTC 機構獨立處理。"]] as Pair[],
    flowOverline: "運作方式", flowTitle: "解耦式收單與結算", flowAccent: "四段清晰流程",
    steps: [["法幣收單", "基於真實貿易場景，通過合規通道完成信用卡與法幣收款，使用正常商業 MCC 代碼。"], ["資金停靠（VA 緩衝）", "法幣資金清算至專屬虛擬帳戶（VA），實現法幣流與加密流物理隔離與時間緩衝。"], ["合規路由", "客戶選擇法幣結算或穩定幣兌換，MSO 僅處理法幣流轉，兌換由持牌 OTC 機構執行。"], ["結算與錢包生態", "穩定幣下發至客戶自託管錢包，支持鏈上理財與合規出金。"]] as Pair[],
    stepLabels: ["收單", "資金停靠", "合規路由", "結算"],
    stepValues: ["資金安全入帳，合規通道保障", "虛擬帳戶作為中轉站，實現資金與加密資產的時空隔離", "持牌機構執行兌換，合規責任清晰", "穩定幣直達自託管錢包，資產由用戶自主控制"],
    fiatFlowLabel: "法幣流", cryptoFlowLabel: "加密流", isolationLabel: "物理隔離",
    complianceOverline: "合規源於設計", complianceTitle: "合規邊界，寫進產品設計",
    complianceText: "明確我們能做什麼、不能做什麼，讓每個參與方的職責與風險邊界清晰可審計。",
    boundaries: [["MSB 登記 ≠ 綜合金融牌照", "FINTRAC 登記是反洗錢合規前提，不代表官方認可、政府背書，也不代表可從事存款類金融業務或銀行/證券經營許可。"], ["不觸碰紅線", "不提供投資建議、不承諾收益、不託管客戶資產、不吸收存款、不發行證券型代幣、不參與交易撮合。"], ["監管框架全覆蓋", "涵蓋 FATF Travel Rule、制裁篩查、KYC / KYB、交易監控與 24 小時報告義務。"], ["MPC 非託管架構", "基於 MPC 非託管架構，平台始終無法單方面動用客戶資產。"]] as Pair[],
    disclaimer: "本平台僅提供支付路由與軟件技術服務，不提供投資建議，不保證資產表現。所有虛擬資產兌換及相關金融服務均由具備相應資質的持牌機構獨立提供，並以正式協議及適用範圍為準。服務及可用性因司法轄區、客戶資格和合作夥伴覆蓋而異。",
    devOverline: "開發者優先", devTitle: "開發者優先 · 一個 API，多種軌道", devText: "以清晰、穩定且可審計的接口，連接收單、路由與結算。",
    devs: [["版本化 REST API", "清晰、版本化的 REST API，配套沙箱環境與集成支持。"], ["可靠 Webhook", "支持冪等投遞的 Webhook，確保事件可靠送達。"], ["加密數據傳輸", "加密傳輸合規必要信息，遵循數據保護要求。"]] as Pair[],
    positioningOverline: "基於 UNITYPAY", positioningTitle: "做出海企業信得過的跨境支付夥伴",
    positioningText: "UnityPay 是支付技術與軟件服務平台，提供產品搭建、流程編排、路由指令、狀態展示及對接支持；支付、匯款、兌換及數字資產相關受監管服務，由具備相應資質的合作夥伴獨立提供。我們由一支長期深耕跨境支付、貿易合規與金融科技的團隊組成，致力於用透明、可驗證的方式連接商戶、收單網路與持牌金融機構。",
    ctaOverline: "拓展全球業務", ctaTitle: "讓跨境收付先經過一次合規評估",
    ctaGuide: "無論您是跨境電商、遊戲出海、貿易服務商還是 Web3 項目方，我們都能提供匹配的收單與結算方案。",
    ctaText: "與我們的團隊溝通您的收單市場、交易場景與結算需求，我們會評估可用通道、合規合作夥伴覆蓋及上線路徑。",
    contact: "聯絡團隊",
    contactEmail: "郵箱", contactEmailValue: "hello@unitypay.com",
    contactLocation: "地點", contactLocationValue: "香港 · 新加坡 · 上海",
    contactHours: "工作時間", contactHoursValue: "週一至週五 09:00–18:00（香港時間）",
    footerBrand: "UnityPay", footerDesc: "全球支付、結算與合規技術平台。",
    footerColTech: "技術", footerColCompany: "公司",
    footerLinkPay: "支付與收款", footerLinkStable: "穩定幣結算", footerLinkApi: "API 與系統集成",
    footerLinkContact: "聯絡我們",
    footerCopyright: "© 2026 UNITYPAY. ALL RIGHTS RESERVED.",
  },
};
const getContent = (locale: Locale) => (content as Record<string, typeof content.en>)[locale] ?? content.en;

const anchors = ["#network", "#capabilities", "#flow", "#compliance", "#developers"];
const Arrow = () => <span className="arrow" aria-hidden="true">↗</span>;
const Overline = ({ children }: { children: React.ReactNode }) => <p className="overline"><i />{children}</p>;

function WorldMap({ regions, compact = false }: { regions: readonly Pair[]; compact?: boolean }) {
  const nodes = [{x:18,y:27,i:0},{x:22,y:42,i:1},{x:46,y:30,i:2},{x:79,y:51,i:3},{x:76,y:67,i:4},{x:29,y:58,i:5}];
  return <div className={`world-map${compact ? " compact" : ""}`} role="img" aria-label={regions.map(x => x[0]).join("、")}>
    <svg viewBox="0 0 1000 500" aria-hidden="true"><g className="map-grid"><path d="M0 100H1000M0 200H1000M0 300H1000M0 400H1000M125 0V500M250 0V500M375 0V500M500 0V500M625 0V500M750 0V500M875 0V500"/></g><g className="land"><path d="M58 88 118 47l102 8 65 38 16 52-43 36-13 62-52 33-37-49-64-13-48-61Z"/><path d="m236 281 53 14 33 63-17 104-39-22-21-81-38-45Z"/><path d="m423 96 64-27 43 20 34-10 34 34 92-25 125 40 103 78-35 37-92-16-28 41-61-11-32-69-59-14-37 55-54 1-15-56-65-20Z"/><path d="m505 237 89 5 59 76-29 122-64 17-39-67-34-88Z"/><path d="m813 347 63-22 72 48-24 53-89-10Z"/></g><g className="routes"><path d="M180 140Q480 12 790 255M220 210Q510 340 760 335M460 150Q620 105 790 255M290 290Q400 195 460 150"/></g></svg>
    {nodes.map(n => <span className="map-node" style={{left:`${n.x}%`,top:`${n.y}%`}} key={n.i}><i/><b>{regions[n.i][0]}</b></span>)}
  </div>;
}

function HeroOrbit({ statusLabel, statusValue, poolLabel, poolValue }: { statusLabel: string; statusValue: string; poolLabel: string; poolValue: string }) {
  return (
    <div className="hero-orbit" aria-hidden="true">
      <div className="orbit-ring" />
      <div className="orbit-ring orbit-ring-2" />
      <div className="orbit-ring orbit-ring-3" />
      <div className="orbit-center">
        <span className="orbit-mark">U<span>P</span></span>
      </div>
      <span className="orbit-coin coin-1">USDC</span>
      <span className="orbit-coin coin-2">USDC</span>
      <span className="orbit-coin coin-3">USDT</span>
      <div className="orbit-card status-card">
        <small>{statusLabel}</small>
        <b><i className="dot" />{statusValue}</b>
      </div>
      <div className="orbit-card pool-card">
        <small>{poolLabel}</small>
        <div className="pool-value">{poolValue}</div>
        <div className="pool-chart">
          <i style={{height:"38%"}} /><i style={{height:"55%"}} /><i style={{height:"48%"}} />
          <i style={{height:"72%"}} /><i style={{height:"65%"}} /><i style={{height:"90%"}} />
          <i style={{height:"100%"}} />
        </div>
      </div>
    </div>
  );
}

function LanguageDropdown({ current, onChange, open, setOpen }: { current: Locale; onChange: (c: Locale) => void; open: boolean; setOpen: (v: boolean) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    const onEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onEsc);
    return () => { document.removeEventListener("mousedown", onClick); document.removeEventListener("keydown", onEsc); };
  }, [open, setOpen]);
  const currentName = localeInfo.find(l => l.code === current)?.name ?? "English";
  return <div className={`lang-dropdown${open ? " open" : ""}`} ref={ref}>
    <button className="lang-trigger" onClick={() => setOpen(!open)} aria-expanded={open} aria-haspopup="listbox">
      <span className="lang-globe" aria-hidden="true">◐</span>
      <span className="lang-current">{currentName}</span>
      <span className="lang-caret" aria-hidden="true">▾</span>
    </button>
    {open && <ul className="lang-menu" role="listbox">
      {localeInfo.map(l => <li key={l.code} role="option" aria-selected={l.code === current}>
        <button className={`lang-option${l.code === current ? " active" : ""}`} onClick={() => onChange(l.code)}>
          <span className="lang-name">{l.name}</span>
          {l.code === current && <span className="lang-check" aria-hidden="true">✓</span>}
        </button>
      </li>)}
    </ul>}
  </div>;
}

export default function Home() {
  const [locale, setLocale] = useState<Locale>("en"); const [menu, setMenu] = useState(false); const [langOpen, setLangOpen] = useState(false); const t = getContent(locale);
  useEffect(() => { const map: Record<Locale, string> = { "zh": "zh-CN", "en": "en", "zh-TW": "zh-TW", "ru": "ru", "de": "de", "es": "es", "pt": "pt", "ja": "ja", "ko": "ko" }; document.documentElement.lang = map[locale] ?? "en"; }, [locale]);
  return <main>
    <header><a className="brand" href="#top"><Image src="/logo.jpg" alt="UnityPay" width={130} height={48} priority/></a><nav className={menu ? "open" : ""}>{t.nav.map((x,i)=><a href={anchors[i]} key={x} onClick={()=>setMenu(false)}>{x}</a>)}</nav><div className="header-actions"><LanguageDropdown current={locale} onChange={(c)=>{setLocale(c); setLangOpen(false);}} open={langOpen} setOpen={setLangOpen}/><a className="header-contact" href="#contact">{t.contact}<Arrow/></a><button className="menu-button" aria-expanded={menu} aria-label="Toggle menu" onClick={()=>setMenu(!menu)}><i/><i/></button></div></header>
    <section className="hero" id="top"><div className="hero-copy"><Overline>{t.eyebrow}</Overline><h1>{t.hero}<br/><em>{t.heroAccent}</em></h1><p>{t.heroText}</p><div className="hero-actions"><a className="button light" href="#contact">{t.consult}<Arrow/></a><a className="text-link" href="#flow">{t.learn}<span>↓</span></a></div></div><HeroOrbit statusLabel={t.statusLabel} statusValue={t.statusValue} poolLabel={t.poolLabel} poolValue={t.poolValue}/><div className="hero-stats">{t.stats.map(([num,label])=><div key={label}><b>{num}</b><small>{label}</small></div>)}</div></section>
    <section className="section network" id="network"><div className="section-heading"><div><Overline>{t.mapOverline}</Overline><h2>{t.mapTitle}</h2></div><p>{t.mapText}</p></div><WorldMap regions={t.regions}/><div className="region-grid">{t.regions.map(([name,text],i)=><article key={name}><div><h3>{name}</h3><p>{text}</p></div></article>)}</div><p className="map-note">{t.mapNote}</p></section>
    <section className="section trust" id="capabilities"><div className="section-heading"><div><Overline>{t.trustOverline}</Overline><h2>{t.trustTitle}</h2></div><p>{t.trustText}</p></div><div className="trust-grid">{t.trusts.map(([title,text],i)=><article key={title}><div className="trust-icon">{["◇","⇄","⌁"][i]}</div><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="section flow" id="flow"><div className="flow-heading"><Overline>{t.flowOverline}</Overline><h2>{t.flowTitle}<br/><em>{t.flowAccent}</em></h2></div><div className="flow-diagram"><div className="flow-step-row">{t.steps.map(([title,text],i)=><div className="flow-step-item" key={title}><div className="step-icon">{i+1}</div><small>{t.stepLabels[i]}</small><h3>{title}</h3><p>{text}<span className="step-value"> {t.stepValues[i]}</span></p>{i<3&&<span className="flow-arrow">→</span>}</div>)}</div><div className="flow-swimlane"><div className="swimlane-labels"><span className="lane-label fiat-label">{t.fiatFlowLabel}</span><span className="lane-label crypto-label">{t.cryptoFlowLabel}</span></div><div className="swimlane-track"><div className="lane-bar fiat-bar" /><div className="lane-bar crypto-bar" /><span className="lane-divider">{t.isolationLabel}</span></div></div></div></section>
    <section className="section compliance" id="compliance"><div className="compliance-heading"><Overline>{t.complianceOverline}</Overline><h2>{t.complianceTitle}</h2><p>{t.complianceText}</p></div><div className="boundary-grid">{t.boundaries.map(([title,text],i)=><article key={title}><div className="check">✓</div><h3>{title}</h3><p>{text}</p></article>)}</div><p className="disclaimer">{t.disclaimer}</p></section>
    <section className="section developers" id="developers"><div className="dev-copy"><Overline>{t.devOverline}</Overline><h2>{t.devTitle}</h2><p>{t.devText}</p><div className="dev-list">{t.devs.map(([title,text],i)=><article key={title}><span>{["{ }","↻","⌁"][i]}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div><div className="code-window"><div><i/><i/><i/><span>API REQUEST</span></div><pre><b>POST</b> /v1/settlement_routes{`\n\n`}{`{\n  "source": "USD",\n  "destination": "USDC",\n  "amount": 25000\n}`}{`\n\n`}<em>→ 200 OK  settlement route created</em></pre></div></section>
<section className="section cta-section" id="contact">
  <p className="cta-guide">{t.ctaGuide}</p>
  <Overline>{t.ctaOverline}</Overline><h2>{t.ctaTitle}</h2><p>{t.ctaText}</p>
  <a className="button light" href="mailto:hello@unitypay.com">{t.contact}<Arrow/></a>
  <div className="cta-info-row">
    <a className="cta-info" href="mailto:hello@unitypay.com"><i aria-hidden="true">✉</i><div><small>{t.contactEmail}</small><b>{t.contactEmailValue}</b></div></a>
    <div className="cta-info"><i aria-hidden="true">⌖</i><div><small>{t.contactLocation}</small><b>{t.contactLocationValue}</b></div></div>
    <div className="cta-info"><i aria-hidden="true">⏱</i><div><small>{t.contactHours}</small><b>{t.contactHoursValue}</b></div></div>
  </div>
</section>
<footer>
  <div className="footer-cols">
    <div className="footer-brand"><a className="brand" href="#top"><Image src="/logo.jpg" alt="UnityPay" width={130} height={48}/><span>{t.footerBrand}</span></a><p>{t.footerDesc}</p></div>
    <div className="footer-col"><h4>{t.footerColTech}</h4><nav><a href="#network">{t.footerLinkPay}</a><a href="#flow">{t.footerLinkStable}</a><a href="#developers">{t.footerLinkApi}</a></nav></div>
    <div className="footer-col"><h4>{t.footerColCompany}</h4><nav><a href="#contact">{t.footerLinkContact}</a></nav></div>
  </div>
  <div className="footer-bottom"><span>{t.footerCopyright}</span></div>
</footer>
  </main>;
}