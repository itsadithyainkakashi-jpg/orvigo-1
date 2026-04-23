import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Package, Truck, CheckCircle2, XCircle, Clock, Filter, Search } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { useUser, type Order } from "@/contexts/UserContext";

const statusConfig: Record<string, { icon: React.ElementType; color: string; bg: string; label: string }> = {
  delivered: { icon: CheckCircle2, color: "hsl(145,60%,35%)", bg: "hsl(145,60%,92%)", label: "Delivered" },
  shipped: { icon: Truck, color: "hsl(210,80%,45%)", bg: "hsl(210,80%,92%)", label: "Shipped" },
  processing: { icon: Clock, color: "hsl(35,90%,45%)", bg: "hsl(35,90%,92%)", label: "Processing" },
  cancelled: { icon: XCircle, color: "hsl(0,70%,50%)", bg: "hsl(0,70%,92%)", label: "Cancelled" },
  pending: { icon: Package, color: "hsl(35,90%,50%)", bg: "hsl(35,90%,92%)", label: "Pending" },
};

const filters = ["All", "Active", "Delivered", "Cancelled"];

const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse rounded-xl bg-muted ${className || ""}`} />
);

const OrderHistoryPage = () => {
  const navigate = useNavigate();
  const { orders } = useUser();
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const filtered = orders.filter((o: Order) => {
    const matchFilter =
      activeFilter === "All" ||
      (activeFilter === "Active" && (o.status === "shipped" || o.status === "processing" || o.status === "pending")) ||
      (activeFilter === "Delivered" && o.status === "delivered") ||
      (activeFilter === "Cancelled" && o.status === "cancelled");
    const matchSearch = o.product.name.toLowerCase().includes(searchQuery.toLowerCase()) || o.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="min-h-screen pb-24 bg-background">
      <div className="relative px-4 pt-12 pb-5 overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(210,80%,42%), hsl(200,75%,55%))" }}>
        <div className="absolute inset-0" style={{ background: "hsla(210,60%,50%,0.25)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }} />
        <div className="relative z-10 flex items-center gap-3">
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate("/profile")} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "hsla(0,0%,100%,0.2)" }}>
            <ArrowLeft size={18} color="white" />
          </motion.button>
          <h1 className="text-lg font-bold text-white flex-1">My Orders</h1>
          <span className="text-xs text-white/70 font-medium">{orders.length} orders</span>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 mt-3">
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-card border border-border">
          <Search size={16} className="text-muted-foreground" />
          <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search orders..." className="flex-1 text-sm bg-transparent outline-none text-foreground placeholder:text-muted-foreground" />
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 mt-3 flex gap-2 overflow-x-auto no-scrollbar">
        {filters.map((f) => (
          <motion.button key={f} whileTap={{ scale: 0.9 }} onClick={() => setActiveFilter(f)} className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${activeFilter === f ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground border border-border"}`}>
            {f}
          </motion.button>
        ))}
      </div>

      {/* Orders */}
      <div className="px-4 mt-3 space-y-3">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-card rounded-2xl p-4 border border-border space-y-3">
              <div className="flex justify-between"><Skeleton className="h-3 w-16" /><Skeleton className="h-3 w-20" /></div>
              <div className="flex gap-3"><Skeleton className="w-16 h-16 rounded-xl" /><div className="flex-1 space-y-2"><Skeleton className="h-4 w-3/4" /><Skeleton className="h-3 w-1/3" /></div></div>
            </div>
          ))
        ) : (
          <AnimatePresence mode="popLayout">
            {filtered.map((order, i) => {
              const cfg = statusConfig[order.status] || statusConfig.pending;
              const StatusIcon = cfg.icon;
              return (
                <motion.div
                  key={order.id}
                  className="bg-card rounded-2xl p-4 border border-border cursor-pointer"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                  whileTap={{ scale: 0.98 }}
                  layout
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-semibold text-muted-foreground">{order.id}</span>
                    <span className="text-[10px] text-muted-foreground">{order.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <motion.img src={order.product.image} alt={order.product.name} className="w-16 h-16 rounded-xl object-cover" whileHover={{ scale: 1.05 }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-card-foreground truncate">{order.product.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">₹{order.product.price.toLocaleString()} × {order.qty}</p>
                      {order.deliveryDate && order.status !== "delivered" && order.status !== "cancelled" && (
                        <p className="text-[10px] text-primary mt-1">Expected: {order.deliveryDate}</p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1" style={{ background: cfg.bg, color: cfg.color }}>
                        <StatusIcon size={12} /> {cfg.label}
                      </span>
                      {(order.status === "shipped" || order.status === "processing") && (
                        <motion.button whileTap={{ scale: 0.9 }} className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary" onClick={() => navigate(`/order-tracking/${order.id}`)}>
                          Track Order
                        </motion.button>
                      )}
                    </div>
                  </div>
                  {/* Progress bar for active orders */}
                  {(order.status === "processing" || order.status === "shipped") && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <div className="flex justify-between text-[9px] text-muted-foreground mb-1.5">
                        <span>Ordered</span><span>Processing</span><span>Shipped</span><span>Delivered</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <motion.div className="h-full rounded-full bg-primary" initial={{ width: 0 }} animate={{ width: order.status === "processing" ? "40%" : "70%" }} transition={{ duration: 1, delay: 0.3 }} />
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}

        {!loading && filtered.length === 0 && (
          <motion.div className="text-center py-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Package size={48} className="mx-auto text-muted-foreground mb-3" />
            <p className="text-sm font-medium text-muted-foreground">No orders found</p>
          </motion.div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default OrderHistoryPage;
