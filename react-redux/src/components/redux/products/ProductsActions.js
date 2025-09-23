import { FETCH_REQUEST, FETCH_SUCCESS, FETCH_ERROR } from './ProductsTypes';
import axios from 'axios';

export const fetchRequest = () => {
    return {
        type: FETCH_REQUEST
    };
};

export const fetchSuccess = (products) => {
    return {
        type: FETCH_SUCCESS,
        payload: products
    };
};

export const fetchError = (error) => {
    return {
        type: FETCH_ERROR,
        payload: error
    };
};

export const fetchProducts = () => {
    return (dispatch) => {
        dispatch(fetchRequest());
        axios.get('https://fakestoreapi.com/products').then(res => {
            const products = res.data.map(product => product.title);
            dispatch(fetchSuccess(products));
        }).catch(error => {
            const errorMessage = error.message;
            dispatch(fetchError(errorMessage));
        });
    };
};