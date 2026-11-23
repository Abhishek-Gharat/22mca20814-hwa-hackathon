export function SectionNumber({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-ember text-white font-mono font-bold text-[0.85rem] mb-4 block">{children}</span>
  );
}

export function SectionKicker({ children }: { children: React.ReactNode }) {
  return <span className="font-mono text-xs uppercase tracking-wider text-steel mb-3 block">{children}</span>;
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2.6rem font-display tracking-tight mb-10">{children}</h2>;
}
