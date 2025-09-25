import { baseApi } from "@/shared/api/baseQuery";
import { LoginResponce, LoginRequest } from "../types/login.types";


export const loginUser = baseApi.injectEndpoints({
    endpoints: (build) => ({
        takeUserLogin: build.mutation<LoginResponce, LoginRequest>({
            query: ({ username, password }) => ({
                url: '/token/',
                method: 'POST',
                body: {
                    username,
                    password
                }
            })
        })
    })
});

export const { useTakeUserLoginMutation } = loginUser;