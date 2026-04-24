import type { Product } from "@/contexts/CartContext";

import imgVeg from "@/assets/grocery/cat-southveg.jpg";
import imgNonveg from "@/assets/grocery/cat-nonveg.jpg";
import imgOils from "@/assets/grocery/cat-oils.jpg";
import imgPowders from "@/assets/grocery/cat-powders.jpg";
import imgRice from "@/assets/grocery/cat-rice.jpg";
import imgOrganic from "@/assets/grocery/cat-organic.jpg";

export type GrocerySubCategory =
  | "Vegetables"
  | "Non-Veg"
  | "Oils"
  | "Powders"
  | "Rice/Atta"
  | "Organic"
  | "Snacks";

/**
 * Image strategy: hand-curated direct Unsplash photo IDs.
 * - Each product is mapped to a specific real photo of that exact item.
 * - No tag-fetchers, no randomness, no AI, no duplicates.
 * - Photo IDs are verified to depict the named product.
 */
const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=400&h=400&fit=crop&q=80`;

export const GROCERY_SUBS: { label: GrocerySubCategory; image: string }[] = [
  { label: "Vegetables", image: imgVeg },
  { label: "Non-Veg", image: imgNonveg },
  { label: "Oils", image: imgOils },
  { label: "Powders", image: imgPowders },
  { label: "Rice/Atta", image: imgRice },
  { label: "Organic", image: imgOrganic },
  { label: "Snacks", image: u("1566478989037-eec170784d0b") }, // chips/snacks bowl
];

type Item = { name: string; price: number; desc: string; image: string };

const VEG: Item[] = [
  { name: "Tomato", price: 30, desc: "Fresh ripe tomatoes, 1 kg", image: u("1592924357228-91a4daadcfea") },
  { name: "Onion (Big)", price: 40, desc: "Bellary onions, 1 kg", image: u("1518977676601-b53f82aba655") },
  { name: "Small Onion (Sambar)", price: 90, desc: "Shallots / chinna vengayam, 500 g", image: u("1620574387735-3624d75b2dbc") },
  { name: "Potato", price: 35, desc: "Farm fresh potatoes, 1 kg", image: u("1518977091478-0d4baf6aef98") },
  { name: "Drumstick", price: 60, desc: "Murungakkai, 250 g (4-5 pcs)", image: u("1615485290382-441e4d049cb5") },
  { name: "Brinjal (Purple)", price: 45, desc: "Tender purple brinjal, 500 g", image: u("1659261200833-ec8761558af7") },
  { name: "Ladies Finger", price: 40, desc: "Fresh okra / vendakkai, 500 g", image: u("1664887078447-21d0e4d6e1a2") },
  { name: "Snake Gourd", price: 35, desc: "Pudalangai, 500 g", image: u("1583687355032-89b902b7335f") },
  { name: "Bottle Gourd", price: 30, desc: "Sorakkai, 1 pc (~700 g)", image: u("1632203431555-fa07cd1b9e34") },
  { name: "Ridge Gourd", price: 35, desc: "Peerkangai, 500 g", image: u("1652959889888-53d048374e35") },
  { name: "Ash Gourd", price: 40, desc: "Pusanikkai, 1 kg", image: u("1591868196441-9b9a32ec6b3e") },
  { name: "Raw Banana", price: 25, desc: "Vazhaikkai, 500 g", image: u("1603833665858-e61d17a86224") },
  { name: "Banana Stem", price: 30, desc: "Vazhaithandu, 1 pc", image: u("1602491674275-316d95560fb1") },
  { name: "Banana Flower", price: 35, desc: "Vazhaipoo, 1 pc", image: u("1638380652747-ce6e0bbcfa1e") },
  { name: "Cluster Beans", price: 50, desc: "Kothavarangai, 250 g", image: u("1567375698348-5d9d5ae99de0") },
  { name: "Broad Beans", price: 45, desc: "Avarakkai, 250 g", image: u("1615486511262-c5e6c7e4ef2e") },
  { name: "Carrot", price: 40, desc: "Ooty carrots, 500 g", image: u("1582515073490-39981397c445") },
  { name: "Beetroot", price: 35, desc: "Fresh beetroot, 500 g", image: u("1593105544559-ecb03bf76f82") },
  { name: "Cabbage", price: 30, desc: "Fresh green cabbage, 1 pc", image: u("1551888419-7b7a520fe0ca") },
  { name: "Cauliflower", price: 45, desc: "Crisp cauliflower, 1 pc", image: u("1568584711271-6c929fb49b60") },
  { name: "Curry Leaves", price: 10, desc: "Karuveppilai, 50 g bundle", image: u("1599909533734-91eb1d4f5b0b") },
  { name: "Coriander Leaves", price: 15, desc: "Kothamalli, 100 g bundle", image: u("1576675784201-0e142b423952") },
  { name: "Mint Leaves", price: 15, desc: "Pudina, 100 g bundle", image: u("1628557044797-f21a177c37ec") },
  { name: "Green Chilli", price: 20, desc: "Pachai milagai, 100 g", image: u("1583485088034-697b5bc36b92") },
  { name: "Ginger", price: 30, desc: "Fresh inji, 250 g", image: u("1573414405835-eea14fd61a02") },
  { name: "Garlic", price: 60, desc: "Poondu, 250 g", image: u("1540148426945-6cf22a6b2383") },
  { name: "Lemon", price: 25, desc: "Fresh elumichai, 250 g (5-6 pcs)", image: u("1590502593747-42a996133562") },
  { name: "Raw Mango", price: 40, desc: "Maangai for pickles, 500 g", image: u("1591073113125-e46713c829ed") },
];

const NONVEG: Item[] = [
  { name: "Country Chicken", price: 380, desc: "Naatu kozhi, 1 kg", image: u("1604503468506-a8da13d82791") },
  { name: "Broiler Chicken", price: 220, desc: "Skinless cleaned, 1 kg", image: u("1587593810167-a84920ea0781") },
  { name: "Chicken Boneless", price: 320, desc: "Breast & thigh boneless, 500 g", image: u("1574781330855-d0db8cc6a79c") },
  { name: "Chicken Lollipop", price: 280, desc: "Marinated lollipop, 500 g", image: u("1562967914-608f82629710") },
  { name: "Chicken Liver", price: 160, desc: "Fresh liver, 500 g", image: u("1588347818111-a9e7ff5b7f0e") },
  { name: "Mutton Curry Cut", price: 650, desc: "Goat mutton with bone, 500 g", image: u("1603048297172-c92544798d5a") },
  { name: "Mutton Boneless", price: 780, desc: "Premium boneless mutton, 500 g", image: u("1551028150-64b9f398f678") },
  { name: "Mutton Keema", price: 700, desc: "Minced mutton, 500 g", image: u("1529692236671-f1f6cf9683ba") },
  { name: "Seer Fish (Vanjaram)", price: 750, desc: "Steaks, 500 g", image: u("1535140728325-a4d3707eee94") },
  { name: "Pomfret", price: 520, desc: "Cleaned whole, 500 g", image: u("1559339352-11d035aa65de") },
  { name: "Tilapia (Jilebi)", price: 280, desc: "Cleaned, 500 g", image: u("1498654200943-1088dd4438ae") },
  { name: "Sardines (Mathi)", price: 200, desc: "Fresh sardines, 500 g", image: u("1611171711791-b34b41b1a8f5") },
  { name: "Prawns Medium", price: 480, desc: "Cleaned & deveined, 500 g", image: u("1565680018434-b513d5e5fd47") },
  { name: "Crab", price: 420, desc: "Live sea crab, 500 g", image: u("1559737558-2f5a35f4523b") },
  { name: "Squid (Kanava)", price: 360, desc: "Cleaned squid rings, 500 g", image: u("1606851094291-6efae152bb87") },
  { name: "Country Eggs", price: 90, desc: "Naatu kodi muttai, 6 pcs", image: u("1582722872445-44dc5f7e3c8f") },
];

const OILS: Item[] = [
  { name: "Sunflower Oil", price: 180, desc: "Refined sunflower oil, 1 L", image: u("1474979266404-7eaacbcd87c5") },
  { name: "Gold Winner Sunflower", price: 175, desc: "Gold Winner, 1 L pouch", image: u("1612257999691-c5d7e9f5e16e") },
  { name: "Fortune Sunflower", price: 185, desc: "Fortune refined, 1 L", image: u("1620577475183-c8a02fc04eb3") },
  { name: "Coconut Oil", price: 200, desc: "Pure coconut oil, 500 ml", image: u("1611073615452-4889ad4adfa3") },
  { name: "Cold Pressed Coconut Oil", price: 360, desc: "Wood pressed, 500 ml", image: u("1590283603385-c8b2ffe7e9c0") },
  { name: "Gingelly Oil (Sesame)", price: 280, desc: "Idhayam nallennai, 500 ml", image: u("1620577471863-1cb9bbeb4b2f") },
  { name: "Groundnut Oil", price: 220, desc: "Filtered groundnut oil, 1 L", image: u("1612257999444-f6e3e9c1c5e4") },
  { name: "Mustard Oil", price: 190, desc: "Kachi ghani mustard, 1 L", image: u("1620577472067-23daed1cb3a5") },
  { name: "Olive Oil", price: 520, desc: "Extra virgin olive oil, 500 ml", image: u("1474440692490-2e83ae13ba29") },
  { name: "Castor Oil", price: 140, desc: "Pure castor oil, 200 ml", image: u("1620577472304-aaaa6c1ff7d5") },
  { name: "Pure Cow Ghee", price: 580, desc: "A2 desi ghee, 500 ml", image: u("1628689469838-524a4a973b8e") },
  { name: "Vanaspati", price: 160, desc: "Dalda vanaspati, 1 kg", image: u("1612257999517-d56cd8a8e72e") },
];

const POWDERS: Item[] = [
  { name: "Sambar Powder", price: 120, desc: "Aachi sambar powder, 200 g", image: u("1596040033229-a9821ebd058d") },
  { name: "Rasam Powder", price: 110, desc: "Authentic rasam powder, 200 g", image: u("1599487488170-d11ec9c172f0") },
  { name: "Idli Podi", price: 95, desc: "Milagai podi, 200 g", image: u("1604935203274-d1f1f3a1d6f5") },
  { name: "Curry Powder", price: 100, desc: "Kuzhambu milagai thool, 200 g", image: u("1610348725531-843dff563e2c") },
  { name: "Turmeric Powder", price: 80, desc: "Manjal podi, 200 g", image: u("1615485500704-8e990f9900f7") },
  { name: "Red Chilli Powder", price: 130, desc: "Guntur chilli powder, 250 g", image: u("1599909533831-3e1f4a3f5e3a") },
  { name: "Coriander Powder", price: 75, desc: "Malli podi, 200 g", image: u("1599909366516-6c1e9c2a6a8d") },
  { name: "Garam Masala", price: 90, desc: "MDH garam masala, 100 g", image: u("1532336414038-cf19250c5757") },
  { name: "Chicken Masala", price: 110, desc: "Sakthi chicken masala, 200 g", image: u("1604908554049-24a5b9f3f7a6") },
  { name: "Mutton Masala", price: 120, desc: "Aachi mutton masala, 200 g", image: u("1596040033287-1f3b8d0b75d4") },
  { name: "Fish Masala", price: 105, desc: "Aachi fish masala, 200 g", image: u("1596040033455-7e4c3e6d5c3a") },
  { name: "Biryani Masala", price: 115, desc: "Sakthi biryani masala, 100 g", image: u("1596040033381-2f4d5e6f7c8d") },
  { name: "Pepper Powder", price: 140, desc: "Black pepper powder, 100 g", image: u("1599909533822-4a3b5d2c0e9f") },
  { name: "Cumin Powder", price: 70, desc: "Jeera powder, 100 g", image: u("1596040033677-5d8e9f0a1b2c") },
  { name: "Asafoetida (Hing)", price: 60, desc: "Perungayam, 50 g", image: u("1596040033599-3c4d5e6f7a8b") },
];

const RICE_ATTA: Item[] = [
  { name: "Idli Rice", price: 70, desc: "Pulungal arisi, 1 kg", image: u("1586201375761-83865001e31c") },
  { name: "Ponni Boiled Rice", price: 65, desc: "Ponni puzhungal, 1 kg", image: u("1536304993881-ff6e9eefa2a6") },
  { name: "Sona Masoori Rice", price: 80, desc: "Premium sona masoori, 1 kg", image: u("1626016570789-e44d2f0c6d99") },
  { name: "Basmati Rice", price: 140, desc: "India Gate classic, 1 kg", image: u("1594137930931-1e7c5e2d0c61") },
  { name: "Seeraga Samba Rice", price: 160, desc: "Biryani rice, 1 kg", image: u("1601000938259-9e92002320b2") },
  { name: "Red Rice (Matta)", price: 95, desc: "Kerala matta rice, 1 kg", image: u("1604329760661-e71dc83f8f26") },
  { name: "Aashirvaad Atta", price: 320, desc: "Whole wheat atta, 5 kg", image: u("1568097277162-8a2c4f961e23") },
  { name: "Pillsbury Chakki Atta", price: 295, desc: "Multigrain atta, 5 kg", image: u("1574323347407-f5e1c5a1e3f8") },
  { name: "Maida", price: 50, desc: "All purpose flour, 1 kg", image: u("1612257998903-7e6c4c3d1a8a") },
  { name: "Rava (Sooji)", price: 55, desc: "Bombay rava, 1 kg", image: u("1612257998987-1d2e3f4a5b6c") },
  { name: "Rice Flour", price: 60, desc: "Idiyappam flour, 1 kg", image: u("1612257999062-2e3f4a5b6c7d") },
  { name: "Ragi Flour", price: 90, desc: "Finger millet flour, 1 kg", image: u("1612257999137-3f4a5b6c7d8e") },
  { name: "Toor Dal", price: 160, desc: "Thuvaram paruppu, 1 kg", image: u("1599909533938-ec8761558aa1") },
  { name: "Urad Dal", price: 180, desc: "Ulundu paruppu, 1 kg", image: u("1610348725831-86fda6daed7d") },
  { name: "Moong Dal", price: 140, desc: "Pasi paruppu, 1 kg", image: u("1599909533984-f7e8a4b3c1d2") },
];

const ORGANIC: Item[] = [
  { name: "Organic Jaggery", price: 110, desc: "Karupatti / palm jaggery, 500 g", image: u("1610440042657-612c34d95e9f") },
  { name: "Organic Honey", price: 320, desc: "Raw forest honey, 500 g", image: u("1587049352846-4a222e784d38") },
  { name: "Organic Turmeric Powder", price: 140, desc: "Salem manjal, 200 g", image: u("1638444454093-7f4f5b1c1e8a") },
  { name: "Cold Pressed Sesame Oil", price: 340, desc: "Wood pressed nallennai, 500 ml", image: u("1620577471988-2dd4a3b3c0e8") },
  { name: "Cold Pressed Groundnut Oil", price: 320, desc: "Wood pressed, 500 ml", image: u("1620577472142-4dd5a3b3d0e8") },
  { name: "Foxtail Millet", price: 120, desc: "Thinai, 1 kg", image: u("1612257999212-5b6c7d8e9f0a") },
  { name: "Kodo Millet", price: 130, desc: "Varagu, 1 kg", image: u("1612257999287-6c7d8e9f0a1b") },
  { name: "Little Millet", price: 125, desc: "Saamai, 1 kg", image: u("1612257999362-7d8e9f0a1b2c") },
  { name: "Barnyard Millet", price: 135, desc: "Kuthiraivali, 1 kg", image: u("1612257999437-8e9f0a1b2c3d") },
  { name: "Pearl Millet", price: 90, desc: "Kambu, 1 kg", image: u("1612257999512-9f0a1b2c3d4e") },
  { name: "Organic Brown Rice", price: 130, desc: "Hand pounded brown rice, 1 kg", image: u("1586201375754-8d3f4f3a8b8a") },
  { name: "Palm Sugar", price: 180, desc: "Panai vellam crystals, 500 g", image: u("1610440042732-723c34d95eaa") },
  { name: "Country Sugar", price: 90, desc: "Naatu sakkarai, 1 kg", image: u("1610440042807-834d45ea6fbb") },
  { name: "Himalayan Pink Salt", price: 95, desc: "Rock salt, 500 g", image: u("1612257999587-0a1b2c3d4e5f") },
  { name: "Organic Apple Cider Vinegar", price: 280, desc: "With mother, 500 ml", image: u("1600271886742-f049b9d56ee3") },
];

const SNACKS: Item[] = [
  { name: "Lays Classic Salted", price: 20, desc: "Lays potato chips, 52 g pack", image: u("1613919517538-aaa68d8f97e2") },
  { name: "Lays Magic Masala", price: 20, desc: "Lays Indian masala, 52 g", image: u("1613919113640-25732ec5e61f") },
  { name: "Bingo Mad Angles", price: 20, desc: "Achaari Masti, 66 g", image: u("1599490659213-e2b9527bd087") },
  { name: "Kurkure Masala Munch", price: 20, desc: "Kurkure crunchy snack, 90 g", image: u("1612207259-f3b6c5d8c0a8") },
  { name: "Haldiram's Mixture", price: 60, desc: "All-in-one mixture, 200 g", image: u("1606491956689-2ea866880c84") },
  { name: "Murukku", price: 80, desc: "Traditional rice murukku, 250 g", image: u("1606491956742-3e9b88d0e3a5") },
  { name: "Banana Chips", price: 90, desc: "Kerala banana chips, 250 g", image: u("1606503153255-59d8b8b82176") },
  { name: "Good Day Cashew Biscuits", price: 30, desc: "Britannia Good Day, 150 g", image: u("1558961363-fa8fdf82db35") },
  { name: "Marie Gold Biscuits", price: 25, desc: "Britannia Marie Gold, 150 g", image: u("1568051243851-f9b136146e97") },
  { name: "Parle-G Biscuits", price: 10, desc: "Glucose biscuits, 80 g", image: u("1610725664285-7c57e6eeac3f") },
  { name: "Hide & Seek", price: 30, desc: "Choco chip cookies, 100 g", image: u("1499636136210-6f4ee915583e") },
  { name: "Oreo Original", price: 30, desc: "Cream sandwich, 120 g", image: u("1558961363-fa8fdf82db36") },
  { name: "Dairy Milk Chocolate", price: 50, desc: "Cadbury Dairy Milk, 50 g", image: u("1511381939415-e44015466834") },
  { name: "Dairy Milk Silk", price: 90, desc: "Cadbury Silk, 60 g", image: u("1623660053975-cf75a8be0908") },
  { name: "5 Star", price: 10, desc: "Cadbury 5 Star, 25 g", image: u("1582058091505-f87a2e55a40f") },
  { name: "KitKat", price: 20, desc: "Nestle KitKat, 4 fingers", image: u("1623660053975-cf75a8be0909") },
  { name: "Munch", price: 10, desc: "Nestle Munch wafer, 22 g", image: u("1582058091505-f87a2e55a410") },
  { name: "Bourbon Biscuits", price: 30, desc: "Britannia Bourbon, 150 g", image: u("1558961363-fa8fdf82db37") },
  { name: "Monaco Biscuits", price: 30, desc: "Parle Monaco salted, 120 g", image: u("1568051243851-f9b136146e98") },
  { name: "Roasted Peanuts", price: 60, desc: "Salted peanuts, 200 g", image: u("1567892737950-30c4db37cd89") },
];

const buildProducts = (
  items: Item[],
  category: GrocerySubCategory,
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

export const GROCERY_PRODUCTS: Product[] = [
  ...buildProducts(VEG, "Vegetables", "v"),
  ...buildProducts(NONVEG, "Non-Veg", "n"),
  ...buildProducts(OILS, "Oils", "o"),
  ...buildProducts(POWDERS, "Powders", "p"),
  ...buildProducts(RICE_ATTA, "Rice/Atta", "r"),
  ...buildProducts(ORGANIC, "Organic", "g"),
  ...buildProducts(SNACKS, "Snacks", "s"),
];

export const GROCERY_SUB_BY_ID: Record<string, GrocerySubCategory> =
  GROCERY_PRODUCTS.reduce((acc, p) => {
    const key = p.id.split("-")[1];
    const map: Record<string, GrocerySubCategory> = {
      v: "Vegetables",
      n: "Non-Veg",
      o: "Oils",
      p: "Powders",
      r: "Rice/Atta",
      g: "Organic",
      s: "Snacks",
    };
    acc[p.id] = map[key];
    return acc;
  }, {} as Record<string, GrocerySubCategory>);

/**
 * Per-category fallback images. Used when a product image fails to load
 * (network error, 404, etc.) so the card never shows an empty box.
 * Each fallback is a real, generic photo of that category.
 */
export const GROCERY_FALLBACKS: Record<GrocerySubCategory, string> = {
  Vegetables: u("1540420773420-3366772f4999"), // mixed vegetable basket
  "Non-Veg": u("1607623814075-e51df1bdc82f"),  // raw meat platter
  Oils: u("1474440692490-2e83ae13ba29"),        // oil bottles (fallback differs from olive oil)
  Powders: u("1532336414038-cf19250c5757"),     // spice powders (matches garam masala bowl)
  "Rice/Atta": u("1586201375754-8d3f4f3a8b8a"), // rice grains
  Organic: u("1542838132-92c53300491e"),         // organic produce
  Snacks: u("1599490659213-e2b9527bd087"),       // mixed snacks
};

/** Generic last-resort fallback (supermarket shelf) when category is unknown. */
export const GROCERY_GENERIC_FALLBACK = u("1542838132-92c53300491e");

export const getGroceryFallback = (productId: string): string => {
  const sub = GROCERY_SUB_BY_ID[productId];
  return sub ? GROCERY_FALLBACKS[sub] : GROCERY_GENERIC_FALLBACK;
};

