import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Search, Star, Clock, MapPin, Flame, Leaf } from "lucide-react";
import { allProducts } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import BottomNav from "@/components/BottomNav";
import { toast } from "sonner";
import GlobalSearch from "@/components/GlobalSearch";

const foodFilters = ["All", "Veg", "Non-Veg", "Chinese"] as const;
type FoodFilter = (typeof foodFilters)[number];

const filterMap: Record<FoodFilter, RegExp> = {
  All: /.*/,
  Veg: /paneer|dal|chole|palak|veg|thali/i,
  "Non-Veg": /chicken|mutton|fish|egg|biryani(?!.*veg)/i,
  Chinese: /chinese|noodle|manchurian|fried rice|manchow|chilli/i,
};

const restaurants = [
  { name: "Spice Kitchen", rating: 4.5, time: "25-30 min", cuisine: "North Indian" },
  { name: "Dragon Wok", rating: 4.3, time: "20-25 min", cuisine: "Chinese" },
  { name: "Green Leaf", rating: 4.6, time: "30-35 min", cuisine: "Pure Veg" },
  { name: "Tandoor Express", rating: 4.4, time: "15-20 min", cuisine: "Mughlai" },
];

const FoodPage = () => {
  const navigate = useNavigate();
  const { totalItems, addToCart } = useCart();
  const [activeFilter, setActiveFilter] = useState<FoodFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const foodProducts = useMemo(() => {
    let items = allProducts.filter((p) => p.category === "Food");
    if (activeFilter !== "All") items = items.filter((p) => filterMap[activeFilter].test(p.name + " " + p.description));
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    return items;
  }, [activeFilter, searchQuery]);

  const handleAddToCart = (product: typeof allProducts[0]) => {
    addToCart(product, 1);
    toast.success(`${product.name} added to cart`, { duration: 1500 });
  };

  // Split into sections
  const popular = foodProducts.filter((_, i) => i < 3);
  const recommended = foodProducts.filter((_, i) => i >= 3 && i < 6);
  const topRated = foodProducts.filter((_, i) => i >= 6);

  const FoodCard = ({ product, i }: { product: typeof allProducts[0]; i: number }) => {
    const isVeg = /paneer|dal|chole|palak|veg|thali/i.test(product.name);
    return (
      <motion.div
        className="flex gap-3 rounded-2xl overflow-hidden cursor-pointer glass-card"
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: (i % 8) * 0.04 }}
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <div className="relative w-28 h-28 flex-shrink-0">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
          {product.badge && (
            <span className="absolute top-2 left-2 text-[9px] font-bold px-1.5 py-0.5 rounded-full text-white" style={{ background: "hsl(0, 75%, 50%)" }}>
              {product.badge}
            </span>
          )}
        </div>
        <div className="flex-1 py-2.5 pr-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="w-3.5 h-3.5 rounded-sm border flex items-center justify-center" style={{ borderColor: isVeg ? "hsl(140, 60%, 40%)" : "hsl(0, 70%, 50%)" }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: isVeg ? "hsl(140, 60%, 40%)" : "hsl(0, 70%, 50%)" }} />
              </span>
              <p className="text-xs font-semibold truncate text-foreground">{product.name}</p>
            </div>
            <p className="text-[10px] line-clamp-2 text-muted-foreground">{product.description}</p>
          </div>
          <div className="flex items-center justify-between mt-1.5">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-foreground">₹{product.price}</span>
              <span className="flex items-center gap-0.5">
                <Star size={10} fill="hsl(45, 90%, 50%)" color="hsl(45, 90%, 50%)" />
                <span className="text-[10px] font-medium text-muted-foreground">{product.rating}</span>
              </span>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
              className="px-3 py-1 rounded-lg text-[10px] font-bold text-white"
              style={{ background: "hsl(14, 85%, 52%)" }}
            >
              ADD
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  };

  const SectionTitle = ({ title }: { title: string }) => (
    <div className="flex items-center justify-between mb-3 mt-5">
      <h2 className="text-sm font-bold text-foreground">{title}</h2>
    </div>
  );

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 px-4 pt-3 pb-3" style={{ background: "linear-gradient(135deg, hsl(14, 85%, 52%) 0%, hsl(25, 90%, 55%) 100%)" }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="flex-1">
            <h1 className="text-white font-bold text-base">Food Delivery</h1>
            <p className="text-white/70 text-[10px] flex items-center gap-1"><MapPin size={10} /> Delivering to your location</p>
          </div>
          <button onClick={() => navigate("/cart")} className="text-white relative">
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <motion.span key={totalItems} initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white" style={{ background: "hsl(0, 75%, 45%)" }}>{totalItems}</motion.span>
            )}
          </button>
        </div>
        <div className="flex items-center gap-2 rounded-xl px-3 py-2.5" style={{ background: "hsla(0, 0%, 100%, 0.2)", backdropFilter: "blur(10px)" }}>
          <Search size={14} color="hsla(0, 0%, 100%, 0.7)" />
          <input type="text" placeholder="Search for dishes..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="flex-1 bg-transparent text-xs outline-none placeholder:text-white/50 text-white" />
        </div>
      </div>

      {/* Filter pills */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto scrollbar-hide">
        {foodFilters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all glass-card"
            style={{
              background: activeFilter === f ? "hsl(14, 85%, 52%)" : undefined,
              color: activeFilter === f ? "white" : undefined,
            }}
          >
            {f === "Veg" && <Leaf size={12} />}
            {f === "Non-Veg" && <Flame size={12} />}
            {f}
          </button>
        ))}
      </div>

      {/* Restaurant cards */}
      <div className="px-4 mb-2">
        <h2 className="text-sm font-bold mb-3 text-foreground">🍽️ Popular Restaurants</h2>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
          {restaurants.map((r, i) => (
            <motion.div
              key={r.name}
              className="flex-shrink-0 w-44 rounded-2xl overflow-hidden cursor-pointer glass-card p-3"
              whileTap={{ scale: 0.96 }}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <p className="text-xs font-bold mb-1 text-foreground">{r.name}</p>
              <p className="text-[10px] mb-2 text-muted-foreground">{r.cuisine}</p>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-0.5 text-[10px] font-semibold" style={{ color: "hsl(140, 50%, 40%)" }}>
                  <Star size={10} fill="hsl(45, 90%, 50%)" color="hsl(45, 90%, 50%)" />{r.rating}
                </span>
                <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground"><Clock size={10} /> {r.time}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Sections */}
      <div className="px-4">
        {popular.length > 0 && (
          <>
            <SectionTitle title="🔥 Popular" />
            <div className="space-y-3">{popular.map((p, i) => <FoodCard key={p.id} product={p} i={i} />)}</div>
          </>
        )}
        {recommended.length > 0 && (
          <>
            <SectionTitle title="👨‍🍳 Recommended" />
            <div className="space-y-3">{recommended.map((p, i) => <FoodCard key={p.id} product={p} i={i} />)}</div>
          </>
        )}
        {topRated.length > 0 && (
          <>
            <SectionTitle title="⭐ Top Rated" />
            <div className="space-y-3">{topRated.map((p, i) => <FoodCard key={p.id} product={p} i={i} />)}</div>
          </>
        )}
        {foodProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-3xl mb-2">🍽️</p>
            <p className="text-sm text-muted-foreground">No dishes found</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default FoodPage;
