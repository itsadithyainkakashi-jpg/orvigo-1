import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, Upload } from "lucide-react";
import { CATEGORY_LABEL, type StoreCategory } from "@/lib/storeMeta";
import { useIsAdmin } from "@/hooks/useIsAdmin";

const cats: { id: StoreCategory; gradient: string }[] = [
  { id: "mens", gradient: "from-blue-500/30 to-indigo-700/30" },
  { id: "womens", gradient: "from-pink-500/30 to-fuchsia-700/30" },
];

const StoreCategoriesPage = () => {
  const navigate = useNavigate();
  const { isAdmin } = useIsAdmin();

  return (
    <div className="min-h-screen pb-8" style={{ background: "hsl(var(--background))" }}>
      <header className="sticky top-0 z-10 flex items-center justify-between p-4 glass-card-strong">
        <button onClick={() => navigate("/home")} aria-label="Back" className="p-2 -ml-2">
          <ChevronLeft className="text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">Shop by Category</h1>
        {isAdmin ? (
          <button onClick={() => navigate("/admin/upload")} aria-label="Upload" className="p-2 -mr-2">
            <Upload className="text-foreground" size={20} />
          </button>
        ) : (
          <div className="w-9" />
        )}
      </header>

      <div className="grid grid-cols-2 gap-3 p-4">
        {cats.map((c, i) => (
          <motion.button
            key={c.id}
            onClick={() => navigate(`/store/${c.id}`)}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileTap={{ scale: 0.97 }}
            className={`relative aspect-[3/4] rounded-3xl overflow-hidden glass-card bg-gradient-to-br ${c.gradient} flex items-end p-4`}
          >
            <div className="text-left">
              <div className="text-2xl font-bold text-foreground">{CATEGORY_LABEL[c.id]}</div>
              <div className="text-xs text-muted-foreground mt-1">Shop now →</div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default StoreCategoriesPage;
