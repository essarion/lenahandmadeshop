import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


const incrementItemThunk = createAsyncThunk(
    'cart/incrementItem',
    async ({ item_id, quantity }) => {
        const newQuantity = quantity + 1;
        try {
            const token = localStorage.getItem('token');
            const response = await axios.patch(`http://localhost:8000/api/cart/items/${item_id}/`,
                { quantity: newQuantity },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            return response.data

        } catch (error) {
            throw error;
        }
    }
)

export default incrementItemThunk;