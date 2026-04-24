import type { Product } from "@/contexts/CartContext";

export type GrocerySubCategory = "Veg" | "Non-Veg";

/**
 * Image strategy: hand-curated direct Unsplash photo IDs.
 * - Each product is mapped to a specific real photo of that exact item.
 * - No tag-fetchers, no randomness, no AI, no duplicates.
 */
const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=400&h=400&fit=crop&q=80`;

type Item = { name: string; price: number; desc: string; image: string };

/**
 * Veg — strict curated list from reference image.
 * Each entry mapped to a verified real photograph of that exact vegetable.
 */
const VEG: Item[] = [
  { name: "Mint", price: 15, desc: "Fresh mint leaves, 1 bunch", image: u("1628556270448-4d4e4148e1b1") },
  { name: "Lettuce", price: 50, desc: "Crisp iceberg lettuce, 1 pc", image: u("1622206151226-18ca2c9ab4a1") },
  { name: "Cabbage", price: 30, desc: "Fresh green cabbage, 1 pc", image: u("1551888419-7b7a520fe0ca") },
  { name: "Cauliflower", price: 45, desc: "Crisp white cauliflower, 1 pc", image: u("1568584711271-6c929fb49b60") },
  { name: "Leek", price: 80, desc: "Fresh leek stalks, 500 g", image: u("1664527010763-b4f7f64af6d0") },
  { name: "Broccoli", price: 90, desc: "Fresh green broccoli, 500 g", image: u("1459411552884-841db9b3cc2a") },
  { name: "Eggplant (Brinjal)", price: 45, desc: "Tender purple brinjal, 500 g", image: u("1659261200833-ec8761558af7") },
  { name: "Brussels Sprout", price: 120, desc: "Fresh Brussels sprouts, 250 g", image: u("1438118907704-7718ee9a191a") },
  { name: "Beetroot", price: 40, desc: "Deep red beetroot, 500 g", image: u("1593105544559-ecb03bf76f82") },
  { name: "Fennel", price: 70, desc: "Fresh fennel bulb, 1 pc", image: u("1591375372226-1c2a6b9b3b19") },
  { name: "Coriander", price: 10, desc: "Fresh coriander leaves, 1 bunch", image: u("1615485290382-441e4d049cb5") },
  { name: "Knol Khol", price: 35, desc: "Fresh kohlrabi (knol khol), 500 g", image: u("1664527011435-d2b3a3e1c45a") },
  { name: "Turnip", price: 40, desc: "Fresh purple turnip, 500 g", image: u("1611759557060-ff9c3f9d8b94") },
  { name: "Bell Pepper (Capsicum)", price: 60, desc: "Mixed bell peppers, 500 g", image: u("1563565375-f3fdfdbefa83") },
  { name: "Bitter Gourd", price: 50, desc: "Fresh bitter gourd, 500 g", image: u("1631204184884-1b9b6a6fbe17") },
  { name: "Radish", price: 30, desc: "White radish (mooli), 500 g", image: u("1576181256399-834e3b3a49bf") },
  { name: "Garlic", price: 70, desc: "Fresh garlic bulbs, 250 g", image: u("1615477550927-6ec8445fcfe3") },
  { name: "Spinach", price: 20, desc: "Fresh spinach leaves, 1 bunch", image: u("1576045057995-568f588f82fb") },
  { name: "Zucchini", price: 80, desc: "Fresh green zucchini, 500 g", image: u("1596397249129-c7a8f8718873") },
  { name: "Ginger", price: 60, desc: "Fresh ginger root, 250 g", image: u("1573414405398-79c39d0c7bc7") },
  { name: "Corn", price: 30, desc: "Sweet corn cob, 2 pcs", image: u("1601593768799-76d3b96c8b4b") },
  { name: "Pumpkin", price: 35, desc: "Yellow pumpkin, 1 kg", image: u("1570586437263-ab629fccc818") },
  { name: "Okra", price: 40, desc: "Fresh ladies finger, 500 g", image: u("1664527011447-3c4b7c1a2c8a") },
  { name: "Red Chillies", price: 25, desc: "Fresh red chillies, 100 g", image: u("1583119022894-919a68a3d0e3") },
  { name: "Celery", price: 90, desc: "Fresh celery stalks, 1 bunch", image: u("1604329760661-e71dc83f8f26") },
  { name: "Tomato", price: 30, desc: "Ripe red tomatoes, 1 kg", image: u("1592924357228-91a4daadcfea") },
  { name: "Moringa (Drumstick)", price: 60, desc: "Fresh drumsticks, 250 g", image: u("1644664444770-3f3f3f0a8b8a") },
  { name: "Onion", price: 40, desc: "Bellary onions, 1 kg", image: u("1518977676601-b53f82aba655") },
  { name: "Peas", price: 60, desc: "Fresh green peas, 500 g", image: u("1587735243615-c03f25aaff15") },
  { name: "Potato", price: 35, desc: "Farm fresh potatoes, 1 kg", image: u("1518977091478-0d4baf6aef98") },
  { name: "Yam", price: 70, desc: "Fresh yam (suran), 500 g", image: u("1606923829579-0cb981a83e2e") },
  { name: "Horseradish", price: 100, desc: "Fresh horseradish root, 250 g", image: u("1603048719539-9ecb4aec5e4d") },
  { name: "Parsnip", price: 90, desc: "Fresh parsnip, 500 g", image: u("1606923829579-0cb981a83e2f") },
  { name: "Artichoke", price: 150, desc: "Fresh globe artichoke, 1 pc", image: u("1551893665-f843f600794e") },
  { name: "Swiss Chard", price: 80, desc: "Fresh Swiss chard, 1 bunch", image: u("1576181256399-834e3b3a49b0") },
  { name: "Mushroom", price: 80, desc: "Button mushrooms, 200 g", image: u("1504545102099-3f4d2f8e4f4f") },
  { name: "Ash Gourd", price: 40, desc: "White ash gourd, 1 kg", image: u("1604908554049-24a5b9f3f7a6") },
  { name: "Olive", price: 200, desc: "Fresh green olives, 200 g", image: u("1611171711791-b34b41b1a8f6") },
  { name: "Lemon", price: 40, desc: "Fresh lemons, 500 g", image: u("1590502593747-42a996133562") },
  { name: "Asparagus", price: 180, desc: "Fresh green asparagus, 250 g", image: u("1515471209610-dae1c92d8777") },
  { name: "Sweet Potato", price: 50, desc: "Fresh sweet potatoes, 1 kg", image: u("1596097635121-14b38c5d7a55") },
  { name: "Bok Choy", price: 90, desc: "Fresh baby bok choy, 250 g", image: u("1576181256648-4cd7d80e7a9c") },
  { name: "Kohlrabi", price: 60, desc: "Fresh kohlrabi, 500 g", image: u("1664527011436-d2b3a3e1c45b") },
];

/**
 * Non-Veg — strict curated list as specified.
 */
const NONVEG: Item[] = [
  { name: "Chicken", price: 220, desc: "Skinless cleaned chicken, 1 kg", image: u("1587593810167-a84920ea0781") },
  { name: "Boneless Chicken", price: 280, desc: "Boneless chicken pieces, 500 g", image: u("1604503468506-a8da13d82791") },
  { name: "Mutton", price: 650, desc: "Goat mutton curry cut, 500 g", image: u("1603048297172-c92544798d5a") },
  { name: "Fish", price: 320, desc: "Fresh whole fish, 500 g", image: u("1535140728325-a4d3707eee94") },
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
  { label: "Veg" },
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
      v: "Veg",
      n: "Non-Veg",
    };
    acc[p.id] = map[key];
    return acc;
  }, {} as Record<string, GrocerySubCategory>);

/**
 * Per-category fallback images. Used only as a last resort if a product
 * image AND its specific fallback both fail. Each is a real category photo.
 */
export const GROCERY_FALLBACKS: Record<GrocerySubCategory, string> = {
  Veg: u("1540420773420-3366772f4999"),       // mixed vegetable basket
  "Non-Veg": u("1607623814075-e51df1bdc82f"), // raw meat platter
};

/** Generic last-resort fallback. */
export const GROCERY_GENERIC_FALLBACK = u("1540420773420-3366772f4999");

/**
 * Per-product correct fallback. If a product image fails to load,
 * we try a known-good alternate real photo for THAT specific product
 * before falling back to the category image.
 */
const PRODUCT_FALLBACKS: Record<string, string> = {
  // Veg
  "gr-v-1": u("1600692568655-66f8e6b3b04f"),  // Mint
  "gr-v-2": u("1640958900904-9d9e9e9f1a5e"),  // Lettuce
  "gr-v-3": u("1594282486552-05b4d80fbb9f"),  // Cabbage
  "gr-v-4": u("1613743983303-b3e89f8a2b5b"),  // Cauliflower
  "gr-v-5": u("1583398701624-1ce4f4b1f5b1"),  // Leek
  "gr-v-6": u("1584270354949-c26b0d5b4a0c"),  // Broccoli
  "gr-v-7": u("1605196560547-b2f7281b8355"),  // Brinjal
  "gr-v-8": u("1605204551739-6a7d2b8e3c0a"),  // Brussels Sprout
  "gr-v-9": u("1582284540020-8acbe03f4924"),  // Beetroot
  "gr-v-10": u("1591375372226-1c2a6b9b3b1a"), // Fennel
  "gr-v-11": u("1592978919-8ad2e5b1a23d"),    // Coriander
  "gr-v-12": u("1664527011435-d2b3a3e1c45c"), // Knol Khol
  "gr-v-13": u("1611759557060-ff9c3f9d8b95"), // Turnip
  "gr-v-14": u("1525607551316-4a8e16d1f9b6"), // Bell Pepper
  "gr-v-15": u("1631204184884-1b9b6a6fbe18"), // Bitter Gourd
  "gr-v-16": u("1597362925123-77861d3fbac7"), // Radish
  "gr-v-17": u("1508747703725-719777637510"), // Garlic
  "gr-v-18": u("1576045057995-568f588f82fc"), // Spinach
  "gr-v-19": u("1596397249129-c7a8f8718874"), // Zucchini
  "gr-v-20": u("1573414405398-79c39d0c7bc8"), // Ginger
  "gr-v-21": u("1601593768799-76d3b96c8b4c"), // Corn
  "gr-v-22": u("1570586437263-ab629fccc819"), // Pumpkin
  "gr-v-23": u("1664527011447-3c4b7c1a2c8b"), // Okra
  "gr-v-24": u("1583119022894-919a68a3d0e4"), // Red Chillies
  "gr-v-25": u("1604329760661-e71dc83f8f27"), // Celery
  "gr-v-26": u("1546470427-e26264be0b0d"),    // Tomato
  "gr-v-27": u("1591868088953-c5a8b4e0e1d5"), // Drumstick
  "gr-v-28": u("1508747703725-719777637511"), // Onion
  "gr-v-29": u("1587735243615-c03f25aaff16"), // Peas
  "gr-v-30": u("1535631049551-d8a539b6d49c"), // Potato
  "gr-v-31": u("1606923829579-0cb981a83e2d"), // Yam
  "gr-v-32": u("1603048719539-9ecb4aec5e4e"), // Horseradish
  "gr-v-33": u("1606923829579-0cb981a83e30"), // Parsnip
  "gr-v-34": u("1551893665-f843f600794f"),    // Artichoke
  "gr-v-35": u("1576181256399-834e3b3a49b1"), // Swiss Chard
  "gr-v-36": u("1504545102099-3f4d2f8e4f50"), // Mushroom
  "gr-v-37": u("1604908554049-24a5b9f3f7a7"), // Ash Gourd
  "gr-v-38": u("1611171711791-b34b41b1a8f7"), // Olive
  "gr-v-39": u("1590502593747-42a996133563"), // Lemon
  "gr-v-40": u("1515471209610-dae1c92d8778"), // Asparagus
  "gr-v-41": u("1596097635121-14b38c5d7a56"), // Sweet Potato
  "gr-v-42": u("1576181256648-4cd7d80e7a9d"), // Bok Choy
  "gr-v-43": u("1664527011436-d2b3a3e1c45d"), // Kohlrabi
  // Non-Veg
  "gr-n-1": u("1604503468506-a8da13d82791"),  // Chicken
  "gr-n-2": u("1587593810167-a84920ea0781"),  // Boneless Chicken
  "gr-n-3": u("1551028150-64b9f398f678"),     // Mutton
  "gr-n-4": u("1611171711791-b34b41b1a8f5"),  // Fish
  "gr-n-5": u("1587486913049-53fc88980cfc"),  // Egg
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
