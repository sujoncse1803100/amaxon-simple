import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';

const Shipment = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    const [userLoggedIn, setUserLoggedIn] = useContext(UserContext);

    console.log(watch("example"));

    return (
        <form className="form-control  text-center" onSubmit={handleSubmit(onSubmit)}>
            <input defaultValue={userLoggedIn.displayName} className="m-1  w-50" placeholder="Your name" {...register("name", { required: true })} /> <br />
            {errors.name && <span>Name is required</span>} <br />
            <input defaultValue={userLoggedIn.email} className="m-1  w-50" placeholder="Your email" {...register("email", { required: true })} /> <br />
            {errors.email && <span>Email is required</span>} <br />
            <input className="m-1  w-50" placeholder="Your address" {...register("address", { required: true })} /> <br />
            {errors.address && <span>address is required</span>} <br />
            <input className="m-1  w-50" placeholder="Your phone" {...register("phone", { required: true })} /> <br />
            {errors.phone && <span>Phon is required</span>} <br />
            <input type="submit" />
        </form>
    );
};

export default Shipment;