import { ServiceItemType } from './services.types';


export interface CategoryType {
    name: string;
    slug: string;
    services: ServiceItemType[];
}