import { describe, expect, it } from "vitest";
import { catalog, getProductBySlug } from "./catalog";

describe("ürün kataloğu", () => {
  it("her ürün için benzersiz ve URL güvenli slug sağlar", () => {
    const slugs = catalog.map((product) => product.slug);

    expect(new Set(slugs).size).toBe(slugs.length);
    expect(slugs.every((slug) => /^[a-z0-9-]+$/.test(slug))).toBe(true);
  });

  it("doğrulanmamış fiyatları rakam olarak uydurmaz", () => {
    expect(catalog.every((product) => product.priceInMinorUnit === null)).toBe(true);
  });

  it("slug üzerinden doğru ürünü bulur", () => {
    expect(getProductBySlug("gel-parfumant-50-ml")).toMatchObject({ id: "gel-parfumant" });
  });
});
