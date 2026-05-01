import type { Product } from "@/contexts/CartContext";

import fashionWomen from "@/assets/home/fashion-women-dress.jpg";
import fashionMen from "@/assets/home/fashion-men-shirt.jpg";
import fashionKids from "@/assets/home/fashion-kids.jpg";
import fashionSneakers from "@/assets/home/fashion-sneakers.jpg";
import itemKitchen from "@/assets/home/item-kitchen.jpg";
import itemPhonecase from "@/assets/home/item-phonecase.jpg";
import itemChappal from "@/assets/home/item-chappal.jpg";
import itemHomedecor from "@/assets/home/item-homedecor.jpg";
import itemMakeup from "@/assets/home/item-makeup.jpg";
import itemAccessories from "@/assets/home/item-accessories.jpg";
import foodVeg from "@/assets/home/food-veg.jpg";
import foodNonveg from "@/assets/home/food-nonveg.jpg";
import foodChinese from "@/assets/home/food-chinese.jpg";
import groceryOil from "@/assets/home/grocery-oil.jpg";
import groceryMasala from "@/assets/home/grocery-masala.jpg";
import groceryAtta from "@/assets/home/grocery-atta.jpg";
import grocerySnacks from "@/assets/home/grocery-snacks.jpg";
import groceryVegs from "@/assets/home/grocery-vegs.jpg";
import groceryMeat from "@/assets/home/grocery-meat.jpg";
import medTablets from "@/assets/home/med-tablets.jpg";
import medSyrup from "@/assets/home/med-syrup.jpg";
import medHealth from "@/assets/home/med-health.jpg";

// Polo T-Shirt variants
import poloBlue from "@/assets/fashion/polo-blue.png";
import poloBlueModel from "@/assets/fashion/polo-blue-model.png";
import poloWhiteModel from "@/assets/fashion/polo-white-model.png";
import poloWhiteModel2 from "@/assets/fashion/polo-white-model2.png";
import poloBlackModel from "@/assets/fashion/polo-black-model.png";
import poloBrownModel from "@/assets/fashion/polo-brown-model.png";
import poloCollection from "@/assets/fashion/polo-collection.png";
import dragonFront from "@/assets/fashion/dragon-sweatshirt-front.png";
import dragonDetail from "@/assets/fashion/dragon-sweatshirt-detail.png";
import dualTonePolo from "@/assets/fashion/dual-tone-polo.png";
import designerTeeBlue from "@/assets/fashion/designer-tee-blue.png";
import designerTeeMaroon from "@/assets/fashion/designer-tee-maroon.png";
import designerTeeBrown from "@/assets/fashion/designer-tee-brown.png";
import designerTeeBlack from "@/assets/fashion/designer-tee-black.png";
import minimalPoloGrey from "@/assets/fashion/minimal-polo-grey.png";
import minimalPoloHanger from "@/assets/fashion/minimal-polo-hanger.png";
import minimalPoloDetailGrey from "@/assets/fashion/minimal-polo-detail-grey.jpg";
import minimalPoloBeige from "@/assets/fashion/minimal-polo-beige.jpg";
import knitHalfzipWhite from "@/assets/fashion/knit-halfzip-white.png";
import texturedPoloBlue from "@/assets/fashion/textured-polo-blue.png";
import texturedPoloBrown from "@/assets/fashion/textured-polo-brown.png";
import texturedPoloGrey from "@/assets/fashion/textured-polo-grey.png";
import luxuryEmbossedWhite from "@/assets/fashion/luxury-embossed-polo-white.png";
import luxuryEmbossedBlack from "@/assets/fashion/luxury-embossed-polo-black.png";
import stripedPoloBlue from "@/assets/fashion/striped-polo-blue.jpg";
import stripedPoloGrey from "@/assets/fashion/striped-polo-grey.jpg";
import stripedPoloTeal from "@/assets/fashion/striped-polo-teal.jpg";
import stripedPoloBrown from "@/assets/fashion/striped-polo-brown.jpg";
import minimalClassicPoloOlive from "@/assets/fashion/minimal-classic-polo-olive.png";
import minimalClassicPoloWhite from "@/assets/fashion/minimal-classic-polo-white.png";
import minimalClassicPoloDarkGreen from "@/assets/fashion/minimal-classic-polo-darkgreen.png";
import texturedSummerWhite from "@/assets/fashion/textured-summer-white.png";
import texturedSummerOlive from "@/assets/fashion/textured-summer-olive.png";
import texturedSummerLightGreen from "@/assets/fashion/textured-summer-lightgreen.png";

import { GROCERY_PRODUCTS } from "./groceryProducts";
import { MEDICINE_PRODUCTS } from "./medicineProducts";

const baseProducts: Product[] = [
  // ─── Fashion ───
  { id: "f1", name: "Women Ethnic Dress", price: 899, originalPrice: 1499, image: fashionWomen, rating: 4.3, category: "Fashion", description: "Beautiful ethnic dress with intricate embroidery work, perfect for festive occasions.", badge: "40% OFF", sizes: ["S", "M", "L", "XL"] },
  { id: "f2", name: "Men Casual Shirt", price: 599, originalPrice: 899, image: fashionMen, rating: 4.1, category: "Fashion", description: "Premium cotton casual shirt with a modern slim fit design.", badge: "30% OFF", sizes: ["S", "M", "L", "XL"] },
  { id: "f3", name: "Kids Summer Wear", price: 449, image: fashionKids, rating: 4.5, category: "Fashion", description: "Colorful and comfortable summer wear set for kids.", sizes: ["2-3Y", "4-5Y", "6-7Y"] },
  { id: "f4", name: "Sports Sneakers", price: 1299, originalPrice: 1799, image: fashionSneakers, rating: 4.4, category: "Fashion", description: "Lightweight running sneakers with cushioned sole for maximum comfort.", badge: "25% OFF", sizes: ["7", "8", "9", "10"] },
  { id: "f5", name: "Designer Saree", price: 1199, originalPrice: 2399, image: fashionWomen, rating: 4.6, category: "Fashion", description: "Elegant designer saree with gold zari border, perfect for weddings.", badge: "50% OFF", sizes: ["Free Size"] },
  { id: "f6", name: "Slim Fit Jeans", price: 799, image: fashionMen, rating: 4.0, category: "Fashion", description: "Stretchable slim fit jeans with modern wash finish.", sizes: ["28", "30", "32", "34"] },
  { id: "f7", name: "Kids Party Frock", price: 349, originalPrice: 449, image: fashionKids, rating: 4.2, category: "Fashion", description: "Adorable party frock with lace details for little girls.", badge: "20% OFF", sizes: ["2-3Y", "4-5Y", "6-7Y"] },
  { id: "f8", name: "Running Shoes", price: 1599, image: fashionSneakers, rating: 4.3, category: "Fashion", description: "Professional grade running shoes with breathable mesh upper.", sizes: ["7", "8", "9", "10", "11"] },
  { id: "f9", name: "Women Kurti Set", price: 699, originalPrice: 999, image: fashionWomen, rating: 4.4, category: "Fashion", description: "Elegant printed kurti with palazzo set for daily wear.", badge: "30% OFF", sizes: ["S", "M", "L", "XL"] },
  { id: "f10", name: "Men Polo T-Shirt", price: 499, image: fashionMen, rating: 4.2, category: "Fashion", description: "Classic polo t-shirt in premium cotton pique fabric.", sizes: ["S", "M", "L", "XL"] },
  { id: "f11", name: "Kids Denim Jacket", price: 799, originalPrice: 1099, image: fashionKids, rating: 4.3, category: "Fashion", description: "Trendy denim jacket for kids with soft lining.", badge: "25% OFF", sizes: ["4-5Y", "6-7Y", "8-9Y"] },
  { id: "f12", name: "Canvas Sneakers", price: 899, image: fashionSneakers, rating: 4.1, category: "Fashion", description: "Casual canvas sneakers with vulcanized sole.", sizes: ["6", "7", "8", "9", "10"] },
  { id: "f13", name: "Women Palazzo Pants", price: 549, image: fashionWomen, rating: 4.0, category: "Fashion", description: "Flowy palazzo pants with elastic waist for comfort.", sizes: ["S", "M", "L", "XL"] },
  { id: "f14", name: "Men Formal Shirt", price: 899, originalPrice: 1299, image: fashionMen, rating: 4.5, category: "Fashion", description: "Crisp formal shirt in wrinkle-free cotton blend.", badge: "30% OFF", sizes: ["38", "40", "42", "44"] },
  { id: "f15", name: "Kids School Uniform", price: 599, image: fashionKids, rating: 4.1, category: "Fashion", description: "Durable school uniform set with comfortable fit.", sizes: ["4-5Y", "6-7Y", "8-9Y", "10-11Y"] },
  { id: "f16", name: "High Top Sneakers", price: 1799, originalPrice: 2499, image: fashionSneakers, rating: 4.6, category: "Fashion", description: "Premium high-top sneakers with ankle support.", badge: "28% OFF", sizes: ["7", "8", "9", "10"] },
  { id: "f17", name: "Women Anarkali Suit", price: 1499, originalPrice: 2299, image: fashionWomen, rating: 4.7, category: "Fashion", description: "Floor-length anarkali suit with heavy dupatta.", badge: "35% OFF", sizes: ["S", "M", "L", "XL"] },
  { id: "f18", name: "Men Chinos", price: 899, image: fashionMen, rating: 4.3, category: "Fashion", description: "Slim fit chinos in cotton stretch fabric.", sizes: ["28", "30", "32", "34", "36"] },
  { id: "f19", name: "Kids Tracksuit", price: 649, originalPrice: 849, image: fashionKids, rating: 4.2, category: "Fashion", description: "Sporty tracksuit set for active kids.", badge: "23% OFF", sizes: ["2-3Y", "4-5Y", "6-7Y"] },
  { id: "f20", name: "Slip-on Shoes", price: 699, image: fashionSneakers, rating: 4.0, category: "Fashion", description: "Comfortable slip-on loafers for casual outings.", sizes: ["7", "8", "9", "10"] },

  // ─── Premium Printed Polo T-Shirt (single product, multiple color variants) ───
  {
    id: "f-polo",
    name: "Printed Polo T-Shirt",
    price: 899,
    originalPrice: 1499,
    image: poloBlue,
    gallery: [poloBlue, poloBlueModel, poloCollection],
    rating: 4.6,
    category: "Fashion",
    description:
      "Premium printed polo t-shirt with geometric pattern, embroidered chest badge, and contrast checkered details. Soft cotton-blend fabric with a tailored slim fit. Available in multiple colors.",
    badge: "40% OFF",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      {
        name: "Teal Blue",
        hex: "hsl(190, 60%, 45%)",
        image: poloBlue,
        gallery: [poloBlue, poloBlueModel, poloCollection],
      },
      {
        name: "White",
        hex: "hsl(0, 0%, 96%)",
        image: poloWhiteModel2,
        gallery: [poloWhiteModel2, poloWhiteModel, poloCollection],
      },
      {
        name: "Black",
        hex: "hsl(0, 0%, 10%)",
        image: poloBlackModel,
        gallery: [poloBlackModel, poloCollection, poloBlueModel],
      },
      {
        name: "Brown",
        hex: "hsl(25, 35%, 35%)",
        image: poloBrownModel,
        gallery: [poloBrownModel, poloCollection, poloBlackModel],
      },
    ],
  },

  // ─── Dragon Graphic Sweatshirt (T-Shirt category, also in New Arrivals) ───
  {
    id: "d4a90000-0000-4000-8000-000000000001",
    name: "Dragon Graphic Sweatshirt",
    price: 1499,
    originalPrice: 2499,
    image: dragonFront,
    gallery: [dragonFront, dragonDetail],
    rating: 4.7,
    category: "Fashion",
    description:
      "Premium teal sweatshirt featuring a striking metallic dragon graphic print and gold-trim collar detail. Soft cotton-blend fabric, relaxed fit. T-shirt style crewneck.",
    badge: "40% OFF",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },

  // ─── Dual Tone Premium Polo T-Shirt (T-Shirt category, also in New Arrivals) ───
  {
    id: "d4a90000-0000-4000-8000-000000000002",
    name: "Dual Tone Premium Polo T-Shirt",
    price: 1699,
    originalPrice: 2499,
    image: dualTonePolo,
    gallery: [dualTonePolo],
    rating: 4.6,
    category: "Fashion",
    description:
      "Premium dual tone polo t-shirt with a black body and contrast olive textured panel down the front. Soft breathable fabric, tailored slim fit and metal brand badge. A versatile statement piece for smart-casual looks.",
    badge: "32% OFF",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },

  // ─── Premium Printed Designer T-Shirt (T-Shirt category, also in New Arrivals) ───
  {
    id: "d4a90000-0000-4000-8000-000000000003",
    name: "Premium Printed Designer T-Shirt",
    price: 1699,
    originalPrice: 2499,
    image: designerTeeBlue,
    gallery: [designerTeeBlue, designerTeeMaroon, designerTeeBrown, designerTeeBlack],
    rating: 4.7,
    category: "Fashion",
    description:
      "Premium designer crew-neck t-shirt with subtle diamond mesh weave and embroidered eagle crest. Soft breathable cotton-blend, tailored regular fit. Available in 4 colors: Dark Blue, Maroon, Brown and Black.",
    badge: "NEW",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      {
        name: "Dark Blue",
        hex: "hsl(215, 30%, 28%)",
        image: designerTeeBlue,
        gallery: [designerTeeBlue],
      },
      {
        name: "Maroon",
        hex: "hsl(0, 45%, 32%)",
        image: designerTeeMaroon,
        gallery: [designerTeeMaroon],
      },
      {
        name: "Brown",
        hex: "hsl(10, 35%, 30%)",
        image: designerTeeBrown,
        gallery: [designerTeeBrown],
      },
      {
        name: "Black",
        hex: "hsl(0, 0%, 8%)",
        image: designerTeeBlack,
        gallery: [designerTeeBlack],
      },
    ],
  },

  // ─── Minimal Contrast Polo T-Shirt (T-Shirt category, also in New Arrivals) ───
  {
    id: "d4a90000-0000-4000-8000-000000000004",
    name: "Minimal Contrast Polo T-Shirt",
    price: 1499,
    originalPrice: 2199,
    image: minimalPoloGrey,
    gallery: [minimalPoloGrey, minimalPoloHanger, minimalPoloDetailGrey, minimalPoloBeige],
    rating: 4.6,
    category: "Fashion",
    description:
      "Minimal contrast polo t-shirt with crisp white body, contrast shoulder yoke and tipped collar. Soft breathable pique fabric with a tailored regular fit. Available in Grey and Beige.",
    badge: "NEW",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      {
        name: "Grey",
        hex: "hsl(210, 12%, 65%)",
        image: minimalPoloGrey,
        gallery: [minimalPoloGrey, minimalPoloDetailGrey, minimalPoloHanger],
      },
      {
        name: "Beige",
        hex: "hsl(35, 25%, 75%)",
        image: minimalPoloBeige,
        gallery: [minimalPoloBeige, minimalPoloHanger],
      },
    ],
  },

  // ─── Premium Knit Half-Zip Sweater (Sweatshirts / Winter, New Arrivals) ───
  {
    id: "d4a90000-0000-4000-8000-000000000005",
    name: "Premium Knit Half-Zip Sweater",
    price: 2199,
    originalPrice: 2999,
    image: knitHalfzipWhite,
    gallery: [knitHalfzipWhite],
    rating: 4.7,
    category: "Fashion",
    description:
      "Premium cable-knit half-zip sweater in classic ivory white with a ribbed mock-neck collar and embroidered chest emblem. Soft cotton blend, regular fit — perfect for winter layering.",
    badge: "NEW",
    sizes: ["S", "M", "L", "XL"],
  },

  // ─── Textured Long Sleeve Polo T-Shirt (T-Shirt, New Arrivals) ───
  {
    id: "d4a90000-0000-4000-8000-000000000006",
    name: "Textured Long Sleeve Polo T-Shirt",
    price: 1799,
    originalPrice: 2499,
    image: texturedPoloBlue,
    gallery: [texturedPoloBlue, texturedPoloBrown, texturedPoloGrey],
    rating: 4.6,
    category: "Fashion",
    description:
      "Premium textured jacquard long-sleeve polo with a classic three-button placket and ribbed cuffs. Soft, breathable knit with a subtle tonal pattern — refined essential for smart-casual wear.",
    badge: "NEW",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Blue", hex: "hsl(210, 35%, 42%)", image: texturedPoloBlue, gallery: [texturedPoloBlue] },
      { name: "Brown", hex: "hsl(25, 25%, 40%)", image: texturedPoloBrown, gallery: [texturedPoloBrown] },
      { name: "Grey", hex: "hsl(0, 0%, 45%)", image: texturedPoloGrey, gallery: [texturedPoloGrey] },
    ],
  },

  // ─── Luxury Embossed Polo T-Shirt (T-Shirt, New Arrivals) ───
  {
    id: "d4a90000-0000-4000-8000-000000000007",
    name: "Luxury Embossed Polo T-Shirt",
    price: 2299,
    originalPrice: 3199,
    image: luxuryEmbossedWhite,
    gallery: [luxuryEmbossedWhite, luxuryEmbossedBlack],
    rating: 4.8,
    category: "Fashion",
    description:
      "Premium embossed monogram polo crafted from soft pique cotton with a refined three-button placket and tonal collar. Subtle raised pattern delivers a quiet luxury aesthetic — perfect for elevated everyday wear.",
    badge: "NEW",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "White", hex: "hsl(0, 0%, 96%)", image: luxuryEmbossedWhite, gallery: [luxuryEmbossedWhite] },
      { name: "Black", hex: "hsl(0, 0%, 8%)", image: luxuryEmbossedBlack, gallery: [luxuryEmbossedBlack] },
    ],
  },

  // ─── Premium Striped Polo T-Shirt (T-Shirt, New Arrivals) ───
  {
    id: "d4a90000-0000-4000-8000-000000000008",
    name: "Premium Striped Polo T-Shirt",
    price: 1899,
    originalPrice: 2699,
    image: stripedPoloBlue,
    gallery: [stripedPoloBlue, stripedPoloGrey, stripedPoloTeal, stripedPoloBrown],
    rating: 4.7,
    category: "Fashion",
    description:
      "Classic horizontal-stripe pique polo with a contrast solid collar, three-button placket, and signature metal emblem. Soft breathable cotton blend tailored for an effortless smart-casual look.",
    badge: "NEW",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Blue", hex: "hsl(210, 28%, 48%)", image: stripedPoloBlue, gallery: [stripedPoloBlue] },
      { name: "Grey", hex: "hsl(0, 0%, 45%)", image: stripedPoloGrey, gallery: [stripedPoloGrey] },
      { name: "Teal", hex: "hsl(185, 28%, 42%)", image: stripedPoloTeal, gallery: [stripedPoloTeal] },
      { name: "Brown", hex: "hsl(30, 22%, 38%)", image: stripedPoloBrown, gallery: [stripedPoloBrown] },
    ],
  },

  // ─── Minimal Classic Polo T-Shirt (T-Shirt, New Arrivals) ───
  {
    id: "d4a90000-0000-4000-8000-000000000009",
    name: "Minimal Classic Polo T-Shirt",
    price: 1799,
    originalPrice: 2499,
    image: minimalClassicPoloOlive,
    gallery: [minimalClassicPoloOlive, minimalClassicPoloWhite, minimalClassicPoloDarkGreen],
    rating: 4.7,
    category: "Fashion",
    description:
      "Minimal classic pique polo with contrast tipped collar and cuffs. Soft breathable cotton blend tailored for an elegant smart-casual look.",
    badge: "NEW",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Olive Green", hex: "hsl(85, 25%, 35%)", image: minimalClassicPoloOlive, gallery: [minimalClassicPoloOlive] },
      { name: "White", hex: "hsl(0, 0%, 96%)", image: minimalClassicPoloWhite, gallery: [minimalClassicPoloWhite] },
      { name: "Dark Green", hex: "hsl(120, 15%, 20%)", image: minimalClassicPoloDarkGreen, gallery: [minimalClassicPoloDarkGreen] },
    ],
  },

  // ─── Textured Summer T-Shirt (T-Shirt, New Arrivals) ───
  {
    id: "d4a90000-0000-4000-8000-000000000010",
    name: "Textured Summer T-Shirt",
    price: 1599,
    originalPrice: 2199,
    image: texturedSummerWhite,
    gallery: [texturedSummerWhite, texturedSummerOlive, texturedSummerLightGreen],
    rating: 4.6,
    category: "Fashion",
    description:
      "Lightweight textured knit summer tee with breathable waffle weave. Soft, airy, and perfectly tailored for an effortless modern look.",
    badge: "NEW",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "White", hex: "hsl(0, 0%, 96%)", image: texturedSummerWhite, gallery: [texturedSummerWhite] },
      { name: "Olive Green", hex: "hsl(75, 22%, 42%)", image: texturedSummerOlive, gallery: [texturedSummerOlive] },
      { name: "Light Green", hex: "hsl(95, 18%, 50%)", image: texturedSummerLightGreen, gallery: [texturedSummerLightGreen] },
    ],
  },

  // ─── Items ───
  { id: "i1", name: "Kitchen Organizer", price: 349, image: itemKitchen, rating: 4.1, category: "Items", description: "Stainless steel kitchen organizer set with premium finish." },
  { id: "i2", name: "Gold Earrings Set", price: 1499, originalPrice: 1899, image: itemAccessories, rating: 4.7, category: "Items", description: "Elegant gold-plated earrings set with stone work.", badge: "20% OFF" },
  { id: "i3", name: "iPhone Silicone Case", price: 199, image: itemPhonecase, rating: 4.0, category: "Items", description: "Premium silicone protective case with soft-touch finish." },
  { id: "i4", name: "Men Leather Sandals", price: 399, image: itemChappal, rating: 4.2, category: "Items", description: "Genuine leather sandals with cushioned footbed.", sizes: ["7", "8", "9", "10"] },
  { id: "i5", name: "Wall Art Canvas", price: 699, originalPrice: 799, image: itemHomedecor, rating: 4.4, category: "Items", description: "Modern abstract wall art canvas, ready to hang.", badge: "10% OFF" },
  { id: "i6", name: "Lipstick Combo Pack", price: 549, image: itemMakeup, rating: 4.3, category: "Items", description: "Set of 4 matte finish lipsticks in trending shades." },
  { id: "i7", name: "Non-stick Kadhai", price: 249, image: itemKitchen, rating: 4.0, category: "Items", description: "Heavy-duty non-stick kadhai with cool-touch handle." },
  { id: "i8", name: "Silver Bracelet", price: 899, image: itemAccessories, rating: 4.5, category: "Items", description: "Sterling silver bracelet with modern minimalist design." },
  { id: "i9", name: "Samsung Phone Cover", price: 149, image: itemPhonecase, rating: 3.9, category: "Items", description: "Shockproof transparent cover for Samsung Galaxy series." },
  { id: "i10", name: "Women Flats Sandals", price: 499, originalPrice: 699, image: itemChappal, rating: 4.1, category: "Items", description: "Comfortable flat sandals with cushioned insole.", badge: "28% OFF", sizes: ["5", "6", "7", "8"] },
  { id: "i11", name: "Fairy Lights String", price: 299, image: itemHomedecor, rating: 4.3, category: "Items", description: "Warm white LED fairy lights, 10m string for home decor." },
  { id: "i12", name: "Foundation Set", price: 799, originalPrice: 999, image: itemMakeup, rating: 4.4, category: "Items", description: "Full coverage liquid foundation with SPF 30 protection.", badge: "20% OFF" },
  { id: "i13", name: "Stainless Steel Bottles", price: 449, image: itemKitchen, rating: 4.2, category: "Items", description: "Insulated stainless steel water bottle, 1L capacity." },
  { id: "i14", name: "Pearl Necklace Set", price: 1299, originalPrice: 1799, image: itemAccessories, rating: 4.6, category: "Items", description: "Cultured pearl necklace with matching earrings.", badge: "27% OFF" },
  { id: "i15", name: "Cushion Covers Set", price: 399, image: itemHomedecor, rating: 4.0, category: "Items", description: "Set of 5 printed cushion covers, 16x16 inch." },
  { id: "i16", name: "Compact Powder", price: 349, image: itemMakeup, rating: 4.1, category: "Items", description: "Matte finish compact powder for oily skin." },
  // ─── Items (Extended) ───
  { id: "i17", name: "Ceramic Dinner Set", price: 1299, originalPrice: 1799, image: itemKitchen, rating: 4.5, category: "Items", description: "12-piece ceramic dinner set with elegant floral design.", badge: "28% OFF" },
  { id: "i18", name: "Rose Gold Watch", price: 2499, originalPrice: 3999, image: itemAccessories, rating: 4.8, category: "Items", description: "Stylish rose gold analog watch with leather strap.", badge: "37% OFF" },
  { id: "i19", name: "OnePlus Bumper Case", price: 299, image: itemPhonecase, rating: 4.1, category: "Items", description: "Sandstone textured bumper case for OnePlus." },
  { id: "i20", name: "Men Sports Sandals", price: 599, image: itemChappal, rating: 4.3, category: "Items", description: "Lightweight sports sandals with velcro straps.", sizes: ["7", "8", "9", "10"] },
  { id: "i21", name: "Table Lamp Modern", price: 899, originalPrice: 1199, image: itemHomedecor, rating: 4.4, category: "Items", description: "Minimalist bedside table lamp with warm LED light.", badge: "25% OFF" },
  { id: "i22", name: "Mascara Volume Pro", price: 449, image: itemMakeup, rating: 4.2, category: "Items", description: "Waterproof volumizing mascara for dramatic lashes." },
  { id: "i23", name: "Pressure Cooker 5L", price: 1599, originalPrice: 2199, image: itemKitchen, rating: 4.6, category: "Items", description: "Stainless steel pressure cooker with safety valve.", badge: "27% OFF" },
  { id: "i24", name: "Anklet Silver Chain", price: 399, image: itemAccessories, rating: 4.0, category: "Items", description: "Delicate silver anklet with tiny bell charms." },
  { id: "i25", name: "Pixel Phone Case", price: 249, image: itemPhonecase, rating: 4.0, category: "Items", description: "Clear protective case for Google Pixel with raised edges." },
  { id: "i26", name: "Women Kolhapuri Chappal", price: 699, originalPrice: 899, image: itemChappal, rating: 4.4, category: "Items", description: "Handcrafted Kolhapuri leather chappal.", badge: "22% OFF", sizes: ["5", "6", "7", "8"] },
  { id: "i27", name: "Artificial Plant Pot", price: 349, image: itemHomedecor, rating: 4.1, category: "Items", description: "Lifelike artificial plant in ceramic pot for desk decor." },
  { id: "i28", name: "Eye Shadow Palette", price: 699, originalPrice: 999, image: itemMakeup, rating: 4.5, category: "Items", description: "18-shade shimmer and matte eye shadow palette.", badge: "30% OFF" },
  { id: "i29", name: "Iron Tawa Large", price: 449, image: itemKitchen, rating: 4.3, category: "Items", description: "Cast iron flat tawa for rotis and dosas, 30cm." },
  { id: "i30", name: "Sunglasses Aviator", price: 799, image: itemAccessories, rating: 4.3, category: "Items", description: "UV400 polarized aviator sunglasses with metal frame." },
  { id: "i31", name: "Realme Back Cover", price: 129, image: itemPhonecase, rating: 3.8, category: "Items", description: "Slim matte finish back cover for Realme phones." },
  { id: "i32", name: "Kids Crocs Clogs", price: 499, originalPrice: 699, image: itemChappal, rating: 4.2, category: "Items", description: "Colorful lightweight clogs for kids with jibbitz holes.", badge: "29% OFF", sizes: ["8C", "10C", "12C", "1Y"] },
  { id: "i33", name: "Photo Frame Set", price: 599, image: itemHomedecor, rating: 4.0, category: "Items", description: "Set of 6 collage photo frames in mixed sizes." },
  { id: "i34", name: "Nail Polish Set", price: 299, image: itemMakeup, rating: 4.1, category: "Items", description: "Set of 6 glossy nail polishes in pastel shades." },
  { id: "i35", name: "Mixer Grinder 750W", price: 2499, originalPrice: 3499, image: itemKitchen, rating: 4.7, category: "Items", description: "Powerful mixer grinder with 3 jars and overload protection.", badge: "29% OFF" },
  { id: "i36", name: "Leather Wallet Men", price: 599, image: itemAccessories, rating: 4.4, category: "Items", description: "Genuine leather bi-fold wallet with RFID blocking." },
  { id: "i37", name: "Xiaomi Clear Case", price: 179, image: itemPhonecase, rating: 4.0, category: "Items", description: "Crystal clear TPU case for Xiaomi with anti-yellowing." },
  { id: "i38", name: "Bathroom Slippers", price: 199, image: itemChappal, rating: 3.9, category: "Items", description: "Non-slip bathroom slippers with drainage holes.", sizes: ["6", "7", "8", "9", "10"] },
  { id: "i39", name: "Scented Candle Set", price: 499, originalPrice: 699, image: itemHomedecor, rating: 4.5, category: "Items", description: "Set of 3 aromatic soy wax candles in glass jars.", badge: "29% OFF" },
  { id: "i40", name: "BB Cream SPF 50", price: 399, image: itemMakeup, rating: 4.2, category: "Items", description: "Lightweight BB cream with sun protection and skin tint." },
  { id: "i41", name: "Glass Water Jug", price: 349, image: itemKitchen, rating: 4.1, category: "Items", description: "Borosilicate glass water jug with bamboo lid, 1.5L." },
  { id: "i42", name: "Clutch Bag Women", price: 899, originalPrice: 1299, image: itemAccessories, rating: 4.3, category: "Items", description: "Elegant embroidered clutch bag for parties.", badge: "31% OFF" },
  { id: "i43", name: "Vivo Printed Case", price: 159, image: itemPhonecase, rating: 4.0, category: "Items", description: "Designer printed hard case with artistic patterns." },
  { id: "i44", name: "Orthopedic Slippers", price: 799, image: itemChappal, rating: 4.5, category: "Items", description: "Memory foam orthopedic slippers for arch support.", sizes: ["6", "7", "8", "9", "10"] },
  { id: "i45", name: "Wall Clock Modern", price: 599, image: itemHomedecor, rating: 4.2, category: "Items", description: "Silent sweep modern wall clock with wooden frame." },
  { id: "i46", name: "Kajal Pencil Duo", price: 199, image: itemMakeup, rating: 4.3, category: "Items", description: "Smudge-proof kajal duo pack, 12-hour stay formula." },
  { id: "i47", name: "Chopping Board Set", price: 299, image: itemKitchen, rating: 4.0, category: "Items", description: "Set of 3 colour-coded chopping boards, BPA-free." },
  { id: "i48", name: "Backpack Casual", price: 1299, originalPrice: 1799, image: itemAccessories, rating: 4.6, category: "Items", description: "Water-resistant casual backpack with laptop compartment.", badge: "28% OFF" },
  { id: "i49", name: "Popup Phone Grip", price: 99, image: itemPhonecase, rating: 3.9, category: "Items", description: "Collapsible phone grip and stand with custom design." },
  { id: "i50", name: "Men Flip Flops", price: 249, image: itemChappal, rating: 4.0, category: "Items", description: "Comfortable EVA flip flops for daily use.", sizes: ["7", "8", "9", "10"] },

  // ─── Food ───
  { id: "fd1", name: "Paneer Butter Masala", price: 149, image: foodVeg, rating: 4.3, category: "Food", description: "Creamy paneer butter masala with naan and rice." },
  { id: "fd2", name: "Chicken Biryani", price: 249, image: foodNonveg, rating: 4.5, category: "Food", description: "Authentic Hyderabadi chicken biryani with raita and salan." },
  { id: "fd3", name: "Veg Hakka Noodles", price: 179, image: foodChinese, rating: 4.1, category: "Food", description: "Stir-fried hakka noodles with fresh vegetables and soy sauce." },
  { id: "fd4", name: "Dal Makhani Thali", price: 129, image: foodVeg, rating: 4.2, category: "Food", description: "Complete thali with dal makhani, rice, roti, and salad." },
  { id: "fd5", name: "Mutton Curry Rice", price: 299, image: foodNonveg, rating: 4.6, category: "Food", description: "Slow-cooked mutton curry served with steamed basmati rice." },
  { id: "fd6", name: "Chilli Chicken", price: 199, image: foodChinese, rating: 4.4, category: "Food", description: "Spicy Indo-Chinese chilli chicken with crispy coating." },
  { id: "fd7", name: "Veg Thali Combo", price: 159, image: foodVeg, rating: 4.3, category: "Food", description: "Complete veg thali with 3 curries, dal, rice, roti and dessert." },
  { id: "fd8", name: "Chicken Tikka Platter", price: 279, image: foodNonveg, rating: 4.5, category: "Food", description: "Tandoori chicken tikka with mint chutney and onion rings." },
  { id: "fd9", name: "Veg Fried Rice", price: 149, image: foodChinese, rating: 4.0, category: "Food", description: "Chinese-style vegetable fried rice with soy sauce." },
  { id: "fd10", name: "Chole Bhature", price: 119, image: foodVeg, rating: 4.4, category: "Food", description: "Spicy chole served with fluffy bhature and pickle." },
  { id: "fd11", name: "Chicken Manchurian", price: 219, image: foodChinese, rating: 4.3, category: "Food", description: "Crispy chicken manchurian in spicy gravy." },
  { id: "fd12", name: "Butter Chicken", price: 259, image: foodNonveg, rating: 4.7, category: "Food", description: "Creamy butter chicken with garlic naan." },
  { id: "fd13", name: "Palak Paneer Rice", price: 139, image: foodVeg, rating: 4.1, category: "Food", description: "Fresh palak paneer served with steamed rice." },
  { id: "fd14", name: "Mutton Biryani", price: 349, originalPrice: 449, image: foodNonveg, rating: 4.8, category: "Food", description: "Premium mutton biryani with aromatic spices.", badge: "22% OFF" },
  { id: "fd15", name: "Manchow Soup", price: 99, image: foodChinese, rating: 4.0, category: "Food", description: "Hot and spicy manchow soup with crispy noodles." },

  // ─── Grocery ───
  { id: "g1", name: "Fortune Sunflower Oil", price: 189, image: groceryOil, rating: 4.0, category: "Grocery", description: "Refined sunflower oil, 1 litre bottle." },
  { id: "g2", name: "MDH Garam Masala", price: 65, image: groceryMasala, rating: 4.3, category: "Grocery", description: "Authentic blend of aromatic spices, 100g pack." },
  { id: "g3", name: "Aashirvaad Atta", price: 299, image: groceryAtta, rating: 4.5, category: "Grocery", description: "Premium whole wheat flour, 5kg bag." },
  { id: "g4", name: "Lays Classic Chips", price: 40, image: grocerySnacks, rating: 4.1, category: "Grocery", description: "Classic salted potato chips, 150g party pack." },
  { id: "g5", name: "Fresh Tomatoes", price: 35, image: groceryVegs, rating: 4.0, category: "Grocery", description: "Farm-fresh red tomatoes, 500g." },
  { id: "g6", name: "Chicken Breast", price: 320, image: groceryMeat, rating: 4.4, category: "Grocery", description: "Fresh boneless chicken breast, 1kg pack." },
  { id: "g7", name: "Saffola Gold Oil", price: 249, image: groceryOil, rating: 4.2, category: "Grocery", description: "Blended cooking oil for a healthy heart, 1L." },
  { id: "g8", name: "Everest Turmeric Powder", price: 45, image: groceryMasala, rating: 4.4, category: "Grocery", description: "Pure turmeric powder, 200g pack." },
  { id: "g9", name: "India Gate Basmati Rice", price: 399, image: groceryAtta, rating: 4.6, category: "Grocery", description: "Long grain basmati rice, 5kg bag." },
  { id: "g10", name: "Kurkure Masala Munch", price: 30, image: grocerySnacks, rating: 4.0, category: "Grocery", description: "Crunchy corn puff snack, 100g pack." },
  { id: "g11", name: "Fresh Onions", price: 30, image: groceryVegs, rating: 3.9, category: "Grocery", description: "Farm-fresh onions, 1kg." },
  { id: "g12", name: "Mutton Leg Pieces", price: 650, image: groceryMeat, rating: 4.5, category: "Grocery", description: "Fresh mutton leg pieces, 1kg pack." },
  { id: "g13", name: "Mustard Oil", price: 159, image: groceryOil, rating: 4.1, category: "Grocery", description: "Cold pressed mustard oil, 1L bottle." },
  { id: "g14", name: "Red Chilli Powder", price: 55, image: groceryMasala, rating: 4.2, category: "Grocery", description: "Premium Kashmiri red chilli powder, 200g." },
  { id: "g15", name: "Maggi Noodles Pack", price: 120, image: grocerySnacks, rating: 4.3, category: "Grocery", description: "Maggi masala noodles, family pack of 12." },
  { id: "g16", name: "Fresh Potatoes", price: 25, image: groceryVegs, rating: 4.0, category: "Grocery", description: "Farm-fresh potatoes, 1kg." },
  { id: "g17", name: "Fish Fillets", price: 450, image: groceryMeat, rating: 4.3, category: "Grocery", description: "Fresh boneless fish fillets, 500g." },
  { id: "g18", name: "Coconut Oil", price: 199, image: groceryOil, rating: 4.4, category: "Grocery", description: "Virgin coconut oil, 500ml cold pressed." },

  // ─── Medicine ───
  { id: "m1", name: "Paracetamol 500mg", price: 85, image: medTablets, rating: 4.2, category: "Medicine", description: "Pain relief and fever reducer tablets. Strip of 10." },
  { id: "m2", name: "Cough Syrup 100ml", price: 120, image: medSyrup, rating: 4.0, category: "Medicine", description: "Effective cough suppressant syrup with measuring cup." },
  { id: "m3", name: "Multivitamin Capsules", price: 649, image: medHealth, rating: 4.6, category: "Medicine", description: "Daily multivitamin supplement, 60 capsules.", badge: "Best Seller" },
  { id: "m4", name: "Cetirizine Tablets", price: 55, image: medTablets, rating: 4.1, category: "Medicine", description: "Anti-allergy cetirizine tablets, strip of 10." },
  { id: "m5", name: "Throat Soothing Syrup", price: 95, image: medSyrup, rating: 4.0, category: "Medicine", description: "Herbal throat soothing syrup, 150ml." },
  { id: "m6", name: "Protein Powder", price: 1499, originalPrice: 1999, image: medHealth, rating: 4.5, category: "Medicine", description: "Whey protein powder, chocolate flavour, 1kg.", badge: "25% OFF" },
  { id: "m7", name: "Ibuprofen 400mg", price: 65, image: medTablets, rating: 4.0, category: "Medicine", description: "Anti-inflammatory pain relief tablets, strip of 10." },
  { id: "m8", name: "Digestive Syrup", price: 110, image: medSyrup, rating: 4.2, category: "Medicine", description: "Ayurvedic digestive syrup for better digestion, 200ml." },
  { id: "m9", name: "Omega-3 Fish Oil", price: 549, image: medHealth, rating: 4.4, category: "Medicine", description: "Omega-3 fish oil capsules, 90 softgels." },
  { id: "m10", name: "Vitamin C Tablets", price: 199, image: medTablets, rating: 4.3, category: "Medicine", description: "Chewable vitamin C 500mg tablets, 60 count." },
  { id: "m11", name: "Cold & Flu Syrup", price: 135, image: medSyrup, rating: 4.1, category: "Medicine", description: "Multi-symptom cold and flu relief syrup, 100ml." },
  { id: "m12", name: "Calcium + D3 Tablets", price: 349, image: medHealth, rating: 4.5, category: "Medicine", description: "Calcium and vitamin D3 supplement, 60 tablets." },
];

// Replace legacy grocery & medicine items with the curated catalogs
export const allProducts: Product[] = [
  ...baseProducts.filter((p) => p.category !== "Grocery" && p.category !== "Medicine"),
  ...GROCERY_PRODUCTS,
  ...MEDICINE_PRODUCTS,
];

export const categories = ["All", "Fashion", "Items", "Food", "Grocery", "Medicine"];
