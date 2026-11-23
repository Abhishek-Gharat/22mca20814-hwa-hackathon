"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart/CartContext";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ChevronRight } from "lucide-react";

export default function CartPage() {
  const { items, count, subtotalCents, removeItem, updateQty, clear } = useCart();

  if (count === 0) {
    return (
      <section className="section" id="cart">
        <div className="section-inner max-w-lg">
          <h2 className="text-2.6rem font-display tracking-tight mb-6">Your cart is empty</h2>
          <p className="text-steel mb-10">Add Switchback or accessories to get started.</p>
          <Link href="/product/switchback">
            <Button variant="secondary">Start shopping</Button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section" id="cart">
      <div className="section-inner">
        <h2 className="text-2.6rem font-display tracking-tight mb-10">Your cart</h2>
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-6">
            {items.map((item) => (
              <article key={item.id} className="border border-line rounded-3xl bg-paper p-6 flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-display text-lg tracking-tight">{item.name}</span>
                    <span className="text-xs font-mono text-steel uppercase tracking-wider">{item.color} · {item.edition}</span>
                  </div>
                  <p className="text-[0.85rem] text-steel mb-3">Qty {item.qty} × {formatPrice(item.unitPriceCents)}</p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      className="w-7 h-7 rounded-full border border-line flex items-center justify-center text-[0.9rem] text-steel hover:bg-ink hover:text-white transition-colors"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="text-xs font-mono font-medium">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="w-7 h-7 rounded-full border border-line flex items-center justify-center text-[0.9rem] text-steel hover:bg-ink hover:text-white transition-colors"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-auto text-[0.8rem] font-mono text-steel hover:text-ink transition-colors"
                      aria-label="Remove item"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="text-right lg:text-left">
                  <span className="block font-display text-lg text-ink">{formatPrice(item.unitPriceCents * item.qty)}</span>
                </div>
              </article>
            ))}
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-line bg-paper p-8 sticky top-24">
              <div className="flex justify-between mb-2">
                <span className="font-mono text-xs uppercase tracking-wider text-steel">Subtotal ({count} item{count === 1 ? "" : "s"})</span>
                <span className="font-display text-lg text-ink">{formatPrice(subtotalCents)}</span>
              </div>
              <div className="flex justify-between mb-6">
                <span className="font-mono text-xs uppercase tracking-wider text-steel">Shipping</span>
                <span className="text-steel">Free</span>
              </div>
              <div className="h-px bg-line mb-6" />
              <div className="flex justify-between mb-8">
                <span className="font-mono text-xs uppercase tracking-wider text-steel">Total</span>
                <span className="font-display text-xl font-bold text-ink">{formatPrice(subtotalCents)}</span>
              </div>
              <Button variant="secondary" size="lg" className="w-full" onClick={() => clear()}>
                Clear cart
              </Button>
              <Link href="/checkout">
                <Button variant="primary" size="lg" className="w-full mt-4 flex items-center justify-center gap-2">
                  Proceed to checkout <ChevronRight size={16} strokeWidth={2} />
                </Button>
              </Link>
              <p className="mt-6 text-[0.8rem] font-mono text-steel">Secure checkout. No account required.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
