import { Navigate, useParams } from "react-router-dom";
import StoreCollectionsPage from "./StoreCollectionsPage";
import StoreProductsPage from "./StoreProductsPage";

/**
 * Route aliases for the simplified Men/Women shopping flow.
 *
 *   /men                         → Men's collections grid
 *   /women                       → Women's collections grid
 *   /men/collection/:collection  → Men's products for a collection
 *   /women/collection/:collection→ Women's products for a collection
 *   /collection/:collection      → Defaults to Men's (legacy URL spec)
 */

// React Router v6 reads params from the URL only — we can't override useParams
// here. So instead we render the same page but fix the param name by reading
// the URL and re-injecting via Navigate to the canonical /store/* route.

export const MensCollections = () => <Navigate to="/store/mens" replace />;
export const WomensCollections = () => <Navigate to="/store/womens" replace />;

export const MensCollectionProducts = () => {
  const { collection } = useParams<{ collection: string }>();
  return <Navigate to={`/store/mens/${collection ?? ""}`} replace />;
};

export const WomensCollectionProducts = () => {
  const { collection } = useParams<{ collection: string }>();
  return <Navigate to={`/store/womens/${collection ?? ""}`} replace />;
};

export const LegacyCollection = () => {
  const { collection } = useParams<{ collection: string }>();
  return <Navigate to={`/store/mens/${collection ?? ""}`} replace />;
};

// Re-exports so App.tsx imports stay tidy if needed.
export { StoreCollectionsPage, StoreProductsPage };
