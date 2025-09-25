import {
    AdvantageItemType,
    DeliveryType,
    ContactsType,
    ServiceItemType,
} from "@/shared/types";


export interface SiteInfoType {
    title: string;
    description: string;
    header: string;
}

export interface WelcomeType {
    title: string;
    text: string;
}

export interface ShowcaseItemType {
    background_image?: string;
    webp_background_image?: string;
    avif_background_image?: string;
    text_top: string;
    page_name: string;
    text_bottom: string;
}

export interface ShowcaseType {
    title: string;
    items: ShowcaseItemType[];
}

export interface CatalogIntroType {
    title: string;
    text: string;
}

export interface AboutType {
    title: string;
    text: string;
}

export interface HomePageTypes {
    site_info: SiteInfoType | null;
    welcome: WelcomeType | null;
    showcase: ShowcaseType | null;
    catalog_intro: CatalogIntroType | null;
    advantages: AdvantageItemType[];
    delivery: DeliveryType | null;
    about: AboutType | null;
    contacts: ContactsType | null;
    services: ServiceItemType[];
}