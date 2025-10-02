const store = require("./app/store");
const { fetchProducts } = require("./features/products/productsSlice");

console.log('Initial State: ', store.getState());
const unsubscribe = store.subscribe(() => {
});

store.dispatch(fetchProducts()).then(() => {
    console.log("Final State After Update: ", store.getState());
});

unsubscribe();