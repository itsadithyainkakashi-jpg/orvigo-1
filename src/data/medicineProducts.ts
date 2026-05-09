import type { Product } from "@/contexts/CartContext";
import whisperUltraGreen from "@/assets/medicine/whisper-ultra-green.png";
import whisperChoiceOrange from "@/assets/medicine/whisper-choice-orange.png";
import rioCottonySoft from "@/assets/medicine/rio-cottony-soft.png";
import pan40 from "@/assets/medicine/pan-40.png";
import digeneOrange from "@/assets/medicine/digene-orange.png";
import voliniGel from "@/assets/medicine/volini-gel.png";
import voliniSpray from "@/assets/medicine/volini-spray.png";
import saridon from "@/assets/medicine/saridon.png";
import cofsilsOrange from "@/assets/medicine/cofsils-orange.png";
import vicksLozenges from "@/assets/medicine/vicks-lozenges.png";
import digitalThermometer from "@/assets/medicine/digital-thermometer.png";
import vicksInhaler from "@/assets/medicine/vicks-inhaler.png";
import kofletH from "@/assets/medicine/koflet-h.png";
import evion400 from "@/assets/medicine/evion-400.png";
import prolyteOrsDrink from "@/assets/medicine/prolyte-ors-drink.png";
import orsPowderSachet from "@/assets/medicine/ors-powder-sachet.png";
import nicotexGum from "@/assets/medicine/nicotex-gum.png";
import strepsilsOrange from "@/assets/medicine/strepsils-orange.png";
import cetcip from "@/assets/medicine/cetcip.png";
import pantosec from "@/assets/medicine/pantosec.png";
import ophthaCare from "@/assets/medicine/ophtha-care.png";
import refreshTears from "@/assets/medicine/refresh-tears.png";
import systaneHydration from "@/assets/medicine/systane-hydration.png";
import moxiblu from "@/assets/medicine/moxiblu.png";
import gelusilMps from "@/assets/medicine/gelusil-mps.png";
import crocin650 from "@/assets/medicine/crocin-650.png";
import biodine from "@/assets/medicine/biodine.png";
import sterimmune from "@/assets/medicine/sterimmune.png";
import neosporin from "@/assets/medicine/neosporin.png";
import tylenolExtraStrength from "@/assets/medicine/tylenol-extra-strength.jpg";
import antihistamine10mg from "@/assets/medicine/antihistamine-10mg.jpg";
import tumsAntacid from "@/assets/medicine/tums-antacid.jpg";
import doubleAntibioticOintment from "@/assets/medicine/double-antibiotic-ointment.jpg";
import imodiumOriginal from "@/assets/medicine/imodium-original.jpg";
import dettolAntiseptic from "@/assets/medicine/dettol-antiseptic.jpg";
import hydrocortisoneCream from "@/assets/medicine/hydrocortisone-cream.jpg";
import morphineSulfate from "@/assets/medicine/morphine-sulfate.jpg";
import atorvastatin from "@/assets/medicine/atorvastatin.jpg";
import lexapro from "@/assets/medicine/lexapro.jpg";

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
  rxRequired?: boolean;
  warning?: string;
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
  {
    id: "m-strepsils-orange-24",
    name: "Strepsils Orange Lozenges",
    price: 120,
    desc: "24 lozenges",
    image: strepsilsOrange,
    badge: "Throat Relief",
  },
  {
    id: "m-cetcip-10",
    name: "Cetcip (Cetirizine 10mg)",
    price: 35,
    desc: "Strip of 10 tablets",
    image: cetcip,
    badge: "Allergy Relief",
  },
  {
    id: "m-pantosec-15",
    name: "Pantosec (Pantoprazole 40mg)",
    price: 110,
    desc: "Strip of 15 tablets",
    image: pantosec,
    badge: "Acidity",
    rxRequired: true,
  },
  {
    id: "m-ophtha-care-10",
    name: "Himalaya Ophtha Care Eye Drops",
    price: 95,
    desc: "10 ml",
    image: ophthaCare,
    badge: "Eye Care",
  },
  {
    id: "m-refresh-tears-15",
    name: "Refresh Tears Eye Drops",
    price: 180,
    desc: "15 ml",
    image: refreshTears,
    badge: "Eye Lubricant",
  },
  {
    id: "m-systane-hydration-10",
    name: "Systane Hydration Eye Drops",
    price: 350,
    desc: "10 ml",
    image: systaneHydration,
    badge: "Advanced Eye Care",
  },
  {
    id: "m-moxiblu-5",
    name: "Moxifloxacin Eye Drops",
    price: 120,
    desc: "5 ml",
    image: moxiblu,
    badge: "Eye Infection",
    rxRequired: true,
  },
  {
    id: "m-gelusil-mps-200",
    name: "Gelusil MPS Liquid",
    price: 150,
    desc: "200 ml",
    image: gelusilMps,
    badge: "Acidity Relief",
  },
  {
    id: "m-crocin-650-15",
    name: "Crocin 650 (Paracetamol)",
    price: 35,
    desc: "Strip of 15 tablets",
    image: crocin650,
    badge: "Fever & Pain",
    warning: "Max 2 tablets/day without doctor advice",
  },
  {
    id: "m-biodine-100",
    name: "Povidone Iodine Solution",
    price: 120,
    desc: "100 ml",
    image: biodine,
    badge: "Antiseptic",
  },
  {
    id: "m-sterimmune-15",
    name: "Sterimmune Wound Heal Ointment",
    price: 90,
    desc: "15 g",
    image: sterimmune,
    badge: "First Aid",
  },
  {
    id: "m-neosporin-10",
    name: "Neosporin Ophthalmic Ointment",
    price: 110,
    desc: "10 g",
    image: neosporin,
    badge: "Eye Antibiotic",
    rxRequired: true,
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

/** Set of product IDs that require a prescription (Rx). */
export const RX_REQUIRED_IDS: Set<string> = new Set(
  ITEMS.filter((it) => it.rxRequired).map((it) => it.id),
);

/** Per-product dosage / safety warnings keyed by product ID. */
export const PRODUCT_WARNINGS: Record<string, string> = Object.fromEntries(
  ITEMS.filter((it) => it.warning).map((it) => [it.id, it.warning as string]),
);

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
