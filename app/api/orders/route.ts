import { NextResponse } from "next/server";
import type { OrderInput, Order } from "@/lib/products";
import { writeOrder, readAll } from "@/lib/orders";

function makeId() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let id = "SB-";
  for (let i = 0; i < 6; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

function validate(body: unknown): { order: OrderInput } | { error: string } {
  const b = body as Record<string, unknown>;
  if (!b || typeof b !== "object") return { error: "Invalid body" };
  const items = b.items;
  const customer = b.customer;
  const totals = b.totals;
  if (!Array.isArray(items) || items.length === 0) return { error: "items required" };
  for (const it of items) {
    if (!it || typeof it !== "object") return { error: "bad item" };
    const itm = it as Record<string, unknown>;
    if (typeof itm.slug !== "string" || typeof itm.name !== "string" || typeof itm.qty !== "number" || typeof itm.unitPriceCents !== "number") {
      return { error: "invalid item shape" };
    }
    if (itm.qty <= 0 || itm.unitPriceCents < 0) return { error: "invalid item values" };
  }
  const requiredCustomer = ["name", "email", "address", "city", "state", "zip"];
  for (const k of requiredCustomer) {
    if (typeof (customer as Record<string, unknown>)?.[k] !== "string") return { error: `customer.${k} required` };
  }
  const requiredTotals = ["subtotalCents", "shippingCents", "taxCents", "totalCents"];
  for (const k of requiredTotals) {
    if (typeof (totals as Record<string, unknown>)?.[k] !== "number") return { error: `totals.${k} required` };
  }
  return { order: b as unknown as OrderInput };
}

export async function POST(req: Request) {
  let parsed: { order: OrderInput } | { error: string };
  try {
    parsed = validate(await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if ("error" in parsed) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const order: Order = {
    id: makeId(),
    status: "confirmed",
    createdAt: new Date().toISOString(),
    items: parsed.order.items,
    customer: parsed.order.customer,
    totals: parsed.order.totals,
  };
  writeOrder(order);
  return NextResponse.json(order, { status: 200 });
}

export async function GET() {
  return NextResponse.json({ orders: readAll() }, { status: 200 });
}
