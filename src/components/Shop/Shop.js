import React, { useState } from 'react';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import './Shop.css'
import Cart from '../Cart/Cart';

const Shop = () => {
    // console.log(fakeData);
    const first10 = fakeData.slice(0, 20);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);

    const handleAddProduct = (product) => {
        // console.log("product added", product);
        const newCart = [...cart, product];
        setCart(newCart);
    }
            
    return (
        <div className="shop-container">
            <div className="product-container">
                
                {
                    products.map((p) => <Product handleAddProduct={handleAddProduct} product={p}></Product>)
                }
               
            </div>
            <div className="cart-container">
                <p>Total order  : {cart.length}</p>
                <Cart cart={cart}></Cart>
                <button className="review-btn">Review your order</button>
            </div>
            
        </div>
    );
};

export default Shop;