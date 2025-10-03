import { createSlice } from "@reduxjs/toolkit";
import { pizza_order } from "../pizza/pizzaSlice";

const initialState = {
    burgerBuns: 1000
};

const burgerSlice = createSlice({
    name: 'burger',
    initialState,
    reducers: {
        burger_order: state => {
            state.burgerBuns--;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(pizza_order, state => {
            state.burgerBuns--;
        });
    },
});

export default burgerSlice.reducer;
export const { burger_order } = burgerSlice.actions;