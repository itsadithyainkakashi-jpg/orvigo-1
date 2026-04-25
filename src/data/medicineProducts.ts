import type { Product } from "@/contexts/CartContext";
import whisperUltraGreen from "@/assets/medicine/whisper-ultra-green.jpg";
import whisperChoiceOrange from "@/assets/medicine/whisper-choice-orange.jpg";
import rioCottonySoft from "@/assets/medicine/rio-cottony-soft.jpg";
import pan40 from "@/assets/medicine/pan-40.jpg";
import digeneOrange from "@/assets/medicine/digene-orange.jpg";
import voliniGel from "@/assets/medicine/volini-gel.jpg";
import voliniSpray from "@/assets/medicine/volini-spray.jpg";
import saridon from "@/assets/medicine/saridon.jpg";
import cofsilsOrange from "@/assets/medicine/cofsils-orange.jpg";
import vicksLozenges from "@/assets/medicine/vicks-lozenges.jpg";
import digitalThermometer from "@/assets/medicine/digital-thermometer.jpg";
import vicksInhaler from "@/assets/medicine/vicks-inhaler.jpg";
import kofletH from "@/assets/medicine/koflet-h.jpg";
import evion400 from "@/assets/medicine/evion-400.jpg";
import prolyteOrsDrink from "@/assets/medicine/prolyte-ors-drink.jpg";
import orsPowderSachet from "@/assets/medicine/ors-powder-sachet.jpg";
import nicotexGum from "@/assets/medicine/nicotex-gum.jpg";

/**
 * Medicine catalog — manually curated.
 *
 * Only products explicitly added below are shown on the Medicine page.
 * No auto-generated, AI, or remote-fetched products. To add a new product,
 * upload its image to `src/assets/medicine/`, import it, and append a new
 * entry to `ITEMS` with a unique stable `id`.
 */

type Item = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  desc: string;   // Size / Unit
  image: string;
  badge?: string;
};

const ITEMS: Item[] = [
  {
    id: "m-whisper-ultra-xl-8",
    name: "Whisper Ultra Hygiene Sanitary Pads",
    price: 224,
    originalPrice: 299,
    desc: "XL, 8 Pads (284 mm)",
    image: whisperUltraGreen,
    badge: "25% OFF",
  },
  {
    id: "m-whisper-choice-xl-6",
    name: "Whisper Choice Ultra Sanitary Napkin",
    price: 45,
    desc: "XL, 6 Pads",
    image: whisperChoiceOrange,
  },
  {
    id: "m-rio-cottony-xl-14",
    name: "RIO Cottony Soft Sanitary Pads",
    price: 120,
    desc: "XL, 14 Pads + 1 Free",
    image: rioCottonySoft,
  },
  {
    id: "m-pan-40-15",
    name: "Pantoprazole PAN 40 Tablets",
    price: 120,
    desc: "40 mg, Strip of 15 tablets",
    image: pan40,
  },
  {
    id: "m-digene-orange-15",
    name: "Digene Orange Tablets",
    price: 95,
    desc: "Strip of 15 tablets",
    image: digeneOrange,
  },
  {
    id: "m-volini-gel-100",
    name: "Volini Pain Relief Gel",
    price: 180,
    desc: "100 g",
    image: voliniGel,
  },
  {
    id: "m-volini-spray-100",
    name: "Volini Pain Relief Spray",
    price: 220,
    desc: "100 g",
    image: voliniSpray,
  },
  {
    id: "m-saridon-10",
    name: "Saridon Tablets",
    price: 50,
    desc: "Strip of 10 tablets",
    image: saridon,
  },
  {
    id: "m-cofsils-orange-10",
    name: "Cofsils Orange Lozenges",
    price: 30,
    desc: "Strip of 10 lozenges",
    image: cofsilsOrange,
  },
  {
    id: "m-vicks-lozenges-16",
    name: "Vicks Medicated Lozenges",
    price: 60,
    desc: "16 lozenges",
    image: vicksLozenges,
  },
  {
    id: "m-digital-thermometer",
    name: "Digital Thermometer",
    price: 150,
    desc: "1 unit",
    image: digitalThermometer,
  },
  {
    id: "m-vicks-inhaler-2",
    name: "Vicks Inhaler Pack",
    price: 122,
    desc: "Pack of 2",
    image: vicksInhaler,
  },
  {
    id: "m-koflet-h-6",
    name: "Himalaya Koflet-H Lozenges",
    price: 70,
    desc: "Pack of 6",
    image: kofletH,
  },
  {
    id: "m-evion-400-20",
    name: "Evion 400 Vitamin E Capsules",
    price: 95,
    desc: "Strip of 20 capsules",
    image: evion400,
  },
  {
    id: "m-prolyte-ors-drink-200",
    name: "Prolyte ORS Drink",
    price: 35,
    desc: "200 ml",
    image: prolyteOrsDrink,
  },
  {
    id: "m-ors-powder-sachet-1",
    name: "ORS Powder Sachet",
    price: 20,
    desc: "1 Sachet",
    image: orsPowderSachet,
  },
  {
    id: "m-nicotex-gum-10",
    name: "Nicotex Nicotine Gum",
    price: 120,
    desc: "4 mg, 10 gums",
    image: nicotexGum,
  },
];

export const MEDICINE_PRODUCTS: Product[] = ITEMS.map((it, idx) => ({
  id: it.id,
  name: it.name,
  price: it.price,
  originalPrice: it.originalPrice,
  image: it.image,
  rating: 4.3 + (idx % 3) * 0.1,
  category: "Medicine",
  description: it.desc,
  badge: it.badge,
}));

/**
 * Fallback image for the MedicineProductImage component.
 * Since all current products use bundled local assets that always load,
 * the generic fallback is just the first product image — never used in
 * practice but kept to satisfy the component's contract.
 */
export const MEDICINE_GENERIC_FALLBACK = whisperUltraGreen;

/**
 * Per-product fallback. For local bundled assets we just point at the
 * same image — they cannot fail to load.
 */
const PRODUCT_FALLBACKS: Record<string, string> = Object.fromEntries(
  ITEMS.map((it) => [it.id, it.image]),
);

export const getMedicineFallback = (productId: string): string =>
  PRODUCT_FALLBACKS[productId] ?? MEDICINE_GENERIC_FALLBACK;
