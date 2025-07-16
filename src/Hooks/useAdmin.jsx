import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from './useAuth';
import useAxios from './useAxios';

const useAdmin = () => {
    const {user}=useAuth()
    const axioxSecure =useAxios()
   const {data:isAdmin,isPending:isAdminLoading}=useQuery({
    queryKey:[user?.email,'isAdmin'],
    queryFn:async()=>{
const res=await axioxSecure.get(`/users/admin/${user.email}`)
console.log(res.data)  
return res.data?.admin
}
   })
   return [isAdmin,isAdminLoading]
};

export default useAdmin;