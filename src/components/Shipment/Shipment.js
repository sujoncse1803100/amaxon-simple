import React, { useContext, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';

const Shipment = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const addressRef = useRef();
    const phoneRef = useRef();

    const history = useHistory();

    const [userLoggedIn, setUserLoggedIn] = useContext(UserContext);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        const savedCart = getDatabaseCart();
        const client = {
            name: userLoggedIn.displayName,
            email: userLoggedIn.email,
            phoneURL: userLoggedIn.photoURL
        }
        const orderDetails = { client: client, products: savedCart, shipment: data, orderTime: new Date() };
        console.log(orderDetails);


        fetch('https://stormy-chamber-95780.herokuapp.com/addOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderDetails)
        })
            .then(response => response.json())
            .then(result => {
                if (result) {
                    processOrder();
                    alert('Order successful');
                    history.push('/shop')
                }
            })


        // nameRef.current.value = '';
        // emailRef.current.value = '';
        // addressRef.current.value = '';
        // phoneRef.current.value = '';

        console.log('shipment : ', data)
    };


    // console.log(watch("example"));

    return (
        <form className="form-control  text-center" onSubmit={handleSubmit(onSubmit)}>
            <input ref={nameRef} defaultValue={userLoggedIn.displayName} className="m-1  w-50" placeholder="Your name" {...register("name", { required: true })} /> <br />
            {errors.name && <span>Name is required</span>} <br />
            <input ref={emailRef} defaultValue={userLoggedIn.email} className="m-1  w-50" placeholder="Your email" {...register("email", { required: true })} /> <br />
            {errors.email && <span>Email is required</span>} <br />
            <input ref={addressRef} className="m-1  w-50" placeholder="Your address" {...register("address", { required: true })} /> <br />
            {errors.address && <span>address is required</span>} <br />
            <input ref={phoneRef} className="m-1  w-50" placeholder="Your phone" {...register("phone", { required: true })} /> <br />
            {errors.phone && <span>Phon is required</span>} <br />
            <input type="submit" />
        </form>
    );
};

export default Shipment;