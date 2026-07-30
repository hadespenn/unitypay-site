import { readFileSync } from "fs";
import { join } from "path";
import ComplianceClient from "./ComplianceClient";
import { getMessages, locales } from "../../lib/messages";
import { pageMetadata, breadcrumbSchema } from "../../lib/seo";
import type { Metadata } from "next";
import Script from "next/script";

const pageCSS = readFileSync(join(process.cwd(), "app/page-css/compliance.css"), "utf-8");

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "compliance", (t) => ({ title: t.complianceSeoTitle, description: t.complianceSeoDescription }));
}

export default async function LocaleCompliancePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getMessages(locale);
  const crumb = await breadcrumbSchema(locale, "compliance");
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: pageCSS }} />
      <Script id="breadcrumb" type="application/ld+json" strategy="lazyOnload" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumb) }} />
      <ComplianceClient locale={locale} t={t} />
    </>
  );
}
