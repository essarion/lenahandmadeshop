import { baseApi } from "@/shared/api/baseQuery";
import { User } from "../types/user.types";

export const userApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (build) => ({
        getCurrentUser: build.query<User, void>({
            query: () => ({
                url: '/auth/user/',
                method: 'GET',
            }),
            providesTags: ['User'],
        }),
    }),
});

export const { useGetCurrentUserQuery } = userApi;
