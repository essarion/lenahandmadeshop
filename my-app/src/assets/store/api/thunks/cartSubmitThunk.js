import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


const cartSubmitThunk = createAsyncThunk(
    'cart/submitCart',
    async ({ phone, email }) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post("http://localhost:8000/api/cart/submit/",
                { phone, email },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            return response.data

        } catch (error) {
            throw error
        }
    }
);

export default cartSubmitThunk;