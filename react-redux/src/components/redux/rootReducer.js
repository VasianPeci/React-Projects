import { combineReducers } from "redux";
import {pizzaReducer} from "./pizza/PizzaReducers";
import {burgerReducer} from "./burger/BurgerReducers";
import {productsReducer} from "./products/ProductsReducers";

export const rootReducer = combineReducers({
    pizza: pizzaReducer,
    burger: burgerReducer,
    products: productsReducer,
});