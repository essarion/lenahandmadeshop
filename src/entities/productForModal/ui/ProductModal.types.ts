export interface ProductModalComponentProps {
    product: {
        id: number;
        name: string;
        description: string;
        price?: number | string | null;
        image?: string | null;
        webp_image?: string | null;
        avif_image?: string | null;

    };
    onAddToCart: (id: number, quantity: number) => void;
}