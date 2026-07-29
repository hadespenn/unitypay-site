import AboutClient from "./AboutClient";
import { getMessages, locales } from "../../lib/messages";
import { pageMetadata, breadcrumbSchema } from "../../lib/seo";
import type { Metadata } from "next";
import Script from "next/script";

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
  const crumb = await breadcrumbSchema(locale, "about");
  return (
    <>
      <Script id="breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumb) }} />
      <AboutClient locale={locale} t={t} />
    </>
  );
}
