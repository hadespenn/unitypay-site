import HomeClient from "./HomeClient";
import { getMessages, locales } from "../lib/messages";
import { pageMetadata } from "../lib/seo";
import type { Metadata } from "next";
import Script from "next/script";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "", (t) => ({ title: t.seoTitle, description: t.seoDescription }));
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "UnityPay",
  url: "https://unity-pay.pages.dev/",
  logo: "https://unity-pay.pages.dev/logo.webp",
  description: "Licensed cross-border acquiring and compliant payout infrastructure",
  foundingDate: "2023",
  contactPoint: { "@type": "ContactPoint", email: "hello@unitypay.com", contactType: "customer support" },
  sameAs: [] as string[],
};

// Pre-serialize at module level — avoids per-request JSON.stringify
const jsonLdStr = JSON.stringify(jsonLd);

export default async function LocaleHomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getMessages(locale);
  return (
    <>
      <Script id="jsonld-org" type="application/ld+json" strategy="lazyOnload" dangerouslySetInnerHTML={{ __html: jsonLdStr }} />
      <HomeClient locale={locale} t={t} />
    </>
  );
}
