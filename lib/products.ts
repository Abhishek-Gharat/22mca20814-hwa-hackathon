export interface ProductOption {
  id: string;
  label: string;
  priceDelta: number;
}

export interface ProductVariant {
  id: string;
  label: string;
  options: Record<string, ProductOption>;
  priceCents: number;
}

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  priceCents: number;
  colors: ProductOption[];
  editions: ProductOption[];
  images: string[];
  details: string[];
  includes: string[];
  specs: Record<string, string>;
  mechanisms: {
    id: "press" | "rotate" | "slide";
    label: string;
    summary: string;
  }[];
}

export interface CartItem {
  id: string;
  slug: string;
  name: string;
  color: string;
  edition: string;
  qty: number;
  unitPriceCents: number;
}

export interface OrderInput {
  items: Array<{
    slug: string;
    name: string;
    color: string;
    edition: string;
    qty: number;
    unitPriceCents: number;
  }>;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  totals: {
    subtotalCents: number;
    shippingCents: number;
    taxCents: number;
    totalCents: number;
  };
}

export interface Order {
  id: string;
  status: "confirmed";
  createdAt: string;
  items: OrderInput["items"];
  customer: OrderInput["customer"];
  totals: OrderInput["totals"];
}

export const COLORS: ProductOption[] = [
  { id: "graphite", label: "Graphite", priceDelta: 0 },
  { id: "sand", label: "Sand", priceDelta: 10 },
  { id: "ember", label: "Ember", priceDelta: 10 },
];

export const EDITIONS: ProductOption[] = [
  { id: "standard", label: "Standard", priceDelta: 0 },
  { id: "pro", label: "Pro", priceDelta: 24 },
];

export const PRODUCTS: Record<string, Product> = {
  switchback: {
    slug: "switchback",
    name: "Switchback",
    tagline: "A mechanical enrichment puzzle that solves in three stages: press, rotate, slide.",
    description:
      "Machined from aircraft-grade aluminium with a soft-touch polymer base, Switchback engages your dog’s nose and paw through three distinct challenges. Complete the press to unlock the dial, rotate to free the bolt, slide to reveal the reward. Each stage stays locked until the one before it is solved.",
    priceCents: 6800,
    colors: COLORS,
    editions: EDITIONS,
    images: [],
    details: [
      "Aircraft-grade anodised aluminium body",
      "Soft-touch, non-slip polymer base",
      "Three-stage progressive lock mechanism",
      "Removable treat compartment (dishwasher safe)",
      "Anti-chew, paw-friendly construction",
      "Sized for small to large breeds",
    ],
    includes: ["Switchback puzzle unit", "Treat compartment", "Quick-start guide", "Care card"],
    specs: {
      Material: "Anodised aluminium + polymer",
      Weight: "740 g",
      Dimensions: "190 × 190 × 52 mm",
      "Treat chambers": "3 progressive",
      Cleaning: "Hand wash base; compartment dishwasher safe",
    },
    mechanisms: [
      { id: "press", label: "Press", summary: "Press the spring-loaded pad to release the first stage." },
      { id: "rotate", label: "Rotate", summary: "Turn the knurled dial to align the internal track." },
      { id: "slide", label: "Slide", summary: "Slide the bolt to open the treat compartment." },
    ],
  },
  "treat-refill": {
    slug: "treat-refill",
    name: "Switchback Treat Refill",
    tagline: "Natural training treats sized for the Switchback compartments.",
    description: "Soft-baked, bite-sized refills made to fit the Switchback treat chamber. Keeps the reward coming without overfeeding.",
    priceCents: 1400,
    colors: [],
    editions: [],
    images: [],
    details: ["Natural ingredients", "Made for Switchback compartments", "Resealable pouch"],
    includes: ["Treat refill pouch"],
    specs: { Weight: "170 g", Shelf: "12 months" },
    mechanisms: [],
  },
  "field-case": {
    slug: "field-case",
    name: "Field Case",
    tagline: "A structured case that carries Switchback and a full treat refill.",
    description: "Waxed canvas case with a padded Switchback pocket and an external treat pouch. Built for hikes, training sessions, and day trips.",
    priceCents: 2800,
    colors: [],
    editions: [],
    images: [],
    details: ["Waxed canvas exterior", "Padded puzzle pocket", "External treat pouch", "Leather trim"],
    includes: ["Field case"],
    specs: { Material: "Waxed canvas + leather", Fit: "Switchback + one treat pouch" },
    mechanisms: [],
  },
};

export function getProduct(slug: string) {
  return PRODUCTS[slug];
}

export function getVariantPrice(slug: string, color: string, edition: string) {
  const product = PRODUCTS[slug];
  if (!product) return 0;
  const colorOpt = product.colors.find((c) => c.id === color);
  const editionOpt = product.editions.find((e) => e.id === edition);
  return product.priceCents + (colorOpt?.priceDelta ?? 0) + (editionOpt?.priceDelta ?? 0);
}
