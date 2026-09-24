import BottomNav from "@/components/BottomNav";
import StoreCollectionsPage from "@/pages/StoreCollectionsPage";

/**
 * Fashion's canonical entry point.
 *
 * The original uploaded Fashion catalog is stored by Men/Women collection in
 * Lovable Cloud. Keeping this route on the same collection view prevents the
 * separate local demo catalog from masking those saved products.
 */
const FashionPage = () => (
  <>
    <StoreCollectionsPage />
    <BottomNav />
  </>
);

export default FashionPage;