"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartState, useCartActions } from "@/lib/cart/CartContext";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Mail, Home, Phone, MapPin } from "lucide-react";

const fields = [
  { key: "name", label: "Full name", icon: <Home size={16} strokeWidth={2} />, type: "text" },
  { key: "email", label: "Email", icon: <Mail size={16} strokeWidth={2} />, type: "email" },
  { key: "phone", label: "Phone", icon: <Phone size={16} strokeWidth={2} />, type: "tel" },
  { key: "address", label: "Address", icon: <MapPin size={16} strokeWidth={2} />, type: "text" },
  { key: "city", label: "City", icon: <MapPin size={16} strokeWidth={2} />, type: "text" },
  { key: "state", label: "State / region", icon: <MapPin size={16} strokeWidth={2} />, type: "text" },
  { key: "zip", label: "ZIP / postal code", icon: <MapPin size={16} strokeWidth={2} />, type: "text" },
];

export default function CheckoutPage() {
  const { items, subtotalCents } = useCartState();
  const { clear } = useCartActions();
  const router = useRouter();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const shippingCents = 0;
  const taxCents = 0;
  const totalCents = subtotalCents + shippingCents + taxCents;

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      setSubmitting(true);
      const form = e.currentTarget as HTMLFormElement;
      const data = Object.fromEntries(new FormData(form));
      const customer = {
        name: String(data.name ?? ""),
        email: String(data.email ?? ""),
        phone: String(data.phone ?? ""),
        address: String(data.address ?? ""),
        city: String(data.city ?? ""),
        state: String(data.state ?? ""),
        zip: String(data.zip ?? ""),
      };
      if (!customer.name || !customer.email || !customer.address || !customer.city || !customer.state || !customer.zip) {
        setError("Please fill in all fields.");
        setSubmitting(false);
        return;
      }
      const orderInput = {
        items: items.map((i) => ({ slug: i.slug, name: i.name, color: i.color, edition: i.edition, qty: i.qty, unitPriceCents: i.unitPriceCents })),
        customer,
        totals: { subtotalCents, shippingCents, taxCents, totalCents },
      };
      try {
        const res = await fetch("/api/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(orderInput) });
        if (!res.ok) throw new Error("Order could not be placed");
        const order = await res.json();
        if (typeof window !== "undefined") {
          window.localStorage.setItem(`sb_order_${order.id}`, JSON.stringify(order));
        }
        clear();
        router.push(`/order/${order.id}`);
      } catch {
        setError("Something went wrong. Please try again.");
        setSubmitting(false);
      }
    },
    [items, subtotalCents, shippingCents, taxCents, totalCents, clear, router],
  );

  if (items.length === 0) {
    return (
      <section className="section" id="checkout">
        <div className="section-inner max-w-lg">
          <h2 className="text-2.6rem font-display tracking-tight mb-6">Your cart is empty</h2>
          <p className="text-steel mb-10">Add items to check out.</p>
          <Link href="/product/switchback">
            <Button variant="secondary">Start shopping</Button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section" id="checkout">
      <div className="section-inner">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <h2 className="text-2.6rem font-display tracking-tight mb-2">Checkout</h2>
            <p className="text-steel mb-10">No account required. We’ll email your confirmation.</p>
            <form onSubmit={handleSubmit} className="space-y-5 max-w-xl">
              {error && (
                <div className="rounded-xl border border-red/50 bg-red/5 p-4 text-[0.85rem] text-red-deep">{error}</div>
              )}
              {fields.map((f) => (
                <div key={f.key} className="space-y-2">
                  <label className="flex items-center gap-2 text-[0.8rem] font-mono uppercase tracking-wider text-steel">
                    {f.icon} {f.label}
                  </label>
                  <input
                    name={f.key}
                    type={f.type}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-line bg-white text-ink focus:outline-none focus:border-ember transition-colors"
                  />
                </div>
              ))}
              <Button variant="secondary" type="button" onClick={() => router.push("/cart")} className="w-full">
                Back to cart
              </Button>
              <Button variant="primary" size="lg" className="w-full mt-2" disabled={submitting}>
                {submitting ? "Placing order…" : `Place order — ${formatPrice(totalCents)}`}
              </Button>
            </form>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-line bg-paper p-8 sticky top-24">
              <h3 className="font-display text-lg tracking-tight mb-6">Order summary</h3>
              <div className="space-y-4 mb-8">
                {items.map((i) => (
                  <div key={i.id} className="flex justify-between items-baseline text-[0.9rem]">
                    <span className="text-steel">{i.name} × {i.qty}</span>
                    <span className="font-display text-ink">{formatPrice(i.unitPriceCents * i.qty)}</span>
                  </div>
                ))}
                <div className="border-t border-line pt-4 flex justify-between text-[0.85rem]">
                  <span className="text-steel">Subtotal</span>
                  <span className="font-mono text-ink">{formatPrice(subtotalCents)}</span>
                </div>
                <div className="flex justify-between text-[0.85rem] text-steel">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-xl font-display font-bold text-ink">
                  <span>Total</span>
                  <span>{formatPrice(totalCents)}</span>
                </div>
              </div>
              <p className="text-[0.8rem] font-mono text-steel leading-relaxed">
                Secure checkout. Your order is confirmed instantly and ships within two weeks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
