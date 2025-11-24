// src/app/layout.tsx
import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google"; // ✅ official font loader
import "./globals.css";

/**
 * Root layout for Alkredi site.
 * - Uses Inter via next/font/google (no external packages)
 * - Exposes the font as CSS variable --font-sans
 * - Loads Tailwind v4 + design tokens
 * - Dark mode via toggling .dark on <html> (Header handles it)
 */

export const metadata: Metadata = {
  title: "Alkredi — Web & AI Consulting",
  description: "Landing Pages, AI-Integrationen & smarte Beratung für KMU.",
};

// Inter variable with full latin subset; you can add "latin-ext" if needed
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

// ✨ أضِف الموفّر
import ClientProviders from "@/components/ClientProviders";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body
        className={`${inter.variable} bg-background text-foreground antialiased overflow-x-hidden`}
      >
        {/* ✨ لفّ التطبيق بالموفّر ليُعاد تركيب الشجرة عند تبديل ?lang= */}
        <React.Suspense>
          <ClientProviders>{children}</ClientProviders>
        </React.Suspense>
      </body>
    </html>
  );
}
