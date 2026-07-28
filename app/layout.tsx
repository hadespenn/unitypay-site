import type { Metadata } from "next";
import { Manrope, Noto_Sans_SC } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-noto-sc",
  display: "swap",
});

export const metadata: Metadata = {
  title: "UnityPay | Licensed Cross-Border Acquiring & Compliant Payout",
  description:
    "UnityPay is licensed under Canadian MSB and Hong Kong MSO frameworks, providing fiat acquiring and stablecoin settlement for cross-border merchants.",
  icons: { icon: "/logo.jpg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var l=localStorage.getItem('unitypay-locale');if(l&&l!=='en')document.documentElement.style.visibility='hidden';}catch(e){}})();`,
          }}
        />
      </head>
      <body className={`${manrope.variable} ${notoSansSC.variable}`}>{children}</body>
    </html>
  );
}
