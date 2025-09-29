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
            providesTags: ['Cart'],
            keepUnusedDataFor: 30,
        }),

        addCartItem: build.mutation<CartType, AddCartItemRequestType>({
            query: ({ service_id, quantity = 1 }) => ({
                url: '/cart/items/',
                method: 'POST',
                body: { service_id, quantity },
            }),
            invalidatesTags: ['Cart'],
        }),

        incrementCartItem: build.mutation<CartType, UpdateCartItemRequestType>({
            query: ({ item_id, quantity }) => {
                return {
                    url: `/cart/items/${item_id}/`,
                    method: 'PATCH',
                    body: { item_id, quantity },
                };
            },
            invalidatesTags: ['Cart'],
        }),

        decrementCartItem: build.mutation<CartType, UpdateCartItemRequestType>({
            query: ({ item_id, quantity }) => {
                return {
                    url: `/cart/items/${item_id}/`,
                    method: 'PATCH',
                    body: { item_id, quantity },
                };
            },
            invalidatesTags: ['Cart'],
        }),

        removeCartItem: build.mutation<CartType, RemoveCartItemRequestType>({
            query: ({ item_id }) => ({
                url: `/cart/items/${item_id}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Cart'],
        }),

        clearCart: build.mutation<CartType, void>({
            query: () => ({
                url: '/cart/',
                method: 'DELETE',
            }),
            invalidatesTags: ['Cart'],
        }),

        submitCart: build.mutation<SubmitCartResponseType, SubmitCartRequestType>({
            query: ({ phone, email }) => ({
                url: '/cart/submit/',
                method: 'POST',
                body: { phone, email },
            }),
        }),

    }),
    overrideExisting: true,
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
