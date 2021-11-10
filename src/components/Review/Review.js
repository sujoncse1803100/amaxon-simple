import React, { useState, useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager'
import Cart from '../Cart/Cart';
import ReviewItems from '../ReviewItem/ReviewItems';
import placeOrderImage from '../../images/giphy.gif';
import { addToDatabaseCart } from '../../utilities/databaseManager';
import { useHistory } from 'react-router';


const Review = () => {

    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    document.title = 'Review';

    // setOrderPlaced(orderPlaced); ///for this...too many re-render problem created

    const history = useHistory();

    useEffect(() => {

        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        fetch('https://stormy-chamber-95780.herokuapp.com/productsByKeys', {
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
    }, [])



    const handleRemoveProduct = (productKeys) => {
        const product = cart.find(pd => pd.key === productKeys);
        const counts = product.quantity;
        if (counts > 1) {
            product.quantity = counts - 1;
            const newcart = cart.filter(pd => pd);
            setCart(newcart);
            addToDatabaseCart(product.key, product.quantity);
        } else {
            const newcart = cart.filter(pd => pd.key !== productKeys);
            setCart(newcart);
            removeFromDatabaseCart(productKeys);
        }
    }


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

    const style = {
        borderRight: '1px solid black'
    }

    const orderProceedCheckout = () => {
        history.push('/shipment');
    }

    let totalOrder = cart.reduce((to, pd) => to + pd.quantity, 0);;

    let thankYou;
    if (orderPlaced) {
        thankYou = <img src={placeOrderImage} alt="" />
    }

    return (
        <div>
            <div className="row ms-3">
                <div style={style} className="col-md-9">
                    {
                        cart.map(pd => <ReviewItems handleAddProduct={handleAddProduct} handleRemoveProduct={handleRemoveProduct} key={pd.key} product={pd} />)
                    }
                    {thankYou}
                </div>
                <div className="col-md-3">
                    <p>Total order  : {totalOrder}</p>
                    <Cart cart={cart}>
                        <button
                            onClick={orderProceedCheckout}
                            className="btn btn-danger  rounded-pill">
                            Proceed CheckOut
                        </button>
                    </Cart>
                </div>
            </div>
        </div>


    );
};

export default Review;