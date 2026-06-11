import type { Product } from "@/contexts/CartContext";
import catVegetables from "@/assets/grocery/cat-vegetables.png";
import catNonveg from "@/assets/grocery/cat-nonveg.png";
import catFruits from "@/assets/grocery/cat-fruits.png";
import catSnacks from "@/assets/grocery/cat-snacks.png";
import catBeverages from "@/assets/grocery/cat-beverages.png";
import catSpices from "@/assets/grocery/cat-spices.png";
import catGrains from "@/assets/grocery/cat-grains.png";
import catEssentials from "@/assets/grocery/cat-essentials.png";
import catBiscuits from "@/assets/grocery/cat-biscuits.png";

/* -------------------------------------------------------------------------- */
/* Grocery Categories                                                          */
/* -------------------------------------------------------------------------- */

export type GroceryCategoryId =
  | "vegetables"
  | "non-veg"
  | "fruits"
  | "snacks"
  | "beverages"
  | "spices"
  | "grains"
  | "essentials"
  | "biscuits"
  // legacy ids kept for backwards-compat
  | "dairy"
  | "bakery"
  | "instant"
  | "personal-care";

export interface GroceryCategoryMeta {
  id: GroceryCategoryId;
  label: string;
  icon: string;        // emoji (legacy fallback)
  image: string;       // realistic 3D PNG used in home grid
  tint: string;        // soft pastel background for category card
  accent: string;      // accent color
}

export const GROCERY_CATEGORIES: GroceryCategoryMeta[] = [
  { id: "vegetables", label: "Vegetables",         icon: "🥦", image: catVegetables, tint: "hsl(120, 55%, 94%)", accent: "hsl(140, 65%, 38%)" },
  { id: "non-veg",    label: "Non-Vegetarian",     icon: "🍗", image: catNonveg,     tint: "hsl(0, 70%, 95%)",   accent: "hsl(0, 70%, 50%)"  },
  { id: "fruits",     label: "Fruits",             icon: "🍎", image: catFruits,     tint: "hsl(20, 85%, 94%)",  accent: "hsl(15, 80%, 55%)" },
  { id: "snacks",     label: "Snacks",             icon: "🍿", image: catSnacks,     tint: "hsl(35, 90%, 93%)",  accent: "hsl(28, 85%, 55%)" },
  { id: "beverages",  label: "Juices & Beverages", icon: "🥤", image: catBeverages,  tint: "hsl(195, 75%, 93%)", accent: "hsl(195, 80%, 50%)" },
  { id: "spices",     label: "Masala & Spices",    icon: "🌶️", image: catSpices,     tint: "hsl(15, 85%, 93%)",  accent: "hsl(12, 80%, 50%)" },
  { id: "grains",     label: "Rice & Grains",      icon: "🌾", image: catGrains,     tint: "hsl(45, 80%, 93%)",  accent: "hsl(38, 70%, 45%)" },
  { id: "essentials", label: "Cooking Essentials", icon: "🫙", image: catEssentials, tint: "hsl(48, 85%, 94%)",  accent: "hsl(42, 80%, 45%)" },
  { id: "biscuits",   label: "Biscuits & Cookies", icon: "🍪", image: catBiscuits,   tint: "hsl(30, 70%, 93%)",  accent: "hsl(25, 75%, 45%)" },
];

export const GROCERY_CATEGORY_BY_ID: Record<GroceryCategoryId, GroceryCategoryMeta> =
  GROCERY_CATEGORIES.reduce((acc, c) => ({ ...acc, [c.id]: c }), {} as Record<GroceryCategoryId, GroceryCategoryMeta>);

/* -------------------------------------------------------------------------- */
/* Grocery Product type                                                        */
/* -------------------------------------------------------------------------- */

export interface GroceryItem extends Product {
  categoryId: GroceryCategoryId;
  weight: string;
  originalPrice: number;
  discount: number;     // percent
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

const FRUITS: Seed[] = [
  { name: "Royal Gala Apple",  weight: "1 kg",   price: 159, originalPrice: 199, image: u("1568702846914-96b305d2aaeb"), bestseller: true },
  { name: "Robusta Banana",    weight: "6 pcs",  price: 49,  originalPrice: 69,  image: u("1571771894821-ce9b6c11b08e"), recommended: true },
  { name: "Nagpur Orange",     weight: "1 kg",   price: 129, originalPrice: 169, image: u("1611080626919-7cf5a9dbab12") },
  { name: "Watermelon",        weight: "1 pc",   price: 89,  originalPrice: 129, image: u("1587049352846-4a222e784d38"), bestseller: true },
  { name: "Alphonso Mango",    weight: "1 kg",   price: 349, originalPrice: 499, image: u("1553279768-865429fa0078"), recommended: true },
  { name: "Sweet Pineapple",   weight: "1 pc",   price: 79,  originalPrice: 99,  image: u("1550258987-190a2d41a8ba") },
  { name: "Red Grapes",        weight: "500 g",  price: 89,  originalPrice: 119, image: u("1599819811279-d5ad9cccf838") },
  { name: "Pomegranate",       weight: "500 g",  price: 119, originalPrice: 149, image: u("1541344999736-83eca272f6fc") },
];

const VEGETABLES: Seed[] = [
  { name: "Hybrid Tomato",     weight: "500 g",  price: 25, originalPrice: 35, image: u("1592924357228-91a4daadcfea"), bestseller: true },
  { name: "Red Onion",         weight: "1 kg",   price: 39, originalPrice: 49, image: u("1518977676601-b53f82aba655"), recommended: true },
  { name: "Farm Potato",       weight: "1 kg",   price: 29, originalPrice: 39, image: u("1518977091478-0d4baf6aef98") },
  { name: "Fresh Carrot",      weight: "500 g",  price: 35, originalPrice: 49, image: u("1582515073490-39981397c445") },
  { name: "Broccoli",          weight: "500 g",  price: 79, originalPrice: 99, image: u("1459411552884-841db9b3cc2a"), recommended: true },
  { name: "Capsicum Mix",      weight: "500 g",  price: 59, originalPrice: 79, image: u("1563565375-f3fdfdbefa83") },
  { name: "Baby Spinach",      weight: "250 g",  price: 25, originalPrice: 35, image: u("1576045057995-568f588f82fb") },
  { name: "Sweet Corn",        weight: "2 pcs",  price: 35, originalPrice: 45, image: u("1601593768799-76d3b96c8b4b") },
];

const DAIRY: Seed[] = [
  { name: "Amul Toned Milk",   weight: "1 L",    price: 64, originalPrice: 68, image: u("1550583724-b2692b85b150"), bestseller: true },
  { name: "Amul Butter",       weight: "100 g",  price: 56, originalPrice: 62, image: u("1589985270826-4b7bb135bc9d"), recommended: true },
  { name: "Cheese Slices",     weight: "200 g",  price: 145, originalPrice: 175, image: u("1486297678162-eb2a19b0a32d") },
  { name: "Greek Yogurt",      weight: "400 g",  price: 80,  originalPrice: 99,  image: u("1488477181946-6428a0291777") },
  { name: "Paneer Cubes",      weight: "200 g",  price: 89,  originalPrice: 110, image: u("1631452180519-c014fe946bc7"), recommended: true },
  { name: "Fresh Cream",       weight: "200 ml", price: 65,  originalPrice: 75,  image: u("1568476237742-c2c0d4d3e0f1") },
];

const SNACKS: Seed[] = [
  { name: "Lay's Magic Masala", weight: "90 g",  price: 30,  originalPrice: 35,  image: u("1599490659213-e2b9527bd087"), bestseller: true },
  { name: "Haldiram's Bhujia",  weight: "200 g", price: 65,  originalPrice: 75,  image: u("1600718374662-0483d2b9da44") },
  { name: "Kurkure Masala",     weight: "85 g",  price: 20,  originalPrice: 25,  image: u("1621447504864-d8686e12698c") },
  { name: "Uncle Chips Spicy",  weight: "60 g",  price: 20,  originalPrice: 25,  image: u("1613919113640-25732ec5e61f"), recommended: true },
  { name: "Act II Popcorn",     weight: "70 g",  price: 25,  originalPrice: 30,  image: u("1578849278002-92127a2ae5fa") },
  { name: "Bingo Mad Angles",   weight: "80 g",  price: 20,  originalPrice: 25,  image: u("1566478989037-eec170784d0b") },
];

const BISCUITS: Seed[] = [
  { name: "Oreo Cookies",       weight: "120 g", price: 35,  originalPrice: 45,  image: u("1599599810769-bcde5a160d32"), bestseller: true },
  { name: "Parle-G Biscuits",   weight: "200 g", price: 25,  originalPrice: 30,  image: u("1558961363-fa8fdf82db35") },
  { name: "Britannia Good Day", weight: "150 g", price: 30,  originalPrice: 40,  image: u("1568051243851-f9b136146e97"), recommended: true },
  { name: "Hide & Seek Choco",  weight: "120 g", price: 35,  originalPrice: 45,  image: u("1606312619070-d48b4c652a53") },
  { name: "Bourbon Cream",      weight: "150 g", price: 30,  originalPrice: 40,  image: u("1590080875515-8a3a8dc5735e") },
  { name: "Monaco Salted",      weight: "200 g", price: 35,  originalPrice: 45,  image: u("1612203985729-70726954388c"), recommended: true },
];

const NON_VEG: Seed[] = [
  { name: "Fresh Chicken Curry Cut", weight: "1 kg", price: 279, originalPrice: 349, image: u("1604503468506-a8da13d82791"), bestseller: true },
  { name: "Chicken Drumsticks",      weight: "500 g", price: 199, originalPrice: 249, image: u("1587593810167-a84920ea0781") },
  { name: "Rohu Fish Fillet",        weight: "500 g", price: 249, originalPrice: 319, image: u("1535140728325-a4d3707eee94"), recommended: true },
  { name: "Mutton Curry Cut",        weight: "500 g", price: 449, originalPrice: 549, image: u("1603048719535-9b75c45dbe0a") },
  { name: "Farm Brown Eggs",         weight: "6 pcs", price: 75,  originalPrice: 90,  image: u("1582722872445-44dc5f7e3c8f"), bestseller: true },
  { name: "Prawns (Cleaned)",        weight: "250 g", price: 299, originalPrice: 375, image: u("1565299585323-38d6b0865b47") },
];



const BEVERAGES: Seed[] = [
  { name: "Coca-Cola",         weight: "750 ml", price: 40,  originalPrice: 45,  image: u("1554866585-cd94860890b7"), bestseller: true },
  { name: "Pepsi Black",       weight: "750 ml", price: 40,  originalPrice: 45,  image: u("1629203851122-3726ecdf080e") },
  { name: "Real Mixed Juice",  weight: "1 L",    price: 110, originalPrice: 135, image: u("1600271886742-f049cd451bba"), recommended: true },
  { name: "Red Bull Energy",   weight: "250 ml", price: 125, originalPrice: 130, image: u("1613214049841-028e017a01e1") },
  { name: "Tropicana Orange",  weight: "1 L",    price: 130, originalPrice: 150, image: u("1600271886742-f049cd451bbb") },
  { name: "Bisleri Water",     weight: "2 L",    price: 30,  originalPrice: 35,  image: u("1606168094336-48f8b0c1d8e0") },
];

const BAKERY: Seed[] = [
  { name: "Brown Bread",       weight: "400 g",  price: 45,  originalPrice: 55,  image: u("1509440159596-0249088772ff"), bestseller: true },
  { name: "Chocolate Cake",    weight: "500 g",  price: 349, originalPrice: 449, image: u("1578985545062-69928b1d9587"), recommended: true },
  { name: "Glazed Donuts",     weight: "4 pcs",  price: 199, originalPrice: 249, image: u("1551024506-0bccd828d307") },
  { name: "Choco Muffins",     weight: "6 pcs",  price: 149, originalPrice: 199, image: u("1486427944299-d1955d23e34d"), recommended: true },
  { name: "Butter Croissant",  weight: "2 pcs",  price: 99,  originalPrice: 129, image: u("1555507036-ab1f4038808a") },
  { name: "Pav Buns",          weight: "6 pcs",  price: 35,  originalPrice: 45,  image: u("1568471173242-461f0a730452") },
];

const GRAINS: Seed[] = [
  { name: "Basmati Rice",      weight: "5 kg",   price: 549, originalPrice: 699, image: u("1586201375761-83865001e31c"), bestseller: true },
  { name: "Sona Masoori Rice", weight: "5 kg",   price: 399, originalPrice: 499, image: u("1614961233913-a5113a4a34ed") },
  { name: "Whole Wheat Atta",  weight: "5 kg",   price: 245, originalPrice: 299, image: u("1568254183919-78a4f43a2877"), recommended: true },
  { name: "Toor Dal",          weight: "1 kg",   price: 145, originalPrice: 175, image: u("1599909533730-5dfa9d4d1f15") },
  { name: "Moong Dal",         weight: "1 kg",   price: 135, originalPrice: 165, image: u("1612257999691-c8c4e6a6e2b6") },
  { name: "Chana Dal",         weight: "1 kg",   price: 110, originalPrice: 140, image: u("1607619056574-7b8d3ee536b2") },
];

const ESSENTIALS: Seed[] = [
  { name: "Fortune Sunflower Oil", weight: "1 L", price: 159, originalPrice: 199, image: u("1620706857370-e1b9770e8bb1"), bestseller: true },
  { name: "Tata Iodised Salt", weight: "1 kg",   price: 28,  originalPrice: 32,  image: u("1518110925495-b37653a13e8c") },
  { name: "Sugar",             weight: "1 kg",   price: 49,  originalPrice: 55,  image: u("1581365365964-7f9d4f5d3a6c"), recommended: true },
  { name: "Aashirvaad Atta",   weight: "5 kg",   price: 285, originalPrice: 339, image: u("1568254183919-78a4f43a2878") },
  { name: "Ghee Pure Cow",     weight: "500 ml", price: 349, originalPrice: 425, image: u("1631452180519-c014fe946bc8"), bestseller: true },
  { name: "Mustard Oil",       weight: "1 L",    price: 179, originalPrice: 219, image: u("1620706857370-e1b9770e8bb2") },
];

const SPICES: Seed[] = [
  { name: "Turmeric Powder",   weight: "200 g",  price: 65,  originalPrice: 85,  image: u("1615485290598-3b3d5dabbf73"), bestseller: true },
  { name: "Red Chilli Powder", weight: "200 g",  price: 79,  originalPrice: 99,  image: u("1599909533730-5dfa9d4d1f16"), recommended: true },
  { name: "Garam Masala",      weight: "100 g",  price: 89,  originalPrice: 110, image: u("1596040033229-a9821ebd058d") },
  { name: "Coriander Powder",  weight: "200 g",  price: 55,  originalPrice: 70,  image: u("1596040033229-a9821ebd058e") },
  { name: "Cumin Seeds",       weight: "100 g",  price: 75,  originalPrice: 95,  image: u("1596040033229-a9821ebd058f"), recommended: true },
  { name: "Sambar Masala",     weight: "100 g",  price: 70,  originalPrice: 85,  image: u("1596040033229-a9821ebd058a") },
];

const INSTANT: Seed[] = [
  { name: "Maggi 2-Minute Noodles", weight: "560 g (8 pk)", price: 96, originalPrice: 112, image: u("1612966809470-1ae6a3e2da75"), bestseller: true },
  { name: "MTR Poha Mix",      weight: "160 g",  price: 60,  originalPrice: 75,  image: u("1604908176997-43ce2b6ed6c6") },
  { name: "Knorr Sweet Corn Soup", weight: "60 g", price: 55, originalPrice: 65, image: u("1547592180-85f173990554"), recommended: true },
  { name: "Yippee Magic Masala",weight: "260 g", price: 60, originalPrice: 70, image: u("1612966809470-1ae6a3e2da76") },
  { name: "Top Ramen Curry",   weight: "560 g",  price: 105, originalPrice: 125, image: u("1612966809470-1ae6a3e2da77"), recommended: true },
  { name: "MTR Upma Mix",      weight: "200 g",  price: 65,  originalPrice: 80,  image: u("1604908176997-43ce2b6ed6c7") },
];

const PERSONAL_CARE: Seed[] = [
  { name: "Colgate Strong Teeth", weight: "200 g", price: 110, originalPrice: 140, image: u("1559591935-c6c92c6e3a40"), bestseller: true },
  { name: "Dove Body Wash",    weight: "250 ml", price: 199, originalPrice: 249, image: u("1556228720-195a672e8a03") },
  { name: "Head & Shoulders Shampoo", weight: "340 ml", price: 290, originalPrice: 360, image: u("1535585209827-a15fcdbc4c2d"), recommended: true },
  { name: "Dettol Original Soap", weight: "4 x 75 g", price: 145, originalPrice: 180, image: u("1585652757173-57de5e9fab42") },
  { name: "Gillette Mach3 Razor", weight: "1 pc", price: 245, originalPrice: 299, image: u("1626808642875-0aa545482dfb") },
  { name: "Nivea Body Lotion", weight: "400 ml", price: 349, originalPrice: 425, image: u("1571781926291-c477ebfd024b") },
];

const CATEGORY_SEEDS: Record<GroceryCategoryId, Seed[]> = {
  vegetables: VEGETABLES,
  "non-veg": NON_VEG,
  fruits: FRUITS,
  snacks: SNACKS,
  beverages: BEVERAGES,
  spices: SPICES,
  grains: GRAINS,
  essentials: ESSENTIALS,
  biscuits: BISCUITS,
  dairy: DAIRY,
  bakery: BAKERY,
  instant: INSTANT,
  "personal-care": PERSONAL_CARE,
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

export const GROCERY_PRODUCTS: GroceryItem[] = (Object.keys(CATEGORY_SEEDS) as GroceryCategoryId[])
  .flatMap((id) => buildItems(id, CATEGORY_SEEDS[id]));

export const GROCERY_BY_CATEGORY: Record<GroceryCategoryId, GroceryItem[]> =
  GROCERY_CATEGORIES.reduce((acc, c) => {
    acc[c.id] = GROCERY_PRODUCTS.filter((p) => p.categoryId === c.id);
    return acc;
  }, {} as Record<GroceryCategoryId, GroceryItem[]>);

export const GROCERY_BESTSELLERS: GroceryItem[] = GROCERY_PRODUCTS.filter((p) => p.bestseller);
export const GROCERY_RECOMMENDED: GroceryItem[] = GROCERY_PRODUCTS.filter((p) => p.recommended);

/* -------------------------------------------------------------------------- */
/* Compatibility shims — kept so other modules don't break.                    */
/* -------------------------------------------------------------------------- */

export const GROCERY_GENERIC_FALLBACK = u("1540420773420-3366772f4999");

export const getGroceryFallback = (productId: string): string => {
  const product = GROCERY_PRODUCTS.find((p) => p.id === productId);
  return product?.image ?? GROCERY_GENERIC_FALLBACK;
};
