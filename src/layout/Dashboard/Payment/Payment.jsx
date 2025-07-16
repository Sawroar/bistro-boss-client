import React from 'react';
import SectionTitle from '../../../componenets/SectionTitle/sectionTitle';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckOutForm from './CheckOutForm';
// TODO:
const stripePromise= loadStripe(import.meta.env.VITE_Payment_Gateway_PK)
const Payment = () => {
    return (
        <div>
            <SectionTitle heading='Payment'subHeding={'Please pay to eat'}></SectionTitle>
       <div>
     <Elements stripe={stripePromise}>
<CheckOutForm></CheckOutForm>
     </Elements>
       </div>
        </div>
    );
};

export default Payment;