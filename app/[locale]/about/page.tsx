import { readFileSync } from "fs";
import { join } from "path";
import AboutClient from "./AboutClient";
import { getMessages, locales } from "../../lib/messages";
import { pageMetadata, breadcrumbSchema } from "../../lib/seo";
import type { Metadata } from "next";
import Script from "next/script";

const pageCSS = readFileSync(join(process.cwd(), "styles/pages/about.css"), "utf-8");

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "about", (t) => ({ title: t.aboutSeoTitle, description: t.aboutSeoDescription }));
}

export default async function LocaleAboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getMessages(locale);
  const crumbStr = await breadcrumbSchema(locale, "about");
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: pageCSS }} />
      <Script id="breadcrumb" type="application/ld+json" strategy="lazyOnload" dangerouslySetInnerHTML={{ __html: crumbStr }} />
      <AboutClient locale={locale} t={t} />
    </>
  );
}
