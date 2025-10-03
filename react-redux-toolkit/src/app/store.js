import { configureStore } from "@reduxjs/toolkit";
import pizzaReducer from "../features/pizza/pizzaSlice";
import burgerReducer from "../features/burger/burgerSlice";
import productsReducer from "../features/products/productsSlice";

const store = configureStore({
    reducer: {
        pizza: pizzaReducer,
        burger: burgerReducer,
        products: productsReducer,
    },
});

export default store;