import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DiscountItems from './Components/Discount/Discount';
import SearchBar from './Components/SearchBar/SearchBar';
import SignIn from './Components/SignIn/SignIn';
import SignUp from './firebase/SignUp'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header/Header'
import { TailSpin } from 'react-loader-spinner';
import { auth } from './firebase/firebase';
import { Bars, SpinningCircles } from 'react-loading-icons'
import MainLayout from './Components/MainLayout/MainLayout'
import UserItem from './Components/UserItem/UserItem'
function App() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetch, setIsFetch] = useState(false);
  const [idToken, setIdToken] = useState(null);
  const [userData, setUserData] = useState([]);
  const [initializing, setInitializing] = useState(true);
  const [currentUser, setCurrentUser] = useState();

  //Handle user state changes
  function onAuthStateChanged(user) {
    setCurrentUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/'
                element = {<MainLayout setResults={setResults} setIsLoading={setIsLoading} setIsFetch={setIsFetch} setUserData={setUserData} currentUser={currentUser}/>}>
          <Route 
              path="/discount"
              element={
              <div>
                {isLoading ? (
                <div className="loading-icon">
                  <TailSpin color={'#D3D3D3'} height={80} width={80} radius={10}/>
                </div>) : isFetch ? <DiscountItems props={results} userData={userData} /> : <h1 className="discount-items-container">No results found</h1>}</div>}
            />
            <Route path='/user-item-list' element={<UserItem props={userData}/>}/>
          </Route>
          <Route path="/login" element={<SignIn/>} />
          <Route path='/signup' element={<SignUp/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
