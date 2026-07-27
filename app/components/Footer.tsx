"use client";

import Image from "next/image";
import Link from "next/link";
import type { Locale } from "../lib/locale";
import { useLocale } from "../lib/locale";

interface FooterProps {
  locale: Locale;
}

export default function Footer({ locale }: FooterProps) {
  const { t } = useLocale(locale);

  return (
    <footer>
      <div className="footer-cols">
        <div className="footer-brand">
          <Link className="brand" href="/">
            <Image src="/logo.jpg" alt="UnityPay" width={36} height={36} />
            <span>{t.footerBrand}</span>
          </Link>
          <p>{t.footerDesc}</p>
        </div>
        <div className="footer-col">
          <h4>{t.footerColProduct}</h4>
          <nav>
            <Link href="/solutions">{t.footerLinkSolutions}</Link>
            <Link href="/compliance">{t.footerLinkCompliance}</Link>
            {/* <Link href="/developers">{t.footerLinkDevelopers}</Link>
            <Link href="/#architecture">{t.footerLinkPay}</Link>
            <Link href="/#capabilities">{t.footerLinkCapabilities}</Link> */}
            <Link href="/#developers">{t.footerLinkApi}</Link>
          </nav>
        </div>
        <div className="footer-col">
          <h4>{t.footerColCompany}</h4>
          <nav>
            <Link href="/about">{t.footerLinkAbout}</Link>
            <Link href="/#contact">{t.footerLinkContact}</Link>
          </nav>
        </div>
      </div>
      <div className="footer-regulatory">
        <p>{t.footerDisclaimer}</p>
      </div>
      <div className="footer-bottom">
        <span>{t.footerCopyright}</span>
      </div>
    </footer>
  );
}