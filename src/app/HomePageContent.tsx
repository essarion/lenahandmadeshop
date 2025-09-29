"use client";

import { useGetHomePageQuery } from "./homePage.api";
import { CatalogIntro } from "@/entities/catalogIntro";
import { Showcase } from "@/entities/Showcase";
import { GreetingForm } from "@/entities/greetingForm/GreetingForm";
import { LazySection } from "@/shared/ui/LazySection/LazySection";

import type { CatalogProps } from "@/widgets/catalog/Catalog";
import type { AdvantagesProps } from "@/features/Advantages/Advantages";
import type { DeliveryType } from "@/shared/types";
import type { AboutProps } from "@/entities/about/about.types";
import type { ContactsType } from "@/shared/types";

import type { ComponentType, JSX } from "react";

type WithIntrinsic<T> = T & JSX.IntrinsicAttributes;
type Loader<T> = () => Promise<{ default: ComponentType<T> }>;

const loadCatalog: Loader<WithIntrinsic<CatalogProps>> = () =>
    import("@/widgets/catalog/Catalog").then((mod) => ({ default: mod.Catalog }));

const loadAdvantages: Loader<WithIntrinsic<AdvantagesProps>> = () =>
    import("@/features/Advantages/Advantages").then((mod) => ({ default: mod.Advantages }));

const loadDelivery: Loader<WithIntrinsic<DeliveryType>> = () =>
    import("@/entities/delivery/Delivery").then((mod) => ({ default: mod.Delivery }));

const loadAbout: Loader<WithIntrinsic<AboutProps>> = () =>
    import("@/entities/about").then((mod) => ({ default: mod.About }));

const loadContacts: Loader<WithIntrinsic<ContactsType>> = () =>
    import("@/entities/contacts/Contacts").then((mod) => ({ default: mod.Contacts }));

export const HomePageContent: React.FC = () => {
    const { data } = useGetHomePageQuery();

    if (!data) return null;

    return (
        <main>
            {data.welcome && <GreetingForm {...data.welcome} />}
            {data.showcase && <Showcase {...data.showcase} />}
            {data.catalog_intro && <CatalogIntro {...data.catalog_intro} />}

            <LazySection<WithIntrinsic<CatalogProps>> load={loadCatalog} props={{ services: data.services }} />
            <LazySection<WithIntrinsic<AdvantagesProps>> load={loadAdvantages} props={{ advantages: data.advantages }} />
            <LazySection<WithIntrinsic<DeliveryType>> load={loadDelivery} props={data.delivery ?? undefined} />
            <LazySection<WithIntrinsic<AboutProps>>
                load={loadAbout}
                props={data.about as AboutProps}
            />
            <LazySection<WithIntrinsic<ContactsType>> load={loadContacts} props={data.contacts ?? undefined} />
        </main>
    );
};
