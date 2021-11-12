import { Elements, CardElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CardForm';

const stripePromise = loadStripe('pk_test_51JunwYGtjqsSIbseG5USXFGniJCF6Va93HIS2mhIw3eQAV4HR6T0kVHAZR0wA5o9fDofx9gl2GtmjIibwHpYJD2N00P1IQjGoe');


const Payment = ({ handlePayment }) => {
    const options = {
        clientSecret: '{{CLIENT_SECRET}}',
    };

    return (
        <Elements stripe={stripePromise}>
            {/* <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '15px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}


            /> */}
            <CheckoutForm handlePayment={handlePayment} />
            {/* <button className="btn btn-success rounded mt-3">Payment</button> */}
        </Elements>
    );
};

export default Payment;