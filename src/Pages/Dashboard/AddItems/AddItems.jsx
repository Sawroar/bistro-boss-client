import React from 'react';
import SectionTitle from '../../../componenets/SectionTitle/sectionTitle';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../../Hooks/useAxiosPublic'
import useAxios, { axioxSecure } from '../../../Hooks/useAxios';
import { MdOutlineRestaurantMenu } from "react-icons/md";
import Swal from 'sweetalert2';
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const AddItems = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic()
  const axiosSecure = useAxios()
  const onSubmit = async (data) => {
    console.log(data)
    // image upload to imgbb and then get an url
    const imageFile = { image: data.image[0] }
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    if (res.data.success) {
      // now send the menu item data 
      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: res.data.data.display_url
      }
      const menuRes = await axiosSecure.post('/menu', menuItem)
      console.log(menuRes)
      if (menuRes.data.insertedId) {
        // show success popup
        reset()
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name} is added to the menu`,
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
    console.log(res.data)

  }
  return (
    <div>
      <SectionTitle heading={'add an item'} subHeding={'what\'s new'} ></SectionTitle>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='form-control w-full my-6 '>
            <label className='label'>
              <span className='label-text'>Recipe Name*</span>
            </label>
            <input type="text"
              placeholder='Recipe Name'
              {...register('name', { required: true })} className='input input-bordered w-full' />
          </div>
          <div className='flex gap-6'>
            {/* Category */}
            <div className='form-control w-full my-6 '>
              <label className='label'>
                <span className='label-text'>Category*</span>
              </label>
              <select
                {...register('category', { required: true })} defaultValue="Pick a Framework" className="select select-bordered w-full select-info">
                <option disabled={true}>Select a Category</option>
                <option value="salad">Salad</option>
                <option value="soup">Pizza</option>
                <option value="pizza">Soup</option>
                <option value="dessert">Desserts</option>
                <option value="drinks">Drinks</option>
              </select>
            </div>
            {/* Price */}
            <div className='form-control w-full my-6 '>
              <label className='label'>
                <span className='label-text'>Price*</span>
              </label>
              <input type="number"
                placeholder='Price'
                {...register('price', { required: true })} className='input input-bordered w-full' />
              {/* Recipe Details */}
            </div>
          </div>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Recipe Details</legend>
            <textarea {...register('recipe')} className="textarea h-24 w-full" placeholder="Recipe Details"></textarea>
          </fieldset>
          <div className='form-control w-full my-6 '>
            <input {...register('image', { required: true })} type="file" className="file-input w-full" />
          </div>
          <button className='btn bg-orange-500'>Add Item  <MdOutlineRestaurantMenu className='ml-4' /> </button>
        </form>
      </div>
    </div>
  );
};

export default AddItems;