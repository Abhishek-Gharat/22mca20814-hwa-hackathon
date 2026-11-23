import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Play } from "lucide-react";
import { SwitchbackDevice } from "@/components/product/SwitchbackDevice";

export function Hero() {
  return (
    <section className="relative pt-24 pb-32 overflow-hidden">
      <div className="max-w-1024 mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="section-kicker">01 · The puzzle</span>
            <h1 className="mb-6">Switchback.<br />Mechanical enrichment,<br />re-engineered.</h1>
            <p className="text-[1.1rem] text-steel leading-relaxed mb-10 max-w-lg">
              A machined puzzle that makes your dog work for its reward. Three stages — press, rotate, slide —
              each locked until the one before it is solved. No batteries, no screens, just mechanics.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/product/switchback">
                <Button variant="secondary" size="lg" className="flex items-center gap-2">
                  Order Switchback <ArrowRight size={18} strokeWidth={2} />
                </Button>
              </Link>
              <Button variant="ghost" size="lg" className="flex items-center gap-2">
                <Play size={18} strokeWidth={2} /> See how it works
              </Button>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <SwitchbackDevice width={420} height={356} className="mt-4" />
            <div className="absolute -inset-px rounded-3xl border border-line/60 pointer-events-none" />
          </div>
        </div>

        <div className="mt-16 border-t border-line pt-12">
          <p className="font-mono text-xs uppercase tracking-wider text-steel mb-6">Engineered for</p>
          <div className="flex flex-wrap gap-6 text-sm text-steel">
            <span className="flex items-center gap-2">Paw activation</span>
            <span className="flex items-center gap-2">Nose work</span>
            <span className="flex items-center gap-2">Progressive difficulty</span>
            <span className="flex items-center gap-2">Dishwasher-safe chamber</span>
          </div>
        </div>
      </div>
    </section>
  );
}
