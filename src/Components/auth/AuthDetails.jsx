import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
const AuthDetails = () => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser)=>{
            if(authUser){
                setUser(authUser);
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
  return (
    <div>{user ? <><button onClick={handleSignOut}> Sign Out</button> </>: <p> </p> } </div>
  )
}

export default AuthDetails