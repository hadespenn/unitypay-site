import type { LocaleContent } from "./locale";
import en from "../../public/locales/en.json";
import zh from "../../public/locales/zh.json";
import zhTW from "../../public/locales/zh-TW.json";

export const locales = ["en", "zh", "zh-TW"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

const messageMap: Record<string, LocaleContent> = {
  en: en as unknown as LocaleContent,
  zh: zh as unknown as LocaleContent,
  "zh-TW": zhTW as unknown as LocaleContent,
};

export async function getMessages(locale: string): Promise<LocaleContent> {
  return messageMap[locale] || messageMap[defaultLocale];
}

/** Synchronous message lookup — use when passing to Client Components directly. */
export function getMessagesSync(locale: string): LocaleContent {
  return messageMap[locale] || messageMap[defaultLocale];
}

export async function seoMetadata(locale: string) {
  const messages = await getMessages(locale);
  return {
    title: messages.seoTitle,
    description: messages.seoDescription,
  };
}