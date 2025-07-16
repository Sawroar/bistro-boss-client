import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProvider';
import Swal from 'sweetalert2';
import { FaShoppingCart } from "react-icons/fa";
import useCart from '../../../Hooks/useCart';

const Navbar = () => {
  const {user,logOut}=useContext(AuthContext)
  const [cart]=useCart()
  const handleLogOut=()=>{
logOut()

.then(()=>{
   Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Logged Out Successfully",
      showConfirmButton: false,
      timer: 1500
    });
})
.catch(error=>console.log(error))
  }
    const navOptions = <>
    <li><Link to={'/'} className='hover:text-yellow-500' >Home</Link></li>
    <li><Link to={'/menu'} className='hover:text-yellow-500'>Our Menu</Link></li>
    <li><Link to={'/secret'} className='hover:text-yellow-500'>Secret</Link></li>
    <li><Link to={'/order/salad'} className='hover:text-yellow-500'>Order Now </Link></li>
    <li><Link to={'/dashboard/cart'}><button className="btn">
  <FaShoppingCart></FaShoppingCart> <div className="badge badge-sm badge-secondary">+{cart.length}</div>
</button> </Link></li>

    <li><Link to={'/signup'} className='hover:text-yellow-500'>SignUp </Link></li>
{
  user ? <><span> Hi! {user?.displayName}</span> <button onClick={handleLogOut} className='btn btn-ghost'> LogOut</button> </>: <>     <li><Link to={'/login'} className='hover:text-yellow-500'>LogIn </Link></li></>
}
  </>
  return (
    <div style={{
      backgroundColor: '#151515',
      opacity: 0.5
    }} className="navbar fixed text-white bg-opacity-30 max-w-screen-xl z-10  shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            {navOptions}
          </ul>
        </div>
        <Link to={'/'} className="btn btn-ghost text-xl">Bistro Boss</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navOptions}
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn">Button</a>
      </div>
    </div>
  );
};

export default Navbar;