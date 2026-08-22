# Güvenlik ve Gizlilik Taban Çizgisi

## Tehdit modeli özeti

Korunacak başlıca varlıklar: yönetici erişimi, müşteri kimlik/iletişim verisi, sipariş ve stok bütünlüğü, fiyat kuralları, ödeme durumu, API anahtarları, katalog bütünlüğü ve özel danışman konuşmaları.

Başlıca riskler: hesap ele geçirme, yetki kontrolü hatası, sahte ödeme/webhook, fiyat veya adet manipülasyonu, stok yarış durumu, injection, XSS, bağımlılık saldırısı, secret sızıntısı, otomatik kötüye kullanım, prompt injection, gereksiz kişisel veri toplama ve güvensiz loglama.

İnternet, tarayıcı state'i, URL parametreleri, cookie'ler, dosyalar, AI mesajları/çıktıları, webhook'lar ve üçüncü taraf cevapları güvenilmezdir.

## Prototip gereksinimleri

- Kart, parola, adres veya gereksiz kişisel veri toplama.
- Üretim credential'ı, müşteri verisi veya üretim export'u kullanma.
- Simüle checkout, fiyat, stok ve danışman davranışını açıkça belirt.
- Yalnızca onaylı varlıklar kullan; gerektiğinde görsel metadata'sını temizle.
- Source map, debug endpoint, ortam dosyası veya iç prompt'u istemeden yayınlama.
- Public preview'da da güvenli header ve bağımlılık hijyeni uygula.
- Kamuya açık olmayan preview'u platform erişim kontrolüyle koru.

## Üretime geçiş kapıları

- Sunucu tarafı kimlik doğrulama ve reddet-varsayılan yetkilendirme
- Güvenli session cookie, uygun CSRF koruması, login rate limit ve hesap kurtarma
- Her sınırda runtime validation ve output encoding
- Content Security Policy ve uygun güvenlik header'ları
- Yönetilen secret saklama, rotasyon, en az yetki ve ortam ayrımı
- Raw kart verisi almayan hosted/tokenized ödeme
- Webhook imza ve replay kontrolü
- İdempotent checkout/webhook ve transaction güvenli sipariş/stok güncellemesi
- Rate limit, bot kontrolü, payload sınırı ve timeout
- Yedek, geri yükleme testi, saklama ve silme politikası
- Yönetim, katalog, stok, iade ve sipariş değişiklikleri için audit olayları
- Dependency taraması, patch süreci, kod inceleme, test ve rollback planı
- Yetkin hukukçu tarafından incelenmiş gizlilik, çerez, satış/iade ve veri sahibi başvuru süreçleri

## AI kontrolleri

- Geçerli ürün ID allowlist'i ile katalog temelli öneri
- Şema doğrulamalı yapılandırılmış çıktı
- Prompt injection testleri ve dar araç izin listesi
- Sunucu tarafı model anahtarı, IP/kullanıcı limiti, prompt/cevap boyutu ve maliyet bütçesi
- Model prompt'una secret veya ayrıcalı iç bağlam koymama
- Sağlık/alerji soruları için insan tarafından yazılmış güvenli yönlendirme
- Sohbet saklama, onay, erişim, retention, silme ve analitik için açık politika

## Olay hazırlığı

Yayından önce credential iptali, checkout/danışman kapatma, fulfillment durdurma, veri geri yükleme, tedarikçi iletişimi ve olay kaydı sorumluları belirlenir. Rollback/kill switch yalnızca belgelenmez, test edilir.

## Yeniden güvenlik incelemesi gerektiren değişiklikler

Kimlik, yetki, veritabanı şeması, ödeme, stok, dosya yükleme, HTML render, cookie, kişisel veri, webhook, AI prompt/araç, bağımlılık, altyapı veya yönetim özelliğine dokunan her değişiklik.

