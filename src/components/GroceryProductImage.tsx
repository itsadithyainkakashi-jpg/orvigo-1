import { useCallback, useEffect, useRef, useState } from "react";
import { GROCERY_GENERIC_FALLBACK, getGroceryFallback } from "@/data/groceryProducts";

type Props = {
  productId: string;
  src: string;
  alt: string;
  className?: string;
};

/**
 * Image with chained retry/fallback so a grocery card never shows an empty
 * or broken image. Tries original src, then product fallback, then generic.
 * Renders against a transparent soft tint so the product image blends in.
 */
const GroceryProductImage = ({ productId, src, alt, className }: Props) => {
  const buildChain = useCallback((): string[] => {
    const productFallback = getGroceryFallback(productId);
    const chain = [src || productFallback, productFallback, GROCERY_GENERIC_FALLBACK];
    return Array.from(new Set(chain.filter(Boolean)));
  }, [productId, src]);

  const chainRef = useRef<string[]>(buildChain());
  const [stepIndex, setStepIndex] = useState(0);
  const [retried, setRetried] = useState(false);
  const [loaded, setLoaded] = useState(false);

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
      setRetried(true);
      return;
    }
    if (stepIndex < chainRef.current.length - 1) {
      setStepIndex((i) => i + 1);
      setRetried(false);
    }
  };

  return (
    <div className={`relative w-full h-full ${className ?? ""}`}>
      <img
        src={currentSrc}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={handleError}
        className="relative w-full h-full object-contain transition-opacity duration-200"
        style={{
          opacity: loaded ? 1 : 0,
          mixBlendMode: "multiply",
          filter: "drop-shadow(0 6px 10px rgba(20, 80, 40, 0.18)) drop-shadow(0 2px 4px rgba(20, 80, 40, 0.10))",
        }}
      />
    </div>
  );
};

export default GroceryProductImage;
