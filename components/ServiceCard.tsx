"use client";
import React, { ReactElement } from "react";
import type { Lang } from "@/lib/i18n";
import { ArrowRight } from "lucide-react";

type Props = {
  title: string;
  description: string;
  accent?: string;
  icon: ReactElement<{ className?: string }> | null;
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
    <article className="relative w-full max-w-md mx-auto bounce-on-card mt-12 md:mt-0">
      {/* Orb: placed as a sibling so it doesn't become part of the card's flow */}
      <div className="absolute left-1/2 -translate-x-1/2 -top-12 sm:-top-16 md:-top-20 z-20 pointer-events-none icon-bounce">
        <div className="w-16 sm:w-24 md:w-32 aspect-square overflow-hidden rounded-full flex items-center justify-center bg-linear-to-br from-white/95 via-white/50 to-white/20 shadow-[0_10px_25px_rgba(34,211,238,0.35)] dark:shadow-[0_10px_25px_rgba(34,211,238,0.5)]">
          {icon && React.isValidElement(icon) ? (
            (() => {
              const props = icon.props as { className?: string };
              const existing = props.className ?? "";
              const newClass = [existing, "icon-color", "flex-none", "w-8 h-8 sm:w-16 sm:h-16 md:w-24 md:h-24"]
                .join(" ")
                .trim();
              return React.cloneElement(icon, { className: newClass });
            })()
          ) : null}
        </div>
      </div>

      {/* Card */}
      <div className="relative z-10 h-[460px] md:h-[630px] flex flex-col justify-between rounded-[26px] bg-linear-to-br from-white/96 via-slate-50/96 to-sky-50/85 dark:from-slate-900/96 dark:via-slate-900/92 dark:to-sky-950/80 shadow-[0_22px_60px_rgba(15,23,42,0.22)] overflow-hidden px-6 pt-16 pb-16 sm:px-9 sm:pt-20 sm:pb-16 transition-transform duration-300 hover:scale-105 hover:shadow-[0_30px_60px_rgba(15,23,42,0.35)]">
        {/* subtle sheen */}
        <div className="pointer-events-none absolute inset-0 rounded-[26px] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.15),transparent_70%),radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.08),transparent_70%)] opacity-70 transition-all duration-300" />

        <div className="relative z-10 flex flex-col justify-between h-full">
          <div className="space-y-3">
            <h3 className="text-[1.45rem] sm:text-[1.6rem] font-semibold text-foreground">
              <span className={accent ?? "text-brand"}>{title}</span>
            </h3>

            <p className="text-sm sm:text-[15px] leading-relaxed text-muted-foreground max-w-md">
              {description}
            </p>
          </div>

          <div className="mt-4 space-y-2 text-xs sm:text-[13px] text-slate-700 dark:text-slate-200">
            <p className="font-semibold uppercase tracking-[0.16em] text-cyan-500/90">{backIntro}</p>
            <ul className="list-disc list-inside space-y-1">
              <li>{lang === "de" ? "Selbstständige & kleine Teams, die mehr als nur eine Visitenkarte wollen." : "Freelancers & small teams who want more than just a basic website."}</li>
              <li>{lang === "de" ? "Beratung, Tech-Startups & Dienstleister mit klaren Angeboten." : "Consultancies, tech startups and service providers with clear offers."}</li>
              <li>{lang === "de" ? "Projekte, bei denen Performance, Klarheit und Automatisierung wichtig sind." : "Projects where performance, clarity and automation really matter."}</li>
            </ul>
          </div>

          {/* CTA: left aligned, kept inside the card */}
          <div className="relative mt-6 flex justify-start items-center text-sm z-50">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-cyan-500/20 via-cyan-400/25 to-cyan-500/15 px-4 sm:px-5 py-2 text-xs font-medium text-cyan-800 dark:text-cyan-100 border border-cyan-300/30 dark:border-cyan-600/40 shadow-sm hover:shadow-md transition-all duration-200 ml-3 min-w-[120px] sm:min-w-0"
            >
              <span className="whitespace-nowrap">{backCta}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
