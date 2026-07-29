import SolutionsClient from "./SolutionsClient";
import { getMessages, locales } from "../../lib/messages";
import { pageMetadata, breadcrumbSchema } from "../../lib/seo";
import type { Metadata } from "next";
import Script from "next/script";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "solutions", (t) => ({ title: t.solutionsSeoTitle, description: t.solutionsSeoDescription }));
}

export default async function LocaleSolutionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getMessages(locale);
  const crumb = await breadcrumbSchema(locale, "solutions");
  return (
    <>
      <Script id="breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumb) }} />
      <SolutionsClient locale={locale} t={t} />
    </>
  );
}
