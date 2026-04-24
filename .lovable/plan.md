

## Fix Grocery Images — Hand-Mapped Unsplash Photos

### The root cause

The current grocery catalog uses `loremflickr.com` with keyword tags. That service returns **random Flickr photos** matching tags loosely — which is why users see cats, unrelated objects, and mismatches. Tag-based image services cannot guarantee correct results.

### The fix

Replace the random tag-fetcher with a **hand-curated map of direct Unsplash photo IDs**. Every product gets one specifically chosen real photo of that exact item. No randomness, no AI, no duplicates.

### What changes

**1. `src/data/groceryProducts.ts` — full image overhaul**

- Remove the `loremflickr` `img()` helper.
- Replace with direct Unsplash URLs in this format:
  ```
  https://images.unsplash.com/photo-{ID}?w=400&h=400&fit=crop&q=80
  ```
- Each of the ~120 products gets a unique, manually verified Unsplash photo ID matching its name (Tomato → tomato photo, Onion → onion photo, Chicken → raw chicken photo, etc.).
- For branded snacks where Unsplash lacks the exact pack shot (Lays, Kurkure, Dairy Milk, Parle-G), use the closest generic real photo (potato chips packet, chocolate bar, glucose biscuit) — still real, still relevant, never random.
- Each photo ID used **once only** — no duplicates across the catalog.

**2. Category banner tiles (`GROCERY_SUBS`)**

- Snacks tile currently reuses the Powders banner. Add a dedicated snacks banner image (Unsplash chips/snacks photo) so each of the 7 categories has its own tile image.

**3. No other files change**

- `GroceryPage.tsx` already renders a 3-column grid with image / name / price / ADD button (matches the spec). No layout changes needed.
- Product IDs (`gr-v-1`, `gr-n-1`, …) stay identical, so cart, wishlist, and product-detail routes keep working.
- Category list, filter tabs, and counts stay the same.

### Result

- 120+ unique grocery products, each with a correct real photo of that exact item.
- Zero random/AI/mismatched images.
- Zero duplicate photos.
- Same Blinkit/Zepto-style 3-column UI, untouched.
- No impact on Home, Navigation, Collection, Food, or Medicine sections.

