import { baseApi } from "@/shared/api/baseQuery";
import { DoNewPasswordRequest, ConfirmNewPasswordRequest } from "../types/newPasswordApi.types";


export const newPasswordApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        doNewPassword: build.mutation<void, DoNewPasswordRequest>({
            query: (email) => ({
                url: '/password-reset',
                method: 'POST',
                body: {
                    email
                },


            })
        }),

        confirmNewPassword: build.mutation<void, ConfirmNewPasswordRequest>({
            query: ({ uidb64, token, new_password }) => ({
                url: `/password-reset-confirm/${uidb64}/${token}/`,
                method: 'POST',
                body: { new_password },
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useDoNewPasswordMutation, useConfirmNewPasswordMutation } = newPasswordApi;