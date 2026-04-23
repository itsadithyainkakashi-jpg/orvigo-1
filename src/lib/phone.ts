/**
 * Phone number helpers for Indian (+91) mobile numbers.
 *
 * Goals:
 * - Always output canonical E.164: `+91XXXXXXXXXX`
 * - Never duplicate the country code
 * - Trim spaces / strip non-digits
 * - Strip leading `0` (STD prefix)
 * - Validate that the local number is exactly 10 digits and starts with 6-9
 */

/** Strip everything down to a bare 10-digit local mobile number. */
export const normalizeMobile = (raw: string): string => {
  if (!raw) return "";
  let digits = raw.replace(/\s+/g, "").replace(/\D/g, "");
  // If user pasted a +91-prefixed (or 91-prefixed) number, drop the country code
  if (digits.startsWith("91") && digits.length > 10) {
    digits = digits.slice(2);
  }
  // Drop any leading zeros (STD trunk prefix)
  if (digits.startsWith("0")) {
    digits = digits.replace(/^0+/, "");
  }
  return digits.slice(0, 10);
};

/** True only for a valid 10-digit Indian mobile number (starts 6-9). */
export const isValidIndianMobile = (raw: string): boolean => {
  const n = normalizeMobile(raw);
  return /^[6-9]\d{9}$/.test(n);
};

/**
 * Convert any input to canonical E.164 (`+91XXXXXXXXXX`).
 * Returns `null` if the input cannot form a valid Indian mobile number.
 */
export const toE164India = (raw: string): string | null => {
  const n = normalizeMobile(raw);
  if (!/^[6-9]\d{9}$/.test(n)) return null;
  return `+91${n}`;
};
