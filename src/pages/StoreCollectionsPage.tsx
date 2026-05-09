import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ImageOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  CATEGORY_LABEL,
  COLLECTIONS_BY_CATEGORY,
  type StoreCategory,
} from "@/lib/storeMeta";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface Tile {
  collection: string;
  count: number;
  image: string | null;
}

const CATEGORIES: StoreCategory[] = ["mens", "womens"];

const StoreCollectionsPage = () => {
  const navigate = useNavigate();
  const { category: routeCategory } = useParams<{ category: StoreCategory }>();

  const initial: StoreCategory =
    routeCategory && CATEGORIES.includes(routeCategory) ? routeCategory : "mens";
  const [category, setCategory] = useState<StoreCategory>(initial);
  const [tiles, setTiles] = useState<Record<string, Tile>>({});
  const [loading, setLoading] = useState(true);

  // Sync state with URL param when it changes (e.g. external navigation).
  useEffect(() => {
    if (routeCategory && CATEGORIES.includes(routeCategory)) {
      setCategory(routeCategory);
    }
  }, [routeCategory]);

  useEffect(() => {
    let active = true;
    setLoading(true);

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
        if (!grouped[key])
          grouped[key] = { collection: key, count: 0, image: row.image_url };
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

  const displayTiles = useMemo(
    () => COLLECTIONS_BY_CATEGORY[category] ?? [],
    [category],
  );

  return (
    <div
      className="min-h-screen pb-24"
      style={{ background: "hsl(var(--background))" }}
    >
      <header className="sticky top-0 z-10 flex items-center gap-2 p-4 glass-card-strong">
        <button
          onClick={() => navigate("/home")}
          aria-label="Back"
          className="p-2 -ml-2"
        >
          <ChevronLeft className="text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">Collections</h1>
      </header>

      {/* MEN / WOMEN toggle */}
      <div className="flex justify-center pt-5">
        <div
          className="relative inline-flex p-1 rounded-full"
          style={{
            background: "hsla(220, 30%, 10%, 0.85)",
            border: "1px solid hsla(210, 40%, 95%, 0.08)",
          }}
        >
          {CATEGORIES.map((cat) => {
            const isActive = category === cat;
            return (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className="relative z-10 px-7 py-2 text-sm font-bold tracking-widest uppercase transition-colors"
                style={{
                  color: isActive ? "hsl(220, 30%, 8%)" : "hsla(210, 20%, 80%, 0.7)",
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="genderToggle"
                    className="absolute inset-0 rounded-full bg-foreground"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{CATEGORY_LABEL[cat]}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-4 pt-5 pb-2 text-center">
        <h2 className="text-xl font-extrabold tracking-wide text-foreground uppercase">
          {CATEGORY_LABEL[category]}'s Collection
        </h2>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={category}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.25 }}
          className="p-4 space-y-4"
        >
          {/* Wide banner tiles (with bannerImage) */}
          {!loading &&
            displayTiles
              .filter((c) => c.bannerImage)
              .map((col, i) => {
                const dbTile = col.id ? tiles[col.id] : undefined;
                const count = dbTile?.count ?? col.staticCount ?? 0;
                const disabled = col.comingSoon || (!col.id && !col.route);
                const go = () => {
                  if (disabled) return;
                  if (col.route) return navigate(col.route);
                  if (col.id) navigate(`/store/${category}/${col.id}`);
                };
                return (
                  <motion.button
                    key={`banner-${col.title}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={go}
                    disabled={disabled}
                    aria-label={`Open ${col.title}`}
                    className="relative block w-full h-36 rounded-2xl overflow-hidden glass-card disabled:opacity-70"
                    style={{ boxShadow: "0 8px 24px hsla(220, 50%, 4%, 0.4)" }}
                  >
                    <img
                      src={col.bannerImage}
                      alt={col.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{ objectPosition: "center 30%" }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(90deg, hsla(220,50%,4%,0.78) 0%, hsla(220,50%,4%,0.45) 55%, hsla(220,50%,4%,0.15) 100%)",
                      }}
                    />
                    <div className="relative z-10 h-full flex flex-col justify-center items-start px-5 text-left">
                      <div className="text-[10px] uppercase tracking-[0.2em] text-white/70">
                        {CATEGORY_LABEL[category]}
                      </div>
                      <div className="text-xl font-extrabold tracking-wide text-white uppercase mt-1">
                        {col.title}
                      </div>
                      <div className="text-[11px] mt-1 uppercase tracking-wider text-white/80">
                        {disabled ? "Coming Soon" : `${count} Products`}
                      </div>
                    </div>
                  </motion.button>
                );
              })}

          {/* Square grid tiles (no bannerImage) */}
          <div className="grid grid-cols-2 gap-4">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden">
                    <Skeleton className="aspect-square w-full rounded-xl" />
                    <div className="pt-3 space-y-2">
                      <Skeleton className="h-4 w-3/4 mx-auto" />
                      <Skeleton className="h-3 w-1/3 mx-auto" />
                      <Skeleton className="h-10 w-full mt-2" />
                    </div>
                  </div>
                ))
              : displayTiles
                  .filter((c) => !c.bannerImage)
                  .map((col, i) => {
                    const dbTile = col.id ? tiles[col.id] : undefined;
                    const count = dbTile?.count ?? col.staticCount ?? 0;
                    const image = col.previewImage ?? dbTile?.image ?? null;
                    const disabled = col.comingSoon || (!col.id && !col.route);
                    const go = () => {
                      if (disabled) return;
                      if (col.route) {
                        navigate(col.route);
                        return;
                      }
                      if (col.id) navigate(`/store/${category}/${col.id}`);
                    };
                    return (
                      <motion.div
                        key={`${category}-${col.title}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className="flex flex-col"
                      >
                        <button
                          onClick={go}
                          disabled={disabled}
                          className="block aspect-square w-full bg-muted rounded-xl overflow-hidden glass-card disabled:opacity-70"
                          style={{ boxShadow: "0 8px 24px hsla(220, 50%, 4%, 0.4)" }}
                          aria-label={`Open ${col.title}`}
                        >
                          {image ? (
                            <img
                              src={image}
                              alt={col.title}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center gap-1 text-muted-foreground">
                              <ImageOff size={22} />
                              <span className="text-[10px] uppercase tracking-wider">
                                No image
                              </span>
                            </div>
                          )}
                        </button>

                        <div className="text-center mt-3">
                          <div className="text-sm font-extrabold tracking-wide text-foreground uppercase line-clamp-1">
                            {col.title}
                          </div>
                          <div className="text-[11px] mt-1 uppercase tracking-wider text-muted-foreground">
                            {disabled ? "Coming Soon" : `${count} Products`}
                          </div>
                        </div>

                        <Button
                          onClick={go}
                          disabled={disabled}
                          className="mt-3 w-full rounded-none h-11 text-xs font-bold tracking-widest uppercase bg-foreground text-background hover:bg-foreground/90 disabled:opacity-50"
                        >
                          {disabled ? "Coming Soon" : "Shop Now"}
                        </Button>
                      </motion.div>
                    );
                  })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default StoreCollectionsPage;
