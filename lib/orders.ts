import type { Order } from "@/lib/products";
import fs from "fs";
import path from "path";

const FILE = path.join(process.cwd(), "data", "orders.json");

export function readAll(): Order[] {
  try {
    if (fs.existsSync(FILE)) {
      return JSON.parse(fs.readFileSync(FILE, "utf8"));
    }
  } catch {}
  return [];
}

export function writeOrder(order: Order) {
  try {
    const all = readAll();
    all.push(order);
    fs.mkdirSync(path.dirname(FILE), { recursive: true });
    fs.writeFileSync(FILE, JSON.stringify(all, null, 2), "utf8");
  } catch {}
}

export function getOrder(id: string): Order | undefined {
  return readAll().find((o) => o.id === id);
}
