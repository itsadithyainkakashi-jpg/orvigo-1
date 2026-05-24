export type DisplayItem = {
  id: string;
  name: string;
  sub: string;
  price: number;
  original?: number;
  rating: number;
  reviews: number;
};

export const FEVER_PAIN: DisplayItem[] = [
  { id: "m-tylenol-extra-strength-50", name: "Tylenol 500mg", sub: "Pain Reliever / Fever Reducer", price: 120, original: 135, rating: 4.7, reviews: 128 },
  { id: "m-domperidone-10mg-30", name: "Domperidone 10mg", sub: "Nausea & Vomiting Relief", price: 22, original: 30, rating: 4.5, reviews: 96 },
  { id: "m-gabapentin-100mg-100", name: "Gabapentin 100mg", sub: "Neuropathic / Nerve Pain Relief", price: 180, original: 200, rating: 4.6, reviews: 96 },
  { id: "m-tums-antacid-330", name: "Tums Antacid", sub: "Acid & Heartburn Relief", price: 30, original: 40, rating: 4.4, reviews: 93 },
];

export const COLD_ALLERGY: DisplayItem[] = [
  { id: "m-cetzine-cetirizine-50", name: "Cetirizine 10mg", sub: "Anti-allergic", price: 35, original: 45, rating: 4.5, reviews: 143 },
  { id: "m-montelukast-10mg-30", name: "Montelukast 10mg", sub: "Asthma / Allergy Relief", price: 60, original: 75, rating: 4.6, reviews: 110 },
  { id: "m-antihistamine-10mg-28", name: "Antihistamine Tablets", sub: "Cold & Allergy Relief", price: 40, original: 55, rating: 4.4, reviews: 89 },
];

export const HEART_BP: DisplayItem[] = [
  { id: "m-ramipril-1-25-100", name: "Ramipril 1.25mg", sub: "Blood Pressure / Heart", price: 55, original: 70, rating: 4.6, reviews: 88 },
  { id: "m-digoxin-1000", name: "Digoxin 250mcg", sub: "Heart Failure / Support", price: 150, original: 170, rating: 4.6, reviews: 78 },
  { id: "m-atorvastatin-10mg-28", name: "Atorvastatin 10mg", sub: "Cholesterol Lowering", price: 70, original: 90, rating: 4.5, reviews: 76 },
];

export const MENTAL: DisplayItem[] = [
  { id: "m-lexapro-escitalopram-28", name: "Lexapro 10mg", sub: "Anxiety & Depression", price: 95, original: 120, rating: 4.5, reviews: 64 },
  { id: "m-zoloft-100mg-28", name: "Zoloft 100mg", sub: "Depression / OCD", price: 85, original: 110, rating: 4.4, reviews: 72 },
  { id: "m-clonazepam-100", name: "Clonazepam 2mg", sub: "Anti-anxiety / Seizures", price: 30, original: 40, rating: 4.5, reviews: 67 },
  { id: "m-mirtazapine-15mg-28", name: "Mirtazapine 15mg", sub: "Sleep & Depression Support", price: 45, original: 60, rating: 4.4, reviews: 58 },
];

export const SKIN: DisplayItem[] = [
  { id: "m-hydrocortisone-cream-20", name: "Hydrocortisone Cream", sub: "Skin Irritation Relief", price: 65, original: 85, rating: 4.4, reviews: 36 },
  { id: "m-betamethasone-cream-45", name: "Betamethasone Cream", sub: "Skin Inflammation", price: 85, original: 110, rating: 4.5, reviews: 42 },
  { id: "m-double-antibiotic-ointment-28", name: "Double Antibiotic Ointment", sub: "Wound Care", price: 75, original: 95, rating: 4.6, reviews: 51 },
  { id: "m-dettol-antiseptic-500", name: "Dettol Antiseptic", sub: "Germ Protection", price: 120, original: 160, rating: 4.7, reviews: 122 },
];

export const STOMACH: DisplayItem[] = [
  { id: "m-famotidine-20mg-28", name: "Famotidine 20mg", sub: "Acidity & Heartburn Relief", price: 28, original: 40, rating: 4.4, reviews: 81 },
  { id: "m-imodium-original-6", name: "Imodium", sub: "Diarrhea Relief", price: 50, original: 65, rating: 4.5, reviews: 64 },
  { id: "m-tums-antacid-330", name: "Tums Antacid", sub: "Heartburn Relief", price: 30, original: 40, rating: 4.4, reviews: 93 },
];

export type CategoryKey = "fever" | "cold" | "heart" | "skin" | "mental" | "stomach" | "diabetes";

export const CATEGORY_META: Record<CategoryKey, { label: string; emoji: string; items: DisplayItem[] }> = {
  fever:   { label: "Fever & Pain Relief", emoji: "🔥", items: FEVER_PAIN },
  cold:    { label: "Cold & Allergy",      emoji: "🤧", items: COLD_ALLERGY },
  heart:   { label: "Heart & BP Care",     emoji: "❤️", items: HEART_BP },
  skin:    { label: "Skin Care & Creams",  emoji: "🧴", items: SKIN },
  mental:  { label: "Mental Wellness",     emoji: "🧠", items: MENTAL },
  stomach: { label: "Stomach & Acidity",   emoji: "💊", items: STOMACH },
  diabetes:{ label: "Diabetes Care",       emoji: "🩺", items: [] },
};
