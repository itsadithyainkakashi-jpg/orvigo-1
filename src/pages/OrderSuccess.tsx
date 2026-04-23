import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ background: "linear-gradient(180deg, hsl(210, 30%, 98%) 0%, hsl(210, 20%, 95%) 100%)" }}
    >
      {/* Animated checkmark */}
      <motion.div
        className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
        style={{ background: "linear-gradient(135deg, hsl(145, 60%, 45%), hsl(145, 50%, 55%))" }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <Check size={48} color="white" strokeWidth={3} />
        </motion.div>
      </motion.div>

      {/* Ripple rings */}
      {[1, 2, 3].map((ring) => (
        <motion.div
          key={ring}
          className="absolute w-24 h-24 rounded-full"
          style={{ border: "2px solid hsl(145, 50%, 60%)" }}
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ scale: 1 + ring * 0.5, opacity: 0 }}
          transition={{ delay: 0.4 + ring * 0.15, duration: 1, ease: "easeOut" }}
        />
      ))}

      <motion.h1
        className="text-xl font-bold mb-2 text-center"
        style={{ color: "hsl(220, 40%, 13%)" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        Order Placed Successfully!
      </motion.h1>

      <motion.p
        className="text-sm text-center mb-8"
        style={{ color: "hsl(220, 15%, 50%)" }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        Thank you for shopping with Orvigo!{"\n"}Your order will be delivered soon.
      </motion.p>

      <motion.button
        onClick={() => navigate("/order-tracking")}
        className="px-8 py-3 rounded-xl text-sm font-bold text-white"
        style={{ background: "linear-gradient(135deg, hsl(210, 100%, 45%), hsl(210, 80%, 55%))" }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        Track Order
      </motion.button>

      <motion.button
        onClick={() => navigate("/home")}
        className="px-8 py-3 rounded-xl text-sm font-bold mt-3"
        style={{ color: "hsl(210, 80%, 45%)" }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
        whileTap={{ scale: 0.95 }}
      >
        Go to Home
      </motion.button>
    </div>
  );
};

export default OrderSuccess;
