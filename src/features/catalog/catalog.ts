import { z } from "zod";

// TypeScript tipleri derleme sonrasında kaybolur. Zod şeması ise uygulama çalışırken
// prototip verisinin beklediğimiz biçimde olup olmadığını gerçekten doğrular.
const productSchema = z.object({
  id: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(1),
  format: z.enum(["single", "gift", "ritual"]),
  volumeLabel: z.string().nullable(),
  priceInMinorUnit: z.number().int().nonnegative().nullable(),
  image: z.string().startsWith("/images/"),
  gallery: z.array(z.string().startsWith("/images/")).min(1),
  imagePosition: z.string(),
});

// parse(), hatalı bir katalog kaydını arayüzde sessizce göstermek yerine uygulama
// başlangıcında anlaşılır bir doğrulama hatası üretir.
export const catalog = z.array(productSchema).parse([
  { id: "gel-parfumant", slug: "gel-parfumant-50-ml", name: "Gel Parfümant", format: "single", volumeLabel: "50 ml", priceInMinorUnit: null, image: "/images/products/gel-perfume-product.webp", gallery: ["/images/products/gel-perfume-product.webp", "/images/products/campaign-film-strip.webp"], imagePosition: "50% 50%" },
  { id: "burgundy-gift-set", slug: "bordo-hediye-ritueli", name: "Bordo Hediye Ritüeli", format: "gift", volumeLabel: null, priceInMinorUnit: null, image: "/images/products/burgundy-champagne-gift-sets.webp", gallery: ["/images/products/burgundy-champagne-gift-sets.webp", "/images/products/campaign-film-strip.webp"], imagePosition: "50% 18%" },
  { id: "blush-gift-set", slug: "pudra-hediye-ritueli", name: "Pudra Hediye Ritüeli", format: "gift", volumeLabel: null, priceInMinorUnit: null, image: "/images/products/blush-gift-set.webp", gallery: ["/images/products/blush-gift-set.webp", "/images/products/campaign-film-strip.webp"], imagePosition: "50% 43%" },
  { id: "body-hair-mist", slug: "vucut-sac-kokusu-100-ml", name: "Vücut & Saç Kokusu", format: "ritual", volumeLabel: "100 ml", priceInMinorUnit: null, image: "/images/products/body-hair-mist-lifestyle.webp", gallery: ["/images/products/body-hair-mist-lifestyle.webp", "/images/products/campaign-film-strip.webp"], imagePosition: "50% 60%" },
]);

export type Product = (typeof catalog)[number];

/** Kimliği verilen ürünü bulur; eşleşme yoksa `undefined` döndürür. */
export function getProduct(id: string) { return catalog.find((product) => product.id === id); }

/** URL'deki okunabilir ürün adından katalog kaydını bulur. */
export function getProductBySlug(slug: string) { return catalog.find((product) => product.slug === slug); }
