import { readFileSync } from "fs";
import { join } from "path";
import DevelopersClient from "./DevelopersClient";
import { getMessages, locales } from "../../lib/messages";
import { pageMetadata, breadcrumbSchema } from "../../lib/seo";
import type { Metadata } from "next";
import Script from "next/script";

const pageCSS = readFileSync(join(process.cwd(), "styles/pages/developers.css"), "utf-8");

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "developers", (t) => ({ title: t.developersSeoTitle, description: t.developersSeoDescription }));
}

export default async function LocaleDevelopersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getMessages(locale);
  const crumb = await breadcrumbSchema(locale, "developers");
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: pageCSS }} />
      <Script id="breadcrumb" type="application/ld+json" strategy="lazyOnload" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumb) }} />
      <DevelopersClient locale={locale} t={t} />
    </>
  );
}
