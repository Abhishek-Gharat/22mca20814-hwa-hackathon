import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function BuyCTA() {
  return (
    <section className="section" id="buy">
      <div className="section-inner">
        <div className="rounded-3xl bg-ink p-12 md:p-16 text-center">
          <p className="font-mono text-xs uppercase tracking-wider text-ember mb-4">Ready to order</p>
          <h2 className="font-display text-2.6rem text-white tracking-tight mb-6">Get your Switchback today</h2>
          <p className="text-white/70 text-sm max-w-lg mx-auto mb-10 leading-relaxed">
            Free shipping on all orders. 30-day guarantee. Machined to order and shipped within two weeks.
          </p>
          <Link href="/product/switchback">
            <Button variant="primary" size="lg">Order Switchback</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
