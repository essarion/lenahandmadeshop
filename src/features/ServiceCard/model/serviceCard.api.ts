import { baseApi } from "@/shared/api/baseQuery"
import { ServiceItemType } from "@/shared/types";


export const serviceCardApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getServiceCard: build.query<ServiceItemType, string>({
            query: (slug) => ({
                url: `/service/${slug}/`,
                method: 'GET'
            })
        })
    }),
    overrideExisting: false,
});

export const { useGetServiceCardQuery } = serviceCardApi;
