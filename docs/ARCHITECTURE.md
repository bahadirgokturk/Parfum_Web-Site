# Teknik Mimari

Durum: **Prototip implementasyonu için önerildi**  
Kapsam: üretime uyumlu gelişim yolu olan etkileşimli prototip

## 1. Mimari karar

Strict TypeScript ve Next.js App Router kullanan, tek deployment olarak çalışan bir **modüler monolit** kurulur.

Uygulama tek projedir; fakat iş yetenekleri açık arayüzlerle ayrı modüllerde tutulur. Bu, prototipi hızlı geliştirirken UI'ı fixture, AI, ödeme, stok veya gelecekteki veritabanına bağlamaz.

Yeni onaylı gereksinim kanıtlamadan mikroservis, veritabanı, auth, queue, Redis, CMS veya gerçek AI/ödeme entegrasyonu eklenmez.

## 2. Teknoloji tabanı

| Alan | Önerilen seçim | Gerekçe |
| --- | --- | --- |
| Web çatısı | Güncel desteklenen Next.js App Router | Server-first render, routing, metadata, görsel ve endpoint'ler tek uygulamada |
| Dil | Strict TypeScript | UI ve sunucu arasında ortak sözleşme ve güvenli refactor |
| Render | Varsayılan static/server | Hızlı katalog, SEO ve az browser JavaScript'i |
| Etkileşim | Yalnızca sınırlı Client Component | Danışman, demo sepet, galeri ve bilinçli hareket |
| Stil | CSS tasarım token'ları + scaffold sırasında seçilecek stil katmanı | Keyfî değer yerine kendine özgü marka sistemi |
| Dil yapısı | `/tr`, `/en`, `/fr`; sunucuda yüklenen tipli sözlükler | Kararlı URL, metadata ve düşük client payload |
| Runtime validation | Tüm trust boundary'lerde tek şema kütüphanesi | Fixture, route, AI, env ve gelecekte webhook kontrolü |
| Test | Unit/component + kritik akışlarda Playwright | Hızlı geri bildirim ve tarayıcı kanıtı |
| Dağıtım | Vercel preview önerisi | Paydaş incelemesi ve Next.js uyumu |

Kesin sürümler ve paket yöneticisi proje oluşturulurken sabitlenip `DECISIONS.md` içine kaydedilir.

## 3. Sistem bağlamı

```text
Ziyaretçi / Marka sahibi
          |
          v
Next.js web uygulaması
  |-- çok dilli storefront UI
  |-- katalog uygulama servisleri
  |-- parfüm danışmanı orkestrasyonu
  |-- yerel demo sepet state'i
  |-- sunucu endpoint sınırları
          |
          +--> Doğrulanan katalog fixture'ı (prototip)
          +--> Deterministik danışman simülasyonu (prototip)

Yalnızca onaydan sonra gelecek adaptörler:
          +--> Ticaret/katalog platformu veya PostgreSQL
          +--> AI sağlayıcısı
          +--> Ödeme sağlayıcısı
          +--> Stok/kargo/e-fatura
          +--> E-posta, analitik ve gözlemlenebilirlik
```

## 4. Kod organizasyonu

```text
src/
  app/
    [locale]/
      (storefront)/
      layout.tsx
      page.tsx
    api/
  features/
    catalogue/
      domain/
      application/
      infrastructure/
      ui/
    adviser/
      domain/
      application/
      infrastructure/
      ui/
    demo-bag/
      domain/
      application/
      ui/
  shared/
    config/
    i18n/
    ui/
    validation/
    observability/
messages/
  tr.json
  en.json
  fr.json
public/images/
tests/e2e/
```

- `app/` route ve layout'ları birleştirir; iş kuralı tutmaz.
- `domain/` framework'ten bağımsız tip ve kuralları tutar.
- `application/` use-case ve port/arayüzleri tutar.
- `infrastructure/` bugün fixture, ileride dış servis adaptörlerini uygular.
- `ui/` feature'a özel bileşenleri tutar.
- `shared/` sadece gerçekten ortak primitive'leri tutar; çöplük olmaz.
- Feature, başka feature'ın iç dosyası yerine public uygulama arayüzünü kullanır.
- Gerçek dosya yokken boş klasör ve mimari tiyatro oluşturulmaz.

## 5. Modül sorumlulukları

### Katalog

Onaylı ürün içeriği ve keşif niteliklerinin sahibidir. Yayındaki ürünleri listeleme, locale'e göre ürün getirme ve yapılandırılmış niteliklerle filtreleme sunar. Prototipte doğrulanan fixture repository kullanır; UI JSON'u doğrudan import etmez.

### Danışman

Yönlendirmeli soruları, serbest metni, eşleştirme orkestrasyonunu ve gerekçe sözleşmesini yönetir. Prototipte mümkün olduğunca deterministiktir. Gerçek model eklendiğinde sadece adaptör değişir; sunucu uygun adayları verir, dönen şemayı ve ürün ID'lerini doğrular.

### Demo sepet

Yerel ekleme, silme ve adet davranışını yönetir. Sipariş, stok rezervasyonu, kimlik veya checkout oluşturmaz.

### Gelecekteki ticaret

Checkout, sipariş, ödeme, stok, müşteri kimliği, promosyon ve fulfillment ayrı yeteneklerdir. Onaylı gereksinim olmadan klasör ağacına eklenmez.

## 6. Temel domain sözleşmeleri

```text
Product
  id: stabil ve anlamsız/opaque kimlik
  slug: locale bazlı veya stabil rota kimliği (karar gerekli)
  status: draft | published | archived
  translations: onaylı TR/EN/FR içerik
  media: onaylı görsel ve locale alt metni
  variants: gösterilebilir/satılabilir varyantlar
  scentProfile: aileler, notalar, yoğunluk, mevsim, ortam, hediye etiketleri

ProductVariant
  id
  productId
  type
  volumeMl
  displayPrice: prototip örneği veya üretimde yetkili Money

Money
  amountMinor: tamsayı
  currency: ISO 4217

AdviserRequest
  locale
  freeText? veya guidedAnswers?

AdviserRecommendation
  productId
  confidenceBand: strong | possible
  matchedAttributes[]
  localizedReason
```

Para için kayan nokta kullanılmaz. Danışman yalnızca katalog tarafından verilen uygun ID'lere referans verebilir; bilinmeyen ID ve bozuk response UI'a ulaşmadan reddedilir.

## 7. Veri akışları

### Katalog

```text
Locale route -> locale validation -> katalog use-case'i
-> fixture repository -> katalog şema validation
-> yerelleştirilmiş view model -> server render
```

### Prototip danışman

```text
Kullanıcı girdisi -> client uzunluk/biçim kontrolü
-> server endpoint/action -> runtime validation ve abuse sınırı
-> katalog + deterministik uygunluk filtresi
-> prototip adviser adaptörü
-> response şeması ve product ID doğrulama
-> yerelleştirilmiş öneri kartları
```

### Gelecekte üretim checkout

```text
Browser checkout intent -> sunucu kimlik/yetki/validation
-> yetkili fiyatı yeniden hesapla -> yetkili stok kontrolü
-> idempotency key ile pending order
-> hosted/tokenized ödeme
-> ham body ile imzalı webhook + replay kontrolü
-> transaction ile ödeme/sipariş/stok güncelle
-> receipt ve fulfillment için outbox olayı
```

Browser ve AI; fiyat, indirim, ödeme, rol, sipariş veya stok için yetkili kaynak değildir.

## 8. Yerelleştirme

- Desteklenen locale kapalı union'dır: `tr | en | fr`.
- Storefront route'ları locale segmenti altındadır.
- Varsayılan dil ayrı ürün kararıdır.
- Dil sözlükleri aynı doğrulanan key yapısını paylaşır.
- UI metni sözlükte, ürün metni katalogda tutulur.
- Eksik key build/geliştirme sırasında hata verir.
- Locale; dil, sayı/tarih/para formatı, metadata, canonical ve `hreflang` yönetir.

## 9. State yönetimi

Başlangıçta global state kütüphanesi eklenmez:

- Katalog: server data/render
- Locale, filtre ve sıralama: URL state
- Galeri ve açılır alanlar: local component state
- Danışman ve demo sepet: gerekirse feature context/reducer
- Kalıcı demo sepet: ancak gerekirse sürümlü ve runtime-validated browser storage

## 10. AI sınırı

Prototip AI anahtarı olmadan çalışır. Gerçek AI adaptörü seçilirse sunucudan çağrılır, yapılandırılmış şemalı çıktı verir, minimum katalog bağlamı alır, ID'leri tekrar doğrulanır ve timeout/rate/cost/fallback kuralları uygulanır. Ödeme, stok mutasyonu, DB veya yönetim aracı verilmez.

## 11. Test stratejisi

| Seviye | Kapsam |
| --- | --- |
| Unit | Koku filtre/sıralama, i18n yardımcıları, şemalar, para kuralları, reducer |
| Component | Ürün kartı, dil seçici, danışman durumları, demo sepet, klavye/odak |
| Integration | Katalog repository sözleşmesi, adviser orkestrasyonu, route validation, hata eşleme |
| E2E | Dil değiştir, ürün gez, danışmana sor, geçerli ürün al, demo sepete ekle |
| Görsel | Ana mobil/masaüstü ekranlar ve reduced-motion |
| Güvenlik | Kötü girdi, aşırı boyut, bozuk AI cevabı, bilinmeyen ID, secret/client sınırı |

## 12. Performans ve erişilebilirlik

- Temel içerik mümkün olduğunca client JavaScript olmadan kullanılabilir.
- İlk yüklemede onaysız autoplay video veya tam boy kampanya görseli yoktur.
- Görseller responsive optimize edilir, boyut/aspect ratio ile layout shift önlenir.
- Danışman kodu ana sayfanın kritik yolunda değil, ihtiyaç anında yüklenir.
- Klavye, odak, semantik, alt metin, kontrast ve reduced-motion release kriteridir.
- Görsel efektler gerçek preview ve temsilî mobil cihazda ölçülür.

## 13. Ortamlar ve büyüme yolu

```text
Yerel geliştirme -> branch/PR preview -> korumalı production
```

Preview mock veri kullanır ve production entegrasyonuna erişmez. Ortam değişkenleri başlangıçta doğrulanır ve ortama özeldir.

1. Prototip: fixture katalog, simüle danışman, yerel demo sepet.
2. Onaylı katalog: katalog/CMS adaptörü.
3. AI: provider adaptörü, eval, limit, izleme ve gizlilik.
4. Ticaret: transaction ve idempotency destekli order/ödeme/stok adaptörleri.
5. Ölçülen büyüme: sadece kanıtlanan darboğazda cache, queue veya servis ayrıştırma.

## 14. Reddedilen alternatifler

- **Baştan mikroservis:** Operasyon ve veri tutarlılığı maliyeti mevcut ihtiyaca göre orantısız.
- **Sadece browser SPA:** SEO, ilk render, locale metadata ve güvenli sunucu sınırları için uygun değil.
- **Prototipte tam DB:** Yetkili katalog/stok kaynağı belli değil; fixture inceleme hedefini karşılıyor.
- **AI'ın ticareti kontrol etmesi:** Model çıktısı yetkili değil ve prompt injection/bozuk output riski taşıyor.

## 15. Scaffold öncesi onay gerekenler

1. Next.js modüler monolit.
2. Üç dil için locale önekli URL.
3. İlk prototipte deterministik danışman.
4. Prototipte DB/auth/ödeme/stok olmaması.
5. Vercel preview.
6. Generic tema kullanmadan, küçük görsel kanıttan sonra stil yaklaşımı.

