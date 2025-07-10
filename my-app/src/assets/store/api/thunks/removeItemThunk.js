import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const removeItemThunk = createAsyncThunk(`cart/deleteItem`, async ({ item_id }) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`http://localhost:8000/api/cart/items/${item_id}/`,

            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        return response.data;
    } catch (error) {
        throw error;
    }

})

export default removeItemThunk;