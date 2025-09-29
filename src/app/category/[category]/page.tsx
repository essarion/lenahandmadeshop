import { Metadata } from 'next';
import { Suspense } from 'react';
import { CategoryPageContent } from "../component/CategoryPageContent";
import { Preloader } from '@/shared/ui/Preloader/Preloader';


export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
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



export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params;
    return (
        <Suspense fallback={<Preloader />}>
            <CategoryPageContent categorySlug={category} />
        </Suspense>
    );
}