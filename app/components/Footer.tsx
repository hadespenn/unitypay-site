"use client";

import Image from "next/image";
import Link from "next/link";
import type { LocaleContent } from "../lib/locale";

interface FooterProps {
  locale: string;
  t: LocaleContent;
}

export default function Footer({ locale, t }: FooterProps) {
  return (
    <footer>
      <div className="footer-cols">
        <div className="footer-brand">
          <Link className="brand" href={`/${locale}`} aria-label="UnityPay Home">
            <Image src="/logo.webp" alt="" width={36} height={36} aria-hidden="true" />
            <span>{t.footerBrand}</span>
          </Link>
          <p>{t.footerDesc}</p>
        </div>
        <div className="footer-col">
          <h2>{t.footerColProduct}</h2>
          <nav>
            <Link href={`/${locale}/solutions`}>{t.footerLinkSolutions}</Link>
            <Link href={`/${locale}/compliance`}>{t.footerLinkCompliance}</Link>
            <Link href={`/${locale}/#top`}>{t.eyebrow}</Link>
          </nav>
        </div>
        <div className="footer-col">
          <h2>{t.footerColCompany}</h2>
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