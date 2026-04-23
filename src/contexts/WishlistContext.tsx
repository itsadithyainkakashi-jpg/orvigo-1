import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import type { Product } from "@/contexts/CartContext";

interface WishlistContextType {
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isWishlisted: (id: string) => boolean;
  removeFromWishlist: (id: string) => void;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
};

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  const toggleWishlist = useCallback((product: Product) => {
    setWishlist((prev) =>
      prev.some((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );
  }, []);

  const isWishlisted = useCallback(
    (id: string) => wishlist.some((p) => p.id === id),
    [wishlist]
  );

  const removeFromWishlist = useCallback((id: string) => {
    setWishlist((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isWishlisted, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
