"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { CartItem } from "@/lib/products";

export interface CartState {
  items: CartItem[];
  count: number;
  subtotalCents: number;
}

export interface CartActions {
  addItem: (slug: string, name: string, color: string, edition: string, unitPriceCents: number, qty?: number) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
}

const CART_KEY = "sb_cart";

function loadItems(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveItems(items: CartItem[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CART_KEY, JSON.stringify(items));
}

function itemKey(slug: string, color: string, edition: string) {
  return `${slug}|${color}|${edition}`;
}

type CartAction =
  | { type: "init"; items: CartItem[] }
  | { type: "add"; item: Omit<CartItem, "id"> & { id: string } }
  | { type: "remove"; id: string }
  | { type: "setQty"; id: string; qty: number }
  | { type: "clear" };

function reducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "init":
      return action.items;
    case "add": {
      const existing = state.find((i) => i.id === action.item.id);
      if (existing) {
        return state.map((i) => (i.id === action.item.id ? { ...i, qty: i.qty + action.item.qty } : i));
      }
      return [...state, action.item];
    }
    case "remove":
      return state.filter((i) => i.id !== action.id);
    case "setQty":
      if (action.qty <= 0) return state.filter((i) => i.id !== action.id);
      return state.map((i) => (i.id === action.id ? { ...i, qty: action.qty } : i));
    case "clear":
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [items, dispatch] = useReducer(reducer, [] as CartItem[]);

  useEffect(() => {
    setMounted(true);
    dispatch({ type: "init", items: loadItems() });
  }, []);

  useEffect(() => {
    if (mounted) saveItems(items);
  }, [items, mounted]);

  const memo = useMemo<CartState>(() => {
    const count = items.reduce((sum, i) => sum + i.qty, 0);
    const subtotalCents = items.reduce((sum, i) => sum + i.unitPriceCents * i.qty, 0);
    return { items, count, subtotalCents };
  }, [items]);

  const addItem = useCallback(
    (slug: string, name: string, color: string, edition: string, unitPriceCents: number, qty = 1) => {
      dispatch({ type: "add", item: { slug, name, color, edition, qty, unitPriceCents, id: itemKey(slug, color, edition) } });
    },
    []
  );

  const removeItem = useCallback((id: string) => {
    dispatch({ type: "remove", id });
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    dispatch({ type: "setQty", id, qty });
  }, []);

  const clear = useCallback(() => {
    dispatch({ type: "clear" });
  }, []);

  const actions: CartActions = useMemo(() => ({ addItem, removeItem, updateQty, clear }), [addItem, removeItem, updateQty, clear]);

  return (
    <CartStateContext.Provider value={memo}>
      <CartActionsContext.Provider value={actions}>
        {children}
      </CartActionsContext.Provider>
    </CartStateContext.Provider>
  );
}

const CartStateContext = createContext<CartState | undefined>(undefined);
const CartActionsContext = createContext<CartActions | undefined>(undefined);

export function useCart() {
  const state = useContext(CartStateContext);
  const actions = useContext(CartActionsContext);
  if (!state || !actions) throw new Error("useCart must be used within CartProvider");
  return { ...state, ...actions };
}

export function useCartState() {
  const state = useContext(CartStateContext);
  if (!state) throw new Error("useCartState must be used within CartProvider");
  return state;
}

export function useCartActions() {
  const actions = useContext(CartActionsContext);
  if (!actions) throw new Error("useCartActions must be used within CartProvider");
  return actions;
}
