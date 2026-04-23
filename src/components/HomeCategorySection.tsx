import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronDown, SlidersHorizontal, Star, Clock, X } from "lucide-react";
import { allProducts } from "@/data/products";

type SortOption = "default" | "low" | "high" | "rating";
type CategoryKey = "Fashion" | "Food" | "Grocery" | "Medicine" | "Shopping";

const categoryConfig: Record<CategoryKey, { productCategory: string; layout: "fashion" | "food" | "grocery" | "medicine" | "shopping" }> = {
  Fashion: { productCategory: "Fashion", layout: "fashion" },
  Food: { productCategory: "Food", layout: "food" },
  Grocery: { productCategory: "Grocery", layout: "grocery" },
  Medicine: { productCategory: "Medicine", layout: "medicine" },
  Shopping: { productCategory: "Items", layout: "shopping" },
};

const HomeCategorySection = ({
  activeCategory,
  onClose,
}: {
  activeCategory: CategoryKey;
  onClose: () => void;
}) => {
  const navigate = useNavigate();
  const [sort, setSort] = useState<SortOption>("default");
  const [showFilters, setShowFilters] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const config = categoryConfig[activeCategory];

  useEffect(() => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [activeCategory]);

  const products = allProducts
    .filter((p) => p.category === config.productCategory)
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="overflow-hidden"
    >
      {/* Filter bar */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-bold" style={{ color: "hsl(220, 40%, 13%)" }}>
            {activeCategory}
          </h3>
          <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ background: "hsl(210, 80%, 94%)", color: "hsl(210, 80%, 40%)" }}>
            {products.length} items
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-1 text-[11px] font-medium px-2.5 py-1.5 rounded-lg"
            style={{ background: "hsl(210, 20%, 93%)", color: "hsl(220, 30%, 30%)" }}
          >
            <SlidersHorizontal size={12} /> Filters
          </button>
          <button
            onClick={onClose}
            className="w-6 h-6 rounded-full flex items-center justify-center"
            style={{ background: "hsl(0, 0%, 90%)" }}
          >
            <X size={12} color="hsl(0, 0%, 40%)" />
          </button>
        </div>
      </div>

      {/* Sort chips */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex gap-2 mb-3 overflow-x-auto scrollbar-hide pb-1"
          >
            {([["default", "All"], ["low", "Price ↑"], ["high", "Price ↓"], ["rating", "Rating"]] as [SortOption, string][]).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSort(key)}
                className="text-[11px] font-medium px-3 py-1.5 rounded-full whitespace-nowrap transition-colors"
                style={{
                  background: sort === key ? "hsl(210, 80%, 40%)" : "hsl(0, 0%, 95%)",
                  color: sort === key ? "white" : "hsl(220, 20%, 40%)",
                }}
              >
                {label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Render based on layout */}
      {config.layout === "fashion" && <FashionLayout products={products} navigate={navigate} />}
      {config.layout === "food" && <FoodLayout products={products} navigate={navigate} />}
      {config.layout === "grocery" && <GroceryLayout products={products} navigate={navigate} />}
      {config.layout === "medicine" && <MedicineLayout products={products} navigate={navigate} />}
      {config.layout === "shopping" && <ShoppingLayout products={products} navigate={navigate} />}
    </motion.div>
  );
};

/* ── Fashion: AJIO-style large cards + horizontal scroll ── */
const FashionLayout = ({ products, navigate }: { products: typeof allProducts; navigate: (p: string) => void }) => (
  <div>
    {/* Featured horizontal scroll */}
    <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-3 -mx-1 px-1">
      {products.slice(0, 4).map((p, i) => (
        <motion.div
          key={p.id}
          className="flex-shrink-0 w-40 rounded-2xl overflow-hidden bg-white cursor-pointer"
          style={{ boxShadow: "0 2px 12px hsla(220, 30%, 15%, 0.08)" }}
          whileTap={{ scale: 0.96 }}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.06 }}
          onClick={() => navigate(`/product/${p.id}`)}
        >
          <div className="h-48 overflow-hidden">
            <img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-cover" />
          </div>
          <div className="p-2.5">
            <p className="text-xs truncate font-medium" style={{ color: "hsl(220, 20%, 30%)" }}>{p.name}</p>
            <div className="flex items-center justify-between mt-1">
              <span className="text-sm font-bold" style={{ color: "hsl(220, 40%, 13%)" }}>₹{p.price}</span>
              {p.badge && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full text-white" style={{ background: "hsl(0, 75%, 55%)" }}>{p.badge}</span>}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
    {/* Grid */}
    <div className="grid grid-cols-2 gap-3">
      {products.slice(4).map((p, i) => (
        <ProductCard key={p.id} product={p} index={i} navigate={navigate} />
      ))}
    </div>
  </div>
);

/* ── Food: Swiggy-style restaurant cards ── */
const FoodLayout = ({ products, navigate }: { products: typeof allProducts; navigate: (p: string) => void }) => (
  <div className="space-y-3">
    {products.map((p, i) => (
      <motion.div
        key={p.id}
        className="flex gap-3 rounded-2xl overflow-hidden bg-white cursor-pointer"
        style={{ boxShadow: "0 2px 12px hsla(220, 30%, 15%, 0.06)" }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.04 }}
        onClick={() => navigate(`/product/${p.id}`)}
      >
        <div className="w-28 h-28 flex-shrink-0 overflow-hidden">
          <img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 py-3 pr-3">
          <p className="text-sm font-semibold truncate" style={{ color: "hsl(220, 40%, 13%)" }}>{p.name}</p>
          <p className="text-[11px] mt-0.5" style={{ color: "hsl(220, 15%, 55%)" }}>{p.description?.slice(0, 50)}...</p>
          <div className="flex items-center gap-3 mt-2">
            <span className="flex items-center gap-0.5 text-[11px] font-semibold px-1.5 py-0.5 rounded" style={{ background: "hsl(145, 60%, 40%)", color: "white" }}>
              <Star size={10} fill="white" /> {p.rating}
            </span>
            <span className="flex items-center gap-0.5 text-[11px]" style={{ color: "hsl(220, 15%, 50%)" }}>
              <Clock size={10} /> 25-35 min
            </span>
          </div>
          <span className="text-sm font-bold mt-1 block" style={{ color: "hsl(220, 40%, 13%)" }}>₹{p.price}</span>
        </div>
      </motion.div>
    ))}
  </div>
);

/* ── Grocery: Blinkit-style compact grid ── */
const GroceryLayout = ({ products, navigate }: { products: typeof allProducts; navigate: (p: string) => void }) => (
  <div className="grid grid-cols-3 gap-2.5">
    {products.map((p, i) => (
      <motion.div
        key={p.id}
        className="rounded-2xl overflow-hidden bg-white cursor-pointer"
        style={{ boxShadow: "0 2px 10px hsla(220, 30%, 15%, 0.06)", border: "1px solid hsl(220, 20%, 94%)" }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: i * 0.03 }}
        onClick={() => navigate(`/product/${p.id}`)}
      >
        <div className="aspect-square overflow-hidden p-2">
          <img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-contain rounded-lg" />
        </div>
        <div className="px-2 pb-2.5">
          <p className="text-[11px] truncate font-medium" style={{ color: "hsl(220, 20%, 30%)" }}>{p.name}</p>
          <p className="text-[10px]" style={{ color: "hsl(220, 15%, 55%)" }}>500g</p>
          <span className="text-xs font-bold mt-0.5 block" style={{ color: "hsl(220, 40%, 13%)" }}>₹{p.price}</span>
        </div>
      </motion.div>
    ))}
  </div>
);

/* ── Medicine: Pharmacy-style clean list ── */
const MedicineLayout = ({ products, navigate }: { products: typeof allProducts; navigate: (p: string) => void }) => (
  <div className="grid grid-cols-2 gap-3">
    {products.map((p, i) => (
      <motion.div
        key={p.id}
        className="rounded-2xl overflow-hidden bg-white cursor-pointer"
        style={{ boxShadow: "0 2px 10px hsla(220, 30%, 15%, 0.06)", border: "1px solid hsl(145, 30%, 90%)" }}
        whileTap={{ scale: 0.96 }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.04 }}
        onClick={() => navigate(`/product/${p.id}`)}
      >
        <div className="aspect-[4/3] overflow-hidden bg-white p-3">
          <img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-contain" />
        </div>
        <div className="px-3 py-2" style={{ background: "hsl(145, 30%, 97%)" }}>
          <p className="text-xs truncate font-medium" style={{ color: "hsl(220, 20%, 25%)" }}>{p.name}</p>
          <div className="flex items-center justify-between mt-1">
            <span className="text-sm font-bold" style={{ color: "hsl(145, 50%, 30%)" }}>₹{p.price}</span>
            {p.badge && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full text-white" style={{ background: "hsl(145, 60%, 40%)" }}>{p.badge}</span>}
          </div>
        </div>
      </motion.div>
    ))}
  </div>
);

/* ── Shopping: Amazon-style mixed grid ── */
const ShoppingLayout = ({ products, navigate }: { products: typeof allProducts; navigate: (p: string) => void }) => (
  <div className="grid grid-cols-2 gap-3">
    {products.map((p, i) => (
      <ProductCard key={p.id} product={p} index={i} navigate={navigate} />
    ))}
  </div>
);

/* ── Reusable product card ── */
const ProductCard = ({ product: p, index: i, navigate }: { product: typeof allProducts[0]; index: number; navigate: (path: string) => void }) => (
  <motion.div
    className="rounded-2xl overflow-hidden bg-white cursor-pointer"
    style={{ boxShadow: "0 2px 12px hsla(220, 30%, 15%, 0.08)" }}
    whileTap={{ scale: 0.97 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: (i % 6) * 0.04 }}
    onClick={() => navigate(`/product/${p.id}`)}
  >
    <div className="relative aspect-square overflow-hidden">
      <img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-cover" />
      {p.badge && (
        <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full text-white" style={{ background: "hsl(0, 75%, 55%)" }}>
          {p.badge}
        </span>
      )}
      <span className="absolute bottom-2 left-2 text-[10px] font-semibold px-1.5 py-0.5 rounded flex items-center gap-0.5" style={{ background: "hsl(145, 60%, 40%)", color: "white" }}>
        <Star size={9} fill="white" /> {p.rating}
      </span>
    </div>
    <div className="px-3 py-2">
      <p className="text-xs truncate" style={{ color: "hsl(220, 20%, 35%)" }}>{p.name}</p>
      <div className="flex items-center gap-1.5 mt-0.5">
        <span className="text-sm font-bold" style={{ color: "hsl(220, 40%, 13%)" }}>₹{p.price}</span>
        {p.originalPrice && (
          <span className="text-[10px] line-through" style={{ color: "hsl(220, 15%, 60%)" }}>₹{p.originalPrice}</span>
        )}
      </div>
    </div>
  </motion.div>
);

export default HomeCategorySection;
