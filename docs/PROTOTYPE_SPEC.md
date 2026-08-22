# Etkileşimli Prototip Şartnamesi

## Amaç

Marka sahibinin üretim e-ticareti kapsamlandırılmadan önce görsel yönü, bilgi hiyerarşisini, üç dilli davranışı ve parfüm danışmanını gerçekçi biçimde deneyimlemesini sağlamak.

## Hedef kullanıcılar

- Kendisi için parfüm arayanlar
- Koku terminolojisini bilmeyen hediye alıcıları
- Markayı sosyal medyadan keşfeden mobil öncelikli ziyaretçiler
- Türkçe, İngilizce ve Fransızca konuşan ziyaretçiler

## Zorunlu ekran ve durumlar

### Ana sayfa

- Tek ve açık ana aksiyonu olan marka odaklı hero alanı
- Öne çıkan koleksiyon veya ürün hikâyesi
- Dijital parfüm danışmanını anlatan kısa bölüm
- Kontrollü hareket kullanan editoryal görseller
- Prototip içerik olarak işaretlenmiş güven ve hizmet özeti
- Dil seçici ve taslak yasal bağlantılar içeren footer

### Koleksiyon

- Onaylı ad, görsel, tür, hacim ve prototip durumu içeren ürün kartları
- Yalnızca yapılandırılmış katalog alanlarıyla desteklenen filtreler
- Anlamlı yükleniyor, boş ve hata durumları

### Ürün detayı

- Galeri, kısa hikâye, hacim/tür, koku profili, kullanım bağlamı ve danışman bağlantısı
- Demo olduğu açıkça belirtilen sepete ekleme davranışı
- Uydurulmuş yorum, puan, kıtlık, indirim, etki veya teslimat vaadi yok

### Dijital parfüm danışmanı

İki eşdeğer giriş yöntemi:

1. Yönlendirmeli seçimler: alıcı, ruh hâli, yoğunluk, koku ailesi, mevsim ve ortam.
2. Serbest metin: örneğin hafif vanilyalı hediye veya kış akşamı kokusu.

Çıktı:

- En fazla üç katalog ürünü
- Her eşleşme için kısa gerekçe
- Eşleşmede kullanılan katalog nitelikleri
- Ürünü gör ve isteğe bağlı demo sepete ekle aksiyonu
- Ürün uydurmayan güvenli eşleşme bulunamadı durumu

### Demo sepet

- Yerel olarak ekleme, silme ve adet değiştirme
- Checkout'un aktif olmadığını belirten açık uyarı
- Kişisel veya ödeme bilgisi toplama yok

## Yerelleştirme kabul kriterleri

- Tek locale; navigasyon, kontroller, mesajlar, danışman, metadata ve formatlamayı yönetir.
- Normal kullanımda karışık dilli ekran oluşmaz.
- Eksik çeviri geliştirme/build sırasında görünür hata verir.
- URL'ler locale bilgisini taşır.
- Fransızca metinler yayından önce yetkin bir insan tarafından incelenir.

## Deneyim ilkeleri

- Premium görünüm yavaşlık anlamına gelmez; hareket hiyerarşiyi destekler ve reduced-motion ayarına uyar.
- Danışman keşfedilebilir olur ama normal gezinmeyi engellemez.
- Mobil tasarım sıkıştırılmış masaüstü değil, birinci sınıf deneyimdir.
- Görsel sistem keyfî değerler yerine belgelenmiş tasarım token'ları kullanır.
- Atmosferik görseller üzerinde ürün bilgisi okunabilir kalır.

## Kapsam dışı

- Gerçek kimlik doğrulama, checkout, ödeme, sipariş, stok, kargo, fatura, iade, yorum, kupon ve pazarlama onayı
- Ayrıca onaylanmadan gerçek AI çağrısı veya sohbet geçmişi saklama
- Prototipin kamuya açık satışa hazır olduğu iddiası

## Marka sahibi inceleme akışı

1. Ana sayfayı telefon ve masaüstünde aç.
2. TR, EN ve FR arasında geçiş yap.
3. Koleksiyona ve bir ürüne gir.
4. Danışmana hediye sorusu sor, sonra yönlendirmeli akışı dene.
5. Önerilen ürünü demo sepete ekle.
6. Marka yönü, içerik doğruluğu ve ticaret isteklerini ayrı ayrı kaydet.

