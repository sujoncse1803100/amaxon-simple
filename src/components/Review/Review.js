import React, { useState, useEffect } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager'
import Cart from '../Cart/Cart';
import REviewItems from '../ReviewItem/REviewItems';
import placeOrderImage from '../../images/giphy.gif';
import { addToDatabaseCart } from '../../utilities/databaseManager';


const Review = () => {

    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    useEffect(() => {
        const savedCart = getDatabaseCart();
        // console.log(savedCart);
        const productKeys = Object.keys(savedCart);

        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts);
    }, [])

    const handleRemoveProduct = (productKeys) => {
        // console.log("product remove ", productKeys);
        const product = cart.find(pd => pd.key === productKeys);
        const counts = product.quantity;
        if (counts > 1) {
            product.quantity = counts - 1;
            const newcart = cart.filter(pd => pd);
            setCart(newcart);
        } else {
            const newcart = cart.filter(pd => pd.key !== productKeys);
            setCart(newcart);
            removeFromDatabaseCart(productKeys);
        }
    }


    const handleAddProduct = (product) => {
        // console.log("product added", product);
        const toBeAddedkey = product.key;

        const sameProduct = cart.find(pd => pd.key === toBeAddedkey);
        let count = 1;
        let newCart;

        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedkey);
            newCart = [...others, sameProduct];
            // newCart = [...cart, product];
        } else {
            product.quantity = count;
            newCart = [...cart, product];
        }

        setCart(newCart);
        addToDatabaseCart(product.key, count);

    }

    const style = {
        borderRight: '1px solid black'
    }

    const orderPlaceButton = () => {
        setCart([]);
        setOrderPlaced(true);
        processOrder();
    }

    const totalOrder = cart.reduce((to, pd) => to + pd.quantity, 0);

    let thankYou;
    if (orderPlaced) {
        thankYou = <img src={placeOrderImage} alt="" />
    }

    return (
        <div>
            <div className="row ms-3">
                <div style={style} className="col-md-9">
                    {
                        cart.map(pd => <REviewItems handleAddProduct={handleAddProduct} handleRemoveProduct={handleRemoveProduct} key={pd.key} product={pd} />)
                    }
                    {thankYou}
                </div>
                <div className="col-md-3">
                    <p>Total order  : {totalOrder}</p>
                    <Cart cart={cart}>
                        <button
                            onClick={orderPlaceButton}
                            className="btn btn-danger m-5 rounded-pill">
                            place order
                        </button>
                    </Cart>
                </div>
            </div>
        </div>


    );
};

export default Review;