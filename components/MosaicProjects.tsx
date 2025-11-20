
"use client";
import { t } from "@/lib/i18n";
import { useLang } from "@/components/ClientProviders";

import Image from "next/image";
import { motion } from "framer-motion";

type MosaicItem = {
  title: string;
  image: string;
  href?: string;
  size?: "wide" | "tall" | "square";
};

const MOSAIC: MosaicItem[] = [
  {
    title: "ConsoleX – Solartechnik",
    image: "/mosaic/solartechnik.jpg",
    href: "#",
    size: "wide",
  },
  {
    title: "AI Chatbot Automation",
    image: "/mosaic/chatbot.jpg",
    href: "#",
    size: "square",
  },
  {
    title: "Alkredi • Web & KI",
    image: "/mosaic/alkredi.jpg",
    href: "#",
    size: "tall",
  },
  {
    title: "Business Landing Page",
    image: "/mosaic/business.jpg",
    href: "#",
    size: "square",
  },
  {
    title: "Creative Portfolio",
    image: "/mosaic/creative.jpg",
    href: "#",
    size: "wide",
  },
];

export default function MosaicProjects() {
  const { lang } = useLang();
  return (
    <section
      id="projects"
      className="relative w-full bg-background px-4 py-24 scroll-mt-20"
    >
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-3xl sm:text-4xl font-bold text-foreground mb-14">
          {t(lang, "section.projects.title")}
        </h2>

        <div
          className="
            grid gap-6
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            auto-rows-[220px]
          "
        >
          {MOSAIC.map((item, i) => (
            <motion.a
              key={i}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={[
                "relative group overflow-hidden rounded-2xl border border-border",
                "shadow-[0_8px_26px_rgba(0,0,0,0.16)]",
                "bg-background/40 backdrop-blur-lg",
                "transition-transform duration-700 ease-out hover:scale-[1.03]",
                item.size === "wide" ? "lg:col-span-2" : "",
                item.size === "tall" ? "lg:row-span-2" : "",
              ].join(" ")}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 25vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                priority={false}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/30 to-transparent transition-all duration-700 group-hover:from-black/40" />

              {/* Text */}
              <div className="absolute inset-0 flex items-end p-5">
                <div>
                  <h3 className="text-white text-lg sm:text-xl font-semibold drop-shadow-md">
                    {item.title}
                  </h3>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
