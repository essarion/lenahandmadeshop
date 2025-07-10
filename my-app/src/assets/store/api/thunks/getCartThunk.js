import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getCartThunk = createAsyncThunk(
    'cart/getCart',
    async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8000/api/cart/',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            return response.data;

        } catch (error) {
            throw error;
        }
    },
);

export default getCartThunk;