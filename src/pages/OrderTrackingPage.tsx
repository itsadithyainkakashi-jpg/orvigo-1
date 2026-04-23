import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Package, Truck, Bike, PartyPopper, Box } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const steps = [
  { label: "Order Placed", icon: Check, emoji: "✅", time: "Today, 10:30 AM" },
  { label: "Packed", icon: Box, emoji: "📦", time: "Today, 11:15 AM" },
  { label: "Shipped", icon: Truck, emoji: "🚚", time: "Today, 12:00 PM" },
  { label: "Out for Delivery", icon: Bike, emoji: "🛵", time: "Today, 2:30 PM" },
  { label: "Delivered", icon: PartyPopper, emoji: "🎉", time: "Today, 3:15 PM" },
];

const OrderTrackingPage = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [currentStep, setCurrentStep] = useState(0);

  // Simulate live tracking
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((s) => {
        if (s < steps.length - 1) return s + 1;
        clearInterval(interval);
        return s;
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const progress = (currentStep / (steps.length - 1)) * 100;
  const eta = Math.max(0, (steps.length - 1 - currentStep) * 8);

  return (
    <div className="min-h-screen pb-24" style={{ background: "hsl(210,20%,97%)" }}>
      {/* Header */}
      <div
        className="sticky top-0 z-50 px-4 py-3 flex items-center gap-3"
        style={{ background: "linear-gradient(135deg, hsl(210,80%,40%), hsl(210,70%,50%))" }}
      >
        <button onClick={() => navigate(-1)} className="text-white"><ArrowLeft size={22} /></button>
        <div>
          <h1 className="text-white font-semibold text-base">Track Order</h1>
          <p className="text-white/70 text-xs">#{orderId || "ORV-20260412"}</p>
        </div>
      </div>

      {/* ETA Card */}
      <motion.div
        className="mx-4 mt-4 rounded-2xl p-4"
        style={{ background: "linear-gradient(135deg, hsl(145,60%,40%), hsl(160,50%,45%))", boxShadow: "0 8px 24px hsla(145,60%,30%,0.25)" }}
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-white/80 text-xs font-medium">Estimated Delivery</p>
        <p className="text-white text-2xl font-bold mt-1">
          {currentStep >= steps.length - 1 ? "Delivered! 🎉" : `${eta} mins`}
        </p>
        {/* Progress bar */}
        <div className="mt-3 h-2 rounded-full bg-white/20 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-white"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-white/60 text-[10px]">Order Placed</span>
          <span className="text-white/60 text-[10px]">Delivered</span>
        </div>
      </motion.div>

      {/* Timeline */}
      <div className="mx-4 mt-6 bg-white rounded-2xl p-5" style={{ boxShadow: "0 2px 12px hsla(220,30%,15%,0.06)" }}>
        <h3 className="font-semibold text-sm mb-4" style={{ color: "hsl(220,40%,13%)" }}>Delivery Status</h3>
        <div className="relative">
          {steps.map((step, i) => {
            const done = i <= currentStep;
            const active = i === currentStep;
            return (
              <motion.div
                key={step.label}
                className="flex gap-4 relative"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {/* Line */}
                {i < steps.length - 1 && (
                  <div className="absolute left-[15px] top-[32px] w-0.5 h-[calc(100%-8px)]"
                    style={{ background: done && i < currentStep ? "hsl(210,80%,45%)" : "hsl(220,15%,88%)" }}
                  />
                )}
                {/* Dot */}
                <div className="relative z-10 flex-shrink-0">
                  <motion.div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                    style={{
                      background: done ? "hsl(210,80%,45%)" : "hsl(220,15%,92%)",
                      color: done ? "white" : "hsl(220,15%,60%)",
                    }}
                    animate={active ? { scale: [1, 1.15, 1] } : {}}
                    transition={active ? { repeat: Infinity, duration: 1.5 } : {}}
                  >
                    {done ? <Check size={14} /> : <step.icon size={14} />}
                  </motion.div>
                </div>
                {/* Text */}
                <div className="pb-6 flex-1">
                  <p className="text-sm font-semibold" style={{ color: done ? "hsl(220,40%,13%)" : "hsl(220,15%,60%)" }}>
                    {step.emoji} {step.label}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "hsl(220,15%,55%)" }}>
                    {done ? step.time : "Pending"}
                  </p>
                  {active && (
                    <motion.span
                      className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold text-white"
                      style={{ background: "hsl(210,80%,45%)" }}
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                    >
                      Current
                    </motion.span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Order details card */}
      <div className="mx-4 mt-4 bg-white rounded-2xl p-4" style={{ boxShadow: "0 2px 12px hsla(220,30%,15%,0.06)" }}>
        <h3 className="font-semibold text-sm mb-2" style={{ color: "hsl(220,40%,13%)" }}>Delivery Address</h3>
        <p className="text-xs" style={{ color: "hsl(220,15%,50%)" }}>123 Main Street, Sector 21, Mumbai 400001</p>
      </div>

      <BottomNav />
    </div>
  );
};

export default OrderTrackingPage;
