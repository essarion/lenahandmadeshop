'use client';

import React from 'react';
import { useTakeCategoryPageApiQuery } from "../[category]/category.api";
import dynamic from "next/dynamic";

const Catalog = dynamic(() =>
    import("@/widgets/catalog/Catalog").then((mod) => ({ default: mod.Catalog }))
);

const Contacts = dynamic(() =>
    import("@/entities/contacts/Contacts").then((mod) => ({ default: mod.Contacts }))
);

interface CategoryPageContentProps {
    categorySlug: string;
}

export const CategoryPageContent: React.FC<CategoryPageContentProps> = ({ categorySlug }) => {
    const { data, isLoading, error } = useTakeCategoryPageApiQuery(categorySlug);

    if (isLoading) return <p>Загрузка...</p>;
    if (error || !data) return <p>Ошибка загрузки</p>;

    return (
        <main className="category-page">
            <div className="category-page__heading">
                <h1>{data.category.name}</h1>
            </div>

            {data.services && <Catalog services={data.services} />}
            {data.contacts && <Contacts {...data.contacts} />}
        </main>
    );
};
