import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';



const ProductDetails = () => {
    const { productkey } = useParams();
    const product = fakeData.find(data => data.key === productkey);
    console.log(product);

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
                    <Product showAddToCart={false} product={product} />
                </div>

            </div>

        </div>
    );
};

export default ProductDetails;