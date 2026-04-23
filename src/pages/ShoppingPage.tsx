import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ShoppingCart, Search, Star, Heart, SlidersHorizontal, X, ChevronDown, ShoppingBag } from "lucide-react";
import { allProducts } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import BottomNav from "@/components/BottomNav";
import { toast } from "sonner";

const ITEMS_PER_PAGE = 20;

const sortOptions = [
  { label: "Relevance", value: "relevance" },
  { label: "Price: Low ↑", value: "low" },
  { label: "Price: High ↓", value: "high" },
  { label: "Top Rated", value: "rating" },
];

const subcategories = [
  { label: "All", filter: "" },
  { label: "Kitchen", filter: "kitchen|kadhai|cooker|tawa|bottle|jug|chopping|mixer|organizer|dinner|grinder" },
  { label: "Accessories", filter: "earring|bracelet|necklace|anklet|watch|sunglasses|wallet|backpack|clutch" },
  { label: "Phone Cases", filter: "case|cover|phone|grip" },
  { label: "Footwear", filter: "sandal|chappal|slipper|flip|crocs|flats|kolhapuri|orthopedic" },
  { label: "Makeup", filter: "lipstick|foundation|compact|mascara|shadow|nail|kajal|bb cream" },
  { label: "Home Decor", filter: "canvas|fairy|cushion|lamp|plant|frame|candle|clock|photo" },
];

const ShoppingPage = () => {
  const navigate = useNavigate();
  const { totalItems, addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [activeSub, setActiveSub] = useState("All");
  const [sortBy, setSortBy] = useState("relevance");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [flyingProduct, setFlyingProduct] = useState<string | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    let items = allProducts.filter((p) => p.category === "Items");

    if (activeSub !== "All") {
      const sub = subcategories.find((s) => s.label === activeSub);
      if (sub?.filter) {
        const regex = new RegExp(sub.filter, "i");
        items = items.filter((p) => regex.test(p.name + " " + p.description));
      }
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter((p) => p.name.toLowerCase().includes(q));
    }

    if (sortBy === "low") items = [...items].sort((a, b) => a.price - b.price);
    else if (sortBy === "high") items = [...items].sort((a, b) => b.price - a.price);
    else if (sortBy === "rating") items = [...items].sort((a, b) => b.rating - a.rating);

    return items;
  }, [activeSub, sortBy, searchQuery]);

  const visibleProducts = useMemo(() => filtered.slice(0, visibleCount), [filtered, visibleCount]);
  const hasMore = visibleCount < filtered.length;

  const loadMore = useCallback(() => {
    if (!hasMore || isLoadingMore) return;
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, filtered.length));
      setIsLoadingMore(false);
    }, 400);
  }, [hasMore, isLoadingMore, filtered.length]);

  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [activeSub, sortBy, searchQuery]);

  useEffect(() => {
    const el = loadMoreRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) loadMore(); },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [loadMore]);

  const handleAddToCart = (product: typeof allProducts[0], e: React.MouseEvent) => {
    e.stopPropagation();
    setFlyingProduct(product.id);
    addToCart(product, 1);
    toast.success(`${product.name} added to cart`, { duration: 1500 });
    setTimeout(() => setFlyingProduct(null), 600);
  };

  return (
    <div className="min-h-screen pb-20" style={{ background: "hsl(210, 20%, 97%)" }}>
      {/* Header */}
      <div
        className="sticky top-0 z-50 px-4 pt-3 pb-3"
        style={{ background: "linear-gradient(180deg, hsl(210, 80%, 40%) 0%, hsl(210, 70%, 50%) 100%)" }}
      >
        <div className="flex items-center gap-3 mb-2">
          <button onClick={() => navigate(-1)} className="text-white"><ArrowLeft size={22} /></button>
          <h1 className="text-white font-bold text-base flex-1">Shopping</h1>
          <button onClick={() => navigate("/wishlist")} className="text-white"><Heart size={20} /></button>
          <button onClick={() => navigate("/cart")} className="text-white relative">
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <motion.span
                key={totalItems}
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white"
                style={{ background: "hsl(0, 75%, 55%)" }}
              >
                {totalItems}
              </motion.span>
            )}
          </button>
        </div>

        <div
          className="flex items-center gap-2 rounded-xl px-3 py-2.5"
          style={{ background: "hsla(0, 0%, 100%, 0.2)", backdropFilter: "blur(10px)" }}
        >
          <Search size={14} color="hsla(0, 0%, 100%, 0.7)" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-xs outline-none placeholder:text-white/50 text-white"
          />
          <button onClick={() => setShowFilters(true)}>
            <SlidersHorizontal size={16} color="white" />
          </button>
        </div>
      </div>

      {/* Subcategory pills */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto scrollbar-hide">
        {subcategories.map((sub) => (
          <button
            key={sub.label}
            onClick={() => setActiveSub(sub.label)}
            className="flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all"
            style={{
              background: activeSub === sub.label ? "hsl(210, 100%, 45%)" : "white",
              color: activeSub === sub.label ? "white" : "hsl(220, 30%, 30%)",
              boxShadow: "0 1px 4px hsla(220,30%,15%,0.08)",
            }}
          >
            {sub.label}
          </button>
        ))}
      </div>

      {/* Sort bar */}
      <div className="px-4 pb-2 flex items-center justify-between">
        <span className="text-[11px]" style={{ color: "hsl(220, 20%, 55%)" }}>{filtered.length} products</span>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs px-3 py-1.5 rounded-lg border-0 outline-none appearance-none pr-6"
            style={{ background: "white", color: "hsl(220, 30%, 25%)", boxShadow: "0 1px 4px hsla(220,30%,15%,0.06)" }}
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "hsl(220, 20%, 55%)" }} />
        </div>
      </div>

      {/* Product grid */}
      <div className="px-4 grid grid-cols-2 gap-3 min-h-[calc(100vh-200px)]">
        {visibleProducts.map((product, i) => (
          <motion.div
            key={product.id}
            className="rounded-2xl overflow-hidden bg-white cursor-pointer relative"
            style={{ boxShadow: "0 2px 12px hsla(220, 30%, 15%, 0.08)" }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: (i % ITEMS_PER_PAGE) * 0.03 }}
            onClick={() => navigate(`/product/${product.id}`)}
          >
            {/* Heart */}
            <button
              onClick={(e) => { e.stopPropagation(); toggleWishlist(product); toast(isWishlisted(product.id) ? "Removed" : "Added to wishlist ❤️", { duration: 1200 }); }}
              className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full flex items-center justify-center"
              style={{ background: "hsla(0, 0%, 100%, 0.9)" }}
            >
              <Heart size={14} fill={isWishlisted(product.id) ? "hsl(0, 80%, 55%)" : "none"} color={isWishlisted(product.id) ? "hsl(0, 80%, 55%)" : "hsl(220, 15%, 65%)"} />
            </button>

            <div className="relative aspect-square overflow-hidden">
              <img src={product.image} alt={product.name} loading="lazy" className="w-full h-full object-cover" />
              {product.badge && (
                <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full text-white" style={{ background: "hsl(0, 75%, 55%)" }}>
                  {product.badge}
                </span>
              )}
              <AnimatePresence>
                {flyingProduct === product.id && (
                  <motion.div className="absolute inset-0 flex items-center justify-center z-20" initial={{ opacity: 1 }} animate={{ opacity: 0, y: -60, scale: 0.3 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                    <ShoppingBag size={32} style={{ color: "hsl(210, 100%, 45%)" }} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="px-3 py-2">
              <p className="text-xs truncate mb-0.5" style={{ color: "hsl(220, 20%, 35%)" }}>{product.name}</p>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-sm font-bold" style={{ color: "hsl(220, 40%, 13%)" }}>₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-[10px] line-through" style={{ color: "hsl(220, 15%, 60%)" }}>₹{product.originalPrice}</span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-0.5">
                  <Star size={10} fill="hsl(45, 90%, 50%)" color="hsl(45, 90%, 50%)" />
                  <span className="text-[10px] font-medium" style={{ color: "hsl(220, 20%, 45%)" }}>{product.rating}</span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={(e) => handleAddToCart(product, e)}
                  className="px-2.5 py-1 rounded-lg text-[9px] font-bold text-white"
                  style={{ background: "hsl(210, 100%, 45%)" }}
                >
                  Add
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Load more */}
      <div ref={loadMoreRef} className="py-4 flex justify-center">
        {isLoadingMore && <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-5 h-5 border-2 rounded-full" style={{ borderColor: "hsl(210, 100%, 45%)", borderTopColor: "transparent" }} />}
        {!hasMore && filtered.length > 0 && <p className="text-[11px]" style={{ color: "hsl(220, 15%, 60%)" }}>You've seen it all! 🎉</p>}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-sm" style={{ color: "hsl(220, 15%, 55%)" }}>No products found</p>
        </div>
      )}

      {/* Filter panel */}
      <AnimatePresence>
        {showFilters && (
          <>
            <motion.div className="fixed inset-0 z-[60] bg-black/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowFilters(false)} />
            <motion.div className="fixed bottom-0 left-0 right-0 z-[70] rounded-t-2xl p-5 bg-white" initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 300 }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold" style={{ color: "hsl(220, 30%, 15%)" }}>Sort & Filter</h2>
                <button onClick={() => setShowFilters(false)}><X size={20} /></button>
              </div>
              <div className="flex flex-wrap gap-2">
                {sortOptions.map((o) => (
                  <button
                    key={o.value}
                    onClick={() => { setSortBy(o.value); setShowFilters(false); }}
                    className="px-4 py-2 rounded-full text-xs font-medium"
                    style={{ background: sortBy === o.value ? "hsl(210, 100%, 45%)" : "hsl(220, 20%, 95%)", color: sortBy === o.value ? "white" : "hsl(220, 20%, 40%)" }}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <BottomNav />
    </div>
  );
};

export default ShoppingPage;
