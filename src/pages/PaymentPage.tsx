import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Smartphone, CreditCard, Banknote, Check } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const paymentMethods = [
  { id: "upi", label: "UPI (GPay / PhonePe / Paytm)", icon: Smartphone, desc: "Pay using any UPI app" },
  { id: "card", label: "Credit / Debit Card", icon: CreditCard, desc: "Visa, Mastercard, RuPay" },
  { id: "cod", label: "Cash on Delivery", icon: Banknote, desc: "Pay when you receive" },
];

const PaymentPage = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const [selected, setSelected] = useState("upi");
  const [processing, setProcessing] = useState(false);

  const handlePlaceOrder = () => {
    setProcessing(true);
    setTimeout(() => {
      clearCart();
      navigate("/order-success");
    }, 1500);
  };

  const deliveryCharge = totalPrice > 499 ? 0 : 40;
  const grandTotal = totalPrice + deliveryCharge;

  return (
    <div className="min-h-screen pb-28" style={{ background: "hsl(210, 20%, 97%)" }}>
      {/* Header */}
      <div
        className="sticky top-0 z-50 px-4 py-3 flex items-center gap-3"
        style={{ background: "linear-gradient(180deg, hsl(210, 80%, 40%) 0%, hsl(210, 70%, 50%) 100%)" }}
      >
        <button onClick={() => navigate(-1)} className="text-white">
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-white font-semibold">Payment</h1>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Order summary */}
        <div className="bg-white rounded-2xl p-4" style={{ boxShadow: "0 2px 12px hsla(220, 30%, 15%, 0.06)" }}>
          <h3 className="text-sm font-bold mb-3" style={{ color: "hsl(220, 40%, 13%)" }}>Order Summary</h3>
          {items.map((item) => (
            <div key={item.product.id} className="flex items-center justify-between py-1.5">
              <span className="text-xs truncate flex-1" style={{ color: "hsl(220, 20%, 40%)" }}>
                {item.product.name} × {item.quantity}
              </span>
              <span className="text-xs font-semibold ml-2" style={{ color: "hsl(220, 30%, 20%)" }}>
                ₹{item.product.price * item.quantity}
              </span>
            </div>
          ))}
          <div className="border-t mt-2 pt-2" style={{ borderColor: "hsl(220, 20%, 92%)" }}>
            <div className="flex justify-between text-xs mb-1">
              <span style={{ color: "hsl(220, 15%, 50%)" }}>Subtotal</span>
              <span style={{ color: "hsl(220, 30%, 20%)" }}>₹{totalPrice}</span>
            </div>
            <div className="flex justify-between text-xs mb-1">
              <span style={{ color: "hsl(220, 15%, 50%)" }}>Delivery</span>
              <span style={{ color: deliveryCharge === 0 ? "hsl(145, 60%, 35%)" : "hsl(220, 30%, 20%)" }}>
                {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
              </span>
            </div>
            <div className="flex justify-between text-sm font-bold mt-2 pt-2 border-t" style={{ borderColor: "hsl(220, 20%, 92%)" }}>
              <span style={{ color: "hsl(220, 40%, 13%)" }}>Total</span>
              <span style={{ color: "hsl(210, 100%, 45%)" }}>₹{grandTotal}</span>
            </div>
          </div>
        </div>

        {/* Payment methods */}
        <div className="bg-white rounded-2xl p-4" style={{ boxShadow: "0 2px 12px hsla(220, 30%, 15%, 0.06)" }}>
          <h3 className="text-sm font-bold mb-3" style={{ color: "hsl(220, 40%, 13%)" }}>Payment Method</h3>
          <div className="space-y-2">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              const isSelected = selected === method.id;
              return (
                <motion.button
                  key={method.id}
                  onClick={() => setSelected(method.id)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left"
                  style={{
                    background: isSelected ? "hsl(210, 100%, 97%)" : "hsl(210, 20%, 98%)",
                    border: isSelected ? "2px solid hsl(210, 100%, 45%)" : "2px solid transparent",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: isSelected ? "hsl(210, 100%, 45%)" : "hsl(210, 20%, 92%)" }}
                  >
                    <Icon size={18} color={isSelected ? "white" : "hsl(220, 15%, 50%)"} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold" style={{ color: "hsl(220, 30%, 20%)" }}>{method.label}</p>
                    <p className="text-[10px]" style={{ color: "hsl(220, 15%, 55%)" }}>{method.desc}</p>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "hsl(210, 100%, 45%)" }}>
                      <Check size={12} color="white" />
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Place order */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 px-4 py-4"
        style={{
          background: "hsla(0,0%,100%,0.95)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid hsl(220, 20%, 92%)",
          paddingBottom: "env(safe-area-inset-bottom, 16px)",
        }}
      >
        <button
          onClick={handlePlaceOrder}
          disabled={processing}
          className="w-full py-3.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2"
          style={{
            background: processing
              ? "hsl(210, 30%, 70%)"
              : "linear-gradient(135deg, hsl(210, 100%, 45%), hsl(210, 80%, 55%))",
          }}
        >
          {processing ? (
            <motion.div
              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          ) : (
            `Place Order • ₹${grandTotal}`
          )}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
