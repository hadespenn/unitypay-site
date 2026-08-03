import type { Metadata } from "next";
import { getMessages, locales } from "../lib/messages";
import { LangFix } from "../components/LangFix";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const langMap: Record<string, string> = { en: "en", zh: "zh-CN", "zh-TW": "zh-Hant" };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages(locale);
  return {
    title: messages.seoTitle,
    description: messages.seoDescription,
    icons: { icon: "/logo.webp" },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const htmlLang = langMap[locale] || "en";
  return (
    <>
      <LangFix lang={htmlLang} />
      {children}
    </>
  );
}
