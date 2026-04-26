import { useCallback, useEffect, useRef, useState } from "react";
import {
  MEDICINE_GENERIC_FALLBACK,
  getMedicineFallback,
} from "@/data/medicineProducts";

type Props = {
  productId: string;
  src: string;
  alt: string;
  className?: string;
};

/**
 * Image with chained retry/fallback so a medicine card never shows an empty
 * or broken image. Sources are tried in order:
 *   1. original src
 *   2. product-specific fallback (alternate real photo of the same item)
 *   3. generic medicine fallback
 * Each step also retries with a cache-busting query param once before
 * advancing, in case the failure was a transient network/cache issue.
 */
const MedicineProductImage = ({ productId, src, alt, className }: Props) => {
  const buildChain = useCallback((): string[] => {
    const productFallback = getMedicineFallback(productId);
    const chain = [src || productFallback, productFallback, MEDICINE_GENERIC_FALLBACK];
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

  const currentBase = chainRef.current[stepIndex] ?? MEDICINE_GENERIC_FALLBACK;
  const currentSrc = retried
    ? `${currentBase}${currentBase.includes("?") ? "&" : "?"}r=1`
    : currentBase;

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
    <div className={`relative w-full h-full flex items-center justify-center ${className ?? ""}`}>
      <img
        src={currentSrc}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={handleError}
        className="max-w-full max-h-full object-contain transition-opacity duration-200"
        style={{ opacity: loaded ? 1 : 0 }}
      />
    </div>
  );
};

export default MedicineProductImage;
