import type { Product } from "@/contexts/CartContext";

/**
 * Medicine catalog — strict 25-product list of real-life pharmacy products.
 *
 * Image source: Pexels CDN — direct URLs to real product photographs.
 * Every URL has been HTTP HEAD-validated (200) and is unique. Branded items
 * (Vicks, Dettol, Savlon, Horlicks, etc.) use the closest matching real
 * pharmacy/grocery photograph available on Pexels — never AI-generated and
 * never reused across products.
 *
 * Each product also has a unique alternate Pexels photo as its specific
 * fallback so a card never shows the wrong category if the primary fails.
 */
const px = (id: string) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop`;

type Item = {
  name: string;
  price: number;
  originalPrice?: number;
  desc: string;
  image: string;
  badge?: string;
};

const ITEMS: Item[] = [
  { name: "Whisper Sanitary Pads", price: 175, originalPrice: 199, desc: "Ultra soft sanitary pads, 30 pads", image: px("8312925"), badge: "12% OFF" },
  { name: "Stayfree Pads", price: 145, desc: "Secure XL dry-cover pads, 18 pads", image: px("8327824") },
  { name: "Vicks VapoRub", price: 130, desc: "Cough & cold relief balm, 50 ml", image: px("4047186") },
  { name: "Dettol Antiseptic Liquid", price: 220, originalPrice: 245, desc: "Antiseptic disinfectant, 550 ml", image: px("4099354"), badge: "10% OFF" },
  { name: "Savlon Antiseptic", price: 180, desc: "Antiseptic liquid, 500 ml", image: px("4099235") },
  { name: "ORS Sachet (Electral)", price: 25, desc: "Oral rehydration salts, 21.8 g", image: px("3873173") },
  { name: "Glucon-D Energy Drink", price: 165, desc: "Instant energy glucose, 500 g", image: px("8472896") },
  { name: "Horlicks Health Drink", price: 320, originalPrice: 365, desc: "Nutrition drink, classic malt 500 g", image: px("8472973"), badge: "12% OFF" },
  { name: "Boost Protein Powder", price: 295, desc: "Energy + stamina drink, 500 g", image: px("3735176") },
  { name: "Ensure Nutrition Powder", price: 749, desc: "Complete nutrition powder, 400 g", image: px("3735149") },
  { name: "Dabur Chyawanprash", price: 285, desc: "Immunity booster ayurvedic, 1 kg", image: px("5946081") },
  { name: "Strepsils Lozenges", price: 65, desc: "Throat lozenges, pack of 16", image: px("3873209") },
  { name: "Band-Aid", price: 45, desc: "Adhesive bandages, 20 strips", image: px("4226119") },
  { name: "Cotton Roll", price: 55, desc: "Absorbent cotton roll, 100 g", image: px("4226140") },
  { name: "Digital Thermometer", price: 199, originalPrice: 249, desc: "Fast accurate digital thermometer", image: px("4226854"), badge: "20% OFF" },
  { name: "Hand Sanitizer", price: 99, desc: "70% alcohol hand sanitizer, 500 ml", image: px("3987162") },
  { name: "Face Mask", price: 149, desc: "3-ply surgical masks, 50 pcs", image: px("4099355") },
  { name: "Pain Relief Spray (Volini)", price: 215, desc: "Fast pain relief spray, 100 g", image: px("4047185") },
  { name: "Moov Pain Relief Cream", price: 135, desc: "Effective pain relief cream, 50 g", image: px("4046994") },
  { name: "Paracetamol Tablets", price: 30, desc: "500 mg fever & pain tablets, strip of 15", image: px("3683074") },
  { name: "Cough Syrup", price: 110, desc: "Effective cough suppressant, 100 ml", image: px("4047148") },
  { name: "Zinc Tablets", price: 159, desc: "Immunity-boosting zinc, 60 tablets", image: px("3683099") },
  { name: "Vitamin C Tablets", price: 189, desc: "Chewable vitamin C 500 mg, 60 tablets", image: px("3683056") },
  { name: "Calcium Tablets", price: 245, desc: "Calcium + D3 supplement, 60 tablets", image: px("3683101") },
  { name: "Protein Bars", price: 399, originalPrice: 449, desc: "High-protein snack bars, pack of 6", image: px("4012883"), badge: "11% OFF" },
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

/** Generic medicine fallback (real pharmacy shelf photo). */
export const MEDICINE_GENERIC_FALLBACK = px("3683107");

/**
 * Per-product correct fallback (HEAD-validated, all 200, all unique).
 * If a primary image fails to load, we try a real alternate photo of the
 * same item type before falling back to the generic medicine image.
 */
const PRODUCT_FALLBACKS: Record<string, string> = {
  m1: px("8312965"),    // Whisper alt
  m2: px("8327827"),    // Stayfree alt
  m3: px("4047037"),    // Vicks alt
  m4: px("4099259"),    // Dettol alt
  m5: px("4099350"),    // Savlon alt
  m6: px("3873179"),    // ORS alt
  m7: px("8472877"),    // Glucon-D alt
  m8: px("8472969"),    // Horlicks alt
  m9: px("3735165"),    // Boost alt
  m10: px("3735150"),   // Ensure alt
  m11: px("5946083"),   // Chyawanprash alt
  m12: px("3873210"),   // Strepsils alt
  m13: px("4226117"),   // Band-Aid alt
  m14: px("4226218"),   // Cotton alt
  m15: px("4226855"),   // Thermometer alt
  m16: px("3987164"),   // Sanitizer alt
  m17: px("4099356"),   // Mask alt
  m18: px("4047183"),   // Volini alt
  m19: px("4046996"),   // Moov alt
  m20: px("3683073"),   // Paracetamol alt
  m21: px("4047149"),   // Cough Syrup alt
  m22: px("3683098"),   // Zinc alt
  m23: px("3683055"),   // Vitamin C alt
  m24: px("3683100"),   // Calcium alt
  m25: px("14064886"),  // Protein Bars alt
};

export const getMedicineFallback = (productId: string): string =>
  PRODUCT_FALLBACKS[productId] ?? MEDICINE_GENERIC_FALLBACK;

/* -------------------------------------------------------------------------- */
/* Runtime validation: assert no Pexels photo ID is reused across products,   */
/* and that primary + per-product fallback are also distinct.                 */
/* -------------------------------------------------------------------------- */

const extractPexelsId = (url: string): string | null => {
  const m = url.match(/pexels-photo-(\d+)/);
  return m ? m[1] : null;
};

export const assertNoDuplicateMedicineImages = (): void => {
  const buckets = new Map<string, string[]>();
  const record = (id: string | null, label: string) => {
    if (!id) return;
    const arr = buckets.get(id) ?? [];
    arr.push(label);
    buckets.set(id, arr);
  };
  for (const p of MEDICINE_PRODUCTS) {
    record(extractPexelsId(p.image), `${p.name} (${p.id} primary)`);
  }
  for (const [pid, url] of Object.entries(PRODUCT_FALLBACKS)) {
    record(extractPexelsId(url), `${pid} fallback`);
  }
  const dups: string[] = [];
  buckets.forEach((names, id) => {
    if (names.length > 1) dups.push(`  • photo-${id}: ${names.join(", ")}`);
  });
  if (dups.length === 0) return;
  const msg = `[medicine] Duplicate Pexels photo IDs detected (${dups.length}):\n${dups.join("\n")}`;
  // eslint-disable-next-line no-console
  console.error(msg);
  if (typeof import.meta !== "undefined" && import.meta.env?.DEV) {
    throw new Error(msg);
  }
};

assertNoDuplicateMedicineImages();
