const createSlice = require("@reduxjs/toolkit").createSlice;
const axios = require("axios");
const createAsyncThunk = require("@reduxjs/toolkit").createAsyncThunk;

const initialState = {
    loading: false,
    products: [],
    error: "",
};

const fetchProducts = createAsyncThunk("products/fetchProducts", () => {
    return axios.get("https://fakestoreapi.com/products").then(result => result.data.map(product => product.title));
});

const productsSlice = createSlice({
    name: "products",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    },
});

console.log(productsSlice);
module.exports = productsSlice.reducer;
module.exports.fetchProducts = fetchProducts;