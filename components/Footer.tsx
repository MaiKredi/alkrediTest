
"use client";
import { t } from "@/lib/i18n";
import { useLang } from "@/components/ClientProviders";

import { useEffect, useState } from "react";
import Modal from "./Modal";

type Phase = "boomA" | "typing" | "rest";
type ActiveDoc = "datenschutz" | "impressum" | null;

export default function Footer() {
  const { lang } = useLang();
  const BRAND_FULL = "Alkredi";
  const REST = BRAND_FULL.slice(1);

  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<Phase>("boomA");

  // أنيميشن الشعار في الفوتر (A + كتابة Alkredi)
  useEffect(() => {
    let tmr: ReturnType<typeof setTimeout>;

    if (phase === "boomA") {
      tmr = setTimeout(() => setPhase("typing"), 900);
    } else if (phase === "typing") {
      let i = 0;
      setTyped("");
      tmr = setInterval(() => {
        i++;
        setTyped(REST.slice(0, i));
        if (i >= REST.length) {
          clearInterval(tmr);
          setTimeout(() => setPhase("rest"), 1200);
        }
      }, 90);
    } else if (phase === "rest") {
      tmr = setTimeout(() => {
        setTyped("");
        setPhase("boomA");
      }, 3000);
    }

    return () => clearTimeout(tmr);
  }, [phase, REST]);

  const [active, setActive] = useState<ActiveDoc>(null);

  const rights = t(lang, "footer.rights").replace(
    "{year}",
    String(new Date().getFullYear())
  );

  const titleFor = (doc: Exclude<ActiveDoc, null>): string =>
    doc === "datenschutz"
      ? t(lang, "footer.datenschutz")
      : t(lang, "footer.impressum");

  const contentFor = (doc: Exclude<ActiveDoc, null>): string =>
    t(lang, `footer.content.${doc}`);

  return (
    <>
      <footer className="mt-24 border-t border-border bg-background/60 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-12">
          {/* الشعار المتحرّك في الفوتر */}
          <div className="flex items-center justify-center">
            <BrandAnimated phase={phase} typed={typed} />
          </div>

          {/* الروابط القانونية (مترجمة) */}
          <div className="mt-6 flex items-center justify-center gap-6 text-sm">
            <button
              onClick={() => setActive("datenschutz")}
              className="text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
            >
              {t(lang, "footer.datenschutz")}
            </button>
            <span className="text-muted-foreground/60">•</span>
            <button
              onClick={() => setActive("impressum")}
              className="text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
            >
              {t(lang, "footer.impressum")}
            </button>
          </div>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            {rights}
          </p>
        </div>
      </footer>

      {/* المودال القانوني (Datenschutz / Impressum) */}
      {active && (
        <Modal
          open={true}
          onClose={() => setActive(null)}
          title={titleFor(active)}
          content={contentFor(active)}
        />
      )}
    </>
  );
}

function BrandAnimated({ phase, typed }: { phase: Phase; typed: string }) {
  const isBoom = phase === "boomA";

  return (
    <div className="flex items-baseline gap-1 font-semibold text-2xl sm:text-3xl">
      <span
        className={[
          "inline-block leading-none transition-all duration-700",
          isBoom
            ? "scale-125 text-brand drop-shadow-[0_0_12px_rgba(34,211,238,.6)]"
            : "scale-100 text-foreground",
        ].join(" ")}
      >
        A
      </span>
      <span className="inline-flex items-baseline">
        <span className="brand-typed">{typed}</span>
        <span className="brand-caret" aria-hidden="true">
          |
        </span>
      </span>
    </div>
  );
}
