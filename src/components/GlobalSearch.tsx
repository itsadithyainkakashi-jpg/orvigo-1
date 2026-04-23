import { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, TrendingUp } from "lucide-react";
import { allProducts } from "@/data/products";

const GlobalSearch = ({ onClose }: { onClose?: () => void }) => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const suggestions = useMemo(() => {
    if (query.length < 2) return [];
    const q = query.toLowerCase();
    return allProducts
      .filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
      .slice(0, 6);
  }, [query]);

  const trending = ["Shirt", "Shoes", "Kitchen", "Medicine", "Grocery"];

  // No auto-focus — keyboard only opens on explicit user tap

  const handleSelect = (productId: string) => {
    setOpen(false);
    setQuery("");
    navigate(`/product/${productId}`);
    onClose?.();
  };

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setOpen(false);
      onClose?.();
    }
  };

  return (
    <div className="relative w-full">
      <div className="flex items-center gap-2 bg-white rounded-xl px-3 py-2" style={{ boxShadow: "0 2px 8px hsla(220,30%,15%,0.08)" }}>
        <Search size={16} style={{ color: "hsl(220,15%,55%)" }} />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search products, brands..."
          className="flex-1 bg-transparent text-sm outline-none"
          style={{ color: "hsl(220,40%,13%)" }}
        />
        {query && (
          <button onClick={() => { setQuery(""); setOpen(false); }}>
            <X size={14} style={{ color: "hsl(220,15%,55%)" }} />
          </button>
        )}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl overflow-hidden z-50"
            style={{ boxShadow: "0 8px 30px hsla(220,30%,15%,0.12)" }}
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
          >
            {suggestions.length > 0 ? (
              <div className="max-h-72 overflow-y-auto">
                {suggestions.map((p) => {
                  const idx = p.name.toLowerCase().indexOf(query.toLowerCase());
                  return (
                    <button
                      key={p.id}
                      onClick={() => handleSelect(p.id)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 transition-colors"
                    >
                      <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                      <div className="flex-1 text-left min-w-0">
                        <p className="text-sm truncate" style={{ color: "hsl(220,40%,13%)" }}>
                          {idx >= 0 ? (
                            <>
                              {p.name.slice(0, idx)}
                              <span className="font-bold" style={{ color: "hsl(210,80%,45%)" }}>
                                {p.name.slice(idx, idx + query.length)}
                              </span>
                              {p.name.slice(idx + query.length)}
                            </>
                          ) : p.name}
                        </p>
                        <p className="text-xs" style={{ color: "hsl(220,15%,55%)" }}>₹{p.price} · {p.category}</p>
                      </div>
                    </button>
                  );
                })}
                <button
                  onClick={handleSearch}
                  className="w-full py-2.5 text-center text-xs font-semibold"
                  style={{ color: "hsl(210,80%,45%)", borderTop: "1px solid hsl(220,15%,92%)" }}
                >
                  See all results for "{query}"
                </button>
              </div>
            ) : query.length < 2 ? (
              <div className="p-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: "hsl(220,15%,55%)" }}>
                  <TrendingUp size={10} className="inline mr-1" /> Trending
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {trending.map((t) => (
                    <button
                      key={t}
                      onClick={() => { setQuery(t); setOpen(true); }}
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{ background: "hsl(210,30%,95%)", color: "hsl(210,80%,40%)" }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-4 text-center">
                <p className="text-sm" style={{ color: "hsl(220,15%,55%)" }}>No results for "{query}"</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GlobalSearch;
