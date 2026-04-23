import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { UtensilsCrossed, ShoppingBasket, LayoutGrid, Pill } from "lucide-react";

const tabs = [
  { icon: UtensilsCrossed, label: "Food", path: "/food" },
  { icon: ShoppingBasket, label: "Grocery", path: "/grocery" },
  { icon: LayoutGrid, label: "Collection", path: "/store/mens" },
  { icon: Pill, label: "Medicine", path: "/medicine" },
];

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const activeIndex = tabs.findIndex((t) => location.pathname.startsWith(t.path));
  const active = activeIndex >= 0 ? activeIndex : -1;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-2 py-1 glass-card-strong"
      style={{
        borderTop: "1px solid hsla(210, 40%, 95%, 0.08)",
        paddingBottom: "env(safe-area-inset-bottom, 8px)",
      }}
    >
      {tabs.map((tab, i) => {
        const isActive = active === i;
        const Icon = tab.icon;
        return (
          <motion.button
            key={tab.label}
            onClick={() => navigate(tab.path)}
            className="flex flex-col items-center gap-0.5 py-1.5 px-4 rounded-2xl relative"
            whileTap={{ scale: 0.85 }}
          >
            {isActive && (
              <motion.div
                layoutId="navIndicator"
                className="absolute inset-0 rounded-2xl"
                style={{ background: "hsla(210, 100%, 55%, 0.15)" }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <Icon
              size={22}
              strokeWidth={isActive ? 2.5 : 1.8}
              style={{
                color: isActive ? "hsl(210, 100%, 60%)" : "hsla(210, 20%, 80%, 0.5)",
              }}
            />
            <span
              className="text-[10px] font-medium"
              style={{
                color: isActive ? "hsl(210, 100%, 60%)" : "hsla(210, 20%, 80%, 0.5)",
              }}
            >
              {tab.label}
            </span>
          </motion.button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
