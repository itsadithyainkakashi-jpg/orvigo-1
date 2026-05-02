import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Search, Heart, SlidersHorizontal, X, ShoppingCart } from "lucide-react";
import { allProducts } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import BottomNav from "@/components/BottomNav";

import collKurtas from "@/assets/fashion/collection-kurtas.jpg";
import collSarees from "@/assets/fashion/collection-sarees.jpg";
import collDresses from "@/assets/fashion/collection-dresses.jpg";
import collTops from "@/assets/fashion/collection-tops.jpg";

const mainTabs = ["Women", "Men", "Girls", "Boys"] as const;
type MainTab = (typeof mainTabs)[number];

const tabFilters: Record<MainTab, RegExp> = {
  Women: /women|saree|kurti|anarkali|palazzo|ethnic|dress|top/i,
  Men: /men|shirt|polo|jeans|chinos|formal/i,
  Girls: /kids|frock|school|summer/i,
  Boys: /kids|tracksuit|denim jacket|school/i,
};

const collections = [
  { name: "Kurtas", price: "Under ₹599", image: collKurtas },
  { name: "Sarees", price: "Under ₹999", image: collSarees },
  { name: "Dresses", price: "Under ₹799", image: collDresses },
  { name: "Tops", price: "Under ₹499", image: collTops },
];

// Light theme palette - soft orange accents on cream/white
const ORANGE = "hsl(18, 95%, 55%)";
const ORANGE_SOFT = "hsl(18, 100%, 96%)";
const BG = "hsl(30, 25%, 96%)";
const CARD_BG = "hsl(0, 0%, 100%)";
const TEXT_DARK = "hsl(20, 14%, 15%)";
const TEXT_MUTED = "hsl(20, 8%, 45%)";

const FashionPage = () => {
  const navigate = useNavigate();
  const { totalItems, addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [activeTab, setActiveTab] = useState<MainTab>("Women");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");

  const products = useMemo(() => {
    let items = allProducts.filter((p) => p.category === "Fashion").filter((p) => tabFilters[activeTab].test(p.name));
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter((p) => p.name.toLowerCase().includes(q));
    }
    if (sortBy === "low") items = [...items].sort((a, b) => a.price - b.price);
    else if (sortBy === "high") items = [...items].sort((a, b) => b.price - a.price);
    else if (sortBy === "rating") items = [...items].sort((a, b) => b.rating - a.rating);
    return items;
  }, [activeTab, searchQuery, sortBy]);

  const featured = products[0];
  const grid = products.slice(1, 5);
  const trending = products.slice(5);

  return (
    <div className="min-h-screen pb-24" style={{ background: BG }}>
      {/* Featured Hero with overlay header */}
      {featured && (
        <div className="relative">
          <div className="relative h-[340px] overflow-hidden rounded-b-[28px]">
            <img
              src={featured.image}
              alt={featured.name}
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(180deg, hsla(20,14%,15%,0.35) 0%, transparent 30%, transparent 60%, hsla(20,14%,15%,0.55) 100%)" }}
            />
            {/* Top header overlay */}
            <div className="absolute top-0 left-0 right-0 px-4 pt-4 flex items-center justify-between">
              <h1 className="text-white text-base font-bold tracking-tight">Explore Fashion</h1>
              <button
                onClick={() => navigate("/cart")}
                className="relative w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: "hsla(0,0%,100%,0.25)", backdropFilter: "blur(8px)" }}
              >
                <ShoppingBag size={16} color="white" />
                {totalItems > 0 && (
                  <span
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white"
                    style={{ background: ORANGE }}
                  >
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
            {/* Bottom info */}
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <h2 className="text-white text-lg font-bold">{featured.name}</h2>
              <span
                className="px-3 py-1 rounded-full text-[11px] font-bold text-white"
                style={{ background: ORANGE }}
              >
                ₹{featured.price}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Search + Filter row */}
      <div className="px-4 -mt-5 relative z-10">
        <div
          className="flex items-center gap-2 rounded-full px-4 py-2.5"
          style={{ background: CARD_BG, boxShadow: "0 6px 20px hsla(20,14%,15%,0.08)" }}
        >
          <Search size={16} color={TEXT_MUTED} />
          <input
            type="text"
            placeholder="Find your Style"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-xs outline-none"
            style={{ color: TEXT_DARK }}
          />
          <button
            onClick={() => setShowFilters(true)}
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: ORANGE }}
          >
            <SlidersHorizontal size={14} color="white" />
          </button>
        </div>
      </div>

      {/* Category tabs */}
      <div className="px-4 mt-4 flex items-center gap-2 overflow-x-auto scrollbar-hide">
        {mainTabs.map((tab) => {
          const active = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-[12px] font-semibold transition-all"
              style={{
                background: active ? ORANGE : CARD_BG,
                color: active ? "white" : TEXT_DARK,
                boxShadow: active ? "0 4px 12px hsla(18,95%,55%,0.35)" : "0 2px 6px hsla(20,14%,15%,0.05)",
              }}
            >
              {!active && <span style={{ color: ORANGE }}>+</span>}
              {tab}
            </button>
          );
        })}
      </div>

      {/* Product Grid 2-col */}
      {grid.length > 0 && (
        <div className="px-4 mt-4 grid grid-cols-2 gap-3">
          {grid.map((p, i) => {
            const wished = isWishlisted(p.id);
            return (
              <motion.div
                key={p.id}
                onClick={() => navigate(`/product/${p.id}`)}
                className="rounded-2xl overflow-hidden cursor-pointer relative"
                style={{ background: CARD_BG, boxShadow: "0 4px 14px hsla(20,14%,15%,0.06)" }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <div className="relative h-36 overflow-hidden">
                  <img src={p.image} srcSet={p.imageSrcSet} sizes={p.imageSrcSet ? "(max-width: 768px) 50vw, 400px" : undefined} alt={p.name} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleWishlist(p); }}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ background: ORANGE }}
                  >
                    <Heart size={13} fill={wished ? "white" : "none"} color="white" />
                  </button>
                </div>
                <div className="p-2.5">
                  <p className="text-[12px] font-bold truncate" style={{ color: TEXT_DARK }}>{p.name}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: TEXT_MUTED }}>Bloom with elegance</p>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-[12px] font-bold" style={{ color: TEXT_DARK }}>₹{p.price}</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); addToCart(p, 1); }}
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ background: ORANGE }}
                    >
                      <ShoppingCart size={11} color="white" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Style Collections */}
      <div className="px-4 mt-6">
        <h3 className="text-[14px] font-bold mb-3" style={{ color: TEXT_DARK }}>Style Collections</h3>
        <div className="grid grid-cols-2 gap-3">
          {collections.map((c, i) => (
            <motion.div
              key={c.name}
              className="relative rounded-2xl overflow-hidden cursor-pointer"
              style={{ height: 150, boxShadow: "0 4px 14px hsla(20,14%,15%,0.08)" }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              whileTap={{ scale: 0.97 }}
            >
              <img src={c.image} alt={c.name} className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(transparent 45%, hsla(20,14%,15%,0.7))" }} />
              <div className="absolute bottom-2.5 left-2.5 right-2.5">
                <p className="text-white text-[13px] font-bold">{c.name}</p>
                <span
                  className="text-[9px] font-bold px-2 py-0.5 rounded-full mt-1 inline-block text-white"
                  style={{ background: ORANGE }}
                >
                  {c.price}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Trending horizontal scroll */}
      {trending.length > 0 && (
        <div className="mt-6">
          <h3 className="text-[14px] font-bold mb-3 px-4" style={{ color: TEXT_DARK }}>Trending Now</h3>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide px-4 pb-2">
            {trending.map((p, i) => {
              const wished = isWishlisted(p.id);
              return (
                <motion.div
                  key={p.id}
                  onClick={() => navigate(`/product/${p.id}`)}
                  className="flex-shrink-0 w-36 rounded-2xl overflow-hidden cursor-pointer relative"
                  style={{ background: CARD_BG, boxShadow: "0 4px 14px hsla(20,14%,15%,0.06)" }}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="relative h-32 overflow-hidden">
                    <img src={p.image} srcSet={p.imageSrcSet} sizes={p.imageSrcSet ? "144px" : undefined} alt={p.name} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleWishlist(p); }}
                      className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ background: ORANGE }}
                    >
                      <Heart size={11} fill={wished ? "white" : "none"} color="white" />
                    </button>
                  </div>
                  <div className="p-2">
                    <p className="text-[11px] font-bold truncate" style={{ color: TEXT_DARK }}>{p.name}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[11px] font-bold" style={{ color: TEXT_DARK }}>₹{p.price}</span>
                      <span
                        className="text-[8px] font-bold px-1.5 py-0.5 rounded-full text-white"
                        style={{ background: ORANGE_SOFT, color: ORANGE }}
                      >
                        NEW
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {products.length === 0 && (
        <div className="text-center py-16">
          <p className="text-sm" style={{ color: TEXT_MUTED }}>No products found</p>
        </div>
      )}

      {/* Filter sheet */}
      <AnimatePresence>
        {showFilters && (
          <>
            <motion.div
              className="fixed inset-0 z-[60]"
              style={{ background: "hsla(20,14%,15%,0.5)" }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowFilters(false)}
            />
            <motion.div
              className="fixed bottom-0 left-0 right-0 z-[70] rounded-t-3xl p-5"
              style={{ background: CARD_BG }}
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold" style={{ color: TEXT_DARK }}>Sort & Filter</h2>
                <button onClick={() => setShowFilters(false)}><X size={20} color={TEXT_MUTED} /></button>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {[
                  { label: "Relevance", value: "relevance" },
                  { label: "Price: Low ↑", value: "low" },
                  { label: "Price: High ↓", value: "high" },
                  { label: "Top Rated", value: "rating" },
                ].map((o) => (
                  <button
                    key={o.value}
                    onClick={() => { setSortBy(o.value); setShowFilters(false); }}
                    className="px-4 py-2 rounded-full text-xs font-semibold transition-colors"
                    style={{
                      background: sortBy === o.value ? ORANGE : ORANGE_SOFT,
                      color: sortBy === o.value ? "white" : ORANGE,
                    }}
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

export default FashionPage;
