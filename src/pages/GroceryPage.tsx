import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Search, Plus, Minus, Zap } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import BottomNav from "@/components/BottomNav";
import { toast } from "sonner";
import {
  GROCERY_PRODUCTS,
  GROCERY_SUBS,
  GROCERY_SUB_BY_ID,
  getGroceryFallback,
  type GrocerySubCategory,
} from "@/data/groceryProducts";

const GroceryPage = () => {
  const navigate = useNavigate();
  const { totalItems, addToCart } = useCart();
  const [activeSub, setActiveSub] = useState<GrocerySubCategory>("Vegetables");
  const [searchQuery, setSearchQuery] = useState("");
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const products = useMemo(() => {
    let items = GROCERY_PRODUCTS.filter(
      (p) => GROCERY_SUB_BY_ID[p.id] === activeSub
    );
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter((p) => p.name.toLowerCase().includes(q));
    }
    return items;
  }, [activeSub, searchQuery]);

  const updateQty = (id: string, delta: number) => {
    setQuantities((prev) => {
      const next = { ...prev };
      next[id] = Math.max(0, (next[id] || 0) + delta);
      if (next[id] === 0) delete next[id];
      return next;
    });
  };

  const handleAdd = (product: typeof GROCERY_PRODUCTS[0]) => {
    setQuantities((prev) => ({ ...prev, [product.id]: (prev[product.id] || 0) + 1 }));
    addToCart(product, 1);
    toast.success(`${product.name} added`, { duration: 1200 });
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 px-4 pt-3 pb-3" style={{ background: "linear-gradient(135deg, hsl(145, 65%, 38%) 0%, hsl(160, 55%, 42%) 100%)" }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex-1">
            <h1 className="text-white font-bold text-base">Grocery</h1>
            <p className="text-white/70 text-[10px] flex items-center gap-1"><Zap size={10} /> Delivery in 10-15 min</p>
          </div>
          <button onClick={() => navigate("/cart")} className="text-white relative">
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <motion.span key={totalItems} initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white" style={{ background: "hsl(0, 75%, 50%)" }}>{totalItems}</motion.span>
            )}
          </button>
        </div>
        <div className="flex items-center gap-2 rounded-xl px-3 py-2.5" style={{ background: "hsla(0, 0%, 100%, 0.2)", backdropFilter: "blur(10px)" }}>
          <Search size={14} color="hsla(0, 0%, 100%, 0.7)" />
          <input type="text" placeholder="Search groceries..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="flex-1 bg-transparent text-xs outline-none placeholder:text-white/50 text-white" />
        </div>
      </div>

      {/* Top tabs: Vegetables / Non-Veg */}
      <div className="flex gap-2 px-3 py-3 glass-card-strong" style={{ borderBottom: "1px solid hsla(210, 40%, 95%, 0.08)" }}>
        {GROCERY_SUBS.map((sub) => {
          const active = activeSub === sub.label;
          return (
            <button
              key={sub.label}
              onClick={() => setActiveSub(sub.label)}
              className="flex-1 py-2.5 rounded-xl text-xs font-bold transition-all"
              style={{
                background: active
                  ? "linear-gradient(135deg, hsl(145, 65%, 38%) 0%, hsl(160, 55%, 42%) 100%)"
                  : "hsla(210, 40%, 95%, 0.06)",
                color: active ? "white" : "hsl(210, 40%, 75%)",
                boxShadow: active ? "0 2px 10px hsla(145, 65%, 38%, 0.35)" : "none",
                border: active ? "none" : "1px solid hsla(210, 40%, 95%, 0.1)",
              }}
            >
              {sub.label}
            </button>
          );
        })}
      </div>

      {/* Products grid */}
      <div className="px-3 py-3">
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-sm font-bold text-foreground">{activeSub}</h2>
          <span className="text-[11px] text-muted-foreground">{products.length} items</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {products.map((product, i) => {
            const qty = quantities[product.id] || 0;
            return (
              <motion.div
                key={product.id}
                className="rounded-2xl overflow-hidden cursor-pointer relative glass-card"
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: (i % 9) * 0.03 }}
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="relative aspect-square p-2">
                  <img
                    src={product.image || getGroceryFallback(product.id)}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-xl"
                    loading="lazy"
                    onError={(e) => {
                      const fb = getGroceryFallback(product.id);
                      if (e.currentTarget.src !== fb) e.currentTarget.src = fb;
                    }}
                  />
                  {product.badge && (
                    <span className="absolute top-1 left-1 text-[8px] font-bold px-1.5 py-0.5 rounded-full text-white" style={{ background: "hsl(0, 70%, 50%)" }}>{product.badge}</span>
                  )}
                </div>
                <div className="px-2 pb-2">
                  <p className="text-[11px] font-semibold truncate text-foreground">{product.name}</p>
                  <p className="text-[9px] mt-0.5 text-muted-foreground truncate">{product.description}</p>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-xs font-bold text-foreground">₹{product.price}</span>
                    {qty > 0 ? (
                      <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                        <motion.button whileTap={{ scale: 0.85 }} onClick={() => updateQty(product.id, -1)} className="w-5 h-5 rounded-md flex items-center justify-center" style={{ background: "hsl(145, 65%, 38%)" }}><Minus size={10} color="white" /></motion.button>
                        <span className="text-[10px] font-bold w-4 text-center text-foreground">{qty}</span>
                        <motion.button whileTap={{ scale: 0.85 }} onClick={() => { updateQty(product.id, 1); addToCart(product, 1); }} className="w-5 h-5 rounded-md flex items-center justify-center" style={{ background: "hsl(145, 65%, 38%)" }}><Plus size={10} color="white" /></motion.button>
                      </div>
                    ) : (
                      <motion.button whileTap={{ scale: 0.9 }} onClick={(e) => { e.stopPropagation(); handleAdd(product); }} className="px-2 py-0.5 rounded-md text-[9px] font-bold border" style={{ borderColor: "hsl(145, 65%, 38%)", color: "hsl(145, 65%, 38%)" }}>ADD</motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {products.length === 0 && (
          <div className="text-center py-16">
            <p className="text-3xl mb-2">🥬</p>
            <p className="text-sm text-muted-foreground">No products found</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default GroceryPage;
