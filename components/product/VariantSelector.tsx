"use client";

import { useState } from "react";
import { AddToCart } from "@/components/product/AddToCart";
import { getVariantPrice } from "@/lib/products";

interface VariantSelectorProps {
  product: {
    slug: string;
    name: string;
    colors: { id: string; label: string }[];
    editions: { id: string; label: string }[];
    priceCents: number;
  };
  defaultColor: string;
  defaultEdition: string;
}

export function VariantSelector({ product, defaultColor, defaultEdition }: VariantSelectorProps) {
  const [color, setColor] = useState(defaultColor);
  const [edition, setEdition] = useState(defaultEdition);
  const priceCents = getVariantPrice(product.slug, color, edition);

  return (
    <div className="space-y-6 mb-10">
      <div>
        <p className="text-[0.8rem] font-mono uppercase tracking-wider text-steel mb-3">Colour</p>
        <div className="flex gap-3">
          {product.colors.map((c) => (
            <button
              key={c.id}
              onClick={() => setColor(c.id)}
              className={`w-10 h-10 rounded-full border-2 flex-shrink-0 transition-colors ${color === c.id ? "border-ember" : "border-line"}`}
              style={{ backgroundColor: c.id === "graphite" ? "#17140F" : c.id === "sand" ? "#EDE9DB" : c.id === "ember" ? "#FF4D12" : "#FFFFFF" }}
              aria-label={c.label}
              aria-pressed={color === c.id}
            />
          ))}
        </div>
      </div>
      <div>
        <p className="text-[0.8rem] font-mono uppercase tracking-wider text-steel mb-3">Edition</p>
        <div className="flex gap-3">
          {product.editions.map((e) => (
            <button
              key={e.id}
              onClick={() => setEdition(e.id)}
              className={`px-4 py-2 rounded-xl text-[0.85rem] font-mono border transition-colors ${edition === e.id ? "bg-ink text-white border-ink" : "bg-white border-line text-ink hover:border-ink"}`}
              aria-pressed={edition === e.id}
            >
              {e.label}
            </button>
          ))}
        </div>
      </div>
      <AddToCart slug={product.slug} name={product.name} color={color} edition={edition} priceCents={priceCents} />
    </div>
  );
}