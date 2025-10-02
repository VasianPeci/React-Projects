const configureStore = require("@reduxjs/toolkit").configureStore;
const pizzaReducer = require("../features/pizza/pizzaSlice");
const burgerReducer = require("../features/burger/burgerSlice");
const productsReducer = require("../features/products/productsSlice");

const store = configureStore({
    reducer: {
        pizza: pizzaReducer,
        burger: burgerReducer,
        products: productsReducer,
    },
});

module.exports = store;