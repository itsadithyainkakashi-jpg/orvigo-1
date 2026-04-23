import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Package, User, Search, Mic, MapPin, ArrowRight } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { useCart } from "@/contexts/CartContext";
import heroMens from "@/assets/hero-mens.jpg";
import heroWomens from "@/assets/hero-womens.jpg";

const IconBtn = ({ icon: Icon, onClick, badge }: { icon: React.ElementType; onClick: () => void; badge?: number }) => (
  <motion.button
    onClick={onClick}
    whileTap={{ scale: 0.85 }}
    className="relative w-9 h-9 rounded-full flex items-center justify-center"
    style={{ background: "hsla(210, 40%, 95%, 0.08)", border: "1px solid hsla(210, 40%, 95%, 0.12)" }}
  >
    <Icon size={16} className="text-foreground" />
    {badge !== undefined && badge > 0 && (
      <span
        className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full text-[9px] font-bold text-white flex items-center justify-center"
        style={{ background: "hsl(25 95% 55%)", boxShadow: "0 2px 8px hsl(25 95% 55% / 0.6)" }}
      >
        {badge}
      </span>
    )}
  </motion.button>
);

const ShopCard = ({
  image,
  title,
  tagline,
  onClick,
  delay,
  eager,
}: {
  image: string;
  title: string;
  tagline: string;
  onClick: () => void;
  delay: number;
  eager?: boolean;
}) => (
  <motion.button
    onClick={onClick}
    whileHover={{ y: -4 }}
    whileTap={{ scale: 0.98 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="relative w-full h-64 rounded-3xl overflow-hidden glass-card-strong text-left"
    style={{ boxShadow: "0 20px 50px hsla(220, 50%, 4%, 0.55)" }}
    aria-label={`Shop ${title}`}
  >
    <img
      src={image}
      alt={`Shop ${title} Collection`}
      loading={eager ? "eager" : "lazy"}
      width={1280}
      height={896}
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(180deg, hsla(220, 50%, 8%, 0.15) 0%, hsla(220, 50%, 8%, 0.55) 60%, hsla(220, 50%, 4%, 0.92) 100%)",
      }}
    />
    <div className="absolute inset-0 p-5 flex flex-col justify-end">
      <p className="text-[11px] uppercase tracking-[0.3em] text-white/70 font-semibold">
        {tagline}
      </p>
      <h2
        className="text-3xl font-extrabold text-white mt-1 uppercase tracking-wide"
        style={{ textShadow: "0 4px 16px hsla(0,0%,0%,0.6)" }}
      >
        Shop {title}
      </h2>
      <div className="mt-4 inline-flex items-center gap-2 self-start px-4 py-2 rounded-full text-xs font-bold text-foreground bg-white">
        Explore Collection <ArrowRight size={14} />
      </div>
    </div>
  </motion.button>
);

const Home = () => {
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const searchRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen pb-24 bg-background">
      {/* Sticky Glass Header */}
      <div
        className="sticky top-0 z-40 glass-card-strong"
        style={{ borderRadius: 0, borderTop: "none", borderLeft: "none", borderRight: "none" }}
      >
        <div className="px-4 pt-3 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <MapPin size={14} style={{ color: "hsl(25 95% 55%)" }} />
            <div>
              <p className="text-[10px] text-muted-foreground leading-none">Deliver to</p>
              <p className="text-xs font-bold text-foreground leading-tight">Home · 5 min</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <IconBtn onClick={() => navigate("/profile/orders")} icon={Package} />
            <IconBtn onClick={() => navigate("/cart")} icon={ShoppingCart} badge={totalItems} />
            <IconBtn onClick={() => navigate("/profile")} icon={User} />
          </div>
        </div>

        <div className="px-4 pb-3">
          <div
            onClick={() => searchRef.current?.focus()}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full cursor-text"
            style={{
              background: "hsla(210, 40%, 95%, 0.08)",
              border: "1px solid hsla(210, 100%, 60%, 0.2)",
              boxShadow: "0 0 20px hsla(210, 100%, 55%, 0.15)",
            }}
          >
            <Search size={16} className="text-muted-foreground shrink-0" />
            <input
              ref={searchRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && search && navigate(`/search?q=${encodeURIComponent(search)}`)
              }
              placeholder="Search the collection…"
              className="flex-1 bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground"
            />
            <Mic size={16} className="text-muted-foreground shrink-0" />
          </div>
        </div>
      </div>

      {/* Hero copy */}
      <div className="px-4 pt-6 pb-2 text-center">
        <p className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground font-semibold">
          Orvigo · New Season
        </p>
        <h1 className="mt-2 text-2xl font-extrabold tracking-wide text-foreground uppercase">
          Find Your Style
        </h1>
        <p className="mt-1 text-xs text-muted-foreground">
          Curated collections for Men &amp; Women.
        </p>
      </div>

      {/* Two main shop cards */}
      <div className="px-4 mt-4 flex flex-col gap-4">
        <ShopCard
          image={heroMens}
          title="Men"
          tagline="Men's Collection"
          onClick={() => navigate("/men")}
          delay={0}
          eager
        />
        <ShopCard
          image={heroWomens}
          title="Women"
          tagline="Women's Collection"
          onClick={() => navigate("/women")}
          delay={0.08}
        />
      </div>

      <div className="h-6" />
      <BottomNav />
    </div>
  );
};

export default Home;
