import React from 'react';
import useAuth from '../../Hooks/useAuth'
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAxios from '../../Hooks/useAxios';
import useCart from '../../Hooks/useCart';
const Foodcard = ({ item }) => {
  const { name, image, price, recipe,_id } = item;
  const[cart,refetch]=useCart()
  const {user}=useAuth()
  const axioxSecure=useAxios()
  const navigate=useNavigate()
  const location=useLocation()
  const handleAddToCart = () => {
        if(user && user.email){
// send cart Item to the database


console.log(user.email)
const cartItem={
  menuId:_id,
email:user.email,
name,image,price
}
axioxSecure.post('carts',cartItem)
.then(res=>{
  console.log(res.data)
  if(res.data.insertedId){
     Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${name} added To your Cart`,
        showConfirmButton: false,
        timer: 1500
      });

      //  Refetch the cart to update the cart items count
refetch()
  }
})

    }
else{

Swal.fire({
  title: "You are not Logged In",
  text: "Please! login to add to the cart",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, Login!"
}).then((result) => {
  if (result.isConfirmed) {
  // send the user to the login page
navigate('/login',{state:{from:location}})
  }
});
}

  }

  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img
          src={image}
          alt="Shoes" />
      </figure>
      <div className="card-body flex flex-col items-center">
        <p className='bg-slate-900 text-white absolute px-4 -mt-64 mr-8 right-0'>${price}</p>
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions justify-end">
          <button onClick={handleAddToCart} className='btn btn-outline bg-slate-100 border-0 border-b-4 border-orange-400 hover:text-orange-400 hover:bg-black'>Add To Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Foodcard;