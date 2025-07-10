import { createSlice } from "@reduxjs/toolkit";
import addItemThunk from "../api/thunks/addItemThunk";
import removeItemThunk from "../api/thunks/removeItemThunk";
import decrementItemThunk from "../api/thunks/decrementItemThunk";
import getCartThunk from "../api/thunks/getCartThunk";
import clearCartThunk from "../api/thunks/clearCartThunk";
import incrementItemThunk from "../api/thunks/incrementItemThunk";
import cartSubmitThunk from "../api/thunks/cartSubmitThunk";


const itemsCartSlice = createSlice({

    name: 'itemsCart',
    initialState: {
        items: [],
        totalPrice: "0.00",
        status: '',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCartThunk.pending, (state) => {
                state.status = 'Загружаем данные';
                state.error = null;
            })
            .addCase(getCartThunk.fulfilled, (state, action) => {
                state.status = 'Корзина загружена';
                state.items = action.payload.items;
                state.totalPrice = action.payload.total_price;
            })
            .addCase(getCartThunk.rejected, (state, action) => {
                state.status = 'Не удалось загрузить данные. Попробуйте позже';
                state.error = action.error.message;
            })
            .addCase(addItemThunk.pending, (state) => {
                state.status = 'Добавление товара в корзину';
                state.error = null;
            })
            .addCase(addItemThunk.fulfilled, (state, action) => {
                state.status = 'Товар добавлен';
                state.items = action.payload.items;
                state.totalPrice = action.payload.total_price;
            })
            .addCase(addItemThunk.rejected, (state, action) => {
                state.status = 'Не удалось добавить товар, попробуйте позже';
                state.error = action.error.message;
            })
            .addCase(incrementItemThunk.pending, (state) => {
                state.status = 'Увеличиваем количество товара';
                state.error = null;
            })
            .addCase(incrementItemThunk.fulfilled, (state, action) => {
                state.status = 'Количество товара увеличено';
                state.items = action.payload.items;
                state.totalPrice = action.payload.total_price;
            })
            .addCase(incrementItemThunk.rejected, (state, action) => {
                state.status = 'Не удалось увеличить товар';
                state.error = action.error.message;
            })
            .addCase(removeItemThunk.pending, (state) => {
                state.status = 'Удаляем товар';
                state.error = null;
            })
            .addCase(removeItemThunk.fulfilled, (state, action) => {
                state.status = 'Товар удалён из корзины';
                state.items = action.payload.items;
                state.totalPrice = action.payload.total_price;
            })
            .addCase(removeItemThunk.rejected, (state, action) => {
                state.status = 'Не удалось удалить товар. Пропробуйте позже';
                state.error = action.error.message;

            })
            .addCase(decrementItemThunk.pending, (state) => {
                state.status = 'Убираем лишний товар';
                state.error = null;
            })
            .addCase(decrementItemThunk.fulfilled, (state, action) => {
                state.status = 'Лишний товар убран';
                state.items = action.payload.items;
                state.totalPrice = action.payload.total_price;
            })
            .addCase(decrementItemThunk.rejected, (state, action) => {
                state.status = 'Не удалось убрать товар. Попробуйте позже';
                state.error = action.error.message;
            })
            .addCase(clearCartThunk.pending, (state) => {
                state.status = 'Очищаем корзину';
                state.error = null;
            })
            .addCase(clearCartThunk.fulfilled, (state) => {
                state.status = 'Корзина очищена';
                state.items = [];
            })
            .addCase(clearCartThunk.rejected, (state, action) => {
                state.status = 'Ошибка, корзина не очищена';
                state.error = action.error.message;
            })
            .addCase(cartSubmitThunk.pending, (state) => {
                state.status = 'Отправляем заказ на сервер';
                state.error = null;
            })
            .addCase(cartSubmitThunk.fulfilled, (state) => {
                state.status = 'Заказ успешно отправлен на сервер';
                state.items = [];
                state.totalPrice = '0.00';
            })
            .addCase(cartSubmitThunk.rejected, (state, action) => {
                state.status = 'Не получилось отправить заказ на сервер';
                state.error = action.error.message;
            })
    }
})

export default itemsCartSlice.reducer;