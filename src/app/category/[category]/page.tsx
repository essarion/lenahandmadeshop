import { CategoryPageContent } from "../component/CategoryPageContent";

export const metadata = {
    metadataBase: new URL("https://red-bud.ru"),
    title: {
        default: "RedBud Candles — свечи и декор",
        template: "%s | RedBud Candles",
    },
    description: "Свечи и декор ручной работы из натуральных материалов.",
    robots: "index, follow",
    alternates: {
        canonical: "https://red-bud.ru",
    },
    icons: {
        icon: "/favicon.ico",
    },
};


export default function CategoryPage() {

    return (
        <CategoryPageContent />
    )
};