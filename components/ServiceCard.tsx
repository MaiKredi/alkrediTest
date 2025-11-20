"use client";
import React, { ReactNode } from "react";
import type { Lang } from "@/lib/i18n";
import { ArrowRight } from "lucide-react";

type Props = {
  title: string;
  description: string;
  accent?: string;
  icon: ReactNode;
  lang: Lang;
};

export default function ServiceCard({
  title,
  description,
  accent,
  icon,
  lang,
}: Props) {
  const backIntro = lang === "de" ? "Geeignet für:" : "Best suited for:";
  const backCta = lang === "de" ? "Projekt besprechen" : "Discuss project";

  return (
    <article className="relative w-full max-w-md mx-auto bounce-on-card">
      <div
        className="
          relative h-[380px] md:h-[630px] flex flex-col justify-between
          rounded-[26px]
          bg-gradient-to-br from-white/96 via-slate-50/96 to-sky-50/85
          dark:from-slate-900/96 dark:via-slate-900/92 dark:to-sky-950/80
          shadow-[0_22px_60px_rgba(15,23,42,0.22)]
          px-8 py-8 sm:px-9 sm:py-9
          transition-transform duration-300 ease-out
          hover:scale-105 hover:shadow-[0_30px_60px_rgba(15,23,42,0.35)]
        "
      >
        {/* لمعة خفيفة */}
        <div
          className="
          pointer-events-none absolute inset-0 rounded-[26px]
          bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.15),transparent_70%),
               radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.08),transparent_70%)]
          opacity-70
          transition-all duration-300 ease-out
          hover:opacity-100
        "
        />

        {/* الدائرة مع الإيقونة والباونس الناعم */}
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-10 icon-bounce">
          <div
            className="
            w-32 h-32 flex items-center justify-center rounded-full
            bg-gradient-to-br from-white/95 via-white/50 to-white/20
            shadow-[0_10px_25px_rgba(34,211,238,0.35)]
            dark:shadow-[0_10px_25px_rgba(34,211,238,0.5)]
          "
          >
            {icon &&
              React.isValidElement(icon) &&
              React.cloneElement(
                icon as React.ReactElement<{ size?: number; className?: string }>,
                {
                  size: 64,
                  className: "icon-color",
                }
              )}
          </div>
        </div>

        {/* المحتوى مع مسافة كافية عن الإيقونة */}
        <div className="relative flex flex-col justify-between h-full mt-20">
          <div className="space-y-3">
            <h3 className="text-[1.45rem] sm:text-[1.6rem] font-semibold text-foreground">
              <span className={accent ?? "text-brand"}>{title}</span>
            </h3>

            <p className="text-sm sm:text-[15px] leading-relaxed text-muted-foreground max-w-md overflow-hidden">
              {description}
            </p>
          </div>

          <div className="mt-4 space-y-2 text-xs sm:text-[13px] text-slate-700 dark:text-slate-200 overflow-hidden">
            <p className="font-semibold uppercase tracking-[0.16em] text-cyan-500/90">
              {backIntro}
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                {lang === "de"
                  ? "Selbstständige & kleine Teams, die mehr als nur eine Visitenkarte wollen."
                  : "Freelancers & small teams who want more than just a basic website."}
              </li>
              <li>
                {lang === "de"
                  ? "Beratung, Tech-Startups & Dienstleister mit klaren Angeboten."
                  : "Consultancies, tech startups and service providers with clear offers."}
              </li>
              <li>
                {lang === "de"
                  ? "Projekte, bei denen Performance, Klarheit und Automatisierung wichtig sind."
                  : "Projects where performance, clarity and automation really matter."}
              </li>
            </ul>
          </div>

          {/* زر CTA */}
          <div className="relative mt-6 flex justify-between items-center text-sm">
            <button
              type="button"
              className="
                inline-flex items-center gap-2 rounded-full
                bg-gradient-to-r from-cyan-500/20 via-cyan-400/25 to-cyan-500/15
                px-5 py-2 text-xs font-medium text-cyan-800 dark:text-cyan-100
                border border-cyan-300/30 dark:border-cyan-600/40
                shadow-sm hover:shadow-md
                transition-all duration-200
              "
            >
              <span>{backCta}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
