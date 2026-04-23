import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, ShoppingBag, Heart, Wallet, MapPin, ChevronRight,
  CreditCard, Bell, HelpCircle, Settings, LogOut, Package, Pencil, Star, Award,
} from "lucide-react";
import { toast } from "sonner";
import BottomNav from "@/components/BottomNav";
import { useUser } from "@/contexts/UserContext";
import { useAuth } from "@/contexts/AuthContext";

const quickActions = [
  { icon: ShoppingBag, label: "Orders", color: "hsl(210, 100%, 45%)", route: "/profile/orders" },
  { icon: Heart, label: "Wishlist", color: "hsl(340, 80%, 52%)", route: "/home" },
  { icon: Wallet, label: "Wallet", color: "hsl(145, 60%, 38%)", route: "/profile/wallet" },
  { icon: MapPin, label: "Addresses", color: "hsl(25, 95%, 53%)", route: "/home" },
];

const menuItems = [
  { icon: Package, label: "My Orders", route: "/profile/orders", badge: "" },
  { icon: MapPin, label: "Saved Addresses", badge: "2" },
  { icon: CreditCard, label: "Payment Methods", badge: "" },
  { icon: Bell, label: "Notifications", badge: "3" },
  { icon: HelpCircle, label: "Help & Support", badge: "" },
  { icon: Settings, label: "Settings", route: "/profile/settings", badge: "" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.35 } }),
};

const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse rounded-lg bg-muted ${className || ""}`} />
);

const ProfilePage = () => {
  const navigate = useNavigate();
  const { profile, orders, walletBalance, loyaltyPoints } = useUser();
  const { signOut, user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await signOut();
      toast.success("Logged out");
      navigate("/", { replace: true });
    } catch {
      toast.error("Failed to log out");
    } finally {
      setLoggingOut(false);
      setConfirmLogout(false);
    }
  };

  const recentOrder = orders[0];
  const activeOrders = orders.filter((o) => o.status === "shipped" || o.status === "processing").length;

  const tierColors = {
    Silver: { bg: "hsl(220,15%,90%)", text: "hsl(220,15%,40%)" },
    Gold: { bg: "hsl(40,80%,88%)", text: "hsl(40,60%,30%)" },
    Platinum: { bg: "hsl(250,40%,90%)", text: "hsl(250,40%,40%)" },
  };

  return (
    <div className="min-h-screen pb-24 bg-background">
      {/* Header */}
      <div
        className="relative px-5 pt-12 pb-8 overflow-hidden"
        style={{ background: "linear-gradient(135deg, hsl(210, 80%, 42%) 0%, hsl(200, 75%, 55%) 100%)" }}
      >
        <div className="absolute inset-0" style={{ background: "hsla(210,60%,50%,0.25)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }} />
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-25" style={{ background: "radial-gradient(circle, hsla(0,0%,100%,0.7), transparent)" }} />
        <div className="absolute bottom-0 -left-8 w-32 h-32 rounded-full opacity-20" style={{ background: "radial-gradient(circle, hsla(200,100%,70%,0.8), transparent)" }} />

        <motion.div className="flex items-center gap-4 relative z-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="w-[68px] h-[68px] rounded-full flex items-center justify-center overflow-hidden" style={{ background: "linear-gradient(135deg, hsla(0,0%,100%,0.3), hsla(0,0%,100%,0.1))", border: "2.5px solid hsla(0,0%,100%,0.5)" }}>
            {profile.photo ? (
              <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover" />
            ) : (
              <User size={32} color="white" />
            )}
          </div>
          <div className="flex-1">
            {loading ? (
              <>
                <Skeleton className="h-5 w-28 mb-1.5" />
                <Skeleton className="h-3 w-20" />
              </>
            ) : (
              <>
                <h1 className="text-lg font-bold text-white">{profile.name}</h1>
                <p className="text-[13px] text-white/70 mt-0.5">{profile.mobile}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: tierColors[profile.tier].bg, color: tierColors[profile.tier].text }}>
                    <Award size={10} className="inline mr-0.5 -mt-0.5" />{profile.tier} Member
                  </span>
                </div>
              </>
            )}
          </div>
          <motion.button whileTap={{ scale: 0.85 }} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "hsla(0,0%,100%,0.2)" }} onClick={() => navigate("/profile/edit")}>
            <Pencil size={16} color="white" />
          </motion.button>
        </motion.div>
      </div>

      {/* Stats Row */}
      <div className="px-4 -mt-5 relative z-20">
        <motion.div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-card border border-border" style={{ boxShadow: "0 4px 20px hsla(220,30%,15%,0.08)" }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-12 w-full rounded-xl" />)
          ) : (
            <>
              <div className="text-center py-2">
                <p className="text-base font-bold text-foreground">{orders.length}</p>
                <p className="text-[10px] text-muted-foreground">Orders</p>
              </div>
              <div className="text-center py-2 border-x border-border">
                <p className="text-base font-bold text-foreground">₹{walletBalance.toLocaleString()}</p>
                <p className="text-[10px] text-muted-foreground">Wallet</p>
              </div>
              <div className="text-center py-2">
                <p className="text-base font-bold text-foreground">{loyaltyPoints}</p>
                <p className="text-[10px] text-muted-foreground flex items-center justify-center gap-0.5"><Star size={10} className="text-yellow-500" />Points</p>
              </div>
            </>
          )}
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 mt-3">
        <motion.div className="grid grid-cols-4 gap-3 p-4 rounded-2xl bg-card border border-border" style={{ boxShadow: "0 4px 20px hsla(220,30%,15%,0.08)" }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
          {quickActions.map((action) => (
            <motion.button key={action.label} className="flex flex-col items-center gap-1.5" whileTap={{ scale: 0.85 }} whileHover={{ y: -2 }} onClick={() => action.route && navigate(action.route)}>
              <motion.div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: `${action.color}15` }} whileHover={{ boxShadow: `0 4px 16px ${action.color}30` }}>
                <action.icon size={20} color={action.color} />
              </motion.div>
              <span className="text-[11px] font-medium text-muted-foreground">{action.label}</span>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Active Orders Alert */}
      {activeOrders > 0 && !loading && (
        <motion.div className="mx-4 mt-3 p-3 rounded-2xl flex items-center gap-3" style={{ background: "hsl(210,80%,95%)", border: "1px solid hsl(210,80%,88%)" }} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} whileTap={{ scale: 0.98 }} onClick={() => navigate("/profile/orders")}>
          <motion.div animate={{ rotate: [0, -10, 10, -10, 0] }} transition={{ repeat: Infinity, repeatDelay: 3, duration: 0.5 }}>
            <Package size={20} style={{ color: "hsl(210,80%,45%)" }} />
          </motion.div>
          <p className="text-xs font-medium flex-1" style={{ color: "hsl(210,80%,35%)" }}>
            {activeOrders} active order{activeOrders > 1 ? "s" : ""} in progress
          </p>
          <ChevronRight size={14} style={{ color: "hsl(210,80%,45%)" }} />
        </motion.div>
      )}

      {/* Recent Order */}
      {recentOrder && !loading && (
        <motion.div className="mx-4 mt-3 p-4 rounded-2xl bg-card border border-border" style={{ boxShadow: "0 2px 12px hsla(220,30%,15%,0.06)" }} custom={0} initial="hidden" animate="visible" variants={fadeUp} whileTap={{ scale: 0.98 }} onClick={() => navigate("/profile/orders")}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold text-foreground">Recent Order</p>
            <span className="text-[10px] text-muted-foreground">{recentOrder.date}</span>
          </div>
          <div className="flex items-center gap-3">
            <motion.img src={recentOrder.product.image} alt={recentOrder.product.name} className="w-14 h-14 rounded-xl object-cover" whileHover={{ scale: 1.05 }} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-card-foreground truncate">{recentOrder.product.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">₹{recentOrder.product.price} × {recentOrder.qty}</p>
            </div>
            <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full capitalize" style={{
              background: recentOrder.status === "delivered" ? "hsl(145,60%,92%)" : recentOrder.status === "shipped" ? "hsl(210,80%,92%)" : "hsl(35,90%,92%)",
              color: recentOrder.status === "delivered" ? "hsl(145,60%,30%)" : recentOrder.status === "shipped" ? "hsl(210,80%,35%)" : "hsl(35,90%,35%)",
            }}>
              {recentOrder.status}
            </span>
          </div>
        </motion.div>
      )}

      {/* Menu List */}
      <div className="mx-4 mt-3 rounded-2xl bg-card border border-border overflow-hidden" style={{ boxShadow: "0 2px 12px hsla(220,30%,15%,0.06)" }}>
        {menuItems.map((item, i) => (
          <motion.button key={item.label} className="w-full flex items-center gap-3.5 px-4 py-3.5 text-left" style={{ borderBottom: i < menuItems.length - 1 ? "1px solid hsl(var(--border))" : "none" }} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} whileTap={{ scale: 0.98, backgroundColor: "hsl(var(--muted))" }} onClick={() => item.route && navigate(item.route)}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-muted">
              <item.icon size={18} className="text-primary" />
            </div>
            <span className="flex-1 text-sm font-medium text-card-foreground">{item.label}</span>
            {item.badge && (
              <span className="text-[10px] font-bold min-w-[20px] h-5 flex items-center justify-center rounded-full bg-destructive text-destructive-foreground">{item.badge}</span>
            )}
            <ChevronRight size={16} className="text-muted-foreground" />
          </motion.button>
        ))}
      </div>

      {/* Logout / Login */}
      <motion.div className="mx-4 mt-3 rounded-2xl bg-card border border-border overflow-hidden" style={{ boxShadow: "0 2px 12px hsla(220,30%,15%,0.06)" }} custom={7} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        {user ? (
          <motion.button className="w-full flex items-center gap-3.5 px-4 py-3.5 text-left" whileTap={{ scale: 0.98 }} onClick={() => setConfirmLogout(true)}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "hsl(0, 80%, 96%)" }}>
              <LogOut size={18} className="text-destructive" />
            </div>
            <span className="flex-1 text-sm font-medium text-destructive">Logout</span>
            <ChevronRight size={16} className="text-muted-foreground" />
          </motion.button>
        ) : (
          <motion.button className="w-full flex items-center gap-3.5 px-4 py-3.5 text-left" whileTap={{ scale: 0.98 }} onClick={() => navigate("/auth")}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "hsl(210, 100%, 95%)" }}>
              <User size={18} className="text-primary" />
            </div>
            <span className="flex-1 text-sm font-medium text-primary">Login / Create Account</span>
            <ChevronRight size={16} className="text-muted-foreground" />
          </motion.button>
        )}
      </motion.div>

      {user?.email && (
        <p className="text-center text-[10px] text-muted-foreground mt-3 px-4">
          Signed in as {user.email}
        </p>
      )}

      <div className="h-4" />
      <BottomNav />

      {/* Logout confirm dialog */}
      <AnimatePresence>
        {confirmLogout && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center px-6"
            style={{ background: "hsla(220, 40%, 8%, 0.7)", backdropFilter: "blur(8px)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => !loggingOut && setConfirmLogout(false)}
          >
            <motion.div
              className="w-full max-w-xs rounded-3xl p-6 glass-card-strong"
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-4"
                style={{ background: "hsl(0 80% 50% / 0.15)" }}>
                <LogOut size={24} className="text-destructive" />
              </div>
              <h3 className="text-center text-lg font-bold text-foreground">Log out?</h3>
              <p className="text-center text-sm text-muted-foreground mt-1 mb-5">
                You'll need to sign in again to access your account.
              </p>
              <div className="flex gap-2">
                <button
                  disabled={loggingOut}
                  onClick={() => setConfirmLogout(false)}
                  className="flex-1 py-3 rounded-2xl text-sm font-semibold text-foreground"
                  style={{ background: "hsla(210, 40%, 95%, 0.08)", border: "1px solid hsla(210, 40%, 95%, 0.12)" }}
                >
                  Cancel
                </button>
                <button
                  disabled={loggingOut}
                  onClick={handleLogout}
                  className="flex-1 py-3 rounded-2xl text-sm font-semibold text-white disabled:opacity-60"
                  style={{ background: "hsl(0 80% 55%)", boxShadow: "0 8px 24px hsl(0 80% 55% / 0.4)" }}
                >
                  {loggingOut ? "Logging out…" : "Log out"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfilePage;
