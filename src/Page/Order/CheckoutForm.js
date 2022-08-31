import React, { useEffect, useState } from 'react';
import {
    CardElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';

const CheckoutForm = ({ orders }) => {
    const {_id, total, email } = orders;
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('')
    const [clientSecret, setClientSecret] = useState("");
    const [success, setSuccess] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const [proccessing, setProccessing] = useState(false);

    useEffect(() => {
        fetch("https://venia-cosmetic-sever-side-jonied-mirza-shakib.vercel.app/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ total }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data?.clientSecret) {
                    setClientSecret(data.clientSecret)
                }

            });
    }, [total]);




    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        setCardError(error?.message || '')
        setSuccess('')
        setProccessing(true)
        // confirm card payment
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: email,
                    },
                },
            },
        );
        if (intentError) {
            setCardError(intentError.message)
            setProccessing(false)
        } else {
            setCardError('')
            setTransactionId(paymentIntent.id)
            setSuccess('Congrats!your payment is successful')
            // update data
            const payments = {
                totalPrice: _id,
                transactionId: paymentIntent.id
            }
            fetch(`https://venia-cosmetic-sever-side-jonied-mirza-shakib.vercel.app/order/${_id}`, {
                method: 'PATCH', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payments),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Success:', data);
                })
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
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
                />
                <button className='btn btn-success btn-xs mt-4' type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
            </form>
            {
                cardError && <p className='text-error'>{cardError}</p>
            }
            {
                success && <div className='text-success'>
                    <p>{success}</p>
                    <p>Your Transaction Id: {transactionId}</p>
                </div>
            }
        </>
    );
};

export default CheckoutForm;