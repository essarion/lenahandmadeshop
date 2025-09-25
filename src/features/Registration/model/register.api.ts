import { baseApi } from '@/shared/api/baseQuery';
import { RegisterUserResponse, RegisterUserRequest } from '../types/register.types';

export const extendedApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        registerUser: build.mutation<RegisterUserResponse, RegisterUserRequest>({
            query: (data) => ({
                url: '/register/',
                method: 'POST',
                body: data,
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useRegisterUserMutation } = extendedApi;
