import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxios from './useAxios'
import useAuth from '../Hooks/useAuth'

const useCart = () => {
    const axioxSecure=useAxios()
    const {user}=useAuth()
    const {refetch,data:cart=[]}=useQuery({
queryKey:['cart',user?.email],
queryFn:async()=>{
    const res=await axioxSecure.get(`/carts?email=${user.email}`)
    return res.data
}
    })
    return[cart,refetch]
//    tan stack query 
};

export default useCart;