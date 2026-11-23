"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionNumber, SectionKicker, SectionTitle } from "@/components/ui/SectionHeadings";

const LEVELS = [
  { n: 1, title: "Stage one — Press", body: "Press the spring-loaded pad. The first lock releases and the dial is freed to turn." },
  { n: 2, title: "Stage two — Rotate", body: "Turn the knurled dial until the internal track lines up. The bolt is now free to move." },
  { n: 3, title: "Stage three — Slide", body: "Slide the bolt to the end of its track. The treat chamber opens — reward earned." },
];

export function Progression() {
  const [view, setView] = useState<"list" | "grid">("list");
  return (
    <section className="section" id="progression">
      <div className="section-inner">
        <SectionNumber>03</SectionNumber>
        <SectionKicker>How it unlocks</SectionKicker>
        <SectionTitle>Complete a challenge, unlock the next</SectionTitle>
        <div className="flex items-center gap-3 mb-10 text-xs font-mono uppercase tracking-wider text-steel">
          <button onClick={() => setView("list")} className={`px-3 py-1.5 rounded-full transition-colors ${view === "list" ? "bg-ink text-white" : "bg-paper border border-line text-ink"}`}>List</button>
          <button onClick={() => setView("grid")} className={`px-3 py-1.5 rounded-full transition-colors ${view === "grid" ? "bg-ink text-white" : "bg-paper border border-line text-ink"}`}>Grid</button>
        </div>
        <div className={view === "list" ? "space-y-8" : "grid md:grid-cols-3 gap-6"}>
          {LEVELS.map((l) => (
            <Reveal key={l.n}>
              <article className={view === "list" ? "flex items-start gap-5 rounded-2xl border border-line bg-paper p-6" : "rounded-3xl border border-line bg-paper p-8"}>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-ember text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">{l.n}</div>
                <div>
                  <h3 className="font-display text-lg tracking-tight mb-2">{l.title}</h3>
                  <p className="text-[0.925rem] text-steel leading-relaxed">{l.body}</p>
                  {view === "list" && (
                    <LinkProd href="/product/switchback" className="mt-4 inline-flex items-center gap-2 text-[0.85rem] font-mono text-ember hover:text-ember-deep transition-colors">
                      Buy now <ArrowRight size={14} strokeWidth={2} />
                    </LinkProd>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
function LinkProd({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) {
  return (
    <span className={className}>
      <Link href={href}>{children}</Link>
    </span>
  );
}
