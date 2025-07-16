import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAxios, { axioxSecure } from '../../../Hooks/useAxios'
import useCart from '../../../Hooks/useCart'
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
const CheckOutForm = () => {
  const stripe = useStripe()
  const [clientSecret, setClientSecret] = useState('')
  const [transactionId, setTransactionId] = useState('')
  const [error, setError] = useState('')
  const elements = useElements()
  const axiosSecure = useAxios()
  const { user } = useAuth()
  const navigate= useNavigate()
  const [cart,refetch] = useCart()
  const totalPrice = cart.reduce((total, item) => total + item.price, 0)
  useEffect(() => {

   if(totalPrice>0){
     const res = axiosSecure.post('/create-payment-intent', { price: totalPrice })
      .then(res => {
        console.log(res.data.clientSecret)
        setClientSecret(res.data.clientSecret)
      })
   }
  }, [axioxSecure, totalPrice])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) {
      return
    }
    const card = elements.getElement(CardElement)
    if (card === null) {
      return
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card
    })
    if (error) {
      console.log('payment error', error)
      setError(error.message)
    }
    else {
      console.log('Payment Method', paymentMethod)
      setError('')
    }
    // confirm payment 
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email || 'anonymous',
          name: user?.displayNamem || 'anonymous'
        }
      }
    })

    if (confirmError) {
      console.log('confirm error')
    }
    else {
      console.log(paymentIntent, 'Payment Intent')
      if (paymentIntent.status === 'succeeded') {
        console.log('transaction id', paymentIntent.id);
        setTransactionId(paymentIntent.id)

        // now save the payment in the database
        const payment = {
          email: user.email,
          price: totalPrice,
          transactionId: paymentIntent.id,
          date: new Date(),
          cartIds: cart.map(item => item._id),
          menuItemIds: cart.map(item => item.menuId),
          status: 'Pending'
        }
        const res = await axiosSecure.post('/payments', payment)
        console.log('payment saved',res.data)
        refetch()
        if(res.data?.insertedId){
        Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Thank you for Your Payment",
  showConfirmButton: false,
  timer: 1500
});
navigate('/dashboard/paymentHistory')
        }
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardElement>
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

      </CardElement>
      <button className='btn btn-primary my-4' type="submit"
        disabled={!stripe || !clientSecret}>
        Pay
      </button>
      <p className='text-red-600 text-3xl'> {error}</p>
      {transactionId && <p className='text-green-600'>Your Transaction id: {transactionId}</p>}
    </form>
  );
};

export default CheckOutForm;