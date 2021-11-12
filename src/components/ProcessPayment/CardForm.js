import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import React, { useState } from 'react';

const CheckoutForm = ({ handlePayment }) => {
    const stripe = useStripe();
    const elements = useElements();

    const [paymentError, setPaymentError] = useState(null);
    const [paymentSuccess, setPaymentSuccess] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        // const result = await stripe.confirmPayment({
        //     //`Elements` instance that was used to create the Payment Element
        //     elements,
        //     confirmParams: {
        //         return_url: "https://my-site.com/order/123/complete",
        //     },
        // });

        if (error) {
            console.log(error.message);
            setPaymentError(error.message);
            setPaymentSuccess(null);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setPaymentSuccess(paymentMethod.id);
            handlePayment(paymentMethod.id)
            setPaymentError(null);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement />
                <button type="submit" className="btn btn-success rounded mt-3" disabled={!stripe}>
                    Submit Pay
                </button>
            </form>
            {
                paymentError && <p style={{ color: 'red' }}>{paymentError}</p>
            }
            {
                paymentSuccess && <p style={{ color: 'green' }}>{paymentSuccess}</p>
            }
        </div>
    )
};

export default CheckoutForm;