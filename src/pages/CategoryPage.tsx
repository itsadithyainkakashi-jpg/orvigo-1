import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, SlidersHorizontal, X, Star, ShoppingCart, Search, Loader2, Heart, ShoppingBag, ChevronDown, RotateCcw } from "lucide-react";
import { allProducts, categories } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import BottomNav from "@/components/BottomNav";
import { toast } from "sonner";

const ITEMS_PER_PAGE = 20;

const sortOptions = [
  { label: "Relevance", value: "relevance" },
  { label: "Price: Low to High", value: "low" },
  { label: "Price: High to Low", value: "high" },
  { label: "Popularity", value: "rating" },
  { label: "New Arrivals", value: "new" },
];

const priceRanges = [
  { label: "Under ₹500", min: 0, max: 500 },
  { label: "₹500 – ₹1000", min: 500, max: 1000 },
  { label: "₹1000 – ₹2000", min: 1000, max: 2000 },
  { label: "₹2000+", min: 2000, max: 99999 },
];

const itemSubcategories = [
  { label: "All", filter: "" },
  { label: "Kitchen", filter: "kitchen|kadhai|cooker|tawa|bottle|jug|chopping|mixer|organizer|dinner|grinder" },
  { label: "Accessories", filter: "earring|bracelet|necklace|anklet|watch|sunglasses|wallet|backpack|clutch" },
  { label: "Mobile Covers", filter: "case|cover|phone|grip" },
  { label: "Shoes & Chappal", filter: "sandal|chappal|slipper|flip|crocs|flats|kolhapuri|orthopedic" },
  { label: "Makeup", filter: "lipstick|foundation|compact|mascara|shadow|nail|kajal|bb cream" },
  { label: "Home Decor", filter: "canvas|fairy|cushion|lamp|plant|frame|candle|clock|photo" },
];

const discountOptions = [
  { label: "10%+", min: 10 },
  { label: "25%+", min: 25 },
  { label: "50%+", min: 50 },
];

const routeCategoryMap: Record<string, string> = {
  "/food": "Food",
  "/grocery": "Grocery",
  "/medicine": "Medicine",
  "/shopping": "Items",
};

const CategoryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const routeCat = routeCategoryMap[location.pathname];
  const initialCat = routeCat || searchParams.get("cat") || "All";
  const subFilter = searchParams.get("sub") || "";
  const { totalItems, addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [flyingProduct, setFlyingProduct] = useState<string | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Filter state
  const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedMinRating, setSelectedMinRating] = useState(0);
  const [selectedMinDiscount, setSelectedMinDiscount] = useState(0);

  // Pending filter state (applied on "Apply")
  const [pendingPrice, setPendingPrice] = useState<number | null>(null);
  const [pendingSub, setPendingSub] = useState("");
  const [pendingRating, setPendingRating] = useState(0);
  const [pendingDiscount, setPendingDiscount] = useState(0);

  const openFilters = () => {
    setPendingPrice(selectedPriceRange);
    setPendingSub(selectedSubcategory);
    setPendingRating(selectedMinRating);
    setPendingDiscount(selectedMinDiscount);
    setShowFilters(true);
  };

  const applyFilters = () => {
    setSelectedPriceRange(pendingPrice);
    setSelectedSubcategory(pendingSub);
    setSelectedMinRating(pendingRating);
    setSelectedMinDiscount(pendingDiscount);
    setShowFilters(false);
  };

  const resetFilters = () => {
    setPendingPrice(null);
    setPendingSub("");
    setPendingRating(0);
    setPendingDiscount(0);
  };

  const activeFilterCount = [selectedPriceRange !== null, selectedSubcategory !== "", selectedMinRating > 0, selectedMinDiscount > 0].filter(Boolean).length;

  const filtered = useMemo(() => {
    let items = allProducts.filter((p) => {
      if (selectedCategory !== "All" && p.category !== selectedCategory) return false;

      // Price range
      if (selectedPriceRange !== null) {
        const range = priceRanges[selectedPriceRange];
        if (p.price < range.min || p.price > range.max) return false;
      }

      // Rating
      if (selectedMinRating > 0 && p.rating < selectedMinRating) return false;

      // Discount
      if (selectedMinDiscount > 0 && p.originalPrice) {
        const disc = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
        if (disc < selectedMinDiscount) return false;
      } else if (selectedMinDiscount > 0 && !p.originalPrice) {
        return false;
      }

      return true;
    });

    // Subcategory filter
    const activeSub = selectedSubcategory || subFilter;
    if (activeSub) {
      const regex = new RegExp(activeSub, "i");
      const subFiltered = items.filter((p) => regex.test(p.name) || regex.test(p.description));
      if (subFiltered.length > 0) items = subFiltered;
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }

    // Sort
    if (sortBy === "low") items.sort((a, b) => a.price - b.price);
    else if (sortBy === "high") items.sort((a, b) => b.price - a.price);
    else if (sortBy === "rating") items.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "new") items.sort((a, b) => b.id.localeCompare(a.id));

    return items;
  }, [selectedCategory, sortBy, selectedPriceRange, selectedMinRating, selectedMinDiscount, selectedSubcategory, subFilter, searchQuery]);

  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [selectedCategory, sortBy, selectedPriceRange, selectedMinRating, selectedMinDiscount, selectedSubcategory, searchQuery]);

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

  const handleWishlist = (product: typeof allProducts[0], e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
    toast(isWishlisted(product.id) ? "Removed from wishlist" : "Added to wishlist ❤️", { duration: 1500 });
  };

  return (
    <div className="min-h-screen pb-20" style={{ background: "hsl(210, 20%, 97%)" }}>
      {/* Header */}
      <div
        className="sticky top-0 z-50 px-4 py-3 flex flex-col gap-2"
        style={{ background: "linear-gradient(180deg, hsl(210, 80%, 40%) 0%, hsl(210, 70%, 50%) 100%)" }}
      >
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-white"><ArrowLeft size={22} /></button>
          <h1 className="text-white font-semibold flex-1 text-sm">
            {subFilter ? `${selectedCategory} — ${decodeURIComponent(subFilter).split("|")[0]}` : selectedCategory === "All" ? "All Products" : selectedCategory}
          </h1>
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
        <div className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ background: "hsla(0, 0%, 100%, 0.2)" }}>
          <Search size={14} color="hsla(0, 0%, 100%, 0.7)" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-xs outline-none placeholder:text-white/50 text-white"
          />
        </div>
      </div>

      {/* Category pills — only show on generic filter page */}
      {!routeCat && (
        <div className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={{
                background: selectedCategory === cat ? "hsl(210, 100%, 45%)" : "white",
                color: selectedCategory === cat ? "white" : "hsl(220, 30%, 30%)",
                boxShadow: "0 1px 4px hsla(220,30%,15%,0.08)",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Sort & Filter bar */}
      <div className="px-4 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={openFilters}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium relative"
            style={{ background: "white", color: "hsl(220, 30%, 25%)", boxShadow: "0 1px 4px hsla(220,30%,15%,0.06)" }}
          >
            <SlidersHorizontal size={13} />
            Filters
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white" style={{ background: "hsl(0, 75%, 55%)" }}>
                {activeFilterCount}
              </span>
            )}
          </button>
          <span className="text-[11px]" style={{ color: "hsl(220, 20%, 55%)" }}>{filtered.length} results</span>
        </div>
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
      <div className="px-4 grid grid-cols-2 gap-3 min-h-[calc(100vh-180px)]">
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
            {/* Wishlist heart */}
            <button
              onClick={(e) => handleWishlist(product, e)}
              className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full flex items-center justify-center"
              style={{ background: "hsla(0, 0%, 100%, 0.9)", boxShadow: "0 1px 6px hsla(0,0%,0%,0.1)" }}
            >
              <motion.div whileTap={{ scale: 1.3 }} transition={{ type: "spring", stiffness: 500 }}>
                <Heart
                  size={14}
                  fill={isWishlisted(product.id) ? "hsl(0, 80%, 55%)" : "none"}
                  color={isWishlisted(product.id) ? "hsl(0, 80%, 55%)" : "hsl(220, 15%, 65%)"}
                />
              </motion.div>
            </button>

            <div className="relative aspect-square overflow-hidden">
              <img src={product.image} srcSet={product.imageSrcSet} sizes={product.imageSrcSet ? "(max-width: 768px) 50vw, 400px" : undefined} alt={product.name} loading="lazy" decoding="async" className="w-full h-full object-cover" />
              {product.badge && (
                <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full text-white" style={{ background: "hsl(0, 75%, 55%)" }}>
                  {product.badge}
                </span>
              )}

              {/* Flying animation overlay */}
              <AnimatePresence>
                {flyingProduct === product.id && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center z-20"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0, y: -60, scale: 0.3 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ShoppingBag size={32} style={{ color: "hsl(210, 100%, 45%)" }} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="px-3 py-2">
              <p className="text-xs truncate mb-0.5" style={{ color: "hsl(220, 20%, 35%)" }}>{product.name}</p>
              <div className="flex items-center gap-1.5 mb-0.5">
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
                  className="flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-semibold text-white"
                  style={{ background: "hsl(210, 100%, 45%)" }}
                >
                  <ShoppingCart size={10} />
                  Add
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Infinite scroll sentinel */}
      <div ref={loadMoreRef} className="py-6 flex justify-center">
        {isLoadingMore && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
            <Loader2 size={18} className="animate-spin" style={{ color: "hsl(210, 80%, 50%)" }} />
            <span className="text-xs" style={{ color: "hsl(220, 20%, 50%)" }}>Loading more...</span>
          </motion.div>
        )}
        {!hasMore && filtered.length > 0 && (
          <span className="text-xs" style={{ color: "hsl(220, 15%, 65%)" }}>All {filtered.length} products shown</span>
        )}
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm" style={{ color: "hsl(220, 20%, 50%)" }}>No products found</p>
            <p className="text-xs mt-1" style={{ color: "hsl(220, 15%, 65%)" }}>Try adjusting your filters</p>
          </div>
        )}
      </div>

      {/* Filter panel - slides from left */}
      <AnimatePresence>
        {showFilters && (
          <>
            <motion.div
              className="fixed inset-0 z-[60]"
              style={{ background: "hsla(0,0%,0%,0.4)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFilters(false)}
            />
            <motion.div
              className="fixed top-0 left-0 bottom-0 w-80 z-[70] flex flex-col"
              style={{ background: "white" }}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
            >
              {/* Filter header */}
              <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "hsl(220, 20%, 92%)" }}>
                <h2 className="text-base font-bold" style={{ color: "hsl(220, 40%, 13%)" }}>Filters</h2>
                <button onClick={() => setShowFilters(false)}>
                  <X size={20} style={{ color: "hsl(220, 20%, 50%)" }} />
                </button>
              </div>

              {/* Filter content */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
                {/* Price Range */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "hsl(220, 20%, 40%)" }}>Price Range</h3>
                  <div className="space-y-2">
                    {priceRanges.map((range, idx) => (
                      <label key={idx} className="flex items-center gap-3 cursor-pointer">
                        <div
                          className="w-4 h-4 rounded border-2 flex items-center justify-center transition-all"
                          style={{
                            borderColor: pendingPrice === idx ? "hsl(210, 100%, 45%)" : "hsl(220, 20%, 80%)",
                            background: pendingPrice === idx ? "hsl(210, 100%, 45%)" : "transparent",
                          }}
                          onClick={() => setPendingPrice(pendingPrice === idx ? null : idx)}
                        >
                          {pendingPrice === idx && <span className="text-white text-[10px]">✓</span>}
                        </div>
                        <span className="text-xs" style={{ color: "hsl(220, 20%, 30%)" }}>{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Subcategory */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "hsl(220, 20%, 40%)" }}>Category</h3>
                  <div className="space-y-2">
                    {itemSubcategories.map((sub) => (
                      <label key={sub.label} className="flex items-center gap-3 cursor-pointer">
                        <div
                          className="w-4 h-4 rounded border-2 flex items-center justify-center transition-all"
                          style={{
                            borderColor: pendingSub === sub.filter ? "hsl(210, 100%, 45%)" : "hsl(220, 20%, 80%)",
                            background: pendingSub === sub.filter ? "hsl(210, 100%, 45%)" : "transparent",
                          }}
                          onClick={() => setPendingSub(pendingSub === sub.filter ? "" : sub.filter)}
                        >
                          {pendingSub === sub.filter && <span className="text-white text-[10px]">✓</span>}
                        </div>
                        <span className="text-xs" style={{ color: "hsl(220, 20%, 30%)" }}>{sub.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "hsl(220, 20%, 40%)" }}>Rating</h3>
                  <div className="space-y-2">
                    {[{ label: "4★ & above", value: 4 }, { label: "3★ & above", value: 3 }].map((r) => (
                      <label key={r.value} className="flex items-center gap-3 cursor-pointer">
                        <div
                          className="w-4 h-4 rounded border-2 flex items-center justify-center transition-all"
                          style={{
                            borderColor: pendingRating === r.value ? "hsl(210, 100%, 45%)" : "hsl(220, 20%, 80%)",
                            background: pendingRating === r.value ? "hsl(210, 100%, 45%)" : "transparent",
                          }}
                          onClick={() => setPendingRating(pendingRating === r.value ? 0 : r.value)}
                        >
                          {pendingRating === r.value && <span className="text-white text-[10px]">✓</span>}
                        </div>
                        <span className="text-xs flex items-center gap-1" style={{ color: "hsl(220, 20%, 30%)" }}>
                          {r.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Discount */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "hsl(220, 20%, 40%)" }}>Discount</h3>
                  <div className="space-y-2">
                    {discountOptions.map((d) => (
                      <label key={d.min} className="flex items-center gap-3 cursor-pointer">
                        <div
                          className="w-4 h-4 rounded border-2 flex items-center justify-center transition-all"
                          style={{
                            borderColor: pendingDiscount === d.min ? "hsl(210, 100%, 45%)" : "hsl(220, 20%, 80%)",
                            background: pendingDiscount === d.min ? "hsl(210, 100%, 45%)" : "transparent",
                          }}
                          onClick={() => setPendingDiscount(pendingDiscount === d.min ? 0 : d.min)}
                        >
                          {pendingDiscount === d.min && <span className="text-white text-[10px]">✓</span>}
                        </div>
                        <span className="text-xs" style={{ color: "hsl(220, 20%, 30%)" }}>{d.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Filter footer */}
              <div className="px-5 py-4 border-t flex gap-3" style={{ borderColor: "hsl(220, 20%, 92%)" }}>
                <button
                  onClick={resetFilters}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5"
                  style={{ background: "hsl(210, 20%, 95%)", color: "hsl(220, 30%, 35%)" }}
                >
                  <RotateCcw size={13} /> Reset
                </button>
                <button
                  onClick={applyFilters}
                  className="flex-[2] py-2.5 rounded-xl text-xs font-semibold text-white"
                  style={{ background: "linear-gradient(135deg, hsl(210, 100%, 45%), hsl(210, 80%, 55%))" }}
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <BottomNav />
    </div>
  );
};

export default CategoryPage;
