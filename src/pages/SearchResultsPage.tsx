import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingCart, Star } from "lucide-react";
import { allProducts } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import BottomNav from "@/components/BottomNav";
import GlobalSearch from "@/components/GlobalSearch";

const SearchResultsPage = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const query = params.get("q") || "";
  const { totalItems } = useCart();

  const results = useMemo(() => {
    if (!query) return [];
    const q = query.toLowerCase();
    return allProducts.filter(
      (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    );
  }, [query]);

  const highlight = (text: string) => {
    if (!query) return text;
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx < 0) return text;
    return (
      <>
        {text.slice(0, idx)}
        <span className="font-bold" style={{ color: "hsl(210,80%,45%)" }}>{text.slice(idx, idx + query.length)}</span>
        {text.slice(idx + query.length)}
      </>
    );
  };

  return (
    <div className="min-h-screen pb-24" style={{ background: "hsl(210,20%,97%)" }}>
      {/* Header */}
      <div className="sticky top-0 z-50 px-4 py-3 flex items-center gap-2"
        style={{ background: "linear-gradient(135deg, hsl(210,80%,40%), hsl(210,70%,50%))" }}
      >
        <button onClick={() => navigate(-1)} className="text-white"><ArrowLeft size={22} /></button>
        <div className="flex-1">
          <GlobalSearch />
        </div>
        <button onClick={() => navigate("/cart")} className="relative text-white ml-1">
          <ShoppingCart size={22} />
          {totalItems > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-red-500 text-[9px] text-white flex items-center justify-center font-bold">
              {totalItems}
            </span>
          )}
        </button>
      </div>

      <div className="px-4 pt-3 pb-1">
        <p className="text-xs" style={{ color: "hsl(220,15%,55%)" }}>
          {results.length} results for "<span className="font-semibold" style={{ color: "hsl(220,40%,13%)" }}>{query}</span>"
        </p>
      </div>

      {results.length > 0 ? (
        <div className="px-4 grid grid-cols-2 gap-3 mt-2">
          {results.map((p, i) => (
            <motion.div
              key={p.id}
              className="bg-white rounded-2xl overflow-hidden cursor-pointer"
              style={{ boxShadow: "0 2px 12px hsla(220,30%,15%,0.06)" }}
              onClick={() => navigate(`/product/${p.id}`)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <img src={p.image} alt={p.name} className="w-full h-32 object-cover" />
              <div className="p-2.5">
                <p className="text-xs font-semibold truncate" style={{ color: "hsl(220,40%,13%)" }}>{highlight(p.name)}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star size={10} fill="hsl(40,90%,50%)" stroke="none" />
                  <span className="text-[10px]" style={{ color: "hsl(220,15%,55%)" }}>{p.rating}</span>
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-sm font-bold" style={{ color: "hsl(210,80%,45%)" }}>₹{p.price}</span>
                  {p.originalPrice && (
                    <span className="text-[10px] line-through" style={{ color: "hsl(220,15%,65%)" }}>₹{p.originalPrice}</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-20 px-6">
          <div className="text-5xl mb-3">🔍</div>
          <p className="text-sm font-semibold" style={{ color: "hsl(220,40%,13%)" }}>No products found</p>
          <p className="text-xs mt-1 text-center" style={{ color: "hsl(220,15%,55%)" }}>Try a different search term</p>
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default SearchResultsPage;
