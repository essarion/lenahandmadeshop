import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const clearCartThunk = createAsyncThunk(
    'cart/clear',
    async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete('http://localhost:8000/api/cart/',
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
    }
);

export default clearCartThunk;