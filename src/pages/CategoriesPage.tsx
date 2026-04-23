import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingCart, ArrowLeft, Star, Heart } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { allProducts } from "@/data/products";

// Main category images
import catFashion from "@/assets/home/cat-fashion.jpg";
import catFood from "@/assets/home/cat-food.jpg";
import catGrocery from "@/assets/home/cat-grocery.jpg";
import catMedicine from "@/assets/home/cat-medicine.jpg";
import catShopping from "@/assets/home/cat-shopping.jpg";

// Subcategory images
import subcatMen from "@/assets/subcat/fashion-men.jpg";
import subcatWomen from "@/assets/subcat/fashion-women.jpg";
import subcatKids from "@/assets/subcat/fashion-kids.jpg";
import subcatJeans from "@/assets/subcat/fashion-jeans.jpg";
import subcatTshirts from "@/assets/subcat/fashion-tshirts.jpg";
import subcatShirts from "@/assets/subcat/fashion-shirts.jpg";
import subcatEthnic from "@/assets/subcat/fashion-ethnic.jpg";
import subcatDresses from "@/assets/subcat/fashion-dresses.jpg";
import subcatFootwear from "@/assets/subcat/fashion-footwear.jpg";

import subcatMeals from "@/assets/subcat/food-meals.jpg";
import subcatFoodSnacks from "@/assets/subcat/food-snacks.jpg";
import subcatBeverages from "@/assets/subcat/food-beverages.jpg";
import subcatDesserts from "@/assets/subcat/food-desserts.jpg";

import subcatVegetables from "@/assets/subcat/grocery-vegetables.jpg";
import subcatFruits from "@/assets/subcat/grocery-fruits.jpg";
import subcatDairy from "@/assets/subcat/grocery-dairy.jpg";
import subcatGrocerySnacks from "@/assets/subcat/grocery-snacks.jpg";
import subcatOil from "@/assets/subcat/grocery-oil.jpg";
import subcatMasala from "@/assets/subcat/grocery-masala.jpg";
import subcatRice from "@/assets/subcat/grocery-rice.jpg";

import subcatElectronics from "@/assets/subcat/items-electronics.jpg";
import subcatAccessories from "@/assets/subcat/items-accessories.jpg";
import subcatGadgets from "@/assets/subcat/items-gadgets.jpg";

import subcatTablets from "@/assets/subcat/med-tablets.jpg";
import subcatSyrups from "@/assets/subcat/med-syrups.jpg";
import subcatPersonal from "@/assets/subcat/med-personal.jpg";
import subcatDevices from "@/assets/subcat/med-devices.jpg";

interface SubCategory {
  name: string;
  image: string;
  filterKeywords: string[];
}

interface MainCategory {
  name: string;
  image: string;
  productCategory: string;
  subcategories: SubCategory[];
}

const mainCategories: MainCategory[] = [
  {
    name: "Fashion",
    image: catFashion,
    productCategory: "Fashion",
    subcategories: [
      { name: "All", image: catFashion, filterKeywords: [] },
      { name: "Men", image: subcatMen, filterKeywords: ["men", "shirt", "formal", "blazer"] },
      { name: "Women", image: subcatWomen, filterKeywords: ["women", "saree", "kurti", "top"] },
      { name: "Kids", image: subcatKids, filterKeywords: ["kids", "children", "boy", "girl"] },
      { name: "Jeans", image: subcatJeans, filterKeywords: ["jeans", "denim"] },
      { name: "T-Shirts", image: subcatTshirts, filterKeywords: ["t-shirt", "tshirt", "tee"] },
      { name: "Shirts", image: subcatShirts, filterKeywords: ["shirt", "formal"] },
      { name: "Ethnic", image: subcatEthnic, filterKeywords: ["ethnic", "kurta", "saree", "traditional"] },
      { name: "Dresses", image: subcatDresses, filterKeywords: ["dress", "gown", "frock"] },
      { name: "Footwear", image: subcatFootwear, filterKeywords: ["shoe", "sneaker", "sandal", "footwear"] },
    ],
  },
  {
    name: "Food",
    image: catFood,
    productCategory: "Food",
    subcategories: [
      { name: "All", image: catFood, filterKeywords: [] },
      { name: "Meals", image: subcatMeals, filterKeywords: ["meal", "thali", "biryani", "rice", "curry"] },
      { name: "Snacks", image: subcatFoodSnacks, filterKeywords: ["snack", "samosa", "pakora", "chaat"] },
      { name: "Beverages", image: subcatBeverages, filterKeywords: ["juice", "tea", "coffee", "drink", "beverage"] },
      { name: "Desserts", image: subcatDesserts, filterKeywords: ["sweet", "dessert", "gulab", "cake", "ice cream"] },
    ],
  },
  {
    name: "Grocery",
    image: catGrocery,
    productCategory: "Grocery",
    subcategories: [
      { name: "All", image: catGrocery, filterKeywords: [] },
      { name: "Vegetables", image: subcatVegetables, filterKeywords: ["vegetable", "tomato", "potato", "onion", "carrot"] },
      { name: "Fruits", image: subcatFruits, filterKeywords: ["fruit", "apple", "banana", "mango", "orange"] },
      { name: "Dairy", image: subcatDairy, filterKeywords: ["milk", "cheese", "butter", "yogurt", "paneer", "dairy"] },
      { name: "Snacks", image: subcatGrocerySnacks, filterKeywords: ["chips", "biscuit", "namkeen", "snack"] },
      { name: "Oil", image: subcatOil, filterKeywords: ["oil", "ghee", "cooking"] },
      { name: "Masala", image: subcatMasala, filterKeywords: ["masala", "spice", "turmeric", "chili"] },
      { name: "Rice & Atta", image: subcatRice, filterKeywords: ["rice", "atta", "flour", "wheat", "grain"] },
    ],
  },
  {
    name: "Items",
    image: catShopping,
    productCategory: "Items",
    subcategories: [
      { name: "All", image: catShopping, filterKeywords: [] },
      { name: "Electronics", image: subcatElectronics, filterKeywords: ["phone", "earphone", "charger", "cable", "electronic"] },
      { name: "Accessories", image: subcatAccessories, filterKeywords: ["watch", "wallet", "belt", "sunglasses", "bag"] },
      { name: "Gadgets", image: subcatGadgets, filterKeywords: ["speaker", "power bank", "gadget", "usb"] },
    ],
  },
  {
    name: "Medicine",
    image: catMedicine,
    productCategory: "Medication",
    subcategories: [
      { name: "All", image: catMedicine, filterKeywords: [] },
      { name: "Tablets", image: subcatTablets, filterKeywords: ["tablet", "capsule", "vitamin", "paracetamol"] },
      { name: "Syrups", image: subcatSyrups, filterKeywords: ["syrup", "cough", "liquid"] },
      { name: "Personal Care", image: subcatPersonal, filterKeywords: ["soap", "shampoo", "lotion", "cream", "care"] },
      { name: "Health Devices", image: subcatDevices, filterKeywords: ["thermometer", "bp", "monitor", "oximeter", "device"] },
    ],
  },
];

/* Horizontal product scroll section */
const HorizontalSection = ({
  title,
  products,
  navigate,
}: {
  title: string;
  products: typeof allProducts;
  navigate: (p: string) => void;
}) => {
  const { isWishlisted, toggleWishlist } = useWishlist();
  if (products.length === 0) return null;
  return (
    <div className="mb-4">
      <h3 className="text-[13px] font-bold mb-2 px-1 text-foreground">{title}</h3>
      <div className="flex gap-2.5 overflow-x-auto scrollbar-hide pb-1">
        {products.slice(0, 10).map((p) => (
          <motion.div
            key={p.id}
            className="flex-shrink-0 w-32 rounded-xl overflow-hidden cursor-pointer relative glass-card"
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(`/product/${p.id}`)}
          >
            <div className="relative h-32 overflow-hidden">
              <img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-cover" />
              {p.badge && <span className="absolute top-1.5 left-1.5 text-[8px] font-bold px-1.5 py-0.5 rounded-full text-white" style={{ background: "hsl(0, 75%, 55%)" }}>{p.badge}</span>}
              <button onClick={(e) => { e.stopPropagation(); toggleWishlist(p); }} className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "hsla(0, 0%, 0%, 0.4)", backdropFilter: "blur(8px)" }}>
                <Heart size={12} fill={isWishlisted(p.id) ? "hsl(340, 80%, 52%)" : "none"} color={isWishlisted(p.id) ? "hsl(340, 80%, 52%)" : "hsla(0, 0%, 100%, 0.7)"} />
              </button>
            </div>
            <div className="px-2 py-1.5">
              <p className="text-[10px] truncate font-medium text-muted-foreground">{p.name}</p>
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-foreground">₹{p.price}</span>
                <Star size={8} fill="hsl(45, 93%, 47%)" color="hsl(45, 93%, 47%)" />
                <span className="text-[9px] text-muted-foreground">{p.rating}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const CategoriesPage = () => {
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [activeSidebar, setActiveSidebar] = useState(0);
  const [activeSubcat, setActiveSubcat] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const activeCat = mainCategories[activeSidebar];
  const activeSub = activeCat.subcategories[activeSubcat];

  const categoryProducts = useMemo(() => {
    let items = allProducts.filter((p) => p.category === activeCat.productCategory);
    // Apply subcategory filter
    if (activeSub && activeSub.filterKeywords.length > 0) {
      items = items.filter((p) => {
        const name = p.name.toLowerCase();
        const desc = (p.description || "").toLowerCase();
        return activeSub.filterKeywords.some((kw) => name.includes(kw) || desc.includes(kw));
      });
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter((p) => p.name.toLowerCase().includes(q));
    }
    return items;
  }, [activeSidebar, activeSubcat, searchQuery]);

  const trending = useMemo(() => categoryProducts.filter((p) => p.rating >= 4.3).slice(0, 10), [categoryProducts]);
  const bestSellers = useMemo(() => categoryProducts.filter((p) => p.badge).slice(0, 10), [categoryProducts]);
  const newArrivals = useMemo(() => [...categoryProducts].reverse().slice(0, 10), [categoryProducts]);

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 px-4 py-3 flex items-center gap-3 glass-card-strong" style={{ borderBottom: "1px solid hsla(210, 40%, 95%, 0.08)" }}>
        <button onClick={() => navigate(-1)} className="text-foreground"><ArrowLeft size={22} /></button>
        <h1 className="text-foreground font-semibold text-sm">{activeCat.name}</h1>
        <div className="flex items-center gap-1.5 flex-1 max-w-[180px] rounded-lg px-2 py-1.5" style={{ background: "hsla(210, 40%, 95%, 0.08)" }}>
          <Search size={14} color="hsla(210, 40%, 90%, 0.5)" />
          <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="flex-1 bg-transparent text-xs outline-none placeholder:text-muted-foreground/50 text-foreground" />
        </div>
        <button onClick={() => navigate("/cart")} className="text-foreground relative">
          <ShoppingCart size={20} />
          {totalItems > 0 && <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white" style={{ background: "hsl(0, 75%, 55%)" }}>{totalItems}</span>}
        </button>
      </div>

      {/* Sidebar + Content */}
      <div className="flex" style={{ height: "calc(100vh - 52px - 64px)" }}>
        {/* Left sidebar */}
        <div className="w-[88px] flex-shrink-0 overflow-y-auto scrollbar-hide glass-card" style={{ borderRight: "1px solid hsla(210, 40%, 95%, 0.08)" }}>
          {mainCategories.map((cat, i) => {
            const isMainActive = activeSidebar === i;
            return (
              <div key={cat.name}>
                {/* Main category header */}
                <button
                  onClick={() => { setActiveSidebar(i); setActiveSubcat(0); setSearchQuery(""); }}
                  className="w-full flex flex-col items-center gap-1 py-2.5 px-1 relative transition-all"
                  style={{ background: isMainActive ? "hsla(210, 100%, 55%, 0.15)" : "transparent" }}
                >
                  {isMainActive && (
                    <motion.div
                      layoutId="sidebarIndicator"
                      className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full"
                      style={{ background: "hsl(210, 100%, 45%)" }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <div
                    className="w-12 h-12 rounded-full overflow-hidden border-2 transition-all"
                    style={{
                      borderColor: isMainActive ? "hsl(210, 100%, 55%)" : "hsla(210, 40%, 95%, 0.15)",
                      boxShadow: isMainActive ? "0 2px 8px hsla(210, 100%, 55%, 0.3)" : "none",
                    }}
                  >
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                  </div>
                  <span
                    className="text-[9px] font-bold leading-tight text-center"
                    style={{ color: isMainActive ? "hsl(210, 100%, 60%)" : "hsla(210, 20%, 80%, 0.6)" }}
                  >
                    {cat.name}
                  </span>
                </button>

                {/* Subcategories — only show when this main category is active */}
                <AnimatePresence>
                  {isMainActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      {cat.subcategories.map((sub, j) => {
                        const isSubActive = activeSubcat === j;
                        return (
                          <button
                            key={sub.name}
                            onClick={() => setActiveSubcat(j)}
                            className="w-full flex flex-col items-center gap-1 py-2 px-1.5 transition-all"
                            style={{
                              background: isSubActive ? "hsla(210, 100%, 55%, 0.12)" : "transparent",
                            }}
                          >
                            <div
                              className="w-10 h-10 rounded-lg overflow-hidden transition-all"
                              style={{
                                border: isSubActive ? "2px solid hsl(210, 100%, 55%)" : "1px solid hsla(210, 40%, 95%, 0.12)",
                                boxShadow: isSubActive ? "0 2px 8px hsla(210, 100%, 55%, 0.25)" : "none",
                              }}
                            >
                              <img src={sub.image} alt={sub.name} loading="lazy" className="w-full h-full object-cover" />
                            </div>
                            <span
                              className="text-[8px] font-semibold leading-tight text-center"
                              style={{ color: isSubActive ? "hsl(210, 100%, 60%)" : "hsla(210, 20%, 80%, 0.5)" }}
                            >
                              {sub.name}
                            </span>
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Right content */}
        <div className="flex-1 overflow-y-auto px-3 py-3">
          {/* Active subcategory label */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full" style={{ background: "hsl(210, 100%, 45%)", color: "white" }}>
              {activeSub?.name === "All" ? activeCat.name : activeSub?.name}
            </span>
            <span className="text-[10px] text-muted-foreground">
              {categoryProducts.length} products
            </span>
          </div>

          {/* Horizontal scroll sections */}
          <HorizontalSection title="🔥 Trending" products={trending} navigate={navigate} />
          <HorizontalSection title="⭐ Best Sellers" products={bestSellers} navigate={navigate} />
          <HorizontalSection title="🆕 New Arrivals" products={newArrivals} navigate={navigate} />

          {/* Full product grid */}
          <h3 className="text-[13px] font-bold mb-2 px-1 text-foreground">
            All {activeSub?.name === "All" ? activeCat.name : activeSub?.name} Products
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {categoryProducts.map((product, i) => (
              <motion.div
                key={product.id}
                className="rounded-xl overflow-hidden cursor-pointer relative glass-card"
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: (i % 6) * 0.04 }}
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="relative aspect-square overflow-hidden">
                  <img src={product.image} alt={product.name} loading="lazy" className="w-full h-full object-cover" />
                  {product.badge && <span className="absolute top-1.5 left-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded-full text-white" style={{ background: "hsl(0, 75%, 55%)" }}>{product.badge}</span>}
                  <button onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }} className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "hsla(0, 0%, 0%, 0.4)", backdropFilter: "blur(8px)" }}>
                    <Heart size={12} fill={isWishlisted(product.id) ? "hsl(340, 80%, 52%)" : "none"} color={isWishlisted(product.id) ? "hsl(340, 80%, 52%)" : "hsla(0, 0%, 100%, 0.7)"} />
                  </button>
                </div>
                <div className="px-2 py-1.5">
                  <p className="text-[10px] truncate font-medium text-muted-foreground">{product.name}</p>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-foreground">₹{product.price}</span>
                    {product.originalPrice && <span className="text-[9px] line-through text-muted-foreground">₹{product.originalPrice}</span>}
                  </div>
                  <div className="flex items-center gap-0.5 mt-0.5">
                    <Star size={9} fill="hsl(45, 90%, 50%)" color="hsl(45, 90%, 50%)" />
                    <span className="text-[9px] text-muted-foreground">{product.rating}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {categoryProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-sm text-muted-foreground">No products found</p>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default CategoriesPage;
