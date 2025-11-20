"use client";
import Link from "next/link";
import { t } from "@/lib/i18n";
import { useLang } from "@/components/ClientProviders";

export default function Hero() {
  const { lang } = useLang();
  const title = t(lang, "hero.title");
  const subtitle = t(lang, "hero.subtitle");
  const cta = t(lang, "cta.primary");
  const alignText = "items-center text-center";
  const alignButtons = "justify-center";

  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden bg-background"
    >
      {/* طبقة الخلفية الداكنة + تدرجات الأورورا */}
      <div className="absolute inset-0 -z-20 aurora-bg" />

      {/* فقاعات ضوئية (Aurora Orbs) */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-80 w-80 aurora-orb-cyan" />
      <div className="pointer-events-none absolute right-[-6rem] top-10 h-72 w-72 aurora-orb-blue" />
      <div className="pointer-events-none absolute left-1/2 bottom-[-6rem] h-72 w-72 aurora-orb-emerald" />

      {/* محتوى الهيرو */}
      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center px-6 py-16 sm:py-24">
        <div className={`flex w-full flex-col gap-6 ${alignText}`}>
          {/* شريط صغير فوق العنوان */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1 text-xs font-medium tracking-[0.18em] text-cyan-200 ring-1 ring-white/10 backdrop-blur">
            <span>WEB</span>
            <span className="h-px w-4 bg-cyan-300/60" />
            <span>AI</span>
            <span className="h-px w-4 bg-cyan-300/60" />
            <span>AUTOMATION</span>
          </div>

          {/* العنوان الرئيسي */}
          <h1
            className="
              text-4xl
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
              font-extrabold
              tracking-tight
              text-white
              drop-shadow-[0_18px_65px_rgba(0,0,0,0.75)]
            "
          >
            {title}
          </h1>

          {/* السطر الوصفي */}
          {subtitle && (
            <p className="max-w-3xl text-base sm:text-lg md:text-xl text-gray-200/90 leading-relaxed">
              {subtitle}
            </p>
          )}

          {/* الأزرار */}
          <div className={`mt-4 flex flex-wrap gap-3 ${alignButtons}`}>
            {/* زر رئيسي 3D (جهّزناه في globals.css) */}
            <Link
              href="#contact"
              className="
                btn-3d
                text-sm sm:text-base
                px-6 py-3
                shadow-[0_16px_60px_rgba(34,211,238,0.45)]
              "
            >
              {cta}
            </Link>

            {/* زر ثانوي شفاف */}
            <Link
              href="#projects"
              className="
                inline-flex items-center justify-center
                rounded-full border border-white/15
                bg-white/5 px-5 py-2.5
                text-sm sm:text-base font-medium
                text-gray-100
                backdrop-blur
                transition
                hover:border-cyan-300/60 hover:bg-white/10
              "
            >
              View work
            </Link>
          </div>

          {/* سطر ثقة صغير تحت الأزرار */}
          <p className="mt-4 max-w-xl text-xs sm:text-sm text-gray-300/80">
            Schnelle Umsetzung, klare Kommunikation – ideal für Selbstständige &
            kleine Teams, die etwas Vorzeigbares brauchen, nicht nur “noch eine
            Website”.
          </p>
        </div>
      </div>
    </section>
  );
}
