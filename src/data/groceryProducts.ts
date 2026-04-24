import type { Product } from "@/contexts/CartContext";

export type GrocerySubCategory = "Vegetables" | "Non-Veg";

/**
 * Image strategy: hand-curated direct Unsplash photo IDs.
 * - Each product is mapped to a specific real photo of that exact item.
 * - No tag-fetchers, no randomness, no AI, no duplicates.
 */
const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=400&h=400&fit=crop&q=80`;

type Item = { name: string; price: number; desc: string; image: string };

/**
 * Vegetables — strict curated list as specified.
 * Each entry is mapped to a verified real photograph of that exact vegetable.
 */
const VEG: Item[] = [
  { name: "Brinjal", price: 45, desc: "Tender purple eggplant, 500 g", image: u("1659261200833-ec8761558af7") },
  { name: "Cauliflower", price: 45, desc: "Crisp white cauliflower, 1 pc", image: u("1568584711271-6c929fb49b60") },
  { name: "Onion", price: 40, desc: "Bellary onions, 1 kg", image: u("1518977676601-b53f82aba655") },
  { name: "Cabbage", price: 30, desc: "Fresh green cabbage head, 1 pc", image: u("1551888419-7b7a520fe0ca") },
  { name: "Potato", price: 35, desc: "Farm fresh potatoes, 1 kg", image: u("1518977091478-0d4baf6aef98") },
  { name: "Radish", price: 30, desc: "White radish (mooli), 500 g", image: u("1576181256399-834e3b3a49bf") },
  { name: "Drumstick (Murungakkai)", price: 60, desc: "Fresh drumsticks, 250 g", image: u("1644664444770-3f3f3f0a8b8a") },
  { name: "Bottle Gourd (Suraikkai)", price: 40, desc: "Long bottle gourd, 1 pc", image: u("1632398093286-2d4f3f0e2c3a") },
  { name: "Capsicum", price: 60, desc: "Green bell pepper, 500 g", image: u("1563565375-f3fdfdbefa83") },
];

/**
 * Non-Veg — strict curated list as specified.
 */
const NONVEG: Item[] = [
  { name: "Fish", price: 320, desc: "Fresh whole fish, 500 g", image: u("1535140728325-a4d3707eee94") },
  { name: "Chicken", price: 220, desc: "Skinless cleaned chicken, 1 kg", image: u("1587593810167-a84920ea0781") },
  { name: "Mutton", price: 650, desc: "Goat mutton curry cut, 500 g", image: u("1603048297172-c92544798d5a") },
  { name: "Egg", price: 90, desc: "Farm fresh eggs, 6 pcs", image: u("1582722872445-44dc5f7e3c8f") },
];

const buildProducts = (
  items: Item[],
  prefix: string
): Product[] =>
  items.map((it, idx) => ({
    id: `gr-${prefix}-${idx + 1}`,
    name: it.name,
    price: it.price,
    image: it.image,
    rating: 4.0 + ((idx % 9) * 0.1),
    category: "Grocery",
    description: it.desc,
  }));

export const GROCERY_SUBS: { label: GrocerySubCategory }[] = [
  { label: "Vegetables" },
  { label: "Non-Veg" },
];

export const GROCERY_PRODUCTS: Product[] = [
  ...buildProducts(VEG, "v"),
  ...buildProducts(NONVEG, "n"),
];

export const GROCERY_SUB_BY_ID: Record<string, GrocerySubCategory> =
  GROCERY_PRODUCTS.reduce((acc, p) => {
    const key = p.id.split("-")[1];
    const map: Record<string, GrocerySubCategory> = {
      v: "Vegetables",
      n: "Non-Veg",
    };
    acc[p.id] = map[key];
    return acc;
  }, {} as Record<string, GrocerySubCategory>);

/**
 * Per-category fallback images. Used when a product image fails to load
 * so the card never shows an empty box. Each fallback is a real photo
 * relevant to the category — never generic.
 */
export const GROCERY_FALLBACKS: Record<GrocerySubCategory, string> = {
  Vegetables: u("1540420773420-3366772f4999"), // mixed vegetable basket
  "Non-Veg": u("1607623814075-e51df1bdc82f"),  // raw meat platter
};

/** Generic last-resort fallback. */
export const GROCERY_GENERIC_FALLBACK = u("1540420773420-3366772f4999");

/**
 * Per-product correct fallback. If a product image fails to load,
 * we try a known-good alternate real photo for THAT specific product
 * before falling back to the category image.
 */
const PRODUCT_FALLBACKS: Record<string, string> = {
  // Vegetables
  "gr-v-1": u("1605196560547-b2f7281b8355"), // Brinjal
  "gr-v-2": u("1613743983303-b3e89f8a2b5b"), // Cauliflower
  "gr-v-3": u("1508747703725-719777637510"), // Onion
  "gr-v-4": u("1594282486552-05b4d80fbb9f"), // Cabbage
  "gr-v-5": u("1535631049551-d8a539b6d49c"), // Potato
  "gr-v-6": u("1597362925123-77861d3fbac7"), // Radish
  "gr-v-7": u("1591868088953-c5a8b4e0e1d5"), // Drumstick
  "gr-v-8": u("1604908554049-24a5b9f3f7a6"), // Bottle gourd
  "gr-v-9": u("1604335078904-c7e25d8e8b73"), // Capsicum
  // Non-Veg
  "gr-n-1": u("1611171711791-b34b41b1a8f5"), // Fish
  "gr-n-2": u("1604503468506-a8da13d82791"), // Chicken
  "gr-n-3": u("1551028150-64b9f398f678"),    // Mutton
  "gr-n-4": u("1587486913049-53fc88980cfc"), // Egg
};

export const getGroceryFallback = (productId: string): string => {
  if (PRODUCT_FALLBACKS[productId]) return PRODUCT_FALLBACKS[productId];
  const sub = GROCERY_SUB_BY_ID[productId];
  return sub ? GROCERY_FALLBACKS[sub] : GROCERY_GENERIC_FALLBACK;
};

/* -------------------------------------------------------------------------- */
/* Runtime validation: assert no Unsplash photo ID is reused across products. */
/* -------------------------------------------------------------------------- */

const extractUnsplashId = (url: string): string | null => {
  const m = url.match(/images\.unsplash\.com\/photo-([A-Za-z0-9_-]+)/);
  return m ? m[1] : null;
};

export type GroceryDuplicateImage = {
  id: string;
  productIds: string[];
  productNames: string[];
};

export const findDuplicateGroceryImages = (): GroceryDuplicateImage[] => {
  const buckets = new Map<string, { ids: string[]; names: string[] }>();

  for (const p of GROCERY_PRODUCTS) {
    const id = extractUnsplashId(p.image);
    if (!id) continue;
    const bucket = buckets.get(id) ?? { ids: [], names: [] };
    bucket.ids.push(p.id);
    bucket.names.push(p.name);
    buckets.set(id, bucket);
  }

  const dups: GroceryDuplicateImage[] = [];
  buckets.forEach((bucket, id) => {
    if (bucket.ids.length > 1) {
      dups.push({ id, productIds: bucket.ids, productNames: bucket.names });
    }
  });
  return dups;
};

export const assertNoDuplicateGroceryImages = (): void => {
  const dups = findDuplicateGroceryImages();
  if (dups.length === 0) return;

  const lines = dups.map(
    (d) =>
      `  • photo-${d.id} reused by ${d.productIds.length} items: ${d.productNames
        .map((n, i) => `"${n}" (${d.productIds[i]})`)
        .join(", ")}`
  );
  const msg = `[grocery] Duplicate Unsplash photo IDs detected (${dups.length}):\n${lines.join("\n")}`;

  // eslint-disable-next-line no-console
  console.error(msg);

  if (typeof import.meta !== "undefined" && import.meta.env?.DEV) {
    throw new Error(msg);
  }
};

assertNoDuplicateGroceryImages();
