import React, { useState } from 'react';
import { auth } from '../../firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import './SignIn.css'
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSignIn = (e) =>{
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
      console.log("id_token:",userCredential._tokenResponse.idToken);
      navigate('/');
    })
    .catch((error) => {
      console.log(error);
    });
  };
  return (
    <div className="main-container">
      <div className="sign-in-container">
          <form onSubmit={handleSignIn}>
              <h1>Log In</h1>
              <div className="input-box">
                <input 
                  type="email" 
                  placeholder="Email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required>
                </input>
              </div>
              <div className="input-box">
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required>
                </input>
              </div>
              <div className="signup-link">
                <p>Don't have an account? <Link to="/signup">Create one</Link></p>
              </div>
              <button type="submit" class="btn btn-primary w-100"> Log In </button>
          </form>
      </div>
    </div>
  )
}

export default SignIn