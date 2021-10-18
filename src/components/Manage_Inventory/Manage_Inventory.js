import React from 'react';
import fakeData from '../../fakeData';

const Manage_Inventory = () => {

    const handleAddProduct = () => {

        fetch('http://localhost:3001/addProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fakeData)
        })
            .then((res) => res.json())
            .then((data) => console.log("fakeData : ", data))
            .catch((err) => {

            })

    }

    // onClick={handleAddProduct}

    return (
        <div className="text-center mt-5 mb-5">

            <form className="text-start" style={{ width: '400px', margin: '0 auto' }} >
                <p><span></span><input placeholder="Name" className="form-control" type="text" /></p>
                <p><span></span><input placeholder="Price" className="form-control" type="text" /></p>
                <p><span></span><input placeholder="Quantoty" className="form-control" type="text" /></p>
                <p><span></span><input placeholder="Product Image" className="form-control" type="file" /></p>
                <input type="submit" className="btn btn-success" value="Add product" />
            </form>
        </div>
    );
};

export default Manage_Inventory;