import { SectionNumber, SectionKicker, SectionTitle } from "@/components/ui/SectionHeadings";
import { MechanismCard } from "@/components/product/MechanismCard";

export function Mechanisms({ mechanisms }: { mechanisms: Array<{ id: "press" | "rotate" | "slide"; label: string; summary: string }> }) {
  return (
    <section className="section bg-paper" id="mechanisms">
      <div className="section-inner">
        <SectionNumber>02</SectionNumber>
        <SectionKicker>The mechanism</SectionKicker>
        <SectionTitle>Three stages. One reward.</SectionTitle>
        <div className="grid md:grid-cols-3 gap-6">
          {mechanisms.map((m) => (
            <MechanismCard key={m.id} id={m.id} label={m.label} summary={m.summary} />
          ))}
        </div>
      </div>
    </section>
  );
}
