import { SectionNumber, SectionKicker, SectionTitle } from "@/components/ui/SectionHeadings";

export function FAQ() {
  const faqs = [
    ["Is it safe for chewers?", "Yes. The base is soft-touch polymer and all edges are radiused. Supervision is recommended, as with any toy."],
    ["Can I wash it?", "Hand-wash the base. The treat compartment is dishwasher safe."],
    ["What size dog is it for?", "Small to large breeds. The three-stage design scales with your dog’s persistence."],
    ["How long does shipping take?", "Machined to order; ships within two weeks. Free standard shipping."],
  ];
  return (
    <section className="section bg-paper" id="faq">
      <div className="section-inner">
        <SectionNumber>06</SectionNumber>
        <SectionKicker>Questions</SectionKicker>
        <SectionTitle>Frequently asked</SectionTitle>
        <div className="space-y-4 max-w-lg">
          {faqs.map(([q, a]) => (
            <details key={q} className="border border-line rounded-xl bg-white p-5 group">
              <summary className="font-display text-lg tracking-tight list-none cursor-pointer">
                {q}
                <span className="ml-auto text-[0.9rem]">+</span>
              </summary>
              <p className="mt-4 text-[0.925rem] text-steel leading-relaxed">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
