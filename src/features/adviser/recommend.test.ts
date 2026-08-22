import { describe, expect, it } from "vitest";
import { recommendProduct } from "./recommend";

describe("recommendProduct", () => {
  it("boş istek için ürün uydurmaz", () => expect(recommendProduct("   ")).toBeNull());
  it("hediye niyetini pudra sete yönlendirir", () => expect(recommendProduct("Eşime zarif bir hediye")).toMatchObject({ id: "blush-gift-set" }));
  it("günlük ritüeli vücut ve saç ürününe yönlendirir", () => expect(recommendProduct("Günlük saç ritüeli")).toMatchObject({ id: "body-hair-mist" }));
});
