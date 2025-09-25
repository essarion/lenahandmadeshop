export interface ServiceItemType {
    id: number;
    name: string;
    description: string;
    price: string | null;
    image: string | null;
    webp_image: string | null;
    avif_image: string | null;
    slug: string;
    created_at: string;
    category: string;
}
