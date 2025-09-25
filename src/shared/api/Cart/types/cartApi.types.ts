export interface ServiceType {
    id: number;
    name: string;
    description: string;
    price: string;
    image: string | null;
    webp_image: string | null;
    avif_image: string | null;
    slug: string;
    category: string;
    created_at: string;
}


export interface CartItemType {
    id: number;
    service: ServiceType;
    quantity: number;
}

export interface CartType {
    id: number;
    items: CartItemType[];
    total_price: string;
}

export type GetCartResponseType = CartType;

export interface AddCartItemRequestType {
    service_id: number;
    quantity?: number;
}
export type AddCartItemResponseType = CartType;

export interface UpdateCartItemRequestType {
    item_id: number;
    quantity: number;
}
export type UpdateCartItemResponseType = CartType;

export interface RemoveCartItemRequestType {
    item_id: number;
}
export type RemoveCartItemResponseType = CartType;

export type ClearCartResponseType = CartType;

export interface SubmitCartRequestType {
    phone: string;
    email?: string;
}
export interface SubmitCartResponseType {
    success?: boolean;
    error?: string;
}
