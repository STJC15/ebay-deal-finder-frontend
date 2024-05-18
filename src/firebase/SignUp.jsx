import React, { useState } from 'react';
import { auth } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import './SignUp.css'
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSignUp = (e) =>{
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
      console.log(userCredential);
    })
    .catch((error) => {
      console.log(error);
    });
  };
  return (
    <div className="main-container">
        <div className="sign-up-container">
            <form onSubmit={handleSignUp}>
                <h1>Create Account</h1>
                <div className="input-box">
                    <input 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}>
                    </input>
                </div>
                <div className="input-box">
                    <input 
                    type="password" 
                    placeholder="Enter your password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}>
                    </input>
                </div>
                <button type="submit" class="btn btn-primary w-100"> Sign Up </button>
            </form>
        </div>
    </div>
  )
}

export default SignUp