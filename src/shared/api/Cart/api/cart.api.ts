import { baseApi } from "@/shared/api/baseQuery";
import {
    CartType,
    AddCartItemRequestType,
    UpdateCartItemRequestType,
    RemoveCartItemRequestType,
    SubmitCartRequestType,
    SubmitCartResponseType,
} from "@/shared/api/Cart/types/cartApi.types";


export const cartApi = baseApi.injectEndpoints({
    endpoints: (build) => ({

        getCart: build.query<CartType, void>({
            query: () => ({
                url: '/cart/',
                method: 'GET',
            }),
        }),

        addCartItem: build.mutation<CartType, AddCartItemRequestType>({
            query: ({ service_id, quantity = 1 }) => ({
                url: '/cart/items/',
                method: 'POST',
                body: {
                    service_id,
                    quantity,
                },
            }),
        }),

        incrementCartItem: build.mutation<CartType, UpdateCartItemRequestType>({
            query: ({ item_id, quantity }) => {
                const newQuantity = quantity + 1;
                return {
                    url: `/cart/items/${item_id}/`,
                    method: 'PATCH',
                    body: {
                        item_id,
                        quantity: newQuantity,
                    },
                };
            },
        }),

        decrementCartItem: build.mutation<CartType, UpdateCartItemRequestType>({
            query: ({ item_id, quantity }) => {
                const newQuantity = quantity - 1;
                return {
                    url: `/cart/items/${item_id}/`,
                    method: 'PATCH',
                    body: {
                        item_id,
                        quantity: newQuantity,
                    },
                };
            },
        }),

        removeCartItem: build.mutation<CartType, RemoveCartItemRequestType>({
            query: ({ item_id }) => ({
                url: `/cart/items/${item_id}/`,
                method: 'DELETE',
            }),
        }),

        clearCart: build.mutation<CartType, void>({
            query: () => ({
                url: '/cart/',
                method: 'DELETE',
            }),
        }),

        submitCart: build.mutation<SubmitCartResponseType, SubmitCartRequestType>({
            query: ({ phone, email }) => ({
                url: '/cart/submit/',
                method: 'POST',
                body: {
                    phone,
                    email,
                },
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetCartQuery,
    useAddCartItemMutation,
    useIncrementCartItemMutation,
    useDecrementCartItemMutation,
    useRemoveCartItemMutation,
    useClearCartMutation,
    useSubmitCartMutation,
} = cartApi;
