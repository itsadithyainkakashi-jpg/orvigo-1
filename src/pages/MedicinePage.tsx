import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Search,
  Shield,
  Truck,
  Lock,
  Undo2,
  Headphones,
  Star,
  Thermometer,
  Wind,
  HeartPulse,
  Brain,
  Hand,
  Pill,
  Droplet,
  Heart,
} from "lucide-react";
import { MEDICINE_PRODUCTS } from "@/data/medicineProducts";
import type { Product } from "@/contexts/CartContext";
import { useCart } from "@/contexts/CartContext";
import BottomNav from "@/components/BottomNav";
import MedicineProductImage from "@/components/MedicineProductImage";
import { toast } from "sonner";
import heroBanner from "@/assets/medicine/pharmacy-hero-banner.jpg";

/** Section display config — overrides label/price/desc/rating for the curated pharmacy UI.
 *  IDs reference entries in src/data/medicineProducts.ts. */
type DisplayItem = {
  id: string;
  name: string;
  sub: string;
  price: number;
  original?: number;
  rating: number;
  reviews: number;
};

const FEVER_PAIN: DisplayItem[] = [
  { id: "m-tylenol-extra-strength-50", name: "Tylenol 500mg", sub: "Pain Reliever / Fever Reducer", price: 120, original: 135, rating: 4.7, reviews: 128 },
  { id: "m-domperidone-10mg-30", name: "Domperidone 10mg", sub: "Nausea & Vomiting Relief", price: 22, original: 30, rating: 4.5, reviews: 96 },
  { id: "m-gabapentin-100mg-100", name: "Gabapentin 100mg", sub: "Neuropathic / Nerve Pain Relief", price: 180, original: 200, rating: 4.6, reviews: 96 },
  { id: "m-tums-antacid-330", name: "Tums Antacid", sub: "Acid & Heartburn Relief", price: 30, original: 40, rating: 4.4, reviews: 93 },
];

const COLD_ALLERGY: DisplayItem[] = [
  { id: "m-cetzine-cetirizine-50", name: "Cetirizine 10mg", sub: "Anti-allergic", price: 35, original: 45, rating: 4.5, reviews: 143 },
  { id: "m-montelukast-10mg-30", name: "Montelukast 10mg", sub: "Asthma / Allergy Relief", price: 60, original: 75, rating: 4.6, reviews: 110 },
  { id: "m-antihistamine-10mg-28", name: "Antihistamine Tablets", sub: "Cold & Allergy Relief", price: 40, original: 55, rating: 4.4, reviews: 89 },
];

const HEART_BP: DisplayItem[] = [
  { id: "m-ramipril-1-25-100", name: "Ramipril 1.25mg", sub: "Blood Pressure / Heart", price: 55, original: 70, rating: 4.6, reviews: 88 },
  { id: "m-digoxin-1000", name: "Digoxin 250mcg", sub: "Heart Failure / Support", price: 150, original: 170, rating: 4.6, reviews: 78 },
  { id: "m-atorvastatin-10mg-28", name: "Atorvastatin 10mg", sub: "Cholesterol Lowering", price: 70, original: 90, rating: 4.5, reviews: 76 },
];

const MENTAL: DisplayItem[] = [
  { id: "m-lexapro-escitalopram-28", name: "Lexapro 10mg", sub: "Anxiety & Depression", price: 95, original: 120, rating: 4.5, reviews: 64 },
  { id: "m-zoloft-100mg-28", name: "Zoloft 100mg", sub: "Depression / OCD", price: 85, original: 110, rating: 4.4, reviews: 72 },
  { id: "m-clonazepam-100", name: "Clonazepam 2mg", sub: "Anti-anxiety / Seizures", price: 30, original: 40, rating: 4.5, reviews: 67 },
  { id: "m-mirtazapine-15mg-28", name: "Mirtazapine 15mg", sub: "Sleep & Depression Support", price: 45, original: 60, rating: 4.4, reviews: 58 },
];

const SKIN: DisplayItem[] = [
  { id: "m-hydrocortisone-cream-20", name: "Hydrocortisone Cream", sub: "Skin Irritation Relief", price: 65, original: 85, rating: 4.4, reviews: 36 },
  { id: "m-betamethasone-cream-45", name: "Betamethasone Cream", sub: "Skin Inflammation", price: 85, original: 110, rating: 4.5, reviews: 42 },
  { id: "m-double-antibiotic-ointment-28", name: "Double Antibiotic Ointment", sub: "Wound Care", price: 75, original: 95, rating: 4.6, reviews: 51 },
  { id: "m-dettol-antiseptic-500", name: "Dettol Antiseptic", sub: "Germ Protection", price: 120, original: 160, rating: 4.7, reviews: 122 },
];

const STOMACH: DisplayItem[] = [
  { id: "m-famotidine-20mg-28", name: "Famotidine 20mg", sub: "Acidity & Heartburn Relief", price: 28, original: 40, rating: 4.4, reviews: 81 },
  { id: "m-imodium-original-6", name: "Imodium", sub: "Diarrhea Relief", price: 50, original: 65, rating: 4.5, reviews: 64 },
  { id: "m-tums-antacid-330", name: "Tums Antacid", sub: "Heartburn Relief", price: 30, original: 40, rating: 4.4, reviews: 93 },
];

const TOP_SELLERS: DisplayItem[] = [
  { id: "m-domperidone-10mg-30", name: "Domperidone 10mg", sub: "For Nausea & Vomiting", price: 22, original: 30, rating: 4.5, reviews: 96 },
  { id: "m-famotidine-20mg-28", name: "Famotidine 20mg", sub: "Acidity & Heartburn Relief", price: 28, original: 40, rating: 4.4, reviews: 81 },
  { id: "m-mirtazapine-15mg-28", name: "Mirtazapine 15mg", sub: "Depression / Sleep Support", price: 45, original: 60, rating: 4.4, reviews: 58 },
  { id: "m-zoloft-100mg-28", name: "Zoloft 100mg", sub: "Depression / OCD", price: 85, original: 110, rating: 4.4, reviews: 72 },
];

const RECOMMENDED: DisplayItem[] = [
  { id: "m-betamethasone-cream-45", name: "Betamethasone Cream", sub: "USP, 0.1%", price: 85, original: 110, rating: 4.6, reviews: 42 },
  { id: "m-hydrocortisone-cream-20", name: "Hydrocortisone Cream", sub: "USP, 1%", price: 65, original: 85, rating: 4.4, reviews: 36 },
  { id: "m-tums-antacid-330", name: "Tums Antacid", sub: "Extra Strength", price: 30, original: 40, rating: 4.6, reviews: 93 },
];

const CATEGORIES = [
  { id: "fever", label: "Fever & Pain Relief", Icon: Thermometer, bg: "hsl(0, 80%, 96%)", fg: "hsl(0, 75%, 50%)" },
  { id: "cold", label: "Cold & Allergy", Icon: Wind, bg: "hsl(210, 80%, 96%)", fg: "hsl(210, 75%, 45%)" },
  { id: "heart", label: "Heart & BP Care", Icon: HeartPulse, bg: "hsl(355, 80%, 96%)", fg: "hsl(355, 75%, 50%)" },
  { id: "skin", label: "Skin Care & Creams", Icon: Hand, bg: "hsl(35, 85%, 95%)", fg: "hsl(25, 80%, 50%)" },
  { id: "mental", label: "Mental Wellness", Icon: Brain, bg: "hsl(280, 60%, 96%)", fg: "hsl(280, 55%, 50%)" },
  { id: "stomach", label: "Stomach & Acidity", Icon: Droplet, bg: "hsl(165, 60%, 94%)", fg: "hsl(165, 70%, 35%)" },
  { id: "diabetes", label: "Diabetes Care", Icon: Pill, bg: "hsl(345, 80%, 95%)", fg: "hsl(345, 75%, 50%)" },
];

const TEAL = "hsl(165, 75%, 38%)";
const TEAL_DARK = "hsl(170, 80%, 28%)";
const BLUE = "hsl(205, 80%, 40%)";

const MedicinePage = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const scrollTo = params.get("scrollTo");
  const { totalItems, addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const [highlight, setHighlight] = useState<string | null>(null);

  useEffect(() => {
    if (!scrollTo) return;
    const el = sectionRefs.current[scrollTo];
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
      setHighlight(scrollTo);
      const t = setTimeout(() => setHighlight(null), 2200);
      return () => clearTimeout(t);
    }
  }, [scrollTo]);

  const productMap = useMemo(() => {
    const m = new Map<string, Product>();
    MEDICINE_PRODUCTS.forEach((p) => m.set(p.id, p));
    return m;
  }, []);

  const handleAdd = (item: DisplayItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const base = productMap.get(item.id);
    if (!base) return;
    addToCart({ ...base, name: item.name, price: item.price, originalPrice: item.original }, 1);
    toast.success(`${item.name} added to cart`, { duration: 1500 });
  };

  const goToProduct = (id: string) => navigate(`/medicine/product/${id}`);
  const goToCategory = (catId: string) => navigate(`/medicine/category/${catId}`);


  const renderStars = (rating: number) => (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={11}
          className={i <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"}
        />
      ))}
    </div>
  );

  const ProductCard = ({ item }: { item: DisplayItem }) => {
    const base = productMap.get(item.id);
    if (!base) return null;
    const discount = item.original ? Math.round(((item.original - item.price) / item.original) * 100) : 0;
    return (
      <motion.div
        whileHover={{ y: -5, boxShadow: "0 18px 38px rgba(15, 76, 95, 0.16)" }}
        whileTap={{ scale: 0.98 }}
        className="relative flex flex-col rounded-2xl overflow-hidden cursor-pointer border border-white/60"
        style={{
          background:
            "linear-gradient(160deg, rgba(255,255,255,0.92) 0%, rgba(240,253,250,0.78) 100%)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          boxShadow: "0 6px 20px rgba(15, 76, 95, 0.08)",
        }}
        onClick={() => goToProduct(item.id)}
      >
        {discount > 0 && (
          <span
            className="absolute top-2 left-2 z-10 text-[9px] font-bold px-2 py-0.5 rounded-md text-white"
            style={{ background: "linear-gradient(135deg, hsl(0,80%,55%), hsl(15,85%,55%))" }}
          >
            {discount}% OFF
          </span>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); toast.success(`${item.name} added to wishlist`, { duration: 1200 }); }}
          className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full flex items-center justify-center bg-white/80 backdrop-blur-md border border-white/70"
          style={{ boxShadow: "0 2px 6px rgba(15, 76, 95, 0.12)" }}
          aria-label="Add to wishlist"
        >
          <Heart size={13} className="text-rose-500" />
        </button>
        <div className="w-full flex items-center justify-center pt-4 pb-2" style={{ height: 130 }}>
          <MedicineProductImage productId={item.id} src={base.image} alt={item.name} />
        </div>
        <div className="flex-1 flex flex-col px-2.5 pb-2.5">
          <p className="text-[12px] font-bold leading-tight text-gray-900 line-clamp-1">{item.name}</p>
          <p className="text-[10px] text-gray-500 leading-tight mt-0.5 line-clamp-1">{item.sub}</p>
          <div className="flex items-center gap-1 mt-1.5">
            {renderStars(item.rating)}
            <span className="text-[10px] font-semibold text-gray-700">{item.rating.toFixed(1)}</span>
            <span className="text-[10px] text-gray-400">({item.reviews})</span>
          </div>
          <div className="flex items-baseline gap-1.5 mt-1.5">
            <span className="text-[13px] font-extrabold text-gray-900">₹{item.price.toFixed(2)}</span>
            {item.original && (
              <span className="text-[10px] line-through text-gray-400">₹{item.original.toFixed(2)}</span>
            )}
          </div>
          <button
            onClick={(e) => handleAdd(item, e)}
            className="mt-2 w-full flex items-center justify-center gap-1 py-1.5 rounded-lg text-[11px] font-bold text-white transition-transform active:scale-95"
            style={{ background: "linear-gradient(135deg, hsl(150, 75%, 42%) 0%, hsl(170, 80%, 32%) 100%)" }}
          >
            <ShoppingCart size={12} /> Add to Cart
          </button>
          <div className="flex items-center gap-1 mt-1.5">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "hsl(150, 75%, 42%)" }} />
            <span className="text-[9px] font-semibold" style={{ color: TEAL_DARK }}>In Stock</span>
          </div>
        </div>
      </motion.div>
    );
  };

  const Section = ({ emoji, title, items, catId }: { emoji: string; title: string; items: DisplayItem[]; catId: string }) => (
    <section
      ref={(el) => { sectionRefs.current[catId] = el; }}
      id={`cat-${catId}`}
      className="mt-5 scroll-mt-20 rounded-2xl transition-colors"
      style={highlight === catId ? { background: "hsl(165, 70%, 95%)", padding: 8 } : undefined}
    >
      <div className="flex items-center justify-between mb-2.5 px-1">
        <h2 className="text-[15px] font-extrabold text-gray-900 flex items-center gap-1.5">
          <span>{emoji}</span> {title}
        </h2>
        <button onClick={() => goToCategory(catId)} className="text-[11px] font-bold flex items-center gap-0.5 active:scale-95 transition-transform" style={{ color: TEAL }}>
          View All ›
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {items.map((item) => <ProductCard key={`${title}-${item.id}`} item={item} />)}
      </div>
    </section>
  );


  return (
    <div className="min-h-screen pb-24" style={{ background: "#f4f7fa" }}>
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-b-3xl" style={{ minHeight: 220 }}>
        <img
          src={heroBanner}
          alt="Trusted Healthcare and Medicines"
          className="absolute inset-0 w-full h-full object-cover"
          width={1600}
          height={800}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(120deg, hsla(205, 85%, 25%, 0.92) 0%, hsla(195, 80%, 30%, 0.72) 45%, hsla(165, 75%, 38%, 0.15) 100%)",
          }}
        />
        <div className="relative px-4 pt-4 pb-5">
          <div className="flex items-center justify-end mb-2">
            <button onClick={() => navigate("/cart")} className="relative text-white p-2 rounded-full" style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(10px)" }}>
              <ShoppingCart size={18} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white bg-red-500">{totalItems}</span>
              )}
            </button>
          </div>
          <h1 className="text-white font-extrabold text-2xl leading-tight max-w-[60%]">
            Trusted Healthcare
            <br />
            <span style={{ color: "hsl(160, 80%, 70%)" }}>& Medicines</span>
          </h1>
          <p className="text-white/85 text-[11px] mt-1.5 max-w-[60%]">
            Fast delivery • Genuine medicines • Best prices
          </p>
          <div className="mt-4 flex items-center gap-2 rounded-full bg-white pl-4 pr-1 py-1 shadow-lg max-w-md">
            <Search size={15} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search medicines, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-[12px] outline-none text-gray-800 placeholder:text-gray-400 py-1.5"
            />
            <button className="w-9 h-9 rounded-full flex items-center justify-center text-white" style={{ background: TEAL }}>
              <Search size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Trust strip */}
      <div className="mx-3 -mt-3 relative z-10 bg-white rounded-2xl px-3 py-3 grid grid-cols-5 gap-2" style={{ boxShadow: "0 8px 24px rgba(15, 76, 95, 0.08)" }}>
        {[
          { Icon: Shield, label: "100% Genuine", sub: "Medicines" },
          { Icon: Truck, label: "Fast & Safe", sub: "Delivery" },
          { Icon: Lock, label: "Secure", sub: "Payments" },
          { Icon: Undo2, label: "Easy Returns", sub: "T&C Apply" },
          { Icon: Headphones, label: "24/7", sub: "Support" },
        ].map(({ Icon, label, sub }) => (
          <div key={label} className="flex flex-col items-center text-center">
            <Icon size={18} style={{ color: TEAL }} strokeWidth={2.2} />
            <span className="text-[9px] font-bold text-gray-800 mt-1 leading-tight">{label}</span>
            <span className="text-[8px] text-gray-500 leading-tight">{sub}</span>
          </div>
        ))}
      </div>

      <div className="px-3 mt-4">
        {/* Categories */}
        <div className="bg-white rounded-2xl p-3" style={{ boxShadow: "0 4px 14px rgba(15, 76, 95, 0.05)" }}>
          <div className="flex items-center justify-between mb-2.5">
            <h2 className="text-[13px] font-extrabold text-gray-900">Shop by Category</h2>
            <button onClick={() => goToCategory("fever")} className="text-[11px] font-bold active:scale-95 transition-transform" style={{ color: TEAL }}>View All ›</button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
            {CATEGORIES.map(({ id, label, Icon, bg, fg }) => {
              const isActive = highlight === id;
              return (
                <motion.button
                  key={id}
                  onClick={() => goToCategory(id)}
                  whileTap={{ scale: 0.92 }}
                  whileHover={{ y: -2 }}
                  className="flex flex-col items-center flex-shrink-0 w-[68px]"
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center transition-all"
                    style={{
                      background: bg,
                      boxShadow: isActive ? `0 0 0 2px ${fg}, 0 4px 12px ${fg}40` : undefined,
                    }}
                  >
                    <Icon size={22} style={{ color: fg }} strokeWidth={2.2} />
                  </div>
                  <span
                    className="text-[9px] font-semibold text-center leading-tight mt-1.5"
                    style={{ color: isActive ? fg : "hsl(220, 20%, 30%)" }}
                  >
                    {label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        <Section emoji="🔥" title="Fever & Pain Relief" items={FEVER_PAIN} catId="fever" />
        <Section emoji="🤧" title="Cold & Allergy" items={COLD_ALLERGY} catId="cold" />

        {/* Heart & BP Care with 20% OFF card */}
        <section
          ref={(el) => { sectionRefs.current["heart"] = el; }}
          id="cat-heart"
          className="mt-5 scroll-mt-20 rounded-2xl transition-colors"
          style={highlight === "heart" ? { background: "hsl(165, 70%, 95%)", padding: 8 } : undefined}
        >
          <div className="flex items-center justify-between mb-2.5 px-1">
            <h2 className="text-[15px] font-extrabold text-gray-900 flex items-center gap-1.5">
              <span>❤️</span> Heart & BP Care
            </h2>
            <button onClick={() => goToCategory("heart")} className="text-[11px] font-bold active:scale-95 transition-transform" style={{ color: TEAL }}>View All ›</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {HEART_BP.map((item) => <ProductCard key={`heart-${item.id}`} item={item} />)}
            <div
              className="rounded-2xl p-3 flex flex-col items-center justify-center text-center relative overflow-hidden"
              style={{
                background: "linear-gradient(160deg, hsl(165, 70%, 92%) 0%, hsl(195, 80%, 90%) 100%)",
                boxShadow: "0 4px 14px rgba(15, 76, 95, 0.08)",
              }}
            >
              <p className="text-[13px] font-extrabold text-gray-900 leading-tight">Flat <span style={{ color: "hsl(0, 80%, 50%)" }}>20% OFF</span></p>
              <p className="text-[10px] text-gray-700">on First Order</p>
              <div className="mt-2 px-2 py-1 rounded-md bg-white text-[10px] font-bold" style={{ color: TEAL_DARK }}>
                Use Code: MED20
              </div>
              <button onClick={() => goToCategory("heart")} className="mt-3 px-4 py-1.5 rounded-lg text-[11px] font-bold text-white active:scale-95 transition-transform" style={{ background: TEAL }}>
                Shop Now
              </button>
            </div>
          </div>
        </section>

        <Section emoji="🧠" title="Mental Wellness" items={MENTAL} catId="mental" />
        <Section emoji="🧴" title="Skin Care" items={SKIN} catId="skin" />
        <Section emoji="💊" title="Stomach & Acidity" items={STOMACH} catId="stomach" />


        {/* Top Sellers + Recommended */}
        <section className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl p-3" style={{ boxShadow: "0 4px 14px rgba(15, 76, 95, 0.05)" }}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[13px] font-extrabold text-gray-900">🏆 Top Selling Medicines</h3>
              <button onClick={() => goToCategory("fever")} className="text-[10px] font-bold active:scale-95 transition-transform" style={{ color: TEAL }}>View All</button>
            </div>
            <ul className="space-y-2.5">
              {TOP_SELLERS.map((it, idx) => (
                <li key={it.id + idx} className="flex items-center gap-2 cursor-pointer" onClick={() => goToProduct(it.id)}>
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
                    style={{ background: TEAL }}
                  >
                    {idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-bold text-gray-900 truncate">{it.name}</p>
                    <p className="text-[9px] text-gray-500 truncate">{it.sub}</p>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[11px] font-extrabold text-gray-900">₹{it.price}.00</span>
                    {it.original && <span className="text-[9px] line-through text-gray-400">₹{it.original}</span>}
                  </div>
                  <button
                    onClick={(e) => handleAdd(it, e)}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white flex-shrink-0"
                    style={{ background: TEAL }}
                  >
                    <ShoppingCart size={12} />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-3" style={{ boxShadow: "0 4px 14px rgba(15, 76, 95, 0.05)" }}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[13px] font-extrabold text-gray-900">⭐ Recommended for You</h3>
              <button onClick={() => goToCategory("skin")} className="text-[10px] font-bold active:scale-95 transition-transform" style={{ color: TEAL }}>View All ›</button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {RECOMMENDED.map((it) => <ProductCard key={`rec-${it.id}`} item={it} />)}
            </div>
          </div>
        </section>

        {/* Trust badges footer */}
        <div className="mt-6 rounded-2xl px-3 py-4 grid grid-cols-2 md:grid-cols-4 gap-3" style={{ background: "hsl(165, 60%, 95%)" }}>
          {[
            { Icon: Shield, label: "Expert Pharmacist", sub: "Advice" },
            { Icon: Pill, label: "Genuine Medicines", sub: "Assured" },
            { Icon: Truck, label: "Doorstep Delivery", sub: "On Time" },
            { Icon: Lock, label: "Secure Packaging", sub: "Safe & Discreet" },
          ].map(({ Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-2">
              <Icon size={20} style={{ color: BLUE }} strokeWidth={2.2} />
              <div>
                <p className="text-[11px] font-bold text-gray-900 leading-tight">{label}</p>
                <p className="text-[9px] text-gray-600 leading-tight">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default MedicinePage;
