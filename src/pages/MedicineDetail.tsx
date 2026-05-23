import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ShoppingBag,
  ShieldCheck,
  Truck,
  Star,
  Heart,
  CheckCircle2,
  Pill,
  AlertTriangle,
  Clock,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { allProducts } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import MedicineProductImage from "@/components/MedicineProductImage";
import type { Product } from "@/contexts/CartContext";
import { toast } from "sonner";

// Premium pharmacy palette
const ACCENT = "hsl(170, 80%, 32%)";
const ACCENT_SOFT = "hsl(170, 70%, 95%)";
const BLUE = "hsl(200, 80%, 42%)";
const BG = "hsl(0, 0%, 100%)";
const SURFACE = "hsl(180, 30%, 98%)";
const TEXT = "hsl(215, 25%, 15%)";
const MUTED = "hsl(215, 12%, 45%)";
const BORDER = "hsl(180, 20%, 92%)";

const MedicineDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, totalItems } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const local = allProducts.find((p) => p.id === id);
  const [dbProduct, setDbProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(!local);

  useEffect(() => {
    if (local || !id) return;
    let active = true;
    (async () => {
      const { data } = await supabase
        .from("products")
        .select("id, name, price, original_price, image_url, rating, category, description, badge")
        .eq("id", id)
        .maybeSingle();
      if (!active) return;
      if (data) {
        setDbProduct({
          id: data.id,
          name: data.name,
          price: Number(data.price),
          originalPrice: data.original_price ? Number(data.original_price) : undefined,
          image: data.image_url,
          rating: Number(data.rating ?? 4),
          category: data.category,
          description: data.description ?? "",
          badge: data.badge ?? undefined,
          sizes: [],
        });
      }
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [id, local]);

  const product = local ?? dbProduct;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: BG }}>
        <p style={{ color: MUTED }}>Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: BG }}>
        <p style={{ color: TEXT }}>Medicine not found</p>
      </div>
    );
  }

  const original = product.originalPrice ?? Math.round(product.price * 1.25);
  const discount = Math.max(0, Math.round(((original - product.price) / original) * 100));
  const wished = isWishlisted(product.id);

  const handleAdd = () => {
    addToCart(product, 1);
    toast.success(`${product.name} added to cart`);
  };

  const handleBuy = () => {
    addToCart(product, 1);
    navigate("/cart");
  };

  return (
    <div className="min-h-screen pb-28" style={{ background: BG }}>
      {/* Top bar */}
      <div
        className="sticky top-0 z-50 flex items-center justify-between px-4 py-3"
        style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${BORDER}` }}
      >
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: SURFACE }}
          aria-label="Back"
        >
          <ArrowLeft size={20} style={{ color: TEXT }} />
        </button>
        <p className="text-sm font-semibold" style={{ color: TEXT }}>
          Medicine Details
        </p>
        <button
          onClick={() => navigate("/cart")}
          className="w-10 h-10 rounded-full flex items-center justify-center relative"
          style={{ background: SURFACE }}
          aria-label="Cart"
        >
          <ShoppingBag size={18} style={{ color: TEXT }} />
          {totalItems > 0 && (
            <span
              className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white"
              style={{ background: ACCENT }}
            >
              {totalItems}
            </span>
          )}
        </button>
      </div>

      {/* Product image - transparent on soft surface */}
      <div className="px-4 pt-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="relative rounded-3xl overflow-hidden flex items-center justify-center p-6"
          style={{
            background: `linear-gradient(135deg, ${ACCENT_SOFT}, #ffffff)`,
            border: `1px solid ${BORDER}`,
            aspectRatio: "1 / 1",
            boxShadow: "0 10px 30px rgba(15, 76, 95, 0.08)",
          }}
        >
          <MedicineProductImage
            productId={product.id}
            src={product.image}
            alt={product.name}
            className="w-full h-full"
          />
          {discount > 0 && (
            <span
              className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold text-white"
              style={{ background: ACCENT }}
            >
              {discount}% OFF
            </span>
          )}
          <button
            onClick={() => toggleWishlist(product)}
            aria-label="Wishlist"
            className="absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.95)", boxShadow: "0 4px 10px rgba(0,0,0,0.08)" }}
          >
            <Heart
              size={18}
              style={{ color: wished ? "#ef4444" : MUTED }}
              fill={wished ? "#ef4444" : "none"}
            />
          </button>
        </motion.div>
      </div>

      {/* Details */}
      <div className="px-4 mt-5 space-y-4">
        <div>
          <h1 className="text-xl font-bold leading-tight" style={{ color: TEXT }}>
            {product.name}
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <div
              className="flex items-center gap-1 px-2 py-0.5 rounded-md"
              style={{ background: ACCENT_SOFT }}
            >
              <Star size={12} fill={ACCENT} style={{ color: ACCENT }} />
              <span className="text-xs font-semibold" style={{ color: ACCENT }}>
                {product.rating.toFixed(1)}
              </span>
            </div>
            <span className="text-xs" style={{ color: MUTED }}>
              (1,248 reviews)
            </span>
            <span
              className="text-xs font-semibold flex items-center gap-1 ml-1"
              style={{ color: ACCENT }}
            >
              <CheckCircle2 size={12} /> In Stock
            </span>
          </div>
          {product.description && (
            <p className="text-sm mt-3 leading-relaxed" style={{ color: MUTED }}>
              {product.description}
            </p>
          )}
        </div>

        {/* Price */}
        <div
          className="rounded-2xl px-4 py-3"
          style={{ background: SURFACE, border: `1px solid ${BORDER}` }}
        >
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-2xl font-bold" style={{ color: TEXT }}>
              ₹{product.price}
            </span>
            {original > product.price && (
              <>
                <span className="text-sm line-through" style={{ color: MUTED }}>
                  ₹{original}
                </span>
                <span className="text-xs font-bold" style={{ color: ACCENT }}>
                  {discount}% off
                </span>
              </>
            )}
          </div>
          <p className="text-[11px] mt-1" style={{ color: MUTED }}>
            Inclusive of all taxes
          </p>
        </div>

        {/* Trust strip */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: ShieldCheck, label: "100% Genuine" },
            { icon: Truck, label: "Free Delivery" },
            { icon: Clock, label: "Quick Dispatch" },
          ].map((b) => (
            <div
              key={b.label}
              className="rounded-xl p-2.5 flex flex-col items-center text-center gap-1"
              style={{ background: SURFACE, border: `1px solid ${BORDER}` }}
            >
              <b.icon size={16} style={{ color: ACCENT }} />
              <span className="text-[10px] font-medium" style={{ color: TEXT }}>
                {b.label}
              </span>
            </div>
          ))}
        </div>

        {/* Usage */}
        <Section title="Usage Information" icon={Pill} iconColor={BLUE}>
          <p className="text-sm leading-relaxed" style={{ color: MUTED }}>
            Take as directed by your physician. Typically 1 tablet/dose with water, after food.
            Do not exceed the recommended dose. Maintain consistent timing for best results.
          </p>
        </Section>

        {/* Side effects */}
        <Section title="Possible Side Effects" icon={AlertTriangle} iconColor="hsl(35, 90%, 50%)">
          <ul className="text-sm space-y-1 list-disc pl-4" style={{ color: MUTED }}>
            <li>Mild drowsiness or dizziness</li>
            <li>Nausea or stomach discomfort</li>
            <li>Headache (uncommon)</li>
            <li>Consult a doctor if symptoms persist</li>
          </ul>
        </Section>

        {/* Delivery */}
        <Section title="Delivery Details" icon={Truck} iconColor={ACCENT}>
          <p className="text-sm leading-relaxed" style={{ color: MUTED }}>
            Free standard delivery in 2–3 business days. Express delivery available at checkout.
            Cash on delivery supported across all pincodes.
          </p>
        </Section>
      </div>

      {/* Bottom action bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3 flex gap-3"
        style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(14px)", borderTop: `1px solid ${BORDER}` }}
      >
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleAdd}
          className="flex-1 h-12 rounded-xl text-sm font-bold"
          style={{
            background: BG,
            color: ACCENT,
            border: `1.5px solid ${ACCENT}`,
          }}
        >
          Add to Cart
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleBuy}
          className="flex-1 h-12 rounded-xl text-sm font-bold text-white"
          style={{ background: `linear-gradient(135deg, hsl(150, 75%, 42%), ${ACCENT})` }}
        >
          Buy Now
        </motion.button>
      </div>
    </div>
  );
};

const Section = ({
  title,
  icon: Icon,
  iconColor,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  iconColor: string;
  children: React.ReactNode;
}) => (
  <div
    className="rounded-2xl p-4"
    style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(10px)", border: `1px solid ${BORDER}` }}
  >
    <div className="flex items-center gap-2 mb-2">
      <Icon size={16} style={{ color: iconColor }} />
      <h3 className="text-sm font-semibold" style={{ color: TEXT }}>
        {title}
      </h3>
    </div>
    {children}
  </div>
);

export default MedicineDetail;
