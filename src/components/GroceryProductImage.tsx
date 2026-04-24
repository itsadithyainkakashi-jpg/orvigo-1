import { useCallback, useEffect, useRef, useState } from "react";
import {
  GROCERY_FALLBACKS,
  GROCERY_GENERIC_FALLBACK,
  GROCERY_SUB_BY_ID,
  getGroceryFallback,
} from "@/data/groceryProducts";

type Props = {
  productId: string;
  src: string;
  alt: string;
  className?: string;
};

/**
 * Image with chained retry/fallback so a grocery card never shows an empty
 * or broken image. Sources are tried in order:
 *   1. original src
 *   2. product-specific fallback (alternate real photo of the same item)
 *   3. category fallback (Veg / Non-Veg)
 *   4. generic grocery fallback
 * Each step also retries with a cache-busting query param once before
 * advancing, in case the failure was a transient network/cache issue.
 */
const GroceryProductImage = ({ productId, src, alt, className }: Props) => {
  const buildChain = useCallback((): string[] => {
    const productFallback = getGroceryFallback(productId);
    const sub = GROCERY_SUB_BY_ID[productId];
    const categoryFallback = sub ? GROCERY_FALLBACKS[sub] : GROCERY_GENERIC_FALLBACK;
    // Deduplicate while preserving order.
    const chain = [src || productFallback, productFallback, categoryFallback, GROCERY_GENERIC_FALLBACK];
    return Array.from(new Set(chain.filter(Boolean)));
  }, [productId, src]);

  const chainRef = useRef<string[]>(buildChain());
  const [stepIndex, setStepIndex] = useState(0);
  const [retried, setRetried] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Reset chain when product changes.
  useEffect(() => {
    chainRef.current = buildChain();
    setStepIndex(0);
    setRetried(false);
    setLoaded(false);
  }, [buildChain]);

  const currentBase = chainRef.current[stepIndex] ?? GROCERY_GENERIC_FALLBACK;
  const currentSrc = retried ? `${currentBase}${currentBase.includes("?") ? "&" : "?"}r=1` : currentBase;

  const handleError = () => {
    if (!retried) {
      // Same source, one cache-busting retry.
      setRetried(true);
      return;
    }
    if (stepIndex < chainRef.current.length - 1) {
      setStepIndex((i) => i + 1);
      setRetried(false);
    }
    // If we're already on the last fallback and it failed twice, stop —
    // the placeholder layer keeps the box visually filled.
  };

  return (
    <div className={`relative w-full h-full ${className ?? ""}`}>
      {/* Placeholder layer ensures the box is never visually empty. */}
      <div
        className="absolute inset-0 rounded-xl"
        style={{
          background:
            "linear-gradient(135deg, hsla(145, 65%, 38%, 0.18) 0%, hsla(160, 55%, 42%, 0.12) 100%)",
        }}
        aria-hidden="true"
      />
      <img
        src={currentSrc}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={handleError}
        className="relative w-full h-full object-cover rounded-xl transition-opacity duration-200"
        style={{ opacity: loaded ? 1 : 0 }}
      />
    </div>
  );
};

export default GroceryProductImage;
