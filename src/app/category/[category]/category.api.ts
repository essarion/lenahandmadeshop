import { baseApi } from "@/shared/api/baseQuery";
import { CategoryDetailResponse } from "./category.types";


export const categoryApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        takeCategoryPageApi: build.query<CategoryDetailResponse, string>({
            query: (category) => ({
                url: `/category/${category}/`,
                method: 'GET',

            })
        })
    }),
    overrideExisting: false,

});

export const { useTakeCategoryPageApiQuery } = categoryApi;