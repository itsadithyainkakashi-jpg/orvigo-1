import { useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ShoppingCart, Search, Star, Heart, SlidersHorizontal } from "lucide-react";
import { MEDICINE_PRODUCTS } from "@/data/medicineProducts";
import { CATEGORY_META, type CategoryKey, type DisplayItem } from "@/data/medicineCategories";
import { useCart, type Product } from "@/contexts/CartContext";
import BottomNav from "@/components/BottomNav";
import MedicineProductImage from "@/components/MedicineProductImage";
import { toast } from "sonner";

const TEAL = "hsl(165, 75%, 38%)";
const TEAL_DARK = "hsl(170, 80%, 28%)";

type SortKey = "default" | "price-asc" | "price-desc" | "rating" | "discount";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "default", label: "Featured" },
  { key: "price-asc", label: "Price ↑" },
  { key: "price-desc", label: "Price ↓" },
  { key: "rating", label: "Top Rated" },
  { key: "discount", label: "Discount" },
];

const ALL_KEYS: CategoryKey[] = ["fever", "cold", "heart", "skin", "mental", "stomach", "diabetes"];

const MedicineCategoryPage = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams<{ categoryId: CategoryKey }>();
  const active = (categoryId && categoryId in CATEGORY_META ? categoryId : "fever") as CategoryKey;
  const meta = CATEGORY_META[active];

  const { totalItems, addToCart } = useCart();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("default");

  const productMap = useMemo(() => {
    const m = new Map<string, Product>();
    MEDICINE_PRODUCTS.forEach((p) => m.set(p.id, p));
    return m;
  }, []);

  const items = useMemo(() => {
    let list = [...meta.items];
    const q = query.trim().toLowerCase();
    if (q) list = list.filter((i) => i.name.toLowerCase().includes(q) || i.sub.toLowerCase().includes(q));
    switch (sort) {
      case "price-asc":  list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "rating":     list.sort((a, b) => b.rating - a.rating); break;
      case "discount":   list.sort((a, b) => ((b.original ?? b.price) - b.price) / (b.original ?? b.price) - ((a.original ?? a.price) - a.price) / (a.original ?? a.price)); break;
    }
    return list;
  }, [meta, query, sort]);

  const handleAdd = (item: DisplayItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const base = productMap.get(item.id);
    if (!base) return;
    addToCart({ ...base, name: item.name, price: item.price, originalPrice: item.original }, 1);
    toast.success(`${item.name} added to cart`, { duration: 1500 });
  };

  const renderStars = (rating: number) => (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={11} className={i <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"} />
      ))}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="min-h-screen pb-24"
      style={{ background: "#f4f7fa" }}
    >
      {/* Header */}
      <div className="sticky top-0 z-30 px-4 py-3 flex items-center gap-2"
        style={{ background: "linear-gradient(135deg, hsl(195, 80%, 30%), hsl(165, 75%, 38%))" }}
      >
        <button onClick={() => navigate("/medicine")} className="text-white" aria-label="Back">
          <ArrowLeft size={22} />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-white font-extrabold text-base truncate">{meta.emoji} {meta.label}</h1>
          <p className="text-white/80 text-[10px]">{meta.items.length} medicines available</p>
        </div>
        <button onClick={() => navigate("/cart")} className="relative text-white p-2 rounded-full" style={{ background: "rgba(255,255,255,0.18)" }}>
          <ShoppingCart size={18} />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white bg-red-500">{totalItems}</span>
          )}
        </button>
      </div>

      {/* Search */}
      <div className="px-3 pt-3">
        <div className="flex items-center gap-2 rounded-full bg-white pl-4 pr-1 py-1 shadow-md">
          <Search size={15} className="text-gray-400" />
          <input
            type="text"
            placeholder={`Search in ${meta.label}...`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-[12px] outline-none text-gray-800 placeholder:text-gray-400 py-1.5"
          />
        </div>
      </div>

      {/* Category chips */}
      <div className="mt-3 flex gap-2 overflow-x-auto px-3 pb-1 scrollbar-hide">
        {ALL_KEYS.map((k) => {
          const m = CATEGORY_META[k];
          const isActive = k === active;
          return (
            <motion.button
              key={k}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(`/medicine/category/${k}`)}
              className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold border transition-colors"
              style={{
                background: isActive ? TEAL : "white",
                color: isActive ? "white" : "hsl(220, 20%, 30%)",
                borderColor: isActive ? TEAL : "hsl(220, 15%, 90%)",
              }}
            >
              <span>{m.emoji}</span>
              <span className="whitespace-nowrap">{m.label}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Sort bar */}
      <div className="mt-2 px-3 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
        <SlidersHorizontal size={14} className="text-gray-500 flex-shrink-0" />
        {SORTS.map((s) => (
          <button
            key={s.key}
            onClick={() => setSort(s.key)}
            className="flex-shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold transition-colors"
            style={{
              background: sort === s.key ? TEAL_DARK : "white",
              color: sort === s.key ? "white" : "hsl(220, 20%, 35%)",
              border: "1px solid hsl(220, 15%, 90%)",
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <div className="px-3 mt-4">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-16 px-6 text-center">
            <div className="text-5xl mb-3">🔍</div>
            <p className="text-sm font-bold text-gray-900">No medicines found</p>
            <p className="text-xs text-gray-500 mt-1">Try a different search or category</p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {items.map((item, idx) => {
                const base = productMap.get(item.id);
                if (!base) return null;
                const discount = item.original ? Math.round(((item.original - item.price) / item.original) * 100) : 0;
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, delay: (idx % 8) * 0.03 }}
                    whileHover={{ y: -5, boxShadow: "0 18px 38px rgba(15, 76, 95, 0.16)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate(`/medicine/product/${item.id}`)}
                    className="relative flex flex-col rounded-2xl overflow-hidden cursor-pointer border border-white/60"
                    style={{
                      background: "linear-gradient(160deg, rgba(255,255,255,0.95) 0%, rgba(240,253,250,0.82) 100%)",
                      backdropFilter: "blur(14px)",
                      boxShadow: "0 6px 20px rgba(15, 76, 95, 0.08)",
                    }}
                  >
                    {discount > 0 && (
                      <span className="absolute top-2 left-2 z-10 text-[9px] font-bold px-2 py-0.5 rounded-md text-white"
                        style={{ background: "linear-gradient(135deg, hsl(0,80%,55%), hsl(15,85%,55%))" }}>
                        {discount}% OFF
                      </span>
                    )}
                    <button
                      onClick={(e) => { e.stopPropagation(); toast.success(`${item.name} added to wishlist`, { duration: 1200 }); }}
                      className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full flex items-center justify-center bg-white/80 border border-white/70"
                      aria-label="Wishlist"
                    >
                      <Heart size={13} className="text-rose-500" />
                    </button>
                    <div className="w-full flex items-center justify-center pt-4 pb-2" style={{ height: 130 }}>
                      <MedicineProductImage productId={item.id} src={base.image} alt={item.name} />
                    </div>
                    <div className="flex-1 flex flex-col px-2.5 pb-2.5">
                      <p className="text-[12px] font-bold leading-tight text-gray-900 line-clamp-1">{item.name}</p>
                      <p className="text-[10px] text-gray-500 leading-tight mt-0.5 line-clamp-1">{item.sub}</p>
                      <div className="flex items-center gap-1 mt-1.5">
                        {renderStars(item.rating)}
                        <span className="text-[10px] font-semibold text-gray-700">{item.rating.toFixed(1)}</span>
                        <span className="text-[10px] text-gray-400">({item.reviews})</span>
                      </div>
                      <div className="flex items-baseline gap-1.5 mt-1.5">
                        <span className="text-[13px] font-extrabold text-gray-900">₹{item.price.toFixed(2)}</span>
                        {item.original && (
                          <span className="text-[10px] line-through text-gray-400">₹{item.original.toFixed(2)}</span>
                        )}
                      </div>
                      <button
                        onClick={(e) => handleAdd(item, e)}
                        className="mt-2 w-full flex items-center justify-center gap-1 py-1.5 rounded-lg text-[11px] font-bold text-white active:scale-95 transition-transform"
                        style={{ background: "linear-gradient(135deg, hsl(150, 75%, 42%) 0%, hsl(170, 80%, 32%) 100%)" }}
                      >
                        <ShoppingCart size={12} /> Add to Cart
                      </button>
                      <div className="flex items-center gap-1 mt-1.5">
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "hsl(150, 75%, 42%)" }} />
                        <span className="text-[9px] font-semibold" style={{ color: TEAL_DARK }}>In Stock</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        )}

        <div className="mt-6 text-center">
          <Link to="/medicine" className="text-[11px] font-bold" style={{ color: TEAL }}>
            ‹ Back to all medicines
          </Link>
        </div>
      </div>

      <BottomNav />
    </motion.div>
  );
};

export default MedicineCategoryPage;
