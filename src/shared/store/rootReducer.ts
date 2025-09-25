import { combineReducers } from "@reduxjs/toolkit";
import { baseApi } from "../api/baseQuery";


export const rootReducer = combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
});