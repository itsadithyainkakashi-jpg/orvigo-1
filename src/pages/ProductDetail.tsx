import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { Product } from "@/contexts/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Star,
  Heart,
  Share2,
  ShoppingBag,
  ChevronRight,
  Truck,
  ShieldCheck,
  RotateCcw,
  Tag,
} from "lucide-react";
import { allProducts } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { toast } from "sonner";

// Reference-accurate light theme palette (matches FashionPage)
const ORANGE = "hsl(18, 95%, 55%)";
const ORANGE_SOFT = "hsl(18, 95%, 96%)";
const BG = "hsl(30, 25%, 96%)";
const CARD_BG = "hsl(0, 0%, 100%)";
const TEXT = "hsl(20, 14%, 15%)";
const MUTED = "hsl(20, 10%, 45%)";
const BORDER = "hsl(20, 10%, 90%)";

const COLOR_SWATCHES = [
  { name: "Coral", hex: "hsl(8, 80%, 65%)" },
  { name: "Navy", hex: "hsl(220, 50%, 25%)" },
  { name: "Sand", hex: "hsl(35, 40%, 75%)" },
  { name: "Olive", hex: "hsl(80, 25%, 40%)" },
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, totalItems } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();
  const localProduct = allProducts.find((p) => p.id === id);
  const [dbProduct, setDbProduct] = useState<Product | null>(null);
  const [dbLoading, setDbLoading] = useState(!localProduct);

  useEffect(() => {
    if (localProduct || !id) return;
    let active = true;
    (async () => {
      const { data } = await supabase
        .from("products")
        .select("id, name, price, original_price, image_url, rating, category, description, badge, sizes")
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
          sizes: (data.sizes ?? ["S", "M", "L", "XL"]) as string[],
        });
      }
      setDbLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [id, localProduct]);

  const product = localProduct ?? dbProduct;

  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    localProduct?.sizes?.[0]
  );
  const [selectedColor, setSelectedColor] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [descExpanded, setDescExpanded] = useState(false);
  const [pincode, setPincode] = useState("");
  const [pinChecked, setPinChecked] = useState(false);

  useEffect(() => {
    if (product?.sizes?.length && !selectedSize) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product, selectedSize]);

  useEffect(() => {
    setCurrentImage(0);
  }, [product?.id]);

  if (dbLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: BG }}>
        <p style={{ color: MUTED }}>Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: BG }}
      >
        <p style={{ color: TEXT }}>Product not found</p>
      </div>
    );
  }

  const isWishlisted = wishlist.some((p) => p.id === product.id);
  const images =
    product.gallery && product.gallery.length > 0
      ? product.gallery
      : [product.image];

  const similar = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 8);

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const handleAddToCart = () => {
    addToCart(product, 1, selectedSize);
    toast.success(`${product.name} added to bag`);
  };

  const handleBuyNow = () => {
    addToCart(product, 1, selectedSize);
    navigate("/cart");
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: product.name, text: product.description });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied");
      }
    } catch {
      /* noop */
    }
  };

  const handleCheckPin = () => {
    if (pincode.length === 6) {
      setPinChecked(true);
      toast.success("Delivery available in your area");
    } else {
      toast.error("Enter a valid 6-digit pincode");
    }
  };

  return (
    <div className="min-h-screen pb-28" style={{ background: BG }}>
      {/* Top floating action bar */}
      <div className="fixed top-0 left-0 right-0 z-50 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{
            background: "hsla(0,0%,100%,0.95)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 2px 8px hsla(20,14%,15%,0.12)",
          }}
        >
          <ArrowLeft size={20} style={{ color: TEXT }} />
        </button>
        <div className="flex gap-2">
          <button
            onClick={handleShare}
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: "hsla(0,0%,100%,0.95)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 2px 8px hsla(20,14%,15%,0.12)",
            }}
          >
            <Share2 size={18} style={{ color: TEXT }} />
          </button>
          <button
            onClick={() => toggleWishlist(product)}
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: "hsla(0,0%,100%,0.95)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 2px 8px hsla(20,14%,15%,0.12)",
            }}
          >
            <Heart
              size={18}
              fill={isWishlisted ? ORANGE : "none"}
              color={isWishlisted ? ORANGE : TEXT}
            />
          </button>
          <button
            onClick={() => navigate("/cart")}
            className="w-10 h-10 rounded-full flex items-center justify-center relative"
            style={{
              background: "hsla(0,0%,100%,0.95)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 2px 8px hsla(20,14%,15%,0.12)",
            }}
          >
            <ShoppingBag size={18} style={{ color: TEXT }} />
            {totalItems > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white"
                style={{ background: ORANGE }}
              >
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Image carousel */}
      <div className="relative bg-white">
        <div className="relative w-full" style={{ aspectRatio: "3/4" }}>
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImage}
              src={images[currentImage]}
              alt={product.name}
              className="w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            />
          </AnimatePresence>
          {product.badge && (
            <span
              className="absolute top-16 left-4 text-[10px] font-bold px-2.5 py-1 rounded-full text-white"
              style={{ background: ORANGE }}
            >
              {product.badge}
            </span>
          )}
        </div>
        {/* Image indicator dots */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentImage(i)}
                className="h-1.5 rounded-full transition-all"
                style={{
                  background: currentImage === i ? ORANGE : "hsla(20,14%,15%,0.25)",
                  width: currentImage === i ? 18 : 6,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-4 -mt-4 relative z-10 space-y-3">
        {/* Title + price card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="rounded-2xl p-4"
          style={{
            background: CARD_BG,
            boxShadow: "0 4px 20px hsla(20,14%,15%,0.06)",
          }}
        >
          <p
            className="text-[11px] font-bold uppercase tracking-wider mb-1"
            style={{ color: ORANGE }}
          >
            Orvigo
          </p>
          <h1 className="text-lg font-bold leading-tight" style={{ color: TEXT }}>
            {product.name}
          </h1>

          <div className="flex items-center gap-2 mt-2">
            <div
              className="flex items-center gap-1 px-2 py-0.5 rounded"
              style={{ background: "hsl(145, 60%, 40%)" }}
            >
              <span className="text-[11px] font-bold text-white">
                {product.rating}
              </span>
              <Star size={10} fill="white" color="white" />
            </div>
            <span className="text-[11px]" style={{ color: MUTED }}>
              120 ratings · 24 reviews
            </span>
          </div>

          <div className="flex items-baseline gap-2 mt-3">
            <span className="text-2xl font-bold" style={{ color: TEXT }}>
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <>
                <span
                  className="text-sm line-through"
                  style={{ color: MUTED }}
                >
                  ₹{product.originalPrice}
                </span>
                <span
                  className="text-sm font-bold"
                  style={{ color: ORANGE }}
                >
                  {discount}% OFF
                </span>
              </>
            )}
          </div>
          <p className="text-[11px] mt-1" style={{ color: "hsl(145, 60%, 35%)" }}>
            inclusive of all taxes
          </p>
        </motion.div>

        {/* Color selection */}
        <div
          className="rounded-2xl p-4"
          style={{
            background: CARD_BG,
            boxShadow: "0 4px 20px hsla(20,14%,15%,0.06)",
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold" style={{ color: TEXT }}>
              Color:{" "}
              <span style={{ color: MUTED, fontWeight: 400 }}>
                {COLOR_SWATCHES[selectedColor].name}
              </span>
            </h3>
          </div>
          <div className="flex gap-2.5">
            {COLOR_SWATCHES.map((c, i) => (
              <button
                key={c.name}
                onClick={() => setSelectedColor(i)}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                style={{
                  background: c.hex,
                  border:
                    selectedColor === i
                      ? `2px solid ${ORANGE}`
                      : `2px solid ${BORDER}`,
                  boxShadow:
                    selectedColor === i
                      ? "0 2px 8px hsla(18,95%,55%,0.3)"
                      : "none",
                  outline:
                    selectedColor === i
                      ? `2px solid ${CARD_BG}`
                      : "none",
                  outlineOffset: -4,
                }}
                aria-label={c.name}
              />
            ))}
          </div>
        </div>

        {/* Size selection */}
        {product.sizes && product.sizes.length > 0 && (
          <div
            className="rounded-2xl p-4"
            style={{
              background: CARD_BG,
              boxShadow: "0 4px 20px hsla(20,14%,15%,0.06)",
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold" style={{ color: TEXT }}>
                Select Size
              </h3>
              <button
                className="text-[11px] font-bold flex items-center gap-0.5"
                style={{ color: ORANGE }}
              >
                Size Guide <ChevronRight size={12} />
              </button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {product.sizes.map((size) => {
                const active = selectedSize === size;
                return (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className="min-w-[44px] h-11 px-3 rounded-full text-sm font-semibold transition-all"
                    style={{
                      background: active ? ORANGE : CARD_BG,
                      color: active ? "white" : TEXT,
                      border: active
                        ? `1.5px solid ${ORANGE}`
                        : `1.5px solid ${BORDER}`,
                      boxShadow: active
                        ? "0 4px 12px hsla(18,95%,55%,0.3)"
                        : "none",
                    }}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Delivery info */}
        <div
          className="rounded-2xl p-4"
          style={{
            background: CARD_BG,
            boxShadow: "0 4px 20px hsla(20,14%,15%,0.06)",
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Truck size={16} style={{ color: ORANGE }} />
            <h3 className="text-sm font-semibold" style={{ color: TEXT }}>
              Delivery Options
            </h3>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder="Enter pincode"
              value={pincode}
              onChange={(e) => {
                setPincode(e.target.value.replace(/\D/g, ""));
                setPinChecked(false);
              }}
              className="flex-1 h-11 px-4 rounded-full text-sm outline-none"
              style={{
                background: BG,
                color: TEXT,
                border: `1px solid ${BORDER}`,
              }}
            />
            <button
              onClick={handleCheckPin}
              className="px-5 h-11 rounded-full text-xs font-bold"
              style={{
                color: ORANGE,
                border: `1.5px solid ${ORANGE}`,
                background: CARD_BG,
              }}
            >
              CHECK
            </button>
          </div>
          {pinChecked && (
            <p
              className="text-[12px] mt-2.5 font-medium"
              style={{ color: "hsl(145, 60%, 35%)" }}
            >
              ✓ Delivery by {new Date(Date.now() + 3 * 86400000).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}
            </p>
          )}
          <div
            className="grid grid-cols-3 gap-2 mt-4 pt-4"
            style={{ borderTop: `1px solid ${BORDER}` }}
          >
            <div className="flex flex-col items-center gap-1 text-center">
              <RotateCcw size={16} style={{ color: ORANGE }} />
              <p className="text-[10px] font-medium" style={{ color: TEXT }}>
                7-Day Returns
              </p>
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <ShieldCheck size={16} style={{ color: ORANGE }} />
              <p className="text-[10px] font-medium" style={{ color: TEXT }}>
                100% Authentic
              </p>
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <Truck size={16} style={{ color: ORANGE }} />
              <p className="text-[10px] font-medium" style={{ color: TEXT }}>
                Free Delivery
              </p>
            </div>
          </div>
        </div>

        {/* Offers */}
        <div
          className="rounded-2xl p-4"
          style={{
            background: CARD_BG,
            boxShadow: "0 4px 20px hsla(20,14%,15%,0.06)",
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Tag size={16} style={{ color: ORANGE }} />
            <h3 className="text-sm font-semibold" style={{ color: TEXT }}>
              Offers & Discounts
            </h3>
          </div>
          <div className="space-y-2">
            {[
              { code: "ORVIGO10", text: "Extra 10% off on prepaid orders" },
              { code: "FIRST200", text: "₹200 off on your first purchase" },
            ].map((o) => (
              <div
                key={o.code}
                className="flex items-center justify-between p-3 rounded-xl"
                style={{ background: ORANGE_SOFT }}
              >
                <div>
                  <p className="text-[12px] font-bold" style={{ color: TEXT }}>
                    {o.code}
                  </p>
                  <p className="text-[11px]" style={{ color: MUTED }}>
                    {o.text}
                  </p>
                </div>
                <button
                  className="text-[11px] font-bold"
                  style={{ color: ORANGE }}
                  onClick={() => {
                    navigator.clipboard.writeText(o.code);
                    toast.success("Code copied");
                  }}
                >
                  COPY
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <div
          className="rounded-2xl p-4"
          style={{
            background: CARD_BG,
            boxShadow: "0 4px 20px hsla(20,14%,15%,0.06)",
          }}
        >
          <h3 className="text-sm font-semibold mb-2" style={{ color: TEXT }}>
            Product Details
          </h3>
          <p
            className="text-[13px] leading-relaxed"
            style={{
              color: MUTED,
              display: "-webkit-box",
              WebkitLineClamp: descExpanded ? "unset" : 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {product.description} Crafted from premium fabric for everyday
            comfort and a flattering silhouette. Perfect for casual outings,
            workdays, and weekend brunches alike.
          </p>
          <button
            onClick={() => setDescExpanded((v) => !v)}
            className="text-[12px] font-bold mt-2"
            style={{ color: ORANGE }}
          >
            {descExpanded ? "Read less" : "Read more"}
          </button>
        </div>

        {/* Similar products */}
        {similar.length > 0 && (
          <div className="pt-2">
            <div className="flex items-center justify-between mb-3 px-1">
              <h3 className="text-base font-bold" style={{ color: TEXT }}>
                Similar Products
              </h3>
              <button
                onClick={() => navigate("/fashion")}
                className="text-[12px] font-bold flex items-center gap-0.5"
                style={{ color: ORANGE }}
              >
                View All <ChevronRight size={14} />
              </button>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
              {similar.map((p) => (
                <motion.button
                  key={p.id}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    navigate(`/product/${p.id}`);
                    setCurrentImage(0);
                    setSelectedSize(p.sizes?.[0]);
                  }}
                  className="flex-shrink-0 w-36 rounded-2xl overflow-hidden text-left"
                  style={{
                    background: CARD_BG,
                    boxShadow: "0 4px 12px hsla(20,14%,15%,0.06)",
                  }}
                >
                  <div className="w-full aspect-square overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-2.5">
                    <p
                      className="text-[12px] font-semibold truncate"
                      style={{ color: TEXT }}
                    >
                      {p.name}
                    </p>
                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span
                        className="text-[13px] font-bold"
                        style={{ color: TEXT }}
                      >
                        ₹{p.price}
                      </span>
                      {p.originalPrice && (
                        <span
                          className="text-[10px] line-through"
                          style={{ color: MUTED }}
                        >
                          ₹{p.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky bottom CTA */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3 flex gap-3"
        style={{
          background: "hsla(0,0%,100%,0.98)",
          backdropFilter: "blur(20px)",
          borderTop: `1px solid ${BORDER}`,
          paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 12px)",
          boxShadow: "0 -4px 20px hsla(20,14%,15%,0.06)",
        }}
      >
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleAddToCart}
          className="flex-1 h-12 rounded-full text-sm font-bold flex items-center justify-center gap-2"
          style={{
            color: ORANGE,
            border: `1.5px solid ${ORANGE}`,
            background: CARD_BG,
          }}
        >
          <ShoppingBag size={16} />
          ADD TO BAG
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleBuyNow}
          className="flex-1 h-12 rounded-full text-sm font-bold text-white"
          style={{
            background: `linear-gradient(135deg, ${ORANGE}, hsl(14, 90%, 50%))`,
            boxShadow: "0 6px 16px hsla(18,95%,55%,0.4)",
          }}
        >
          BUY NOW
        </motion.button>
      </div>
    </div>
  );
};

export default ProductDetail;
