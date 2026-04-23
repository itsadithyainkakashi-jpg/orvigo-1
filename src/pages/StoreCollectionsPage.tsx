import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { CATEGORY_LABEL, COLLECTIONS_BY_CATEGORY, type StoreCategory } from "@/lib/storeMeta";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface Tile {
  collection: string;
  count: number;
  image: string | null;
}

const StoreCollectionsPage = () => {
  const navigate = useNavigate();
  const { category } = useParams<{ category: StoreCategory }>();
  const [tiles, setTiles] = useState<Record<string, Tile>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!category) return;
    let active = true;

    const load = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("collection, image_url")
        .eq("category", category);
      if (!active) return;
      if (error || !data) {
        setTiles({});
        setLoading(false);
        return;
      }
      const grouped: Record<string, Tile> = {};
      for (const row of data) {
        const key = row.collection ?? "uncategorized";
        if (!grouped[key]) grouped[key] = { collection: key, count: 0, image: row.image_url };
        grouped[key].count += 1;
      }
      setTiles(grouped);
      setLoading(false);
    };

    load();

    const channel = supabase
      .channel(`products-cat-${category}`)
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
  }, [category]);

  if (!category) return null;

  return (
    <div className="min-h-screen pb-8" style={{ background: "hsl(var(--background))" }}>
      <header className="sticky top-0 z-10 flex items-center gap-2 p-4 glass-card-strong">
        <button onClick={() => navigate(-1)} aria-label="Back" className="p-2 -ml-2">
          <ChevronLeft className="text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">{CATEGORY_LABEL[category]}</h1>
      </header>

      <div className="px-4 pt-5 pb-2 text-center">
        <h2 className="text-2xl font-extrabold tracking-wide text-foreground uppercase">
          Collections
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4 p-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden">
                <Skeleton className="aspect-square w-full rounded-xl" />
                <div className="pt-3 space-y-2">
                  <Skeleton className="h-4 w-3/4 mx-auto" />
                  <Skeleton className="h-3 w-1/3 mx-auto" />
                  <Skeleton className="h-10 w-full mt-2" />
                </div>
              </div>
            ))
          : COLLECTIONS.map((col, i) => {
              const tile = tiles[col.id];
              const count = tile?.count ?? 0;
              const go = () => navigate(`/store/${category}/${col.id}`);
              return (
                <motion.div
                  key={col.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex flex-col"
                >
                  <button
                    onClick={go}
                    className="block aspect-square w-full bg-muted rounded-xl overflow-hidden glass-card"
                    style={{ boxShadow: "0 8px 24px hsla(220, 50%, 4%, 0.4)" }}
                    aria-label={`Open ${col.title}`}
                  >
                    {tile?.image ? (
                      <img
                        src={tile.image}
                        alt={col.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                        No image
                      </div>
                    )}
                  </button>

                  <div className="text-center mt-3">
                    <div className="text-sm font-extrabold tracking-wide text-foreground uppercase line-clamp-1">
                      {col.title}
                    </div>
                    <div className="text-[11px] mt-1 uppercase tracking-wider text-muted-foreground">
                      {count} Products
                    </div>
                  </div>

                  <Button
                    onClick={go}
                    className="mt-3 w-full rounded-none h-11 text-xs font-bold tracking-widest uppercase bg-foreground text-background hover:bg-foreground/90"
                  >
                    Shop Now
                  </Button>
                </motion.div>
              );
            })}
      </div>
    </div>
  );
};

export default StoreCollectionsPage;
