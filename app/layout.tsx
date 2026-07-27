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
  title: "UnityPay | 持牌解耦式跨境收单与合规出金",
  description:
    "UnityPay 持有加拿大 MSB 与香港 MSO 牌照，为跨境商户提供法币收单与稳定币结算服务。",
  icons: { icon: "/logo.jpg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${notoSansSC.variable}`}>{children}</body>
    </html>
  );
}