import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    fetchBaseQuery,
} from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";
import { tokenStorage } from "./tokenStorage";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://red-bud.ru/api";

const mutex = new Mutex();

const rawBaseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
        const token = tokenStorage.getAccessToken();
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

export const authBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
) => {
    await mutex.waitForUnlock();

    let response = await rawBaseQuery(args, api, extraOptions);

    if (response.error?.status === 401) {
        const refreshToken = tokenStorage.getRefreshToken();

        if (!mutex.isLocked()) {
            const release = await mutex.acquire();

            try {
                if (refreshToken) {
                    const refreshResponse = await rawBaseQuery(
                        {
                            url: "token/refresh/",
                            method: "POST",
                            body: { refresh: refreshToken },
                        },
                        api,
                        extraOptions
                    );

                    const data = refreshResponse.data as { access?: string; refresh?: string };

                    if (data?.access && data?.refresh) {
                        tokenStorage.setAccessToken(data.access);
                        tokenStorage.setRefreshToken(data.refresh);
                        response = await rawBaseQuery(args, api, extraOptions);
                    } else {
                        tokenStorage.clearTokens();
                    }
                } else {
                    tokenStorage.clearTokens();
                }
            } finally {
                release();
            }
        } else {
            await mutex.waitForUnlock();
            response = await rawBaseQuery(args, api, extraOptions);
        }
    }

    return response;
};
