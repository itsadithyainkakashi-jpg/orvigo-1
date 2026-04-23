import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Heart, ShoppingCart, Star, Trash2 } from "lucide-react";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import BottomNav from "@/components/BottomNav";
import { toast } from "sonner";

const WishlistPage = () => {
  const navigate = useNavigate();
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart, totalItems } = useCart();

  const handleAddToCart = (product: typeof wishlist[0], e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="min-h-screen pb-20" style={{ background: "hsl(210, 20%, 97%)" }}>
      {/* Header */}
      <div
        className="sticky top-0 z-50 px-4 py-3 flex items-center gap-3"
        style={{ background: "linear-gradient(180deg, hsl(210, 80%, 40%) 0%, hsl(210, 70%, 50%) 100%)" }}
      >
        <button onClick={() => navigate(-1)} className="text-white"><ArrowLeft size={22} /></button>
        <h1 className="text-white font-semibold flex-1 text-sm">My Wishlist ({wishlist.length})</h1>
        <button onClick={() => navigate("/cart")} className="text-white relative">
          <ShoppingCart size={20} />
          {totalItems > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white" style={{ background: "hsl(0, 75%, 55%)" }}>{totalItems}</span>
          )}
        </button>
      </div>

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 px-6">
          <Heart size={64} style={{ color: "hsl(220, 15%, 80%)" }} />
          <p className="text-base font-semibold mt-4" style={{ color: "hsl(220, 20%, 35%)" }}>Your wishlist is empty</p>
          <p className="text-xs mt-1" style={{ color: "hsl(220, 15%, 60%)" }}>Browse products and tap ❤️ to save them here</p>
          <button
            onClick={() => navigate("/categories/filter?cat=Items")}
            className="mt-6 px-6 py-2.5 rounded-xl text-sm font-semibold text-white"
            style={{ background: "linear-gradient(135deg, hsl(210, 100%, 45%), hsl(210, 80%, 55%))" }}
          >
            Browse Items
          </button>
        </div>
      ) : (
        <div className="px-4 py-3 space-y-3">
          <AnimatePresence>
            {wishlist.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.3 }}
                className="flex gap-3 bg-white rounded-2xl p-3 cursor-pointer"
                style={{ boxShadow: "0 2px 12px hsla(220, 30%, 15%, 0.08)" }}
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: "hsl(220, 20%, 25%)" }}>{product.name}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star size={10} fill="hsl(45, 90%, 50%)" color="hsl(45, 90%, 50%)" />
                    <span className="text-[10px]" style={{ color: "hsl(220, 20%, 50%)" }}>{product.rating}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-bold" style={{ color: "hsl(220, 40%, 13%)" }}>₹{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-[10px] line-through" style={{ color: "hsl(220, 15%, 60%)" }}>₹{product.originalPrice}</span>
                    )}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={(e) => handleAddToCart(product, e)}
                      className="px-3 py-1 rounded-lg text-[11px] font-semibold text-white"
                      style={{ background: "hsl(210, 100%, 45%)" }}
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); removeFromWishlist(product.id); toast("Removed from wishlist"); }}
                      className="px-2 py-1 rounded-lg"
                      style={{ background: "hsl(0, 80%, 95%)" }}
                    >
                      <Trash2 size={14} style={{ color: "hsl(0, 70%, 50%)" }} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
      <BottomNav />
    </div>
  );
};

export default WishlistPage;
