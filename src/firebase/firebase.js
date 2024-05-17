import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDGj-WFghkmXbv0SQEuv5fuKuiA90hNtss",
    authDomain: "deal-finder-340a6.firebaseapp.com",
    projectId: "deal-finder-340a6",
    storageBucket: "deal-finder-340a6.appspot.com",
    messagingSenderId: "549354761325",
    appId: "1:549354761325:web:f096bce419ed3d611de364",
    measurementId: "G-WQP2FBMCG3"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app, auth};