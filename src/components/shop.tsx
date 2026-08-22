"use client";

import { Bag, Check, Funnel, Heart, Minus, Plus, SlidersHorizontal, X } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { catalog, getProduct, type Product } from "@/features/catalog/catalog";
import type { Locale } from "@/shared/i18n/config";

type CartLine = { id: string; quantity: number };
type FormatFilter = "all" | Product["format"];

const shopCopy = {
  tr: { collection: "Koleksiyon", all: "Tümü", single: "Tek ürün", gift: "Hediye setleri", ritual: "Ritüeller", filter: "Filtrele", sort: "Sırala", count: "ürün", pricePending: "Fiyat marka onayı bekliyor", add: "Demo sepete ekle", detail: "Ürünü incele", prototype: "Prototip ürün", bag: "Demo çantan", empty: "Çantan henüz boş.", close: "Kapat", remove: "Çıkar", disclaimer: "Bu prototipte ödeme alınmaz ve stok ayrılmaz.", back: "Koleksiyona dön", features: "Ürün bilgileri", story: "Ürün hikâyesi", notes: "Koku notaları", ingredients: "İçindekiler", usage: "Kullanım", waiting: "Bu alan marka tarafından sağlanacak doğrulanmış bilgi bekliyor.", delivery: "Teslimat ve iade bilgileri marka onayı bekliyor.", related: "Ritüeli tamamla" },
  en: { collection: "Collection", all: "All", single: "Single products", gift: "Gift sets", ritual: "Rituals", filter: "Filter", sort: "Sort", count: "products", pricePending: "Price awaiting brand approval", add: "Add to demo bag", detail: "View product", prototype: "Prototype product", bag: "Your demo bag", empty: "Your bag is empty.", close: "Close", remove: "Remove", disclaimer: "No payment or stock reservation occurs in this prototype.", back: "Back to collection", features: "Product information", story: "Product story", notes: "Scent notes", ingredients: "Ingredients", usage: "How to use", waiting: "This area is waiting for verified information from the brand.", delivery: "Delivery and returns are awaiting brand approval.", related: "Complete the ritual" },
  fr: { collection: "Collection", all: "Tous", single: "Produits seuls", gift: "Coffrets cadeaux", ritual: "Rituels", filter: "Filtrer", sort: "Trier", count: "produits", pricePending: "Prix en attente de validation", add: "Ajouter au sac démo", detail: "Voir le produit", prototype: "Produit prototype", bag: "Votre sac démo", empty: "Votre sac est vide.", close: "Fermer", remove: "Retirer", disclaimer: "Aucun paiement ni réservation de stock dans ce prototype.", back: "Retour à la collection", features: "Informations produit", story: "Histoire du produit", notes: "Notes olfactives", ingredients: "Ingrédients", usage: "Utilisation", waiting: "Cette zone attend les informations vérifiées de la marque.", delivery: "Livraison et retours en attente de validation.", related: "Compléter le rituel" },
} as const;

/** Mağaza sayfalarında kullanılan ortak üst alan; marka sitesine dönüşü ve demo çantayı taşır. */
function ShopHeader({ locale, count, onOpenCart }: { locale: Locale; count: number; onOpenCart: () => void }) {
  return <header className="shop-header">
    <Link className="shop-wordmark" href={`/${locale}`}><span>F</span><strong>FLAWLESS</strong><small>PARIS</small></Link>
    <nav><Link href={`/${locale}`}>Maison</Link><Link href={`/${locale}/collection`}>{shopCopy[locale].collection}</Link></nav>
    <div className="shop-header-actions">{(["tr", "en", "fr"] as const).map((item) => <Link className={item === locale ? "active" : ""} href={`/${item}/collection`} key={item}>{item.toUpperCase()}</Link>)}<button onClick={onOpenCart} aria-label={shopCopy[locale].bag}><Bag size={20} /><span>{count}</span></button></div>
  </header>;
}

/** Sepet davranışını sayfalarda çoğaltmamak için ekleme, azaltma ve ürün çözümlemeyi tek hook yönetir. */
function useDemoCart() {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const add = (id: string) => { setCart((current) => current.some((line) => line.id === id) ? current.map((line) => line.id === id ? { ...line, quantity: line.quantity + 1 } : line) : [...current, { id, quantity: 1 }]); setCartOpen(true); };
  const change = (id: string, delta: number) => setCart((current) => current.map((line) => line.id === id ? { ...line, quantity: line.quantity + delta } : line).filter((line) => line.quantity > 0));
  const items = useMemo(() => cart.flatMap((line) => { const product = getProduct(line.id); return product ? [{ ...line, product }] : []; }), [cart]);
  return { items, count: cart.reduce((total, line) => total + line.quantity, 0), cartOpen, setCartOpen, add, change };
}

function DemoCart({ locale, cart }: { locale: Locale; cart: ReturnType<typeof useDemoCart> }) {
  const copy = shopCopy[locale];
  if (!cart.cartOpen) return null;
  return <><button className="shop-cart-scrim" aria-label={copy.close} onClick={() => cart.setCartOpen(false)} /><aside className="shop-cart" aria-label={copy.bag}><div className="shop-cart-head"><h2>{copy.bag}</h2><button aria-label={copy.close} onClick={() => cart.setCartOpen(false)}><X /></button></div>{cart.items.length === 0 ? <p className="shop-cart-empty">{copy.empty}</p> : cart.items.map(({ product, quantity }) => <div className="shop-cart-line" key={product.id}><Image src={product.image} alt="" width={68} height={84} /><div><strong>{product.name}</strong><span>{product.volumeLabel}</span><div><button onClick={() => cart.change(product.id, -1)} aria-label="Azalt"><Minus /></button><b>{quantity}</b><button onClick={() => cart.change(product.id, 1)} aria-label="Artır"><Plus /></button></div></div><button className="shop-remove" onClick={() => cart.change(product.id, -quantity)}>{copy.remove}</button></div>)}<p className="shop-cart-note">{copy.disclaimer}</p></aside></>;
}

export function CollectionPage({ locale }: { locale: Locale }) {
  const copy = shopCopy[locale];
  const cart = useDemoCart();
  const [filter, setFilter] = useState<FormatFilter>("all");
  const visibleProducts = filter === "all" ? catalog : catalog.filter((product) => product.format === filter);
  return <main className="shop-page"><ShopHeader locale={locale} count={cart.count} onOpenCart={() => cart.setCartOpen(true)} /><section className="shop-title"><p>Flawless Paris</p><h1>{copy.collection}</h1><span>{catalog.length} {copy.count}</span></section><div className="shop-toolbar"><button><Funnel />{copy.filter}</button><div>{(["all", "single", "gift", "ritual"] as const).map((value) => <button className={filter === value ? "selected" : ""} key={value} onClick={() => setFilter(value)}>{copy[value]}</button>)}</div><button>{copy.sort}<SlidersHorizontal /></button></div><section className="shop-grid">{visibleProducts.map((product) => <article className="shop-card" key={product.id}><Link className="shop-card-image" href={`/${locale}/products/${product.slug}`}><Image src={product.image} alt={product.name} fill sizes="(max-width: 720px) 50vw, 25vw" style={{ objectPosition: product.imagePosition }} /><span>{copy.prototype}</span></Link><div className="shop-card-copy"><Link href={`/${locale}/products/${product.slug}`}><p>Flawless Paris</p><h2>{product.name}</h2><span>{product.volumeLabel}</span><strong>{copy.pricePending}</strong></Link><button aria-label={`${product.name}: ${copy.add}`} onClick={() => cart.add(product.id)}><Bag /></button></div></article>)}</section><DemoCart locale={locale} cart={cart} /></main>;
}

export function ProductDetailPage({ locale, product }: { locale: Locale; product: Product }) {
  const copy = shopCopy[locale];
  const cart = useDemoCart();
  const [activeImage, setActiveImage] = useState(product.gallery[0]);
  const related = catalog.filter((item) => item.id !== product.id).slice(0, 3);
  return <main className="shop-page product-detail-page"><ShopHeader locale={locale} count={cart.count} onOpenCart={() => cart.setCartOpen(true)} /><div className="breadcrumbs"><Link href={`/${locale}`}>Maison</Link><span>/</span><Link href={`/${locale}/collection`}>{copy.collection}</Link><span>/</span><b>{product.name}</b></div><section className="product-detail"><div className="product-gallery"><div className="product-main-image"><Image src={activeImage} alt={product.name} fill priority sizes="(max-width: 900px) 100vw, 58vw" style={{ objectPosition: product.imagePosition }} /></div><div className="product-thumbs">{product.gallery.map((image, index) => <button className={image === activeImage ? "active" : ""} key={image} onClick={() => setActiveImage(image)} aria-label={`${product.name} görsel ${index + 1}`}><Image src={image} alt="" fill sizes="90px" /></button>)}</div></div><aside className="product-summary"><p>{copy.prototype}</p><h1>{product.name}</h1><span>{product.volumeLabel}</span><strong>{copy.pricePending}</strong><div className="prototype-status"><Check />{copy.delivery}</div><button className="detail-add" onClick={() => cart.add(product.id)}><Bag />{copy.add}</button><button className="detail-favorite" aria-label="Favorilere ekle"><Heart /></button><small>{copy.disclaimer}</small></aside></section><section className="product-information"><div className="information-title"><p>Flawless Paris dossier</p><h2>{copy.features}</h2></div>{[copy.story, copy.notes, copy.ingredients, copy.usage].map((title) => <article key={title}><h3>{title}</h3><p>{copy.waiting}</p></article>)}</section><section className="related-products"><p>Flawless edit</p><h2>{copy.related}</h2><div>{related.map((item) => <Link key={item.id} href={`/${locale}/products/${item.slug}`}><span><Image src={item.image} alt={item.name} fill sizes="30vw" style={{ objectPosition: item.imagePosition }} /></span><strong>{item.name}</strong><small>{item.volumeLabel}</small></Link>)}</div></section><div className="mobile-buy-bar"><div><strong>{product.name}</strong><span>{copy.pricePending}</span></div><button onClick={() => cart.add(product.id)}>{copy.add}</button></div><DemoCart locale={locale} cart={cart} /></main>;
}
