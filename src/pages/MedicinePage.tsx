import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Search, Shield } from "lucide-react";
import { MEDICINE_PRODUCTS, RX_REQUIRED_IDS } from "@/data/medicineProducts";
import type { Product } from "@/contexts/CartContext";
import { useCart } from "@/contexts/CartContext";
import BottomNav from "@/components/BottomNav";
import MedicineProductImage from "@/components/MedicineProductImage";
import { toast } from "sonner";

const MedicinePage = () => {
  const navigate = useNavigate();
  const { totalItems, addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState("");

  const products = useMemo(() => {
    let items: Product[] = MEDICINE_PRODUCTS;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter((p) => p.name.toLowerCase().includes(q));
    }
    return items;
  }, [searchQuery]);

  const handleAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    toast.success(`${product.name} added to cart`, { duration: 1500 });
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 px-4 pt-3 pb-3" style={{ background: "linear-gradient(135deg, hsl(200, 75%, 40%) 0%, hsl(210, 65%, 50%) 100%)" }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex-1">
            <h1 className="text-white font-bold text-base">Pharmacy</h1>
            <p className="text-white/70 text-[10px] flex items-center gap-1"><Shield size={10} /> 100% Genuine Medicines</p>
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
          <input type="text" placeholder="Search medicines..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="flex-1 bg-transparent text-xs outline-none placeholder:text-white/50 text-white" />
        </div>
      </div>

      {/* Products */}
      <div className="px-4 pt-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-foreground">All Medicines</h2>
          <span className="text-[11px] text-muted-foreground">{products.length} items</span>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              className="rounded-2xl overflow-hidden cursor-pointer glass-card flex flex-col"
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (i % 9) * 0.03 }}
              onClick={() => navigate(`/medicine/product/${product.id}`)}
            >
              <div className="aspect-square w-full p-1.5">
                <MedicineProductImage productId={product.id} src={product.image} alt={product.name} />
              </div>
              <div className="px-2 pb-2 pt-0.5 flex-1 flex flex-col">
                <p className="text-[11px] font-semibold text-foreground line-clamp-2 leading-tight min-h-[28px]">
                  {product.name}
                </p>
                {(product.badge || RX_REQUIRED_IDS.has(product.id)) && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {product.badge && (
                      <span className="inline-block text-[8px] font-bold px-1.5 py-0.5 rounded-full text-white" style={{ background: "hsl(200, 75%, 40%)" }}>
                        {product.badge}
                      </span>
                    )}
                    {RX_REQUIRED_IDS.has(product.id) && (
                      <span className="inline-block text-[8px] font-bold px-1.5 py-0.5 rounded-full text-white" style={{ background: "hsl(0, 75%, 50%)" }}>
                        Rx Required
                      </span>
                    )}
                  </div>
                )}
                <div className="flex items-center justify-between mt-auto pt-1.5">
                  <div className="flex flex-col leading-none">
                    <span className="text-xs font-bold text-foreground">₹{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-[9px] line-through text-muted-foreground">₹{product.originalPrice}</span>
                    )}
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => handleAdd(product, e)}
                    className="px-2 py-1 rounded-lg text-[9px] font-bold text-white"
                    style={{ background: "hsl(200, 75%, 40%)" }}
                  >
                    ADD
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-16">
            <p className="text-3xl mb-2">💊</p>
            <p className="text-sm text-muted-foreground">No medicines found</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default MedicinePage;
