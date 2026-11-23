import { SectionNumber, SectionKicker, SectionTitle } from "@/components/ui/SectionHeadings";

export function Testimonials() {
  const quotes = [
    {
      text: "My border collie solved stage one in seconds and was properly stuck on stage two. Watching her work it out is the best part.",
      author: "Maya R.",
      dog: "Luna, Border Collie",
    },
    {
      text: "Finally a puzzle toy that doesn’t break in a week. The aluminium feels like something I’d keep on my own desk.",
      author: "Dev P.",
      dog: "Archie, Mixed",
    },
    {
      text: "The progressive lock means she can’t brute-force it. She actually has to think. Worth every penny.",
      author: "Sarah L.",
      dog: "Milo, Cocker Spaniel",
    },
  ];
  return (
    <section className="section bg-paper" id="testimonials">
      <div className="section-inner">
        <SectionNumber>05</SectionNumber>
        <SectionKicker>What owners say</SectionKicker>
        <SectionTitle>Real results</SectionTitle>
        <div className="grid md:grid-cols-3 gap-6">
          {quotes.map((q) => (
            <blockquote key={q.author} className="rounded-2xl border border-line bg-white p-8">
              <p className="text-[0.95rem] text-steel leading-relaxed mb-6">“{q.text}”</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-line flex items-center justify-center text-[0.7rem] font-bold text-ink uppercase">
                  {q.author.split(" ")[0][0]}
                </div>
                <div>
                  <p className="text-sm font-medium text-ink">{q.author}</p>
                  <p className="text-xs text-steel font-mono">{q.dog}</p>
                </div>
              </div>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
