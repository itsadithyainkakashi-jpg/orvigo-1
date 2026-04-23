export type StoreCategory = "mens" | "womens";
export type StoreCollection = "new_arrivals" | "classic" | "striped" | "socks";

export const CATEGORY_LABEL: Record<StoreCategory, string> = {
  mens: "Mens",
  womens: "Womens",
};

export const COLLECTIONS: { id: StoreCollection; title: string }[] = [
  { id: "new_arrivals", title: "New Arrivals" },
  { id: "classic", title: "Classic Shirts" },
  { id: "striped", title: "Striped Shirts" },
  { id: "socks", title: "Socks" },
];

export const COLLECTION_LABEL: Record<StoreCollection, string> = {
  new_arrivals: "New Arrivals",
  classic: "Classic Shirts",
  striped: "Striped Shirts",
  socks: "Socks",
};
