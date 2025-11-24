"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sun, Moon } from "lucide-react";

type Props = { variant: 1 | 2 | 3 };

export default function MobileSidebarPreview({ variant }: Props) {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [langSel, setLangSel] = useState<"en" | "de">("en");

  function renderSidebar() {
    if (variant === 1) {
      // Slide-over Opaque
      return (
        <div className="fixed inset-0 z-[60] flex">
          <div
            className="fixed inset-0 bg-black/60"
            onClick={() => setOpen(false)}
          />

          <aside
            className={
              "fixed right-0 top-16 bottom-auto z-70 w-[85%] sm:w-80 max-h-[calc(100vh-4rem)] overflow-auto rounded-l-2xl p-4 pb-10 flex flex-col shadow-2xl " +
              (dark
                ? "bg-slate-900/30 backdrop-blur-[28px] backdrop-saturate-105 border-l border-slate-800 text-foreground"
                : "bg-white/10 backdrop-blur-[40px] backdrop-saturate-125 border-l border-white/10 text-foreground")
            }
          >
            <header className="flex items-center justify-between">
              <div className="w-9 h-9" />
              <button onClick={() => setOpen(false)} aria-label="Close" className="p-2 rounded-md hover:bg-card">
                ✕
              </button>
            </header>

            {/* Language row */}
            <div className="mt-4 flex items-center justify-between">
              <div className="text-lg text-foreground">{langSel === "de" ? "Sprache" : "Language"}</div>
              <div className="inline-flex rounded-full border border-border p-0.5 bg-card/60">
                <button
                  onClick={() => setLangSel("en")}
                  className={[
                    "relative z-10 rounded-full px-3 py-1 text-xs font-medium transition",
                    langSel === "en" ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  ].join(" ")}
                >
                  EN
                </button>
                <button
                  onClick={() => setLangSel("de")}
                  className={[
                    "relative z-10 rounded-full px-3 py-1 text-xs font-medium transition",
                    langSel === "de" ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  ].join(" ")}
                >
                  DE
                </button>
              </div>
            </div>

            {/* Theme row */}
            <div className="mt-4 flex items-center justify-between">
              <div className="text-lg text-foreground">{langSel === "de" ? "Thema" : "Theme"}</div>
              <button
                onClick={() => setDark((d) => !d)}
                aria-pressed={dark}
                aria-label="Toggle theme"
                className={[
                  "relative inline-flex h-7 w-14 items-center rounded-full px-1 transition-colors duration-300",
                  dark ? "bg-brand/90" : "bg-border",
                ].join(" ")}
              >
                <span
                  className={[
                    "absolute left-1 flex h-5 w-5 items-center justify-center rounded-full bg-white transition-all duration-300 shadow-md",
                    dark ? "translate-x-7" : "translate-x-0",
                  ].join(" ")}
                >
                  {dark ? <Moon size={14} /> : <Sun size={14} />}
                </span>
                <span className="absolute right-2 text-white/80">{dark ? "" : ""}</span>
              </button>
            </div>

            <nav className="mt-4 flex-1 flex flex-col gap-4 text-lg text-foreground">
              <a className="block py-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800">Services</a>
              <a className="block py-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800">Projects</a>
              <a className="block py-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800">About</a>
              <a className="block py-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800">Contact</a>
            </nav>

            <div className="mt-auto pt-10">
              <a className="w-full inline-flex justify-center rounded-full px-4 py-2 btn-3d text-foreground">Get in touch</a>
            </div>
          </aside>
        </div>
      );
    }

    if (variant === 2) {
      // Compact Panel with Icon List
      return (
        <div className="fixed inset-0 z-[60] flex">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />

          <aside className="fixed right-0 top-16 bottom-auto z-70 w-20 sm:w-72 max-h-[calc(100vh-4rem)] overflow-auto bg-white/10 backdrop-blur-[40px] dark:bg-slate-900/30 dark:backdrop-blur-[28px] p-3 pb-10 flex flex-col items-center shadow-2xl rounded-l-2xl">
            <div className="flex-1 flex flex-col gap-4 items-center mt-4 w-full">
              <button className="p-2 rounded-full bg-card w-11 h-11">🔧</button>
              <button className="p-2 rounded-full bg-card w-11 h-11">🧩</button>
              <button className="p-2 rounded-full bg-card w-11 h-11">🤖</button>
            </div>
            <div className="mt-auto pt-10 w-full">
              <button className="w-full rounded-full px-3 py-2 btn-3d text-foreground">Contact</button>
            </div>
          </aside>
        </div>
      );
    }

    // variant 3: Centered Frosted Modal
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-black/60"
          onClick={() => setOpen(false)}
        />

        <div className="relative z-[70] w-full max-w-sm rounded-2xl bg-white/90 dark:bg-slate-900 p-6 shadow-2xl">
          <nav className="flex flex-col gap-4 text-center">
            <a className="py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">Services</a>
            <a className="py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">Projects</a>
            <a className="py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">About</a>
            <a className="py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">Contact</a>
          </nav>

          <div className="mt-6">
            <button className="w-full btn-3d">Contact</button>
          </div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    // Toggle the global dark class on the <html> element so Tailwind's dark: variants apply
    try {
      document.documentElement.classList.toggle("dark", dark);
    } catch (e) {
      // noop in environments without document
    }
    return () => {
      try {
        document.documentElement.classList.toggle("dark", false);
      } catch (e) {}
    };
  }, [dark]);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:to-slate-800">
        <div className="mx-auto max-w-3xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold">Preview — Sidebar Variant {variant}</h2>
            </div>

            <div className="flex gap-2">
              <button onClick={() => setDark((d) => !d)} className="px-3 py-1 rounded bg-border">Toggle theme</button>
              <button onClick={() => setOpen(true)} className="px-3 py-1 rounded bg-brand text-white">Open sidebar</button>
            </div>
          </div>

          <p className="mt-6 text-muted-foreground">Use the "Open sidebar" button to preview the mobile sidebar behaviour for variant {variant}.</p>

          <div className="mt-12 h-64 rounded-lg bg-gradient-to-br from-slate-800 to-sky-700 dark:from-slate-800 dark:to-sky-900 shadow-inner" />
        </div>

        {open && renderSidebar()}
      </div>
    </div>
  );
}
