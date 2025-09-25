import { baseApi } from "@/shared/api/baseQuery";
import { HomePageTypes } from "./homePage.types";

export const homePageApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getHomePage: build.query<HomePageTypes, void>({
            query: () => ({
                url: '/home/',
                method: 'GET',
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useGetHomePageQuery } = homePageApi;
