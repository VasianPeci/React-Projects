import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react";

const initialState = {
    loading: false,
    products: [],
    error: "",
};

export const fetchProducts = createAsyncThunk("products/fetchProducts", () => {
    return axios.get("https://fakestoreapi.com/products").then(result => result.data.map(product => product.title));
});

const productsSlice = createSlice({
    name: "products",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, state => {
            state.loading = true;
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export default productsSlice.reducer;