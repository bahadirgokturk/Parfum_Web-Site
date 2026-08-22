# Tasarım Sistemi

## Tasarım okuması

Tasarıma duyarlı parfüm alıcıları için, sinematik ve duyusal dille anlatılan premium tüketici marka sitesi. Hazır e-ticaret teması yerine asimetrik kompozisyon, gerçek kampanya görselleri ve kontrollü hareket kullanır.

- `DESIGN_VARIANCE`: 8/10
- `MOTION_INTENSITY`: 6/10
- `VISUAL_DENSITY`: 3/10

## Fiziksel sahne

Ziyaretçi akşam telefonunda koyu bordo kadife ve mum ışığı içinde markayı keşfeder; sayfada ilerledikçe sahne pudra pembe sabah ışığına ve şampanya parlaklığına açılır.

## Renk stratejisi

Committed: koyu bordo ana yüzeyin yaklaşık yarısını taşır; pudra pembe ve şampanya anlatısal geçişlerdir; metalik altın yalnızca marka izi ve ana aksiyonda kullanılır.

```text
Oxblood              #6B0D1A
Blackened burgundy   #2A070D
Dusty blush          #EBC6C6
Luminous champagne   #F7E6D9
Metallic gold        #D4AF37
Pure white           #FFFFFF
```

Siyah-altın jenerik parfüm kalıbına düşmemek için siyah ana yüzey yapılmaz; bordo kimliğin gerçek rengidir. Şampanya bölümü sıcak kâğıt/bej arka plan gibi kullanılmaz.

## Tipografi

- Display: yüksek kontrastlı, Fransız moda evi hissi veren serif; `next/font` ile kullanılabilen ve `Fraunces`/`Instrument Serif` olmayan aile.
- Body/navigation: nötr Inter varsayımı yerine modern humanist/geometrik sans.
- Hero başlığı en fazla iki satır, 96 px tavan ve `-0.04em`'den sıkı olmayan harf aralığı.
- Gövde metni en az 16 px, 1.5–1.75 satır yüksekliği ve 65–75 karakter satır uzunluğu.

## Kompozisyon

- Hero ortalanmış standart blok değil; yazı ve ürün görseli arasında asimetrik gerilim kurar.
- Bir ekran bir ana fikir taşır; aynı kart grid'i veya image-text zigzag tekrarı yapılmaz.
- Ürünler kartlara hapsedilmek yerine gerektiğinde sahnenin parçası olur.
- Köşe sistemi keskin editoryal yüzeyler + yalnızca aksiyonlarda kontrollü oval kullanım olarak tutarlıdır.

## İmza motifi

İnce, asimetrik altın koku izi; sonunda dört köşeli yıldız. Logo yerine geçmez, kompozisyon ve hareket boyunca bakışı yönlendirir.

## Hareket

- Sayfa açılışı tek orkestrasyon olarak çalışır; her bölüme aynı fade uygulanmaz.
- Scroll/pointer değerleri React state'te tutulmaz; `motion/react` motion value'ları kullanılır.
- Yalnızca transform, opacity ve performansı doğrulanmış atmosferik blur/mask kullanılır.
- Tüm süre/easing değerleri ortak motion token'larından gelir.
- Reduced-motion transformları kapatır; en fazla 0.2 saniyelik opacity geçişi kalır.
- Düşük donanımda dekoratif hareket kapanır.

## Görsel rolleri

- Beyaz fondaki tek ürün: ürün detayı ve aydınlık geçiş.
- Bordo hediye kutusu: ana hero veya dramatik koleksiyon sahnesi.
- Pembe hediye kutusu: pudra bölümü ve feminen koleksiyon.
- Bordo/şampanya çift görsel: koleksiyon karşılaştırması.
- 3xN kampanya kolajı: maskeli scroll geçişi; küçük kart grid'i değil.
- Elde tutulan body/hair mist: gerçek kullanım ve ölçek kanıtı.
- Logo görseli: final marka kapanışı; vektör logo gelene kadar referans.

## Erişilebilirlik ve performans

- Normal metinde 4.5:1, büyük metinde 3:1 minimum kontrast.
- Dokunma hedefi en az 44x44 px; hover olmayan eşdeğer tap/focus durumu.
- Görsel alan oranları baştan ayrılır; layout shift oluşmaz.
- Hero görseli öncelikli, fold altı görseller lazy ve responsive yüklenir.
- 375, 768, 1024 ve 1440 px genişliklerde yatay taşma olmadan test edilir.

