"use client";

import { Globe2 } from "lucide-react";
import { useLang } from "@/components/ClientProviders";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();

  return (
    <div className="flex items-center gap-2">
      <Globe2 size={16} aria-hidden className="opacity-70" />
      <div className="rounded-full border border-border px-3 py-1 text-xs">
        <button
          onClick={() => setLang("en")}
          className={
            lang === "en" ? "text-brand font-medium" : "hover:text-brand"
          }
          aria-pressed={lang === "en"}
        >
          EN
        </button>
        <span className="mx-1 text-muted-foreground">/</span>
        <button
          onClick={() => setLang("de")}
          className={
            lang === "de" ? "text-brand font-medium" : "hover:text-brand"
          }
          aria-pressed={lang === "de"}
        >
          DE
        </button>
      </div>
    </div>
  );
}
