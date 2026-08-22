# Kararlar ve Açık Sorular

Bu belge önemli proje kararlarının doğruluk kaynağıdır. Açık soru, cevap uydurma yetkisi vermez.

## Onaylanan kararlar

| ID | Karar | Durum |
| --- | --- | --- |
| D-001 | İlk teslim, marka sahibinin inceleyeceği etkileşimli prototiptir. | Onaylandı |
| D-002 | Deneyim Türkçe, İngilizce ve Fransızca destekler. | Onaylandı |
| D-003 | Katalog temelli dijital parfüm danışmanı ana deneyimdir. | Onaylandı |
| D-004 | Gereksinimleri onaylanana kadar gerçek ticaret özellikleri kapsam dışıdır. | Onaylandı |
| D-005 | Kalıcı ajan kuralları `AGENTS.md`, odaklı şartnameler `docs/` altındadır. | Onaylandı |

## Önerilen mimari kararlar

Aşağıdaki kararlar proje sahibi onaylayana kadar kesinleşmiş sayılmaz.

| ID | Öneri | Durum |
| --- | --- | --- |
| D-006 | Strict TypeScript ve dikey feature modülleriyle tek Next.js App Router modüler monolit kullan. | Önerildi |
| D-007 | TR/EN/FR için locale önekli storefront URL'leri kullan. | Önerildi |
| D-008 | Prototipte repository arkasında doğrulanan yerel katalog fixture'ları kullan. | Önerildi |
| D-009 | Prototipte adaptör arkasında deterministik danışman simülasyonu kullan; ücretli AI zorunlu olmasın. | Önerildi |
| D-010 | Server/static render varsayılan, Client Component yalnızca etkileşim sınırında olsun. | Önerildi |
| D-011 | Yeni onaylı gereksinim olmadan prototipe DB, auth, ödeme, stok, queue, cache veya CMS ekleme. | Önerildi |
| D-012 | Paydaş incelemesi için Vercel branch/preview deployment kullan. | Önerildi |

## Açık iş ve ürün soruları

| ID | Soru | Etkisi |
| --- | --- | --- |
| Q-001 | İlk onaylı kapsam katalog, tam e-ticaret veya aşamalı mı? | Sözleşme, süre, mimari, fiyat |
| Q-002 | Hangi ülkeler, para birimleri, tüzel kişi ve satış kanalları? | Vergi, ödeme, kargo, hukuk |
| Q-003 | Katalog, fiyat ve stok için yetkili sistem hangisi? | Veri modeli ve entegrasyon |
| Q-004 | Hangi ödeme, kargo, fatura, iade ve bildirim sağlayıcıları? | Entegrasyon ve güvenlik |
| Q-005 | Misafir checkout, hesap, favori, kupon ve yorum gerekli mi? | Kimlik ve özellik kapsamı |
| Q-006 | TR/EN/FR ürün ve yasal metinleri kim sağlayıp onaylayacak? | İçerik doğruluğu |
| Q-007 | Onaylı ürün adı, varyant, nota, fiyat, medya ve iddialar neler? | Katalog ve danışman |
| Q-008 | Sohbet kaydı tutulabilir/analiz edilebilir mi; süre ve onay nedir? | Gizlilik, maliyet, veri mimarisi |
| Q-009 | Trafik, uptime, analitik, SEO ve performans hedefleri nedir? | Hosting ve operasyon |
| Q-010 | Ürün/sipariş yönetimini kim yapacak; roller ve onaylar neler? | Back-office yetkisi ve audit |

## Karar kaydı şablonu

```markdown
### D-XXX — Kısa başlık

- Tarih:
- Durum: Önerildi | Onaylandı | Yerine başkası geçti
- Bağlam:
- Karar:
- Değerlendirilen alternatifler:
- Sonuçlar ve riskler:
- Sahip/onaylayan:
```

