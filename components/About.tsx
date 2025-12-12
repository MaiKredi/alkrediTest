"use client";
import { t } from "@/lib/i18n";
import { useLang } from "@/components/ClientProviders";
import { motion } from "framer-motion";
import { CheckCircle2, User } from "lucide-react";

export default function About() {
  const { lang } = useLang();

  // Get all translations
  const title = t(lang, "section.about.title");
  const subtitle = t(lang, "section.about.subtitle");
  const description = t(lang, "section.about.description");
  const mission = t(lang, "section.about.mission");
  const approach = t(lang, "section.about.approach");
  
  // Get points array - manually construct from translations
  const points = [
    t(lang, "section.about.point1"),
    t(lang, "section.about.point2"),
    t(lang, "section.about.point3"),
  ];

  return (
    <section
      id="about"
      className="relative py-20 sm:py-28 bg-background scroll-mt-20"
    >
      {/* Subtle background gradient */}
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-96 max-w-5xl bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.15),transparent_70%)] opacity-50" />

      <div className="relative mx-auto max-w-4xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-[11px] font-semibold tracking-[0.22em] text-brand uppercase mb-3">
            {subtitle}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            {title}
          </h2>
        </motion.div>

        {/* Content card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl border border-border bg-card/40 backdrop-blur-sm p-8 sm:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
        >
          {/* Icon */}
          <div className="mb-6 inline-flex items-center justify-center rounded-full bg-brand/10 p-4">
            <User className="text-brand" size={32} strokeWidth={1.5} />
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6">
            {description}
          </p>

          {/* Mission */}
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
            {mission}
          </p>

          {/* Approach section */}
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-4">
              {approach}
            </h3>
            <ul className="space-y-3">
              {points.map((point, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2
                    className="text-brand flex-shrink-0 mt-1"
                    size={20}
                    strokeWidth={2}
                  />
                  <span className="text-base text-muted-foreground">
                    {point}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
