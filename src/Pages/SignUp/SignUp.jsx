import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import SocialLogin from '../../componenets/SocialLogin/SocialLogin';

const SignUp = () => {
  const navigate = useNavigate()
  const axioxPublic = useAxiosPublic()
  const { createUser, updateUserProfile } = useContext(AuthContext)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const onSubmit = (data) => {
    console.log(data)
    createUser(data.email, data.password)
      .then(result => {
        const loggedUser = result.user;
        console.log(loggedUser)
        updateUserProfile(data.name)
          .then(() => {
            // create user entry in the database 
            const userInfo = {
              name: data.name,
              email: data.email
            }
            axioxPublic.post('/users', userInfo)
              .then(res =>  { 
                if (res.data.insertedId) {
                  console.log('user added to the data base')
                  reset()
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Account Created Successfully",
                    showConfirmButton: false,
                    timer: 1500
                  });
                  navigate('/login')
                }
              })

          })
          .catch(error => console.log(error))
      })
  }

  return (
    <div>
      <>
        <Helmet>
          <title>Bistro Boss | Signup</title>
        </Helmet>
      </>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col md:flex-row-reverse">
          <div className="text-center md:w-1/2 lg:text-left">
            <h1 className="text-5xl font-bold">Sign Up now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 lg:w-1/2 max-w-sm  shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <fieldset className="fieldset">
                <div className='form-control'>
                  <label className="label">
                    <span className='label-text'> Name</span>
                  </label>
                  <input type="text"  {...register("name", { required: true })} name='name' className="input input-bordered" placeholder="Name" />
                  {errors.name && <span className='text-red-500'>Name is required</span>}
                </div>
                <div className='form-control'>
                  <label className="label">
                    <span className='label-text'> Email</span>
                  </label>
                  <input type="email" {...register("email", { required: true })} name='email' className="input input-bordered" placeholder="Email" />
                  {errors.email && <span className='text-red-500'>Email is required</span>}
                  <p>{errors.email?.message}</p>
                </div>
                <div className='form-control'>
                  <label className="label">
                    <span className='label-text'> Password</span>
                  </label>
                  <input type="password" {...register("password", { required: true, pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, minLength: 6, maxLength: 20 })} name='password' className="input input-bordered" placeholder="Password" />

                  {errors.password?.type === 'required' && <p className='text-red-500'>Password Is Reqiured </p>}
                  {errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be 6 Characters</p>}
                  {errors.password?.type === 'maxLength' && <p className='text-red-500'>Password must be less then 20 Characters</p>}
                  {errors.password?.type === 'pattern' && <p className='text-red-500'>Password must have one uppercase,one lowercase,one number and one special character</p>}
                </div>
                <div><a className="link link-hover">Forgot password?</a></div>
                <input className="btn btn-neutral mt-4" type="submit" value="SignUp" />
              </fieldset>
            </form>
            <p className='text-center'><small>Already Have an Account? <Link className='underline text-blue-500' to={'/login'}>Login</Link></small></p>
          <div className=''>
             <SocialLogin></SocialLogin>
</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;