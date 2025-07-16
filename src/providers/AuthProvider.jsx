import { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from '../Firebase/firebase.config';
import useAxiosPublic from '../Hooks/useAxiosPublic';
 export const AuthContext=createContext(null)
 const auth = getAuth(app);
const AuthProvideer = ({children}) => {
    const axioxPublic=useAxiosPublic()
const [user,setUser]=useState(null)
const [loading,setLoading]=useState(true)
const googlePovider=new GoogleAuthProvider()
// Create User 

const createUser=(email,passowrd)=>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth,email,passowrd,)
}

// Sign In User

const singIn=(email,passowrd)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth,email,passowrd)
}
const updateUserProfile=(name)=>{
  return  updateProfile(auth.currentUser, {
  displayName: name,
})

}
// Sign In With Google
const googleSignIn=()=>{
        setLoading(true)
        return signInWithPopup(auth,googlePovider)
}

// Log Out User 
const logOut=()=>{
    setLoading(true)
    return signOut(auth)
}

// Observer 
useEffect(()=>{
 const unsubscribe=onAuthStateChanged(auth,(currentUser)=>{
    setUser(currentUser)
    if(currentUser){
// get token and store client
const userInfo={
    email:currentUser.email
}
axioxPublic.post('/jwt',userInfo)
.then(res=>{
    if(res.data.token){
        localStorage.setItem('access-token',res.data.token)
    }
})
    }
    else{
// TODO:remove token(if token stored in the client side like:Local Storage,caching,in memory)
localStorage.removeItem('access-token')    
}
    
    setLoading(false)
  return ()=>{
    return unsubscribe()
  }
 })   

},[axioxPublic])




const authInfo={
user,loading,createUser,singIn,logOut,updateUserProfile,googleSignIn
}

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvideer;