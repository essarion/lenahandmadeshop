import { baseApi } from "@/shared/api/baseQuery";
import { User } from "../types/user.types";


export const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getCurrentUser: build.query<User, void>({
            query: () => ({
                url: '/auth/user/',
                method: 'GET',
            })
        })
    }),
    overrideExisting: false,
});

export const { useGetCurrentUserQuery } = userApi;