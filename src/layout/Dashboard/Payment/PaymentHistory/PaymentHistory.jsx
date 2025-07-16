import React from 'react';
import useAuth from '../../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../../Hooks/useAxios';

const PaymentHistory = () => {
    const {user}=useAuth()
    const axiosSecure =useAxios()
    const {data:payments=[]}=useQuery({
        queryKey: ['payments',user.email],
        queryFn:async()=>{
            const res= await axiosSecure.get(`/payments/${user.email}`)
            return res.data
        }
    })
    return (
        <div>
            <h2> This is Payment History :{payments.length}</h2>
            {console.log(payments)}
            <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th>#</th>
        <th>Price</th>
        <th>Transaction Id</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {payments.map((payment,index)=>   <tr key={payment._id}>
        <th>{index +1}</th>
        <td>{Math.floor(payment.price)}</td>
        <td>{payment.transactionId}</td>
        <td>{payment.status}</td>
   
        <td>Blue</td>
      </tr>)}
    
          
    </tbody>
  </table>
</div>
        </div>
    );
};

export default PaymentHistory;