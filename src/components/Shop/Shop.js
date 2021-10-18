import React, { useState, useEffect } from 'react';
import Product from '../Product/Product';
import './Shop.css'
import Cart from '../Cart/Cart';
import { addToDatabaseCart } from '../../utilities/databaseManager';
import { getDatabaseCart } from '../../utilities/databaseManager'
import { Link } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);


    useEffect(() => {
        fetch('http://localhost:3001/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])



    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);


        fetch('http://localhost:3001/productsByKeys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
            .then(res => res.json())
            .then(data => {
                console.log('Data : ', data);
                const cartProducts = productKeys.map(key => {
                    const product = data.find(pd => pd.key === key);
                    product.quantity = savedCart[key];
                    return product;
                });
                setCart(cartProducts);
            })
            .catch((error => console.log(error)));

        // if (products.length) {
        //     const prev_products = productKeys.map(key => {
        //         const product = products.find(pd => pd.key === key);
        //         product.quantity = savedCart[key];
        //         return product;
        //     })
        //     setCart(prev_products);
        // }


    }, [products]);

    const handleAddProduct = (product) => {
        const toBeAddedkey = product.key;

        const sameProduct = cart.find(pd => pd.key === toBeAddedkey);
        let count = 1;
        let newCart;

        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedkey);
            newCart = [...others, sameProduct];
        } else {
            product.quantity = count;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }
    const totalOrder = cart.reduce((to, pd) => to + pd.quantity, 0);

    return (
        <div className="row ">
            <div className="col-md-9 product-container">
                {
                    products.map((p) => <Product key={p.key} showAddToCart={true} handleAddProduct={handleAddProduct} product={p}></Product>)
                }
            </div>
            <div className="col-md-3">
                <p>Total order  : {totalOrder}</p>
                <Cart cart={cart}>
                    <Link to="/review"><button className="btn btn-danger rounded-pill">Review Order</button></Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;