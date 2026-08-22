import { catalog, type Product } from "../catalog/catalog";

// Bu düzenli ifadeler kullanıcı cümlesindeki farklı dil ve yazım biçimlerini
// aynı alışveriş niyetinde toplar. `/i`, büyük-küçük harf farkını önemsemez.
const giftWords = /hediye|eşim|wife|partner|gift|cadeau|offrir|élégant|zarif/i;
const ritualWords = /günlük|ritüel|daily|everyday|quotidien|rituel|saç|hair|cheveux/i;

// Kuralların sırası öncelik sırasıdır. Yeni bir niyet eklemek için ana fonksiyona
// yeni `if` dalları eklemek yerine bu listeye tek bir kural eklenir.
const recommendationRules = [
  { matches: ritualWords, productId: "body-hair-mist" },
  { matches: giftWords, productId: "blush-gift-set" },
] as const;

const defaultProductId = "burgundy-gift-set";

/**
 * Kullanıcının serbest metnini güvenli demo kataloğundaki tek bir ürüne eşler.
 * Koku notası üretmez ve katalog dışında ürün önermez.
 */
export function recommendProduct(input: string): Product | null {
  // trim(), metnin başındaki ve sonundaki boşlukları temizler. Böylece yalnızca
  // boşluk yazılmış bir istek gerçek bir danışman sorusu olarak kabul edilmez.
  const value = input.trim();

  // Erken dönüş, kalan fonksiyonu ek bir `else` bloğuna sokmadan boş girdiyi bitirir.
  if (!value) return null;

  const matchedRule = recommendationRules.find((rule) => rule.matches.test(value));
  const recommendedProductId = matchedRule?.productId ?? defaultProductId;

  // `??`, sol taraf null/undefined olduğunda güvenli yedeği kullanır. Katalog
  // yanlışlıkla değişse bile fonksiyon tanımsız değer döndürmez.
  return catalog.find((product) => product.id === recommendedProductId) ?? catalog[0];
}
