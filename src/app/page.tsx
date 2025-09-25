import { HomePageContent } from "./HomePageContent";

export const metadata = {
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



export default function MainPage() {
  return <HomePageContent />;
}
