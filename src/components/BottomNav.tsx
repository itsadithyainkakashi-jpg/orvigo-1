import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ShoppingBasket, Pill, Shirt, User } from "lucide-react";

const sideTabs = [
  { icon: Shirt, label: "Fashion", path: "/fashion" },
  { icon: Pill, label: "Medicine", path: "/medicine" },
  { icon: ShoppingBasket, label: "Grocery", path: "/grocery" },
  { icon: User, label: "Profile", path: "/profile" },
];

const homeTab = { icon: Home, label: "Home", path: "/home" };

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isHomeActive = location.pathname.startsWith(homeTab.path);

  const SideItem = ({ tab }: { tab: typeof sideTabs[0] }) => {
    const isActive = location.pathname.startsWith(tab.path);
    const Icon = tab.icon;
    return (
      <motion.button
        key={tab.label}
        onClick={() => navigate(tab.path)}
        className="flex flex-1 flex-col items-center justify-center gap-1 py-2 rounded-2xl relative"
        whileTap={{ scale: 0.9 }}
      >
        {isActive && (
          <motion.div
            layoutId="navSideIndicator"
            className="absolute inset-0 rounded-2xl"
            style={{ background: "hsla(210, 100%, 55%, 0.12)" }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
        <Icon
          size={20}
          strokeWidth={isActive ? 2.4 : 1.8}
          className={isActive ? "text-primary" : "text-muted-foreground"}
        />
        <span
          className={`text-[10px] font-medium ${isActive ? "text-primary" : "text-muted-foreground"}`}
        >
          {tab.label}
        </span>
      </motion.button>
    );
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-t border-border"
      style={{
        paddingBottom: "env(safe-area-inset-bottom, 8px)",
        boxShadow: "0 -4px 24px hsla(220, 20%, 10%, 0.06)",
      }}
    >
      <div className="flex items-end justify-around px-2 pt-1 pb-1.5 max-w-md mx-auto">
        {/* Left: Fashion + Medicine */}
        <div className="flex flex-1 items-end">
          <SideItem tab={sideTabs[0]} />
          <SideItem tab={sideTabs[1]} />
        </div>

        {/* Center: elevated Home */}
        <div className="relative flex items-end justify-center px-3 -mt-5">
          <motion.button
            onClick={() => navigate(homeTab.path)}
            whileTap={{ scale: 0.92 }}
            className="relative flex items-center justify-center rounded-full shadow-xl"
            style={{
              width: 58,
              height: 58,
              background: isHomeActive
                ? "hsl(210, 100%, 55%)"
                : "hsl(0, 0%, 100%)",
              border: "3px solid hsla(210, 100%, 55%, 0.18)",
              boxShadow: isHomeActive
                ? "0 10px 28px hsla(210, 100%, 55%, 0.45)"
                : "0 10px 28px hsla(220, 20%, 10%, 0.12)",
            }}
          >
            <Home
              size={28}
              strokeWidth={2.4}
              style={{
                color: isHomeActive ? "#fff" : "hsl(210, 100%, 55%)",
              }}
            />
          </motion.button>
          <span
            className="absolute -bottom-0.5 text-[10px] font-semibold"
            style={{ color: isHomeActive ? "hsl(210, 100%, 55%)" : "hsl(215, 16%, 47%)" }}
          >
            Home
          </span>
        </div>

        {/* Right: Grocery + Profile */}
        <div className="flex flex-1 items-end">
          <SideItem tab={sideTabs[2]} />
          <SideItem tab={sideTabs[3]} />
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
