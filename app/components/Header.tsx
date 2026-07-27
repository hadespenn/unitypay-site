"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type Locale = "zh" | "en" | "zh-TW" | "ru" | "de" | "es" | "pt" | "ja" | "ko";

const localeInfo: { code: Locale; name: string; short: string }[] = [
  { code: "en", name: "English", short: "EN" },
  { code: "zh", name: "简体中文", short: "中文" },
  { code: "zh-TW", name: "繁體中文", short: "繁中" },
];

const anchorMap = ["/#architecture", "/#capabilities", "/#compliance", "/#security", "/#developers", "/#network"];

function Arrow() {
  return <span className="arrow" aria-hidden="true">↗</span>;
}

function LanguageDropdown({
  current, onChange, open, setOpen,
}: {
  current: Locale; onChange: (c: Locale) => void; open: boolean; setOpen: (v: boolean) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    const onEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onEsc);
    return () => { document.removeEventListener("mousedown", onClick); document.removeEventListener("keydown", onEsc); };
  }, [open, setOpen]);

  const currentName = localeInfo.find((l) => l.code === current)?.name ?? "English";

  return (
    <div className={`lang-dropdown${open ? " open" : ""}`} ref={ref}>
      <button className="lang-trigger" onClick={() => setOpen(!open)} aria-expanded={open} aria-haspopup="listbox">
        <span className="lang-globe" aria-hidden="true">◐</span>
        <span className="lang-current">{currentName}</span>
        <span className="lang-caret" aria-hidden="true">▾</span>
      </button>
      {open && (
        <ul className="lang-menu" role="listbox">
          {localeInfo.map((l) => (
            <li key={l.code} role="option" aria-selected={l.code === current}>
              <button className={`lang-option${l.code === current ? " active" : ""}`} onClick={() => onChange(l.code)}>
                <span className="lang-name">{l.name}</span>
                {l.code === current && <span className="lang-check" aria-hidden="true">✓</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

interface HeaderProps {
  locale: Locale;
  setLocale: (c: Locale) => void;
  nav: string[];
  contact: string;
  transparent?: boolean;
}

export default function Header({ locale, setLocale, nav, contact, transparent }: HeaderProps) {
  const [menu, setMenu] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  return (
    <header style={transparent ? { background: "transparent", borderBottom: "none", backdropFilter: "none" } : undefined}>
      <Link className="brand" href="/">
        <Image src="/logo.jpg" alt="UnityPay" width={130} height={48} priority />
      </Link>
      <nav className={menu ? "open" : ""}>
        {nav.map((x, i) => (
          <a href={anchorMap[i]} key={x} onClick={() => setMenu(false)}>{x}</a>
        ))}
      </nav>
      <div className="header-actions">
        <LanguageDropdown current={locale} onChange={(c) => { setLocale(c); setLangOpen(false); }} open={langOpen} setOpen={setLangOpen} />
        <Link className="header-contact" href="/#contact">{contact}<Arrow /></Link>
        <button className="menu-button" aria-expanded={menu} aria-label="Toggle menu" onClick={() => setMenu(!menu)}>
          <i /><i />
        </button>
      </div>
    </header>
  );
}
