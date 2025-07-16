import React, { useContext, useEffect,useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Swal from 'sweetalert2';
import SocialLogin from '../../componenets/SocialLogin/SocialLogin';

const Login = () => {
  const [disabled,setDisable]=useState(true)
const {singIn}= useContext(AuthContext)
const location=useLocation()
const navigate=useNavigate()
const from =location.state?.from?.pathname ||'/';
console.log(location.state)

  useEffect(() => {
    loadCaptchaEnginge(6)

  }, [])
  const handleLogin = (e) => {
    e.preventDefault()
    const form = e.target
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password)
    singIn(email,password)
    .then(result=>{
      const user=result.user
      console.log(user)
 Swal.fire({
  position: "top-end",
  icon: "success",
  title: "User logged In Successfully",
  showConfirmButton: false,
  timer: 1500
});
navigate(from,{replace:true})
    })
    .catch(error=>console.log(error))

  }
  const handleValidateCaptcha=(e)=>{
const user_captcha_value=e.target.value
if(validateCaptcha(user_captcha_value)){
setDisable(false)
}
else{
  setDisable(true)
}
  }

  return (
    <div>
      <Helmet>
                <title>Bistro Boss | Login</title>
            </Helmet>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col md:flex-row-reverse">
          <div className="text-center md:w-1/2 lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 lg:w-1/2 max-w-sm  shadow-2xl">
            <form onSubmit={handleLogin} className="card-body">
              <fieldset className="fieldset">
                <div className='form-control'>
                  <label className="label">
                    <span className='label-text'> Email</span>
                  </label>
                  <input type="email" name='email' className="input input-bordered" placeholder="Email" />
                </div>
                <div className='form-control'>
                  <label className="label">
                    <span className='label-text'> Password</span>
                  </label>
              <input type="password" name='password' className="input input-bordered" placeholder="Password" />
                </div>
                <div className='form-control'>
                  <label className="label">
                    <LoadCanvasTemplate />
                  </label>
                  <input onBlur={handleValidateCaptcha} type="text"name='captcha' className="input input-bordered" placeholder="Type the text above" />
                <button  className='btn btn-outline btn-xs w-full'>Valudate</button>
                </div>
               <div><a className="link link-hover">Forgot password?</a></div>
                <input disabled={false} className="btn btn-neutral mt-4" type="submit" value="Login" />
              </fieldset>
            </form>
            <p className='text-center'><small>New Here? <Link className='underline text-blue-500' to={'/signup'}>Create an Account</Link></small></p>
<div className=''>
             <SocialLogin></SocialLogin>
</div>
          </div>
        </div>
      
      </div>
    </div>
  );
};

export default Login;