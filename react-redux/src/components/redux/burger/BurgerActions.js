import { ORDER_BURGER } from "./BurgerTypes";

export const orderBurger = (number = 1) => {
    return {
        type: ORDER_BURGER,
        payload: number
    };
};