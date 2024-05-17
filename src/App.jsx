import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DiscountItems from './Components/Discount/Discount';
import SearchBar from './Components/SearchBar/SearchBar';
import SignIn from './Components/SignIn/SignIn';
import SignUp from './firebase/SignUp'
import AuthDetails from './Components/auth/AuthDetails';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header/Header'
import { TailSpin } from 'react-loader-spinner';

import { Bars, SpinningCircles } from 'react-loading-icons'
function App() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetch, setIsFetch] = useState(false);
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path='/' 
              element = {<Header setResults={setResults} setIsLoading={setIsLoading} setIsFetch={setIsFetch} />}/>
        <Route 
          path="/discount"
          element={<div>
            <Header setResults={setResults} setIsLoading={setIsLoading} setIsFetch={setIsFetch}/>
            {isLoading ? (
            <div className="loading-icon">
              <TailSpin color={'#D3D3D3'} height={80} width={80} radius={10}/>
            </div>) : isFetch ? <DiscountItems props={results} /> : <h1 className="discount-items-container">No results found</h1>}</div>}
        />
          <Route path="/login" element={<SignIn/>} />
          <Route path='/signup' element={<SignUp/>} />
        </Routes>
      </Router>
      <AuthDetails/>
    </div>
  );
}

export default App;
