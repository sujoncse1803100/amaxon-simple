import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';



const ProductDetails = () => {
    const { productkey } = useParams();
    const [product, setProduct] = useState([]);

    useEffect(() => {

        fetch('http://localhost:3001/product/' + productkey)
            .then(res => res.json())
            .then(result => {
                setProduct(result);
            })
            .catch(err => {
                console.log('Error : ', err);
            })
    }, [productkey])

    const myStyle = {
        width: '100%',
        margin: '0 auto',
        textAlign: 'center'
    }

    return (
        <div>
            <h3 style={myStyle}>Your Product Details</h3>
            <hr style={{ width: '70%', margin: '0 auto' }} />
            <div className="row  d-flex justify-content-center">
                <div className="col-md-9">
                    {
                        product[0] &&
                        <Product showAddToCart={false} product={product[0]} />
                    }
                </div>

            </div>

        </div>
    );
};

export default ProductDetails;