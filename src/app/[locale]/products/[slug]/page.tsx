import { notFound } from "next/navigation";
import { ProductDetailPage } from "@/components/shop";
import { catalog, getProductBySlug } from "@/features/catalog/catalog";
import { isLocale, locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.flatMap((locale) => catalog.map((product) => ({ locale, slug: product.slug })));
}

export default async function ProductRoute({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const product = getProductBySlug(slug);
  if (!product) notFound();
  return <ProductDetailPage locale={locale} product={product} />;
}
