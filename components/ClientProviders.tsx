"use client";

import { createContext, useContext, useMemo, useCallback, ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type Lang = "de" | "en";

type LangCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
};

const Ctx = createContext<LangCtx | null>(null);

/** Hook لاستخدام اللغة داخل المكونات العميلة */
export function useLang(): LangCtx {
  const v = useContext(Ctx);
  if (!v) throw new Error("useLang must be used within <LanguageProvider>");
  return v;
}

/** LanguageProvider يقرأ lang من URL ويعيد تركيب subtree عند تغيّرها */
type Props = {
  children: ReactNode;
};

export default function LanguageProvider({ children }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const raw = searchParams.get("lang");
  const lang: Lang = raw === "en" ? "en" : "de";

  const setLang = useCallback(
    (l: Lang) => {
      if (l === lang) return;

      const params = new URLSearchParams(searchParams.toString());
      params.set("lang", l);
      const hash = typeof window !== "undefined" ? window.location.hash : "";
      const url = `${pathname}?${params.toString()}${hash}`;

      window.location.assign(url);
      // بديل ناعم:
      // router.replace(url, { scroll: false });
      // Promise.resolve().then(() => router.refresh());
    },
    [lang, pathname, searchParams]
  );

  const value = useMemo(() => ({ lang, setLang }), [lang, setLang]);

  return (
    <Ctx.Provider value={value}>
      <div key={lang}>{children}</div>
    </Ctx.Provider>
  );
}
