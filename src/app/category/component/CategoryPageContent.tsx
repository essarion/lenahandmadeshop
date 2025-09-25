'use client';

import { useParams } from "next/navigation";
import { useTakeCategoryPageApiQuery } from "../[category]/category.api";
import dynamic from "next/dynamic";

const Catalog = dynamic(() =>
    import("@/widgets/catalog/Catalog").then((mod) => ({ default: mod.Catalog }))
);

const Contacts = dynamic(() =>
    import("@/entities/contacts/Contacts").then((mod) => ({ default: mod.Contacts }))
);

export const CategoryPageContent: React.FC = () => {
    const params = useParams();
    const categorySlug = params?.category as string;

    const { data, isLoading, error } = useTakeCategoryPageApiQuery(categorySlug);

    if (isLoading) return <p>Загрузка...</p>;
    if (error || !data) return <p>Ошибка загрузки</p>;

    return (
        <main className="category-page">
            <div className="category-page__heading">
                <h1>{data.category.name}</h1>
            </div>

            {data?.services && <Catalog services={data.services} />}
            {data?.contacts && <Contacts {...data.contacts} />}
        </main>
    );
};
