"use client";

import Image from "next/image";
import Link from "next/link";
import type { Locale } from "../lib/locale";
import { useLocale } from "../lib/locale";

interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
  const { t } = useLocale(locale as Locale);

  return (
    <footer>
      <div className="footer-cols">
        <div className="footer-brand">
          <Link className="brand" href={`/${locale}`} aria-label="UnityPay Home">
            <Image src="/logo.jpg" alt="" width={36} height={36} aria-hidden="true" />
            <span>{t.footerBrand}</span>
          </Link>
          <p>{t.footerDesc}</p>
        </div>
        <div className="footer-col">
          <h4>{t.footerColProduct}</h4>
          <nav>
            <Link href={`/${locale}/solutions`}>{t.footerLinkSolutions}</Link>
            <Link href={`/${locale}/compliance`}>{t.footerLinkCompliance}</Link>
            <Link href={`/${locale}/#top`}>{t.eyebrow}</Link>
          </nav>
        </div>
        <div className="footer-col">
          <h4>{t.footerColCompany}</h4>
          <nav>
            <Link href={`/${locale}/about`}>{t.footerLinkAbout}</Link>
            <Link href={`/${locale}/#contact`}>{t.footerLinkContact}</Link>
          </nav>
        </div>
      </div>
      <div className="footer-regulatory">
        <p>{t.footerDisclaimer}<Link href={`/${locale}/#compliance`}>{t.footerLink}</Link></p>
      </div>
      <div className="footer-bottom">
        <span>{t.footerCopyright}</span>
      </div>
    </footer>
  );
}