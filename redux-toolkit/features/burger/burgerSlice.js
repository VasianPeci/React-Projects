const createSlice = require('@reduxjs/toolkit').createSlice;
const pizzaActions = require('../pizza/pizzaSlice').pizzaActions;

const initialState = {
    burgerBuns: 1000,
};

const burgerSlice = createSlice({
    name: 'burger',
    initialState,
    reducers: {
        burger_order: (state) => {
            state.burgerBuns--;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(pizzaActions.pizza_order, (state) => {
            state.burgerBuns--;
        });
    },
});

module.exports = burgerSlice.reducer;
module.exports.burgerActions = burgerSlice.actions;