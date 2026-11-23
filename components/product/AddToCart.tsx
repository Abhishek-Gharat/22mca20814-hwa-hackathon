"use client";

import { useState } from "react";
import { useCartActions } from "@/lib/cart/CartContext";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { ShoppingBag, Check } from "lucide-react";

interface AddToCartProps {
  slug: string;
  name: string;
  color: string;
  edition: string;
  priceCents: number;
}

export function AddToCart({ slug, name, color, edition, priceCents }: AddToCartProps) {
  const { addItem } = useCartActions();
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);

  const handleAdd = () => {
    addItem(slug, name, color, edition, priceCents, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <label className="text-[0.8rem] font-mono uppercase tracking-wider text-steel">Qty</label>
        <div className="flex items-center gap-1 border border-line rounded-xl">
          <button
            onClick={() => setQty((p) => Math.max(1, p - 1))}
            className="w-8 h-8 flex items-center justify-center text-steel hover:bg-ink hover:text-white transition-colors"
          >
            -
          </button>
          <input
            type="number"
            value={qty}
            onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-10 h-8 text-center border-0 text-[0.9rem] font-medium focus:ring-0"
            readOnly
          />
          <button
            onClick={() => setQty((p) => p + 1)}
            className="w-8 h-8 flex items-center justify-center text-steel hover:bg-ink hover:text-white transition-colors"
          >
            +
          </button>
        </div>
      </div>
      <Button
        variant={added ? "ghost" : "primary"}
        onClick={handleAdd}
        disabled={added}
        className="w-full"
      >
        {added ? (
          <>
            <Check size={16} strokeWidth={2.5} /> Added to cart
          </>
        ) : (
          <>
            <ShoppingBag size={16} strokeWidth={2} /> Add to cart - {formatPrice(priceCents)}
          </>
        )}
      </Button>
    </div>
  );
}
