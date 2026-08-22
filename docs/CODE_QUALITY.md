# Kod Kalitesi Standardı

Bu belge, Flawless Paris kaynak kodunun inceleme standardıdır. Framework'e özel ayrıntılar mevcut uygulama ve resmî dokümantasyonla doğrulanır.

## 1. Temel ilkeler

- **Okunabilirlik:** Zekice fakat kapalı kod yerine ilk okumada anlaşılan kod.
- **KISS:** Gereksinimi karşılayan en basit doğru çözüm.
- **YAGNI:** Onaylanmamış gelecek ihtiyacı için altyapı kurmama.
- **DRY:** Aynı iş kuralını kopyalamama; ancak erken ve yapay soyutlama da yapmama.
- **Tek sorumluluk:** Bir modülün tek, açık değişme nedeni olması.
- **Yüksek cohesion, düşük coupling:** Birlikte değişen davranışları birlikte, bağımsız davranışları ayrı tutma.
- **Minimum diff:** İstenen sonucu tam sağlayan en dar değişiklik.

## 2. Adlandırma

- Değişken isimleri tuttuğu değeri; fonksiyon isimleri yaptığı eylemi anlatsın.
- Boolean isimleri `is`, `has`, `can`, `should` gibi okunabilir önekler kullansın.
- Fonksiyonlarda fiil + nesne kullan: `getPublishedProducts`, `calculateScentMatch`, `isSupportedLocale`.
- Domain dilini koru: `product`, `variant`, `scentProfile`, `recommendation`; birbirinin yerine genel `item` veya `data` kullanma.
- Kısaltma ancak ekip ve domain için tartışmasızsa kullanılsın.
- Dosya ve klasör adlandırması proje genelinde tek biçimde olsun.

## 3. TypeScript

- `strict` ayarlar açık olmalıdır.
- `any` yerine `unknown` al ve sınırda doğrula.
- Domain durumları için gevşek string yerine kapalı union/enum benzeri tip kullan.
- Dış veriyi tip assertion ile güvenilir ilan etme; şemayla parse et.
- `!` non-null assertion ve `as` kullanımı istisna olmalı; gerekçesiz kullanma.
- Public fonksiyonların parametre ve dönüş tipleri açık olmalıdır.
- Tipleri sadece derleyiciyi susturmak için genişletme.
- Domain tipi ile UI view modelini, gerekçeli olduğunda ayır.

## 4. Fonksiyon ve kontrol akışı

- Fonksiyon tek bir işi yapsın ve ismiyle uyumlu sonuç üretsin.
- Guard clause/erken dönüş ile derin iç içeliği azalt.
- Dört-beş seviyeli `if`, callback veya ternary yapısı oluşturma.
- Boolean parametrelerle birbirinden farklı davranışları tek fonksiyona sıkıştırma.
- Bir fonksiyon büyüdüğü için değil, içinde ayrı anlamlı sorumluluk oluştuğunda böl.
- Saf domain fonksiyonlarını IO ve framework kodundan ayır.
- Girdi nesnelerini ve ortak state'i gerekçesiz mutate etme.

## 5. Modül ve soyutlama

- Yeni interface, service, factory veya adapter gerçek bir değişim sınırını temsil etmelidir.
- Tek kullanımlık küçük davranışı sırf katmanlı görünsün diye soyutlama.
- Aynı iş kuralı iki yerde ortaya çıktığında ortak anlamı incele; sadece satırlar benziyor diye birleştirme.
- `shared`, `common` ve `utils` klasörleri domain davranışını saklayan çöplük olmamalıdır.
- Circular dependency oluşturma; feature'ların public sınırını kullan.

## 6. React ve Next.js

- Server Component varsayılan; `use client` bilinçli ve dar sınırda.
- Props açık tipli ve bileşen API'si küçük olsun.
- Büyük sayfayı rastgele küçük bileşenlere değil, anlamlı görsel/etkileşim sorumluluklarına böl.
- State'i en yakın ortak sahibinde tut; URL'de olması gereken filtreyi global state'e koyma.
- Türetilebilen değeri state'te tekrar tutma.
- Effect yalnızca React dışı bir sistemle senkronizasyon içindir.
- Liste anahtarı için stabil domain ID kullan; sıra değişebiliyorsa index kullanma.
- Loading, empty, error, unavailable ve success durumlarını bilinçli tasarla.
- Hydration farkı oluşturabilecek tarih, rastgele değer ve browser API kullanımını sınırla.
- Hareket, erişilebilirlik ve performansı bozmayacak biçimde olmalıdır.

## 7. API, validation ve hata yönetimi

- Request handler ince; domain/use-case mantığı uygulama katmanında olmalıdır.
- Request gövdesi, query, parametre, header, cookie, ortam değişkeni, fixture ve haricî response şemayla doğrulanır.
- Validation hatası, bulunamadı, yetkisiz, rate limit, haricî servis ve iç hata birbirinden ayrılır.
- Exception sessizce yutulmaz; uygun katmanda anlamlı hata tipine dönüştürülür.
- Orijinal hata destekleniyorsa `cause` ile korunur.
- Son kullanıcıya secret, stack trace, sorgu veya iç sistem ayrıntısı gösterilmez.
- Retry yalnızca geçici ve idempotent işlemlerde, sınırlı ve backoff'lu uygulanır.

## 8. Asenkron işlemler ve eşzamanlılık

- Birbirinden bağımsız IO işlemleri gerektiğinde paralel yürütülür.
- Bir işlemin sonucu diğerine gerekiyorsa sırayı koru.
- Promise'leri kaybetme; arka plan işini açık bir queue/runner olmadan fire-and-forget başlatma.
- Race condition, duplicate event ve tekrar denenen request'leri kritik veri değişikliğinde hesaba kat.
- Timeout ve iptal davranışını haricî servislerde tanımla.

## 9. Veritabanı ve veri bütünlüğü

- Veritabanı eklendiğinde repository sınırını koru; UI veya route'tan dağınık sorgu yapma.
- Sadece gereken alanları getir; sınırsız liste ve N+1 sorgudan kaçın.
- Unique, foreign key ve gerekli iş kurallarını sadece UI validation'a bırakma.
- Kritik çoklu değişiklikleri transaction içinde yap.
- Şema değişikliğinde mevcut veri, migration süresi, kilit, rollback, backup ve geriye uyumluluğu belgele.
- Silme işlemlerinde soft/hard delete, ilişkiler, yasal saklama ve geri kazanma etkisini değerlendir.

## 10. Performans

- Önce ölç, sonra optimize et; bariz kötü deseni yine de sisteme sokma.
- Gereksiz client JavaScript, büyük görsel, tekrar render, ağ çağrısı ve seri waterfall oluşturma.
- Memoization ve cache'in invalidation maliyetini dikkate al.
- Cache doğruluk kaynağı değildir; kullanılırsa sahiplik, anahtar, TTL ve invalidation tanımlanır.
- Büyük liste için sayfalama/sınır; büyük medya için responsive boyut ve lazy loading kullan.

## 11. Güvenlik ve gizlilik

- En az yetki, reddet-varsayılan ve katmanlı savunma uygula.
- Girdi doğrulama yetkilendirme yerine geçmez; ikisi de gerekir.
- Kullanıcıya ait kaynağı sadece ID ile bulup döndürme; erişim kapsamını sunucuda doğrula.
- Secret ve kişisel veriyi loglama, hata mesajı, URL veya browser bundle içine koyma.
- HTML, URL yönlendirme, dosya yükleme, webhook ve AI girdilerini ayrı tehdit sınırları olarak ele al.
- Güvenlik kontrolünü test etmek için bypass veya gizli backdoor ekleme.

## 12. Yerelleştirme ve zaman

- UI metnini, tarih/saat, sayı, para birimi ve locale'i hardcode etme.
- Tarihleri sistem içinde uygun standart/UTC ile taşı, kullanıcı locale/timezone'unda göster.
- Naive datetime ve string birleştirerek para/tarih formatlama kullanma.
- Çeviri anahtarları anlamlı ve kararlı olsun; cümleleri parçalayarak dilbilgisini bozma.

## 13. Yorum, dokümantasyon ve log

- Public veya yan etkili API'ların davranışı, hata ve sınırları belgelensin.
- Kodla aynı şeyi söyleyen yorum yazma.
- Workaround, güvenlik kararı ve beklenmedik trade-off için “neden” yorumunu kullan.
- Production'da `console.log` ile gelişigüzel loglama yapma; yapılandırılmış, seviyeli ve redakte edilmiş olaylar kullan.
- Log spam oluşturma; log bir operasyon sorusunu yanıtlamalıdır.

## 14. Test standardı

- Test adı davranışı ve koşulu açıklasın; `works` gibi isim kullanma.
- Arrange–Act–Assert ayrımı okunabilir olsun.
- Implementasyon ayrıntısı yerine gözlenebilir davranışı test et.
- Mock sadece gerçek sınırda kullanılsın; her fonksiyonu mock'layıp anlamsız test yazma.
- Beklenen akış, geçersiz girdi, yetki, önemli edge case, bağımlılık hatası ve regresyon riski kapsansın.
- Flaky testi tekrar çalıştırarak gizleme; deterministik kök nedeni bul.
- Sadece coverage yüzdesi için değersiz assertion yazma.

## 15. Kod inceleme kontrol listesi

- [ ] Gereksinim ve kabul kriterleri tam karşılanıyor mu?
- [ ] Daha küçük ve basit doğru çözüm var mı?
- [ ] Mevcut pattern yeniden kullanıldı mı?
- [ ] Tip, validation ve hata yolları güvenli mi?
- [ ] Yetkilendirme ve veri sahipliği sunucuda mı?
- [ ] Gizli/kişisel veri sızıyor mu?
- [ ] Eşzamanlılık, idempotency veya transaction riski var mı?
- [ ] N+1, waterfall, sınırsız işlem veya gereksiz client kodu var mı?
- [ ] Erişilebilirlik ve üç dil korunuyor mu?
- [ ] Testler davranışı ve regresyonu kanıtlıyor mu?
- [ ] Diff odaklı mı; ölü kod veya ilgisiz değişiklik var mı?

