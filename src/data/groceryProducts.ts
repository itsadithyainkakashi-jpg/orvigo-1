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

export const GROCERY_SUBS: { label: GrocerySubCategory; image: string }[] = [
  { label: "Vegetables", image: imgVeg },
  { label: "Non-Veg", image: imgNonveg },
  { label: "Oils", image: imgOils },
  { label: "Powders", image: imgPowders },
  { label: "Rice/Atta", image: imgRice },
  { label: "Organic", image: imgOrganic },
  { label: "Snacks", image: imgPowders },
];

type Item = { name: string; price: number; desc: string; image: string };

/**
 * Image strategy: name-matched real photos.
 * - Loremflickr fetches actual Flickr photos matching the keyword tags.
 * - Each product gets a unique seed so images don't repeat.
 * - Tags are crafted to closely match the product (no AI, no placeholders).
 */
const img = (tags: string, seed: number) =>
  `https://loremflickr.com/400/400/${encodeURIComponent(tags)}?lock=${seed}`;

const VEG: Item[] = [
  { name: "Tomato", price: 30, desc: "Fresh ripe tomatoes, 1 kg", image: img("tomato,vegetable", 101) },
  { name: "Onion (Big)", price: 40, desc: "Bellary onions, 1 kg", image: img("onion,red", 102) },
  { name: "Small Onion (Sambar)", price: 90, desc: "Shallots / chinna vengayam, 500 g", image: img("shallots,onion", 103) },
  { name: "Potato", price: 35, desc: "Farm fresh potatoes, 1 kg", image: img("potato,vegetable", 104) },
  { name: "Drumstick", price: 60, desc: "Murungakkai, 250 g (4-5 pcs)", image: img("drumstick,moringa", 105) },
  { name: "Brinjal (Purple)", price: 45, desc: "Tender purple brinjal, 500 g", image: img("brinjal,eggplant", 106) },
  { name: "Ladies Finger", price: 40, desc: "Fresh okra / vendakkai, 500 g", image: img("okra,vegetable", 107) },
  { name: "Snake Gourd", price: 35, desc: "Pudalangai, 500 g", image: img("snake,gourd", 108) },
  { name: "Bottle Gourd", price: 30, desc: "Sorakkai, 1 pc (~700 g)", image: img("bottle,gourd", 109) },
  { name: "Ridge Gourd", price: 35, desc: "Peerkangai, 500 g", image: img("ridge,gourd", 110) },
  { name: "Ash Gourd", price: 40, desc: "Pusanikkai, 1 kg", image: img("ash,gourd,white", 111) },
  { name: "Raw Banana", price: 25, desc: "Vazhaikkai, 500 g", image: img("raw,banana,green", 112) },
  { name: "Banana Stem", price: 30, desc: "Vazhaithandu, 1 pc", image: img("banana,stem", 113) },
  { name: "Banana Flower", price: 35, desc: "Vazhaipoo, 1 pc", image: img("banana,flower", 114) },
  { name: "Cluster Beans", price: 50, desc: "Kothavarangai, 250 g", image: img("cluster,beans", 115) },
  { name: "Broad Beans", price: 45, desc: "Avarakkai, 250 g", image: img("broad,beans", 116) },
  { name: "Carrot", price: 40, desc: "Ooty carrots, 500 g", image: img("carrot,vegetable", 117) },
  { name: "Beetroot", price: 35, desc: "Fresh beetroot, 500 g", image: img("beetroot,vegetable", 118) },
  { name: "Cabbage", price: 30, desc: "Fresh green cabbage, 1 pc", image: img("cabbage,vegetable", 119) },
  { name: "Cauliflower", price: 45, desc: "Crisp cauliflower, 1 pc", image: img("cauliflower,vegetable", 120) },
  { name: "Curry Leaves", price: 10, desc: "Karuveppilai, 50 g bundle", image: img("curry,leaves", 121) },
  { name: "Coriander Leaves", price: 15, desc: "Kothamalli, 100 g bundle", image: img("coriander,cilantro", 122) },
  { name: "Mint Leaves", price: 15, desc: "Pudina, 100 g bundle", image: img("mint,leaves", 123) },
  { name: "Green Chilli", price: 20, desc: "Pachai milagai, 100 g", image: img("green,chilli", 124) },
  { name: "Ginger", price: 30, desc: "Fresh inji, 250 g", image: img("ginger,root", 125) },
  { name: "Garlic", price: 60, desc: "Poondu, 250 g", image: img("garlic,bulb", 126) },
  { name: "Lemon", price: 25, desc: "Fresh elumichai, 250 g (5-6 pcs)", image: img("lemon,citrus", 127) },
  { name: "Raw Mango", price: 40, desc: "Maangai for pickles, 500 g", image: img("raw,mango,green", 128) },
];

const NONVEG: Item[] = [
  { name: "Country Chicken", price: 380, desc: "Naatu kozhi, 1 kg", image: img("chicken,raw,meat", 201) },
  { name: "Broiler Chicken", price: 220, desc: "Skinless cleaned, 1 kg", image: img("chicken,broiler", 202) },
  { name: "Chicken Boneless", price: 320, desc: "Breast & thigh boneless, 500 g", image: img("chicken,breast,raw", 203) },
  { name: "Chicken Lollipop", price: 280, desc: "Marinated lollipop, 500 g", image: img("chicken,lollipop", 204) },
  { name: "Chicken Liver", price: 160, desc: "Fresh liver, 500 g", image: img("chicken,liver", 205) },
  { name: "Mutton Curry Cut", price: 650, desc: "Goat mutton with bone, 500 g", image: img("mutton,raw,meat", 206) },
  { name: "Mutton Boneless", price: 780, desc: "Premium boneless mutton, 500 g", image: img("mutton,boneless", 207) },
  { name: "Mutton Keema", price: 700, desc: "Minced mutton, 500 g", image: img("minced,meat,keema", 208) },
  { name: "Seer Fish (Vanjaram)", price: 750, desc: "Steaks, 500 g", image: img("seer,fish,steak", 209) },
  { name: "Pomfret", price: 520, desc: "Cleaned whole, 500 g", image: img("pomfret,fish", 210) },
  { name: "Tilapia (Jilebi)", price: 280, desc: "Cleaned, 500 g", image: img("tilapia,fish", 211) },
  { name: "Sardines (Mathi)", price: 200, desc: "Fresh sardines, 500 g", image: img("sardines,fish", 212) },
  { name: "Prawns Medium", price: 480, desc: "Cleaned & deveined, 500 g", image: img("prawns,shrimp", 213) },
  { name: "Crab", price: 420, desc: "Live sea crab, 500 g", image: img("crab,seafood", 214) },
  { name: "Squid (Kanava)", price: 360, desc: "Cleaned squid rings, 500 g", image: img("squid,calamari", 215) },
  { name: "Country Eggs", price: 90, desc: "Naatu kodi muttai, 6 pcs", image: img("eggs,brown", 216) },
];

const OILS: Item[] = [
  { name: "Sunflower Oil", price: 180, desc: "Refined sunflower oil, 1 L", image: img("sunflower,oil,bottle", 301) },
  { name: "Gold Winner Sunflower", price: 175, desc: "Gold Winner, 1 L pouch", image: img("cooking,oil,pouch", 302) },
  { name: "Fortune Sunflower", price: 185, desc: "Fortune refined, 1 L", image: img("refined,oil,bottle", 303) },
  { name: "Coconut Oil", price: 200, desc: "Pure coconut oil, 500 ml", image: img("coconut,oil,bottle", 304) },
  { name: "Cold Pressed Coconut Oil", price: 360, desc: "Wood pressed, 500 ml", image: img("coconut,oil,jar", 305) },
  { name: "Gingelly Oil (Sesame)", price: 280, desc: "Idhayam nallennai, 500 ml", image: img("sesame,oil,bottle", 306) },
  { name: "Groundnut Oil", price: 220, desc: "Filtered groundnut oil, 1 L", image: img("groundnut,peanut,oil", 307) },
  { name: "Mustard Oil", price: 190, desc: "Kachi ghani mustard, 1 L", image: img("mustard,oil,bottle", 308) },
  { name: "Olive Oil", price: 520, desc: "Extra virgin olive oil, 500 ml", image: img("olive,oil,bottle", 309) },
  { name: "Castor Oil", price: 140, desc: "Pure castor oil, 200 ml", image: img("castor,oil", 310) },
  { name: "Pure Cow Ghee", price: 580, desc: "A2 desi ghee, 500 ml", image: img("ghee,jar,clarified", 311) },
  { name: "Vanaspati", price: 160, desc: "Dalda vanaspati, 1 kg", image: img("vanaspati,dalda", 312) },
];

const POWDERS: Item[] = [
  { name: "Sambar Powder", price: 120, desc: "Aachi sambar powder, 200 g", image: img("sambar,powder,spice", 401) },
  { name: "Rasam Powder", price: 110, desc: "Authentic rasam powder, 200 g", image: img("rasam,powder", 402) },
  { name: "Idli Podi", price: 95, desc: "Milagai podi, 200 g", image: img("idli,podi,chutney", 403) },
  { name: "Curry Powder", price: 100, desc: "Kuzhambu milagai thool, 200 g", image: img("curry,powder", 404) },
  { name: "Turmeric Powder", price: 80, desc: "Manjal podi, 200 g", image: img("turmeric,powder,yellow", 405) },
  { name: "Red Chilli Powder", price: 130, desc: "Guntur chilli powder, 250 g", image: img("chilli,powder,red", 406) },
  { name: "Coriander Powder", price: 75, desc: "Malli podi, 200 g", image: img("coriander,powder", 407) },
  { name: "Garam Masala", price: 90, desc: "MDH garam masala, 100 g", image: img("garam,masala,spice", 408) },
  { name: "Chicken Masala", price: 110, desc: "Sakthi chicken masala, 200 g", image: img("chicken,masala,spice", 409) },
  { name: "Mutton Masala", price: 120, desc: "Aachi mutton masala, 200 g", image: img("mutton,masala,spice", 410) },
  { name: "Fish Masala", price: 105, desc: "Aachi fish masala, 200 g", image: img("fish,masala,spice", 411) },
  { name: "Biryani Masala", price: 115, desc: "Sakthi biryani masala, 100 g", image: img("biryani,masala", 412) },
  { name: "Pepper Powder", price: 140, desc: "Black pepper powder, 100 g", image: img("black,pepper,powder", 413) },
  { name: "Cumin Powder", price: 70, desc: "Jeera powder, 100 g", image: img("cumin,jeera,powder", 414) },
  { name: "Asafoetida (Hing)", price: 60, desc: "Perungayam, 50 g", image: img("asafoetida,hing", 415) },
];

const RICE_ATTA: Item[] = [
  { name: "Idli Rice", price: 70, desc: "Pulungal arisi, 1 kg", image: img("idli,rice,grain", 501) },
  { name: "Ponni Boiled Rice", price: 65, desc: "Ponni puzhungal, 1 kg", image: img("boiled,rice,grain", 502) },
  { name: "Sona Masoori Rice", price: 80, desc: "Premium sona masoori, 1 kg", image: img("sona,masoori,rice", 503) },
  { name: "Basmati Rice", price: 140, desc: "India Gate classic, 1 kg", image: img("basmati,rice,long", 504) },
  { name: "Seeraga Samba Rice", price: 160, desc: "Biryani rice, 1 kg", image: img("seeraga,samba,rice", 505) },
  { name: "Red Rice (Matta)", price: 95, desc: "Kerala matta rice, 1 kg", image: img("red,rice,matta", 506) },
  { name: "Aashirvaad Atta", price: 320, desc: "Whole wheat atta, 5 kg", image: img("wheat,atta,flour", 507) },
  { name: "Pillsbury Chakki Atta", price: 295, desc: "Multigrain atta, 5 kg", image: img("multigrain,atta,flour", 508) },
  { name: "Maida", price: 50, desc: "All purpose flour, 1 kg", image: img("maida,white,flour", 509) },
  { name: "Rava (Sooji)", price: 55, desc: "Bombay rava, 1 kg", image: img("rava,sooji,semolina", 510) },
  { name: "Rice Flour", price: 60, desc: "Idiyappam flour, 1 kg", image: img("rice,flour,white", 511) },
  { name: "Ragi Flour", price: 90, desc: "Finger millet flour, 1 kg", image: img("ragi,flour,millet", 512) },
  { name: "Toor Dal", price: 160, desc: "Thuvaram paruppu, 1 kg", image: img("toor,dal,lentil", 513) },
  { name: "Urad Dal", price: 180, desc: "Ulundu paruppu, 1 kg", image: img("urad,dal,lentil", 514) },
  { name: "Moong Dal", price: 140, desc: "Pasi paruppu, 1 kg", image: img("moong,dal,yellow", 515) },
];

const ORGANIC: Item[] = [
  { name: "Organic Jaggery", price: 110, desc: "Karupatti / palm jaggery, 500 g", image: img("jaggery,palm,sugar", 601) },
  { name: "Organic Honey", price: 320, desc: "Raw forest honey, 500 g", image: img("honey,jar,raw", 602) },
  { name: "Organic Turmeric Powder", price: 140, desc: "Salem manjal, 200 g", image: img("organic,turmeric", 603) },
  { name: "Cold Pressed Sesame Oil", price: 340, desc: "Wood pressed nallennai, 500 ml", image: img("sesame,oil,wood,pressed", 604) },
  { name: "Cold Pressed Groundnut Oil", price: 320, desc: "Wood pressed, 500 ml", image: img("groundnut,oil,cold,pressed", 605) },
  { name: "Foxtail Millet", price: 120, desc: "Thinai, 1 kg", image: img("foxtail,millet,grain", 606) },
  { name: "Kodo Millet", price: 130, desc: "Varagu, 1 kg", image: img("kodo,millet,grain", 607) },
  { name: "Little Millet", price: 125, desc: "Saamai, 1 kg", image: img("little,millet,grain", 608) },
  { name: "Barnyard Millet", price: 135, desc: "Kuthiraivali, 1 kg", image: img("barnyard,millet", 609) },
  { name: "Pearl Millet", price: 90, desc: "Kambu, 1 kg", image: img("pearl,millet,bajra", 610) },
  { name: "Organic Brown Rice", price: 130, desc: "Hand pounded brown rice, 1 kg", image: img("brown,rice,grain", 611) },
  { name: "Palm Sugar", price: 180, desc: "Panai vellam crystals, 500 g", image: img("palm,sugar,crystal", 612) },
  { name: "Country Sugar", price: 90, desc: "Naatu sakkarai, 1 kg", image: img("raw,sugar,brown", 613) },
  { name: "Himalayan Pink Salt", price: 95, desc: "Rock salt, 500 g", image: img("himalayan,pink,salt", 614) },
  { name: "Organic Apple Cider Vinegar", price: 280, desc: "With mother, 500 ml", image: img("apple,cider,vinegar", 615) },
];

const SNACKS: Item[] = [
  { name: "Lays Classic Salted", price: 20, desc: "Lays potato chips, 52 g pack", image: img("potato,chips,packet", 701) },
  { name: "Lays Magic Masala", price: 20, desc: "Lays Indian masala, 52 g", image: img("masala,chips,packet", 702) },
  { name: "Bingo Mad Angles", price: 20, desc: "Achaari Masti, 66 g", image: img("triangle,chips,snack", 703) },
  { name: "Kurkure Masala Munch", price: 20, desc: "Kurkure crunchy snack, 90 g", image: img("kurkure,crunchy,snack", 704) },
  { name: "Haldiram's Mixture", price: 60, desc: "All-in-one mixture, 200 g", image: img("indian,mixture,namkeen", 705) },
  { name: "Murukku", price: 80, desc: "Traditional rice murukku, 250 g", image: img("murukku,chakli", 706) },
  { name: "Banana Chips", price: 90, desc: "Kerala banana chips, 250 g", image: img("banana,chips,fried", 707) },
  { name: "Good Day Cashew Biscuits", price: 30, desc: "Britannia Good Day, 150 g", image: img("cashew,biscuits", 708) },
  { name: "Marie Gold Biscuits", price: 25, desc: "Britannia Marie Gold, 150 g", image: img("marie,biscuits", 709) },
  { name: "Parle-G Biscuits", price: 10, desc: "Glucose biscuits, 80 g", image: img("glucose,biscuits", 710) },
  { name: "Hide & Seek", price: 30, desc: "Choco chip cookies, 100 g", image: img("chocolate,chip,cookies", 711) },
  { name: "Oreo Original", price: 30, desc: "Cream sandwich, 120 g", image: img("oreo,sandwich,cookies", 712) },
  { name: "Dairy Milk Chocolate", price: 50, desc: "Cadbury Dairy Milk, 50 g", image: img("dairy,milk,chocolate,bar", 713) },
  { name: "Dairy Milk Silk", price: 90, desc: "Cadbury Silk, 60 g", image: img("silk,chocolate,bar", 714) },
  { name: "5 Star", price: 10, desc: "Cadbury 5 Star, 25 g", image: img("caramel,chocolate,bar", 715) },
  { name: "KitKat", price: 20, desc: "Nestle KitKat, 4 fingers", image: img("kitkat,wafer,chocolate", 716) },
  { name: "Munch", price: 10, desc: "Nestle Munch wafer, 22 g", image: img("wafer,chocolate,bar", 717) },
  { name: "Bourbon Biscuits", price: 30, desc: "Britannia Bourbon, 150 g", image: img("bourbon,chocolate,biscuits", 718) },
  { name: "Monaco Biscuits", price: 30, desc: "Parle Monaco salted, 120 g", image: img("salted,cracker,biscuits", 719) },
  { name: "Roasted Peanuts", price: 60, desc: "Salted peanuts, 200 g", image: img("roasted,peanuts", 720) },
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
