import React from 'react';
import useAdmin from '../Hooks/useAdmin';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({children}) => {
    const [isAdmin,isAdminLoading]=useAdmin()
    const {user,loading}=useAuth()
    const location =useLocation();
    if(loading || isAdminLoading){
        return <span className="loading loading-ring loading-xl"></span>
    }
    
    if(user && isAdmin){
        return children
    }
    
        return <Navigate to="/" state={location?.pathname}></Navigate>
   
};

export default AdminRoute;