import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { CATEGORY_LABEL, COLLECTIONS, type StoreCategory } from "@/lib/storeMeta";
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

      <div className="grid grid-cols-2 gap-3 p-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden glass-card">
                <Skeleton className="aspect-square w-full" />
                <div className="p-3 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/3" />
                  <Skeleton className="h-9 w-full" />
                </div>
              </div>
            ))
          : COLLECTIONS.map((col, i) => {
              const tile = tiles[col.id];
              const count = tile?.count ?? 0;
              return (
                <motion.div
                  key={col.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="rounded-2xl overflow-hidden glass-card flex flex-col"
                >
                  <button
                    onClick={() => navigate(`/store/${category}/${col.id}`)}
                    className="block aspect-square w-full bg-muted relative"
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
                  <div className="p-3 flex-1 flex flex-col gap-2">
                    <div>
                      <div className="font-semibold text-sm text-foreground line-clamp-1">{col.title}</div>
                      <div className="text-[11px] text-muted-foreground">{count} products</div>
                    </div>
                    <Button
                      size="sm"
                      className="w-full mt-auto"
                      onClick={() => navigate(`/store/${category}/${col.id}`)}
                    >
                      Shop Now
                    </Button>
                  </div>
                </motion.div>
              );
            })}
      </div>
    </div>
  );
};

export default StoreCollectionsPage;
