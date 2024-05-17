import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
const Header = ({setResults, setIsLoading, setIsFetch}) => {
  return (
    <div className="header">
    <div className="login-button-container">
        <Link to="/login"> <button className="btn btn-outline-primary custom-outline-primary">Log In</button> </Link>
      </div>
      <div className="signup-button-container">
        <Link to="/signup"> <button class="btn btn-primary">Sign Up</button> </Link>
      </div>
      <div className="search-bar-container">
        <SearchBar setResults={setResults} setIsLoading={setIsLoading} setIsFetch={setIsFetch}/>
      </div>
  </div>
  )
}

export default Header