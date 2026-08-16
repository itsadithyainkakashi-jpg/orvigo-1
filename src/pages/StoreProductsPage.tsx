import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, PackageOpen, Heart, ShoppingCart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useCart, type Product } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import {
  CATEGORY_LABEL,
  COLLECTION_LABEL,
  type StoreCategory,
  type StoreCollection,
} from "@/lib/storeMeta";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";

// Earlier Fashion palette — soft orange accents on white cards
const ORANGE = "hsl(18, 95%, 55%)";
const CARD_BG = "hsl(var(--card))";
const TEXT_DARK = "hsl(20, 14%, 15%)";
const TEXT_MUTED = "hsl(20, 8%, 45%)";


interface ProductRow {
  id: string;
  name: string;
  price: number;
  original_price: number | null;
  image_url: string;
  updated_at?: string;
}

/** Append updated_at as cache-bust so freshly re-uploaded images refresh. */
const withCacheBust = (url: string, updatedAt?: string) => {
  if (!url) return url;
  if (!updatedAt) return url;
  const v = encodeURIComponent(updatedAt);
  return url.includes("?") ? `${url}&v=${v}` : `${url}?v=${v}`;
};

const StoreProductsPage = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const { category, collection } = useParams<{
    category: StoreCategory;
    collection: StoreCollection;
  }>();
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!category || !collection) return;
    let active = true;

    const load = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("id, name, price, original_price, image_url, updated_at")
        .eq("category", category)
        .eq("collection", collection)
        .order("created_at", { ascending: false });
      if (!active) return;
      if (error) {
        setError(error.message);
      } else {
        // Dedupe by id (defensive; DB should already be unique).
        const seen = new Set<string>();
        const unique = (data ?? []).filter((p) => {
          if (seen.has(p.id)) return false;
          seen.add(p.id);
          return true;
        });
        setProducts(unique);
        setError(null);
      }
      setLoading(false);
    };

    load();

    const channel = supabase
      .channel(`products-${category}-${collection}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "products" },
        () => load(),
      )
      .subscribe();

    return () => {
      active = false;
      supabase.removeChannel(channel);
    };
  }, [category, collection]);

  if (!category || !collection) return null;

  return (
    <div className="min-h-screen pb-8" style={{ background: "hsl(var(--background))" }}>
      <header className="sticky top-0 z-10 flex items-center gap-2 p-4 glass-card-strong">
        <button onClick={() => navigate(-1)} aria-label="Back" className="p-2 -ml-2">
          <ChevronLeft className="text-foreground" />
        </button>
        <div>
          <h1 className="text-base font-semibold text-foreground leading-tight">
            {COLLECTION_LABEL[collection]}
          </h1>
          <p className="text-[11px] text-muted-foreground">{CATEGORY_LABEL[category]}</p>
        </div>
      </header>

      {loading ? (
        <div className="grid grid-cols-2 gap-3 p-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        <div className="p-8 text-center text-sm text-destructive">{error}</div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
          <PackageOpen className="text-muted-foreground mb-3" size={48} />
          <p className="text-sm text-muted-foreground">No products yet in this collection.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 p-4">
          {products.map((p, i) => {
            const img = withCacheBust(p.image_url, p.updated_at);
            const asProduct: Product = {
              id: p.id,
              name: p.name,
              price: p.price,
              originalPrice: p.original_price ?? undefined,
              image: img,
              rating: 4.5,
              category: "Fashion",
              description: "",
            };
            const wished = isWishlisted(p.id);
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.05, 0.3) }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(`/product/${p.id}`)}
                className="rounded-2xl overflow-hidden cursor-pointer relative"
                style={{ background: CARD_BG, boxShadow: "0 4px 14px hsla(20,14%,15%,0.06)" }}
              >
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={img}
                    alt={p.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleWishlist(asProduct); }}
                    aria-label="Wishlist"
                    className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ background: ORANGE }}
                  >
                    <Heart size={13} fill={wished ? "white" : "none"} color="white" />
                  </button>
                </div>
                <div className="p-2.5">
                  <p className="text-[12px] font-bold truncate" style={{ color: TEXT_DARK }}>{p.name}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: TEXT_MUTED }}>Bloom with elegance</p>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="flex items-baseline gap-1.5">
                      <span className="text-[12px] font-bold" style={{ color: TEXT_DARK }}>₹{p.price}</span>
                      {p.original_price && p.original_price > p.price && (
                        <span className="text-[10px] line-through" style={{ color: TEXT_MUTED }}>₹{p.original_price}</span>
                      )}
                    </span>
                    <button
                      onClick={(e) => { e.stopPropagation(); addToCart(asProduct, 1); }}
                      aria-label="Add to cart"
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ background: ORANGE }}
                    >
                      <ShoppingCart size={11} color="white" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      )}
    </div>
  );
};

export default StoreProductsPage;
