import { createApi } from "@reduxjs/toolkit/query/react";
import { authBaseQuery } from "../lib/authBaseQuery";



export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: authBaseQuery,
    endpoints: (build) => ({

    })

});