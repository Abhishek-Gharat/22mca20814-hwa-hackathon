"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-white border-t border-white/10 pt-16 pb-12">
      <div className="max-w-1024 mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center bg-white">
                <span className="text-[10px] font-mono font-bold text-ink tracking-tighter">SB</span>
              </div>
              <span className="font-display font-bold text-xl tracking-tight">Switchback</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Engineered enrichment for dogs that think. Press, rotate, slide — reward earned.
            </p>
          </div>
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-white/50 mb-6">Shop</h4>
            <ul className="space-y-3 text-white/70 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/product/switchback" className="hover:text-white transition-colors">Switchback</Link></li>
              <li><Link href="/product/treat-refill" className="hover:text-white transition-colors">Treat Refill</Link></li>
              <li><Link href="/product/field-case" className="hover:text-white transition-colors">Field Case</Link></li>
              <li><Link href="/cart" className="hover:text-white transition-colors">Cart</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-white/50 mb-6">Policy</h4>
            <ul className="space-y-3 text-white/70 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Shipping</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Returns</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Privacy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-white/50 mb-6">Newsletter</h4>
            <p className="text-white/70 text-sm mb-4">New colours, limited drops, training notes.</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="you@example.com"
                className="flex-1 px-3 py-2 rounded bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-ember transition-colors"
              />
              <Button variant="ghost" size="sm">Join</Button>
            </form>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <p>Switchback Studio. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">Email</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
