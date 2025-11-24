"use client";
import { t, type Lang } from "@/lib/i18n";
import { useLang } from "@/components/ClientProviders";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Menu, X, Sun, Moon, ArrowUpRight, Globe2 } from "lucide-react";

/* =========================
   Brand — Alkredi (big, ~300%)
   ========================= */
function BrandBig() {
  const FULL = "Alkredi";
  const REST = FULL.slice(1);
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<"boomA" | "typing" | "rest">("boomA");

  useEffect(() => {
    let h: ReturnType<typeof setTimeout>;

    if (phase === "boomA") {
      h = setTimeout(() => setPhase("typing"), 600);
    } else if (phase === "typing") {
      let i = 0;
      setTyped("");
      h = setInterval(() => {
        i++;
        setTyped(REST.slice(0, i));
        if (i >= REST.length) {
          clearInterval(h);
          setTimeout(() => setPhase("rest"), 2000);
        }
      }, 70);
    } else if (phase === "rest") {
      h = setTimeout(() => {
        setTyped("");
        setPhase("boomA");
      }, 4000);
    }
    return () => clearTimeout(h);
  }, [phase, REST]);

  const isBoom = phase === "boomA";

  return (
    <div className="flex items-end relative">
      <span
        className={[
          "leading-none transition-all duration-700 text-4xl md:text-5xl font-extrabold",
          isBoom
            ? "scale-110 text-brand drop-shadow-[0_0_16px_rgba(34,211,238,0.5)]"
            : "scale-100 text-foreground",
        ].join(" ")}
        aria-hidden="true"
      >
        A
      </span>

      <span className="relative ml-1 inline-flex items-end">
        <span className="text-3xl md:text-4xl font-semibold tracking-tight">
          {typed}
        </span>

        {/* 🔹 مؤشر متوهّج نابض (شبيه بالصورة) */}
        <span
          className="ml-1 mb-[3px] h-8 w-[3px] rounded-full bg-brand animate-pulse-glow scale-y-110"
          aria-hidden="true"
        />
      </span>

      {/* أنميشن CSS ناعمة للمؤشر */}
      <style jsx>{`
        @keyframes pulse-glow {
          0%,
          100% {
            opacity: 0.2;
            box-shadow: 0 0 4px rgba(34, 211, 238, 0.5),
              0 0 10px rgba(34, 211, 238, 0.3);
          }
          50% {
            opacity: 1;
            box-shadow: 0 0 8px rgba(34, 211, 238, 0.8),
              0 0 18px rgba(34, 211, 238, 0.6);
          }
        }
        .animate-pulse-glow {
          animation: pulse-glow 1.4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

/* =========================
   Theme Switch — glossy iOS style
   ========================= */
function ThemeSwitch() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = saved ? saved === "dark" : prefers;
    setTimeout(() => setDark(initial), 0);
    document.documentElement.classList.toggle("dark", initial);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <button
      onClick={() => setDark((v) => !v)}
      aria-label="Toggle theme"
      aria-pressed={dark}
      className={[
        "relative inline-flex h-7 w-14 items-center rounded-full px-1",
        "transition-colors duration-300",
        dark ? "bg-brand/90" : "bg-border",
        "shadow-inner",
      ].join(" ")}
    >
      <span
        className={[
          "absolute left-1 flex h-5 w-5 items-center justify-center rounded-full bg-white",
          "transition-all duration-300 shadow-md",
          dark ? "translate-x-7" : "translate-x-0",
        ].join(" ")}
      >
        {dark ? <Moon size={14} /> : <Sun size={14} />}
      </span>
      {/* خلفية أيقونية خفيفة لعمق بصري */}
      <span className="absolute right-2 text-white/80">{dark ? "" : ""}</span>
    </button>
  );
}

/* =========================
   Language Pill — EN / DE
   ========================= */
function LangPill({ showIcon = true }: { showIcon?: boolean }) {
  // const pathname = usePathname(); // تم التعليق لأنه غير مستخدم
  const searchParams = useSearchParams();

  const current: Lang = useMemo(() => {
    const raw = searchParams.get("lang");
    return raw === "en" ? "en" : "de";
  }, [searchParams]);

  const setLang = (l: Lang) => {
    if (l === current) return;
    const url = new URL(window.location.href);
    url.searchParams.set("lang", l);
    // تحديث فوري مضمونة على Next 15 client page
    window.location.href = url.toString();
  };

  return (
    <div className="flex items-center gap-2">
      {showIcon && <Globe2 size={16} aria-hidden className="opacity-70" />}
      <div
        className={[
          "relative inline-flex rounded-full border border-border p-0.5",
          "bg-card/60 backdrop-blur-sm",
        ].join(" ")}
      >
        <button
          onClick={() => setLang("en")}
          className={[
            "relative z-10 rounded-full px-3 py-1 text-xs font-medium transition",
            current === "en"
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground",
          ].join(" ")}
        >
          EN
        </button>
        <button
          onClick={() => setLang("de")}
          className={[
            "relative z-10 rounded-full px-3 py-1 text-xs font-medium transition",
            current === "de"
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground",
          ].join(" ")}
        >
          DE
        </button>
        {/* مؤشر ملوّن متحرك تحت الزر النشط */}
        <span
          className={[
            "absolute inset-y-0 w-1/2 rounded-full transition-all duration-300",
                "bg-linear-to-r from-brand to-brand/70",
            current === "en" ? "left-0" : "left-1/2",
          ].join(" ")}
          aria-hidden="true"
          style={{ boxShadow: "0 4px 14px rgba(34,211,238,0.35)" }}
        />
      </div>
    </div>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const { lang } = useLang();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Brand (big) */}
        <Link href="/" aria-label="Home" className="flex items-center gap-3">
          <BrandBig />
          <span className="sr-only">Alkredi</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link href={`/?lang=${lang}#services`} prefetch={false} className="hover:text-brand">
            {t(lang, "nav.services")}
          </Link>
          <Link href={`/?lang=${lang}#projects`} prefetch={false} className="hover:text-brand">
            {t(lang, "nav.work")}
          </Link>
          <Link href={`/?lang=${lang}#about`} prefetch={false} className="hover:text-brand">
            {t(lang, "nav.about")}
          </Link>
          <Link href={`/?lang=${lang}#contact`} prefetch={false} className="hover:text-brand">
            {t(lang, "nav.contact")}
          </Link>
        </nav>

        {/* Desktop controls */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeSwitch />
          <LangPill />
          <Link
            href={`/?lang=${lang}#contact`}
            prefetch={false}
            className="btn-3d px-5 py-2 text-sm"
          >
            {t(lang, "cta.primary")} <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden rounded-md p-2 hover:bg-card"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile sheet */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-[60] bg-black/60"
          onClick={() => setOpen(false)}
        >
          <div
            className="fixed right-0 top-16 bottom-auto z-[70] w-[85%] sm:w-72 max-h-[calc(100vh-4rem)] overflow-auto rounded-l-2xl p-4 pb-10 flex flex-col shadow-2xl bg-white/10 dark:bg-slate-900/30 border-l border-white/10 dark:border-slate-800 text-foreground"
            style={{
              backdropFilter: "blur(40px) saturate(125%)",
              WebkitBackdropFilter: "blur(40px) saturate(125%)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div className="w-9 h-9" />
              <button
                className="rounded-md p-2 hover:bg-card"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-lg text-foreground">{lang === "de" ? "Sprache" : "Language"}</div>
              <LangPill showIcon={false} />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-lg text-foreground">{lang === "de" ? "Thema" : "Theme"}</div>
              <ThemeSwitch />
            </div>

            <nav className="mt-4 flex flex-col gap-4 text-base">
              <Link
                href={`/?lang=${lang}#services`}
                prefetch={false}
                onClick={() => setOpen(false)}
                className="text-foreground hover:text-brand"
              >
                {t(lang, "nav.services")}
              </Link>
              <Link
                href={`/?lang=${lang}#projects`}
                prefetch={false}
                onClick={() => setOpen(false)}
                className="text-foreground hover:text-brand"
              >
                {t(lang, "nav.work")}
              </Link>
              <Link
                href={`/?lang=${lang}#about`}
                prefetch={false}
                onClick={() => setOpen(false)}
                className="text-foreground hover:text-brand"
              >
                {t(lang, "nav.about")}
              </Link>
              <Link
                href={`/?lang=${lang}#contact`}
                prefetch={false}
                onClick={() => setOpen(false)}
                className="text-foreground hover:text-brand"
              >
                {t(lang, "nav.contact")}
              </Link>
            </nav>

            <div className="mt-auto pt-10">
              <Link
                href={`/?lang=${lang}#contact`}
                prefetch={false}
                onClick={() => setOpen(false)}
                className="inline-flex btn-3d px-5 py-2 text-sm text-foreground"
              >
                {t(lang, "cta.primary")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
