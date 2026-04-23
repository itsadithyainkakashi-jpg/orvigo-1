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

// Men's collections
export const COLLECTIONS: { id: StoreCollection; title: string }[] = [
  { id: "new_arrivals", title: "New Arrivals" },
  { id: "classic", title: "Classic Shirts" },
  { id: "striped", title: "Striped Shirts" },
  { id: "socks", title: "Socks" },
];

// Per-category collection list (display only — DB enum stays the same).
export const COLLECTIONS_BY_CATEGORY: Record<
  StoreCategory,
  { id: StoreCollection; title: string }[]
> = {
  mens: [
    { id: "new_arrivals", title: "New Arrivals" },
    { id: "classic", title: "Classic Shirts" },
    { id: "striped", title: "Striped Shirts" },
    { id: "socks", title: "Socks" },
  ],
  womens: [
    { id: "new_arrivals", title: "New Arrivals" },
    { id: "classic", title: "Dresses" },
    { id: "striped", title: "Tops" },
    { id: "socks", title: "Ethnic Wear" },
  ],
};

export const COLLECTION_LABEL: Record<StoreCollection, string> = {
  new_arrivals: "New Arrivals",
  classic: "Classic Shirts",
  striped: "Striped Shirts",
  socks: "Socks",
};
