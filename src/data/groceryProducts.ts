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

// Category tile images (existing local assets, used only for the top scroller)
export const GROCERY_SUBS: { label: GrocerySubCategory; image: string }[] = [
  { label: "Vegetables", image: imgVeg },
  { label: "Non-Veg", image: imgNonveg },
  { label: "Oils", image: imgOils },
  { label: "Powders", image: imgPowders },
  { label: "Rice/Atta", image: imgRice },
  { label: "Organic", image: imgOrganic },
  // Snacks reuses powders banner only as a category chip (new local asset not added to keep change scoped)
  { label: "Snacks", image: imgPowders },
];

type Item = { name: string; price: number; desc: string; image: string };

// Real product photos from Unsplash CDN (single-product, clean background where possible).
// Each URL is unique per product. Sized for fast mobile loading.
const u = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&q=70`;

const VEG: Item[] = [
  { name: "Tomato", price: 30, desc: "Fresh ripe tomatoes, 1 kg", image: u("photo-1546470427-e26264be0b0d") },
  { name: "Onion (Big)", price: 40, desc: "Bellary onions, 1 kg", image: u("photo-1518977956812-cd3dbadaaf31") },
  { name: "Small Onion (Sambar)", price: 90, desc: "Shallots / chinna vengayam, 500 g", image: u("photo-1620574387735-3624d75b2dbc") },
  { name: "Potato", price: 35, desc: "Farm fresh potatoes, 1 kg", image: u("photo-1518977676601-b53f82aba655") },
  { name: "Drumstick", price: 60, desc: "Murungakkai, 250 g (4-5 pcs)", image: u("photo-1652959889888-53d048374e35") },
  { name: "Brinjal (Purple)", price: 45, desc: "Tender purple brinjal, 500 g", image: u("photo-1659261200833-ec8761558af7") },
  { name: "Ladies Finger", price: 40, desc: "Fresh okra / vendakkai, 500 g", image: u("photo-1664478547-0c6c2c1d8b78") },
  { name: "Snake Gourd", price: 35, desc: "Pudalangai, 500 g", image: u("photo-1631208781-ccb1eee4a432") },
  { name: "Bottle Gourd", price: 30, desc: "Sorakkai, 1 pc (~700 g)", image: u("photo-1664478547-77e4b6b9b0db") },
  { name: "Ridge Gourd", price: 35, desc: "Peerkangai, 500 g", image: u("photo-1599846754013-92d3a96d2e2e") },
  { name: "Ash Gourd", price: 40, desc: "Pusanikkai, 1 kg", image: u("photo-1571171637578-41bc2dd41cd2") },
  { name: "Raw Banana", price: 25, desc: "Vazhaikkai, 500 g", image: u("photo-1603833665858-e61d17a86224") },
  { name: "Banana Stem", price: 30, desc: "Vazhaithandu, 1 pc", image: u("photo-1574226516831-e1dff420e8f8") },
  { name: "Banana Flower", price: 35, desc: "Vazhaipoo, 1 pc", image: u("photo-1591291621164-2c6367723315") },
  { name: "Cluster Beans", price: 50, desc: "Kothavarangai, 250 g", image: u("photo-1567375698340-5a4dde9bd5ea") },
  { name: "Broad Beans", price: 45, desc: "Avarakkai, 250 g", image: u("photo-1638522170869-0b2c6b8f8e2d") },
  { name: "Carrot", price: 40, desc: "Ooty carrots, 500 g", image: u("photo-1598170845058-32b9d6a5da37") },
  { name: "Beetroot", price: 35, desc: "Fresh beetroot, 500 g", image: u("photo-1593105544559-ecb03bf76f82") },
  { name: "Cabbage", price: 30, desc: "Fresh green cabbage, 1 pc", image: u("photo-1551893665-f843f600794e") },
  { name: "Cauliflower", price: 45, desc: "Crisp cauliflower, 1 pc", image: u("photo-1568584711271-6c929fb49b60") },
  { name: "Curry Leaves", price: 10, desc: "Karuveppilai, 50 g bundle", image: u("photo-1600831606133-238b6a09f4a8") },
  { name: "Coriander Leaves", price: 15, desc: "Kothamalli, 100 g bundle", image: u("photo-1631204018971-39b7c0d22b2e") },
  { name: "Mint Leaves", price: 15, desc: "Pudina, 100 g bundle", image: u("photo-1628557044797-f21a177c37ec") },
  { name: "Green Chilli", price: 20, desc: "Pachai milagai, 100 g", image: u("photo-1583119022894-919a68a3d0e3") },
  { name: "Ginger", price: 30, desc: "Fresh inji, 250 g", image: u("photo-1573414405852-749a4e7ef131") },
  { name: "Garlic", price: 60, desc: "Poondu, 250 g", image: u("photo-1615477550927-6ec8da1b9e5f") },
  { name: "Lemon", price: 25, desc: "Fresh elumichai, 250 g (5-6 pcs)", image: u("photo-1582287014914-1db836de8c65") },
  { name: "Raw Mango", price: 40, desc: "Maangai for pickles, 500 g", image: u("photo-1623930154721-86e8a9f5ea90") },
];

const NONVEG: Item[] = [
  { name: "Country Chicken", price: 380, desc: "Naatu kozhi, 1 kg", image: u("photo-1587593810167-a84920ea0781") },
  { name: "Broiler Chicken", price: 220, desc: "Skinless cleaned, 1 kg", image: u("photo-1606728035253-49e8a23146de") },
  { name: "Chicken Boneless", price: 320, desc: "Breast & thigh boneless, 500 g", image: u("photo-1604908176997-125f25cc6f3d") },
  { name: "Chicken Lollipop", price: 280, desc: "Marinated lollipop, 500 g", image: u("photo-1599487488170-d11ec9c172f0") },
  { name: "Chicken Liver", price: 160, desc: "Fresh liver, 500 g", image: u("photo-1602491674275-316d95560723") },
  { name: "Mutton Curry Cut", price: 650, desc: "Goat mutton with bone, 500 g", image: u("photo-1603048297172-c92544798d5a") },
  { name: "Mutton Boneless", price: 780, desc: "Premium boneless mutton, 500 g", image: u("photo-1607623814075-e51df1bdc82f") },
  { name: "Mutton Keema", price: 700, desc: "Minced mutton, 500 g", image: u("photo-1529694157872-4e0c0f3b238b") },
  { name: "Seer Fish (Vanjaram)", price: 750, desc: "Steaks, 500 g", image: u("photo-1535473895227-bdecb20fb157") },
  { name: "Pomfret", price: 520, desc: "Cleaned whole, 500 g", image: u("photo-1611171711791-b34b41b1c8e0") },
  { name: "Tilapia (Jilebi)", price: 280, desc: "Cleaned, 500 g", image: u("photo-1545816250-0c0fc725d76b") },
  { name: "Sardines (Mathi)", price: 200, desc: "Fresh sardines, 500 g", image: u("photo-1559717201-fbb671ff56b7") },
  { name: "Prawns Medium", price: 480, desc: "Cleaned & deveined, 500 g", image: u("photo-1565680018434-b513d5e5fd47") },
  { name: "Crab", price: 420, desc: "Live sea crab, 500 g", image: u("photo-1559737558-2f5a35f4523b") },
  { name: "Squid (Kanava)", price: 360, desc: "Cleaned squid rings, 500 g", image: u("photo-1626197031507-c17099753214") },
  { name: "Country Eggs", price: 90, desc: "Naatu kodi muttai, 6 pcs", image: u("photo-1582722872445-44dc5f7e3c8f") },
];

const OILS: Item[] = [
  { name: "Sunflower Oil", price: 180, desc: "Refined sunflower oil, 1 L", image: u("photo-1620706857370-e1b9770e8bb1") },
  { name: "Gold Winner Sunflower", price: 175, desc: "Gold Winner, 1 L pouch", image: u("photo-1474979266404-7eaacbcd87c5") },
  { name: "Fortune Sunflower", price: 185, desc: "Fortune refined, 1 L", image: u("photo-1611162618071-b39a2ec055fb") },
  { name: "Coconut Oil", price: 200, desc: "Pure coconut oil, 500 ml", image: u("photo-1590301157890-4810ed352733") },
  { name: "Cold Pressed Coconut Oil", price: 360, desc: "Wood pressed, 500 ml", image: u("photo-1615485290382-441e4d049cb5") },
  { name: "Gingelly Oil (Sesame)", price: 280, desc: "Idhayam nallennai, 500 ml", image: u("photo-1474722883778-792e7990302f") },
  { name: "Groundnut Oil", price: 220, desc: "Filtered groundnut oil, 1 L", image: u("photo-1604329760661-e71dc83f8f26") },
  { name: "Mustard Oil", price: 190, desc: "Kachi ghani mustard, 1 L", image: u("photo-1617692855027-33b14f061079") },
  { name: "Olive Oil", price: 520, desc: "Extra virgin olive oil, 500 ml", image: u("photo-1474979266404-7eaacbcd87c5") },
  { name: "Castor Oil", price: 140, desc: "Pure castor oil, 200 ml", image: u("photo-1608571423902-eed4a5ad8108") },
  { name: "Pure Cow Ghee", price: 580, desc: "A2 desi ghee, 500 ml", image: u("photo-1631452180519-c014fe946bc7") },
  { name: "Vanaspati", price: 160, desc: "Dalda vanaspati, 1 kg", image: u("photo-1628689469838-524a4a973b8e") },
];

const POWDERS: Item[] = [
  { name: "Sambar Powder", price: 120, desc: "Aachi sambar powder, 200 g", image: u("photo-1596040033229-a9821ebd058d") },
  { name: "Rasam Powder", price: 110, desc: "Authentic rasam powder, 200 g", image: u("photo-1599909533200-66cb7b7c0f2d") },
  { name: "Idli Podi", price: 95, desc: "Milagai podi, 200 g", image: u("photo-1599487488170-d11ec9c172f0") },
  { name: "Curry Powder", price: 100, desc: "Kuzhambu milagai thool, 200 g", image: u("photo-1532336414038-cf19250c5757") },
  { name: "Turmeric Powder", price: 80, desc: "Manjal podi, 200 g", image: u("photo-1615485290449-9c648a8c8c1f") },
  { name: "Red Chilli Powder", price: 130, desc: "Guntur chilli powder, 250 g", image: u("photo-1583187804693-d7c5e0e5b2c8") },
  { name: "Coriander Powder", price: 75, desc: "Malli podi, 200 g", image: u("photo-1599485336553-8e9b1e4f7a17") },
  { name: "Garam Masala", price: 90, desc: "MDH garam masala, 100 g", image: u("photo-1599909533730-cf28f6b2c1cf") },
  { name: "Chicken Masala", price: 110, desc: "Sakthi chicken masala, 200 g", image: u("photo-1604329760661-e71dc83f8f26") },
  { name: "Mutton Masala", price: 120, desc: "Aachi mutton masala, 200 g", image: u("photo-1596040033229-a9821ebd058d") },
  { name: "Fish Masala", price: 105, desc: "Aachi fish masala, 200 g", image: u("photo-1605478582048-bb5e90f4f1f2") },
  { name: "Biryani Masala", price: 115, desc: "Sakthi biryani masala, 100 g", image: u("photo-1631452180775-9e2f4f81f0a2") },
  { name: "Pepper Powder", price: 140, desc: "Black pepper powder, 100 g", image: u("photo-1615485500704-8e990f9900f7") },
  { name: "Cumin Powder", price: 70, desc: "Jeera powder, 100 g", image: u("photo-1599909533569-b1d4d3e2c0bf") },
  { name: "Asafoetida (Hing)", price: 60, desc: "Perungayam, 50 g", image: u("photo-1599909533200-66cb7b7c0f2d") },
];

const RICE_ATTA: Item[] = [
  { name: "Idli Rice", price: 70, desc: "Pulungal arisi, 1 kg", image: u("photo-1586201375761-83865001e31c") },
  { name: "Ponni Boiled Rice", price: 65, desc: "Ponni puzhungal, 1 kg", image: u("photo-1568347355280-d33fdf77d42a") },
  { name: "Sona Masoori Rice", price: 80, desc: "Premium sona masoori, 1 kg", image: u("photo-1536304993881-ff6e9eefa2a6") },
  { name: "Basmati Rice", price: 140, desc: "India Gate classic, 1 kg", image: u("photo-1626078299034-94e8f38e9bca") },
  { name: "Seeraga Samba Rice", price: 160, desc: "Biryani rice, 1 kg", image: u("photo-1603133872878-684f208fb84b") },
  { name: "Red Rice (Matta)", price: 95, desc: "Kerala matta rice, 1 kg", image: u("photo-1626078436697-9c9c8b6e5e5c") },
  { name: "Aashirvaad Atta", price: 320, desc: "Whole wheat atta, 5 kg", image: u("photo-1604908554049-2bd0c1e9f80f") },
  { name: "Pillsbury Chakki Atta", price: 295, desc: "Multigrain atta, 5 kg", image: u("photo-1568901346375-23c9450c58cd") },
  { name: "Maida", price: 50, desc: "All purpose flour, 1 kg", image: u("photo-1612257999756-3a9b0e7d1d34") },
  { name: "Rava (Sooji)", price: 55, desc: "Bombay rava, 1 kg", image: u("photo-1599909366516-6c3e0c4b8d3f") },
  { name: "Rice Flour", price: 60, desc: "Idiyappam flour, 1 kg", image: u("photo-1612257999756-3a9b0e7d1d34") },
  { name: "Ragi Flour", price: 90, desc: "Finger millet flour, 1 kg", image: u("photo-1601000938259-9e92002320b2") },
  { name: "Toor Dal", price: 160, desc: "Thuvaram paruppu, 1 kg", image: u("photo-1610725664285-7c57e6eeac3f") },
  { name: "Urad Dal", price: 180, desc: "Ulundu paruppu, 1 kg", image: u("photo-1599909533200-66cb7b7c0f2d") },
  { name: "Moong Dal", price: 140, desc: "Pasi paruppu, 1 kg", image: u("photo-1599909366516-6c3e0c4b8d3f") },
];

const ORGANIC: Item[] = [
  { name: "Organic Jaggery", price: 110, desc: "Karupatti / palm jaggery, 500 g", image: u("photo-1582719471384-894fbb16e074") },
  { name: "Organic Honey", price: 320, desc: "Raw forest honey, 500 g", image: u("photo-1587049352846-4a222e784d38") },
  { name: "Organic Turmeric Powder", price: 140, desc: "Salem manjal, 200 g", image: u("photo-1615485500704-8e990f9900f7") },
  { name: "Cold Pressed Sesame Oil", price: 340, desc: "Wood pressed nallennai, 500 ml", image: u("photo-1474722883778-792e7990302f") },
  { name: "Cold Pressed Groundnut Oil", price: 320, desc: "Wood pressed, 500 ml", image: u("photo-1604329760661-e71dc83f8f26") },
  { name: "Foxtail Millet", price: 120, desc: "Thinai, 1 kg", image: u("photo-1601000938259-9e92002320b2") },
  { name: "Kodo Millet", price: 130, desc: "Varagu, 1 kg", image: u("photo-1610725664285-7c57e6eeac3f") },
  { name: "Little Millet", price: 125, desc: "Saamai, 1 kg", image: u("photo-1599909533569-b1d4d3e2c0bf") },
  { name: "Barnyard Millet", price: 135, desc: "Kuthiraivali, 1 kg", image: u("photo-1599909366516-6c3e0c4b8d3f") },
  { name: "Pearl Millet", price: 90, desc: "Kambu, 1 kg", image: u("photo-1568901346375-23c9450c58cd") },
  { name: "Organic Brown Rice", price: 130, desc: "Hand pounded brown rice, 1 kg", image: u("photo-1626078436697-9c9c8b6e5e5c") },
  { name: "Palm Sugar", price: 180, desc: "Panai vellam crystals, 500 g", image: u("photo-1582719471384-894fbb16e074") },
  { name: "Country Sugar", price: 90, desc: "Naatu sakkarai, 1 kg", image: u("photo-1612257999756-3a9b0e7d1d34") },
  { name: "Himalayan Pink Salt", price: 95, desc: "Rock salt, 500 g", image: u("photo-1615485290382-441e4d049cb5") },
  { name: "Organic Apple Cider Vinegar", price: 280, desc: "With mother, 500 ml", image: u("photo-1474979266404-7eaacbcd87c5") },
];

const SNACKS: Item[] = [
  { name: "Lays Classic Salted", price: 20, desc: "Lays potato chips, 52 g pack", image: u("photo-1566478989037-eec170784d0b") },
  { name: "Lays Magic Masala", price: 20, desc: "Lays Indian masala, 52 g", image: u("photo-1613919113640-25732ec5e61f") },
  { name: "Bingo Mad Angles", price: 20, desc: "Achaari Masti, 66 g", image: u("photo-1621447504864-d8686f12c84d") },
  { name: "Kurkure Masala Munch", price: 20, desc: "Kurkure crunchy snack, 90 g", image: u("photo-1599490659213-e2b9527bd087") },
  { name: "Haldiram's Mixture", price: 60, desc: "All-in-one mixture, 200 g", image: u("photo-1599909533200-66cb7b7c0f2d") },
  { name: "Murukku", price: 80, desc: "Traditional rice murukku, 250 g", image: u("photo-1606491048802-8342506d6471") },
  { name: "Banana Chips", price: 90, desc: "Kerala banana chips, 250 g", image: u("photo-1599490659213-e2b9527bd087") },
  { name: "Good Day Cashew Biscuits", price: 30, desc: "Britannia Good Day, 150 g", image: u("photo-1558961363-fa8fdf82db35") },
  { name: "Marie Gold Biscuits", price: 25, desc: "Britannia Marie Gold, 150 g", image: u("photo-1558961363-fa8fdf82db35") },
  { name: "Parle-G Biscuits", price: 10, desc: "Glucose biscuits, 80 g", image: u("photo-1612203985729-70726954388c") },
  { name: "Hide & Seek", price: 30, desc: "Choco chip cookies, 100 g", image: u("photo-1499636136210-6f4ee915583e") },
  { name: "Oreo Original", price: 30, desc: "Cream sandwich, 120 g", image: u("photo-1590080875988-3d5a1c0a3a2a") },
  { name: "Dairy Milk Chocolate", price: 50, desc: "Cadbury Dairy Milk, 50 g", image: u("photo-1623238913973-21e45cced554") },
  { name: "Dairy Milk Silk", price: 90, desc: "Cadbury Silk, 60 g", image: u("photo-1606312619070-d48b4c652a52") },
  { name: "5 Star", price: 10, desc: "Cadbury 5 Star, 25 g", image: u("photo-1582058091505-f87a2e55a40f") },
  { name: "KitKat", price: 20, desc: "Nestle KitKat, 4 fingers", image: u("photo-1582058091505-f87a2e55a40f") },
  { name: "Munch", price: 10, desc: "Nestle Munch wafer, 22 g", image: u("photo-1599689019350-32ac4a3f7d0e") },
  { name: "Bourbon Biscuits", price: 30, desc: "Britannia Bourbon, 150 g", image: u("photo-1558961363-fa8fdf82db35") },
  { name: "Monaco Biscuits", price: 30, desc: "Parle Monaco salted, 120 g", image: u("photo-1612203985729-70726954388c") },
  { name: "Roasted Peanuts", price: 60, desc: "Salted peanuts, 200 g", image: u("photo-1567892737950-30c4db37cd89") },
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

// Sub-category map by id for fast filtering
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
