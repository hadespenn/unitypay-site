import type { Metadata } from "next";
import { getMessages } from "./messages";
import type { LocaleContent } from "./locale";

const HREFLANG_LOCALES = ["en", "zh", "zh-TW"] as const;

/** Build hreflang alternates for the current page path */
export function hreflangAlternates(path: string): Record<string, string> {
  const map: Record<string, string> = {};
  const slug = path ? `${path}/` : "";
  for (const l of HREFLANG_LOCALES) {
    map[l === "zh-TW" ? "zh-Hant" : l] = `/${l}/${slug}`;
  }
  map["x-default"] = `/en/${slug}`;
  return map;
}

/** Shared metadata builder: OG + Twitter + alternates, page-specific title/desc */
export async function pageMetadata(
  locale: string,
  pagePath: string,
  getTitles: (t: LocaleContent) => { title: string; description: string },
): Promise<Metadata> {
  const t = await getMessages(locale);
  const { title, description } = getTitles(t);
  const img = { url: t.ogImage, width: 512, height: 512 };

  return {
    title,
    description,
    icons: { icon: "/logo.webp" },
    openGraph: { title, description, images: [img], type: "website", siteName: "UnityPay", locale: locale === "zh" ? "zh_CN" : locale === "zh-TW" ? "zh_TW" : "en_US" },
    twitter: { card: "summary_large_image", title, description, images: [t.ogImage] },
    alternates: {
      canonical: `https://unity-pay.pages.dev/${locale}/${pagePath ? `${pagePath}/` : ""}`,
      languages: hreflangAlternates(pagePath),
    },
  };
}

type BreadcrumbPage = "about" | "compliance" | "developers" | "solutions";

/** Generate BreadcrumbList JSON-LD schema */
export async function breadcrumbSchema(locale: string, currentPage?: BreadcrumbPage) {
  const t = await getMessages(locale);
  const baseUrl = "https://unity-pay.pages.dev";
  const items = [{ "@type": "ListItem" as const, position: 1, name: t.breadcrumbHome, item: `${baseUrl}/${locale}/` }];

  if (currentPage) {
    const pageNames: Record<BreadcrumbPage, string> = {
      about: t.breadcrumbAbout,
      compliance: t.breadcrumbCompliance,
      developers: t.breadcrumbDevelopers,
      solutions: t.breadcrumbSolutions,
    };
    items.push({ "@type": "ListItem" as const, position: 2, name: pageNames[currentPage], item: `${baseUrl}/${locale}/${currentPage}/` });
  }

  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items };
}
