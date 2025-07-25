import React, { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';

const SocialLogin = () => {
    const {googleSignIn}=useContext(AuthContext)
    const axioxPublic=useAxiosPublic()
    const navigate=useNavigate()
    const handelGoogleSignIn=()=>{
googleSignIn()
.then(result=>{
    console.log(result)
    const userInfo={
        email: result.user?.email,
        name:result.user?.displayName
    }
axioxPublic.post('/users',userInfo)
.then(res=>{
    console.log(res.data);
    navigate('/')
})
})
    }
    return (
        <div className='p-8'>
            <div className='divider'></div>
            <button onClick={handelGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5]">
  <svg aria-label="Google logo" width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
  <p className='px-18'>Login with Google</p>
</button>
        </div>
    );
};

export default SocialLogin;