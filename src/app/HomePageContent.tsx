"use client";

import { useGetHomePageQuery } from "./homePage.api";
import { CatalogIntro } from "@/entities/catalogIntro";
import { Showcase } from "@/entities/Showcase";
import { GreetingForm } from "@/entities/greetingForm/GreetingForm";
import { LazySection } from "@/shared/ui/LazySection/LazySection";

export const HomePageContent: React.FC = () => {
    const { data } = useGetHomePageQuery();

    if (!data) return null

    return (
        <main>
            {data?.welcome && <GreetingForm {...data.welcome} />}
            {data?.showcase && <Showcase {...data.showcase} />}
            {data?.catalog_intro && <CatalogIntro {...data.catalog_intro} />}
            <LazySection load={() => import("@/widgets/catalog/Catalog").then(mod => ({ default: mod.Catalog }))} props={{ services: data.services }} />
            <LazySection load={() => import("@/features/Advantages/Advantages").then(mod => ({ default: mod.Advantages }))} props={{ advantages: data.advantages }} />
            <LazySection load={() => import("@/entities/delivery/Delivery").then(mod => ({ default: mod.Delivery }))} props={data.delivery} />
            <LazySection load={() => import("@/entities/about").then(mod => ({ default: mod.About }))} props={data.about} />
            <LazySection load={() => import("@/entities/contacts/Contacts").then(mod => ({ default: mod.Contacts }))} props={data.contacts} />

        </main>
    );
};