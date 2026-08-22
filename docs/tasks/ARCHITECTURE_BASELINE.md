# GÖREV

## Hedef

Flawless Paris prototipi için gereksiz üretim altyapısı kurmadan güvenli e-ticarete gelişebilecek sürdürülebilir mimari tanımlamak.

## Teslim aşaması

Etkileşimli prototip planlaması.

## İncelenen bağlam

- `README.md`, `AGENTS.md`
- `docs/PROTOTYPE_SPEC.md`, `docs/SECURITY.md`, `docs/DECISIONS.md`
- Önceki mimari yönü
- Güncel resmî Next.js yerelleştirme rehberi
- Güncel resmî OpenAI Node structured-output rehberi

Depoda henüz uygulama kodu, test veya bağımlılık yoktur.

## Gereksinimler

- Premium responsive storefront, TR/EN/FR ve katalog temelli güvenli danışman
- Değiştirilebilir prototip veri/entegrasyonları
- Onay sonrası ödeme, sipariş ve stoğa güvenli gelişim yolu
- Erken altyapı ve operasyon karmaşasından kaçınma

## Kabul kriterleri

- Sistem şekli, reddedilen alternatifler, modül sorumlulukları ve bağımlılık yönleri belgeli.
- Prototip ile gelecekteki üretim akışları ayrı.
- Yerelleştirme, AI, validation, güvenlik, test, deployment ve büyüme stratejileri tanımlı.
- Teknoloji kararları proje sahibi onayına kadar öneri durumunda.

## Kapsam dışı

Uygulama scaffold/kodu, hesap veya provider oluşturma, DB şeması ve gerçek ödeme/stok/AI/auth/CMS/analitik/e-posta seçimi.

## Riskler

- Modüler monolit erken karmaşıklığı azaltır.
- Repository/adaptör sınırı fixture'ın üretime sızmasını önler.
- Katalog allowlist'i ve şema doğrulama AI halüsinasyonu/prompt injection etkisini sınırlar.
- Locale route ve eş şekilli sözlükler dil kaymasını azaltır.

## Doğrulama

Belge bağlantıları ve terimler tutarlı olmalı; öneriler onaylanmış gösterilmemelidir. Bu görev yalnızca dokümantasyon değiştirdiği için kod/build testi uygulanmaz.

