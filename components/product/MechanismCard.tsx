"use client";

import { Bolt, RotateCw, ArrowRight } from "lucide-react";

const ICONS: Record<string, React.ReactNode> = {
  press: <Bolt size={20} strokeWidth={2} />,
  rotate: <RotateCw size={20} strokeWidth={2} />,
  slide: <ArrowRight size={20} strokeWidth={2} />,
};

interface MechanismCardProps {
  id: "press" | "rotate" | "slide";
  label: string;
  summary: string;
}

export function MechanismCard({ id, label, summary }: MechanismCardProps) {
  const Icon = ICONS[id];
  return (
    <article className="group rounded-3xl border border-line bg-paper p-8 hover:border-ember transition-colors">
      <div className="w-10 h-10 rounded-xl bg-ember/10 flex items-center justify-center text-ember mb-6 group-hover:bg-ember group-hover:text-white transition-colors">
        {Icon}
      </div>
      <h3 className="font-display text-xl tracking-tight mb-3">{label}</h3>
      <p className="text-[0.925rem] text-steel leading-relaxed">{summary}</p>
    </article>
  );
}
