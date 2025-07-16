import React from 'react';
import { FaAddressBook, FaBook, FaCalendar, FaHome, FaList, FaMoneyCheck, FaShoppingCart, FaUser, FaUsers, } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';
import { MdOutlineMenuBook, MdRestaurantMenu } from "react-icons/md";
import { MdContacts } from "react-icons/md";
import useCart from '../../Hooks/useCart';
import useAdmin from '../../Hooks/useAdmin';
const Dashboard = () => {
    const [cart, refetch] = useCart()

    // TODO: get isAdmin value form the database;
    const [isAdmin] = useAdmin();
    return (
        <div className='flex'>
            {/* dashboard Side bar */}
            <div className="w-64 min-h-full bg-orange-400">
                <ul className="menu p-4">
                    {
                        isAdmin
                            ?
                            <>
                                <li> <NavLink to={'/dashboard/adminHome'}>
                                    <FaHome></FaHome>
                                    Admin Home</NavLink>
                                </li>
                                <li> <NavLink to={'/dashboard/addItems'}>
                                    <MdRestaurantMenu />
                                    Add Items</NavLink>
                                </li>
                                <li> <NavLink to={'/dashboard/manageItems'}>
                                    <FaList></FaList>
                                    Manage Items</NavLink>
                                </li>
                                <li> <NavLink to={'/dashboard/bookings'}>
                                    <FaBook></FaBook> Manage Bookings
                                </NavLink>
                                </li>
                                <li> <NavLink to={'/dashboard/users'}>
                                    <FaUsers></FaUsers> All Users
                                </NavLink>
                                </li>
                              
                            </>
                            :
                            <>
                       
                              <li> <NavLink to={'/dashboard/usernHome'}>
                                    <FaHome></FaHome>
                                    User Home</NavLink>
                                </li>
                                  <li> <NavLink to={'/dashboard/cart'}>
                                    <FaShoppingCart></FaShoppingCart>
                                    Cart  {cart.length}</NavLink>
                                </li>
                              <li> <NavLink to={'/dashboard/review'}>
                         <FaCalendar></FaCalendar>
                                    Review</NavLink>
                                </li>
                              <li> <NavLink to={'/dashboard/paymentHistory'}>
                               <FaAddressBook></FaAddressBook>
                                  Payment History</NavLink>
                                </li>
                                     {/* Shared nav links  */}
                    
                            </>
                    }
                    <div className='divider'></div>
                    <li> <NavLink to={'/'}>
                        <FaHome></FaHome>
                        Home</NavLink>
                    </li>
                    <li> <NavLink to={'/order/salad'}>
                        <MdOutlineMenuBook></MdOutlineMenuBook>
                        Menu</NavLink>
                    </li>
                    <li> <NavLink to={'/order/salad'}>
                        <MdContacts />
                        Contact</NavLink>
                    </li>
                </ul>

            </div>
            {/* dasjbpard content */}
            <div className='flex-1 p-8'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;