"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowRight, Bag, List, Minus, Plus, Sparkle, X } from "@phosphor-icons/react";
import { useMemo, useState } from "react";
import { recommendProduct } from "@/features/adviser/recommend";
import { catalog, getProduct } from "@/features/catalog/catalog";
import type { Locale } from "@/shared/i18n/config";
import type { Messages } from "@/shared/i18n/messages";

type CartLine = { id: string; quantity: number };

export function Storefront({ locale, messages }: { locale: Locale; messages: Messages }) {
  // Bu state değerleri yalnızca prototip tarayıcı sekmesinde yaşar. Henüz backend,
  // kullanıcı hesabı veya kalıcı sipariş kaydı oluşturulmaz.
  const reduceMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const result = submitted ? recommendProduct(query) : undefined;
  const count = cart.reduce((sum, line) => sum + line.quantity, 0);

  /** Aynı ürün tekrar seçilirse yeni satır açmak yerine mevcut adedi artırır. */
  const addToCart = (id: string) => {
    setCart((current) => current.some((line) => line.id === id)
      ? current.map((line) => line.id === id ? { ...line, quantity: line.quantity + 1 } : line)
      : [...current, { id, quantity: 1 }]);
    setCartOpen(true);
  };

  const changeQuantity = (id: string, delta: number) => setCart((current) => current
    .map((line) => line.id === id ? { ...line, quantity: line.quantity + delta } : line)
    .filter((line) => line.quantity > 0));

  // Sepette yalnızca ürün kimliği ve adet tutulur. Görsel/ad gibi katalog bilgileri
  // tek doğruluk kaynağı olan catalog üzerinden okunur; iki yerde kopyalanmaz.
  const cartItems = useMemo(() => cart.flatMap((line) => {
    const product = getProduct(line.id);
    return product ? [{ ...line, product }] : [];
  }), [cart]);

  return <main>
    <a className="skip-link" href="#main-content">İçeriğe geç</a>
    <header className="site-header">
      <button className="icon-button mobile-menu" aria-label="Menüyü aç" onClick={() => setMenuOpen(true)}><List size={22} /></button>
      <Link className="wordmark" href={`/${locale}`} aria-label="Flawless Paris ana sayfa"><span>F</span><b>FLAWLESS</b><small>PARIS</small></Link>
      <nav className="desktop-nav" aria-label="Ana menü">
        <Link href={`/${locale}/collection`}>{messages.nav.collection}</Link><a href="#story">{messages.nav.story}</a><a href="#adviser">{messages.nav.adviser}</a>
      </nav>
      <div className="header-actions">
        <div className="locale-switcher" aria-label="Dil seçimi">{(["tr", "en", "fr"] as const).map((item) => <Link key={item} className={item === locale ? "active" : ""} href={`/${item}`}>{item.toUpperCase()}</Link>)}</div>
        <button className="bag-button" aria-label={`${messages.cart.title}: ${count}`} onClick={() => setCartOpen(true)}><Bag size={20} /><span>{count}</span></button>
      </div>
    </header>

    <AnimatePresence>{menuOpen && <motion.div className="mobile-panel" initial={{ opacity: 0, x: "-100%" }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: "-100%" }}>
      <button className="icon-button panel-close" aria-label="Kapat" onClick={() => setMenuOpen(false)}><X size={24} /></button>
      <Link href={`/${locale}/collection`} onClick={() => setMenuOpen(false)}>{messages.nav.collection}</Link><a href="#story" onClick={() => setMenuOpen(false)}>{messages.nav.story}</a><a href="#adviser" onClick={() => setMenuOpen(false)}>{messages.nav.adviser}</a>
    </motion.div>}</AnimatePresence>

    <section className="hero" id="main-content">
      <Image className="hero-image" src="/images/products/burgundy-champagne-gift-sets.webp" alt="Bordo kadife kutu içinde Flawless Paris hediye ritüeli" fill priority sizes="100vw" />
      <div className="hero-shade" />
      <motion.div className="hero-copy" initial={reduceMotion ? false : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
        <p className="kicker">{messages.hero.kicker}</p><h1>{messages.hero.title}</h1><p className="hero-body">{messages.hero.body}</p>
        <div className="hero-actions"><a className="button button-gold" href="#adviser">{messages.hero.primary}<Sparkle weight="fill" /></a><Link className="text-link" href={`/${locale}/collection`}>{messages.hero.secondary}<ArrowDown /></Link></div>
      </motion.div>
      <div className="scent-line" aria-hidden="true"><span /></div>
    </section>

    <section className="film-section" id="story">
      <div className="section-heading"><p className="kicker">{messages.film.kicker}</p><h2>{messages.film.title}</h2><p>{messages.film.body}</p></div>
      <div className="film-grid">
        {[
          ["/images/products/campaign-film-strip.webp", "50% 8%"],
          ["/images/products/campaign-film-strip.webp", "50% 50%"],
          ["/images/products/campaign-film-strip.webp", "50% 91%"],
        ].map(([src, position], index) => <motion.figure key={position} className={`film-frame film-${index + 1}`} whileInView={reduceMotion ? {} : { y: [22, 0], opacity: [0, 1] }} viewport={{ once: true, amount: .25 }} transition={{ duration: .7, delay: index * .1 }}>
          <Image src={src} alt="Flawless Paris kampanya sahnesi" fill sizes="(max-width: 720px) 88vw, 32vw" style={{ objectPosition: position }} /><figcaption>0{index + 1} — {messages.film.scenes[index]}</figcaption>
        </motion.figure>)}
      </div>
    </section>

    <section className="collection-section home-commerce" id="collection">
      <div className="collection-intro"><p className="kicker">{messages.collection.kicker}</p><h2>{messages.collection.title}</h2><div><p>{messages.collection.note}</p><Link href={`/${locale}/collection`}>{messages.collection.allProducts}<ArrowRight /></Link></div></div>
      <div className="product-grid">{catalog.map((product) => <article className="product-card" key={product.id}>
        <Link className="product-image" href={`/${locale}/products/${product.slug}`}><Image src={product.image} alt={product.name} fill sizes="(max-width: 760px) 50vw, 25vw" style={{ objectPosition: product.imagePosition }} /><span>{messages.collection.prototype}</span></Link>
        <div className="product-copy"><Link className="home-product-info" href={`/${locale}/products/${product.slug}`}><small>Flawless Paris</small><h3>{product.name}</h3><span>{product.volumeLabel}</span><strong>{messages.collection.pricePending}</strong></Link><div className="home-product-actions"><button className="product-add" onClick={() => addToCart(product.id)}>{messages.collection.add}<Plus size={18} /></button><Link href={`/${locale}/products/${product.slug}`}>{messages.collection.details}</Link></div></div>
      </article>)}</div>
    </section>

    <section className="adviser-section" id="adviser">
      <div className="adviser-copy"><p className="kicker">{messages.adviser.kicker}</p><h2>{messages.adviser.title}</h2><p>{messages.adviser.body}</p></div>
      <div className="adviser-console">
        <div className="adviser-mark" aria-hidden="true"><Sparkle weight="fill" /></div>
        <div className="quick-prompts">{messages.adviser.quick.map((prompt) => <button key={prompt} onClick={() => { setQuery(prompt); setSubmitted(false); }}>{prompt}</button>)}</div>
        <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}><label className="sr-only" htmlFor="scent-query">{messages.adviser.title}</label><textarea id="scent-query" value={query} onChange={(event) => { setQuery(event.target.value); setSubmitted(false); }} placeholder={messages.adviser.placeholder} /><button className="send-button" type="submit" aria-label={messages.adviser.ask}><ArrowRight size={22} /></button></form>
        <AnimatePresence mode="wait">{submitted && <motion.div className="adviser-result" key={result?.id ?? "empty"} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
          {result ? <><p>{messages.adviser.resultLead}</p><div><Image src={result.image} alt="" width={64} height={78} /><strong><Link href={`/${locale}/products/${result.slug}`}>{result.name}</Link></strong><button onClick={() => addToCart(result.id)}><Plus />{messages.collection.add}</button></div><small>{messages.adviser.disclaimer}</small></> : <p>{messages.adviser.empty}</p>}
        </motion.div>}</AnimatePresence>
      </div>
    </section>

    <footer><div className="footer-logo"><span>F</span><strong>FLAWLESS</strong><small>PARIS</small></div><p>{messages.footer.line}</p><small>{messages.footer.rights}</small></footer>

    <AnimatePresence>{cartOpen && <><motion.button className="drawer-scrim" aria-label={messages.cart.close} onClick={() => setCartOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} /><motion.aside className="cart-drawer" aria-label={messages.cart.title} initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 300, damping: 32 }}>
      <div className="drawer-head"><h2>{messages.cart.title}</h2><button className="icon-button" aria-label={messages.cart.close} onClick={() => setCartOpen(false)}><X /></button></div>
      {cartItems.length === 0 ? <p className="cart-empty">{messages.cart.empty}</p> : <div className="cart-lines">{cartItems.map(({ product, quantity }) => <div className="cart-line" key={product.id}><Image src={product.image} alt="" width={72} height={88} /><div><strong>{product.name}</strong><div className="quantity"><button aria-label="Azalt" onClick={() => changeQuantity(product.id, -1)}><Minus /></button><span>{quantity}</span><button aria-label="Artır" onClick={() => changeQuantity(product.id, 1)}><Plus /></button></div></div><button className="remove" onClick={() => changeQuantity(product.id, -quantity)}>{messages.cart.remove}</button></div>)}</div>}
      <p className="demo-notice">{messages.cart.demo}</p>
    </motion.aside></>}</AnimatePresence>
  </main>;
}
