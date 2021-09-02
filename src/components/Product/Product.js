import React from 'react';
import './Product.css'
import '../FontAwesome/Fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import Fontawesome from '../FontAwesome/Fontawesome';
import {  faShoppingCart } from '@fortawesome/free-solid-svg-icons'



const Product = (props) => {
    // console.log(props);
    return (
        <div className="product-container-div">
            <div className="image-container">
                <img src={props.product.img} alt="" />
            </div>

            <div className="desc-container">
                <h5>{props.product.name}</h5>
                <div className="desc">
                    <div className="desc-left">
                        <p>by {props.product.seller}</p>
                        <p><strong>${props.product.price}</strong></p>
                        <p>Only {props.product.stock} stock</p>
                        <button className="button"
                            onClick={() => props.handleAddProduct(props.product)}
                        >
                            <span className="fontawesome">
                            <FontAwesomeIcon icon={ faShoppingCart }></FontAwesomeIcon>
                            </span>
                            add to cart
                        </button>
                    </div>
                    <div className="desc-right">
                        <p>
                            <span>{props.product.starCount} </span>
                             <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star bchecked"></span>
                        </p>
                        <p><b>Features</b></p>
                        <p></p>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default Product;