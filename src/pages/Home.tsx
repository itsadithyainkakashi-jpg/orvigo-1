import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Package, User, Search, Mic, Heart, Star, Plus, MapPin } from "lucide-react";
import { toast } from "sonner";
import BottomNav from "@/components/BottomNav";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { allProducts } from "@/data/products";
import heroMega from "@/assets/hero-megasale.jpg";
import heroFood from "@/assets/hero-food.jpg";
import heroFashion from "@/assets/hero-fashion.jpg";
import heroGrocery from "@/assets/hero-grocery.jpg";
import catFoodImg from "@/assets/cat-food.jpg";
import catGroceryImg from "@/assets/cat-grocery.jpg";
import catFashionImg from "@/assets/cat-fashion.jpg";
import catMedicineImg from "@/assets/cat-medicine.jpg";

const banners = [
  { img: heroMega, title: "Mega Sale", subtitle: "Up to 50% OFF on everything", cta: "Shop Now", route: "/categories" },
  { img: heroFashion, title: "Festive Fashion", subtitle: "Premium ethnic & western", cta: "Explore", route: "/fashion" },
  { img: heroFood, title: "Hungry?", subtitle: "Hot meals in 30 min", cta: "Order Food", route: "/food" },
  { img: heroGrocery, title: "Fresh Daily", subtitle: "Groceries delivered fast", cta: "Shop Grocery", route: "/grocery" },
];

const categories = [
  { img: catFoodImg, label: "Food", route: "/food", glow: "hsl(25 95% 55%)" },
  { img: catGroceryImg, label: "Grocery", route: "/grocery", glow: "hsl(145 70% 50%)" },
  { img: catFashionImg, label: "Dress", route: "/fashion", glow: "hsl(280 80% 60%)" },
  { img: catMedicineImg, label: "Medicine", route: "/medicine", glow: "hsl(190 90% 55%)" },
];

const sections = [
  { key: "trending", title: "🔥 Trending Now", filter: (p: typeof allProducts[0]) => p.rating >= 4.5 },
  { key: "deals", title: "💸 Pocket-Friendly Deals", filter: (p: typeof allProducts[0]) => p.price <= 500 },
  { key: "premium", title: "✨ Premium Collections", filter: (p: typeof allProducts[0]) => p.price >= 1500 },
  { key: "new", title: "🆕 New Arrivals", filter: () => true },
];

const ImgWithSkeleton = ({ src, alt, className, eager }: { src: string; alt: string; className: string; eager?: boolean }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && <div className="absolute inset-0 animate-pulse" style={{ background: "hsla(210, 40%, 95%, 0.06)" }} />}
      <img
        src={src} alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
};

const BannerCarousel = ({ navigate }: { navigate: (p: string) => void }) => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % banners.length), 4000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="px-4">
      <div className="relative h-44 rounded-3xl overflow-hidden glass-card-strong">
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ImgWithSkeleton src={banners[idx].img} alt={banners[idx].title} className="absolute inset-0 w-full h-full" eager={idx === 0} />
            <div className="absolute inset-0" style={{
              background: "linear-gradient(90deg, hsla(220, 50%, 8%, 0.85) 0%, hsla(220, 50%, 8%, 0.35) 60%, transparent 100%)",
            }} />
            <div className="absolute inset-0 p-5 flex flex-col justify-center">
              <p className="text-[11px] uppercase tracking-widest text-white/70 font-semibold">Limited Time</p>
              <h2 className="text-2xl font-bold text-white mt-1" style={{ textShadow: "0 2px 12px hsla(0,0%,0%,0.5)" }}>
                {banners[idx].title}
              </h2>
              <p className="text-xs text-white/80 mt-1">{banners[idx].subtitle}</p>
              <motion.button
                whileTap={{ scale: 0.94 }}
                onClick={() => navigate(banners[idx].route)}
                className="mt-3 self-start px-4 py-2 rounded-full text-xs font-bold text-white"
                style={{
                  background: "linear-gradient(135deg, hsl(25 95% 55%), hsl(15 90% 55%))",
                  boxShadow: "0 6px 20px hsl(25 95% 55% / 0.5)",
                }}
              >
                {banners[idx].cta} →
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
          {banners.map((_, i) => (
            <motion.button
              key={i} onClick={() => setIdx(i)}
              animate={{ width: i === idx ? 18 : 6 }}
              className="h-1.5 rounded-full"
              style={{ background: i === idx ? "white" : "hsla(0,0%,100%,0.4)" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ product, navigate }: { product: typeof allProducts[0]; navigate: (p: string) => void }) => {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const inWish = isWishlisted(product.id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      onClick={() => navigate(`/product/${product.id}`)}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.97 }}
      className="shrink-0 w-40 rounded-2xl overflow-hidden glass-card cursor-pointer"
    >
      <div className="relative">
        <ImgWithSkeleton src={product.image} alt={product.name} className="w-full h-32" />
        {discount > 0 && (
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-bold text-white"
            style={{ background: "hsl(0 80% 55%)", boxShadow: "0 4px 12px hsl(0 80% 55% / 0.5)" }}>
            {discount}% OFF
          </span>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
          className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center"
          style={{ background: "hsla(0,0%,0%,0.4)", backdropFilter: "blur(8px)" }}
        >
          <Heart size={14} className={inWish ? "fill-red-500 text-red-500" : "text-white"} />
        </button>
      </div>
      <div className="p-2.5">
        <p className="text-xs font-semibold text-foreground line-clamp-1">{product.name}</p>
        <div className="flex items-center gap-1 mt-1">
          <Star size={10} className="fill-yellow-400 text-yellow-400" />
          <span className="text-[10px] text-muted-foreground">{product.rating}</span>
        </div>
        <div className="flex items-center justify-between mt-1.5">
          <div>
            <span className="text-sm font-bold text-foreground">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-[10px] text-muted-foreground line-through ml-1">₹{product.originalPrice}</span>
            )}
          </div>
          <motion.button
            onClick={(e) => { e.stopPropagation(); addToCart(product, 1); toast.success(`${product.name} added`); }}
            whileTap={{ scale: 0.85 }}
            className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, hsl(210 100% 55%), hsl(200 90% 52%))",
              boxShadow: "0 4px 12px hsl(210 100% 55% / 0.4)",
            }}
          >
            <Plus size={14} className="text-white" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const ProductSection = ({ title, items, navigate }: { title: string; items: typeof allProducts; navigate: (p: string) => void }) => (
  <div className="mt-6">
    <div className="flex items-center justify-between px-4 mb-3">
      <h3 className="text-base font-bold text-foreground">{title}</h3>
      <button onClick={() => navigate("/categories")} className="text-xs font-semibold" style={{ color: "hsl(210 100% 65%)" }}>
        See All →
      </button>
    </div>
    <div className="flex gap-3 overflow-x-auto px-4 pb-2" style={{ scrollbarWidth: "none" }}>
      {items.map((p) => <ProductCard key={p.id} product={p} navigate={navigate} />)}
    </div>
  </div>
);

const IconBtn = ({ icon: Icon, onClick, badge }: { icon: React.ElementType; onClick: () => void; badge?: number }) => (
  <motion.button
    onClick={onClick} whileTap={{ scale: 0.85 }}
    className="relative w-9 h-9 rounded-full flex items-center justify-center"
    style={{ background: "hsla(210, 40%, 95%, 0.08)", border: "1px solid hsla(210, 40%, 95%, 0.12)" }}
  >
    <Icon size={16} className="text-foreground" />
    {badge !== undefined && badge > 0 && (
      <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full text-[9px] font-bold text-white flex items-center justify-center"
        style={{ background: "hsl(25 95% 55%)", boxShadow: "0 2px 8px hsl(25 95% 55% / 0.6)" }}>
        {badge}
      </span>
    )}
  </motion.button>
);

const Home = () => {
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const searchRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen pb-24 bg-background">
      {/* Sticky Glass Header */}
      <div className="sticky top-0 z-40 glass-card-strong" style={{ borderRadius: 0, borderTop: "none", borderLeft: "none", borderRight: "none" }}>
        <div className="px-4 pt-3 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <MapPin size={14} style={{ color: "hsl(25 95% 55%)" }} />
            <div>
              <p className="text-[10px] text-muted-foreground leading-none">Deliver to</p>
              <p className="text-xs font-bold text-foreground leading-tight">Home · 5 min</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <IconBtn onClick={() => navigate("/profile/orders")} icon={Package} />
            <IconBtn onClick={() => navigate("/cart")} icon={ShoppingCart} badge={totalItems} />
            <IconBtn onClick={() => navigate("/profile")} icon={User} />
          </div>
        </div>

        {/* Search bar - never auto-focus */}
        <div className="px-4 pb-3">
          <div
            onClick={() => searchRef.current?.focus()}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full cursor-text"
            style={{
              background: "hsla(210, 40%, 95%, 0.08)",
              border: "1px solid hsla(210, 100%, 60%, 0.2)",
              boxShadow: "0 0 20px hsla(210, 100%, 55%, 0.15)",
            }}
          >
            <Search size={16} className="text-muted-foreground shrink-0" />
            <input
              ref={searchRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && search && navigate(`/search?q=${encodeURIComponent(search)}`)}
              placeholder="Search food, grocery, fashion…"
              className="flex-1 bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground"
            />
            <Mic size={16} className="text-muted-foreground shrink-0" />
          </div>
        </div>
      </div>

      <div className="pt-3">
        <BannerCarousel navigate={navigate} />
      </div>

      {/* Shop Men's Collection */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold text-foreground">Shop Men's Collection</h3>
          <button
            onClick={() => navigate("/store/mens")}
            className="text-xs font-semibold"
            style={{ color: "hsl(210 100% 65%)" }}
          >
            View All →
          </button>
        </div>
        <MensCollectionGrid navigate={navigate} />
      </div>

      {/* Category Cards */}
      <div className="px-4 mt-5">
        <h3 className="text-base font-bold text-foreground mb-3">Shop by Category</h3>
        <div className="grid grid-cols-2 gap-3">
          {categories.map((c, i) => (
            <motion.button
              key={c.label}
              onClick={() => navigate(c.route)}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.96 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="relative h-28 rounded-2xl overflow-hidden glass-card"
            >
              <ImgWithSkeleton src={c.img} alt={c.label} className="absolute inset-0 w-full h-full" />
              <div className="absolute inset-0" style={{
                background: "linear-gradient(180deg, transparent 40%, hsla(220, 50%, 8%, 0.85) 100%)",
              }} />
              <div className="absolute bottom-2 left-3 right-3">
                <p className="text-base font-bold text-white" style={{ textShadow: `0 2px 12px ${c.glow}` }}>
                  {c.label}
                </p>
              </div>
              <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full" style={{ background: c.glow, boxShadow: `0 0 10px ${c.glow}` }} />
            </motion.button>
          ))}
        </div>
      </div>

      {sections.map((s) => (
        <ProductSection
          key={s.key}
          title={s.title}
          items={allProducts.filter(s.filter).slice(0, 8)}
          navigate={navigate}
        />
      ))}

      <div className="h-4" />
      <BottomNav />
    </div>
  );
};

export default Home;
