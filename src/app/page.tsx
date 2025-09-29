import { Metadata } from 'next';
import { Suspense } from 'react';
import { HomePageContent } from "./HomePageContent";
import { Preloader } from '@/shared/ui/Preloader/Preloader';


export const metadata: Metadata = {
  title: "RedBud Candles — свечи и декор для уюта",
  description:
    "Красивые свечи и декор ручной работы из натуральных материалов. Доставка по всей России.",
  openGraph: {
    title: "RedBud Candles — свечи и декор для уюта",
    description:
      "Красивые свечи и декор ручной работы из натуральных материалов. Доставка по всей России.",
    url: "https://red-bud.ru",
    siteName: "RedBud Candles",
    locale: "ru_RU",
    type: "website",
  },
};

export const dynamic = 'force-dynamic';

export default function MainPage() {
  return (
    <Suspense fallback={<Preloader />}>
      <HomePageContent />;

    </Suspense>
  );
}
