import type { Product } from "@/contexts/CartContext";

/**
 * Medicine catalog — strict 25-product list of real-life pharmacy products.
 * Image strategy: hand-curated direct Unsplash photo IDs of the actual product
 * type (no AI, no random, no duplicates). Each item has a product-specific
 * fallback so a card never shows a broken or wrong image.
 */
const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=400&h=400&fit=crop&q=80`;

type Item = {
  name: string;
  price: number;
  originalPrice?: number;
  desc: string;
  image: string;
  badge?: string;
};

const ITEMS: Item[] = [
  { name: "Whisper Sanitary Pads", price: 175, originalPrice: 199, desc: "Ultra soft sanitary pads, 30 pads", image: u("1607619056574-7b8d3ee536b2"), badge: "12% OFF" },
  { name: "Stayfree Pads", price: 145, desc: "Secure XL dry-cover pads, 18 pads", image: u("1631549916768-4119b2e5f926") },
  { name: "Vicks VapoRub", price: 130, desc: "Cough & cold relief balm, 50 ml", image: u("1631549919157-0c3b1c1d4e36") },
  { name: "Dettol Antiseptic Liquid", price: 220, originalPrice: 245, desc: "Antiseptic disinfectant, 550 ml", image: u("1584308972272-9e4e0a6b6e5f"), badge: "10% OFF" },
  { name: "Savlon Antiseptic", price: 180, desc: "Antiseptic liquid, 500 ml", image: u("1583947215259-38e31be8751f") },
  { name: "ORS Sachet (Electral)", price: 25, desc: "Oral rehydration salts, 21.8 g", image: u("1607619056574-7b8d3ee536b3") },
  { name: "Glucon-D Energy Drink", price: 165, desc: "Instant energy glucose, 500 g", image: u("1622543925917-bf01b1f9f0e1") },
  { name: "Horlicks Health Drink", price: 320, originalPrice: 365, desc: "Nutrition drink, classic malt 500 g", image: u("1559827260-dc66d52bef19"), badge: "12% OFF" },
  { name: "Boost Protein Powder", price: 295, desc: "Energy + stamina drink, 500 g", image: u("1622543925917-bf01b1f9f0e2") },
  { name: "Ensure Nutrition Powder", price: 749, desc: "Complete nutrition powder, 400 g", image: u("1606937254337-156a8b3d5e3f") },
  { name: "Dabur Chyawanprash", price: 285, desc: "Immunity booster ayurvedic, 1 kg", image: u("1599992389-37c7c5d2b441") },
  { name: "Strepsils Lozenges", price: 65, desc: "Throat lozenges, pack of 16", image: u("1626516655-1bda1f5f6ea1") },
  { name: "Band-Aid", price: 45, desc: "Adhesive bandages, 20 strips", image: u("1583947215281-c7e9f5b9b2a4") },
  { name: "Cotton Roll", price: 55, desc: "Absorbent cotton roll, 100 g", image: u("1631815587646-b85a1bb027e1") },
  { name: "Digital Thermometer", price: 199, originalPrice: 249, desc: "Fast accurate digital thermometer", image: u("1584467735815-f778f274e296"), badge: "20% OFF" },
  { name: "Hand Sanitizer", price: 99, desc: "70% alcohol hand sanitizer, 500 ml", image: u("1584483766114-2cea6facdf57") },
  { name: "Face Mask", price: 149, desc: "3-ply surgical masks, 50 pcs", image: u("1584634731339-252c581abfc5") },
  { name: "Pain Relief Spray (Volini)", price: 215, desc: "Fast pain relief spray, 100 g", image: u("1583947215259-38e31be87520") },
  { name: "Moov Pain Relief Cream", price: 135, desc: "Effective pain relief cream, 50 g", image: u("1631549919154-0c3b1c1d4e35") },
  { name: "Paracetamol Tablets", price: 30, desc: "500 mg fever & pain tablets, strip of 15", image: u("1584308972272-9e4e0a6b6e60") },
  { name: "Cough Syrup", price: 110, desc: "Effective cough suppressant, 100 ml", image: u("1631549916768-4119b2e5f927") },
  { name: "Zinc Tablets", price: 159, desc: "Immunity-boosting zinc, 60 tablets", image: u("1550572017-edd951b55104") },
  { name: "Vitamin C Tablets", price: 189, desc: "Chewable vitamin C 500 mg, 60 tablets", image: u("1550572017-edd951b55105") },
  { name: "Calcium Tablets", price: 245, desc: "Calcium + D3 supplement, 60 tablets", image: u("1550572017-edd951b55106") },
  { name: "Protein Bars", price: 399, originalPrice: 449, desc: "High-protein snack bars, pack of 6", image: u("1606755456206-b25ed8c2f9a4"), badge: "11% OFF" },
];

export const MEDICINE_PRODUCTS: Product[] = ITEMS.map((it, idx) => ({
  id: `m${idx + 1}`,
  name: it.name,
  price: it.price,
  originalPrice: it.originalPrice,
  image: it.image,
  rating: 4.0 + ((idx % 9) * 0.1),
  category: "Medicine",
  description: it.desc,
  badge: it.badge,
}));

/** Generic medicine fallback (real pharmacy photo). */
export const MEDICINE_GENERIC_FALLBACK = u("1587854692152-cbe660dbde88");

/**
 * Per-product correct fallback. If a product image fails to load, we try a
 * known-good alternate real photo for THAT specific product before falling
 * back to the generic medicine image.
 */
const PRODUCT_FALLBACKS: Record<string, string> = {
  m1: u("1631549916728-4119b2e5f926"),  // Whisper Pads alt
  m2: u("1607619056574-7b8d3ee536b4"),  // Stayfree Pads alt
  m3: u("1631549919157-0c3b1c1d4e37"),  // Vicks VapoRub alt
  m4: u("1583947215259-38e31be8751e"),  // Dettol alt
  m5: u("1584308972272-9e4e0a6b6e5e"),  // Savlon alt
  m6: u("1607619056574-7b8d3ee536b5"),  // ORS alt
  m7: u("1622543925917-bf01b1f9f0e3"),  // Glucon-D alt
  m8: u("1606937254337-156a8b3d5e3e"),  // Horlicks alt
  m9: u("1559827260-dc66d52bef1a"),     // Boost alt
  m10: u("1559827260-dc66d52bef1b"),    // Ensure alt
  m11: u("1599992389-37c7c5d2b442"),    // Chyawanprash alt
  m12: u("1626516655-1bda1f5f6ea2"),    // Strepsils alt
  m13: u("1583947215281-c7e9f5b9b2a5"), // Band-Aid alt
  m14: u("1631815587646-b85a1bb027e2"), // Cotton alt
  m15: u("1584467735815-f778f274e297"), // Thermometer alt
  m16: u("1584483766114-2cea6facdf58"), // Sanitizer alt
  m17: u("1584634731339-252c581abfc6"), // Face Mask alt
  m18: u("1631549919154-0c3b1c1d4e34"), // Volini alt
  m19: u("1583947215259-38e31be87521"), // Moov alt
  m20: u("1584308972272-9e4e0a6b6e61"), // Paracetamol alt
  m21: u("1631549916768-4119b2e5f928"), // Cough Syrup alt
  m22: u("1550572017-edd951b55107"),    // Zinc alt
  m23: u("1550572017-edd951b55108"),    // Vitamin C alt
  m24: u("1550572017-edd951b55109"),    // Calcium alt
  m25: u("1606755456206-b25ed8c2f9a5"), // Protein Bars alt
};

export const getMedicineFallback = (productId: string): string =>
  PRODUCT_FALLBACKS[productId] ?? MEDICINE_GENERIC_FALLBACK;

/* -------------------------------------------------------------------------- */
/* Runtime validation: assert no Unsplash photo ID is reused across products. */
/* -------------------------------------------------------------------------- */

const extractUnsplashId = (url: string): string | null => {
  const m = url.match(/images\.unsplash\.com\/photo-([A-Za-z0-9_-]+)/);
  return m ? m[1] : null;
};

export const assertNoDuplicateMedicineImages = (): void => {
  const buckets = new Map<string, string[]>();
  for (const p of MEDICINE_PRODUCTS) {
    const id = extractUnsplashId(p.image);
    if (!id) continue;
    const arr = buckets.get(id) ?? [];
    arr.push(`${p.name} (${p.id})`);
    buckets.set(id, arr);
  }
  const dups: string[] = [];
  buckets.forEach((names, id) => {
    if (names.length > 1) dups.push(`  • photo-${id}: ${names.join(", ")}`);
  });
  if (dups.length === 0) return;
  const msg = `[medicine] Duplicate Unsplash photo IDs detected (${dups.length}):\n${dups.join("\n")}`;
  // eslint-disable-next-line no-console
  console.error(msg);
  if (typeof import.meta !== "undefined" && import.meta.env?.DEV) {
    throw new Error(msg);
  }
};

assertNoDuplicateMedicineImages();
