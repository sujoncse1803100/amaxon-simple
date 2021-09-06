import React from 'react';
// import { Card, Button } from 'react-bootstrap';
import '../FontAwesome/Fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import '../Product/Product.css';
import { Link } from 'react-router-dom';


const REviewItems = (props) => {
    // console.log(props.product);
    const { img, name, price, quantity, key } = props.product;

    return (


        <div className="product-container-div">
            <div className="image-container">
                <img src={img} alt="" />
            </div>

            <div className="desc-container">
                <h5><Link to={"/product/" + props.product.key}>{name}</Link></h5>
                <div className="desc">
                    <div className="desc-left">
                        <span>by {props.product.seller}</span><br />
                        <span><strong>Price : ${price}</strong></span><br />
                        <span><strong>Order quantity : {quantity}</strong></span><br />
                        <span><strong>Total price : ${quantity * price}</strong></span>
                        <p></p>

                        {<button className="button"
                            onClick={() => props.handleRemoveProduct(key)}
                        >
                            <span className="fontawesome">
                                <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
                            </span>
                            remove
                        </button>}
                    </div>


                </div>
            </div>
        </div>
    );
};

export default REviewItems;