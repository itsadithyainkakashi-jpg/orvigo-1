import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const CartPage = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: "hsl(210, 20%, 97%)" }}>
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-lg font-bold mb-1" style={{ color: "hsl(220, 40%, 13%)" }}>Your cart is empty</h2>
        <p className="text-sm mb-6" style={{ color: "hsl(220, 15%, 55%)" }}>Add items to get started</p>
        <button
          onClick={() => navigate("/categories")}
          className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white"
          style={{ background: "linear-gradient(135deg, hsl(210, 100%, 45%), hsl(210, 80%, 55%))" }}
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-32" style={{ background: "hsl(210, 20%, 97%)" }}>
      {/* Header */}
      <div
        className="sticky top-0 z-50 px-4 py-3 flex items-center gap-3"
        style={{ background: "linear-gradient(180deg, hsl(210, 80%, 40%) 0%, hsl(210, 70%, 50%) 100%)" }}
      >
        <button onClick={() => navigate(-1)} className="text-white">
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-white font-semibold">Cart ({totalItems} items)</h1>
      </div>

      <div className="px-4 py-4 space-y-3">
        {items.map((item, i) => (
          <motion.div
            key={item.product.id}
            className="bg-white rounded-2xl p-3 flex gap-3"
            style={{ boxShadow: "0 2px 12px hsla(220, 30%, 15%, 0.06)" }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <img
              src={item.product.image}
              alt={item.product.name}
              className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate" style={{ color: "hsl(220, 40%, 13%)" }}>{item.product.name}</p>
              {item.size && (
                <p className="text-[10px] mt-0.5" style={{ color: "hsl(220, 15%, 55%)" }}>Size: {item.size}</p>
              )}
              <p className="text-base font-bold mt-1" style={{ color: "hsl(210, 100%, 45%)" }}>₹{item.product.price * item.quantity}</p>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ background: "hsl(210, 20%, 95%)" }}
                  >
                    <Minus size={12} />
                  </button>
                  <span className="text-sm font-bold w-5 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white"
                    style={{ background: "hsl(210, 100%, 45%)" }}
                  >
                    <Plus size={12} />
                  </button>
                </div>
                <button onClick={() => removeFromCart(item.product.id)}>
                  <Trash2 size={16} style={{ color: "hsl(0, 60%, 55%)" }} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom checkout */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 px-4 py-4"
        style={{
          background: "hsla(0,0%,100%,0.95)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid hsl(220, 20%, 92%)",
          paddingBottom: "env(safe-area-inset-bottom, 16px)",
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm" style={{ color: "hsl(220, 15%, 50%)" }}>Total Amount</span>
          <span className="text-xl font-bold" style={{ color: "hsl(220, 40%, 13%)" }}>₹{totalPrice}</span>
        </div>
        <button
          onClick={() => navigate("/payment")}
          className="w-full py-3.5 rounded-xl text-sm font-bold text-white"
          style={{ background: "linear-gradient(135deg, hsl(210, 100%, 45%), hsl(210, 80%, 55%))" }}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
