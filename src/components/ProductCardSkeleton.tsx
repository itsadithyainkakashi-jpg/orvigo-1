import { Skeleton } from "@/components/ui/skeleton";

const ProductCardSkeleton = () => (
  <div className="rounded-2xl overflow-hidden glass-card p-2 space-y-2">
    <Skeleton className="aspect-square w-full rounded-xl" />
    <Skeleton className="h-3 w-3/4" />
    <Skeleton className="h-3 w-1/2" />
  </div>
);

export default ProductCardSkeleton;
