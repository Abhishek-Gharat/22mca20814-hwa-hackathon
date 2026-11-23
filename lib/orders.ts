import type { Order } from "@/lib/products";
import fs from "fs";
import path from "path";

const isDev = process.env.NODE_ENV === "development";

const memoryOrders = new Map<string, Order>();

function readFromFile(): Order[] {
  if (!isDev) return [];
  try {
    const FILE = path.join(process.cwd(), "data", "orders.json");
    if (fs.existsSync(FILE)) {
      return JSON.parse(fs.readFileSync(FILE, "utf8"));
    }
  } catch {}
  return [];
}

export function readAll(): Order[] {
  const fileOrders = readFromFile();
  const memOrders = Array.from(memoryOrders.values());
  const combined = [...fileOrders];
  for (const o of memOrders) {
    if (!combined.find((f) => f.id === o.id)) combined.push(o);
  }
  return combined;
}

export function writeOrder(order: Order) {
  memoryOrders.set(order.id, order);
  if (process.env.NODE_ENV === "development") {
    try {
      const FILE = path.join(process.cwd(), "data", "orders.json");
      const all = readAll();
      const exists = all.find((o) => o.id === order.id);
      if (!exists) {
        all.push(order);
        fs.mkdirSync(path.dirname(FILE), { recursive: true });
        fs.writeFileSync(FILE, JSON.stringify(all, null, 2), "utf8");
      }
    } catch {}
  }
}

export function getOrder(id: string): Order | undefined {
  return readAll().find((o) => o.id === id);
}