export type StoreCategory = "mens" | "womens";
export type StoreCollection =
  | "new_arrivals"
  | "classic"
  | "striped"
  | "socks";

export const CATEGORY_LABEL: Record<StoreCategory, string> = {
  mens: "Men",
  womens: "Women",
};

// Men's collections (DB-backed)
export const COLLECTIONS: { id: StoreCollection; title: string }[] = [
  { id: "new_arrivals", title: "New Arrivals" },
  { id: "classic", title: "Classic Shirts" },
  { id: "striped", title: "Striped Shirts" },
  { id: "socks", title: "Socks" },
];

// Display tiles per category. `id` is the real DB enum value (or null for
// "Coming Soon" placeholder tiles that have no backing collection yet).
export type DisplayTile = {
  id: StoreCollection | null;
  title: string;
  comingSoon?: boolean;
};

export const COLLECTIONS_BY_CATEGORY: Record<StoreCategory, DisplayTile[]> = {
  mens: [
    { id: "new_arrivals", title: "New Arrivals" },
    { id: "classic", title: "Classic Shirts" },
    { id: "striped", title: "Striped Shirts" },
    { id: null, title: "T-Shirts", comingSoon: true },
    { id: null, title: "Sweatshirts", comingSoon: true },
    { id: "socks", title: "Socks" },
  ],
  womens: [
    { id: "new_arrivals", title: "New Arrivals" },
    { id: "classic", title: "Modern Wear" },
    { id: "striped", title: "Formal / Cocktail" },
    { id: "socks", title: "Footwear" },
    { id: null, title: "Makeup & Beauty", comingSoon: true },
    { id: null, title: "Accessories", comingSoon: true },
  ],
};

export const COLLECTION_LABEL: Record<StoreCollection, string> = {
  new_arrivals: "New Arrivals",
  classic: "Classic Shirts",
  striped: "Striped Shirts",
  socks: "Socks",
};
