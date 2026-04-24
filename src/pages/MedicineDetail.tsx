import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingBag, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { allProducts } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import type { Product } from "@/contexts/CartContext";
import { toast } from "sonner";

// Clean clinical palette — used only on this medicine detail page.
const ACCENT = "hsl(200, 75%, 40%)";
const BG = "hsl(0, 0%, 100%)";
const SURFACE = "hsl(210, 30%, 98%)";
const TEXT = "hsl(215, 25%, 15%)";
const MUTED = "hsl(215, 12%, 45%)";
const BORDER = "hsl(210, 20%, 92%)";

const MedicineDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, totalItems } = useCart();
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
        style={{ background: BG, borderBottom: `1px solid ${BORDER}` }}
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

      {/* Product image */}
      <div className="px-4 pt-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl overflow-hidden flex items-center justify-center"
          style={{
            background: SURFACE,
            border: `1px solid ${BORDER}`,
            aspectRatio: "1 / 1",
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-6"
            loading="lazy"
          />
        </motion.div>
      </div>

      {/* Details */}
      <div className="px-4 mt-5 space-y-4">
        <div>
          <h1 className="text-xl font-bold leading-tight" style={{ color: TEXT }}>
            {product.name}
          </h1>
          {product.description && (
            <p className="text-sm mt-2 leading-relaxed" style={{ color: MUTED }}>
              {product.description}
            </p>
          )}
        </div>

        <div
          className="rounded-xl px-4 py-3 flex items-baseline gap-2"
          style={{ background: SURFACE, border: `1px solid ${BORDER}` }}
        >
          <span className="text-2xl font-bold" style={{ color: TEXT }}>
            ₹{product.price}
          </span>
          <span className="text-xs" style={{ color: MUTED }}>
            inclusive of all taxes
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs" style={{ color: MUTED }}>
          <ShieldCheck size={14} style={{ color: ACCENT }} />
          <span>100% genuine medicine</span>
        </div>
      </div>

      {/* Bottom action bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3 flex gap-3"
        style={{ background: BG, borderTop: `1px solid ${BORDER}` }}
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
          style={{ background: ACCENT }}
        >
          Buy Now
        </motion.button>
      </div>
    </div>
  );
};

export default MedicineDetail;
