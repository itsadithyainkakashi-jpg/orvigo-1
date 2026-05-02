import type { ImgHTMLAttributes } from "react";
import type { Product } from "@/contexts/CartContext";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  product: Pick<Product, "image" | "imageSrcSet" | "imageSizes" | "name">;
  eager?: boolean;
};

/**
 * Renders a product image with optional responsive srcSet/sizes when the
 * product data provides them. Falls back to plain src for products without
 * responsive variants. Use eager for above-the-fold / LCP images.
 */
const ProductImage = ({ product, eager, alt, loading, decoding, ...rest }: Props) => (
  <img
    src={product.image}
    srcSet={product.imageSrcSet}
    sizes={product.imageSrcSet ? product.imageSizes ?? "(max-width: 768px) 50vw, 400px" : undefined}
    alt={alt ?? product.name}
    loading={loading ?? (eager ? "eager" : "lazy")}
    decoding={decoding ?? "async"}
    fetchPriority={eager ? "high" : "auto"}
    {...rest}
  />
);

export default ProductImage;
