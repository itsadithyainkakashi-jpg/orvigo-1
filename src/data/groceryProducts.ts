import type { Product } from "@/contexts/CartContext";
import catVegetables from "@/assets/grocery/cat-vegetables.png";
import catFruits from "@/assets/grocery/cat-fruits.png";
import catMeatFish from "@/assets/grocery/cat-nonveg.png";
import catDairyEggs from "@/assets/grocery/cat-dairy-eggs.png";
import catGrains from "@/assets/grocery/cat-grains.png";
import catSpices from "@/assets/grocery/cat-spices.png";
import catSnacks from "@/assets/grocery/cat-snacks.png";
import catBeverages from "@/assets/grocery/cat-beverages.png";
import catHousehold from "@/assets/grocery/cat-household.png";
import catPersonalCare from "@/assets/grocery/cat-personal-care.png";
import catBabyCare from "@/assets/grocery/cat-baby-care.png";
import catPetCare from "@/assets/grocery/cat-pet-care.png";

/* -------------------------------------------------------------------------- */
/* Grocery Categories                                                          */
/* -------------------------------------------------------------------------- */

export type GroceryCategoryId =
  | "vegetables"
  | "fruits"
  | "meat-fish"
  | "dairy-eggs"
  | "grains"
  | "spices"
  | "snacks"
  | "beverages"
  | "household"
  | "personal-care"
  | "baby-care"
  | "pet-care"
  // legacy aliases (kept so old links don't 404)
  | "non-veg"
  | "dairy"
  | "biscuits"
  | "essentials"
  | "bakery"
  | "instant";

export interface GroceryCategoryMeta {
  id: GroceryCategoryId;
  label: string;
  icon: string;
  image: string;
  tint: string;      // soft background gradient start
  tintEnd: string;   // soft background gradient end
  accent: string;    // strong accent (title + arrow bg)
  itemCount: string; // display text e.g. "120+ Items"
}

export const GROCERY_CATEGORIES: GroceryCategoryMeta[] = [
  { id: "vegetables",    label: "Vegetables",              icon: "🥦", image: catVegetables,   tint: "hsl(120, 55%, 94%)", tintEnd: "hsl(120, 50%, 88%)", accent: "hsl(140, 65%, 35%)", itemCount: "120+ Items" },
  { id: "fruits",        label: "Fruits",                  icon: "🍎", image: catFruits,       tint: "hsl(38, 90%, 94%)",  tintEnd: "hsl(30, 85%, 88%)",  accent: "hsl(28, 90%, 50%)",  itemCount: "80+ Items"  },
  { id: "meat-fish",     label: "Meat & Fish",             icon: "🍗", image: catMeatFish,     tint: "hsl(0, 75%, 95%)",   tintEnd: "hsl(0, 70%, 90%)",   accent: "hsl(0, 72%, 48%)",   itemCount: "60+ Items"  },
  { id: "dairy-eggs",    label: "Dairy & Eggs",            icon: "🥛", image: catDairyEggs,    tint: "hsl(210, 80%, 94%)", tintEnd: "hsl(210, 75%, 88%)", accent: "hsl(210, 80%, 45%)", itemCount: "90+ Items"  },
  { id: "grains",        label: "Rice & Grains",           icon: "🌾", image: catGrains,       tint: "hsl(38, 55%, 92%)",  tintEnd: "hsl(35, 50%, 86%)",  accent: "hsl(35, 55%, 38%)",  itemCount: "70+ Items"  },
  { id: "spices",        label: "Masala & Spices",         icon: "🌶️", image: catSpices,       tint: "hsl(20, 85%, 93%)",  tintEnd: "hsl(15, 80%, 87%)",  accent: "hsl(12, 82%, 48%)",  itemCount: "150+ Items" },
  { id: "snacks",        label: "Snacks & Packaged Foods", icon: "🍿", image: catSnacks,       tint: "hsl(275, 65%, 94%)", tintEnd: "hsl(275, 60%, 88%)", accent: "hsl(275, 60%, 48%)", itemCount: "200+ Items" },
  { id: "beverages",     label: "Juices & Beverages",      icon: "🥤", image: catBeverages,    tint: "hsl(195, 75%, 93%)", tintEnd: "hsl(195, 70%, 87%)", accent: "hsl(195, 80%, 42%)", itemCount: "100+ Items" },
  { id: "household",     label: "Household Essentials",    icon: "🧴", image: catHousehold,    tint: "hsl(220, 70%, 94%)", tintEnd: "hsl(220, 65%, 88%)", accent: "hsl(220, 70%, 48%)", itemCount: "180+ Items" },
  { id: "personal-care", label: "Personal Care",           icon: "🧼", image: catPersonalCare, tint: "hsl(335, 70%, 95%)", tintEnd: "hsl(335, 65%, 90%)", accent: "hsl(335, 72%, 52%)", itemCount: "150+ Items" },
  { id: "baby-care",     label: "Baby Care",               icon: "🍼", image: catBabyCare,     tint: "hsl(170, 55%, 93%)", tintEnd: "hsl(170, 50%, 87%)", accent: "hsl(175, 65%, 38%)", itemCount: "100+ Items" },
  { id: "pet-care",      label: "Pet Care",                icon: "🐾", image: catPetCare,      tint: "hsl(30, 55%, 93%)",  tintEnd: "hsl(28, 50%, 87%)",  accent: "hsl(28, 60%, 42%)",  itemCount: "60+ Items"  },
];

export const GROCERY_CATEGORY_BY_ID: Record<GroceryCategoryId, GroceryCategoryMeta> =
  GROCERY_CATEGORIES.reduce((acc, c) => {
    acc[c.id] = c;
    return acc;
  }, {} as Record<GroceryCategoryId, GroceryCategoryMeta>);

// Legacy aliases → point old ids at the new meta so /grocery/category/non-veg etc. still resolve
GROCERY_CATEGORY_BY_ID["non-veg"]     = GROCERY_CATEGORY_BY_ID["meat-fish"];
GROCERY_CATEGORY_BY_ID["dairy"]       = GROCERY_CATEGORY_BY_ID["dairy-eggs"];
GROCERY_CATEGORY_BY_ID["biscuits"]    = GROCERY_CATEGORY_BY_ID["snacks"];
GROCERY_CATEGORY_BY_ID["essentials"]  = GROCERY_CATEGORY_BY_ID["household"];
GROCERY_CATEGORY_BY_ID["bakery"]      = GROCERY_CATEGORY_BY_ID["snacks"];
GROCERY_CATEGORY_BY_ID["instant"]     = GROCERY_CATEGORY_BY_ID["snacks"];

/* -------------------------------------------------------------------------- */
/* Grocery Product type                                                        */
/* -------------------------------------------------------------------------- */

export interface GroceryItem extends Product {
  categoryId: GroceryCategoryId;
  weight: string;
  originalPrice: number;
  discount: number;
  deliveryMins: number;
  inStock: boolean;
  bestseller?: boolean;
  recommended?: boolean;
}

const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=500&h=500&fit=crop&q=85`;

type Seed = {
  name: string;
  weight: string;
  price: number;
  originalPrice: number;
  image: string;
  bestseller?: boolean;
  recommended?: boolean;
};

const VEGETABLES: Seed[] = [
  { name: "Hybrid Tomato",  weight: "500 g", price: 25, originalPrice: 35, image: u("1592924357228-91a4daadcfea"), bestseller: true },
  { name: "Red Onion",      weight: "1 kg",  price: 39, originalPrice: 49, image: u("1518977676601-b53f82aba655"), recommended: true },
  { name: "Farm Potato",    weight: "1 kg",  price: 29, originalPrice: 39, image: u("1518977091478-0d4baf6aef98") },
  { name: "Fresh Carrot",   weight: "500 g", price: 35, originalPrice: 49, image: u("1582515073490-39981397c445") },
  { name: "Broccoli",       weight: "500 g", price: 79, originalPrice: 99, image: u("1459411552884-841db9b3cc2a"), recommended: true },
  { name: "Capsicum Mix",   weight: "500 g", price: 59, originalPrice: 79, image: u("1563565375-f3fdfdbefa83") },
  { name: "Baby Spinach",   weight: "250 g", price: 25, originalPrice: 35, image: u("1576045057995-568f588f82fb") },
  { name: "Sweet Corn",     weight: "2 pcs", price: 35, originalPrice: 45, image: u("1601593768799-76d3b96c8b4b") },
];

const FRUITS: Seed[] = [
  { name: "Royal Gala Apple",  weight: "1 kg",  price: 159, originalPrice: 199, image: u("1568702846914-96b305d2aaeb"), bestseller: true },
  { name: "Robusta Banana",    weight: "6 pcs", price: 49,  originalPrice: 69,  image: u("1571771894821-ce9b6c11b08e"), recommended: true },
  { name: "Nagpur Orange",     weight: "1 kg",  price: 129, originalPrice: 169, image: u("1611080626919-7cf5a9dbab12") },
  { name: "Watermelon",        weight: "1 pc",  price: 89,  originalPrice: 129, image: u("1587049352846-4a222e784d38"), bestseller: true },
  { name: "Alphonso Mango",    weight: "1 kg",  price: 349, originalPrice: 499, image: u("1553279768-865429fa0078"), recommended: true },
  { name: "Sweet Pineapple",   weight: "1 pc",  price: 79,  originalPrice: 99,  image: u("1550258987-190a2d41a8ba") },
  { name: "Red Grapes",        weight: "500 g", price: 89,  originalPrice: 119, image: u("1599819811279-d5ad9cccf838") },
  { name: "Pomegranate",       weight: "500 g", price: 119, originalPrice: 149, image: u("1541344999736-83eca272f6fc") },
];

const MEAT_FISH: Seed[] = [
  { name: "Fresh Chicken Curry Cut", weight: "1 kg",   price: 279, originalPrice: 349, image: u("1604503468506-a8da13d82791"), bestseller: true },
  { name: "Chicken Drumsticks",      weight: "500 g",  price: 199, originalPrice: 249, image: u("1587593810167-a84920ea0781") },
  { name: "Rohu Fish Fillet",        weight: "500 g",  price: 249, originalPrice: 319, image: u("1535140728325-a4d3707eee94"), recommended: true },
  { name: "Mutton Curry Cut",        weight: "500 g",  price: 449, originalPrice: 549, image: u("1603048719535-9b75c45dbe0a") },
  { name: "Prawns (Cleaned)",        weight: "250 g",  price: 299, originalPrice: 375, image: u("1565299585323-38d6b0865b47"), bestseller: true },
  { name: "Salmon Steak",            weight: "300 g",  price: 549, originalPrice: 699, image: u("1519708227418-c8fd9a32b7a2") },
];

const DAIRY_EGGS: Seed[] = [
  { name: "Amul Toned Milk",   weight: "1 L",    price: 64,  originalPrice: 68,  image: u("1550583724-b2692b85b150"), bestseller: true },
  { name: "Amul Butter",       weight: "100 g",  price: 56,  originalPrice: 62,  image: u("1589985270826-4b7bb135bc9d"), recommended: true },
  { name: "Cheese Slices",     weight: "200 g",  price: 145, originalPrice: 175, image: u("1486297678162-eb2a19b0a32d") },
  { name: "Greek Yogurt",      weight: "400 g",  price: 80,  originalPrice: 99,  image: u("1488477181946-6428a0291777") },
  { name: "Paneer Cubes",      weight: "200 g",  price: 89,  originalPrice: 110, image: u("1631452180519-c014fe946bc7"), recommended: true },
  { name: "Farm Brown Eggs",   weight: "6 pcs",  price: 75,  originalPrice: 90,  image: u("1582722872445-44dc5f7e3c8f"), bestseller: true },
  { name: "Fresh Cream",       weight: "200 ml", price: 65,  originalPrice: 75,  image: u("1568476237742-c2c0d4d3e0f1") },
];

const GRAINS: Seed[] = [
  { name: "Basmati Rice",      weight: "5 kg",  price: 549, originalPrice: 699, image: u("1586201375761-83865001e31c"), bestseller: true },
  { name: "Sona Masoori Rice", weight: "5 kg",  price: 399, originalPrice: 499, image: u("1614961233913-a5113a4a34ed") },
  { name: "Whole Wheat Atta",  weight: "5 kg",  price: 245, originalPrice: 299, image: u("1568254183919-78a4f43a2877"), recommended: true },
  { name: "Toor Dal",          weight: "1 kg",  price: 145, originalPrice: 175, image: u("1599909533730-5dfa9d4d1f15") },
  { name: "Moong Dal",         weight: "1 kg",  price: 135, originalPrice: 165, image: u("1612257999691-c8c4e6a6e2b6") },
  { name: "Chana Dal",         weight: "1 kg",  price: 110, originalPrice: 140, image: u("1607619056574-7b8d3ee536b2") },
  { name: "Foxtail Millet",    weight: "1 kg",  price: 129, originalPrice: 165, image: u("1586201375761-83865001e31d"), recommended: true },
];

const SPICES: Seed[] = [
  { name: "Turmeric Powder",   weight: "200 g", price: 65, originalPrice: 85,  image: u("1615485290598-3b3d5dabbf73"), bestseller: true },
  { name: "Red Chilli Powder", weight: "200 g", price: 79, originalPrice: 99,  image: u("1599909533730-5dfa9d4d1f16"), recommended: true },
  { name: "Garam Masala",      weight: "100 g", price: 89, originalPrice: 110, image: u("1596040033229-a9821ebd058d") },
  { name: "Coriander Powder",  weight: "200 g", price: 55, originalPrice: 70,  image: u("1596040033229-a9821ebd058e") },
  { name: "Cumin Seeds",       weight: "100 g", price: 75, originalPrice: 95,  image: u("1596040033229-a9821ebd058f"), recommended: true },
  { name: "Black Pepper",      weight: "100 g", price: 99, originalPrice: 125, image: u("1596040033229-a9821ebd058a") },
];

const SNACKS: Seed[] = [
  { name: "Lay's Magic Masala", weight: "90 g",  price: 30, originalPrice: 35,  image: u("1599490659213-e2b9527bd087"), bestseller: true },
  { name: "Haldiram's Bhujia",  weight: "200 g", price: 65, originalPrice: 75,  image: u("1600718374662-0483d2b9da44") },
  { name: "Oreo Cookies",       weight: "120 g", price: 35, originalPrice: 45,  image: u("1599599810769-bcde5a160d32"), recommended: true },
  { name: "Parle-G Biscuits",   weight: "200 g", price: 25, originalPrice: 30,  image: u("1558961363-fa8fdf82db35") },
  { name: "Act II Popcorn",     weight: "70 g",  price: 25, originalPrice: 30,  image: u("1578849278002-92127a2ae5fa") },
  { name: "Hide & Seek Choco",  weight: "120 g", price: 35, originalPrice: 45,  image: u("1606312619070-d48b4c652a53"), bestseller: true },
];

const BEVERAGES: Seed[] = [
  { name: "Coca-Cola",         weight: "750 ml", price: 40,  originalPrice: 45,  image: u("1554866585-cd94860890b7"), bestseller: true },
  { name: "Pepsi Black",       weight: "750 ml", price: 40,  originalPrice: 45,  image: u("1629203851122-3726ecdf080e") },
  { name: "Real Mixed Juice",  weight: "1 L",    price: 110, originalPrice: 135, image: u("1600271886742-f049cd451bba"), recommended: true },
  { name: "Red Bull Energy",   weight: "250 ml", price: 125, originalPrice: 130, image: u("1613214049841-028e017a01e1") },
  { name: "Tropicana Orange",  weight: "1 L",    price: 130, originalPrice: 150, image: u("1600271886742-f049cd451bbb") },
  { name: "Bisleri Water",     weight: "2 L",    price: 30,  originalPrice: 35,  image: u("1606168094336-48f8b0c1d8e0") },
];

const HOUSEHOLD: Seed[] = [
  { name: "Tide Detergent Powder", weight: "2 kg",   price: 349, originalPrice: 425, image: u("1585421514284-efb74320d6c1"), bestseller: true },
  { name: "Lizol Floor Cleaner",   weight: "975 ml", price: 199, originalPrice: 249, image: u("1585421514284-efb74320d6c2"), recommended: true },
  { name: "Vim Dishwash Liquid",   weight: "750 ml", price: 149, originalPrice: 189, image: u("1585421514284-efb74320d6c3") },
  { name: "Kitchen Tissue Roll",   weight: "4 pcs",  price: 179, originalPrice: 220, image: u("1585421514284-efb74320d6c4") },
  { name: "Harpic Toilet Cleaner", weight: "1 L",    price: 165, originalPrice: 199, image: u("1585421514284-efb74320d6c5") },
  { name: "Odonil Air Freshener",  weight: "50 g",   price: 79,  originalPrice: 99,  image: u("1585421514284-efb74320d6c6") },
];

const PERSONAL_CARE: Seed[] = [
  { name: "Colgate Strong Teeth",     weight: "200 g",     price: 110, originalPrice: 140, image: u("1559591935-c6c92c6e3a40"), bestseller: true },
  { name: "Dove Body Wash",           weight: "250 ml",    price: 199, originalPrice: 249, image: u("1556228720-195a672e8a03") },
  { name: "Head & Shoulders Shampoo", weight: "340 ml",    price: 290, originalPrice: 360, image: u("1535585209827-a15fcdbc4c2d"), recommended: true },
  { name: "Dettol Original Soap",     weight: "4 x 75 g",  price: 145, originalPrice: 180, image: u("1585652757173-57de5e9fab42") },
  { name: "Himalaya Face Wash",       weight: "150 ml",    price: 165, originalPrice: 199, image: u("1571781926291-c477ebfd024b"), recommended: true },
  { name: "Nivea Body Lotion",        weight: "400 ml",    price: 349, originalPrice: 425, image: u("1571781926291-c477ebfd024c") },
];

const BABY_CARE: Seed[] = [
  { name: "Pampers Baby Diapers",  weight: "Pack of 44",  price: 749, originalPrice: 899, image: u("1607453998774-d533f65dac99"), bestseller: true },
  { name: "Huggies Wonder Pants",  weight: "Pack of 62",  price: 899, originalPrice: 1099, image: u("1607453998774-d533f65dac98") },
  { name: "Johnson's Baby Wipes",  weight: "80 pcs",      price: 199, originalPrice: 249, image: u("1607453998774-d533f65dac97"), recommended: true },
  { name: "Johnson's Baby Lotion", weight: "500 ml",      price: 349, originalPrice: 425, image: u("1607453998774-d533f65dac96") },
  { name: "Cerelac Baby Cereal",   weight: "300 g",       price: 245, originalPrice: 289, image: u("1607453998774-d533f65dac95"), recommended: true },
  { name: "Himalaya Baby Powder",  weight: "200 g",       price: 165, originalPrice: 199, image: u("1607453998774-d533f65dac94") },
];

const PET_CARE: Seed[] = [
  { name: "Pedigree Adult Dog Food",  weight: "3 kg",   price: 649, originalPrice: 799, image: u("1583337130417-3346a1be7dee"), bestseller: true },
  { name: "Whiskas Cat Food Tuna",    weight: "1.2 kg", price: 549, originalPrice: 699, image: u("1583337130417-3346a1be7def") },
  { name: "Drools Puppy Food",        weight: "1.2 kg", price: 449, originalPrice: 549, image: u("1583337130417-3346a1be7dea"), recommended: true },
  { name: "Meat Up Chicken Treats",   weight: "500 g",  price: 299, originalPrice: 399, image: u("1583337130417-3346a1be7deb") },
  { name: "Sheba Cat Wet Food",       weight: "70 g",   price: 89,  originalPrice: 110, image: u("1583337130417-3346a1be7dec"), recommended: true },
  { name: "Pet Shampoo",              weight: "200 ml", price: 249, originalPrice: 319, image: u("1583337130417-3346a1be7ded") },
];

const CATEGORY_SEEDS: Partial<Record<GroceryCategoryId, Seed[]>> = {
  vegetables: VEGETABLES,
  fruits: FRUITS,
  "meat-fish": MEAT_FISH,
  "dairy-eggs": DAIRY_EGGS,
  grains: GRAINS,
  spices: SPICES,
  snacks: SNACKS,
  beverages: BEVERAGES,
  household: HOUSEHOLD,
  "personal-care": PERSONAL_CARE,
  "baby-care": BABY_CARE,
  "pet-care": PET_CARE,
};

const buildItems = (categoryId: GroceryCategoryId, seeds: Seed[]): GroceryItem[] =>
  seeds.map((s, idx) => ({
    id: `gr-${categoryId}-${idx + 1}`,
    name: s.name,
    price: s.price,
    image: s.image,
    rating: 4.1 + ((idx * 13) % 9) * 0.1,
    category: "Grocery",
    description: `${s.weight} • Fresh & hygienically packed`,
    categoryId,
    weight: s.weight,
    originalPrice: s.originalPrice,
    discount: Math.max(1, Math.round(((s.originalPrice - s.price) / s.originalPrice) * 100)),
    deliveryMins: 10 + (idx % 6),
    inStock: true,
    bestseller: s.bestseller,
    recommended: s.recommended,
  }));

export const GROCERY_PRODUCTS: GroceryItem[] = GROCERY_CATEGORIES
  .flatMap((cat) => buildItems(cat.id, CATEGORY_SEEDS[cat.id] ?? []));

export const GROCERY_BY_CATEGORY: Record<GroceryCategoryId, GroceryItem[]> =
  GROCERY_CATEGORIES.reduce((acc, cat) => {
    acc[cat.id] = GROCERY_PRODUCTS.filter((p) => p.categoryId === cat.id);
    return acc;
  }, {} as Record<GroceryCategoryId, GroceryItem[]>);

// Legacy alias buckets share the new category product lists
GROCERY_BY_CATEGORY["non-veg"]    = GROCERY_BY_CATEGORY["meat-fish"];
GROCERY_BY_CATEGORY["dairy"]      = GROCERY_BY_CATEGORY["dairy-eggs"];
GROCERY_BY_CATEGORY["biscuits"]   = GROCERY_BY_CATEGORY["snacks"];
GROCERY_BY_CATEGORY["essentials"] = GROCERY_BY_CATEGORY["household"];
GROCERY_BY_CATEGORY["bakery"]     = GROCERY_BY_CATEGORY["snacks"];
GROCERY_BY_CATEGORY["instant"]    = GROCERY_BY_CATEGORY["snacks"];

export const GROCERY_BESTSELLERS: GroceryItem[] = GROCERY_PRODUCTS.filter((p) => p.bestseller);
export const GROCERY_RECOMMENDED: GroceryItem[] = GROCERY_PRODUCTS.filter((p) => p.recommended);

/* -------------------------------------------------------------------------- */
/* Compatibility shims                                                         */
/* -------------------------------------------------------------------------- */

export const GROCERY_GENERIC_FALLBACK = u("1540420773420-3366772f4999");

export const getGroceryFallback = (productId: string): string => {
  const product = GROCERY_PRODUCTS.find((p) => p.id === productId);
  return product?.image ?? GROCERY_GENERIC_FALLBACK;
};
