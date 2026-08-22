import { notFound } from "next/navigation";
import { Storefront } from "@/components/storefront";
import { isLocale } from "@/shared/i18n/config";
import { getMessages } from "@/shared/i18n/messages";

export default async function LocalePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <Storefront locale={locale} messages={getMessages(locale)} />;
}
