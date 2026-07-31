import type { Metadata } from "next";
import { Manrope, Noto_Sans_SC } from "next/font/google";
import "./globals.css";

const BASE_URL = "https://unity-pay.pages.dev";

/** Root metadata — metadataBase ensures canonical & hreflang resolve to absolute URLs */
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  icons: { icon: "/logo.webp" },
  openGraph: {
    siteName: "UnityPay",
    images: [{ url: "/logo.webp", width: 512, height: 512 }],
  },
  twitter: { card: "summary_large_image" },
};

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-noto-sc",
  display: "swap",
  weight: ["400", "700"],
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta name="msvalidate.01" content="BFFE539D08610AA8D4D7AC1F64591BFC" />
      </head>
      <body className={`${manrope.variable} ${notoSansSC.variable}`}>
        {/* Skip to main content — accessible keyboard navigation */}
        <a href="#main-content" className="skip-link">Skip to main content</a>
        {children}
      </body>
    </html>
  );
}
