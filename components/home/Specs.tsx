import Link from "next/link";
import { SectionNumber, SectionKicker, SectionTitle } from "@/components/ui/SectionHeadings";

export function Specs({ specs }: { specs: Record<string, string> }) {
  return (
    <section className="section bg-ink" id="specs">
      <div className="section-inner">
        <SectionNumber>04</SectionNumber>
        <SectionKicker>Specification</SectionKicker>
        <SectionTitle>Built to last</SectionTitle>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            {Object.entries(specs).map(([key, value]) => (
              <div key={key} className="border-b border-white/10 pb-6 last:border-0">
                <p className="font-mono text-xs uppercase tracking-wider text-white/50 mb-1">{key}</p>
                <p className="text-white text-sm">{value}</p>
              </div>
            ))}
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <p className="font-mono text-xs uppercase tracking-wider text-white/50 mb-4">In the box</p>
            <ul className="text-white/80 text-sm space-y-3 leading-relaxed">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-ember" /> Switchback puzzle unit
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-ember" /> Treat compartment
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-ember" /> Quick-start guide
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-ember" /> Care card
              </li>
            </ul>
            <Link href="/product/switchback" className="mt-8 inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-[0.85rem] font-mono uppercase tracking-wider">
              View product <span className="text-[10px]">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
