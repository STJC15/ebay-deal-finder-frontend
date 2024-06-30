import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import AuthDetails from '../auth/AuthDetails';
import './Header.css'
const Header = ({setResults, setIsLoading, setIsFetch, setUserData, currentUser}) => {
  return (
    <div className="header-container">
      <div className="search-bar-container">
        <SearchBar setResults={setResults} setIsLoading={setIsLoading} setIsFetch={setIsFetch} setUserData={setUserData} currentUser={currentUser}/>
      </div>
      <AuthDetails setUserData={setUserData}/>
  </div>
  )
}

export default Header