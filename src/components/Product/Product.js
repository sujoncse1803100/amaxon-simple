import React from 'react';
import './Product.css'
import '../FontAwesome/Fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';


const Features = (props) => {
    return (
        <div>
            <b>{props.f.description} : {props.f.value}</b>
        </div>
    )
}


const Product = (props) => {

    return (
        <div className="product-container-div">
            <div className="image-container">
                <img src={props.product.img} alt="" />
            </div>

            <div className="desc-container">
                <h4><Link to={"/product/" + props.product.key}>{props.product.name}</Link></h4>
                <div className="desc">
                    <div className="desc-left">
                        <p>by {props.product.seller}</p>
                        <p><strong>${props.product.price}</strong></p>
                        <p>Only {props.product.stock} stock</p>
                        {props.showAddToCart && <button className="btn btn-success"
                            onClick={() => props.handleAddProduct(props.product)}
                        >
                            <span className="fontawesome">
                                <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
                            </span>
                            add to cart
                        </button>}
                    </div>

                    <div className="desc-right">
                        <div>
                            <h1><b>Features</b></h1>
                            <div >
                                {
                                    props.product.features.map(f => <Features f={f} />)
                                }
                            </div>
                        </div>
                        <p></p>
                        <p>
                            <span>{props.product.starCount} </span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star bchecked"></span>
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Product;