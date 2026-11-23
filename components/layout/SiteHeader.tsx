"use client";

import React from "react";
import Link from "next/link";
import { useCartState } from "@/lib/cart/CartContext";
import { ShoppingCart, Menu, X, Home } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/product/switchback", label: "Switchback" },
  { href: "/product/treat-refill", label: "Treat Refill" },
  { href: "/product/field-case", label: "Field Case" },
  { href: "/cart", label: "Cart" },
];

export function CartBadge() {
  const { count } = useCartState();
  return (
    <button className="relative p-2 rounded-full text-ink hover:bg-ink-soft/40 transition-colors" aria-label="Cart">
      <ShoppingCart size={18} strokeWidth={2} />
      {count > 0 && (
        <span className="absolute top-[-2px] right-[-2px] inline-flex items-center justify-center min-w-[18px] h-[18px] rounded-full bg-ember text-[10px] font-bold text-white px-1.5 shadow-[0_2px_4px_rgba(255,77,18,0.45)]">
          {count}
        </span>
      )}
    </button>
  );
}

export function SiteHeader() {
  const [open, setOpen] = React.useState(false);
  return (
    <header className="relative z-40 sticky top-0 border-b border-line bg-bone/80 backdrop-blur-md">
      <div className="max-w-1024 mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full border border-line flex items-center justify-center bg-ink">
              <span className="text-[10px] font-mono font-bold text-white tracking-tighter">SB</span>
            </div>
            <span className="font-display font-bold text-xl tracking-tight">Switchback</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-[0.875rem] font-mono text-steel uppercase tracking-wider">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-ink transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <CartBadge />
            <button
              onClick={() => setOpen(true)}
              className="md:hidden p-1.5 rounded-full text-ink hover:bg-ink-soft/40 transition-colors"
              aria-label="Open menu"
            >
              <Menu size={20} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
      {open && (
        <div className="fixed inset-0 z-[50] bg-ink/95 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div className="absolute right-6 top-6">
            <button onClick={() => setOpen(false)} className="p-2 rounded-full text-white hover:bg-white/10 transition-colors" aria-label="Close menu">
              <X size={20} strokeWidth={2} />
            </button>
          </div>
          <nav className="mt-20 px-6 space-y-6">
            <Link href="/" onClick={() => setOpen(false)} className="block text-[1.125rem] font-display text-white hover:text-ember transition-colors">
              <Home size={18} strokeWidth={2} className="mr-2 inline" /> Home
            </Link>
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block text-[1.125rem] font-mono text-white/80 hover:text-ember transition-colors uppercase tracking-wider"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
