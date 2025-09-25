import {
    AdvantageItemType,
    DeliveryType,
    ContactsType,
    ServiceItemType,
    CategoryType
} from "@/shared/types";


export interface CategoryDetailResponse {
    category: CategoryType;
    services: ServiceItemType[];
    advantages: AdvantageItemType[];
    delivery: DeliveryType | null;
    contacts: ContactsType | null;
}