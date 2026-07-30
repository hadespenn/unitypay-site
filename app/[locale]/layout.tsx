import type { Metadata } from "next";
import { getMessages, locales } from "../lib/messages";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages(locale);
  return {
    title: messages.seoTitle,
    description: messages.seoDescription,
    icons: { icon: "/logo.webp" },
  };
}

export default function LocaleLayout({ children }: { children: React.ReactNode }) {
  return children;
}
