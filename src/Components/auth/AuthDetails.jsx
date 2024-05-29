import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { Link } from "react-router-dom";
import { auth } from '../../firebase/firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from "react-router-dom";
import './AuthDetails.css'
import { BsFillPersonFill } from "react-icons/bs";
import axios from 'axios';
const AuthDetails = ({setUserData}) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate()
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser)=>{
            if(authUser){
                setUser(authUser);
                fetchUserData(authUser);
            }
            else{
                setUser(null);
            }
        });
        return () => {
            unsubscribe();
        }
    },[]);
    const handleSignOut = () =>{
        signOut(auth).then(() => {
            console.log("User Signed Out");
        })
        .catch((error) => {
            console.log(error);
        })
    }
    const fetchUserData = async (authUser) => {
      authUser.getIdToken().then((idToken)=>{axios.get('https://o8vh9j1y5k.execute-api.us-east-1.amazonaws.com/prod/get_user_data', {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${idToken}`
              }
          }).then(response=>{
          console.log(response.data)
          setUserData(response.data);})}) // Assuming setUserData is a function prop for setting user data in parent component
       .catch(error => {
          console.error('Error getting ID token:', error.message)});
    };

    const handleMyListClick = () => {
      if (user) {
        fetchUserData(user).then(() => {
            navigate('/user-item-list');
        }).catch(error => {
            console.error('Failed to fetch user data:', error);
        });
      } else {
          console.log("User is not defined");
          navigate('/login');
      }
    };
  return (
    <div className="user-auth-container">{user ?  
    <Dropdown>
        <Dropdown.Toggle variant="secondary" id="">
        <BsFillPersonFill size={20}/>
          {/* {user.email} */}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={handleMyListClick}>My List</Dropdown.Item>
          <Dropdown.Item onClick={handleSignOut} href="#">Sign Out</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
    : 
    <div className="login-signup-container">
    <Link to="/login"> <button className="btn btn-outline-primary custom-outline-primary">Log In</button> </Link>
    <Link to="/signup"> <button class="btn btn-primary">Sign Up</button> </Link>
  </div> } </div>
  )
};

export default AuthDetails