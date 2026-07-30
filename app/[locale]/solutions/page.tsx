import { readFileSync } from "fs";
import { join } from "path";
import SolutionsClient from "./SolutionsClient";
import { getMessages, locales } from "../../lib/messages";
import { pageMetadata, breadcrumbSchema } from "../../lib/seo";
import type { Metadata } from "next";
import Script from "next/script";

const pageCSS = readFileSync(join(process.cwd(), "app/page-css/solutions.css"), "utf-8");

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
      <style dangerouslySetInnerHTML={{ __html: pageCSS }} />
      <Script id="breadcrumb" type="application/ld+json" strategy="lazyOnload" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumb) }} />
      <SolutionsClient locale={locale} t={t} />
    </>
  );
}
