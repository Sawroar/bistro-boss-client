import React, { useContext } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

const PrivateRoute = ({children}) => {
       const {user,loading}=useContext(AuthContext) 
const location=useLocation()
const navigate=useNavigate()


       if(loading){
        return  <span className="text-center loading loading-ring loading-xl"></span>
       }

   if(user){
    return children
   }
    return (
       <Navigate to={'/login'} state={{from:location}} replace></Navigate>
    );
};

export default PrivateRoute;