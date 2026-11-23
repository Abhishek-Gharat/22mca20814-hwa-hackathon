"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { CheckCircle } from "lucide-react";
import type { Order } from "@/lib/products";

export default function OrderPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const stored = typeof window !== "undefined" ? window.localStorage.getItem(`sb_order_${id}`) : null;
    if (stored) {
      try {
        setOrder(JSON.parse(stored));
        setLoading(false);
      } catch {}
    }
    if (!stored || cancelled) {
      fetch(`/api/orders/${id}`)
        .then((r) => (r.ok ? r.json() : null))
        .then((data) => {
          if (!cancelled) {
            setOrder(data as Order);
            setLoading(false);
          }
        })
        .catch(() => {
          if (!cancelled) setLoading(false);
        });
    }
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <section className="section" id="order">
        <div className="section-inner max-w-lg">
          <h2 className="text-2.6rem font-display tracking-tight">Placing order…</h2>
        </div>
      </section>
    );
  }
  if (!order) {
    return (
      <section className="section" id="order">
        <div className="section-inner max-w-lg">
          <h2 className="text-2.6rem font-display tracking-tight">Order not found</h2>
          <Link href="/">Back to home</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section" id="order">
      <div className="section-inner max-w-lg">
        <div className="rounded-3xl bg-ink p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-moss flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={28} strokeWidth={3} fill="#2F4A3C" className="text-white" />
          </div>
          <h2 className="font-display text-2.6rem text-white tracking-tight mb-2">Order confirmed</h2>
          <p className="text-white/70 text-sm mb-8">Thank you. Your Switchback is on its way.</p>
          <div className="text-left max-w-md mx-auto mb-10 border border-white/10 rounded-2xl p-6 text-white/80">
            <div className="flex justify-between mb-2"><span className="text-xs font-mono uppercase tracking-wider text-white/50">Order number</span><span className="font-mono">{order.id}</span></div>
            <div className="flex justify-between mb-2"><span className="text-xs font-mono uppercase tracking-wider text-white/50">Status</span><span className="font-mono">Confirmed</span></div>
            <div className="flex justify-between mb-2"><span className="text-xs font-mono uppercase tracking-wider text-white/50">Placed</span><span className="font-mono text-sm">{new Date(order.createdAt).toLocaleDateString()}</span></div>
            <div className="border-t border-white/10 pt-4 mt-4 flex justify-between"><span className="text-xs font-mono uppercase tracking-wider text-white/50">Total</span><span className="font-display text-white">{formatPrice(order.totals.totalCents)}</span></div>
          </div>
          <Link href="/">
            <Button variant="ghost">Continue shopping</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
