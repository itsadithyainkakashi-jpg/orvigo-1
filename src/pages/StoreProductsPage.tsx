import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, PackageOpen } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  CATEGORY_LABEL,
  COLLECTION_LABEL,
  type StoreCategory,
  type StoreCollection,
} from "@/lib/storeMeta";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";

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
        .select("id, name, price, original_price, image_url")
        .eq("category", category)
        .eq("collection", collection)
        .order("created_at", { ascending: false });
      if (!active) return;
      if (error) {
        setError(error.message);
      } else {
        setProducts(data ?? []);
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
          {products.map((p, i) => (
            <motion.button
              key={p.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.03, 0.3) }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(`/product/${p.id}`)}
              className="rounded-2xl overflow-hidden glass-card text-left flex flex-col"
            >
              <div className="aspect-square w-full bg-muted">
                <img src={p.image_url} alt={p.name} loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="p-2.5 space-y-1">
                <div className="text-sm font-medium text-foreground line-clamp-1">{p.name}</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-semibold text-foreground">₹{p.price}</span>
                  {p.original_price && p.original_price > p.price && (
                    <span className="text-[11px] line-through text-muted-foreground">
                      ₹{p.original_price}
                    </span>
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
};

export default StoreProductsPage;
