"use client";

import { useEffect, useState } from "react";
import defaultLocale from "../../public/locales/en.json";

export type Locale = "zh" | "en" | "zh-TW" | "ru" | "de" | "es" | "pt" | "ja" | "ko";
export type Pair = readonly [string, string];

export interface StepItem { num: string; label: string; title: string; desc: string; }
export interface CapItem { icon: string; title: string; desc: string; }
export interface CompCard { icon: string; title: string; desc: string; }
export interface MpcShard { icon: string; label: string; title: string; desc: string; }
export interface RiskItem { tag: string; title: string; desc: string; strategy: string; strategyText: string; }

// ---- sub-page interfaces ----
export interface AboutMissionCard { title: string; subtitle: string; desc: string; }

export interface ComplianceJurisdiction { region: string; framework: string; desc: string; }
export interface ComplianceObligation { type: string; desc: string; }
export interface ComplianceBoundary { label: string; desc: string; }
export interface ComplianceRisk { title: string; desc: string; strategy: string; }

export interface DeveloperFeature { icon: string; title: string; desc: string; }
export interface DeveloperStep { num: string; title: string; desc: string; }

export interface SolutionsArchStep { num: string; label: string; items: string[]; }
export interface SolutionsFlowStep { num: string; name: string; desc: string; }
export interface SolutionsScenario { icon: string; title: string; desc: string; }

export interface LocaleContent {
  langName: string;
  langShort: string;
  nav: string[];
  heroEyebrow: string;
  eyebrow: string;
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
  compTitleAccent: string;
  compSubtitle: string;
  compStatementLabel: string;
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
  footerLinkSolutions: string;
  footerLinkCompliance: string;
  footerLinkDevelopers: string;
  footerLinkPay: string;
  footerLinkCapabilities: string;
  footerLinkStable: string;
  footerLinkApi: string;
  footerColCompany: string;
  footerLinkAbout: string;
  footerLinkContact: string;
  footerColLegal: string;
  footerLinkTerms: string;
  footerLinkPrivacy: string;
  footerCopyright: string;
  footerDisclaimer: string;
  footerLink: string;

  // ---- about page ----
  aboutEyebrow: string;
  aboutTitle: string;
  aboutTitleAccent: string;
  aboutDesc: string;
  aboutMissionCards: AboutMissionCard[];

  // ---- compliance page ----
  complianceEyebrow: string;
  complianceTitle: string;
  complianceTitleAccent: string;
  complianceDesc: string;
  complianceStatementTitle: string;
  complianceStatementText: string;
  complianceJuriEyebrow: string;
  complianceJuriTitle: string;
  complianceJuriHeader: string[];
  complianceJurisdictions: ComplianceJurisdiction[];
  complianceObliEyebrow: string;
  complianceObliTitle: string;
  complianceObligations: ComplianceObligation[];
  complianceBounEyebrow: string;
  complianceBounTitle: string;
  complianceBoundaries: ComplianceBoundary[];
  complianceRiskEyebrow: string;
  complianceRiskTitle: string;
  complianceRisks: ComplianceRisk[];
  complianceDisclaimerText: string;

  // ---- developers page ----
  devPageEyebrow: string;
  devPageTitle: string;
  devPageTitleAccent: string;
  devPageDesc: string;
  devPageFeaturesEyebrow: string;
  devPageFeaturesTitle: string;
  devPageFeatures: DeveloperFeature[];
  devPageApiEyebrow: string;
  devPageApiTitle: string;
  devPageApiSubtitle: string;
  devPageSandboxEyebrow: string;
  devPageSandboxTitle: string;
  devPageSandboxCardTitle: string;
  devPageSandboxCardText: string;
  devPageStepsEyebrow: string;
  devPageStepsTitle: string;
  devPageSteps: DeveloperStep[];

  // ---- solutions page ----
  solutionsEyebrow: string;
  solutionsTitle: string;
  solutionsTitleAccent: string;
  solutionsDesc: string;
  solutionsArchEyebrow: string;
  solutionsArchTitle: string;
  solutionsArchSteps: SolutionsArchStep[];
  solutionsFlowEyebrow: string;
  solutionsFlowTitle: string;
  solutionsFlowSteps: SolutionsFlowStep[];
  solutionsScenarioEyebrow: string;
  solutionsScenarioTitle: string;
  solutionsScenarios: SolutionsScenario[];
  solutionsAdvantageTitle: string;
  solutionsAdvantageSubtitle: string;
  solutionsAdvantages: string[];
}

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

export function useLocale(locale: Locale) {
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
