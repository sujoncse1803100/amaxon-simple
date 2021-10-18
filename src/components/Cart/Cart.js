import React from 'react';
import './Cart.css'

const Cart = (props) => {

    const value = (props.cart.reduce((value, pd) => {
        const val = Number(pd.quantity * pd.price);
        return val;
    }, 0));

    const total = (props.cart.reduce((total, pd) => total + Number(pd.quantity * pd.price), 0));

    let shop = 0;
    if (value > 35) {
        shop = 0;
    } else if (value > 15) {
        shop = 4.99;
    } else if (value > 0) {
        shop = 12.99
    }

    const newTotal = (total + shop);
    const tax = (newTotal / 10);
    const finalTotal = (newTotal + tax);

    const formatNumber = (num) => {
        const precision = num.toFixed(2);
        return Number(precision);
    }

    return (
        <div >
            <div className="my-cart-container mt-3">
                <div className="left">
                    <span>Items :</span>
                </div>
                <div className="right">
                    <span>${formatNumber(value)}</span>
                </div>
            </div><br />
            <div className="my-cart-container">
                <div className="left">
                    <span>Shipping  :</span>
                </div>
                <div className="right">
                    <span>${formatNumber(shop)}</span>
                </div>
            </div><br />
            <div className="my-cart-container">
                <div className="left">
                    <span>Total befor tax :</span>
                </div>
                <div className="right">
                    <span>${formatNumber(newTotal)}</span>
                </div>
            </div><br />
            <div className="my-cart-container">
                <div className="left">
                    <span>Estimated tax :</span>
                </div>
                <div className="right">
                    <span>${formatNumber(tax)}</span>
                </div>
            </div><br />
            <div className="my-cart-container">
                <div className="left">
                    <span className="total">Order Total :</span>
                </div>
                <div className="right">
                    <span className="total">${formatNumber(finalTotal)}</span>
                </div>
            </div><br />
            {
                props.children
            }
        </div>
    );
};

export default Cart;