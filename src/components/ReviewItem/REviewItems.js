import React from 'react';
import '../FontAwesome/Fontawesome'
import '../Product/Product.css';
import { Link } from 'react-router-dom';


const ReviewItems = (props) => {
    const { img, name, price, quantity, key } = props.product;

    return (
        <div className="product-container-div">
            <div className="image-container">
                <img src={img} alt="" />
            </div>

            <div className="desc-container">
                <h5><Link to={"/product/" + props.product.key}>{name}</Link></h5>
                <div className="">
                    <div className="">
                        <span>by {props.product.seller}</span><br />
                        <span><strong>Price : ${price}</strong></span><br />
                        <span><strong>Order quantity : {quantity}</strong></span><br />
                        <span><strong>Total price : ${quantity * price}</strong></span>
                        <div className="d-flex">
                            {
                                <button className="btn btn-success rounded"
                                    onClick={() => props.handleRemoveProduct(key)}
                                >
                                    -1
                                </button>
                            }
                            <span className="ms-3 me-3"><h3>  {quantity} </h3></span>
                            {
                                <button className="btn btn-success rounded"
                                    onClick={() => props.handleAddProduct(props.product)}
                                >
                                    +1
                                </button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewItems;