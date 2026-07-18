import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Search,
  Plus,
  Minus,
  Zap,
  Star,
  ChevronRight,
  Tag,
  ShieldCheck,
  Leaf,
  Clock,
  Heart,
} from "lucide-react";
import { useCart, type Product } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import BottomNav from "@/components/BottomNav";
import GroceryProductImage from "@/components/GroceryProductImage";
import { toast } from "sonner";
import {
  GROCERY_CATEGORIES,
  GROCERY_BY_CATEGORY,
  GROCERY_BESTSELLERS,
  GROCERY_RECOMMENDED,
  GROCERY_PRODUCTS,
  type GroceryItem,
  type GroceryCategoryId,
} from "@/data/groceryProducts";
import heroBanner from "@/assets/grocery/grocery-hero-banner.jpg";
import cardVegetables from "@/assets/grocery/cards/vegetables.png";
import cardFruits from "@/assets/grocery/cards/fruits.png";
import cardMeatFish from "@/assets/grocery/cards/meat-fish.png";
import cardDairyEggs from "@/assets/grocery/cards/dairy-eggs.png";
import cardRiceGrains from "@/assets/grocery/cards/rice-grains.png";
import cardMasalaSpices from "@/assets/grocery/cards/masala-spices.png";
import cardSnacksPackaged from "@/assets/grocery/cards/snacks-packaged.png";
import cardBeverages from "@/assets/grocery/cards/beverages.png";
import cardHousehold from "@/assets/grocery/cards/household.png";
import cardPersonalCare from "@/assets/grocery/cards/personal-care.png";
import cardBabyCare from "@/assets/grocery/cards/baby-care.png";
import cardPetCare from "@/assets/grocery/cards/pet-care.png";

const CATEGORY_CARD_IMAGES: Partial<Record<GroceryCategoryId, string>> = {
  vegetables: cardVegetables,
  fruits: cardFruits,
  "meat-fish": cardMeatFish,
  "dairy-eggs": cardDairyEggs,
  grains: cardRiceGrains,
  spices: cardMasalaSpices,
  snacks: cardSnacksPackaged,
  beverages: cardBeverages,
  household: cardHousehold,
  "personal-care": cardPersonalCare,
  "baby-care": cardBabyCare,
  "pet-care": cardPetCare,
};

const GREEN = "hsl(145, 65%, 38%)";
const GREEN_DARK = "hsl(155, 70%, 32%)";

const GroceryPage = () => {
  const navigate = useNavigate();
  const { totalItems, addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [searchQuery, setSearchQuery] = useState("");
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [] as GroceryItem[];
    return GROCERY_PRODUCTS.filter(
      (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    ).slice(0, 30);
  }, [searchQuery]);

  const updateQty = (id: string, delta: number) => {
    setQuantities((prev) => {
      const next = { ...prev };
      next[id] = Math.max(0, (next[id] || 0) + delta);
      if (next[id] === 0) delete next[id];
      return next;
    });
  };

  const handleAdd = (product: GroceryItem) => {
    setQuantities((prev) => ({ ...prev, [product.id]: (prev[product.id] || 0) + 1 }));
    addToCart(product as Product, 1);
    toast.success(`${product.name} added`, { duration: 1200 });
  };

  const goToCategory = (id: GroceryCategoryId) =>
    navigate(`/grocery/category/${id}`);

  /* ------------------------------ UI: cards ------------------------------ */

  const ProductCard = ({ p, index = 0 }: { p: GroceryItem; index?: number }) => {
    const qty = quantities[p.id] || 0;
    const wished = isWishlisted(p.id);
    return (
      <motion.div
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: (index % 8) * 0.03 }}
        onClick={() => navigate(`/product/${p.id}`)}
        className="relative rounded-2xl overflow-hidden cursor-pointer flex flex-col"
        style={{
          background: "rgba(255,255,255,0.94)",
          backdropFilter: "blur(14px)",
          border: "1px solid rgba(255,255,255,0.7)",
          boxShadow: "0 6px 20px rgba(20, 80, 40, 0.10)",
        }}
      >
        {/* Discount badge */}
        {p.discount > 0 && (
          <span
            className="absolute top-1.5 left-1.5 z-10 text-[9px] font-bold px-1.5 py-0.5 rounded-md text-white"
            style={{ background: "linear-gradient(135deg, hsl(145, 65%, 38%), hsl(155, 70%, 32%))" }}
          >
            {p.discount}% OFF
          </span>
        )}
        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(p as Product);
          }}
          className="absolute top-1.5 right-1.5 z-10 w-7 h-7 rounded-full flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.92)", boxShadow: "0 2px 6px rgba(0,0,0,0.08)" }}
          aria-label="Wishlist"
        >
          <Heart size={13} fill={wished ? "hsl(0, 75%, 55%)" : "transparent"} color={wished ? "hsl(0, 75%, 55%)" : "hsl(220, 15%, 40%)"} />
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
            <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded" style={{ background: "hsl(145, 50%, 92%)", color: GREEN_DARK }}>
              <Star size={9} fill={GREEN_DARK} stroke={GREEN_DARK} />
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
                  style={{ background: GREEN }}
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
                  style={{ background: GREEN }}
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
                style={{ borderColor: GREEN, color: GREEN, background: "white" }}
              >
                ADD
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  const Section = ({
    title,
    items,
    catId,
    accent,
  }: {
    title: string;
    items: GroceryItem[];
    catId?: GroceryCategoryId;
    accent?: string;
  }) => (
    <section className="px-3 mt-5">
      <div className="flex items-center justify-between mb-2.5">
        <h2 className="text-[15px] font-bold text-foreground">{title}</h2>
        {catId && (
          <button
            onClick={() => goToCategory(catId)}
            className="flex items-center gap-0.5 text-[11px] font-semibold"
            style={{ color: accent ?? GREEN }}
          >
            View All <ChevronRight size={14} />
          </button>
        )}
      </div>
      <div className="flex gap-2.5 overflow-x-auto -mx-3 px-3 pb-2 scrollbar-none snap-x snap-mandatory">
        {items.slice(0, 10).map((p, i) => (
          <div key={p.id} className="snap-start shrink-0 w-[42vw] max-w-[170px]">
            <ProductCard p={p} index={i} />
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div className="min-h-screen pb-24" style={{ background: "hsl(120, 30%, 98%)" }}>
      {/* ───────────────────────────── HEADER ───────────────────────────── */}
      <div
        className="sticky top-0 z-50 px-4 pt-3 pb-3"
        style={{ background: "linear-gradient(135deg, hsl(145, 65%, 38%) 0%, hsl(160, 60%, 40%) 100%)" }}
      >
        <div className="flex items-center gap-3 mb-2.5">
          <div className="flex-1 min-w-0">
            <h1 className="text-white font-bold text-base leading-tight">Grocery</h1>
            <p className="text-white/80 text-[10px] flex items-center gap-1">
              <Zap size={10} /> Delivery in 10 min · Home
            </p>
          </div>
          <button onClick={() => navigate("/cart")} className="text-white relative">
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <motion.span
                key={totalItems}
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white"
                style={{ background: "hsl(0, 75%, 50%)" }}
              >
                {totalItems}
              </motion.span>
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
            placeholder='Search "milk", "bread", "apples"…'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-xs outline-none placeholder:text-white/65 text-white"
          />
        </div>
      </div>

      {/* ───────────────────────────── HERO BANNER ───────────────────────────── */}
      {!searchQuery && (
        <div className="px-3 pt-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative rounded-3xl overflow-hidden"
            style={{ boxShadow: "0 14px 36px rgba(20, 80, 40, 0.22)" }}
          >
            <img
              src={heroBanner}
              alt="Fresh groceries delivered in 10 minutes"
              className="w-full h-52 object-cover"
            />
            {/* gradient veil */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(115deg, rgba(10,90,40,0.85) 0%, rgba(20,140,60,0.55) 45%, rgba(255,180,40,0.18) 75%, rgba(255,140,40,0.05) 100%)",
              }}
            />
            {/* glass content panel */}
            <div className="absolute inset-0 flex flex-col justify-center px-4">
              <motion.span
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="self-start inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full mb-2"
                style={{
                  background: "rgba(255,255,255,0.95)",
                  color: "hsl(145, 70%, 28%)",
                  backdropFilter: "blur(6px)",
                }}
              >
                <Zap size={9} className="text-yellow-500" fill="currentColor" /> 10 MIN DELIVERY
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-white font-extrabold text-[20px] leading-[1.1] max-w-[78%]"
                style={{ textShadow: "0 2px 12px rgba(0,0,0,0.45)" }}
              >
                Fresh Groceries<br />Delivered in 10 Minutes
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.32 }}
                className="text-white/95 text-[10.5px] font-medium mt-1.5 max-w-[78%]"
                style={{ textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}
              >
                Fresh · Healthy · Affordable · Fast Delivery
              </motion.p>
              <motion.button
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  document.getElementById("shop-by-category")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="mt-3 self-start inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[12px] font-bold"
                style={{
                  background: "linear-gradient(135deg, #ffffff 0%, #f8fff4 100%)",
                  color: "hsl(145, 70%, 28%)",
                  boxShadow: "0 6px 16px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.9)",
                }}
              >
                Shop Now <ChevronRight size={14} />
              </motion.button>
            </div>
            {/* floating accent dots */}
            <motion.div
              className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(255,220,80,0.55), transparent 65%)" }}
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </motion.div>
        </div>
      )}


      {/* ───────────────────────────── SEARCH RESULTS ───────────────────────────── */}
      {searchQuery && (
        <div className="px-3 pt-3">
          <p className="text-xs text-muted-foreground mb-2">
            {searchResults.length} result{searchResults.length === 1 ? "" : "s"} for "{searchQuery}"
          </p>
          {searchResults.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-4xl mb-2">🔍</p>
              <p className="text-sm text-muted-foreground">No groceries match your search</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2.5">
              {searchResults.map((p, i) => (
                <ProductCard key={p.id} p={p} index={i} />
              ))}
            </div>
          )}
        </div>
      )}

      {!searchQuery && (
        <>
          {/* ──────────────────────── SHOP BY CATEGORY ──────────────────────── */}
          <section id="shop-by-category" className="px-3 mt-5 scroll-mt-24">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-[16px] font-extrabold text-foreground leading-tight">Shop by Category</h2>
                <p className="text-[10.5px] text-muted-foreground mt-0.5">Everything you need, delivered fast</p>
              </div>
              <span className="text-[10px] font-semibold text-muted-foreground">{GROCERY_CATEGORIES.length} categories</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {GROCERY_CATEGORIES.map((c, i) => (
                <motion.button
                  key={c.id}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.96 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03, type: "spring", stiffness: 220, damping: 22 }}
                  onClick={() => goToCategory(c.id)}
                  aria-label={`Shop ${c.label}`}
                  className="relative rounded-[20px] overflow-hidden text-left flex flex-col"
                  style={{
                    aspectRatio: "1 / 1.15",
                    background: `linear-gradient(160deg, ${c.tint} 0%, ${c.tintEnd} 100%)`,
                    border: "1px solid rgba(255,255,255,0.9)",
                    boxShadow: "0 6px 18px rgba(20, 40, 20, 0.10), 0 1px 2px rgba(20, 40, 20, 0.05), inset 0 1px 0 rgba(255,255,255,0.85)",
                  }}
                >
                  <div className="relative px-2.5 pt-2 pb-1 z-10">
                    <div
                      className="text-[11.5px] font-extrabold leading-tight tracking-tight truncate"
                      style={{ color: c.accent }}
                    >
                      {c.label}
                    </div>
                    <div className="text-[9px] font-semibold mt-0.5" style={{ color: "hsl(220, 12%, 38%)" }}>
                      {c.itemCount}
                    </div>
                  </div>

                  <div className="relative flex-1 flex items-center justify-center px-2 pb-8 pt-1">
                    <img
                      src={c.image}
                      alt={c.label}
                      loading="lazy"
                      decoding="async"
                      className="max-w-full max-h-full w-auto h-auto object-contain"
                      style={{
                        filter: "drop-shadow(0 4px 8px rgba(20, 40, 20, 0.18))",
                        imageRendering: "auto",
                      }}
                    />
                  </div>

                  <div
                    className="absolute bottom-2 left-2 w-7 h-7 rounded-full flex items-center justify-center z-10"
                    style={{
                      background: c.accent,
                      boxShadow: `0 3px 8px ${c.accent}55, inset 0 1px 0 rgba(255,255,255,0.35)`,
                    }}
                  >
                    <ChevronRight size={14} color="white" strokeWidth={3} />
                  </div>
                </motion.button>
              ))}
            </div>
          </section>



          {/* ──────────────────────── FLAT 20% OFFER CARD ──────────────────────── */}
          <section className="px-3 mt-5">
            <div
              className="rounded-2xl px-4 py-4 flex items-center justify-between"
              style={{
                background: "linear-gradient(135deg, hsl(45, 95%, 60%) 0%, hsl(35, 95%, 55%) 100%)",
                boxShadow: "0 10px 24px rgba(220, 150, 0, 0.25)",
              }}
            >
              <div>
                <p className="text-[10px] font-bold tracking-wider" style={{ color: "hsl(35, 80%, 20%)" }}>
                  LIMITED TIME
                </p>
                <h3 className="text-xl font-extrabold leading-tight" style={{ color: "hsl(35, 80%, 18%)" }}>
                  Flat 20% OFF
                </h3>
                <p className="text-[11px] font-medium" style={{ color: "hsl(35, 70%, 25%)" }}>
                  On your first 3 grocery orders
                </p>
              </div>
              <div className="text-4xl">🛒</div>
            </div>
          </section>

          {/* ──────────────────────── BEST SELLERS ──────────────────────── */}
          {GROCERY_BESTSELLERS.length > 0 && (
            <Section title="🔥 Best Sellers" items={GROCERY_BESTSELLERS} />
          )}

          {/* ──────────────────────── RECOMMENDED ──────────────────────── */}
          {GROCERY_RECOMMENDED.length > 0 && (
            <Section title="✨ Recommended for You" items={GROCERY_RECOMMENDED} />
          )}

          {/* ──────────────────────── CATEGORY PREVIEWS ──────────────────────── */}
          {GROCERY_CATEGORIES.map((c) => {
            const items = GROCERY_BY_CATEGORY[c.id];
            if (!items?.length) return null;
            return (
              <Section
                key={c.id}
                title={`${c.icon} ${c.label}`}
                items={items}
                catId={c.id}
                accent={c.accent}
              />
            );
          })}

          {/* ──────────────────────── TRUST BADGES ──────────────────────── */}
          <section className="px-3 mt-6">
            <div
              className="rounded-2xl p-4 grid grid-cols-3 gap-3"
              style={{
                background: "rgba(255,255,255,0.92)",
                border: "1px solid rgba(20, 80, 40, 0.08)",
                boxShadow: "0 6px 18px rgba(20, 80, 40, 0.08)",
              }}
            >
              {[
                { icon: Leaf, label: "100% Fresh", sub: "Farm sourced" },
                { icon: Zap, label: "10-min Delivery", sub: "Lightning fast" },
                { icon: ShieldCheck, label: "Best Prices", sub: "Lowest in town" },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center text-center gap-1">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center"
                    style={{ background: "hsl(145, 50%, 94%)" }}
                  >
                    <Icon size={16} color={GREEN_DARK} />
                  </div>
                  <p className="text-[11px] font-bold text-foreground leading-tight">{label}</p>
                  <p className="text-[9px] text-muted-foreground leading-tight">{sub}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      <BottomNav />
    </div>
  );
};

export default GroceryPage;
