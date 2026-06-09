import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Search,
  ShoppingCart,
  Star,
  Plus,
  Minus,
  Heart,
  Clock,
  SlidersHorizontal,
} from "lucide-react";
import { useCart, type Product } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import BottomNav from "@/components/BottomNav";
import GroceryProductImage from "@/components/GroceryProductImage";
import { toast } from "sonner";
import {
  GROCERY_BY_CATEGORY,
  GROCERY_CATEGORY_BY_ID,
  type GroceryCategoryId,
  type GroceryItem,
} from "@/data/groceryProducts";

type SortKey = "popular" | "price-asc" | "price-desc" | "discount";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "popular", label: "Popular" },
  { key: "price-asc", label: "Price ↑" },
  { key: "price-desc", label: "Price ↓" },
  { key: "discount", label: "Discount" },
];

const GroceryCategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: GroceryCategoryId }>();
  const navigate = useNavigate();
  const { totalItems, addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortKey>("popular");
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const category = categoryId ? GROCERY_CATEGORY_BY_ID[categoryId] : undefined;
  const baseItems: GroceryItem[] = categoryId ? GROCERY_BY_CATEGORY[categoryId] ?? [] : [];

  const items = useMemo(() => {
    let list = baseItems;
    const q = search.trim().toLowerCase();
    if (q) list = list.filter((p) => p.name.toLowerCase().includes(q));
    const arr = [...list];
    switch (sort) {
      case "price-asc": arr.sort((a, b) => a.price - b.price); break;
      case "price-desc": arr.sort((a, b) => b.price - a.price); break;
      case "discount": arr.sort((a, b) => b.discount - a.discount); break;
      default: arr.sort((a, b) => Number(!!b.bestseller) - Number(!!a.bestseller));
    }
    return arr;
  }, [baseItems, search, sort]);

  const updateQty = (id: string, delta: number) =>
    setQuantities((prev) => {
      const next = { ...prev };
      next[id] = Math.max(0, (next[id] || 0) + delta);
      if (next[id] === 0) delete next[id];
      return next;
    });

  const handleAdd = (p: GroceryItem) => {
    setQuantities((prev) => ({ ...prev, [p.id]: (prev[p.id] || 0) + 1 }));
    addToCart(p as Product, 1);
    toast.success(`${p.name} added`, { duration: 1200 });
  };

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 text-center">
        <div>
          <p className="text-4xl mb-2">🤷</p>
          <p className="text-sm text-muted-foreground mb-4">Category not found</p>
          <button
            onClick={() => navigate("/grocery")}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
            style={{ background: "hsl(145, 65%, 38%)" }}
          >
            Back to Grocery
          </button>
        </div>
      </div>
    );
  }

  const GREEN = "hsl(145, 65%, 38%)";

  return (
    <div className="min-h-screen pb-24" style={{ background: "hsl(120, 30%, 98%)" }}>
      {/* Header */}
      <div
        className="sticky top-0 z-50 px-4 pt-3 pb-3"
        style={{ background: `linear-gradient(135deg, ${category.accent} 0%, hsl(155, 70%, 32%) 100%)` }}
      >
        <div className="flex items-center gap-3 mb-2.5">
          <button onClick={() => navigate("/grocery")} className="text-white" aria-label="Back">
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-white font-bold text-base leading-tight flex items-center gap-1.5">
              <span>{category.icon}</span> {category.label}
            </h1>
            <p className="text-white/85 text-[10px]">{baseItems.length} products</p>
          </div>
          <button onClick={() => navigate("/cart")} className="text-white relative">
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span
                className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white"
                style={{ background: "hsl(0, 75%, 50%)" }}
              >
                {totalItems}
              </span>
            )}
          </button>
        </div>
        <div
          className="flex items-center gap-2 rounded-xl px-3 py-2.5"
          style={{ background: "hsla(0, 0%, 100%, 0.22)", backdropFilter: "blur(12px)" }}
        >
          <Search size={14} color="hsla(0, 0%, 100%, 0.85)" />
          <input
            type="text"
            placeholder={`Search in ${category.label}`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-xs outline-none placeholder:text-white/65 text-white"
          />
        </div>
      </div>

      {/* Sort row */}
      <div className="px-3 pt-3">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1 text-[11px] font-semibold text-muted-foreground shrink-0">
            <SlidersHorizontal size={12} /> Sort
          </div>
          {SORTS.map((s) => {
            const active = s.key === sort;
            return (
              <button
                key={s.key}
                onClick={() => setSort(s.key)}
                className="px-3 py-1 rounded-full text-[11px] font-semibold shrink-0 transition-all"
                style={{
                  background: active ? category.accent : "white",
                  color: active ? "white" : "hsl(220, 20%, 25%)",
                  border: `1px solid ${active ? category.accent : "hsl(120, 30%, 90%)"}`,
                  boxShadow: active ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
                }}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      <div className="px-3 pt-3">
        {items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-2">🔍</p>
            <p className="text-sm text-muted-foreground">No items match your search</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2.5">
            <AnimatePresence>
              {items.map((p, i) => {
                const qty = quantities[p.id] || 0;
                const wished = isWishlisted(p.id);
                return (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: (i % 8) * 0.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate(`/product/${p.id}`)}
                    className="relative rounded-2xl overflow-hidden cursor-pointer flex flex-col"
                    style={{
                      background: "rgba(255,255,255,0.95)",
                      backdropFilter: "blur(14px)",
                      border: "1px solid rgba(255,255,255,0.7)",
                      boxShadow: "0 6px 20px rgba(20, 80, 40, 0.10)",
                    }}
                  >
                    {p.discount > 0 && (
                      <span
                        className="absolute top-1.5 left-1.5 z-10 text-[9px] font-bold px-1.5 py-0.5 rounded-md text-white"
                        style={{ background: category.accent }}
                      >
                        {p.discount}% OFF
                      </span>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(p as Product);
                      }}
                      className="absolute top-1.5 right-1.5 z-10 w-7 h-7 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(255,255,255,0.92)", boxShadow: "0 2px 6px rgba(0,0,0,0.08)" }}
                      aria-label="Wishlist"
                    >
                      <Heart
                        size={13}
                        fill={wished ? "hsl(0, 75%, 55%)" : "transparent"}
                        color={wished ? "hsl(0, 75%, 55%)" : "hsl(220, 15%, 40%)"}
                      />
                    </button>

                    <div className="relative aspect-square p-3">
                      <GroceryProductImage productId={p.id} src={p.image} alt={p.name} />
                    </div>

                    <div className="px-2.5 pb-2.5 pt-0 flex-1 flex flex-col">
                      <div className="flex items-center gap-1 mb-0.5 text-[9px] font-semibold" style={{ color: GREEN }}>
                        <Clock size={9} /> {p.deliveryMins} MIN
                      </div>
                      <p className="text-[12px] font-semibold leading-tight text-foreground line-clamp-2 min-h-[28px]">
                        {p.name}
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{p.weight}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <span
                          className="inline-flex items-center gap-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded"
                          style={{ background: "hsl(145, 50%, 92%)", color: "hsl(155, 70%, 32%)" }}
                        >
                          <Star size={9} fill="hsl(155, 70%, 32%)" stroke="hsl(155, 70%, 32%)" />
                          {p.rating.toFixed(1)}
                        </span>
                        <span className="text-[9px]" style={{ color: p.inStock ? GREEN : "hsl(0, 70%, 50%)" }}>
                          {p.inStock ? "• In stock" : "• Out"}
                        </span>
                      </div>
                      <div className="flex items-end justify-between mt-1.5">
                        <div className="flex flex-col">
                          <span className="text-[14px] font-bold leading-none text-foreground">₹{p.price}</span>
                          {p.originalPrice > p.price && (
                            <span className="text-[10px] line-through text-muted-foreground">₹{p.originalPrice}</span>
                          )}
                        </div>
                        {qty > 0 ? (
                          <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                            <motion.button
                              whileTap={{ scale: 0.85 }}
                              onClick={() => updateQty(p.id, -1)}
                              className="w-6 h-6 rounded-md flex items-center justify-center"
                              style={{ background: category.accent }}
                            >
                              <Minus size={11} color="white" />
                            </motion.button>
                            <span className="text-[11px] font-bold w-4 text-center text-foreground">{qty}</span>
                            <motion.button
                              whileTap={{ scale: 0.85 }}
                              onClick={() => {
                                updateQty(p.id, 1);
                                addToCart(p as Product, 1);
                              }}
                              className="w-6 h-6 rounded-md flex items-center justify-center"
                              style={{ background: category.accent }}
                            >
                              <Plus size={11} color="white" />
                            </motion.button>
                          </div>
                        ) : (
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAdd(p);
                            }}
                            className="px-2.5 py-1 rounded-lg text-[10px] font-bold border-2"
                            style={{ borderColor: category.accent, color: category.accent, background: "white" }}
                          >
                            ADD
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default GroceryCategoryPage;
