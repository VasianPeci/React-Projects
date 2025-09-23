import React, { useEffect } from "react";
import { fetchProducts } from './redux';
import { useSelector, useDispatch } from 'react-redux';

function ProductsContainer() {
    const productsData = useSelector(state => state.products);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    return (
        <div>
            {productsData.loading && <p>Loading...</p>}
            {productsData.error && <p>{productsData.error}</p>}
            {productsData.products && <p>{productsData.products.map(product => <p>{product}</p>)}</p>}
        </div>
    );
}

export default ProductsContainer;