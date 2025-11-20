
"use client";
import { servicesFor, t } from "@/lib/i18n";
import { useLang } from "@/components/ClientProviders";
// src/components/Services.tsx

import { Code2, Workflow, Bot } from "lucide-react";
import ServiceCard from "./ServiceCard";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Services() {
  const { lang } = useLang();
  const items = servicesFor(lang);

  // الكلمات المتغيرة لكل لغة
  const rotatingWordsEn = ["Modern", "Efficient", "Intelligent"];
  const rotatingWordsDe = ["Modern", "Effizient", "Intelligent"];

  // أيقونات ثابتة بحسب ترتيب الخدمات
  const icons = [
    <Code2 key="web" size={22} strokeWidth={1.7} />,
    <Workflow key="sys" size={22} strokeWidth={1.7} />,
    <Bot key="ai" size={22} strokeWidth={1.7} />,
  ];

  // جلب title من ملفات اللغة (يحتوي على {word} placeholder)
  const titleTemplate = t(lang, "section.services.title");
  const [before, after] = titleTemplate.split("{word}");

  return (
    <section
      id="services"
      className="relative py-20 sm:py-28 bg-background"
    >
      {/* هالة خلف الكروت */}
      <div
        className="
          pointer-events-none absolute inset-x-0 top-6 mx-auto h-64 max-w-5xl
          bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.23),transparent_60%)]
          opacity-70 dark:bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.35),transparent_60%)]
        "
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* العنوان الصغير فوق */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-[11px] font-semibold tracking-[0.22em] text-brand uppercase mb-3">
            {lang === "de"
              ? "WEB · KI · AUTOMATISIERUNG"
              : "WEB · AI · AUTOMATION"}
          </p>

          {/* Title مع كلمة متغيرة */}
          <h2 className="text-3xl sm:text-4xl md:text-[2.6rem] font-bold tracking-tight text-foreground">
            <span>{before}</span>
            <AnimatedWord
              words={lang === "de" ? rotatingWordsDe : rotatingWordsEn}
            />
            <span>{after}</span>
          </h2>

          {/* الجملة تحت title (ثابتة) */}
          <p className="mt-3 text-sm sm:text-[15px] text-muted-foreground max-w-2xl mx-auto">
            {lang === "de"
              ? "Drei Bausteine, die sich kombinieren lassen – von klaren Landing Pages bis zu voll automatisierten Workflows."
              : "Three building blocks you can mix and match – from clear landing pages to fully automated workflows."}
          </p>
        </div>

        {/* الكروت */}
<div className="pt-12 grid gap-8 md:grid-cols-3">
  {items.map((svc, idx) => (
    <ServiceCard
      key={svc.title + idx}
      title={svc.title}
      description={svc.description}
      accent={svc.accent}
      icon={icons[idx] ?? <Code2 size={22} strokeWidth={1.7} />}
      lang={lang}
    />
  ))}
</div>

      </div>
    </section>
  );
}

/* ================================
   Component: AnimatedWord - flip عمودي مع عرض ثابت
   ================================ */
function AnimatedWord({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);

  // تبديل الكلمات بعد مدة محددة
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, 2500); // مدة عرض كل كلمة
    return () => clearInterval(interval);
  }, [words]);

  const wordHeight = 28; // ارتفاع الكلمة
  const maxWordLength = Math.max(...words.map(w => w.length));
  const containerWidth = `${maxWordLength * 0.62}ch`; // عرض ثابت حسب أطول كلمة

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={words[index]}
        style={{ display: "inline-block", width: containerWidth, height: wordHeight }}
        className="font-semibold text-brand"
        initial={{ y: 20, opacity: 0 }}   // الكلمة الجديدة تظهر من الأسفل
        animate={{ y: 0, opacity: 1 }}    // الكلمة تثبت
        exit={{ y: -20, opacity: 0 }}     // الكلمة القديمة تختفي للأعلى
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {words[index]}
      </motion.span>
    </AnimatePresence>
  );
}
