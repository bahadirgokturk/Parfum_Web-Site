# AI Geliştirme Görevi Şablonu

Her ciddi implementasyonda kullan. Bilinmeyen alanı `BELİRLENECEK` yaz; cevap uydurma. Bu belge `AGENTS.md` ve ilgili şartnameyi tamamlar, geçersiz kılmaz.

```markdown
# GÖREV

## Kullanıcıya görünen hedef
[Sonucu bir veya iki cümlede anlat.]

## Teslim aşaması
[Etkileşimli prototip | Üretim ticareti | İç araç]

# MEVCUT DURUM VE BAĞLAM

- Mevcut davranış:
- İlgili mimari ve veri akışı:
- Benzer mevcut uygulama:
- İlgili bağımlılıklar:
- İlgili testler ve edge case'ler:
- Okunan ürün/mimari/güvenlik/karar belgeleri:

# GEREKSİNİMLER
- [Gereksinim 1]
- [Gereksinim 2]

# FONKSİYONEL OLMAYAN GEREKSİNİMLER
- Erişilebilirlik:
- Yerelleştirme:
- Performans:
- Güvenlik/gizlilik:
- Güvenilirlik/gözlemlenebilirlik:

# KABUL KRİTERLERİ
- Verilen [başlangıç], [eylem] yapıldığında [gözlenebilir sonuç].
- Verilen [geçersiz/uç durum], [eylem] yapıldığında [güvenli sonuç].
- Verilen [bağımlılık hatası], [eylem] yapıldığında [kontrollü sonuç].

# KAPSAM DIŞI
- [Bilerek yapılmayacak iş]

# KISITLAMALAR
- `AGENTS.md` ve ilgili `docs/` belgelerine uy.
- İlgisiz dosya/refactor yapma; public API, DB şeması veya mimariyi onaysız değiştirme.
- Gerekçesiz bağımlılık, duplicate işlev veya katman atlama yapma.
- Secret, ayar, ürün gerçeği, çeviri, fiyat veya stok hardcode etme.
- Minimum diff ve en basit sürdürülebilir çözümü kullan.

# DOSYALAR
Oluşturulacak:
- [yol — amaç]

Değiştirilecek:
- [yol — amaç]

Değişmemesi gereken:
- [yol/sistem — neden]

# RİSK VE REGRESYONLAR
- [Risk — etkilenen davranış — azaltma/test]

# PLAN
1. İlgili kod ve belgeyi incele.
2. Benzer pattern ve testi bul; yoksa belirt.
3. Mevcut mimari ve veri akışını açıkla.
4. Çelişki, eksik gereksinim ve varsayımı belirt.
5. Minimum implementasyon planını ve dosyaları listele.
6. Risk, regresyon ve doğrulamayı yaz.
7. Küçük, incelenebilir adımlarla uygula.
8. İlgili test/lint/type/build/a11y/security kontrollerini çalıştır.
9. Final diff'i kabul kriterlerine göre öz incelemeden geçir.
10. Dokümantasyonu güncelle ve Türkçe teslim raporu ver.

# TEST PLANI
- Unit:
- Integration:
- E2E:
- Erişilebilirlik:
- Güvenlik/kötüye kullanım:
- Regresyon:

# TAMAMLANMA TANIMI
- [ ] Her kabul kriterinin kanıtı var.
- [ ] Beklenen akış, geçersiz girdi, edge case ve hata yolu kapsandı.
- [ ] İlgili test, lint, strict type ve production build geçti.
- [ ] Erişilebilirlik, üç dil, responsive ve reduced-motion doğrulandı.
- [ ] Güvenlik, gizlilik, yetki, validation, log ve abuse kontrol edildi.
- [ ] İlgisiz değişiklik, secret, ölü kod veya yanıltıcı mock kalmadı.
- [ ] Dokümantasyon ve kararlar güncel.
- [ ] Öz incelemede açık kritik/yüksek sorun yok.

# TESLİM
- Kullanıcıya görünen değişiklik:
- Yaklaşımın nedeni:
- Gösterilen ve açıklanan kodlar:
- Oluşturulan/değiştirilen dosyalar:
- Gerçekten çalıştırılan kontroller:
- Varsayım ve sınırlamalar:
- Kalan risk ve kararlar:
```

## Kullanım ilkeleri

- Her brief tek ve tutarlı bir sonuca odaklansın.
- Tüm belgeleri kopyalamak yerine ilgili bölümlere referans ver.
- “Hızlı” veya “güvenli” gibi sözleri gözlenebilir kriterlere çevir.
- Gerçek kısıt değilse iç implementasyonu dikte etme; önce sonucu tarif et.
- Test geçmesi bilinmeyen iş kuralını onaylamaz.

