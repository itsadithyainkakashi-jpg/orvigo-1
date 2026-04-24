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
  | "Organic";

export const GROCERY_SUBS: { label: GrocerySubCategory; image: string }[] = [
  { label: "Vegetables", image: imgVeg },
  { label: "Non-Veg", image: imgNonveg },
  { label: "Oils", image: imgOils },
  { label: "Powders", image: imgPowders },
  { label: "Rice/Atta", image: imgRice },
  { label: "Organic", image: imgOrganic },
];

type Item = { name: string; price: number; desc: string };

const VEG: Item[] = [
  { name: "Tomato", price: 30, desc: "Fresh ripe tomatoes, 1 kg" },
  { name: "Onion (Big)", price: 40, desc: "Bellary onions, 1 kg" },
  { name: "Small Onion (Sambar)", price: 90, desc: "Shallots / chinna vengayam, 500 g" },
  { name: "Potato", price: 35, desc: "Farm fresh potatoes, 1 kg" },
  { name: "Drumstick", price: 60, desc: "Murungakkai, 250 g (4-5 pcs)" },
  { name: "Brinjal (Purple)", price: 45, desc: "Tender purple brinjal, 500 g" },
  { name: "Ladies Finger", price: 40, desc: "Fresh okra / vendakkai, 500 g" },
  { name: "Snake Gourd", price: 35, desc: "Pudalangai, 500 g" },
  { name: "Bottle Gourd", price: 30, desc: "Sorakkai, 1 pc (~700 g)" },
  { name: "Ridge Gourd", price: 35, desc: "Peerkangai, 500 g" },
  { name: "Ash Gourd", price: 40, desc: "Pusanikkai, 1 kg" },
  { name: "Raw Banana", price: 25, desc: "Vazhaikkai, 500 g" },
  { name: "Banana Stem", price: 30, desc: "Vazhaithandu, 1 pc" },
  { name: "Banana Flower", price: 35, desc: "Vazhaipoo, 1 pc" },
  { name: "Cluster Beans", price: 50, desc: "Kothavarangai, 250 g" },
  { name: "Broad Beans", price: 45, desc: "Avarakkai, 250 g" },
  { name: "Carrot", price: 40, desc: "Ooty carrots, 500 g" },
  { name: "Beetroot", price: 35, desc: "Fresh beetroot, 500 g" },
  { name: "Cabbage", price: 30, desc: "Fresh green cabbage, 1 pc" },
  { name: "Cauliflower", price: 45, desc: "Crisp cauliflower, 1 pc" },
  { name: "Curry Leaves", price: 10, desc: "Karuveppilai, 50 g bundle" },
  { name: "Coriander Leaves", price: 15, desc: "Kothamalli, 100 g bundle" },
  { name: "Mint Leaves", price: 15, desc: "Pudina, 100 g bundle" },
  { name: "Green Chilli", price: 20, desc: "Pachai milagai, 100 g" },
  { name: "Ginger", price: 30, desc: "Fresh inji, 250 g" },
  { name: "Garlic", price: 60, desc: "Poondu, 250 g" },
  { name: "Lemon", price: 25, desc: "Fresh elumichai, 250 g (5-6 pcs)" },
  { name: "Raw Mango", price: 40, desc: "Maangai for pickles, 500 g" },
];

const NONVEG: Item[] = [
  { name: "Country Chicken", price: 380, desc: "Naatu kozhi, 1 kg" },
  { name: "Broiler Chicken", price: 220, desc: "Skinless cleaned, 1 kg" },
  { name: "Chicken Boneless", price: 320, desc: "Breast & thigh boneless, 500 g" },
  { name: "Chicken Lollipop", price: 280, desc: "Marinated lollipop, 500 g" },
  { name: "Chicken Liver", price: 160, desc: "Fresh liver, 500 g" },
  { name: "Mutton Curry Cut", price: 650, desc: "Goat mutton with bone, 500 g" },
  { name: "Mutton Boneless", price: 780, desc: "Premium boneless mutton, 500 g" },
  { name: "Mutton Keema", price: 700, desc: "Minced mutton, 500 g" },
  { name: "Seer Fish (Vanjaram)", price: 750, desc: "Steaks, 500 g" },
  { name: "Pomfret", price: 520, desc: "Cleaned whole, 500 g" },
  { name: "Tilapia (Jilebi)", price: 280, desc: "Cleaned, 500 g" },
  { name: "Sardines (Mathi)", price: 200, desc: "Fresh sardines, 500 g" },
  { name: "Prawns Medium", price: 480, desc: "Cleaned & deveined, 500 g" },
  { name: "Crab", price: 420, desc: "Live sea crab, 500 g" },
  { name: "Squid (Kanava)", price: 360, desc: "Cleaned squid rings, 500 g" },
  { name: "Country Eggs", price: 90, desc: "Naatu kodi muttai, 6 pcs" },
];

const OILS: Item[] = [
  { name: "Sunflower Oil", price: 180, desc: "Refined sunflower oil, 1 L" },
  { name: "Gold Winner Sunflower", price: 175, desc: "Gold Winner, 1 L pouch" },
  { name: "Fortune Sunflower", price: 185, desc: "Fortune refined, 1 L" },
  { name: "Coconut Oil", price: 200, desc: "Pure coconut oil, 500 ml" },
  { name: "Cold Pressed Coconut Oil", price: 360, desc: "Wood pressed, 500 ml" },
  { name: "Gingelly Oil (Sesame)", price: 280, desc: "Idhayam nallennai, 500 ml" },
  { name: "Groundnut Oil", price: 220, desc: "Filtered groundnut oil, 1 L" },
  { name: "Mustard Oil", price: 190, desc: "Kachi ghani mustard, 1 L" },
  { name: "Olive Oil", price: 520, desc: "Extra virgin olive oil, 500 ml" },
  { name: "Castor Oil", price: 140, desc: "Pure castor oil, 200 ml" },
  { name: "Pure Cow Ghee", price: 580, desc: "A2 desi ghee, 500 ml" },
  { name: "Vanaspati", price: 160, desc: "Dalda vanaspati, 1 kg" },
];

const POWDERS: Item[] = [
  { name: "Sambar Powder", price: 120, desc: "Aachi sambar powder, 200 g" },
  { name: "Rasam Powder", price: 110, desc: "Authentic rasam powder, 200 g" },
  { name: "Idli Podi", price: 95, desc: "Milagai podi, 200 g" },
  { name: "Curry Powder", price: 100, desc: "Kuzhambu milagai thool, 200 g" },
  { name: "Turmeric Powder", price: 80, desc: "Manjal podi, 200 g" },
  { name: "Red Chilli Powder", price: 130, desc: "Guntur chilli powder, 250 g" },
  { name: "Coriander Powder", price: 75, desc: "Malli podi, 200 g" },
  { name: "Garam Masala", price: 90, desc: "MDH garam masala, 100 g" },
  { name: "Chicken Masala", price: 110, desc: "Sakthi chicken masala, 200 g" },
  { name: "Mutton Masala", price: 120, desc: "Aachi mutton masala, 200 g" },
  { name: "Fish Masala", price: 105, desc: "Aachi fish masala, 200 g" },
  { name: "Biryani Masala", price: 115, desc: "Sakthi biryani masala, 100 g" },
  { name: "Pepper Powder", price: 140, desc: "Black pepper powder, 100 g" },
  { name: "Cumin Powder", price: 70, desc: "Jeera powder, 100 g" },
  { name: "Asafoetida (Hing)", price: 60, desc: "Perungayam, 50 g" },
];

const RICE_ATTA: Item[] = [
  { name: "Idli Rice", price: 70, desc: "Pulungal arisi, 1 kg" },
  { name: "Ponni Boiled Rice", price: 65, desc: "Ponni puzhungal, 1 kg" },
  { name: "Sona Masoori Rice", price: 80, desc: "Premium sona masoori, 1 kg" },
  { name: "Basmati Rice", price: 140, desc: "India Gate classic, 1 kg" },
  { name: "Seeraga Samba Rice", price: 160, desc: "Biryani rice, 1 kg" },
  { name: "Red Rice (Matta)", price: 95, desc: "Kerala matta rice, 1 kg" },
  { name: "Aashirvaad Atta", price: 320, desc: "Whole wheat atta, 5 kg" },
  { name: "Pillsbury Chakki Atta", price: 295, desc: "Multigrain atta, 5 kg" },
  { name: "Maida", price: 50, desc: "All purpose flour, 1 kg" },
  { name: "Rava (Sooji)", price: 55, desc: "Bombay rava, 1 kg" },
  { name: "Rice Flour", price: 60, desc: "Idiyappam flour, 1 kg" },
  { name: "Ragi Flour", price: 90, desc: "Finger millet flour, 1 kg" },
  { name: "Toor Dal", price: 160, desc: "Thuvaram paruppu, 1 kg" },
  { name: "Urad Dal", price: 180, desc: "Ulundu paruppu, 1 kg" },
  { name: "Moong Dal", price: 140, desc: "Pasi paruppu, 1 kg" },
];

const ORGANIC: Item[] = [
  { name: "Organic Jaggery", price: 110, desc: "Karupatti / palm jaggery, 500 g" },
  { name: "Organic Honey", price: 320, desc: "Raw forest honey, 500 g" },
  { name: "Organic Turmeric Powder", price: 140, desc: "Salem manjal, 200 g" },
  { name: "Cold Pressed Sesame Oil", price: 340, desc: "Wood pressed nallennai, 500 ml" },
  { name: "Cold Pressed Groundnut Oil", price: 320, desc: "Wood pressed, 500 ml" },
  { name: "Foxtail Millet", price: 120, desc: "Thinai, 1 kg" },
  { name: "Kodo Millet", price: 130, desc: "Varagu, 1 kg" },
  { name: "Little Millet", price: 125, desc: "Saamai, 1 kg" },
  { name: "Barnyard Millet", price: 135, desc: "Kuthiraivali, 1 kg" },
  { name: "Pearl Millet", price: 90, desc: "Kambu, 1 kg" },
  { name: "Organic Brown Rice", price: 130, desc: "Hand pounded brown rice, 1 kg" },
  { name: "Palm Sugar", price: 180, desc: "Panai vellam crystals, 500 g" },
  { name: "Country Sugar", price: 90, desc: "Naatu sakkarai, 1 kg" },
  { name: "Himalayan Pink Salt", price: 95, desc: "Rock salt, 500 g" },
  { name: "Organic Apple Cider Vinegar", price: 280, desc: "With mother, 500 ml" },
];

const buildProducts = (
  items: Item[],
  category: GrocerySubCategory,
  image: string,
  prefix: string
): Product[] =>
  items.map((it, idx) => ({
    id: `gr-${prefix}-${idx + 1}`,
    name: it.name,
    price: it.price,
    image,
    rating: 4.0 + ((idx % 9) * 0.1),
    category: "Grocery",
    description: it.desc,
    // store sub-category in description-tag via sizes hack would be wrong.
    // We piggy-back on `sizes` being optional and instead expose a parallel map.
  }));

export const GROCERY_PRODUCTS: Product[] = [
  ...buildProducts(VEG, "Vegetables", imgVeg, "v"),
  ...buildProducts(NONVEG, "Non-Veg", imgNonveg, "n"),
  ...buildProducts(OILS, "Oils", imgOils, "o"),
  ...buildProducts(POWDERS, "Powders", imgPowders, "p"),
  ...buildProducts(RICE_ATTA, "Rice/Atta", imgRice, "r"),
  ...buildProducts(ORGANIC, "Organic", imgOrganic, "g"),
];

// Sub-category map by id for fast filtering (avoids mutating Product type)
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
    };
    acc[p.id] = map[key];
    return acc;
  }, {} as Record<string, GrocerySubCategory>);
