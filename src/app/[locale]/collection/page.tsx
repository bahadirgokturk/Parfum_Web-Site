import { notFound } from "next/navigation";
import { CollectionPage } from "@/components/shop";
import { isLocale } from "@/shared/i18n/config";

export default async function CollectionRoute({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <CollectionPage locale={locale} />;
}
