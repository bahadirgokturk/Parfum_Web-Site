# Görev — Marka Sitesi Prototipi

## Amaç

Flawless Paris için marka sahibine sunulabilecek, mevcut ürün görsellerini kullanan,
Türkçe/İngilizce/Fransızca çalışan ve demo koku danışmanı içeren yüksek kaliteli bir
ana sayfa prototipi hazırlamak.

## Kapsam

- Sinematik ve animasyonlu açılış sahnesi
- Ürün görsellerinden oluşan kampanya filmi bölümü
- Doğrulanmış görsel bilgileriyle sınırlı ürün vitrini
- Kurallı ve güvenli çalışan demo koku danışmanı
- İşlevsel demo sepeti
- Normal mağaza düzeninde koleksiyon ve filtre prototipi
- Her ürün için galeri, bilgi alanları ve mobil sabit satın alma çubuğu olan detay sayfası
- `/tr`, `/en`, `/fr` dil rotaları
- Mobil ve masaüstü uyumluluğu
- Hareket azaltma tercihine uyum

## Kapsam Dışı

- Gerçek ödeme, stok, sipariş ve üyelik işlemleri
- Gerçek fiyatlar ve doğrulanmamış koku notaları
- Canlı yapay zekâ modeli ve müşteri verisi saklama
- Yönetim paneli

## Kabul Kriterleri

- Üç dil rotası doğrudan açılabilmeli ve dil değiştirici çalışmalı.
- Danışman yalnızca prototip kataloğundaki ürünleri önermeli.
- Ürün kartları doğru detay rotasına gitmeli; doğrulanmamış fiyat ve içerik uydurulmamalı.
- Sepete ekleme, adet değiştirme ve ürün çıkarma çalışmalı.
- 375 px ve 1440 px genişliklerde içerik taşmamalı.
- `lint`, `typecheck`, birim testleri ve production build başarılı olmalı.
- Kullanıcı hareket azaltmayı seçtiğinde temel olmayan hareketler kapanmalı.

## Riskler

- Koku notaları, fiyatlar ve kesin ürün adları marka tarafından henüz verilmedi.
- Logo yalnızca raster referans olarak mevcut; üretim için SVG/vektör dosya istenmeli.
- Demo danışman satışa açılmadan önce doğrulanmış ürün verisine bağlanmalı.
