import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Plus, Smartphone, CreditCard, Building2, ArrowUpRight, ArrowDownLeft, TrendingUp, Gift } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { useUser } from "@/contexts/UserContext";
import { toast } from "sonner";

const payMethods = [
  { icon: Smartphone, label: "UPI", desc: "Google Pay, PhonePe", color: "hsl(210,80%,45%)" },
  { icon: CreditCard, label: "Card", desc: "Debit / Credit Card", color: "hsl(250,60%,50%)" },
  { icon: Building2, label: "Net Banking", desc: "All major banks", color: "hsl(145,55%,38%)" },
];

const quickAmounts = [100, 200, 500, 1000, 2000, 5000];

const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse rounded-lg bg-muted ${className || ""}`} />
);

const WalletPage = () => {
  const navigate = useNavigate();
  const { walletBalance, transactions, addMoney, loyaltyPoints } = useUser();
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [addAmount, setAddAmount] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const handleAdd = (method: string) => {
    const amt = parseInt(addAmount);
    if (!amt || amt <= 0) { toast.error("Enter a valid amount"); return; }
    addMoney(amt, method);
    setShowAdd(false);
    setAddAmount("");
    toast.success(`₹${amt} added via ${method}`);
  };

  const totalIn = transactions.filter((t) => t.type === "credit").reduce((s, t) => s + t.amount, 0);
  const totalOut = Math.abs(transactions.filter((t) => t.type === "debit").reduce((s, t) => s + t.amount, 0));

  return (
    <div className="min-h-screen pb-24 bg-background">
      {/* Header */}
      <div className="relative px-4 pt-12 pb-10 overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(145,55%,38%), hsl(160,50%,48%))" }}>
        <div className="absolute inset-0" style={{ background: "hsla(150,60%,40%,0.2)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }} />
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20" style={{ background: "radial-gradient(circle, hsla(0,0%,100%,0.6), transparent)" }} />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate("/profile")} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "hsla(0,0%,100%,0.2)" }}>
              <ArrowLeft size={18} color="white" />
            </motion.button>
            <h1 className="text-lg font-bold text-white">My Wallet</h1>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-white/70 mb-1">Available Balance</p>
              {loading ? (
                <Skeleton className="h-9 w-32 bg-white/20" />
              ) : (
                <motion.p className="text-3xl font-bold text-white" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" }}>
                  ₹{walletBalance.toLocaleString()}
                </motion.p>
              )}
            </div>
            <motion.button whileTap={{ scale: 0.85 }} whileHover={{ scale: 1.05 }} onClick={() => setShowAdd(true)} className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg" style={{ background: "hsla(0,0%,100%,0.25)", border: "1.5px solid hsla(0,0%,100%,0.4)" }}>
              <Plus size={22} color="white" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-4 -mt-5 relative z-20 grid grid-cols-2 gap-3">
        <motion.div className="bg-card rounded-2xl p-3 border border-border" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp size={14} style={{ color: "hsl(145,55%,38%)" }} />
            <span className="text-[10px] text-muted-foreground">Money In</span>
          </div>
          <p className="text-sm font-bold text-foreground">₹{totalIn.toLocaleString()}</p>
        </motion.div>
        <motion.div className="bg-card rounded-2xl p-3 border border-border" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <div className="flex items-center gap-2 mb-1">
            <Gift size={14} style={{ color: "hsl(40,80%,50%)" }} />
            <span className="text-[10px] text-muted-foreground">Rewards</span>
          </div>
          <p className="text-sm font-bold text-foreground">{loyaltyPoints} pts</p>
        </motion.div>
      </div>

      {/* Add Money Sheet */}
      <AnimatePresence>
        {showAdd && (
          <motion.div className="fixed inset-0 z-50 flex items-end" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/40" onClick={() => setShowAdd(false)} />
            <motion.div className="relative w-full bg-card rounded-t-3xl p-5 pb-8" initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 28 }}>
              <div className="w-10 h-1 rounded-full bg-muted mx-auto mb-5" />
              <h3 className="text-base font-bold text-card-foreground mb-4">Add Money to Wallet</h3>
              <input type="number" value={addAmount} onChange={(e) => setAddAmount(e.target.value)} placeholder="Enter amount (₹)" className="w-full px-4 py-3 rounded-xl text-sm bg-background text-foreground border border-border mb-3 focus:outline-none focus:ring-2 focus:ring-primary/30" />
              {/* Quick amounts */}
              <div className="flex flex-wrap gap-2 mb-4">
                {quickAmounts.map((amt) => (
                  <motion.button key={amt} whileTap={{ scale: 0.9 }} onClick={() => setAddAmount(String(amt))} className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${addAmount === String(amt) ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                    ₹{amt}
                  </motion.button>
                ))}
              </div>
              <div className="space-y-2">
                {payMethods.map((m) => (
                  <motion.button key={m.label} whileTap={{ scale: 0.97 }} onClick={() => handleAdd(m.label)} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-background border border-border">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `${m.color}15` }}>
                      <m.icon size={18} style={{ color: m.color }} />
                    </div>
                    <div className="text-left flex-1">
                      <p className="text-sm font-medium text-foreground">{m.label}</p>
                      <p className="text-[11px] text-muted-foreground">{m.desc}</p>
                    </div>
                    <ArrowUpRight size={14} className="text-muted-foreground" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Transactions */}
      <div className="px-4 mt-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold text-foreground">Transaction History</p>
          <span className="text-[10px] text-muted-foreground">{transactions.length} transactions</span>
        </div>
        <div className="space-y-2">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-card border border-border">
                <Skeleton className="w-9 h-9 rounded-full" />
                <div className="flex-1 space-y-1.5"><Skeleton className="h-3.5 w-3/4" /><Skeleton className="h-2.5 w-1/3" /></div>
                <Skeleton className="h-4 w-12" />
              </div>
            ))
          ) : (
            transactions.map((t, i) => (
              <motion.div key={t.id} className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-card border border-border" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }} whileTap={{ scale: 0.98 }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: t.type === "credit" ? "hsl(145,60%,92%)" : "hsl(0,70%,95%)" }}>
                  {t.type === "credit" ? <ArrowDownLeft size={16} style={{ color: "hsl(145,55%,38%)" }} /> : <ArrowUpRight size={16} style={{ color: "hsl(0,70%,50%)" }} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-card-foreground truncate">{t.label}</p>
                  <p className="text-[10px] text-muted-foreground">{t.date} · {t.time}</p>
                </div>
                <span className="text-sm font-bold" style={{ color: t.type === "credit" ? "hsl(145,55%,38%)" : "hsl(0,70%,50%)" }}>
                  {t.type === "credit" ? "+" : "−"}₹{Math.abs(t.amount).toLocaleString()}
                </span>
              </motion.div>
            ))
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default WalletPage;
