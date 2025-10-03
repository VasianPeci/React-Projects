import React, { use, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "./productsSlice";

function ProductsView() {
    const products = useSelector(state => state.products);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProducts());
    }, []);
    return (
        <div>
            <h2>List of Product Titles</h2>
            {products.loading && <h2>Loading...</h2>}
            {products.error && <h2>Error: {products.error}</h2>}
            {products.products}
        </div>
    );
}

export default ProductsView;