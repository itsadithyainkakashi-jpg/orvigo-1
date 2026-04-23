import { describe, it, expect } from "vitest";
import { normalizeMobile, isValidIndianMobile, toE164India } from "./phone";

describe("normalizeMobile", () => {
  it("returns bare 10-digit number unchanged", () => {
    expect(normalizeMobile("9876543210")).toBe("9876543210");
  });

  it("trims spaces and dashes", () => {
    expect(normalizeMobile("  98765 43210 ")).toBe("9876543210");
    expect(normalizeMobile("987-654-3210")).toBe("9876543210");
  });

  it("strips +91 country code without duplicating it", () => {
    expect(normalizeMobile("+919876543210")).toBe("9876543210");
    expect(normalizeMobile("+91 98765 43210")).toBe("9876543210");
  });

  it("strips bare 91 prefix", () => {
    expect(normalizeMobile("919876543210")).toBe("9876543210");
  });

  it("strips leading zero", () => {
    expect(normalizeMobile("09876543210")).toBe("9876543210");
  });

  it("caps at 10 digits", () => {
    expect(normalizeMobile("98765432101234")).toBe("9876543210");
  });

  it("returns empty for empty/garbage input", () => {
    expect(normalizeMobile("")).toBe("");
    expect(normalizeMobile("abcd")).toBe("");
  });
});

describe("isValidIndianMobile", () => {
  it.each(["9876543210", "+919876543210", "919876543210", "09876543210", "  98765 43210 "])(
    "accepts valid input %s",
    (input) => {
      expect(isValidIndianMobile(input)).toBe(true);
    },
  );

  it.each([
    ["too short", "987654321"],
    ["starts with 5", "5876543210"],
    ["starts with 1", "1234567890"],
    ["all zeros", "0000000000"],
    ["empty", ""],
    ["letters only", "abcdefghij"],
  ])("rejects %s", (_label, input) => {
    expect(isValidIndianMobile(input)).toBe(false);
  });
});

describe("toE164India", () => {
  it("always returns +91XXXXXXXXXX for valid inputs", () => {
    const inputs = [
      "9876543210",
      " 9876543210 ",
      "98765 43210",
      "+919876543210",
      "+91 98765 43210",
      "919876543210",
      "09876543210",
    ];
    for (const i of inputs) {
      const out = toE164India(i);
      expect(out).toBe("+919876543210");
      expect(out).toMatch(/^\+91\d{10}$/);
    }
  });

  it("never duplicates +91 even on repeated normalization", () => {
    const once = toE164India("+919876543210");
    expect(once).toBe("+919876543210");
    // Feeding the canonical output back in must still produce the same value
    expect(toE164India(once!)).toBe("+919876543210");
  });

  it("returns null for invalid lengths or formats", () => {
    expect(toE164India("123")).toBeNull();
    expect(toE164India("98765432")).toBeNull(); // 8 digits
    expect(toE164India("5876543210")).toBeNull(); // invalid leading digit
    expect(toE164India("1234567890")).toBeNull(); // starts with 1
    expect(toE164India("")).toBeNull();
  });
});
