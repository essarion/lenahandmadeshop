import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const addItemThunk = createAsyncThunk(
    'cart/addItem/',
    async ({ service_id, quantity = 1 }) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:8000/api/cart/items/',
                {

                    service_id,
                    quantity
                }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        };

    }

);

export default addItemThunk;