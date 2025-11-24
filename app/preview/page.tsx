"use client";
import Link from "next/link";

export default function PreviewIndex() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 p-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-bold">Sidebar Previews</h1>
        <p className="mt-4 text-muted-foreground">Choose a design to preview (mobile behavior).</p>

        <div className="mt-6 flex flex-col gap-3">
          <Link href="/preview/sidebar/1" className="px-4 py-3 rounded bg-slate-100 dark:bg-slate-800">Preview 1 — Slide-over Opaque</Link>
          <Link href="/preview/sidebar/2" className="px-4 py-3 rounded bg-slate-100 dark:bg-slate-800">Preview 2 — Compact Icon Panel</Link>
          <Link href="/preview/sidebar/3" className="px-4 py-3 rounded bg-slate-100 dark:bg-slate-800">Preview 3 — Centered Modal</Link>
        </div>
      </div>
    </div>
  );
}
